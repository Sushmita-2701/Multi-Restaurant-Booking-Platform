import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onCheckout: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
}: CartDrawerProps) {
  if (!isOpen) return null;

  const subtotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const freeShippingThreshold = 50;
  const progressToFreeShipping = Math.min(
    100,
    (subtotal / freeShippingThreshold) * 100
  );
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          
          {/* Header */}
          <div className="p-5 border-b border-[#ececec] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#1b4332]" />
              <h2 className="font-serif-display text-lg font-bold text-[#2d2d2d]">
                Your Shopping Bag
              </h2>
              <span className="text-xs bg-[#f9f6f1] text-[#1b4332] font-semibold px-2 py-0.5 rounded-full">
                {cart.reduce((sum, item) => sum + item.quantity, 0)}
              </span>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg text-[#666666] hover:text-[#2d2d2d] hover:bg-[#f9f6f1] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress */}
          <div className="px-5 py-3 bg-[#f9f6f1] border-b border-[#ececec]">
            <div className="text-xs text-[#2d2d2d] font-medium mb-1.5 flex justify-between">
              {remainingForFreeShipping > 0 ? (
                <span>Add <strong>${remainingForFreeShipping.toFixed(2)}</strong> more for <strong>FREE shipping</strong></span>
              ) : (
                <span className="text-[#1b4332] font-semibold">🎉 You unlocked FREE standard shipping!</span>
              )}
              <span>{Math.round(progressToFreeShipping)}%</span>
            </div>
            <div className="w-full bg-[#ececec] h-2 rounded-full overflow-hidden">
              <div
                className="bg-[#1b4332] h-full transition-all duration-300 rounded-full"
                style={{ width: `${progressToFreeShipping}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4 divide-y divide-[#f0f0f0]">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center text-[#666666] py-12">
                <ShoppingBag className="w-12 h-12 text-[#94a38e] stroke-1 mb-3" />
                <p className="font-semibold text-[#2d2d2d]">Your bag is empty</p>
                <p className="text-xs mt-1 max-w-xs">
                  Discover our new arrivals and find something beautiful to add today.
                </p>
                <button
                  type="button"
                  onClick={onClose}
                  className="mt-5 text-xs font-semibold bg-[#1b4332] text-white px-5 py-2.5 rounded-full hover:bg-[#153427]"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div key={`${item.product.id}-${item.selectedColor}`} className="pt-4 first:pt-0 flex gap-4">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-18 h-22 object-cover rounded-lg bg-[#f9f6f1] border border-[#ececec]"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="font-semibold text-sm text-[#2d2d2d]">
                          {item.product.name}
                        </h4>
                        <button
                          type="button"
                          onClick={() => onRemoveItem(item.product.id)}
                          className="text-[#999999] hover:text-rose-600 transition-colors p-1"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {item.selectedColor && (
                        <div className="flex items-center gap-1.5 mt-1 text-xs text-[#666666]">
                          <span>Color:</span>
                          <span
                            className="w-2.5 h-2.5 rounded-full border border-black/20"
                            style={{ backgroundColor: item.selectedColor }}
                          />
                        </div>
                      )}

                      <div className="text-sm font-semibold text-[#1b4332] mt-1">
                        ${item.product.price.toFixed(2)}
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center border border-[#ececec] rounded-lg bg-[#f9f6f1]">
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.product.id, -1)}
                          className="p-1.5 hover:bg-white text-[#2d2d2d] rounded-l-lg transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-3 text-xs font-semibold text-[#2d2d2d]">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.product.id, 1)}
                          className="p-1.5 hover:bg-white text-[#2d2d2d] rounded-r-lg transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="text-sm font-bold text-[#2d2d2d]">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Subtotal & Checkout */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-[#ececec] bg-[#f9f6f1]/50 space-y-3">
              <div className="flex justify-between text-sm text-[#666666]">
                <span>Subtotal</span>
                <span className="font-semibold text-[#2d2d2d]">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-[#666666]">
                <span>Estimated Shipping</span>
                <span className="font-medium text-[#1b4332]">
                  {subtotal >= freeShippingThreshold ? 'FREE' : '$4.99'}
                </span>
              </div>
              <div className="flex justify-between text-base font-bold text-[#2d2d2d] pt-2 border-t border-[#ececec]">
                <span>Total</span>
                <span className="text-[#1b4332]">
                  ${(subtotal + (subtotal >= freeShippingThreshold ? 0 : 4.99)).toFixed(2)}
                </span>
              </div>

              <button
                type="button"
                id="cart-checkout-btn"
                onClick={onCheckout}
                className="w-full bg-[#1b4332] text-white font-semibold py-3.5 px-4 rounded-full flex items-center justify-center gap-2 hover:bg-[#153427] shadow-md transition-all"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <p className="text-[11px] text-center text-[#666666]">
                Taxes calculated during final order review.
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
