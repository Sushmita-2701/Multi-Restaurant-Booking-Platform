import React from 'react';
import { Restaurant } from '../types/restaurant';
import { Star, MapPin, Clock, Heart, Award, Sparkles, ChevronRight, Eye } from 'lucide-react';

interface RestaurantCardProps {
  restaurant: Restaurant;
  isSaved: boolean;
  onToggleSave: (restaurantId: string) => void;
  onOpenBooking: (restaurant: Restaurant, preselectedSlot?: string) => void;
  onOpenDetails: (restaurant: Restaurant) => void;
}

export default function RestaurantCard({
  restaurant,
  isSaved,
  onToggleSave,
  onOpenBooking,
  onOpenDetails,
}: RestaurantCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col group">
      {/* Card Image Header */}
      <div className="relative aspect-[16/10] overflow-hidden bg-stone-100">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/60 via-transparent to-black/20" />

        {/* Badges on Top Left */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 items-center">
          {restaurant.michelinGuide && (
            <span className="bg-red-600 text-white text-[11px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-md">
              <Award className="w-3 h-3" />
              <span>Michelin</span>
            </span>
          )}
          <span className="bg-stone-900/80 backdrop-blur-md text-white text-[11px] font-medium px-2 py-0.5 rounded-full">
            {restaurant.cuisine}
          </span>
          <span className="bg-stone-900/80 backdrop-blur-md text-amber-300 text-[11px] font-bold px-2 py-0.5 rounded-full">
            {restaurant.priceRange}
          </span>
        </div>

        {/* Bookmark / Wishlist Heart on Top Right */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleSave(restaurant.id);
          }}
          aria-label={isSaved ? 'Remove from saved' : 'Save restaurant'}
          className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-md transition-all cursor-pointer ${
            isSaved
              ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/30'
              : 'bg-white/80 hover:bg-white text-stone-700 hover:text-rose-500 shadow-md'
          }`}
        >
          <Heart className={`w-4.5 h-4.5 ${isSaved ? 'fill-current' : ''}`} />
        </button>

        {/* Bottom Rating and Neighborhood overlay */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
          <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full font-semibold">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>{restaurant.rating}</span>
            <span className="text-stone-300 font-normal">({restaurant.reviewCount})</span>
          </div>
          <div className="flex items-center gap-1 text-stone-200 bg-black/50 backdrop-blur-md px-2 py-1 rounded-full text-[11px]">
            <MapPin className="w-3 h-3 text-amber-400" />
            <span>{restaurant.distance}</span>
          </div>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          {/* Restaurant Title and Tagline */}
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3
                onClick={() => onOpenDetails(restaurant)}
                className="text-lg font-bold font-serif text-stone-900 group-hover:text-amber-700 transition-colors cursor-pointer"
              >
                {restaurant.name}
              </h3>
              <p className="text-xs text-stone-500 font-medium mt-0.5 flex items-center gap-1">
                <span>{restaurant.neighborhood}</span>
              </p>
            </div>
          </div>

          <p className="text-xs text-stone-600 mt-2 line-clamp-2 leading-relaxed">
            {restaurant.tagline}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mt-3">
            {restaurant.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="bg-stone-100 text-stone-600 text-[10px] font-medium px-2 py-0.5 rounded-md"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Quick Booking Time Slots */}
        <div className="pt-3 border-t border-stone-100">
          <div className="flex items-center justify-between text-[11px] text-stone-500 font-semibold mb-2">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-amber-600" />
              <span>Available Table Slots:</span>
            </span>
            <span className="text-amber-700 font-bold text-[10px]">Instant Confirm</span>
          </div>

          <div className="grid grid-cols-3 gap-1.5">
            {restaurant.availableSlots.slice(0, 3).map((slot) => (
              <button
                key={slot}
                onClick={() => onOpenBooking(restaurant, slot)}
                className="py-1.5 px-2 rounded-lg bg-amber-50 hover:bg-amber-600 hover:text-white text-amber-900 border border-amber-200/60 text-xs font-bold transition-all text-center cursor-pointer shadow-2xs hover:shadow-xs active:scale-95"
                title={`Book for ${slot}`}
              >
                {slot}
              </button>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 pt-1">
          <button
            onClick={() => onOpenDetails(restaurant)}
            className="flex-1 py-2.5 px-3 rounded-xl border border-stone-200 hover:bg-stone-50 text-stone-800 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5 text-stone-500" />
            <span>View Menu</span>
          </button>

          <button
            onClick={() => onOpenBooking(restaurant)}
            className="flex-1 py-2.5 px-3 rounded-xl bg-gradient-to-r from-amber-700 to-amber-600 hover:from-amber-600 hover:to-amber-500 text-white text-xs font-bold flex items-center justify-center gap-1 shadow-md shadow-amber-600/20 transition-all cursor-pointer active:scale-95"
          >
            <span>Reserve Table</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
