import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { OpeningCover } from './components/sections/OpeningCover.jsx';
import { Navigation } from './components/layout/Navigation.jsx';
import { HeroSection } from './components/sections/HeroSection.jsx';
import { FoodSection } from './components/sections/FoodSection.jsx';
import { OriginalMenuSection } from './components/sections/OriginalMenuSection.jsx';
import { ContactSection } from './components/sections/ContactSection.jsx';
import { Footer } from './components/layout/Footer.jsx';
import { BookingModal } from './components/booking/BookingModal.jsx';
import { AuthModal } from './components/auth/AuthModal.jsx';

// Main Application Component
export default function App() {
  // Screen mode: 'cover' (the initial slide cover page) or 'main' (the Indian restaurant website)
  const [activeScreen, setActiveScreen] = useState('cover');

  // Currently active section on the main website
  const [activeSection, setActiveSection] = useState('home');

  // Table reservation popup modal state (true = open, false = closed)
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  // Preferred seating zone
  const [bookingZone, setBookingZone] = useState('main_dining');

  // Login / Sign Up authentication modal state
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  // Logged-in user state (persisted in localStorage)
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('restaurant_active_user') || localStorage.getItem('skypiea_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Open reservation modal
  function handleOpenBooking(zone = 'main_dining') {
    setBookingZone(zone);
    setIsBookingOpen(true);
  }

  // Close reservation modal
  function handleCloseBooking() {
    setIsBookingOpen(false);
  }

  // Handle successful login or sign up
  function handleAuthSuccess(user) {
    setCurrentUser(user);
  }

  // Handle logout
  function handleLogout() {
    localStorage.removeItem('restaurant_active_user');
    localStorage.removeItem('skypiea_user');
    setCurrentUser(null);
  }

  // Called when the user slides down or clicks an action on the initial Opening Cover
  function handleCoverEnter(target = 'home') {
    setActiveScreen('main');

    if (target === 'booking') {
      setIsBookingOpen(true);
    } else if (target === 'menu') {
      setTimeout(() => {
        handleNavigate('menu');
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  // Return from main website back to the opening cover page
  function handleReturnToCover() {
    setActiveScreen('cover');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Smooth scroll to a section on the main page
  function handleNavigate(sectionId) {
    if (sectionId === 'cover') {
      handleReturnToCover();
      return;
    }

    setActiveSection(sectionId);

    if (sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  return (
    <div className="min-h-screen bg-white text-gray-900 selection:bg-amber-500/20 selection:text-gray-900 flex flex-col font-sans">
      
      <AnimatePresence mode="wait">
        {/* Screen 1: Full-screen Opening Cover Page (Slide/Scroll down to enter) */}
        {activeScreen === 'cover' ? (
          <OpeningCover
            key="cover-page"
            onEnter={handleCoverEnter}
          />
        ) : (
          /* Screen 2: Main Indian Restaurant Website Experience */
          <motion.div
            key="main-website"
            initial={{ opacity: 0, y: 70 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col min-h-screen"
          >
            {/* Top Navigation Bar with Login/Sign Up */}
            <Navigation
              activeSection={activeSection}
              onNavigate={handleNavigate}
              onOpenBooking={() => handleOpenBooking('main_dining')}
              onReturnToCover={handleReturnToCover}
              currentUser={currentUser}
              onOpenAuth={() => setIsAuthOpen(true)}
              onLogout={handleLogout}
            />

            {/* Main Page Sections */}
            <main className="flex-1">
              {/* Hero Slider with the 2 uploaded images & View Menu / Book Table buttons */}
              <section id="home">
                <HeroSection
                  onExploreMenu={() => handleNavigate('menu')}
                  onBookTable={() => handleOpenBooking('main_dining')}
                />
              </section>

              {/* Digital Menu Section (86 Handcrafted Dishes) */}
              <FoodSection
                onOpenBooking={() => handleOpenBooking('main_dining')}
                onOpenOriginalCards={() => handleNavigate('original-cards')}
              />

              {/* Original Printed Menu Cards Section */}
              <OriginalMenuSection />

              {/* Contact, Timings & Location Section */}
              <ContactSection
                onBookTable={() => handleOpenBooking('main_dining')}
              />
            </main>

            {/* Footer */}
            <Footer
              onNavigate={handleNavigate}
              onOpenBooking={() => handleOpenBooking('main_dining')}
              onReturnToCover={handleReturnToCover}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Table Reservation Popup Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={handleCloseBooking}
        initialZone={bookingZone}
        currentUser={currentUser}
      />

      {/* Login & Sign Up Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onAuthSuccess={handleAuthSuccess}
      />
    </div>
  );
}
