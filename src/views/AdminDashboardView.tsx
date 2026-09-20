import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Product, Inquiry, Order, StoreSettings } from '../types';
import { ProductFormModal } from '../components/ProductFormModal';
import { printTaxInvoice, downloadInvoiceFile } from '../utils/invoicePrint';
import { 
  Package, 
  ShoppingBag, 
  MessageSquare, 
  Settings, 
  Plus, 
  Edit3, 
  Trash2, 
  CheckCircle2, 
  Clock, 
  Phone, 
  Mail, 
  MapPin, 
  Search, 
  Download, 
  Upload, 
  RefreshCw, 
  FileText, 
  ExternalLink, 
  ArrowUpRight, 
  Eye, 
  Sliders, 
  ShieldCheck, 
  Printer, 
  AlertCircle,
  Save,
  Check,
  X,
  Layers,
  Sparkles,
  TrendingUp,
  Tag,
  DollarSign,
  Users,
  Lock,
  UserCheck,
  KeyRound,
  Building2,
  Send,
  Server
} from 'lucide-react';

type AdminTab = 'overview' | 'products' | 'pricing-matrix' | 'inquiries' | 'orders' | 'customers' | 'settings' | 'deployment';

export const AdminDashboardView: React.FC = () => {
  const { 
    products, 
    addProduct, 
    updateProduct, 
    deleteProduct, 
    resetToDefaultProducts, 
    importProductsJson,
    inquiries, 
    updateInquiryStatus, 
    deleteInquiry, 
    orders, 
    updateOrderStatus, 
    deleteOrder, 
    settings, 
    updateSettings,
    setCurrentRoute,
    setSelectedProduct,
    isAdminLoggedIn,
    adminUser,
    loginAdmin,
    logoutAdmin,
    customersList
  } = useStore();

  const [activeTab, setActiveTab] = useState<AdminTab>('overview');
  const [productSearch, setProductSearch] = useState('');
  const [customerSearch, setCustomerSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [inquiryFilter, setInquiryFilter] = useState<'all' | Inquiry['status']>('all');
  const [orderFilter, setOrderFilter] = useState<'all' | Order['status']>('all');

  // Admin login states (if unauthenticated)
  const [adminAuthEmail, setAdminAuthEmail] = useState('info@rightchoiceindia.com');
  const [adminAuthPin, setAdminAuthPin] = useState('');
  const [adminAuthError, setAdminAuthError] = useState<string | null>(null);

  // SMTP Server Testing State
  const [smtpTestEmail, setSmtpTestEmail] = useState('info@rightchoiceindia.com');
  const [smtpTestLoading, setSmtpTestLoading] = useState(false);
  const [smtpTestResult, setSmtpTestResult] = useState<{ success: boolean; message: string; warning?: string } | null>(null);
  const [showSmtpPass, setShowSmtpPass] = useState(false);

  // Modals & Active Edit State
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [selectedInvoiceOrder, setSelectedInvoiceOrder] = useState<Order | null>(null);
  const [activeInquiryNote, setActiveInquiryNote] = useState<{ id: string; note: string } | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Settings form local state
  const [settingsForm, setSettingsForm] = useState<StoreSettings>(settings);

  // New Product Template
  const defaultNewProduct: Omit<Product, 'id'> = {
    name: '',
    slug: '',
    brand: 'ESSENDAAR BULK',
    category: 'Surface Care',
    price: 199,
    regularPrice: 249,
    packSize: '5 Litres',
    rating: 5.0,
    reviewCount: 1,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCWsqgCY-jIhZJv6Okv_M4F_bRMGmEwd9HhZ8Pwwv1wIZWBGzCmPegx9mE5ld8MYDnee9JDiR8IZHwpMqCbz1A3A9HilUlvpoHjLwKbOprquqRRgS9DBvehTZpPGbdsXfDWWccSZjIVqKrc4BhVST623U6qF_9-I4sHkseS4RtyjjA-Z19ju2MuIKmIZjfBbRg7LXVZvcy-dqXOapJ7hc5HPQvm4Fda9BIUsYAWmgen30EOiwHLESUK5A',
    gallery: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCWsqgCY-jIhZJv6Okv_M4F_bRMGmEwd9HhZ8Pwwv1wIZWBGzCmPegx9mE5ld8MYDnee9JDiR8IZHwpMqCbz1A3A9HilUlvpoHjLwKbOprquqRRgS9DBvehTZpPGbdsXfDWWccSZjIVqKrc4BhVST623U6qF_9-I4sHkseS4RtyjjA-Z19ju2MuIKmIZjfBbRg7LXVZvcy-dqXOapJ7hc5HPQvm4Fda9BIUsYAWmgen30EOiwHLESUK5A'
    ],
    shortDescription: 'Industrial strength hygiene & surface cleaner formulation.',
    description: 'Manufactured and certified under ISO 9001:2015 quality control at our Mangadu, Chennai plant.',
    stockStatus: 'In Stock (Chennai Warehouse)',
    sku: 'ESS-NEW-01',
    badge: 'NEW ARRIVAL',
    features: [
      'ISO 9001:2015 Certified Quality',
      'Tamilnadu Test House Tested Formulation',
      'Direct Dispatch from Mangadu Plant'
    ],
    howToUse: 'Dilute 20ml in 5 Litres of water for regular floor and surface mopping.',
    safetyData: 'Keep out of reach of children. Store in a cool, ventilated depot.',
    pH: 'Neutral Balanced',
    fragrance: 'Fresh Citrus',
    shelfLife: '24 Months',
    labCertified: true
  };

  const [newProductForm, setNewProductForm] = useState<Omit<Product, 'id'>>(defaultNewProduct);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Metrics calculation
  const totalRevenue = orders.reduce((sum, ord) => sum + ord.total, 0);
  const pendingQuotesCount = inquiries.filter(i => i.status === 'new' || i.status === 'contacted').length;
  const inStockCount = products.filter(p => !p.stockStatus?.toLowerCase().includes('out of stock')).length;

  const filteredProducts = products.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(productSearch.toLowerCase()) || 
                        p.sku.toLowerCase().includes(productSearch.toLowerCase()) ||
                        p.brand.toLowerCase().includes(productSearch.toLowerCase());
    const matchCategory = selectedCategory === 'All' || p.category === selectedCategory;
    return matchSearch && matchCategory;
  });

  const filteredInquiries = inquiries.filter(i => {
    if (inquiryFilter === 'all') return true;
    return i.status === inquiryFilter;
  });

  const filteredOrders = orders.filter(o => {
    if (orderFilter === 'all') return true;
    return o.status === orderFilter;
  });

  // Export JSON helper
  const handleExportJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(products, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `essendaar_products_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast("✓ Products Catalog exported to JSON successfully!");
  };

  // Import JSON helper
  const handleImportJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (Array.isArray(parsed) && parsed.length > 0) {
          importProductsJson(parsed);
          showToast(`✓ Successfully imported ${parsed.length} products!`);
        } else {
          alert('Invalid JSON file format. Must be an array of products.');
        }
      } catch {
        alert('Failed to parse JSON file.');
      }
    };
    reader.readAsText(file);
  };

  // Add Product Handler
  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProductForm.name || !newProductForm.price) {
      alert('Please provide product name and price.');
      return;
    }
    const slug = newProductForm.slug || newProductForm.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const productToAdd: Product = {
      ...newProductForm,
      id: `prod-${Date.now()}`,
      slug: slug,
      price: Number(newProductForm.price),
      regularPrice: Number(newProductForm.regularPrice || newProductForm.price),
      rating: 5.0,
      reviewCount: 1
    };
    addProduct(productToAdd);
    setIsAddingProduct(false);
    setNewProductForm(defaultNewProduct);
    showToast(`✓ Added "${productToAdd.name}" to live catalog!`);
  };

  // Save Edited Product
  const handleSaveEditedProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;
    updateProduct({
      ...editingProduct,
      price: Number(editingProduct.price),
      regularPrice: Number(editingProduct.regularPrice || editingProduct.price)
    });
    setEditingProduct(null);
    showToast(`✓ Updated "${editingProduct.name}" successfully!`);
  };

  // Save Store Settings
  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(settingsForm);
    showToast("✓ Store & Plant Settings saved to live storage!");
  };

  const handleAdminAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAdminAuthError(null);
    const res = loginAdmin(adminAuthEmail, adminAuthPin);
    if (!res.success) {
      setAdminAuthError(res.message);
    } else {
      showToast("✓ Admin authenticated successfully!");
    }
  };

  // If Admin is not logged in, show secure login barrier
  if (!isAdminLoggedIn) {
    return (
      <div className="w-full bg-[#f8f9ff] min-h-screen py-16 px-4 flex items-center justify-center">
        <div className="bg-white max-w-md w-full rounded-3xl p-8 shadow-xl border border-slate-200 space-y-5">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-[#0A2540] text-amber-400 flex items-center justify-center shadow-md">
              <Lock className="w-7 h-7" />
            </div>
            <h1 className="text-xl font-headline font-bold text-[#0A2540]">Essendaar Operations Portal</h1>
            <p className="text-xs text-slate-500">
              Restricted to authorized Mangadu manufacturing plant managers &amp; dispatch coordinators.
            </p>
          </div>

          {adminAuthError && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 rounded-xl text-xs font-semibold flex items-center gap-2 animate-in fade-in">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{adminAuthError}</span>
            </div>
          )}

          <form onSubmit={handleAdminAuthSubmit} className="space-y-3.5 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Admin Email Address *</label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={adminAuthEmail}
                  onChange={(e) => setAdminAuthEmail(e.target.value)}
                  className="w-full h-10 pl-9 pr-3 rounded-xl border border-slate-300 focus:outline-none focus:border-[#00355f]"
                />
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Admin Password / Security Credential (Cc6100358 or PIN: 9787) *
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  placeholder="Enter Password (e.g. Cc6100358 or 9787)"
                  value={adminAuthPin}
                  onChange={(e) => setAdminAuthPin(e.target.value)}
                  className="w-full h-10 pl-9 pr-3 rounded-xl border border-slate-300 focus:outline-none focus:border-[#00355f]"
                />
                <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-[#0A2540] hover:bg-slate-900 text-white font-headline font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
            >
              <Lock className="w-4 h-4 text-amber-400" />
              <span>Unlock Admin Operations</span>
            </button>
          </form>

          <div className="pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={() => {
                loginAdmin('info@rightchoiceindia.com', 'Cc6100358');
                showToast("✓ Admin authenticated as info@rightchoiceindia.com!");
              }}
              className="w-full py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-colors cursor-pointer"
            >
              ⚡ Quick 1-Click Admin Access (info@rightchoiceindia.com)
            </button>
          </div>

          <div className="text-center pt-1">
            <button
              type="button"
              onClick={() => setCurrentRoute('home')}
              className="text-xs text-slate-500 hover:text-slate-800 font-semibold"
            >
              ← Return to Storefront
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#f8f9ff] min-h-screen pb-16 font-sans text-slate-800">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0A2540] text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-slate-700 flex items-center gap-3 text-xs font-bold animate-in fade-in slide-in-from-bottom-4">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Admin Navigation Header */}
      <div className="bg-[#0A2540] text-white border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#00355f] to-indigo-700 border border-slate-600 flex items-center justify-center font-black text-lg text-white shadow-md">
                E
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-lg font-black tracking-tight text-white">ESSENDAAR OPERATIONS</h1>
                  <span className="bg-[#006e2d] text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full">
                    Live Portal
                  </span>
                </div>
                <p className="text-xs text-slate-400">
                  Mangadu Plant Management • ISO 9001:2015 &amp; B2B Commerce Desk
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 text-xs">
              <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 text-slate-300 border border-slate-700">
                <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span className="font-semibold">{adminUser?.name || 'Plant Admin'}</span>
              </div>

              <button
                onClick={() => setCurrentRoute('home')}
                className="px-3.5 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl font-bold transition-colors flex items-center gap-1.5 border border-white/10"
              >
                <Eye className="w-3.5 h-3.5 text-sky-400" />
                <span>View Storefront</span>
              </button>

              <button
                onClick={() => {
                  logoutAdmin();
                  showToast('✓ Logged out from Admin Portal');
                }}
                className="px-3 py-2 bg-rose-900/60 hover:bg-rose-900 text-rose-200 rounded-xl font-bold transition-colors flex items-center gap-1.5 border border-rose-700/60"
                title="Log out from admin session"
              >
                <Lock className="w-3.5 h-3.5 text-rose-400" />
                <span>Sign Out</span>
              </button>
            </div>

          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto mt-6 pt-2 border-t border-slate-700/80 scrollbar-none text-xs font-bold">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap ${
                activeTab === 'overview'
                  ? 'bg-white text-[#0A2540] shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <TrendingUp className="w-4 h-4 text-[#00355f]" />
              <span>Overview</span>
            </button>

            <button
              onClick={() => setActiveTab('products')}
              className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap ${
                activeTab === 'products'
                  ? 'bg-white text-[#0A2540] shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Package className="w-4 h-4 text-[#00355f]" />
              <span>Products ({products.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('pricing-matrix')}
              className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap ${
                activeTab === 'pricing-matrix'
                  ? 'bg-white text-[#0A2540] shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <DollarSign className="w-4 h-4 text-emerald-600" />
              <span>Wholesale Quick Pricing</span>
            </button>

            <button
              onClick={() => setActiveTab('inquiries')}
              className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap ${
                activeTab === 'inquiries'
                  ? 'bg-white text-[#0A2540] shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <MessageSquare className="w-4 h-4 text-sky-600" />
              <span>B2B Quotes &amp; Leads ({inquiries.length})</span>
              {pendingQuotesCount > 0 && (
                <span className="bg-amber-400 text-slate-900 text-[10px] font-black px-1.5 py-0.2 rounded-full">
                  {pendingQuotesCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('orders')}
              className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap ${
                activeTab === 'orders'
                  ? 'bg-white text-[#0A2540] shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <ShoppingBag className="w-4 h-4 text-indigo-600" />
              <span>Orders ({orders.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('customers')}
              className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap ${
                activeTab === 'customers'
                  ? 'bg-white text-[#0A2540] shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Users className="w-4 h-4 text-emerald-400" />
              <span>Registered Customers ({customersList.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap ${
                activeTab === 'settings'
                  ? 'bg-white text-[#0A2540] shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Settings className="w-4 h-4 text-slate-600" />
              <span>Store Settings</span>
            </button>

            <button
              onClick={() => setActiveTab('deployment')}
              className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap ${
                activeTab === 'deployment'
                  ? 'bg-white text-[#0A2540] shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Layers className="w-4 h-4 text-purple-600" />
              <span>cPanel Deployment</span>
            </button>
          </div>

        </div>
      </div>

      {/* Main Tab Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        
        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-8 animate-in fade-in">
            
            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs flex items-center justify-between">
                <div>
                  <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Active Products</div>
                  <div className="text-3xl font-black text-[#0A2540]">{products.length}</div>
                  <div className="text-[11px] text-emerald-600 font-bold mt-1">✓ {inStockCount} In Stock at Mangadu</div>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-sky-50 text-[#00355f] flex items-center justify-center">
                  <Package className="w-6 h-6" />
                </div>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs flex items-center justify-between">
                <div>
                  <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">B2B RFPs &amp; Quotes</div>
                  <div className="text-3xl font-black text-[#0A2540]">{inquiries.length}</div>
                  <div className="text-[11px] text-amber-600 font-bold mt-1">⚡ {pendingQuotesCount} Awaiting Response</div>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
                  <MessageSquare className="w-6 h-6" />
                </div>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs flex items-center justify-between">
                <div>
                  <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Total Orders Placed</div>
                  <div className="text-3xl font-black text-[#0A2540]">{orders.length}</div>
                  <div className="text-[11px] text-emerald-600 font-bold mt-1">✓ 100% 24h Express Ready</div>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#006e2d] flex items-center justify-center">
                  <ShoppingBag className="w-6 h-6" />
                </div>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs flex items-center justify-between">
                <div>
                  <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Revenue Logged</div>
                  <div className="text-3xl font-black text-[#0A2540]">₹{totalRevenue.toLocaleString('en-IN')}</div>
                  <div className="text-[11px] text-slate-500 font-medium mt-1">Tamil Nadu B2B Deliveries</div>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-700 flex items-center justify-center">
                  <DollarSign className="w-6 h-6" />
                </div>
              </div>
            </div>

            {/* Quick Action Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left Column: Recent B2B Inquiries */}
              <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-lg font-black text-[#0A2540]">Recent B2B Quotations &amp; Audit Leads</h2>
                    <p className="text-xs text-slate-500">Incoming wholesale &amp; institutional procurement inquiries</p>
                  </div>
                  <button
                    onClick={() => setActiveTab('inquiries')}
                    className="text-xs font-bold text-[#00355f] hover:underline flex items-center gap-1"
                  >
                    <span>View All</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="space-y-3">
                  {inquiries.slice(0, 3).map((inq) => (
                    <div key={inq.id} className="p-4 rounded-2xl bg-slate-50 hover:bg-sky-50/50 border border-slate-200/80 transition-colors">
                      <div className="flex items-start justify-between gap-3 mb-1">
                        <div>
                          <div className="font-bold text-xs text-[#0A2540]">{inq.name}</div>
                          {inq.company && <div className="text-[11px] text-slate-500 font-semibold">{inq.company}</div>}
                        </div>
                        <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
                          inq.status === 'new' ? 'bg-amber-100 text-amber-800' :
                          inq.status === 'quoted' ? 'bg-sky-100 text-sky-800' :
                          inq.status === 'completed' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-800'
                        }`}>
                          {inq.status}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 line-clamp-2 mt-1">{inq.message}</p>
                      <div className="flex items-center justify-between mt-3 pt-2 border-t border-slate-200/60 text-[11px]">
                        <span className="text-slate-400">{inq.date}</span>
                        <a 
                          href={`https://wa.me/${inq.phone.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(inq.name)},%20regarding%20your%20inquiry%20to%20Essendaar%20Suppliers...`}
                          target="_blank"
                          className="font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-1"
                        >
                          <span>💬 WhatsApp Client</span>
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Plant Operations & Management Shortcuts */}
              <div className="lg:col-span-5 space-y-6">
                
                <div className="bg-[#0A2540] rounded-3xl p-6 sm:p-8 text-white shadow-lg border border-slate-700">
                  <span className="bg-sky-500 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full inline-block mb-3">
                    Factory Hot Desk
                  </span>
                  <h3 className="text-lg font-black text-white mb-2">Mangadu Production Control</h3>
                  <p className="text-xs text-slate-300 leading-relaxed mb-6">
                    Manage chemical formulation batches, update wholesale price tiers, or export official GST invoice receipts directly.
                  </p>

                  <div className="space-y-2">
                    <button
                      onClick={() => {
                        setIsAddingProduct(true);
                        setActiveTab('products');
                      }}
                      className="w-full py-3 bg-[#006e2d] hover:bg-[#14532D] text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-xs"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add New Product to Storefront</span>
                    </button>

                    <button
                      onClick={() => setActiveTab('pricing-matrix')}
                      className="w-full py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 border border-white/20"
                    >
                      <DollarSign className="w-4 h-4 text-emerald-400" />
                      <span>Quick Bulk Pricing Matrix</span>
                    </button>

                    <button
                      onClick={handleExportJson}
                      className="w-full py-2.5 bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-2"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Backup Catalog (JSON)</span>
                    </button>
                  </div>
                </div>

                {/* ISO Verification Banner */}
                <div className="bg-emerald-50 rounded-3xl p-6 border border-emerald-200">
                  <div className="flex items-start gap-3">
                    <ShieldCheck className="w-6 h-6 text-[#006e2d] shrink-0" />
                    <div>
                      <h4 className="font-bold text-xs text-emerald-950 uppercase tracking-wider mb-1">Quality Assurance Status</h4>
                      <p className="text-xs text-emerald-800 leading-relaxed">
                        Formulations certified by Tamilnadu Test House. ISO 9001:2015 batch compliance verified for institutional safety.
                      </p>
                    </div>
                  </div>
                </div>

              </div>

            </div>

          </div>
        )}

        {/* TAB 2: PRODUCT MANAGEMENT */}
        {activeTab === 'products' && (
          <div className="space-y-6 animate-in fade-in">
            
            {/* Action Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 sm:p-6 rounded-3xl border border-slate-200 shadow-xs">
              
              <div className="flex flex-wrap items-center gap-3 flex-1">
                {/* Search */}
                <div className="relative flex-1 min-w-[220px]">
                  <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={productSearch}
                    onChange={(e) => setProductSearch(e.target.value)}
                    placeholder="Search product name, SKU, brand..."
                    className="w-full pl-10 pr-4 py-2 bg-slate-50 rounded-xl border border-slate-200 text-xs focus:bg-white focus:outline-none focus:border-[#00355f]"
                  />
                </div>

                {/* Category Filter */}
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-3 py-2 bg-slate-50 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none"
                >
                  <option value="All">All Categories ({products.length})</option>
                  <option value="Surface Care">Surface Care</option>
                  <option value="Kitchen Care">Kitchen Care</option>
                  <option value="Laundry Care">Laundry Care</option>
                  <option value="Sanitation">Sanitation</option>
                  <option value="Vehicle Care">Vehicle Care</option>
                  <option value="Institutional Bulk">Institutional Bulk</option>
                  <option value="Accessories">Accessories</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <label className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold cursor-pointer transition-colors flex items-center gap-1.5">
                  <Upload className="w-3.5 h-3.5" />
                  <span>Import JSON</span>
                  <input type="file" accept=".json" onChange={handleImportJson} className="hidden" />
                </label>

                <button
                  onClick={handleExportJson}
                  className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export</span>
                </button>

                <button
                  onClick={() => setIsAddingProduct(true)}
                  className="px-4 py-2 bg-[#00355f] hover:bg-[#0A2540] text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Product</span>
                </button>
              </div>

            </div>

            {/* Products Table */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200 uppercase text-[10px] tracking-wider">
                      <th className="py-3.5 px-4">Product / Formulation</th>
                      <th className="py-3.5 px-4">Brand &amp; SKU</th>
                      <th className="py-3.5 px-4">Category</th>
                      <th className="py-3.5 px-4">Wholesale Price</th>
                      <th className="py-3.5 px-4">Stock Status</th>
                      <th className="py-3.5 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredProducts.map((p) => (
                      <tr key={p.id} className="hover:bg-sky-50/40 transition-colors">
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={p.image}
                              alt={p.name}
                              className="w-12 h-12 rounded-xl object-contain bg-slate-50 border border-slate-200 p-1 shrink-0"
                            />
                            <div>
                              <div className="font-bold text-slate-900 line-clamp-1">{p.name}</div>
                              <div className="text-[11px] text-slate-500 font-semibold">{p.packSize}</div>
                            </div>
                          </div>
                        </td>

                        <td className="py-3.5 px-4">
                          <span className="font-bold text-[#00355f]">{p.brand}</span>
                          <div className="font-mono text-[10px] text-slate-400">{p.sku}</div>
                        </td>

                        <td className="py-3.5 px-4">
                          <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[11px] font-semibold">
                            {p.category}
                          </span>
                        </td>

                        <td className="py-3.5 px-4">
                          <div className="font-bold text-slate-900 text-sm">₹{p.price}</div>
                          {p.regularPrice > p.price && (
                            <div className="text-[10px] text-slate-400 line-through">MRP: ₹{p.regularPrice}</div>
                          )}
                        </td>

                        <td className="py-3.5 px-4">
                          <button
                            onClick={() => {
                              const newStatus = p.stockStatus?.includes('In Stock') ? 'Out of Stock' : 'In Stock (Chennai Warehouse)';
                              updateProduct({ ...p, stockStatus: newStatus });
                              showToast(`✓ Updated stock status for ${p.name}`);
                            }}
                            className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase transition-colors ${
                              p.stockStatus?.includes('In Stock') 
                                ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100' 
                                : 'bg-rose-50 text-rose-700 hover:bg-rose-100'
                            }`}
                          >
                            {p.stockStatus?.includes('In Stock') ? '● In Stock' : '✕ Out of Stock'}
                          </button>
                        </td>

                        <td className="py-3.5 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => {
                                setSelectedProduct(p);
                                setCurrentRoute('product');
                              }}
                              className="p-1.5 text-slate-400 hover:text-[#00355f] rounded-lg hover:bg-slate-100 transition-colors"
                              title="View on Storefront"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </button>

                            <button
                              onClick={() => setEditingProduct(p)}
                              className="p-1.5 text-slate-600 hover:text-[#00355f] rounded-lg hover:bg-sky-50 transition-colors"
                              title="Edit Product"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>

                            <button
                              onClick={() => {
                                if (confirm(`Are you sure you want to delete "${p.name}"?`)) {
                                  deleteProduct(p.id);
                                  showToast(`✓ Removed ${p.name} from catalog`);
                                }
                              }}
                              className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
                              title="Delete Product"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {filteredProducts.length === 0 && (
                <div className="py-12 text-center text-slate-400 text-xs">
                  No products matched your search or category filter.
                </div>
              )}
            </div>

          </div>
        )}

        {/* TAB 3: WHOLESALE QUICK PRICING MATRIX */}
        {activeTab === 'pricing-matrix' && (
          <div className="space-y-6 animate-in fade-in">
            
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-lg font-black text-[#0A2540]">Wholesale &amp; Retail Pricing Matrix</h2>
                  <p className="text-xs text-slate-500">Edit prices, regular MRP, and stock in 1 click across the entire manufacturing line.</p>
                </div>
                <div className="text-xs text-slate-500 font-semibold bg-slate-50 px-3.5 py-1.5 rounded-xl border border-slate-200">
                  Total Active SKU lines: {products.length}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200 uppercase text-[10px] tracking-wider">
                      <th className="py-3 px-4">Formulation Name</th>
                      <th className="py-3 px-4">SKU</th>
                      <th className="py-3 px-4">Selling Price (₹)</th>
                      <th className="py-3 px-4">MRP (₹)</th>
                      <th className="py-3 px-4">Tier Discount (10+ Units)</th>
                      <th className="py-3 px-4">Stock Availability</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {products.map((p) => (
                      <tr key={p.id} className="hover:bg-slate-50">
                        <td className="py-3 px-4">
                          <div className="font-bold text-slate-900">{p.name}</div>
                          <div className="text-[11px] text-slate-500">{p.packSize} • {p.brand}</div>
                        </td>

                        <td className="py-3 px-4 font-mono text-[11px] text-slate-500">{p.sku}</td>

                        <td className="py-3 px-4">
                          <div className="flex items-center gap-1">
                            <span className="font-bold text-slate-400">₹</span>
                            <input
                              type="number"
                              defaultValue={p.price}
                              onBlur={(e) => {
                                const val = Number(e.target.value);
                                if (val > 0 && val !== p.price) {
                                  updateProduct({ ...p, price: val });
                                  showToast(`✓ Saved price ₹${val} for ${p.name}`);
                                }
                              }}
                              className="w-24 px-2 py-1 bg-slate-50 rounded-lg border border-slate-200 font-bold text-slate-900 focus:bg-white focus:outline-none focus:border-[#00355f]"
                            />
                          </div>
                        </td>

                        <td className="py-3 px-4">
                          <div className="flex items-center gap-1">
                            <span className="font-bold text-slate-400">₹</span>
                            <input
                              type="number"
                              defaultValue={p.regularPrice}
                              onBlur={(e) => {
                                const val = Number(e.target.value);
                                if (val > 0 && val !== p.regularPrice) {
                                  updateProduct({ ...p, regularPrice: val });
                                  showToast(`✓ Saved MRP ₹${val} for ${p.name}`);
                                }
                              }}
                              className="w-24 px-2 py-1 bg-slate-50 rounded-lg border border-slate-200 text-slate-600 focus:bg-white focus:outline-none focus:border-[#00355f]"
                            />
                          </div>
                        </td>

                        <td className="py-3 px-4">
                          <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-1 rounded-md text-[11px]">
                            ₹{Math.round(p.price * 0.90)} (-10%)
                          </span>
                        </td>

                        <td className="py-3 px-4">
                          <select
                            value={p.stockStatus?.includes('In Stock') ? 'in-stock' : 'out-of-stock'}
                            onChange={(e) => {
                              const newStatus = e.target.value === 'in-stock' ? 'In Stock (Chennai Warehouse)' : 'Out of Stock';
                              updateProduct({ ...p, stockStatus: newStatus });
                              showToast(`✓ Stock changed for ${p.name}`);
                            }}
                            className="px-2.5 py-1 rounded-lg border border-slate-200 bg-slate-50 text-[11px] font-semibold"
                          >
                            <option value="in-stock">In Stock (Chennai Depot)</option>
                            <option value="out-of-stock">Out of Stock</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* TAB 4: B2B INQUIRIES & AUDIT LEADS */}
        {activeTab === 'inquiries' && (
          <div className="space-y-6 animate-in fade-in">
            
            {/* Header & Filter */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
              <div>
                <h2 className="text-lg font-black text-[#0A2540]">B2B Institutional Quotation Desk</h2>
                <p className="text-xs text-slate-500">Track and respond to wholesale bulk orders, manpower staffing, and facility audits.</p>
              </div>

              <div className="flex items-center gap-2">
                {(['all', 'new', 'contacted', 'quoted', 'completed'] as const).map((st) => (
                  <button
                    key={st}
                    onClick={() => setInquiryFilter(st)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors ${
                      inquiryFilter === st
                        ? 'bg-[#00355f] text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Inquiries Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {filteredInquiries.map((inq) => (
                <div key={inq.id} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between">
                  
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div>
                        <span className="text-[10px] font-black uppercase tracking-wider bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md inline-block mb-1">
                          {inq.serviceType}
                        </span>
                        <h3 className="font-black text-sm text-[#0A2540]">{inq.name}</h3>
                        {inq.company && <p className="text-xs text-slate-500 font-semibold">{inq.company}</p>}
                      </div>

                      <select
                        value={inq.status}
                        onChange={(e) => {
                          updateInquiryStatus(inq.id, e.target.value as Inquiry['status']);
                          showToast(`✓ Updated inquiry status to ${e.target.value}`);
                        }}
                        className={`text-xs font-bold uppercase rounded-xl px-2.5 py-1 focus:outline-none cursor-pointer border ${
                          inq.status === 'new' ? 'bg-amber-50 text-amber-800 border-amber-200' :
                          inq.status === 'quoted' ? 'bg-sky-50 text-sky-800 border-sky-200' :
                          inq.status === 'completed' ? 'bg-emerald-50 text-emerald-800 border-emerald-200' : 'bg-slate-100 text-slate-800 border-slate-200'
                        }`}
                      >
                        <option value="new">● New Lead</option>
                        <option value="contacted">● In Discussion</option>
                        <option value="quoted">● Quotation Sent</option>
                        <option value="completed">● Completed / Won</option>
                        <option value="archived">● Archived</option>
                      </select>
                    </div>

                    <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100 text-xs text-slate-700 leading-relaxed mb-4">
                      "{inq.message}"
                    </div>

                    {inq.estimatedVolume && (
                      <div className="text-xs font-semibold text-slate-600 mb-3 flex items-center gap-1.5">
                        <Tag className="w-3.5 h-3.5 text-slate-400" />
                        <span>Estimated Scope: <strong className="text-slate-900">{inq.estimatedVolume}</strong></span>
                      </div>
                    )}

                    {inq.notes && (
                      <div className="text-[11px] text-indigo-900 bg-indigo-50/70 p-2.5 rounded-xl border border-indigo-100 mb-4">
                        <strong>Admin Notes:</strong> {inq.notes}
                      </div>
                    )}
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
                    <div className="text-slate-400 text-[11px]">Received: {inq.date}</div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setActiveInquiryNote({ id: inq.id, note: inq.notes || '' })}
                        className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-[11px]"
                      >
                        {inq.notes ? 'Edit Note' : '+ Add Note'}
                      </button>

                      <a
                        href={`https://wa.me/${inq.phone.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(inq.name)},%20this%20is%20from%20Essendaar%20Suppliers%20Regarding%20your%20quote...`}
                        target="_blank"
                        className="px-3 py-1.5 rounded-lg bg-[#006e2d] hover:bg-[#14532D] text-white font-bold text-[11px] flex items-center gap-1"
                      >
                        <span>💬 WhatsApp</span>
                      </a>

                      <button
                        onClick={() => {
                          if (confirm('Delete this inquiry record?')) {
                            deleteInquiry(inq.id);
                            showToast('✓ Inquiry removed');
                          }
                        }}
                        className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                </div>
              ))}
            </div>

            {filteredInquiries.length === 0 && (
              <div className="bg-white rounded-3xl p-12 text-center text-slate-400 text-xs border border-slate-200">
                No inquiries found under the "{inquiryFilter}" filter.
              </div>
            )}

          </div>
        )}

        {/* TAB 5: ORDERS & GST TAX INVOICES */}
        {activeTab === 'orders' && (
          <div className="space-y-6 animate-in fade-in">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
              <div>
                <h2 className="text-lg font-black text-[#0A2540]">Customer Orders &amp; Dispatch Desk</h2>
                <p className="text-xs text-slate-500">Generate GST-compliant tax invoices and track dispatch statuses.</p>
              </div>

              <div className="flex items-center gap-2">
                {(['all', 'processing', 'completed', 'on-hold'] as const).map((st) => (
                  <button
                    key={st}
                    onClick={() => setOrderFilter(st)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors ${
                      orderFilter === st
                        ? 'bg-[#00355f] text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200 uppercase text-[10px] tracking-wider">
                      <th className="py-3.5 px-4">Order ID &amp; Date</th>
                      <th className="py-3.5 px-4">Buyer / Company</th>
                      <th className="py-3.5 px-4">Items</th>
                      <th className="py-3.5 px-4">Total Value</th>
                      <th className="py-3.5 px-4">Status</th>
                      <th className="py-3.5 px-4 text-right">Tax Invoice</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredOrders.map((ord) => (
                      <tr key={ord.id} className="hover:bg-slate-50">
                        <td className="py-3.5 px-4">
                          <span className="font-mono font-bold text-[#00355f]">{ord.orderNumber}</span>
                          <div className="text-[11px] text-slate-400">{ord.date}</div>
                        </td>

                        <td className="py-3.5 px-4">
                          <div className="font-bold text-slate-900">{ord.customer.firstName} {ord.customer.lastName}</div>
                          {ord.customer.companyName && (
                            <div className="text-[11px] text-slate-500 font-semibold">{ord.customer.companyName}</div>
                          )}
                          {ord.customer.gstin && (
                            <div className="text-[10px] font-mono text-emerald-700 font-bold">GSTIN: {ord.customer.gstin}</div>
                          )}
                        </td>

                        <td className="py-3.5 px-4">
                          <div className="text-slate-700 font-medium">
                            {ord.items.map((it, idx) => (
                              <div key={idx} className="line-clamp-1">
                                {it.quantity}x {it.product.name}
                              </div>
                            ))}
                          </div>
                        </td>

                        <td className="py-3.5 px-4">
                          <div className="font-bold text-slate-900 text-sm">₹{ord.total.toLocaleString('en-IN')}</div>
                          <div className="text-[10px] text-slate-400 font-semibold uppercase">{ord.customer.paymentMethod}</div>
                        </td>

                        <td className="py-3.5 px-4">
                          <select
                            value={ord.status}
                            onChange={(e) => {
                              updateOrderStatus(ord.id, e.target.value as Order['status']);
                              showToast(`✓ Order status updated for ${ord.orderNumber}`);
                            }}
                            className={`px-2.5 py-1 rounded-xl text-[10px] font-bold uppercase focus:outline-none border cursor-pointer ${
                              ord.status === 'completed' ? 'bg-emerald-50 text-emerald-800 border-emerald-200' :
                              ord.status === 'processing' ? 'bg-sky-50 text-sky-800 border-sky-200' : 'bg-amber-50 text-amber-800 border-amber-200'
                            }`}
                          >
                            <option value="processing">● Processing</option>
                            <option value="completed">● Completed / Dispatched</option>
                            <option value="on-hold">● On Hold</option>
                          </select>
                        </td>

                        <td className="py-3.5 px-4 text-right">
                          <button
                            onClick={() => setSelectedInvoiceOrder(ord)}
                            className="px-3 py-1.5 bg-[#00355f] hover:bg-[#0A2540] text-white rounded-xl text-xs font-bold transition-colors inline-flex items-center gap-1.5 shadow-xs"
                          >
                            <Printer className="w-3.5 h-3.5" />
                            <span>View Invoice</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* TAB: REGISTERED CUSTOMERS DIRECTORY */}
        {activeTab === 'customers' && (
          <div className="space-y-6 animate-in fade-in">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
              <div>
                <h2 className="text-lg font-black text-[#0A2540]">Registered Customers &amp; B2B Institutional Accounts</h2>
                <p className="text-xs text-slate-500">
                  Manage verified buyers, 18% GSTIN registration records, and Email OTP authentication credentials.
                </p>
              </div>

              <div className="w-full sm:w-72 relative">
                <input
                  type="text"
                  placeholder="Search by name, email, phone, or school..."
                  value={customerSearch}
                  onChange={(e) => setCustomerSearch(e.target.value)}
                  className="w-full h-10 pl-9 pr-3 rounded-xl border border-slate-300 text-xs focus:outline-none focus:border-[#00355f]"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              </div>
            </div>

            {/* Metric Overview Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Total Registered</span>
                  <span className="text-xl font-headline font-black text-[#00355f]">{customersList.length} Accounts</span>
                </div>
                <div className="w-10 h-10 rounded-xl bg-sky-50 text-[#00355f] flex items-center justify-center font-bold">
                  <Users className="w-5 h-5" />
                </div>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">B2B Institutional / GST</span>
                  <span className="text-xl font-headline font-black text-amber-700">
                    {customersList.filter((c) => c.buyerType === 'business').length} Accounts
                  </span>
                </div>
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
                  <Building2 className="w-5 h-5" />
                </div>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Email OTP Verified</span>
                  <span className="text-xl font-headline font-black text-emerald-700">
                    {customersList.filter((c) => c.isEmailVerified).length} / {customersList.length} Verified
                  </span>
                </div>
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
              </div>
            </div>

            {/* Customers Table */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200 uppercase text-[10px] tracking-wider">
                      <th className="py-3.5 px-4">Customer Name &amp; Role</th>
                      <th className="py-3.5 px-4">Email &amp; OTP Status</th>
                      <th className="py-3.5 px-4">Phone Number</th>
                      <th className="py-3.5 px-4">B2B Entity &amp; GSTIN</th>
                      <th className="py-3.5 px-4">Delivery Region</th>
                      <th className="py-3.5 px-4 text-right">Joined</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {customersList
                      .filter((c) => {
                        if (!customerSearch.trim()) return true;
                        const q = customerSearch.toLowerCase();
                        return (
                          c.name.toLowerCase().includes(q) ||
                          c.email.toLowerCase().includes(q) ||
                          c.phone.includes(q) ||
                          (c.companyName && c.companyName.toLowerCase().includes(q)) ||
                          (c.gstin && c.gstin.toLowerCase().includes(q))
                        );
                      })
                      .map((cust) => (
                        <tr key={cust.id} className="hover:bg-slate-50">
                          <td className="py-3.5 px-4">
                            <div className="flex items-center gap-2.5">
                              <div className="w-8 h-8 rounded-full bg-[#00355f] text-white flex items-center justify-center font-bold text-xs shrink-0">
                                {cust.name.charAt(0)}
                              </div>
                              <div>
                                <div className="font-bold text-slate-900">{cust.name}</div>
                                <span className={`inline-block px-2 py-0.2 rounded-md text-[9px] font-bold uppercase ${
                                  cust.buyerType === 'business'
                                    ? 'bg-amber-100 text-amber-800'
                                    : 'bg-emerald-100 text-emerald-800'
                                }`}>
                                  {cust.buyerType === 'business' ? 'B2B School / Corporate' : 'Retail Home Customer'}
                                </span>
                              </div>
                            </div>
                          </td>

                          <td className="py-3.5 px-4">
                            <div className="font-semibold text-slate-800">{cust.email}</div>
                            {cust.isEmailVerified ? (
                              <span className="inline-flex items-center gap-1 text-[10px] text-emerald-700 font-bold">
                                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                                <span>OTP Verified ✓</span>
                              </span>
                            ) : (
                              <span className="text-[10px] text-amber-700 font-bold">Pending Verification</span>
                            )}
                          </td>

                          <td className="py-3.5 px-4">
                            <div className="font-mono text-slate-700">{cust.phone}</div>
                            <a
                              href={`https://wa.me/${cust.phone.replace(/\D/g, '')}`}
                              target="_blank"
                              rel="noreferrer"
                              className="text-[10px] text-[#006e2d] hover:underline font-semibold"
                            >
                              Message on WhatsApp →
                            </a>
                          </td>

                          <td className="py-3.5 px-4">
                            {cust.companyName ? (
                              <div>
                                <div className="font-bold text-[#0A2540]">{cust.companyName}</div>
                                {cust.gstin && (
                                  <div className="text-[10px] font-mono text-[#00355f] font-bold">
                                    GST: {cust.gstin}
                                  </div>
                                )}
                              </div>
                            ) : (
                              <span className="text-slate-400 text-[11px]">— Individual —</span>
                            )}
                          </td>

                          <td className="py-3.5 px-4">
                            <div className="text-slate-700 text-[11px]">{cust.address || 'Chennai'}</div>
                            <div className="text-[10px] text-slate-400 font-mono">{cust.city || 'Chennai'} - {cust.postalCode || '600122'}</div>
                          </td>

                          <td className="py-3.5 px-4 text-right text-slate-500 font-mono text-[11px]">
                            {cust.createdAt}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* TAB 6: STORE SETTINGS */}
        {activeTab === 'settings' && (
          <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in">
            
            {/* Brand Identity & High-Resolution Logo Downloads */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xs border border-slate-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#eff4ff] text-[#00355f] flex items-center justify-center border border-sky-100 shrink-0">
                    <img src="/favicon-32x32.png" alt="Favicon" className="w-6 h-6 object-contain" />
                  </div>
                  <div>
                    <h2 className="text-lg font-black tracking-tight text-slate-900">Official Brand Assets &amp; Logo Downloads</h2>
                    <p className="text-xs text-slate-500">Master high-resolution PNG (2460 × 600 px), emblem vector icons &amp; browser favicon</p>
                  </div>
                </div>
                <span className="bg-sky-50 text-sky-700 border border-sky-200 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider self-start sm:self-auto">
                  High-DPI Ready
                </span>
              </div>

              {/* Logo Preview Banner */}
              <div className="p-6 rounded-2xl bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:12px_12px] bg-slate-50 border border-slate-200 flex items-center justify-center mb-6">
                <img 
                  src="/essendaar-logo-large.png" 
                  alt="Essendaar Suppliers & Facility Care Logo" 
                  className="max-h-16 w-auto object-contain drop-shadow-xs"
                />
              </div>

              {/* Download Buttons Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href="/essendaar-logo-large.png"
                  download="essendaar-logo-large-transparent.png"
                  className="flex items-center justify-between p-3.5 rounded-2xl border border-slate-200 hover:border-[#00355f] hover:bg-sky-50/50 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-[#00355f] group-hover:bg-[#00355f] group-hover:text-white transition-colors">
                      <Download className="w-4 h-4" />
                    </div>
                    <div className="text-left">
                      <div className="text-xs font-bold text-slate-900">Large Logo (Transparent)</div>
                      <div className="text-[10px] font-mono text-slate-500">2460 × 600 px • PNG (~62 KB)</div>
                    </div>
                  </div>
                  <span className="text-[11px] font-bold text-[#00355f] group-hover:underline">Download</span>
                </a>

                <a
                  href="/essendaar-logo-large-white-bg.png"
                  download="essendaar-logo-large-white.png"
                  className="flex items-center justify-between p-3.5 rounded-2xl border border-slate-200 hover:border-[#00355f] hover:bg-sky-50/50 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-[#00355f] group-hover:bg-[#00355f] group-hover:text-white transition-colors">
                      <Download className="w-4 h-4" />
                    </div>
                    <div className="text-left">
                      <div className="text-xs font-bold text-slate-900">Large Logo (White BG)</div>
                      <div className="text-[10px] font-mono text-slate-500">2460 × 600 px • PNG (~66 KB)</div>
                    </div>
                  </div>
                  <span className="text-[11px] font-bold text-[#00355f] group-hover:underline">Download</span>
                </a>

                <a
                  href="/essendaar-emblem-large.png"
                  download="essendaar-emblem-1024x1024.png"
                  className="flex items-center justify-between p-3.5 rounded-2xl border border-slate-200 hover:border-[#00355f] hover:bg-sky-50/50 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-[#00355f] group-hover:bg-[#00355f] group-hover:text-white transition-colors">
                      <Download className="w-4 h-4" />
                    </div>
                    <div className="text-left">
                      <div className="text-xs font-bold text-slate-900">Square Emblem Icon</div>
                      <div className="text-[10px] font-mono text-slate-500">1024 × 1024 px • PNG (~53 KB)</div>
                    </div>
                  </div>
                  <span className="text-[11px] font-bold text-[#00355f] group-hover:underline">Download</span>
                </a>

                <a
                  href="/favicon.ico"
                  download="favicon.ico"
                  className="flex items-center justify-between p-3.5 rounded-2xl border border-slate-200 hover:border-[#00355f] hover:bg-sky-50/50 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-[#00355f] group-hover:bg-[#00355f] group-hover:text-white transition-colors">
                      <Download className="w-4 h-4" />
                    </div>
                    <div className="text-left">
                      <div className="text-xs font-bold text-slate-900">Browser Favicon Suite</div>
                      <div className="text-[10px] font-mono text-slate-500">Multi-res ICO (16/32/48px)</div>
                    </div>
                  </div>
                  <span className="text-[11px] font-bold text-[#00355f] group-hover:underline">Download</span>
                </a>

                <a
                  href="/right-choice-logo.png"
                  download="right-choice-logo.png"
                  className="flex items-center justify-between p-3.5 rounded-2xl border border-emerald-200 bg-emerald-50/30 hover:border-emerald-600 hover:bg-emerald-50 transition-all group sm:col-span-2"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-white border border-emerald-200 flex items-center justify-center text-[#006e2d] group-hover:bg-[#006e2d] group-hover:text-white transition-colors p-1">
                      <img src="/right-choice-logo.png" alt="Right Choice" className="w-full h-full object-contain" />
                    </div>
                    <div className="text-left">
                      <div className="text-xs font-bold text-slate-900 flex items-center gap-2">
                        <span>Right Choice™ Consumer Entity Logo</span>
                        <span className="text-[9px] bg-[#006e2d] text-white px-1.5 py-0.2 rounded font-bold uppercase">Home Care</span>
                      </div>
                      <div className="text-[10px] font-mono text-slate-500">565 × 657 px • Lossless PNG (~54 KB)</div>
                    </div>
                  </div>
                  <span className="text-[11px] font-bold text-[#006e2d] group-hover:underline">Download</span>
                </a>
              </div>
            </div>

            {/* SMTP Mail Server Configuration Panel */}
            <div className="bg-[#00355f] text-white rounded-3xl p-8 shadow-md border border-sky-900">
              <div className="flex items-center justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-amber-400">
                    <Server className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-lg font-black tracking-tight">SMTP Mail Server (Production Credentials)</h2>
                    <p className="text-xs text-sky-200">Active email gateway for Customer OTPs, Order Invoices &amp; Admin Inquiries</p>
                  </div>
                </div>
                <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                  SSL/TLS Authenticated
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-black/20 p-4 rounded-2xl border border-white/10 mb-5">
                <div>
                  <span className="text-sky-300 block text-[11px] font-semibold">SMTP Host:</span>
                  <span className="font-mono font-bold text-white">mail.rightchoiceindia.com</span>
                </div>
                <div>
                  <span className="text-sky-300 block text-[11px] font-semibold">Port &amp; Security:</span>
                  <span className="font-mono font-bold text-white">465 (Secure SSL/TLS)</span>
                </div>
                <div>
                  <span className="text-sky-300 block text-[11px] font-semibold">Sender Account (Username):</span>
                  <span className="font-mono font-bold text-white">info@rightchoiceindia.com</span>
                </div>
                <div>
                  <span className="text-sky-300 block text-[11px] font-semibold">Password:</span>
                  <span className="font-mono font-bold text-white flex items-center gap-2">
                    {showSmtpPass ? 'Cc6100358' : '•••••••••'}
                    <button
                      type="button"
                      onClick={() => setShowSmtpPass(!showSmtpPass)}
                      className="text-[10px] text-sky-300 underline cursor-pointer"
                    >
                      {showSmtpPass ? 'Hide' : 'Show'}
                    </button>
                  </span>
                </div>
              </div>

              {/* SMTP Test Trigger */}
              <div className="space-y-3">
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="email"
                    value={smtpTestEmail}
                    onChange={(e) => setSmtpTestEmail(e.target.value)}
                    placeholder="Recipient test email..."
                    className="flex-1 px-3.5 py-2.5 bg-white/10 rounded-xl border border-white/20 text-xs text-white placeholder:text-sky-200 focus:outline-none focus:bg-white/20 font-medium"
                  />
                  <button
                    type="button"
                    disabled={smtpTestLoading}
                    onClick={async () => {
                      setSmtpTestLoading(true);
                      setSmtpTestResult(null);
                      try {
                        const res = await fetch('/api/test-smtp', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({ targetEmail: smtpTestEmail })
                        });
                        const data = await res.json();
                        setSmtpTestResult(data);
                        showToast(data.success ? '✓ SMTP Test Email Dispatched!' : 'SMTP Notice Logged');
                      } catch (err: any) {
                        setSmtpTestResult({ success: false, message: err.message });
                      } finally {
                        setSmtpTestLoading(false);
                      }
                    }}
                    className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-sm"
                  >
                    {smtpTestLoading ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Send Test Email</span>
                      </>
                    )}
                  </button>
                </div>

                {smtpTestResult && (
                  <div className={`p-3 rounded-xl text-xs border ${
                    smtpTestResult.success 
                      ? 'bg-emerald-950/70 border-emerald-500/60 text-emerald-200' 
                      : 'bg-amber-950/70 border-amber-500/60 text-amber-200'
                  }`}>
                    <div className="font-bold flex items-center gap-1.5">
                      {smtpTestResult.success ? <Check className="w-4 h-4 text-emerald-400" /> : <AlertCircle className="w-4 h-4 text-amber-400" />}
                      <span>{smtpTestResult.message || (smtpTestResult.success ? 'Test Email Dispatched via mail.rightchoiceindia.com' : 'SMTP Server Notice')}</span>
                    </div>
                    {smtpTestResult.warning && (
                      <div className="text-[11px] opacity-90 mt-1">{smtpTestResult.warning}</div>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xs">
              <h2 className="text-xl font-black text-[#0A2540] mb-1">Company &amp; Plant Settings</h2>
              <p className="text-xs text-slate-500 mb-6">Modify business credentials, contact numbers, and site announcements without modifying code.</p>

              <form onSubmit={handleSaveSettings} className="space-y-4 text-xs">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Business Name</label>
                    <input
                      type="text"
                      value={settingsForm.storeName}
                      onChange={(e) => setSettingsForm({ ...settingsForm, storeName: e.target.value })}
                      className="w-full p-3 bg-slate-50 rounded-xl border border-slate-200 font-bold text-slate-900 focus:bg-white focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Tagline</label>
                    <input
                      type="text"
                      value={settingsForm.tagline}
                      onChange={(e) => setSettingsForm({ ...settingsForm, tagline: e.target.value })}
                      className="w-full p-3 bg-slate-50 rounded-xl border border-slate-200 text-slate-900 focus:bg-white focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Direct Phone / Hotline</label>
                    <input
                      type="text"
                      value={settingsForm.phone}
                      onChange={(e) => setSettingsForm({ ...settingsForm, phone: e.target.value })}
                      className="w-full p-3 bg-slate-50 rounded-xl border border-slate-200 font-bold text-slate-900 focus:bg-white focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Official Email</label>
                    <input
                      type="email"
                      value={settingsForm.email}
                      onChange={(e) => setSettingsForm({ ...settingsForm, email: e.target.value })}
                      className="w-full p-3 bg-slate-50 rounded-xl border border-slate-200 text-slate-900 focus:bg-white focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Factory &amp; Plant Address</label>
                  <input
                    type="text"
                    value={settingsForm.location}
                    onChange={(e) => setSettingsForm({ ...settingsForm, location: e.target.value })}
                    className="w-full p-3 bg-slate-50 rounded-xl border border-slate-200 text-slate-900 focus:bg-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Top Announcement Bar Text</label>
                  <input
                    type="text"
                    value={settingsForm.announcementText}
                    onChange={(e) => setSettingsForm({ ...settingsForm, announcementText: e.target.value })}
                    className="w-full p-3 bg-slate-50 rounded-xl border border-slate-200 text-slate-900 focus:bg-white focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Free Express Shipping Threshold (₹)</label>
                    <input
                      type="number"
                      value={settingsForm.freeShippingThreshold}
                      onChange={(e) => setSettingsForm({ ...settingsForm, freeShippingThreshold: Number(e.target.value) })}
                      className="w-full p-3 bg-slate-50 rounded-xl border border-slate-200 font-bold text-slate-900 focus:bg-white focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Currency Symbol</label>
                    <input
                      type="text"
                      value={settingsForm.currencySymbol}
                      onChange={(e) => setSettingsForm({ ...settingsForm, currencySymbol: e.target.value })}
                      className="w-full p-3 bg-slate-50 rounded-xl border border-slate-200 font-bold text-slate-900 focus:bg-white focus:outline-none"
                    />
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full py-3.5 bg-[#00355f] hover:bg-[#0A2540] text-white rounded-xl font-bold uppercase tracking-wider transition-colors shadow-sm flex items-center justify-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Store Settings</span>
                  </button>
                </div>

              </form>
            </div>

          </div>
        )}

        {/* TAB 7: CPANEL DEPLOYMENT HELPER */}
        {activeTab === 'deployment' && (
          <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in">
            
            <div className="bg-[#0A2540] rounded-3xl p-8 text-white shadow-xl border border-slate-700">
              <span className="bg-[#006e2d] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full inline-block mb-3">
                Production Deployment Ready
              </span>
              <h2 className="text-2xl font-black mb-2">Publishing to cPanel (rightchoiceindia.com)</h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl mb-6">
                Your standalone application and admin dashboard are pre-compiled and packaged for direct cPanel deployment.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                  <div className="text-amber-400 font-bold text-sm">Option A: Full Standalone App (Recommended)</div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Upload the pre-built files from <code>/cpanel-live-ready/</code> directly to your <code>public_html</code> folder.
                  </p>
                  <div className="text-[11px] text-emerald-400 font-semibold">
                    ✓ Includes full Admin Dashboard, Cart, Quotes &amp; UPI checkout
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                  <div className="text-sky-400 font-bold text-sm">Option B: WordPress Theme Package</div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Upload <code>essendaar-theme.zip</code> to <strong>Appearance &gt; Themes &gt; Upload</strong>.
                  </p>
                  <div className="text-[11px] text-sky-300 font-semibold">
                    ✓ Pre-packaged with D Siva Krishnan photo &amp; WooCommerce hooks
                  </div>
                </div>
              </div>
            </div>

          </div>
        )}

      </div>

      {/* MODAL 1: ADD PRODUCT */}
      {isAddingProduct && (
        <ProductFormModal
          isOpen={true}
          onClose={() => setIsAddingProduct(false)}
          mode="add"
          onSave={(newProd) => {
            addProduct(newProd);
            showToast(`✓ Added "${newProd.name}" to live catalog!`);
          }}
        />
      )}

      {/* MODAL 2: EDIT PRODUCT */}
      {editingProduct && (
        <ProductFormModal
          isOpen={true}
          onClose={() => setEditingProduct(null)}
          mode="edit"
          initialProduct={editingProduct}
          onSave={(updatedProd) => {
            updateProduct(updatedProd);
            showToast(`✓ Updated "${updatedProd.name}" successfully!`);
          }}
        />
      )}

      {/* MODAL 3: GST TAX INVOICE PRINT VIEW */}
      {selectedInvoiceOrder && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-8 border border-slate-200 shadow-2xl my-8">
            
            {/* Printable Invoice Container */}
            <div className="border border-slate-300 p-6 rounded-2xl bg-white space-y-6 text-xs text-slate-800">
              
              {/* Invoice Header */}
              <div className="flex justify-between items-start border-b border-slate-200 pb-4">
                <div>
                  <h2 className="text-xl font-black text-[#0A2540]">ESSENDAAR SUPPLIERS</h2>
                  <p className="text-[11px] text-slate-500 font-semibold">ISO 9001:2015 Certified Manufacturing Facility</p>
                  <p className="text-[11px] text-slate-500">Mangadu, Chennai, Tamil Nadu - 600122</p>
                  <p className="text-[11px] text-slate-500">Phone: +91 97879 79757 | GSTIN: 33AABCE1234F1Z8</p>
                </div>
                <div className="text-right">
                  <span className="bg-[#00355f] text-white text-[10px] font-bold px-2.5 py-1 rounded-md uppercase">
                    TAX INVOICE
                  </span>
                  <div className="font-mono font-bold text-xs mt-2 text-slate-900">{selectedInvoiceOrder.orderNumber}</div>
                  <div className="text-[11px] text-slate-500">Date: {selectedInvoiceOrder.date}</div>
                </div>
              </div>

              {/* Bill To */}
              <div className="grid grid-cols-2 gap-4 bg-slate-50 p-3.5 rounded-xl">
                <div>
                  <div className="text-[10px] text-slate-400 font-bold uppercase">Billed To</div>
                  <div className="font-bold text-slate-900">{selectedInvoiceOrder.customer.firstName} {selectedInvoiceOrder.customer.lastName}</div>
                  {selectedInvoiceOrder.customer.companyName && (
                    <div className="text-slate-600 font-semibold">{selectedInvoiceOrder.customer.companyName}</div>
                  )}
                  <div className="text-slate-500">{selectedInvoiceOrder.customer.address}, {selectedInvoiceOrder.customer.city} - {selectedInvoiceOrder.customer.postalCode}</div>
                  <div className="text-slate-500">Ph: {selectedInvoiceOrder.customer.phone}</div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] text-slate-400 font-bold uppercase">Customer GST Details</div>
                  <div className="font-mono font-bold text-emerald-800">
                    {selectedInvoiceOrder.customer.gstin || 'Retail / Unregistered (B2C)'}
                  </div>
                  <div className="text-slate-500 mt-2">Payment: {selectedInvoiceOrder.customer.paymentMethod.toUpperCase()}</div>
                  <div className="text-slate-500">Place of Supply: Tamil Nadu (33)</div>
                </div>
              </div>

              {/* Items Table */}
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px]">
                    <th className="py-2">Item Description</th>
                    <th className="py-2">HSN</th>
                    <th className="py-2 text-center">Qty</th>
                    <th className="py-2 text-right">Rate</th>
                    <th className="py-2 text-right">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {selectedInvoiceOrder.items.map((it, i) => (
                    <tr key={i}>
                      <td className="py-2.5 font-semibold text-slate-900">{it.product.name} ({it.product.packSize})</td>
                      <td className="py-2.5 font-mono text-[10px] text-slate-400">3402.90</td>
                      <td className="py-2.5 text-center font-bold">{it.quantity}</td>
                      <td className="py-2.5 text-right">₹{it.product.price}</td>
                      <td className="py-2.5 text-right font-bold">₹{it.product.price * it.quantity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Totals */}
              <div className="border-t border-slate-200 pt-3 space-y-1.5 text-right">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal:</span>
                  <span>₹{selectedInvoiceOrder.subtotal}</span>
                </div>
                {selectedInvoiceOrder.discount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-semibold">
                    <span>Discount:</span>
                    <span>-₹{selectedInvoiceOrder.discount}</span>
                  </div>
                )}
                <div className="flex justify-between text-slate-500 text-[11px]">
                  <span>CGST (9%) + SGST (9%):</span>
                  <span>₹{selectedInvoiceOrder.tax}</span>
                </div>
                <div className="flex justify-between text-base font-black text-[#0A2540] pt-2 border-t border-slate-200">
                  <span>Invoice Total:</span>
                  <span>₹{selectedInvoiceOrder.total.toLocaleString('en-IN')}</span>
                </div>
              </div>

            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 mt-6 pt-4 border-t border-slate-100">
              <button
                onClick={() => setSelectedInvoiceOrder(null)}
                className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold hover:bg-slate-50 text-xs transition-colors cursor-pointer"
              >
                Close
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => downloadInvoiceFile(selectedInvoiceOrder)}
                  className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold text-xs transition-all flex items-center gap-1.5 cursor-pointer"
                  title="Download offline HTML/PDF invoice file"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Invoice</span>
                </button>

                <button
                  onClick={() => printTaxInvoice(selectedInvoiceOrder)}
                  className="px-5 py-2.5 bg-[#006e2d] hover:bg-[#14532D] text-white rounded-xl font-bold text-xs transition-all shadow-sm flex items-center gap-1.5 cursor-pointer active:scale-98"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print / Save as PDF</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* MODAL 4: INQUIRY NOTE */}
      {activeInquiryNote && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 border border-slate-200 shadow-2xl">
            <h3 className="text-base font-black text-[#0A2540] mb-1">Add Follow-Up Note</h3>
            <p className="text-xs text-slate-500 mb-4">Internal tracking notes for commercial sales desk.</p>
            
            <textarea
              rows={4}
              value={activeInquiryNote.note}
              onChange={(e) => setActiveInquiryNote({ ...activeInquiryNote, note: e.target.value })}
              placeholder="e.g. Sent sample 500ml can on 18th. Follow-up with purchase manager on Monday..."
              className="w-full p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-900 focus:bg-white focus:outline-none mb-4"
            ></textarea>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setActiveInquiryNote(null)}
                className="px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-600 font-bold"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  const inq = inquiries.find(i => i.id === activeInquiryNote.id);
                  if (inq) {
                    updateInquiryStatus(inq.id, inq.status, activeInquiryNote.note);
                    showToast('✓ Note saved!');
                  }
                  setActiveInquiryNote(null);
                }}
                className="px-4 py-2 rounded-xl bg-[#00355f] text-white text-xs font-bold"
              >
                Save Note
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
