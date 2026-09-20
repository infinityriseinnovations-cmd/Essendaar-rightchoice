import React, { useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { Product } from '../types';
import { 
  Sparkles, 
  ShieldCheck, 
  ShoppingCart, 
  Star, 
  ArrowRight, 
  Flame, 
  CheckCircle2, 
  FlaskConical,
  Award,
  Truck,
  Building2,
  Droplets,
  HeartHandshake
} from 'lucide-react';

export const HomeCareCleaningView: React.FC = () => {
  const { setCurrentRoute, products, addToCart, setSelectedProduct } = useStore();

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.title = 'Right Choice™ Home Care Cleaning Products | Essendaar Suppliers & Facility Care';
    }
  }, []);

  const homeCareProducts = products.filter(
    (p) => p.parentCategory === 'Cleaning Products' || p.category === 'Kitchen Care' || p.category === 'Laundry Care' || p.category === 'Surface Care' || p.category === 'Sanitation'
  );

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
          <span className="text-slate-500">Consumer Brands</span>
          <span>/</span>
          <span className="text-[#00355f] font-bold">Right Choice™ Home Care Cleaning Products</span>
        </div>

        {/* Hero Section with Resized Right Choice Logo Card */}
        <div className="bg-[#0A2540] rounded-3xl text-white p-6 sm:p-10 lg:p-12 mb-12 relative overflow-hidden shadow-lg border border-sky-950">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#006e2d]/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
          <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center relative z-10">
            
            {/* Left Column: Heading & Description */}
            <div className="lg:col-span-8">
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="inline-flex items-center gap-1.5 bg-[#006e2d] text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-xs">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Right Choice™ Entity</span>
                </span>
                <span className="inline-flex items-center gap-1.5 bg-white/10 text-sky-200 border border-white/15 px-3 py-1 rounded-full text-xs font-semibold">
                  <Building2 className="w-3.5 h-3.5 text-sky-300" />
                  <span>Consumer Brand of Essendaar Suppliers</span>
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-headline tracking-tight leading-tight mb-4 text-white">
                Home Care Cleaning Products
              </h1>
              
              <p className="text-slate-200 text-sm sm:text-base leading-relaxed mb-6 max-w-2xl font-medium">
                <span className="text-emerald-400 font-bold">"Clean Homes. Healthy Lives."</span> All household cleaning and hygiene formulations come under the official <strong className="text-white">Right Choice</strong> entity. Formulated with skin-friendly actives, hospital-grade germ kill rates, and certified by Tamilnadu Test House for safe domestic use.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3.5 mb-6">
                <button 
                  onClick={() => setCurrentRoute('shop')}
                  className="px-6 py-3 bg-[#006e2d] hover:bg-[#14532D] text-white rounded-xl font-bold text-sm flex items-center gap-2 transition-all shadow-md cursor-pointer hover:shadow-lg"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>Shop Right Choice Products</span>
                </button>
                <button 
                  onClick={() => setCurrentRoute('contact')}
                  className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-bold text-sm flex items-center gap-2 border border-white/20 transition-all cursor-pointer"
                >
                  <span>Inquire for Dealership &amp; Wholesale</span>
                </button>
              </div>

              {/* Quality Badges */}
              <div className="pt-4 border-t border-white/10 flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-slate-300">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Skin-Safe pH Balanced</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <FlaskConical className="w-4 h-4 text-sky-400 shrink-0" />
                  <span>99.98% Germ Kill Efficacy</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Direct Factory Value</span>
                </div>
              </div>
            </div>

            {/* Right Column: Resized Official Right Choice Logo Card */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="w-full max-w-xs sm:max-w-sm bg-white rounded-3xl p-6 shadow-2xl border border-white/40 text-slate-900 flex flex-col items-center text-center relative group transition-transform duration-300 hover:scale-[1.02]">
                <div className="absolute -top-3.5 bg-[#006e2d] text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-md flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" />
                  <span>Official Consumer Entity</span>
                </div>

                {/* Sized Logo Graphic */}
                <div className="w-full h-36 sm:h-40 flex items-center justify-center p-3 rounded-2xl bg-gradient-to-b from-slate-50 to-white border border-slate-100 mb-4 mt-2">
                  <img 
                    src="/right-choice-logo.png" 
                    alt="Right Choice Consumer Cleaning Products Official Logo" 
                    className="max-h-32 sm:max-h-36 w-auto object-contain drop-shadow-xs transition-transform duration-300 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div className="space-y-1">
                  <h2 className="font-black font-headline text-lg text-[#0A2540] tracking-tight">
                    Right Choice™
                  </h2>
                  <p className="text-xs text-emerald-700 font-bold">
                    Consumer Hygiene &amp; Domestic Formulations
                  </p>
                  <p className="text-[11px] text-slate-500 leading-snug pt-1">
                    The specialized retail cleaning entity under <strong>Essendaar Suppliers &amp; Facility Care</strong>, Chennai.
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 w-full flex items-center justify-around text-[10px] font-bold text-slate-600">
                  <span className="flex items-center gap-1 text-[#006e2d]">
                    <CheckCircle2 className="w-3 h-3" />
                    Tested
                  </span>
                  <span className="text-slate-300">•</span>
                  <span>MSME Registered</span>
                  <span className="text-slate-300">•</span>
                  <span>Eco-Conscious</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Right Choice Brand Entity Banner */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs mb-12">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#eff4ff] border border-sky-100 flex items-center justify-center p-2.5 shrink-0 shadow-xs">
              <img 
                src="/right-choice-logo.png" 
                alt="Right Choice Logo" 
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <span className="text-xs font-extrabold uppercase tracking-wider text-[#006e2d]">
                  Entity Architecture
                </span>
                <span className="text-slate-300">•</span>
                <span className="text-xs font-semibold text-slate-500">
                  Right Choice Division
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-black font-headline text-[#0A2540] mb-2">
                Why Home Care Formulations Carry the "Right Choice" Identity
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                While <strong>Essendaar Bulk &amp; Facility Care</strong> powers institutional 50L drums, school campus cleaning contracts, and hospital hygiene tenders, our consumer-grade retail formulations are formulated, packaged, and distributed under the <strong>Right Choice</strong> brand. Every 500ml, 1L, and 5L can of BOZZ laundry wash, MORNING SHINE dishwash, SKY FRESH floor cleaner, and POWER RIDE disinfectant brings lab-tested commercial sanitation directly into everyday homes.
              </p>
            </div>
          </div>
        </div>

        {/* 4 Flagship Household Lines */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
            <span className="text-xs font-bold text-[#00355f] uppercase tracking-wider">Fabric Care</span>
            <h3 className="text-lg font-bold font-headline text-[#0A2540] mt-1 mb-2">BOZZ Laundry Range</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Enzymatic liquid detergent and lavender fabric conditioner ensuring pristine fabric fibers and long-lasting freshness.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
            <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">Kitchen Care</span>
            <h3 className="text-lg font-bold font-headline text-[#0A2540] mt-1 mb-2">MORNING SHINE</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Concentrated lemon &amp; lime dishwash liquid and anti-sog grease bars for sparkling, residue-free cookware.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
            <span className="text-xs font-bold text-sky-700 uppercase tracking-wider">Floor &amp; Surfaces</span>
            <h3 className="text-lg font-bold font-headline text-[#0A2540] mt-1 mb-2">SKY FRESH Surface</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Natural pine floor cleaners and crystal streak-free glass spray for 99.9% germ-free living spaces.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
            <span className="text-xs font-bold text-rose-700 uppercase tracking-wider">Sanitation</span>
            <h3 className="text-lg font-bold font-headline text-[#0A2540] mt-1 mb-2">POWER RIDE Hygiene</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Thick clinging disinfectant gel removing stubborn mineral limescale and eliminating bathroom pathogens.
            </p>
          </div>
        </div>

        {/* Relevant Products Showcase */}
        <div className="mb-16">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-4">
            <div>
              <span className="text-xs font-bold text-[#006e2d] uppercase tracking-wider font-headline">
                Consumer &amp; Domestic Formulations
              </span>
              <h2 className="text-2xl sm:text-3xl font-black font-headline text-[#0A2540] mt-1">
                Relevant Home Care Products
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Direct factory pricing with promotional combos and free kitchen gifts included.
              </p>
            </div>
            <button 
              onClick={() => setCurrentRoute('shop')}
              className="text-xs font-bold text-[#00355f] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>View Full Store Catalog</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {homeCareProducts.map((product) => (
              <div 
                key={product.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between group"
              >
                <div className="p-4 pb-0 relative">
                  {product.badge && (
                    <span className="absolute top-6 left-6 z-10 bg-[#006e2d] text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-xs">
                      {product.badge}
                    </span>
                  )}
                  <div 
                    onClick={() => handleProductClick(product)}
                    className="w-full aspect-square bg-[#eff4ff] rounded-xl overflow-hidden cursor-pointer flex items-center justify-center p-3"
                  >
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#006e2d]">{product.brand}</span>
                        <span className="text-[9px] bg-emerald-50 text-[#006e2d] border border-emerald-200/60 px-1.5 py-0.2 rounded font-semibold">Right Choice™</span>
                      </div>
                      <div className="flex items-center gap-1 text-amber-500 font-bold text-xs">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        <span>{product.rating}</span>
                      </div>
                    </div>
                    <h3 
                      onClick={() => handleProductClick(product)}
                      className="text-sm font-bold font-headline text-slate-900 cursor-pointer hover:text-[#00355f] line-clamp-2"
                    >
                      {product.name}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2">{product.shortDescription}</p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <span className="text-base font-black text-[#00355f]">₹{product.price}</span>
                      {product.regularPrice > product.price && (
                        <span className="text-xs text-slate-400 line-through ml-1.5">₹{product.regularPrice}</span>
                      )}
                    </div>
                    <button 
                      onClick={() => addToCart(product, 1)}
                      className="px-3.5 py-2 bg-[#006e2d] hover:bg-[#14532D] text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <ShoppingCart className="w-3.5 h-3.5" />
                      <span>Add</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Certified Quality Strip */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xs mb-12">
          <h3 className="text-xl font-black font-headline text-[#0A2540] mb-4">Why Essendaar Home Care Formulas?</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs text-slate-600">
            <div className="flex gap-3">
              <CheckCircle2 className="w-5 h-5 text-[#006e2d] shrink-0" />
              <div>
                <strong className="text-slate-900 block text-sm mb-1">Dermatologist Safe Actives</strong>
                No caustic burns, harsh acids, or toxic fumes. Formulated to be completely gentle on hands.
              </div>
            </div>
            <div className="flex gap-3">
              <FlaskConical className="w-5 h-5 text-[#00355f] shrink-0" />
              <div>
                <strong className="text-slate-900 block text-sm mb-1">Tested in Certified Laboratories</strong>
                Formulated and validated to Tamilnadu Test House norms for 99.98% bacterial kill rate.
              </div>
            </div>
            <div className="flex gap-3">
              <Award className="w-5 h-5 text-amber-600 shrink-0" />
              <div>
                <strong className="text-slate-900 block text-sm mb-1">Direct Factory Pricing</strong>
                Direct from our Mangadu facility with no intermediary middleman markups.
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
