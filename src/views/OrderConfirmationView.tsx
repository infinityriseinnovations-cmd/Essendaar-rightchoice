import React from 'react';
import { printTaxInvoice, downloadInvoiceFile } from '../utils/invoicePrint';
import { useStore } from '../context/StoreContext';
import { 
  CheckCircle2, 
  Package, 
  Truck, 
  MapPin, 
  Mail, 
  Phone,
  Printer, 
  ShieldCheck,
  Building2,
  QrCode,
  ArrowRight
} from 'lucide-react';

export const OrderConfirmationView: React.FC = () => {
  const { latestOrder, setCurrentRoute } = useStore();

  const handlePrint = () => {
    printTaxInvoice(order);
  };

  const order = latestOrder || {
    orderId: 'ESD-894210',
    date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
    items: [],
    subtotal: 890,
    discount: 89,
    total: 801,
    gst: 122,
    shippingAddress: 'Flat 4B, Ruby Towers, Kundrathur Main Road, Near Kamakshi Amman Temple, Mangadu, Chennai, Tamil Nadu - 600122',
    buyerName: 'Senthil Kumar',
    phone: '98400 24561',
    email: 'senthil.procure@gmail.com',
    paymentMethod: 'upi',
    buyerType: 'retail',
  };

  return (
    <div className="w-full bg-[#f8f9ff] min-h-screen py-10 sm:py-16 text-[#0A2540]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        
        {/* Success Header Card */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs text-center space-y-5">
          <div className="w-16 h-16 bg-emerald-100 text-[#006e2d] rounded-full flex items-center justify-center mx-auto shadow-xs">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-1">
            <span className="text-xs font-mono uppercase tracking-widest text-[#006e2d] font-bold bg-[#F0FDF4] px-3 py-1 rounded-full inline-block border border-emerald-200">
              Essendaar Direct Factory Order Placed
            </span>
            <h1 className="text-2xl sm:text-3xl font-headline font-bold text-[#0A2540] pt-1">
              Thank you, {order.buyerName}!
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
              Your order is registered at our Mangadu, Chennai facility. Our dispatch manager will verify your UPI payment and schedule Chennai metro fulfillment.
            </p>
          </div>

          {/* Quick Details Pills */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-4 border-y border-slate-100 text-left">
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-mono block">Order ID</span>
              <span className="text-xs font-bold text-[#0A2540] font-mono">{order.orderId}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-mono block">Date</span>
              <span className="text-xs font-semibold text-slate-700">{order.date}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-mono block">Total Paid</span>
              <span className="text-xs font-black text-[#00355f] font-headline">₹{order.total}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-mono block">Payment Mode</span>
              <span className="text-xs font-semibold text-[#006e2d] uppercase">{order.paymentMethod}</span>
            </div>
          </div>

          {/* Live Delivery Timeline */}
          <div className="pt-2 text-left">
            <h4 className="text-xs font-bold text-[#0A2540] uppercase tracking-wider mb-4 font-headline">
              Live Factory Dispatch Status
            </h4>

            <div className="grid grid-cols-4 gap-2 text-center text-xs">
              <div className="space-y-1">
                <div className="w-8 h-8 rounded-full bg-[#00355f] text-white flex items-center justify-center mx-auto text-xs font-bold">
                  ✓
                </div>
                <span className="font-semibold block text-[11px] text-[#0A2540]">Confirmed</span>
                <span className="text-[10px] text-slate-400">Just now</span>
              </div>

              <div className="space-y-1">
                <div className="w-8 h-8 rounded-full bg-[#006e2d] text-white flex items-center justify-center mx-auto text-xs font-bold animate-pulse">
                  <Package className="w-4 h-4" />
                </div>
                <span className="font-semibold block text-[11px] text-emerald-800">Packing</span>
                <span className="text-[10px] text-emerald-600">Mangadu Hub</span>
              </div>

              <div className="space-y-1 opacity-60">
                <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center mx-auto text-xs font-bold">
                  <Truck className="w-4 h-4" />
                </div>
                <span className="font-semibold block text-[11px] text-slate-700">Dispatch</span>
                <span className="text-[10px] text-slate-400">Within 24h</span>
              </div>

              <div className="space-y-1 opacity-60">
                <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center mx-auto text-xs font-bold">
                  <MapPin className="w-4 h-4" />
                </div>
                <span className="font-semibold block text-[11px] text-slate-700">Delivered</span>
                <span className="text-[10px] text-slate-400">Chennai &amp; Suburbs</span>
              </div>
            </div>
          </div>

          {/* Delivery & Customer Details */}
          <div className="bg-[#eff4ff] rounded-2xl p-5 text-left border border-slate-200 text-xs space-y-3">
            <h4 className="font-bold text-[#0A2540] font-headline text-sm flex items-center justify-between">
              <span>Fulfillment &amp; Tax Invoice Address</span>
              {order.buyerType === 'business' && (
                <span className="px-2 py-0.5 rounded bg-[#00355f] text-white text-[10px] font-bold">
                  B2B Tax Invoice (18% GST Input Credit)
                </span>
              )}
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-slate-600">
              <div>
                <span className="font-semibold block text-[#0A2540]">{order.buyerName}</span>
                {order.companyName && <p className="font-semibold text-[#00355f]">{order.companyName}</p>}
                {order.gstin && <p className="font-mono text-slate-500">GSTIN: {order.gstin}</p>}
                <p className="mt-1">{order.shippingAddress}</p>
              </div>

              <div className="space-y-1">
                <span className="font-semibold block text-[#0A2540]">Direct Tracking &amp; WhatsApp:</span>
                <p className="flex items-center space-x-1.5">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  <span>{order.email}</span>
                </p>
                <p className="flex items-center space-x-1.5">
                  <Phone className="w-3.5 h-3.5 text-[#006e2d]" />
                  <span>+91 {order.phone}</span>
                </p>
                <span className="inline-block mt-1 text-[10px] bg-emerald-100 text-emerald-800 font-semibold px-2 py-0.5 rounded">
                  Live Dispatch SMS / WhatsApp Active
                </span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between space-y-3 sm:space-y-0 gap-3">
            <div className="flex items-center gap-4">
              <button
                onClick={handlePrint}
                className="text-xs text-[#006e2d] hover:text-[#14532D] flex items-center space-x-1.5 cursor-pointer font-bold transition-colors"
              >
                <Printer className="w-4 h-4" />
                <span>Print / Save as PDF</span>
              </button>
              <button
                onClick={() => downloadInvoiceFile(order)}
                className="text-xs text-slate-600 hover:text-[#0A2540] flex items-center space-x-1.5 cursor-pointer font-semibold transition-colors"
              >
                <span>Download (.html)</span>
              </button>
            </div>

            <button
              onClick={() => setCurrentRoute('shop')}
              className="bg-[#006e2d] hover:bg-[#14532D] text-white font-bold text-xs px-6 py-3 rounded-xl flex items-center space-x-2 transition-all shadow-md cursor-pointer"
            >
              <span>Continue Shopping Products</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
