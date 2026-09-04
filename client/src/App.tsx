import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import CuisineShowcase from './components/CuisineShowcase';
import RestaurantCard from './components/RestaurantCard';
import BookingModal from './components/BookingModal';
import RestaurantDetailsModal from './components/RestaurantDetailsModal';
import BookingsDrawer from './components/BookingsDrawer';
import SavedTablesModal from './components/SavedTablesModal';
import SearchModal from './components/SearchModal';
import SpecialOffers from './components/SpecialOffers';
import HowItWorks from './components/HowItWorks';
import PartnerModal from './components/PartnerModal';
import Footer from './components/Footer';

import { Restaurant, Reservation, SearchFilterState } from './types/restaurant';
import { RESTAURANTS, CUISINES, INITIAL_RESERVATIONS } from './data/restaurants';
import {
  CheckCircle2,
  SlidersHorizontal,
  ArrowUpDown,
  RotateCcw,
  Sparkles,
  UtensilsCrossed,
} from 'lucide-react';

export default function App() {
  // 1. Data State
  const [reservations, setReservations] = useState<Reservation[]>(INITIAL_RESERVATIONS);
  const [savedIds, setSavedIds] = useState<string[]>(['aurora-bistro', 'omakase-kaze']);

  // 2. Search & Filter State
  const [filterState, setFilterState] = useState<SearchFilterState>({
    city: '',
    cuisine: '',
    date: 'Tomorrow',
    timeSlot: '7:00 PM',
    guests: 2,
    searchQuery: '',
    priceFilter: '',
    tagFilter: '',
  });

  const [sortBy, setSortBy] = useState<'recommended' | 'rating' | 'reviews' | 'price-asc' | 'price-desc'>('recommended');

  // 3. Modal / Drawer State
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [bookingRestaurant, setBookingRestaurant] = useState<Restaurant | null>(null);
  const [preselectedSlot, setPreselectedSlot] = useState<string | undefined>(undefined);

  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [detailsRestaurant, setDetailsRestaurant] = useState<Restaurant | null>(null);

  const [isBookingsDrawerOpen, setIsBookingsDrawerOpen] = useState(false);
  const [isSavedModalOpen, setIsSavedModalOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isPartnerModalOpen, setIsPartnerModalOpen] = useState(false);

  // 4. Toast Notification State
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => {
      setToast(null);
    }, 3200);
  };

  // Filter & Sort Logic
  const filteredRestaurants = useMemo(() => {
    return RESTAURANTS.filter((r) => {
      // Neighborhood / City Filter
      if (filterState.city && !r.neighborhood.toLowerCase().includes(filterState.city.toLowerCase()) && !r.city.toLowerCase().includes(filterState.city.toLowerCase())) {
        return false;
      }
      // Cuisine Filter
      if (filterState.cuisine && filterState.cuisine !== 'All Cuisines') {
        if (!r.cuisine.toLowerCase().includes(filterState.cuisine.toLowerCase())) {
          return false;
        }
      }
      // Tag Filter
      if (filterState.tagFilter && filterState.tagFilter !== 'All Tables') {
        const hasTag = r.tags.some((t) => t.toLowerCase() === filterState.tagFilter.toLowerCase());
        if (!hasTag) return false;
      }
      // Price Filter
      if (filterState.priceFilter && r.priceRange !== filterState.priceFilter) {
        return false;
      }
      // General Search Query
      if (filterState.searchQuery) {
        const query = filterState.searchQuery.toLowerCase();
        const matches =
          r.name.toLowerCase().includes(query) ||
          r.cuisine.toLowerCase().includes(query) ||
          r.neighborhood.toLowerCase().includes(query) ||
          r.tags.some((t) => t.toLowerCase().includes(query));
        if (!matches) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'reviews') return b.reviewCount - a.reviewCount;
      if (sortBy === 'price-asc') return a.priceRange.length - b.priceRange.length;
      if (sortBy === 'price-desc') return b.priceRange.length - a.priceRange.length;
      // Default: featured first, then rating
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return b.rating - a.rating;
    });
  }, [filterState, sortBy]);

  // Saved Restaurants
  const savedRestaurants = useMemo(() => {
    return RESTAURANTS.filter((r) => savedIds.includes(r.id));
  }, [savedIds]);

  // Handlers
  const handleOpenBooking = (restaurant: Restaurant, slot?: string) => {
    setBookingRestaurant(restaurant);
    setPreselectedSlot(slot);
    setIsBookingModalOpen(true);
  };

  const handleOpenDetails = (restaurant: Restaurant) => {
    setDetailsRestaurant(restaurant);
    setIsDetailsModalOpen(true);
  };

  const handleToggleSave = (restaurantId: string) => {
    const restaurant = RESTAURANTS.find((r) => r.id === restaurantId);
    const name = restaurant ? restaurant.name : 'Restaurant';

    setSavedIds((prev) => {
      const exists = prev.includes(restaurantId);
      if (exists) {
        showToast(`Removed ${name} from saved tables.`);
        return prev.filter((id) => id !== restaurantId);
      } else {
        showToast(`Saved ${name} to your favorites.`);
        return [...prev, restaurantId];
      }
    });
  };

  const handleConfirmBooking = (newRes: Reservation) => {
    setReservations((prev) => [newRes, ...prev]);
    showToast(`Table confirmed at ${newRes.restaurantName} for ${newRes.guests} guests!`);
  };

  const handleCancelReservation = (id: string) => {
    setReservations((prev) => prev.filter((res) => res.id !== id));
    showToast('Reservation cancelled successfully.');
  };

  const handleFilterChange = (updates: Partial<SearchFilterState>) => {
    setFilterState((prev) => ({ ...prev, ...updates }));
  };

  const handleSearchSubmit = () => {
    const el = document.getElementById('restaurants-list');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleResetFilters = () => {
    setFilterState({
      city: '',
      cuisine: '',
      date: 'Tomorrow',
      timeSlot: '7:00 PM',
      guests: 2,
      searchQuery: '',
      priceFilter: '',
      tagFilter: '',
    });
    setSortBy('recommended');
  };

  const handleOpenBookingForRestaurantId = (restaurantId: string) => {
    const found = RESTAURANTS.find((r) => r.id === restaurantId);
    if (found) {
      handleOpenBooking(found);
    }
  };

  return (
    <div className="min-h-screen bg-[#faf9f6] text-stone-900 flex flex-col font-sans selection:bg-amber-500/30">
      {/* 1. Header Navigation */}
      <Header
        reservationCount={reservations.length}
        savedCount={savedIds.length}
        onOpenBookings={() => setIsBookingsDrawerOpen(true)}
        onOpenSaved={() => setIsSavedModalOpen(true)}
        onOpenSearch={() => setIsSearchModalOpen(true)}
        onSelectCuisine={(cuisineName) => {
          handleFilterChange({ cuisine: cuisineName || '' });
          if (cuisineName) {
            handleSearchSubmit();
          }
        }}
        onOpenPartnerModal={() => setIsPartnerModalOpen(true)}
      />

      <main className="flex-1">
        {/* 2. Atmospheric Hero with Interactive Search */}
        <Hero
          filterState={filterState}
          onFilterChange={handleFilterChange}
          onSearchSubmit={handleSearchSubmit}
          onSelectTag={(tag) => handleFilterChange({ tagFilter: tag })}
          activeTag={filterState.tagFilter}
        />

        {/* 3. Browse by Iconic Cuisine Showcase */}
        <CuisineShowcase
          cuisines={CUISINES}
          selectedCuisine={filterState.cuisine || null}
          onSelectCuisine={(cuisineName) => {
            handleFilterChange({ cuisine: cuisineName || '' });
          }}
        />

        {/* 4. Restaurant Grid Section */}
        <section id="restaurants-list" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header & Live Filter Bar */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-8 border-b border-stone-200">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-700 mb-1">
                <UtensilsCrossed className="w-4 h-4" />
                <span>Available Tables</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
                {filterState.cuisine ? `${filterState.cuisine} Restaurants` : 'Curated Fine Dining'}
              </h2>
              <p className="text-xs sm:text-sm text-stone-500 mt-1">
                Showing {filteredRestaurants.length} exceptional restaurants with open tables for{' '}
                <span className="font-semibold text-stone-800">{filterState.guests} guests</span> on{' '}
                <span className="font-semibold text-stone-800">{filterState.date}</span>.
              </p>
            </div>

            {/* Sort & Filter Controls */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              {/* Price Tier Filter */}
              <div className="flex items-center bg-white rounded-xl border border-stone-200 p-1 text-xs">
                {['', '₹₹', '₹₹₹', '₹₹₹₹'].map((tier) => (
                  <button
                    key={tier}
                    onClick={() => handleFilterChange({ priceFilter: tier })}
                    className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                      filterState.priceFilter === tier
                        ? 'bg-amber-600 text-white shadow-2xs'
                        : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    {tier === '' ? 'All Prices' : tier}
                  </button>
                ))}
              </div>

              {/* Sort By Dropdown */}
              <div className="flex items-center gap-1.5 bg-white border border-stone-200 rounded-xl px-3 py-1.5 text-xs">
                <ArrowUpDown className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                <span className="text-stone-500 font-medium">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-transparent font-bold text-stone-800 focus:outline-none cursor-pointer"
                >
                  <option value="recommended">Featured First</option>
                  <option value="rating">Highest Rated (5.0 ★)</option>
                  <option value="reviews">Most Reviewed</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                </select>
              </div>

              {/* Reset Filters Button */}
              {(filterState.city || filterState.cuisine || filterState.tagFilter || filterState.priceFilter) && (
                <button
                  onClick={handleResetFilters}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-stone-200 hover:bg-stone-300 text-stone-700 text-xs font-semibold transition-colors cursor-pointer"
                  title="Clear all filters"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset</span>
                </button>
              )}
            </div>
          </div>

          {/* Active Filter Tags Bar */}
          {(filterState.city || filterState.cuisine || filterState.tagFilter || filterState.priceFilter) && (
            <div className="flex flex-wrap items-center gap-2 pt-4">
              <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">Active Filters:</span>
              {filterState.city && (
                <span className="bg-amber-100 text-amber-900 text-xs px-2.5 py-1 rounded-full font-medium flex items-center gap-1">
                  Location: {filterState.city}
                </span>
              )}
              {filterState.cuisine && (
                <span className="bg-amber-100 text-amber-900 text-xs px-2.5 py-1 rounded-full font-medium flex items-center gap-1">
                  Cuisine: {filterState.cuisine}
                </span>
              )}
              {filterState.tagFilter && (
                <span className="bg-amber-100 text-amber-900 text-xs px-2.5 py-1 rounded-full font-medium flex items-center gap-1">
                  Tag: {filterState.tagFilter}
                </span>
              )}
              {filterState.priceFilter && (
                <span className="bg-amber-100 text-amber-900 text-xs px-2.5 py-1 rounded-full font-medium flex items-center gap-1">
                  Price: {filterState.priceFilter}
                </span>
              )}
            </div>
          )}

          {/* Restaurant Cards Grid */}
          {filteredRestaurants.length === 0 ? (
            <div className="py-20 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-stone-200/70 text-stone-500 flex items-center justify-center mx-auto">
                <UtensilsCrossed className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-serif font-bold text-stone-800">No Tables Matched Your Search</h3>
              <p className="text-xs sm:text-sm text-stone-500 max-w-md mx-auto">
                We couldn&apos;t find restaurants matching all your selected filters. Try broadening your location or selecting different cuisine preferences.
              </p>
              <button
                onClick={handleResetFilters}
                className="bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold px-6 py-2.5 rounded-xl shadow-md transition-all cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredRestaurants.map((restaurant) => (
                <RestaurantCard
                  key={restaurant.id}
                  restaurant={restaurant}
                  isSaved={savedIds.includes(restaurant.id)}
                  onToggleSave={handleToggleSave}
                  onOpenBooking={handleOpenBooking}
                  onOpenDetails={handleOpenDetails}
                />
              ))}
            </div>
          )}
        </section>

        {/* 5. Featured Special Dining Privileges */}
        <SpecialOffers onOpenBookingForRestaurant={handleOpenBookingForRestaurantId} />

       
        <HowItWorks />
      </main>

      {/* 7. Footer */}
      <Footer
        onSelectCuisine={(cuisineName) => {
          handleFilterChange({ cuisine: cuisineName });
          handleSearchSubmit();
        }}
        onOpenPartnerModal={() => setIsPartnerModalOpen(true)}
      />

      {/* Modals and Drawers */}
      {/* Table Booking Modal */}
      <BookingModal
        restaurant={bookingRestaurant}
        preselectedSlot={preselectedSlot}
        isOpen={isBookingModalOpen}
        onClose={() => {
          setIsBookingModalOpen(false);
          setBookingRestaurant(null);
          setPreselectedSlot(undefined);
        }}
        onConfirmBooking={handleConfirmBooking}
      />

      {/* Restaurant Digital Menu & Details Modal */}
      <RestaurantDetailsModal
        restaurant={detailsRestaurant}
        isOpen={isDetailsModalOpen}
        onClose={() => {
          setIsDetailsModalOpen(false);
          setDetailsRestaurant(null);
        }}
        isSaved={detailsRestaurant ? savedIds.includes(detailsRestaurant.id) : false}
        onToggleSave={handleToggleSave}
        onOpenBooking={(r) => {
          setIsDetailsModalOpen(false);
          handleOpenBooking(r);
        }}
      />

      {/* My Bookings Slide-Over Drawer */}
      <BookingsDrawer
        isOpen={isBookingsDrawerOpen}
        onClose={() => setIsBookingsDrawerOpen(false)}
        reservations={reservations}
        onCancelReservation={handleCancelReservation}
        onExplore={() => {
          const el = document.getElementById('restaurants-list');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Saved Tables / Favorites Modal */}
      <SavedTablesModal
        isOpen={isSavedModalOpen}
        onClose={() => setIsSavedModalOpen(false)}
        savedRestaurants={savedRestaurants}
        onRemoveSaved={handleToggleSave}
        onOpenBooking={(r) => {
          setIsSavedModalOpen(false);
          handleOpenBooking(r);
        }}
      />

      {/* Quick Search Modal */}
      <SearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        restaurants={RESTAURANTS}
        onSelectRestaurant={handleOpenDetails}
        onOpenBooking={handleOpenBooking}
      />

      {/* Restaurant Owner Partnership Modal */}
      <PartnerModal
        isOpen={isPartnerModalOpen}
        onClose={() => setIsPartnerModalOpen(false)}
        onSubmitSuccess={(name) => {
          showToast(`Partnership application submitted for ${name}!`);
        }}
      />

      {/* Live Toast Notifications */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-stone-900 text-white px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 text-xs font-semibold border border-amber-500/40 animate-in slide-in-from-bottom-5 duration-200">
          <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
          <span>{toast}</span>
        </div>
      )}
    </div>
  );
}
