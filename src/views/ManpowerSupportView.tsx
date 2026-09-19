import React from 'react';
import { useStore } from '../context/StoreContext';
import { 
  Users, 
  ShieldCheck, 
  Bus, 
  HeartHandshake, 
  GraduationCap, 
  CheckCircle2, 
  PhoneCall, 
  ArrowRight,
  UserCheck
} from 'lucide-react';

export const ManpowerSupportView: React.FC = () => {
  const { setCurrentRoute, products, addToCart, setSelectedProduct } = useStore();

  const categories = [
    {
      title: 'School Bus Attenders & Student Marshals',
      description: 'Patient, female and male child-safety trained bus attenders ensuring safe student pickup, boarding verification, and emergency protocol handling.',
      icon: Bus,
      tag: 'Child Safety Certified'
    },
    {
      title: 'Certified Hospital Housekeeping Crews',
      description: 'Infection-control trained staff handling biomedical waste segregation, bio-hazard decontamination, and non-intrusive floor sanitation.',
      icon: HeartHandshake,
      tag: 'Clinical Protocols'
    },
    {
      title: 'Pantry & Corporate Dining Attendants',
      description: 'Polite, groomed attendants for meeting setups, executive beverage preparation, kitchen hygiene, and cutlery dish sanitisation.',
      icon: Users,
      tag: 'Hospitality Trained'
    },
    {
      title: 'Mechanised Floor Cleaning Specialists',
      description: 'Operative technicians trained in single-disc scrubbers, high-pressure washers, ride-on sweepers, and industrial carpet extractors.',
      icon: GraduationCap,
      tag: 'Machine Certified'
    }
  ];

  return (
    <div className="w-full bg-[#f8f9ff] min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-xs text-slate-500 mb-6">
          <button onClick={() => setCurrentRoute('home')} className="hover:text-[#00355f] cursor-pointer">Home</button>
          <span>/</span>
          <span className="text-[#00355f] font-bold">Manpower Support</span>
        </div>

        {/* Hero Section */}
        <div className="bg-[#0A2540] rounded-3xl text-white p-8 sm:p-12 mb-12 relative overflow-hidden shadow-md">
          <div className="max-w-3xl relative z-10">
            <div className="inline-flex items-center space-x-2 bg-[#006e2d] text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
              <UserCheck className="w-4 h-4" />
              <span>100% Police Verified &amp; Insured Personnel</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black font-headline tracking-tight leading-tight mb-4">
              Institutional Manpower &amp; Support Staffing
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
              Reliable, disciplined, and police-verified support personnel for educational institutions, corporate offices, healthcare facilities, and manufacturing complexes in Chennai.
            </p>
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={() => setCurrentRoute('contact')}
                className="px-6 py-3 bg-[#006e2d] hover:bg-[#14532D] text-white rounded-xl font-bold text-sm flex items-center gap-2 transition-all shadow-md cursor-pointer"
              >
                <span>Request Staffing Proposal</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <a 
                href="tel:+919787979757"
                className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-bold text-sm flex items-center gap-2 border border-white/20 transition-all"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Call Staffing Desk: +91 97879 79757</span>
              </a>
            </div>
          </div>
        </div>

        {/* Roles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {categories.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-[#eff4ff] text-[#00355f] rounded-xl">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-wider bg-[#006e2d]/10 text-[#006e2d] px-2.5 py-1 rounded-full">
                    {item.tag}
                  </span>
                </div>
                <h3 className="text-lg font-bold font-headline text-[#0A2540] mb-2">{item.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">{item.description}</p>
                <button 
                  onClick={() => setCurrentRoute('contact')}
                  className="text-xs font-bold text-[#00355f] hover:text-[#006e2d] flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Inquire for Your Facility</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Relevant Manpower & Safety Gear Products */}
        <div className="mb-16">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-4">
            <div>
              <span className="text-xs font-bold text-[#006e2d] uppercase tracking-wider font-headline">
                Staff Protection &amp; Equipment
              </span>
              <h2 className="text-2xl sm:text-3xl font-black font-headline text-[#0A2540] mt-1">
                Relevant Manpower Gear &amp; Safety Products
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Essential uniforms, safety vests, chemical gloves, and first aid kits equipped by our deployed workforce.
              </p>
            </div>
            <button 
              onClick={() => setCurrentRoute('shop')}
              className="text-xs font-bold text-[#00355f] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>View Safety Catalog</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.filter(p => p.parentCategory === 'Safety Products' || p.category === 'Personal Protection' || p.category === 'Industrial Safety' || p.category === 'Accessories').slice(0, 4).map((item) => (
              <div key={item.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between group">
                <div className="p-4 pb-0 relative">
                  <span className="absolute top-6 left-6 z-10 bg-[#006e2d] text-white text-[10px] font-bold px-2 py-0.5 rounded">
                    {item.badge || 'SAFETY GEAR'}
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
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#00355f]">{item.brand}</span>
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
                      className="px-3 py-1.5 bg-[#006e2d] hover:bg-[#14532D] text-white rounded-lg text-xs font-bold transition-colors cursor-pointer"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Verification & Compliance */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xs mb-12">
          <h3 className="text-xl font-black font-headline text-[#0A2540] mb-4">Full Statutory &amp; Labor Law Compliance</h3>
          <p className="text-xs sm:text-sm text-slate-600 mb-6">
            We handle 100% of the statutory obligations including EPF, ESIC, professional tax, uniform provision, and workplace safety insurance.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-bold text-slate-800">
            <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl">
              <CheckCircle2 className="w-4 h-4 text-[#006e2d]" />
              <span>Direct EPF &amp; ESIC Enrollment</span>
            </div>
            <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl">
              <CheckCircle2 className="w-4 h-4 text-[#006e2d]" />
              <span>Full Background Police Verification</span>
            </div>
            <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl">
              <CheckCircle2 className="w-4 h-4 text-[#006e2d]" />
              <span>Monthly Digital Biometric Attendance</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
