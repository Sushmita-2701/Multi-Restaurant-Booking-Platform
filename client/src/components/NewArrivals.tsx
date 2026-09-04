import { useState } from 'react';
import { ArrowRight, Heart, Eye, ShoppingBag } from 'lucide-react';
import { Product } from '../types';

interface NewArrivalsProps {
  products: Product[];
  wishlist: string[];
  onToggleWishlist: (productId: string) => void;
  onAddToCart: (product: Product, selectedColor?: string) => void;
  onQuickView: (product: Product) => void;
  filterCategory: string | null;
}

export default function NewArrivals({
  products,
  wishlist,
  onToggleWishlist,
  onAddToCart,
  onQuickView,
  filterCategory,
}: NewArrivalsProps) {
  const [selectedColors, setSelectedColors] = useState<Record<string, string>>({});
  const [addedItem, setAddedItem] = useState<string | null>(null);

  const handleColorSelect = (productId: string, color: string) => {
    setSelectedColors((prev) => ({ ...prev, [productId]: color }));
  };

  const handleAdd = (product: Product) => {
    const chosenColor = selectedColors[product.id] || product.colors[0];
    onAddToCart(product, chosenColor);
    setAddedItem(product.id);
    setTimeout(() => setAddedItem(null), 1500);
  };

  const displayedProducts = filterCategory
    ? products.filter((p) => p.category.toLowerCase().includes(filterCategory.toLowerCase()))
    : products;

  return (
    <section id="new-arrivals" className="py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex items-end justify-between mb-10 sm:mb-12">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#94a38e] font-semibold block mb-1">
              Fresh Off The Line
            </span>
            <h2 className="font-serif-display text-2xl sm:text-3xl lg:text-4xl font-bold text-[#2d2d2d]">
              New Arrivals
            </h2>
            {filterCategory && (
              <p className="text-xs text-[#666666] mt-1">
                Showing results for <span className="font-semibold text-[#1b4332]">{filterCategory}</span>
              </p>
            )}
          </div>

          <a
            href="#new-arrivals"
            className="group inline-flex items-center gap-1.5 font-semibold text-xs sm:text-sm text-[#2d2d2d] pb-0.5 border-b-2 border-[#2d2d2d] hover:border-[#94a38e] hover:text-[#94a38e] transition-colors"
          >
            <span>View all</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </a>
        </div>

        {/* Product Grid (5 columns on xl/lg) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5 sm:gap-6">
          {displayedProducts.map((product) => {
            const isWishlisted = wishlist.includes(product.id);
            const activeColor = selectedColors[product.id] || product.colors[0];

            return (
              <div
                key={product.id}
                id={`product-card-${product.id}`}
                className="group relative flex flex-col justify-between"
              >
                {/* Image Container */}
                <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden bg-[#f9f6f1] mb-3 border border-[#ececec]">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />

                  {/* Wishlist Button */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleWishlist(product.id);
                    }}
                    aria-label={`Wishlist ${product.name}`}
                    className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/95 backdrop-blur-xs flex items-center justify-center shadow-md hover:scale-110 active:scale-95 transition-all text-[#2d2d2d]"
                  >
                    <Heart
                      className={`w-4 h-4 transition-colors ${
                        isWishlisted ? 'text-rose-500 fill-rose-500' : 'text-[#666666]'
                      }`}
                    />
                  </button>

                  {/* Quick Action Overlay on Desktop Hover */}
                  <div className="absolute inset-x-2 bottom-2 hidden sm:flex items-center gap-1.5 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200">
                    <button
                      type="button"
                      onClick={() => handleAdd(product)}
                      className="flex-1 bg-[#1b4332] text-white text-xs font-semibold py-2 px-2.5 rounded-lg flex items-center justify-center gap-1.5 hover:bg-[#153427] shadow-md transition-colors"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>{addedItem === product.id ? 'Added!' : 'Add to Cart'}</span>
                    </button>
                    
                    <button
                      type="button"
                      onClick={() => onQuickView(product)}
                      aria-label="Quick preview"
                      className="p-2 bg-white text-[#2d2d2d] rounded-lg shadow-md hover:bg-[#f9f6f1] transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Info Container */}
                <div>
                  <h3 className="font-medium text-sm sm:text-[15px] text-[#2d2d2d] truncate mb-1">
                    {product.name}
                  </h3>

                  <div className="flex items-center justify-between">
                    <div className="flex items-baseline gap-2">
                      <span className="font-semibold text-sm sm:text-base text-[#1b4332]">
                        ${product.price.toFixed(2)}
                      </span>
                      {product.originalPrice && (
                        <span className="text-xs text-[#999999] line-through">
                          ${product.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Color Swatch Dots */}
                  <div className="flex items-center gap-1.5 mt-2.5" aria-label="Available colors">
                    {product.colors.map((color, idx) => {
                      const isColorActive = activeColor === color;
                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => handleColorSelect(product.id, color)}
                          aria-label={`Select color swatch ${idx + 1}`}
                          className={`w-3.5 h-3.5 rounded-full border transition-all ${
                            isColorActive
                              ? 'ring-2 ring-[#1b4332] ring-offset-1 scale-110'
                              : 'border-black/15 hover:scale-105'
                          }`}
                          style={{ backgroundColor: color }}
                        />
                      );
                    })}
                  </div>

                  {/* Mobile Add to Cart Button */}
                  <div className="mt-3 sm:hidden">
                    <button
                      type="button"
                      onClick={() => handleAdd(product)}
                      className="w-full py-1.5 bg-[#1b4332] text-white text-xs font-semibold rounded-md active:bg-[#153427] transition-colors"
                    >
                      {addedItem === product.id ? 'Added ✓' : 'Add to Cart'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {displayedProducts.length === 0 && (
          <div className="text-center py-12 text-[#666666]">
            No products found matching category filter.
          </div>
        )}

      </div>
    </section>
  );
}
