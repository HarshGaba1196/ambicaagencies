#!/usr/bin/env python3
"""
SEO helper for the Ambica Agencies site.

  python3 tools/build_seo.py https://www.ambicaagencies.in

Run it from the project folder whenever the domain changes or products/categories
are added in js/data.js. It:
  * adds/updates description, social-share (Open Graph) and canonical tags on each page
  * regenerates sitemap.xml (pages, every category and every product)
  * regenerates robots.txt
It is safe to run repeatedly.
"""
import os, re, sys, datetime

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SITE = (sys.argv[1] if len(sys.argv) > 1 else "https://www.ambicaagencies.in").rstrip("/")
TODAY = datetime.date.today().isoformat()

DESCRIPTIONS = {
    "index.html": "Shop door handles, hinges, cabinet handles, modular kitchen baskets, drawer channels, locks and bathroom accessories online from Ambica Agencies. GST invoice, fast dispatch, bulk pricing.",
    "shop.html": "Browse door handles, hinges, cabinet handles, kitchen accessories, drawer channels, locks and more from Ambica Agencies.",
    "product.html": "Product details, price and specifications from Ambica Agencies — hardware & kitchen accessories.",
    "about.html": "Ambica Agencies supplies premium door & window hardware, furniture fittings and modular kitchen accessories for homes and projects.",
    "contact.html": "Contact Ambica Agencies for orders, bulk and project quotations — phone, WhatsApp, email and store address.",
    "cart.html": "Your shopping cart at Ambica Agencies.",
    "checkout.html": "Checkout — Ambica Agencies.",
}
NOINDEX = {"cart.html", "checkout.html", "404.html"}
SITEMAP_PAGES = ["index.html", "shop.html", "about.html", "contact.html",
                 "privacy.html", "terms.html", "shipping.html", "returns.html"]

MARK_START, MARK_END = "  <!-- seo:start -->", "  <!-- seo:end -->"

def seo_block(file, title, desc):
    url = f"{SITE}/" if file == "index.html" else f"{SITE}/{file}"
    lines = [MARK_START]
    if file in NOINDEX:
        lines.append('  <meta name="robots" content="noindex" />')
    else:
        lines.append(f'  <link rel="canonical" href="{url}" />')
    lines += [
        '  <meta name="theme-color" content="#0b0b0b" />',
        '  <meta property="og:site_name" content="Ambica Agencies" />',
        '  <meta property="og:type" content="website" />',
        f'  <meta property="og:title" content="{title}" />',
        f'  <meta property="og:description" content="{desc}" />',
        f'  <meta property="og:url" content="{url}" />',
        f'  <meta property="og:image" content="{SITE}/assets/logo.webp" />',
        '  <meta name="twitter:card" content="summary" />',
    ]
    if file == "index.html":
        lines.append('  <script type="application/ld+json">' + (
            '{"@context":"https://schema.org","@type":"HardwareStore",'
            f'"name":"Ambica Agencies","url":"{SITE}/","logo":"{SITE}/assets/logo.webp",'
            '"image":"' + SITE + '/assets/logo.webp",'
            '"description":"Hardware & kitchen accessories",'
            '"telephone":"+91 90000 00000","email":"sales@ambicaagencies.in",'
            '"address":{"@type":"PostalAddress","streetAddress":"Shop No. __, Market Road","addressLocality":"Your City","postalCode":"000000","addressCountry":"IN"},'
            '"openingHours":"Mo-Sa 10:00-20:00","priceRange":"₹₹"}') + '</script>')
    lines.append(MARK_END)
    return "\n".join(lines)

for file in sorted(f for f in os.listdir(ROOT) if f.endswith(".html")):
    path = os.path.join(ROOT, file)
    html = open(path, encoding="utf-8").read()
    title = re.search(r"<title>(.*?)</title>", html).group(1)
    # description meta
    m = re.search(r'<meta name="description" content="(.*?)" />', html)
    desc = DESCRIPTIONS.get(file) or (m.group(1) if m else title)
    if m:
        html = html.replace(m.group(0), f'<meta name="description" content="{desc}" />')
    else:
        html = html.replace("</title>\n", f'</title>\n  <meta name="description" content="{desc}" />\n', 1)
    # drop old robots tag written by hand (block handles it)
    html = html.replace('  <meta name="robots" content="noindex" />\n', "")
    # replace / insert SEO block
    html = re.sub(re.escape(MARK_START) + r".*?" + re.escape(MARK_END) + r"\n", "", html, flags=re.S)
    html = html.replace('  <link rel="icon"', seo_block(file, title, desc) + '\n  <link rel="icon"', 1)
    open(path, "w", encoding="utf-8").write(html)

# ---- sitemap from js/data.js ----
data = open(os.path.join(ROOT, "js", "data.js"), encoding="utf-8").read()
cats = re.findall(r'\{ id: "([a-z0-9-]+)", name:', data)
prods = re.findall(r'^\s*p\("([a-z0-9-]+)",', data, flags=re.M)
urls = [(f"{SITE}/" if p == "index.html" else f"{SITE}/{p}", "1.0" if p == "index.html" else "0.5") for p in SITEMAP_PAGES]
urls += [(f"{SITE}/shop.html?cat={c}", "0.8") for c in cats]
urls += [(f"{SITE}/product.html?id={p}", "0.7") for p in prods]
xml = ['<?xml version="1.0" encoding="UTF-8"?>', '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">']
for u, pr in urls:
    xml.append(f"  <url><loc>{u.replace('&', '&amp;')}</loc><lastmod>{TODAY}</lastmod><priority>{pr}</priority></url>")
xml.append("</urlset>\n")
open(os.path.join(ROOT, "sitemap.xml"), "w").write("\n".join(xml))

open(os.path.join(ROOT, "robots.txt"), "w").write(
    f"User-agent: *\nAllow: /\nDisallow: /cart.html\nDisallow: /checkout.html\nDisallow: /tools/\n\nSitemap: {SITE}/sitemap.xml\n")

print(f"SEO tags updated for {SITE}; sitemap has {len(urls)} URLs ({len(cats)} categories, {len(prods)} products).")
