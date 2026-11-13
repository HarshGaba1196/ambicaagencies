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

## Editing content

Everything lives in **`js/data.js`**:

- `STORE` — WhatsApp number, phone, email, address, free-delivery threshold, delivery fee
- `CATEGORIES` — categories and their sub-types (menus, filters and pages update automatically)
- `PRODUCTS` — one line per product. Add `image: "assets/products/xyz.jpg"` to show a real photo instead of the gold icon.

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
