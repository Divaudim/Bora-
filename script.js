// ============================================================
// Bora Tech — loja estática com checkout Mercado Pago
// ============================================================

const IMG = (kw, lock) =>
  `https://loremflickr.com/600/600/${encodeURIComponent(kw)}?lock=${lock}`;

// 30 produtos, todos com 40% OFF aplicado (price = old * 0.6)
const PRODUCTS = [
  { id:'p1',  name:'Fone Over-Ear Pulse X',     category:'audio',        old: 899,  price: 539.40, kw:'headphones,black',       lock:101, tag:'Wireless',       rating:4.8, reviews:1240, badge:'bestseller' },
  { id:'p2',  name:'Earbuds Nimbus Pro',        category:'audio',        old: 549,  price: 329.40, kw:'earbuds,white',          lock:102, tag:'Bluetooth 5.3',  rating:4.7, reviews:892,  badge:null         },
  { id:'p3',  name:'Caixa de Som Nova 200W',    category:'audio',        old:1299,  price: 779.40, kw:'bluetooth,speaker',      lock:103, tag:'200W RMS',       rating:4.6, reviews:430,  badge:null         },
  { id:'p4',  name:'Soundbar Boreal 2.1',       category:'audio',        old:1499,  price: 899.40, kw:'soundbar,tv',            lock:104, tag:'Dolby Atmos',    rating:4.5, reviews:218,  badge:'new'        },
  { id:'p5',  name:'Fone Gamer Titan HP',       category:'audio',        old: 699,  price: 419.40, kw:'gaming,headset',         lock:105, tag:'7.1 Surround',   rating:4.7, reviews:1580, badge:'bestseller' },
  { id:'p6',  name:'Microfone USB Dynamo',      category:'audio',        old: 599,  price: 359.40, kw:'microphone,studio',      lock:106, tag:'Cardióide',      rating:4.8, reviews:342,  badge:null         },
  { id:'p7',  name:'Smartwatch Orbit 3',        category:'wearables',    old:1799,  price:1079.40, kw:'smartwatch,black',       lock:107, tag:'GPS + SpO2',     rating:4.8, reviews:2103, badge:'bestseller' },
  { id:'p8',  name:'Pulseira Fit Lite',         category:'wearables',    old: 349,  price: 209.40, kw:'fitness,band',           lock:108, tag:'14 dias bateria',rating:4.5, reviews:678,  badge:null         },
  { id:'p9',  name:'Smartwatch Solar Edge',     category:'wearables',    old:2499,  price:1499.40, kw:'smartwatch,sport',       lock:109, tag:'Carregamento solar', rating:4.9, reviews:544, badge:'new'   },
  { id:'p10', name:'Anel Inteligente Ring Zero',category:'wearables',    old:1299,  price: 779.40, kw:'smart,ring',             lock:110, tag:'Monitor de sono',rating:4.4, reviews:192,  badge:'new'        },
  { id:'p11', name:'Óculos Smart AR View',      category:'wearables',    old:2199,  price:1319.40, kw:'smart,glasses',          lock:111, tag:'Realidade aumentada', rating:4.3, reviews:88, badge:'new'   },
  { id:'p12', name:'Teclado Mecânico K75',      category:'perifericos',  old: 679,  price: 407.40, kw:'mechanical,keyboard',    lock:112, tag:'Hot-swap RGB',   rating:4.8, reviews:1022, badge:'bestseller' },
  { id:'p13', name:'Mouse Gamer Zen 8K',        category:'perifericos',  old: 389,  price: 233.40, kw:'gaming,mouse',           lock:113, tag:'8000 DPI',       rating:4.7, reviews:2341, badge:'bestseller' },
  { id:'p14', name:'Monitor UltraWide 34"',     category:'perifericos',  old:3299,  price:1979.40, kw:'ultrawide,monitor',      lock:114, tag:'144Hz / 1ms',    rating:4.9, reviews:412,  badge:null         },
  { id:'p15', name:'Monitor 4K 27"',            category:'perifericos',  old:2499,  price:1499.40, kw:'4k,monitor',             lock:115, tag:'IPS HDR400',     rating:4.8, reviews:689,  badge:null         },
  { id:'p16', name:'Webcam Ultra 4K',           category:'perifericos',  old: 499,  price: 299.40, kw:'webcam,camera',          lock:116, tag:'4K com autofoco',rating:4.5, reviews:278,  badge:null         },
  { id:'p17', name:'Mousepad XXL RGB',          category:'perifericos',  old: 199,  price: 119.40, kw:'mousepad,rgb',           lock:117, tag:'900x400mm',      rating:4.7, reviews:933,  badge:null         },
  { id:'p18', name:'Suporte Monitor Dual',      category:'perifericos',  old: 449,  price: 269.40, kw:'monitor,arm',            lock:118, tag:'Articulável',    rating:4.6, reviews:154,  badge:null         },
  { id:'p19', name:'Headset Wireless Pro',      category:'perifericos',  old: 899,  price: 539.40, kw:'wireless,headset',       lock:119, tag:'Dual Mic',       rating:4.7, reviews:812,  badge:null         },
  { id:'p20', name:'Smartphone Nova S',         category:'mobile',       old:2599,  price:1559.40, kw:'smartphone,modern',      lock:120, tag:'5G · 256GB',     rating:4.6, reviews:1842, badge:'bestseller' },
  { id:'p21', name:'Carregador GaN 65W',        category:'mobile',       old: 199,  price: 119.40, kw:'charger,usb-c',          lock:121, tag:'USB-C / PD',     rating:4.9, reviews:2210, badge:null         },
  { id:'p22', name:'Powerbank 20K mAh',         category:'mobile',       old: 299,  price: 179.40, kw:'powerbank,battery',      lock:122, tag:'Carga rápida',   rating:4.7, reviews:1344, badge:null         },
  { id:'p23', name:'Cabo USB-C Trançado 2m',    category:'mobile',       old:  79,  price:  47.40, kw:'usb,cable',              lock:123, tag:'100W PD',        rating:4.8, reviews:1876, badge:null         },
  { id:'p24', name:'Suporte Veicular Mag',      category:'mobile',       old: 149,  price:  89.40, kw:'car,mount',              lock:124, tag:'MagSafe',        rating:4.5, reviews:421,  badge:null         },
  { id:'p25', name:'Lâmpada Smart RGB',         category:'smart-home',   old:  99,  price:  59.40, kw:'smart,bulb',             lock:125, tag:'Wi-Fi + Alexa',  rating:4.4, reviews:2890, badge:null         },
  { id:'p26', name:'Câmera Wi-Fi 360°',         category:'smart-home',   old: 399,  price: 239.40, kw:'security,camera',        lock:126, tag:'Visão noturna',  rating:4.6, reviews:712,  badge:null         },
  { id:'p27', name:'Assistente Echo Tune',      category:'smart-home',   old: 499,  price: 299.40, kw:'smart,speaker',          lock:127, tag:'Controle por voz',rating:4.5, reviews:987, badge:null         },
  { id:'p28', name:'Controle Gamer Stratos',    category:'perifericos',  old: 349,  price: 209.40, kw:'game,controller',        lock:128, tag:'Wireless Hall', rating:4.7, reviews:512,  badge:null         },
  { id:'p29', name:'Notebook Ultra Pro 14"',    category:'computadores', old:5999,  price:3599.40, kw:'laptop,ultrabook',       lock:129, tag:'16GB / 512GB',   rating:4.8, reviews:289,  badge:'new'        },
  { id:'p30', name:'Tablet Slate 11"',          category:'computadores', old:2299,  price:1379.40, kw:'tablet,modern',          lock:130, tag:'128GB · 120Hz',  rating:4.6, reviews:344,  badge:null         },
];

// Frete por UF — cobre 26 estados + DF
const FRETE_POR_UF = {
  SP:{v:19.90, p:'2-3 dias úteis'},
  RJ:{v:29.90, p:'3-5 dias úteis'}, MG:{v:29.90, p:'3-5 dias úteis'}, ES:{v:29.90, p:'3-5 dias úteis'},
  PR:{v:29.90, p:'3-5 dias úteis'}, SC:{v:32.90, p:'3-6 dias úteis'}, RS:{v:34.90, p:'4-7 dias úteis'},
  DF:{v:34.90, p:'4-6 dias úteis'}, GO:{v:34.90, p:'4-6 dias úteis'},
  MT:{v:44.90, p:'5-8 dias úteis'}, MS:{v:44.90, p:'5-8 dias úteis'},
  BA:{v:39.90, p:'5-8 dias úteis'}, SE:{v:39.90, p:'5-8 dias úteis'},
  AL:{v:44.90, p:'6-9 dias úteis'}, PE:{v:44.90, p:'6-9 dias úteis'},
  PB:{v:44.90, p:'6-9 dias úteis'}, RN:{v:44.90, p:'6-9 dias úteis'},
  CE:{v:49.90, p:'7-10 dias úteis'}, PI:{v:49.90, p:'7-10 dias úteis'}, MA:{v:49.90, p:'7-10 dias úteis'},
  TO:{v:54.90, p:'7-10 dias úteis'}, PA:{v:54.90, p:'7-10 dias úteis'},
  AM:{v:59.90, p:'10-15 dias úteis'}, RO:{v:59.90, p:'10-15 dias úteis'}, AC:{v:59.90, p:'10-15 dias úteis'},
  AP:{v:64.90, p:'12-18 dias úteis'}, RR:{v:64.90, p:'12-18 dias úteis'},
};
const FRETE_GRATIS_ACIMA = 299;

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
const CART_KEY = 'bora.cart.v2';
const STATE_KEY = 'bora.checkout.v2';
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
    const badge = p.badge === 'bestseller'
      ? '<span class="card-badge bestseller">Mais vendido</span>'
      : p.badge === 'new'
        ? '<span class="card-badge new">Novo</span>'
        : '<span class="card-badge">-40%</span>';
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
    cartItemsEl.innerHTML = '<div class="drawer-empty">Seu carrinho está vazio.<br>Adicione produtos do catálogo.</div>';
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
    // limpa carrinho e redireciona
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
