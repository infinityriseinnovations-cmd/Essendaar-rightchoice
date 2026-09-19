export interface ProductVariant {
  id?: string;
  title?: string;
  size: string;
  price: number;
  mrp?: number;
  regularPrice?: number;
  sku?: string;
  gift?: string;
  note?: string;
  inStock?: boolean;
  weight?: string;
  length?: string;
  dimensions?: string;
}

export interface ProductAttribute {
  name: string;
  options: string[];
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  brand: 'BOZZ' | 'MORNING SHINE' | 'SKY FRESH' | 'POWER RIDE' | 'ESSENDAAR BULK' | 'ESSENDAAR STATIONERY' | 'ESSENDAAR SPORTS' | 'ESSENDAAR SAFETY' | 'ACCESSORIES' | string;
  category: 'Kitchen Care' | 'Laundry Care' | 'Surface Care' | 'Sanitation' | 'Vehicle Care' | 'Institutional Bulk' | 'Accessories' | 'Notebooks & Registers' | 'Office Stationery' | 'Footballs & Basketballs' | 'Badminton & Games' | 'Sports Accessories' | 'Fire Safety' | 'Industrial Safety' | 'Personal Protection' | string;
  parentCategory?: 'Cleaning Products' | 'Stationery Products' | 'Sports Products' | 'Safety Products' | string;
  subCategory?: string;
  price: number;
  regularPrice: number;
  packSize: string;
  weight?: string;
  length?: string;
  dimensions?: string;
  rating: number;
  reviewCount: number;
  image: string;
  gallery: string[];
  shortDescription: string;
  description: string;
  stockStatus: string;
  sku: string;
  badge?: string;
  freebie?: string;
  comboOfferText?: string;
  certificationTitle?: string;
  certificationText?: string;
  trustBadge1Title?: string;
  trustBadge1Desc?: string;
  trustBadge2Title?: string;
  trustBadge2Desc?: string;
  wholesaleTier2Price?: number;
  wholesaleTier3Price?: number;
  features: string[];
  dilution?: string;
  pH?: string;
  fragrance?: string;
  shelfLife?: string;
  howToUse?: string;
  safetyData?: string;
  ingredients?: string;
  variants?: ProductVariant[];
  attributes?: ProductAttribute[];
  labCertified?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedVariant?: ProductVariant;
}

export type AppRoute = 
  | 'home' 
  | 'shop' 
  | 'product' 
  | 'contact' 
  | 'checkout' 
  | 'order-confirmation'
  | 'home-care-cleaning'
  | 'facility-management'
  | 'manpower-support'
  | 'institutional-supplies'
  | 'about-us'
  | 'admin'
  | 'customer-dashboard';

export interface CustomerUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  isEmailVerified: boolean;
  isPhoneVerified?: boolean;
  buyerType: 'retail' | 'business';
  companyName?: string;
  gstin?: string;
  address?: string;
  landmark?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  createdAt: string;
  password?: string;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'Super Administrator' | 'Operations Manager' | 'Plant Dispatcher';
  lastLogin: string;
}

export interface Inquiry {
  id: string;
  name: string;
  company?: string;
  phone: string;
  email?: string;
  serviceType: 'wholesale' | 'facility-audit' | 'manpower' | 'institutional-supplies' | 'general';
  message: string;
  date: string;
  status: 'new' | 'contacted' | 'quoted' | 'completed' | 'archived';
  notes?: string;
  estimatedVolume?: string;
}

export interface CheckoutFormData {
  buyerType: 'retail' | 'business';
  companyName?: string;
  gstin?: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  landmark?: string;
  city: string;
  postalCode: string;
  shippingMethod: 'chennai-express' | 'tn-standard' | 'depot-pickup';
  paymentMethod: 'upi' | 'card' | 'netbanking' | 'cod' | 'po';
  cardNumber?: string;
  cardExpiry?: string;
  cardCvc?: string;
  notes?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  items: CartItem[];
  customer: CheckoutFormData;
  subtotal: number;
  discount: number;
  freeSpongePack: boolean;
  shippingCost: number;
  tax: number;
  total: number;
  status: 'processing' | 'completed' | 'on-hold';
}

export interface StoreSettings {
  storeName: string;
  tagline: string;
  phone: string;
  email: string;
  location: string;
  announcementText: string;
  currencySymbol: string;
  freeShippingThreshold: number;
  isElementorMode: boolean;
  enableUpiQr: boolean;
  smtpHost?: string;
  smtpPort?: number;
  smtpUser?: string;
  smtpSecure?: boolean;
}
