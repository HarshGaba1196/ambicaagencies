// =====================================================================
// Store catalog — edit this file to change categories, products & prices.
// To use a real photo, add  image: "assets/products/xyz.jpg"  to a product.
// =====================================================================

const STORE = {
  name: "Ambica Agencies",
  whatsapp: "919000000000", // TODO: client's WhatsApp number (country code, no "+")
  phone: "+91 90000 00000",
  email: "sales@ambicaagencies.in",
  address: "Shop No. __, Market Road, Your City — PIN",
  hours: "Mon–Sat, 10:00 am – 8:00 pm",
  // Used on the policy pages — TODO: confirm with the client
  legalName: "Ambica Agencies",
  gstin: "[GSTIN to be added]",
  city: "[City]",
  grievanceOfficer: "[Name of grievance officer]",
  deliveryAreas: "[City] and nearby areas",
  dispatchTime: "24–48 hours",
  returnDays: "7",
  freeShippingAbove: 2999,
  shippingFee: 99,
};

const CATEGORIES = [
  { id: "door-handles", name: "Door Handles", icon: "lever",
    desc: "Mortise lever handles, pull handles and statement main-door hardware.",
    subs: [["mortise", "Mortise Handles"], ["pull", "Pull Handles"], ["main-door", "Main Door Handles"]] },
  { id: "hinges", name: "Hinges", icon: "hinge",
    desc: "Butt hinges, soft-close auto hinges and specialty hinges for every door.",
    subs: [["butt", "Butt Hinges"], ["auto", "Auto & Soft-Close Hinges"], ["specialty", "Specialty Hinges"]] },
  { id: "cabinet-handles", name: "Cabinet Handles & Knobs", icon: "pull",
    desc: "Profile handles, bar pulls and knobs for kitchens and wardrobes.",
    subs: [["profile", "Profile Handles"], ["bar", "Bar Handles"], ["knobs", "Knobs"]] },
  { id: "kitchen", name: "Kitchen Accessories", icon: "basket",
    desc: "Modular kitchen baskets, tall units and corner solutions.",
    subs: [["baskets", "Baskets"], ["tall-units", "Tall Units"], ["corner", "Corner Solutions"]] },
  { id: "channels", name: "Drawer Channels", icon: "channel",
    desc: "Telescopic slides, undermount runners and tandem drawer systems.",
    subs: [["telescopic", "Telescopic Channels"], ["undermount", "Undermount Channels"], ["tandem", "Tandem Boxes"]] },
  { id: "locks", name: "Locks & Latches", icon: "lock",
    desc: "Mortise locks, tower bolts, cabinet locks and digital smart locks.",
    subs: [["mortise-locks", "Mortise Locks"], ["bolts", "Bolts & Latches"], ["smart", "Smart Locks"]] },
  { id: "bathroom", name: "Bathroom Accessories", icon: "towel",
    desc: "Towel rods, robe hooks, soap dishes and glass shelves.",
    subs: [["towel", "Towel Rods & Rings"], ["hooks", "Hooks & Holders"], ["shelves", "Shelves"]] },
  { id: "door-controls", name: "Door Closers & Stoppers", icon: "closer",
    desc: "Hydraulic door closers, floor springs, stoppers and magnetic catches.",
    subs: [["closers", "Door Closers"], ["stoppers", "Door Stoppers"], ["catches", "Magnetic Catches"]] },
  { id: "wardrobe", name: "Wardrobe Fittings", icon: "wardrobe",
    desc: "Sliding systems, wardrobe lifts and pull-out organisers.",
    subs: [["sliding", "Sliding Systems"], ["lifts", "Wardrobe Lifts"], ["pullouts", "Pull-out Accessories"]] },
  { id: "glass", name: "Glass Fittings", icon: "clamp",
    desc: "Shower hinges, glass clamps and patch fittings for frameless glass.",
    subs: [["shower", "Shower Hinges"], ["clamps", "Glass Clamps"], ["patch", "Patch Fittings"]] },
  { id: "furniture", name: "Furniture Fittings", icon: "leg",
    desc: "Sofa & table legs, gas lifts, connectors and bed fittings.",
    subs: [["legs", "Legs"], ["lifts", "Gas Lifts"], ["connectors", "Connectors & Bed Fittings"]] },
];

// p(id, name, category, subcategory, price, mrp, finish, icon, description, badge?)
const p = (id, name, cat, sub, price, mrp, finish, icon, desc, badge) => ({ id, name, cat, sub, price, mrp, finish, icon, desc, badge });

const PRODUCTS = [
  // Door handles
  p("dh-101", "Mortise Lever Handle Set", "door-handles", "mortise", 1450, 1890, "Antique Brass", "lever", "Solid zinc-alloy lever handle on plate with matching key escutcheon. Fits standard 35–45 mm doors.", "Bestseller"),
  p("dh-102", "Minimal Lever on Rose", "door-handles", "mortise", 1190, 1490, "Matte Black", "lever", "Slim modern lever with concealed screws. Pairs with any standard mortise lock.", "New"),
  p("dh-107", "Satin Steel Lever Handle", "door-handles", "mortise", 990, 1290, "Satin Steel", "lever", "SS 304 tube lever on round rose — a clean, durable choice for bedroom and office doors."),
  p("dh-103", "Pull Handle 300 mm", "door-handles", "pull", 980, 1250, "Satin Steel", "pullbar", "Back-to-back SS 304 pull handle for main and glass doors. Corrosion resistant."),
  p("dh-104", "Square Pull Handle 450 mm", "door-handles", "pull", 1650, 2100, "Gold PVD", "pullbar", "Square-section SS pull handle with PVD gold coating that won't tarnish."),
  p("dh-105", "Main Door Handle 600 mm", "door-handles", "main-door", 3890, 4950, "Rose Gold", "pullbar", "Statement main-door pull handle in solid brass with hand-polished finish.", "Premium"),
  p("dh-106", "Wooden Inlay Door Pull 900 mm", "door-handles", "main-door", 5450, 6900, "Walnut / Black", "pullbar", "Long door pull combining matte black steel with a walnut wood inlay."),
  // Hinges
  p("hg-201", "Butt Hinge 4\" (Pack of 3)", "hinges", "butt", 420, 540, "Stainless Steel", "hinge", "Heavy-gauge SS ball-bearing butt hinges for wooden doors up to 40 kg."),
  p("hg-202", "Butt Hinge 5\" Heavy Duty (Pack of 3)", "hinges", "butt", 610, 780, "Antique Brass", "hinge", "5 inch, 3 mm thick hinges with 4 ball bearings for heavy main doors."),
  p("hg-203", "Soft-Close Auto Hinge (Pair)", "hinges", "auto", 360, 480, "Nickel", "autohinge", "Clip-on hydraulic soft-close hinge for kitchen and wardrobe shutters. 0 mm crank.", "Bestseller"),
  p("hg-204", "Auto Hinge 8 mm Crank (Pair)", "hinges", "auto", 240, 320, "Nickel", "autohinge", "Standard auto hinge for inset shutters. 3D adjustable."),
  p("hg-205", "Brass Parliament Hinge 4\"", "hinges", "specialty", 690, 820, "Gold PVD", "hinge", "Projecting hinge that lets doors open past architraves. Solid brass construction."),
  p("hg-207", "Decorative Strap Hinge 12\"", "hinges", "specialty", 1290, 1650, "Black Iron", "hinge", "Hand-forged ornamental strap hinge for heritage doors, gates and wooden chests.", "New"),
  p("hg-206", "Concealed Pivot Hinge", "hinges", "specialty", 2450, 3100, "Satin Steel", "autohinge", "Pivot hinge for flush, invisible doors up to 60 kg."),
  // Cabinet handles
  p("ch-301", "Profile Handle 160 mm", "cabinet-handles", "profile", 240, 320, "Brushed Gold", "pull", "Aluminium cabinet pull with 160 mm centre-to-centre. Includes screws.", "New"),
  p("ch-302", "G-Profile Handle 3 m", "cabinet-handles", "profile", 890, 1150, "Champagne", "pull", "Handle-less look G-profile for modular kitchen shutters. Cut to size."),
  p("ch-303", "Knurled Bar Handle 128 mm", "cabinet-handles", "bar", 310, 399, "Matte Black", "pull", "Solid steel bar with knurled grip detail for a premium kitchen look."),
  p("ch-304", "T-Bar Handle 96 mm", "cabinet-handles", "bar", 180, 240, "Satin Steel", "pull", "Classic T-bar pull for drawers and shutters."),
  p("ch-305", "Round Cabinet Knob (Set of 4)", "cabinet-handles", "knobs", 280, 360, "Antique Brass", "knob", "Classic knob for drawers and shutters. M4 screw included."),
  p("ch-306", "Ceramic Knob (Set of 4)", "cabinet-handles", "knobs", 420, 520, "White / Gold", "knob", "Glazed ceramic knob with gold base. Perfect for vintage-style furniture."),
  // Kitchen
  p("ka-401", "Cutlery Basket 600 mm", "kitchen", "baskets", 2650, 3400, "SS 304", "basket", "Tray-style cutlery organiser for 600 mm cabinets. Rust-proof SS 304.", "Bestseller"),
  p("ka-402", "Plate & Cup Basket", "kitchen", "baskets", 2890, 3650, "SS 304", "basket", "Dual-purpose basket with plate rack and cup holders. Fits 600–900 mm units."),
  p("ka-403", "Bottle Pull-Out 150 mm", "kitchen", "baskets", 2190, 2800, "Chrome", "basket", "Narrow pull-out for oil bottles and spices with soft-close runners."),
  p("ka-404", "Tall Unit Pantry Pull-Out", "kitchen", "tall-units", 14500, 18900, "Anthracite", "pantry", "Six-shelf tandem pantry with soft-close runners. For 450 mm tall units.", "Premium"),
  p("ka-405", "Corner Carousel 3/4", "kitchen", "corner", 6200, 7800, "Chrome", "carousel", "Rotating corner solution that makes blind corners fully usable."),
  p("ka-406", "Magic Corner Unit", "kitchen", "corner", 11800, 14900, "Grey", "carousel", "Swing-out corner mechanism with 4 baskets for L-shaped kitchens."),
  // Channels
  p("dc-501", "Telescopic Channel 18\" (Pair)", "channels", "telescopic", 340, 450, "Zinc", "channel", "Full-extension ball-bearing drawer slides, 35 kg load rating."),
  p("dc-502", "Soft-Close Telescopic 20\" (Pair)", "channels", "telescopic", 690, 890, "Zinc", "channel", "Ball-bearing slides with built-in soft-close damper."),
  p("dc-503", "Soft-Close Undermount 20\"", "channels", "undermount", 1350, 1750, "Zinc", "channel", "Concealed undermount slides with silent soft-close and push adjustment.", "New"),
  p("dc-504", "Tandem Box 500 mm", "channels", "tandem", 2350, 2990, "White", "drawer", "Complete double-wall drawer system with soft-close, 40 kg load."),
  // Locks
  p("lk-601", "Mortise Lock Body 3 Lever", "locks", "mortise-locks", 890, 1150, "Brass", "lock", "Heavy-duty mortise lock body with 3 keys. 65 mm backset."),
  p("lk-602", "Cylinder Mortise Lock Set", "locks", "mortise-locks", 1690, 2150, "Satin Nickel", "lock", "Mortise lock with 60 mm computer key cylinder, 5 keys."),
  p("lk-603", "Tower Bolt 6\" (Pack of 2)", "locks", "bolts", 260, 340, "Stainless Steel", "bolt", "SS tower bolts for doors and windows. Smooth sliding action."),
  p("lk-604", "Aldrop 10\" Heavy", "locks", "bolts", 540, 690, "Antique Brass", "bolt", "Heavy aldrop for main and gate doors with padlock provision."),
  p("lk-606", "Stainless Steel Padlock 50 mm", "locks", "bolts", 640, 820, "Stainless Steel", "lock", "Hardened shackle padlock with 3 keys. Weather resistant for gates and shutters."),
  p("lk-605", "Digital Smart Door Lock", "locks", "smart", 11990, 15990, "Black Glass", "smartlock", "Fingerprint, PIN, RFID card and key access. Auto-lock and low-battery alert.", "Premium"),
  // Bathroom
  p("ba-701", "Towel Rod 24\"", "bathroom", "towel", 890, 1190, "Chrome", "towel", "Solid brass towel rod with concealed fixing."),
  p("ba-706", "Double Towel Rail 24\"", "bathroom", "towel", 1490, 1890, "Satin Steel", "towel", "Two-bar SS 304 towel rail that keeps bath and hand towels apart.", "Bestseller"),
  p("ba-702", "Towel Ring", "bathroom", "towel", 520, 690, "Matte Black", "towel", "Round towel ring for wash basin areas."),
  p("ba-703", "Robe Hook (Pack of 2)", "bathroom", "hooks", 340, 450, "Gold PVD", "hook", "Double robe hook in SS 304 with PVD gold finish.", "New"),
  p("ba-704", "Toilet Paper Holder", "bathroom", "hooks", 460, 590, "Chrome", "hook", "Paper holder with flap cover, brass body."),
  p("ba-705", "Glass Shelf 18\"", "bathroom", "shelves", 790, 990, "Chrome / Glass", "shelf", "8 mm toughened glass shelf with brass brackets."),
  // Door controls
  p("dc-801", "Hydraulic Door Closer", "door-controls", "closers", 1490, 1890, "Silver", "closer", "Adjustable speed and latch control for doors up to 65 kg.", "Bestseller"),
  p("dc-802", "Floor Spring 120 kg", "door-controls", "closers", 6900, 8500, "Stainless Steel", "closer", "Concealed floor spring for heavy glass and wooden doors."),
  p("dc-803", "Door Stopper Floor Mounted", "door-controls", "stoppers", 290, 380, "Satin Steel", "stopper", "Rubber-cushioned floor stopper protects walls and handles."),
  p("dc-804", "Magnetic Door Stopper", "door-controls", "stoppers", 450, 590, "Matte Black", "stopper", "Holds the door open magnetically. Wall or floor mount."),
  p("dc-805", "Magnetic Catch (Pack of 4)", "door-controls", "catches", 160, 220, "Nickel", "stopper", "Strong magnetic catches for cabinet shutters."),
  // Wardrobe
  p("wf-901", "Sliding Wardrobe System 2-Door", "wardrobe", "sliding", 4950, 6200, "Aluminium", "wardrobe", "Top-hung sliding system for 2 shutters up to 60 kg each, with soft-close."),
  p("wf-902", "Wardrobe Lift (Pull-Down Rail)", "wardrobe", "lifts", 5600, 7100, "Grey", "wardrobe", "Pull-down hanging rail for high wardrobe sections. 12 kg load."),
  p("wf-903", "Trouser Pull-Out", "wardrobe", "pullouts", 3250, 4100, "Champagne", "basket", "Side-mounted trouser rack with 12 non-slip bars."),
  p("wf-904", "Tie & Belt Organiser", "wardrobe", "pullouts", 1450, 1850, "Champagne", "basket", "Slim pull-out for ties, belts and scarves."),
  // Glass
  p("gl-1001", "Shower Hinge Glass-to-Wall", "glass", "shower", 1850, 2390, "Chrome", "clamp", "SS 304 shower hinge for 8–10 mm toughened glass, 90° self-closing."),
  p("gl-1002", "Glass Clamp D-Type (Pack of 4)", "glass", "clamps", 690, 890, "Satin Steel", "clamp", "D-shaped clamps for glass railings and partitions."),
  p("gl-1003", "Patch Fitting Set", "glass", "patch", 3450, 4300, "Stainless Steel", "clamp", "Top & bottom patch fittings for frameless glass doors."),
  // Furniture
  p("ff-1101", "Sofa Leg 4\" (Set of 4)", "furniture", "legs", 680, 880, "Gold", "leg", "Tapered metal sofa legs with mounting plates.", "New"),
  p("ff-1102", "Table Leg 28\" (Set of 4)", "furniture", "legs", 2850, 3600, "Matte Black", "leg", "Square steel table legs with levelling feet."),
  p("ff-1103", "Gas Lift 100N (Pair)", "furniture", "lifts", 420, 560, "Black", "gaslift", "Gas struts for lift-up shutters and bed storage."),
  p("ff-1104", "Bed Hydraulic Fitting Set", "furniture", "lifts", 3200, 3990, "Black", "gaslift", "Complete hydraulic lift mechanism for storage beds."),
  p("ff-1105", "Minifix Connector (Pack of 20)", "furniture", "connectors", 260, 340, "Zinc", "bolt", "Cam-lock connectors for knock-down furniture."),
];

// ---------------------------------------------------------------------
// Product photos. Free photos from Unsplash (https://unsplash.com/license)
// keyed by product id. Replace with the client's own photos any time,
// e.g. by setting  image: "assets/products/dh-101.jpg"  on a product.
// ---------------------------------------------------------------------
const photoUrl = (photoId, w = 700) => `https://images.unsplash.com/photo-${photoId}?auto=format&fit=crop&w=${w}&q=75`;
const PHOTOS = {
  "dh-101": "1607710533910-d7cdffd9e593", // gold lever on wooden door
  "dh-102": "1583041398200-09b2205f6cf0", // black lever on wooden door
  "dh-107": "1583691028182-e8f01e74bfa2", // silver lever on grey door
  "hg-207": "1792182634926-d16b4a1058f5", // decorative strap hinge
  "ch-301": "1693892985308-44965a6060d1", // metal handle on wooden cabinet
  "ch-303": "1789381565624-cf9c65b7c2ba", // black bar handles on wood doors
  "ka-401": "1678108040468-0cc9addd984d", // cutlery organiser drawer
  "ka-402": "1676907229752-ac14b0152b92", // plate & cup drawer
  "dc-504": "1676907228185-6869277a9f8f", // full-extension kitchen drawer
  "lk-602": "1759452003649-552896c8ed63", // key in lock cylinder
  "lk-604": "1787722907565-0973c641e285", // latch with brass padlock
  "lk-606": "1555529902-5261145633bf",    // steel padlock
  "ba-701": "1596683705523-eb49540c3934", // towel on steel bar
  "ba-706": "1589898362790-edba11d34869", // towel rail
};
PRODUCTS.forEach((prod) => {
  if (!prod.image && PHOTOS[prod.id]) { prod.photo = PHOTOS[prod.id]; prod.image = photoUrl(prod.photo); }
});

// Hero slider on the home page — product ids in display order.
const HERO_SLIDES = ["ka-401", "dh-101", "ch-303", "ba-706", "lk-602", "dc-504"];

// Gold line-art icons used as product visuals (matching the logo style).
const ICONS = {
  lever: '<rect x="18" y="22" width="18" height="56" rx="9"/><circle cx="27" cy="38" r="5"/><path d="M27 38h48a6 6 0 0 1 0 12H30"/><path d="M24 62h6v8h-6z"/>',
  pullbar: '<path d="M30 15v70"/><path d="M30 25h22M30 75h22"/><rect x="50" y="20" width="8" height="60" rx="4"/>',
  hinge: '<rect x="20" y="15" width="28" height="70" rx="2"/><rect x="52" y="15" width="28" height="70" rx="2"/><path d="M46 15h8v70h-8z"/><circle cx="32" cy="28" r="3"/><circle cx="32" cy="50" r="3"/><circle cx="32" cy="72" r="3"/><circle cx="68" cy="28" r="3"/><circle cx="68" cy="50" r="3"/><circle cx="68" cy="72" r="3"/>',
  autohinge: '<circle cx="28" cy="50" r="14"/><circle cx="28" cy="50" r="5"/><path d="M42 44h20l12-10h8v32h-8L62 56H42"/><circle cx="70" cy="50" r="3"/>',
  pull: '<path d="M15 50h70"/><path d="M20 50v12a6 6 0 0 0 6 6h48a6 6 0 0 0 6-6V50"/><rect x="18" y="62" width="64" height="10" rx="5"/>',
  knob: '<circle cx="50" cy="44" r="20"/><circle cx="50" cy="44" r="8"/><path d="M44 64v14h12V64"/><path d="M36 78h28"/>',
  basket: '<path d="M15 35h70v40a4 4 0 0 1-4 4H19a4 4 0 0 1-4-4z"/><path d="M15 50h70M33 35v44M50 35v44M67 35v44"/><path d="M40 35c0-10 20-10 20 0"/>',
  pantry: '<rect x="28" y="10" width="44" height="80" rx="3"/><path d="M28 24h44M28 38h44M28 52h44M28 66h44M28 80h44"/><path d="M50 10v80"/>',
  carousel: '<ellipse cx="50" cy="30" rx="32" ry="10"/><ellipse cx="50" cy="70" rx="32" ry="10"/><path d="M50 15v70"/><path d="M18 30v6M82 30v6M18 70v6M82 70v6"/>',
  channel: '<rect x="10" y="38" width="80" height="12" rx="2"/><rect x="22" y="50" width="68" height="10" rx="2"/><circle cx="30" cy="44" r="2"/><circle cx="50" cy="44" r="2"/><circle cx="70" cy="44" r="2"/>',
  drawer: '<rect x="12" y="30" width="76" height="44" rx="3"/><path d="M12 42h76"/><path d="M40 56h20"/><path d="M18 74v6M82 74v6"/>',
  lock: '<rect x="26" y="15" width="48" height="70" rx="4"/><circle cx="50" cy="40" r="6"/><path d="M50 46v14"/><rect x="40" y="68" width="20" height="8" rx="2"/>',
  bolt: '<rect x="15" y="40" width="50" height="20" rx="3"/><rect x="60" y="45" width="28" height="10" rx="5"/><path d="M38 30v10"/><circle cx="38" cy="28" r="4"/><circle cx="25" cy="50" r="2"/><circle cx="55" cy="50" r="2"/>',
  smartlock: '<rect x="30" y="10" width="40" height="80" rx="8"/><rect x="37" y="20" width="26" height="24" rx="3"/><circle cx="50" cy="62" r="8"/><path d="M45 78h10"/>',
  towel: '<rect x="10" y="28" width="10" height="16" rx="3"/><rect x="80" y="28" width="10" height="16" rx="3"/><path d="M20 36h60"/><path d="M30 36v40h40V36"/><path d="M30 64h40"/>',
  hook: '<rect x="38" y="12" width="24" height="12" rx="4"/><path d="M50 24v34a14 14 0 1 1-14-14"/><circle cx="36" cy="44" r="3"/>',
  shelf: '<path d="M12 50h76"/><path d="M12 56h76"/><path d="M22 56v14l10-14M78 56v14l-10-14"/><rect x="18" y="38" width="8" height="12" rx="2"/><rect x="74" y="38" width="8" height="12" rx="2"/>',
  closer: '<rect x="12" y="30" width="46" height="18" rx="4"/><circle cx="66" cy="39" r="7"/><path d="M66 39l18 22"/><path d="M84 61l-30 8"/><circle cx="20" cy="39" r="2"/>',
  stopper: '<path d="M30 80h40"/><path d="M38 80V48a12 12 0 0 1 24 0v32"/><rect x="40" y="26" width="20" height="12" rx="6"/>',
  wardrobe: '<path d="M10 18h80"/><rect x="16" y="24" width="32" height="62" rx="2"/><rect x="52" y="24" width="32" height="62" rx="2"/><circle cx="24" cy="21" r="3"/><circle cx="76" cy="21" r="3"/><path d="M42 50v10M58 50v10"/>',
  clamp: '<rect x="44" y="10" width="12" height="80" rx="2"/><path d="M24 34h20v32H24a8 8 0 0 1-8-8V42a8 8 0 0 1 8-8z"/><path d="M56 34h20a8 8 0 0 1 8 8v16a8 8 0 0 1-8 8H56"/><circle cx="30" cy="50" r="3"/><circle cx="70" cy="50" r="3"/>',
  leg: '<rect x="26" y="14" width="48" height="10" rx="2"/><path d="M38 24l6 58h12l6-58"/><path d="M42 82h16"/>',
  gaslift: '<rect x="10" y="44" width="50" height="12" rx="6"/><path d="M60 50h26"/><circle cx="10" cy="50" r="5"/><circle cx="88" cy="50" r="5"/>',
};

const getCategory = (id) => CATEGORIES.find((c) => c.id === id);
const getSubName = (catId, subId) => (getCategory(catId)?.subs.find((s) => s[0] === subId) || [])[1] || "";
