import { ArrowRight } from 'lucide-react';
import { CATEGORIES } from '../data';

interface ShopByCategoryProps {
  selectedCategory: string | null;
  onSelectCategory: (categoryName: string | null) => void;
}

export default function ShopByCategory({
  selectedCategory,
  onSelectCategory,
}: ShopByCategoryProps) {
  return (
    <section id="categories-section" className="py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex items-end justify-between mb-10 sm:mb-12 border-b border-transparent">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#94a38e] font-semibold block mb-1">
              Curated Departments
            </span>
            <h2 className="font-serif-display text-2xl sm:text-3xl lg:text-4xl font-bold text-[#2d2d2d]">
              Shop by Category
            </h2>
          </div>

          <button
            type="button"
            onClick={() => onSelectCategory(null)}
            className="group inline-flex items-center gap-1.5 font-semibold text-xs sm:text-sm text-[#2d2d2d] pb-0.5 border-b-2 border-[#2d2d2d] hover:border-[#94a38e] hover:text-[#94a38e] transition-colors"
          >
            <span>{selectedCategory ? 'Clear Filter' : 'Browse all'}</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* Categories Circular Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8 text-center">
          {CATEGORIES.map((category) => {
            const isSelected = selectedCategory === category.name;
            return (
              <button
                key={category.id}
                type="button"
                onClick={() => onSelectCategory(isSelected ? null : category.name)}
                className="group flex flex-col items-center text-center focus:outline-none transition-transform hover:-translate-y-1"
              >
                <div className="relative w-28 h-28 sm:w-36 sm:h-36 lg:w-40 lg:h-40 rounded-full p-1 transition-all duration-300">
                  <div
                    className={`w-full h-full rounded-full overflow-hidden transition-all duration-300 ${
                      isSelected
                        ? 'ring-4 ring-[#1b4332] shadow-md'
                        : 'border-4 border-transparent group-hover:border-[#e9c4bc] shadow-sm'
                    }`}
                  >
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>

                <h3 className={`mt-4 text-base sm:text-lg font-medium transition-colors ${
                  isSelected ? 'text-[#1b4332] font-bold' : 'text-[#2d2d2d] group-hover:text-[#1b4332]'
                }`}>
                  {category.name}
                </h3>
                
                <span className="text-xs sm:text-sm text-[#666666] mt-0.5">
                  {category.itemCount}
                </span>

                {isSelected && (
                  <span className="mt-1 text-[11px] font-semibold text-[#1b4332] bg-[#f9f6f1] px-2 py-0.5 rounded-full">
                    Active
                  </span>
                )}
              </button>
            );
          })}
        </div>

      </div>
    </section>
  );
}
