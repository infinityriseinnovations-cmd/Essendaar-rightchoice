# Essendaar Suppliers & Facility Care — cPanel & GitHub Deployment Guide

**Target Repository:** [github.com/infinityriseinnovations-cmd/Right-Choice](https://github.com/infinityriseinnovations-cmd/Right-Choice)  
**Live Application:** ISO 9001:2015 B2B Procurement Portal & WooCommerce Storefront

---

## 🚀 Option 1: Direct cPanel Live Upload (Fastest — 2 Minutes)

All production-ready files are packaged in `/cpanel-live-ready/`.

1. **Log in to your cPanel account**.
2. Open **File Manager** and navigate to your document root (usually `public_html` or your domain's subdomain folder).
3. Upload the contents of the `cpanel-live-ready/` directory:
   - `index.html`
   - `assets/` folder (JavaScript bundle, Tailwind stylesheet, optimized assets)
   - `.htaccess` (Configured for HTTPS redirection, GZIP compression, and SPA routing)
4. Visit your domain in the browser (e.g. `https://yourdomain.com`). The website is immediately **live** with full shopping cart, UPI checkout, facility management RFPs, and product catalogs!

---

## 🎨 Option 2: WordPress / WooCommerce Theme Upload (Recommended for WordPress)

If your site is running on WordPress + WooCommerce:

1. **Upload / Update the Theme**:
   - In WordPress Admin: Go to **Appearance > Themes > Add New > Upload Theme**.
   - Upload `essendaar-theme.zip` (available in the project root or `/cpanel-live-ready/essendaar-theme.zip`).
   - Click **Install Now** and **Activate** (or Replace active theme with uploaded).

2. **1-Click Automatic Page & Template Linker**:
   - Upload `setup-wordpress-pages.php` to your `public_html` folder.
   - Open in your browser: `https://rightchoiceindia.com/setup-wordpress-pages.php`
   - This automatically creates and links the **Home**, **About Us** (with D Siva Krishnan, B.E executive card & photo), **Facility Management**, **Manpower Support**, **Institutional Supplies**, and **Contact** pages, and assigns the navigation menu!

---

## 🚀 Option 1: Standalone Web App Live Upload (Fastest — 2 Minutes)

All production-ready files are packaged in `/cpanel-live-ready/`.

1. **Log in to your cPanel account**.
2. Open **File Manager** and navigate to your document root (`public_html`).
3. Upload and extract the contents of `cpanel-live-ready/`:
   - `index.html`
   - `assets/` folder (JavaScript bundle, styles, `siva-krishnan.jpg`)
   - `.htaccess` (Configured for routing & HTTPS)
4. Visit `https://rightchoiceindia.com`. The modern responsive application with the full storefront, about us, and RFPs will be live immediately!

---

## 🌿 Option 3: GitHub Branching & Git Push Instructions

To sync this codebase with `github.com/infinityriseinnovations-cmd/Right-Choice` on a new branch (e.g., `cpanel-live` or `wordpress-release`):

### Using Git CLI:
```bash
# 1. Initialize git and link to the repository
git init
git remote add origin https://github.com/infinityriseinnovations-cmd/Right-Choice.git

# 2. Create and switch to a dedicated release branch
git checkout -b cpanel-live

# 3. Add all files (including WordPress templates and cpanel-live-ready bundle)
git add .

# 4. Commit changes
git commit -m "feat: add production WordPress theme and cPanel live deployment bundle"

# 5. Push to the new GitHub branch
git push -u origin cpanel-live
```

### Using Google AI Studio Export:
1. Click the **Settings** / **Export** menu in the top right corner of Google AI Studio.
2. Select **Export to GitHub** or **Download ZIP**.
3. Target the repository `infinityriseinnovations-cmd/Right-Choice` and specify your new branch name.

---

## 📞 Support & Plant Verification
- **Manufacturing Plant:** Mangadu, Chennai, Tamil Nadu - 600122
- **Direct Phone / WhatsApp:** +91 97879 79757
- **Official Inquiries:** essendaargroup@gmail.com
