// Vercel Serverless Function — cria Checkout Session no Stripe
// Endpoint: POST /api/create-stripe-session
// Env vars necessárias:
//   STRIPE_SECRET_KEY  → chave secreta do Stripe (sk_live_... ou sk_test_...)
//   SITE_URL           → URL pública do site (ex: https://bora-figurinhas.vercel.app)

import Stripe from 'stripe';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    return res.status(500).json({
      error: 'STRIPE_SECRET_KEY não configurado no Vercel. Veja o README.',
    });
  }

  try {
    const { items, shipping, buyer, discount } = req.body || {};

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'items vazio' });
    }

    const stripe = new Stripe(key);

    const line_items = items.map(i => ({
      price_data: {
        currency: 'brl',
        product_data: { name: String(i.title).slice(0, 250) },
        unit_amount: Math.round(Number(i.unit_price) * 100),
      },
      quantity: Number(i.quantity) || 1,
    }));

    // Desconto entra como coupon dinâmico (em centavos).
    const discountVal = Number(discount) || 0;
    const discounts = [];
    if (discountVal > 0) {
      const coupon = await stripe.coupons.create({
        amount_off: Math.round(discountVal * 100),
        currency: 'brl',
        duration: 'once',
        name: 'Desconto à vista',
      });
      discounts.push({ coupon: coupon.id });
    }

    // Frete entra como linha extra (Stripe shipping_options só funciona com Stripe Shipping).
    const shipVal = shipping && !shipping.free ? Number(shipping.valor) || 0 : 0;
    if (shipVal > 0) {
      line_items.push({
        price_data: {
          currency: 'brl',
          product_data: { name: `Frete (${shipping.uf}) — ${shipping.prazo}` },
          unit_amount: Math.round(shipVal * 100),
        },
        quantity: 1,
      });
    }

    const site = process.env.SITE_URL || `https://${req.headers.host}`;

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items,
      discounts,
      locale: 'pt-BR',
      customer_email: buyer?.['buyer-name'] ? undefined : undefined,
      client_reference_id: `order_${Date.now()}`,
      success_url: `${site}/?status=success&provider=stripe`,
      cancel_url: `${site}/?status=cancel&provider=stripe`,
    });

    return res.status(200).json({
      id: session.id,
      init_point: session.url,
    });
  } catch (err) {
    console.error('[create-stripe-session]', err);
    return res.status(500).json({
      error: 'Falha ao criar sessão Stripe',
      details: err.message || String(err),
    });
  }
}
