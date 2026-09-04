import React, { useState } from 'react';
import { Restaurant } from '../types/restaurant';
import { Search, X, Star, MapPin, ChevronRight, Utensils } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  restaurants: Restaurant[];
  onSelectRestaurant: (restaurant: Restaurant) => void;
  onOpenBooking: (restaurant: Restaurant) => void;
}

export default function SearchModal({
  isOpen,
  onClose,
  restaurants,
  onSelectRestaurant,
  onOpenBooking,
}: SearchModalProps) {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const filtered = query.trim()
    ? restaurants.filter(
        (r) =>
          r.name.toLowerCase().includes(query.toLowerCase()) ||
          r.cuisine.toLowerCase().includes(query.toLowerCase()) ||
          r.neighborhood.toLowerCase().includes(query.toLowerCase()) ||
          r.tags.some((t) => t.toLowerCase().includes(query.toLowerCase())) ||
          r.menu.some((m) => m.name.toLowerCase().includes(query.toLowerCase()))
      )
    : restaurants.slice(0, 4);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/75 backdrop-blur-xs flex items-start justify-center p-4 sm:p-6 pt-16 sm:pt-24 animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden">
        {/* Search Input Bar */}
        <div className="p-4 sm:p-5 border-b border-stone-200 flex items-center gap-3 bg-stone-50">
          <Search className="w-5 h-5 text-amber-600 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search restaurants, cuisines, dishes (e.g. Pasta, Sushi, Omakase)..."
            className="w-full bg-transparent text-sm sm:text-base font-semibold text-stone-900 focus:outline-none placeholder:text-stone-400"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-stone-400 hover:text-stone-700 p-1 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="px-3 py-1.5 text-xs font-semibold text-stone-600 hover:bg-stone-200/60 rounded-lg cursor-pointer"
          >
            Esc
          </button>
        </div>

        {/* Search Results List */}
        <div className="p-4 sm:p-5 max-h-[60vh] overflow-y-auto space-y-3">
          <div className="text-[11px] font-bold text-stone-400 uppercase tracking-wider px-1">
            {query.trim() ? `Search Results (${filtered.length})` : 'Popular Recommendations'}
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-10 text-stone-500 text-sm">
              No restaurants or dishes found matching &quot;{query}&quot;. Try searching for &quot;French&quot;, &quot;Italian&quot;, or &quot;Steakhouse&quot;.
            </div>
          ) : (
            filtered.map((restaurant) => (
              <div
                key={restaurant.id}
                onClick={() => {
                  onClose();
                  onSelectRestaurant(restaurant);
                }}
                className="p-3 rounded-2xl hover:bg-stone-50 border border-stone-100 hover:border-stone-200 transition-all flex items-center justify-between gap-3 cursor-pointer group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={restaurant.image}
                    alt={restaurant.name}
                    className="w-14 h-14 rounded-xl object-cover shrink-0 group-hover:scale-105 transition-transform"
                  />
                  <div className="min-w-0">
                    <h4 className="font-serif font-bold text-stone-900 text-sm group-hover:text-amber-700 transition-colors truncate">
                      {restaurant.name}
                    </h4>
                    <div className="flex items-center gap-2 text-xs text-stone-500 mt-0.5">
                      <span className="font-semibold text-amber-700">{restaurant.cuisine}</span>
                      <span>•</span>
                      <span className="flex items-center gap-0.5">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        {restaurant.rating}
                      </span>
                      <span>•</span>
                      <span>{restaurant.priceRange}</span>
                    </div>
                    <p className="text-[11px] text-stone-400 truncate mt-0.5 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-stone-400" />
                      <span>{restaurant.neighborhood}</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onClose();
                      onOpenBooking(restaurant);
                    }}
                    className="px-3 py-1.5 bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold rounded-lg shadow-xs cursor-pointer"
                  >
                    Book Table
                  </button>
                  <ChevronRight className="w-4 h-4 text-stone-400 group-hover:text-amber-600 transition-colors" />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
