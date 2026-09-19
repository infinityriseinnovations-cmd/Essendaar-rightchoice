import React from 'react';
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
  Truck
} from 'lucide-react';

export const HomeCareCleaningView: React.FC = () => {
  const { setCurrentRoute, products, addToCart, setSelectedProduct } = useStore();

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
          <span className="text-slate-500">Services</span>
          <span>/</span>
          <span className="text-[#00355f] font-bold">Home Care Cleaning Products</span>
        </div>

        {/* Hero Section */}
        <div className="bg-[#0A2540] rounded-3xl text-white p-8 sm:p-12 mb-12 relative overflow-hidden shadow-md">
          <div className="max-w-3xl relative z-10">
            <div className="inline-flex items-center space-x-2 bg-[#006e2d] text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
              <Sparkles className="w-4 h-4" />
              <span>Service &bull; Direct Factory Formulations</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black font-headline tracking-tight leading-tight mb-4">
              Home Care Cleaning Products
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
              "Clean Homes. Healthy Lives." High-quality cleaning solutions engineered for a cleaner, safer, and healthier living space. Formulated with skin-friendly actives and certified by Tamilnadu Test House.
            </p>
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={() => setCurrentRoute('shop')}
                className="px-6 py-3 bg-[#006e2d] hover:bg-[#14532D] text-white rounded-xl font-bold text-sm flex items-center gap-2 transition-all shadow-md cursor-pointer"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>Shop All Home Care Products</span>
              </button>
              <button 
                onClick={() => setCurrentRoute('contact')}
                className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-bold text-sm flex items-center gap-2 border border-white/20 transition-all cursor-pointer"
              >
                <span>Inquire for Retail Distribution</span>
              </button>
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
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#006e2d]">{product.brand}</span>
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
