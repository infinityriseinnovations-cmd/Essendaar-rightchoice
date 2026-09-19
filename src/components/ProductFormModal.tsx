import React, { useState, useEffect } from 'react';
import { Product, ProductVariant } from '../types';
import { WordPressMediaModal } from './WordPressMediaModal';
import { 
  X, 
  Upload, 
  Trash2, 
  Plus, 
  Image as ImageIcon, 
  Sparkles, 
  ShieldCheck, 
  FlaskConical, 
  DollarSign, 
  Layers, 
  Tag, 
  Star, 
  FileText, 
  Sliders, 
  Eye, 
  Check, 
  Info, 
  Percent,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

interface ProductFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (product: Product) => void;
  initialProduct?: Product | null;
  mode: 'add' | 'edit';
}

export const ProductFormModal: React.FC<ProductFormModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialProduct,
  mode
}) => {
  // Active section tab inside modal
  const [modalTab, setModalTab] = useState<'images' | 'general' | 'pricing' | 'trust' | 'details'>('images');

  // WordPress Media Library Modal state
  const [isWpMediaOpen, setIsWpMediaOpen] = useState(false);
  const [wpTarget, setWpTarget] = useState<'main' | 'gallery'>('main');

  // New gallery image input state
  const [newGalleryUrl, setNewGalleryUrl] = useState('');
  const [newFeatureText, setNewFeatureText] = useState('');

  // Default initial product if adding new
  const defaultProduct: Product = {
    id: `prod-${Date.now()}`,
    name: '',
    slug: '',
    brand: 'MORNING SHINE',
    category: 'Kitchen Care',
    price: 75,
    regularPrice: 90,
    packSize: '1 Litre',
    rating: 4.9,
    reviewCount: 128,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCWsqgCY-jIhZJv6Okv_M4F_bRMGmEwd9HhZ8Pwwv1wIZWBGzCmPegx9mE5ld8MYDnee9JDiR8IZHwpMqCbz1A3A9HilUlvpoHjLwKbOprquqRRgS9DBvehTZpPGbdsXfDWWccSZjIVqKrc4BhVST623U6qF_9-I4sHkseS4RtyjjA-Z19ju2MuIKmIZjfBbRg7LXVZvcy-dqXOapJ7hc5HPQvm4Fda9BIUsYAWmgen30EOiwHLESUK5A',
    gallery: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCWsqgCY-jIhZJv6Okv_M4F_bRMGmEwd9HhZ8Pwwv1wIZWBGzCmPegx9mE5ld8MYDnee9JDiR8IZHwpMqCbz1A3A9HilUlvpoHjLwKbOprquqRRgS9DBvehTZpPGbdsXfDWWccSZjIVqKrc4BhVST623U6qF_9-I4sHkseS4RtyjjA-Z19ju2MuIKmIZjfBbRg7LXVZvcy-dqXOapJ7hc5HPQvm4Fda9BIUsYAWmgen30EOiwHLESUK5A'
    ],
    shortDescription: 'Includes 1L Degreaser Bottle + Scrub Pad & Kitchen Sponge (Worth ₹25 Free). Formulated with active lemon & lime grease cutters.',
    description: 'Industrial and commercial strength dishwashing detergent formulation manufactured at our Mangadu plant. High foaming, gentle on skin, cuts tough Indian cooking oil and turmeric stains easily.',
    stockStatus: 'In Stock (Chennai Warehouse)',
    sku: 'MSDW-1000ML',
    badge: 'SPECIAL COMBO OFFER',
    freebie: 'Free Scrub Pad & Sponge',
    comboOfferText: 'Comes with 1x Heavy-Duty Scrub Pad & High-Absorption Sponge worth ₹25 packed free of charge!',
    certificationTitle: 'Tamilnadu Test House Certified Formulation',
    certificationText: 'Tested for skin biocompatibility, non-corrosive properties, and zero harmful residue.',
    trustBadge1Title: 'ISO 9001:2015 Certified',
    trustBadge1Desc: 'Strict batch quality control at Mangadu facility.',
    trustBadge2Title: 'Gentle on Hands',
    trustBadge2Desc: 'Enzyme active, zero harsh corrosive acids.',
    wholesaleTier2Price: 68,
    wholesaleTier3Price: 60,
    features: [
      'ISO 9001:2015 Certified Formulation',
      'Free Scrub Pad & Sponge Combo Inside',
      'Tamilnadu Test House Laboratory Tested',
      'Skin Friendly pH Neutral Formula',
      'Instant grease and burnt food removal'
    ],
    howToUse: 'Dilute 1 teaspoon (5ml) in a small bowl of water for regular dishes. For burnt grease, apply directly onto sponge.',
    safetyData: 'Keep out of reach of children. In case of eye contact, rinse thoroughly with fresh water.',
    pH: 'Neutral 7.0 - 7.5',
    fragrance: 'Fresh Lemon Citrus',
    shelfLife: '24 Months from MFG Date',
    labCertified: true,
    variants: [
      { size: '500 ml', price: 75, mrp: 90, sku: 'MSDW-500ML' },
      { size: '1 Litre Pack', price: 145, mrp: 180, sku: 'MSDW-1000ML' },
      { size: '5 Litres Can', price: 580, mrp: 720, sku: 'MSDW-5000ML' }
    ]
  };

  const [formData, setFormData] = useState<Product>(() => {
    if (initialProduct) {
      return {
        ...defaultProduct,
        ...initialProduct,
        variants: initialProduct.variants && initialProduct.variants.length > 0 
          ? initialProduct.variants 
          : [
              { size: initialProduct.packSize || '1 Litre', price: initialProduct.price, mrp: initialProduct.regularPrice, sku: initialProduct.sku }
            ],
        gallery: initialProduct.gallery && initialProduct.gallery.length > 0
          ? initialProduct.gallery
          : [initialProduct.image]
      };
    }
    return defaultProduct;
  });

  useEffect(() => {
    if (isOpen) {
      if (initialProduct) {
        setFormData({
          ...defaultProduct,
          ...initialProduct,
          variants: initialProduct.variants && initialProduct.variants.length > 0 
            ? initialProduct.variants 
            : [
                { size: initialProduct.packSize || '1 Litre', price: initialProduct.price, mrp: initialProduct.regularPrice, sku: initialProduct.sku }
              ],
          gallery: initialProduct.gallery && initialProduct.gallery.length > 0
            ? initialProduct.gallery
            : [initialProduct.image]
        });
      } else {
        setFormData(defaultProduct);
      }
      setModalTab('images');
    }
  }, [isOpen, initialProduct]);

  // Handle local image file upload (converts to Base64 data URL)
  const handleMainImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        const base64Url = event.target.result as string;
        setFormData((prev) => ({
          ...prev,
          image: base64Url,
          gallery: prev.gallery.includes(base64Url) ? prev.gallery : [base64Url, ...prev.gallery]
        }));
      }
    };
    reader.readAsDataURL(file);
  };

  const handleGalleryImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        const base64Url = event.target.result as string;
        setFormData((prev) => ({
          ...prev,
          gallery: [...prev.gallery, base64Url]
        }));
      }
    };
    reader.readAsDataURL(file);
  };

  const handleAddGalleryUrl = () => {
    if (!newGalleryUrl.trim()) return;
    setFormData((prev) => ({
      ...prev,
      gallery: [...prev.gallery, newGalleryUrl.trim()]
    }));
    setNewGalleryUrl('');
  };

  const handleRemoveGalleryImage = (indexToRemove: number) => {
    setFormData((prev) => {
      const updatedGallery = prev.gallery.filter((_, idx) => idx !== indexToRemove);
      const newMainImage = updatedGallery.length > 0 ? (prev.image === prev.gallery[indexToRemove] ? updatedGallery[0] : prev.image) : prev.image;
      return {
        ...prev,
        gallery: updatedGallery,
        image: newMainImage
      };
    });
  };

  const handleSetAsPrimaryImage = (imgUrl: string) => {
    setFormData((prev) => ({
      ...prev,
      image: imgUrl
    }));
  };

  const handleSelectWordPressImage = (imageUrl: string) => {
    if (wpTarget === 'main') {
      setFormData((prev) => ({
        ...prev,
        image: imageUrl,
        gallery: prev.gallery.includes(imageUrl) ? prev.gallery : [imageUrl, ...prev.gallery]
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        gallery: prev.gallery.includes(imageUrl) ? prev.gallery : [...prev.gallery, imageUrl]
      }));
    }
  };

  // Variants management
  const handleAddVariant = () => {
    const newVariant: ProductVariant = {
      size: 'New Size Pack',
      price: formData.price,
      mrp: formData.regularPrice,
      sku: `${formData.sku || 'SKU'}-${(formData.variants?.length || 0) + 1}`
    };
    setFormData((prev) => ({
      ...prev,
      variants: [...(prev.variants || []), newVariant]
    }));
  };

  const handleUpdateVariant = (index: number, updatedFields: Partial<ProductVariant>) => {
    setFormData((prev) => {
      const newVariants = [...(prev.variants || [])];
      newVariants[index] = { ...newVariants[index], ...updatedFields };
      return { ...prev, variants: newVariants };
    });
  };

  const handleRemoveVariant = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      variants: (prev.variants || []).filter((_, idx) => idx !== index)
    }));
  };

  // Features list
  const handleAddFeature = () => {
    if (!newFeatureText.trim()) return;
    setFormData((prev) => ({
      ...prev,
      features: [...(prev.features || []), newFeatureText.trim()]
    }));
    setNewFeatureText('');
  };

  const handleRemoveFeature = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.filter((_, idx) => idx !== index)
    }));
  };

  // Submit form
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      alert('Please enter a product title.');
      return;
    }
    const slug = formData.slug || formData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const finalProduct: Product = {
      ...formData,
      slug: slug,
      price: Number(formData.price),
      regularPrice: Number(formData.regularPrice || formData.price),
      rating: Number(formData.rating || 5.0),
      reviewCount: Number(formData.reviewCount || 1),
      wholesaleTier2Price: formData.wholesaleTier2Price ? Number(formData.wholesaleTier2Price) : Math.round(Number(formData.price) * 0.9),
      wholesaleTier3Price: formData.wholesaleTier3Price ? Number(formData.wholesaleTier3Price) : Math.round(Number(formData.price) * 0.8),
    };
    onSave(finalProduct);
    onClose();
  };

  const discountPercent = formData.regularPrice > formData.price 
    ? Math.round(((formData.regularPrice - formData.price) / formData.regularPrice) * 100) 
    : 0;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-4xl w-full border border-slate-200 shadow-2xl my-6 flex flex-col max-h-[92vh] overflow-hidden">
        
        {/* Modal Header */}
        <div className="p-5 sm:px-8 border-b border-slate-200 bg-slate-50/70 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#00355f] text-white flex items-center justify-center shadow-xs">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-black text-[#0A2540]">
                  {mode === 'add' ? 'Add New Product to Catalog' : `Edit Product: ${formData.name || 'Untitled'}`}
                </h3>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-100 text-blue-800 px-2 py-0.5 rounded-md">
                  {mode === 'add' ? 'New SKU' : 'Live SKU'}
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Configure images, pack size variants, combo offers, lab certificates, and wholesale pricing.
              </p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 rounded-xl transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Section Tabs */}
        <div className="flex items-center gap-1.5 px-6 pt-3 border-b border-slate-200 bg-white overflow-x-auto shrink-0">
          {[
            { id: 'images', label: '📸 Images & Gallery', icon: ImageIcon },
            { id: 'general', label: '🏷️ Title, Brand & Badges', icon: Tag },
            { id: 'pricing', label: '💰 Pricing & Pack Sizes', icon: DollarSign },
            { id: 'trust', label: '🛡️ Certifications & Badges', icon: ShieldCheck },
            { id: 'details', label: '📝 Tabs & Specifications', icon: FileText },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setModalTab(tab.id as any)}
                className={`flex items-center gap-2 px-3.5 py-2.5 text-xs font-bold rounded-t-xl transition-all cursor-pointer whitespace-nowrap border-b-2 ${
                  modalTab === tab.id
                    ? 'border-[#00355f] text-[#00355f] bg-blue-50/50'
                    : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 text-xs text-slate-700">
          
          {/* TAB 1: IMAGES & GALLERY */}
          {modalTab === 'images' && (
            <div className="space-y-6 animate-in fade-in">
              
              {/* Main Featured Image Section */}
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h4 className="font-bold text-sm text-[#0A2540] flex items-center gap-2">
                      <ImageIcon className="w-4 h-4 text-[#00355f]" />
                      <span>Primary Featured Product Image</span>
                    </h4>
                    <p className="text-slate-500 text-[11px]">
                      This is the main hero image shown on product cards and the primary product detail view.
                    </p>
                  </div>
                  {formData.image && (
                    <span className="text-[10px] font-bold uppercase bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-md">
                      Active
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-center">
                  {/* Image Preview */}
                  <div className="sm:col-span-4 flex flex-col items-center">
                    <div className="w-40 h-40 rounded-2xl bg-white p-2 border-2 border-[#00355f]/30 flex items-center justify-center overflow-hidden shadow-xs relative group">
                      {formData.image ? (
                        <img 
                          src={formData.image} 
                          alt="Product preview" 
                          className="w-full h-full object-contain"
                          referrerPolicy="no-referrer"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://lh3.googleusercontent.com/aida-public/AB6AXuCWsqgCY-jIhZJv6Okv_M4F_bRMGmEwd9HhZ8Pwwv1wIZWBGzCmPegx9mE5ld8MYDnee9JDiR8IZHwpMqCbz1A3A9HilUlvpoHjLwKbOprquqRRgS9DBvehTZpPGbdsXfDWWccSZjIVqKrc4BhVST623U6qF_9-I4sHkseS4RtyjjA-Z19ju2MuIKmIZjfBbRg7LXVZvcy-dqXOapJ7hc5HPQvm4Fda9BIUsYAWmgen30EOiwHLESUK5A';
                          }}
                        />
                      ) : (
                        <div className="text-center text-slate-400">
                          <ImageIcon className="w-8 h-8 mx-auto mb-1 opacity-50" />
                          <span className="text-[10px]">No image set</span>
                        </div>
                      )}
                    </div>
                    <span className="text-[10px] text-slate-400 mt-1 font-semibold">Live Primary Preview</span>
                  </div>

                  {/* Image Controls: Upload & URL */}
                  <div className="sm:col-span-8 space-y-3">
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="font-bold text-slate-700 text-xs sm:text-sm">Upload or Choose Image</label>
                        <button
                          type="button"
                          onClick={() => {
                            setWpTarget('main');
                            setIsWpMediaOpen(true);
                          }}
                          className="text-[11px] text-[#0073aa] hover:underline font-bold flex items-center gap-1 cursor-pointer"
                        >
                          <ImageIcon className="w-3 h-3" />
                          <span>Browse WP Media Library</span>
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        <button
                          type="button"
                          onClick={() => {
                            setWpTarget('main');
                            setIsWpMediaOpen(true);
                          }}
                          className="flex items-center justify-center gap-2 px-4 py-3 bg-[#0073aa] hover:bg-[#005177] text-white rounded-xl font-bold text-xs shadow-xs transition-colors cursor-pointer"
                        >
                          <div className="w-4 h-4 rounded-full bg-white text-[#0073aa] font-serif font-bold text-[10px] flex items-center justify-center leading-none">
                            W
                          </div>
                          <span>Upload to WordPress Media</span>
                        </button>

                        <label className="flex items-center justify-center gap-2 px-4 py-3 bg-white hover:bg-slate-100 border border-slate-300 rounded-xl cursor-pointer font-bold text-slate-700 text-xs transition-colors shadow-xs">
                          <Upload className="w-4 h-4 text-slate-600" />
                          <span>Upload from Computer</span>
                          <input 
                            type="file" 
                            accept="image/*" 
                            onChange={handleMainImageUpload} 
                            className="hidden" 
                          />
                        </label>
                      </div>
                      <p className="text-[10px] text-slate-400 mt-1.5">
                        Saves directly to <code>/wp-content/uploads/</code> on essendaar.com or converts local files.
                      </p>
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Or Paste Image URL</label>
                      <input
                        type="text"
                        placeholder="https://example.com/product-photo.jpg"
                        value={formData.image}
                        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                        className="w-full p-2.5 bg-white rounded-xl border border-slate-200 font-mono text-[11px] text-slate-900 focus:outline-none focus:border-[#00355f]"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Gallery Thumbnails Manager */}
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h4 className="font-bold text-sm text-[#0A2540] flex items-center gap-2">
                      <Layers className="w-4 h-4 text-[#00355f]" />
                      <span>Product Image Gallery &amp; Thumbnails ({formData.gallery?.length || 0})</span>
                    </h4>
                    <p className="text-slate-500 text-[11px]">
                      Add multiple angles, pack size shots, back label instructions, and lab certification certificates.
                    </p>
                  </div>
                </div>

                {/* Gallery List Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-3">
                  {formData.gallery?.map((imgUrl, index) => {
                    const isPrimary = formData.image === imgUrl;
                    return (
                      <div 
                        key={index} 
                        className={`p-2 rounded-xl bg-white border-2 flex flex-col items-center gap-2 relative group shadow-xs ${
                          isPrimary ? 'border-[#00355f] ring-2 ring-[#00355f]/20' : 'border-slate-200'
                        }`}
                      >
                        <div className="w-full h-24 rounded-lg bg-slate-50 flex items-center justify-center overflow-hidden">
                          <img 
                            src={imgUrl} 
                            alt={`Gallery ${index + 1}`} 
                            className="w-full h-full object-contain"
                            referrerPolicy="no-referrer"
                          />
                        </div>

                        <div className="w-full flex items-center justify-between gap-1 text-[10px]">
                          {isPrimary ? (
                            <span className="font-bold text-[#00355f] flex items-center gap-0.5">
                              <CheckCircle2 className="w-3 h-3" /> Primary
                            </span>
                          ) : (
                            <button
                              type="button"
                              onClick={() => handleSetAsPrimaryImage(imgUrl)}
                              className="text-slate-600 hover:text-[#00355f] font-semibold underline cursor-pointer"
                            >
                              Make Main
                            </button>
                          )}

                          <button
                            type="button"
                            onClick={() => handleRemoveGalleryImage(index)}
                            className="text-slate-400 hover:text-rose-600 p-1 rounded-md transition-colors cursor-pointer"
                            title="Remove image"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Add New Gallery Image */}
                <div className="pt-3 border-t border-slate-200/80 flex flex-col sm:flex-row items-center gap-3">
                  <div className="flex-1 w-full flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Paste additional gallery image URL..."
                      value={newGalleryUrl}
                      onChange={(e) => setNewGalleryUrl(e.target.value)}
                      className="flex-1 p-2 bg-white rounded-xl border border-slate-200 font-mono text-[11px] text-slate-900 focus:outline-none focus:border-[#00355f]"
                    />
                    <button
                      type="button"
                      onClick={handleAddGalleryUrl}
                      className="px-3 py-2 bg-[#00355f] hover:bg-[#0A2540] text-white font-bold rounded-xl flex items-center gap-1 shrink-0 cursor-pointer shadow-xs"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add URL</span>
                    </button>
                  </div>

                  <div className="shrink-0 w-full sm:w-auto flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setWpTarget('gallery');
                        setIsWpMediaOpen(true);
                      }}
                      className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-2 bg-[#0073aa] hover:bg-[#005177] text-white rounded-xl font-bold text-xs shadow-xs transition-colors cursor-pointer"
                    >
                      <div className="w-3.5 h-3.5 rounded-full bg-white text-[#0073aa] font-serif font-bold text-[9px] flex items-center justify-center leading-none">
                        W
                      </div>
                      <span>Upload to WP Media</span>
                    </button>

                    <label className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-2 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl cursor-pointer font-bold text-slate-700 text-xs shadow-xs">
                      <Upload className="w-3.5 h-3.5 text-slate-600" />
                      <span>Upload Local</span>
                      <input 
                        type="file" 
                        accept="image/*" 
                        onChange={handleGalleryImageUpload} 
                        className="hidden" 
                      />
                    </label>
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* TAB 2: GENERAL INFO & BADGES */}
          {modalTab === 'general' && (
            <div className="space-y-4 animate-in fade-in">
              
              <div>
                <label className="block font-bold text-slate-700 mb-1">Product Title (Full Display Name) *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. MORNING SHINE Dishwash Liquid (1 Litre) + Free Scrub Pad & Sponge"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 rounded-xl border border-slate-200 font-bold text-sm text-slate-900 focus:bg-white focus:outline-none focus:border-[#00355f]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Brand Name *</label>
                  <select
                    value={formData.brand}
                    onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 rounded-xl border border-slate-200 font-semibold text-slate-900 focus:bg-white focus:outline-none"
                  >
                    <option value="MORNING SHINE">MORNING SHINE (Kitchen &amp; Dishes)</option>
                    <option value="BOZZ">BOZZ (Floor &amp; Bathroom Cleaners)</option>
                    <option value="SKY FRESH">SKY FRESH (Air &amp; Urinal Care)</option>
                    <option value="POWER RIDE">POWER RIDE (Auto &amp; Vehicle Care)</option>
                    <option value="ESSENDAAR BULK">ESSENDAAR BULK (50L Industrial Drums)</option>
                    <option value="ESSENDAAR STATIONERY">ESSENDAAR STATIONERY (Notebooks &amp; Office)</option>
                    <option value="ESSENDAAR SPORTS">ESSENDAAR SPORTS (Sports &amp; Games)</option>
                    <option value="ESSENDAAR SAFETY">ESSENDAAR SAFETY (PPE &amp; Fire Safety)</option>
                    <option value="ACCESSORIES">ACCESSORIES (Mops, Dispensers, Gloves)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Category *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 rounded-xl border border-slate-200 font-semibold text-slate-900 focus:bg-white focus:outline-none"
                  >
                    <option value="Kitchen Care">Kitchen Care</option>
                    <option value="Surface Care">Surface Care</option>
                    <option value="Laundry Care">Laundry Care</option>
                    <option value="Sanitation">Sanitation</option>
                    <option value="Vehicle Care">Vehicle Care</option>
                    <option value="Institutional Bulk">Institutional Bulk</option>
                    <option value="Accessories">Accessories</option>
                    <option value="Notebooks &amp; Registers">Notebooks &amp; Registers</option>
                    <option value="Office Stationery">Office Stationery</option>
                    <option value="Sports Accessories">Sports Accessories</option>
                    <option value="Personal Protection">Personal Protection</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">SKU Code *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. MSDW-1000ML"
                    value={formData.sku}
                    onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 rounded-xl border border-slate-200 font-mono font-bold text-slate-900 focus:bg-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Stock Status &amp; Dispatch Line</label>
                  <select
                    value={formData.stockStatus?.includes('In Stock') ? 'In Stock (Chennai Warehouse)' : formData.stockStatus || 'In Stock (Chennai Warehouse)'}
                    onChange={(e) => setFormData({ ...formData, stockStatus: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 rounded-xl border border-slate-200 font-semibold text-slate-900 focus:bg-white focus:outline-none"
                  >
                    <option value="In Stock (Chennai Warehouse)">In Stock (Chennai Warehouse)</option>
                    <option value="Ready to Dispatch in 24 Hrs">Ready to Dispatch in 24 Hrs</option>
                    <option value="Low Stock (Only Few Units Left)">Low Stock (Only Few Units Left)</option>
                    <option value="Out of Stock">Out of Stock</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Customer Rating (1.0 - 5.0)</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      step="0.1"
                      min="1.0"
                      max="5.0"
                      value={formData.rating}
                      onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })}
                      className="w-full p-2.5 bg-slate-50 rounded-xl border border-slate-200 font-bold text-amber-600 focus:bg-white focus:outline-none"
                    />
                    <Star className="w-5 h-5 fill-amber-400 text-amber-400 shrink-0" />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Total Verified Reviews Count</label>
                  <input
                    type="number"
                    value={formData.reviewCount}
                    onChange={(e) => setFormData({ ...formData, reviewCount: Number(e.target.value) })}
                    className="w-full p-2.5 bg-slate-50 rounded-xl border border-slate-200 text-slate-900 focus:bg-white focus:outline-none"
                  />
                </div>
              </div>

              {/* Special Offer Callout / Freebie Banner */}
              <div className="bg-amber-50/70 p-4 rounded-2xl border border-amber-200 space-y-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  <span className="font-bold text-amber-900 font-headline">Special Combo Offer / Freebie Banner</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-amber-900 mb-1 text-[11px]">Offer Tag / Badge (Top Left Pill)</label>
                    <input
                      type="text"
                      placeholder="e.g. Free Scrub Pad &amp; Sponge"
                      value={formData.freebie || ''}
                      onChange={(e) => setFormData({ ...formData, freebie: e.target.value })}
                      className="w-full p-2 bg-white rounded-xl border border-amber-300 text-slate-900 font-semibold focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-amber-900 mb-1 text-[11px]">Combo Offer Banner Description</label>
                    <input
                      type="text"
                      placeholder="e.g. Comes with 1x Heavy-Duty Scrub Pad &amp; High-Absorption Sponge worth ₹25 packed free of charge!"
                      value={formData.comboOfferText || ''}
                      onChange={(e) => setFormData({ ...formData, comboOfferText: e.target.value })}
                      className="w-full p-2 bg-white rounded-xl border border-amber-300 text-slate-900 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* TAB 3: PRICING & PACK SIZES (VARIANTS) */}
          {modalTab === 'pricing' && (
            <div className="space-y-6 animate-in fade-in">
              
              {/* Primary Price Box */}
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
                <h4 className="font-bold text-sm text-[#0A2540] flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-[#00355f]" />
                  <span>Base Pricing &amp; GST Calculation</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Selling Price (₹) *</label>
                    <input
                      type="number"
                      required
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                      className="w-full p-2.5 bg-white rounded-xl border border-slate-300 font-black text-base text-[#00355f] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Regular MRP Price (₹)</label>
                    <input
                      type="number"
                      value={formData.regularPrice}
                      onChange={(e) => setFormData({ ...formData, regularPrice: Number(e.target.value) })}
                      className="w-full p-2.5 bg-white rounded-xl border border-slate-300 text-slate-600 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Discount Preview</label>
                    <div className="p-2.5 bg-emerald-50 rounded-xl border border-emerald-200 font-bold text-emerald-800 flex items-center justify-between">
                      <span>Save ₹{Math.max(0, formData.regularPrice - formData.price)}</span>
                      <span>({discountPercent}% OFF)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Pack Sizes & Configurations (Variants Table) */}
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-sm text-[#0A2540] flex items-center gap-2">
                      <Layers className="w-4 h-4 text-[#00355f]" />
                      <span>Pack Sizes &amp; Multi-Configuration Selector</span>
                    </h4>
                    <p className="text-slate-500 text-[11px]">
                      Customer can toggle between sizes (e.g. 500 ml, 1 Litre, 5 Litres, 50 Litres) on the product page.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleAddVariant}
                    className="px-3 py-1.5 bg-[#00355f] hover:bg-[#0A2540] text-white rounded-xl font-bold text-xs flex items-center gap-1 shadow-xs cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>+ Add Pack Size</span>
                  </button>
                </div>

                <div className="space-y-2.5">
                  {formData.variants?.map((v, idx) => (
                    <div key={idx} className="p-3 bg-white rounded-xl border border-slate-200 grid grid-cols-1 sm:grid-cols-12 gap-2.5 items-center shadow-xs">
                      
                      <div className="sm:col-span-3">
                        <label className="text-[10px] text-slate-400 font-bold uppercase block">Pack Size Name</label>
                        <input
                          type="text"
                          value={v.size}
                          onChange={(e) => handleUpdateVariant(idx, { size: e.target.value })}
                          placeholder="e.g. 500 ml / 5 Litres"
                          className="w-full p-1.5 bg-slate-50 rounded-lg border border-slate-200 font-bold text-slate-900"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="text-[10px] text-slate-400 font-bold uppercase block">Sale Price (₹)</label>
                        <input
                          type="number"
                          value={v.price}
                          onChange={(e) => handleUpdateVariant(idx, { price: Number(e.target.value) })}
                          className="w-full p-1.5 bg-slate-50 rounded-lg border border-slate-200 font-bold text-[#00355f]"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="text-[10px] text-slate-400 font-bold uppercase block">MRP (₹)</label>
                        <input
                          type="number"
                          value={v.mrp || v.regularPrice || v.price}
                          onChange={(e) => handleUpdateVariant(idx, { mrp: Number(e.target.value), regularPrice: Number(e.target.value) })}
                          className="w-full p-1.5 bg-slate-50 rounded-lg border border-slate-200 text-slate-600"
                        />
                      </div>

                      <div className="sm:col-span-3">
                        <label className="text-[10px] text-slate-400 font-bold uppercase block">Variant SKU</label>
                        <input
                          type="text"
                          value={v.sku || ''}
                          onChange={(e) => handleUpdateVariant(idx, { sku: e.target.value })}
                          placeholder="e.g. MSDW-500ML"
                          className="w-full p-1.5 bg-slate-50 rounded-lg border border-slate-200 font-mono text-[11px] text-slate-700"
                        />
                      </div>

                      <div className="sm:col-span-2 flex justify-end">
                        <button
                          type="button"
                          onClick={() => handleRemoveVariant(idx)}
                          className="p-2 text-slate-400 hover:text-rose-600 rounded-lg transition-colors cursor-pointer"
                          title="Delete variant"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                    </div>
                  ))}

                  {(!formData.variants || formData.variants.length === 0) && (
                    <div className="p-4 text-center text-slate-400 bg-white rounded-xl border border-dashed border-slate-300">
                      No additional pack sizes defined. The default single pack ({formData.packSize}) will be used.
                    </div>
                  )}
                </div>
              </div>

              {/* Wholesale Pricing Matrix Tiers */}
              <div className="bg-blue-50/60 p-5 rounded-2xl border border-blue-200 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-sm text-[#00355f] flex items-center gap-2">
                    <Percent className="w-4 h-4 text-[#00355f]" />
                    <span>Institutional Wholesale Pricing Tiers</span>
                  </h4>
                  <span className="text-[11px] text-slate-500">Displayed in wholesale rate card box</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="bg-white p-3 rounded-xl border border-blue-100">
                    <span className="text-[10px] text-slate-400 font-bold block uppercase">Tier 1: 1 - 5 Units</span>
                    <div className="font-black text-sm text-slate-900 mt-1">₹{formData.price}</div>
                    <span className="text-[10px] text-slate-500">Retail price</span>
                  </div>

                  <div className="bg-white p-3 rounded-xl border border-blue-100">
                    <span className="text-[10px] text-slate-400 font-bold block uppercase">Tier 2: 6 - 24 Units (₹)</span>
                    <input
                      type="number"
                      value={formData.wholesaleTier2Price || Math.round(formData.price * 0.9)}
                      onChange={(e) => setFormData({ ...formData, wholesaleTier2Price: Number(e.target.value) })}
                      className="w-full p-1.5 mt-1 bg-slate-50 rounded-lg border border-slate-200 font-bold text-emerald-700"
                    />
                    <span className="text-[10px] text-emerald-700 font-semibold">10% bulk discount</span>
                  </div>

                  <div className="bg-white p-3 rounded-xl border border-blue-100">
                    <span className="text-[10px] text-slate-400 font-bold block uppercase">Tier 3: 25+ Units (₹)</span>
                    <input
                      type="number"
                      value={formData.wholesaleTier3Price || Math.round(formData.price * 0.8)}
                      onChange={(e) => setFormData({ ...formData, wholesaleTier3Price: Number(e.target.value) })}
                      className="w-full p-1.5 mt-1 bg-slate-50 rounded-lg border border-slate-200 font-bold text-[#00355f]"
                    />
                    <span className="text-[10px] text-sky-800 font-semibold">20% institutional discount</span>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* TAB 4: CERTIFICATIONS & TRUST BADGES */}
          {modalTab === 'trust' && (
            <div className="space-y-5 animate-in fade-in">
              
              {/* Lab Certification Stamp */}
              <div className="bg-emerald-50/70 p-5 rounded-2xl border border-emerald-200 space-y-3">
                <div className="flex items-center gap-2">
                  <FlaskConical className="w-5 h-5 text-emerald-700" />
                  <div>
                    <h4 className="font-bold text-sm text-[#14532D]">Lab Certification Guarantee Stamp</h4>
                    <p className="text-[11px] text-slate-500">Shown in green box under product images.</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Certification Title</label>
                    <input
                      type="text"
                      value={formData.certificationTitle || 'Tamilnadu Test House Certified Formulation'}
                      onChange={(e) => setFormData({ ...formData, certificationTitle: e.target.value })}
                      className="w-full p-2 bg-white rounded-xl border border-emerald-300 font-bold text-slate-900 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Certification Subtitle / Tested Properties</label>
                    <textarea
                      rows={2}
                      value={formData.certificationText || 'Tested for skin biocompatibility, non-corrosive properties, and zero harmful residue.'}
                      onChange={(e) => setFormData({ ...formData, certificationText: e.target.value })}
                      className="w-full p-2 bg-white rounded-xl border border-emerald-300 text-slate-800 focus:outline-none"
                    ></textarea>
                  </div>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
                <h4 className="font-bold text-sm text-[#0A2540] flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#006e2d]" />
                  <span>Quality Assurance &amp; Clinical Safety Badges</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Badge 1 */}
                  <div className="bg-white p-3.5 rounded-xl border border-slate-200 space-y-2">
                    <span className="text-[10px] font-bold uppercase text-slate-400">Badge 1: Manufacturing Standard</span>
                    <div>
                      <label className="block font-bold text-slate-700 mb-0.5 text-[11px]">Badge 1 Title</label>
                      <input
                        type="text"
                        value={formData.trustBadge1Title || 'ISO 9001:2015 Certified'}
                        onChange={(e) => setFormData({ ...formData, trustBadge1Title: e.target.value })}
                        className="w-full p-1.5 bg-slate-50 rounded-lg border border-slate-200 font-bold text-slate-900"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-0.5 text-[11px]">Badge 1 Subtext</label>
                      <input
                        type="text"
                        value={formData.trustBadge1Desc || 'Strict batch quality control at Mangadu facility.'}
                        onChange={(e) => setFormData({ ...formData, trustBadge1Desc: e.target.value })}
                        className="w-full p-1.5 bg-slate-50 rounded-lg border border-slate-200 text-slate-600"
                      />
                    </div>
                  </div>

                  {/* Badge 2 */}
                  <div className="bg-white p-3.5 rounded-xl border border-slate-200 space-y-2">
                    <span className="text-[10px] font-bold uppercase text-slate-400">Badge 2: Safety &amp; Skin Contact</span>
                    <div>
                      <label className="block font-bold text-slate-700 mb-0.5 text-[11px]">Badge 2 Title</label>
                      <input
                        type="text"
                        value={formData.trustBadge2Title || 'Gentle on Hands'}
                        onChange={(e) => setFormData({ ...formData, trustBadge2Title: e.target.value })}
                        className="w-full p-1.5 bg-slate-50 rounded-lg border border-slate-200 font-bold text-slate-900"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-0.5 text-[11px]">Badge 2 Subtext</label>
                      <input
                        type="text"
                        value={formData.trustBadge2Desc || 'Enzyme active, zero harsh corrosive acids.'}
                        onChange={(e) => setFormData({ ...formData, trustBadge2Desc: e.target.value })}
                        className="w-full p-1.5 bg-slate-50 rounded-lg border border-slate-200 text-slate-600"
                      />
                    </div>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* TAB 5: TABS & SPECIFICATIONS */}
          {modalTab === 'details' && (
            <div className="space-y-4 animate-in fade-in">
              
              <div>
                <label className="block font-bold text-slate-700 mb-1">Short Description (Summary Box under Title)</label>
                <textarea
                  rows={2}
                  value={formData.shortDescription}
                  onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                  placeholder="e.g. Includes 1L Degreaser Bottle + Scrub Pad &amp; Kitchen Sponge (Worth ₹25 Free)..."
                  className="w-full p-2.5 bg-slate-50 rounded-xl border border-slate-200 text-slate-900 focus:bg-white focus:outline-none"
                ></textarea>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Full Description &amp; Product Details Tab</label>
                <textarea
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Detailed product composition, industrial applications, and benefits..."
                  className="w-full p-2.5 bg-slate-50 rounded-xl border border-slate-200 text-slate-900 focus:bg-white focus:outline-none"
                ></textarea>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Directions &amp; Dilution Tab</label>
                  <textarea
                    rows={3}
                    value={formData.howToUse || ''}
                    onChange={(e) => setFormData({ ...formData, howToUse: e.target.value })}
                    placeholder="e.g. Dilute 20ml per 5 Litres of water for regular floor mopping..."
                    className="w-full p-2.5 bg-slate-50 rounded-xl border border-slate-200 text-slate-900 focus:bg-white focus:outline-none"
                  ></textarea>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Safety Data &amp; Ingredients Tab</label>
                  <textarea
                    rows={3}
                    value={formData.safetyData || ''}
                    onChange={(e) => setFormData({ ...formData, safetyData: e.target.value })}
                    placeholder="e.g. Keep out of reach of children. Store in ventilated area..."
                    className="w-full p-2.5 bg-slate-50 rounded-xl border border-slate-200 text-slate-900 focus:bg-white focus:outline-none"
                  ></textarea>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">pH Level</label>
                  <input
                    type="text"
                    value={formData.pH || ''}
                    onChange={(e) => setFormData({ ...formData, pH: e.target.value })}
                    placeholder="e.g. Neutral 7.0 - 7.5"
                    className="w-full p-2 bg-slate-50 rounded-xl border border-slate-200 text-slate-900"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Fragrance / Aroma</label>
                  <input
                    type="text"
                    value={formData.fragrance || ''}
                    onChange={(e) => setFormData({ ...formData, fragrance: e.target.value })}
                    placeholder="e.g. Fresh Lemon Citrus / Pine"
                    className="w-full p-2 bg-slate-50 rounded-xl border border-slate-200 text-slate-900"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Shelf Life</label>
                  <input
                    type="text"
                    value={formData.shelfLife || ''}
                    onChange={(e) => setFormData({ ...formData, shelfLife: e.target.value })}
                    placeholder="e.g. 24 Months"
                    className="w-full p-2 bg-slate-50 rounded-xl border border-slate-200 text-slate-900"
                  />
                </div>
              </div>

              {/* Key Bullet Features List */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
                <label className="block font-bold text-slate-700">Key Feature Highlights ({formData.features?.length || 0})</label>
                
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Add a key feature bullet point..."
                    value={newFeatureText}
                    onChange={(e) => setNewFeatureText(e.target.value)}
                    className="flex-1 p-2 bg-white rounded-xl border border-slate-200 text-slate-900 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleAddFeature}
                    className="px-3 py-2 bg-[#00355f] text-white font-bold rounded-xl flex items-center gap-1 shrink-0 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add</span>
                  </button>
                </div>

                <div className="space-y-1.5">
                  {formData.features?.map((feat, fidx) => (
                    <div key={fidx} className="flex items-center justify-between p-2 bg-white rounded-xl border border-slate-200">
                      <span className="font-semibold text-slate-800 flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        {feat}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleRemoveFeature(fidx)}
                        className="text-slate-400 hover:text-rose-600 p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

        </form>

        {/* Modal Footer Controls */}
        <div className="p-4 sm:px-8 border-t border-slate-200 bg-slate-50 flex items-center justify-between shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold hover:bg-slate-100 transition-colors cursor-pointer text-xs"
          >
            Cancel
          </button>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleSubmit}
              className="px-6 py-2.5 bg-[#00355f] hover:bg-[#0A2540] text-white rounded-xl font-bold transition-all shadow-md flex items-center gap-2 cursor-pointer text-xs"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>{mode === 'add' ? 'Save Product to Catalog' : 'Save All Changes'}</span>
            </button>
          </div>
        </div>

        {/* WordPress Media Library Upload & Picker Modal */}
        {isWpMediaOpen && (
          <WordPressMediaModal
            isOpen={true}
            onClose={() => setIsWpMediaOpen(false)}
            onSelectImage={handleSelectWordPressImage}
            targetLabel={wpTarget === 'main' ? 'Primary Product Image' : 'Gallery Photo'}
          />
        )}

      </div>
    </div>
  );
};
