import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Product } from '../types';
import { 
  PackageCheck, 
  Truck, 
  FileSpreadsheet, 
  ShieldAlert, 
  Layers, 
  ArrowRight, 
  Download, 
  PhoneCall,
  BookOpen,
  Trophy,
  ShieldCheck,
  Sparkles,
  ShoppingCart
} from 'lucide-react';

export const InstitutionalSuppliesView: React.FC = () => {
  const { setCurrentRoute, products, addToCart, setSelectedProduct } = useStore();
  const [selectedTab, setSelectedTab] = useState<'all' | 'cleaning' | 'stationery' | 'sports' | 'safety'>('all');

  const filteredProducts = products.filter((p) => {
    if (selectedTab === 'cleaning') {
      return p.parentCategory === 'Cleaning Products' || p.category === 'Institutional Bulk' || p.packSize.includes('5L');
    }
    if (selectedTab === 'stationery') {
      return p.parentCategory === 'Stationery Products' || p.category === 'Notebooks & Registers' || p.category === 'Office Stationery';
    }
    if (selectedTab === 'sports') {
      return p.parentCategory === 'Sports Products' || p.category === 'Footballs & Basketballs' || p.category === 'Sports Accessories';
    }
    if (selectedTab === 'safety') {
      return p.parentCategory === 'Safety Products' || p.category === 'Fire Safety' || p.category === 'Personal Protection' || p.category === 'Industrial Safety';
    }
    // 'all' institutional products:
    return (
      p.parentCategory !== 'Cleaning Products' ||
      p.packSize.includes('5L') ||
      p.category === 'Institutional Bulk' ||
      p.category === 'Accessories'
    );
  });

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setCurrentRoute('product');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="w-full bg-[#f8f9ff] min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-xs text-slate-500 mb-6">
          <button onClick={() => setCurrentRoute('home')} className="hover:text-[#00355f] cursor-pointer">Home</button>
          <span>/</span>
          <span className="text-slate-500">Services</span>
          <span>/</span>
          <span className="text-[#00355f] font-bold">Institutional Supplies</span>
        </div>

        {/* Hero Section */}
        <div className="bg-[#0A2540] rounded-3xl text-white p-8 sm:p-12 mb-12 relative overflow-hidden shadow-md">
          <div className="max-w-3xl relative z-10">
            <div className="inline-flex items-center space-x-2 bg-[#006e2d] text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
              <PackageCheck className="w-4 h-4" />
              <span>Single-Source B2B Vendor for Institutions</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black font-headline tracking-tight leading-tight mb-4">
              Institutional &amp; Commercial Supplies
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
              Consolidated procurement for schools, colleges, IT parks, and healthcare campuses across Tamil Nadu: factory bulk cleaning chemicals, curriculum stationery, regulation sports gear, and certified fire/industrial safety equipment.
            </p>
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={() => setCurrentRoute('contact')}
                className="px-6 py-3 bg-[#006e2d] hover:bg-[#14532D] text-white rounded-xl font-bold text-sm flex items-center gap-2 transition-all shadow-md cursor-pointer"
              >
                <span>Request Consolidated Institutional Rate Card</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <a 
                href="tel:+919787979757"
                className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-bold text-sm flex items-center gap-2 border border-white/20 transition-all"
              >
                <PhoneCall className="w-4 h-4" />
                <span>B2B Supply Desk: +91 97879 79757</span>
              </a>
            </div>
          </div>
        </div>

        {/* 4 Supply Divisions Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          
          <div 
            onClick={() => setSelectedTab('cleaning')}
            className={`p-6 rounded-2xl border transition-all cursor-pointer ${
              selectedTab === 'cleaning' 
                ? 'bg-white border-[#00355f] shadow-md ring-2 ring-[#00355f]/20' 
                : 'bg-white border-slate-200 hover:border-slate-300 shadow-xs'
            }`}
          >
            <div className="w-10 h-10 rounded-xl bg-[#eff4ff] text-[#00355f] flex items-center justify-center mb-3">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-[#0A2540]">Cleaning Chemicals</h3>
            <p className="text-xs text-slate-500 mt-1 mb-3">5L &amp; 50L bulk floor cleaners, detergents &amp; soap oil</p>
            <span className="text-xs font-bold text-[#00355f] flex items-center gap-1">
              <span>View Division</span> &rarr;
            </span>
          </div>

          <div 
            onClick={() => setSelectedTab('stationery')}
            className={`p-6 rounded-2xl border transition-all cursor-pointer ${
              selectedTab === 'stationery' 
                ? 'bg-white border-[#00355f] shadow-md ring-2 ring-[#00355f]/20' 
                : 'bg-white border-slate-200 hover:border-slate-300 shadow-xs'
            }`}
          >
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center mb-3">
              <BookOpen className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-[#0A2540]">Stationery Products</h3>
            <p className="text-xs text-slate-500 mt-1 mb-3">School notebooks, attendance registers, A4 paper &amp; files</p>
            <span className="text-xs font-bold text-amber-800 flex items-center gap-1">
              <span>View Division</span> &rarr;
            </span>
          </div>

          <div 
            onClick={() => setSelectedTab('sports')}
            className={`p-6 rounded-2xl border transition-all cursor-pointer ${
              selectedTab === 'sports' 
                ? 'bg-white border-[#00355f] shadow-md ring-2 ring-[#00355f]/20' 
                : 'bg-white border-slate-200 hover:border-slate-300 shadow-xs'
            }`}
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-3">
              <Trophy className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-[#0A2540]">Sports Supplies</h3>
            <p className="text-xs text-slate-500 mt-1 mb-3">Footballs, basketballs, volleyball sets &amp; agility cones</p>
            <span className="text-xs font-bold text-emerald-800 flex items-center gap-1">
              <span>View Division</span> &rarr;
            </span>
          </div>

          <div 
            onClick={() => setSelectedTab('safety')}
            className={`p-6 rounded-2xl border transition-all cursor-pointer ${
              selectedTab === 'safety' 
                ? 'bg-white border-[#00355f] shadow-md ring-2 ring-[#00355f]/20' 
                : 'bg-white border-slate-200 hover:border-slate-300 shadow-xs'
            }`}
          >
            <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-800 flex items-center justify-center mb-3">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-[#0A2540]">Safety Equipment</h3>
            <p className="text-xs text-slate-500 mt-1 mb-3">ISI fire extinguishers, safety helmets, nitrile gloves &amp; vests</p>
            <span className="text-xs font-bold text-rose-800 flex items-center gap-1">
              <span>View Division</span> &rarr;
            </span>
          </div>

        </div>

        {/* Filter Navigation Strip */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setSelectedTab('all')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedTab === 'all'
                  ? 'bg-[#00355f] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              All Institutional Products ({products.length})
            </button>
            <button
              onClick={() => setSelectedTab('cleaning')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedTab === 'cleaning'
                  ? 'bg-[#00355f] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Bulk Cleaning Chemicals
            </button>
            <button
              onClick={() => setSelectedTab('stationery')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedTab === 'stationery'
                  ? 'bg-[#00355f] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Educational Stationery
            </button>
            <button
              onClick={() => setSelectedTab('sports')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedTab === 'sports'
                  ? 'bg-[#00355f] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Sports Supplies
            </button>
            <button
              onClick={() => setSelectedTab('safety')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedTab === 'safety'
                  ? 'bg-[#00355f] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Fire &amp; Campus Safety
            </button>
          </div>

          <button
            onClick={() => setCurrentRoute('shop')}
            className="text-xs font-bold text-[#006e2d] hover:underline flex items-center gap-1 cursor-pointer ml-auto"
          >
            <span>Open Complete Storefront</span> &rarr;
          </button>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
          {filteredProducts.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between group">
              <div className="p-4 pb-0 relative">
                <span className="absolute top-6 left-6 z-10 bg-[#0A2540] text-white text-[10px] font-bold px-2 py-0.5 rounded">
                  {item.packSize}
                </span>
                {item.badge && (
                  <span className="absolute top-6 right-6 z-10 bg-[#006e2d] text-white text-[10px] font-bold px-2 py-0.5 rounded">
                    {item.badge}
                  </span>
                )}
                <div 
                  onClick={() => handleProductClick(item)}
                  className="w-full aspect-square bg-[#eff4ff] rounded-xl overflow-hidden cursor-pointer flex items-center justify-center p-3"
                >
                  <img src={item.image} alt={item.name} className="w-full h-full object-contain group-hover:scale-105 transition-transform" />
                </div>
              </div>
              
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                    <span className="text-[#006e2d]">{item.brand}</span>
                    <span>{item.subCategory || item.category}</span>
                  </div>
                  <h3 
                    onClick={() => handleProductClick(item)}
                    className="text-sm font-bold font-headline text-slate-900 mt-1 cursor-pointer hover:text-[#00355f] line-clamp-2"
                  >
                    {item.name}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2">{item.shortDescription}</p>
                </div>
                
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 block font-semibold">Institutional Price</span>
                    <span className="text-base font-black text-[#00355f]">₹{item.price}</span>
                    {item.regularPrice > item.price && (
                      <span className="text-xs text-slate-400 line-through ml-1.5">₹{item.regularPrice}</span>
                    )}
                  </div>
                  <button 
                    onClick={() => addToCart(item, 1)}
                    className="px-3.5 py-2 bg-[#00355f] hover:bg-[#0A2540] text-white rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <ShoppingCart className="w-3.5 h-3.5" />
                    <span>Add</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* GST & Invoicing Strip */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xs mb-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-2xl">
            <span className="text-[11px] font-bold text-[#006e2d] uppercase tracking-wider">B2B Tax Credit</span>
            <h3 className="text-xl font-black font-headline text-[#0A2540] mt-1">18% GST Input Credit Tax Invoices</h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
              All institutional orders are billed directly under Essendaar Suppliers with official 18% GST e-way bills and certificate of analysis (COA) test sheets for your administrative audits.
            </p>
          </div>
          <button 
            onClick={() => setCurrentRoute('contact')}
            className="px-6 py-3 bg-[#0A2540] text-white rounded-xl text-xs font-bold whitespace-nowrap cursor-pointer hover:bg-slate-800"
          >
            Submit Corporate GST Order
          </button>
        </div>

      </div>
    </div>
  );
};
