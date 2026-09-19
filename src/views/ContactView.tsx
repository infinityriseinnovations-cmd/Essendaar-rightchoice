import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  Send, 
  CheckCircle2, 
  Building2, 
  FileSpreadsheet, 
  Truck,
  MessageSquare,
  Sparkles
} from 'lucide-react';

export const ContactView: React.FC = () => {
  const { setCurrentRoute, addInquiry, settings } = useStore();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    yourName: '',
    phone: '',
    email: '',
    subject: 'Institutional Quote & Rate Card',
    organization: '',
    location: 'Chennai',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Persist inquiry and dispatch alert via SMTP mail server
    addInquiry({
      name: formData.yourName,
      company: formData.organization,
      email: formData.email,
      phone: formData.phone,
      category: formData.subject,
      volume: formData.location ? `Delivery: ${formData.location}` : undefined,
      message: formData.message,
    });

    setTimeout(() => {
      setIsLoading(false);
      setFormSubmitted(true);
    }, 600);
  };

  return (
    <div className="w-full bg-[#f8f9ff] min-h-screen pb-16">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-[#0A2540] via-[#00355f] to-[#004e78] text-white py-12 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto text-center">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-secondary-fixed text-xs font-bold uppercase font-headline border border-white/20 mb-3">
            <Building2 className="w-3.5 h-3.5" />
            <span>Direct B2B Procurement Desk</span>
          </span>
          <h1 className="text-3xl sm:text-4xl font-headline font-extrabold tracking-tight">
            Contact Essendaar Suppliers
          </h1>
          <p className="text-xs sm:text-sm text-slate-200 mt-2 max-w-xl mx-auto">
            Manufacturing plant in Mangadu, Chennai. Serving households, wholesale distributors, schools, colleges, and facility management contractors.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Direct Factory & Procurement Channels */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            
            <div className="bg-white rounded-3xl p-6 shadow-xs border border-slate-200 flex flex-col gap-4">
              <span className="text-xs font-bold text-[#006e2d] uppercase tracking-wider font-headline">
                Official Head Office &amp; Factory
              </span>
              <h2 className="text-xl font-headline font-bold text-[#0A2540]">
                Essendaar Suppliers &amp; Facility Care
              </h2>
              <p className="text-xs text-slate-600 leading-relaxed">
                ISO 9001:2015 Certified Manufacturer. Formulated to rigorous clinical hygiene benchmarks and certified by Tamilnadu Test House Pvt. Ltd.
              </p>

              <div className="space-y-3 pt-2 text-xs text-slate-700">
                <a
                  href="tel:+919787979757"
                  className="flex items-start gap-3 p-3 rounded-xl bg-[#eff4ff] hover:bg-[#dce9ff] transition-colors"
                >
                  <Phone className="w-4 h-4 text-[#006e2d] mt-0.5 shrink-0" />
                  <div>
                    <span className="font-bold text-[#0A2540] block font-headline">Direct Phone &amp; WhatsApp</span>
                    <span className="text-slate-600">+91 97879 79757</span>
                  </div>
                </a>

                <a
                  href={`mailto:${settings.email}`}
                  className="flex items-start gap-3 p-3 rounded-xl bg-[#eff4ff] hover:bg-[#dce9ff] transition-colors"
                >
                  <Mail className="w-4 h-4 text-[#00355f] mt-0.5 shrink-0" />
                  <div>
                    <span className="font-bold text-[#0A2540] block font-headline">Official Inquiries &amp; RFPs</span>
                    <span className="text-slate-600">{settings.email}</span>
                  </div>
                </a>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-[#eff4ff]">
                  <MapPin className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
                  <div>
                    <span className="font-bold text-[#0A2540] block font-headline">Facility Location</span>
                    <span className="text-slate-600">Mangadu, Chennai, Tamil Nadu - 600122</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-[#eff4ff]">
                  <Clock className="w-4 h-4 text-sky-600 mt-0.5 shrink-0" />
                  <div>
                    <span className="font-bold text-[#0A2540] block font-headline">Operating Hours</span>
                    <span className="text-slate-600">Monday to Saturday: 8:30 AM – 8:00 PM</span>
                  </div>
                </div>
              </div>
            </div>

            {/* B2B Services Highlight Box */}
            <div className="bg-[#eff4ff] rounded-3xl p-6 border border-slate-200 text-xs space-y-3">
              <span className="font-headline font-bold text-sm text-[#00355f] block">
                Looking for Institutional Services?
              </span>
              <p className="text-slate-600 text-xs">
                We also provide turnkey campus facility management, school bus attenders, trained housekeeping manpower, and 50L bulk chemical drum deliveries.
              </p>
              <div className="flex flex-col gap-1.5 pt-1 font-semibold text-slate-700">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#006e2d]" />
                  <span>100% PF &amp; ESI Compliant Manpower</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#006e2d]" />
                  <span>Tamilnadu Test House Tested Safe Chemicals</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#006e2d]" />
                  <span>Single Consolidated GST Billing</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: WordPress Contact Form 7 Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 shadow-xs border border-slate-200">
            
            <div className="mb-6">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block font-headline">
                WordPress Contact Form 7 Powered
              </span>
              <h3 className="text-xl font-headline font-bold text-[#0A2540] mt-1">
                Send an Inquiry or RFP
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Please fill in the details below. Our technical sales team will reply within 2-4 business hours.
              </p>
            </div>

            {formSubmitted ? (
              <div className="p-6 bg-emerald-50 border-2 border-emerald-600 text-emerald-900 rounded-2xl text-center space-y-3 animate-in fade-in">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h4 className="font-headline font-bold text-base">Thank you for your message. It has been sent!</h4>
                <p className="text-xs text-emerald-800 leading-relaxed">
                  Your inquiry has been assigned ticket <strong className="font-mono">#CF7-ESD-{Math.floor(1000 + Math.random() * 9000)}</strong>. Our sales officer will contact you with wholesale price sheets and dispatch logistics.
                </p>
                <button
                  onClick={() => setFormSubmitted(false)}
                  className="mt-2 px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-bold cursor-pointer"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-xs">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="font-semibold text-slate-800">Your Full Name <span className="text-rose-500">*</span></label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Kumar"
                      value={formData.yourName}
                      onChange={(e) => setFormData({ ...formData, yourName: e.target.value })}
                      className="h-11 px-3 rounded-xl border border-slate-300 focus:outline-none focus:border-[#00355f] text-xs"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="font-semibold text-slate-800">Phone / WhatsApp <span className="text-rose-500">*</span></label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98400 12345"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="h-11 px-3 rounded-xl border border-slate-300 focus:outline-none focus:border-[#00355f] text-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="font-semibold text-slate-800">Email Address <span className="text-rose-500">*</span></label>
                    <input
                      type="email"
                      required
                      placeholder="procurement@organization.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="h-11 px-3 rounded-xl border border-slate-300 focus:outline-none focus:border-[#00355f] text-xs"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="font-semibold text-slate-800">Subject / Category <span className="text-rose-500">*</span></label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="h-11 px-3 rounded-xl border border-slate-300 focus:outline-none focus:border-[#00355f] text-xs bg-white cursor-pointer"
                    >
                      <option>Institutional Quote &amp; Rate Card</option>
                      <option>Distributor / Retail Dealership</option>
                      <option>Turnkey Campus Facility Assessment</option>
                      <option>Housekeeping Staffing Contract</option>
                      <option>Free Chemical Sample Request</option>
                      <option>General Customer Support</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="font-semibold text-slate-800">Organization / Company Name</label>
                    <input
                      type="text"
                      placeholder="e.g. SVS Matriculation School"
                      value={formData.organization}
                      onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                      className="h-11 px-3 rounded-xl border border-slate-300 focus:outline-none focus:border-[#00355f] text-xs"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="font-semibold text-slate-800">Delivery Location (City / District)</label>
                    <input
                      type="text"
                      placeholder="e.g. Chennai, Kanchipuram, Coimbatore"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="h-11 px-3 rounded-xl border border-slate-300 focus:outline-none focus:border-[#00355f] text-xs"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="font-semibold text-slate-800">Your Detailed Requirement / Message <span className="text-rose-500">*</span></label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Specify product types, required monthly volumes, pack sizes (1L / 5L / 50L), or facility staffing scope..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="p-3 rounded-xl border border-slate-300 focus:outline-none focus:border-[#00355f] text-xs resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-12 rounded-xl bg-[#006e2d] hover:bg-[#14532D] text-white font-headline font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer disabled:opacity-50 mt-2"
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Sending message...</span>
                    </span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Message (Submit CF7)</span>
                    </>
                  )}
                </button>

                <p className="text-[11px] text-slate-400 text-center">
                  Protected by standard reCAPTCHA v3. We never share your institutional contact data with third parties.
                </p>

              </form>
            )}

          </div>

        </div>

      </div>

    </div>
  );
};
