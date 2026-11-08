import { createServer } from 'node:http';
import { randomUUID } from 'node:crypto';
import { MENU_ITEMS, ORIGINAL_MENU_PAGES, RESTAURANT_INFO } from '../frontend/src/data/restaurantData.js';

const port = Number(process.env.API_PORT || 4000);
const bookings = [];
const slots = ['6:30 PM', '8:00 PM', '9:15 PM', '10:30 PM'];

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
      if (!date || Number.isNaN(Date.parse(date)) || !Number.isInteger(guests) || guests < 1 || !zone) {
        return fail(res, 400, 'INVALID_QUERY', 'date, guests, and zone are required.');
      }
      const available = slots.filter((time) => bookings.filter((b) => b.date === date && b.time === time && b.zone === zone).reduce((sum, b) => sum + b.guestCount, 0) + guests <= 24);
      return send(res, 200, { data: { date, zone, slots: available.map((time) => ({ time, available: true })) }, error: null });
    }

    if (method === 'POST' && url.pathname === '/api/v1/reservations') {
      const body = await readBody(req);
      const { date, time, guestCount, zone, guest, specialRequest = '' } = body;
      if (!date || Number.isNaN(Date.parse(date)) || !slots.includes(time) || !Number.isInteger(guestCount) || guestCount < 1 || guestCount > 20 || !['main_dining', 'terrace_seating', 'cozy_booth'].includes(zone) || !guest?.name?.trim() || !/^\+?[\d\s()-]{10,20}$/.test(guest?.phone || '')) {
        return fail(res, 400, 'INVALID_RESERVATION', 'Provide a valid date, time, party size, seating area, name, and phone number.');
      }
      const reserved = bookings.filter((b) => b.date === date && b.time === time && b.zone === zone).reduce((sum, b) => sum + b.guestCount, 0);
      if (reserved + guestCount > 24) return fail(res, 409, 'SLOT_UNAVAILABLE', 'That time is no longer available.');
      const booking = { id: `SKP-LKO-${randomUUID().slice(0, 8).toUpperCase()}`, date, time, guestCount, zone, guest: { name: guest.name.trim(), phone: guest.phone.trim() }, specialRequest: String(specialRequest).slice(0, 1000), status: 'confirmed', createdAt: new Date().toISOString() };
      bookings.push(booking);
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
