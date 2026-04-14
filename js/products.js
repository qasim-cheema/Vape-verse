/**
 * VapeVerse — Products Page Logic
 * Rendering categories, featured products, and filtering
 */

// ─── Render Category Cards ───────────────────────────────
function renderCategories(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = PRODUCT_CATEGORIES.map(cat => {
    const count = getProductsByCategory(cat.key).length;
    return `
      <a href="products.html?category=${cat.key}" class="category-card fade-in" style="text-decoration: none; color: inherit;">
        <span class="category-icon">${cat.icon}</span>
        <h3>${cat.name}</h3>
        <p>${cat.description}</p>
        <p style="margin-top: 8px; font-size: 0.8rem; color: var(--accent-light);">${count} product${count !== 1 ? 's' : ''}</p>
      </a>
    `;
  }).join('');

  // Re-observe fade-in elements
  refreshFadeIn();
}

// ─── Render Featured Products ────────────────────────────
function renderFeaturedProducts(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const featured = getFeaturedProducts();
  container.innerHTML = featured.map(p => createProductCardHTML(p)).join('');

  refreshFadeIn();
}

// ─── Render All Products with Filtering ─────────────────
function initProductsPage() {
  const tabsContainer = document.getElementById('filterTabs');
  const gridContainer = document.getElementById('productsGrid');
  if (!tabsContainer || !gridContainer) return;

  // Build filter tabs
  const allTab = `<button class="filter-tab active" data-category="all">All Products</button>`;
  const categoryTabs = PRODUCT_CATEGORIES.map(cat =>
    `<button class="filter-tab" data-category="${cat.key}">${cat.icon} ${cat.name}</button>`
  ).join('');

  tabsContainer.innerHTML = allTab + categoryTabs;

  // Check URL for pre-selected category
  const urlCategory = getUrlParam('category');
  if (urlCategory) {
    const tab = tabsContainer.querySelector(`[data-category="${urlCategory}"]`);
    if (tab) {
      tabsContainer.querySelector('.filter-tab.active').classList.remove('active');
      tab.classList.add('active');
    }
  }

  // Render products
  renderFilteredProducts();

  // Tab click handlers
  tabsContainer.addEventListener('click', (e) => {
    const tab = e.target.closest('.filter-tab');
    if (!tab) return;

    tabsContainer.querySelector('.filter-tab.active').classList.remove('active');
    tab.classList.add('active');
    renderFilteredProducts();
  });

  // Order button click — navigate to order page with product pre-selected
  gridContainer.addEventListener('click', (e) => {
    const orderBtn = e.target.closest('.product-order-btn');
    if (orderBtn) return; // Let the link work naturally
  });
}

function renderFilteredProducts() {
  const gridContainer = document.getElementById('productsGrid');
  const tabsContainer = document.getElementById('filterTabs');
  if (!gridContainer || !tabsContainer) return;

  const activeTab = tabsContainer.querySelector('.filter-tab.active');
  const category = activeTab ? activeTab.dataset.category : 'all';

  let products;
  if (category === 'all') {
    products = PRODUCTS;
  } else {
    products = getProductsByCategory(category);
  }

  if (products.length === 0) {
    gridContainer.innerHTML = `
      <div class="no-results">
        <div class="no-results-icon">🔍</div>
        <p>No products found in this category</p>
      </div>
    `;
  } else {
    gridContainer.innerHTML = products.map(p => createProductCardHTML(p)).join('');
  }

  refreshFadeIn();
}

// ─── Refresh fade-in observer ────────────────────────────
// Stored observer for cleanup
let _fadeInObserver = null;

function refreshFadeIn() {
  // Disconnect previous observer to prevent memory leaks
  if (_fadeInObserver) {
    _fadeInObserver.disconnect();
  }

  const elements = document.querySelectorAll('.fade-in:not(.visible)');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -30px 0px'
  });

  _fadeInObserver = observer;

  elements.forEach(el => observer.observe(el));

  // Immediately show elements already in viewport
  elements.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      el.classList.add('visible');
    }
  });
}
