import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Utensils, Calendar } from 'lucide-react';
import { HERO_SLIDES } from '../../data/restaurantData.js';

// Hero Section Carousel
export function HeroSection({ onExploreMenu, onBookTable }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-advance slides every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  function handlePrev() {
    setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  }

  function handleNext() {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  }

  const slide = HERO_SLIDES[currentSlide];

  return (
    <div className="relative w-full h-[540px] sm:h-[600px] md:h-[650px] overflow-hidden bg-gray-900 text-white">
      {/* Background Images */}
      {HERO_SLIDES.map((item, index) => (
        <div
          key={item.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          <img
            src={item.image}
            alt={item.title}
            loading={index === 0 ? "eager" : "lazy"}
            fetchPriority={index === 0 ? "high" : "auto"}
            className="w-full h-full object-cover object-center brightness-[0.82] transition-transform duration-7000 ease-out"
          />
          {/* Subtle Clean Dark Gradient for text clarity */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/45" />
        </div>
      ))}

      {/* Centered Content */}
      <div className="relative z-20 h-full max-w-4xl mx-auto px-6 sm:px-12 flex flex-col items-center justify-center text-center">
        
        {/* Subtitle */}
        <p className="text-xs sm:text-sm md:text-base font-semibold tracking-[0.2em] uppercase text-amber-400 mb-3 drop-shadow-md">
          {slide.subtitle}
        </p>

        {/* Headline */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif font-bold tracking-tight text-white max-w-3xl leading-tight drop-shadow-lg mb-6 sm:mb-8">
          {slide.title}
        </h1>

        {/* Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={onExploreMenu}
            className="px-6 sm:px-7 py-3 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs sm:text-sm tracking-wider uppercase rounded-md shadow-lg transition-all transform hover:-translate-y-0.5 flex items-center gap-2 cursor-pointer"
          >
            <Utensils className="w-4 h-4" />
            <span>View Menu</span>
          </button>

          <button
            onClick={onBookTable}
            className="px-6 sm:px-7 py-3 bg-white/15 hover:bg-white/25 backdrop-blur-sm border-2 border-white text-white font-bold text-xs sm:text-sm tracking-wider uppercase rounded-md transition-all flex items-center gap-2 cursor-pointer"
          >
            <Calendar className="w-4 h-4 text-amber-400" />
            <span>Book A Table</span>
          </button>
        </div>
      </div>

      {/* Left Chevron */}
      <button
        onClick={handlePrev}
        aria-label="Previous Slide"
        className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-black/40 hover:bg-black/70 border border-white/30 text-white flex items-center justify-center transition-all cursor-pointer shadow-md group"
      >
        <ChevronLeft className="w-6 h-6 group-hover:-translate-x-0.5 transition-transform" />
      </button>

      {/* Right Chevron */}
      <button
        onClick={handleNext}
        aria-label="Next Slide"
        className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-black/40 hover:bg-black/70 border border-white/30 text-white flex items-center justify-center transition-all cursor-pointer shadow-md group"
      >
        <ChevronRight className="w-6 h-6 group-hover:translate-x-0.5 transition-transform" />
      </button>

      {/* Indicator Dots */}
      <div className="absolute bottom-6 left-0 right-0 z-30 flex items-center justify-center gap-2.5">
        {HERO_SLIDES.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`transition-all duration-300 rounded-full cursor-pointer ${
              index === currentSlide
                ? 'w-8 h-2.5 bg-amber-500'
                : 'w-2.5 h-2.5 bg-white/50 hover:bg-white/80'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
