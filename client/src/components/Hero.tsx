import React from 'react';
import { Search, MapPin, Utensils, Calendar, Clock, Users, Sparkles, CheckCircle2 } from 'lucide-react';
import { SearchFilterState } from '../types/restaurant';

interface HeroProps {
  filterState: SearchFilterState;
  onFilterChange: (updates: Partial<SearchFilterState>) => void;
  onSearchSubmit: () => void;
  onSelectTag: (tag: string) => void;
  activeTag: string;
}

const NEIGHBORHOODS = [
  'All Neighborhoods',
  'Downtown Heritage Quarter',
  'SoHo Arts District',
  'Little Italy Promenade',
  'Financial & Waterfront District',
  'Uptown Cultural Park',
  'Harbor Promenade',
];

const CUISINE_OPTIONS = [
  'All Cuisines',
  'Italian',
  'Japanese & Sushi',
  'French Bistro',
  'Royal Indian',
  'Steakhouse & Grill',
  'Mediterranean & Greek',
];

const QUICK_TAGS = [
  'All Tables',
  'Michelin Guide',
  'Romantic',
  'Rooftop',
  'Omakase Counter',
  'Outdoor Patio',
  'Waterfront View',
  'Handmade Pasta',
];

export default function Hero({
  filterState,
  onFilterChange,
  onSearchSubmit,
  onSelectTag,
  activeTag,
}: HeroProps) {
  return (
    <div className="relative bg-stone-950 text-white overflow-hidden">
      {/* Background Image with Dark Vignette Gradient */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://plus.unsplash.com/premium_photo-1681841594224-ad729a249113?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8cmVzdGF1cmFudHxlbnwwfHwwfHx8MA%3D%3D"
          className="w-full h-full object-cover object-center opacity-30 scale-105 transform animate-in fade-in duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/80 to-stone-950/50" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-20 sm:pt-10 sm:pb-28">
        {/* Top Tagline Badge */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 text-amber-300 px-4 py-1.5 rounded-full text-xs font-semibold backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Curated Culinary Experiences • Real-Time Table Availability</span>
          </div>
        </div>

        {/* Main Heading */}
{/* Main Heading */}
<div className="text-center max-w-4xl mx-auto">
  <h1
  className="
    relative
    z-10
    m-0
    mx-auto
    w-full
    max-w-6xl
    px-4
    text-center
    text-3xl
    sm:text-5xl
    lg:text-6xl
    font-bold
    tracking-tight
    font-serif
    leading-tight
  "
>
  Reserve Unforgettable Tables at{" "}
 
  Top-Rated Restaurants

</h1>

  <p className="m-0 mt-0 text-stone-300 text-sm sm:text-lg max-w-2xl mx-auto font-light leading-normal">
    Discover award-winning tasting menus, intimate neighborhood bistros, and vibrant rooftop lounges.
    Guaranteed instant booking with zero reservation fees.
  </p>
</div>

        {/* Interactive Search Bar Widget */}
        <div className="mt-10 max-w-5xl mx-auto bg-white/95 backdrop-blur-md rounded-2xl sm:rounded-3xl p-3 sm:p-4 text-stone-900 shadow-2xl border border-stone-100/30">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {/* 1. Neighborhood / Location */}
            <div className="flex items-center gap-3 px-3 py-2.5 bg-stone-50 hover:bg-stone-100/80 rounded-xl border border-stone-200/60 transition-colors">
              <MapPin className="w-5 h-5 text-amber-600 shrink-0" />
              <div className="w-full">
                <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-wider">
                  Location
                </label>
                <select
                  value={filterState.city}
                  onChange={(e) => onFilterChange({ city: e.target.value })}
                  className="w-full bg-transparent text-xs sm:text-sm font-semibold text-stone-900 focus:outline-none cursor-pointer"
                >
                  {NEIGHBORHOODS.map((item) => (
                   <option
  key={item}
  value={item === 'All Neighborhoods' ? '' : item}
  className="bg-white text-black"
  style={{
    color: '#1a1918',
    backgroundColor: '#ffffff',
  }}
>
  {item}
</option>
                  ))}
                </select>
              </div>
            </div>

            {/* 2. Cuisine */}
            <div className="flex items-center gap-3 px-3 py-2.5 bg-stone-50 hover:bg-stone-100/80 rounded-xl border border-stone-200/60 transition-colors">
              <Utensils className="w-5 h-5 text-amber-600 shrink-0" />
              <div className="w-full">
                <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-wider">
                  Cuisine
                </label>
                <select
                  value={filterState.cuisine}
                  onChange={(e) => onFilterChange({ cuisine: e.target.value })}
                  className="w-full bg-transparent text-xs sm:text-sm font-semibold text-stone-900 focus:outline-none cursor-pointer"
                >
                  {CUISINE_OPTIONS.map((item) => (
                    <option
  key={item}
  value={item === 'All Cuisines' ? '' : item}
  className="bg-white text-black"
  style={{
    color: '#1c1917',
    backgroundColor: '#ffffff',
  }}
>
  {item}
</option>
                  ))}
                </select>
              </div>
            </div>

            {/* 3. Date Selection */}
            <div className="flex items-center gap-3 px-3 py-2.5 bg-stone-50 hover:bg-stone-100/80 rounded-xl border border-stone-200/60 transition-colors">
              <Calendar className="w-5 h-5 text-amber-600 shrink-0" />
              <div className="w-full">
                <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-wider">
                  Date
                </label>
                <select
                  value={filterState.date}
                  onChange={(e) => onFilterChange({ date: e.target.value })}
                  className="w-full bg-transparent text-xs sm:text-sm font-semibold text-stone-900 focus:outline-none cursor-pointer"
                >
                  <option value="Today">Today, Sep 4</option>
                  <option value="Tomorrow">Tomorrow, Sep 5</option>
                  <option value="This Weekend">This Saturday, Sep 6</option>
                  <option value="Next Week">Next Week</option>
                </select>
              </div>
            </div>

            {/* 4. Guests / Party Size */}
            <div className="flex items-center gap-3 px-3 py-2.5 bg-stone-50 hover:bg-stone-100/80 rounded-xl border border-stone-200/60 transition-colors">
              <Users className="w-5 h-5 text-amber-600 shrink-0" />
              <div className="w-full">
                <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-wider">
                  Guests
                </label>
                <select
                  value={filterState.guests}
                  onChange={(e) => onFilterChange({ guests: Number(e.target.value) })}
                  className="w-full bg-transparent text-xs sm:text-sm font-semibold text-stone-900 focus:outline-none cursor-pointer"
                >
                <option value={1} style={{ color: '#1c1917', backgroundColor: '#ffffff' }}>
  1 Guest (Solo)
</option>

<option value={2} style={{ color: '#1c1917', backgroundColor: '#ffffff' }}>
  2 Guests (Table for Two)
</option>

<option value={3} style={{ color: '#1c1917', backgroundColor: '#ffffff' }}>
  3 Guests
</option>

<option value={4} style={{ color: '#1c1917', backgroundColor: '#ffffff' }}>
  4 Guests (Small Party)
</option>

<option value={5} style={{ color: '#1c1917', backgroundColor: '#ffffff' }}>
  5 Guests
</option>

<option value={6} style={{ color: '#1c1917', backgroundColor: '#ffffff' }}>
  6 Guests (Large Group)
</option>

<option value={8} style={{ color: '#1c1917', backgroundColor: '#ffffff' }}>
  8+ Guests (Banquet)
</option>
                </select>
              </div>
            </div>

            {/* 5. Search Action Button */}
            <div className="flex items-center">
              <button
                onClick={onSearchSubmit}
                className="w-full h-full min-h-[50px] bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-amber-600/30 transition-all cursor-pointer active:scale-95"
              >
                <Search className="w-4 h-4" />
                <span>Find a Table</span>
              </button>
            </div>
          </div>

          {/* Quick Filters Pill Bar */}
          <div className="mt-3 pt-3 border-t border-stone-200/70 flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 text-xs">
            <span className="text-stone-500 font-semibold shrink-0 pl-1">Popular:</span>
            {QUICK_TAGS.map((tag) => {
              const isSelected = activeTag === tag || (tag === 'All Tables' && !activeTag);
              return (
                <button
                  key={tag}
                  onClick={() => onSelectTag(tag === 'All Tables' ? '' : tag)}
                  className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-amber-600 text-white'
                      : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                  }`}
                >
                  {tag}
                </button>
              );
            })}
          </div>
        </div>

        {/* Value Trust Stats */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-center border-t border-stone-800/80 pt-8">
          <div>
            <div className="text-2xl sm:text-3xl font-bold font-serif text-amber-400">250+</div>
            <div className="text-xs text-stone-400 mt-1">Curated Restaurants</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-bold font-serif text-white">120,000+</div>
            <div className="text-xs text-stone-400 mt-1">Tables Reserved</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-bold font-serif text-amber-400">4.9 / 5</div>
            <div className="text-xs text-stone-400 mt-1">Diner Satisfaction</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-bold font-serif text-white">100% Free</div>
            <div className="text-xs text-stone-400 mt-1">Instant Confirmation</div>
          </div>
        </div>
      </div>
    </div>
  );
}
