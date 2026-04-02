export interface ProductVariant {
  id: string;
  dimensions: string;
  woodType: string;
  grade: string;
  price: number;
  stock: number;
  unit?: string;
}

export interface Product {
  id: number;
  name: string;
  image: string;
  description: string;
  variants: ProductVariant[];
  category?: string; 
  isActive?: boolean;
}

// Типы для корзины
export interface CartItem {
  id: string;
  productId: number;
  variantId: string;
  name: string;
  price: number;
  quantity: number;
  dimensions: string;
  woodType: string;
  grade: string;
  image?: string; 
  maxStock?: number; 
}

// Props для компонентов
export interface ShopingCartProps {
  isOpen?: boolean;
  onClose?: () => void;
  items?: CartItem[];
  onUpdateQuantity?: (id: string, quantity: number) => void;
  onRemoveItem?: (id: string) => void;
  onCheckout?: () => void; 
}

export interface ProductCardProps {
  product: Product;
  isExpanded: boolean;
  selectedVariantId: string | null;
  currentQuantity: number;
  onToggleDetails: (productId: number) => void;
  onVariantSelect: (productId: number, variantId: string) => void;
  onQuantityChange: (variantId: string, newQuantity: number) => void;
  onAddToCart: (product: Product) => void;
  getSelectedVariant: (productId: number) => any;
}

export interface ProductState {
  expandedProductId: number | null;
  selectedVariants: { [productId: number]: string };
  quantities: { [variantId: string]: number };
}

export interface CartState {
  items: CartItem[];
  isOpen: boolean;
}

export interface CartContextType {
  state: CartState;
  addItem: (product: Product, variant: ProductVariant, quantity: number) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
}
//Для хедера
export interface ProductMenuItem {
  id: number;
  name: string;
}
// Чтото на будущее (его нет)
export interface ApiProduct {
  id: number;
  name: string;
  description: string;
  image_url: string;
  category: string;
  is_active: boolean;
  created_at: string;
  variants: ApiProductVariant[];
}

export interface ApiProductVariant {
  id: string;
  product_id: number;
  dimensions: string;
  wood_type: string;
  grade: string;
  price: number;
  stock: number;
  unit: string;
}

export type GradeType = 'I' | 'II' | 'III';
export type WoodType = 'Сосна' | 'Ель' | 'Дуб' | 'Береза' | 'Ясень' | 'Бук' | 'Орех' | 'Хвоя';

export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;