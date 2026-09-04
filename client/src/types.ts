export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  colors: string[];
  colorNames?: string[];
  isNew?: boolean;
  rating?: number;
  description?: string;
}

export interface Category {
  id: string;
  name: string;
  itemCount: string;
  image: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
}

export interface USP {
  icon: string;
  title: string;
  subtitle: string;
}
