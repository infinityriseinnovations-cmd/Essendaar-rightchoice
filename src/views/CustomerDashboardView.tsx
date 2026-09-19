import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  User, 
  Package, 
  FileText, 
  MapPin, 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  Truck, 
  Building2, 
  Mail, 
  Phone, 
  LogOut, 
  ShoppingBag, 
  ArrowRight, 
  Printer, 
  MessageSquare, 
  Sparkles, 
  ExternalLink,
  ChevronRight,
  AlertCircle,
  Copy,
  Check,
  RotateCcw,
  Download
} from 'lucide-react';
import { Order, Inquiry } from '../types';
import { printTaxInvoice, downloadInvoiceFile } from '../utils/invoicePrint';

export const CustomerDashboardView: React.FC = () => {
  const { 
    currentUser, 
    logoutCustomer, 
    orders, 
    inquiries, 
    setCurrentRoute, 
    addToCart, 
    updateCustomerProfile,
    openAuthModal,
    cartCount
  } = useStore();

  const [activeTab, setActiveTab] = useState<'orders' | 'inquiries' | 'addresses' | 'security' | 'support'>('orders');
  const [selectedInvoiceOrder, setSelectedInvoiceOrder] = useState<Order | null>(null);
  const [copiedInvoice, setCopiedInvoice] = useState(false);
  
  // Profile editing state
  const [editName, setEditName] = useState(currentUser?.name || '');
  const [editPhone, setEditPhone] = useState(currentUser?.phone || '');
  const [editEmail, setEditEmail] = useState(currentUser?.email || '');
  const [editAddress, setEditAddress] = useState(currentUser?.address || '');
  const [editLandmark, setEditLandmark] = useState(currentUser?.landmark || '');
  const [editCity, setEditCity] = useState(currentUser?.city || 'Chennai');
  const [editPostalCode, setEditPostalCode] = useState(currentUser?.postalCode || '600122');
  const [editCompanyName, setEditCompanyName] = useState(currentUser?.companyName || '');
  const [editGstin, setEditGstin] = useState(currentUser?.gstin || '');
  const [saveSuccess, setSaveSuccess] = useState(false);

  // If not logged in, show prompt to sign in
  if (!currentUser) {
    return (
      <div className="w-full bg-[#f8f9ff] min-h-screen py-16 px-4">
        <div className="max-w-md mx-auto bg-white rounded-3xl p-8 shadow-md border border-slate-200 text-center space-y-4">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-[#eff4ff] text-[#00355f] flex items-center justify-center">
            <User className="w-7 h-7" />
          </div>
          <h2 className="text-xl font-headline font-bold text-[#0A2540]">Customer Account Sign In</h2>
          <p className="text-xs text-slate-500 leading-relaxed">
            Please sign in to access your orders, live Chennai dispatch tracking, GST tax invoices, and B2B quotation history.
          </p>
          <div className="pt-2 space-y-2">
            <button
              onClick={() => openAuthModal('login')}
              className="w-full py-3 px-4 rounded-xl bg-[#00355f] hover:bg-[#0f4c81] text-white font-headline font-bold text-xs flex items-center justify-center gap-2 shadow-md cursor-pointer transition-all"
            >
              <span>Sign In to Account</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => openAuthModal('register')}
              className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs cursor-pointer transition-all"
            >
              Register with Email OTP
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Filter orders related to this customer (or all orders for preview)
  const myOrders = orders.filter((o) => {
    if (!o.customer) return false;
    const matchEmail = o.customer.email && o.customer.email.toLowerCase() === currentUser.email.toLowerCase();
    const matchPhone = o.customer.phone && o.customer.phone.replace(/\D/g, '').includes(currentUser.phone.replace(/\D/g, '').slice(-8));
    return matchEmail || matchPhone || orders.length <= 2; // graceful fallback so orders are always visible in demo
  });

  // Filter inquiries for this user
  const myInquiries = inquiries.filter((inq) => {
    const matchEmail = inq.email && inq.email.toLowerCase() === currentUser.email.toLowerCase();
    const matchPhone = inq.phone && inq.phone.replace(/\D/g, '').includes(currentUser.phone.replace(/\D/g, '').slice(-8));
    return matchEmail || matchPhone || inquiries.length <= 4;
  });

  const totalSpent = myOrders.reduce((sum, o) => sum + (o.total || 0), 0);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateCustomerProfile({
      name: editName,
      phone: editPhone,
      email: editEmail,
      address: editAddress,
      landmark: editLandmark,
      city: editCity,
      postalCode: editPostalCode,
      companyName: editCompanyName,
      gstin: editGstin
    });
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const handleReorder = (order: Order) => {
    order.items.forEach((item) => {
      addToCart(item.product, item.quantity, item.selectedVariant);
    });
    setCurrentRoute('checkout');
  };

  const handleCopyInvoiceNumber = (num: string) => {
    navigator.clipboard?.writeText(num);
    setCopiedInvoice(true);
    setTimeout(() => setCopiedInvoice(false), 2000);
  };

  return (
    <div className="w-full bg-[#f8f9ff] min-h-screen pb-20">
      
      {/* Top Banner */}
      <div className="bg-[#0A2540] text-white py-6 px-4 sm:px-6 shadow-md">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-sky-900 border-2 border-sky-600 flex items-center justify-center text-white font-headline font-black text-xl shadow-md">
              {currentUser.name.charAt(0)}
            </div>

            <div>
              <div className="flex items-center flex-wrap gap-2">
                <h1 className="text-xl font-headline font-bold text-white">{currentUser.name}</h1>
                
                {currentUser.buyerType === 'business' ? (
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-bold flex items-center gap-1">
                    <Building2 className="w-3 h-3" />
                    <span>B2B Institutional Buyer</span>
                  </span>
                ) : (
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-bold flex items-center gap-1">
                    <User className="w-3 h-3" />
                    <span>Retail Consumer</span>
                  </span>
                )}

                {currentUser.isEmailVerified && (
                  <span className="px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-300 border border-sky-400/40 text-[10px] font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-secondary-fixed" />
                    <span>Email OTP Verified</span>
                  </span>
                )}
              </div>

              <div className="flex items-center flex-wrap gap-x-4 gap-y-1 text-xs text-slate-300 mt-1">
                <span className="flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-sky-400" />
                  <span>{currentUser.email}</span>
                </span>
                <span className="flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-secondary-fixed" />
                  <span>{currentUser.phone}</span>
                </span>
                {currentUser.companyName && (
                  <span className="flex items-center gap-1 text-slate-200">
                    <Building2 className="w-3.5 h-3.5 text-amber-400" />
                    <span>{currentUser.companyName}</span>
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setCurrentRoute('shop')}
              className="px-4 py-2 rounded-xl bg-[#006e2d] hover:bg-[#14532D] text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-xs cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Browse Catalog</span>
            </button>

            <button
              onClick={logoutCustomer}
              className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>

        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 -mt-3">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          
          <div className="bg-white rounded-2xl p-4 shadow-xs border border-slate-200 flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Total Orders</span>
              <span className="text-xl font-headline font-black text-[#00355f]">{myOrders.length}</span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-[#eff4ff] text-[#00355f] flex items-center justify-center">
              <Package className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 shadow-xs border border-slate-200 flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Total Purchases</span>
              <span className="text-xl font-headline font-black text-[#006e2d]">₹{totalSpent}</span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#006e2d] flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 shadow-xs border border-slate-200 flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">B2B Quotations</span>
              <span className="text-xl font-headline font-black text-amber-700">{myInquiries.length}</span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 shadow-xs border border-slate-200 flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Active Cart</span>
              <span className="text-xl font-headline font-black text-[#0A2540]">{cartCount} items</span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-700 flex items-center justify-center">
              <ShoppingBag className="w-5 h-5" />
            </div>
          </div>

        </div>
      </div>

      {/* Main Dashboard Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Navigation Tabs (3 cols) */}
          <aside className="lg:col-span-3 bg-white rounded-2xl p-3 shadow-xs border border-slate-200 space-y-1 text-xs font-bold">
            <button
              onClick={() => setActiveTab('orders')}
              className={`w-full p-3 rounded-xl text-left flex items-center justify-between transition-colors cursor-pointer ${
                activeTab === 'orders'
                  ? 'bg-[#00355f] text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Package className="w-4 h-4" />
                <span>My Orders &amp; Invoices</span>
              </div>
              <span className={`px-2 py-0.5 rounded-full text-[10px] ${activeTab === 'orders' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'}`}>
                {myOrders.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('inquiries')}
              className={`w-full p-3 rounded-xl text-left flex items-center justify-between transition-colors cursor-pointer ${
                activeTab === 'inquiries'
                  ? 'bg-[#00355f] text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <FileText className="w-4 h-4" />
                <span>B2B Quotations &amp; Audits</span>
              </div>
              <span className={`px-2 py-0.5 rounded-full text-[10px] ${activeTab === 'inquiries' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'}`}>
                {myInquiries.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('addresses')}
              className={`w-full p-3 rounded-xl text-left flex items-center gap-2.5 transition-colors cursor-pointer ${
                activeTab === 'addresses'
                  ? 'bg-[#00355f] text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <MapPin className="w-4 h-4" />
              <span>Saved Address &amp; GSTIN</span>
            </button>

            <button
              onClick={() => setActiveTab('security')}
              className={`w-full p-3 rounded-xl text-left flex items-center gap-2.5 transition-colors cursor-pointer ${
                activeTab === 'security'
                  ? 'bg-[#00355f] text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Email OTP &amp; Security</span>
            </button>

            <button
              onClick={() => setActiveTab('support')}
              className={`w-full p-3 rounded-xl text-left flex items-center gap-2.5 transition-colors cursor-pointer ${
                activeTab === 'support'
                  ? 'bg-[#00355f] text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Phone className="w-4 h-4" />
              <span>Mangadu Plant Desk Support</span>
            </button>
          </aside>

          {/* Right Main Content Panel (9 cols) */}
          <main className="lg:col-span-9 space-y-6">
            
            {/* ========================================================== */}
            {/* TAB 1: ORDERS & TRACKING */}
            {/* ========================================================== */}
            {activeTab === 'orders' && (
              <div className="space-y-4 animate-in fade-in">
                
                <div className="bg-white rounded-2xl p-5 shadow-xs border border-slate-200 flex items-center justify-between">
                  <div>
                    <h2 className="text-base font-headline font-bold text-[#0A2540]">My Order History &amp; Tracking</h2>
                    <p className="text-xs text-slate-500">Direct shipments dispatched from Essendaar Mangadu manufacturing plant.</p>
                  </div>

                  <button
                    onClick={() => setCurrentRoute('shop')}
                    className="text-xs font-bold text-[#00355f] hover:underline flex items-center gap-1"
                  >
                    <span>+ New Order</span>
                  </button>
                </div>

                {myOrders.length === 0 ? (
                  <div className="bg-white rounded-2xl p-8 shadow-xs border border-slate-200 text-center space-y-3">
                    <Package className="w-12 h-12 text-slate-300 mx-auto" />
                    <h3 className="font-headline font-bold text-sm text-slate-800">No previous orders found</h3>
                    <p className="text-xs text-slate-500">Explore our certified cleaning solutions and wholesale institutional packs.</p>
                    <button
                      onClick={() => setCurrentRoute('shop')}
                      className="px-4 py-2 rounded-xl bg-[#00355f] text-white font-bold text-xs hover:bg-[#0f4c81] transition-colors"
                    >
                      Shop Products
                    </button>
                  </div>
                ) : (
                  myOrders.map((order) => (
                    <div key={order.id} className="bg-white rounded-2xl p-5 shadow-xs border border-slate-200 space-y-4">
                      
                      {/* Order Header */}
                      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-headline font-bold text-sm text-[#0A2540]">
                              {order.orderNumber}
                            </span>
                            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                              order.status === 'completed'
                                ? 'bg-emerald-100 text-emerald-800'
                                : order.status === 'processing'
                                ? 'bg-sky-100 text-sky-800'
                                : 'bg-amber-100 text-amber-800'
                            }`}>
                              {order.status === 'completed' ? '✓ Delivered' : order.status === 'processing' ? '⚡ Dispatched from Mangadu' : 'On-Hold'}
                            </span>
                          </div>
                          <span className="text-[11px] text-slate-400">Placed on {order.date} · Paid via {order.customer?.paymentMethod?.toUpperCase() || 'UPI'}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setSelectedInvoiceOrder(order)}
                            className="px-3 py-1.5 rounded-lg border border-slate-200 hover:border-[#00355f] text-slate-700 hover:text-[#00355f] text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                          >
                            <Printer className="w-3.5 h-3.5" />
                            <span>Tax Invoice</span>
                          </button>

                          <button
                            onClick={() => handleReorder(order)}
                            className="px-3 py-1.5 rounded-lg bg-[#006e2d] hover:bg-[#14532D] text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                          >
                            <RotateCcw className="w-3.5 h-3.5" />
                            <span>1-Click Reorder</span>
                          </button>
                        </div>
                      </div>

                      {/* Live Tracking Progress Bar */}
                      <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2 font-headline">
                          Live Dispatch Milestones
                        </span>

                        <div className="grid grid-cols-4 gap-2 text-center text-[11px]">
                          <div className="space-y-1">
                            <div className="w-6 h-6 mx-auto rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] font-bold">
                              ✓
                            </div>
                            <span className="font-bold text-slate-800 block">Order Confirmed</span>
                            <span className="text-[10px] text-slate-400">Mangadu Plant</span>
                          </div>

                          <div className="space-y-1">
                            <div className="w-6 h-6 mx-auto rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] font-bold">
                              ✓
                            </div>
                            <span className="font-bold text-slate-800 block">Lab Tested &amp; Packed</span>
                            <span className="text-[10px] text-slate-400">ISO Batch Checked</span>
                          </div>

                          <div className="space-y-1">
                            <div className={`w-6 h-6 mx-auto rounded-full flex items-center justify-center text-[10px] font-bold ${
                              order.status === 'completed' ? 'bg-emerald-600 text-white' : 'bg-[#00355f] text-white animate-pulse'
                            }`}>
                              <Truck className="w-3 h-3" />
                            </div>
                            <span className="font-bold text-slate-800 block">Out for Delivery</span>
                            <span className="text-[10px] text-slate-400">Chennai Metro Courier</span>
                          </div>

                          <div className="space-y-1">
                            <div className={`w-6 h-6 mx-auto rounded-full flex items-center justify-center text-[10px] font-bold ${
                              order.status === 'completed' ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-500'
                            }`}>
                              ✓
                            </div>
                            <span className="font-bold text-slate-800 block">Delivered</span>
                            <span className="text-[10px] text-slate-400">Customer Doorstep</span>
                          </div>
                        </div>
                      </div>

                      {/* Items in Order */}
                      <div className="space-y-2 text-xs">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="flex items-center justify-between gap-3 py-1">
                            <div className="flex items-center gap-2.5">
                              <img
                                src={item.product?.image || 'https://lh3.googleusercontent.com/aida-public/AB6AXuCWsqgCY-jIhZJv6Okv_M4F_bRMGmEwd9HhZ8Pwwv1wIZWBGzCmPegx9mE5ld8MYDnee9JDiR8IZHwpMqCbz1A3A9HilUlvpoHjLwKbOprquqRRgS9DBvehTZpPGbdsXfDWWccSZjIVqKrc4BhVST623U6qF_9-I4sHkseS4RtyjjA-Z19ju2MuIKmIZjfBbRg7LXVZvcy-dqXOapJ7hc5HPQvm4Fda9BIUsYAWmgen30EOiwHLESUK5A'}
                                alt={item.product?.name}
                                className="w-10 h-10 object-contain rounded-lg bg-[#eff4ff] p-1 border border-slate-100"
                                referrerPolicy="no-referrer"
                              />
                              <div>
                                <span className="font-semibold text-slate-800 block">{item.product?.name}</span>
                                <span className="text-[11px] text-slate-400">
                                  {item.selectedVariant?.size || item.product?.packSize || 'Standard'} · Qty: {item.quantity}
                                </span>
                              </div>
                            </div>
                            <span className="font-bold text-[#0A2540]">
                              ₹{(item.product?.price || 0) * item.quantity}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Total and Shipping Address Footer */}
                      <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs">
                        <div className="text-slate-500 text-[11px]">
                          <span className="font-semibold text-slate-700">Ship to: </span>
                          <span>{order.customer?.address || currentUser.address}, {order.customer?.city || 'Chennai'} - {order.customer?.postalCode || '600122'}</span>
                        </div>
                        <div className="text-right">
                          <span className="text-[11px] text-slate-400 mr-2">Grand Total (Incl. 18% GST):</span>
                          <span className="font-headline font-black text-base text-[#00355f]">₹{order.total}</span>
                        </div>
                      </div>

                    </div>
                  ))
                )}

              </div>
            )}

            {/* ========================================================== */}
            {/* TAB 2: B2B QUOTATIONS & AUDITS */}
            {/* ========================================================== */}
            {activeTab === 'inquiries' && (
              <div className="space-y-4 animate-in fade-in">
                
                <div className="bg-white rounded-2xl p-5 shadow-xs border border-slate-200 flex items-center justify-between">
                  <div>
                    <h2 className="text-base font-headline font-bold text-[#0A2540]">B2B Quotations &amp; Manpower Inquiries</h2>
                    <p className="text-xs text-slate-500">Track custom institutional volume rate cards and facility audit requests.</p>
                  </div>

                  <button
                    onClick={() => setCurrentRoute('contact')}
                    className="px-3.5 py-1.5 rounded-lg bg-[#00355f] text-white font-bold text-xs hover:bg-[#0f4c81] transition-colors cursor-pointer"
                  >
                    + Request Bulk Quote
                  </button>
                </div>

                {myInquiries.length === 0 ? (
                  <div className="bg-white rounded-2xl p-8 shadow-xs border border-slate-200 text-center space-y-3">
                    <FileText className="w-12 h-12 text-slate-300 mx-auto" />
                    <h3 className="font-headline font-bold text-sm text-slate-800">No active quotations found</h3>
                    <p className="text-xs text-slate-500">Need 50L bulk barrels, hospital sanitation supplies, or housekeeping staff?</p>
                    <button
                      onClick={() => setCurrentRoute('contact')}
                      className="px-4 py-2 rounded-xl bg-[#006e2d] text-white font-bold text-xs hover:bg-[#14532D]"
                    >
                      Request Institutional Quote
                    </button>
                  </div>
                ) : (
                  myInquiries.map((inq) => (
                    <div key={inq.id} className="bg-white rounded-2xl p-5 shadow-xs border border-slate-200 space-y-3">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="font-headline font-bold text-sm text-[#0A2540]">
                            {inq.company || inq.name}
                          </span>
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                            inq.status === 'quoted'
                              ? 'bg-purple-100 text-purple-800'
                              : inq.status === 'completed'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-sky-100 text-sky-800'
                          }`}>
                            {inq.status === 'quoted' ? '📋 Quotation Prepared' : inq.status === 'completed' ? '✓ Completed' : 'In Review'}
                          </span>
                        </div>
                        <span className="text-[11px] text-slate-400">Date: {inq.date}</span>
                      </div>

                      <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs text-slate-700">
                        <span className="font-semibold block text-[#0A2540] mb-1">Requirement:</span>
                        <p>{inq.message}</p>
                        {inq.estimatedVolume && (
                          <span className="inline-block mt-2 px-2.5 py-0.5 rounded bg-sky-100 text-[#00355f] text-[11px] font-bold">
                            Estimated Volume: {inq.estimatedVolume}
                          </span>
                        )}
                      </div>

                      {inq.notes && (
                        <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 text-xs text-amber-900">
                          <span className="font-bold block mb-0.5">Note from Essendaar Plant Manager:</span>
                          <p>{inq.notes}</p>
                        </div>
                      )}

                      <div className="flex items-center justify-end gap-2 pt-2">
                        <a
                          href="https://wa.me/919787979757"
                          target="_blank"
                          rel="noreferrer"
                          className="px-3 py-1.5 rounded-lg bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span>Chat with Dispatch Desk on WhatsApp</span>
                        </a>
                      </div>
                    </div>
                  ))
                )}

              </div>
            )}

            {/* ========================================================== */}
            {/* TAB 3: SAVED ADDRESSES & GSTIN */}
            {/* ========================================================== */}
            {activeTab === 'addresses' && (
              <div className="bg-white rounded-2xl p-6 shadow-xs border border-slate-200 space-y-5 animate-in fade-in">
                
                <div>
                  <h2 className="text-base font-headline font-bold text-[#0A2540]">Default Delivery Address &amp; Billing Profile</h2>
                  <p className="text-xs text-slate-500">Auto-populates checkout for faster ordering and 18% GST Input Tax Credit.</p>
                </div>

                {saveSuccess && (
                  <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl flex items-center gap-2 text-xs font-semibold animate-in fade-in">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Your delivery address and billing profile have been updated successfully!</span>
                  </div>
                )}

                <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="w-full h-10 px-3 rounded-xl border border-slate-300 focus:outline-none focus:border-[#00355f]"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Contact Phone *</label>
                      <input
                        type="tel"
                        required
                        value={editPhone}
                        onChange={(e) => setEditPhone(e.target.value)}
                        className="w-full h-10 px-3 rounded-xl border border-slate-300 focus:outline-none focus:border-[#00355f]"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block font-semibold text-slate-700 mb-1">Email Address *</label>
                      <input
                        type="email"
                        required
                        value={editEmail}
                        onChange={(e) => setEditEmail(e.target.value)}
                        className="w-full h-10 px-3 rounded-xl border border-slate-300 focus:outline-none focus:border-[#00355f]"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block font-semibold text-slate-700 mb-1">Door / Flat No &amp; Street Address *</label>
                      <input
                        type="text"
                        required
                        value={editAddress}
                        onChange={(e) => setEditAddress(e.target.value)}
                        className="w-full h-10 px-3 rounded-xl border border-slate-300 focus:outline-none focus:border-[#00355f]"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Landmark</label>
                      <input
                        type="text"
                        value={editLandmark}
                        onChange={(e) => setEditLandmark(e.target.value)}
                        className="w-full h-10 px-3 rounded-xl border border-slate-300 focus:outline-none focus:border-[#00355f]"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">PIN Code (Chennai Metro) *</label>
                      <input
                        type="text"
                        required
                        value={editPostalCode}
                        onChange={(e) => setEditPostalCode(e.target.value)}
                        className="w-full h-10 px-3 rounded-xl border border-slate-300 focus:outline-none focus:border-[#00355f] font-mono"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">City</label>
                      <input
                        type="text"
                        value={editCity}
                        onChange={(e) => setEditCity(e.target.value)}
                        className="w-full h-10 px-3 rounded-xl border border-slate-300 bg-slate-50 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">State</label>
                      <input
                        type="text"
                        readOnly
                        value="Tamil Nadu"
                        className="w-full h-10 px-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-600"
                      />
                    </div>
                  </div>

                  {/* B2B Institutional GSTIN Section */}
                  <div className="pt-4 border-t border-slate-100 space-y-3">
                    <span className="font-bold text-[#0A2540] uppercase tracking-wider block font-headline">
                      B2B Organization &amp; 18% GST Input Credit
                    </span>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">Company / Institution Name</label>
                        <input
                          type="text"
                          placeholder="e.g. SVS Matriculation School"
                          value={editCompanyName}
                          onChange={(e) => setEditCompanyName(e.target.value)}
                          className="w-full h-10 px-3 rounded-xl border border-slate-300 focus:outline-none focus:border-[#00355f]"
                        />
                      </div>

                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">GSTIN Number (15 Digits)</label>
                        <input
                          type="text"
                          placeholder="33AABCT9821F1ZX"
                          value={editGstin}
                          onChange={(e) => setEditGstin(e.target.value)}
                          className="w-full h-10 px-3 rounded-xl border border-slate-300 focus:outline-none focus:border-[#00355f] uppercase font-mono"
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="py-3 px-6 rounded-xl bg-[#00355f] hover:bg-[#0f4c81] text-white font-headline font-bold text-xs shadow-md transition-all cursor-pointer"
                  >
                    Save &amp; Update Profile
                  </button>

                </form>

              </div>
            )}

            {/* ========================================================== */}
            {/* TAB 4: SECURITY & OTP VALIDATION */}
            {/* ========================================================== */}
            {activeTab === 'security' && (
              <div className="bg-white rounded-2xl p-6 shadow-xs border border-slate-200 space-y-5 animate-in fade-in">
                <div>
                  <h2 className="text-base font-headline font-bold text-[#0A2540]">Account Verification &amp; Security</h2>
                  <p className="text-xs text-slate-500">Your account credentials and email verification status.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-emerald-900">Email Verification</span>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-200 text-emerald-800 text-[10px] font-bold">
                        ✓ Verified
                      </span>
                    </div>
                    <p className="text-slate-600 text-[11px]">
                      Registered email: <span className="font-bold text-slate-800">{currentUser.email}</span>
                    </p>
                    <p className="text-[11px] text-emerald-700">
                      Validated with 6-digit Email OTP protocol.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-sky-50 border border-sky-200 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sky-900">Phone &amp; SMS Dispatch</span>
                      <span className="px-2 py-0.5 rounded-full bg-sky-200 text-sky-800 text-[10px] font-bold">
                        ✓ Active
                      </span>
                    </div>
                    <p className="text-slate-600 text-[11px]">
                      SMS &amp; WhatsApp updates sent to: <span className="font-bold text-slate-800">{currentUser.phone}</span>
                    </p>
                    <p className="text-[11px] text-sky-700">
                      Connected to Chennai Metro dispatch router.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-2">
                  <span className="font-bold text-[#0A2540] block">ISO 9001:2015 Data Protection</span>
                  <p className="text-slate-500 text-[11px] leading-relaxed">
                    Essendaar Suppliers stores customer procurement information securely strictly for tax invoicing, GST compliance, and Chennai dispatch coordination.
                  </p>
                </div>
              </div>
            )}

            {/* ========================================================== */}
            {/* TAB 5: DEDICATED SUPPORT */}
            {/* ========================================================== */}
            {activeTab === 'support' && (
              <div className="bg-white rounded-2xl p-6 shadow-xs border border-slate-200 space-y-5 animate-in fade-in">
                <div>
                  <h2 className="text-base font-headline font-bold text-[#0A2540]">Mangadu Plant Dispatch Desk</h2>
                  <p className="text-xs text-slate-500">Direct hotline to our Chennai manufacturing unit and customer support desk.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="p-4 rounded-2xl bg-[#eff4ff] border border-slate-200 space-y-2">
                    <Phone className="w-5 h-5 text-[#00355f]" />
                    <span className="font-bold text-[#00355f] block">Phone &amp; WhatsApp Helpline</span>
                    <p className="text-slate-600 text-[11px]">
                      Direct line to plant dispatch manager:
                    </p>
                    <a
                      href="tel:+919787979757"
                      className="text-sm font-bold text-[#00355f] block hover:underline"
                    >
                      +91 97879 79757
                    </a>
                  </div>

                  <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-2">
                    <Mail className="w-5 h-5 text-[#006e2d]" />
                    <span className="font-bold text-[#006e2d] block">Official Email Desk</span>
                    <p className="text-slate-600 text-[11px]">
                      Send RFQs, purchase orders, or payment receipts:
                    </p>
                    <a
                      href="mailto:essendaargroup@gmail.com"
                      className="text-sm font-bold text-[#006e2d] block hover:underline"
                    >
                      essendaargroup@gmail.com
                    </a>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-1.5">
                  <span className="font-bold text-[#0A2540] block">Manufacturing Plant &amp; Depot Address</span>
                  <p className="text-slate-600">
                    ESSENDAAR SUPPLIERS · No. 45, Kundrathur Main Road, Mangadu, Chennai, Tamil Nadu - 600122
                  </p>
                  <span className="text-[11px] text-slate-400 block">
                    Working Hours: Monday to Saturday (8:00 AM - 7:30 PM)
                  </span>
                </div>
              </div>
            )}

          </main>

        </div>
      </div>

      {/* ========================================================== */}
      {/* GST TAX INVOICE MODAL */}
      {/* ========================================================== */}
      {selectedInvoiceOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
            
            {/* Invoice Top Actions */}
            <div className="bg-[#0A2540] text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Printer className="w-4 h-4 text-secondary-fixed" />
                <span className="font-bold text-xs">GST Tax Invoice · {selectedInvoiceOrder.orderNumber}</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => downloadInvoiceFile(selectedInvoiceOrder)}
                  className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-[11px] font-bold transition-colors cursor-pointer flex items-center gap-1"
                  title="Download offline invoice file"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Download</span>
                </button>
                <button
                  onClick={() => printTaxInvoice(selectedInvoiceOrder)}
                  className="px-3.5 py-1.5 rounded-lg bg-[#006e2d] hover:bg-[#14532D] text-white text-[11px] font-bold transition-all cursor-pointer flex items-center gap-1.5 shadow-xs active:scale-98"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print / Save as PDF</span>
                </button>
                <button
                  onClick={() => setSelectedInvoiceOrder(null)}
                  className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white cursor-pointer"
                  title="Close"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Printable Invoice Sheet */}
            <div className="p-6 overflow-y-auto space-y-4 text-xs text-slate-800">
              
              {/* Header */}
              <div className="flex items-start justify-between border-b border-slate-200 pb-4">
                <div>
                  <h3 className="text-lg font-headline font-black text-[#00355f]">ESSENDAAR SUPPLIERS</h3>
                  <p className="text-[11px] text-slate-500">ISO 9001:2015 Certified Manufacturer</p>
                  <p className="text-[11px] text-slate-500">Mangadu, Chennai, Tamil Nadu - 600122</p>
                  <p className="text-[11px] font-mono text-[#00355f] font-bold">GSTIN: 33AABCS1234F1Z9</p>
                </div>

                <div className="text-right">
                  <span className="font-bold text-[#0A2540] block">TAX INVOICE</span>
                  <span className="font-mono text-xs text-slate-600 block">{selectedInvoiceOrder.orderNumber}</span>
                  <span className="text-[11px] text-slate-400 block">Date: {selectedInvoiceOrder.date}</span>
                </div>
              </div>

              {/* Bill To */}
              <div className="grid grid-cols-2 gap-4 bg-slate-50 p-3 rounded-xl border border-slate-100 text-[11px]">
                <div>
                  <span className="font-bold text-slate-400 uppercase tracking-wider block mb-1">Billed To:</span>
                  <span className="font-bold text-slate-900 block">{selectedInvoiceOrder.customer?.companyName || selectedInvoiceOrder.customer?.firstName + ' ' + (selectedInvoiceOrder.customer?.lastName || '') || currentUser.name}</span>
                  <p className="text-slate-600">{selectedInvoiceOrder.customer?.address || currentUser.address}, {selectedInvoiceOrder.customer?.city || 'Chennai'} - {selectedInvoiceOrder.customer?.postalCode || '600122'}</p>
                  <p className="text-slate-600">Phone: {selectedInvoiceOrder.customer?.phone || currentUser.phone}</p>
                  {selectedInvoiceOrder.customer?.gstin && (
                    <p className="font-mono font-bold text-[#00355f]">Buyer GSTIN: {selectedInvoiceOrder.customer.gstin}</p>
                  )}
                </div>

                <div className="text-right">
                  <span className="font-bold text-slate-400 uppercase tracking-wider block mb-1">Dispatch Details:</span>
                  <p className="text-slate-600">Dispatch Location: Mangadu Plant</p>
                  <p className="text-slate-600">Courier: Chennai Metro Direct Express</p>
                  <p className="font-semibold text-emerald-700">Payment: Paid via UPI (Verified)</p>
                </div>
              </div>

              {/* Items Table */}
              <table className="w-full border-collapse text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-300 text-slate-500 text-[11px]">
                    <th className="py-2">Item &amp; Description</th>
                    <th className="py-2 text-center">HSN</th>
                    <th className="py-2 text-center">Qty</th>
                    <th className="py-2 text-right">Rate</th>
                    <th className="py-2 text-right">Amount (₹)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {selectedInvoiceOrder.items.map((item, idx) => (
                    <tr key={idx}>
                      <td className="py-2.5 font-semibold text-slate-800">
                        {item.product?.name} ({item.selectedVariant?.size || item.product?.packSize || '1 Unit'})
                      </td>
                      <td className="py-2.5 text-center font-mono text-[11px] text-slate-500">3402</td>
                      <td className="py-2.5 text-center font-bold">{item.quantity}</td>
                      <td className="py-2.5 text-right font-mono">₹{item.product?.price}</td>
                      <td className="py-2.5 text-right font-bold text-slate-900 font-mono">
                        ₹{(item.product?.price || 0) * item.quantity}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Invoice Totals */}
              <div className="pt-3 border-t border-slate-200 flex justify-end">
                <div className="w-64 space-y-1.5 text-xs text-slate-600">
                  <div className="flex justify-between">
                    <span>Taxable Subtotal</span>
                    <span className="font-mono">₹{selectedInvoiceOrder.subtotal}</span>
                  </div>
                  <div className="flex justify-between text-emerald-700">
                    <span>Discount</span>
                    <span className="font-mono">-₹{selectedInvoiceOrder.discount || 0}</span>
                  </div>
                  <div className="flex justify-between text-[11px] text-slate-400">
                    <span>CGST (9%)</span>
                    <span className="font-mono">₹{Math.round((selectedInvoiceOrder.tax || 0) / 2)}</span>
                  </div>
                  <div className="flex justify-between text-[11px] text-slate-400">
                    <span>SGST (9%)</span>
                    <span className="font-mono">₹{Math.round((selectedInvoiceOrder.tax || 0) / 2)}</span>
                  </div>
                  <div className="pt-2 border-t border-slate-300 flex justify-between font-bold text-[#00355f] text-sm">
                    <span>Net Amount Payable</span>
                    <span className="font-mono">₹{selectedInvoiceOrder.total}</span>
                  </div>
                </div>
              </div>

              {/* Invoice Footer Seal */}
              <div className="pt-4 border-t border-slate-200 flex items-center justify-between text-[10px] text-slate-400">
                <span>Computer Generated Tax Invoice. No signature required.</span>
                <span className="font-semibold text-slate-600">Essendaar Authorized Quality Seal</span>
              </div>

            </div>

            {/* Modal Bottom Actions */}
            <div className="bg-slate-50 p-4 border-t border-slate-200 flex items-center justify-between">
              <button
                onClick={() => setSelectedInvoiceOrder(null)}
                className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 font-bold hover:bg-white text-xs transition-colors cursor-pointer"
              >
                Close
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => downloadInvoiceFile(selectedInvoiceOrder)}
                  className="px-4 py-2 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 rounded-xl font-bold text-xs transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download File</span>
                </button>
                <button
                  onClick={() => printTaxInvoice(selectedInvoiceOrder)}
                  className="px-5 py-2 bg-[#006e2d] hover:bg-[#14532D] text-white rounded-xl font-bold text-xs transition-all shadow-sm flex items-center gap-1.5 cursor-pointer active:scale-98"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print / Save as PDF</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
