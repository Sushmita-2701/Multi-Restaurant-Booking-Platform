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
      <div className="w-full bg-amber-900 text-amber-50">
        <div className="mx-auto flex min-h-[30px] w-full max-w-7xl items-center justify-center gap-2 px-3 py-1 text-center text-[10px] font-medium tracking-wide sm:text-xs">
          <Sparkles className="h-3.5 w-3.5 shrink-0 text-amber-300" />

          <span className="truncate">
            Reserve tables at top Michelin & chef-driven restaurants
            <span className="hidden sm:inline">
              {' '}
              with instant free confirmation.
            </span>
          </span>

          <span className="hidden shrink-0 rounded-full bg-amber-800/80 px-2 py-0.5 text-[10px] font-semibold text-amber-200 sm:inline-block">
            No Booking Fees
          </span>
        </div>
      </div>

      {/* ================= MAIN NAVBAR ================= */}
      <div className="mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-8">
        <div className="flex h-[72px] w-full items-center gap-3">

          {/* ================= LOGO ================= */}
          <button
            type="button"
            onClick={handleLogoClick}
            className="
              group
              flex
              w-[220px]
              shrink-0
              items-center
              gap-3
              text-left
              cursor-pointer
              xl:w-[240px]
            "
            aria-label="Go to homepage"
          >
            {/* Logo Icon */}
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-amber-600 to-amber-500 text-white shadow-md shadow-amber-600/20 transition-transform duration-200 group-hover:scale-105">
              <UtensilsCrossed className="h-5 w-5" />
            </div>

            {/* Logo Text */}
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="whitespace-nowrap font-serif text-[21px] font-bold tracking-tight text-stone-900 xl:text-2xl">
                  Hungry<span className="text-amber-600">Bear</span>
                </span>

                <span className="hidden whitespace-nowrap rounded bg-amber-100 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide text-amber-800 xl:inline-block">
                  Reservations
                </span>
              </div>

              <p className="hidden text-[11px] leading-tight text-stone-500 sm:block">
                Curated Dining & Fine Tables
              </p>
            </div>
          </button>

          {/* ================= DESKTOP NAVIGATION ================= */}
          <nav className="hidden min-w-0 flex-1 items-center justify-center gap-4 text-sm font-medium text-stone-700 lg:flex xl:gap-6">
            
            <button
              type="button"
              onClick={() => scrollToSection('restaurants-list')}
              className="whitespace-nowrap transition-colors hover:text-amber-600"
            >
              Explore Tables
            </button>

            <button
              type="button"
              onClick={() => scrollToSection('cuisines-section')}
              className="whitespace-nowrap transition-colors hover:text-amber-600"
            >
              Popular Cuisines
            </button>

            <button
              type="button"
              onClick={() => scrollToSection('special-offers')}
              className="flex items-center gap-1.5 whitespace-nowrap transition-colors hover:text-amber-600"
            >
              <span>Special Offers</span>

              <span className="rounded-full border border-red-200 bg-red-50 px-1.5 py-0.5 text-[10px] font-bold text-red-600">
                Hot
              </span>
            </button>

            <button
              type="button"
              onClick={() => scrollToSection('how-it-works')}
              className="whitespace-nowrap transition-colors hover:text-amber-600"
            >
              How It Works
            </button>
          </nav>

          {/* ================= RIGHT ACTIONS ================= */}
          <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">

            {/* Search */}
            <button
              type="button"
              onClick={onOpenSearch}
              aria-label="Search restaurants"
              title="Search restaurants"
              className="flex shrink-0 items-center rounded-xl p-2 text-stone-600 transition-colors hover:bg-stone-100 hover:text-stone-900"
            >
              <Search className="h-5 w-5" />

              {/* Search text only on very large screens */}
              <span className="ml-2 hidden whitespace-nowrap text-xs font-medium text-stone-500 2xl:inline">
                Search restaurant or cuisine...
              </span>
            </button>

            {/* Saved */}
            <button
              type="button"
              onClick={onOpenSaved}
              aria-label="Saved restaurants"
              title="Saved Restaurants"
              className="relative shrink-0 rounded-xl p-2 text-stone-600 transition-colors hover:bg-stone-100 hover:text-stone-900"
            >
              <Heart className="h-5 w-5" />

              {savedCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-rose-500 px-1 text-[9px] font-bold text-white ring-2 ring-white">
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
                h-10
                w-10
                shrink-0
                items-center
                justify-center
                rounded-xl
                bg-stone-900
                text-white
                shadow-sm
                transition-all
                hover:bg-stone-800
                active:scale-95
                sm:h-auto
                sm:w-auto
                sm:gap-2
                sm:px-3
                sm:py-2
              "
            >
              <CalendarCheck className="h-4 w-4 text-amber-400" />

              <span className="hidden whitespace-nowrap text-xs font-semibold sm:inline">
                My Bookings
              </span>

              {reservationCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-amber-500 px-1 text-[9px] font-bold text-stone-950 ring-2 ring-white sm:static sm:ring-0">
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
                shrink-0
                items-center
                rounded-xl
                border
                border-amber-600/30
                px-3
                py-2
                text-xs
                font-semibold
                text-amber-800
                transition-colors
                hover:bg-amber-50
                xl:flex
              "
            >
              For Restaurants
            </button>

            {/* Mobile / Tablet Menu */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label={
                mobileMenuOpen
                  ? 'Close navigation menu'
                  : 'Open navigation menu'
              }
              className="shrink-0 rounded-lg p-2 text-stone-600 transition-colors hover:bg-stone-100 lg:hidden"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* ================= MOBILE / TABLET MENU ================= */}
        {mobileMenuOpen && (
          <div className="border-t border-stone-200 py-3 lg:hidden">
            <div className="space-y-1">

              <button
                type="button"
                onClick={() => scrollToSection('restaurants-list')}
                className="w-full rounded-lg px-3 py-3 text-left text-sm font-medium text-stone-800 transition-colors hover:bg-stone-100"
              >
                Explore Tables
              </button>

              <button
                type="button"
                onClick={() => scrollToSection('cuisines-section')}
                className="w-full rounded-lg px-3 py-3 text-left text-sm font-medium text-stone-800 transition-colors hover:bg-stone-100"
              >
                Popular Cuisines
              </button>

              <button
                type="button"
                onClick={() => scrollToSection('special-offers')}
                className="w-full rounded-lg px-3 py-3 text-left text-sm font-medium text-stone-800 transition-colors hover:bg-stone-100"
              >
                Special Dining Offers
              </button>

              <button
                type="button"
                onClick={() => scrollToSection('how-it-works')}
                className="w-full rounded-lg px-3 py-3 text-left text-sm font-medium text-stone-800 transition-colors hover:bg-stone-100"
              >
                How It Works
              </button>

              <div className="mt-2 border-t border-stone-100 pt-3">
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenPartnerModal();
                  }}
                  className="w-full rounded-lg bg-amber-50 py-2.5 text-center text-xs font-semibold text-amber-800 transition-colors hover:bg-amber-100"
                >
                  For Restaurants / Owners
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}