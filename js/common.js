// Shared helpers, cart store, header/footer layout — loaded on every page.
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const inr = (n) => "₹" + n.toLocaleString("en-IN");
const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const param = (k) => new URLSearchParams(location.search).get(k);
const icon = (key) => `<svg class="icon-svg" viewBox="0 0 100 100" aria-hidden="true">${ICONS[key] || ""}</svg>`;
const visual = (prod) => prod.image ? `<img src="${prod.image}" alt="${esc(prod.name)}" />` : icon(prod.icon);
const catUrl = (cat, sub) => `shop.html?cat=${cat}${sub ? `&sub=${sub}` : ""}`;
const productUrl = (id) => `product.html?id=${id}`;

// ---------------- Cart (localStorage) ----------------
const Cart = {
  get() { try { return JSON.parse(localStorage.getItem("ambica-cart")) || {}; } catch { return {}; } },
  save(c) { try { localStorage.setItem("ambica-cart", JSON.stringify(c)); } catch {} Cart.updateBadge(); },
  add(id, qty = 1) {
    const c = Cart.get(); c[id] = (c[id] || 0) + qty; Cart.save(c);
    const prod = PRODUCTS.find((x) => x.id === id);
    toast(`Added ${qty} × ${prod.name}`, true);
    Cart.updateBadge(true);
  },
  setQty(id, qty) { const c = Cart.get(); if (qty <= 0) delete c[id]; else c[id] = qty; Cart.save(c); },
  clear() { Cart.save({}); },
  items() {
    return Object.entries(Cart.get())
      .map(([id, qty]) => ({ ...PRODUCTS.find((x) => x.id === id), qty }))
      .filter((i) => i.name);
  },
  count() { return Object.values(Cart.get()).reduce((a, b) => a + b, 0); },
  totals() {
    const subtotal = Cart.items().reduce((s, i) => s + i.price * i.qty, 0);
    const shipping = subtotal === 0 || subtotal >= STORE.freeShippingAbove ? 0 : STORE.shippingFee;
    return { subtotal, shipping, total: subtotal + shipping };
  },
  updateBadge(bump) {
    const el = $("#cartCount"); if (!el) return;
    el.textContent = Cart.count();
    if (bump) { el.classList.remove("bump"); void el.offsetWidth; el.classList.add("bump"); }
  },
};

// ---------------- Product card ----------------
function productCard(prod) {
  const off = Math.round((1 - prod.price / prod.mrp) * 100);
  const cat = getCategory(prod.cat);
  return `<article class="card product">
    <a class="thumb" href="${productUrl(prod.id)}" aria-label="${esc(prod.name)}">
      ${prod.badge ? `<span class="badge">${prod.badge}</span>` : ""}
      ${off > 0 ? `<span class="off">${off}% off</span>` : ""}
      ${visual(prod)}
    </a>
    <div class="p-body">
      <a class="p-cat" href="${catUrl(prod.cat)}">${cat.name}</a>
      <a class="p-name" href="${productUrl(prod.id)}">${esc(prod.name)}</a>
      <span class="p-finish">Finish: ${esc(prod.finish)}</span>
      <div class="p-price"><b>${inr(prod.price)}</b><s>${inr(prod.mrp)}</s></div>
      <button class="add-btn" data-add="${prod.id}">Add to cart</button>
    </div>
  </article>`;
}
document.addEventListener("click", (e) => {
  const b = e.target.closest("[data-add]");
  if (b) { e.preventDefault(); Cart.add(b.dataset.add, 1); }
});

// ---------------- Layout ----------------
function renderLayout(active = "") {
  const navLink = (href, label, key) => `<a href="${href}" class="${active === key ? "active" : ""}">${label}</a>`;
  const currentCat = param("cat");

  $("#site-header").outerHTML = `
  <div class="topbar">Free delivery on orders above ${inr(STORE.freeShippingAbove)} &nbsp;•&nbsp; Bulk & contractor pricing &nbsp;•&nbsp; GST invoice on every order</div>
  <header class="header">
    <div class="container header-inner">
      <a href="index.html" class="brand" aria-label="Ambica Agencies home">
        <img src="assets/logo.webp" alt="" />
        <span class="brand-text"><b>AMBICA</b><small>AGENCIES</small></span>
      </a>
      <form class="search" action="shop.html" role="search">
        <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>
        <input name="q" type="search" placeholder="Search handles, hinges, baskets…" aria-label="Search products" value="${esc(param("q") || "")}" />
      </form>
      <nav class="nav">
        ${navLink("index.html", "Home", "home")}
        ${navLink("shop.html", "Shop", "shop")}
        ${navLink("about.html", "About", "about")}
        ${navLink("contact.html", "Contact", "contact")}
      </nav>
      <a class="cart-btn" href="cart.html" aria-label="Cart">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 4h2l2.4 11.2a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.5L21 8H6"/><circle cx="10" cy="20" r="1.4"/><circle cx="17" cy="20" r="1.4"/></svg>
        <span class="cart-count" id="cartCount">0</span>
      </a>
    </div>
  </header>
  <nav class="catnav" aria-label="Product categories">
    <div class="container catnav-inner">
      <div class="allcats" id="allcats">
        <button class="allcats-btn" id="allcatsBtn" aria-expanded="false">
          <span class="burger"></span> All Categories
        </button>
        <div class="mega" id="mega">
          ${CATEGORIES.map((c) => `
            <div class="mega-col">
              <a class="mega-title" href="${catUrl(c.id)}">${icon(c.icon)}<span>${c.name}</span></a>
              ${c.subs.map(([sid, sn]) => `<a href="${catUrl(c.id, sid)}">${sn}</a>`).join("")}
            </div>`).join("")}
        </div>
      </div>
      <div class="catnav-links">
        ${CATEGORIES.map((c) => `<a href="${catUrl(c.id)}" class="${currentCat === c.id ? "active" : ""}">${c.name}</a>`).join("")}
      </div>
    </div>
  </nav>`;

  $("#site-footer").outerHTML = `
  <footer class="footer">
    <div class="container footer-grid">
      <div>
        <a href="index.html" class="brand"><img src="assets/logo.webp" alt="" /><span class="brand-text"><b>AMBICA</b><small>AGENCIES</small></span></a>
        <p class="footer-about">Premium hardware & kitchen accessories for homes, interiors and projects.</p>
      </div>
      <div><h4>Categories</h4>${CATEGORIES.slice(0, 6).map((c) => `<a href="${catUrl(c.id)}">${c.name}</a>`).join("")}</div>
      <div><h4>More</h4>${CATEGORIES.slice(6).map((c) => `<a href="${catUrl(c.id)}">${c.name}</a>`).join("")}</div>
      <div><h4>Help</h4>
        <a href="shop.html">All products</a><a href="cart.html">Your cart</a><a href="about.html">About us</a><a href="contact.html">Contact & bulk orders</a>
        <p class="footer-contact">${esc(STORE.phone)}<br/>${esc(STORE.email)}</p>
      </div>
    </div>
    <div class="container footer-bottom">© ${new Date().getFullYear()} Ambica Agencies. All rights reserved.</div>
  </footer>
  <div class="toast" id="toast" role="status"></div>`;

  // Mega menu toggle (click for touch; hover handled by CSS on desktop)
  const all = $("#allcats"), btn = $("#allcatsBtn");
  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    const open = all.classList.toggle("open");
    btn.setAttribute("aria-expanded", open);
  });
  document.addEventListener("click", (e) => { if (!all.contains(e.target)) { all.classList.remove("open"); btn.setAttribute("aria-expanded", false); } });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") all.classList.remove("open"); });

  // Keep active category link visible in the scrolling bar
  $(".catnav-links a.active")?.scrollIntoView({ block: "nearest", inline: "center" });
  Cart.updateBadge();
}

function breadcrumb(parts) {
  return `<nav class="crumbs" aria-label="Breadcrumb">${parts
    .map(([label, href], i) => (href && i < parts.length - 1 ? `<a href="${href}">${esc(label)}</a>` : `<span>${esc(label)}</span>`))
    .join('<i>›</i>')}</nav>`;
}

let toastTimer;
function toast(msg, withCart) {
  const t = $("#toast"); if (!t) return;
  t.innerHTML = esc(msg) + (withCart ? ` <a href="cart.html">View cart</a>` : "");
  t.classList.add("show");
  clearTimeout(toastTimer); toastTimer = setTimeout(() => t.classList.remove("show"), 2600);
}

function whatsappUrl(text) {
  return `https://wa.me/${STORE.whatsapp}?text=${encodeURIComponent(text)}`;
}
