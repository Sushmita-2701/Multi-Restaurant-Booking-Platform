import React, { useState } from 'react';
import { Restaurant } from '../types/restaurant';
import {
  X,
  Star,
  MapPin,
  Clock,
  Award,
  Heart,
  Phone,
  Car,
  Sparkles,
  UtensilsCrossed,
  ShieldCheck,
  ChefHat,
} from 'lucide-react';

interface RestaurantDetailsModalProps {
  restaurant: Restaurant | null;
  isOpen: boolean;
  onClose: () => void;
  isSaved: boolean;
  onToggleSave: (id: string) => void;
  onOpenBooking: (restaurant: Restaurant) => void;
}

export default function RestaurantDetailsModal({
  restaurant,
  isOpen,
  onClose,
  isSaved,
  onToggleSave,
  onOpenBooking,
}: RestaurantDetailsModalProps) {
  const [activeTab, setActiveTab] = useState<'menu' | 'about' | 'reviews'>('menu');
  const [activeMenuCategory, setActiveMenuCategory] = useState<string>('All');

  if (!isOpen || !restaurant) return null;

  const categories = ['All', ...Array.from(new Set(restaurant.menu.map((m) => m.category)))];
  const filteredMenu =
    activeMenuCategory === 'All'
      ? restaurant.menu
      : restaurant.menu.filter((m) => m.category === activeMenuCategory);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden max-h-[92vh] flex flex-col">
        {/* Header Hero Banner with Gallery */}
        <div className="relative h-64 sm:h-72 bg-stone-900 shrink-0">
          <img
            src={restaurant.image}
            alt={restaurant.name}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/40 to-black/30" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Save / Wishlist Button */}
          <button
            onClick={() => onToggleSave(restaurant.id)}
            className={`absolute top-4 right-16 w-9 h-9 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
              isSaved ? 'bg-rose-500 text-white' : 'bg-black/60 hover:bg-black/90 text-white'
            }`}
          >
            <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
          </button>

          {/* Bottom Restaurant Info inside Image */}
          <div className="absolute bottom-4 left-6 right-6 text-white flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                {restaurant.michelinGuide && (
                  <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                    <Award className="w-3 h-3" />
                    <span>Michelin Guide</span>
                  </span>
                )}
                <span className="bg-white/20 backdrop-blur-md text-[11px] font-medium px-2 py-0.5 rounded-full">
                  {restaurant.cuisine}
                </span>
                <span className="bg-amber-400 text-stone-950 text-[11px] font-bold px-2 py-0.5 rounded-full">
                  {restaurant.priceRange}
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold font-serif">{restaurant.name}</h2>
              <p className="text-xs text-stone-300 mt-1 flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                <span>{restaurant.address}</span>
              </p>
            </div>

            <div className="flex items-center gap-2">
              <div className="bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-xl flex items-center gap-1.5">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span className="font-bold text-sm">{restaurant.rating}</span>
                <span className="text-xs text-stone-400">({restaurant.reviewCount} reviews)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center border-b border-stone-200 px-6 bg-stone-50 text-xs font-bold uppercase tracking-wider shrink-0">
          <button
            onClick={() => setActiveTab('menu')}
            className={`py-3.5 border-b-2 mr-6 transition-colors cursor-pointer ${
              activeTab === 'menu'
                ? 'border-amber-600 text-amber-700'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            Digital Menu ({restaurant.menu.length})
          </button>
          <button
            onClick={() => setActiveTab('about')}
            className={`py-3.5 border-b-2 mr-6 transition-colors cursor-pointer ${
              activeTab === 'about'
                ? 'border-amber-600 text-amber-700'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            Chef & Ambience
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`py-3.5 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'reviews'
                ? 'border-amber-600 text-amber-700'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            Guest Reviews ({restaurant.reviews.length})
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {/* TAB 1: Digital Menu */}
          {activeTab === 'menu' && (
            <div className="space-y-4">
              {/* Category Pills */}
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 text-xs">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveMenuCategory(cat)}
                    className={`px-3 py-1 rounded-full font-semibold transition-colors cursor-pointer ${
                      activeMenuCategory === cat
                        ? 'bg-amber-600 text-white'
                        : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Menu Items Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredMenu.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl border border-stone-200 bg-stone-50/50 hover:bg-white hover:shadow-md transition-all flex flex-col justify-between space-y-2"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-serif font-bold text-stone-900 text-sm">{item.name}</h4>
                          {item.tag && (
                            <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                              {item.tag}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                      <span className="font-bold text-amber-700 text-sm shrink-0">{item.price}</span>
                    </div>
                    <div className="text-[10px] font-semibold text-stone-400 uppercase tracking-wide">
                      {item.category}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: About & Practical Details */}
          {activeTab === 'about' && (
            <div className="space-y-6">
              <div>
                <h3 className="font-serif font-bold text-stone-900 text-lg mb-2">The Culinary Story</h3>
                <p className="text-stone-600 text-sm leading-relaxed">{restaurant.description}</p>
              </div>

              {/* Chef Spotlight */}
              <div className="bg-amber-50/60 border border-amber-200/70 rounded-2xl p-4 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-amber-600/10 text-amber-700 flex items-center justify-center shrink-0">
                  <ChefHat className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs font-bold text-amber-900 uppercase tracking-wide">Executive Chef</div>
                  <div className="font-serif font-bold text-stone-900 text-base">{restaurant.chef}</div>
                  <div className="text-xs text-stone-600 mt-0.5">
                    Curating seasonal culinary tasting flights and farm-to-table experiences.
                  </div>
                </div>
              </div>

              {/* Info Matrix */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 space-y-1">
                  <div className="font-bold text-stone-700 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-amber-600" />
                    <span>Operating Hours</span>
                  </div>
                  <div className="text-stone-600">{restaurant.hours}</div>
                </div>

                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 space-y-1">
                  <div className="font-bold text-stone-700 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-amber-600" />
                    <span>Direct Concierge</span>
                  </div>
                  <div className="text-stone-600">{restaurant.phone}</div>
                </div>

                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 space-y-1">
                  <div className="font-bold text-stone-700 flex items-center gap-1.5">
                    <Car className="w-3.5 h-3.5 text-amber-600" />
                    <span>Valet & Parking</span>
                  </div>
                  <div className="text-stone-600">{restaurant.parking}</div>
                </div>

                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 space-y-1">
                  <div className="font-bold text-stone-700 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                    <span>Dress Code</span>
                  </div>
                  <div className="text-stone-600">{restaurant.dressCode}</div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Reviews */}
          {activeTab === 'reviews' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between bg-stone-50 p-4 rounded-2xl border border-stone-200">
                <div className="flex items-center gap-3">
                  <div className="text-3xl font-serif font-bold text-stone-900">{restaurant.rating}</div>
                  <div>
                    <div className="flex text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <div className="text-xs text-stone-500 mt-0.5">Based on {restaurant.reviewCount} verified diners</div>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-emerald-700 text-xs font-semibold bg-emerald-50 px-3 py-1.5 rounded-xl">
                  <ShieldCheck className="w-4 h-4" />
                  <span>100% Verified Reservations</span>
                </div>
              </div>

              <div className="space-y-3">
                {restaurant.reviews.map((rev) => (
                  <div key={rev.id} className="p-4 rounded-2xl border border-stone-200 bg-white space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={rev.userAvatar}
                          alt={rev.userName}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <div>
                          <div className="font-bold text-stone-900 text-xs">{rev.userName}</div>
                          <div className="text-[10px] text-stone-400">{rev.date}</div>
                        </div>
                      </div>
                      {rev.tag && (
                        <span className="bg-stone-100 text-stone-600 text-[10px] font-medium px-2 py-0.5 rounded-full">
                          {rev.tag}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-stone-700 leading-relaxed">{rev.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer CTA Bar */}
        <div className="p-4 sm:p-6 bg-stone-50 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div>
            <div className="text-xs text-stone-500">Fast confirmation • Instant guaranteed seating</div>
            <div className="text-sm font-bold text-stone-900 font-serif">
              Reserve your table at {restaurant.name}
            </div>
          </div>

          <button
            onClick={() => {
              onClose();
              onOpenBooking(restaurant);
            }}
            className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-bold text-sm rounded-xl shadow-lg shadow-amber-600/30 transition-all cursor-pointer active:scale-95"
          >
            Reserve Table Now
          </button>
        </div>
      </div>
    </div>
  );
}
