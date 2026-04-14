/**
 * VapeVerse Product Data
 * 
 * TO ADD A NEW PRODUCT:
 * 1. Find the correct category array below
 * 2. Copy an existing product object
 * 3. Fill in: id, name, price, description, image, badge (optional), featured (optional)
 * 4. Save the file — the website will automatically display it
 * 
 * Category keys must match: "disposable", "juice", "device", "accessory"
 */

const PRODUCT_CATEGORIES = [
  {
    key: "disposable",
    name: "Disposable Vapes",
    icon: "🫧",
    description: "Convenient, ready-to-use disposable vapes with incredible flavor"
  },
  {
    key: "juice",
    name: "Vape Juices",
    icon: "🧪",
    description: "Premium e-liquids in every flavor imaginable"
  },
  {
    key: "device",
    name: "Vape Devices",
    icon: "⚡",
    description: "Top-tier vape mods, pods, and pen systems"
  },
  {
    key: "accessory",
    name: "Accessories",
    icon: "🔧",
    description: "Coils, tanks, batteries, and everything you need"
  }
];

const PRODUCTS = [
  // ─── DISPOSABLE VAPES ─────────────────────────────────────
  {
    id: "disp-001",
    name: "Cloud Bar 5000",
    category: "disposable",
    price: 2500,
    description: "5000 puffs of pure satisfaction. Available in 12 mouth-watering flavors.",
    image: "images/Image-1.png",
    badge: "Best Seller",
    featured: true
  },
  {
    id: "disp-002",
    name: "Mist Flow 3000",
    category: "disposable",
    price: 1800,
    description: "Compact design with 3000 puffs. Smooth draw and rich flavor every time.",
    image: "images/Image-2.png",
    featured: false
  },
  {
    id: "disp-003",
    name: "VaporLux Pro",
    category: "disposable",
    price: 3200,
    description: "Premium disposable with adjustable airflow and 6000 puffs capacity.",
    image: "images/Image-3.png",
    badge: "New",
    featured: true
  },
  {
    id: "disp-004",
    name: "Smoke Lite 1500",
    category: "disposable",
    price: 1200,
    description: "Budget-friendly disposable vape. 1500 puffs of consistent flavor.",
    image: "images/Image-4.png",
    featured: false
  },
  {
    id: "disp-005",
    name: "Nebula X",
    category: "disposable",
    price: 3800,
    description: "Rechargeable disposable with smart LED screen. 8000 puffs of luxury.",
    image: "images/Image-5.png",
    badge: "Premium",
    featured: true
  },

  // ─── VAPE JUICES ──────────────────────────────────────────
  {
    id: "juice-001",
    name: "Velvet Berry Blast",
    category: "juice",
    price: 2200,
    description: "A luscious blend of wild berries with a creamy velvet finish. 60ml, 3mg.",
    image: "https://images.unsplash.com/photo-1542378809-3d1cf7987e86?w=400&h=400&fit=crop",
    badge: "Popular",
    featured: true
  },
  {
    id: "juice-002",
    name: "Icy Mango Surge",
    category: "juice",
    price: 2000,
    description: "Tropical mango with an arctic menthol blast. Refreshing beyond belief. 60ml.",
    image: "https://images.unsplash.com/photo-1542378809-3d1cf7987e86?w=400&h=400&fit=crop",
    featured: true
  },
  {
    id: "juice-003",
    name: "Caramel Custard Dream",
    category: "juice",
    price: 2800,
    description: "Rich caramel swirled into silky custard. A dessert lover's paradise. 100ml.",
    image: "https://images.unsplash.com/photo-1542068173-525e36362583?w=400&h=400&fit=crop",
    badge: "New",
    featured: false
  },
  {
    id: "juice-004",
    name: "Green Apple Frost",
    category: "juice",
    price: 1900,
    description: "Crispy green apple with an icy exhale. Tangy and cool. 60ml, 6mg.",
    image: "https://images.unsplash.com/photo-1556647931-b4e2b0f8c5a?w=400&h=400&fit=crop",
    featured: false
  },
  {
    id: "juice-005",
    name: "Vanilla Clouds",
    category: "juice",
    price: 2100,
    description: "Smooth vanilla bean with whipped cream clouds. Sweet and satisfying. 60ml.",
    image: "https://images.unsplash.com/photo-1563379924037-936e3be1c083?w=400&h=400&fit=crop",
    featured: false
  },

  // ─── VAPE DEVICES ─────────────────────────────────────────
  {
    id: "dev-001",
    name: "Vortex Mod 200W",
    category: "device",
    price: 8500,
    description: "Powerful 200W box mod with temperature control and sleek OLED display.",
    image: "https://images.unsplash.com/photo-1616400696590-3f654e7270f2?w=400&h=400&fit=crop",
    badge: "Top Pick",
    featured: true
  },
  {
    id: "dev-002",
    name: "Phantom Pod System",
    category: "device",
    price: 5000,
    description: "Ultra-portable pod system with 900mAh battery and refillable pods.",
    image: "https://images.unsplash.com/photo-1584824378284-a1c9601b0d71?w=400&h=400&fit=crop",
    featured: true
  },
  {
    id: "dev-003",
    name: "Eclipse Pen V2",
    category: "device",
    price: 4200,
    description: "Sleek pen-style device with draw activation and 650mAh battery.",
    image: "https://images.unsplash.com/photo-1575592833659-0249ca6f1e7d?w=400&h=400&fit=crop",
    featured: false
  },
  {
    id: "dev-004",
    name: "Titan X Pro Kit",
    category: "device",
    price: 12000,
    description: "Complete starter kit: mod, tank, coils, and batteries. Everything you need.",
    image: "https://images.unsplash.com/photo-1561118875392-4a1a6e6d2d7e?w=400&h=400&fit=crop",
    badge: "Kit",
    featured: true
  },

  // ─── ACCESSORIES ───────────────────────────────────────────
  {
    id: "acc-001",
    name: "Mesh Pro Coils (5-Pack)",
    category: "accessory",
    price: 1500,
    description: "High-performance mesh coils for maximum flavor and vapor production.",
    image: "https://images.unsplash.com/photo-1581094794329-3b5248a8c82e?w=400&h=400&fit=crop",
    featured: false
  },
  {
    id: "acc-002",
    name: "Glass Tank Replacement",
    category: "accessory",
    price: 1000,
    description: "Durable Pyrex glass tank replacement. Compatible with most sub-ohm tanks.",
    image: "https://images.unsplash.com/photo-1581093458488-3abde3efb468?w=400&h=400&fit=crop",
    featured: false
  },
  {
    id: "acc-003",
    name: "18650 Battery 2-Pack",
    category: "accessory",
    price: 2200,
    description: "High-drain 3000mAh batteries for mods. Safety certified.",
    image: "https://images.unsplash.com/photo-1615708252382-3b5248a8c82e?w=400&h=400&fit=crop",
    badge: "Essential",
    featured: true
  },
  {
    id: "acc-004",
    name: "Silicone Drip Tips (3-Pack)",
    category: "accessory",
    price: 800,
    description: "Comfortable silicone drip tips in black, red, and blue. Universal fit.",
    image: "https://images.unsplash.com/photo-1574182245530-9675e0094b18?w=400&h=400&fit=crop",
    featured: false
  },
  {
    id: "acc-005",
    name: "Vape Case Pro",
    category: "accessory",
    price: 3500,
    description: "Premium carrying case with padded compartments. Fits all your gear.",
    image: "https://images.unsplash.com/photo-1553062406-7a0447418679?w=400&h=400&fit=crop",
    badge: "New",
    featured: false
  }
];

/**
 * Helper: Get products by category key
 */
function getProductsByCategory(categoryKey) {
  return PRODUCTS.filter(p => p.category === categoryKey);
}

/**
 * Helper: Get featured products
 */
function getFeaturedProducts() {
  return PRODUCTS.filter(p => p.featured);
}

/**
 * Helper: Get product by ID
 */
function getProductById(id) {
  return PRODUCTS.find(p => p.id === id);
}

/**
 * Helper: Get category info by key
 */
function getCategoryInfo(key) {
  return PRODUCT_CATEGORIES.find(c => c.key === key);
}
