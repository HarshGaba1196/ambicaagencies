# Going live — step-by-step guide

A checklist for taking the Ambica Agencies website from demo to live.
Work through it top to bottom. ☐ = to do.

---

## Step 1 — Get these details from the client

Send this list to the client. Most of the site updates automatically once they are filled in **`js/data.js`**.

**Business details** (`STORE` at the top of `js/data.js`)

| Field | What to enter | Current placeholder |
|---|---|---|
| ☐ `whatsapp` | WhatsApp number that receives orders — country code, no `+` or spaces, e.g. `919812345678` | `919000000000` |
| ☐ `phone` | Phone shown on the site | `+91 90000 00000` |
| ☐ `email` | Business email | `sales@ambicaagencies.in` |
| ☐ `address` | Full shop address with PIN | `Shop No. __, …` |
| ☐ `hours` | Opening hours | `Mon–Sat, 10–8` |
| ☐ `legalName` | Registered business name (as on GST certificate) | `Ambica Agencies` |
| ☐ `gstin` | GST number | `[GSTIN to be added]` |
| ☐ `city` | City for legal jurisdiction | `[City]` |
| ☐ `grievanceOfficer` | Name of the person who handles complaints (required by law) | `[Name …]` |
| ☐ `deliveryAreas` | Where they deliver, e.g. "Ludhiana and within 50 km" | `[City] and nearby areas` |
| ☐ `freeShippingAbove`, `shippingFee` | Free-delivery threshold and delivery charge | `2999`, `99` |
| ☐ `dispatchTime`, `returnDays` | Dispatch time and return window | `24–48 hours`, `7` |

**Products**
- ☐ Real product list: name, category, type, price, MRP, finish, short description.
- ☐ Product photos — square, at least 800×800 px, plain background is best. Put them in `assets/products/` and add `image: "assets/products/<file>.jpg"` to each product.
- ☐ Remove the sample products and the Unsplash stock photos (`PHOTOS` in `js/data.js`).
- ☐ Choose 4–6 products for the home-page slider (`HERO_SLIDES`).

**Pages to review**
- ☐ About page wording (`about.html`).
- ☐ Policy pages — `privacy.html`, `terms.html`, `shipping.html`, `returns.html`. These are templates written for Indian e-commerce rules (Consumer Protection (E-Commerce) Rules 2020, DPDP Act 2023). **The client should read them and confirm they match how the business actually works** (delivery areas, return window, refund method). Having a lawyer or CA review them is recommended.
- ☐ Business details used by Google (in `tools/build_seo.py`, the `HardwareStore` block): phone, email, address, opening hours.

---

## Step 2 — Buy a domain

- ☐ Buy a domain, e.g. **ambicaagencies.in** or **ambicaagencies.com** (≈ ₹500–1,000/year) from GoDaddy, Hostinger, Namecheap, BigRock or Cloudflare.
- ☐ If the domain is different from `www.ambicaagencies.in`, update the SEO tags and sitemap:

  ```bash
  python3 tools/build_seo.py https://www.YOUR-DOMAIN
  ```

  Re-run this command any time products or categories are added, so the sitemap stays up to date.

---

## Step 3 — Publish the site (free, with GitHub Pages)

1. ☐ On GitHub open **HarshGaba1196/ambicaagencies → Settings → Pages**.
2. ☐ Under **Build and deployment** choose **Deploy from a branch**, branch **`main`**, folder **`/ (root)`**, then **Save**.
3. ☐ After 1–2 minutes the site is live at `https://harshgaba1196.github.io/ambicaagencies/`. Check it works.

### Connect the domain

4. ☐ In **Settings → Pages → Custom domain**, enter `www.YOUR-DOMAIN` and **Save** (GitHub adds a `CNAME` file to the repo).
5. ☐ At your domain provider, open **DNS settings** and add:

   | Type | Name / Host | Value |
   |---|---|---|
   | `CNAME` | `www` | `harshgaba1196.github.io` |
   | `A` | `@` | `185.199.108.153` |
   | `A` | `@` | `185.199.109.153` |
   | `A` | `@` | `185.199.110.153` |
   | `A` | `@` | `185.199.111.153` |

   Delete any other existing `A` record for `@` (often a "parked" page).
6. ☐ Wait for DNS to update (usually 15 minutes, up to 24 hours). GitHub shows "DNS check successful".
7. ☐ Tick **Enforce HTTPS** (the option appears once the certificate is ready).

> **Alternative hosts:** Netlify or Vercel also work for free — connect the GitHub repo, no build command, publish directory `/`. Then add the custom domain in their dashboard and follow their DNS instructions.

---

## Step 4 — Test before announcing

- ☐ Open the live site on a phone and a computer, in light and dark mode.
- ☐ Place a real test order and confirm the WhatsApp message reaches the **client's** number with correct items and totals.
- ☐ Send a test bulk enquiry from the Contact page.
- ☐ Click through every category, a few products, the cart, checkout and all footer links.
- ☐ Share the home-page link on WhatsApp and check the preview shows the logo and description.

---

## Step 5 — Get found on Google

- ☐ **Google Business Profile** — <https://business.google.com>. Add the shop with address, phone, hours, photos and the website link. This is the most important step for local customers ("hardware shop near me"). Google verifies by postcard, phone or video.
- ☐ **Google Search Console** — <https://search.google.com/search-console>.
  1. Add property → **Domain** → enter your domain → add the TXT record it gives you in DNS → Verify.
  2. **Sitemaps** → submit `sitemap.xml`.
  3. Use **URL inspection** on the home page → **Request indexing**.
- ☐ Optional: **Google Analytics** (<https://analytics.google.com>) to see visitors and popular products — add the tracking snippet to each page's `<head>`. If you add analytics, mention it in the Privacy Policy (section 5).
- ☐ Add the website link to the client's WhatsApp Business profile, Instagram and Facebook pages.

---

## Step 6 (later) — Online payments

Orders currently arrive on WhatsApp and payment is collected by COD, UPI link or at the store. To accept payments directly on the website:

- ☐ Client signs up with **Razorpay** (or Cashfree / PhonePe PG) and completes KYC: PAN, GST certificate, bank account, business address proof. Approval usually takes 2–7 days.
- ☐ Payment providers check that the website shows: contact details, Privacy Policy, Terms, Shipping Policy and Refund/Cancellation Policy — **these are already on the site** (footer links).
- ☐ A small backend is then needed to create payment orders securely, record orders and offer an admin panel for products and stock.
