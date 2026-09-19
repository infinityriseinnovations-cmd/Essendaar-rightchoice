import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Product } from '../types';
import { 
  ShieldCheck, 
  FlaskConical, 
  ShoppingCart, 
  Building2, 
  CheckCircle2, 
  Star, 
  Eye, 
  ArrowRight, 
  Phone, 
  Mail, 
  Award, 
  Truck, 
  Factory, 
  Flame, 
  Sparkles,
  Users,
  Briefcase,
  Check,
  Send,
  Warehouse,
  FileCheck
} from 'lucide-react';

export const HomeView: React.FC = () => {
  const { products, addToCart, openQuickView, setSelectedProduct, setCurrentRoute } = useStore();
  const [activeCatalogTab, setActiveCatalogTab] = useState<'all' | 'homecare' | 'institutional'>('all');
  
  // Quote form state
  const [quoteSubmitted, setQuoteSubmitted] = useState(false);
  const [quoteData, setQuoteData] = useState({
    name: '',
    phone: '',
    organization: '',
    requirement: 'Bulk Cleaning Chemicals (50L Drums)',
    notes: '',
  });

  const handleQuoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setQuoteSubmitted(true);
    setTimeout(() => {
      setQuoteSubmitted(false);
      setQuoteData({
        name: '',
        phone: '',
        organization: '',
        requirement: 'Bulk Cleaning Chemicals (50L Drums)',
        notes: '',
      });
    }, 4000);
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setCurrentRoute('product');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Filter products for combos section
  const filteredBestSellers = products.filter((p) => {
    if (activeCatalogTab === 'homecare') return p.category === 'Kitchen Care' || p.category === 'Laundry Care';
    if (activeCatalogTab === 'institutional') return p.packSize.includes('5 Litres') || p.packSize.includes('Can') || p.category === 'Institutional Bulk';
    return true;
  }).slice(0, 4);

  return (
    <div className="w-full bg-[#f8f9ff]">
      
      {/* SECTION 1: HERO SHOWCASE */}
      <section className="relative w-full bg-[#eff4ff] overflow-hidden pt-8 pb-14 lg:pb-20 border-b border-slate-200/60">
        {/* Ambient organic depth glow */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#00355f]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#006e2d]/10 rounded-full blur-2xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          
          {/* Certification Pills */}
          <div className="flex flex-wrap items-center gap-2.5 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white shadow-xs text-[#00355f] text-xs font-semibold border border-slate-200">
              <ShieldCheck className="w-4 h-4 text-[#006e2d]" />
              <span>ISO 9001:2015 Certified Manufacturer</span>
            </span>

            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#F0FDF4] text-[#14532D] text-xs font-semibold border border-emerald-200">
              <FlaskConical className="w-3.5 h-3.5" />
              <span>Tamilnadu Test House Certified Formulation</span>
            </span>

            <span className="text-slate-500 text-xs font-medium hidden sm:inline">
              Mangadu, Chennai Hub
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Hero Left Content */}
            <div className="lg:col-span-7 flex flex-col items-start gap-4">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                <span className="text-xs font-bold text-[#0A2540] tracking-widest uppercase font-headline">
                  Direct-to-Institution &amp; Retail Supply
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-headline font-extrabold text-[#0A2540] tracking-tight leading-tight">
                Clean Solutions.{' '}
                <span className="text-[#00355f] underline decoration-[#006e2d] decoration-4 underline-offset-8">
                  Reliable Services.
                </span>{' '}
                For Homes &amp; Institutions.
              </h1>

              <p className="text-sm sm:text-base text-slate-600 max-w-2xl leading-relaxed">
                ISO 9001:2015 Certified Manufacturer and Integrated Facility Care Partner based in Mangadu, Chennai. Formulated to rigorous clinical hygiene benchmarks and certified by Tamilnadu Test House Pvt. Ltd.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-3 pt-2 w-full sm:w-auto">
                <button
                  onClick={() => setCurrentRoute('shop')}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-[#006e2d] hover:bg-[#14532D] text-white text-xs sm:text-sm font-bold shadow-md transition-all transform hover:-translate-y-0.5 cursor-pointer"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>Shop Cleaning Products</span>
                </button>

                <button
                  onClick={() => setCurrentRoute('contact')}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-white hover:bg-[#EBF3FA] text-[#00355f] text-xs sm:text-sm font-bold shadow-xs border border-slate-200 transition-all cursor-pointer"
                >
                  <Building2 className="w-4 h-4 text-[#00355f]" />
                  <span>Explore Facility Management</span>
                </button>
              </div>

              {/* Micro Stats */}
              <div className="grid grid-cols-3 gap-3 sm:gap-4 pt-3 w-full max-w-lg">
                <div className="p-3 bg-white rounded-xl shadow-xs border border-slate-200/80">
                  <span className="text-xl sm:text-2xl font-headline font-bold text-[#00355f] block leading-none">
                    4
                  </span>
                  <span className="text-[10px] sm:text-xs font-semibold text-slate-500 uppercase">
                    Flagship Lines
                  </span>
                </div>

                <div className="p-3 bg-white rounded-xl shadow-xs border border-slate-200/80">
                  <span className="text-xl sm:text-2xl font-headline font-bold text-[#006e2d] block leading-none">
                    500+
                  </span>
                  <span className="text-[10px] sm:text-xs font-semibold text-slate-500 uppercase">
                    Campuses Served
                  </span>
                </div>

                <div className="p-3 bg-white rounded-xl shadow-xs border border-slate-200/80">
                  <span className="text-xl sm:text-2xl font-headline font-bold text-[#0A2540] block leading-none">
                    100%
                  </span>
                  <span className="text-[10px] sm:text-xs font-semibold text-slate-500 uppercase">
                    Lab Verified
                  </span>
                </div>
              </div>
            </div>

            {/* Hero Right: 4-Brand Bento Preview Grid */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-3 relative">
              
              {/* BOZZ Card */}
              <div 
                onClick={() => {
                  const p = products.find(prod => prod.brand === 'BOZZ');
                  if (p) handleProductClick(p);
                }}
                className="bg-white p-3.5 rounded-xl shadow-xs hover:shadow-md transition-all flex flex-col justify-between group cursor-pointer border border-slate-200/80"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2 py-0.5 rounded bg-[#d2e4ff] text-[#00355f] text-[10px] font-bold uppercase">
                    Laundry
                  </span>
                  <span className="text-xs text-slate-400 group-hover:text-[#00355f] transition-colors">↗</span>
                </div>
                <div className="w-full h-28 sm:h-32 rounded-lg overflow-hidden bg-[#eff4ff] mb-2">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDOKxepMN_hOkdEH1e9m6rDMljtExEURt96tEYu8fho03fRF8zQLGLgr9N-WaWmYdZ5Tg49-7EbrYwQjHW-OezYUEMrWA8iExio_2MCtOMvlO5BCM8iiNXm5UAYiz0NbSRWS75ryMjQWyV1qMo_P_LgSfmj3L6GqR6n3pPVn0u3PtNZO08t07j6kSyliLBf8nYUc4VHCI7j0DD9ot-IAWwVz74jPW7st9ftAC-6F3hKT7rtLB2fKOQEZA"
                    alt="BOZZ laundry detergent"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <span className="font-headline font-bold text-sm text-[#0A2540] block">BOZZ</span>
                  <p className="text-[11px] text-slate-500 leading-tight">Liquid Detergent &amp; Fabric Conditioner</p>
                </div>
              </div>

              {/* MORNING SHINE Card */}
              <div 
                onClick={() => {
                  const p = products.find(prod => prod.brand === 'MORNING SHINE');
                  if (p) handleProductClick(p);
                }}
                className="bg-white p-3.5 rounded-xl shadow-xs hover:shadow-md transition-all flex flex-col justify-between group cursor-pointer border border-slate-200/80"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-900 text-[10px] font-bold uppercase">
                    Kitchen
                  </span>
                  <span className="text-xs text-slate-400 group-hover:text-[#00355f] transition-colors">↗</span>
                </div>
                <div className="w-full h-28 sm:h-32 rounded-lg overflow-hidden bg-[#eff4ff] mb-2">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCr6r6bWBmvC4YE7_xPpBSoIJL1aVuIVZvQyBWxVZJsjx0Fq23dsATrIrhGqUr68mKqbsy0iAgDwAwjw7rhV2fU1o4QX80wHlfWmCsqv2kkogVMr7GpXpuzhn29dTQGqAr0_2LpYHDHqPVa5CXyJisE3uV1X2DT8uafEFFwwjQV3TI6uQCACH99zPREu-Z8GpcTdXs3ysrIfENDdpJYPYPucdslI7dBl_gZlfu64zqJzDTKd5t7ekmQEw"
                    alt="Morning Shine dishwash"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <span className="font-headline font-bold text-sm text-[#0A2540] block">MORNING SHINE</span>
                  <p className="text-[11px] text-slate-500 leading-tight">Dishwash Liquid &amp; Grease Cut Bar</p>
                </div>
              </div>

              {/* SKY FRESH Card */}
              <div 
                onClick={() => {
                  const p = products.find(prod => prod.brand === 'SKY FRESH');
                  if (p) handleProductClick(p);
                }}
                className="bg-white p-3.5 rounded-xl shadow-xs hover:shadow-md transition-all flex flex-col justify-between group cursor-pointer border border-slate-200/80"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2 py-0.5 rounded bg-sky-100 text-sky-900 text-[10px] font-bold uppercase">
                    Surface
                  </span>
                  <span className="text-xs text-slate-400 group-hover:text-[#00355f] transition-colors">↗</span>
                </div>
                <div className="w-full h-28 sm:h-32 rounded-lg overflow-hidden bg-[#eff4ff] mb-2">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCCNDB9qMn-gMK20DiO4DXtMrn9Dhdavbpu1t8qW4kNmWE8FF9C9Gmp4TxaXjT2G2LqzplvFxbXuCSAHGy51Y--D6c8HJ5q969fSlaNgRaDfs5Z0nko2PgS8rhAgj14H7c6zxk5XKD1ndYuWe8iwi1C97wPg_Y3UDfjjHHEoc2GG-gUTRyK00-tAPdfOVAIgSbtCo4ouVtgg17RD_RzewkqDYk56eG-AZKj-aKh5Bz9upwARriH2kcfcQ"
                    alt="Sky Fresh floor cleaner"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <span className="font-headline font-bold text-sm text-[#0A2540] block">SKY FRESH</span>
                  <p className="text-[11px] text-slate-500 leading-tight">Floor Cleaner &amp; Car Shampoo</p>
                </div>
              </div>

              {/* POWER RIDE Card */}
              <div 
                onClick={() => {
                  const p = products.find(prod => prod.brand === 'POWER RIDE');
                  if (p) handleProductClick(p);
                }}
                className="bg-white p-3.5 rounded-xl shadow-xs hover:shadow-md transition-all flex flex-col justify-between group cursor-pointer border border-slate-200/80"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2 py-0.5 rounded bg-rose-100 text-rose-900 text-[10px] font-bold uppercase">
                    Sanitation
                  </span>
                  <span className="text-xs text-slate-400 group-hover:text-[#00355f] transition-colors">↗</span>
                </div>
                <div className="w-full h-28 sm:h-32 rounded-lg overflow-hidden bg-[#eff4ff] mb-2">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBFF_Vo7HtUKt_cwK6SLd1nVXNw-Q8kqOBWecSI3ty8VFo6kgAC9b4HNHm2qn6JrsMZZdAJp1pktdifRO_EBxBQF1bdR77cdd-hPGyLj2zub5ohogdn3nq6SEpANlG3Ces_UIksRwVVfr6dnjapoWVPAhvf8566rihAlLy_Pir09BwGcdn2rXzzKA8zUpbQ9GiI7arFnhOMy3D-81bdkofVgNk4mSwkjLaVlljwWddyfo5lWZZipoY8tw"
                    alt="Power Ride toilet cleaner"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <span className="font-headline font-bold text-sm text-[#0A2540] block">POWER RIDE</span>
                  <p className="text-[11px] text-slate-500 leading-tight">Heavy Duty Toilet Disinfectant</p>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* QUICK TRUST BADGES STRIP (Trust Navy Dark) */}
      <div className="w-full bg-[#0A2540] text-white py-4 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-5 h-5 text-secondary-fixed" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-xs font-bold font-headline">100% Quality Tested</span>
                <span className="text-[11px] text-slate-300">Tamilnadu Test House</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                <Award className="w-5 h-5 text-secondary-fixed" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-xs font-bold font-headline">ISO 9001:2015</span>
                <span className="text-[11px] text-slate-300">Certified Production Line</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                <Truck className="w-5 h-5 text-amber-400" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-xs font-bold font-headline">Timely Dispatch</span>
                <span className="text-[11px] text-slate-300">Across Tamil Nadu</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                <Factory className="w-5 h-5 text-secondary-fixed" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-xs font-bold font-headline">Direct Manufacturer</span>
                <span className="text-[11px] text-slate-300">Zero Intermediary Markup</span>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* SECTION 2: FEATURED BRANDS SHOWCASE */}
      <section className="py-14 sm:py-16 bg-[#f8f9ff]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-3">
            <div>
              <span className="text-xs font-bold text-[#006e2d] uppercase tracking-wider font-headline">
                Manufactured In Chennai
              </span>
              <h2 className="text-2xl sm:text-3xl font-headline font-bold text-[#0A2540] mt-1">
                Our Flagship Brand Portfolio
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-xl">
                Specialized industrial-grade cleanliness engineered for residential homes and institutional campuses.
              </p>
            </div>

            <button
              onClick={() => setCurrentRoute('shop')}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#00355f] hover:text-[#0f4c81] transition-colors cursor-pointer"
            >
              <span>View All 30+ SKUs</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* BOZZ Card */}
            <div className="bg-white rounded-2xl p-5 shadow-xs border border-slate-200 flex flex-col justify-between hover:shadow-md transition-shadow">
              <div>
                <div className="w-full h-40 rounded-xl overflow-hidden bg-slate-100 mb-4">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuD2P_UibsV3ZhGXsAcsB37uEUVhwZmAtw6X64bTHyJTSv3vcte8d4mVnOuk70dX00JyWWAH3xRK-SSxKFzwIJ7OWdRNANmEQIuxFe9Hr53fjTLFl8ScBj75f_DyfvEfNamWMMr5jMT6qixQytqZkjYVUJAXwYcG45CDLaw41nw1ZVp3Fr2pJ9GwHSrUcu65KuIU63c9yNnNTZ1Umyuu4OZCQlC_vuQ5R2ib9LCHsZ-VSRIwh5Byz52anQ"
                    alt="BOZZ range"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <span className="px-2 py-0.5 rounded-full bg-[#00355f] text-white text-[10px] font-bold uppercase">
                  Fabric Protection
                </span>
                <h3 className="text-lg font-headline font-bold text-[#0A2540] mt-2">BOZZ</h3>
                <p className="text-xs font-semibold text-[#00355f]">Laundry Care</p>
                <p className="text-xs text-slate-500 italic my-2">"The Power of Clean &amp; Comfort."</p>
                <ul className="space-y-1.5 text-xs text-slate-600 mb-4">
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#006e2d]" />
                    <span>Active Enzyme Stain Cut</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#006e2d]" />
                    <span>Fabric Conditioner Infusion</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#006e2d]" />
                    <span>Available in 1L, 5L &amp; 50L Cans</span>
                  </li>
                </ul>
              </div>
              <button
                onClick={() => setCurrentRoute('shop')}
                className="w-full py-2.5 rounded-lg bg-[#eff4ff] text-[#00355f] hover:bg-[#00355f] hover:text-white text-center text-xs font-bold transition-colors cursor-pointer"
              >
                Browse BOZZ Range
              </button>
            </div>

            {/* MORNING SHINE (With Promo Badge) */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border-2 border-amber-400 flex flex-col justify-between relative hover:shadow-md transition-shadow">
              <div className="absolute -top-3 left-4 bg-amber-500 text-slate-950 px-3 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-xs flex items-center gap-1">
                <Flame className="w-3 h-3 text-slate-950" />
                <span>Special Promotional Pack</span>
              </div>
              <div>
                <div className="w-full h-40 rounded-xl overflow-hidden bg-slate-100 mt-2 mb-4">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuC4kSW_0PvzdRex_NQ2Ty64XqniUArgWORgLTs2RcDzyY3Fcqv9ODc1r9egmvCuNnW-j-Y6146nPquAESG4n0jMcWbEzkACn787V0PgFjwm5TbJ_8t7WO5-V89usAjzCN0TSAfAOTLx_lyIzUwO_ZVJs1ub_ause-5GjOMYx2pieGNeHpDy_8tcGkg8x5xBos9j-3fj5slvTpwka5VP3wz-DJqTP6dIU9pWpLzZjlDitk2ktVQXqUdT7Q"
                    alt="Morning shine range"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <span className="px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 text-[10px] font-bold uppercase">
                  Grease Eliminator
                </span>
                <h3 className="text-lg font-headline font-bold text-[#0A2540] mt-2">MORNING SHINE</h3>
                <p className="text-xs font-semibold text-amber-600">Kitchen Care</p>
                <p className="text-xs text-slate-500 italic my-2">"Start Your Day with a Shine!"</p>
                <div className="bg-amber-50 p-2.5 rounded-lg mb-4 text-xs text-[#0A2540] border border-amber-200">
                  <span className="font-bold text-amber-800 block text-[11px] uppercase">Combo Bonus:</span>
                  <span>500ml + Free Scrub Pad worth ₹15</span><br/>
                  <span>1L + Free Scrub Pad &amp; Sponge worth ₹25</span>
                </div>
              </div>
              <button
                onClick={() => {
                  const p = products.find(prod => prod.id === 'prod-ms-1l');
                  if (p) handleProductClick(p);
                }}
                className="w-full py-2.5 rounded-lg bg-[#006e2d] hover:bg-[#14532D] text-white text-center text-xs font-bold transition-colors cursor-pointer shadow-xs"
              >
                Get Morning Shine Pack
              </button>
            </div>

            {/* SKY FRESH */}
            <div className="bg-white rounded-2xl p-5 shadow-xs border border-slate-200 flex flex-col justify-between hover:shadow-md transition-shadow">
              <div>
                <div className="w-full h-40 rounded-xl overflow-hidden bg-slate-100 mb-4">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAvuWUxqxvK8WpzpDQV54b0KuGDCMcuEcbzyN2chLMkj5nseDOiYE67Bggm3gN7E3FdbXExNK6aGKQU3JAXMZz0RrefyrKr72Np6TjDEoHoLbJBVOH7rkWlmZd53RIn9wG2YKIwJ-zyI2aTEZmdZp92es9rMMned0THTsemWf848TnhVB5dE-BuxxBK08sDWuUwJvxYjqxn-aIQevBvyV_oE0u7TwgNWKi1ZfP98vjozpTqni1SEm3cYw"
                    alt="Sky fresh range"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <span className="px-2 py-0.5 rounded-full bg-sky-600 text-white text-[10px] font-bold uppercase">
                  Germ Guard 99.9%
                </span>
                <h3 className="text-lg font-headline font-bold text-[#0A2540] mt-2">SKY FRESH</h3>
                <p className="text-xs font-semibold text-sky-700">Surface &amp; Vehicle Care</p>
                <p className="text-xs text-slate-500 italic my-2">"Clean. Shine. Refresh."</p>
                <ul className="space-y-1.5 text-xs text-slate-600 mb-4">
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#006e2d]" />
                    <span>Floor Cleaner (Rose &amp; Citrus)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#006e2d]" />
                    <span>Streak-free Glass Cleaner</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#006e2d]" />
                    <span>High-Foam Car Care Shampoo</span>
                  </li>
                </ul>
              </div>
              <button
                onClick={() => setCurrentRoute('shop')}
                className="w-full py-2.5 rounded-lg bg-[#eff4ff] text-[#00355f] hover:bg-[#00355f] hover:text-white text-center text-xs font-bold transition-colors cursor-pointer"
              >
                Browse Sky Fresh
              </button>
            </div>

            {/* POWER RIDE */}
            <div className="bg-white rounded-2xl p-5 shadow-xs border border-slate-200 flex flex-col justify-between hover:shadow-md transition-shadow">
              <div>
                <div className="w-full h-40 rounded-xl overflow-hidden bg-slate-100 mb-4">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDOotE75xIn__ZiLQCYB2YccaY7p7CO7opm2OFKB9aJcHjFOBOZyHXVea2GJBzPR50HR37XYRLP46ziHP2upu7pW3fWpseGoWTZshCU7eeJyJULjMIAX7qbLOMW4z3mTVJCRKH1481tTQi1Xp7zA-bSIzLxq5QZijn6QE7dOKfOg2FsaDRpe3blLyvCbWWwrkiBfs5257G64mGHwP3apoYcaMHcVqKeJ6oITE5vCUPfq-GWZUcEaVEnjQ"
                    alt="Power ride range"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <span className="px-2 py-0.5 rounded-full bg-rose-600 text-white text-[10px] font-bold uppercase">
                  Scale Buster
                </span>
                <h3 className="text-lg font-headline font-bold text-[#0A2540] mt-2">POWER RIDE</h3>
                <p className="text-xs font-semibold text-rose-600">Toilet Care</p>
                <p className="text-xs text-slate-500 italic my-2">"Powerful Cleaning. Fresh Results."</p>
                <ul className="space-y-1.5 text-xs text-slate-600 mb-4">
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#006e2d]" />
                    <span>Deep Limescale Dissolution</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#006e2d]" />
                    <span>99.99% Pathogen Eradication</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#006e2d]" />
                    <span>Institutional Bulk Drums for Campuses</span>
                  </li>
                </ul>
              </div>
              <button
                onClick={() => setCurrentRoute('shop')}
                className="w-full py-2.5 rounded-lg bg-[#eff4ff] text-[#00355f] hover:bg-[#00355f] hover:text-white text-center text-xs font-bold transition-colors cursor-pointer"
              >
                Browse Power Ride
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 3: WOOCOMMERCE SPECIAL COMBOS & BEST SELLERS */}
      <section className="py-14 sm:py-16 bg-[#eff4ff] border-y border-slate-200/80" id="shop-catalog">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-[#006e2d] uppercase tracking-wider font-headline">
                  Fast-Moving Inventory
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-headline font-bold text-[#0A2540] mt-1">
                Special Combos &amp; Best Sellers
              </h2>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center flex-wrap gap-2">
              <button
                onClick={() => setActiveCatalogTab('all')}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  activeCatalogTab === 'all'
                    ? 'bg-[#00355f] text-white shadow-xs'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                All Best Sellers
              </button>

              <button
                onClick={() => setActiveCatalogTab('homecare')}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  activeCatalogTab === 'homecare'
                    ? 'bg-[#00355f] text-white shadow-xs'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                Home Care Bundles
              </button>

              <button
                onClick={() => setActiveCatalogTab('institutional')}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  activeCatalogTab === 'institutional'
                    ? 'bg-[#00355f] text-white shadow-xs'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                Institutional Packs (5L / 50L)
              </button>
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredBestSellers.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl overflow-hidden shadow-xs hover:shadow-lg transition-all flex flex-col justify-between group border border-slate-200/80"
              >
                <div className="relative p-4 pb-0">
                  {/* Badge */}
                  {product.freebie && (
                    <div className="absolute top-6 left-6 z-10 flex flex-col gap-1">
                      <span className="bg-amber-400 text-slate-950 px-2.5 py-0.5 rounded-md text-[10px] font-bold shadow-xs">
                        FREE Scrub &amp; Sponge
                      </span>
                      <span className="bg-[#006e2d] text-white px-2 py-0.5 rounded text-[10px] font-bold w-fit">
                        Save 17%
                      </span>
                    </div>
                  )}

                  <div 
                    onClick={() => handleProductClick(product)}
                    className="w-full aspect-square rounded-xl overflow-hidden bg-[#eff4ff] cursor-pointer flex items-center justify-center p-2"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>

                <div className="p-5 flex flex-col flex-1 justify-between">
                  <div>
                    <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                      <span className="text-[11px] font-bold text-amber-700 uppercase tracking-wide">
                        {product.category}
                      </span>
                      <span className="flex items-center text-amber-500 gap-1 font-semibold text-xs">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span>{product.rating} ({product.reviewCount})</span>
                      </span>
                    </div>

                    <h3 
                      onClick={() => handleProductClick(product)}
                      className="font-headline font-bold text-sm text-[#0A2540] leading-snug cursor-pointer hover:text-[#00355f] transition-colors line-clamp-2"
                    >
                      {product.name}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                      {product.shortDescription}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100">
                    <div className="flex items-baseline gap-2 mb-3">
                      <span className="font-headline font-bold text-base text-[#0A2540]">
                        ₹{product.price}
                      </span>
                      <span className="text-xs text-slate-400 line-through">
                        ₹{product.regularPrice}
                      </span>
                      <span className="text-[11px] font-bold text-[#006e2d]">
                        In Stock (Chennai)
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => addToCart(product, 1)}
                        className="flex-1 py-2.5 px-3 rounded-lg bg-[#006e2d] hover:bg-[#14532D] text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-xs cursor-pointer"
                      >
                        <ShoppingCart className="w-3.5 h-3.5" />
                        <span>Add to Cart</span>
                      </button>

                      <button
                        onClick={() => openQuickView(product)}
                        className="p-2.5 rounded-lg bg-[#eff4ff] hover:bg-[#dce9ff] text-[#0A2540] transition-colors cursor-pointer"
                        title="Quick View"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION: OUR PRODUCT CATEGORIES (Matching flyer structure) */}
      <section className="py-14 sm:py-16 bg-white border-b border-slate-200/80" id="product-categories">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="px-3 py-1 rounded-full bg-[#EBF3FA] text-[#00355f] text-xs font-bold uppercase tracking-wider font-headline">
              Product Divisions
            </span>
            <h2 className="text-2xl sm:text-4xl font-headline font-black text-[#0A2540] mt-3">
              Our Product Categories
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2">
              Comprehensive manufacturing and wholesale supply spanning institutional hygiene, educational stationery, sports gear, and certified safety equipment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Category 1: CLEANING PRODUCTS */}
            <div className="bg-[#f8f9ff] rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-lg transition-all flex flex-col justify-between group">
              <div>
                <div className="h-44 bg-slate-100 relative overflow-hidden">
                  <img 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuD2P_UibsV3ZhGXsAcsB37uEUVhwZmAtw6X64bTHyJTSv3vcte8d4mVnOuk70dX00JyWWAH3xRK-SSxKFzwIJ7OWdRNANmEQIuxFe9Hr53fjTLFl8ScBj75f_DyfvEfNamWMMr5jMT6qixQytqZkjYVUJAXwYcG45CDLaw41nw1ZVp3Fr2pJ9GwHSrUcu65KuIU63c9yNnNTZ1Umyuu4OZCQlC_vuQ5R2ib9LCHsZ-VSRIwh5Byz52anQ" 
                    alt="Cleaning Products" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A2540]/80 via-transparent to-transparent flex items-end p-4">
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-[#006e2d] text-white px-2 py-0.5 rounded">
                      Manufactured In Chennai
                    </span>
                  </div>
                </div>

                <div className="p-5">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-6 h-6 rounded-full bg-[#00355f] text-white text-xs font-bold flex items-center justify-center">1</span>
                    <h3 className="font-headline font-black text-lg text-[#0A2540]">CLEANING PRODUCTS</h3>
                  </div>
                  <p className="text-xs font-bold text-[#006e2d] italic mb-3">"Clean Homes. Healthy Lives."</p>
                  
                  <div className="space-y-1.5 text-xs text-slate-600 mb-4">
                    <p className="font-semibold text-slate-800">Key Range:</p>
                    <div className="flex flex-wrap gap-1.5">
                      {['Detergents', 'Dishwash Gels', 'Floor Cleaners', 'Toilet Cleaners', 'Glass Cleaners', 'Hand Wash', 'Sanitizers', '50L Drums'].map((item, i) => (
                        <span key={i} className="bg-white border border-slate-200 text-slate-700 px-2 py-0.5 rounded text-[11px]">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0">
                <button
                  onClick={() => {
                    setCurrentRoute('shop');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="w-full py-2.5 rounded-xl bg-[#00355f] hover:bg-[#0A2540] text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>Browse Cleaning Products</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Category 2: STATIONERY PRODUCTS */}
            <div className="bg-[#f8f9ff] rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-lg transition-all flex flex-col justify-between group">
              <div>
                <div className="h-44 bg-slate-100 relative overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80" 
                    alt="Stationery Products" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A2540]/80 via-transparent to-transparent flex items-end p-4">
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-500 text-slate-950 px-2 py-0.5 rounded">
                      School &amp; Office Wholesale
                    </span>
                  </div>
                </div>

                <div className="p-5">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-6 h-6 rounded-full bg-amber-600 text-white text-xs font-bold flex items-center justify-center">2</span>
                    <h3 className="font-headline font-black text-lg text-[#0A2540]">STATIONERY PRODUCTS</h3>
                  </div>
                  <p className="text-xs font-bold text-amber-700 italic mb-3">"Learn Today. Build Tomorrow."</p>
                  
                  <div className="space-y-1.5 text-xs text-slate-600 mb-4">
                    <p className="font-semibold text-slate-800">Key Range:</p>
                    <div className="flex flex-wrap gap-1.5">
                      {['Notebooks', 'Registers', 'Exam Pads', 'Pens & Markers', 'Office Files', 'Copier Paper', 'Whiteboards'].map((item, i) => (
                        <span key={i} className="bg-white border border-slate-200 text-slate-700 px-2 py-0.5 rounded text-[11px]">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0">
                <button
                  onClick={() => {
                    setCurrentRoute('shop');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="w-full py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>Browse Stationery Products</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Category 3: SPORTS PRODUCTS */}
            <div className="bg-[#f8f9ff] rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-lg transition-all flex flex-col justify-between group">
              <div>
                <div className="h-44 bg-slate-100 relative overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=800&q=80" 
                    alt="Sports Products" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A2540]/80 via-transparent to-transparent flex items-end p-4">
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-600 text-white px-2 py-0.5 rounded">
                      Tournament Regulation
                    </span>
                  </div>
                </div>

                <div className="p-5">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-6 h-6 rounded-full bg-emerald-700 text-white text-xs font-bold flex items-center justify-center">3</span>
                    <h3 className="font-headline font-black text-lg text-[#0A2540]">SPORTS PRODUCTS</h3>
                  </div>
                  <p className="text-xs font-bold text-emerald-800 italic mb-3">"Play Healthy. Grow Stronger."</p>
                  
                  <div className="space-y-1.5 text-xs text-slate-600 mb-4">
                    <p className="font-semibold text-slate-800">Key Range:</p>
                    <div className="flex flex-wrap gap-1.5">
                      {['Footballs', 'Basketballs', 'Volleyballs', 'Badminton Sets', 'Training Cones', 'Dumbbells', 'Sports Kits'].map((item, i) => (
                        <span key={i} className="bg-white border border-slate-200 text-slate-700 px-2 py-0.5 rounded text-[11px]">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0">
                <button
                  onClick={() => {
                    setCurrentRoute('shop');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="w-full py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>Browse Sports Products</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Category 4: SAFETY PRODUCTS */}
            <div className="bg-[#f8f9ff] rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-lg transition-all flex flex-col justify-between group">
              <div>
                <div className="h-44 bg-slate-100 relative overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=800&q=80" 
                    alt="Safety Products" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A2540]/80 via-transparent to-transparent flex items-end p-4">
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-rose-600 text-white px-2 py-0.5 rounded">
                      ISI &amp; CE Certified
                    </span>
                  </div>
                </div>

                <div className="p-5">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-6 h-6 rounded-full bg-rose-700 text-white text-xs font-bold flex items-center justify-center">4</span>
                    <h3 className="font-headline font-black text-lg text-[#0A2540]">SAFETY PRODUCTS</h3>
                  </div>
                  <p className="text-xs font-bold text-rose-800 italic mb-3">"Safety Today. A Safer Tomorrow."</p>
                  
                  <div className="space-y-1.5 text-xs text-slate-600 mb-4">
                    <p className="font-semibold text-slate-800">Key Range:</p>
                    <div className="flex flex-wrap gap-1.5">
                      {['Fire Extinguishers', 'Safety Helmets', 'Nitrile Gloves', 'High-Vis Vests', 'First Aid Kits', 'Caution Boards'].map((item, i) => (
                        <span key={i} className="bg-white border border-slate-200 text-slate-700 px-2 py-0.5 rounded text-[11px]">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0">
                <button
                  onClick={() => {
                    setCurrentRoute('shop');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="w-full py-2.5 rounded-xl bg-rose-700 hover:bg-rose-800 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>Browse Safety Products</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 4: B2B & INSTITUTIONAL SERVICES (4 PILLARS & WHY CHOOSE US) */}
      <section className="py-14 sm:py-16 bg-[#f8f9ff]" id="facility-services">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="px-3 py-1 rounded-full bg-[#EBF3FA] text-[#00355f] text-xs font-bold uppercase tracking-wider font-headline">
              Services Ecosystem
            </span>
            <h2 className="text-2xl sm:text-3xl font-headline font-bold text-[#0A2540] mt-3">
              Our Professional Services
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2">
              Supplying high-volume cleaning chemistry alongside full-lifecycle trained housekeeping staff, mechanized maintenance, and daily verified auditing.
            </p>
          </div>

          {/* 4 Core Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
            
            {/* Service 1: Home Care Cleaning Products */}
            <div 
              onClick={() => {
                setCurrentRoute('home-care-cleaning');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="bg-white p-6 rounded-2xl shadow-xs border border-slate-200/80 flex flex-col justify-between hover:shadow-md transition-all cursor-pointer group"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#d2e4ff] text-[#00355f] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h3 className="text-base font-headline font-bold text-[#0A2540] mb-2 group-hover:text-[#00355f] transition-colors">
                  Home Care Cleaning Products
                </h3>
                <p className="text-xs text-slate-600 mb-4 leading-relaxed">
                  High-quality cleaning solutions for a cleaner and healthier home. Direct-to-consumer detergents, dishwash gels, and surface cleaners.
                </p>
              </div>
              <div className="pt-3 border-t border-slate-100 text-xs font-bold text-[#00355f] flex items-center justify-between">
                <span>View Products</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Service 2: Facility Management Services */}
            <div 
              onClick={() => {
                setCurrentRoute('facility-management');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="bg-white p-6 rounded-2xl shadow-xs border border-slate-200/80 flex flex-col justify-between hover:shadow-md transition-all cursor-pointer group"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#F0FDF4] text-[#006e2d] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                  <Building2 className="w-6 h-6" />
                </div>
                <h3 className="text-base font-headline font-bold text-[#0A2540] mb-2 group-hover:text-[#006e2d] transition-colors">
                  Facility Management Services
                </h3>
                <p className="text-xs text-slate-600 mb-4 leading-relaxed">
                  Professional housekeeping &amp; hygiene solutions for schools, colleges, corporate offices, and commercial spaces with mechanized scrubbers.
                </p>
              </div>
              <div className="pt-3 border-t border-slate-100 text-xs font-bold text-[#006e2d] flex items-center justify-between">
                <span>Explore Service &amp; SLAs</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Service 3: Manpower Support */}
            <div 
              onClick={() => {
                setCurrentRoute('manpower-support');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="bg-white p-6 rounded-2xl shadow-xs border border-slate-200/80 flex flex-col justify-between hover:shadow-md transition-all cursor-pointer group"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="text-base font-headline font-bold text-[#0A2540] mb-2 group-hover:text-amber-800 transition-colors">
                  Manpower Support
                </h3>
                <p className="text-xs text-slate-600 mb-4 leading-relaxed">
                  Trained and reliable staff for housekeeping, campus maintenance, certified supervisors, school bus attenders, and administrative marshals.
                </p>
              </div>
              <div className="pt-3 border-t border-slate-100 text-xs font-bold text-amber-800 flex items-center justify-between">
                <span>View Staffing &amp; Compliance</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Service 4: Institutional Supplies */}
            <div 
              onClick={() => {
                setCurrentRoute('institutional-supplies');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="bg-white p-6 rounded-2xl shadow-xs border border-slate-200/80 flex flex-col justify-between hover:shadow-md transition-all cursor-pointer group"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#e5eeff] text-[#00355f] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                  <Warehouse className="w-6 h-6" />
                </div>
                <h3 className="text-base font-headline font-bold text-[#0A2540] mb-2 group-hover:text-[#00355f] transition-colors">
                  Institutional &amp; Commercial Supplies
                </h3>
                <p className="text-xs text-slate-600 mb-4 leading-relaxed">
                  Wide range of bulk cleaning materials, safety products, educational stationery, sports supplies, and single-invoice wholesale procurement.
                </p>
              </div>
              <div className="pt-3 border-t border-slate-100 text-xs font-bold text-[#00355f] flex items-center justify-between">
                <span>View Institutional Catalog</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

          </div>

          {/* Why Choose Essendaar - 6 Pillar Grid */}
          <div className="bg-[#eff4ff] p-6 sm:p-10 rounded-3xl border border-slate-200">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-2">
              <div>
                <span className="text-xs font-bold text-[#006e2d] uppercase tracking-wider font-headline">
                  Enterprise Compliance
                </span>
                <h3 className="text-xl sm:text-2xl font-headline font-bold text-[#0A2540] mt-1">
                  Why Institutions Partner With Essendaar
                </h3>
              </div>
              <span className="text-xs text-slate-500">
                Serving over 120+ institutions in Greater Chennai &amp; South India perimeter
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              
              <div className="flex items-start gap-3.5 p-4 rounded-xl bg-white shadow-xs border border-slate-200/60">
                <div className="w-9 h-9 rounded-lg bg-[#006e2d]/10 flex items-center justify-center text-[#006e2d] shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-headline font-bold text-sm text-[#0A2540] block mb-1">Quality Assurance</span>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Standardized formulation tested via Tamilnadu Test House ensuring no skin irritants or acidic damage to campus stone flooring.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-4 rounded-xl bg-white shadow-xs border border-slate-200/60">
                <div className="w-9 h-9 rounded-lg bg-[#00355f]/10 flex items-center justify-center text-[#00355f] shrink-0">
                  <FlaskConical className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-headline font-bold text-sm text-[#0A2540] block mb-1">Safety &amp; Hygiene Standards</span>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Strict protocol training on bio-waste containment, color-coded microfiber mopping, and student-safe chemical dilution ratios.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-4 rounded-xl bg-white shadow-xs border border-slate-200/60">
                <div className="w-9 h-9 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-700 shrink-0">
                  <Briefcase className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-headline font-bold text-sm text-[#0A2540] block mb-1">Experienced Field Team</span>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Supervisors with minimum 5+ years operational background in hospital infection control and institutional campus readiness.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-4 rounded-xl bg-white shadow-xs border border-slate-200/60">
                <div className="w-9 h-9 rounded-lg bg-sky-600/10 flex items-center justify-center text-sky-700 shrink-0">
                  <FileCheck className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-headline font-bold text-sm text-[#0A2540] block mb-1">Digital Work Monitoring</span>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Daily shift attendance logs, checklist verification via mobile, and monthly cleanliness audits submitted to principal/admin offices.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-4 rounded-xl bg-white shadow-xs border border-slate-200/60">
                <div className="w-9 h-9 rounded-lg bg-[#006e2d]/10 flex items-center justify-center text-[#006e2d] shrink-0">
                  <span className="font-bold text-xs">₹</span>
                </div>
                <div>
                  <span className="font-headline font-bold text-sm text-[#0A2540] block mb-1">Cost-Effective Solutions</span>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Direct manufacturer packaging (25L / 50L drums) reduces overall facility cleaning budget by 20% to 35% annually.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-4 rounded-xl bg-white shadow-xs border border-slate-200/60">
                <div className="w-9 h-9 rounded-lg bg-[#00355f]/10 flex items-center justify-center text-[#00355f] shrink-0">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-headline font-bold text-sm text-[#0A2540] block mb-1">One-Stop Solution</span>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Consolidate manpower payroll, chemical inventory, mops, dispenser machines, and seasonal supplies under a single GST invoice.
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* SECTION 5: CLIENT SEGMENTS & ISO LAB CERTIFICATION */}
      <section className="py-14 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          
          <div className="text-center mb-8">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest font-headline">
              Trusted Ecosystem
            </span>
            <h2 className="text-2xl font-headline font-bold text-[#0A2540] mt-1">
              Sectors We Empower Across South India
            </h2>
          </div>

          {/* 7 Segment Badges Mosaic */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3 mb-12">
            {[
              { icon: '🏠', label: 'Households' },
              { icon: '🏪', label: 'Retail Shops' },
              { icon: '🚚', label: 'Distributors' },
              { icon: '🏨', label: 'Hotels' },
              { icon: '🍽️', label: 'Restaurants' },
              { icon: '🏢', label: 'Offices' },
              { icon: '🏫', label: 'Schools & Colleges' },
            ].map((seg, idx) => (
              <div 
                key={idx} 
                className="flex flex-col items-center justify-center p-3.5 rounded-xl bg-[#eff4ff] hover:bg-[#e5eeff] transition-colors text-center border border-slate-200/60"
              >
                <span className="text-2xl mb-1.5">{seg.icon}</span>
                <span className="text-xs font-semibold text-[#0A2540]">{seg.label}</span>
              </div>
            ))}
          </div>

          {/* Certification Spotlight Panel */}
          <div className="bg-gradient-to-r from-[#0A2540] via-[#00355f] to-[#004e78] rounded-3xl p-6 sm:p-10 text-white shadow-xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              <div className="lg:col-span-8 flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-secondary-fixed" />
                  <span className="text-xs font-bold text-secondary-fixed uppercase tracking-wider font-headline">
                    Independent Laboratory Validation
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-headline font-bold text-white leading-tight">
                  ISO 9001:2015 &amp; Tamilnadu Test House Certified
                </h3>

                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                  Every batch formulated at our Mangadu, Chennai facility undergoes rigorous analytical testing for microbial eradication efficacy, heavy-metal safety thresholds, neutral skin pH balances, and optimal chemical shelf stability. Certified compliant for sensitive educational and food prep environments.
                </p>

                <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-slate-200">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-secondary-fixed" />
                    <span>Government Certified Lab Tested</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-secondary-fixed" />
                    <span>Formal Test Reports Provided for Audits</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-secondary-fixed" />
                    <span>GST Registered B2B Invoicing</span>
                  </div>
                </div>
              </div>

              {/* SVG Lab Certificate Seal */}
              <div className="lg:col-span-4 flex justify-center">
                <div className="w-48 h-48 sm:w-52 sm:h-52 rounded-full bg-white/10 backdrop-blur-md p-4 flex items-center justify-center relative shadow-inner border border-white/20">
                  <svg className="w-full h-full text-secondary-fixed" viewBox="0 0 200 200">
                    <circle cx="100" cy="100" fill="none" r="90" stroke="currentColor" strokeDasharray="4 4" strokeWidth="2" />
                    <circle cx="100" cy="100" fill="none" r="78" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M 30 100 A 70 70 0 0 1 170 100" fill="none" id="curve" stroke="none" />
                    <text fill="currentColor" fontSize="9" fontWeight="bold" letterSpacing="1.5">
                      <textPath href="#curve" startOffset="50%" textAnchor="middle">
                        TAMILNADU TEST HOUSE CERTIFIED
                      </textPath>
                    </text>
                    <circle cx="100" cy="100" fill="currentColor" fillOpacity="0.2" r="44" />
                    <path d="M100 70 L107 84 L123 87 L111 99 L114 115 L100 108 L86 115 L89 99 L77 87 L93 84 Z" fill="#7ffc97" />
                  </svg>
                  <div className="absolute bottom-5 text-center">
                    <span className="text-[10px] uppercase tracking-widest text-white block font-bold font-headline">
                      ISO 9001:2015
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* SECTION 6: INSTITUTIONAL QUOTE & QUICK RFP STRIP */}
      <section className="py-14 sm:py-16 bg-[#eff4ff] border-t border-slate-200/80" id="quote-request">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-slate-200">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left Info Column */}
              <div className="lg:col-span-5 flex flex-col gap-4">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 w-fit text-xs font-bold font-headline">
                  <span>⚡ Fast Turnaround Rate Cards</span>
                </div>

                <h3 className="text-2xl font-headline font-bold text-[#0A2540] leading-tight">
                  Request an Institutional Quote or Contract Assessment
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Managing a school campus, commercial tower, or hospital? Get custom institutional pricing, site inspection scheduling, or bulk chemical drum rate sheets.
                </p>

                <div className="flex flex-col gap-2.5 pt-1">
                  <a
                    href="tel:+919787979757"
                    className="flex items-center gap-3 p-3 rounded-xl bg-[#eff4ff] hover:bg-[#dce9ff] transition-colors"
                  >
                    <div className="w-9 h-9 rounded-lg bg-[#006e2d] text-white flex items-center justify-center shrink-0">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 uppercase block font-semibold">Direct Hotline (8:30 AM - 8:00 PM)</span>
                      <span className="text-sm font-headline font-bold text-[#0A2540]">+91 97879 79757</span>
                    </div>
                  </a>

                  <a
                    href="mailto:essendaargroup@gmail.com"
                    className="flex items-center gap-3 p-3 rounded-xl bg-[#eff4ff] hover:bg-[#dce9ff] transition-colors"
                  >
                    <div className="w-9 h-9 rounded-lg bg-[#00355f] text-white flex items-center justify-center shrink-0">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 uppercase block font-semibold">Institutional RFP Desk</span>
                      <span className="text-sm font-headline font-bold text-[#0A2540]">essendaargroup@gmail.com</span>
                    </div>
                  </a>
                </div>
              </div>

              {/* Right Form Column */}
              <div className="lg:col-span-7 bg-[#eff4ff] p-5 sm:p-7 rounded-2xl border border-slate-200">
                {quoteSubmitted ? (
                  <div className="p-6 bg-emerald-50 border-2 border-emerald-600 text-emerald-900 rounded-xl text-center space-y-2 animate-in fade-in">
                    <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                    <h4 className="font-headline font-bold text-base">Thank you for reaching out!</h4>
                    <p className="text-xs text-emerald-800">
                      Our Institutional Procurement Specialist will contact you within 2 business hours with rate cards and sample options.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleQuoteSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
                    <div className="flex flex-col gap-1">
                      <label className="font-semibold text-slate-800">Contact Person Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Ramesh Kumar"
                        value={quoteData.name}
                        onChange={(e) => setQuoteData({ ...quoteData, name: e.target.value })}
                        className="h-10 px-3 rounded-lg bg-white border border-slate-300 focus:outline-none focus:border-[#00355f]"
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="font-semibold text-slate-800">Phone Number (WhatsApp) *</label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={quoteData.phone}
                        onChange={(e) => setQuoteData({ ...quoteData, phone: e.target.value })}
                        className="h-10 px-3 rounded-lg bg-white border border-slate-300 focus:outline-none focus:border-[#00355f]"
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="font-semibold text-slate-800">Organization / Campus Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Chennai Public School"
                        value={quoteData.organization}
                        onChange={(e) => setQuoteData({ ...quoteData, organization: e.target.value })}
                        className="h-10 px-3 rounded-lg bg-white border border-slate-300 focus:outline-none focus:border-[#00355f]"
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="font-semibold text-slate-800">Primary Requirement *</label>
                      <select
                        value={quoteData.requirement}
                        onChange={(e) => setQuoteData({ ...quoteData, requirement: e.target.value })}
                        className="h-10 px-3 rounded-lg bg-white border border-slate-300 focus:outline-none focus:border-[#00355f] cursor-pointer"
                      >
                        <option>Bulk Cleaning Chemicals (50L Drums)</option>
                        <option>Turnkey Facility Management Contract</option>
                        <option>Trained Housekeeping &amp; Staffing</option>
                        <option>School Supplies &amp; Sports Equipment</option>
                        <option>Retail Stockist / Distributor Inquiry</option>
                      </select>
                    </div>

                    <div className="sm:col-span-2 flex flex-col gap-1">
                      <label className="font-semibold text-slate-800">Site Location / Specific Notes</label>
                      <textarea
                        rows={2}
                        placeholder="Tell us about your campus square footage, monthly volume, or address in Tamil Nadu..."
                        value={quoteData.notes}
                        onChange={(e) => setQuoteData({ ...quoteData, notes: e.target.value })}
                        className="p-2.5 rounded-lg bg-white border border-slate-300 focus:outline-none focus:border-[#00355f] resize-none"
                      />
                    </div>

                    <div className="sm:col-span-2 pt-1">
                      <button
                        type="submit"
                        className="w-full h-11 rounded-lg bg-[#0A2540] hover:bg-[#00355f] text-white font-bold transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                      >
                        <Send className="w-4 h-4" />
                        <span>Submit Institutional Quote Request</span>
                      </button>
                      <p className="text-[11px] text-slate-500 text-center mt-2">
                        ISO Compliant Non-Disclosure Guaranteed. GST Invoices issued for all corporate orders.
                      </p>
                    </div>
                  </form>
                )}
              </div>

            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
