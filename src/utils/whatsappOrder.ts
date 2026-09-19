/**
 * WhatsApp Quick Order Generator for Essendaar Suppliers
 * Official Direct WhatsApp Hotline: +91 97879 79757
 */

export const ESSENDAAR_WHATSAPP_NUMBER = '919787979757';

export interface QuickOrderItem {
  name: string;
  variantSize?: string;
  quantity: number;
  price: number;
  brand?: string;
}

/**
 * Generates an instant WhatsApp message URL for a single product quick order
 */
export function getSingleProductWhatsAppUrl(params: {
  productName: string;
  brand?: string;
  packSize: string;
  quantity: number;
  unitPrice: number;
  totalPrice?: number;
  freebie?: string;
}): string {
  const total = params.totalPrice || (params.unitPrice * params.quantity);
  
  const text = 
`*⚡ QUICK ORDER - ESSENDAAR SUPPLIERS*
---------------------------------------
Hello Essendaar Team,
I would like to place an immediate quick order:

📦 *Product:* ${params.productName}
🏷️ *Brand:* ${params.brand || 'Essendaar'}
🧴 *Pack Size:* ${params.packSize}
🔢 *Quantity:* ${params.quantity}
💰 *Total Amount:* ₹${total.toLocaleString('en-IN')} (incl. GST)
${params.freebie ? `🎁 *Applicable Freebie:* ${params.freebie}\n` : ''}
📍 *Delivery Destination:* Mangadu / Chennai / Tamil Nadu

Please confirm stock availability, UPI payment QR, and dispatch schedule.`;

  return `https://wa.me/${ESSENDAAR_WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

/**
 * Generates an instant WhatsApp message URL for the entire shopping cart
 */
export function getCartWhatsAppUrl(params: {
  items: QuickOrderItem[];
  subtotal: number;
  discount?: number;
  total: number;
  couponCode?: string;
  buyerName?: string;
  deliveryArea?: string;
}): string {
  const itemsText = params.items
    .map((item, idx) => `${idx + 1}. *${item.name}* (${item.variantSize || 'Standard'}) x ${item.quantity} = ₹${(item.price * item.quantity).toLocaleString('en-IN')}`)
    .join('\n');

  const text = 
`*🛒 SHOPPING CART QUICK ORDER - ESSENDAAR*
---------------------------------------------
Hello Essendaar Suppliers,
I would like to place an order for the following items:

${itemsText}

---------------------------------------------
💵 *Subtotal:* ₹${params.subtotal.toLocaleString('en-IN')}
${params.discount ? `🎟️ *Discount (${params.couponCode || 'Promo'}):* -₹${params.discount.toLocaleString('en-IN')}\n` : ''}
💳 *Total Payable:* ₹${params.total.toLocaleString('en-IN')} (incl. 18% GST)

${params.buyerName ? `👤 *Customer Name:* ${params.buyerName}\n` : ''}
📍 *Delivery Location:* ${params.deliveryArea || 'Chennai Metro, Tamil Nadu'}

Please share UPI ID / Payment link and estimated doorstep delivery time.`;

  return `https://wa.me/${ESSENDAAR_WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}
