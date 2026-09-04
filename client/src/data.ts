import { Category, Product, USP } from './types';

export const HERO_PRODUCT: Product = {
  id: 'hero-handbag',
  name: 'Luxe Handbag',
  price: 129.00,
  originalPrice: 159.00,
  image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=600&auto=format&fit=crop',
  category: 'Accessories',
  colors: ['#1b4332', '#d2b48c', '#2d2d2d'],
  description: 'Handcrafted genuine leather handbag with gold-tone hardware and versatile carry strap.',
};

export const CATEGORIES: Category[] = [
  {
    id: 'women',
    name: 'Women',
    itemCount: '120+ items',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: 'men',
    name: 'Men',
    itemCount: '98+ items',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: 'home',
    name: 'Home & Living',
    itemCount: '150+ items',
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e35a6?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: 'beauty',
    name: 'Beauty',
    itemCount: '80+ items',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfad450526?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: 'accessories',
    name: 'Accessories',
    itemCount: '70+ items',
    image: 'https://images.unsplash.com/photo-15356333027efd-8d4e1329cd4e?q=80&w=600&auto=format&fit=crop',
  },
];

export const NEW_ARRIVALS: Product[] = [
  {
    id: 'linen-shirt',
    name: 'Linen Shirt',
    price: 49.00,
    originalPrice: 65.00,
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=600&auto=format&fit=crop',
    category: 'Women',
    colors: ['#94a38e', '#e9c4bc', '#d1d5db'],
    colorNames: ['Sage Green', 'Dusty Rose', 'Heather Mist'],
    description: 'Breezy, lightweight European flax linen shirt with relaxed silhouette and shell buttons.',
  },
  {
    id: 'minimal-sneakers',
    name: 'Minimal Sneakers',
    price: 79.00,
    originalPrice: 95.00,
    image: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?q=80&w=600&auto=format&fit=crop',
    category: 'Men',
    colors: ['#ffffff', '#e9c4bc', '#374151'],
    colorNames: ['Pure White', 'Blush Tint', 'Slate Shadow'],
    description: 'Clean low-top sneakers crafted from sustainable vegan leather with cushioned insole.',
  },
  {
    id: 'scented-candle',
    name: 'Scented Candle',
    price: 26.00,
    originalPrice: 32.00,
    image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?q=80&w=600&auto=format&fit=crop',
    category: 'Home & Living',
    colors: ['#f9f6f1', '#e9c4bc', '#94a38e'],
    colorNames: ['Warm Vanilla', 'Sweet Fig', 'Wild Sage'],
    description: 'Hand-poured soy wax candle infused with essential oils and natural crackling wood wick.',
  },
  {
    id: 'straw-hat',
    name: 'Straw Hat',
    price: 35.00,
    originalPrice: 45.00,
    image: 'https://images.unsplash.com/photo-1533445091764-8069623c28ad?q=80&w=600&auto=format&fit=crop',
    category: 'Accessories',
    colors: ['#d2b48c', '#1b4332'],
    colorNames: ['Natural Wheat', 'Forest Ribbon'],
    description: 'Wide-brim woven toquilla straw hat offering UV sun protection with contrast ribbon band.',
  },
  {
    id: 'gold-hoops',
    name: 'Gold Hoops',
    price: 19.00,
    originalPrice: 28.00,
    image: 'https://images.unsplash.com/photo-15356333027efd-8d4e1329cd4e?q=80&w=600&auto=format&fit=crop',
    category: 'Accessories',
    colors: ['#ffd700', '#c0c0c0'],
    colorNames: ['18K Gold Plated', 'Polished Silver'],
    description: 'Timeless tubular chunky hoop earrings made with hypoallergenic stainless steel core.',
  },
];

export const MAIN_USPS: USP[] = [
  {
    icon: 'truck',
    title: 'Free Shipping',
    subtitle: 'On orders over $50',
  },
  {
    icon: 'lock',
    title: 'Secure Payment',
    subtitle: '100% protected',
  },
  {
    icon: 'rotate',
    title: 'Easy Returns',
    subtitle: '30-day return',
  },
  {
    icon: 'headset',
    title: '24/7 Support',
    subtitle: "We're here to help.",
  },
];

export const FOOTER_USPS: USP[] = [
  {
    icon: 'award',
    title: 'Quality You Can Trust',
    subtitle: 'Premium products crafted with care.',
  },
  {
    icon: 'headset',
    title: 'Customer Support',
    subtitle: "We're here to help, whenever you need.",
  },
  {
    icon: 'heart',
    title: 'Loved by Thousands',
    subtitle: 'Join our happy customer community.',
  },
  {
    icon: 'leaf',
    title: 'Sustainable Choice',
    subtitle: 'Thoughtful shopping for a better planet.',
  },
];
