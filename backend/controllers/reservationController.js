import { createHmac, randomUUID, timingSafeEqual } from 'node:crypto';
import { ReservationModel } from '../models/Reservation.js';

const VALID_SLOTS = ['6:30 PM', '8:00 PM', '9:15 PM', '10:30 PM'];
const VALID_ZONES = ['main_dining', 'terrace_seating', 'cozy_booth'];
const MAX_CAPACITY = 24;
const MAX_GUESTS = 15;
const DEPOSIT_PER_GUEST_PAISE = 30000;
const pendingPayments = new Map();

function dateInLucknow(date = new Date()) {
  const parts = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Kolkata', year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(date);
  const values = Object.fromEntries(parts.map(({ type, value }) => [type, value]));
  return `${values.year}-${values.month}-${values.day}`;
}

function isBookableDate(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value || '')) return false;
  const parsed = new Date(`${value}T00:00:00.000Z`);
  if (Number.isNaN(parsed.valueOf()) || parsed.toISOString().slice(0, 10) !== value) return false;
  const today = dateInLucknow();
  const [year, month, day] = today.split('-').map(Number);
  const firstOfNextMonth = new Date(Date.UTC(year, month, 1));
  const lastDay = new Date(Date.UTC(firstOfNextMonth.getUTCFullYear(), firstOfNextMonth.getUTCMonth() + 1, 0)).getUTCDate();
  const latest = new Date(Date.UTC(firstOfNextMonth.getUTCFullYear(), firstOfNextMonth.getUTCMonth(), Math.min(day, lastDay))).toISOString().slice(0, 10);
  return value >= today && value <= latest;
}

function validReservationDetails({ date, time, guestCount, zone, guest }) {
  const count = Number(guestCount);
  return isBookableDate(date) && VALID_SLOTS.includes(time) && Number.isInteger(count) && count >= 1 && count <= MAX_GUESTS && VALID_ZONES.includes(zone) && Boolean(guest?.name?.trim()) && /^\+?[\d\s()-]{10,20}$/.test(guest?.phone || '');
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

export const ReservationController = {
  
  async checkAvailability(req, res) {
    try {
      const { date, guests, zone } = req.query;

      if (!isBookableDate(date)) {
        return res.status(400).json({ data: null, error: { code: 'INVALID_QUERY', message: 'Choose a valid date within the next month.' } });
      }

      const guestCount = Number(guests);
      if (!Number.isInteger(guestCount) || guestCount < 1 || guestCount > MAX_GUESTS) {
        return res.status(400).json({ data: null, error: { code: 'INVALID_QUERY', message: 'Guests must be a whole number from 1 to 15.' } });
      }

      if (!zone || !VALID_ZONES.includes(zone)) {
        return res.status(400).json({ data: null, error: { code: 'INVALID_QUERY', message: `Zone must be one of: ${VALID_ZONES.join(', ')}` } });
      }

      
      const slots = await Promise.all(
        VALID_SLOTS.map(async (time) => {
          const bookedCount = await ReservationModel.getBookedCount(date, time, zone);
          const remainingSeats = MAX_CAPACITY - bookedCount;

          return {
            time,
            available: remainingSeats >= guestCount,
            remaining_seats: Math.max(0, remainingSeats)
          };
        })
      );

      return res.json({ data: { date, zone, slots }, error: null });
    } catch (error) {
      console.error('Check Availability Error:', error);
      return res.status(500).json({ data: null, error: { code: 'SERVER_ERROR', message: 'Could not check availability.' } });
    }
  },

 
  async createReservation(req, res) {
    try {
      const { date, time, guestCount, zone, guest, specialRequest = '' } = req.body;

      if (!isBookableDate(date)) {
        return res.status(400).json({ data: null, error: { code: 'INVALID_RESERVATION', message: 'Choose a valid date within the next month.' } });
      }

      if (!VALID_SLOTS.includes(time)) {
        return res.status(400).json({ data: null, error: { code: 'INVALID_RESERVATION', message: `Time must be one of: ${VALID_SLOTS.join(', ')}` } });
      }

      const partySize = Number(guestCount);
      if (!Number.isInteger(partySize) || partySize < 1 || partySize > MAX_GUESTS) {
        return res.status(400).json({ data: null, error: { code: 'INVALID_RESERVATION', message: 'Party size must be between 1 and 15 guests.' } });
      }

      if (!VALID_ZONES.includes(zone)) {
        return res.status(400).json({ data: null, error: { code: 'INVALID_RESERVATION', message: `Zone must be one of: ${VALID_ZONES.join(', ')}` } });
      }

      if (!guest?.name?.trim()) {
        return res.status(400).json({ data: null, error: { code: 'INVALID_RESERVATION', message: 'Guest name is required.' } });
      }

      if (!guest?.phone || !/^\+?[\d\s()-]{10,20}$/.test(guest.phone)) {
        return res.status(400).json({ data: null, error: { code: 'INVALID_RESERVATION', message: 'Valid phone number is required.' } });
      }

     
      const currentlyBooked = await ReservationModel.getBookedCount(date, time, zone);
      if (currentlyBooked + partySize > MAX_CAPACITY) {
        return res.status(409).json({ data: null, error: { code: 'SLOT_UNAVAILABLE', message: 'Sorry, that time slot is now full. Please select another time.' } });
      }

     
      const reservation = await ReservationModel.create({
        userId: req.user?.id || null,
        guestName: guest.name,
        guestPhone: guest.phone,
        date,
        time,
        guestCount: partySize,
        zone,
        specialRequest,
        paymentStatus: 'not_required',
        amountPaid: 0
      });

      return res.status(201).json({
        data: {
          id: reservation.id,
          date: reservation.date,
          time: reservation.time,
          guestCount: reservation.guest_count,
          zone: reservation.zone,
          guest: { name: reservation.guest_name, phone: reservation.guest_phone },
          specialRequest: reservation.special_request,
          status: reservation.status,
          paymentStatus: reservation.payment_status,
          amountPaid: reservation.amount_paid,
          createdAt: reservation.created_at
        },
        error: null
      });
    } catch (error) {
      console.error('Create Reservation Error:', error);
      return res.status(500).json({ data: null, error: { code: 'SERVER_ERROR', message: 'Failed to create reservation.' } });
    }
  },


  async createPaymentOrder(req, res) {
    try {
      const reservation = req.body;
      if (!validReservationDetails(reservation)) {
        return res.status(400).json({ data: null, error: { code: 'INVALID_RESERVATION', message: 'Provide valid reservation details before starting payment.' } });
      }

      const guestCount = Number(reservation.guestCount);
      const bookedCount = await ReservationModel.getBookedCount(reservation.date, reservation.time, reservation.zone);
      if (bookedCount + guestCount > MAX_CAPACITY) {
        return res.status(409).json({ data: null, error: { code: 'SLOT_UNAVAILABLE', message: 'That time is no longer available.' } });
      }

      const amount = DEPOSIT_PER_GUEST_PAISE * guestCount;
      const order = await razorpayRequest('/orders', { method: 'POST', body: JSON.stringify({ amount, currency: 'INR', receipt: `skypiea_${randomUUID().slice(0, 16)}`, notes: { reservationDate: reservation.date, reservationTime: reservation.time } }) });
      pendingPayments.set(order.id, { reservation: { ...reservation, guestCount }, userId: req.user?.id || null, amount, createdAt: Date.now() });
      return res.status(201).json({ data: { orderId: order.id, amount: order.amount, currency: order.currency, keyId: process.env.RAZORPAY_KEY_ID }, error: null });
    } catch (error) {
      console.error('Create Payment Order Error:', error);
      return res.status(error.status || 500).json({ data: null, error: { code: error.status ? 'PAYMENT_ERROR' : 'SERVER_ERROR', message: error.message || 'Could not start payment.' } });
    }
  },

  async confirmPayment(req, res) {
    try {
      const { razorpay_order_id: orderId, razorpay_payment_id: paymentId, razorpay_signature: signature } = req.body;
      const pending = pendingPayments.get(orderId);
      if (!pending || Date.now() - pending.createdAt > 30 * 60 * 1000) {
        return res.status(400).json({ data: null, error: { code: 'PAYMENT_EXPIRED', message: 'This payment session expired. Please start again.' } });
      }

      const secret = process.env.RAZORPAY_KEY_SECRET || '';
      const expected = createHmac('sha256', secret).update(`${orderId}|${paymentId}`).digest('hex');
      const expectedBuffer = Buffer.from(expected);
      const providedBuffer = Buffer.from(String(signature || ''));
      if (!secret || providedBuffer.length !== expectedBuffer.length || !timingSafeEqual(providedBuffer, expectedBuffer)) {
        return res.status(400).json({ data: null, error: { code: 'INVALID_PAYMENT_SIGNATURE', message: 'Payment verification failed.' } });
      }

      const payment = await razorpayRequest(`/payments/${encodeURIComponent(paymentId)}`);
      if (payment.order_id !== orderId || payment.status !== 'captured' || payment.amount !== pending.amount) {
        return res.status(409).json({ data: null, error: { code: 'PAYMENT_NOT_CAPTURED', message: 'Payment has not been captured. Please try again.' } });
      }

      const bookedCount = await ReservationModel.getBookedCount(pending.reservation.date, pending.reservation.time, pending.reservation.zone);
      if (bookedCount + pending.reservation.guestCount > MAX_CAPACITY) {
        return res.status(409).json({ data: null, error: { code: 'SLOT_UNAVAILABLE', message: 'That time filled while payment was processing. Please contact the restaurant about your payment.' } });
      }

      const reservation = await ReservationModel.create({
        userId: pending.userId,
        guestName: pending.reservation.guest.name,
        guestPhone: pending.reservation.guest.phone,
        date: pending.reservation.date,
        time: pending.reservation.time,
        guestCount: pending.reservation.guestCount,
        zone: pending.reservation.zone,
        specialRequest: pending.reservation.specialRequest,
        paymentStatus: 'paid',
        amountPaid: payment.amount
      });
      pendingPayments.delete(orderId);
      return res.status(201).json({
        data: {
          id: reservation.id,
          date: reservation.date,
          time: reservation.time,
          guestCount: reservation.guest_count,
          zone: reservation.zone,
          guest: { name: reservation.guest_name, phone: reservation.guest_phone },
          specialRequest: reservation.special_request,
          status: reservation.status,
          paymentStatus: reservation.payment_status,
          amountPaid: reservation.amount_paid,
          createdAt: reservation.created_at
        },
        error: null
      });
    } catch (error) {
      console.error('Confirm Payment Error:', error);
      return res.status(error.status || 500).json({ data: null, error: { code: error.status ? 'PAYMENT_ERROR' : 'SERVER_ERROR', message: error.message || 'Could not verify payment.' } });
    }
  },

  
  async getReservationById(req, res) {
    try {
      const reservation = await ReservationModel.findById(req.params.id);
      if (!reservation) {
        return res.status(404).json({ data: null, error: { code: 'NOT_FOUND', message: 'Reservation not found.' } });
      }

      return res.json({
        data: {
          id: reservation.id,
          date: reservation.date,
          time: reservation.time,
          guestCount: reservation.guest_count,
          zone: reservation.zone,
          guest: { name: reservation.guest_name, phone: reservation.guest_phone },
          specialRequest: reservation.special_request,
          status: reservation.status,
          paymentStatus: reservation.payment_status || 'not_required',
          amountPaid: reservation.amount_paid || 0,
          createdAt: reservation.created_at
        },
        error: null
      });
    } catch (error) {
      console.error('Get Reservation Error:', error);
      return res.status(500).json({ data: null, error: { code: 'SERVER_ERROR', message: 'Could not fetch reservation.' } });
    }
  },

  
  async getUserReservations(req, res) {
    try {
      const reservations = await ReservationModel.findByUserId(req.user.id);
      const formatted = reservations.map((r) => ({
        id: r.id,
        date: r.date,
        time: r.time,
        guestCount: r.guest_count,
        zone: r.zone,
        guest: { name: r.guest_name, phone: r.guest_phone },
        specialRequest: r.special_request,
        status: r.status,
        paymentStatus: r.payment_status || 'not_required',
        amountPaid: r.amount_paid || 0,
        createdAt: r.created_at
      }));

      return res.json({ data: formatted, error: null });
    } catch (error) {
      console.error('Get User Reservations Error:', error);
      return res.status(500).json({ data: null, error: { code: 'SERVER_ERROR', message: 'Could not fetch reservations.' } });
    }
  },


  async cancelReservation(req, res) {
    try {
      const reservation = await ReservationModel.findById(req.params.id);
      if (!reservation) {
        return res.status(404).json({ data: null, error: { code: 'NOT_FOUND', message: 'Reservation not found.' } });
      }

      if (reservation.status === 'cancelled') {
        return res.status(400).json({ data: null, error: { code: 'ALREADY_CANCELLED', message: 'Reservation is already cancelled.' } });
      }

      await ReservationModel.cancel(req.params.id);

      return res.json({ data: { id: req.params.id, status: 'cancelled' }, error: null });
    } catch (error) {
      console.error('Cancel Reservation Error:', error);
      return res.status(500).json({ data: null, error: { code: 'SERVER_ERROR', message: 'Could not cancel reservation.' } });
    }
  }
};
