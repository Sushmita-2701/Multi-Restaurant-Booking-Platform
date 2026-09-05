import React, { useState } from 'react';
import type { Restaurant } from '../types/restaurant';

import {
  X,
  CheckCircle,
  Store,
  Sparkles,
} from 'lucide-react';

interface PartnerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitSuccess: (restaurant: Restaurant) => void;
}

export default function PartnerModal({
  isOpen,
  onClose,
  onSubmitSuccess,
}: PartnerModalProps) {
  const [restaurantName, setRestaurantName] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [cuisine, setCuisine] = useState('Italian');
  const [city, setCity] = useState('');
  const [tableCount, setTableCount] = useState('20');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) {
    return null;
  }

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const trimmedRestaurantName =
      restaurantName.trim();

    const trimmedOwnerName =
      ownerName.trim();

    const trimmedEmail =
      email.trim();

    const trimmedPhone =
      phone.trim();

    const trimmedCuisine =
      cuisine.trim();

    const trimmedCity =
      city.trim();

    const totalTables =
      Number(tableCount);

    /* ============================================
       CREATE RESTAURANT
    ============================================ */

    const newRestaurant: Restaurant = {
      id: `partner-${Date.now()}`,

      name: trimmedRestaurantName,

      tagline:
        'A new dining experience on HungryBear',

      cuisine: trimmedCuisine,

      rating: 5,

      reviewCount: 0,

      priceRange: '₹₹',

      neighborhood: trimmedCity,

      city: trimmedCity,

      address: trimmedCity,

      distance: '0 km',

      /*
       * You can replace this image later
       * with an uploaded restaurant image.
       */
      image:
        'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',

      gallery: [
        'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=1200&q=80',
      ],

      featured: false,

      trending: true,

      michelinGuide: false,

      tags: [
        'New',
        trimmedCuisine,
      ],

      availableSlots: [
        '6:00 PM',
        '6:30 PM',
        '7:00 PM',
        '7:30 PM',
        '8:00 PM',
        '8:30 PM',
        '9:00 PM',
        '9:30 PM',
      ],

      description:
        `${trimmedRestaurantName} is a new ` +
        `${trimmedCuisine} restaurant located in ` +
        `${trimmedCity}. Join us for a memorable ` +
        `dining experience.`,

      /*
       * Restaurant interface requires chef.
       * We use owner/manager name here for now.
       */
      chef: trimmedOwnerName,

      hours:
        '11:00 AM - 11:00 PM',

      dressCode:
        'Smart Casual',

      parking:
        'Available',

      phone: trimmedPhone,

      menu: [],

      reviews: [],
    };

    /* ============================================
       SAVE PARTNER RESTAURANT
    ============================================ */

    try {
      const storedRestaurants =
        localStorage.getItem(
          'restaurants'
        );

      const existingRestaurants: Restaurant[] =
        storedRestaurants
          ? JSON.parse(storedRestaurants)
          : [];

      const updatedRestaurants = [
        ...existingRestaurants,
        newRestaurant,
      ];

      localStorage.setItem(
        'restaurants',
        JSON.stringify(
          updatedRestaurants
        )
      );
    } catch (error) {
      console.error(
        'Failed to save restaurant:',
        error
      );
    }

    /* ============================================
       SUCCESS
    ============================================ */

    setSubmitted(true);

    setTimeout(() => {
      onSubmitSuccess(newRestaurant);

      onClose();

      setSubmitted(false);

      /* Reset form */

      setRestaurantName('');
      setOwnerName('');
      setEmail('');
      setPhone('');
      setCuisine('Italian');
      setCity('');
      setTableCount('20');
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-stone-950/70 p-4 backdrop-blur-xs sm:p-6 animate-in fade-in duration-200">

      <div className="relative w-full max-w-xl overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-2xl">

        {/* ========================================
            HEADER
        ======================================== */}

        <div className="flex items-center justify-between border-b border-stone-200 bg-stone-50 p-6">

          <div className="flex items-center gap-2.5">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-600/10 text-amber-700">
              <Store className="h-5 w-5" />
            </div>

            <div>
              <h2 className="font-serif text-base font-bold text-stone-900">
                Partner with HungryBear
              </h2>

              <p className="text-xs text-stone-500">
                Fill your tables & manage reservations
                with ease
              </p>
            </div>

          </div>

          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer rounded-lg p-1.5 text-stone-400 transition-colors hover:bg-stone-200/60 hover:text-stone-700"
          >
            <X className="h-4 w-4" />
          </button>

        </div>

        {/* ========================================
            SUCCESS SCREEN
        ======================================== */}

        {submitted ? (
          <div className="space-y-4 p-10 text-center">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">

              <CheckCircle className="h-8 w-8" />

            </div>

            <h3 className="font-serif text-xl font-bold text-stone-900">
              Restaurant Published!
            </h3>

            <p className="mx-auto max-w-sm text-xs text-stone-600">
              Your restaurant has been successfully
              added to HungryBear.
            </p>

          </div>
        ) : (

          /* ========================================
             FORM
          ======================================== */

          <form
            onSubmit={handleSubmit}
            className="space-y-4 p-6"
          >

            {/* ======================================
                INFO BOX
            ====================================== */}

            <div className="flex items-center gap-2 rounded-xl border border-amber-200/80 bg-amber-50 p-3.5 text-xs text-amber-900">

              <Sparkles className="h-4 w-4 shrink-0 text-amber-600" />

              <span>
                Join over 250+ premier restaurants
                growing their guest bookings by 40%.
              </span>

            </div>

            {/* ======================================
                RESTAURANT + OWNER
            ====================================== */}

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

              {/* Restaurant Name */}

              <div>
                <label className="mb-1 block text-xs font-bold text-stone-700">
                  Restaurant Name
                </label>

                <input
                  type="text"
                  required
                  minLength={2}
                  value={restaurantName}
                  onChange={(e) =>
                    setRestaurantName(
                      e.target.value
                    )
                  }
                  placeholder="e.g. Bella Cucina"
                  className="w-full rounded-xl border border-stone-300 px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              {/* Owner */}

              <div>
                <label className="mb-1 block text-xs font-bold text-stone-700">
                  Owner / Manager Name
                </label>

                <input
                  type="text"
                  required
                  minLength={2}
                  value={ownerName}
                  onChange={(e) =>
                    setOwnerName(
                      e.target.value
                    )
                  }
                  placeholder="e.g. Marco Rossi"
                  className="w-full rounded-xl border border-stone-300 px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

            </div>

            {/* ======================================
                EMAIL + PHONE
            ====================================== */}

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

              {/* Email */}

              <div>
                <label className="mb-1 block text-xs font-bold text-stone-700">
                  Business Email
                </label>

                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  placeholder="manager@restaurant.com"
                  className="w-full rounded-xl border border-stone-300 px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              {/* Phone */}

              <div>
                <label className="mb-1 block text-xs font-bold text-stone-700">
                  Contact Phone
                </label>

                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) =>
                    setPhone(e.target.value)
                  }
                  placeholder="+91 98765 43210"
                  className="w-full rounded-xl border border-stone-300 px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

            </div>

            {/* ======================================
                CUISINE + CITY + TABLES
            ====================================== */}

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">

              {/* Cuisine */}

              <div>
                <label className="mb-1 block text-xs font-bold text-stone-700">
                  Primary Cuisine
                </label>

                <input
                  type="text"
                  required
                  value={cuisine}
                  onChange={(e) =>
                    setCuisine(
                      e.target.value
                    )
                  }
                  placeholder="e.g. Italian"
                  className="w-full rounded-xl border border-stone-300 px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              {/* City */}

              <div>
                <label className="mb-1 block text-xs font-bold text-stone-700">
                  City / Neighborhood
                </label>

                <input
                  type="text"
                  required
                  value={city}
                  onChange={(e) =>
                    setCity(
                      e.target.value
                    )
                  }
                  placeholder="e.g. Downtown"
                  className="w-full rounded-xl border border-stone-300 px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              {/* Tables */}

              <div>
                <label className="mb-1 block text-xs font-bold text-stone-700">
                  Total Dining Tables
                </label>

                <input
                  type="number"
                  required
                  min="2"
                  max="500"
                  value={tableCount}
                  onChange={(e) =>
                    setTableCount(
                      e.target.value
                    )
                  }
                  className="w-full rounded-xl border border-stone-300 px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

            </div>

            {/* ======================================
                BUTTONS
            ====================================== */}

            <div className="flex items-center justify-end gap-3 border-t border-stone-100 pt-3">

              <button
                type="button"
                onClick={onClose}
                className="cursor-pointer rounded-xl px-4 py-2 text-xs font-semibold text-stone-600 transition-colors hover:bg-stone-100"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="cursor-pointer rounded-xl bg-amber-600 px-6 py-2.5 text-xs font-bold text-white shadow-md shadow-amber-600/25 transition-all hover:bg-amber-500"
              >
                Submit Partnership Request
              </button>

            </div>

          </form>
        )}

      </div>
    </div>
  );
}