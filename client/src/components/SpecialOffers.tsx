import React from 'react';
import { Tag, Sparkles, Clock, ArrowRight, Percent, Wine, Gift } from 'lucide-react';
import { Restaurant } from '../types/restaurant';

interface SpecialOffersProps {
  onOpenBookingForRestaurant: (restaurantId: string) => void;
}

const OFFERS = [
  {
    id: 'offer-1',
    title: 'Complimentary Sommelier Wine Flight',
    restaurantId: 'aurora-bistro',
    restaurantName: 'L’Aura Parisienne',
    discount: 'Free Pairing',
    icon: Wine,
    badge: 'Limited Weekend Offer',
    desc: 'Receive a curated 3-glass grand cru pairing with any 5-course tasting menu booked for 2+ guests.',
    validUntil: 'Valid this Friday & Saturday',
    code: 'DINEVINTAGE',
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'offer-2',
    title: '20% Off Early Bird Dinner (5:00 - 6:30 PM)',
    restaurantId: 'osteria-del-sole',
    restaurantName: 'Osteria Del Sole',
    discount: '20% OFF',
    icon: Percent,
    badge: 'Popular Deal',
    desc: 'Enjoy authentic handmade Italian pasta and wood-fired mains with 20% off your entire dining bill.',
    validUntil: 'Valid Tuesday - Friday',
    code: 'SUNSET20',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'offer-3',
    title: 'Chef’s Secret Appetizer on the House',
    restaurantId: 'omakase-kaze',
    restaurantName: 'Kaze Omakase',
    discount: 'Chef Gift',
    icon: Gift,
    badge: 'Omakase Special',
    desc: 'Complimentary A5 Wagyu tartare starter included with all counter seatings reserved through HungryBear.',
    validUntil: 'Valid this Month',
    code: 'OMAKASEVIP',
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=600&q=80',
  },
];

export default function SpecialOffers({ onOpenBookingForRestaurant }: SpecialOffersProps) {
  return (
    <section id="special-offers" className="py-16 bg-stone-900 text-white relative overflow-hidden">
      {/* Subtle Glows */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-amber-700/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/20 text-amber-300 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Exclusive Member Perks</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-white tracking-tight">
              Featured Dining Privileges
            </h2>
            <p className="text-stone-400 text-sm mt-2 max-w-xl">
              Special incentives, complimentary chef tastings, and dining discounts unlocked when reserving via HungryBear.
            </p>
          </div>
        </div>

        {/* Offers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {OFFERS.map((offer) => {
            const Icon = offer.icon;
            return (
              <div
                key={offer.id}
                className="bg-stone-800/80 rounded-2xl border border-stone-700/60 overflow-hidden hover:border-amber-500/50 transition-all flex flex-col justify-between group shadow-xl"
              >
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={offer.image}
                    alt={offer.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/40 to-transparent" />
                  <div className="absolute top-3 left-3 bg-amber-500 text-stone-950 text-xs font-bold px-2.5 py-1 rounded-full shadow-md">
                    {offer.discount}
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 text-xs text-stone-300 font-medium">
                    {offer.restaurantName}
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="font-serif font-bold text-base text-white group-hover:text-amber-300 transition-colors">
                      {offer.title}
                    </h3>
                    <p className="text-xs text-stone-400 mt-2 leading-relaxed">{offer.desc}</p>
                  </div>

                  <div className="pt-3 border-t border-stone-700/60 space-y-3">
                    <div className="flex items-center justify-between text-[11px] text-stone-400">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-amber-400" />
                        <span>{offer.validUntil}</span>
                      </span>
                      <span className="font-mono text-amber-300 bg-stone-900 px-2 py-0.5 rounded border border-stone-700">
                        {offer.code}
                      </span>
                    </div>

                    <button
                      onClick={() => onOpenBookingForRestaurant(offer.restaurantId)}
                      className="w-full py-2.5 bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer"
                    >
                      <span>Claim & Book Table</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
