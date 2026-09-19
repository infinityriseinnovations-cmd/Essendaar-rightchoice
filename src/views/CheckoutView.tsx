import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  ShieldCheck, 
  Lock, 
  CheckCircle2, 
  CreditCard, 
  Truck, 
  Sparkles, 
  QrCode, 
  Copy, 
  Check, 
  Building2, 
  User, 
  ArrowRight,
  Flame,
  BadgePercent,
  ChevronDown,
  ChevronUp,
  ShoppingBag,
  ArrowLeft
} from 'lucide-react';

export const CheckoutView: React.FC = () => {
  const { 
    cart, 
    cartTotal, 
    couponCode, 
    appliedDiscount, 
    applyCoupon, 
    removeCoupon, 
    setCurrentRoute, 
    setLatestOrder,
    clearCart 
  } = useStore();

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [buyerType, setBuyerType] = useState<'retail' | 'business'>('retail');
  const [includeOrderBump, setIncludeOrderBump] = useState(false);
  const [couponInput, setCouponInput] = useState('');
  const [couponMessage, setCouponMessage] = useState<string | null>(null);
  const [copiedUpi, setCopiedUpi] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'cod' | 'po'>('upi');
  const [showOrderSummaryMobile, setShowOrderSummaryMobile] = useState(false);

  // Form states pre-filled with authentic Chennai customer info from prompt
  const [formData, setFormData] = useState({
    name: 'Senthil Kumar',
    phone: '98400 24561',
    email: 'senthil.procure@gmail.com',
    companyName: 'Evergreen International School',
    gstin: '33AABCE1234F1Z5',
    address: 'Flat 4B, Ruby Towers, Kundrathur Main Road',
    landmark: 'Near Kamakshi Amman Temple',
    city: 'Mangadu, Chennai',
    state: 'Tamil Nadu',
    pincode: '600122',
  });

  const orderBumpPrice = 180;
  const currentSubtotal = cartTotal + (includeOrderBump ? orderBumpPrice : 0);
  const calculatedDiscount = couponCode === 'ESSENDAAR10' ? Math.round(currentSubtotal * 0.1) : appliedDiscount;
  const totalPayable = Math.max(0, currentSubtotal - calculatedDiscount);
  const estimatedGst = Math.round((totalPayable * 0.18) / 1.18);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput) return;
    const res = applyCoupon(couponInput);
    setCouponMessage(res.message);
  };

  const handleCopyUpi = () => {
    navigator.clipboard?.writeText('essendaar@icici');
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2000);
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();

    const orderId = `ESD-${Math.floor(100000 + Math.random() * 900000)}`;
    const newOrder = {
      orderId,
      date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
      items: [...cart],
      subtotal: currentSubtotal,
      discount: calculatedDiscount,
      total: totalPayable,
      gst: estimatedGst,
      shippingAddress: `${formData.address}, ${formData.landmark}, ${formData.city}, ${formData.state} - ${formData.pincode}`,
      buyerName: formData.name,
      phone: formData.phone,
      email: formData.email,
      paymentMethod,
      buyerType,
      gstin: buyerType === 'business' ? formData.gstin : undefined,
      companyName: buyerType === 'business' ? formData.companyName : undefined,
    };

    setLatestOrder(newOrder);
    clearCart();
    setCurrentRoute('confirmation');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="w-full bg-[#f8f9ff] min-h-screen pb-24 lg:pb-16">
      
      {/* Checkout Security Bar */}
      <div className="bg-[#0A2540] text-white py-2 px-4 text-xs">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Lock className="w-3.5 h-3.5 text-secondary-fixed" />
            <span className="font-semibold">Secure Checkout (256-Bit SSL Encrypted)</span>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-slate-300">
            <ShieldCheck className="w-3.5 h-3.5 text-secondary-fixed" />
            <span>ISO 9001:2015 Verified Direct Manufacturer Dispatch</span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
        
        {/* Mobile Collapsible Order Summary */}
        <div className="lg:hidden mb-6 bg-white rounded-2xl p-4 shadow-xs border border-slate-200">
          <button
            onClick={() => setShowOrderSummaryMobile(!showOrderSummaryMobile)}
            className="w-full flex items-center justify-between text-xs font-bold text-[#0A2540] cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-[#00355f]" />
              <span>{showOrderSummaryMobile ? 'Hide' : 'Show'} Order Summary ({cart.length} items)</span>
              {showOrderSummaryMobile ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </div>
            <span className="text-sm font-headline font-black text-[#00355f]">₹{totalPayable}</span>
          </button>

          {showOrderSummaryMobile && (
            <div className="pt-4 mt-3 border-t border-slate-100 space-y-3 text-xs">
              {cart.map((item) => (
                <div key={item.product.id} className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-10 h-10 object-contain rounded bg-[#eff4ff] p-1 border border-slate-100"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <span className="font-semibold text-slate-800 block line-clamp-1">{item.product.name}</span>
                      <span className="text-[11px] text-slate-400">Qty: {item.quantity}</span>
                    </div>
                  </div>
                  <span className="font-bold text-[#0A2540]">₹{item.product.price * item.quantity}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Multi-Step Wizard Tabs */}
        <div className="flex items-center justify-center gap-2 sm:gap-4 mb-8 text-xs font-bold">
          <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full ${step >= 1 ? 'bg-[#00355f] text-white' : 'bg-slate-200 text-slate-600'}`}>
            <span className="w-4 h-4 rounded-full bg-white text-[#00355f] flex items-center justify-center text-[10px]">1</span>
            <span>Information</span>
          </div>
          <div className="w-6 h-0.5 bg-slate-300" />
          <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full ${step >= 2 ? 'bg-[#00355f] text-white' : 'bg-slate-200 text-slate-600'}`}>
            <span className="w-4 h-4 rounded-full bg-white text-[#00355f] flex items-center justify-center text-[10px]">2</span>
            <span>Shipping</span>
          </div>
          <div className="w-6 h-0.5 bg-slate-300" />
          <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full ${step >= 3 ? 'bg-[#00355f] text-white' : 'bg-slate-200 text-slate-600'}`}>
            <span className="w-4 h-4 rounded-full bg-white text-[#00355f] flex items-center justify-center text-[10px]">3</span>
            <span>Payment</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Form (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            
            {/* Express Pay Options (UPI / GPay / PhonePe) */}
            <div className="bg-white rounded-2xl p-5 shadow-xs border border-slate-200">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2 font-headline">
                Express Mobile Checkout
              </span>
              <div className="grid grid-cols-3 gap-2 text-xs font-bold">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('upi')}
                  className="py-2.5 px-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span className="text-[#00355f] font-headline font-black">GPay</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('upi')}
                  className="py-2.5 px-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span className="text-purple-700 font-headline font-black">PhonePe</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('upi')}
                  className="py-2.5 px-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span className="text-sky-600 font-headline font-black">Paytm UPI</span>
                </button>
              </div>
            </div>

            {/* Buyer Type Switch (Retail vs B2B / Institution) */}
            <div className="bg-white rounded-2xl p-5 shadow-xs border border-slate-200">
              <span className="text-xs font-bold text-[#0A2540] uppercase tracking-wider block mb-3 font-headline">
                Select Buyer Account Type
              </span>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setBuyerType('retail')}
                  className={`p-3.5 rounded-xl border text-left flex items-start gap-3 transition-all cursor-pointer ${
                    buyerType === 'retail'
                      ? 'border-[#00355f] bg-[#eff4ff] ring-2 ring-[#00355f]/20'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <User className={`w-5 h-5 mt-0.5 ${buyerType === 'retail' ? 'text-[#00355f]' : 'text-slate-400'}`} />
                  <div>
                    <span className="text-xs font-bold text-[#0A2540] block">Retail / Individual</span>
                    <span className="text-[11px] text-slate-500">For home and personal cleaning use</span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setBuyerType('business')}
                  className={`p-3.5 rounded-xl border text-left flex items-start gap-3 transition-all cursor-pointer ${
                    buyerType === 'business'
                      ? 'border-[#00355f] bg-[#eff4ff] ring-2 ring-[#00355f]/20'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <Building2 className={`w-5 h-5 mt-0.5 ${buyerType === 'business' ? 'text-[#00355f]' : 'text-slate-400'}`} />
                  <div>
                    <span className="text-xs font-bold text-[#0A2540] block">Business / Institution</span>
                    <span className="text-[11px] text-slate-500">Claim 18% GST Input Tax Credit</span>
                  </div>
                </button>
              </div>

              {buyerType === 'business' && (
                <div className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-3 animate-in fade-in text-xs">
                  <div className="flex flex-col gap-1">
                    <label className="font-semibold text-slate-800">Organization / School Name *</label>
                    <input
                      type="text"
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      className="h-10 px-3 rounded-lg border border-slate-300 focus:outline-none focus:border-[#00355f]"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="font-semibold text-slate-800">GSTIN Number (15 Digits) *</label>
                    <input
                      type="text"
                      value={formData.gstin}
                      onChange={(e) => setFormData({ ...formData, gstin: e.target.value })}
                      className="h-10 px-3 rounded-lg border border-slate-300 focus:outline-none focus:border-[#00355f] uppercase font-mono"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Customer & Shipping Information */}
            <form onSubmit={handlePlaceOrder} className="bg-white rounded-2xl p-5 shadow-xs border border-slate-200 flex flex-col gap-4">
              <span className="text-xs font-bold text-[#0A2540] uppercase tracking-wider block font-headline">
                Delivery Address &amp; Contact
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="flex flex-col gap-1">
                  <label className="font-semibold text-slate-800">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="h-10 px-3 rounded-lg border border-slate-300 focus:outline-none focus:border-[#00355f]"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="font-semibold text-slate-800">Phone Number (For Dispatch Updates) *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="h-10 px-3 rounded-lg border border-slate-300 focus:outline-none focus:border-[#00355f]"
                  />
                </div>

                <div className="sm:col-span-2 flex flex-col gap-1">
                  <label className="font-semibold text-slate-800">Email Address (For Invoices &amp; Tracking) *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="h-10 px-3 rounded-lg border border-slate-300 focus:outline-none focus:border-[#00355f]"
                  />
                </div>

                <div className="sm:col-span-2 flex flex-col gap-1">
                  <label className="font-semibold text-slate-800">Street Address / Door No / Building *</label>
                  <input
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="h-10 px-3 rounded-lg border border-slate-300 focus:outline-none focus:border-[#00355f]"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="font-semibold text-slate-800">Landmark</label>
                  <input
                    type="text"
                    value={formData.landmark}
                    onChange={(e) => setFormData({ ...formData, landmark: e.target.value })}
                    className="h-10 px-3 rounded-lg border border-slate-300 focus:outline-none focus:border-[#00355f]"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="font-semibold text-slate-800">PIN Code *</label>
                  <input
                    type="text"
                    required
                    value={formData.pincode}
                    onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                    className="h-10 px-3 rounded-lg border border-slate-300 focus:outline-none focus:border-[#00355f] font-mono"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="font-semibold text-slate-800">City / District</label>
                  <input
                    type="text"
                    readOnly
                    value={formData.city}
                    className="h-10 px-3 rounded-lg border border-slate-200 bg-slate-50 text-slate-600"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="font-semibold text-slate-800">State</label>
                  <input
                    type="text"
                    readOnly
                    value={formData.state}
                    className="h-10 px-3 rounded-lg border border-slate-200 bg-slate-50 text-slate-600"
                  />
                </div>
              </div>

              {/* Order Bump Card */}
              <div className="mt-3 p-4 rounded-xl bg-amber-50 border-2 border-amber-300 flex items-start gap-3">
                <input
                  type="checkbox"
                  id="bump-mop"
                  checked={includeOrderBump}
                  onChange={(e) => setIncludeOrderBump(e.target.checked)}
                  className="mt-1 h-4 w-4 rounded text-amber-600 focus:ring-amber-500 accent-amber-600 cursor-pointer"
                />
                <label htmlFor="bump-mop" className="flex-1 cursor-pointer select-none">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-amber-500 text-slate-950">
                      One-Click Exclusive Upgrade
                    </span>
                    <span className="text-xs font-bold text-amber-900 font-headline">Save 40%</span>
                  </div>
                  <span className="text-xs font-bold text-[#0A2540] block mt-1">
                    Add 2x Heavy Duty Floor Mops with Telescopic Handle for only ₹180
                  </span>
                  <span className="text-[11px] text-slate-600 block">
                    Regular M.R.P. ₹300. Commercial microfiber strand heads built for hospital and school floor corridors.
                  </span>
                </label>
              </div>

              {/* Payment Method Selector */}
              <div className="mt-2 flex flex-col gap-3">
                <span className="text-xs font-bold text-[#0A2540] uppercase tracking-wider block font-headline">
                  Select Payment Method
                </span>

                <div className="space-y-2">
                  {/* UPI Option */}
                  <label className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-colors ${paymentMethod === 'upi' ? 'border-[#00355f] bg-[#eff4ff]' : 'border-slate-200'}`}>
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'upi'}
                      onChange={() => setPaymentMethod('upi')}
                      className="mt-1 text-[#00355f] accent-[#00355f]"
                    />
                    <div className="flex-1 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-[#0A2540]">Instant UPI (0% Transaction Fee)</span>
                        <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">
                          Fastest Dispatch
                        </span>
                      </div>
                      <p className="text-slate-500 text-[11px] mt-0.5">Pay via Google Pay, PhonePe, Paytm, or BHIM</p>

                      {paymentMethod === 'upi' && (
                        <div className="mt-3 p-3 bg-white rounded-lg border border-slate-200 flex items-center justify-between gap-3 animate-in fade-in">
                          <div className="flex items-center gap-2">
                            <QrCode className="w-8 h-8 text-[#00355f]" />
                            <div>
                              <span className="text-[11px] text-slate-500 block">Essendaar Official UPI VPA</span>
                              <span className="font-bold text-[#0A2540] font-mono">essendaar@icici</span>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={handleCopyUpi}
                            className="px-2.5 py-1.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold flex items-center gap-1 text-[11px] cursor-pointer"
                          >
                            {copiedUpi ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                            <span>{copiedUpi ? 'Copied' : 'Copy'}</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </label>

                  {/* COD */}
                  <label className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-colors ${paymentMethod === 'cod' ? 'border-[#00355f] bg-[#eff4ff]' : 'border-slate-200'}`}>
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'cod'}
                      onChange={() => setPaymentMethod('cod')}
                      className="mt-1 text-[#00355f] accent-[#00355f]"
                    />
                    <div className="text-xs">
                      <span className="font-bold text-[#0A2540] block">Cash on Delivery (COD)</span>
                      <p className="text-slate-500 text-[11px]">Pay upon delivery at your doorstep in Chennai &amp; suburbs.</p>
                    </div>
                  </label>

                  {/* Institutional PO */}
                  {buyerType === 'business' && (
                    <label className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-colors ${paymentMethod === 'po' ? 'border-[#00355f] bg-[#eff4ff]' : 'border-slate-200'}`}>
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === 'po'}
                        onChange={() => setPaymentMethod('po')}
                        className="mt-1 text-[#00355f] accent-[#00355f]"
                      />
                      <div className="text-xs">
                        <span className="font-bold text-[#0A2540] block">Institutional Purchase Order (30 Days Credit)</span>
                        <p className="text-slate-500 text-[11px]">Available for verified educational institutions and corporate clients.</p>
                      </div>
                    </label>
                  )}
                </div>
              </div>

              {/* Desktop Submit Button */}
              <button
                type="submit"
                className="hidden lg:flex w-full py-4 rounded-xl bg-[#006e2d] hover:bg-[#14532D] text-white font-headline font-bold text-sm items-center justify-center gap-2 shadow-lg transition-all cursor-pointer mt-2"
              >
                <Lock className="w-4 h-4" />
                <span>Confirm Order &amp; Pay ₹{totalPayable}</span>
              </button>
            </form>

          </div>

          {/* Right Summary Sidebar (5 cols, sticky desktop) */}
          <aside className="hidden lg:flex lg:col-span-5 flex-col gap-5 sticky top-6">
            
            <div className="bg-white rounded-3xl p-6 shadow-xs border border-slate-200 flex flex-col gap-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <span className="font-headline font-bold text-sm text-[#0A2540]">
                  Order Items ({cart.length})
                </span>
                <button
                  onClick={() => setCurrentRoute('shop')}
                  className="text-xs font-semibold text-[#00355f] hover:underline"
                >
                  Edit Cart
                </button>
              </div>

              {/* Items List */}
              <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
                {cart.map((item) => (
                  <div key={item.product.id} className="flex items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-12 h-12 object-contain rounded-lg bg-[#eff4ff] p-1 border border-slate-100"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <span className="font-semibold text-slate-800 line-clamp-1">{item.product.name}</span>
                        <span className="text-[11px] text-slate-400">
                          {item.selectedVariant?.size || item.product.packSize} · Qty: {item.quantity}
                        </span>
                      </div>
                    </div>
                    <span className="font-bold text-[#0A2540]">
                      ₹{item.product.price * item.quantity}
                    </span>
                  </div>
                ))}

                {includeOrderBump && (
                  <div className="flex items-center justify-between gap-3 text-xs p-2 rounded-lg bg-amber-50 border border-amber-200">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-amber-600" />
                      <span className="font-semibold text-amber-900">2x Heavy Duty Floor Mops</span>
                    </div>
                    <span className="font-bold text-amber-900">₹{orderBumpPrice}</span>
                  </div>
                )}
              </div>

              {/* Coupon Code Box */}
              <div className="pt-3 border-t border-slate-100">
                {couponCode ? (
                  <div className="flex items-center justify-between p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-xs">
                    <div className="flex items-center gap-1.5 text-emerald-800 font-bold">
                      <BadgePercent className="w-4 h-4" />
                      <span>Code: {couponCode} (-10%)</span>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="text-xs text-rose-600 font-semibold hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Coupon (e.g. ESSENDAAR10)"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      className="flex-1 h-9 px-3 text-xs rounded-lg border border-slate-300 focus:outline-none focus:border-[#00355f] uppercase"
                    />
                    <button
                      type="submit"
                      className="px-3 h-9 rounded-lg bg-[#00355f] text-white text-xs font-bold hover:bg-[#0f4c81] cursor-pointer"
                    >
                      Apply
                    </button>
                  </form>
                )}
                {couponMessage && (
                  <p className="text-[11px] text-slate-500 mt-1">{couponMessage}</p>
                )}
              </div>

              {/* Totals Breakdown */}
              <div className="pt-3 border-t border-slate-100 space-y-2 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-slate-800">₹{currentSubtotal}</span>
                </div>

                {calculatedDiscount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-semibold">
                    <span>Introductory Savings (ESSENDAAR10)</span>
                    <span>-₹{calculatedDiscount}</span>
                  </div>
                )}

                <div className="flex justify-between text-[#006e2d] font-semibold">
                  <span>Free Sponge &amp; Scrub Pack (Value ₹50)</span>
                  <span>₹0.00</span>
                </div>

                <div className="flex justify-between text-[#006e2d] font-semibold">
                  <span>Express Dispatch (Chennai Metro)</span>
                  <span>FREE</span>
                </div>

                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>Estimated 18% GST (Included in MRP)</span>
                  <span>₹{estimatedGst}</span>
                </div>

                <div className="pt-3 border-t border-slate-200 flex justify-between items-baseline">
                  <span className="font-headline font-bold text-base text-[#0A2540]">Net Total Payable</span>
                  <span className="font-headline font-black text-2xl text-[#00355f]">₹{totalPayable}</span>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="pt-3 border-t border-slate-100 grid grid-cols-2 gap-2 text-[11px] text-slate-500">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-secondary-fixed" />
                  <span>Tamilnadu Test House Certified</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-secondary-fixed" />
                  <span>ISO 9001:2015 Quality</span>
                </div>
              </div>

            </div>

          </aside>

        </div>

      </div>

      {/* Sticky Mobile Bottom Conversion Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-3 z-30 shadow-2xl">
        <div className="max-w-md mx-auto flex items-center justify-between gap-3">
          <div className="flex flex-col text-left">
            <span className="text-[10px] text-slate-400 font-bold uppercase leading-none">Net Total</span>
            <span className="text-xl font-headline font-black text-[#00355f]">₹{totalPayable}</span>
            <span className="text-[10px] text-[#006e2d] font-semibold">Free Delivery Included</span>
          </div>

          <button
            onClick={handlePlaceOrder}
            className="flex-1 py-3 px-4 rounded-xl bg-[#006e2d] hover:bg-[#14532D] text-white font-headline font-bold text-xs flex items-center justify-center gap-1.5 shadow-md cursor-pointer"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Place Order &amp; Pay via UPI</span>
          </button>
        </div>
      </div>

    </div>
  );
};
