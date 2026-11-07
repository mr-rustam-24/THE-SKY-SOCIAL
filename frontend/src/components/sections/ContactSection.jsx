import React from 'react';
import { MapPin, Phone, MessageCircle, Clock, Calendar, ExternalLink } from 'lucide-react';
import { RESTAURANT_INFO } from '../../data/restaurantData.js';

// Contact & Location section (Clean White Theme)
export function ContactSection({ onBookTable }) {
  function handleWhatsAppClick() {
    const text = encodeURIComponent("Hello Skypiea by Hideout Café! I would like to reserve a table for lunch/dinner.");
    window.open(`https://wa.me/${RESTAURANT_INFO.whatsapp}?text=${text}`, '_blank');
  }

  return (
    <section id="contact" className="py-16 sm:py-20 px-4 sm:px-8 bg-white text-gray-900 border-t border-gray-200">
      <div className="max-w-6xl mx-auto">
        
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold tracking-widest text-amber-700 uppercase block mb-2">
            Visit Us or Get in Touch
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-gray-900">
            Contact & Location
          </h2>
          <div className="w-16 h-1 bg-amber-600 mx-auto mt-3 mb-4 rounded-full" />
          <p className="text-sm text-gray-600 font-normal leading-relaxed">
            We are conveniently located in Vibhuti Khand, Gomti Nagar, Lucknow. Feel free to reach out directly for reservations, private parties, or events.
          </p>
        </div>

        {/* 3 Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          
          {/* Card 1: Address */}
          <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 shadow-xs text-center flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 mx-auto rounded-full bg-amber-100 border border-amber-200 flex items-center justify-center text-amber-700">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-lg text-gray-900">
                Our Location
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                {RESTAURANT_INFO.address}
              </p>
              <p className="text-xs text-amber-700 font-bold">
                Gomti Nagar, Lucknow
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-gray-200">
              <a
                href="https://maps.google.com/?q=Gomti+Nagar+Lucknow"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 hover:text-amber-800 transition-colors"
              >
                <span>Open in Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Card 2: Contact & WhatsApp */}
          <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 shadow-xs text-center flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 mx-auto rounded-full bg-amber-100 border border-amber-200 flex items-center justify-center text-amber-700">
                <Phone className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-lg text-gray-900">
                Call & WhatsApp
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Reservations & Catering inquiries:
              </p>
              <p className="font-serif text-lg font-extrabold text-gray-900">
                {RESTAURANT_INFO.phone}
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-gray-200">
              <button
                onClick={handleWhatsAppClick}
                className="w-full py-2.5 bg-[#25D366] hover:bg-[#20b858] text-white text-xs font-bold uppercase tracking-wider rounded-md flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-xs"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </button>
            </div>
          </div>

          {/* Card 3: Hours */}
          <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 shadow-xs text-center flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 mx-auto rounded-full bg-amber-100 border border-amber-200 flex items-center justify-center text-amber-700">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-lg text-gray-900">
                Opening Hours
              </h3>
              <div className="text-xs text-gray-600 space-y-1">
                <p>
                  <strong className="text-gray-900">Monday – Friday:</strong><br />
                  {RESTAURANT_INFO.hours.weekdays}
                </p>
                <p className="pt-1">
                  <strong className="text-gray-900">Saturday – Sunday:</strong><br />
                  {RESTAURANT_INFO.hours.weekends}
                </p>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-gray-200">
              <button
                onClick={onBookTable}
                className="w-full py-2.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold uppercase tracking-wider rounded-md flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-xs"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Table Online</span>
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
