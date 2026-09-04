import React, { useState } from 'react';
import { UtensilsCrossed, Sparkles, Send, ShieldCheck, Heart } from 'lucide-react';

interface FooterProps {
  onSelectCuisine: (cuisineName: string) => void;
  onOpenPartnerModal: () => void;
}

export default function Footer({ onSelectCuisine, onOpenPartnerModal }: FooterProps) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 4000);
      setEmail('');
    }
  };

  return (
    <footer className="bg-stone-950 text-stone-300 pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Newsletter Callout Banner */}
        <div className="bg-gradient-to-r from-amber-950/80 to-stone-900 border border-amber-800/40 rounded-3xl p-8 sm:p-10 mb-16 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="max-w-xl text-center lg:text-left">
            <div className="inline-flex items-center gap-1.5 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>DineTable Epicure Club</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white">
              Unlock Secret Tables & Chef Flights
            </h3>
            <p className="text-stone-400 text-xs sm:text-sm mt-2 leading-relaxed">
              Get weekly priority alerts when hard-to-book tables release new reservation openings and exclusive tasting menus.
            </p>
          </div>

          <div className="w-full lg:w-auto">
            {subscribed ? (
              <div className="bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 px-6 py-3 rounded-2xl text-xs font-bold flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>You’re on the VIP list! Check your inbox for secret table alerts.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2.5 w-full max-w-md">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address..."
                  className="px-4 py-3 rounded-xl bg-stone-900/90 border border-stone-700 text-xs text-white placeholder:text-stone-500 focus:outline-none focus:border-amber-500 min-w-[260px]"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-amber-600/20 cursor-pointer shrink-0"
                >
                  <span>Subscribe</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 pb-12 border-b border-stone-800 text-xs">
          {/* Brand Info */}
          <div className="col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-600 to-amber-500 flex items-center justify-center text-white shadow-md">
                <UtensilsCrossed className="w-4.5 h-4.5" />
              </div>
              <span className="text-xl font-bold font-serif text-white tracking-tight">
                Dine<span className="text-amber-500">Table</span>
              </span>
            </div>
            <p className="text-stone-400 text-xs leading-relaxed max-w-sm">
              The premier restaurant reservation platform connecting discerning food lovers with award-winning kitchens, intimate bistros, and iconic culinary experiences worldwide.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-stone-500">
              <span>Made with passion for fine dining</span>
              <Heart className="w-3 h-3 text-rose-500 fill-current" />
            </div>
          </div>

          {/* Popular Cuisines */}
          <div className="space-y-3">
            <h4 className="text-white font-bold uppercase tracking-wider text-[11px]">Popular Cuisines</h4>
            <ul className="space-y-2 text-stone-400">
              <li>
                <button
                  onClick={() => onSelectCuisine('Italian')}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  Italian & Pasta
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCuisine('Japanese & Sushi')}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  Japanese Omakase
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCuisine('French Bistro')}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  French Haute Cuisine
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCuisine('Steakhouse & Grill')}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  Prime Steakhouses
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCuisine('Royal Indian')}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  Royal Indian Curries
                </button>
              </li>
            </ul>
          </div>

          {/* For Restaurants */}
          <div className="space-y-3">
            <h4 className="text-white font-bold uppercase tracking-wider text-[11px]">For Restaurants</h4>
            <ul className="space-y-2 text-stone-400">
              <li>
                <button
                  onClick={onOpenPartnerModal}
                  className="text-amber-400 hover:text-amber-300 font-semibold transition-colors cursor-pointer"
                >
                  Partner with Us
                </button>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-amber-400 transition-colors">
                  Table Management System
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-amber-400 transition-colors">
                  Floor Plan Software
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-amber-400 transition-colors">
                  VIP Guest Profiles
                </a>
              </li>
            </ul>
          </div>

          {/* Company & Legal */}
          <div className="space-y-3">
            <h4 className="text-white font-bold uppercase tracking-wider text-[11px]">Company</h4>
            <ul className="space-y-2 text-stone-400">
              <li>
                <a href="#how-it-works" className="hover:text-amber-400 transition-colors">
                  About DineTable
                </a>
              </li>
              <li>
                <a href="#special-offers" className="hover:text-amber-400 transition-colors">
                  Dining Privileges
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-amber-400 transition-colors">
                  Seating Guarantee
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-amber-400 transition-colors">
                  Privacy & Cookie Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <div>
            © {new Date().getFullYear()} DineTable Inc. All rights reserved. Instant guaranteed restaurant reservations.
          </div>
          <div className="flex gap-6">
            <span>Terms of Service</span>
            <span>Privacy Notice</span>
            <span>Security</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
