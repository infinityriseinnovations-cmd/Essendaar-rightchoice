import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { EssendaarLogo } from './EssendaarLogo';
import { 
  Search, 
  User, 
  Heart, 
  ShoppingBag, 
  Menu, 
  X
} from 'lucide-react';

export const Header: React.FC = () => {
  const { 
    currentRoute, 
    setCurrentRoute, 
    cartCount, 
    cartTotal, 
    setIsCartDrawerOpen, 
    setIsSearchOpen,
    settings,
    currentUser,
    openAuthModal,
    isAdminLoggedIn
  } = useStore();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All Categories');

  const navLinks = [
    { label: 'Home', route: 'home' as const },
    { label: 'Shop Catalog', route: 'shop' as const },
    { label: 'Home Care', route: 'home-care-cleaning' as const },
    { label: 'Facility Management', route: 'facility-management' as const },
    { label: 'Manpower Support', route: 'manpower-support' as const },
    { label: 'Institutional Supplies', route: 'institutional-supplies' as const },
    { label: 'About Us', route: 'about-us' as const },
    { label: 'Contact / B2B Quote', route: 'contact' as const },
  ];

  return (
    <header className="w-full bg-white shadow-[0_1px_8px_rgba(0,0,0,0.06)] z-40">
      {/* Main Header Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
        <div className="flex items-center justify-between gap-4">
          
          {/* Logo */}
          <button
            onClick={() => setCurrentRoute('home')}
            className="flex items-center cursor-pointer text-left focus:outline-none"
          >
            <EssendaarLogo />
          </button>

          {/* Desktop Search with Categories dropdown */}
          <div className="hidden md:flex flex-1 max-w-xl mx-4 items-center">
            <div className="flex w-full items-center bg-[#eff4ff] rounded-lg p-1 border border-[#E2E8F0] shadow-xs">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-transparent text-[#42474f] text-xs font-semibold px-2 py-1.5 focus:outline-none cursor-pointer border-r border-slate-300 pr-4"
              >
                <option>All Categories</option>
                <option>Home Care</option>
                <option>Laundry Care</option>
                <option>Kitchen Care</option>
                <option>Surface &amp; Vehicle Care</option>
                <option>Toilet Care</option>
                <option>Facility Supplies</option>
              </select>

              <input
                type="text"
                placeholder="Search cleaning supplies, institutional packs, chemicals..."
                onClick={() => setIsSearchOpen(true)}
                readOnly
                className="w-full bg-transparent px-3 text-xs text-[#0b1c30] placeholder:text-[#475569] focus:outline-none cursor-pointer"
              />

              <button
                type="button"
                onClick={() => setIsSearchOpen(true)}
                className="p-2 bg-[#00355f] text-white rounded-lg flex items-center justify-center hover:bg-[#0f4c81] transition-colors cursor-pointer"
                title="Search Products"
              >
                <Search className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* User actions: Account, Wishlist, Cart, Institutional CTA */}
          <div className="flex items-center gap-3">
            
            {currentUser ? (
              <button
                onClick={() => setCurrentRoute('customer-dashboard')}
                className="hidden sm:flex items-center gap-1.5 text-xs text-[#00355f] hover:text-[#0A2540] font-bold transition-colors cursor-pointer bg-sky-50 px-2.5 py-1.5 rounded-lg border border-sky-200"
              >
                <div className="w-5 h-5 rounded-full bg-[#00355f] text-white flex items-center justify-center text-[10px] font-bold">
                  {currentUser.name.charAt(0)}
                </div>
                <span>{currentUser.name.split(' ')[0]} (Portal)</span>
              </button>
            ) : (
              <button
                onClick={() => openAuthModal('login')}
                className="hidden sm:flex items-center gap-1.5 text-xs text-[#42474f] hover:text-[#00355f] font-semibold transition-colors cursor-pointer"
              >
                <User className="w-4 h-4" />
                <span>Account</span>
              </button>
            )}

            <button
              onClick={() => setCurrentRoute('shop')}
              className="p-2 text-[#42474f] hover:text-[#00355f] transition-colors relative cursor-pointer"
              title="Wishlist"
            >
              <Heart className="w-5 h-5" />
            </button>

            {/* Cart Button */}
            <button
              onClick={() => setIsCartDrawerOpen(true)}
              className="flex items-center gap-2 bg-[#eff4ff] hover:bg-[#e5eeff] px-3 py-1.5 rounded-lg transition-colors cursor-pointer border border-[#E2E8F0]"
            >
              <div className="relative">
                <ShoppingBag className="w-5 h-5 text-[#00355f]" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#006e2d] text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full min-w-[18px] text-center">
                    {cartCount}
                  </span>
                )}
              </div>

              <div className="hidden xl:flex flex-col text-left">
                <span className="text-[10px] text-slate-500 font-semibold uppercase leading-none">
                  {cartCount > 0 ? 'Total' : 'Cart'}
                </span>
                <span className="text-xs font-bold text-[#00355f]">
                  {cartCount > 0 ? `₹${cartTotal}` : '₹0'}
                </span>
              </div>
            </button>

            {/* Institutional Quote Pill */}
            <button
              onClick={() => setCurrentRoute('contact')}
              className="hidden lg:inline-flex items-center justify-center px-3.5 py-2 rounded-lg bg-[#006e2d] hover:bg-[#14532D] text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
            >
              Get Institutional Quote
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-700 hover:text-slate-900 cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

          </div>

        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7 pt-3 mt-1 border-t border-slate-100 text-xs font-semibold">
          {navLinks.map((item) => (
            <button
              key={item.route}
              onClick={() => setCurrentRoute(item.route)}
              className={`transition-colors py-1 cursor-pointer ${
                currentRoute === item.route
                  ? 'text-[#00355f] font-bold border-b-2 border-[#00355f]'
                  : 'text-[#42474f] hover:text-[#00355f]'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden pt-4 pb-3 border-t border-slate-200 mt-3 space-y-2 animate-in fade-in">
            {/* Mobile search bar */}
            <div className="pb-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsSearchOpen(true);
                }}
                className="w-full py-2.5 px-3 bg-[#eff4ff] rounded-lg border border-slate-200 text-xs text-slate-500 flex items-center justify-between"
              >
                <span>Search cleaning products, chemicals...</span>
                <Search className="w-4 h-4 text-slate-400" />
              </button>
            </div>

            <div className="grid grid-cols-1 gap-1 text-xs font-semibold">
              {currentUser ? (
                <button
                  onClick={() => {
                    setCurrentRoute('customer-dashboard');
                    setMobileMenuOpen(false);
                  }}
                  className="text-left px-3 py-2.5 rounded-lg bg-emerald-50 text-emerald-800 font-bold border border-emerald-200 flex items-center justify-between"
                >
                  <span>👤 My Account Dashboard ({currentUser.name})</span>
                  <span className="text-[10px] bg-emerald-600 text-white px-2 py-0.5 rounded-full font-bold">Active</span>
                </button>
              ) : (
                <button
                  onClick={() => {
                    openAuthModal('login');
                    setMobileMenuOpen(false);
                  }}
                  className="text-left px-3 py-2.5 rounded-lg bg-sky-50 text-[#00355f] font-bold border border-sky-200 flex items-center justify-between"
                >
                  <span>🔑 Customer Sign In / Register (OTP)</span>
                  <span className="text-[10px] bg-[#00355f] text-white px-2 py-0.5 rounded-full font-bold">Email OTP</span>
                </button>
              )}

              {navLinks.map((item) => (
                <button
                  key={item.route}
                  onClick={() => {
                    setCurrentRoute(item.route);
                    setMobileMenuOpen(false);
                  }}
                  className={`text-left px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                    currentRoute === item.route
                      ? 'bg-[#eff4ff] text-[#00355f] font-bold'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {item.label}
                </button>
              ))}

              <button
                onClick={() => {
                  setCurrentRoute('contact');
                  setMobileMenuOpen(false);
                }}
                className="mt-2 w-full py-2.5 px-3 rounded-lg bg-[#006e2d] text-white font-bold text-center"
              >
                Get Institutional Quote
              </button>
            </div>
          </div>
        )}

      </div>
    </header>
  );
};
