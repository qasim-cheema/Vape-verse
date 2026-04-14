# 💨 VapeVerse — Premium Vape Shop Website

A modern, dark-themed static website for a vape shop built with pure HTML, CSS, and JavaScript. Fully deployment-ready for GitHub Pages.

## 🚀 Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/VapeVerse.git
   cd VapeVerse
   ```

2. **Open locally**
   Simply open `index.html` in your browser, or use a local server:
   ```bash
   # Using Python
   python3 -m http.server 8000
   
   # Using Node.js (npx)
   npx serve .
   ```

3. **View the site** at `http://localhost:8000`

---

## 📁 Project Structure

```
VapeVerse/
├── index.html          # Home page (hero, categories, featured)
├── products.html       # Product listing with category filtering
├── order.html          # Order form with WhatsApp integration
├── css/
│   └── style.css       # Complete stylesheet (dark vape aesthetic)
├── js/
│   ├── products-data.js  # Product data — edit this to add products
│   ├── main.js          # Navbar, animations, shared utilities
│   ├── products.js      # Product rendering & filtering
│   └── order.js         # Order form logic & WhatsApp integration
├── images/             # Product images (currently using Unsplash URLs)
└── README.md           # This file
```

---

## 🛍️ Adding New Products

To add a new product, edit **`js/products-data.js`**:

1. Find the correct category section (or add a new one)
2. Copy an existing product object and fill in:

```javascript
{
  id: "unique-id",          // Unique identifier
  name: "Product Name",     // Display name
  category: "disposable",   // Must match: "disposable", "juice", "device", "accessory"
  price: 19.99,             // Price in dollars
  description: "...",       // Short description
  image: "url-or-path",    // Image URL or local path
  badge: "New",             // Optional: badge text (e.g., "New", "Best Seller")
  featured: true            // Optional: show on home page featured section
}
```

3. Save the file — the website automatically displays it!

### Adding a New Category

1. Add an entry to `PRODUCT_CATEGORIES` in `js/products-data.js`:
```javascript
{ key: "newcat", name: "New Category", icon: "🏷️", description: "Category description" }
```

2. Add products with `category: "newcat"`
3. The filter tab and category card will appear automatically

---

## 📱 Order System

### How It Works
- **Form Submission**: Users fill the form and submit — order details are displayed in a success modal and logged to console
- **WhatsApp**: Users can send order details directly via WhatsApp with a prefilled message
- **No Payment**: No payment gateway — cash on delivery model

### Configuring WhatsApp
In **`js/order.js`**, change the WhatsApp number:
```javascript
const WHATSAPP_NUMBER = '1234567890';  // Your number (international format, no +)
```

### Pre-selecting a Product
Link to the order page with a product pre-selected:
```
order.html?product=disp-001
```

---

## 🌐 Deploying to GitHub Pages

### Method 1: Direct Deployment
1. Push your code to a GitHub repository
2. Go to **Settings → Pages**
3. Under **Source**, select `main` branch and `/ (root)` folder
4. Click **Save**
5. Your site will be live at `https://your-username.github.io/VapeVerse/`

### Method 2: Using GitHub Actions (Recommended)
1. Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/configure-pages@v4
      - uses: actions/upload-pages-artifact@v3
        with:
          path: '.'
      - uses: actions/deploy-pages@v4
```

2. Go to **Settings → Pages → Source** and select **GitHub Actions**
3. Push to `main` — the site deploys automatically

---

## 🎨 Customization

### Colors & Theme
Edit CSS variables in **`css/style.css`**:
```css
:root {
  --accent: #7b2ff7;          /* Primary purple */
  --accent-secondary: #06b6d4; /* Secondary cyan */
  --bg-primary: #0a0a0f;       /* Background dark */
  /* ... more variables */
}
```

### Fonts
The site uses **Inter** (body) and **Orbitron** (headings) from Google Fonts. Change them in the `<head>` of each HTML file and the CSS variables.

### Images
Replace Unsplash placeholder URLs in `products-data.js` with your own product images. Place local images in the `images/` folder.

---

## ⚠️ Important Notes

- **Static Only**: No server-side code. All logic runs in the browser.
- **No Payment**: This is intentional — no payment gateway is included.
- **WhatsApp Number**: Must be configured in `js/order.js` before deployment.
- **Product Images**: Replace placeholder URLs with real product photos for production.
- **Age Verification**: You may want to add an age gate for legal compliance.

---

## 📄 License

This project is open source. Customize it for your shop and deploy!
