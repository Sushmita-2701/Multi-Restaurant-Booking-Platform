import { useState } from 'react';
import { X, Heart, ShoppingBag, Truck, ShieldCheck, Check } from 'lucide-react';
import { Product } from '../types';

interface QuickViewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, selectedColor?: string, quantity?: number) => void;
  isWishlisted: boolean;
  onToggleWishlist: (productId: string) => void;
}

export default function QuickViewModal({
  product,
  isOpen,
  onClose,
  onAddToCart,
  isWishlisted,
  onToggleWishlist,
}: QuickViewModalProps) {
  if (!isOpen || !product) return null;

  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    onAddToCart(product, selectedColor, quantity);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 md:p-12 flex justify-center items-center">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-xs" onClick={onClose} />

      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-[#ececec] overflow-hidden z-10 animate-in zoom-in-95 duration-200">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/90 shadow-md flex items-center justify-center text-[#666666] hover:text-[#2d2d2d] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Image */}
          <div className="relative bg-[#f9f6f1] aspect-square md:aspect-auto md:h-full overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <span className="absolute top-4 left-4 bg-[#1b4332] text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              {product.category}
            </span>
          </div>

          {/* Details */}
          <div className="p-6 sm:p-8 flex flex-col justify-between space-y-5">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#94a38e] font-semibold">
                Lumora Collection
              </span>
              <h3 className="font-serif-display text-2xl font-bold text-[#2d2d2d] mt-1 mb-2">
                {product.name}
              </h3>

              <div className="flex items-baseline gap-3 mb-4">
                <span className="text-2xl font-bold text-[#1b4332]">
                  ${product.price.toFixed(2)}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-[#999999] line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>

              <p className="text-sm text-[#666666] leading-relaxed mb-5">
                {product.description || 'Thoughtfully crafted with eco-conscious materials, designed for timeless longevity and versatile daily styling.'}
              </p>

              {/* Color Select */}
              <div className="mb-5">
                <label className="text-xs font-semibold text-[#2d2d2d] block mb-2">
                  Select Color
                </label>
                <div className="flex items-center gap-2.5">
                  {product.colors.map((color, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedColor(color)}
                      className={`w-7 h-7 rounded-full border flex items-center justify-center transition-all ${
                        selectedColor === color
                          ? 'ring-2 ring-[#1b4332] ring-offset-2 scale-110'
                          : 'border-black/20 hover:scale-105'
                      }`}
                      style={{ backgroundColor: color }}
                    >
                      {selectedColor === color && (
                        <Check className="w-3.5 h-3.5 text-white drop-shadow-sm" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="mb-6">
                <label className="text-xs font-semibold text-[#2d2d2d] block mb-2">
                  Quantity
                </label>
                <div className="inline-flex items-center border border-[#ececec] rounded-lg bg-[#f9f6f1]">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-1.5 hover:bg-white text-sm font-semibold rounded-l-lg"
                  >
                    -
                  </button>
                  <span className="px-4 text-sm font-bold text-[#2d2d2d]">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-1.5 hover:bg-white text-sm font-semibold rounded-r-lg"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3 pt-4 border-t border-[#ececec]">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleAdd}
                  className={`flex-1 font-semibold py-3.5 px-6 rounded-full flex items-center justify-center gap-2 transition-all ${
                    added
                      ? 'bg-[#94a38e] text-white'
                      : 'bg-[#1b4332] text-white hover:bg-[#153427] shadow-md'
                  }`}
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>{added ? 'Added to Bag ✓' : 'Add to Shopping Bag'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => onToggleWishlist(product.id)}
                  className="p-3.5 rounded-full border border-[#ececec] hover:bg-[#f9f6f1] transition-colors"
                >
                  <Heart
                    className={`w-5 h-5 ${
                      isWishlisted ? 'text-rose-500 fill-rose-500' : 'text-[#666666]'
                    }`}
                  />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[11px] text-[#666666] pt-2">
                <div className="flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-[#1b4332]" />
                  <span>Free shipping over $50</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#1b4332]" />
                  <span>30-day effortless returns</span>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
