import React, { useState } from 'react';
import {
  UtensilsCrossed,
  CalendarCheck,
  Heart,
  Search,
  Menu,
  X,
  Sparkles,
} from 'lucide-react';

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
      el.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  const handleLogoClick = () => {
    setMobileMenuOpen(false);
    onSelectCuisine(null);

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <header className="sticky top-0 z-50 w-full max-w-full overflow-x-clip bg-white/95 backdrop-blur-md border-b border-stone-200/80 shadow-sm">
      {/* ================= TOP BANNER ================= */}
      <div className="w-full bg-amber-900 text-amber-50 text-[11px] sm:text-xs py-1.5 px-3 sm:px-4 text-center font-medium tracking-wide">
        <div className="flex items-center justify-center gap-1.5 sm:gap-2">
          <Sparkles className="w-3.5 h-3.5 shrink-0 text-amber-300 animate-pulse" />

          <span className="truncate">
            Reserve tables at top Michelin & chef-driven restaurants
            <span className="hidden sm:inline">
              {' '}
              with instant free confirmation.
            </span>
          </span>

          <span className="hidden md:inline-flex shrink-0 bg-amber-800/80 px-2 py-0.5 rounded-full text-[11px] font-semibold text-amber-200">
            No Booking Fees
          </span>
        </div>
      </div>

      {/* ================= MAIN NAVBAR ================= */}
      <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-2 min-w-0 h-16 sm:h-[72px]">
          {/* ================= LOGO ================= */}
          <button
            type="button"
            onClick={handleLogoClick}
            className="flex items-center gap-2 sm:gap-3 cursor-pointer group min-w-0 flex-1 text-left"
            aria-label="Go to homepage"
          >
            {/* Logo Icon */}
            <div className="w-9 h-9 sm:w-10 sm:h-10 shrink-0 rounded-xl bg-gradient-to-tr from-amber-600 to-amber-500 flex items-center justify-center text-white shadow-md shadow-amber-600/20 group-hover:scale-105 transition-transform duration-200">
              <UtensilsCrossed className="w-5 h-5" />
            </div>

            {/* Logo Text */}
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 min-w-0">
                <span className="text-[20px] sm:text-2xl font-bold tracking-tight text-stone-900 font-serif whitespace-nowrap">
                  Hungry<span className="text-amber-600">Bear</span>
                </span>

                {/* Hide on small mobile */}
                <span className="hidden sm:inline-block bg-amber-100 text-amber-800 text-[10px] font-bold px-1.5 py-0.5 rounded tracking-wide uppercase whitespace-nowrap">
                  Reservations
                </span>
              </div>

              {/* Hide on mobile */}
              <p className="hidden sm:block text-[11px] text-stone-500">
                Curated Dining & Fine Tables
              </p>
            </div>
          </button>

          {/* ================= DESKTOP NAVIGATION ================= */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-7 text-sm font-medium text-stone-700 shrink-0">
            <button
              type="button"
              onClick={() => scrollToSection('restaurants-list')}
              className="hover:text-amber-600 transition-colors cursor-pointer whitespace-nowrap"
            >
              Explore Tables
            </button>

            <button
              type="button"
              onClick={() => scrollToSection('cuisines-section')}
              className="hover:text-amber-600 transition-colors cursor-pointer whitespace-nowrap"
            >
              Popular Cuisines
            </button>

            <button
              type="button"
              onClick={() => scrollToSection('special-offers')}
              className="hover:text-amber-600 transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap"
            >
              <span>Special Offers</span>

              <span className="bg-red-50 text-red-600 text-[10px] font-bold px-1.5 py-0.5 rounded-full border border-red-200">
                Hot
              </span>
            </button>

            <button
              type="button"
              onClick={() => scrollToSection('how-it-works')}
              className="hover:text-amber-600 transition-colors cursor-pointer whitespace-nowrap"
            >
              How It Works
            </button>
          </nav>

          {/* ================= RIGHT ACTIONS ================= */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            {/* Search */}
            <button
              type="button"
              onClick={onOpenSearch}
              aria-label="Search restaurants"
              title="Search restaurants"
              className="p-2 rounded-xl text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition-colors cursor-pointer shrink-0"
            >
              <Search className="w-5 h-5" />

              <span className="hidden xl:inline text-stone-500 text-xs ml-1">
                Search restaurant or cuisine...
              </span>
            </button>

            {/* Saved */}
            <button
              type="button"
              onClick={onOpenSaved}
              aria-label="Saved restaurants"
              title="Saved Restaurants"
              className="relative p-2 rounded-xl text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition-colors cursor-pointer shrink-0"
            >
              <Heart className="w-5 h-5" />

              {savedCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-rose-500 text-white text-[9px] font-bold min-w-4 h-4 px-1 rounded-full flex items-center justify-center ring-2 ring-white">
                  {savedCount}
                </span>
              )}
            </button>

            {/* My Bookings */}
            <button
              type="button"
              onClick={onOpenBookings}
              aria-label="My Bookings"
              title="My Bookings"
              className="
                relative
                flex
                items-center
                justify-center
                gap-2
                bg-stone-900
                hover:bg-stone-800
                text-white
                w-10
                h-10
                sm:w-auto
                sm:h-auto
                sm:px-3.5
                sm:py-2
                rounded-xl
                text-xs
                sm:text-sm
                font-semibold
                transition-all
                shadow-sm
                cursor-pointer
                active:scale-95
                shrink-0
              "
            >
              <CalendarCheck className="w-4.5 h-4.5 text-amber-400" />

              {/* Hide text on mobile */}
              <span className="hidden sm:inline whitespace-nowrap">
                My Bookings
              </span>

              {reservationCount > 0 && (
                <span
                  className="
                    absolute
                    -top-1
                    -right-1
                    sm:static
                    bg-amber-500
                    text-stone-950
                    font-bold
                    text-[10px]
                    sm:text-[11px]
                    min-w-4
                    h-4
                    px-1
                    rounded-full
                    flex
                    items-center
                    justify-center
                    ring-2
                    ring-white
                    sm:ring-0
                  "
                >
                  {reservationCount}
                </span>
              )}
            </button>

            {/* For Restaurants */}
            <button
              type="button"
              onClick={onOpenPartnerModal}
              className="
                hidden
                xl:flex
                items-center
                gap-1.5
                border
                border-amber-600/30
                text-amber-800
                hover:bg-amber-50
                px-3
                py-2
                rounded-xl
                text-xs
                font-semibold
                transition-colors
                cursor-pointer
                shrink-0
                whitespace-nowrap
              "
            >
              For Restaurants
            </button>

            {/* Mobile Menu */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={
                mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'
              }
              className="
                lg:hidden
                p-2
                rounded-lg
                text-stone-600
                hover:bg-stone-100
                cursor-pointer
                shrink-0
              "
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* ================= MOBILE MENU ================= */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-stone-200 py-3 sm:py-4 animate-in slide-in-from-top-2 duration-200">
            <div className="space-y-1">
              <button
                type="button"
                onClick={() => scrollToSection('restaurants-list')}
                className="w-full text-left px-3 py-3 text-sm font-medium text-stone-800 hover:bg-stone-100 rounded-lg transition-colors"
              >
                Explore Tables
              </button>

              <button
                type="button"
                onClick={() => scrollToSection('cuisines-section')}
                className="w-full text-left px-3 py-3 text-sm font-medium text-stone-800 hover:bg-stone-100 rounded-lg transition-colors"
              >
                Popular Cuisines
              </button>

              <button
                type="button"
                onClick={() => scrollToSection('special-offers')}
                className="w-full text-left px-3 py-3 text-sm font-medium text-stone-800 hover:bg-stone-100 rounded-lg transition-colors"
              >
                Special Dining Offers
              </button>

              <button
                type="button"
                onClick={() => scrollToSection('how-it-works')}
                className="w-full text-left px-3 py-3 text-sm font-medium text-stone-800 hover:bg-stone-100 rounded-lg transition-colors"
              >
                How It Works
              </button>
            </div>

            {/* Restaurant Partner */}
            <div className="pt-3 mt-2 border-t border-stone-100">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenPartnerModal();
                }}
                className="
                  w-full
                  py-2.5
                  bg-amber-50
                  hover:bg-amber-100
                  text-amber-800
                  font-semibold
                  text-xs
                  rounded-lg
                  text-center
                  transition-colors
                "
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