// ============================================================
// Bora Figurinhas — loja de figurinhas da Copa 2026
// Frontend estático + checkout via Mercado Pago
// ============================================================

const IMG = (kw, lock) =>
  `https://loremflickr.com/600/600/${encodeURIComponent(kw)}?lock=${lock}`;

// 28 itens da coleção da Copa 2026.
// Categorias: pacotinhos · albuns · especiais · kits · acessorios
const PRODUCTS = [
  // ── Pacotinhos ────────────────────────────────────────────────────
  { id:'p01', name:'Pacotinho c/ 5 figurinhas',           category:'pacotinhos', old:   7.90, price:   4.99, kw:'soccer,sticker,pack',     lock:201, tag:'5 figurinhas',          rating:4.8, reviews:5230, badge:'bestseller' },
  { id:'p02', name:'Caixinha c/ 5 pacotinhos',            category:'pacotinhos', old:  39.50, price:  24.90, kw:'soccer,trading,cards',    lock:202, tag:'25 figurinhas',         rating:4.8, reviews:1842, badge:null         },
  { id:'p03', name:'Caixa fechada · 50 pacotinhos',       category:'pacotinhos', old: 395.00, price: 249.90, kw:'soccer,box,cards',        lock:203, tag:'250 figurinhas',        rating:4.9, reviews: 980, badge:'bestseller' },
  { id:'p04', name:'Box display · 100 pacotinhos',        category:'pacotinhos', old: 790.00, price: 499.90, kw:'football,collection',     lock:204, tag:'500 figurinhas',        rating:4.9, reviews: 412, badge:null         },
  { id:'p05', name:'Caixa especial Lendas · 30 pacotinhos', category:'pacotinhos', old: 290.00, price: 189.90, kw:'soccer,legends,gold',   lock:205, tag:'+1 lenda garantida',    rating:4.9, reviews: 226, badge:'new'        },

  // ── Álbuns ────────────────────────────────────────────────────────
  { id:'p06', name:'Álbum oficial capa mole',             category:'albuns',     old:  44.90, price:  29.90, kw:'sticker,album,soccer',    lock:210, tag:'Capa mole',             rating:4.7, reviews:3120, badge:'bestseller' },
  { id:'p07', name:'Álbum oficial capa dura',             category:'albuns',     old: 129.90, price:  89.90, kw:'sticker,album,hardcover', lock:211, tag:'Capa dura',             rating:4.9, reviews:2210, badge:null         },
  { id:'p08', name:'Álbum dourado edição limitada',       category:'albuns',     old: 299.90, price: 199.90, kw:'gold,album,book',         lock:212, tag:'Edição limitada',       rating:5.0, reviews: 318, badge:'new'        },
  { id:'p09', name:'Álbum capa dura + 10 figurinhas',     category:'albuns',     old: 149.90, price: 109.90, kw:'soccer,scrapbook',        lock:213, tag:'Brinde inclusos',       rating:4.8, reviews: 884, badge:null         },

  // ── Lendas & Raras (especiais) ────────────────────────────────────
  { id:'p10', name:'Figurinha Lenda · #10 Argentino',     category:'especiais',  old:  79.90, price:  49.90, kw:'argentina,soccer,star',   lock:220, tag:'Lenda holográfica',     rating:4.9, reviews:1108, badge:'bestseller' },
  { id:'p11', name:'Figurinha Lenda · #7 Francês',        category:'especiais',  old:  79.90, price:  49.90, kw:'france,soccer,striker',   lock:221, tag:'Lenda holográfica',     rating:4.8, reviews: 942, badge:null         },
  { id:'p12', name:'Figurinha Lenda · #10 Brasileiro',    category:'especiais',  old:  79.90, price:  49.90, kw:'brazil,soccer,player',    lock:222, tag:'Lenda holográfica',     rating:4.9, reviews:2334, badge:'bestseller' },
  { id:'p13', name:'Figurinha Lenda · Camisa 7 amarela',  category:'especiais',  old:  79.90, price:  49.90, kw:'brazil,striker,yellow',   lock:223, tag:'Lenda holográfica',     rating:4.8, reviews:1450, badge:null         },
  { id:'p14', name:'Figurinha Lenda · #9 Norueguês',      category:'especiais',  old:  79.90, price:  49.90, kw:'norway,soccer,goal',      lock:224, tag:'Lenda holográfica',     rating:4.7, reviews: 612, badge:null         },
  { id:'p15', name:'Figurinha Eterna · O Rei',            category:'especiais',  old: 159.90, price:  99.90, kw:'pele,brazil,vintage',     lock:225, tag:'Eterna · ouro',         rating:5.0, reviews: 488, badge:'new'        },
  { id:'p16', name:'Figurinha Eterna · El Diez',          category:'especiais',  old: 159.90, price:  99.90, kw:'maradona,argentina',      lock:226, tag:'Eterna · ouro',         rating:5.0, reviews: 392, badge:'new'        },
  { id:'p17', name:'Escudo dourado da Seleção Brasileira',category:'especiais',  old:  59.90, price:  39.90, kw:'brazil,crest,badge',      lock:227, tag:'Foil dourado',          rating:4.8, reviews: 711, badge:null         },
  { id:'p18', name:'Mascote oficial holográfica',         category:'especiais',  old:  39.90, price:  24.90, kw:'mascot,soccer,2026',      lock:228, tag:'Holográfica',           rating:4.7, reviews: 503, badge:null         },
  { id:'p19', name:'Set 32 escudos das seleções',         category:'especiais',  old: 119.90, price:  79.90, kw:'national,team,badge',     lock:229, tag:'32 escudos',            rating:4.8, reviews: 274, badge:null         },

  // ── Kits ──────────────────────────────────────────────────────────
  { id:'p20', name:'Kit Iniciante: álbum + 10 pacotinhos',category:'kits',       old: 129.90, price:  79.90, kw:'soccer,album,starter',    lock:240, tag:'Álbum + 50 figurinhas', rating:4.8, reviews:1442, badge:'bestseller' },
  { id:'p21', name:'Kit Colecionador: capa dura + 50 pacotinhos', category:'kits', old: 559.90, price: 339.90, kw:'collection,box,album', lock:241, tag:'Capa dura + 250',       rating:4.9, reviews: 612, badge:null         },
  { id:'p22', name:'Kit Premium: dourado + 100 pacotinhos', category:'kits',     old:1099.90, price: 699.90, kw:'premium,gold,collector',  lock:242, tag:'Edição dourada + 500',  rating:5.0, reviews: 188, badge:'new'        },
  { id:'p23', name:'Kit Família: 2 álbuns + 60 pacotinhos', category:'kits',     old: 459.90, price: 289.90, kw:'family,album,sticker',    lock:243, tag:'2 álbuns + 300',        rating:4.8, reviews: 244, badge:null         },

  // ── Acessórios ────────────────────────────────────────────────────
  { id:'p24', name:'Plástico protetor (pacote c/ 50)',    category:'acessorios', old:  29.90, price:  19.90, kw:'plastic,sleeve',          lock:250, tag:'Anti-amassado',         rating:4.8, reviews:1820, badge:null         },
  { id:'p25', name:'Porta-figurinhas com 60 espaços',     category:'acessorios', old:  59.90, price:  39.90, kw:'binder,trading,card',     lock:251, tag:'Capa zíper',            rating:4.7, reviews: 952, badge:null         },
  { id:'p26', name:'Caderno organizador de repetidas',    category:'acessorios', old:  39.90, price:  24.90, kw:'notebook,organizer',      lock:252, tag:'Lista p/ trocas',       rating:4.6, reviews: 416, badge:null         },
  { id:'p27', name:'Tapete de troca emborrachado',        category:'acessorios', old:  49.90, price:  29.90, kw:'mat,playmat,green',       lock:253, tag:'60 × 40 cm',            rating:4.7, reviews: 322, badge:null         },
  { id:'p28', name:'Display acrílico p/ figurinha lenda', category:'acessorios', old: 119.90, price:  89.90, kw:'acrylic,display,frame',   lock:254, tag:'Vitrine premium',       rating:4.9, reviews: 178, badge:'new'        },
];

// Frete por UF — cobre 26 estados + DF
const FRETE_POR_UF = {
  SP:{v:14.90, p:'2-3 dias úteis'},
  RJ:{v:19.90, p:'3-5 dias úteis'}, MG:{v:19.90, p:'3-5 dias úteis'}, ES:{v:19.90, p:'3-5 dias úteis'},
  PR:{v:19.90, p:'3-5 dias úteis'}, SC:{v:22.90, p:'3-6 dias úteis'}, RS:{v:24.90, p:'4-7 dias úteis'},
  DF:{v:24.90, p:'4-6 dias úteis'}, GO:{v:24.90, p:'4-6 dias úteis'},
  MT:{v:34.90, p:'5-8 dias úteis'}, MS:{v:34.90, p:'5-8 dias úteis'},
  BA:{v:29.90, p:'5-8 dias úteis'}, SE:{v:29.90, p:'5-8 dias úteis'},
  AL:{v:34.90, p:'6-9 dias úteis'}, PE:{v:34.90, p:'6-9 dias úteis'},
  PB:{v:34.90, p:'6-9 dias úteis'}, RN:{v:34.90, p:'6-9 dias úteis'},
  CE:{v:39.90, p:'7-10 dias úteis'}, PI:{v:39.90, p:'7-10 dias úteis'}, MA:{v:39.90, p:'7-10 dias úteis'},
  TO:{v:44.90, p:'7-10 dias úteis'}, PA:{v:44.90, p:'7-10 dias úteis'},
  AM:{v:49.90, p:'10-15 dias úteis'}, RO:{v:49.90, p:'10-15 dias úteis'}, AC:{v:49.90, p:'10-15 dias úteis'},
  AP:{v:54.90, p:'12-18 dias úteis'}, RR:{v:54.90, p:'12-18 dias úteis'},
};
const FRETE_GRATIS_ACIMA = 199;

// ============================================================
// Helpers
// ============================================================
const money = v => (v).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
const $ = sel => document.querySelector(sel);
const $$ = sel => document.querySelectorAll(sel);

const stars = r => {
  const full = Math.floor(r);
  const half = r - full >= 0.5;
  return '★'.repeat(full) + (half ? '½' : '') + '☆'.repeat(5 - full - (half ? 1 : 0));
};

// ============================================================
// Estado
// ============================================================
const CART_KEY = 'bora.figurinhas.cart.v1';
const STATE_KEY = 'bora.figurinhas.checkout.v1';
const loadCart = () => { try { return JSON.parse(localStorage.getItem(CART_KEY)) || {}; } catch { return {}; } };
const saveCart = c => localStorage.setItem(CART_KEY, JSON.stringify(c));
const loadState = () => { try { return JSON.parse(localStorage.getItem(STATE_KEY)) || {}; } catch { return {}; } };
const saveState = s => localStorage.setItem(STATE_KEY, JSON.stringify(s));
let cart = loadCart();
let state = loadState();
let currentStep = 1;
let currentFilter = 'all';
let currentSearch = '';

// ============================================================
// Render do catálogo
// ============================================================
const gridEl = $('#product-grid');
const emptyEl = $('#empty-state');

function renderGrid() {
  const items = PRODUCTS.filter(p => {
    const okCat = currentFilter === 'all' || p.category === currentFilter;
    const okSearch = !currentSearch ||
      p.name.toLowerCase().includes(currentSearch) ||
      p.tag.toLowerCase().includes(currentSearch);
    return okCat && okSearch;
  });

  if (items.length === 0) {
    gridEl.innerHTML = '';
    emptyEl.hidden = false;
    return;
  }
  emptyEl.hidden = true;

  gridEl.innerHTML = items.map(p => {
    const parcela = (p.price / 12).toFixed(2).replace('.', ',');
    const pix = p.price * 0.95;
    const desc = Math.round((1 - p.price / p.old) * 100);
    const badge = p.badge === 'bestseller'
      ? '<span class="card-badge bestseller">Mais vendido</span>'
      : p.badge === 'new'
        ? '<span class="card-badge new">Novidade</span>'
        : `<span class="card-badge">-${desc}%</span>`;
    return `
      <article class="card reveal" data-id="${p.id}">
        <div class="card-media">
          ${badge}
          <img src="${IMG(p.kw, p.lock)}" alt="${p.name}" loading="lazy" onerror="this.onerror=null;this.src='https://picsum.photos/seed/${p.lock}/600/600';" />
        </div>
        <div class="card-body">
          <span class="card-tag">${p.tag}</span>
          <h3 class="card-title">${p.name}</h3>
          <div class="card-rating"><span class="stars" aria-hidden="true">${stars(p.rating)}</span> ${p.rating.toFixed(1)} · ${p.reviews.toLocaleString('pt-BR')} avaliações</div>
          <div class="card-price-group">
            <span class="card-old">de ${money(p.old)}</span>
            <span class="card-price">${money(p.price)}</span>
            <span class="card-installment">ou 12x de R$ ${parcela} sem juros</span>
            <span class="card-pix">${money(pix)} no PIX</span>
          </div>
          <div class="card-foot">
            <button class="btn btn-primary btn-block add-btn" data-id="${p.id}">Adicionar</button>
          </div>
        </div>
      </article>`;
  }).join('');

  observeReveal();
}

// Filtros
$$('.chip').forEach(chip => {
  chip.addEventListener('click', () => {
    $$('.chip').forEach(c => { c.classList.remove('is-active'); c.setAttribute('aria-selected','false'); });
    chip.classList.add('is-active');
    chip.setAttribute('aria-selected','true');
    currentFilter = chip.dataset.filter;
    renderGrid();
  });
});

// Busca
$('#search-input').addEventListener('input', e => {
  currentSearch = e.target.value.trim().toLowerCase();
  renderGrid();
});

// Adicionar ao carrinho
gridEl.addEventListener('click', e => {
  const btn = e.target.closest('.add-btn');
  if (!btn) return;
  const id = btn.dataset.id;
  cart[id] = (cart[id] || 0) + 1;
  saveCart(cart);
  updateCartUI();
  openDrawer(1);
});

// ============================================================
// Drawer + steps
// ============================================================
const drawer = $('#cart-drawer');
const scrim = $('#scrim');
const nextBtn = $('#next-btn');
const backBtn = $('#back-btn');
const stepperEl = $('#stepper');
const mpNote = $('#mp-note');

function openDrawer(step = 1) {
  drawer.classList.add('is-open');
  drawer.setAttribute('aria-hidden','false');
  scrim.hidden = false;
  goToStep(step);
}
function closeDrawer() {
  drawer.classList.remove('is-open');
  drawer.setAttribute('aria-hidden','true');
  scrim.hidden = true;
}
function goToStep(n) {
  currentStep = n;
  $$('.step-panel').forEach(p => p.classList.toggle('is-active', Number(p.dataset.panel) === n));
  $$('.step').forEach(s => {
    const num = Number(s.dataset.step);
    s.classList.toggle('is-active', num === n);
    s.classList.toggle('is-done', num < n);
  });
  const hasItems = Object.values(cart).some(q => q > 0);
  stepperEl.setAttribute('aria-hidden', hasItems ? 'false' : 'true');
  backBtn.hidden = n === 1;
  mpNote.hidden = n !== 3;
  $('#drawer-title').textContent = n === 1 ? 'Seu carrinho' : n === 2 ? 'Dados de entrega' : 'Pagamento';

  if (n === 1) nextBtn.textContent = 'Continuar para entrega';
  else if (n === 2) nextBtn.textContent = 'Continuar para pagamento';
  else nextBtn.textContent = 'Pagar com Mercado Pago';

  if (n === 3) renderSummary();
  updateNextBtnState();
}

$('#cart-open').addEventListener('click', () => openDrawer(1));
$('#cart-close').addEventListener('click', closeDrawer);
scrim.addEventListener('click', closeDrawer);
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeDrawer(); });
backBtn.addEventListener('click', () => goToStep(Math.max(1, currentStep - 1)));
nextBtn.addEventListener('click', onNext);

function onNext() {
  if (currentStep === 1) {
    if (!Object.values(cart).some(q => q > 0)) return;
    goToStep(2);
  } else if (currentStep === 2) {
    if (!validateAddress()) return;
    goToStep(3);
  } else {
    submitCheckout();
  }
}

function updateNextBtnState() {
  const hasItems = Object.values(cart).some(q => q > 0);
  if (currentStep === 1) nextBtn.disabled = !hasItems;
  else if (currentStep === 2) nextBtn.disabled = !addressLooksValid();
  else nextBtn.disabled = !hasItems;
}

// ============================================================
// Carrinho UI
// ============================================================
const cartItemsEl = $('#cart-items');
const cartCountEl = $('#cart-count');

function updateCartUI() {
  const entries = Object.entries(cart).filter(([, q]) => q > 0);
  const count = entries.reduce((s, [, q]) => s + q, 0);
  cartCountEl.textContent = count;

  if (entries.length === 0) {
    cartItemsEl.innerHTML = '<div class="drawer-empty">Seu carrinho está vazio.<br>Escolha pacotinhos, álbuns ou figurinhas raras.</div>';
  } else {
    cartItemsEl.innerHTML = entries.map(([id, qty]) => {
      const p = PRODUCTS.find(x => x.id === id);
      if (!p) return '';
      return `
        <div class="cart-item" data-id="${id}">
          <div class="thumb"><img src="${IMG(p.kw, p.lock)}" alt="" loading="lazy" onerror="this.onerror=null;this.src='https://picsum.photos/seed/${p.lock}/120/120';"/></div>
          <div class="meta">
            <h4>${p.name}</h4>
            <p>${money(p.price)}</p>
            <button class="remove" data-remove="${id}">Remover</button>
          </div>
          <div class="qty">
            <button data-dec="${id}" aria-label="Diminuir">−</button>
            <span>${qty}</span>
            <button data-inc="${id}" aria-label="Aumentar">+</button>
          </div>
        </div>`;
    }).join('');
  }
  updateNextBtnState();
}

cartItemsEl.addEventListener('click', e => {
  const t = e.target;
  const inc = t.dataset.inc, dec = t.dataset.dec, rm = t.dataset.remove;
  if (inc) cart[inc] = (cart[inc] || 0) + 1;
  if (dec) { cart[dec] = Math.max(0, (cart[dec] || 0) - 1); if (cart[dec] === 0) delete cart[dec]; }
  if (rm) delete cart[rm];
  if (inc || dec || rm) { saveCart(cart); updateCartUI(); if (currentStep === 3) renderSummary(); }
});

// ============================================================
// CEP + endereço
// ============================================================
const cepInput = $('#cep');
const cepBtn = $('#cep-btn');
const shippingBox = $('#shipping-result');
const addrFields = ['buyer-name','buyer-phone','addr-street','addr-number','addr-complement','addr-neighborhood','addr-city','addr-state'];

cepInput.addEventListener('input', e => {
  let v = e.target.value.replace(/\D/g, '').slice(0, 8);
  if (v.length > 5) v = v.slice(0,5) + '-' + v.slice(5);
  e.target.value = v;
});
cepInput.addEventListener('blur', () => maybeLookupCep());
cepBtn.addEventListener('click', () => maybeLookupCep(true));

async function maybeLookupCep(force = false) {
  const raw = cepInput.value.replace(/\D/g,'');
  if (raw.length !== 8) { if (force) showShipping(null, 'CEP incompleto.'); return; }
  shippingBox.hidden = false;
  shippingBox.innerHTML = '<em class="muted">Consultando endereço…</em>';
  try {
    const r = await fetch(`https://viacep.com.br/ws/${raw}/json/`);
    const d = await r.json();
    if (d.erro) { showShipping(null, 'CEP não encontrado.'); return; }
    $('#addr-street').value = d.logradouro || $('#addr-street').value;
    $('#addr-neighborhood').value = d.bairro || $('#addr-neighborhood').value;
    $('#addr-city').value = d.localidade || $('#addr-city').value;
    $('#addr-state').value = (d.uf || '').toUpperCase();
    computeShipping();
  } catch {
    showShipping(null, 'Falha na consulta do CEP. Preencha manualmente.');
  }
}

function subtotal() {
  return Object.entries(cart).reduce((s, [id, q]) => {
    const p = PRODUCTS.find(x => x.id === id);
    return s + (p ? p.price * q : 0);
  }, 0);
}

function computeShipping() {
  const uf = $('#addr-state').value.toUpperCase().trim();
  const row = FRETE_POR_UF[uf];
  if (!row) { showShipping(null, 'Informe um estado válido (UF).'); return; }
  const sub = subtotal();
  const free = sub >= FRETE_GRATIS_ACIMA;
  showShipping({ uf, valor: free ? 0 : row.v, prazo: row.p, free });
}

function showShipping(info, err) {
  shippingBox.hidden = false;
  if (err) { shippingBox.classList.remove('is-free'); shippingBox.innerHTML = `<small class="muted">${err}</small>`; state.shipping = null; saveState(state); updateNextBtnState(); return; }
  shippingBox.classList.toggle('is-free', info.free);
  shippingBox.innerHTML = `
    <h4>Entrega para ${info.uf} ${info.free ? '<span class="free-tag">GRÁTIS</span>' : ''}</h4>
    <div class="row"><span>Prazo estimado</span><strong>${info.prazo}</strong></div>
    <div class="row"><span>Valor do frete</span><strong>${info.free ? 'R$ 0,00' : money(info.valor)}</strong></div>
  `;
  state.shipping = info;
  saveState(state);
  updateNextBtnState();
}

function addressLooksValid() {
  if (!state.shipping) return false;
  const required = ['buyer-name','buyer-phone','addr-street','addr-number','addr-neighborhood','addr-city','addr-state'];
  return required.every(id => ($('#'+id).value || '').trim().length > 0);
}
function validateAddress() {
  if (!state.shipping) { shippingBox.hidden = false; shippingBox.innerHTML = '<small class="muted">Informe o CEP e calcule o frete.</small>'; return false; }
  const required = ['buyer-name','buyer-phone','addr-street','addr-number','addr-neighborhood','addr-city','addr-state'];
  for (const id of required) {
    const el = $('#'+id);
    if (!(el.value || '').trim()) { el.focus(); el.style.borderColor = 'var(--accent-2)'; return false; }
    el.style.borderColor = '';
  }
  const data = {};
  addrFields.forEach(id => data[id] = $('#'+id).value.trim());
  state.buyer = data;
  saveState(state);
  return true;
}

addrFields.forEach(id => {
  $('#'+id).addEventListener('input', () => {
    if (id === 'addr-state') computeShipping();
    updateNextBtnState();
  });
});

// ============================================================
// Pagamento + resumo
// ============================================================
const summaryEl = $('#summary');

function currentPayment() {
  const el = document.querySelector('input[name="pay"]:checked');
  return el ? el.value : 'pix';
}
$$('input[name="pay"]').forEach(r => r.addEventListener('change', renderSummary));

function renderSummary() {
  const sub = subtotal();
  const ship = state.shipping ? (state.shipping.free ? 0 : state.shipping.valor) : 0;
  const pay = currentPayment();
  const discount = pay === 'pix' ? sub * 0.05 : pay === 'boleto' ? sub * 0.03 : 0;
  const total = sub - discount + ship;

  const parcela = pay === 'credit' ? (total / 12) : 0;
  const lines = [
    `<div class="line"><span>Subtotal (${Object.values(cart).reduce((s,q)=>s+q,0)} itens)</span><span>${money(sub)}</span></div>`,
    pay !== 'credit' ? `<div class="line discount"><span>Desconto ${pay === 'pix' ? 'PIX (5%)' : 'Boleto (3%)'}</span><span>-${money(discount)}</span></div>` : '',
    `<div class="line"><span>Frete ${state.shipping ? `(${state.shipping.uf})` : ''}</span><span>${state.shipping ? (state.shipping.free ? 'Grátis' : money(state.shipping.valor)) : '—'}</span></div>`,
    `<div class="line total"><span>Total</span><span>${money(total)}</span></div>`,
    pay === 'credit' ? `<div class="line"><span>12x sem juros de</span><span>${money(parcela)}</span></div>` : '',
  ].filter(Boolean).join('');
  summaryEl.innerHTML = lines;
}

// ============================================================
// Checkout → Mercado Pago (via /api/create-preference)
// ============================================================
const dialog = $('#confirm-dialog');
const dialogTitle = $('#dialog-title');
const dialogMsg = $('#dialog-msg');
const dialogIcon = document.querySelector('.dialog-icon');
const dialogClose = $('#dialog-close');

async function submitCheckout() {
  if (!addressLooksValid()) { goToStep(2); return; }

  const items = Object.entries(cart).map(([id, qty]) => {
    const p = PRODUCTS.find(x => x.id === id);
    return { id: p.id, title: p.name, quantity: qty, unit_price: p.price };
  });
  const pay = currentPayment();
  const sub = subtotal();
  const discount = pay === 'pix' ? sub * 0.05 : pay === 'boleto' ? sub * 0.03 : 0;

  nextBtn.disabled = true;
  nextBtn.textContent = 'Processando…';

  dialogIcon.innerHTML = '<div class="spinner"></div>';
  dialogTitle.textContent = 'Redirecionando para o pagamento…';
  dialogMsg.textContent = 'Você está sendo levado ao ambiente seguro do Mercado Pago.';
  dialogClose.hidden = true;
  if (typeof dialog.showModal === 'function') dialog.showModal();

  try {
    const resp = await fetch('/api/create-preference', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        items,
        shipping: state.shipping,
        buyer: state.buyer,
        payment_method: pay,
        discount,
      }),
    });
    const ct = resp.headers.get('content-type') || '';
    if (!resp.ok || !ct.includes('application/json')) {
      const text = await resp.text();
      throw new Error(resp.status === 404
        ? 'Endpoint não encontrado — o checkout só roda em ambiente Vercel (veja README).'
        : `Falha no checkout: ${resp.status}. ${text.slice(0, 120)}`);
    }
    const data = await resp.json();
    if (!data.init_point) throw new Error('Resposta do servidor sem init_point.');
    cart = {};
    saveCart(cart);
    window.location.href = data.init_point;
  } catch (err) {
    dialogIcon.innerHTML = '<svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>';
    dialogTitle.textContent = 'Não foi possível iniciar o pagamento';
    dialogMsg.textContent = err.message || 'Tente novamente em instantes.';
    dialogClose.hidden = false;
    nextBtn.disabled = false;
    nextBtn.textContent = 'Pagar com Mercado Pago';
  }
}

dialogClose.addEventListener('click', () => dialog.close());

// ============================================================
// Reveal + init
// ============================================================
let observer;
function observeReveal() {
  if (!('IntersectionObserver' in window)) {
    $$('.reveal').forEach(el => el.classList.add('visible'));
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
  $$('.reveal').forEach(el => observer.observe(el));
}

$('#year').textContent = new Date().getFullYear();

// Pre-fill from saved state
if (state.buyer) {
  Object.entries(state.buyer).forEach(([id, v]) => { const el = $('#'+id); if (el) el.value = v; });
  if (state.buyer['addr-state']) computeShipping();
}

renderGrid();
updateCartUI();
