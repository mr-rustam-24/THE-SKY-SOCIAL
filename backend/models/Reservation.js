

import { randomUUID } from 'node:crypto';
import db from '../db.js';

export const ReservationModel = {

  async findById(id) {
    await db.read();
    return db.data.reservations.find((r) => r.id === id) || null;
  },


  async findByUserId(userId) {
    await db.read();
    return db.data.reservations
      .filter((r) => r.user_id === userId)
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  },

  
  async getBookedCount(date, time, zone) {
    await db.read();
    return db.data.reservations
      .filter(
        (r) =>
          r.date === date &&
          r.time === time &&
          r.zone === zone &&
          r.status !== 'cancelled'
      )
      .reduce((total, r) => total + r.guest_count, 0);
  },

 
  async create({ userId = null, guestName, guestPhone, date, time, guestCount, zone, specialRequest = '' }) {
    await db.read();

    const newReservation = {
      id: `SKP-LKO-${randomUUID().slice(0, 8).toUpperCase()}`,
      user_id: userId,
      guest_name: guestName.trim(),
      guest_phone: guestPhone.trim(),
      date,
      time,
      guest_count: guestCount,
      zone,
      special_request: String(specialRequest).slice(0, 1000),
      status: 'confirmed',
      created_at: new Date().toISOString()
    };

    db.data.reservations.push(newReservation);
    await db.write();

    return newReservation;
  },


  async cancel(id) {
    await db.read();
    const reservation = db.data.reservations.find((r) => r.id === id);

    if (!reservation) return null;

    reservation.status = 'cancelled';
    await db.write();

    return reservation;
  }
};