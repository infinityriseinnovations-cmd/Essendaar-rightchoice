import React from 'react';
import { useStore } from '../context/StoreContext';
import { 
  X, 
  Sparkles, 
  Sliders, 
  Check, 
  RotateCcw, 
  Zap, 
  DollarSign, 
  Palette,
  Smartphone
} from 'lucide-react';

export const ElementorCustomizer: React.FC = () => {
  const { 
    isCustomizerOpen, 
    setIsCustomizerOpen, 
    settings, 
    updateSettings,
    viewMode,
    setViewMode,
    showTouchErgonomics,
    setShowTouchErgonomics
  } = useStore();

  if (!isCustomizerOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-80 sm:w-96 bg-[#1d2327] text-[#f0f0f1] shadow-2xl flex flex-col border-l border-stone-700 animate-in slide-in-from-right duration-200 text-xs font-sans">
      {/* Header */}
      <div className="p-4 bg-[#15191c] border-b border-stone-800 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-5 h-5 rounded-full bg-pink-600 flex items-center justify-center font-bold text-white text-[10px]">
            E
          </div>
          <div>
            <h3 className="font-bold text-white text-sm">Theme & Store Customizer</h3>
            <p className="text-[10px] text-stone-400">WordPress 6.7 • WooCommerce 9.4</p>
          </div>
        </div>
        <button
          onClick={() => setIsCustomizerOpen(false)}
          className="p-1 rounded text-stone-400 hover:text-white hover:bg-stone-800 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Content Settings */}
      <div className="flex-1 overflow-y-auto p-4 space-y-5 divide-y divide-stone-800">
        
        {/* Site Identity */}
        <div className="space-y-3 pt-2 first:pt-0">
          <span className="font-semibold text-stone-300 text-xs uppercase tracking-wider block">
            Store Identity
          </span>
          <div>
            <label className="block text-stone-400 text-[11px] mb-1">Store Name</label>
            <input
              type="text"
              value={settings.storeName}
              onChange={(e) => updateSettings({ storeName: e.target.value })}
              className="w-full bg-stone-900 border border-stone-700 rounded px-2.5 py-1.5 text-xs text-white focus:border-pink-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-stone-400 text-[11px] mb-1">Announcement Bar</label>
            <textarea
              rows={2}
              value={settings.announcementText}
              onChange={(e) => updateSettings({ announcementText: e.target.value })}
              className="w-full bg-stone-900 border border-stone-700 rounded px-2.5 py-1.5 text-xs text-white focus:border-pink-500 focus:outline-none resize-none"
            />
          </div>
        </div>

        {/* Mobile Checkout Optimization Features */}
        <div className="space-y-3 pt-4">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-emerald-400 text-xs uppercase tracking-wider flex items-center space-x-1.5">
              <Zap className="w-3.5 h-3.5" />
              <span>Mobile Conversion Boosters</span>
            </span>
          </div>

          <div className="bg-stone-900/80 p-3 rounded-lg border border-stone-800 space-y-3">
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-stone-300 text-xs">Express 1-Tap Apple/Google Pay</span>
              <input
                type="checkbox"
                checked={settings.enableExpressPay}
                onChange={(e) => updateSettings({ enableExpressPay: e.target.checked })}
                className="rounded bg-stone-800 border-stone-700 text-emerald-500 focus:ring-emerald-400"
              />
            </label>

            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-stone-300 text-xs">High-Converting Order Bump</span>
              <input
                type="checkbox"
                checked={settings.enableOrderBump}
                onChange={(e) => updateSettings({ enableOrderBump: e.target.checked })}
                className="rounded bg-stone-800 border-stone-700 text-emerald-500 focus:ring-emerald-400"
              />
            </label>

            <div>
              <div className="flex justify-between text-xs text-stone-300 mb-1">
                <span>Free Shipping Threshold</span>
                <span className="font-mono text-amber-400">${settings.freeShippingThreshold}</span>
              </div>
              <input
                type="range"
                min="50"
                max="300"
                step="25"
                value={settings.freeShippingThreshold}
                onChange={(e) => updateSettings({ freeShippingThreshold: Number(e.target.value) })}
                className="w-full accent-pink-500 cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Elementor Visual Guides */}
        <div className="space-y-3 pt-4">
          <span className="font-semibold text-pink-400 text-xs uppercase tracking-wider flex items-center space-x-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Elementor Layout Mode</span>
          </span>
          <p className="text-stone-400 text-[11px] leading-relaxed">
            Highlights Elementor widget containers, section handles, and responsive breakpoints directly in the layout.
          </p>
          <button
            onClick={() => updateSettings({ isElementorMode: !settings.isElementorMode })}
            className={`w-full py-2 px-3 rounded font-medium text-xs transition-colors cursor-pointer flex items-center justify-center space-x-1.5 ${
              settings.isElementorMode
                ? 'bg-pink-600 hover:bg-pink-700 text-white'
                : 'bg-stone-800 hover:bg-stone-700 text-stone-200'
            }`}
          >
            <span>{settings.isElementorMode ? 'Disable Elementor Guides' : 'Enable Elementor Guides'}</span>
          </button>
        </div>

        {/* Mobile Viewport Simulation */}
        <div className="space-y-3 pt-4">
          <span className="font-semibold text-amber-400 text-xs uppercase tracking-wider flex items-center space-x-1.5">
            <Smartphone className="w-3.5 h-3.5" />
            <span>Device Preview</span>
          </span>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setViewMode('desktop')}
              className={`p-2 rounded text-xs text-center border cursor-pointer ${
                viewMode === 'desktop'
                  ? 'border-blue-500 bg-blue-900/30 text-white font-medium'
                  : 'border-stone-700 bg-stone-900 text-stone-400 hover:text-white'
              }`}
            >
              Desktop
            </button>
            <button
              onClick={() => setViewMode('mobile-preview')}
              className={`p-2 rounded text-xs text-center border cursor-pointer ${
                viewMode === 'mobile-preview'
                  ? 'border-emerald-500 bg-emerald-900/30 text-white font-medium'
                  : 'border-stone-700 bg-stone-900 text-stone-400 hover:text-white'
              }`}
            >
              Mobile (iPhone)
            </button>
          </div>

          {viewMode === 'mobile-preview' && (
            <label className="flex items-center justify-between cursor-pointer pt-1">
              <span className="text-stone-300 text-xs">Thumb Ergonomics Overlay</span>
              <input
                type="checkbox"
                checked={showTouchErgonomics}
                onChange={(e) => setShowTouchErgonomics(e.target.checked)}
                className="rounded bg-stone-800 border-stone-700 text-amber-500 focus:ring-amber-400"
              />
            </label>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="p-3 bg-[#15191c] border-t border-stone-800 flex items-center justify-between">
        <button
          onClick={() => {
            updateSettings({
              storeName: 'ESSENDAAR',
              announcementText: 'ISO 9001:2015 Certified | Tamilnadu Test House Tested Formulation | Chennai Metro 24h Express Dispatch',
              freeShippingThreshold: 499,
              isElementorMode: false,
            });
          }}
          className="text-stone-400 hover:text-stone-200 text-xs flex items-center space-x-1 cursor-pointer"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset Defaults</span>
        </button>

        <button
          onClick={() => setIsCustomizerOpen(false)}
          className="bg-blue-600 hover:bg-blue-500 text-white font-medium px-4 py-1.5 rounded text-xs cursor-pointer"
        >
          Publish Changes
        </button>
      </div>
    </div>
  );
};
