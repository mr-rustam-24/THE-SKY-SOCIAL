import { createServer } from 'node:http';
import { createHmac, randomUUID, timingSafeEqual } from 'node:crypto';
import { MENU_ITEMS, ORIGINAL_MENU_PAGES, RESTAURANT_INFO } from '../frontend/src/data/restaurantData.js';

const port = Number(process.env.API_PORT || 4000);
const bookings = [];
const pendingPayments = new Map();
const slots = ['6:30 PM', '8:00 PM', '9:15 PM', '10:30 PM'];
const prepaymentPerGuest = 30000;

function dateInLucknow(date = new Date()) {
  const parts = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Kolkata', year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(date);
  const values = Object.fromEntries(parts.map(({ type, value }) => [type, value]));
  return `${values.year}-${values.month}-${values.day}`;
}

function bookingDateRange() {
  const today = dateInLucknow();
  const [year, month, day] = today.split('-').map(Number);
  const nextMonth = new Date(Date.UTC(year, month, 1));
  const lastDayOfNextMonth = new Date(Date.UTC(nextMonth.getUTCFullYear(), nextMonth.getUTCMonth() + 1, 0)).getUTCDate();
  const latest = new Date(Date.UTC(nextMonth.getUTCFullYear(), nextMonth.getUTCMonth(), Math.min(day, lastDayOfNextMonth)));
  return { today, latest: latest.toISOString().slice(0, 10) };
}

function isBookableDate(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value || '')) return false;
  const parsed = new Date(`${value}T00:00:00.000Z`);
  if (Number.isNaN(parsed.valueOf()) || parsed.toISOString().slice(0, 10) !== value) return false;
  const { today, latest } = bookingDateRange();
  return value >= today && value <= latest;
}

function isValidReservation({ date, time, guestCount, zone, guest }) {
  return isBookableDate(date) && slots.includes(time) && Number.isInteger(guestCount) && guestCount >= 1 && guestCount <= 15 && ['main_dining', 'terrace_seating', 'cozy_booth'].includes(zone) && Boolean(guest?.name?.trim()) && /^\+?[\d\s()-]{10,20}$/.test(guest?.phone || '');
}

function createBooking({ date, time, guestCount, zone, guest, specialRequest = '' }, payment = {}) {
  const reserved = bookings.filter((b) => b.date === date && b.time === time && b.zone === zone).reduce((sum, b) => sum + b.guestCount, 0);
  if (reserved + guestCount > 24) return null;
  const booking = { id: `SKP-LKO-${randomUUID().slice(0, 8).toUpperCase()}`, date, time, guestCount, zone, guest: { name: guest.name.trim(), phone: guest.phone.trim() }, specialRequest: String(specialRequest).slice(0, 1000), status: 'confirmed', paymentStatus: payment.status || 'not_required', amountPaid: payment.amount || 0, createdAt: new Date().toISOString() };
  bookings.push(booking);
  return booking;
}

async function razorpayRequest(path, options = {}) {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  if (!keyId || !keySecret) throw Object.assign(new Error('Online prepayment is not configured yet.'), { status: 503 });
  const response = await fetch(`https://api.razorpay.com/v1${path}`, {
    ...options,
    headers: { Authorization: `Basic ${Buffer.from(`${keyId}:${keySecret}`).toString('base64')}`, ...(options.body ? { 'Content-Type': 'application/json' } : {}), ...options.headers }
  });
  const payload = await response.json();
  if (!response.ok) throw Object.assign(new Error(payload.error?.description || 'Razorpay could not process the payment.'), { status: 502 });
  return payload;
}

function send(res, status, data) {
  res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify(data));
}

async function readBody(req) {
  let raw = '';
  for await (const chunk of req) {
    raw += chunk;
    if (raw.length > 32_000) throw Object.assign(new Error('Request body is too large.'), { status: 413 });
  }
  try { return raw ? JSON.parse(raw) : {}; }
  catch { throw Object.assign(new Error('Request body must be valid JSON.'), { status: 400 }); }
}

function fail(res, status, code, message) {
  send(res, status, { data: null, error: { code, message } });
}

const server = createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const method = req.method || 'GET';
  try {
    if (method === 'GET' && url.pathname === '/api/v1/health') {
      return send(res, 200, { data: { status: 'ok' }, error: null });
    }

    if (method === 'GET' && url.pathname === '/api/v1/menu') {
      const category = url.searchParams.get('category');
      const query = (url.searchParams.get('q') || '').trim().toLowerCase();
      const vegetarian = url.searchParams.get('vegetarian');
      const page = Math.max(1, Number(url.searchParams.get('page') || 1));
      const limit = Math.min(100, Math.max(1, Number(url.searchParams.get('limit') || 100)));
      const filtered = MENU_ITEMS.filter((item) =>
        (!category || category === 'all' || item.category === category) &&
        (vegetarian === null || String(item.isVeg) === vegetarian) &&
        (!query || `${item.name} ${item.description} ${item.subCategory || ''}`.toLowerCase().includes(query))
      );
      return send(res, 200, { data: { items: filtered.slice((page - 1) * limit, page * limit), total: filtered.length, page, limit }, error: null });
    }

    if (method === 'GET' && url.pathname === '/api/v1/menu/pages') {
      return send(res, 200, { data: ORIGINAL_MENU_PAGES, error: null });
    }

    if (method === 'GET' && url.pathname === '/api/v1/restaurant') {
      return send(res, 200, { data: RESTAURANT_INFO, error: null });
    }

    if (method === 'GET' && url.pathname === '/api/v1/reservations/availability') {
      const date = url.searchParams.get('date');
      const guests = Number(url.searchParams.get('guests'));
      const zone = url.searchParams.get('zone');
      if (!isBookableDate(date) || !Number.isInteger(guests) || guests < 1 || guests > 15 || !zone) {
        return fail(res, 400, 'INVALID_QUERY', 'Choose a valid date within the next month, and provide guests and seating area.');
      }
      const available = slots.filter((time) => bookings.filter((b) => b.date === date && b.time === time && b.zone === zone).reduce((sum, b) => sum + b.guestCount, 0) + guests <= 24);
      return send(res, 200, { data: { date, zone, slots: available.map((time) => ({ time, available: true })) }, error: null });
    }

    if (method === 'POST' && url.pathname === '/api/v1/reservations/payment-order') {
      const body = await readBody(req);
      if (!isValidReservation(body)) return fail(res, 400, 'INVALID_RESERVATION', 'Provide valid reservation details before starting payment.');
      const amount = prepaymentPerGuest * body.guestCount;
      if (!Number.isSafeInteger(amount) || amount < 100) return fail(res, 503, 'PAYMENT_NOT_CONFIGURED', 'Online prepayment is not configured yet.');
      const order = await razorpayRequest('/orders', { method: 'POST', body: JSON.stringify({ amount, currency: 'INR', receipt: `skypiea_${randomUUID().slice(0, 16)}`, notes: { reservationDate: body.date, reservationTime: body.time } }) });
      pendingPayments.set(order.id, { reservation: body, amount, createdAt: Date.now() });
      return send(res, 201, { data: { orderId: order.id, amount: order.amount, currency: order.currency, keyId: process.env.RAZORPAY_KEY_ID }, error: null });
    }

    if (method === 'POST' && url.pathname === '/api/v1/reservations/confirm-payment') {
      const { razorpay_order_id: orderId, razorpay_payment_id: paymentId, razorpay_signature: signature } = await readBody(req);
      const pending = pendingPayments.get(orderId);
      if (!pending || Date.now() - pending.createdAt > 30 * 60 * 1000) return fail(res, 400, 'PAYMENT_EXPIRED', 'This payment session expired. Please start again.');
      const expected = createHmac('sha256', process.env.RAZORPAY_KEY_SECRET || '').update(`${orderId}|${paymentId}`).digest('hex');
      const providedBuffer = Buffer.from(String(signature || ''));
      const expectedBuffer = Buffer.from(expected);
      if (providedBuffer.length !== expectedBuffer.length || !timingSafeEqual(providedBuffer, expectedBuffer)) return fail(res, 400, 'INVALID_PAYMENT_SIGNATURE', 'Payment verification failed.');
      const payment = await razorpayRequest(`/payments/${encodeURIComponent(paymentId)}`);
      if (payment.order_id !== orderId || payment.status !== 'captured' || payment.amount !== pending.amount) return fail(res, 409, 'PAYMENT_NOT_CAPTURED', 'Payment has not been captured. Please try again.');
      const booking = createBooking(pending.reservation, { status: 'paid', amount: payment.amount });
      if (!booking) return fail(res, 409, 'SLOT_UNAVAILABLE', 'That time is no longer available. Please contact the restaurant about your payment.');
      pendingPayments.delete(orderId);
      return send(res, 201, { data: booking, error: null });
    }

    if (method === 'POST' && url.pathname === '/api/v1/reservations') {
      const body = await readBody(req);
      const { date, time, guestCount, zone, guest, specialRequest = '' } = body;
      if (!isValidReservation({ date, time, guestCount, zone, guest })) {
        return fail(res, 400, 'INVALID_RESERVATION', 'Choose a valid date within the next month and provide a valid time, party size, seating area, name, and phone number.');
      }
      const booking = createBooking({ date, time, guestCount, zone, guest, specialRequest });
      if (!booking) return fail(res, 409, 'SLOT_UNAVAILABLE', 'That time is no longer available.');
      return send(res, 201, { data: booking, error: null });
    }

    const bookingMatch = url.pathname.match(/^\/api\/v1\/reservations\/([^/]+)$/);
    if (method === 'GET' && bookingMatch) {
      const booking = bookings.find((item) => item.id === bookingMatch[1]);
      return booking ? send(res, 200, { data: booking, error: null }) : fail(res, 404, 'NOT_FOUND', 'Reservation not found.');
    }

    return fail(res, 404, 'NOT_FOUND', 'API endpoint not found.');
  } catch (error) {
    return fail(res, error.status || 500, error.status ? 'INVALID_REQUEST' : 'INTERNAL_ERROR', error.status ? error.message : 'An unexpected server error occurred.');
  }
});

server.listen(port, () => console.log(`Skypiea API listening on http://localhost:${port}`));
