import { useState, type FormEvent } from 'react';
import { X, User, Heart, ShoppingBag, LogOut } from 'lucide-react';

interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistCount: number;
  orderCount: number;
}

export default function AccountModal({
  isOpen,
  onClose,
  wishlistCount,
  orderCount,
}: AccountModalProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  if (!isOpen) return null;

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    if (email) setIsLoggedIn(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 flex justify-center items-center">
      <div className="fixed inset-0 bg-black/40 backdrop-blur-xs" onClick={onClose} />

      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-[#ececec] p-6 sm:p-8 z-10 animate-in zoom-in-95 duration-150">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-[#666666] hover:bg-[#f9f6f1]"
        >
          <X className="w-5 h-5" />
        </button>

        {isLoggedIn ? (
          <div className="text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#f9f6f1] text-[#1b4332] flex items-center justify-center mx-auto">
              <User className="w-8 h-8" />
            </div>
            <div>
              <h3 className="font-serif-display text-xl font-bold text-[#2d2d2d]">
                Welcome back, {name || 'Valued Member'}
              </h3>
              <p className="text-xs text-[#666666]">{email || 'member@lumora.com'}</p>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-3">
              <div className="p-3 rounded-xl bg-[#f9f6f1] text-center">
                <div className="flex items-center justify-center gap-1 text-[#1b4332] font-bold text-lg">
                  <ShoppingBag className="w-4 h-4" />
                  <span>{orderCount}</span>
                </div>
                <span className="text-xs text-[#666666]">Past Orders</span>
              </div>
              <div className="p-3 rounded-xl bg-[#f9f6f1] text-center">
                <div className="flex items-center justify-center gap-1 text-rose-500 font-bold text-lg">
                  <Heart className="w-4 h-4 fill-rose-500" />
                  <span>{wishlistCount}</span>
                </div>
                <span className="text-xs text-[#666666]">Saved Items</span>
              </div>
            </div>

            <div className="pt-4 border-t border-[#ececec]">
              <button
                type="button"
                onClick={() => setIsLoggedIn(false)}
                className="w-full py-2.5 px-4 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-xl flex items-center justify-center gap-1.5 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="text-center mb-6">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#94a38e]">
                Lumora Club
              </span>
              <h3 className="font-serif-display text-2xl font-bold text-[#2d2d2d] mt-1">
                Sign in to Your Account
              </h3>
              <p className="text-xs text-[#666666] mt-1">
                Track orders, save wishlists, and receive member perks.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-[#2d2d2d] mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Eleanor Vance"
                  className="w-full text-sm px-4 py-2.5 border border-[#ececec] rounded-xl focus:outline-none focus:border-[#1b4332]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#2d2d2d] mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full text-sm px-4 py-2.5 border border-[#ececec] rounded-xl focus:outline-none focus:border-[#1b4332]"
                />
              </div>

              <button
                type="submit"
                className="w-full mt-2 bg-[#1b4332] text-white font-semibold py-3 px-4 rounded-full text-sm hover:bg-[#153427] transition-colors"
              >
                Sign In / Register
              </button>
            </form>

            <div className="mt-4 pt-4 border-t border-[#ececec] text-center text-xs text-[#666666]">
              <span>Fast guest checkout is always available without an account.</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
