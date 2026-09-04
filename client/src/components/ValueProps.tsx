import { Truck, ShieldCheck, RotateCcw, Headset } from 'lucide-react';
import { MAIN_USPS } from '../data';

export default function ValueProps() {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'truck':
        return <Truck className="w-5 h-5 text-[#1b4332]" />;
      case 'lock':
        return <ShieldCheck className="w-5 h-5 text-[#1b4332]" />;
      case 'rotate':
        return <RotateCcw className="w-5 h-5 text-[#1b4332]" />;
      case 'headset':
        return <Headset className="w-5 h-5 text-[#1b4332]" />;
      default:
        return <ShieldCheck className="w-5 h-5 text-[#1b4332]" />;
    }
  };

  return (
    <section id="usp-section" className="py-10 border-y border-[#ececec]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-center">
          {MAIN_USPS.map((usp, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center group transition-transform hover:-translate-y-0.5"
            >
              <div className="w-12 h-12 rounded-full bg-[#f9f6f1] flex items-center justify-center mb-3 group-hover:bg-[#e9c4bc]/50 transition-colors">
                {getIcon(usp.icon)}
              </div>
              <h3 className="font-semibold text-sm sm:text-[15px] text-[#2d2d2d] mb-0.5">
                {usp.title}
              </h3>
              <p className="text-xs sm:text-[13px] text-[#666666]">
                {usp.subtitle}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
