import React, { useEffect, useRef, useState } from 'react';
import { useStore } from '../context/StoreContext';
import { products } from '../data/products';
import { Search, X, ArrowRight, Star } from 'lucide-react';

export const SearchModal: React.FC = () => {
  const { 
    isSearchOpen, 
    setIsSearchOpen, 
    setSelectedProduct, 
    setCurrentRoute 
  } = useStore();
  
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isSearchOpen]);

  // Keyboard shortcut cmd+k / ctrl+k
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
      if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, setIsSearchOpen]);

  if (!isSearchOpen) return null;

  const filtered = query.trim()
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.brand.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase()) ||
          p.shortDescription.toLowerCase().includes(query.toLowerCase())
      )
    : products.slice(0, 5);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 md:p-20">
      <div 
        onClick={() => setIsSearchOpen(false)}
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
      />

      <div className="relative max-w-2xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200">
        {/* Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-200 bg-[#eff4ff]">
          <Search className="w-5 h-5 text-[#00355f] mr-3 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search cleaning supplies, institutional packs, chemicals..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full text-sm placeholder-slate-400 text-[#0A2540] bg-transparent focus:outline-none"
          />
          <button
            onClick={() => setIsSearchOpen(false)}
            className="p-1 text-slate-400 hover:text-slate-700 rounded-md cursor-pointer ml-2"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results */}
        <div className="max-h-96 overflow-y-auto p-4 divide-y divide-slate-100">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2 font-headline">
            {query ? `Products matching "${query}"` : 'Popular Recommendations'}
          </div>

          {filtered.length === 0 ? (
            <div className="py-8 text-center text-slate-500 text-sm">
              No products found for "{query}". Try "dishwash", "detergent", "floor cleaner", or "5L".
            </div>
          ) : (
            filtered.map((product) => (
              <div
                key={product.id}
                onClick={() => {
                  setSelectedProduct(product);
                  setCurrentRoute('product');
                  setIsSearchOpen(false);
                }}
                className="py-3 flex items-center justify-between group hover:bg-[#eff4ff] px-2 rounded-xl cursor-pointer transition-colors"
              >
                <div className="flex items-center space-x-3.5">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-12 h-12 rounded-lg object-contain bg-[#eff4ff] p-1 border border-slate-200"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-[#0A2540] font-headline group-hover:text-[#00355f]">
                      {product.name}
                    </h4>
                    <div className="flex items-center space-x-2 text-xs text-slate-500 mt-0.5">
                      <span className="bg-slate-100 px-1.5 py-0.5 rounded text-[10px] text-[#00355f] font-bold">
                        {product.brand}
                      </span>
                      <span className="text-[11px] text-slate-400 font-medium">
                        {product.packSize}
                      </span>
                      <span className="flex items-center text-amber-500">
                        <Star className="w-3 h-3 fill-current inline mr-0.5" />
                        {product.rating}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <span className="text-sm font-bold text-[#00355f] font-headline">
                    ₹{product.price}
                  </span>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#00355f] group-hover:translate-x-0.5 transition-all" />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
