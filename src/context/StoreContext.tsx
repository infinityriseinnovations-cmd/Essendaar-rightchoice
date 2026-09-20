import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, AppRoute, StoreSettings, Order, ProductVariant, Inquiry, CustomerUser, AdminUser } from '../types';
import { products as initialProducts } from '../data/products';

export interface AdminStats {
  totalProducts: number;
  totalOrders: number;
  totalRevenue: number;
  totalInquiries: number;
  pendingQuotes: number;
}

interface StoreContextType {
  products: Product[];
  cart: CartItem[];
  currentRoute: AppRoute;
  selectedProduct: Product | null;
  settings: StoreSettings;
  isCartDrawerOpen: boolean;
  isQuickViewOpen: boolean;
  quickViewProduct: Product | null;
  isSearchOpen: boolean;
  isCustomizerOpen: boolean;
  couponCode: string | null;
  appliedDiscount: number;
  latestOrder: Order | null;
  orders: Order[];
  inquiries: Inquiry[];
  viewMode: 'desktop' | 'mobile-preview';
  showTouchErgonomics: boolean;
  isLoadingLiveProduct: boolean;
  isAdminLoggedIn: boolean;
  adminUser: AdminUser | null;
  currentUser: CustomerUser | null;
  customersList: CustomerUser[];
  isAuthModalOpen: boolean;
  authModalTab: 'login' | 'register' | 'admin';

  // Shop Brand/Category Filter Navigation
  shopBrandFilter: string;
  setShopBrandFilter: (brand: string) => void;
  shopParentCategoryFilter: string;
  setShopParentCategoryFilter: (cat: string) => void;
  shopSubCategoryFilter: string;
  setShopSubCategoryFilter: (sub: string) => void;
  navigateToShopWithBrand: (brand: string) => void;
  navigateToShopWithCategory: (category: string, subCategory?: string) => void;

  // Policy & Rate Sheet Modal
  isPolicyModalOpen: boolean;
  policyModalTab: 'privacy' | 'terms' | 'return' | 'rate-card';
  openPolicyModal: (tab?: 'privacy' | 'terms' | 'return' | 'rate-card') => void;
  closePolicyModal: () => void;

  // Actions
  addToCart: (product: Product, quantity?: number, variant?: ProductVariant) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  setCurrentRoute: (route: AppRoute, pushHistory?: boolean) => void;
  setSelectedProduct: (product: Product | null, pushHistory?: boolean) => void;
  openQuickView: (product: Product) => void;
  closeQuickView: () => void;
  setIsCartDrawerOpen: (open: boolean) => void;
  setIsSearchOpen: (open: boolean) => void;
  setIsCustomizerOpen: (open: boolean) => void;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  updateSettings: (newSettings: Partial<StoreSettings>) => void;
  setLatestOrder: (order: Order | null) => void;
  setViewMode: (mode: 'desktop' | 'mobile-preview') => void;
  setShowTouchErgonomics: (show: boolean) => void;
  refreshWooCommerceProducts: () => Promise<void>;

  // Customer Auth Actions
  openAuthModal: (tab?: 'login' | 'register' | 'admin' | string) => void;
  closeAuthModal: () => void;
  sendEmailOtp: (email: string) => { otp: string; message: string };
  verifyEmailOtp: (email: string, otp: string) => { success: boolean; message: string };
  registerCustomer: (data: Partial<CustomerUser>) => { success: boolean; message: string; requiresOtp?: boolean };
  loginCustomer: (emailOrPhone: string, passwordOrOtp?: string) => { success: boolean; message: string };
  logoutCustomer: () => void;
  updateCustomerProfile: (updated: Partial<CustomerUser>) => void;

  // Admin Auth & Actions
  loginAdmin: (email: string, pinOrPass: string) => { success: boolean; message: string };
  logoutAdmin: () => void;
  setIsAdminLoggedIn: (logged: boolean) => void;
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (productId: string) => void;
  resetToDefaultProducts: () => void;
  importProductsJson: (productsData: Product[]) => void;
  addInquiry: (inquiry: Omit<Inquiry, 'id' | 'date' | 'status'>) => void;
  updateInquiryStatus: (id: string, status: Inquiry['status'], notes?: string) => void;
  deleteInquiry: (id: string) => void;
  addOrder: (order: Order) => void;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  deleteOrder: (orderId: string) => void;

  cartTotal: number;
  cartCount: number;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const initialSettings: StoreSettings = {
  storeName: 'ESSENDAAR',
  tagline: 'Clean Solutions. Reliable Services.',
  phone: '+91 97879 79757',
  email: 'info@rightchoiceindia.com',
  location: 'Mangadu, Chennai, Tamil Nadu - 600122',
  announcementText: 'ISO 9001:2015 Certified | Tamilnadu Test House Tested Formulation | Chennai Metro 24h Express Dispatch',
  currencySymbol: '₹',
  freeShippingThreshold: 499,
  isElementorMode: false,
  enableUpiQr: true,
  smtpHost: 'mail.rightchoiceindia.com',
  smtpPort: 465,
  smtpUser: 'info@rightchoiceindia.com',
  smtpSecure: true,
};

const initialInquiriesSeed: Inquiry[] = [
  {
    id: 'inq-101',
    name: 'Siva Kumar (Facility Officer)',
    company: 'SVS Matriculation Hr. Sec. School, Mangadu',
    phone: '+91 94441 23456',
    email: 'facilities@svsschool.edu.in',
    serviceType: 'wholesale',
    message: 'We require monthly recurring delivery of Morning Shine 5L Dishwash Concentrate (15 cans) and Care & Clean 5L Floor Cleaner (20 cans). Please issue 18% GST input tax quotation.',
    date: '2026-09-17',
    status: 'quoted',
    estimatedVolume: '35 Cans / Month',
    notes: 'Official rate card sent on WhatsApp. Waiting for Purchase Order approval.'
  },
  {
    id: 'inq-102',
    name: 'Rajesh Ramanathan',
    company: 'DLF IT Park Commercial Block, Ramapuram',
    phone: '+91 98402 88776',
    email: 'rajesh.r@dlftech.in',
    serviceType: 'facility-audit',
    message: 'Need urgent mechanized floor scrubbing and epoxy crystal polishing for 45,000 sq.ft lobby and basement parking area before annual audit.',
    date: '2026-09-18',
    status: 'new',
    estimatedVolume: '45,000 sq.ft Turnkey Audit'
  },
  {
    id: 'inq-103',
    name: 'Dr. Meenakshi Sundaram',
    company: 'Sundaram Multi-Specialty Clinic, Porur',
    phone: '+91 97910 55432',
    email: 'admin@sundaramhealth.org',
    serviceType: 'manpower',
    message: 'Looking for 6 vetted, uniformed housekeeping attendants for 2 hospital shifts with infection-control chemical handling training.',
    date: '2026-09-16',
    status: 'contacted',
    estimatedVolume: '6 Staff Attenders (2 Shifts)',
    notes: 'Spoke with Dr. Sundaram; scheduled site inspection for Saturday 11 AM.'
  },
  {
    id: 'inq-104',
    name: 'K. Venkatesh (Treasurer)',
    company: 'Green Valley Resident Welfare Association, Iyyappanthangal',
    phone: '+91 98840 91234',
    email: 'greenvalley.rwa@gmail.com',
    serviceType: 'institutional-supplies',
    message: 'Need 10 commercial microfiber mop trollies, 50L bulk floor disinfectant, and 10 automatic hand sanitizer dispensers for 240 apartments.',
    date: '2026-09-15',
    status: 'completed',
    estimatedVolume: '10 Carts + 50L Bulk',
    notes: 'Order delivered on 16th Sep. Payment cleared via UPI.'
  }
];

const initialOrdersSeed: Order[] = [
  {
    id: 'ord-1081',
    orderNumber: 'ORD-CHN-1081',
    date: '2026-09-18',
    items: [
      {
        product: initialProducts[0] || {} as any,
        quantity: 4
      },
      {
        product: initialProducts[1] || {} as any,
        quantity: 2
      }
    ],
    customer: {
      buyerType: 'business',
      companyName: 'SVS Educational Trust',
      gstin: '33AABCT9821F1ZX',
      email: 'finance@svsschool.edu.in',
      firstName: 'Siva',
      lastName: 'Kumar',
      phone: '+91 94441 23456',
      address: 'No 45, Kundrathur Main Road, Mangadu',
      city: 'Chennai',
      postalCode: '600122',
      shippingMethod: 'chennai-express',
      paymentMethod: 'upi',
      notes: 'Please dispatch with 18% GST printed bill.'
    },
    subtotal: 1850,
    discount: 185,
    freeSpongePack: true,
    shippingCost: 0,
    tax: 299,
    total: 1964,
    status: 'processing'
  },
  {
    id: 'ord-1080',
    orderNumber: 'ORD-CHN-1080',
    date: '2026-09-17',
    items: [
      {
        product: initialProducts[2] || {} as any,
        quantity: 1
      }
    ],
    customer: {
      buyerType: 'retail',
      email: 'vijay.k@gmail.com',
      firstName: 'Vijayaraghavan',
      lastName: 'K',
      phone: '+91 98410 44332',
      address: 'Flat 3B, VGN Krona, Gerugambakkam',
      city: 'Chennai',
      postalCode: '600128',
      shippingMethod: 'chennai-express',
      paymentMethod: 'upi'
    },
    subtotal: 449,
    discount: 0,
    freeSpongePack: true,
    shippingCost: 0,
    tax: 80,
    total: 529,
    status: 'completed'
  }
];

const initialCustomersSeed: CustomerUser[] = [
  {
    id: 'cust-101',
    name: 'Siva Kumar',
    email: 'finance@svsschool.edu.in',
    phone: '+91 94441 23456',
    isEmailVerified: true,
    isPhoneVerified: true,
    buyerType: 'business',
    companyName: 'SVS Matriculation Higher Secondary School',
    gstin: '33AABCT9821F1ZX',
    address: 'No 45, Kundrathur Main Road, Mangadu',
    landmark: 'Near Kamakshi Amman Temple',
    city: 'Chennai',
    state: 'Tamil Nadu',
    postalCode: '600122',
    createdAt: '2026-02-10'
  },
  {
    id: 'cust-102',
    name: 'Vijayaraghavan K',
    email: 'vijay.k@gmail.com',
    phone: '+91 98410 44332',
    isEmailVerified: true,
    isPhoneVerified: true,
    buyerType: 'retail',
    address: 'Flat 3B, VGN Krona, Gerugambakkam',
    landmark: 'Opposite DLF IT Park Road',
    city: 'Chennai',
    state: 'Tamil Nadu',
    postalCode: '600128',
    createdAt: '2026-03-01'
  },
  {
    id: 'cust-103',
    name: 'Senthil Kumar',
    email: 'senthil.procure@gmail.com',
    phone: '+91 98400 24561',
    isEmailVerified: true,
    isPhoneVerified: true,
    buyerType: 'business',
    companyName: 'Evergreen International School',
    gstin: '33AABCE1234F1Z5',
    address: 'Flat 4B, Ruby Towers, Kundrathur Main Road',
    landmark: 'Near Kamakshi Amman Temple',
    city: 'Mangadu, Chennai',
    state: 'Tamil Nadu',
    postalCode: '600122',
    createdAt: '2026-03-12'
  }
];

const initialAdminSeed: AdminUser = {
  id: 'admin-1',
  name: 'Essendaar Operations Manager',
  email: 'info@rightchoiceindia.com',
  role: 'Super Administrator',
  lastLogin: new Date().toISOString()
};

// Convert raw WooCommerce REST API Product object to our Product interface
const mapWcProductToAppProduct = (wcProduct: any): Product => {
  // WooCommerce Store API returns prices in minor currency units (paisa) or string
  let price = 0;
  let regularPrice = 0;

  if (wcProduct.prices) {
    const rawPrice = wcProduct.prices.price || wcProduct.prices.regular_price || '0';
    const rawReg = wcProduct.prices.regular_price || rawPrice;
    const decimals = wcProduct.prices.currency_minor_unit ?? 2;
    price = parseFloat(rawPrice) / Math.pow(10, decimals);
    regularPrice = parseFloat(rawReg) / Math.pow(10, decimals);
  } else if (wcProduct.price !== undefined) {
    price = parseFloat(wcProduct.price) || 0;
    regularPrice = parseFloat(wcProduct.regular_price || wcProduct.price) || price;
  }

  if (regularPrice < price || regularPrice === 0) {
    regularPrice = price;
  }

  // Extract images from media library
  const imageList: string[] = [];
  if (Array.isArray(wcProduct.images)) {
    wcProduct.images.forEach((img: any) => {
      if (img.src) imageList.push(img.src);
      else if (img.url) imageList.push(img.url);
    });
  } else if (wcProduct._embedded?.['wp:featuredmedia']?.[0]?.source_url) {
    imageList.push(wcProduct._embedded['wp:featuredmedia'][0].source_url);
  }

  const primaryImage = imageList[0] || 'https://lh3.googleusercontent.com/aida-public/AB6AXuCWsqgCY-jIhZJv6Okv_M4F_bRMGmEwd9HhZ8Pwwv1wIZWBGzCmPegx9mE5ld8MYDnee9JDiR8IZHwpMqCbz1A3A9HilUlvpoHjLwKbOprquqRRgS9DBvehTZpPGbdsXfDWWccSZjIVqKrc4BhVST623U6qF_9-I4sHkseS4RtyjjA-Z19ju2MuIKmIZjfBbRg7LXVZvcy-dqXOapJ7hc5HPQvm4Fda9BIUsYAWmgen30EOiwHLESUK5A';

  // Category mapping
  let categoryName = 'Surface Care';
  if (Array.isArray(wcProduct.categories) && wcProduct.categories.length > 0) {
    categoryName = wcProduct.categories[0].name || categoryName;
  }

  // Parse HTML strings safely
  const cleanHtml = (htmlStr: string = '') => {
    if (!htmlStr) return '';
    return htmlStr.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
  };

  const shortDesc = cleanHtml(wcProduct.short_description || wcProduct.excerpt?.rendered || '');
  const longDesc = cleanHtml(wcProduct.description || wcProduct.content?.rendered || '') || shortDesc || 'High performance formulation by Essendaar Suppliers.';

  const brandName = wcProduct.attributes?.find((a: any) => a.name?.toLowerCase().includes('brand'))?.terms?.[0]?.name ||
                    (wcProduct.categories?.[0]?.name?.toUpperCase().includes('BOZZ') ? 'BOZZ' : 
                     wcProduct.categories?.[0]?.name?.toUpperCase().includes('MORNING') ? 'MORNING SHINE' :
                     wcProduct.categories?.[0]?.name?.toUpperCase().includes('SKY') ? 'SKY FRESH' :
                     wcProduct.categories?.[0]?.name?.toUpperCase().includes('POWER') ? 'POWER RIDE' : 'ESSENDAAR BULK');

  const slug = wcProduct.slug || `prod-${wcProduct.id}`;

  // Extract attributes (Weight, Length, Size, Pack Size, etc.)
  const rawAttributes: any[] = Array.isArray(wcProduct.attributes) ? wcProduct.attributes : [];
  const parsedAttributes = rawAttributes.map((attr: any) => {
    const attrName = attr.name || '';
    let options: string[] = [];
    if (Array.isArray(attr.terms)) {
      options = attr.terms.map((t: any) => t.name || t.slug || String(t));
    } else if (Array.isArray(attr.options)) {
      options = attr.options.map(String);
    }
    return { name: attrName, options };
  });

  // Extract Weight & Dimensions
  let weightStr = wcProduct.weight ? `${wcProduct.weight} kg` : undefined;
  let dimensionsStr = undefined;
  if (wcProduct.dimensions) {
    const { length, width, height } = wcProduct.dimensions;
    if (length || width || height) {
      dimensionsStr = `${length || '0'} x ${width || '0'} x ${height || '0'} cm`;
    }
  }

  // Extract default pack size or attribute label
  const primaryAttr = rawAttributes.find((a: any) => {
    const n = (a.name || '').toLowerCase();
    return n.includes('pack') || n.includes('size') || n.includes('weight') || n.includes('length') || n.includes('volume');
  });

  const packSizeVal = primaryAttr?.terms?.[0]?.name || primaryAttr?.options?.[0] || weightStr || 'Standard Unit';

  // Parse variations if attached or construct from multi-option attributes
  let variants: ProductVariant[] | undefined = undefined;

  if (Array.isArray(wcProduct.variation_data) && wcProduct.variation_data.length > 0) {
    variants = wcProduct.variation_data.map((v: any) => ({
      id: String(v.id || ''),
      size: v.attribute_summary || v.name || 'Option',
      price: parseFloat(v.price || v.sale_price || price),
      regularPrice: parseFloat(v.regular_price || price),
      mrp: parseFloat(v.regular_price || price),
      sku: v.sku || wcProduct.sku || slug.toUpperCase(),
      weight: v.weight ? `${v.weight} kg` : undefined,
      dimensions: v.dimensions ? `${v.dimensions.length}x${v.dimensions.width}x${v.dimensions.height} cm` : undefined,
      inStock: v.is_in_stock !== false
    }));
  } else if (primaryAttr && primaryAttr.options && primaryAttr.options.length > 1) {
    // If multiple options exist in attributes
    variants = primaryAttr.options.map((opt: string, idx: number) => ({
      size: opt,
      price: price,
      regularPrice: regularPrice,
      mrp: regularPrice,
      sku: `${(wcProduct.sku || slug).toUpperCase()}-${idx + 1}`,
      inStock: true
    }));
  }

  // Extract custom meta fields for Directions & Dilution, Safety Data & Ingredients
  const getCustomMeta = (keys: string[]): string | undefined => {
    // 1. Check meta_data array
    if (Array.isArray(wcProduct.meta_data)) {
      for (const k of keys) {
        const item = wcProduct.meta_data.find((m: any) => m.key === k || m.key === `_${k}`);
        if (item && item.value) {
          const val = typeof item.value === 'string' ? item.value : JSON.stringify(item.value);
          if (val.trim()) return val.trim();
        }
      }
    }
    // 2. Check meta object or root properties
    for (const k of keys) {
      if (wcProduct[k] && typeof wcProduct[k] === 'string' && wcProduct[k].trim()) return wcProduct[k].trim();
      if (wcProduct[`_${k}`] && typeof wcProduct[`_${k}`] === 'string' && wcProduct[`_${k}`].trim()) return wcProduct[`_${k}`].trim();
      if (wcProduct.meta && typeof wcProduct.meta === 'object') {
        if (wcProduct.meta[k] && typeof wcProduct.meta[k] === 'string' && wcProduct.meta[k].trim()) return wcProduct.meta[k].trim();
        if (wcProduct.meta[`_${k}`] && typeof wcProduct.meta[`_${k}`] === 'string' && wcProduct.meta[`_${k}`].trim()) return wcProduct.meta[`_${k}`].trim();
      }
    }
    return undefined;
  };

  const howToUseVal = getCustomMeta(['directions_and_dilution', 'directions_dilution', 'how_to_use', 'usage_instructions', 'usage', 'dilution']);
  const safetyDataVal = getCustomMeta(['safety_data_ingredients', 'safety_data', 'ingredients', 'safety', 'material_safety']);

  return {
    id: String(wcProduct.id || slug),
    name: wcProduct.name || wcProduct.title?.rendered || slug,
    slug: slug,
    brand: brandName as any,
    category: categoryName as any,
    price: price || 99,
    regularPrice: regularPrice || price || 120,
    rating: parseFloat(wcProduct.average_rating) || 5.0,
    reviewCount: parseInt(wcProduct.review_count) || 1,
    packSize: packSizeVal,
    weight: weightStr,
    dimensions: dimensionsStr,
    image: primaryImage,
    gallery: imageList.length > 0 ? imageList : [primaryImage],
    shortDescription: shortDesc || 'Certified hygiene & cleaning formulation by Essendaar Suppliers.',
    description: longDesc,
    howToUse: howToUseVal,
    safetyData: safetyDataVal,
    stockStatus: wcProduct.is_in_stock !== false ? 'In Stock (Chennai Warehouse)' : 'Out of Stock',
    sku: wcProduct.sku || slug.toUpperCase(),
    badge: wcProduct.on_sale ? 'ON SALE' : 'VERIFIED PRODUCT',
    features: [
      'ISO 9001:2015 Quality Tested',
      'Tamilnadu Test House Certified Quality',
      'Direct Dispatch from Mangadu Plant'
    ],
    pH: 'Balanced',
    fragrance: 'Fresh Clean',
    shelfLife: '24 Months',
    attributes: parsedAttributes.length > 0 ? parsedAttributes : undefined,
    variants: variants,
    labCertified: true
  };
};

// Helper to resolve route and product from URL pathname
const parseRouteFromUrl = (productsList: Product[]) => {
  if (typeof window === 'undefined') {
    return { route: 'home' as AppRoute, product: productsList[0] || null, slug: null };
  }

  const rawPath = (window.location.pathname || '').toLowerCase();
  const rawSearch = (window.location.search || '').toLowerCase();
  const rawHash = (window.location.hash || '').toLowerCase();
  const fullUrl = `${rawPath} ${rawSearch} ${rawHash}`;

  // Check explicit query parameter overrides like ?route=home-care-cleaning or ?page=home-care-cleaning
  const params = new URLSearchParams(window.location.search);
  const routeParam = (params.get('route') || params.get('page') || params.get('view') || '').toLowerCase();

  if (routeParam) {
    if (routeParam.includes('home-care') || routeParam.includes('homecare') || routeParam.includes('right-choice') || routeParam.includes('rightchoice')) {
      return { route: 'home-care-cleaning' as AppRoute, product: null, slug: null };
    }
    if (routeParam.includes('facility')) return { route: 'facility-management' as AppRoute, product: null, slug: null };
    if (routeParam.includes('manpower')) return { route: 'manpower-support' as AppRoute, product: null, slug: null };
    if (routeParam.includes('institutional') || routeParam.includes('supplies')) return { route: 'institutional-supplies' as AppRoute, product: null, slug: null };
    if (routeParam.includes('about')) return { route: 'about-us' as AppRoute, product: null, slug: null };
    if (routeParam.includes('contact')) return { route: 'contact' as AppRoute, product: null, slug: null };
    if (routeParam.includes('shop') || routeParam.includes('catalog')) return { route: 'shop' as AppRoute, product: null, slug: null };
    if (routeParam.includes('admin') || routeParam.includes('dashboard')) return { route: 'admin' as AppRoute, product: null, slug: null };
    if (routeParam.includes('account') || routeParam.includes('customer')) return { route: 'customer-dashboard' as AppRoute, product: null, slug: null };
  }

  const path = rawPath.replace(/\/+$/, '') || '/';

  // Route matching from pathname
  if (fullUrl.includes('home-care-cleaning') || fullUrl.includes('home-care') || fullUrl.includes('homecare') || fullUrl.includes('home_care') || fullUrl.includes('right-choice') || fullUrl.includes('rightchoice') || fullUrl.includes('right_choice')) {
    return { route: 'home-care-cleaning' as AppRoute, product: null, slug: null };
  }
  if (fullUrl.includes('/admin') || fullUrl.includes('/dashboard') || fullUrl.includes('/backend')) {
    return { route: 'admin' as AppRoute, product: null, slug: null };
  }
  if (fullUrl.includes('/shop')) {
    return { route: 'shop' as AppRoute, product: null, slug: null };
  }
  if (fullUrl.includes('/checkout')) {
    return { route: 'checkout' as AppRoute, product: null, slug: null };
  }
  if (fullUrl.includes('/contact')) {
    return { route: 'contact' as AppRoute, product: null, slug: null };
  }
  if (fullUrl.includes('/about')) {
    return { route: 'about-us' as AppRoute, product: null, slug: null };
  }
  if (fullUrl.includes('/facility-management') || fullUrl.includes('facility_management')) {
    return { route: 'facility-management' as AppRoute, product: null, slug: null };
  }
  if (fullUrl.includes('/manpower-support') || fullUrl.includes('manpower_support') || fullUrl.includes('manpower')) {
    return { route: 'manpower-support' as AppRoute, product: null, slug: null };
  }
  if (fullUrl.includes('/institutional-supplies') || fullUrl.includes('institutional_supplies') || fullUrl.includes('institutional')) {
    return { route: 'institutional-supplies' as AppRoute, product: null, slug: null };
  }
  if (fullUrl.includes('/account') || fullUrl.includes('/my-account') || fullUrl.includes('/customer-dashboard') || fullUrl.includes('/customer')) {
    return { route: 'customer-dashboard' as AppRoute, product: null, slug: null };
  }

  if (path === '' || path === '/') {
    return { route: 'home' as AppRoute, product: productsList[0] || null, slug: null };
  }

  // Check product URL pattern: /product/:slug or /shop/:slug
  const productMatch = path.match(/\/(?:product|item|p)\/([^/]+)/i);
  if (productMatch && productMatch[1]) {
    const slug = productMatch[1].trim();
    const found = productsList.find(
      (p) => p.slug.toLowerCase() === slug || p.id.toLowerCase() === slug
    );
    if (found) {
      return { route: 'product' as AppRoute, product: found, slug };
    } else {
      const formattedTitle = slug
        .split('-')
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ');

      const dynamicProduct: Product = {
        id: slug,
        name: formattedTitle || 'Product Details',
        slug: slug,
        brand: 'ESSENDAAR BULK',
        category: 'Surface Care',
        price: 99,
        regularPrice: 120,
        rating: 5.0,
        reviewCount: 1,
        packSize: 'Standard Unit',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCWsqgCY-jIhZJv6Okv_M4F_bRMGmEwd9HhZ8Pwwv1wIZWBGzCmPegx9mE5ld8MYDnee9JDiR8IZHwpMqCbz1A3A9HilUlvpoHjLwKbOprquqRRgS9DBvehTZpPGbdsXfDWWccSZjIVqKrc4BhVST623U6qF_9-I4sHkseS4RtyjjA-Z19ju2MuIKmIZjfBbRg7LXVZvcy-dqXOapJ7hc5HPQvm4Fda9BIUsYAWmgen30EOiwHLESUK5A',
        gallery: [
          'https://lh3.googleusercontent.com/aida-public/AB6AXuCWsqgCY-jIhZJv6Okv_M4F_bRMGmEwd9HhZ8Pwwv1wIZWBGzCmPegx9mE5ld8MYDnee9JDiR8IZHwpMqCbz1A3A9HilUlvpoHjLwKbOprquqRRgS9DBvehTZpPGbdsXfDWWccSZjIVqKrc4BhVST623U6qF_9-I4sHkseS4RtyjjA-Z19ju2MuIKmIZjfBbRg7LXVZvcy-dqXOapJ7hc5HPQvm4Fda9BIUsYAWmgen30EOiwHLESUK5A'
        ],
        shortDescription: 'Certified hygiene & cleaning product by Essendaar Suppliers.',
        description: `High performance cleaning and hygiene formulation. Packaged and quality tested according to ISO 9001:2015 standards at our Mangadu, Chennai facility.`,
        stockStatus: 'In Stock (Chennai Warehouse)',
        sku: slug.toUpperCase(),
        badge: 'ACTIVE PRODUCT',
        features: [
          'ISO 9001:2015 Quality Tested',
          'Tamilnadu Test House Certified Quality',
          'Direct Dispatch from Mangadu Plant'
        ],
        pH: 'Balanced',
        fragrance: 'Fresh Clean',
        shelfLife: '24 Months',
        labCertified: true
      };

      return { route: 'product' as AppRoute, product: dynamicProduct, slug };
    }
  }

  return { route: 'home' as AppRoute, product: productsList[0] || null, slug: null };
};

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load products from localStorage if customized, else use initialProducts
  const [products, setProducts] = useState<Product[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('essendaar_products_catalog');
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) return parsed;
        }
      } catch (e) {
        console.error('Error loading stored products', e);
      }
    }
    return initialProducts;
  });

  const [isLoadingLiveProduct, setIsLoadingLiveProduct] = useState<boolean>(false);
  
  // Admin Session State
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('essendaar_admin_session');
        if (saved !== null) return JSON.parse(saved);
      } catch (e) {
        console.error('Error loading admin session', e);
      }
    }
    return true; // default true for immediate developer preview convenience, but can be logged out anytime
  });

  const [adminUser, setAdminUser] = useState<AdminUser | null>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('essendaar_admin_user');
        if (saved) return JSON.parse(saved);
      } catch (e) {
        console.error('Error loading admin user', e);
      }
    }
    return initialAdminSeed;
  });

  // Customers Directory State
  const [customersList, setCustomersList] = useState<CustomerUser[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('essendaar_customers_list');
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) return parsed;
        }
      } catch (e) {
        console.error('Error loading stored customers', e);
      }
    }
    return initialCustomersSeed;
  });

  // Current Logged-in Customer User State (strictly null by default until customer logs in)
  const [currentUser, setCurrentUser] = useState<CustomerUser | null>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('essendaar_current_user');
        if (saved) {
          const parsed = JSON.parse(saved);
          // If it was the old auto-seeded default user, remove it so clean visitors are not auto logged-in
          if (parsed && typeof parsed.id === 'string' && parsed.id.startsWith('cust-seed-')) {
            localStorage.removeItem('essendaar_current_user');
            return null;
          }
          return parsed;
        }
      } catch (e) {
        console.error('Error loading current user', e);
      }
    }
    // Default to null - customer must explicitly log in via Account button
    return null;
  });

  // Auth Modal State
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<'login' | 'register' | 'admin'>('login');

  // Simulated OTP Store { [emailOrPhone: string]: { otp: string, timestamp: number } }
  const [otpStore, setOtpStore] = useState<{ [key: string]: { otp: string; timestamp: number } }>({
    'finance@svsschool.edu.in': { otp: '123456', timestamp: Date.now() },
    'senthil.procure@gmail.com': { otp: '123456', timestamp: Date.now() },
    'vijay.k@gmail.com': { otp: '123456', timestamp: Date.now() }
  });

  // Inquiries State with localStorage sync
  const [inquiries, setInquiries] = useState<Inquiry[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('essendaar_inquiries_list');
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed)) return parsed;
        }
      } catch (e) {
        console.error('Error loading stored inquiries', e);
      }
    }
    return initialInquiriesSeed;
  });

  // Orders State with localStorage sync
  const [orders, setOrders] = useState<Order[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('essendaar_orders_list');
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed)) return parsed;
        }
      } catch (e) {
        console.error('Error loading stored orders', e);
      }
    }
    return initialOrdersSeed;
  });

  // Settings with localStorage sync
  const [settings, setSettings] = useState<StoreSettings>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('essendaar_store_settings');
        if (saved) {
          return { ...initialSettings, ...JSON.parse(saved) };
        }
      } catch (e) {
        console.error('Error loading stored settings', e);
      }
    }
    return initialSettings;
  });

  // Save changes to localStorage automatically
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('essendaar_products_catalog', JSON.stringify(products));
    }
  }, [products]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('essendaar_inquiries_list', JSON.stringify(inquiries));
    }
  }, [inquiries]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('essendaar_orders_list', JSON.stringify(orders));
    }
  }, [orders]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('essendaar_store_settings', JSON.stringify(settings));
    }
  }, [settings]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('essendaar_customers_list', JSON.stringify(customersList));
    }
  }, [customersList]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (currentUser) {
        localStorage.setItem('essendaar_current_user', JSON.stringify(currentUser));
      } else {
        localStorage.removeItem('essendaar_current_user');
      }
    }
  }, [currentUser]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('essendaar_admin_session', JSON.stringify(isAdminLoggedIn));
      if (adminUser) {
        localStorage.setItem('essendaar_admin_user', JSON.stringify(adminUser));
      }
    }
  }, [isAdminLoggedIn, adminUser]);

  const initialRouteData = parseRouteFromUrl(products);
  const [currentRoute, _setCurrentRouteState] = useState<AppRoute>(initialRouteData.route);
  const [selectedProduct, _setSelectedProductState] = useState<Product | null>(initialRouteData.product);

  // Live WooCommerce REST API Fetcher for single product
  const fetchLiveWooProduct = async (slug: string) => {
    if (!slug) return;
    setIsLoadingLiveProduct(true);

    const endpoints = [
      `/wp-json/wc/store/v1/products?slug=${encodeURIComponent(slug)}`,
      `https://rightchoiceindia.com/wp-json/wc/store/v1/products?slug=${encodeURIComponent(slug)}`,
      `/wp-json/wp/v2/product?slug=${encodeURIComponent(slug)}&_embed`,
      `https://rightchoiceindia.com/wp-json/wp/v2/product?slug=${encodeURIComponent(slug)}&_embed`
    ];

    for (const url of endpoints) {
      try {
        const response = await fetch(url, { headers: { Accept: 'application/json' } });
        if (response.ok) {
          const data = await response.json();
          const items = Array.isArray(data) ? data : [data];
          if (items.length > 0 && items[0]) {
            const mapped = mapWcProductToAppProduct(items[0]);
            _setSelectedProductState(mapped);
            setProducts((prev) => {
              const exists = prev.some((p) => p.slug.toLowerCase() === slug.toLowerCase() || p.id === mapped.id);
              if (exists) {
                return prev.map((p) => (p.slug.toLowerCase() === slug.toLowerCase() || p.id === mapped.id ? mapped : p));
              }
              return [mapped, ...prev];
            });
            setIsLoadingLiveProduct(false);
            return;
          }
        }
      } catch {
        // Fallback
      }
    }
    setIsLoadingLiveProduct(false);
  };

  // Live WooCommerce catalog fetcher
  const refreshWooCommerceProducts = async () => {
    const endpoints = [
      `/wp-json/wc/store/v1/products?per_page=100`,
      `https://rightchoiceindia.com/wp-json/wc/store/v1/products?per_page=100`
    ];

    for (const url of endpoints) {
      try {
        const res = await fetch(url);
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            const mappedList = data.map(mapWcProductToAppProduct);
            setProducts((prev) => {
              const map = new Map<string, Product>();
              prev.forEach((p) => map.set(p.slug.toLowerCase(), p));
              mappedList.forEach((p) => map.set(p.slug.toLowerCase(), p));
              return Array.from(map.values());
            });
            return;
          }
        }
      } catch {
        // Ignore fallback
      }
    }
  };

  // Initial load effect
  useEffect(() => {
    refreshWooCommerceProducts();
    const parsed = parseRouteFromUrl(products);
    if (parsed.slug) {
      fetchLiveWooProduct(parsed.slug);
    }
  }, []);

  // Sync route changes with browser URL
  const setCurrentRoute = (route: AppRoute, pushHistory = true) => {
    _setCurrentRouteState(route);
    if (pushHistory && typeof window !== 'undefined') {
      let path = '/';
      switch (route) {
        case 'admin':
          path = '/admin';
          break;
        case 'shop':
          path = '/shop';
          break;
        case 'about-us':
          path = '/about-us';
          break;
        case 'contact':
          path = '/contact';
          break;
        case 'checkout':
          path = '/checkout';
          break;
        case 'facility-management':
          path = '/facility-management';
          break;
        case 'manpower-support':
          path = '/manpower-support';
          break;
        case 'institutional-supplies':
          path = '/institutional-supplies';
          break;
        case 'home-care-cleaning':
          path = '/home-care-cleaning';
          break;
        case 'customer-dashboard':
          path = '/customer-dashboard';
          break;
        case 'product':
          path = selectedProduct ? `/product/${selectedProduct.slug}` : '/shop';
          break;
        default:
          path = '/';
      }
      if (window.location.pathname !== path) {
        window.history.pushState({ route }, '', path);
      }
    }
  };

  const setSelectedProduct = (product: Product | null, pushHistory = true) => {
    _setSelectedProductState(product);
    if (product) {
      _setCurrentRouteState('product');
      if (product.slug) {
        fetchLiveWooProduct(product.slug);
      }
      if (pushHistory && typeof window !== 'undefined') {
        const path = `/product/${product.slug}`;
        if (window.location.pathname !== path) {
          window.history.pushState({ route: 'product', slug: product.slug }, '', path);
        }
      }
    }
  };

  // Listen to browser Back / Forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const parsed = parseRouteFromUrl(products);
      _setCurrentRouteState(parsed.route);
      if (parsed.product) {
        _setSelectedProductState(parsed.product);
        if (parsed.slug) {
          fetchLiveWooProduct(parsed.slug);
        }
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [products]);

  // Cart state - strictly empty by default, only populates when user adds products
  const [cart, setCart] = useState<CartItem[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('essendaar_cart_items');
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed)) return parsed;
        }
      } catch {
        // ignore storage errors
      }
    }
    return [];
  });

  // Sync cart state to localStorage automatically
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('essendaar_cart_items', JSON.stringify(cart));
      } catch {
        // ignore
      }
    }
  }, [cart]);

  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);

  // Shop brand & category navigation state
  const [shopBrandFilter, setShopBrandFilter] = useState<string>('all');
  const [shopParentCategoryFilter, setShopParentCategoryFilter] = useState<string>('all');
  const [shopSubCategoryFilter, setShopSubCategoryFilter] = useState<string>('all');

  const navigateToShopWithBrand = (brand: string) => {
    setShopBrandFilter(brand);
    setShopParentCategoryFilter('all');
    setShopSubCategoryFilter('all');
    _setCurrentRouteState('shop');
    if (typeof window !== 'undefined') {
      window.history.pushState({ route: 'shop' }, '', '/shop');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const navigateToShopWithCategory = (category: string, subCategory: string = 'all') => {
    setShopBrandFilter('all');
    setShopParentCategoryFilter(category);
    setShopSubCategoryFilter(subCategory);
    _setCurrentRouteState('shop');
    if (typeof window !== 'undefined') {
      window.history.pushState({ route: 'shop' }, '', '/shop');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Policy Modal state
  const [isPolicyModalOpen, setIsPolicyModalOpen] = useState(false);
  const [policyModalTab, setPolicyModalTab] = useState<'privacy' | 'terms' | 'return' | 'rate-card'>('privacy');

  const openPolicyModal = (tab: 'privacy' | 'terms' | 'return' | 'rate-card' = 'privacy') => {
    setPolicyModalTab(tab);
    setIsPolicyModalOpen(true);
  };

  const closePolicyModal = () => {
    setIsPolicyModalOpen(false);
  };

  // Pre-applied coupon ESSENDAAR10
  const [couponCode, setCouponCode] = useState<string | null>('ESSENDAAR10');
  const [latestOrder, setLatestOrder] = useState<Order | null>(null);

  const [viewMode, setViewMode] = useState<'desktop' | 'mobile-preview'>('desktop');
  const [showTouchErgonomics, setShowTouchErgonomics] = useState(false);

  const cartTotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const appliedDiscount = couponCode === 'ESSENDAAR10' ? Math.round(cartTotal * 0.1) : 0;

  const addToCart = (product: Product, quantity = 1, variant?: ProductVariant) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity, selectedVariant: variant }];
    });
    setIsCartDrawerOpen(true);
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const openQuickView = (product: Product) => {
    setQuickViewProduct(product);
    setIsQuickViewOpen(true);
  };

  const closeQuickView = () => {
    setIsQuickViewOpen(false);
    setQuickViewProduct(null);
  };

  const applyCoupon = (code: string) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'ESSENDAAR10') {
      setCouponCode('ESSENDAAR10');
      return { success: true, message: 'Coupon ESSENDAAR10 applied (-10% introductory savings)' };
    }
    if (clean === 'FREESHIP') {
      setCouponCode('FREESHIP');
      return { success: true, message: 'Free Express Shipping unlocked' };
    }
    return { success: false, message: 'Invalid coupon code. Try ESSENDAAR10' };
  };

  const removeCoupon = () => {
    setCouponCode(null);
  };

  const updateSettings = (newSettings: Partial<StoreSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  // CUSTOMER AUTH ACTIONS
  const openAuthModal = (tab: 'login' | 'register' | 'admin' | string = 'login') => {
    const normalizedTab: 'login' | 'register' | 'admin' =
      tab === 'register' ? 'register' :
      tab === 'admin' ? 'admin' : 'login';
    setAuthModalTab(normalizedTab);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const sendEmailOtp = (email: string, name?: string) => {
    const cleanEmail = email.trim().toLowerCase();
    // Default demo OTP or active code
    const otp = '123456';
    setOtpStore((prev) => ({
      ...prev,
      [cleanEmail]: { otp, timestamp: Date.now() }
    }));

    // Trigger server-side SMTP email dispatch via mail.rightchoiceindia.com
    fetch('/api/send-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: cleanEmail, otp, name: name || 'Customer' })
    }).catch((err) => {
      console.warn('[SMTP Dispatch Notice]:', err.message);
    });

    return {
      otp,
      message: `OTP verification code sent to ${email} via mail.rightchoiceindia.com. (Demo Code: ${otp})`
    };
  };

  const verifyEmailOtp = (email: string, inputOtp: string) => {
    const cleanEmail = email.trim().toLowerCase();
    const stored = otpStore[cleanEmail];
    const isValid = inputOtp.trim() === '123456' || (stored && stored.otp === inputOtp.trim());

    if (isValid) {
      // Find existing customer or mark verified
      setCustomersList((prev) => {
        const existing = prev.find((c) => c.email.toLowerCase() === cleanEmail);
        if (existing) {
          const updated = { ...existing, isEmailVerified: true };
          setCurrentUser(updated);
          return prev.map((c) => (c.email.toLowerCase() === cleanEmail ? updated : c));
        }
        return prev;
      });
      return { success: true, message: 'Email address verified successfully!' };
    }

    return { success: false, message: 'Invalid OTP code. Please enter the 6-digit code or use 123456.' };
  };

  const registerCustomer = (data: Partial<CustomerUser>) => {
    if (!data.email || !data.name || !data.phone) {
      return { success: false, message: 'Please fill in all mandatory fields (Name, Email, and Phone).' };
    }

    const cleanEmail = data.email.trim().toLowerCase();
    const existing = customersList.find((c) => c.email.toLowerCase() === cleanEmail);

    const newCustomer: CustomerUser = {
      id: existing ? existing.id : `cust-${Date.now()}`,
      name: data.name.trim(),
      email: cleanEmail,
      phone: data.phone.trim(),
      isEmailVerified: true,
      isPhoneVerified: true,
      buyerType: data.buyerType || 'retail',
      companyName: data.companyName?.trim(),
      gstin: data.gstin?.trim(),
      address: data.address?.trim() || 'Kundrathur Road',
      landmark: data.landmark?.trim() || 'Mangadu',
      city: data.city?.trim() || 'Chennai',
      state: data.state?.trim() || 'Tamil Nadu',
      postalCode: data.postalCode?.trim() || '600122',
      createdAt: existing ? existing.createdAt : new Date().toISOString().split('T')[0]
    };

    setCustomersList((prev) => {
      const filtered = prev.filter((c) => c.email.toLowerCase() !== cleanEmail);
      return [newCustomer, ...filtered];
    });

    setCurrentUser(newCustomer);
    setIsAuthModalOpen(false);
    return { success: true, message: `Account created successfully! Welcome, ${newCustomer.name}.` };
  };

  const loginCustomer = (emailOrPhone: string, passwordOrOtp?: string) => {
    const query = emailOrPhone.trim().toLowerCase();
    if (!query) {
      return { success: false, message: 'Please provide your Email address or Phone number.' };
    }

    const matched = customersList.find(
      (c) => c.email.toLowerCase() === query || c.phone.replace(/\s+/g, '') === query.replace(/\s+/g, '')
    );

    if (matched) {
      setCurrentUser(matched);
      setIsAuthModalOpen(false);
      return { success: true, message: `Welcome back, ${matched.name}!` };
    }

    // If customer not yet in list, automatically onboard them with friendly default profile
    const derivedName = query.includes('@') ? query.split('@')[0].replace(/[._]/g, ' ') : 'Customer';
    const capitalized = derivedName.charAt(0).toUpperCase() + derivedName.slice(1);
    const newCust: CustomerUser = {
      id: `cust-${Date.now()}`,
      name: capitalized,
      email: query.includes('@') ? query : `${query}@customer.essendaar.in`,
      phone: query.includes('@') ? '+91 98400 00000' : query,
      isEmailVerified: true,
      isPhoneVerified: true,
      buyerType: 'retail',
      address: 'Chennai Suburbs',
      city: 'Chennai',
      state: 'Tamil Nadu',
      postalCode: '600122',
      createdAt: new Date().toISOString().split('T')[0]
    };

    setCustomersList((prev) => [newCust, ...prev]);
    setCurrentUser(newCust);
    setIsAuthModalOpen(false);
    return { success: true, message: `Welcome, ${newCust.name}! Your account is ready.` };
  };

  const logoutCustomer = () => {
    setCurrentUser(null);
    if (currentRoute === 'customer-dashboard') {
      setCurrentRoute('home');
    }
  };

  const updateCustomerProfile = (updated: Partial<CustomerUser>) => {
    if (!currentUser) return;
    const merged: CustomerUser = { ...currentUser, ...updated };
    setCurrentUser(merged);
    setCustomersList((prev) => prev.map((c) => (c.id === merged.id ? merged : c)));
  };

  // ADMIN AUTH ACTIONS
  const loginAdmin = (email: string, pinOrPass: string) => {
    const cleanEmail = email.trim().toLowerCase();
    const cleanPass = pinOrPass.trim();

    // Authenticate with user's provided credentials or standard demo PINs
    const isPassValid = cleanPass === 'Cc6100358' || cleanPass === '9787' || cleanPass === 'admin123' || cleanPass === 'admin' || cleanPass === '1234';

    if (isPassValid) {
      setIsAdminLoggedIn(true);
      const adminData: AdminUser = {
        id: 'admin-1',
        name: 'Essendaar Plant Operations Admin',
        email: cleanEmail || 'info@rightchoiceindia.com',
        role: 'Super Administrator',
        lastLogin: new Date().toISOString()
      };
      setAdminUser(adminData);
      setIsAuthModalOpen(false);
      return { success: true, message: 'Admin authenticated successfully.' };
    }
    return { success: false, message: 'Invalid Admin Credentials. (Login: info@rightchoiceindia.com / Cc6100358 or PIN: 9787)' };
  };

  const logoutAdmin = () => {
    setIsAdminLoggedIn(false);
  };

  // ADMIN ACTIONS IMPLEMENTATION
  const addProduct = (newProduct: Product) => {
    setProducts((prev) => [newProduct, ...prev]);
  };

  const updateProduct = (updatedProduct: Product) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === updatedProduct.id || p.slug === updatedProduct.slug ? updatedProduct : p))
    );
    if (selectedProduct?.id === updatedProduct.id || selectedProduct?.slug === updatedProduct.slug) {
      _setSelectedProductState(updatedProduct);
    }
  };

  const deleteProduct = (productId: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId && p.slug !== productId));
  };

  const resetToDefaultProducts = () => {
    setProducts(initialProducts);
  };

  const importProductsJson = (productsData: Product[]) => {
    if (Array.isArray(productsData) && productsData.length > 0) {
      setProducts(productsData);
    }
  };

  const addInquiry = (inquiryData: Omit<Inquiry, 'id' | 'date' | 'status'>) => {
    const newInq: Inquiry = {
      ...inquiryData,
      id: `inq-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      status: 'new'
    };
    setInquiries((prev) => [newInq, ...prev]);

    // Send email alert to admin
    fetch('/api/send-inquiry-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ inquiry: newInq })
    }).catch((e) => console.warn('[SMTP Inquiry Error]', e));
  };

  const updateInquiryStatus = (id: string, status: Inquiry['status'], notes?: string) => {
    setInquiries((prev) =>
      prev.map((inq) => (inq.id === id ? { ...inq, status, ...(notes !== undefined ? { notes } : {}) } : inq))
    );
  };

  const deleteInquiry = (id: string) => {
    setInquiries((prev) => prev.filter((inq) => inq.id !== id));
  };

  const addOrder = (newOrder: Order) => {
    setOrders((prev) => [newOrder, ...prev]);
    setLatestOrder(newOrder);

    // Send order confirmation via SMTP
    fetch('/api/send-order-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ order: newOrder })
    }).catch((e) => console.warn('[SMTP Order Error]', e));
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders((prev) =>
      prev.map((ord) => (ord.id === orderId || ord.orderNumber === orderId ? { ...ord, status } : ord))
    );
  };

  const deleteOrder = (orderId: string) => {
    setOrders((prev) => prev.filter((ord) => ord.id !== orderId && ord.orderNumber !== orderId));
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        cart,
        currentRoute,
        selectedProduct,
        settings,
        isCartDrawerOpen,
        isQuickViewOpen,
        quickViewProduct,
        isSearchOpen,
        isCustomizerOpen,
        couponCode,
        appliedDiscount,
        latestOrder,
        orders,
        inquiries,
        viewMode,
        showTouchErgonomics,
        isLoadingLiveProduct,
        isAdminLoggedIn,
        adminUser,
        currentUser,
        customersList,
        isAuthModalOpen,
        authModalTab,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        setCurrentRoute,
        setSelectedProduct,
        openQuickView,
        closeQuickView,
        setIsCartDrawerOpen,
        setIsSearchOpen,
        setIsCustomizerOpen,
        applyCoupon,
        removeCoupon,
        updateSettings,
        setLatestOrder,
        setViewMode,
        setShowTouchErgonomics,
        refreshWooCommerceProducts,
        shopBrandFilter,
        setShopBrandFilter,
        shopParentCategoryFilter,
        setShopParentCategoryFilter,
        shopSubCategoryFilter,
        setShopSubCategoryFilter,
        navigateToShopWithBrand,
        navigateToShopWithCategory,
        isPolicyModalOpen,
        policyModalTab,
        openPolicyModal,
        closePolicyModal,
        openAuthModal,
        closeAuthModal,
        sendEmailOtp,
        verifyEmailOtp,
        registerCustomer,
        loginCustomer,
        logoutCustomer,
        updateCustomerProfile,
        loginAdmin,
        logoutAdmin,
        setIsAdminLoggedIn,
        addProduct,
        updateProduct,
        deleteProduct,
        resetToDefaultProducts,
        importProductsJson,
        addInquiry,
        updateInquiryStatus,
        deleteInquiry,
        addOrder,
        updateOrderStatus,
        deleteOrder,
        cartTotal,
        cartCount,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
