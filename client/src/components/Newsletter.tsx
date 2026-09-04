import { useState, type FormEvent } from 'react';
import { Mail, CheckCircle2 } from 'lucide-react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setSubscribed(true);
  };

  return (
    <section id="newsletter-section" className="my-12 sm:my-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#e9c4bc] rounded-3xl py-14 sm:py-16 px-6 sm:px-12 text-center text-[#2d2d2d] shadow-sm relative overflow-hidden">
          
          <div className="max-w-xl mx-auto relative z-10 flex flex-col items-center">
            <div className="w-14 h-14 rounded-full bg-white/40 flex items-center justify-center mb-5 text-[#1b4332]">
              <Mail className="w-7 h-7" />
            </div>

            <h2 className="font-serif-display text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1b4332] mb-3">
              Join the Lumora Circle
            </h2>

            <p className="text-sm sm:text-base text-[#2d2d2d]/80 mb-8 max-w-md">
              Be the first to know about new arrivals, exclusive offers, and style inspiration.
            </p>

            {subscribed ? (
              <div className="bg-white/90 backdrop-blur-xs py-4 px-6 rounded-full flex items-center gap-2 text-[#1b4332] font-semibold text-sm shadow-sm animate-in fade-in-50">
                <CheckCircle2 className="w-5 h-5 text-[#1b4332]" />
                <span>Thank you for joining! Enjoy 15% off with code LUMORA15</span>
              </div>
            ) : (
              <form
                id="newsletter-form"
                onSubmit={handleSubmit}
                className="w-full max-w-md bg-white p-1.5 sm:p-2 rounded-full shadow-lg flex items-center gap-2"
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="flex-1 bg-transparent px-4 sm:px-5 py-2 text-sm text-[#2d2d2d] placeholder-[#999999] focus:outline-none"
                />
                <button
                  type="submit"
                  id="newsletter-subscribe-btn"
                  className="bg-[#1b4332] text-white font-semibold text-xs sm:text-sm px-5 sm:px-7 py-3 rounded-full hover:bg-[#153427] transition-colors whitespace-nowrap"
                >
                  Subscribe
                </button>
              </form>
            )}

            <p className="text-[11px] text-[#2d2d2d]/60 mt-4">
              We respect your privacy. Unsubscribe anytime with a single click.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
