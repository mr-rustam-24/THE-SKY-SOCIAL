import React, { useState } from 'react';
import { Menu, X, Calendar, User, LogOut } from 'lucide-react';
import { RESTAURANT_INFO } from '../../data/restaurantData.js';

// Clean, Student-Friendly White Navigation Bar with Login/Sign Up
export function Navigation({
  activeSection,
  onNavigate,
  onOpenBooking,
  onReturnToCover,
  currentUser,
  onOpenAuth,
  onLogout
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Clean nav links
  const NAV_LINKS = [
    { id: 'home', label: 'Home' },
    { id: 'menu', label: 'Menu' },
    { id: 'original-cards', label: 'Original Cards' },
    { id: 'contact', label: 'Contact Us' }
  ];

  function handleLinkClick(id) {
    setMobileMenuOpen(false);
    onNavigate(id);
  }

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-gray-200 text-gray-900 transition-all shadow-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-3 flex items-center justify-between gap-4">
        
        {/* Brand Logo - clicks to open Cover Page */}
        <button
          onClick={onReturnToCover}
          className="text-left group cursor-pointer flex items-center gap-3"
          title="Open Cover Page"
        >
          <div>
            <div className="flex items-baseline gap-2">
              <span className="font-serif italic font-extrabold text-2xl sm:text-3xl text-gray-900 tracking-wide group-hover:text-amber-600 transition-colors">
                Skypiea
              </span>
              <span className="text-xs sm:text-sm tracking-[0.2em] text-amber-600 font-bold uppercase">
                RESTAURANT
              </span>
            </div>
            <span className="text-xs text-gray-500 font-medium tracking-wider block -mt-0.5">
              by Hideout Café · Since 2015
            </span>
          </div>
        </button>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center gap-7 text-sm sm:text-base font-bold tracking-wider uppercase text-gray-700">
          {NAV_LINKS.map((link) => (
            <button
              key={link.id}
              onClick={() => handleLinkClick(link.id)}
              className={`transition-colors py-1 cursor-pointer hover:text-amber-600 ${
                activeSection === link.id
                  ? 'text-amber-600 border-b-2 border-amber-600 font-extrabold'
                  : ''
              }`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Action Buttons: Login / User Profile & Book Table */}
        <div className="hidden sm:flex items-center gap-3">
          
          {/* User Auth Status */}
          {currentUser ? (
            <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-md shadow-2xs">
              <div className="w-6 h-6 rounded-full bg-amber-600 text-white flex items-center justify-center text-xs font-extrabold">
                {currentUser.name.charAt(0).toUpperCase()}
              </div>
              <span className="text-xs font-bold text-gray-800">
                {currentUser.name.split(' ')[0]}
              </span>
              <button
                onClick={onLogout}
                title="Log Out"
                className="text-gray-400 hover:text-red-600 transition-colors ml-1 p-0.5 cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className="px-3.5 py-2 text-xs sm:text-sm font-bold text-gray-700 hover:text-amber-700 hover:bg-amber-50 rounded-md transition-all flex items-center gap-1.5 cursor-pointer border border-gray-300 shadow-2xs"
            >
              <User className="w-4 h-4 text-amber-600" />
              <span>Login / Sign Up</span>
            </button>
          )}

          {/* Book Table CTA */}
          <button
            onClick={onOpenBooking}
            className="px-5 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs sm:text-sm tracking-wider uppercase rounded-md shadow-sm transition-all flex items-center gap-2 cursor-pointer"
          >
            <Calendar className="w-4 h-4" />
            <span>Book Table</span>
          </button>
        </div>

        {/* Mobile Hamburger & User Button */}
        <div className="flex md:hidden items-center gap-2">
          {currentUser ? (
            <div className="w-8 h-8 rounded-full bg-amber-600 text-white flex items-center justify-center text-xs font-bold shadow-xs">
              {currentUser.name.charAt(0).toUpperCase()}
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className="p-1.5 text-gray-700 hover:text-amber-600"
              title="Login"
            >
              <User className="w-5 h-5 text-amber-600" />
            </button>
          )}

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
            className="p-2 text-gray-800 hover:text-amber-600 cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 px-6 py-5 space-y-3 shadow-lg">
          {NAV_LINKS.map((link) => (
            <button
              key={link.id}
              onClick={() => handleLinkClick(link.id)}
              className={`block w-full text-left py-2 text-sm font-bold tracking-wider uppercase transition-colors ${
                activeSection === link.id
                  ? 'text-amber-600 font-extrabold'
                  : 'text-gray-700 hover:text-amber-600'
              }`}
            >
              {link.label}
            </button>
          ))}

          {/* Mobile Auth Button */}
          <div className="pt-2 border-t border-gray-100 flex flex-col gap-2">
            {currentUser ? (
              <div className="flex items-center justify-between py-2 text-xs font-bold text-gray-800 bg-amber-50 px-3 rounded-md">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-amber-600" />
                  <span>{currentUser.name}</span>
                </div>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onLogout();
                  }}
                  className="text-red-600 font-bold flex items-center gap-1 cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAuth();
                }}
                className="w-full py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold text-xs uppercase tracking-wider rounded-md text-center border border-gray-300 shadow-2xs cursor-pointer flex items-center justify-center gap-1.5"
              >
                <User className="w-4 h-4 text-amber-600" />
                <span>Login / Sign Up</span>
              </button>
            )}

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs uppercase tracking-wider rounded-md text-center shadow-sm cursor-pointer"
            >
              Book Table Online
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
