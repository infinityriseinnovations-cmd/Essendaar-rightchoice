import React, { useState, useMemo, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { Product } from '../types';
import { 
  Search, 
  ShoppingCart, 
  Eye, 
  Check, 
  Star, 
  Phone, 
  CheckCircle2, 
  ShieldCheck, 
  FlaskConical, 
  SlidersHorizontal, 
  LayoutGrid, 
  List, 
  ArrowRight,
  FileText,
  BadgePercent,
  X,
  Sparkles,
  BookOpen,
  Trophy,
  MessageCircle
} from 'lucide-react';
import { getSingleProductWhatsAppUrl } from '../utils/whatsappOrder';

export const ShopView: React.FC = () => {
  const { 
    products, 
    addToCart, 
    openQuickView, 
    setSelectedProduct, 
    setCurrentRoute,
    shopBrandFilter,
    setShopBrandFilter,
    shopParentCategoryFilter,
    setShopParentCategoryFilter,
    shopSubCategoryFilter,
    setShopSubCategoryFilter
  } = useStore();

  // Filters
  const [selectedParentCategory, setSelectedParentCategory] = useState<string>(shopParentCategoryFilter || 'all');
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>(shopSubCategoryFilter || 'all');
  const [selectedBrand, setSelectedBrand] = useState<string>(shopBrandFilter || 'all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [labTestedOnly, setLabTestedOnly] = useState(false);
  const [maxPrice, setMaxPrice] = useState<number>(3000);
  const [sortBy, setSortBy] = useState<'popularity' | 'rating' | 'price-asc' | 'price-desc'>('popularity');
  const [viewLayout, setViewLayout] = useState<'grid' | 'list'>('grid');
  const [showComboOnly, setShowComboOnly] = useState(false);

  // Sync when external navigation triggers brand/category filter
  useEffect(() => {
    if (shopBrandFilter) {
      setSelectedBrand(shopBrandFilter);
    }
  }, [shopBrandFilter]);

  useEffect(() => {
    if (shopParentCategoryFilter) {
      setSelectedParentCategory(shopParentCategoryFilter);
    }
  }, [shopParentCategoryFilter]);

  useEffect(() => {
    if (shopSubCategoryFilter) {
      setSelectedSubCategory(shopSubCategoryFilter);
    }
  }, [shopSubCategoryFilter]);

  const resetFilters = () => {
    setSelectedParentCategory('all');
    setSelectedSubCategory('all');
    setSelectedBrand('all');
    setShopBrandFilter('all');
    setShopParentCategoryFilter('all');
    setShopSubCategoryFilter('all');
    setSearchQuery('');
    setLabTestedOnly(false);
    setMaxPrice(3000);
    setShowComboOnly(false);
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setCurrentRoute('product');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const parentCategories = [
    { 
      id: 'all', 
      label: 'All Products', 
      slogan: 'Comprehensive institutional and retail catalog',
      count: products.length 
    },
    { 
      id: 'Cleaning Products', 
      label: 'Cleaning Products', 
      slogan: 'Clean Homes. Healthy Lives.',
      icon: Sparkles,
      count: products.filter(p => p.parentCategory === 'Cleaning Products').length,
      subcategories: ['Dishwash & Kitchen Care', 'Laundry & Detergents', 'Floor & Surface Cleaners', 'Toilet & Sanitation', 'Hand Wash & Sanitizers', 'Institutional Drums & Bulk']
    },
    { 
      id: 'Stationery Products', 
      label: 'Stationery Products', 
      slogan: 'Learn Today. Build Tomorrow.',
      icon: BookOpen,
      count: products.filter(p => p.parentCategory === 'Stationery Products').length,
      subcategories: ['School & College Notebooks', 'Registers & Log Books', 'Office Files & Printing Papers']
    },
    { 
      id: 'Sports Products', 
      label: 'Sports Products', 
      slogan: 'Play Healthy. Grow Stronger.',
      icon: Trophy,
      count: products.filter(p => p.parentCategory === 'Sports Products').length,
      subcategories: ['Footballs & Basketballs', 'Volleyballs & Nets', 'Sports Accessories & Training']
    },
    { 
      id: 'Safety Products', 
      label: 'Safety Products', 
      slogan: 'Safety Today. A Safer Tomorrow.',
      icon: ShieldCheck,
      count: products.filter(p => p.parentCategory === 'Safety Products').length,
      subcategories: ['Fire Safety Equipment', 'Helmets & Personal Protection', 'Protective Gloves & Footwear', 'Jackets & High-Vis Vests', 'First Aid Kits & Emergency Signs']
    }
  ];

  const currentParentInfo = parentCategories.find(c => c.id === selectedParentCategory);

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Parent Category
        if (selectedParentCategory !== 'all' && p.parentCategory !== selectedParentCategory) {
          return false;
        }

        // Subcategory
        if (selectedSubCategory !== 'all' && p.subCategory !== selectedSubCategory) {
          return false;
        }

        // Brand
        if (selectedBrand !== 'all' && p.brand !== selectedBrand) {
          return false;
        }

        // Search Query
        if (searchQuery.trim()) {
          const query = searchQuery.toLowerCase();
          const matchName = p.name.toLowerCase().includes(query);
          const matchBrand = p.brand.toLowerCase().includes(query);
          const matchCategory = p.category.toLowerCase().includes(query);
          const matchSub = (p.subCategory || '').toLowerCase().includes(query);
          if (!matchName && !matchBrand && !matchCategory && !matchSub) return false;
        }

        // Lab tested
        if (labTestedOnly && !p.labCertified) return false;

        // Combo only
        if (showComboOnly && !p.freebie) return false;

        // Price
        if (p.price > maxPrice) return false;

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        return b.reviewCount - a.reviewCount; // Popularity
      });
  }, [products, selectedParentCategory, selectedSubCategory, selectedBrand, searchQuery, labTestedOnly, maxPrice, sortBy, showComboOnly]);

  return (
    <div className="w-full bg-[#f8f9ff] min-h-screen pb-16">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex flex-col gap-6">
        
        {/* Breadcrumb & Meta Status Bar */}
        <nav className="flex flex-wrap items-center justify-between gap-4 py-1 text-xs">
          <div className="flex items-center gap-2 text-slate-500 font-medium">
            <button onClick={() => setCurrentRoute('home')} className="hover:text-[#00355f] cursor-pointer">
              Home
            </button>
            <span>/</span>
            <span className="text-[#0A2540] font-bold">Store Catalog</span>
            {selectedParentCategory !== 'all' && (
              <>
                <span>/</span>
                <span className="text-[#006e2d] font-bold">{selectedParentCategory}</span>
              </>
            )}
            {selectedSubCategory !== 'all' && (
              <>
                <span>/</span>
                <span className="text-slate-700">{selectedSubCategory}</span>
              </>
            )}
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#eff4ff] text-[#00355f] text-xs font-semibold border border-slate-200">
              <ShieldCheck className="w-3.5 h-3.5 text-[#006e2d]" />
              <span>Direct Manufacturer Stock &bull; Warehouse: Mangadu, Chennai</span>
            </span>
          </div>
        </nav>

        {/* 4 Main Category Cards Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {parentCategories.filter(c => c.id !== 'all').map((cat) => {
            const Icon = cat.icon || Sparkles;
            const isSelected = selectedParentCategory === cat.id;
            return (
              <div
                key={cat.id}
                onClick={() => {
                  setSelectedParentCategory(isSelected ? 'all' : cat.id);
                  setSelectedSubCategory('all');
                }}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-[#0A2540] text-white border-[#0A2540] shadow-md ring-2 ring-[#006e2d]'
                    : 'bg-white text-slate-800 border-slate-200 hover:border-slate-300 shadow-xs'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isSelected ? 'bg-white/10 text-white' : 'bg-[#eff4ff] text-[#00355f]'}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${isSelected ? 'bg-[#006e2d] text-white' : 'bg-slate-100 text-slate-600'}`}>
                      {cat.count} Items
                    </span>
                  </div>
                  <h3 className="font-bold text-sm font-headline leading-tight">{cat.label}</h3>
                  <p className={`text-[11px] italic mt-1 ${isSelected ? 'text-slate-300' : 'text-slate-500'}`}>
                    "{cat.slogan}"
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Dynamic Category Hero Banner */}
        <section className="relative bg-[#0A2540] rounded-2xl p-6 sm:p-8 text-white shadow-md overflow-hidden">
          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="max-w-3xl flex flex-col gap-2.5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-[#006e2d] text-white text-[10px] font-extrabold uppercase tracking-wide">
                  {selectedParentCategory === 'all' ? 'Consolidated Catalog' : selectedParentCategory}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-white/15 backdrop-blur-md text-white text-[10px] font-bold flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-[#006e2d]" />
                  ISO 9001:2015 Certified
                </span>
                {selectedParentCategory === 'Cleaning Products' && (
                  <span className="px-2.5 py-0.5 rounded-full bg-white/15 backdrop-blur-md text-white text-[10px] font-bold flex items-center gap-1">
                    <FlaskConical className="w-3 h-3 text-sky-300" />
                    Tamilnadu Test House Certified
                  </span>
                )}
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-headline font-bold text-white tracking-tight">
                {selectedParentCategory === 'all' ? 'All Essendaar Products & Institutional Supplies' : selectedParentCategory}
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                {currentParentInfo ? `"${currentParentInfo.slogan}" — ` : ''}
                Direct manufacturer and institutional procurement rates for schools, universities, offices, hospitals, and residential households across South India.
              </p>
            </div>

            {/* Search Bar in Banner */}
            <div className="w-full lg:w-80">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search products, brands, SKU..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white/10 text-white placeholder-slate-400 text-xs rounded-xl pl-9 pr-8 py-3 border border-white/20 focus:outline-none focus:bg-white/20"
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Subcategories Pill Strip (When a Parent Category is Selected) */}
        {selectedParentCategory !== 'all' && currentParentInfo?.subcategories && (
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap mr-2">
              Subcategories:
            </span>
            <button
              onClick={() => setSelectedSubCategory('all')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                selectedSubCategory === 'all'
                  ? 'bg-[#00355f] text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              All in {selectedParentCategory}
            </button>
            {currentParentInfo.subcategories.map((sub) => (
              <button
                key={sub}
                onClick={() => setSelectedSubCategory(selectedSubCategory === sub ? 'all' : sub)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  selectedSubCategory === sub
                    ? 'bg-[#006e2d] text-white shadow-xs'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {sub}
              </button>
            ))}
          </div>
        )}

        {/* Main 2-Column Catalog Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-2">
          
          {/* Left Sidebar (3 cols) */}
          <aside className="lg:col-span-3 flex flex-col gap-5 w-full">
            
            {/* Filter Container */}
            <div className="bg-white rounded-2xl p-5 shadow-xs border border-slate-200 flex flex-col gap-5">
              
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-[#00355f]" />
                  <h2 className="font-headline font-bold text-sm text-[#0A2540]">Filter Catalog</h2>
                </div>
                <button
                  onClick={resetFilters}
                  className="text-slate-500 hover:text-rose-600 text-xs font-semibold underline transition-colors cursor-pointer"
                >
                  Clear All
                </button>
              </div>

              {/* Lab Certification Guarantee Pill */}
              <div className="p-3 rounded-xl bg-[#F0FDF4] border border-emerald-200 flex flex-col gap-1.5">
                <label className="flex items-start gap-2.5 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={labTestedOnly}
                    onChange={(e) => setLabTestedOnly(e.target.checked)}
                    className="mt-0.5 h-4 w-4 rounded text-[#006e2d] focus:ring-[#006e2d] accent-[#006e2d] cursor-pointer"
                  />
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-[#14532D] flex items-center gap-1">
                      <span>Lab Tested / ISI Certified Only</span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#006e2d]" />
                    </span>
                    <span className="text-[11px] text-slate-600 leading-tight">
                      Show verified Tamilnadu Test House &amp; ISI standard products.
                    </span>
                  </div>
                </label>
              </div>

              {/* Special Combos Filter */}
              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 flex flex-col gap-1.5">
                <label className="flex items-start gap-2.5 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={showComboOnly}
                    onChange={(e) => setShowComboOnly(e.target.checked)}
                    className="mt-0.5 h-4 w-4 rounded text-amber-600 focus:ring-amber-500 accent-amber-600 cursor-pointer"
                  />
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-amber-900 flex items-center gap-1">
                      <span>Promotional Combos with Free Gifts</span>
                      <BadgePercent className="w-3.5 h-3.5 text-amber-600" />
                    </span>
                    <span className="text-[11px] text-amber-700 leading-tight">
                      Show items with free scrub pads, sponges, and pump needles.
                    </span>
                  </div>
                </label>
              </div>

              {/* Parent Categories Tree */}
              <div className="flex flex-col gap-2.5">
                <span className="text-xs font-bold text-[#0A2540] uppercase tracking-wider font-headline">
                  Select Department
                </span>
                
                <ul className="space-y-1 text-xs font-medium">
                  {parentCategories.map((cat) => (
                    <li key={cat.id}>
                      <button
                        onClick={() => {
                          setSelectedParentCategory(cat.id);
                          setSelectedSubCategory('all');
                        }}
                        className={`w-full flex items-center justify-between p-2 rounded-lg transition-colors cursor-pointer text-left ${
                          selectedParentCategory === cat.id
                            ? 'bg-[#eff4ff] font-bold text-[#00355f] border border-blue-200'
                            : 'text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <span className={`w-1.5 h-1.5 rounded-full ${selectedParentCategory === cat.id ? 'bg-[#00355f]' : 'bg-slate-300'}`} />
                          <span>{cat.label}</span>
                        </span>
                        <span className="text-[11px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">
                          {cat.count}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Brand Filter */}
              <div className="flex flex-col gap-2.5 pt-2 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#0A2540] uppercase tracking-wider font-headline">
                    Featured Brands
                  </span>
                  {selectedBrand !== 'all' && (
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedBrand('all');
                        setShopBrandFilter('all');
                      }}
                      className="text-[10px] text-rose-600 font-bold hover:underline cursor-pointer"
                    >
                      Reset
                    </button>
                  )}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {['all', 'BOZZ', 'MORNING SHINE', 'SKY FRESH', 'POWER RIDE', 'ESSENDAAR BULK'].map((b) => (
                    <button
                      key={b}
                      type="button"
                      onClick={() => {
                        setSelectedBrand(b);
                        setShopBrandFilter(b);
                      }}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                        selectedBrand === b
                          ? 'bg-[#00355f] text-white shadow-xs'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {b === 'all' ? 'All Brands' : b}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range Slider */}
              <div className="flex flex-col gap-2.5 pt-2 border-t border-slate-100">
                <div className="flex justify-between items-center text-xs font-semibold">
                  <span className="text-slate-700 uppercase tracking-wider">Max Price</span>
                  <span className="text-[#00355f] font-bold font-headline">₹{maxPrice}</span>
                </div>
                <input
                  type="range"
                  min={30}
                  max={3000}
                  step={20}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-[#00355f] cursor-pointer"
                />
              </div>

            </div>
          </aside>

          {/* Right Product Grid Area (9 cols) */}
          <main className="lg:col-span-9 flex flex-col gap-6">
            
            {/* Controls Bar: Count, Sort, View toggle */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
              <div className="text-xs text-slate-600">
                Showing <strong className="text-slate-900">{filteredProducts.length}</strong> of{' '}
                <strong className="text-slate-900">{products.length}</strong> products
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-slate-500 font-medium">Sort by:</span>
                  <select
                    value={sortBy}
                    onChange={(e: any) => setSortBy(e.target.value)}
                    className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 font-semibold text-slate-800 focus:outline-none"
                  >
                    <option value="popularity">Popularity / Bestselling</option>
                    <option value="rating">Highest Rated</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                  </select>
                </div>

                <div className="flex items-center border border-slate-200 rounded-lg p-0.5 bg-slate-50">
                  <button
                    onClick={() => setViewLayout('grid')}
                    className={`p-1.5 rounded cursor-pointer ${
                      viewLayout === 'grid' ? 'bg-white shadow-xs text-[#00355f]' : 'text-slate-400'
                    }`}
                    title="Grid View"
                  >
                    <LayoutGrid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewLayout('list')}
                    className={`p-1.5 rounded cursor-pointer ${
                      viewLayout === 'list' ? 'bg-white shadow-xs text-[#00355f]' : 'text-slate-400'
                    }`}
                    title="List View"
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Products Listing */}
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 shadow-xs flex flex-col items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                  <Search className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold font-headline text-slate-800">No matching products found</h3>
                <p className="text-xs text-slate-500 max-w-sm">
                  Try adjusting your category filter, price slider, or clearing the search query.
                </p>
                <button
                  onClick={resetFilters}
                  className="px-4 py-2 bg-[#00355f] text-white rounded-xl text-xs font-bold hover:bg-[#0A2540] transition-colors cursor-pointer"
                >
                  Reset All Filters
                </button>
              </div>
            ) : viewLayout === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between group"
                  >
                    <div className="p-4 pb-0 relative">
                      <div className="absolute top-6 left-6 z-10 flex flex-col gap-1">
                        <span className="bg-[#0A2540] text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-xs">
                          {product.packSize}
                        </span>
                        {product.badge && (
                          <span className="bg-[#006e2d] text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-xs">
                            {product.badge}
                          </span>
                        )}
                      </div>

                      <div
                        onClick={() => handleProductClick(product)}
                        className="w-full aspect-square bg-[#eff4ff] rounded-xl overflow-hidden cursor-pointer flex items-center justify-center p-3"
                      >
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    </div>

                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#006e2d]">
                            {product.brand}
                          </span>
                          <div className="flex items-center gap-1 text-amber-500 font-bold text-xs">
                            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                            <span>{product.rating}</span>
                          </div>
                        </div>

                        <h3
                          onClick={() => handleProductClick(product)}
                          className="text-sm font-bold font-headline text-slate-900 cursor-pointer hover:text-[#00355f] line-clamp-2 leading-snug"
                        >
                          {product.name}
                        </h3>
                        <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                          {product.shortDescription}
                        </p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                        <div>
                          <span className="text-base font-black text-[#00355f]">₹{product.price}</span>
                          {product.regularPrice > product.price && (
                            <span className="text-xs text-slate-400 line-through ml-1.5">
                              ₹{product.regularPrice}
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => addToCart(product, 1)}
                            className="px-3.5 py-2 bg-[#006e2d] hover:bg-[#14532D] text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                          >
                            <ShoppingCart className="w-3.5 h-3.5" />
                            <span>Add</span>
                          </button>
                          <a
                            href={getSingleProductWhatsAppUrl({
                              productName: product.name,
                              brand: product.brand,
                              packSize: product.variants?.[0]?.size || product.packSize,
                              quantity: 1,
                              unitPrice: product.price,
                              freebie: product.freebie
                            })}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-[#25D366]/15 hover:bg-[#25D366] text-emerald-800 hover:text-slate-950 rounded-xl transition-all cursor-pointer flex items-center justify-center"
                            title="Quick Order on WhatsApp"
                          >
                            <MessageCircle className="w-3.5 h-3.5 fill-current" />
                          </a>
                          <button
                            onClick={() => openQuickView(product)}
                            className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-colors cursor-pointer"
                            title="Quick View"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* List View */
              <div className="flex flex-col gap-4">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs hover:shadow-md transition-shadow flex flex-col sm:flex-row items-center gap-6"
                  >
                    <div
                      onClick={() => handleProductClick(product)}
                      className="w-full sm:w-44 aspect-square bg-[#eff4ff] rounded-xl overflow-hidden cursor-pointer flex items-center justify-center p-3 shrink-0"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-contain"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    <div className="flex-1 flex flex-col justify-between w-full">
                      <div>
                        <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#006e2d]">
                            {product.brand} &bull; {product.subCategory || product.category}
                          </span>
                          <div className="flex items-center gap-1 text-amber-500 font-bold text-xs">
                            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                            <span>{product.rating} ({product.reviewCount} reviews)</span>
                          </div>
                        </div>

                        <h3
                          onClick={() => handleProductClick(product)}
                          className="text-base font-bold font-headline text-slate-900 cursor-pointer hover:text-[#00355f]"
                        >
                          {product.name}
                        </h3>
                        <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                          {product.description || product.shortDescription}
                        </p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                        <div>
                          <span className="text-lg font-black text-[#00355f]">₹{product.price}</span>
                          {product.regularPrice > product.price && (
                            <span className="text-xs text-slate-400 line-through ml-2">
                              ₹{product.regularPrice}
                            </span>
                          )}
                          <span className="text-xs text-[#006e2d] font-bold ml-3">
                            {product.stockStatus}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => addToCart(product, 1)}
                            className="px-4 py-2 bg-[#006e2d] hover:bg-[#14532D] text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                          >
                            <ShoppingCart className="w-3.5 h-3.5" />
                            <span>Add to Cart</span>
                          </button>
                          <a
                            href={getSingleProductWhatsAppUrl({
                              productName: product.name,
                              brand: product.brand,
                              packSize: product.variants?.[0]?.size || product.packSize,
                              quantity: 1,
                              unitPrice: product.price,
                              freebie: product.freebie
                            })}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3.5 py-2 bg-[#25D366] hover:bg-[#20bd5a] text-slate-950 font-bold text-xs rounded-xl flex items-center gap-1.5 transition-all cursor-pointer border border-[#1ebd5c]"
                            title="Quick Order on WhatsApp"
                          >
                            <MessageCircle className="w-3.5 h-3.5 fill-slate-950" />
                            <span>WhatsApp Order</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

          </main>
        </div>

      </div>
    </div>
  );
};
