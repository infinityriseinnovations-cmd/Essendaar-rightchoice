import React from 'react';
import { useStore } from '../context/StoreContext';
import { 
  Laptop, 
  Smartphone, 
  Sparkles, 
  Settings2, 
  ShoppingBag, 
  Plus, 
  RefreshCw,
  Eye,
  Sliders
} from 'lucide-react';

export const WpAdminBar: React.FC = () => {
  const { 
    viewMode, 
    setViewMode, 
    showTouchErgonomics, 
    setShowTouchErgonomics,
    settings, 
    updateSettings,
    setIsCustomizerOpen,
    cartCount,
    setCurrentRoute
  } = useStore();

  return (
    <div id="wpadminbar" className="bg-[#1d2327] text-[#c3c4c7] text-xs h-8 flex items-center justify-between px-3 z-50 select-none border-b border-stone-800 font-sans sticky top-0">
      {/* Left WP Toolbar */}
      <div className="flex items-center space-x-3 overflow-x-auto scrollbar-none py-1">
        {/* WordPress Icon */}
        <button 
          onClick={() => setCurrentRoute('home')}
          className="flex items-center space-x-1.5 hover:text-white transition-colors cursor-pointer"
          title="WordPress Admin"
        >
          <div className="w-4 h-4 rounded-full bg-stone-700 flex items-center justify-center font-serif text-[10px] font-bold text-white leading-none">
            W
          </div>
          <span className="font-semibold text-stone-200 hidden sm:inline">{settings.storeName}</span>
        </button>

        <div className="h-3 w-[1px] bg-stone-700 hidden sm:block"></div>

        {/* Edit with Elementor */}
        <button 
          onClick={() => {
            updateSettings({ isElementorMode: !settings.isElementorMode });
          }}
          className={`flex items-center space-x-1 px-2 py-0.5 rounded transition-all cursor-pointer ${
            settings.isElementorMode 
              ? 'bg-[#92003b] text-white font-medium shadow-sm' 
              : 'hover:bg-stone-800 hover:text-pink-400 text-stone-300'
          }`}
          title="Elementor Visual Editor Mode"
        >
          <Sparkles className="w-3 h-3 text-[#f04f85]" />
          <span>{settings.isElementorMode ? 'Elementor Active' : 'Edit with Elementor'}</span>
        </button>

        {/* Customize */}
        <button 
          onClick={() => setIsCustomizerOpen(true)}
          className="flex items-center space-x-1 hover:text-white hover:bg-stone-800 px-2 py-0.5 rounded transition-colors cursor-pointer hidden md:flex"
        >
          <Sliders className="w-3 h-3 text-amber-400" />
          <span>Customize</span>
        </button>

        {/* WooCommerce status badge */}
        <button 
          onClick={() => setCurrentRoute('shop')}
          className="flex items-center space-x-1 hover:text-white hover:bg-stone-800 px-2 py-0.5 rounded transition-colors cursor-pointer hidden lg:flex"
        >
          <ShoppingBag className="w-3 h-3 text-purple-400" />
          <span>WooCommerce</span>
          {cartCount > 0 && (
            <span className="ml-1 bg-purple-600 text-white text-[10px] px-1.5 py-0.2 rounded-full font-bold">
              {cartCount}
            </span>
          )}
        </button>

        {/* Contact Form 7 link */}
        <button 
          onClick={() => setCurrentRoute('contact')}
          className="hover:text-white hover:bg-stone-800 px-2 py-0.5 rounded transition-colors cursor-pointer hidden xl:inline"
        >
          Contact Form 7
        </button>
      </div>

      {/* Right Controls: Device Mode & Mobile Conversion Tools */}
      <div className="flex items-center space-x-2 pl-2">
        <span className="text-[11px] text-stone-400 hidden sm:inline mr-1">Preview Mode:</span>
        
        {/* Desktop Switcher */}
        <button
          onClick={() => setViewMode('desktop')}
          className={`flex items-center space-x-1 px-2 py-1 rounded transition-colors cursor-pointer ${
            viewMode === 'desktop'
              ? 'bg-blue-600 text-white font-medium'
              : 'hover:bg-stone-800 text-stone-400 hover:text-white'
          }`}
          title="Full Desktop Browser View"
        >
          <Laptop className="w-3 h-3" />
          <span className="hidden sm:inline">Desktop</span>
        </button>

        {/* Mobile View Switcher */}
        <button
          onClick={() => setViewMode('mobile-preview')}
          className={`flex items-center space-x-1 px-2 py-1 rounded transition-colors cursor-pointer ${
            viewMode === 'mobile-preview'
              ? 'bg-emerald-600 text-white font-medium shadow-sm'
              : 'hover:bg-stone-800 text-stone-400 hover:text-white'
          }`}
          title="Mobile Device Checkout & Conversion Test View (iPhone 16 Pro Frame)"
        >
          <Smartphone className="w-3 h-3" />
          <span>Mobile Device</span>
        </button>

        {viewMode === 'mobile-preview' && (
          <button
            onClick={() => setShowTouchErgonomics(!showTouchErgonomics)}
            className={`flex items-center space-x-1 px-1.5 py-0.5 rounded text-[10px] transition-colors cursor-pointer ${
              showTouchErgonomics
                ? 'bg-amber-500 text-stone-900 font-bold'
                : 'bg-stone-800 text-amber-300 hover:bg-stone-700'
            }`}
            title="Toggle Thumb-Friendly Touch Zone Overlay for Mobile Conversion"
          >
            <Eye className="w-2.5 h-2.5" />
            <span className="hidden md:inline">Thumb Zone</span>
          </button>
        )}
      </div>
    </div>
  );
};
