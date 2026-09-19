import React, { useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  X, 
  ShieldCheck, 
  FileText, 
  RotateCcw, 
  Download, 
  Printer, 
  CheckCircle2, 
  Phone, 
  Mail, 
  MapPin, 
  Sparkles,
  Building2,
  Lock,
  Truck,
  FileSpreadsheet
} from 'lucide-react';

export const PolicyModal: React.FC = () => {
  const { 
    isPolicyModalOpen, 
    policyModalTab, 
    openPolicyModal, 
    closePolicyModal, 
    settings,
    products,
    setCurrentRoute
  } = useStore();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isPolicyModalOpen) {
        closePolicyModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPolicyModalOpen, closePolicyModal]);

  if (!isPolicyModalOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white w-full max-w-4xl max-h-[90vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-[#0A2540] text-white px-6 py-5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-secondary-fixed">
              {policyModalTab === 'privacy' && <Lock className="w-5 h-5 text-sky-400" />}
              {policyModalTab === 'terms' && <FileText className="w-5 h-5 text-amber-400" />}
              {policyModalTab === 'return' && <RotateCcw className="w-5 h-5 text-emerald-400" />}
              {policyModalTab === 'rate-card' && <FileSpreadsheet className="w-5 h-5 text-secondary-fixed" />}
            </div>
            <div>
              <h2 className="text-lg font-headline font-bold text-white leading-tight">
                {policyModalTab === 'privacy' && 'Privacy Policy & Data Security'}
                {policyModalTab === 'terms' && 'Terms of Service & Commercial Conditions'}
                {policyModalTab === 'return' && 'Replacement, Return & Refund Policy'}
                {policyModalTab === 'rate-card' && 'Institutional Rate Sheet & Wholesale Catalog'}
              </h2>
              <p className="text-xs text-slate-300">
                Essendaar Suppliers &amp; Facility Care &bull; Mangadu, Chennai - 600122
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {policyModalTab === 'rate-card' && (
              <button
                type="button"
                onClick={handlePrint}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/15 hover:bg-white/25 text-white text-xs font-bold transition-all cursor-pointer"
                title="Print or Save as PDF"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print / PDF</span>
              </button>
            )}
            <button
              type="button"
              onClick={closePolicyModal}
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation Strip */}
        <div className="bg-slate-100 px-6 py-2 border-b border-slate-200 flex items-center gap-2 overflow-x-auto shrink-0 text-xs font-bold">
          <button
            type="button"
            onClick={() => openPolicyModal('privacy')}
            className={`px-3.5 py-1.5 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
              policyModalTab === 'privacy'
                ? 'bg-[#00355f] text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-200'
            }`}
          >
            Privacy Policy
          </button>
          <button
            type="button"
            onClick={() => openPolicyModal('terms')}
            className={`px-3.5 py-1.5 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
              policyModalTab === 'terms'
                ? 'bg-[#00355f] text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-200'
            }`}
          >
            Terms &amp; Conditions
          </button>
          <button
            type="button"
            onClick={() => openPolicyModal('return')}
            className={`px-3.5 py-1.5 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
              policyModalTab === 'return'
                ? 'bg-[#00355f] text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-200'
            }`}
          >
            Return &amp; Refund Policy
          </button>
          <button
            type="button"
            onClick={() => openPolicyModal('rate-card')}
            className={`px-3.5 py-1.5 rounded-xl transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              policyModalTab === 'rate-card'
                ? 'bg-[#006e2d] text-white shadow-xs'
                : 'text-emerald-800 hover:bg-emerald-100 bg-emerald-50 border border-emerald-200'
            }`}
          >
            <FileSpreadsheet className="w-3.5 h-3.5" />
            <span>Institutional Rate Sheet (PDF)</span>
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-xs sm:text-sm text-slate-700 leading-relaxed">
          
          {/* TAB 1: PRIVACY POLICY */}
          {policyModalTab === 'privacy' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div className="p-4 rounded-2xl bg-sky-50 border border-sky-200 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-[#00355f] shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-[#00355f] text-sm font-headline">ISO 9001:2015 Compliant Data Governance</h3>
                  <p className="text-xs text-sky-900 mt-0.5">
                    Essendaar Suppliers &amp; Facility Care treats all customer, corporate procurement, and institution partner data with strict confidentiality in compliance with Indian Information Technology regulations.
                  </p>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 text-sm font-headline mb-2">1. Information We Collect</h4>
                <p>
                  When you register an account, place a commercial order, request a facility quote, or verify your email via OTP, we collect necessary business contact information including:
                </p>
                <ul className="list-disc list-inside mt-2 space-y-1 text-slate-600 pl-2">
                  <li>Contact Name, Designated Officer Title, and Company/School Name.</li>
                  <li>Official Billing and Delivery Address in Chennai or surrounding districts.</li>
                  <li>Email address (for invoice dispatch and OTP authentication) and Phone number.</li>
                  <li>GSTIN (for B2B tax invoice generation under GST norms).</li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 text-sm font-headline mb-2">2. How We Protect &amp; Use Your Data</h4>
                <p>
                  All transactional emails, OTP verification messages, and tax invoices are transmitted via our authenticated secure SMTP server gateway (<code className="font-mono text-xs bg-slate-100 px-1 py-0.5 rounded">mail.rightchoiceindia.com</code> on port 465 with SSL/TLS encryption).
                </p>
                <p className="mt-2">
                  We <strong>never sell, rent, or trade</strong> institutional client databases, facility hygiene audit reports, or individual consumer profiles to third-party marketing companies.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 text-sm font-headline mb-2">3. Payment &amp; Transaction Security</h4>
                <p>
                  Online digital payments via UPI, Net Banking, and Debit Cards are routed directly through banking gateways. Essendaar Suppliers does not store sensitive card numbers, CVVs, or UPI PINs on our servers.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 text-sm font-headline mb-2">4. Data Inquiries &amp; Privacy Officer</h4>
                <p>
                  For requests to update contact profiles, review records, or delete data, contact our administrative desk:
                </p>
                <div className="mt-2 p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1">
                  <div><strong>Legal Entity:</strong> Essendaar Suppliers &amp; Facility Care</div>
                  <div><strong>Email:</strong> <a href={`mailto:${settings.email}`} className="text-[#00355f] underline">{settings.email}</a></div>
                  <div><strong>Facility Plant:</strong> Mangadu, Chennai, Tamil Nadu - 600122</div>
                  <div><strong>Helpline:</strong> <a href="tel:+919787979757" className="text-[#00355f] underline">+91 97879 79757</a></div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: TERMS & CONDITIONS */}
          {policyModalTab === 'terms' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-start gap-3">
                <FileText className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-amber-900 text-sm font-headline">B2B Institutional &amp; Retail Supply Terms</h3>
                  <p className="text-xs text-amber-800 mt-0.5">
                    Governing commercial purchases, wholesale drums (5L/50L), hospital facility cleaning agreements, and Tamil Nadu regional dispatches.
                  </p>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 text-sm font-headline mb-2">1. Manufacturing Standards &amp; Formulations</h4>
                <p>
                  All BOZZ detergents, MORNING SHINE dishwash liquids, SKY FRESH floor cleansers, and POWER RIDE disinfectant formulations are manufactured at our Mangadu, Chennai facility under ISO 9001:2015 quality standards. Formulations are certified non-toxic and biodegradable by Tamilnadu Test House Pvt. Ltd.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 text-sm font-headline mb-2">2. Minimum Order &amp; Bulk Pricing Tiers</h4>
                <ul className="list-disc list-inside space-y-1 text-slate-600 pl-2">
                  <li><strong>Retail Packs (500ml / 1L):</strong> No minimum order; eligible for Chennai express parcel delivery.</li>
                  <li><strong>Wholesale Tier 2 (5L Cans / Case of 12):</strong> Eligible for institutional rates with free promotional scrub pads/sponges.</li>
                  <li><strong>Industrial Tier 3 (50L Drums / High Volume):</strong> Custom contractual pricing with scheduled direct factory vehicle delivery.</li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 text-sm font-headline mb-2">3. GST Compliance &amp; Invoicing</h4>
                <p>
                  A formal GST Tax Invoice is generated for every order with active GSTIN (<code className="font-mono text-xs bg-slate-100 px-1 py-0.5 rounded">33AABCT9821F1ZX</code>). 18% GST applies to cleaning chemicals, while statutory 12%/5% applies to selected stationery and protective wear.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 text-sm font-headline mb-2">4. Delivery Turnaround &amp; Logistics</h4>
                <p>
                  Chennai urban &amp; suburban orders are dispatched within 24 to 48 hours. Districts including Kanchipuram, Tiruvallur, Chengalpattu, Vellore, and Coimbatore are fulfilled within 2 to 3 business days via verified logistics partners.
                </p>
              </div>
            </div>
          )}

          {/* TAB 3: RETURN & REFUND POLICY */}
          {policyModalTab === 'return' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-start gap-3">
                <RotateCcw className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-emerald-900 text-sm font-headline">48-Hour Leak-Proof &amp; Transit Damage Guarantee</h3>
                  <p className="text-xs text-emerald-800 mt-0.5">
                    We stand behind every bottle, can, and drum leaving our facility. In the rare event of transit leakage or packaging defect, we guarantee hassle-free replacement.
                  </p>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 text-sm font-headline mb-2">1. Replacement Eligibility Window</h4>
                <p>
                  Customers and institutions must notify our dispatch team within <strong>48 hours of physical receipt</strong> if any item exhibits:
                </p>
                <ul className="list-disc list-inside mt-2 space-y-1 text-slate-600 pl-2">
                  <li>Cracked bottle, broken cap seal, or liquid spillage during delivery.</li>
                  <li>Incorrect product variant or missing pack size against your tax invoice.</li>
                  <li>Defective spray pump or dispenser mechanism.</li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 text-sm font-headline mb-2">2. Quick 2-Step Claim Process</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                    <span className="text-xs font-bold text-[#00355f] block mb-1">Step 1: WhatsApp or Email Photo</span>
                    <p className="text-xs text-slate-600">
                      Snap a clear photo of the leaking bottle/carton and WhatsApp to <a href="tel:+919787979757" className="font-bold text-[#006e2d]">+91 97879 79757</a> or email <a href={`mailto:${settings.email}`} className="underline text-[#00355f]">{settings.email}</a>.
                    </p>
                  </div>
                  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                    <span className="text-xs font-bold text-[#00355f] block mb-1">Step 2: Instant Replacement Dispatch</span>
                    <p className="text-xs text-slate-600">
                      Our factory dispatch officer will immediately release a replacement unit on the same or next business day at zero additional delivery charge.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 text-sm font-headline mb-2">3. Refunds &amp; Commercial Credits</h4>
                <p>
                  For cancellations made prior to delivery truck departure, 100% refund is credited back to the original UPI/bank account within 3-5 business days. For institutional contracts, credit notes are issued directly against the pending monthly billing statement.
                </p>
              </div>
            </div>
          )}

          {/* TAB 4: RATE SHEET & WHOLESALE MATRIX */}
          {policyModalTab === 'rate-card' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div className="p-4 rounded-2xl bg-[#00355f] text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-secondary-fixed">
                    Official Manufacturer Price List &bull; 2026-2027
                  </span>
                  <h3 className="font-bold text-base sm:text-lg font-headline mt-0.5">
                    Essendaar Institutional Procurement Rate Card
                  </h3>
                  <p className="text-xs text-sky-200 mt-1">
                    Specialized rates for schools, healthcare hospitals, IT parks, and wholesale dealers.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handlePrint}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Print Rate Card</span>
                  </button>
                </div>
              </div>

              {/* Price Table */}
              <div className="overflow-x-auto border border-slate-200 rounded-2xl">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-100 text-slate-800 font-bold border-b border-slate-200">
                      <th className="p-3">Product Name &amp; Formulation</th>
                      <th className="p-3">Brand</th>
                      <th className="p-3">Standard Pack</th>
                      <th className="p-3 text-right">Retail MRP</th>
                      <th className="p-3 text-right">Tier 1 Rate</th>
                      <th className="p-3 text-right text-emerald-800 bg-emerald-50">Bulk / 5L+ Rate</th>
                      <th className="p-3 text-center">Freebie / Gift</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {products.slice(0, 10).map((p) => (
                      <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                        <td className="p-3 font-semibold text-slate-900">
                          <div>{p.name}</div>
                          <div className="text-[10px] text-slate-500 font-normal">SKU: {p.sku}</div>
                        </td>
                        <td className="p-3">
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700">
                            {p.brand}
                          </span>
                        </td>
                        <td className="p-3 text-slate-600">{p.packSize}</td>
                        <td className="p-3 text-right text-slate-400 line-through">₹{p.regularPrice}</td>
                        <td className="p-3 text-right font-bold text-slate-800">₹{p.price}</td>
                        <td className="p-3 text-right font-black text-emerald-700 bg-emerald-50/50">
                          ₹{p.wholesaleTier2Price || Math.round(p.price * 0.85)}
                        </td>
                        <td className="p-3 text-center">
                          {p.freebie ? (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
                              {p.freebie}
                            </span>
                          ) : (
                            <span className="text-slate-400 text-[10px]">-</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Call to action for customized RFP */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h4 className="font-bold text-slate-900 text-xs sm:text-sm font-headline">Need an institutional 50L drum quote or turnkey housekeeping contract?</h4>
                  <p className="text-xs text-slate-600 mt-0.5">Submit your required monthly volume for special factory direct rates.</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    closePolicyModal();
                    setCurrentRoute('contact');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-4 py-2 bg-[#006e2d] hover:bg-[#14532D] text-white rounded-xl font-bold text-xs whitespace-nowrap transition-colors cursor-pointer"
                >
                  Request B2B Wholesale RFP &rarr;
                </button>
              </div>

            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 px-6 py-3.5 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 shrink-0 text-xs">
          <div className="flex items-center gap-4 text-slate-500 text-[11px]">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#006e2d]" />
              <span>ISO 9001:2015 Certified</span>
            </span>
            <span className="hidden sm:inline">&bull;</span>
            <span className="hidden sm:inline">Tamilnadu Test House Tested</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={closePolicyModal}
              className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-xl font-bold text-xs transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
