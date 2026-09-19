import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowRight, 
  Truck, 
  CheckCircle2, 
  ShieldCheck, 
  Tag, 
  Lock,
  Sparkles,
  MessageCircle
} from 'lucide-react';
import { getCartWhatsAppUrl } from '../utils/whatsappOrder';

export const CartDrawer: React.FC = () => {
  const { 
    isCartDrawerOpen, 
    setIsCartDrawerOpen, 
    cart, 
    updateCartQuantity, 
    removeFromCart, 
    cartTotal, 
    settings, 
    couponCode, 
    appliedDiscount, 
    applyCoupon, 
    removeCoupon,
    setCurrentRoute
  } = useStore();

  const [inputCoupon, setInputCoupon] = useState('');
  const [couponFeedback, setCouponFeedback] = useState<{ success?: boolean; message?: string } | null>(null);

  if (!isCartDrawerOpen) return null;

  const freeShippingThreshold = settings.freeShippingThreshold || 499;
  const remainingForFreeShip = Math.max(0, freeShippingThreshold - cartTotal);
  const progressPercent = Math.min(100, Math.round((cartTotal / freeShippingThreshold) * 100));

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCoupon.trim()) return;
    const res = applyCoupon(inputCoupon);
    setCouponFeedback(res);
    setInputCoupon('');
  };

  const handleProceedToCheckout = () => {
    setIsCartDrawerOpen(false);
    setCurrentRoute('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        onClick={() => setIsCartDrawerOpen(false)}
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-250">
          
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-[#eff4ff]">
            <div className="flex items-center space-x-2">
              <ShoppingBag className="w-5 h-5 text-[#00355f]" />
              <h2 className="text-base font-bold text-[#0A2540] font-headline">
                Your Cleaning Cart ({cart.reduce((s, i) => s + i.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={() => setIsCartDrawerOpen(false)}
              className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-200 rounded-full transition-colors cursor-pointer"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Bar */}
          <div className="px-5 py-3.5 bg-emerald-50/80 border-b border-emerald-100">
            <div className="flex items-center justify-between text-xs font-medium text-slate-800 mb-1.5">
              <span className="flex items-center space-x-1.5">
                <Truck className="w-4 h-4 text-[#006e2d]" />
                {remainingForFreeShip === 0 ? (
                  <span className="text-[#006e2d] font-bold flex items-center space-x-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Free Express Dispatch Unlocked!</span>
                  </span>
                ) : (
                  <span>
                    Add <strong className="text-slate-900">₹{remainingForFreeShip}</strong> more for <strong className="text-[#006e2d]">Free Chennai Dispatch</strong>
                  </span>
                )}
              </span>
              <span className="text-slate-500 text-[11px] font-mono">{progressPercent}%</span>
            </div>
            <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-[#006e2d] rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 divide-y divide-slate-100">
            {cart.length === 0 ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 bg-[#eff4ff] rounded-full flex items-center justify-center mx-auto text-[#00355f]">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-[#0A2540] font-headline">Your cart is currently empty</h3>
                <p className="text-xs text-slate-500 max-w-xs mx-auto">
                  Stock up on BOZZ detergents, Morning Shine dishwash gels, Sky Fresh surface cleaners, and toilet hygiene packs.
                </p>
                <button
                  onClick={() => {
                    setIsCartDrawerOpen(false);
                    setCurrentRoute('shop');
                  }}
                  className="inline-flex items-center space-x-2 bg-[#00355f] text-white text-xs font-bold px-5 py-2.5 rounded-xl hover:bg-[#0f4c81] transition-colors cursor-pointer shadow-xs"
                >
                  <span>Explore Product Catalog</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ) : (
              cart.map((item, idx) => (
                <div key={`${item.product.id}-${idx}`} className="pt-4 first:pt-0 flex space-x-3.5">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-16 h-16 object-contain rounded-lg border border-slate-200 bg-[#eff4ff] p-1 shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="text-xs font-bold text-[#0A2540] font-headline leading-snug line-clamp-1">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-slate-400 hover:text-rose-600 p-1 transition-colors cursor-pointer"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[10px] uppercase font-bold text-[#00355f] bg-[#d2e4ff] px-1.5 py-0.2 rounded">
                          {item.product.brand}
                        </span>
                        <span className="text-[11px] text-slate-500">
                          {item.selectedVariant?.size || item.product.packSize}
                        </span>
                      </div>

                      <div className="text-xs font-bold text-[#0A2540] mt-1">
                        ₹{item.product.price}
                        {item.product.regularPrice && (
                          <span className="text-[11px] text-slate-400 line-through ml-1.5 font-normal">
                            ₹{item.product.regularPrice}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Stepper */}
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-slate-200 rounded-lg bg-slate-50">
                        <button
                          onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                          className="px-2 py-1 text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-bold text-slate-800 min-w-[24px] text-center font-mono">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                          className="px-2 py-1 text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="text-xs font-bold text-[#00355f] font-mono">
                        ₹{item.product.price * item.quantity}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Bottom Checkout & Summary Footer */}
          {cart.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-slate-200 bg-slate-50/80 space-y-3.5">
              
              {/* Coupon Form */}
              <form onSubmit={handleApplyCoupon} className="flex space-x-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    placeholder="Coupon (e.g. ESSENDAAR10)"
                    value={inputCoupon}
                    onChange={(e) => setInputCoupon(e.target.value)}
                    className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-[#00355f] uppercase font-mono tracking-wider"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-[#00355f] text-white text-xs px-3 py-1.5 rounded-lg hover:bg-[#0f4c81] transition-colors font-bold cursor-pointer"
                >
                  Apply
                </button>
              </form>

              {/* Coupon message */}
              {couponFeedback && (
                <p className={`text-[11px] ${couponFeedback.success ? 'text-emerald-700 font-medium' : 'text-rose-600'}`}>
                  {couponFeedback.message}
                </p>
              )}

              {couponCode && (
                <div className="flex items-center justify-between text-xs bg-emerald-50 text-emerald-800 px-2.5 py-1.5 rounded-lg border border-emerald-200">
                  <span className="flex items-center space-x-1">
                    <Tag className="w-3 h-3" />
                    <span>Coupon: <strong>{couponCode}</strong> (-10%)</span>
                  </span>
                  <button
                    onClick={removeCoupon}
                    className="text-slate-500 hover:text-rose-600 text-[11px] underline cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              )}

              {/* Totals */}
              <div className="space-y-1.5 text-xs text-slate-600 pt-1">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-slate-900 font-mono">₹{cartTotal}</span>
                </div>
                {appliedDiscount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-semibold">
                    <span>Discount</span>
                    <span className="font-mono">-₹{appliedDiscount}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Estimated Dispatch</span>
                  <span className="font-semibold text-[#006e2d]">
                    {remainingForFreeShip === 0 ? 'FREE' : '₹50.00'}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-slate-900 pt-2 border-t border-slate-200">
                  <span className="font-headline">Estimated Total</span>
                  <span className="font-mono text-base text-[#00355f] font-black">
                    ₹{Math.max(0, cartTotal - appliedDiscount + (remainingForFreeShip === 0 ? 0 : 50))}
                  </span>
                </div>
              </div>

              {/* High-Converting Mobile Optimized Checkout Button */}
              <button
                onClick={handleProceedToCheckout}
                className="w-full bg-[#006e2d] hover:bg-[#14532D] text-white font-headline font-bold py-3.5 px-4 rounded-xl text-sm flex items-center justify-center space-x-2 transition-all shadow-md cursor-pointer group"
              >
                <Lock className="w-4 h-4 text-emerald-300" />
                <span>Proceed to Checkout</span>
                <span>•</span>
                <span className="font-mono">
                  ₹{Math.max(0, cartTotal - appliedDiscount + (remainingForFreeShip === 0 ? 0 : 50))}
                </span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>

              {/* WhatsApp Fast Order */}
              <a
                href={getCartWhatsAppUrl({
                  items: cart.map((i) => ({
                    name: i.product.name,
                    brand: i.product.brand,
                    variantSize: i.selectedVariant?.size || i.product.packSize,
                    quantity: i.quantity,
                    price: i.product.price
                  })),
                  subtotal: cartTotal,
                  discount: appliedDiscount,
                  total: Math.max(0, cartTotal - appliedDiscount + (remainingForFreeShip === 0 ? 0 : 50)),
                  couponCode: couponCode || undefined,
                  deliveryArea: 'Chennai, Tamil Nadu'
                })}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-slate-950 font-headline font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center space-x-2 transition-all shadow-xs cursor-pointer border border-[#1ebd5c]"
                title="Send your entire cart to our Mangadu sales team on WhatsApp"
              >
                <MessageCircle className="w-4 h-4 fill-slate-950 text-[#25D366]" />
                <span>Quick Order Entire Cart on WhatsApp</span>
              </a>

              {/* Security & Guarantees */}
              <div className="flex items-center justify-center space-x-4 text-[11px] text-slate-500 pt-1">
                <span className="flex items-center space-x-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#006e2d]" />
                  <span>ISO 9001:2015 Tested</span>
                </span>
                <span>•</span>
                <span>Tamilnadu Test House Certified</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
