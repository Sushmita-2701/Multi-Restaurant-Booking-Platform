import { Award, Headset, Heart, Leaf } from 'lucide-react';
import { FOOTER_USPS } from '../data';

export default function FooterUSPs() {
  const getIcon = (icon: string) => {
    switch (icon) {
      case 'award':
        return <Award className="w-6 h-6 text-[#1b4332]" />;
      case 'headset':
        return <Headset className="w-6 h-6 text-[#1b4332]" />;
      case 'heart':
        return <Heart className="w-6 h-6 text-[#1b4332]" />;
      case 'leaf':
        return <Leaf className="w-6 h-6 text-[#1b4332]" />;
      default:
        return <Award className="w-6 h-6 text-[#1b4332]" />;
    }
  };

  return (
    <section id="footer-usps-section" className="py-10 border-t border-[#ececec]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {FOOTER_USPS.map((usp, idx) => (
            <div key={idx} className="flex items-start gap-4">
              <div className="p-2.5 rounded-xl bg-[#f9f6f1] text-[#1b4332] flex-shrink-0">
                {getIcon(usp.icon)}
              </div>
              <div>
                <h4 className="text-sm font-semibold text-[#2d2d2d] mb-1">
                  {usp.title}
                </h4>
                <p className="text-xs text-[#666666] leading-relaxed">
                  {usp.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
