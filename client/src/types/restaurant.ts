export interface MenuItem {
  name: string;
  price: string;
  description: string;
  category: 'Starters' | 'Mains' | 'Desserts' | 'Beverages' | 'Chef Specials';
  tag?: string; // e.g. 'Signature', 'Chef Pick', 'Vegetarian', 'Gluten-Free'
}

export interface Review {
  id: string;
  userName: string;
  userAvatar: string;
  rating: number;
  date: string;
  comment: string;
  tag?: string; // e.g. 'Verified Diner', 'Anniversary Dinner'
}

export interface Restaurant {
  id: string;
  name: string;
  tagline: string;
  cuisine: string;
  rating: number;
  reviewCount: number;
  priceRange: '₹₹' | '₹₹₹' | '₹₹₹₹';
  neighborhood: string;
  city: string;
  address: string;
  distance: string;
  image: string;
  gallery: string[];
  featured?: boolean;
  trending?: boolean;
  michelinGuide?: boolean;
  tags: string[];
  availableSlots: string[];
  description: string;
  chef: string;
  hours: string;
  dressCode: string;
  parking: string;
  phone: string;
  menu: MenuItem[];
  reviews: Review[];
}

export interface Reservation {
  id: string;
  restaurantId: string;
  restaurantName: string;
  restaurantImage: string;
  restaurantNeighborhood: string;
  restaurantAddress: string;
  guests: number;
  date: string;
  timeSlot: string;
  seatingArea: string;
  occasion: string;
  specialRequests?: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  status: 'confirmed' | 'cancelled';
  bookingRef: string;
  createdAt: string;
}

export interface CuisineCategory {
  id: string;
  name: string;
  image: string;
  restaurantCount: number;
  tagline: string;
}

export interface SearchFilterState {
  city: string;
  cuisine: string;
  date: string;
  timeSlot: string;
  guests: number;
  searchQuery: string;
  priceFilter: string;
  tagFilter: string;
}
