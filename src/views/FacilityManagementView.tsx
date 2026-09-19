import React from 'react';
import { useStore } from '../context/StoreContext';
import { 
  Building2, 
  ShieldCheck, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  Users, 
  ClipboardCheck, 
  FileText, 
  ArrowRight,
  PhoneCall,
  CalendarCheck
} from 'lucide-react';

export const FacilityManagementView: React.FC = () => {
  const { setCurrentRoute, products, addToCart, setSelectedProduct } = useStore();

  const services = [
    {
      title: 'Turnkey Educational Campus Housekeeping',
      description: 'Daily sanitisation for schools, colleges, and university auditoriums. Scheduled off-hours mechanised floor scrubbers, bio-wash restrooms, and waste segregation.',
      metrics: '35+ Chennai Schools Managed',
      badge: 'Education Specialized'
    },
    {
      title: 'Healthcare & Hospital Clinical Hygiene',
      description: 'Strict ICU, OT, and ward infection-control regimens complying with NABH hygiene protocols using hospital-grade POWER RIDE formulations.',
      metrics: 'NABH Protocol Compliance',
      badge: 'Clinical Grade'
    },
    {
      title: 'Corporate IT & Manufacturing Plants',
      description: 'End-to-end multi-shift facility maintenance, pantry services, high-reach glass cleaning, and industrial epoxy floor buffing.',
      metrics: '24/7 Shift Coverage',
      badge: 'Industrial SLA'
    },
    {
      title: 'Residential Gated Communities & Clubhouses',
      description: 'Comprehensive common area housekeeping, swimming pool chlorination checks, solid waste management, and STP area hygiene.',
      metrics: '1,500+ Units Maintained',
      badge: 'Residential'
    }
  ];

  return (
    <div className="w-full bg-[#f8f9ff] min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-xs text-slate-500 mb-6">
          <button onClick={() => setCurrentRoute('home')} className="hover:text-[#00355f] cursor-pointer">Home</button>
          <span>/</span>
          <span className="text-[#00355f] font-bold">Facility Management</span>
        </div>

        {/* Hero Section */}
        <div className="bg-[#0A2540] rounded-3xl text-white p-8 sm:p-12 mb-12 relative overflow-hidden shadow-md">
          <div className="max-w-3xl relative z-10">
            <div className="inline-flex items-center space-x-2 bg-[#006e2d] text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
              <ShieldCheck className="w-4 h-4" />
              <span>ISO 9001:2015 Certified Operations</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black font-headline tracking-tight leading-tight mb-4">
              Integrated Campus &amp; Facility Care Solutions
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
              Essendaar combines direct factory-manufactured cleaning formulations with professionally trained, police-verified facility crews across Chennai and Tamil Nadu.
            </p>
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={() => setCurrentRoute('contact')}
                className="px-6 py-3 bg-[#006e2d] hover:bg-[#14532D] text-white rounded-xl font-bold text-sm flex items-center gap-2 transition-all shadow-md cursor-pointer"
              >
                <span>Request Facility RFP / Site Audit</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <a 
                href="tel:+919787979757"
                className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-bold text-sm flex items-center gap-2 border border-white/20 transition-all"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Call Facility Desk: +91 97879 79757</span>
              </a>
            </div>
          </div>
        </div>

        {/* Services Grid */}
        <div className="mb-16">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-black font-headline text-[#0A2540] mb-2">
              Tailored Turnkey Management Services
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Contract facility services backed by transparent monthly digital compliance logs, on-site supervisors, and direct factory chemical inventory replenishment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((item, idx) => (
              <div key={idx} className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <span className="text-[11px] font-bold uppercase tracking-wider bg-[#eff4ff] text-[#00355f] px-2.5 py-1 rounded-full">
                    {item.badge}
                  </span>
                  <span className="text-xs font-bold text-[#006e2d] flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    {item.metrics}
                  </span>
                </div>
                <h3 className="text-lg font-bold font-headline text-[#0A2540] mb-2">{item.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">{item.description}</p>
                <button 
                  onClick={() => setCurrentRoute('contact')}
                  className="text-xs font-bold text-[#00355f] hover:text-[#006e2d] flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Request Custom Quotation</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Relevant Facility Products */}
        <div className="mb-16">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-4">
            <div>
              <span className="text-xs font-bold text-[#006e2d] uppercase tracking-wider font-headline">
                Commercial Chemicals &amp; Hardware
              </span>
              <h2 className="text-2xl sm:text-3xl font-black font-headline text-[#0A2540] mt-1">
                Relevant Facility Management Products
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Chemicals and equipment utilized by our housekeeping teams, also available for direct campus procurement.
              </p>
            </div>
            <button 
              onClick={() => setCurrentRoute('shop')}
              className="text-xs font-bold text-[#00355f] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>Explore All Facility Supplies</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.filter(p => p.category === 'Surface Care' || p.category === 'Sanitation' || p.category === 'Institutional Bulk' || p.category === 'Accessories').slice(0, 4).map((item) => (
              <div key={item.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between group">
                <div className="p-4 pb-0 relative">
                  <span className="absolute top-6 left-6 z-10 bg-[#0A2540] text-white text-[10px] font-bold px-2 py-0.5 rounded">
                    {item.packSize}
                  </span>
                  <div 
                    onClick={() => {
                      setSelectedProduct(item);
                      setCurrentRoute('product');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="w-full aspect-square bg-[#eff4ff] rounded-xl overflow-hidden cursor-pointer flex items-center justify-center p-3"
                  >
                    <img src={item.image} alt={item.name} className="w-full h-full object-contain group-hover:scale-105 transition-transform" />
                  </div>
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#006e2d]">{item.brand}</span>
                    <h3 
                      onClick={() => {
                        setSelectedProduct(item);
                        setCurrentRoute('product');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="text-sm font-bold font-headline text-slate-900 mt-1 cursor-pointer hover:text-[#00355f] line-clamp-2"
                    >
                      {item.name}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2">{item.shortDescription}</p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <span className="text-base font-black text-[#00355f]">₹{item.price}</span>
                      {item.regularPrice > item.price && (
                        <span className="text-xs text-slate-400 line-through ml-1.5">₹{item.regularPrice}</span>
                      )}
                    </div>
                    <button 
                      onClick={() => addToCart(item, 1)}
                      className="px-3 py-1.5 bg-[#00355f] hover:bg-[#0A2540] text-white rounded-lg text-xs font-bold transition-colors cursor-pointer"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SLAs & Quality Benchmarks */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xs mb-12">
          <h3 className="text-xl font-black font-headline text-[#0A2540] mb-6">Our SLA &amp; Operational Guarantee</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-xs">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
              <ClipboardCheck className="w-6 h-6 text-[#00355f] mb-2" />
              <h4 className="font-bold text-slate-900 mb-1">Daily Digital Checklists</h4>
              <p className="text-slate-600 leading-relaxed">Timestamped mobile checklist logs shared with campus administrators daily.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
              <Users className="w-6 h-6 text-[#00355f] mb-2" />
              <h4 className="font-bold text-slate-900 mb-1">100% Background Verified</h4>
              <p className="text-slate-600 leading-relaxed">Aadhaar verified, police checked, and uniformed staff with photo IDs.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
              <Clock className="w-6 h-6 text-[#00355f] mb-2" />
              <h4 className="font-bold text-slate-900 mb-1">2-Hour Emergency Buffer</h4>
              <p className="text-slate-600 leading-relaxed">Dedicated standby relievers dispatched immediately if any scheduled staff is on leave.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
              <Sparkles className="w-6 h-6 text-[#00355f] mb-2" />
              <h4 className="font-bold text-slate-900 mb-1">Direct Factory Supplies</h4>
              <p className="text-slate-600 leading-relaxed">Zero risk of chemical stockouts with continuous replenishment directly from our factory.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
