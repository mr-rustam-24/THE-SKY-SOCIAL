import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { ChevronDown, Sparkles, Utensils, Calendar } from 'lucide-react';

// The Opening Full-Screen Cover Page
// Clean edge-to-edge cover screen without audio/mute button
export function OpeningCover({ onEnter }) {
  const [touchStartY, setTouchStartY] = useState(null);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);
  const containerRef = useRef(null);

  // Trigger smooth slide-up exit transition into the main website
  function triggerExit(targetTab = 'home') {
    if (isAnimatingOut) return;
    setIsAnimatingOut(true);
    setTimeout(() => {
      onEnter(targetTab);
    }, 450);
  }

  // Listen for mouse wheel (scroll down) and keyboard arrow keys
  useEffect(() => {
    let scrollDelta = 0;

    function handleWheel(e) {
      if (e.deltaY > 12) {
        scrollDelta += e.deltaY;
        if (scrollDelta > 20 && !isAnimatingOut) {
          triggerExit('home');
        }
      }
    }

    function handleKeyDown(e) {
      if ((e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ' || e.key === 'Enter') && !isAnimatingOut) {
        e.preventDefault();
        triggerExit('home');
      }
    }

    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isAnimatingOut]);

  // Touch handlers for mobile swipe
  function handleTouchStart(e) {
    setTouchStartY(e.touches[0].clientY);
  }

  function handleTouchMove(e) {
    if (touchStartY === null || isAnimatingOut) return;
    const deltaY = touchStartY - e.touches[0].clientY;
    if (Math.abs(deltaY) > 25) {
      triggerExit('home');
    }
  }

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{
        opacity: 0,
        y: -90,
        scale: 0.98,
        transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] }
      }}
      transition={{ duration: 0.55, ease: 'easeOut' }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      className="relative w-full h-screen h-[100dvh] overflow-hidden select-none bg-[#120f0c] text-[#f7eedf] flex items-center justify-center cursor-pointer"
      onClick={() => triggerExit('home')}
    >
      {/* 1. Full Screen Background Image (100% Edge-to-Edge) */}
      <motion.img
        src="/assets/images/restaurant_cover.png"
        alt="Restaurant Cover"
        initial={{ scale: 1.02 }}
        animate={{ scale: isAnimatingOut ? 1.08 : 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 w-full h-full object-cover object-center"
      />

      {/* 2. Soft Gradient Overlays for crystal clear UI */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-transparent to-black/75 pointer-events-none" />
      <div className="absolute inset-0 bg-black/10 pointer-events-none" />

      {/* 3. Top Floating Brand Pill (Without Mute button) */}
      <div
        className="absolute top-0 left-0 right-0 z-30 px-4 sm:px-8 py-4 sm:py-6 flex items-center justify-between"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-2 text-[11px] sm:text-xs font-semibold tracking-[0.2em] uppercase text-[#f3d2a2] bg-black/55 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15 shadow-lg">
          <Sparkles className="w-3.5 h-3.5 text-[#e2b87f]" />
          <span>Hideout Café · Lucknow</span>
        </div>
      </div>

      {/* 4. Bottom Controls & Animated Slide Indicator */}
      <div
        className="absolute bottom-6 sm:bottom-8 left-0 right-0 z-30 px-4 flex flex-col items-center justify-center text-center gap-3.5"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Action Buttons Row */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => triggerExit('menu')}
            className="px-6 py-2.5 sm:py-3 bg-[#c28c4e] hover:bg-[#a97539] text-[#1c1306] font-semibold text-xs sm:text-sm tracking-wider uppercase rounded-sm shadow-2xl transition-all transform hover:-translate-y-0.5 flex items-center gap-2 cursor-pointer"
          >
            <Utensils className="w-4 h-4" />
            <span>Enter Menu</span>
          </button>

          <button
            onClick={() => triggerExit('booking')}
            className="px-6 py-2.5 sm:py-3 bg-black/60 hover:bg-black/85 backdrop-blur-md border border-white/35 text-white font-medium text-xs sm:text-sm tracking-wider uppercase rounded-sm shadow-2xl transition-all flex items-center gap-2 cursor-pointer"
          >
            <Calendar className="w-4 h-4 text-[#e2b87f]" />
            <span>Book Table</span>
          </button>
        </div>

        {/* Slide/Scroll Indicator Button */}
        <button
          onClick={() => triggerExit('home')}
          className="flex items-center gap-2 text-[11px] sm:text-xs tracking-[0.22em] uppercase text-[#f7eedf] hover:text-[#e2b87f] transition-colors cursor-pointer pt-1 group bg-black/40 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10 shadow-md"
        >
          <span>Slide or Scroll Down To Enter</span>
          <motion.div
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronDown className="w-4 h-4 text-[#e2b87f]" />
          </motion.div>
        </button>
      </div>
    </motion.div>
  );
}
