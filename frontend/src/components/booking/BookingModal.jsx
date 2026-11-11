import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X, CheckCircle2, MapPin, MessageCircle } from 'lucide-react';
import { SEATING_ZONES } from '../../data/restaurantData.js';
import { confirmReservationPayment, createReservation, createReservationPaymentOrder, getReservationAvailability } from '../../api/client.js';

const toDateInputValue = (date) => [date.getFullYear(), String(date.getMonth() + 1).padStart(2, '0'), String(date.getDate()).padStart(2, '0')].join('-');
const today = new Date();
const MIN_BOOKING_DATE = toDateInputValue(today);
const latestBookingDate = new Date(today.getFullYear(), today.getMonth() + 1, Math.min(today.getDate(), new Date(today.getFullYear(), today.getMonth() + 2, 0).getDate()));
const MAX_BOOKING_DATE = toDateInputValue(latestBookingDate);

const TIME_OPTIONS = [
  { time: '6:30 PM', tag: 'Sunset View' },
  { time: '8:00 PM', tag: 'Prime Awadhi Dinner' },
  { time: '9:15 PM', tag: 'Starlit Skyline' },
  { time: '10:30 PM', tag: 'Twilight Cocktails' }
];

function loadRazorpay() {
  if (window.Razorpay) return Promise.resolve(true);
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export const BookingModal = ({
  isOpen,
  onClose,
  initialZone = 'main_dining',
  currentUser
}) => {
  const [guestCount, setGuestCount] = useState('2');
  const [selectedDate, setSelectedDate] = useState(MIN_BOOKING_DATE);
  const [selectedTime, setSelectedTime] = useState('8:00 PM');
  const [selectedZone, setSelectedZone] = useState(initialZone);
  const [guestName, setGuestName] = useState(currentUser?.name || 'Aditya Verma');
  const [guestPhone, setGuestPhone] = useState(currentUser?.phone || '+91 98765 43210');
  const [specialRequest, setSpecialRequest] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('at_restaurant');
  const [slotAvailability, setSlotAvailability] = useState(null);
  const [isCheckingAvailability, setIsCheckingAvailability] = useState(false);
  const [availabilityError, setAvailabilityError] = useState('');

  // Auto-fill user details if logged in
  React.useEffect(() => {
    if (currentUser) {
      setGuestName(currentUser.name);
      if (currentUser.phone) setGuestPhone(currentUser.phone);
    }
  }, [currentUser]);

  React.useEffect(() => {
    const guests = Number(guestCount);
    if (!isOpen || !Number.isInteger(guests) || guests < 1 || guests > 15) return undefined;
    let active = true;
    setIsCheckingAvailability(true);
    setAvailabilityError('');
    getReservationAvailability({ date: selectedDate, guests, zone: selectedZone })
      .then((result) => {
        if (!active) return;
        const available = Object.fromEntries(result.slots.map((slot) => [slot.time, slot.available]));
        setSlotAvailability(available);
        const firstAvailable = result.slots.find((slot) => slot.available);
        if (firstAvailable && !available[selectedTime]) setSelectedTime(firstAvailable.time);
      })
      .catch((error) => {
        if (active) {
          setSlotAvailability(null);
          setAvailabilityError(error.message);
        }
      })
      .finally(() => { if (active) setIsCheckingAvailability(false); });
    return () => { active = false; };
  }, [isOpen, selectedDate, selectedZone, guestCount]);

  const [confirmed, setConfirmed] = useState(false);
  const [reservationCode, setReservationCode] = useState('');
  const [bookingError, setBookingError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    setBookingError('');
    setIsSubmitting(true);
    let checkoutOpened = false;
    try {
      const reservation = {
        date: selectedDate,
        time: selectedTime,
        guestCount: Number(guestCount),
        zone: selectedZone,
        guest: { name: guestName, phone: guestPhone },
        specialRequest
      };
      if (paymentMethod === 'prepay') {
        const order = await createReservationPaymentOrder(reservation);
        const loaded = await loadRazorpay();
        if (!loaded) throw new Error('Could not load Razorpay Checkout. Check your connection and try again.');
        const checkout = new window.Razorpay({
          key: order.keyId,
          amount: order.amount,
          currency: order.currency,
          name: 'Skypiea by Hideout Cafe',
          description: 'Reservation deposit',
          order_id: order.orderId,
          prefill: { name: guestName, contact: guestPhone },
          theme: { color: '#7a5829' },
          handler: async (payment) => {
            try {
              const booking = await confirmReservationPayment(payment);
              setReservationCode(booking.id);
              setConfirmed(true);
            } catch (error) {
              setBookingError(error.message);
            } finally {
              setIsSubmitting(false);
            }
          },
          modal: { ondismiss: () => setIsSubmitting(false) }
        });
        checkout.open();
        checkoutOpened = true;
        return;
      }
      const booking = await createReservation(reservation);
      setReservationCode(booking.id);
      setConfirmed(true);
    } catch (error) {
      setBookingError(error.message);
    } finally {
      if (!checkoutOpened) setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setConfirmed(false);
    onClose();
  };

  if (!isOpen) return null;

  const currentZoneName = SEATING_ZONES.find((z) => z.id === selectedZone)?.name || 'Skyline Edge';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="relative w-full max-w-xl bg-white border border-[#e8e2d8] rounded-xl shadow-2xl text-[#1d1b16] my-6 overflow-hidden"
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#e8e2d8] flex items-center justify-between bg-[#fcfaf7]">
          <div>
            <div className="flex items-center gap-2 text-[11px] tracking-wider text-[#7a5829] uppercase font-semibold">
              <MapPin className="w-3.5 h-3.5" />
              <span>Gomti Nagar, Lucknow · Easy Reserve</span>
            </div>
            <h3 className="text-xl font-serif text-[#1d1b16] font-medium mt-0.5">
              Reserve Your Table at Skypiea
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-[#74685e] hover:text-[#1d1b16] p-1.5 rounded-full hover:bg-black/5 transition-colors cursor-pointer"
            aria-label="Close booking modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {confirmed ? (
          <div className="p-8 text-center space-y-5">
            <div className="w-16 h-16 rounded-full bg-[#f3ede3] border border-[#b28a56] flex items-center justify-center mx-auto text-[#7a5829]">
              <CheckCircle2 className="w-9 h-9 text-[#7a5829]" />
            </div>

            <div>
              <span className="text-xs tracking-[0.2em] text-[#7a5829] uppercase font-bold">
                Table Confirmed Instantly!
              </span>
              <h4 className="text-2xl font-serif text-[#1d1b16] mt-1 font-medium">
                Welcome to Skypiea by Hideout Café
              </h4>
              <p className="text-xs text-[#4f4541] mt-1.5 font-light max-w-sm mx-auto leading-relaxed">
                Vibhuti Khand, Gomti Nagar, Lucknow. A confirmation SMS & WhatsApp message has been prepared for your reservation.
              </p>
            </div>

            <div className="bg-[#fcfaf7] border border-[#e8e2d8] rounded-lg p-5 max-w-sm mx-auto text-left space-y-2.5 text-xs">
              <div className="flex justify-between py-1 border-b border-[#e8e2d8]">
                <span className="text-[#74685e]">Booking ID</span>
                <span className="font-mono text-[#7a5829] font-bold">{reservationCode}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#e8e2d8]">
                <span className="text-[#74685e]">Guest Name</span>
                <span className="text-[#1d1b16] font-semibold">{guestName}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#e8e2d8]">
                <span className="text-[#74685e]">When</span>
                <span className="text-[#1d1b16] font-semibold">{new Date(`${selectedDate}T00:00:00`).toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' })} at {selectedTime}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#e8e2d8]">
                <span className="text-[#74685e]">Party Size</span>
                <span className="text-[#1d1b16] font-semibold">{guestCount} Guests</span>
              </div>
              {paymentMethod === 'prepay' && <div className="flex justify-between py-1 border-b border-[#e8e2d8]">
                <span className="text-[#74685e]">Deposit paid</span>
                <span className="text-[#1d1b16] font-semibold">₹{guestCount * 300} via Razorpay</span>
              </div>}
              <div className="flex justify-between py-1">
                <span className="text-[#74685e]">Seating Area</span>
                <span className="text-[#7a5829] font-medium">{currentZoneName}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={handleReset}
                className="w-full sm:w-auto px-6 py-2.5 bg-[#1d1b16] text-white text-xs font-semibold tracking-wider uppercase rounded hover:bg-[#b28a56] transition-colors cursor-pointer shadow-sm"
              >
                Done
              </button>
              <a
                href={`https://wa.me/?text=My%20table%20reservation%20at%20Skypiea%20by%20Hideout%20Café%20Lucknow%20is%20confirmed!%20Booking%20ID:%20${reservationCode}%20for%20${guestCount}%20guests%20at%20${selectedTime}.`}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto px-4 py-2.5 border border-[#25D366] text-[#128C7E] text-xs font-semibold rounded flex items-center justify-center gap-1.5 hover:bg-[#25D366]/10 transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366]" />
                <span>Share to WhatsApp</span>
              </a>
            </div>
          </div>
        ) : (
          <form onSubmit={handleBookingSubmit} className="p-6 space-y-5">
            {/* Day & Time */}
            <div>
              <label className="text-[11px] tracking-wider text-[#4f4541] uppercase font-bold block mb-2">
                1. Select Day & Time
              </label>
              
              <div className="mb-2.5 rounded border border-[#e8e2d8] bg-[#fcfaf7] p-3">
                <label htmlFor="reservation-date" className="mb-1.5 block text-[10px] font-semibold uppercase tracking-wider text-[#74685e]">
                  Choose a date (up to one month ahead)
                </label>
                <input
                  id="reservation-date"
                  type="date"
                  required
                  min={MIN_BOOKING_DATE}
                  max={MAX_BOOKING_DATE}
                  value={selectedDate}
                  onChange={(event) => setSelectedDate(event.target.value)}
                  className="w-full rounded border border-[#e8e2d8] bg-white px-3 py-2 text-sm text-[#1d1b16] focus:border-[#b28a56] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {TIME_OPTIONS.map((slot) => (
                  <button
                    key={slot.time}
                    type="button"
                    onClick={() => setSelectedTime(slot.time)}
                    disabled={isCheckingAvailability || slotAvailability?.[slot.time] === false}
                    className={`py-2 px-2 text-center rounded border transition-colors cursor-pointer ${
                      selectedTime === slot.time
                        ? 'border-[#7a5829] bg-[#fbf8f3] text-[#7a5829] font-bold shadow-xs'
                        : slotAvailability?.[slot.time] === false
                          ? 'border-[#e8e2d8] bg-gray-100 text-gray-400 cursor-not-allowed line-through'
                          : 'border-[#e8e2d8] bg-[#fcfaf7] text-[#1d1b16] hover:border-[#b28a56]'
                    }`}
                  >
                    <span className="block text-xs font-mono">{slot.time}</span>
                    <span className="block text-[9px] text-[#74685e] truncate">{slot.tag}</span>
                  </button>
                ))}
              </div>
              {isCheckingAvailability && <p className="mt-2 text-[10px] text-[#74685e]">Checking table availability…</p>}
              {availabilityError && <p className="mt-2 text-[10px] text-amber-800">Live availability could not be loaded. We’ll check your selected time when you submit.</p>}
            </div>

            {/* Guests & Seating Zone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[11px] tracking-wider text-[#4f4541] uppercase font-bold block mb-2">
                  2. Number of Guests
                </label>
                <input
                  type="number"
                  required
                  min="1"
                  max="15"
                  step="1"
                  inputMode="numeric"
                  value={guestCount}
                  onChange={(event) => setGuestCount(event.target.value)}
                  aria-label="Number of guests, from 1 to 15"
                  className="w-full bg-[#fcfaf7] border border-[#e8e2d8] rounded px-3 py-2 text-sm font-mono font-bold text-[#1d1b16] focus:outline-none focus:border-[#b28a56]"
                />
                <p className="text-[10px] text-[#74685e] mt-1">Enter 1 to 15 guests.</p>
              </div>

              <div>
                <label className="text-[11px] tracking-wider text-[#4f4541] uppercase font-bold block mb-2">
                  3. Preferred Seating Area
                </label>
                <select
                  value={selectedZone}
                  onChange={(e) => setSelectedZone(e.target.value)}
                  className="w-full bg-[#fcfaf7] border border-[#e8e2d8] rounded px-3 py-2 text-xs text-[#1d1b16] font-medium focus:outline-none focus:border-[#b28a56]"
                >
                  <option value="main_dining">Main Dining Hall (Family & Group)</option>
                  <option value="terrace_seating">Open-Air Terrace Seating</option>
                  <option value="cozy_booth">Cozy Dining Lounge (Hideout Vibe)</option>
                </select>
              </div>
            </div>

            {/* Contact Details */}
            <div className="pt-1 border-t border-[#e8e2d8]">
              <label className="text-[11px] tracking-wider text-[#4f4541] uppercase font-bold block mb-2">
                4. Your Contact Details
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  required
                  placeholder="Full Name"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  className="w-full bg-[#fcfaf7] border border-[#e8e2d8] rounded px-3 py-2 text-xs text-[#1d1b16] focus:outline-none focus:border-[#b28a56]"
                />
                <input
                  type="tel"
                  required
                  placeholder="Mobile (+91 Phone Number)"
                  value={guestPhone}
                  onChange={(e) => setGuestPhone(e.target.value)}
                  className="w-full bg-[#fcfaf7] border border-[#e8e2d8] rounded px-3 py-2 text-xs text-[#1d1b16] focus:outline-none focus:border-[#b28a56]"
                />
              </div>
              <input
                type="text"
                placeholder="Special occasion or dietary notes (Optional, e.g. Birthday, Jain Food)"
                value={specialRequest}
                onChange={(e) => setSpecialRequest(e.target.value)}
                className="w-full mt-2 bg-[#fcfaf7] border border-[#e8e2d8] rounded px-3 py-1.5 text-xs text-[#1d1b16] placeholder-[#817470]/60 focus:outline-none focus:border-[#b28a56]"
              />
            </div>

            <div>
              <label className="text-[11px] tracking-wider text-[#4f4541] uppercase font-bold block mb-2">
                5. Payment Preference
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <button type="button" onClick={() => setPaymentMethod('at_restaurant')} className={`rounded border px-3 py-2.5 text-left transition-colors ${paymentMethod === 'at_restaurant' ? 'border-[#7a5829] bg-[#fbf8f3]' : 'border-[#e8e2d8] bg-[#fcfaf7]'}`}>
                  <span className="block text-xs font-semibold text-[#1d1b16]">Pay at the restaurant</span>
                  <span className="block text-[10px] text-[#74685e]">No deposit required</span>
                </button>
                <button type="button" onClick={() => setPaymentMethod('prepay')} className={`rounded border px-3 py-2.5 text-left transition-colors ${paymentMethod === 'prepay' ? 'border-[#7a5829] bg-[#fbf8f3]' : 'border-[#e8e2d8] bg-[#fcfaf7]'}`}>
                  <span className="block text-xs font-semibold text-[#1d1b16]">Prepay ₹{Number(guestCount || 0) * 300} deposit</span>
                  <span className="block text-[10px] text-[#74685e]">₹300 per guest · Secure Razorpay checkout</span>
                </button>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-[#1d1b16] hover:bg-[#b28a56] disabled:opacity-60 disabled:cursor-wait text-white text-xs font-semibold tracking-[0.2em] uppercase rounded transition-colors cursor-pointer shadow-md flex items-center justify-center gap-2"
              >
                <span>{isSubmitting ? 'Processing…' : paymentMethod === 'prepay' ? `Pay ₹${Number(guestCount || 0) * 300} & Confirm` : 'Confirm Reservation'}</span>
                <span>→</span>
              </button>
              {bookingError && <p role="alert" className="text-center text-xs text-red-700 mt-2">{bookingError}</p>}
              <p className="text-center text-[10px] text-[#74685e] mt-2">
                {paymentMethod === 'prepay' ? `₹300 per guest · ₹${Number(guestCount || 0) * 300} deposit total via Razorpay` : 'No prepayment required · Instant table hold at Level 15, Gomti Nagar'}
              </p>
            </div>
          </form>
        )}
      </motion.div>
    </div>
  );
};
