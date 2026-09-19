import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { Product } from '../types';
import { 
  ShieldCheck, 
  FlaskConical, 
  ShoppingCart, 
  Heart, 
  Share2, 
  Star, 
  Truck, 
  Sparkles, 
  CheckCircle2, 
  ArrowLeft,
  FileCheck,
  Building2,
  Phone,
  Flame,
  Zap,
  Info,
  Layers,
  ChevronRight,
  RefreshCw,
  ImageIcon,
  MessageCircle
} from 'lucide-react';
import { getSingleProductWhatsAppUrl } from '../utils/whatsappOrder';

export const ProductView: React.FC = () => {
  const { selectedProduct, products, addToCart, setCurrentRoute, setSelectedProduct, setIsCartDrawerOpen, isLoadingLiveProduct } = useStore();
  const product: Product = selectedProduct || products[0];

  const [activeImage, setActiveImage] = useState<string>(product.image);
  const [selectedVariantSize, setSelectedVariantSize] = useState<string>(
    product.variants?.[0]?.size || product.packSize
  );
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'desc' | 'usage' | 'safety' | 'reviews'>('desc');
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    setActiveImage(product.image);
    setSelectedVariantSize(product.variants?.[0]?.size || product.packSize);
  }, [product.image, product.id]);

  const matchedVariant = product.variants?.find((v) => v.size === selectedVariantSize);
  const currentVariant = {
    size: matchedVariant?.size || product.packSize,
    price: matchedVariant?.price || product.price,
    regularPrice: matchedVariant?.mrp || matchedVariant?.regularPrice || product.regularPrice,
    mrp: matchedVariant?.mrp || matchedVariant?.regularPrice || product.regularPrice,
    sku: matchedVariant?.sku || product.sku,
    weight: matchedVariant?.weight || product.weight,
    dimensions: matchedVariant?.dimensions || product.dimensions,
    gift: matchedVariant?.gift || product.freebie,
    note: matchedVariant?.note,
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, currentVariant);
    setIsCartDrawerOpen(false);
    setCurrentRoute('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const relatedProducts = products
    .filter((p) => p.id !== product.id && (p.category === product.category || p.brand === product.brand))
    .slice(0, 4);

  const galleryImages = Array.from(new Set([product.image, ...(product.gallery || [])])).filter(Boolean);

  return (
    <div className="w-full bg-[#f8f9ff] min-h-screen pb-16">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex flex-col gap-6">
        
        {/* Breadcrumb & Navigation */}
        <nav className="flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2 text-slate-500 font-medium">
            <button onClick={() => setCurrentRoute('home')} className="hover:text-[#00355f] cursor-pointer">
              Home
            </button>
            <span>/</span>
            <button onClick={() => setCurrentRoute('shop')} className="hover:text-[#00355f] cursor-pointer">
              {product.category}
            </button>
            <span>/</span>
            <span className="text-[#0A2540] font-bold">{product.name}</span>
          </div>

          <div className="flex items-center gap-3">
            {isLoadingLiveProduct && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 text-[11px] font-semibold animate-pulse border border-blue-200">
                <RefreshCw className="w-3 h-3 animate-spin" />
                <span>Syncing live WooCommerce data...</span>
              </span>
            )}
            <button
              onClick={() => setCurrentRoute('shop')}
              className="inline-flex items-center gap-1.5 text-xs text-[#00355f] hover:underline font-semibold cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Products</span>
            </button>
          </div>
        </nav>

        {/* Product Details Main Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xs border border-slate-200">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* Left Gallery / Main Image */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              <div className="relative bg-[#eff4ff] rounded-2xl p-6 flex items-center justify-center border border-slate-200/80 overflow-hidden min-h-[340px]">
                {product.freebie && (
                  <div className="absolute top-4 left-4 z-10 flex flex-col gap-1">
                    <span className="bg-amber-400 text-slate-950 px-3 py-1 rounded-md text-xs font-black uppercase tracking-wider shadow-xs flex items-center gap-1">
                      <Flame className="w-3.5 h-3.5" />
                      <span>{product.freebie}</span>
                    </span>
                  </div>
                )}

                <img
                  src={activeImage || product.image}
                  alt={product.name}
                  className="w-full max-h-96 object-contain hover:scale-105 transition-transform duration-300 rounded-lg"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    // Fallback in case of broken remote image
                    (e.target as HTMLImageElement).src = 'https://lh3.googleusercontent.com/aida-public/AB6AXuCWsqgCY-jIhZJv6Okv_M4F_bRMGmEwd9HhZ8Pwwv1wIZWBGzCmPegx9mE5ld8MYDnee9JDiR8IZHwpMqCbz1A3A9HilUlvpoHjLwKbOprquqRRgS9DBvehTZpPGbdsXfDWWccSZjIVqKrc4BhVST623U6qF_9-I4sHkseS4RtyjjA-Z19ju2MuIKmIZjfBbRg7LXVZvcy-dqXOapJ7hc5HPQvm4Fda9BIUsYAWmgen30EOiwHLESUK5A';
                  }}
                />
              </div>

              {/* Gallery Thumbnails */}
              {galleryImages.length > 1 && (
                <div className="flex items-center gap-3 overflow-x-auto pb-2">
                  {galleryImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImage(img)}
                      className={`w-16 h-16 rounded-xl border-2 p-1 overflow-hidden transition-all bg-[#eff4ff] shrink-0 cursor-pointer ${
                        activeImage === img ? 'border-[#00355f] ring-2 ring-[#00355f]/20' : 'border-slate-200 hover:border-slate-400'
                      }`}
                    >
                      <img src={img} alt={`${product.name} ${idx + 1}`} className="w-full h-full object-contain" />
                    </button>
                  ))}
                </div>
              )}

              {/* Lab Certification Guarantee Stamp */}
              <div className="p-4 rounded-xl bg-[#F0FDF4] border border-emerald-200 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 shrink-0">
                  <FlaskConical className="w-5 h-5" />
                </div>
                <div className="flex flex-col text-xs text-slate-700">
                  <span className="font-bold text-[#14532D] font-headline">
                    {product.certificationTitle || 'Tamilnadu Test House Certified Formulation'}
                  </span>
                  <span className="text-[11px] text-slate-500">
                    {product.certificationText || 'Tested for skin biocompatibility, non-corrosive properties, and zero harmful residue.'}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Product Details & Buy Box */}
            <div className="lg:col-span-7 flex flex-col gap-5">
              
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#00355f] text-white text-[10px] font-bold uppercase tracking-wider font-headline">
                    {product.brand}
                  </span>
                  <span className="text-xs text-slate-400">·</span>
                  <span className="text-xs font-semibold text-[#006e2d] flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{product.stockStatus || 'In Stock (Chennai Warehouse)'} · Ready to Dispatch in 24 Hrs</span>
                  </span>
                </div>

                <h1 className="text-2xl sm:text-3xl font-headline font-bold text-[#0A2540] tracking-tight">
                  {product.name}
                </h1>

                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 mt-2">
                  <div className="flex items-center gap-1 text-amber-500 font-bold">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span>{product.rating}</span>
                    <span className="text-slate-400 font-normal">({product.reviewCount} Reviews)</span>
                  </div>
                  <span>·</span>
                  <span>SKU: <strong className="text-slate-700 font-mono">{currentVariant.sku}</strong></span>
                  <span>·</span>
                  <span>Category: <strong className="text-slate-700">{product.category}</strong></span>
                  {currentVariant.weight && (
                    <>
                      <span>·</span>
                      <span>Weight: <strong className="text-slate-700">{currentVariant.weight}</strong></span>
                    </>
                  )}
                  {currentVariant.dimensions && (
                    <>
                      <span>·</span>
                      <span>Dimensions: <strong className="text-slate-700">{currentVariant.dimensions}</strong></span>
                    </>
                  )}
                </div>

                {/* Live WooCommerce Short Description */}
                {product.shortDescription && (
                  <div className="mt-3 text-xs sm:text-sm text-slate-600 bg-slate-50 p-3.5 rounded-xl border border-slate-200/80 leading-relaxed">
                    {product.shortDescription}
                  </div>
                )}
              </div>

              {/* Combo Highlight Banner */}
              {(product.freebie || product.comboOfferText) && (
                <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-300 flex items-center gap-3">
                  <Sparkles className="w-5 h-5 text-amber-600 shrink-0" />
                  <div className="flex flex-col text-xs">
                    <span className="font-bold text-amber-900 font-headline">
                      {product.freebie ? `Special Offer: ${product.freebie}` : 'Special Combo Offer Included'}
                    </span>
                    <span className="text-amber-800 text-[11px]">
                      {product.comboOfferText || 'Comes with 1x Heavy-Duty Scrub Pad & High-Absorption Sponge worth ₹25 packed free of charge!'}
                    </span>
                  </div>
                </div>
              )}

              {/* Pricing Box */}
              <div className="bg-[#eff4ff] p-4 sm:p-5 rounded-2xl border border-slate-200">
                <div className="flex flex-wrap items-baseline gap-3">
                  <span className="text-3xl font-headline font-black text-[#00355f]">
                    ₹{currentVariant.price}
                  </span>
                  {currentVariant.regularPrice > currentVariant.price && (
                    <>
                      <span className="text-sm text-slate-400 line-through">
                        ₹{currentVariant.regularPrice}
                      </span>
                      <span className="px-2.5 py-1 rounded bg-[#006e2d] text-white text-xs font-bold">
                        Save ₹{currentVariant.regularPrice - currentVariant.price} ({Math.round(((currentVariant.regularPrice - currentVariant.price) / currentVariant.regularPrice) * 100)}% OFF)
                      </span>
                    </>
                  )}
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  Inclusive of all taxes &amp; GST. Free Express Delivery in Chennai on orders above ₹499.
                </p>
              </div>

              {/* Variants Selector */}
              {product.variants && product.variants.length > 1 && (
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-[#0A2540] uppercase tracking-wide font-headline">
                      Select Pack Size / Configuration
                    </span>
                    <span className="text-slate-500 font-mono text-[11px]">
                      Selected: {currentVariant.size}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {product.variants.map((v) => (
                      <button
                        key={v.size}
                        onClick={() => setSelectedVariantSize(v.size)}
                        className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                          selectedVariantSize === v.size
                            ? 'border-[#00355f] bg-[#eff4ff] ring-2 ring-[#00355f]/20'
                            : 'border-slate-200 hover:border-slate-300 bg-white'
                        }`}
                      >
                        <span className="text-xs font-bold text-[#0A2540] block">{v.size}</span>
                        <span className="text-xs font-headline font-bold text-[#00355f] mt-1">₹{v.price}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Selector, Add to Cart & WhatsApp Quick Order */}
              <div className="flex flex-col gap-3 pt-2">
                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <div className="flex items-center bg-slate-100 rounded-xl p-1 border border-slate-200 w-full sm:w-auto">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 flex items-center justify-center font-bold text-slate-700 hover:bg-white rounded-lg transition-colors cursor-pointer"
                    >
                      -
                    </button>
                    <span className="w-12 text-center text-sm font-bold text-[#0A2540]">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-10 h-10 flex items-center justify-center font-bold text-slate-700 hover:bg-white rounded-lg transition-colors cursor-pointer"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => addToCart(product, quantity, currentVariant)}
                    className="w-full sm:flex-1 py-3.5 px-6 rounded-xl bg-[#006e2d] hover:bg-[#14532D] text-white text-sm font-bold flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    <span>Add to Cart - ₹{currentVariant.price * quantity}</span>
                  </button>

                  <button
                    onClick={handleBuyNow}
                    className="w-full sm:w-auto py-3.5 px-6 rounded-xl bg-[#0A2540] hover:bg-[#00355f] text-white text-sm font-bold flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
                  >
                    <Zap className="w-4 h-4 text-amber-400" />
                    <span>Express Buy Now</span>
                  </button>
                </div>

                {/* WhatsApp Quick Order Fast-Track */}
                <a
                  href={getSingleProductWhatsAppUrl({
                    productName: product.name,
                    brand: product.brand,
                    packSize: currentVariant.size,
                    quantity,
                    unitPrice: currentVariant.price,
                    freebie: product.freebie
                  })}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-slate-950 font-headline font-black text-xs sm:text-sm flex items-center justify-center gap-2.5 shadow-xs transition-all cursor-pointer border border-[#1ebd5c]"
                  title="Direct order via WhatsApp hotline: +91 97879 79757"
                >
                  <MessageCircle className="w-4 h-4 fill-slate-950 text-[#25D366]" />
                  <span>Order via WhatsApp (Instant Dispatch Hotline)</span>
                </a>
              </div>

              {/* Quality & Clinical Safety Highlights (4 Badges) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-slate-100 text-xs">
                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-[#f8f9ff] border border-slate-200/80">
                  <ShieldCheck className="w-4 h-4 text-[#006e2d] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-[#0A2540] block">{product.trustBadge1Title || 'ISO 9001:2015 Certified'}</span>
                    <span className="text-slate-500 text-[11px]">{product.trustBadge1Desc || 'Strict batch quality control at Mangadu facility.'}</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-[#f8f9ff] border border-slate-200/80">
                  <FlaskConical className="w-4 h-4 text-[#00355f] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-[#0A2540] block">{product.trustBadge2Title || 'Gentle on Hands'}</span>
                    <span className="text-slate-500 text-[11px]">{product.trustBadge2Desc || 'Enzyme active, zero harsh corrosive acids.'}</span>
                  </div>
                </div>
              </div>

              {/* Institutional / Wholesale Tier Table */}
              <div className="bg-[#eff4ff] p-4 rounded-xl border border-blue-200 text-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#00355f] font-headline uppercase text-[11px]">
                    Institutional Wholesale Pricing
                  </span>
                  <span className="text-[11px] text-slate-500">For Schools, Hostels &amp; Facility Contractors</span>
                </div>
                
                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="bg-white p-2 rounded-lg border border-slate-200">
                    <span className="text-[10px] text-slate-400 block font-semibold">1 - 5 Units</span>
                    <span className="font-bold text-[#0A2540]">₹{currentVariant.price}</span>
                    <span className="text-[9px] text-slate-500 block">Retail</span>
                  </div>
                  <div className="bg-white p-2 rounded-lg border border-slate-200">
                    <span className="text-[10px] text-slate-400 block font-semibold">6 - 24 Units</span>
                    <span className="font-bold text-[#006e2d]">₹{product.wholesaleTier2Price || Math.round(currentVariant.price * 0.9)}</span>
                    <span className="text-[9px] text-emerald-700 block font-bold">10% Bulk Off</span>
                  </div>
                  <div className="bg-white p-2 rounded-lg border border-slate-200">
                    <span className="text-[10px] text-slate-400 block font-semibold">25+ Units</span>
                    <span className="font-bold text-[#00355f]">₹{product.wholesaleTier3Price || Math.round(currentVariant.price * 0.8)}</span>
                    <span className="text-[9px] text-sky-800 block font-bold">20% Tier Off</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-[11px] text-slate-600">Need direct GST invoice &amp; bulk supply dispatch?</span>
                  <button
                    onClick={() => setCurrentRoute('contact')}
                    className="text-xs font-bold text-[#00355f] hover:underline cursor-pointer"
                  >
                    Request Institutional Rate Card →
                  </button>
                </div>
              </div>

            </div>

          </div>

          {/* Product Tabs: Description, Usage, Safety, Reviews */}
          <div className="mt-12 pt-8 border-t border-slate-200">
            <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-2">
              {[
                { id: 'desc', label: 'Description & Details' },
                { id: 'usage', label: 'Directions & Dilution' },
                { id: 'safety', label: 'Safety Data & Ingredients' },
                { id: 'reviews', label: `Customer Reviews (${product.reviewCount})` },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-lg transition-colors cursor-pointer ${
                    activeTab === tab.id
                      ? 'bg-[#00355f] text-white shadow-xs'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="pt-6 text-xs sm:text-sm text-slate-700 leading-relaxed max-w-4xl">
              {activeTab === 'desc' && (
                <div className="space-y-4">
                  <div className="prose prose-sm max-w-none text-slate-700">
                    {product.description}
                  </div>
                  
                  <div className="bg-[#eff4ff] p-4 rounded-xl border border-slate-200 space-y-2">
                    <h4 className="font-headline font-bold text-sm text-[#00355f]">
                      Tamilnadu Test House Certified Formulation
                    </h4>
                    <p className="text-xs text-slate-600">
                      Formulated to international hygiene specifications. Every batch tested for pH neutrality, bactericidal action, and non-corrosive action on surfaces. Safe for septic tanks, modern porcelain, stainless steel, and domestic skin contact.
                    </p>
                  </div>
                </div>
              )}

              {activeTab === 'usage' && (
                <div className="space-y-4">
                  <h4 className="font-headline font-bold text-sm text-[#0A2540]">
                    Recommended Application &amp; Dilution Instructions
                  </h4>
                  {product.howToUse ? (
                    <div 
                      className="prose prose-sm max-w-none text-slate-700 text-xs sm:text-sm leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: product.howToUse }}
                    />
                  ) : (
                    <>
                      <p>Apply as directed or dilute according to surface soil load.</p>
                      <ul className="list-disc list-inside space-y-1 text-xs text-slate-600">
                        <li>For light daily cleaning: Dilute 1 cap (20ml) in half bucket of clean water.</li>
                        <li>For heavy grease &amp; stubborn grime: Apply undiluted, wait 2-3 minutes, then scrub and rinse thoroughly.</li>
                        <li>Store in cool, dry location away from direct sunlight.</li>
                      </ul>
                    </>
                  )}
                </div>
              )}

              {activeTab === 'safety' && (
                <div className="space-y-4">
                  <h4 className="font-headline font-bold text-sm text-[#0A2540]">
                    Material Safety &amp; Active Ingredients
                  </h4>
                  {product.safetyData ? (
                    <div 
                      className="prose prose-sm max-w-none text-slate-700 text-xs sm:text-sm leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: product.safetyData }}
                    />
                  ) : (
                    <>
                      <p className="text-xs text-slate-600">
                        Contains biodegradable plant-derived surfactants, natural citrus/floral essential oils, water softening agents, and certified food-safe colorants. Free from caustic soda, hydrochloric acid, and heavy bleach toxins.
                      </p>
                      <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-900">
                        <strong>Precautionary note:</strong> Keep out of reach of children. In case of direct eye contact, flush with clean water for 10 minutes.
                      </div>
                    </>
                  )}
                </div>
              )}

              {activeTab === 'reviews' && (
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 bg-[#eff4ff] rounded-xl">
                    <span className="text-4xl font-headline font-black text-[#00355f]">{product.rating}</span>
                    <div>
                      <div className="flex text-amber-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                      <span className="text-xs text-slate-500 font-semibold">
                        Based on {product.reviewCount} verified consumer &amp; institutional buyers
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="font-bold text-[#0A2540]">Ramesh K. (Procurement Officer, Porur)</span>
                        <span className="text-slate-400">3 days ago</span>
                      </div>
                      <p className="text-xs text-slate-600">
                        "We ordered Morning Shine and Sky Fresh for our facility. The formulation cuts tough grease immediately and doesn't irritate the hands of our housekeeping staff. Fast delivery in Chennai."
                      </p>
                    </div>

                    <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="font-bold text-[#0A2540]">Priya Sundaram (Householder, Mogappair)</span>
                        <span className="text-slate-400">1 week ago</span>
                      </div>
                      <p className="text-xs text-slate-600">
                        "The free scrub and sponge combo pack is really great value. Very pleasant lemon aroma that lingers."
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <section className="pt-4">
            <h3 className="text-xl font-headline font-bold text-[#0A2540] mb-4">
              Related Cleaning Solutions
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((rel) => (
                <div
                  key={rel.id}
                  onClick={() => {
                    setSelectedProduct(rel);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="bg-white rounded-2xl p-4 shadow-xs hover:shadow-md transition-all border border-slate-200 cursor-pointer flex flex-col justify-between group"
                >
                  <div className="aspect-square bg-[#eff4ff] rounded-xl flex items-center justify-center p-3 mb-3 overflow-hidden">
                    <img
                      src={rel.image}
                      alt={rel.name}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-[#00355f] uppercase block">{rel.brand}</span>
                    <h4 className="font-headline font-bold text-xs text-[#0A2540] line-clamp-2 mt-0.5">
                      {rel.name}
                    </h4>
                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100">
                      <span className="font-bold text-sm text-[#00355f]">₹{rel.price}</span>
                      <span className="text-[11px] text-[#006e2d] font-semibold">View SKU →</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

      </div>

    </div>
  );
};
