import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

export const FloatingWhatsApp: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end print:hidden">
      {/* Tooltip Popup */}
      {isOpen && (
        <div className="mb-3 w-72 bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden animate-in fade-in slide-in-from-bottom-2">
          <div className="bg-[#006e2d] text-white p-3.5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <MessageCircle className="w-5 h-5 fill-white text-[#006e2d]" />
              </div>
              <div>
                <p className="font-headline font-bold text-xs">Essendaar Quick Order</p>
                <p className="text-[10px] text-emerald-100 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse"></span>
                  Mangadu Desk • Typically replies in 5m
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white p-1 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-3.5 text-xs text-slate-700 space-y-2.5">
            <p className="text-slate-600">
              Need immediate order dispatch, custom institutional pricing, or sample kits?
            </p>
            <a
              href="https://wa.me/919787979757?text=Hello%20Essendaar%20Suppliers%20Team,%20I%20would%20like%20to%20place%20a%20quick%20order%20or%20inquire%20about%20cleaning%20chemicals."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-3 bg-[#25D366] hover:bg-[#20bd5a] text-slate-950 font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs border border-[#1ebd5c]"
            >
              <MessageCircle className="w-4 h-4 fill-slate-950 text-[#25D366]" />
              <span>Chat &amp; Order on WhatsApp</span>
            </a>
          </div>
        </div>
      )}

      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-13 h-13 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-slate-950 shadow-lg flex items-center justify-center transition-transform hover:scale-105 active:scale-95 cursor-pointer relative group border-2 border-white"
        title="WhatsApp Quick Order & Support Hotline"
        aria-label="Open WhatsApp Quick Order"
      >
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 border-2 border-white rounded-full"></span>
        <MessageCircle className="w-7 h-7 fill-slate-950 text-[#25D366]" />
      </button>
    </div>
  );
};
