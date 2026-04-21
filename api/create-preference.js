// Vercel Serverless Function — cria preferência no Mercado Pago
// Endpoint: POST /api/create-preference
// Env vars necessárias:
//   MP_ACCESS_TOKEN  → Access Token (Produção) do Mercado Pago
//   SITE_URL         → URL pública do site (ex: https://bora-tech.vercel.app)

import { MercadoPagoConfig, Preference } from 'mercadopago';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const token = process.env.MP_ACCESS_TOKEN;
  if (!token) {
    return res.status(500).json({
      error: 'MP_ACCESS_TOKEN não configurado no Vercel. Veja o README.',
    });
  }

  try {
    const { items, shipping, buyer, payment_method, discount } = req.body || {};

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'items vazio' });
    }

    const mp = new MercadoPagoConfig({ accessToken: token });
    const preference = new Preference(mp);

    const shipVal = shipping && !shipping.free ? Number(shipping.valor) || 0 : 0;
    const discountVal = Number(discount) || 0;

    const prefItems = items.map(i => ({
      id: String(i.id),
      title: String(i.title).slice(0, 255),
      quantity: Number(i.quantity) || 1,
      unit_price: Number(i.unit_price),
      currency_id: 'BRL',
    }));

    // Desconto distribuído proporcionalmente como item negativo (Mercado Pago
    // exige unit_price > 0, então entramos o desconto como "frete negativo"
    // via shipments.cost usando valor líquido no nosso cálculo de shipments).
    // Para simplicidade: item de desconto só se houver.
    if (discountVal > 0) {
      prefItems.push({
        id: 'discount',
        title: payment_method === 'pix' ? 'Desconto PIX (5%)' : 'Desconto Boleto (3%)',
        quantity: 1,
        unit_price: -Number(discountVal.toFixed(2)),
        currency_id: 'BRL',
      });
    }

    const payer = buyer ? {
      name: buyer['buyer-name'],
      phone: { area_code: '', number: (buyer['buyer-phone'] || '').replace(/\D/g, '') },
      address: {
        zip_code: (buyer['cep'] || '').replace(/\D/g, ''),
        street_name: buyer['addr-street'],
        street_number: buyer['addr-number'],
      },
    } : undefined;

    // Método de pagamento: por padrão aceita todos; se cliente escolheu
    // PIX, cartão ou boleto, fazemos um hint mas deixamos todos habilitados
    // pra ele ter liberdade na tela final do MP.
    const paymentMethods = {
      excluded_payment_types: [],
      installments: 12,
    };

    const site = process.env.SITE_URL || `https://${req.headers.host}`;

    const body = {
      items: prefItems,
      payer,
      payment_methods: paymentMethods,
      shipments: shipVal > 0 ? { cost: shipVal, mode: 'not_specified' } : undefined,
      back_urls: {
        success: `${site}/?status=success`,
        pending: `${site}/?status=pending`,
        failure: `${site}/?status=failure`,
      },
      auto_return: 'approved',
      statement_descriptor: 'BORATECH',
      external_reference: `order_${Date.now()}`,
    };

    const result = await preference.create({ body });

    return res.status(200).json({
      id: result.id,
      init_point: result.init_point,
      sandbox_init_point: result.sandbox_init_point,
    });
  } catch (err) {
    console.error('[create-preference]', err);
    return res.status(500).json({
      error: 'Falha ao criar preferência',
      details: err.message || String(err),
    });
  }
}
