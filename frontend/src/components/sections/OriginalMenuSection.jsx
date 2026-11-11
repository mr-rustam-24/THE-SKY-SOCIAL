import React, { useState } from 'react';
import { ZoomIn, ChevronLeft, ChevronRight, X, Eye, ChevronDown, ChevronUp } from 'lucide-react';
import { ORIGINAL_MENU_PAGES } from '../../data/restaurantData.js';

// Initial number of menu cards to show before user clicks "View More"
const INITIAL_CARD_LIMIT = 3;

// Gallery component showing original printed menu photos (Clean White Theme with View More / View Less)
export function OriginalMenuSection({ pages = ORIGINAL_MENU_PAGES }) {
  const [activePageIndex, setActivePageIndex] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);

  function handleOpenPage(index) {
    setActivePageIndex(index);
  }

  function handleCloseModal() {
    setActivePageIndex(null);
  }

  function handlePrev() {
    setActivePageIndex((prev) => (prev - 1 + pages.length) % pages.length);
  }

  function handleNext() {
    setActivePageIndex((prev) => (prev + 1) % pages.length);
  }

  const visiblePages = isExpanded
    ? pages
    : pages.slice(0, INITIAL_CARD_LIMIT);

  return (
    <section id="original-cards" className="py-12 sm:py-16 px-4 sm:px-8 bg-gray-50 text-gray-900 border-t border-gray-200">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <span className="text-xs font-bold tracking-widest text-amber-700 uppercase block mb-1.5">
            Authentic Printed Menu Cards
          </span>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-gray-900">
            Original Restaurant Menu
          </h2>
          <div className="w-12 h-1 bg-amber-600 mx-auto mt-2.5 mb-3 rounded-full" />
          <p className="text-xs sm:text-sm text-gray-600 font-normal leading-relaxed">
            Click on any menu card below to view it in full resolution. These are the exact printed cards served at Skypiea by Hideout Café.
          </p>
        </div>

        {/* Menu Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {visiblePages.map((page, index) => (
            <div
              key={page.id}
              onClick={() => handleOpenPage(index)}
              className="group bg-white rounded-xl overflow-hidden border border-gray-200 shadow-2xs hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 cursor-pointer flex flex-col"
            >
              {/* Menu Card Image Container */}
              <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
                <img
                  src={page.image}
                  alt={page.title}
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                
                {/* Hover overlay with zoom hint */}
                <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2 text-white">
                  <div className="px-3.5 py-1.5 bg-amber-600 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-md">
                    <ZoomIn className="w-4 h-4" />
                    <span>Click to Zoom</span>
                  </div>
                </div>
              </div>

              {/* Title & Description Below Image */}
              <div className="p-4 flex-1 flex flex-col justify-between bg-white border-t border-gray-100">
                <div>
                  <h3 className="font-serif font-bold text-base text-gray-900 group-hover:text-amber-700 transition-colors">
                    {page.title}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2 leading-relaxed">
                    {page.subtitle}
                  </p>
                </div>

                <div className="pt-3 mt-3 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-amber-700">
                  <span className="flex items-center gap-1">
                    <Eye className="w-3.5 h-3.5" />
                    <span>View Card</span>
                  </span>
                  <span className="text-[11px] text-gray-400 font-medium">Click to expand</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View More / View Less Toggle Button */}
        {pages.length > INITIAL_CARD_LIMIT && (
          <div className="mt-8 text-center">
            {isExpanded ? (
              <button
                onClick={() => {
                  setIsExpanded(false);
                  const elem = document.getElementById('original-cards');
                  if (elem) elem.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-white hover:bg-gray-100 text-gray-800 font-bold text-xs uppercase tracking-wider rounded-md border border-gray-300 shadow-2xs transition-all cursor-pointer"
              >
                <span>View Less Cards</span>
                <ChevronUp className="w-4 h-4 text-amber-600" />
              </button>
            ) : (
              <button
                onClick={() => setIsExpanded(true)}
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs uppercase tracking-wider rounded-md shadow-sm transition-all cursor-pointer transform hover:-translate-y-0.5"
              >
                <span>View More Menu Cards ({pages.length - INITIAL_CARD_LIMIT} More)</span>
                <ChevronDown className="w-4 h-4 text-white" />
              </button>
            )}
          </div>
        )}

      </div>

      {/* Full Screen Lightbox Modal for Zoom */}
      {activePageIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
          onClick={handleCloseModal}
        >
          <div
            className="relative max-w-4xl max-h-[92vh] w-full flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Toolbar */}
            <div className="w-full flex items-center justify-between text-white pb-3 px-2">
              <div>
                <span className="text-xs text-amber-400 font-bold uppercase tracking-wider block">
                  Original Menu Card
                </span>
                <h4 className="text-base sm:text-lg font-serif font-bold text-white">
                  {pages[activePageIndex].title}
                </h4>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleCloseModal}
                  aria-label="Close"
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* High-Resolution Image Container */}
            <div className="relative w-full max-h-[80vh] flex items-center justify-center overflow-auto rounded-lg bg-black/50 p-1 border border-white/10">
              <img
                src={pages[activePageIndex].image}
                alt={pages[activePageIndex].title}
                className="max-h-[78vh] w-auto object-contain rounded shadow-2xl"
              />

              {/* Prev Button */}
              <button
                onClick={handlePrev}
                aria-label="Previous"
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/60 hover:bg-black/90 border border-white/20 text-white flex items-center justify-center cursor-pointer shadow-lg transition-transform hover:scale-105"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Next Button */}
              <button
                onClick={handleNext}
                aria-label="Next"
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/60 hover:bg-black/90 border border-white/20 text-white flex items-center justify-center cursor-pointer shadow-lg transition-transform hover:scale-105"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Bottom Caption */}
            <p className="text-xs text-white/70 text-center mt-3">
              Tip: Use Left / Right arrows to browse through all menu cards.
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
