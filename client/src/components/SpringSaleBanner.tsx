import { Sparkles, ArrowRight } from 'lucide-react';

interface SpringSaleBannerProps {
  onExploreDeals: () => void;
}

export default function SpringSaleBanner({ onExploreDeals }: SpringSaleBannerProps) {
  return (
    <section id="spring-sale" className="my-10 sm:my-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative bg-[#1b4332] rounded-3xl overflow-hidden shadow-2xl flex flex-col lg:flex-row min-h-[380px] lg:min-h-[420px]">
          
          {/* Content Column */}
          <div className="flex-1 p-8 sm:p-12 lg:p-16 flex flex-col justify-center text-white relative z-10">
            <div className="flex items-center gap-2 text-[#94a38e] text-xs sm:text-sm font-semibold uppercase tracking-widest mb-4">
              <Sparkles className="w-4 h-4 text-[#e9c4bc]" />
              <span>Limited Time Offer</span>
            </div>

            <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4">
              Spring Sale is Live!
            </h2>

            <p className="text-white/80 text-sm sm:text-base lg:text-lg mb-8 max-w-sm">
              Enjoy up to 40% off on selected collections, handcrafted homeware, and seasonal essentials.
            </p>

            <div className="flex items-center gap-4">
              <button
                type="button"
                id="spring-sale-cta"
                onClick={onExploreDeals}
                className="inline-flex items-center gap-2.5 bg-white text-[#1b4332] px-7 py-3.5 rounded-full font-bold text-sm sm:text-base hover:bg-[#f9f6f1] hover:shadow-lg transition-all duration-200 group"
              >
                <span>Explore Deals</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Circular Discount Badge */}
            <div 
              id="spring-sale-badge-40"
              className="hidden sm:flex absolute top-1/2 right-4 lg:-right-14 -translate-y-1/2 w-28 h-28 lg:w-32 lg:h-32 rounded-full bg-[#e9c4bc] text-[#1b4332] shadow-xl flex-col items-center justify-center font-bold z-20 pointer-events-none transform rotate-3"
            >
              <span className="text-[11px] font-semibold tracking-wider uppercase leading-tight">UP TO</span>
              <span className="text-3xl lg:text-4xl font-black leading-none my-0.5">40%</span>
              <span className="text-[11px] font-semibold tracking-wider uppercase leading-tight">OFF</span>
            </div>
          </div>

          {/* Right Image Column */}
          <div className="flex-1 min-h-[260px] lg:min-h-full relative overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1549497538-301288c8549a?q=80&w=1000&auto=format&fit=crop"
              alt="Spring sale curated collection"
              className="w-full h-full object-cover object-center"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#1b4332] via-[#1b4332]/20 to-transparent lg:w-32 pointer-events-none" />
          </div>

        </div>
      </div>
    </section>
  );
}
