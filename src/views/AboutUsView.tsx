import React from 'react';
import { useStore } from '../context/StoreContext';
import sivaKrishnanPortrait from '../assets/images/siva-krishnan.jpg';

import { 
  ShieldCheck, 
  Award, 
  FlaskConical, 
  Sparkles, 
  Building2, 
  Users, 
  PackageCheck, 
  CheckCircle2, 
  Clock, 
  DollarSign, 
  Layers, 
  PhoneCall, 
  Mail, 
  Globe, 
  MapPin, 
  Gift, 
  ArrowRight, 
  Target, 
  Compass, 
  HeartHandshake,
  Bus,
  School,
  Hotel,
  Store,
  Briefcase,
  GraduationCap,
  Quote,
  MessageCircle,
  Check
} from 'lucide-react';

export const AboutUsView: React.FC = () => {
  const { setCurrentRoute } = useStore();

  const brandProducts = [
    {
      name: 'BOZZ',
      category: 'Laundry Care',
      tagline: 'The Power of Clean & Comfort.',
      items: ['Liquid Detergent', 'Fabric Conditioner'],
      color: 'from-blue-600 to-indigo-800',
      badge: 'Fabric Care'
    },
    {
      name: 'MORNING SHINE',
      category: 'Kitchen Care',
      tagline: 'Start Your Day with a Shine!',
      items: ['Dishwash Liquid', 'Dishwash Bar'],
      specialOffers: [
        '500 ml Dishwash Liquid + Free Scrub Pad worth ₹15',
        '1 Litre Dishwash Liquid + Free Scrub Pad & Sponge worth ₹25'
      ],
      color: 'from-amber-500 to-orange-600',
      badge: 'Grease-Cut Formula'
    },
    {
      name: 'SKY FRESH',
      category: 'Surface & Vehicle Care',
      tagline: 'Clean. Shine. Refresh.',
      items: ['Floor Cleaner', 'Glass Cleaner', 'Car Care Shampoo'],
      color: 'from-sky-500 to-cyan-700',
      badge: 'Multi-Surface'
    },
    {
      name: 'POWER RIDE',
      category: 'Toilet Care',
      tagline: 'Powerful Cleaning. Fresh Results.',
      items: ['Toilet Cleaner', 'Descaler Formulation'],
      color: 'from-red-600 to-rose-800',
      badge: 'Heavy-Duty 99.9%'
    }
  ];

  const whyChooseUs = [
    {
      title: 'Quality Assurance',
      desc: 'Consistent product quality and reliable service delivery tested to high active-matter standards.',
      icon: ShieldCheck
    },
    {
      title: 'Safety & Hygiene',
      desc: 'Products and services supporting clean, hygienic, and well-maintained living and working spaces.',
      icon: Sparkles
    },
    {
      title: 'Experienced Team',
      desc: 'Practical commercial and facility-management experience customized directly to customer requirements.',
      icon: Users
    },
    {
      title: 'Timely Support',
      desc: 'Responsive communication, regular on-site follow-ups, and guaranteed timely delivery.',
      icon: Clock
    },
    {
      title: 'Work Monitoring',
      desc: 'Work schedules, attendance records, digital inspection reports, and performance tracking.',
      icon: CheckCircle2
    },
    {
      title: 'Cost-Effective Solutions',
      desc: 'Direct factory-manufactured supplies offering practical solutions at competitive wholesale prices.',
      icon: DollarSign
    },
    {
      title: 'One-Stop Solution',
      desc: 'Cleaning products, housekeeping materials, manpower, and facility management under one roof.',
      icon: Layers
    }
  ];

  const customerSegments = [
    { name: 'Households', icon: Sparkles },
    { name: 'Retail Shops', icon: Store },
    { name: 'Distributors', icon: PackageCheck },
    { name: 'Hotels', icon: Hotel },
    { name: 'Restaurants', icon: Store },
    { name: 'Offices & IT Parks', icon: Briefcase },
    { name: 'Schools & Colleges', icon: School },
    { name: 'Institutions', icon: Building2 },
    { name: 'Commercial Complexes', icon: Building2 },
    { name: 'Facility Management Projects', icon: Layers }
  ];

  return (
    <div className="w-full bg-[#f8f9ff] min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-xs text-slate-500 mb-6">
          <button onClick={() => setCurrentRoute('home')} className="hover:text-[#00355f] cursor-pointer">Home</button>
          <span>/</span>
          <span className="text-[#00355f] font-bold">About Us</span>
        </div>

        {/* Hero Section with Founder/Executive Card at Top-Right */}
        <div className="bg-[#0A2540] rounded-3xl text-white p-6 sm:p-10 lg:p-12 mb-12 relative overflow-hidden shadow-xl border border-slate-700/60">
          
          {/* Subtle decorative background ambient glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#00355f]/40 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center relative z-10">
            
            {/* Left Column (Company Overview & Direct Contacts) */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <span className="bg-[#006e2d] text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-xs">
                    <Award className="w-3.5 h-3.5" />
                    <span>Est. June 2021 • Mangadu, Chennai</span>
                  </span>
                  <span className="bg-white/10 text-slate-300 px-3 py-1 rounded-full text-xs font-semibold border border-white/10">
                    ISO 9001:2015 Certified
                  </span>
                </div>
                
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-headline tracking-tight leading-tight mb-2">
                  ESSENDAAR SUPPLIERS
                </h1>
                <p className="text-emerald-400 font-headline font-bold text-base sm:text-xl tracking-wide mb-4">
                  Clean Solutions. Reliable Services.
                </p>
                
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-6">
                  ESSENDAAR SUPPLIERS is a premier manufacturer and integrated service partner founded in Mangadu, Chennai. We deliver certified Home Care Cleaning Formulations, Turnkey Facility Management, Vetted Manpower Support, and Institutional Supplies to homes, schools, hospitals, IT parks, and commercial complexes across Tamil Nadu.
                </p>

                {/* Key Metrics / Highlights */}
                <div className="grid grid-cols-3 gap-3 mb-6 p-3.5 rounded-2xl bg-white/5 border border-white/10 text-center">
                  <div>
                    <div className="text-base sm:text-lg font-black font-headline text-white">100%</div>
                    <div className="text-[10px] sm:text-[11px] text-slate-300">Lab Tested Formulations</div>
                  </div>
                  <div className="border-x border-white/10">
                    <div className="text-base sm:text-lg font-black font-headline text-emerald-400">4 Core</div>
                    <div className="text-[10px] sm:text-[11px] text-slate-300">Business Verticals</div>
                  </div>
                  <div>
                    <div className="text-base sm:text-lg font-black font-headline text-amber-400">1000+</div>
                    <div className="text-[10px] sm:text-[11px] text-slate-300">Trusted Clients</div>
                  </div>
                </div>
              </div>

              {/* Quick Contact Bar */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-4 border-t border-slate-700/80 text-xs">
                <a 
                  href="tel:+919787979757" 
                  className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors bg-white/5 p-2 rounded-xl border border-white/5"
                >
                  <PhoneCall className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="font-semibold">+91 97879 79757</span>
                </a>
                <a 
                  href="mailto:essendaargroup@gmail.com" 
                  className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors bg-white/5 p-2 rounded-xl border border-white/5"
                >
                  <Mail className="w-4 h-4 text-sky-400 shrink-0" />
                  <span className="truncate">essendaargroup@gmail.com</span>
                </a>
                <div className="flex items-center gap-2 text-slate-300 bg-white/5 p-2 rounded-xl border border-white/5">
                  <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                  <span className="truncate">Mangadu, Chennai, TN</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300 bg-white/5 p-2 rounded-xl border border-white/5">
                  <Globe className="w-4 h-4 text-indigo-400 shrink-0" />
                  <span className="truncate">www.rightchoiceindia.com</span>
                </div>
              </div>
            </div>

            {/* Right Column: Founder & Leadership Card (D Siva Krishnan, B.E) */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="bg-white text-slate-900 rounded-3xl p-4 sm:p-5 shadow-2xl border-[3px] border-amber-400 max-w-xs sm:max-w-sm w-full relative">
                
                {/* Gold Rimmed Portrait Container - aspect-square to view full image without cropping */}
                <div className="p-1 rounded-2xl bg-gradient-to-br from-amber-400 via-amber-300 to-amber-500 shadow-sm">
                  <div className="relative overflow-hidden rounded-xl bg-slate-900 aspect-square w-full flex items-center justify-center">
                    
                    {/* Executive Portrait displaying full image */}
                    <img
                      src={sivaKrishnanPortrait}
                      alt="D Siva Krishnan, B.E - Founder & Managing Director, Essendaar Suppliers"
                      className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-105"
                      onError={(e) => {
                        const target = e.currentTarget;
                        if (!target.dataset.tried1) {
                          target.dataset.tried1 = 'true';
                          target.src = '/siva-krishnan.jpg';
                        } else if (!target.dataset.tried2) {
                          target.dataset.tried2 = 'true';
                          target.src = '/assets/siva-krishnan.jpg';
                        } else if (!target.dataset.tried3) {
                          target.dataset.tried3 = 'true';
                          target.src = 'https://rightchoiceindia.com/wp-content/uploads/2026/09/siva-krishnan.jpg';
                        }
                      }}
                      referrerPolicy="no-referrer"
                    />

                    {/* Verified Leadership Badge */}
                    <div className="absolute top-2.5 right-2.5 z-10">
                      <span className="bg-[#004d1f] text-white text-[10px] font-black uppercase px-2.5 py-1 rounded-full shadow-md flex items-center gap-1.5 border border-emerald-400/30">
                        <GraduationCap className="w-3 h-3 text-amber-300" />
                        <span>FOUNDER &amp; MD</span>
                      </span>
                    </div>

                    <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950/90 via-slate-950/50 to-transparent px-3 py-2 flex items-end justify-between">
                      <span className="text-[10px] font-bold text-amber-300 tracking-wider uppercase font-mono">
                        ESSENDAAR GROUP
                      </span>
                      <span className="text-[10px] text-white/95 font-medium">
                        Chennai, India
                      </span>
                    </div>
                  </div>
                </div>

                {/* Name Badge */}
                <div className="bg-[#00355f] text-white py-2 px-3 rounded-xl text-center shadow-md mt-3 flex items-center justify-center gap-2">
                  <GraduationCap className="w-4 h-4 text-amber-400 shrink-0" />
                  <h2 className="text-sm sm:text-base font-black font-headline tracking-wide">
                    D Siva Krishnan, B.E
                  </h2>
                </div>

                {/* Core Domains */}
                <p className="text-xs font-bold text-center text-slate-700 mt-2 px-1 leading-snug">
                  Facility Management, Manufacturer and Distributor of Home Care Products.
                </p>

                {/* Styled Graphical Accent Line with Orange Nodes */}
                <div className="flex items-center justify-center my-2.5 px-4">
                  <span className="w-2 h-2 rounded-full bg-orange-500 shrink-0 shadow-xs"></span>
                  <span className="h-0.5 bg-gradient-to-r from-orange-400 via-orange-500 to-orange-400 flex-1 mx-2"></span>
                  <span className="w-2 h-2 rounded-full bg-orange-500 shrink-0 shadow-xs"></span>
                </div>

                {/* Guiding Philosophy Motto */}
                <div className="text-center px-1">
                  <p className="text-xs sm:text-sm font-black text-slate-900 leading-snug font-headline">
                    Driving <span className="text-[#006e2d]">Clean</span> &amp; <span className="text-orange-600">Reliable Solutions</span>
                  </p>
                  <p className="text-[11px] font-semibold text-slate-600 mt-0.5 leading-tight">
                    for a Safer, Healthier &amp; Better Tomorrow.
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="mt-3 pt-2.5 border-t border-slate-100 grid grid-cols-2 gap-2">
                  <a
                    href="tel:+919787979757"
                    className="py-2 px-2.5 bg-[#006e2d] hover:bg-[#14532D] text-white rounded-xl text-xs font-bold text-center transition-all flex items-center justify-center gap-1.5 shadow-sm active:scale-98"
                  >
                    <PhoneCall className="w-3.5 h-3.5" />
                    <span>Direct Call</span>
                  </a>
                  <a
                    href="https://wa.me/919787979757?text=Hello%20D%20Siva%20Krishnan,%20I%20would%20like%20to%20inquire%20about%20Essendaar%20Suppliers"
                    target="_blank"
                    rel="noreferrer"
                    className="py-2 px-2.5 bg-[#00355f] hover:bg-[#0A2540] text-white rounded-xl text-xs font-bold text-center transition-all flex items-center justify-center gap-1.5 shadow-sm active:scale-98"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                    <span>WhatsApp</span>
                  </a>
                </div>

              </div>
            </div>

          </div>
        </div>

        {/* Quality & Certification Badges */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xs flex items-start gap-5">
            <div className="p-4 bg-emerald-50 text-[#006e2d] rounded-2xl shrink-0">
              <Award className="w-8 h-8" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#006e2d] bg-emerald-50 px-2 py-0.5 rounded">
                International Standard
              </span>
              <h3 className="text-lg font-black font-headline text-[#0A2540] mt-1.5 mb-2">
                ISO 9001:2015 Certified Company
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Demonstrating our strict commitment to structured quality management, consistent formulation safety, standardized operating procedures, and customer satisfaction benchmarks.
              </p>
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xs flex items-start gap-5">
            <div className="p-4 bg-sky-50 text-[#00355f] rounded-2xl shrink-0">
              <FlaskConical className="w-8 h-8" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#00355f] bg-sky-50 px-2 py-0.5 rounded">
                Laboratory Verified
              </span>
              <h3 className="text-lg font-black font-headline text-[#0A2540] mt-1.5 mb-2">
                Tamilnadu Test House Certified
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                All cleaning formulations are rigorously tested and certified through Tamilnadu Test House Pvt. Ltd., verifying product quality, active-matter safety, and high bactericidal performance.
              </p>
            </div>
          </div>
        </div>

        {/* Core Business Pillars Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-[#006e2d]">What We Do</span>
          <h2 className="text-2xl sm:text-4xl font-black font-headline text-[#0A2540] mt-1 mb-3">
            Our 4 Core Business Verticals
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            From direct-to-consumer hygiene products to large-scale campus housekeeping contracts.
          </p>
        </div>

        {/* 1. Home Care Cleaning Products */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-xs mb-10">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-[#eff4ff] text-[#00355f] rounded-xl font-black text-lg">1</div>
              <div>
                <h3 className="text-xl font-black font-headline text-[#0A2540]">Home Care Cleaning Products</h3>
                <p className="text-xs text-slate-500">Manufactured in-house with certified quality formulations</p>
              </div>
            </div>
            <button 
              onClick={() => setCurrentRoute('shop')}
              className="px-4 py-2 bg-[#00355f] hover:bg-[#0A2540] text-white text-xs font-bold rounded-xl transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <span>Explore Products</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {brandProducts.map((brand, idx) => (
              <div key={idx} className="bg-slate-50 rounded-2xl p-5 border border-slate-200 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">{brand.category}</span>
                    <span className="text-[10px] font-bold bg-white text-slate-700 px-2 py-0.5 rounded border border-slate-200">
                      {brand.badge}
                    </span>
                  </div>
                  <h4 className="text-lg font-black font-headline text-[#0A2540]">{brand.name}</h4>
                  <p className="text-xs italic text-[#006e2d] font-semibold mt-0.5 mb-3">"{brand.tagline}"</p>
                  
                  <ul className="space-y-1.5 text-xs text-slate-700 mb-4">
                    {brand.items.map((item, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#006e2d]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {brand.specialOffers && (
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-[11px] text-amber-900 font-semibold space-y-1 mt-2">
                    <div className="flex items-center gap-1 font-bold text-amber-950 uppercase tracking-wide text-[10px]">
                      <Gift className="w-3.5 h-3.5 text-amber-700" />
                      <span>Special Consumer Offers:</span>
                    </div>
                    {brand.specialOffers.map((offer, i) => (
                      <p key={i} className="leading-tight">• {offer}</p>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Other Cleaning & Hygiene Products */}
          <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-xs">
            <span className="font-bold text-[#006e2d] uppercase tracking-wider block mb-1.5">
              Other Housekeeping &amp; Hygiene Products:
            </span>
            <div className="flex flex-wrap gap-2 text-slate-700 font-medium">
              {['Soap Oil', 'Hand Wash', 'Liquid Soap', 'Floor Sanitizer', 'Industrial Housekeeping Solutions'].map((item, i) => (
                <span key={i} className="bg-white px-3 py-1 rounded-lg border border-emerald-200 font-semibold text-slate-800">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* 2. Facility Management Services */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-xs mb-10">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-[#eff4ff] text-[#00355f] rounded-xl font-black text-lg">2</div>
              <div>
                <h3 className="text-xl font-black font-headline text-[#0A2540]">Facility Management Services</h3>
                <p className="text-xs text-slate-500">Complete professional support for schools, colleges, institutions &amp; commercial hubs</p>
              </div>
            </div>
            <button 
              onClick={() => setCurrentRoute('facility-management')}
              className="px-4 py-2 bg-[#006e2d] hover:bg-[#14532D] text-white text-xs font-bold rounded-xl transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <span>View Facility Plans</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs text-slate-700 font-semibold">
            {[
              'Housekeeping Services',
              'School & College Cleaning',
              'Restroom Cleaning & Hygiene',
              'Floor & Surface Cleaning',
              'Common Area Maintenance',
              'Deep Cleaning Support',
              'Cleaning Material Management',
              'Daily Work Monitoring',
              'Attendance Management',
              'Work Schedule & Performance Reports',
              'Site Inspection & Follow-up',
              'Dedicated Facility Support Staff'
            ].map((service, i) => (
              <div key={i} className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#006e2d] shrink-0" />
                <span>{service}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 3. Manpower Support & 4. Institutional Supplies */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          
          {/* Vertical 3: Manpower */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-[#eff4ff] text-[#00355f] rounded-xl font-black text-lg">3</div>
                <div>
                  <h3 className="text-lg font-black font-headline text-[#0A2540]">Manpower Support</h3>
                  <p className="text-xs text-slate-500">Vetted personnel for institutional &amp; commercial needs</p>
                </div>
              </div>

              <div className="space-y-2.5 text-xs text-slate-700 mb-6">
                {[
                  { role: 'Housekeeping Staff', desc: 'Trained in deep cleaning & hygiene' },
                  { role: 'On-site Supervisors', desc: 'Shift scheduling & quality audits' },
                  { role: 'Maintenance Support', desc: 'General facility upkeep' },
                  { role: 'School Bus Attenders', desc: 'Patient, child safety verified marshals' },
                  { role: 'Administrative Support Staff', desc: 'Front desk & campus operations' },
                  { role: 'Custom Support Personnel', desc: 'Tailored to unique institutional needs' }
                ].map((item, i) => (
                  <div key={i} className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex justify-between items-center">
                    <span className="font-bold text-slate-900">{item.role}</span>
                    <span className="text-slate-500">{item.desc}</span>
                  </div>
                ))}
              </div>
            </div>

            <button 
              onClick={() => setCurrentRoute('manpower-support')}
              className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold text-xs rounded-xl transition-colors cursor-pointer"
            >
              Inquire About Manpower Support
            </button>
          </div>

          {/* Vertical 4: Supplies */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-[#eff4ff] text-[#00355f] rounded-xl font-black text-lg">4</div>
                <div>
                  <h3 className="text-lg font-black font-headline text-[#0A2540]">Institutional &amp; Commercial Supplies</h3>
                  <p className="text-xs text-slate-500">Essential products &amp; accessories under one invoice</p>
                </div>
              </div>

              <div className="space-y-4 text-xs">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <h4 className="font-bold text-[#00355f] mb-1">Cleaning &amp; Housekeeping Materials</h4>
                  <p className="text-slate-600">Cleaning Chemicals, Mops &amp; Sticks, Brushes, Scrubbers, Brooms, Cleaning Cloths, Caution Boards &amp; Accessories.</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <h4 className="font-bold text-[#00355f] mb-1">Safety Products &amp; Equipment</h4>
                  <p className="text-slate-600">Workplace safety gear, gloves, protective wear, and sanitation dispensers.</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <h4 className="font-bold text-[#00355f] mb-1">Stationery &amp; Sports Items</h4>
                  <p className="text-slate-600">General institutional stationery supply and physical-education sports equipment.</p>
                </div>
              </div>
            </div>

            <button 
              onClick={() => setCurrentRoute('institutional-supplies')}
              className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold text-xs rounded-xl transition-colors cursor-pointer mt-6"
            >
              View Institutional Supplies Catalog
            </button>
          </div>

        </div>

        {/* Why Choose Essendaar Suppliers */}
        <div className="bg-[#0A2540] text-white rounded-3xl p-8 sm:p-12 mb-16 shadow-md">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">Our Edge</span>
            <h2 className="text-2xl sm:text-3xl font-black font-headline mt-1 mb-2">Why Choose ESSENDAAR SUPPLIERS?</h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Built on consistent quality, disciplined execution, and transparent partnerships.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyChooseUs.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition-colors">
                  <div className="p-2.5 bg-[#006e2d] text-white rounded-xl w-fit mb-3">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold font-headline mb-1.5 text-white">{item.title}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Customer Segments */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-xs mb-16">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-[#006e2d]">Client Segments</span>
            <h2 className="text-2xl font-black font-headline text-[#0A2540] mt-1 mb-2">Who We Serve</h2>
            <p className="text-xs text-slate-600">Tailored supply chains and staffing for diverse industries across Tamil Nadu</p>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {customerSegments.map((seg, idx) => {
              const Icon = seg.icon;
              return (
                <div key={idx} className="flex items-center gap-2 bg-[#f8f9ff] border border-slate-200 hover:border-[#00355f] px-4 py-2.5 rounded-xl transition-all">
                  <Icon className="w-4 h-4 text-[#00355f]" />
                  <span className="text-xs font-bold text-slate-800">{seg.name}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Founder & Managing Director's Message */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs mb-16 relative overflow-hidden">
          <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8">
            <div className="shrink-0 flex flex-col items-center text-center">
              <div className="p-1 rounded-2xl bg-gradient-to-br from-amber-400 via-amber-300 to-amber-500 shadow-sm w-28 sm:w-36">
                <div className="rounded-xl overflow-hidden aspect-square bg-slate-900">
                  <img
                    src={sivaKrishnanPortrait}
                    alt="D Siva Krishnan, B.E - Founder & Managing Director"
                    className="w-full h-full object-cover object-center"
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (!target.dataset.tried1) {
                        target.dataset.tried1 = 'true';
                        target.src = '/siva-krishnan.jpg';
                      } else if (!target.dataset.tried2) {
                        target.dataset.tried2 = 'true';
                        target.src = '/assets/siva-krishnan.jpg';
                      } else if (!target.dataset.tried3) {
                        target.dataset.tried3 = 'true';
                        target.src = 'https://rightchoiceindia.com/wp-content/uploads/2026/09/siva-krishnan.jpg';
                      }
                    }}
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
              <h4 className="font-headline font-black text-xs sm:text-sm text-[#0A2540] mt-2.5">D Siva Krishnan, B.E</h4>
              <p className="text-[10px] sm:text-[11px] font-bold text-[#006e2d]">Founder &amp; Managing Director</p>
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-2 text-amber-600 mb-2">
                <Quote className="w-5 h-5 rotate-180 text-amber-500" />
                <span className="text-[11px] font-bold uppercase tracking-widest text-slate-500">Founder's Message &amp; Vision</span>
              </div>
              <h3 className="text-lg sm:text-xl font-black font-headline text-[#0A2540] mb-2.5">
                "Driving Clean &amp; Reliable Solutions for a Safer, Healthier &amp; Better Tomorrow."
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-3.5">
                Since our inception in June 2021, Essendaar Suppliers has operated with a single guiding mission: to bring engineering precision, chemical reliability, and disciplined human execution to facility management and home care manufacturing. Whether delivering laboratory-tested cleaning formulations or deploying verified housekeeping personnel, we stand by uncompromising quality and customer trust across Chennai and Tamil Nadu.
              </p>
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs font-bold text-slate-700">
                <span className="flex items-center gap-1.5 text-[#006e2d] bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 text-[11px]">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>ISO 9001:2015 Process Standards</span>
                </span>
                <span className="flex items-center gap-1.5 text-[#00355f] bg-sky-50 px-2.5 py-1 rounded-full border border-sky-200 text-[11px]">
                  <FlaskConical className="w-3.5 h-3.5" />
                  <span>Tamilnadu Test House Certified</span>
                </span>
                <span className="flex items-center gap-1.5 text-amber-800 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200 text-[11px]">
                  <Users className="w-3.5 h-3.5" />
                  <span>100% Vetted Manpower</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Vision, Mission & Commitment */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs">
            <div className="p-3 bg-[#eff4ff] text-[#00355f] rounded-2xl w-fit mb-4">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black font-headline text-[#0A2540] mb-2">Our Vision</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              To become a trusted and recognized provider of quality cleaning products, hygiene solutions, and facility-management services through quality, innovation, reliability, and customer satisfaction.
            </p>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs">
            <div className="p-3 bg-emerald-50 text-[#006e2d] rounded-2xl w-fit mb-4">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black font-headline text-[#0A2540] mb-2">Our Mission</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              To deliver effective, affordable, and reliable cleaning products and professional support services that help customers maintain cleaner, safer, and healthier environments.
            </p>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs">
            <div className="p-3 bg-amber-50 text-amber-700 rounded-2xl w-fit mb-4">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black font-headline text-[#0A2540] mb-2">Our Commitment</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-3">
              At ESSENDAAR SUPPLIERS, we believe that quality products and quality service must go together.
            </p>
            <div className="flex flex-wrap gap-1.5 text-[11px] font-bold text-[#00355f]">
              <span className="bg-slate-100 px-2 py-0.5 rounded">Quality</span>
              <span className="bg-slate-100 px-2 py-0.5 rounded">Hygiene</span>
              <span className="bg-slate-100 px-2 py-0.5 rounded">Safety</span>
              <span className="bg-slate-100 px-2 py-0.5 rounded">Reliability</span>
              <span className="bg-slate-100 px-2 py-0.5 rounded">Timely Support</span>
              <span className="bg-slate-100 px-2 py-0.5 rounded">Customer Satisfaction</span>
            </div>
          </div>
        </div>

        {/* Contact Strip Banner */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#006e2d]">Direct Factory &amp; Operations Desk</span>
            <h3 className="text-xl font-black font-headline text-[#0A2540] mt-1">Ready to partner with ESSENDAAR SUPPLIERS?</h3>
            <p className="text-xs text-slate-600 mt-1">Connect with our team for wholesale chemical pricing, facility audits, or manpower staffing.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a 
              href="tel:+919787979757"
              className="px-5 py-3 bg-[#006e2d] hover:bg-[#14532D] text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1.5"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Call +91 97879 79757</span>
            </a>
            <button 
              onClick={() => setCurrentRoute('contact')}
              className="px-5 py-3 bg-[#0A2540] hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all cursor-pointer"
            >
              Submit B2B Inquiry
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
