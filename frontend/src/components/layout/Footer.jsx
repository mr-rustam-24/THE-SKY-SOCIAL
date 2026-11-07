import React from 'react';
import { ArrowUp, Phone, MapPin, MessageCircle } from 'lucide-react';
import { RESTAURANT_INFO } from '../../data/restaurantData.js';

// Clean, Student-Friendly White Theme Footer
export function Footer({ onNavigate, onOpenBooking, onReturnToCover }) {
  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function handleWhatsAppClick() {
    const text = encodeURIComponent("Hello Skypiea by Hideout Café! I'd like to book a table.");
    window.open(`https://wa.me/${RESTAURANT_INFO.whatsapp}?text=${text}`, '_blank');
  }

  return (
    <footer className="w-full bg-gray-100 text-gray-700 border-t border-gray-200 pt-14 pb-8 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-gray-200">
          
          {/* Brand & Story */}
          <div className="space-y-3">
            <div>
              <span className="font-serif italic font-extrabold text-2xl text-gray-900 tracking-wide block">
                Skypiea
              </span>
              <span className="text-xs tracking-[0.2em] text-amber-700 uppercase font-bold">
                RESTAURANT · BY HIDEOUT CAFÉ
              </span>
            </div>
            <p className="text-xs text-gray-600 leading-relaxed font-normal">
              "{RESTAURANT_INFO.tagline}." Serving freshly prepared Indian Hearth dishes, artisan Italian pizzas, wok specialities and soothing brews in Gomti Nagar since 2015.
            </p>
            <div className="flex items-center gap-2 pt-1 text-xs text-amber-800 font-semibold">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
              <span>Veg & Non-Veg Multi-Cuisine</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-widest text-gray-900 font-bold block mb-3">
              Quick Links
            </span>
            <ul className="space-y-2 text-xs font-semibold text-gray-600">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-amber-700 transition-colors cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('menu')}
                  className="hover:text-amber-700 transition-colors cursor-pointer"
                >
                  Explore Menu (86 Items)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('original-cards')}
                  className="hover:text-amber-700 transition-colors cursor-pointer"
                >
                  Original Menu Cards
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-amber-700 transition-colors cursor-pointer"
                >
                  Contact & Directions
                </button>
              </li>
            </ul>
          </div>

          {/* Timings & Address */}
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-widest text-gray-900 font-bold block mb-3">
              Timings & Address
            </span>
            <div className="text-xs text-gray-600 space-y-2">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <p>{RESTAURANT_INFO.address}</p>
              </div>
              <p className="text-[11px] text-gray-500">
                Monday – Friday: {RESTAURANT_INFO.hours.weekdays}<br />
                Saturday – Sunday: {RESTAURANT_INFO.hours.weekends}
              </p>
              <div className="flex items-center gap-2 pt-1 text-gray-900">
                <Phone className="w-3.5 h-3.5 text-amber-600" />
                <span className="font-bold">{RESTAURANT_INFO.phone}</span>
              </div>
            </div>
          </div>

          {/* Table Reservations & WhatsApp */}
          <div className="space-y-3 flex flex-col justify-between">
            <div>
              <span className="text-xs uppercase tracking-widest text-gray-900 font-bold block mb-2">
                Reservations
              </span>
              <p className="text-xs text-gray-600 mb-3 leading-relaxed">
                Join us for family dinners, dates, or celebrations. Book online or message directly on WhatsApp.
              </p>
              
              <div className="space-y-2">
                <button
                  onClick={onOpenBooking}
                  className="w-full py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs uppercase tracking-wider rounded-md transition-colors text-center cursor-pointer shadow-xs"
                >
                  Book A Table Online
                </button>

                <button
                  onClick={handleWhatsAppClick}
                  className="w-full py-2 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 text-emerald-800 font-bold text-xs uppercase tracking-wider rounded-md transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                  <span>WhatsApp Booking</span>
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-2 pt-2">
              {onReturnToCover && (
                <button
                  onClick={onReturnToCover}
                  className="flex items-center gap-1.5 text-xs tracking-wider text-amber-700 hover:text-amber-900 transition-colors cursor-pointer font-bold self-start"
                >
                  <ArrowUp className="w-3.5 h-3.5 text-amber-600" />
                  <span>Back to Cover Page</span>
                </button>
              )}

              <button
                onClick={scrollToTop}
                className="flex items-center gap-1.5 text-xs tracking-wider text-gray-500 hover:text-gray-900 transition-colors cursor-pointer font-medium self-start"
              >
                <ArrowUp className="w-3.5 h-3.5" />
                <span>Scroll to Top</span>
              </button>
            </div>
          </div>

        </div>

        {/* Footer Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-3">
          <p>© {new Date().getFullYear()} {RESTAURANT_INFO.fullName}. All Rights Reserved.</p>
          <div className="flex items-center gap-3 font-medium">
            <span>Gomti Nagar, Lucknow</span>
            <span>·</span>
            <span>Since 2015</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
