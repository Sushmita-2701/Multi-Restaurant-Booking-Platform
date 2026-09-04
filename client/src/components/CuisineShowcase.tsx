import React from 'react';
import { CuisineCategory } from '../types/restaurant';
import { ChevronRight, Utensils } from 'lucide-react';

interface CuisineShowcaseProps {
  cuisines: CuisineCategory[];
  selectedCuisine: string | null;
  onSelectCuisine: (cuisineName: string | null) => void;
}

export default function CuisineShowcase({
  cuisines,
  selectedCuisine,
  onSelectCuisine,
}: CuisineShowcaseProps) {
  return (
    <section id="cuisines-section" className="py-16 bg-stone-50 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <div className="flex items-center gap-2 text-amber-700 text-xs font-bold tracking-wider uppercase mb-2">
              <Utensils className="w-4 h-4" />
              <span>Explore Gastronomy</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-stone-900 tracking-tight">
              Browse by Iconic Cuisine
            </h2>
            <p className="text-stone-600 text-sm mt-2 max-w-xl">
              From Michelin-starred French tasting menus to authentic Tokyo omakase and wood-fired Neapolitan pasta.
            </p>
          </div>

          {selectedCuisine && (
            <button
              onClick={() => onSelectCuisine(null)}
              className="mt-4 md:mt-0 text-xs font-semibold text-amber-700 hover:text-amber-800 underline underline-offset-4 cursor-pointer"
            >
              Clear cuisine filter (Viewing: {selectedCuisine})
            </button>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {cuisines.map((cuisine) => {
            const isSelected = selectedCuisine === cuisine.name;
            return (
              <div
                key={cuisine.id}
                onClick={() => {
                  onSelectCuisine(isSelected ? null : cuisine.name);
                  const el = document.getElementById('restaurants-list');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`group relative overflow-hidden rounded-2xl cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${
                  isSelected ? 'ring-3 ring-amber-600 ring-offset-2' : ''
                }`}
              >
                {/* Image Aspect Ratio Container */}
                <div className="aspect-[4/3] w-full overflow-hidden bg-stone-200">
                  <img
                    src={cuisine.image}
                    alt={cuisine.name}
                    className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/40 to-transparent" />
                </div>

                {/* Content Overlay */}
                <div className="absolute inset-0 p-4 flex flex-col justify-end text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-bold font-serif group-hover:text-amber-300 transition-colors">
                        {cuisine.name}
                      </h3>
                      <p className="text-xs text-stone-300 line-clamp-1 mt-0.5">
                        {cuisine.tagline}
                      </p>
                    </div>
                    <div className="w-7 h-7 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white shrink-0 group-hover:bg-amber-500 transition-colors">
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="mt-2 text-[11px] font-semibold text-amber-300 flex items-center gap-1">
                    <span>{cuisine.restaurantCount} Restaurants</span>
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
