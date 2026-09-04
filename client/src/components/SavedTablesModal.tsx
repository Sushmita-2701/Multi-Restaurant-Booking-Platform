import React from 'react';
import { Restaurant } from '../types/restaurant';
import { X, Heart, Star, MapPin, Trash2, Utensils } from 'lucide-react';

interface SavedTablesModalProps {
  isOpen: boolean;
  onClose: () => void;
  savedRestaurants: Restaurant[];
  onRemoveSaved: (id: string) => void;
  onOpenBooking: (restaurant: Restaurant) => void;
}

export default function SavedTablesModal({
  isOpen,
  onClose,
  savedRestaurants,
  onRemoveSaved,
  onOpenBooking,
}: SavedTablesModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="p-5 border-b border-stone-200 bg-stone-50 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
              <Heart className="w-4 h-4 fill-current" />
            </div>
            <div>
              <h2 className="text-base font-bold font-serif text-stone-900">Saved Restaurants</h2>
              <p className="text-xs text-stone-500">
                {savedRestaurants.length} {savedRestaurants.length === 1 ? 'place' : 'places'} saved for later
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-200/60 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto flex-1 space-y-3">
          {savedRestaurants.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <div className="w-12 h-12 rounded-full bg-stone-100 text-stone-400 flex items-center justify-center mx-auto">
                <Heart className="w-6 h-6" />
              </div>
              <p className="text-sm font-semibold text-stone-700">No saved restaurants yet</p>
              <p className="text-xs text-stone-500 max-w-xs mx-auto">
                Click the heart icon on any restaurant card to bookmark your dream tables and tasting menus.
              </p>
            </div>
          ) : (
            savedRestaurants.map((restaurant) => (
              <div
                key={restaurant.id}
                className="p-3.5 rounded-2xl border border-stone-200 bg-stone-50/60 hover:bg-white transition-all flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={restaurant.image}
                    alt={restaurant.name}
                    className="w-16 h-16 rounded-xl object-cover shrink-0"
                  />
                  <div className="min-w-0">
                    <h4 className="font-serif font-bold text-stone-900 text-sm truncate">
                      {restaurant.name}
                    </h4>
                    <div className="flex items-center gap-1.5 text-xs text-stone-500 mt-0.5">
                      <span className="font-medium text-amber-700">{restaurant.cuisine}</span>
                      <span>•</span>
                      <span className="flex items-center gap-0.5">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        {restaurant.rating}
                      </span>
                    </div>
                    <p className="text-[11px] text-stone-400 truncate mt-0.5 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-stone-400 shrink-0" />
                      <span>{restaurant.neighborhood}</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => {
                      onClose();
                      onOpenBooking(restaurant);
                    }}
                    className="px-3 py-1.5 bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold rounded-lg shadow-xs cursor-pointer"
                  >
                    Book Table
                  </button>
                  <button
                    onClick={() => onRemoveSaved(restaurant.id)}
                    className="p-1.5 text-stone-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                    title="Remove from saved"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
