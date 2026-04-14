/**
 * VapeVerse — Order Page Logic
 * Form handling, validation, WhatsApp integration, and live summary
 */

// ─── CONFIG ──────────────────────────────────────────────
// Change this to your WhatsApp number (international format, no + or spaces)
const WHATSAPP_NUMBER = '1234567890';

// ─── Initialize Order Page ───────────────────────────────
(function() {
  const form = document.getElementById('orderForm');
  const productSelect = document.getElementById('product');
  const whatsappBtn = document.getElementById('whatsappBtn');

  if (!form || !productSelect) return;

  // Populate product dropdown
  populateProductSelect();

  // Pre-select product from URL param
  const urlProduct = getUrlParam('product');
  if (urlProduct) {
    const option = productSelect.querySelector(`option[value="${urlProduct}"]`);
    if (option) {
      productSelect.value = urlProduct;
      updateSummary();
    }
  }

  // Live summary updates
  productSelect.addEventListener('change', updateSummary);
  document.getElementById('quantity').addEventListener('input', updateSummary);

  // Form submission
  form.addEventListener('submit', handleSubmit);

  // WhatsApp button
  if (whatsappBtn) {
    whatsappBtn.addEventListener('click', handleWhatsApp);
  }
})();

// ─── Populate Product Select ─────────────────────────────
function populateProductSelect() {
  const select = document.getElementById('product');
  if (!select) return;

  PRODUCT_CATEGORIES.forEach(cat => {
    const group = document.createElement('optgroup');
    group.label = `${cat.icon} ${cat.name}`;

    getProductsByCategory(cat.key).forEach(product => {
      const option = document.createElement('option');
      option.value = product.id;
      option.textContent = `${product.name} — ${formatPrice(product.price)}`;
      group.appendChild(option);
    });

    select.appendChild(group);
  });
}

// ─── Update Live Summary ─────────────────────────────────
function updateSummary() {
  const productId = document.getElementById('product').value;
  const quantity = parseInt(document.getElementById('quantity').value) || 1;
  const product = getProductById(productId);

  const summaryProduct = document.getElementById('summaryProduct');
  const summaryCategory = document.getElementById('summaryCategory');
  const summaryPrice = document.getElementById('summaryPrice');
  const summaryQuantity = document.getElementById('summaryQuantity');
  const summaryTotal = document.getElementById('summaryTotal');

  // Product preview elements
  const previewContainer = document.getElementById('productPreview');
  const previewImage = document.getElementById('previewImage');
  const previewName = document.getElementById('previewName');
  const previewCategory = document.getElementById('previewCategory');
  const previewDescription = document.getElementById('previewDescription');
  const previewBadge = document.getElementById('previewBadge');

  if (product) {
    const category = getCategoryInfo(product.category);
    summaryProduct.textContent = product.name;
    summaryCategory.textContent = category ? category.name : product.category;
    summaryPrice.textContent = formatPrice(product.price);
    summaryQuantity.textContent = quantity;
    summaryTotal.textContent = formatPrice(product.price * quantity);

    // Show product preview
    if (previewContainer) {
      // Reset previous fallback spans and restore image visibility
      previewImage.style.display = '';
      previewImage.parentElement.querySelectorAll('span').forEach(function(s) { s.remove(); });
      previewImage.src = product.image;
      previewImage.alt = product.name;
      previewImage.onerror = function() {
        this.style.display = 'none';
        var fb = document.createElement('span');
        fb.style.cssText = 'font-size:3rem;opacity:0.3';
        fb.textContent = category ? category.icon : '💨';
        this.parentElement.appendChild(fb);
      };
      previewName.textContent = product.name;
      previewCategory.textContent = category ? (category.icon + ' ' + category.name) : product.category;
      previewDescription.textContent = product.description;
      if (product.badge) {
        previewBadge.textContent = product.badge;
        previewBadge.style.display = 'inline-block';
      } else {
        previewBadge.style.display = 'none';
      }
      previewContainer.style.display = 'flex';
    }
  } else {
    summaryProduct.textContent = '—';
    summaryCategory.textContent = '—';
    summaryPrice.textContent = '—';
    summaryQuantity.textContent = quantity;
    summaryTotal.textContent = formatPrice(0);

    // Hide product preview
    if (previewContainer) {
      previewContainer.style.display = 'none';
    }
  }
}

// ─── Form Validation ─────────────────────────────────────
function validateForm() {
  let isValid = true;
  const fields = [
    { id: 'fullName', errorId: 'fullNameError', check: v => v.trim().length >= 2 },
    { id: 'phone', errorId: 'phoneError', check: v => v.trim().length >= 7 },
    { id: 'product', errorId: 'productError', check: v => v !== '' },
    { id: 'quantity', errorId: 'quantityError', check: v => parseInt(v) >= 1 },
    { id: 'address', errorId: 'addressError', check: v => v.trim().length >= 5 }
  ];

  // Email is optional, but if filled must be valid
  const email = document.getElementById('email');
  const emailError = document.getElementById('emailError');
  if (email && email.value.trim() && !isValidEmail(email.value)) {
    email.classList.add('invalid');
    emailError.classList.add('visible');
    isValid = false;
  } else {
    email.classList.remove('invalid');
    emailError.classList.remove('visible');
  }

  fields.forEach(({ id, errorId, check }) => {
    const input = document.getElementById(id);
    const error = document.getElementById(errorId);
    if (!input || !error) return;

    if (!check(input.value)) {
      input.classList.add('invalid');
      error.classList.add('visible');
      isValid = false;
    } else {
      input.classList.remove('invalid');
      error.classList.remove('visible');
    }
  });

  return isValid;
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// ─── Handle Form Submit ─────────────────────────────────
function handleSubmit(e) {
  e.preventDefault();

  if (!validateForm()) return;

  const orderData = getOrderData();

  // Display success modal
  const modal = document.getElementById('successModal');
  const modalMessage = document.getElementById('modalMessage');

  if (modal && modalMessage) {
    modalMessage.innerHTML = `
      Thank you, <strong>${orderData.name}</strong>!<br><br>
      Your order for <strong>${orderData.quantity}× ${orderData.productName}</strong> 
      has been submitted successfully.<br><br>
      We'll contact you at <strong>${orderData.phone}</strong> to confirm delivery.
    `;
    modal.classList.add('active');
  }

  // Log order (in production, this would go to a server)
  console.log('📦 Order Submitted:', orderData);

  // Reset form after submission
  document.getElementById('orderForm').reset();
  updateSummary();
}

// ─── Handle WhatsApp Order ───────────────────────────────
function handleWhatsApp() {
  if (!validateForm()) return;

  const orderData = getOrderData();
  const message = buildWhatsAppMessage(orderData);
  const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  
  window.open(whatsappURL, '_blank');
}

// ─── Get Order Data from Form ────────────────────────────
function getOrderData() {
  const productId = document.getElementById('product').value;
  const product = getProductById(productId);

  return {
    name: document.getElementById('fullName').value.trim(),
    phone: document.getElementById('phone').value.trim(),
    email: document.getElementById('email').value.trim(),
    productId: productId,
    productName: product ? product.name : 'Unknown',
    productCategory: product ? product.category : '',
    unitPrice: product ? product.price : 0,
    quantity: parseInt(document.getElementById('quantity').value) || 1,
    address: document.getElementById('address').value.trim(),
    notes: document.getElementById('notes').value.trim(),
    total: product ? product.price * (parseInt(document.getElementById('quantity').value) || 1) : 0
  };
}

// ─── Build WhatsApp Message ──────────────────────────────
function buildWhatsAppMessage(data) {
  let msg = `🛒 *VapeVerse Order*\n\n`;
  msg += `👤 *Name:* ${data.name}\n`;
  msg += `📞 *Phone:* ${data.phone}\n`;
  if (data.email) msg += `📧 *Email:* ${data.email}\n`;
  msg += `\n📦 *Product:* ${data.productName}\n`;
  msg += `💰 *Unit Price:* ${formatPrice(data.unitPrice)}\n`;
  msg += `🔢 *Quantity:* ${data.quantity}\n`;
  msg += `💰 *Total:* ${formatPrice(data.total)}\n`;
  msg += `\n📍 *Address:* ${data.address}\n`;
  if (data.notes) msg += `📝 *Notes:* ${data.notes}\n`;
  msg += `\n_Please confirm my order. Thank you!_`;
  return msg;
}

// ─── Close Modal ─────────────────────────────────────────
function closeModal() {
  const modal = document.getElementById('successModal');
  if (modal) {
    modal.classList.remove('active');
  }
}

// Close modal on overlay click
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal-overlay')) {
    closeModal();
  }
});

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});
