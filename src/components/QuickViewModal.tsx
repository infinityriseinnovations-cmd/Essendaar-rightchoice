import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { X, Star, Check, ShoppingBag, ArrowRight, ShieldCheck, FlaskConical, Flame, MessageCircle } from 'lucide-react';
import { getSingleProductWhatsAppUrl } from '../utils/whatsappOrder';

export const QuickViewModal: React.FC = () => {
  const { quickViewProduct, closeQuickView, addToCart, setSelectedProduct, setCurrentRoute } = useStore();
  const [quantity, setQuantity] = useState(1);
  const [addedSuccess, setAddedSuccess] = useState(false);
  const [selectedVariantId, setSelectedVariantId] = useState<string>('');

  if (!quickViewProduct) return null;

  const activeVariant = quickViewProduct.variants?.find((v, idx) => 
    (v.id && v.id === selectedVariantId) || v.size === selectedVariantId || (v.sku && v.sku === selectedVariantId) || `v-${idx}` === selectedVariantId
  ) || quickViewProduct.variants?.[0] || {
    id: 'v-def',
    title: quickViewProduct.packSize,
    size: quickViewProduct.packSize,
    price: quickViewProduct.price,
    regularPrice: quickViewProduct.regularPrice,
    sku: quickViewProduct.sku,
  };

  const handleAddToCart = () => {
    addToCart(quickViewProduct, quantity, activeVariant);
    setAddedSuccess(true);
    setTimeout(() => {
      setAddedSuccess(false);
      closeQuickView();
    }, 1000);
  };

  const handleGoToProduct = () => {
    setSelectedProduct(quickViewProduct);
    closeQuickView();
    setCurrentRoute('product');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 flex items-center justify-center">
      <div 
        onClick={closeQuickView}
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
      />

      <div className="relative bg-white rounded-3xl shadow-2xl max-w-2xl w-full overflow-hidden border border-slate-200 animate-in zoom-in-95 duration-150">
        <button
          onClick={closeQuickView}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 hover:bg-white text-slate-600 hover:text-slate-900 shadow-xs cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Image */}
          <div className="bg-[#eff4ff] relative aspect-square md:aspect-auto flex items-center justify-center p-6">
            <img
              src={quickViewProduct.image}
              alt={quickViewProduct.name}
              className="w-full h-full max-h-64 object-contain"
              referrerPolicy="no-referrer"
            />
            {quickViewProduct.freebie && (
              <span className="absolute top-4 left-4 bg-amber-400 text-slate-950 text-[10px] font-extrabold px-2.5 py-1 rounded-md tracking-wider uppercase shadow-xs flex items-center gap-1">
                <Flame className="w-3 h-3" />
                <span>{quickViewProduct.freebie}</span>
              </span>
            )}
          </div>

          {/* Details */}
          <div className="p-6 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase tracking-wider text-[#00355f] font-bold bg-[#d2e4ff] px-2 py-0.5 rounded font-headline">
                  {quickViewProduct.brand}
                </span>
                <span className="text-xs text-slate-400">·</span>
                <span className="text-xs text-slate-500 font-medium">
                  {quickViewProduct.category}
                </span>
              </div>

              <h3 className="text-lg font-headline font-bold text-[#0A2540] mt-1.5 leading-snug">
                {quickViewProduct.name}
              </h3>

              {/* Price & Rating */}
              <div className="flex items-center justify-between mt-2">
                <div className="flex items-baseline space-x-2">
                  <span className="text-2xl font-headline font-bold text-[#00355f]">
                    ₹{activeVariant.price}
                  </span>
                  {activeVariant.regularPrice && (
                    <span className="text-xs text-slate-400 line-through">
                      ₹{activeVariant.regularPrice}
                    </span>
                  )}
                  <span className="text-[11px] font-bold text-[#006e2d]">
                    Save {Math.round(((activeVariant.regularPrice - activeVariant.price) / activeVariant.regularPrice) * 100)}%
                  </span>
                </div>

                <div className="flex items-center space-x-1 text-xs text-amber-500 font-semibold">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span className="text-slate-700">{quickViewProduct.rating}</span>
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed mt-2.5">
                {quickViewProduct.shortDescription}
              </p>

              {/* Pack Sizes */}
              {quickViewProduct.variants && quickViewProduct.variants.length > 1 && (
                <div className="mt-3">
                  <label className="text-xs font-bold text-[#0A2540] block mb-1.5 font-headline">
                    Pack Size:
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {quickViewProduct.variants.map((v, idx) => {
                      const variantKey = v.id || v.sku || `${v.size}-${idx}`;
                      const isSelected = activeVariant.size === v.size || (v.id && activeVariant.id === v.id);
                      return (
                        <button
                          key={variantKey}
                          onClick={() => setSelectedVariantId(v.id || v.size || `v-${idx}`)}
                          className={`px-2.5 py-1 rounded-lg text-xs font-semibold border cursor-pointer ${
                            isSelected
                              ? 'border-[#00355f] bg-[#eff4ff] text-[#00355f]'
                              : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                          }`}
                        >
                          {v.size} - ₹{v.price}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="space-y-2.5 pt-3 border-t border-slate-100">
              <div className="flex items-center space-x-2">
                <div className="flex items-center border border-slate-200 rounded-xl bg-slate-50">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-2.5 py-2 text-slate-600 hover:text-slate-900 cursor-pointer"
                  >
                    -
                  </button>
                  <span className="px-2 text-xs font-mono font-bold text-[#0A2540]">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-2.5 py-2 text-slate-600 hover:text-slate-900 cursor-pointer"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  disabled={addedSuccess}
                  className="flex-1 bg-[#006e2d] hover:bg-[#14532D] text-white text-xs font-bold py-3 px-4 rounded-xl flex items-center justify-center space-x-1.5 transition-all shadow-xs cursor-pointer"
                >
                  {addedSuccess ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-300" />
                      <span>Added to Cart!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add to Cart • ₹{activeVariant.price * quantity}</span>
                    </>
                  )}
                </button>
              </div>

              {/* WhatsApp Quick Order Fast-Track */}
              <a
                href={getSingleProductWhatsAppUrl({
                  productName: quickViewProduct.name,
                  brand: quickViewProduct.brand,
                  packSize: activeVariant.size || quickViewProduct.packSize,
                  quantity,
                  unitPrice: activeVariant.price,
                  freebie: quickViewProduct.freebie
                })}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer border border-[#1ebd5c]"
              >
                <MessageCircle className="w-4 h-4 fill-slate-950 text-[#25D366]" />
                <span>Quick Order via WhatsApp</span>
              </a>

              <button
                onClick={handleGoToProduct}
                className="w-full text-center text-xs text-[#00355f] hover:underline py-1 font-bold flex items-center justify-center space-x-1 cursor-pointer"
              >
                <span>View Full Specifications &amp; Lab Reports</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
