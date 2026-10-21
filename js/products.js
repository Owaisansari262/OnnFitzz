/* =========================================================
   OnnFitzz | Site configuration
   Update contact details, socials and products here only.
   ========================================================= */
const SITE = {
  name: "OnnFitzz",
  tagline: "Refine your everyday aesthetic.",
  currency: "Rs.",

  instagram: "https://www.instagram.com/onnfitzz/",
  facebook: "https://www.facebook.com/profile.php?id=61595620019312",

  // Full WhatsApp numbers in international format (no +, spaces or dashes)
  founders: [
    {
      name: "Habib-ur-Rehman",
      role: "Co-Founder",
      initials: "HR",
      whatsapp: "923306669162",
      display: "0330 6669162",
      bio: "Co-founder of OnnFitzz, shaping the brand's vision and bringing quality everyday wear to customers."
    },
    {
      name: "Owais Ansari",
      role: "Co-Founder",
      initials: "OA",
      whatsapp: "923161177262",
      display: "0316 1177262",
      bio: "Co-founder of OnnFitzz, focused on design, product quality and the customer experience."
    }
  ]
};

/* =========================================================
   Products
   Each color needs a photo in images/products/
   "sizes" lists the sizes available for that product.
   ========================================================= */
const PRODUCTS = [
  {
    id: 1,
    name: "Classic Crew Tee",
    category: "tshirt",
    categoryLabel: "T-Shirts",
    price: 1490,
    badge: "Bestseller",
    description: "Our everyday crew-neck tee in soft, breathable cotton. A clean base layer that pairs with everything, from denim to joggers.",
    fabric: "100% premium cotton, 180 GSM",
    fit: "Regular fit",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Black",        hex: "#1b1b19", image: "images/products/classic-black.jpg" },
      { name: "Charcoal",     hex: "#4a4a47", image: "images/products/classic-charcoal.jpg" },
      { name: "Forest Green", hex: "#173a2b", image: "images/products/classic-green.jpg" },
      { name: "Navy",         hex: "#1f2d4a", image: "images/products/classic-navy.jpg" },
      { name: "Maroon",       hex: "#6d1f2a", image: "images/products/classic-maroon.jpg" }
    ]
  },
  {
    id: 2,
    name: "Street Crew Tee",
    category: "street",
    categoryLabel: "Street Wear",
    price: 1890,
    badge: "New",
    description: "Dropped shoulders and a relaxed, street-ready silhouette. Designed for comfort from morning to night.",
    fabric: "100% cotton, 220 GSM",
    fit: "Relaxed street fit",
    sizes: ["M", "L", "XL", "XXL"],
    colors: [
      { name: "Black",     hex: "#1b1b19", image: "images/products/street-black.jpg" },
      { name: "Off White", hex: "#efeae0", image: "images/products/street-offwhite.jpg" },
      { name: "Olive",     hex: "#5b5f3a", image: "images/products/street-olive.jpg" }
    ]
  },
  {
    id: 3,
    name: "Heavyweight Street Tee",
    category: "street",
    categoryLabel: "Street Wear",
    price: 2190,
    badge: "Premium",
    description: "Dense, structured cotton with a sharp drop-shoulder cut. Holds its shape and color wash after wash.",
    fabric: "100% cotton, 260 GSM",
    fit: "Relaxed street fit",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Black",    hex: "#1b1b19", image: "images/products/heavy-black.jpg" },
      { name: "Charcoal", hex: "#4a4a47", image: "images/products/heavy-charcoal.jpg" },
      { name: "Sand",     hex: "#d9c49c", image: "images/products/heavy-sand.jpg" }
    ]
  },
  {
    id: 4,
    name: "Everyday Crew Tee",
    category: "tshirt",
    categoryLabel: "T-Shirts",
    price: 1290,
    badge: "",
    description: "A lightweight crew tee for warm days and daily wear. Simple, soft and easy to style.",
    fabric: "100% cotton, 160 GSM",
    fit: "Regular fit",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Navy",         hex: "#1f2d4a", image: "images/products/everyday-navy.jpg" },
      { name: "Maroon",       hex: "#6d1f2a", image: "images/products/everyday-maroon.jpg" },
      { name: "Forest Green", hex: "#173a2b", image: "images/products/everyday-green.jpg" }
    ]
  }
];
