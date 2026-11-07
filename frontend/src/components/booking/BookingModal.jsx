import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X, CheckCircle2, MapPin, MessageCircle } from 'lucide-react';
import { SEATING_ZONES } from '../../data/restaurantData.js';

const DAY_OPTIONS = [
  { label: 'Tonight', sub: 'Today' },
  { label: 'Tomorrow', sub: 'Nov 3' },
  { label: 'Friday', sub: 'Nov 7' },
  { label: 'Saturday', sub: 'Nov 8' }
];

const TIME_OPTIONS = [
  { time: '6:30 PM', tag: 'Sunset View' },
  { time: '8:00 PM', tag: 'Prime Awadhi Dinner' },
  { time: '9:15 PM', tag: 'Starlit Skyline' },
  { time: '10:30 PM', tag: 'Twilight Cocktails' }
];

const GUEST_OPTIONS = [2, 3, 4, 6, 8];

export const BookingModal = ({
  isOpen,
  onClose,
  initialZone = 'main_dining',
  currentUser
}) => {
  const [guestCount, setGuestCount] = useState(2);
  const [selectedDayOption, setSelectedDayOption] = useState('Today');
  const [selectedTime, setSelectedTime] = useState('8:00 PM');
  const [selectedZone, setSelectedZone] = useState(initialZone);
  const [guestName, setGuestName] = useState(currentUser?.name || 'Aditya Verma');
  const [guestPhone, setGuestPhone] = useState(currentUser?.phone || '+91 98765 43210');
  const [specialRequest, setSpecialRequest] = useState('');

  // Auto-fill user details if logged in
  React.useEffect(() => {
    if (currentUser) {
      setGuestName(currentUser.name);
      if (currentUser.phone) setGuestPhone(currentUser.phone);
    }
  }, [currentUser]);

  const [confirmed, setConfirmed] = useState(false);
  const [reservationCode, setReservationCode] = useState('');

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    const code = `SKP-LKO-${Math.floor(1000 + Math.random() * 9000)}`;
    setReservationCode(code);
    setConfirmed(true);
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
                <span className="text-[#1d1b16] font-semibold">{selectedDayOption} at {selectedTime}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#e8e2d8]">
                <span className="text-[#74685e]">Party Size</span>
                <span className="text-[#1d1b16] font-semibold">{guestCount} Guests</span>
              </div>
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
              
              <div className="grid grid-cols-4 gap-2 mb-2.5">
                {DAY_OPTIONS.map((opt) => (
                  <button
                    key={opt.label}
                    type="button"
                    onClick={() => setSelectedDayOption(opt.label)}
                    className={`py-2 px-1 text-center rounded border transition-colors cursor-pointer ${
                      selectedDayOption === opt.label
                        ? 'bg-[#1d1b16] text-white border-[#1d1b16] shadow-sm'
                        : 'bg-[#fcfaf7] border-[#e8e2d8] text-[#1d1b16] hover:border-[#b28a56]'
                    }`}
                  >
                    <span className="block text-xs font-semibold">{opt.label}</span>
                    <span className="block text-[10px] opacity-70">{opt.sub}</span>
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {TIME_OPTIONS.map((slot) => (
                  <button
                    key={slot.time}
                    type="button"
                    onClick={() => setSelectedTime(slot.time)}
                    className={`py-2 px-2 text-center rounded border transition-colors cursor-pointer ${
                      selectedTime === slot.time
                        ? 'border-[#7a5829] bg-[#fbf8f3] text-[#7a5829] font-bold shadow-xs'
                        : 'border-[#e8e2d8] bg-[#fcfaf7] text-[#1d1b16] hover:border-[#b28a56]'
                    }`}
                  >
                    <span className="block text-xs font-mono">{slot.time}</span>
                    <span className="block text-[9px] text-[#74685e] truncate">{slot.tag}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Guests & Seating Zone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[11px] tracking-wider text-[#4f4541] uppercase font-bold block mb-2">
                  2. Number of Guests
                </label>
                <div className="flex gap-2">
                  {GUEST_OPTIONS.map((count) => (
                    <button
                      key={count}
                      type="button"
                      onClick={() => setGuestCount(count)}
                      className={`flex-1 py-2 text-xs font-mono font-bold rounded border transition-colors cursor-pointer ${
                        guestCount === count
                          ? 'bg-[#1d1b16] text-white border-[#1d1b16]'
                          : 'bg-[#fcfaf7] border-[#e8e2d8] text-[#1d1b16] hover:border-[#b28a56]'
                      }`}
                    >
                      {count}
                    </button>
                  ))}
                </div>
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

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 bg-[#1d1b16] hover:bg-[#b28a56] text-white text-xs font-semibold tracking-[0.2em] uppercase rounded transition-colors cursor-pointer shadow-md flex items-center justify-center gap-2"
              >
                <span>Confirm Reservation Instantly</span>
                <span>→</span>
              </button>
              <p className="text-center text-[10px] text-[#74685e] mt-2">
                ✓ No prepayment required · Instant table hold at Level 15, Gomti Nagar
              </p>
            </div>
          </form>
        )}
      </motion.div>
    </div>
  );
};
