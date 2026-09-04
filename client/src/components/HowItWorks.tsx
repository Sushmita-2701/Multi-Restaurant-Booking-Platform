import React from 'react';
import { Search, CalendarCheck2, Utensils, ShieldCheck, HeartHandshake, Sparkles } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      number: '01',
      icon: Search,
      title: 'Discover & Explore',
      desc: 'Browse curated dining spots filtered by neighborhood, cuisine, Michelin guides, and dietary preferences.',
    },
    {
      number: '02',
      icon: CalendarCheck2,
      title: 'Pick Time & Table Ambience',
      desc: 'Choose your desired date, exact time slot, and preferred seating area (window, patio, chef’s counter).',
    },
    {
      number: '03',
      icon: Utensils,
      title: 'Arrive & Savor',
      desc: 'Walk in with guaranteed seating and instant digital confirmation. Enjoy exceptional culinary hospitality.',
    },
  ];

  return (
    <section id="how-it-works" className="py-20 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 text-amber-700 text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-4 h-4" />
            <span>Effortless Dining Reservations</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 tracking-tight">
            How DineTable Works
          </h2>
          <p className="text-stone-600 text-sm sm:text-base mt-3 leading-relaxed">
            We eliminate crowded waitlists and reservation guesswork. Enjoy direct table bookings in three effortless steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="relative bg-stone-50 rounded-3xl p-8 border border-stone-200/80 hover:border-amber-400 hover:shadow-lg transition-all group"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-amber-600/10 text-amber-700 group-hover:bg-amber-600 group-hover:text-white transition-colors flex items-center justify-center shadow-xs">
                    <Icon className="w-7 h-7" />
                  </div>
                  <span className="font-serif font-bold text-3xl text-stone-200 group-hover:text-amber-200 transition-colors">
                    {step.number}
                  </span>
                </div>

                <h3 className="font-serif font-bold text-lg text-stone-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Guarantee Banner */}
        <div className="mt-14 bg-gradient-to-r from-stone-900 to-stone-800 rounded-3xl p-6 sm:p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-base sm:text-lg">The DineTable Seating Guarantee</h4>
              <p className="text-xs text-stone-400 mt-0.5">
                Every reservation is confirmed directly with the restaurant’s floor manager. No overbooking, zero hidden fees.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <div className="text-right hidden md:block">
              <div className="text-xs font-bold text-amber-400">100% Free Service</div>
              <div className="text-[11px] text-stone-400">For all diners</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
