import React, { useEffect, useState } from 'react';
import { Search, UtensilsCrossed, Sparkles, BookOpen, ChevronDown, ChevronUp } from 'lucide-react';
import { MENU_ITEMS } from '../../data/restaurantData.js';
import { getMenuItems } from '../../api/client.js';

// All Menu Categories
const CATEGORIES = [
  { id: 'all', label: 'All Items' },
  { id: 'indian_hearth', label: '🍛 Indian Hearth' },
  { id: 'small_plates', label: '🥗 Small Plates' },
  { id: 'wok', label: '🍜 From The Wok' },
  { id: 'pizza_pasta', label: '🍕 Pizza & Pasta' },
  { id: 'bowls_sandwiches', label: '🥪 Bowls & Sandwiches' },
  { id: 'signatures', label: '⭐ Signatures' },
  { id: 'beverages', label: '☕ Brews & Shakes' },
  { id: 'desserts', label: '🍰 Desserts' }
];

// Super compact: show only 4 items initially before expanding
const INITIAL_ITEM_LIMIT = 4;

// Clean Student-Friendly Menu Section with Soft Light Card Colors
export function FoodSection({ onOpenBooking, onOpenOriginalCards }) {
  const [menuItems, setMenuItems] = useState(MENU_ITEMS);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [dietaryFilter, setDietaryFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Controls whether the list is expanded or compact
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    let active = true;
    getMenuItems()
      .then((result) => { if (active && Array.isArray(result.items)) setMenuItems(result.items); })
      .catch((error) => console.warn('Using bundled menu because the API is unavailable:', error.message));
    return () => { active = false; };
  }, []);

  // Filter items based on Category, Veg/Non-Veg, and Search text
  const filteredItems = menuItems.filter((item) => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;

    let matchesDiet = true;
    if (dietaryFilter === 'veg') {
      matchesDiet = item.isVeg === true;
    } else if (dietaryFilter === 'nonveg') {
      matchesDiet = item.isVeg === false || item.hasNonVegOption === true;
    }

    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      query === '' ||
      item.name.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query) ||
      (item.subCategory && item.subCategory.toLowerCase().includes(query));

    return matchesCategory && matchesDiet && matchesSearch;
  });

  // Limit items shown unless expanded
  const visibleItems = isExpanded
    ? filteredItems
    : filteredItems.slice(0, INITIAL_ITEM_LIMIT);

  function handleCategoryChange(catId) {
    setSelectedCategory(catId);
    setIsExpanded(false);
  }

  function handleDietaryChange(diet) {
    setDietaryFilter(diet);
    setIsExpanded(false);
  }

  return (
    <section id="menu" className="py-10 sm:py-14 px-4 sm:px-8 bg-white text-gray-900">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Heading (Compact & Clean) */}
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 bg-amber-50 border border-amber-200 rounded-full text-[11px] font-bold text-amber-800 uppercase tracking-wider mb-2">
            <Sparkles className="w-3 h-3 text-amber-600" />
            <span>Skypiea Culinary Menu · 86 Dishes</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-gray-900 tracking-tight">
            Explore Our Menu
          </h2>

          <div className="w-12 h-1 bg-amber-600 mx-auto mt-2.5 mb-2.5 rounded-full" />

          <p className="text-xs sm:text-sm text-gray-600 font-normal leading-relaxed">
            Freshly prepared with love. Traditional Indian curries, artisan pizzas, wok specials, and artisan brews.
          </p>

          {/* Scanned menu cards button */}
          {onOpenOriginalCards && (
            <div className="mt-3">
              <button
                onClick={onOpenOriginalCards}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-800 text-[11px] font-bold uppercase tracking-wider rounded-md transition-colors cursor-pointer border border-gray-300 shadow-2xs"
              >
                <BookOpen className="w-3.5 h-3.5 text-amber-600" />
                <span>View Original Scanned Menu Cards</span>
              </button>
            </div>
          )}
        </div>

        {/* Search & Dietary Filters Bar (Compact) */}
        <div className="bg-gray-50 p-3.5 sm:p-4 rounded-xl border border-gray-200 shadow-2xs mb-6 space-y-3">
          
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            {/* Search Input Box */}
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
              <input
                type="text"
                placeholder="Search dish (e.g. Butter Chicken, Noodles)..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setIsExpanded(false);
                }}
                className="w-full pl-9 pr-4 py-2 text-xs bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 text-gray-900 placeholder-gray-400 shadow-2xs"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] font-bold text-gray-400 hover:text-gray-700 cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Dietary Filter (All / Veg / Non-Veg) */}
            <div className="flex items-center gap-1.5 self-start sm:self-auto">
              <span className="text-[11px] text-gray-500 font-bold mr-1">Filter:</span>

              {/* All */}
              <button
                onClick={() => handleDietaryChange('all')}
                className={`px-3 py-1 rounded text-[11px] font-bold tracking-wider uppercase transition-colors cursor-pointer ${
                  dietaryFilter === 'all'
                    ? 'bg-gray-900 text-white shadow-2xs'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                }`}
              >
                All
              </button>

              {/* Veg Only */}
              <button
                onClick={() => handleDietaryChange('veg')}
                className={`flex items-center gap-1 px-3 py-1 rounded text-[11px] font-bold tracking-wider uppercase transition-colors cursor-pointer ${
                  dietaryFilter === 'veg'
                    ? 'bg-emerald-600 text-white shadow-2xs'
                    : 'bg-white text-emerald-700 hover:bg-emerald-50 border border-emerald-300'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-emerald-600" />
                <span>Veg Only</span>
              </button>

              {/* Non-Veg Only */}
              <button
                onClick={() => handleDietaryChange('nonveg')}
                className={`flex items-center gap-1 px-3 py-1 rounded text-[11px] font-bold tracking-wider uppercase transition-colors cursor-pointer ${
                  dietaryFilter === 'nonveg'
                    ? 'bg-red-600 text-white shadow-2xs'
                    : 'bg-white text-red-700 hover:bg-red-50 border border-red-300'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-red-600" />
                <span>Non-Veg</span>
              </button>
            </div>
          </div>

          {/* Category Pills (Compact) */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-0.5 no-scrollbar">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                className={`px-3 py-1.5 rounded-full text-[11px] font-bold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-amber-600 text-white shadow-2xs'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

        </div>

        {/* Counter Info */}
        <div className="flex items-center justify-between text-[11px] text-gray-500 mb-4 px-1 font-medium">
          <span>
            Showing <strong className="text-gray-900 font-bold">{visibleItems.length}</strong> of{' '}
            <strong className="text-gray-900 font-bold">{filteredItems.length}</strong> dishes
          </span>
          <span>
            All prices in INR (₹)
          </span>
        </div>

        {/* Menu Cards Grid with Light Pastel Card Colors */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-xl border border-gray-200 p-6">
            <UtensilsCrossed className="w-8 h-8 text-amber-600 mx-auto mb-2 opacity-60" />
            <h4 className="text-base font-bold text-gray-900">No dishes found</h4>
            <p className="text-xs text-gray-500 mt-1 max-w-sm mx-auto">
              Try searching with another keyword or reset the filter.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setDietaryFilter('all');
                setIsExpanded(false);
              }}
              className="mt-3 px-3.5 py-1.5 bg-gray-900 text-white text-xs font-bold rounded uppercase tracking-wider cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4">
              {visibleItems.map((item) => (
                <div
                  key={item.id}
                  className={`p-3.5 sm:p-4 rounded-xl border transition-all duration-200 flex flex-col justify-between group shadow-2xs hover:shadow-xs ${
                    item.isVeg
                      ? 'bg-gradient-to-br from-[#f7faf5] to-[#f0f6ec] border-emerald-200/80 hover:border-emerald-300 border-l-4 border-l-emerald-600'
                      : 'bg-gradient-to-br from-[#fdf7f2] to-[#faf0e6] border-amber-200/80 hover:border-amber-300 border-l-4 border-l-amber-600'
                  }`}
                >
                  <div>
                    {/* Top line: Veg/Non-Veg icon + Item Name + Price */}
                    <div className="flex items-start justify-between gap-2.5">
                      <div className="flex items-start gap-2 flex-1">
                        {/* Standard Indian Veg/Non-Veg icon */}
                        <div className="shrink-0 mt-0.5">
                          {item.isVeg ? (
                            <div className="w-3.5 h-3.5 border-2 border-emerald-600 flex items-center justify-center p-0.5 rounded-2xs bg-white" title="Pure Vegetarian">
                              <div className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                            </div>
                          ) : (
                            <div className="w-3.5 h-3.5 border-2 border-red-600 flex items-center justify-center p-0.5 rounded-2xs bg-white" title="Non-Vegetarian">
                              <div className="w-1.5 h-1.5 rounded-full bg-red-600" />
                            </div>
                          )}
                        </div>

                        <div>
                          <h3 className="font-serif font-bold text-sm sm:text-base text-gray-900 group-hover:text-amber-800 transition-colors leading-snug">
                            {item.name}
                          </h3>
                          {item.subCategory && (
                            <span className="text-[10px] font-semibold text-gray-500 tracking-wide block">
                              {item.subCategory}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Price Tag with clean light pill */}
                      <div className="text-right shrink-0">
                        <span className="font-serif text-sm sm:text-base font-extrabold text-amber-800 bg-white/80 px-2 py-0.5 rounded-md border border-gray-200/60 shadow-2xs block">
                          {item.priceDisplay}
                        </span>
                      </div>
                    </div>

                    {/* Description (compact 2-line clamp) */}
                    <p className="text-xs text-gray-600 font-normal leading-relaxed mt-1.5 pl-5.5 line-clamp-2">
                      {item.description}
                    </p>
                  </div>

                  {/* Bottom Card Footer */}
                  <div className="mt-2.5 pt-2 border-t border-gray-200/60 flex items-center justify-between text-xs pl-5.5">
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider bg-white/70 px-2 py-0.5 rounded border border-gray-200/40">
                      {item.category.replace('_', ' ')}
                    </span>
                    
                    <button
                      onClick={onOpenBooking}
                      className="text-xs font-bold text-amber-700 hover:text-amber-900 transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <span>Reserve</span>
                      <span>→</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* View More / View Less Toggle Button */}
            {filteredItems.length > INITIAL_ITEM_LIMIT && (
              <div className="mt-6 text-center">
                {isExpanded ? (
                  <button
                    onClick={() => {
                      setIsExpanded(false);
                      const menuElem = document.getElementById('menu');
                      if (menuElem) menuElem.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-white hover:bg-gray-100 text-gray-800 font-bold text-xs uppercase tracking-wider rounded-md border border-gray-300 shadow-2xs transition-all cursor-pointer"
                  >
                    <span>View Less Dishes</span>
                    <ChevronUp className="w-4 h-4 text-amber-600" />
                  </button>
                ) : (
                  <button
                    onClick={() => setIsExpanded(true)}
                    className="inline-flex items-center gap-2 px-6 py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs uppercase tracking-wider rounded-md shadow-sm transition-all cursor-pointer transform hover:-translate-y-0.5"
                  >
                    <span>View More Dishes ({filteredItems.length - INITIAL_ITEM_LIMIT} More)</span>
                    <ChevronDown className="w-4 h-4 text-white" />
                  </button>
                )}
              </div>
            )}
          </div>
        )}

        {/* Bottom Banner (Compact) */}
        <div className="mt-8 p-5 sm:p-6 bg-amber-50 rounded-xl border border-amber-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <h4 className="text-lg font-serif font-bold text-gray-900">
              Planning a visit with family or friends?
            </h4>
            <p className="text-xs text-gray-600 mt-0.5 font-normal">
              Book your table online in advance for priority seating.
            </p>
          </div>
          <button
            onClick={onOpenBooking}
            className="px-5 py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs uppercase tracking-wider rounded-md shadow-xs transition-colors cursor-pointer shrink-0"
          >
            Reserve Table Now
          </button>
        </div>

      </div>
    </section>
  );
}
