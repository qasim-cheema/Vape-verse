/**
 * VapeVerse — Main JavaScript
 * Navbar, scroll, animations, and shared utilities
 */

// ─── Navbar Scroll Effect ────────────────────────────────
(function() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    if (currentScroll > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    lastScroll = currentScroll;
  });
})();

// ─── Mobile Nav Toggle ───────────────────────────────────
(function() {
  const toggle = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');
  if (!toggle || !links) return;

  toggle.addEventListener('click', () => {
    toggle.classList.toggle('active');
    links.classList.toggle('open');
  });

  // Close mobile nav when clicking a link
  links.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      toggle.classList.remove('active');
      links.classList.remove('open');
    });
  });

  // Close mobile nav when clicking outside
  document.addEventListener('click', (e) => {
    if (!toggle.contains(e.target) && !links.contains(e.target)) {
      toggle.classList.remove('active');
      links.classList.remove('open');
    }
  });
})();

// ─── Fade-in on Scroll (Intersection Observer) ──────────
(function() {
  const elements = document.querySelectorAll('.fade-in');
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  elements.forEach(el => observer.observe(el));
})();

// ─── Utility: Format price ──────────────────────────────
function formatPrice(amount) {
  return 'Rs. ' + amount.toLocaleString('en-US');
}

// ─── Utility: Get URL parameters ─────────────────────────
function getUrlParam(key) {
  const params = new URLSearchParams(window.location.search);
  return params.get(key);
}

// ─── Utility: Create product card HTML ───────────────────
function createProductCardHTML(product) {
  const category = getCategoryInfo(product.category);
  const categoryName = category ? category.name : product.category;
  const badgeHTML = product.badge 
    ? `<span class="product-badge">${product.badge}</span>` 
    : '';
  const categoryTag = `<span class="product-category-tag">${categoryName}</span>`;
  const fallbackIcon = category ? category.icon : '💨';

  return `
    <div class="product-card fade-in" data-category="${product.category}" data-id="${product.id}">
      <div class="product-image">
        <img src="${product.image}" alt="${product.name}" loading="lazy" 
             onerror="this.style.display='none'; var fb=document.createElement('span');fb.style.cssText='font-size:3rem;opacity:0.3';fb.textContent='${fallbackIcon}';this.parentElement.appendChild(fb);">
        ${badgeHTML}
      </div>
      <div class="product-body">
        ${categoryTag}
        <h3 class="product-name">${product.name}</h3>
        <p class="product-desc">${product.description}</p>
        <div class="product-footer">
          <span class="product-price">${formatPrice(product.price)}</span>
          <a href="order.html?product=${product.id}" class="product-order-btn">Order →</a>
        </div>
      </div>
    </div>
  `;
}
