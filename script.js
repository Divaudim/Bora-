// Ícones SVG (strings, renderizados no innerHTML)
const ICONS = {
  headphones: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1v-6h3v4zM3 19a2 2 0 0 0 2 2h1v-6H3v4z"/></svg>',
  earbuds: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="7" cy="8" r="3"/><circle cx="17" cy="8" r="3"/><path d="M7 11v6a2 2 0 0 0 2 2"/><path d="M17 11v6a2 2 0 0 1-2 2"/></svg>',
  speaker: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="2" width="14" height="20" rx="3"/><circle cx="12" cy="14" r="4"/><circle cx="12" cy="7" r="1"/></svg>',
  watch: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="6"/><path d="M9 3h6l-1 3h-4z"/><path d="M9 21h6l-1-3h-4z"/><path d="M12 10v2l1 1"/></svg>',
  band: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="7" y="6" width="10" height="12" rx="2"/><path d="M9 6V3h6v3M9 18v3h6v-3"/></svg>',
  keyboard: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="6" width="20" height="12" rx="2"/><path d="M6 10h.01M10 10h.01M14 10h.01M18 10h.01M6 14h12"/></svg>',
  mouse: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="2" width="12" height="20" rx="6"/><path d="M12 6v4"/></svg>',
  monitor: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>',
  phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="7" y="2" width="10" height="20" rx="2"/><path d="M11 18h2"/></svg>',
  charger: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="7" width="12" height="14" rx="2"/><path d="M9 7V3M15 7V3M12 12l-2 3h4l-2 3"/></svg>',
};

const PRODUCTS = [
  { id: 'p1', name: 'Fone Over-Ear Pulse X', category: 'audio', price: 899, old: 1199, icon: 'headphones', tag: 'Novo' },
  { id: 'p2', name: 'Earbuds Nimbus Pro', category: 'audio', price: 549, icon: 'earbuds', tag: 'Bluetooth 5.3' },
  { id: 'p3', name: 'Caixa de Som Nova 200W', category: 'audio', price: 1299, old: 1499, icon: 'speaker', tag: 'Bass boost' },
  { id: 'p4', name: 'Smartwatch Orbit 3', category: 'wearables', price: 1799, icon: 'watch', tag: 'GPS + SpO2' },
  { id: 'p5', name: 'Pulseira Fit Lite', category: 'wearables', price: 349, old: 499, icon: 'band', tag: 'Promo' },
  { id: 'p6', name: 'Teclado Mecânico K75', category: 'perifericos', price: 679, icon: 'keyboard', tag: 'Hot-swap' },
  { id: 'p7', name: 'Mouse Gamer Zen 8K', category: 'perifericos', price: 389, icon: 'mouse', tag: '8000 DPI' },
  { id: 'p8', name: 'Monitor UltraWide 34"', category: 'perifericos', price: 3299, old: 3799, icon: 'monitor', tag: '144Hz' },
  { id: 'p9', name: 'Smartphone Nova S', category: 'mobile', price: 2599, icon: 'phone', tag: '5G' },
  { id: 'p10', name: 'Carregador GaN 65W', category: 'mobile', price: 199, icon: 'charger', tag: 'USB-C' },
];

const money = v => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

// Estado do carrinho
const CART_KEY = 'bora.cart.v1';
const loadCart = () => { try { return JSON.parse(localStorage.getItem(CART_KEY)) || {}; } catch { return {}; } };
const saveCart = c => localStorage.setItem(CART_KEY, JSON.stringify(c));
let cart = loadCart();

// Renderização do catálogo
const grid = document.getElementById('product-grid');
function renderGrid(filter = 'all') {
  const items = PRODUCTS.filter(p => filter === 'all' || p.category === filter);
  grid.innerHTML = items.map(p => `
    <article class="card reveal" data-id="${p.id}">
      <div class="card-media">${ICONS[p.icon]}</div>
      <div class="card-body">
        <span class="card-tag">${p.tag}</span>
        <h3 class="card-title">${p.name}</h3>
        <div class="card-price">
          ${money(p.price)}
          ${p.old ? `<span class="old">${money(p.old)}</span>` : ''}
        </div>
        <div class="card-foot">
          <button class="btn btn-primary btn-block add-btn" data-id="${p.id}">Adicionar</button>
        </div>
      </div>
    </article>
  `).join('');
  observeReveal();
}

// Filtros
document.querySelectorAll('.chip').forEach(chip => {
  chip.addEventListener('click', () => {
    document.querySelectorAll('.chip').forEach(c => {
      c.classList.remove('is-active');
      c.setAttribute('aria-selected', 'false');
    });
    chip.classList.add('is-active');
    chip.setAttribute('aria-selected', 'true');
    renderGrid(chip.dataset.filter);
  });
});

// Adicionar ao carrinho (delegação)
grid.addEventListener('click', e => {
  const btn = e.target.closest('.add-btn');
  if (!btn) return;
  const id = btn.dataset.id;
  cart[id] = (cart[id] || 0) + 1;
  saveCart(cart);
  updateCartUI();
  openDrawer();
});

// Drawer
const drawer = document.getElementById('cart-drawer');
const scrim = document.getElementById('scrim');
const openDrawer = () => {
  drawer.classList.add('is-open');
  drawer.setAttribute('aria-hidden', 'false');
  scrim.hidden = false;
};
const closeDrawer = () => {
  drawer.classList.remove('is-open');
  drawer.setAttribute('aria-hidden', 'true');
  scrim.hidden = true;
};
document.getElementById('cart-open').addEventListener('click', openDrawer);
document.getElementById('cart-close').addEventListener('click', closeDrawer);
scrim.addEventListener('click', closeDrawer);
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeDrawer(); });

// Render do carrinho
const cartItemsEl = document.getElementById('cart-items');
const cartTotalEl = document.getElementById('cart-total');
const cartCountEl = document.getElementById('cart-count');

function updateCartUI() {
  const entries = Object.entries(cart).filter(([, qty]) => qty > 0);
  const count = entries.reduce((s, [, qty]) => s + qty, 0);
  cartCountEl.textContent = count;

  if (entries.length === 0) {
    cartItemsEl.innerHTML = '<div class="drawer-empty">Seu carrinho está vazio.<br>Escolha um produto no catálogo.</div>';
    cartTotalEl.textContent = money(0);
    return;
  }

  let total = 0;
  cartItemsEl.innerHTML = entries.map(([id, qty]) => {
    const p = PRODUCTS.find(x => x.id === id);
    if (!p) return '';
    total += p.price * qty;
    return `
      <div class="cart-item" data-id="${id}">
        <div class="thumb">${ICONS[p.icon]}</div>
        <div class="meta">
          <h4>${p.name}</h4>
          <p>${money(p.price)}</p>
          <button class="remove" data-remove="${id}">Remover</button>
        </div>
        <div class="qty">
          <button data-dec="${id}" aria-label="Diminuir quantidade">−</button>
          <span>${qty}</span>
          <button data-inc="${id}" aria-label="Aumentar quantidade">+</button>
        </div>
      </div>
    `;
  }).join('');
  cartTotalEl.textContent = money(total);
}

cartItemsEl.addEventListener('click', e => {
  const t = e.target;
  const inc = t.dataset.inc, dec = t.dataset.dec, rm = t.dataset.remove;
  if (inc) cart[inc] = (cart[inc] || 0) + 1;
  if (dec) cart[dec] = Math.max(0, (cart[dec] || 0) - 1);
  if (rm) delete cart[rm];
  if (inc || dec || rm) { saveCart(cart); updateCartUI(); }
});

// Checkout (demo)
const dialog = document.getElementById('confirm-dialog');
document.getElementById('checkout').addEventListener('click', () => {
  const count = Object.values(cart).reduce((s, q) => s + q, 0);
  if (count === 0) return;
  cart = {};
  saveCart(cart);
  updateCartUI();
  closeDrawer();
  if (typeof dialog.showModal === 'function') dialog.showModal();
});
document.getElementById('dialog-close').addEventListener('click', () => dialog.close());

// Reveal on scroll
let observer;
function observeReveal() {
  if (!('IntersectionObserver' in window)) {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
    return;
  }
  if (observer) observer.disconnect();
  observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// Ano no footer
document.getElementById('year').textContent = new Date().getFullYear();

// Init
renderGrid('all');
updateCartUI();
