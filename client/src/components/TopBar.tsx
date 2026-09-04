import { Truck, RotateCcw, ShieldCheck } from 'lucide-react';

export default function TopBar() {
  return (
    <aside aria-label="Announcement" id="top-announcement-bar" className="bg-[#1b4332] text-white text-xs sm:text-[13px] font-medium py-2.5 px-4">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-around gap-y-1.5 text-center">
        <div className="flex items-center gap-2">
          <Truck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#94a38e]" />
          <span>Free Shipping on Orders Over $50</span>
        </div>
        <div className="hidden sm:flex items-center gap-2">
          <RotateCcw className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#94a38e]" />
          <span>Easy 30-Day Returns</span>
        </div>
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#94a38e]" />
          <span>Secure & Safe Payments</span>
        </div>
      </div>
    </aside>
  );
}
