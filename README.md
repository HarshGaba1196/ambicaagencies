# Ambica Agencies — Online Store

E-commerce website for **Ambica Agencies**, a supplier of hardware & kitchen accessories.
Plain HTML, CSS and JavaScript — no build step, no dependencies.

## Pages

| Page | Purpose |
|---|---|
| `index.html` | Home — hero, categories, bestsellers, category showcases |
| `shop.html` | All products, a category (`?cat=hinges`), a sub-type (`?cat=hinges&sub=auto`) or search (`?q=brass`) |
| `product.html?id=…` | Product details, add to cart / buy now, related products |
| `cart.html` | Cart with quantities and order summary |
| `checkout.html` | Delivery details & payment choice; sends the order to the shop on WhatsApp |
| `about.html`, `contact.html` | About the business; contact details & bulk enquiry form |
| `privacy.html`, `terms.html`, `shipping.html`, `returns.html` | Policy pages (templates — client to review) |
| `404.html` | "Page not found" page |

**Going live?** Follow [GO-LIVE.md](GO-LIVE.md) — client details checklist, domain, hosting, Google setup and payments.

**SEO:** `python3 tools/build_seo.py https://www.your-domain` updates share/SEO tags on every page and regenerates `sitemap.xml` and `robots.txt`. Re-run it after adding products or changing the domain.

## Editing content

Everything lives in **`js/data.js`**:

- `STORE` — WhatsApp number, phone, email, address, free-delivery threshold, delivery fee
- `CATEGORIES` — categories and their sub-types (menus, filters and pages update automatically)
- `PRODUCTS` — one line per product. Add `image: "assets/products/xyz.jpg"` to show a real photo instead of the gold icon.

- `PHOTOS` — product photos (currently free photos from [Unsplash](https://unsplash.com/license), loaded from Unsplash's servers). Replace with the client's own photos by adding `image: "assets/products/xyz.jpg"` to a product.
- `HERO_SLIDES` — which products appear in the moving slider at the top of the home page.

> Products, prices and contact details are currently placeholders.

## Run locally

```bash
python3 -m http.server 5173
```

Then open http://localhost:5173.

## Deploy

Any static host works (GitHub Pages, Netlify, Vercel). For GitHub Pages: repo **Settings → Pages → Deploy from branch → `main` / root**.

## Not yet included

- Online payments (e.g. Razorpay) — orders are currently sent via WhatsApp
- Order database and admin panel for managing products & stock
