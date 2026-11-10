

import { ReservationModel } from '../models/Reservation.js';

const VALID_SLOTS = ['6:30 PM', '8:00 PM', '9:15 PM', '10:30 PM'];
const VALID_ZONES = ['main_dining', 'terrace_seating', 'cozy_booth'];
const MAX_CAPACITY = 24;

export const ReservationController = {
  
  async checkAvailability(req, res) {
    try {
      const { date, guests, zone } = req.query;

      if (!date || isNaN(Date.parse(date))) {
        return res.status(400).json({ data: null, error: { code: 'INVALID_QUERY', message: 'Valid date is required (YYYY-MM-DD).' } });
      }

      const guestCount = Number(guests);
      if (!Number.isInteger(guestCount) || guestCount < 1) {
        return res.status(400).json({ data: null, error: { code: 'INVALID_QUERY', message: 'Guests must be a positive integer.' } });
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

      if (!date || isNaN(Date.parse(date))) {
        return res.status(400).json({ data: null, error: { code: 'INVALID_RESERVATION', message: 'Valid date is required.' } });
      }

      if (!VALID_SLOTS.includes(time)) {
        return res.status(400).json({ data: null, error: { code: 'INVALID_RESERVATION', message: `Time must be one of: ${VALID_SLOTS.join(', ')}` } });
      }

      const partySize = Number(guestCount);
      if (!Number.isInteger(partySize) || partySize < 1 || partySize > 20) {
        return res.status(400).json({ data: null, error: { code: 'INVALID_RESERVATION', message: 'Party size must be between 1 and 20 guests.' } });
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
        specialRequest
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
          createdAt: reservation.created_at
        },
        error: null
      });
    } catch (error) {
      console.error('Create Reservation Error:', error);
      return res.status(500).json({ data: null, error: { code: 'SERVER_ERROR', message: 'Failed to create reservation.' } });
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