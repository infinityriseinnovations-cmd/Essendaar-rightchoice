import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { EssendaarLogo } from './EssendaarLogo';
import { BrandAssetsModal } from './BrandAssetsModal';
import { 
  Phone, 
  Mail, 
  MapPin, 
  ShieldCheck, 
  FlaskConical, 
  ArrowRight,
  Heart,
  Clock,
  Download
} from 'lucide-react';

export const Footer: React.FC = () => {
  const [isBrandModalOpen, setIsBrandModalOpen] = useState(false);
  const { 
    setCurrentRoute, 
    settings, 
    navigateToShopWithBrand, 
    navigateToShopWithCategory, 
    openPolicyModal 
  } = useStore();

  const handleRouteClick = (route: any) => {
    setCurrentRoute(route);
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="w-full bg-[#0A2540] text-white border-t border-slate-800">
      
      {/* Top Value Strip */}
      <div className="border-b border-slate-800/80 py-8 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
          
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0 text-secondary-fixed">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="font-headline font-bold text-sm text-white block">ISO 9001:2015 Certified</span>
              <p className="text-slate-400 text-xs mt-0.5">
                Standardized, clinical batch formulation with strict quality management in Mangadu, Chennai.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0 text-sky-400">
              <FlaskConical className="w-5 h-5" />
            </div>
            <div>
              <span className="font-headline font-bold text-sm text-white block">Tamilnadu Test House Tested</span>
              <p className="text-slate-400 text-xs mt-0.5">
                Independently certified non-toxic, skin-friendly, bio-degradable, and gentle on sensitive floor surfaces.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0 text-amber-400">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <span className="font-headline font-bold text-sm text-white block">24-Hour Express Dispatch</span>
              <p className="text-slate-400 text-xs mt-0.5">
                Fast doorstep fulfillment across Chennai, Kanchipuram, Tiruvallur, and greater South India corridor.
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Col 1: Brand Info (2 cols) */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <button 
              type="button"
              onClick={() => handleRouteClick('home')}
              className="bg-white/5 p-3 rounded-2xl w-fit border border-white/10 hover:border-white/30 hover:bg-white/10 transition-all cursor-pointer text-left"
              title="Return to Home"
            >
              <EssendaarLogo variant="white" />
            </button>
            <p className="text-xs text-slate-300 leading-relaxed max-w-sm">
              Essendaar Suppliers &amp; Facility Care is an ISO 9001:2015 certified manufacturer of high-performance cleaning solutions (BOZZ, MORNING SHINE, SKY FRESH, POWER RIDE) and trusted turnkey facility partner for schools, hospitals, and corporate campuses.
            </p>
            <div className="flex items-center gap-3 text-xs text-slate-400 pt-1">
              <span>GSTIN Registered</span>
              <span>·</span>
              <span>Tamilnadu Test House Tested</span>
              <span>·</span>
              <span>MSME Registered</span>
            </div>
            <div className="pt-1">
              <button
                type="button"
                onClick={() => setIsBrandModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-sky-200 hover:text-white border border-white/15 text-xs font-semibold transition-all cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 text-sky-400" />
                <span>Download Official Logo (Large PNG) &amp; Favicon</span>
              </button>
            </div>
          </div>

          {/* Col 2: Product Portfolio */}
          <div className="flex flex-col gap-3">
            <span className="font-headline font-bold text-xs uppercase tracking-wider text-secondary-fixed">
              Our Brands
            </span>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <button 
                  type="button"
                  onClick={() => navigateToShopWithBrand('BOZZ')} 
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  BOZZ Fabric Detergents
                </button>
              </li>
              <li>
                <button 
                  type="button"
                  onClick={() => navigateToShopWithBrand('MORNING SHINE')} 
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  MORNING SHINE Dishwash
                </button>
              </li>
              <li>
                <button 
                  type="button"
                  onClick={() => navigateToShopWithBrand('SKY FRESH')} 
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  SKY FRESH Surface Cleaner
                </button>
              </li>
              <li>
                <button 
                  type="button"
                  onClick={() => navigateToShopWithBrand('POWER RIDE')} 
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  POWER RIDE Toilet Disinfectant
                </button>
              </li>
              <li>
                <button 
                  type="button"
                  onClick={() => navigateToShopWithBrand('ESSENDAAR BULK')} 
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Institutional 5L &amp; 50L Drums
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Facility Services */}
          <div className="flex flex-col gap-3">
            <span className="font-headline font-bold text-xs uppercase tracking-wider text-secondary-fixed">
              Facility Services
            </span>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <button 
                  type="button"
                  onClick={() => handleRouteClick('facility-management')} 
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Turnkey Campus Housekeeping
                </button>
              </li>
              <li>
                <button 
                  type="button"
                  onClick={() => handleRouteClick('manpower-support')} 
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Vetted Staff &amp; Bus Attenders
                </button>
              </li>
              <li>
                <button 
                  type="button"
                  onClick={() => handleRouteClick('institutional-supplies')} 
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  School Stationery &amp; Sports Kits
                </button>
              </li>
              <li>
                <button 
                  type="button"
                  onClick={() => handleRouteClick('facility-management')} 
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Hospital Hygiene Audits
                </button>
              </li>
              <li>
                <button 
                  type="button"
                  onClick={() => openPolicyModal('rate-card')} 
                  className="hover:text-emerald-400 transition-colors cursor-pointer text-left font-semibold flex items-center gap-1 text-emerald-300"
                >
                  <span>Request Rate Sheet PDF</span>
                  <span className="text-[10px] bg-emerald-500/20 px-1.5 py-0.2 rounded text-emerald-300">PDF</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Factory */}
          <div className="flex flex-col gap-3">
            <span className="font-headline font-bold text-xs uppercase tracking-wider text-secondary-fixed">
              Chennai Factory
            </span>
            <div className="space-y-2.5 text-xs text-slate-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                <span>Mangadu, Chennai, Tamil Nadu - 600122</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-secondary-fixed shrink-0" />
                <a href="tel:+919787979757" className="hover:text-white">+91 97879 79757</a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-sky-400 shrink-0" />
                <a href={`mailto:${settings.email}`} className="hover:text-white">{settings.email}</a>
              </div>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => handleRouteClick('contact')}
                  className="w-full py-2 px-3 rounded-lg bg-[#006e2d] hover:bg-[#14532D] text-white font-bold text-center cursor-pointer transition-colors"
                >
                  Get B2B Wholesale Quote
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Copyright Sub-bar */}
      <div className="border-t border-slate-800 py-4 px-4 sm:px-6 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>&copy; {new Date().getFullYear()} Essendaar Suppliers &amp; Facility Care. All Rights Reserved.</span>
          <div className="flex flex-wrap items-center gap-3 text-[11px]">
            <button
              type="button"
              onClick={() => handleRouteClick('admin')}
              className="text-slate-400 hover:text-white underline cursor-pointer transition-colors"
            >
              Operations &amp; Admin Portal
            </button>
            <span>·</span>
            <button
              type="button"
              onClick={() => openPolicyModal('privacy')}
              className="hover:text-white underline cursor-pointer transition-colors"
            >
              Privacy Policy
            </button>
            <span>·</span>
            <button
              type="button"
              onClick={() => openPolicyModal('terms')}
              className="hover:text-white underline cursor-pointer transition-colors"
            >
              Terms &amp; Conditions
            </button>
            <span>·</span>
            <button
              type="button"
              onClick={() => openPolicyModal('return')}
              className="hover:text-white underline cursor-pointer transition-colors"
            >
              Return Policy
            </button>
            <span>·</span>
            <button
              type="button"
              onClick={() => setIsBrandModalOpen(true)}
              className="text-sky-300 hover:text-white underline cursor-pointer transition-colors"
            >
              Logo Downloads (PNG)
            </button>
          </div>
        </div>
      </div>

      <BrandAssetsModal 
        isOpen={isBrandModalOpen} 
        onClose={() => setIsBrandModalOpen(false)} 
      />
    </footer>
  );
};
