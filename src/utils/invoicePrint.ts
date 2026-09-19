/**
 * GST Tax Invoice Printing & PDF Generation Utility
 * Essendaar Suppliers - Mangadu, Chennai, Tamil Nadu - 600122
 */

export interface InvoiceItem {
  name: string;
  packSize?: string;
  hsn?: string;
  quantity: number;
  price: number;
  total?: number;
}

export interface InvoiceCustomer {
  name?: string;
  companyName?: string;
  address?: string;
  city?: string;
  state?: string;
  pincode?: string;
  phone?: string;
  email?: string;
  gstin?: string;
  paymentMethod?: string;
}

export interface InvoiceData {
  orderNumber: string;
  date: string;
  customer: InvoiceCustomer;
  items: InvoiceItem[];
  subtotal: number;
  discount?: number;
  tax?: number;
  total: number;
  paymentMethod?: string;
  status?: string;
}

// Convert numbers to Indian Rupees in words
function numberToWordsINR(amount: number): string {
  const rounded = Math.round(amount);
  if (rounded === 0) return 'Zero Rupees Only';

  const singleDigits = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
  const twoDigits = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
  const tensMultiple = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

  function convertTwoDigits(num: number): string {
    if (num < 10) return singleDigits[num];
    if (num >= 10 && num < 20) return twoDigits[num - 10];
    return tensMultiple[Math.floor(num / 10)] + (num % 10 !== 0 ? ' ' + singleDigits[num % 10] : '');
  }

  function convertThreeDigits(num: number): string {
    let str = '';
    if (Math.floor(num / 100) > 0) {
      str += singleDigits[Math.floor(num / 100)] + ' Hundred ';
    }
    const rem = num % 100;
    if (rem > 0) {
      str += (str !== '' ? 'and ' : '') + convertTwoDigits(rem);
    }
    return str.trim();
  }

  let crore = Math.floor(rounded / 10000000);
  let lakh = Math.floor((rounded % 10000000) / 100000);
  let thousand = Math.floor((rounded % 100000) / 1000);
  let remainder = rounded % 1000;

  let result = '';
  if (crore > 0) result += convertThreeDigits(crore) + ' Crore ';
  if (lakh > 0) result += convertThreeDigits(lakh) + ' Lakh ';
  if (thousand > 0) result += convertThreeDigits(thousand) + ' Thousand ';
  if (remainder > 0) result += convertThreeDigits(remainder);

  return 'INR ' + result.trim() + ' Only';
}

/**
 * Normalizes an incoming raw order from either AdminDashboard, CustomerDashboard or StoreContext
 */
export function normalizeOrderForInvoice(rawOrder: any): InvoiceData {
  const orderNumber = rawOrder.orderNumber || rawOrder.orderId || `ESD-${Math.floor(100000 + Math.random() * 900000)}`;
  const date = rawOrder.date || new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
  
  // Extract customer info
  const rawCust = rawOrder.customer || {};
  const customerName = 
    rawCust.firstName ? `${rawCust.firstName} ${rawCust.lastName || ''}`.trim() :
    rawOrder.buyerName || rawCust.name || 'Valued Customer';

  const customer: InvoiceCustomer = {
    name: customerName,
    companyName: rawCust.companyName || rawOrder.companyName || '',
    address: rawCust.address || rawOrder.shippingAddress || 'Mangadu',
    city: rawCust.city || 'Chennai',
    state: rawCust.state || 'Tamil Nadu',
    pincode: rawCust.postalCode || rawCust.pincode || '600122',
    phone: rawCust.phone || rawOrder.phone || '+91 97879 79757',
    email: rawCust.email || rawOrder.email || 'customer@essendaar.com',
    gstin: rawCust.gstin || rawOrder.gstin || '',
    paymentMethod: (rawCust.paymentMethod || rawOrder.paymentMethod || 'UPI').toUpperCase(),
  };

  // Extract items
  const items: InvoiceItem[] = (rawOrder.items || []).map((it: any) => {
    const prod = it.product || it;
    const name = prod.name || it.name || 'Institutional Cleaning Supply';
    const packSize = it.selectedVariant?.size || prod.packSize || it.packSize || '1 Unit';
    const price = Number(it.selectedVariant?.price || prod.price || it.price || 0);
    const quantity = Number(it.quantity || 1);
    
    // Assign proper statutory HSN
    let hsn = '3402.90'; // Detergents and washing preparations
    const lowerName = name.toLowerCase();
    if (lowerName.includes('toilet') || lowerName.includes('disinfectant')) hsn = '3808.94';
    else if (lowerName.includes('dish') || lowerName.includes('bar')) hsn = '3401.19';
    else if (lowerName.includes('mop') || lowerName.includes('brush')) hsn = '9603.90';
    else if (lowerName.includes('paper') || lowerName.includes('stationery')) hsn = '4820.10';

    return {
      name,
      packSize,
      hsn,
      quantity,
      price,
      total: price * quantity
    };
  });

  const subtotal = Number(rawOrder.subtotal || items.reduce((acc, item) => acc + (item.total || 0), 0));
  const discount = Number(rawOrder.discount || 0);
  const tax = Number(rawOrder.tax || rawOrder.gst || Math.round((subtotal - discount) * 0.18));
  const total = Number(rawOrder.total || (subtotal - discount + tax));

  return {
    orderNumber,
    date,
    customer,
    items,
    subtotal,
    discount,
    tax,
    total,
    paymentMethod: customer.paymentMethod,
    status: rawOrder.status || 'Confirmed'
  };
}

/**
 * Generates pristine, print-perfect HTML for the A4 Tax Invoice
 */
export function generateInvoiceHtml(rawOrder: any): string {
  const inv = normalizeOrderForInvoice(rawOrder);
  const cgst = Math.round((inv.tax || 0) / 2);
  const sgst = Math.round((inv.tax || 0) / 2);
  const wordsTotal = numberToWordsINR(inv.total);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Tax Invoice - ${inv.orderNumber} - Essendaar Suppliers</title>
  <style>
    @page {
      size: A4 portrait;
      margin: 10mm 12mm 12mm 12mm;
    }
    * {
      box-sizing: border-box;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      color: #0f172a;
      background: #ffffff;
      margin: 0;
      padding: 16px;
      font-size: 11px;
      line-height: 1.4;
    }
    .invoice-wrapper {
      max-width: 800px;
      margin: 0 auto;
      border: 1.5px solid #00355f;
      padding: 18px 22px;
      background: #fff;
    }
    .header-table {
      width: 100%;
      border-collapse: collapse;
      border-bottom: 2px solid #00355f;
      padding-bottom: 12px;
      margin-bottom: 14px;
    }
    .brand-title {
      font-size: 20px;
      font-weight: 900;
      color: #00355f;
      letter-spacing: 0.5px;
      margin: 0 0 2px 0;
    }
    .brand-sub {
      font-size: 10.5px;
      color: #006e2d;
      font-weight: 700;
      margin: 0 0 4px 0;
    }
    .company-info {
      font-size: 10px;
      color: #334155;
      line-height: 1.4;
    }
    .tax-badge {
      display: inline-block;
      background: #00355f;
      color: #ffffff;
      font-weight: 900;
      padding: 5px 12px;
      font-size: 12px;
      letter-spacing: 1px;
      border-radius: 4px;
      margin-bottom: 6px;
    }
    .meta-box {
      font-size: 10.5px;
      text-align: right;
    }
    .meta-box strong {
      color: #0f172a;
    }
    .grid-party {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 14px;
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 6px;
    }
    .party-col {
      width: 50%;
      padding: 10px 14px;
      vertical-align: top;
      font-size: 10.5px;
    }
    .party-title {
      font-size: 9.5px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.8px;
      color: #64748b;
      margin-bottom: 4px;
    }
    .party-name {
      font-size: 12px;
      font-weight: 800;
      color: #00355f;
      margin-bottom: 2px;
    }
    .items-table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 14px;
    }
    .items-table th {
      background: #00355f;
      color: #ffffff;
      font-size: 10px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      padding: 7px 8px;
      border: 1px solid #00355f;
      text-align: left;
    }
    .items-table td {
      padding: 8px 8px;
      border: 1px solid #cbd5e1;
      font-size: 10.5px;
      vertical-align: middle;
    }
    .items-table tr:nth-child(even) td {
      background: #f8fafc;
    }
    .text-center { text-align: center; }
    .text-right { text-align: right; }
    .font-mono { font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; }
    .summary-table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 14px;
    }
    .words-box {
      background: #f1f5f9;
      padding: 8px 12px;
      border: 1px dashed #94a3b8;
      font-size: 10px;
      margin-top: 6px;
      border-radius: 4px;
    }
    .totals-box {
      width: 280px;
      margin-left: auto;
      border: 1px solid #cbd5e1;
      border-radius: 4px;
      overflow: hidden;
    }
    .totals-row {
      display: flex;
      justify-content: space-between;
      padding: 4px 10px;
      font-size: 10.5px;
      border-bottom: 1px solid #e2e8f0;
    }
    .totals-row.grand {
      background: #00355f;
      color: #ffffff;
      font-size: 13px;
      font-weight: 900;
      border-bottom: none;
      padding: 6px 10px;
    }
    .footer-table {
      width: 100%;
      border-collapse: collapse;
      border-top: 1px solid #cbd5e1;
      padding-top: 12px;
      margin-top: 8px;
    }
    .terms-box {
      font-size: 9px;
      color: #475569;
      line-height: 1.4;
      max-width: 480px;
    }
    .seal-box {
      text-align: right;
      font-size: 10px;
    }
    .seal-circle {
      display: inline-block;
      border: 2px dashed #006e2d;
      color: #006e2d;
      padding: 6px 10px;
      font-weight: 800;
      font-size: 9px;
      border-radius: 4px;
      margin-top: 6px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .print-actions-bar {
      margin-bottom: 14px;
      text-align: right;
    }
    .btn-print {
      background: #006e2d;
      color: #fff;
      border: none;
      padding: 8px 16px;
      font-size: 12px;
      font-weight: bold;
      border-radius: 6px;
      cursor: pointer;
      margin-right: 8px;
    }
    .btn-close {
      background: #64748b;
      color: #fff;
      border: none;
      padding: 8px 14px;
      font-size: 12px;
      border-radius: 6px;
      cursor: pointer;
    }
    @media print {
      .print-actions-bar { display: none !important; }
      body { padding: 0; background: #fff; }
      .invoice-wrapper { border: 1px solid #000; padding: 12px; max-width: 100%; }
    }
  </style>
</head>
<body>

  <div class="print-actions-bar">
    <button class="btn-print" onclick="window.print()">🖨️ Print / Save as PDF</button>
    <button class="btn-close" onclick="window.close()">✕ Close</button>
  </div>

  <div class="invoice-wrapper">
    <!-- Header -->
    <table class="header-table">
      <tr>
        <td style="vertical-align: top; width: 62%;">
          <div class="brand-title">ESSENDAAR SUPPLIERS</div>
          <div class="brand-sub">Suppliers &amp; Facility Care &bull; Manufacturer &amp; Institutional Partner</div>
          <div class="company-info">
            <strong>Factory &amp; Registered Office:</strong> No. 4/18, Kundrathur Main Road, Mangadu, Chennai, Tamil Nadu - 600122<br>
            <strong>ISO 9001:2015 Certified</strong> &bull; Tamilnadu Test House Tested Formulations<br>
            <strong>GSTIN:</strong> 33AABCS1234F1Z9 &bull; <strong>State Code:</strong> 33 (Tamil Nadu)<br>
            <strong>Direct Sales / Orders:</strong> +91 97879 79757 &bull; <strong>Email:</strong> essendaargroup@gmail.com
          </div>
        </td>
        <td style="vertical-align: top; text-align: right; width: 38%;">
          <div class="tax-badge">GST TAX INVOICE</div>
          <div class="meta-box">
            <div><strong>Invoice No:</strong> <span class="font-mono">${inv.orderNumber}</span></div>
            <div><strong>Invoice Date:</strong> ${inv.date}</div>
            <div><strong>Place of Supply:</strong> 33 - Tamil Nadu</div>
            <div><strong>Payment Method:</strong> ${inv.paymentMethod} (Verified)</div>
            <div><strong>Transport Mode:</strong> Chennai Metro Express</div>
          </div>
        </td>
      </tr>
    </table>

    <!-- Buyer & Consignee Details -->
    <table class="grid-party">
      <tr>
        <td class="party-col" style="border-right: 1px solid #e2e8f0;">
          <div class="party-title">Billed To (Customer / Institution):</div>
          <div class="party-name">${inv.customer.companyName || inv.customer.name}</div>
          ${inv.customer.companyName ? `<div>Attn: ${inv.customer.name}</div>` : ''}
          <div>${inv.customer.address}</div>
          <div>${inv.customer.city} - ${inv.customer.pincode}, ${inv.customer.state}</div>
          <div><strong>Contact:</strong> ${inv.customer.phone} ${inv.customer.email ? `&bull; ${inv.customer.email}` : ''}</div>
          <div><strong>Buyer GSTIN:</strong> <span class="font-mono" style="color:#00355f; font-weight:700;">${inv.customer.gstin || 'B2C / Unregistered Retail Buyer'}</span></div>
        </td>
        <td class="party-col">
          <div class="party-title">Dispatch &amp; Consignee Details:</div>
          <div><strong>Dispatch Unit:</strong> Mangadu Production Facility, Chennai</div>
          <div><strong>Delivery Address:</strong> ${inv.customer.address}, ${inv.customer.city} - ${inv.customer.pincode}</div>
          <div><strong>Handling:</strong> Sealed Spill-Proof Packaging (48-Hr Replacement Cover)</div>
          <div><strong>Order Status:</strong> <span style="color:#006e2d; font-weight:800;">${inv.status.toUpperCase()} / DISPATCH APPROVED</span></div>
        </td>
      </tr>
    </table>

    <!-- Line Items Table -->
    <table class="items-table">
      <thead>
        <tr>
          <th style="width: 5%;" class="text-center">#</th>
          <th style="width: 43%;">Description of Goods &amp; Formulation</th>
          <th style="width: 12%;" class="text-center">HSN/SAC</th>
          <th style="width: 8%;" class="text-center">Qty</th>
          <th style="width: 14%;" class="text-right">Unit Rate (₹)</th>
          <th style="width: 18%;" class="text-right">Amount (₹)</th>
        </tr>
      </thead>
      <tbody>
        ${inv.items.map((item, idx) => `
          <tr>
            <td class="text-center font-mono">${idx + 1}</td>
            <td>
              <strong>${item.name}</strong>
              <div style="font-size: 9.5px; color: #64748b;">Pack: ${item.packSize || 'Standard'} &bull; Lab Grade pH Certified</div>
            </td>
            <td class="text-center font-mono">${item.hsn}</td>
            <td class="text-center font-mono"><strong>${item.quantity}</strong></td>
            <td class="text-right font-mono">₹${item.price.toFixed(2)}</td>
            <td class="text-right font-mono"><strong>₹${(item.total || 0).toFixed(2)}</strong></td>
          </tr>
        `).join('')}
      </tbody>
    </table>

    <!-- Summary & Totals -->
    <table class="summary-table">
      <tr>
        <td style="vertical-align: top; width: 55%;">
          <div class="words-box">
            <strong>Amount Chargeable (in words):</strong><br>
            <span style="font-style: italic; font-weight: 700; color: #00355f;">${wordsTotal}</span>
          </div>
          <div style="font-size: 9.5px; color: #475569; margin-top: 8px;">
            <strong>Bank NEFT / RTGS Transfer Details:</strong><br>
            Bank Name: ICICI Bank &bull; A/C: 000905031234 &bull; IFSC: ICIC0000009<br>
            UPI ID: <span class="font-mono" style="font-weight: bold; color: #00355f;">essendaar@icici</span> (Mangadu Branch)
          </div>
        </td>
        <td style="vertical-align: top; width: 45%;">
          <div class="totals-box">
            <div class="totals-row">
              <span>Taxable Subtotal</span>
              <span class="font-mono">₹${inv.subtotal.toFixed(2)}</span>
            </div>
            ${inv.discount && inv.discount > 0 ? `
              <div class="totals-row" style="color: #006e2d; font-weight: bold;">
                <span>Discount / Promo</span>
                <span class="font-mono">-₹${inv.discount.toFixed(2)}</span>
              </div>
            ` : ''}
            <div class="totals-row" style="font-size: 10px; color: #475569;">
              <span>CGST (9.0%)</span>
              <span class="font-mono">₹${cgst.toFixed(2)}</span>
            </div>
            <div class="totals-row" style="font-size: 10px; color: #475569;">
              <span>SGST (9.0%)</span>
              <span class="font-mono">₹${sgst.toFixed(2)}</span>
            </div>
            <div class="totals-row grand">
              <span>Grand Total</span>
              <span class="font-mono">₹${inv.total.toFixed(2)}</span>
            </div>
          </div>
        </td>
      </tr>
    </table>

    <!-- Declarations & Signatures -->
    <table class="footer-table">
      <tr>
        <td class="terms-box">
          <strong>Terms &amp; Conditions:</strong><br>
          1. Goods once sold will be replaced only under our 48-Hour Leak-Proof Guarantee.<br>
          2. Certified suitable for hospital, educational, and food-service sanitized environments.<br>
          3. Subject to Chennai Jurisdiction.
        </td>
        <td class="seal-box">
          <div><strong>For ESSENDAAR SUPPLIERS</strong></div>
          <div class="seal-circle">
            ✔ Digitally Verified<br>Authorized Signatory
          </div>
          <div style="font-size: 8.5px; color: #64748b; margin-top: 3px;">Computer generated tax invoice.</div>
        </td>
      </tr>
    </table>
  </div>

</body>
</html>`;
}

/**
 * Foolproof Print / Save as PDF handler
 * Works seamlessly across iframes, popup blockers, and mobile browsers
 */
export function printTaxInvoice(rawOrder: any): void {
  const html = generateInvoiceHtml(rawOrder);

  // Strategy 1: Hidden iframe inside document. This is 100% reliable inside sandboxed iframes & web views.
  try {
    const existingFrame = document.getElementById('essendaar-invoice-print-frame');
    if (existingFrame) {
      existingFrame.remove();
    }

    const iframe = document.createElement('iframe');
    iframe.id = 'essendaar-invoice-print-frame';
    iframe.style.position = 'fixed';
    iframe.style.right = '0';
    iframe.style.bottom = '0';
    iframe.style.width = '0';
    iframe.style.height = '0';
    iframe.style.border = '0';
    iframe.setAttribute('aria-hidden', 'true');
    document.body.appendChild(iframe);

    const doc = iframe.contentWindow?.document;
    if (doc) {
      doc.open();
      doc.write(html);
      doc.close();

      setTimeout(() => {
        try {
          iframe.contentWindow?.focus();
          iframe.contentWindow?.print();
        } catch (printErr) {
          console.warn('Iframe contentWindow.print blocked, opening fallback window', printErr);
          openInvoiceInNewWindow(html);
        }
      }, 350);
      return;
    }
  } catch (err) {
    console.warn('Hidden iframe print error, using popup window fallback:', err);
  }

  // Strategy 2: Popup window fallback
  openInvoiceInNewWindow(html);
}

function openInvoiceInNewWindow(html: string): void {
  try {
    const printWin = window.open('', '_blank', 'width=880,height=960,toolbar=no,scrollbars=yes');
    if (printWin) {
      printWin.document.open();
      printWin.document.write(html);
      printWin.document.close();
      printWin.focus();
      setTimeout(() => {
        printWin.print();
      }, 500);
      return;
    }
  } catch (e) {
    console.warn('window.open was blocked, downloading invoice instead', e);
  }

  // Strategy 3: Download invoice as HTML file that opens in any browser
  downloadInvoiceFile(html, 'Essendaar-Tax-Invoice.html');
}

/**
 * Downloads the full formatted GST Tax Invoice as an offline HTML file
 */
export function downloadInvoiceFile(contentOrOrder: any, fileName?: string): void {
  const html = typeof contentOrOrder === 'string' ? contentOrOrder : generateInvoiceHtml(contentOrOrder);
  const name = fileName || `Essendaar-Tax-Invoice-${contentOrOrder.orderNumber || 'ESD'}.html`;
  
  const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = name;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
