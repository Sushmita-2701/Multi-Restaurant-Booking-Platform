import React, { useState } from 'react';
import { UtensilsCrossed, CalendarCheck, Heart, Search, Menu, X, User, Sparkles, MapPin } from 'lucide-react';

interface HeaderProps {
  reservationCount: number;
  savedCount: number;
  onOpenBookings: () => void;
  onOpenSaved: () => void;
  onOpenSearch: () => void;
  onSelectCuisine: (cuisineId: string | null) => void;
  onOpenPartnerModal: () => void;
}

export default function Header({
  reservationCount,
  savedCount,
  onOpenBookings,
  onOpenSaved,
  onOpenSearch,
  onSelectCuisine,
  onOpenPartnerModal,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200/80 shadow-xs transition-all">
      {/* Top Banner Notice */}
      <div className="bg-amber-900 text-amber-50 text-xs py-1.5 px-4 text-center font-medium tracking-wide flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
        <span>Reserve tables at top Michelin & chef-driven restaurants with instant free confirmation.</span>
        <span className="hidden md:inline-block bg-amber-800/80 px-2 py-0.5 rounded-full text-[11px] font-semibold text-amber-200">
          No Booking Fees
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Brand Logo */}
          <div
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => {
              onSelectCuisine(null);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-600 to-amber-500 flex items-center justify-center text-white shadow-md shadow-amber-600/20 group-hover:scale-105 transition-transform duration-200">
              <UtensilsCrossed className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-2xl font-bold tracking-tight text-stone-900 font-serif">
                Hungry<span className="text-amber-600">Bear</span>
                </span>
                <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-1.5 py-0.5 rounded tracking-wide uppercase">
                  Reservations
                </span>
              </div>
              <p className="text-[11px] text-stone-500 hidden sm:block">Curated Dining & Fine Tables</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-stone-700">
            <button
              onClick={() => scrollToSection('restaurants-list')}
              className="hover:text-amber-600 transition-colors cursor-pointer"
            >
              Explore Tables
            </button>
            <button
              onClick={() => scrollToSection('cuisines-section')}
              className="hover:text-amber-600 transition-colors cursor-pointer"
            >
              Popular Cuisines
            </button>
            <button
              onClick={() => scrollToSection('special-offers')}
              className="hover:text-amber-600 transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <span>Special Offers</span>
              <span className="bg-red-50 text-red-600 text-[10px] font-bold px-1.5 py-0.2 rounded-full border border-red-200">
                Hot
              </span>
            </button>
            <button
              onClick={() => scrollToSection('how-it-works')}
              className="hover:text-amber-600 transition-colors cursor-pointer"
            >
              How It Works
            </button>
          </nav>

          {/* Right Action Icons & Buttons */}
          <div className="flex items-center gap-2.5 sm:gap-3.5">
            {/* Quick Search */}
            <button
              onClick={onOpenSearch}
              aria-label="Search restaurants"
              className="p-2 rounded-xl text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition-colors cursor-pointer flex items-center gap-2 text-xs font-medium border border-transparent hover:border-stone-200"
            >
              <Search className="w-4.5 h-4.5" />
              <span className="hidden xl:inline text-stone-500">Search restaurant or cuisine...</span>
            </button>

            {/* Saved Wishlist */}
            <button
              onClick={onOpenSaved}
              aria-label="Saved restaurants"
              className="relative p-2 rounded-xl text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition-colors cursor-pointer"
              title="Saved Restaurants"
            >
              <Heart className="w-5 h-5" />
              {savedCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] font-bold w-4.5 h-4.5 rounded-full flex items-center justify-center ring-2 ring-white">
                  {savedCount}
                </span>
              )}
            </button>

            {/* My Bookings Button */}
            <button
              onClick={onOpenBookings}
              className="relative flex items-center gap-2 bg-stone-900 hover:bg-stone-800 text-white px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all shadow-xs cursor-pointer active:scale-95"
            >
              <CalendarCheck className="w-4 h-4 text-amber-400" />
              <span className="hidden sm:inline">My Bookings</span>
              {reservationCount > 0 && (
                <span className="bg-amber-500 text-stone-950 font-bold text-[11px] px-1.5 py-0.5 rounded-full">
                  {reservationCount}
                </span>
              )}
            </button>

            {/* Partner Button */}
            <button
              onClick={onOpenPartnerModal}
              className="hidden lg:flex items-center gap-1.5 border border-amber-600/30 text-amber-800 hover:bg-amber-50 px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
            >
              <span>For Restaurants</span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-stone-600 hover:bg-stone-100 cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-stone-200 space-y-2 animate-in slide-in-from-top-2 duration-200">
            <button
              onClick={() => scrollToSection('restaurants-list')}
              className="w-full text-left px-3 py-2 text-sm font-medium text-stone-800 hover:bg-stone-100 rounded-lg"
            >
              Explore Tables
            </button>
            <button
              onClick={() => scrollToSection('cuisines-section')}
              className="w-full text-left px-3 py-2 text-sm font-medium text-stone-800 hover:bg-stone-100 rounded-lg"
            >
              Popular Cuisines
            </button>
            <button
              onClick={() => scrollToSection('special-offers')}
              className="w-full text-left px-3 py-2 text-sm font-medium text-stone-800 hover:bg-stone-100 rounded-lg"
            >
              Special Dining Offers
            </button>
            <button
              onClick={() => scrollToSection('how-it-works')}
              className="w-full text-left px-3 py-2 text-sm font-medium text-stone-800 hover:bg-stone-100 rounded-lg"
            >
              How It Works
            </button>
            <div className="pt-2 border-t border-stone-100 flex gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenPartnerModal();
                }}
                className="w-full py-2 bg-amber-50 text-amber-800 font-semibold text-xs rounded-lg text-center"
              >
                For Restaurants / Owners
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
