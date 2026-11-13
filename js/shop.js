// Shop / category listing page: shop.html?cat=<id>&sub=<id>&q=<search>
renderLayout("shop");

const catId = param("cat");
const subId = param("sub");
const query = (param("q") || "").trim();
const cat = getCategory(catId);

const PRICE_BANDS = [
  ["u500", "Under ₹500", 0, 499],
  ["500-2000", "₹500 – ₹2,000", 500, 2000],
  ["2000-5000", "₹2,000 – ₹5,000", 2001, 5000],
  ["5000+", "Above ₹5,000", 5001, Infinity],
];
const state = { sort: "featured", prices: new Set(), finishes: new Set() };

// Base set: by category / subcategory / search
const base = PRODUCTS.filter((x) =>
  (!cat || x.cat === cat.id) &&
  (!subId || x.sub === subId) &&
  (!query || [x.name, x.finish, x.desc, getCategory(x.cat).name, getSubName(x.cat, x.sub)].join(" ").toLowerCase().includes(query.toLowerCase()))
);

// ----- Hero + breadcrumb -----
const title = query ? `Results for “${query}”` : subId && cat ? getSubName(cat.id, subId) : cat ? cat.name : "All Products";
document.title = `${title} — Ambica Agencies`;
const crumbs = [["Home", "index.html"], ["Shop", "shop.html"]];
if (cat) crumbs.push([cat.name, catUrl(cat.id)]);
if (cat && subId) crumbs.push([getSubName(cat.id, subId)]);
if (query) crumbs.push([`Search: ${query}`]);

$("#pageHero").innerHTML = `
  ${breadcrumb(crumbs)}
  <div class="page-hero-row">
    ${cat ? `<div class="page-hero-icon">${icon(cat.icon)}</div>` : ""}
    <div>
      <h1>${esc(title)}</h1>
      <p class="muted">${cat ? esc(cat.desc) : query ? `Searching across all ${CATEGORIES.length} categories.` : `Browse our full range across ${CATEGORIES.length} categories.`}</p>
    </div>
  </div>
  ${cat ? `<div class="sub-pills">
      <a href="${catUrl(cat.id)}" class="${!subId ? "active" : ""}">All ${esc(cat.name)}</a>
      ${cat.subs.map(([s, n]) => `<a href="${catUrl(cat.id, s)}" class="${subId === s ? "active" : ""}">${n}</a>`).join("")}
    </div>` : ""}`;

// ----- Sidebar -----
$("#catList").innerHTML =
  `<a href="shop.html" class="${!cat ? "active" : ""}">All products <span>${PRODUCTS.length}</span></a>` +
  CATEGORIES.map((c) => `<a href="${catUrl(c.id)}" class="${cat?.id === c.id ? "active" : ""}">${c.name} <span>${PRODUCTS.filter((x) => x.cat === c.id).length}</span></a>`).join("");

if (cat) {
  $("#subList").innerHTML = cat.subs.map(([s, n]) =>
    `<a href="${catUrl(cat.id, s)}" class="${subId === s ? "active" : ""}">${n} <span>${PRODUCTS.filter((x) => x.cat === cat.id && x.sub === s).length}</span></a>`).join("");
} else {
  $("#subGroup").remove();
}

$("#priceList").innerHTML = PRICE_BANDS.map(([k, label]) => `<label><input type="checkbox" value="${k}" data-price /> ${label}</label>`).join("");
const finishes = [...new Set(base.map((x) => x.finish))].sort();
$("#finishList").innerHTML = finishes.length
  ? finishes.map((f) => `<label><input type="checkbox" value="${esc(f)}" data-finish /> ${esc(f)}</label>`).join("")
  : `<span class="muted small">—</span>`;

$("#filters").addEventListener("change", (e) => {
  const t = e.target;
  if (t.dataset.price !== undefined) t.checked ? state.prices.add(t.value) : state.prices.delete(t.value);
  if (t.dataset.finish !== undefined) t.checked ? state.finishes.add(t.value) : state.finishes.delete(t.value);
  render();
});
$("#clearFilters").onclick = () => {
  state.prices.clear(); state.finishes.clear();
  $$("#filters input[type=checkbox]").forEach((i) => (i.checked = false));
  render();
};
$("#sortSelect").onchange = (e) => { state.sort = e.target.value; render(); };
$("#filterToggle").onclick = () => $("#filters").classList.toggle("open");

// ----- Grid -----
function render() {
  let list = base.filter((x) =>
    (!state.prices.size || PRICE_BANDS.some(([k, , lo, hi]) => state.prices.has(k) && x.price >= lo && x.price <= hi)) &&
    (!state.finishes.size || state.finishes.has(x.finish))
  );
  const sorters = {
    "price-asc": (a, b) => a.price - b.price,
    "price-desc": (a, b) => b.price - a.price,
    discount: (a, b) => (1 - b.price / b.mrp) - (1 - a.price / a.mrp),
    name: (a, b) => a.name.localeCompare(b.name),
  };
  if (sorters[state.sort]) list = [...list].sort(sorters[state.sort]);

  const active = state.prices.size + state.finishes.size;
  $("#filterToggle").textContent = active ? `Filters (${active})` : "Filters";
  $("#resultCount").textContent = `${list.length} product${list.length === 1 ? "" : "s"}`;
  $("#productGrid").innerHTML = list.length
    ? list.map(productCard).join("")
    : `<div class="empty"><p>No products match these filters.</p><a href="shop.html" class="btn btn-ghost">Browse all products</a></div>`;
}
render();
