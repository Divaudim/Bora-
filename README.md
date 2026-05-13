# Bora Figurinhas

Loja online de figurinhas da **Copa 2026** — pacotinhos, álbuns, lendas raras e kits, com frete pra todo Brasil e checkout integrado ao **Mercado Pago**.

Frontend: HTML/CSS/JS puro (sem framework, sem build).
Backend: uma função serverless no Vercel que cria a preferência de pagamento no Mercado Pago.

---

## Arquitetura

```
.
├── index.html               # Página única com catálogo + drawer de checkout
├── styles.css               # Tema verde/dourado, grid, steps, badges
├── script.js                # 28 itens (pacotinhos, álbuns, lendas, kits, acessórios), filtros, carrinho, CEP (ViaCEP), frete BR
├── assets/
│   └── favicon.svg
├── api/
│   └── create-preference.js # Função serverless → Mercado Pago (SDK oficial)
├── package.json             # Dependência: mercadopago
├── vercel.json              # Config do Vercel + headers de segurança
└── .github/workflows/
    └── pages.yml            # Deploy no GitHub Pages (fallback estático, SEM checkout real)
```

---

## Deploy no Vercel (recomendado — habilita o checkout real)

1. Vá em https://vercel.com e faça login com GitHub.
2. **Add New → Project** → selecione o repositório `Bora-`.
3. Na tela de config, deixe tudo padrão (`Framework: Other`). Clique em **Deploy**.
4. Depois do primeiro deploy, abra **Settings → Environment Variables** e adicione:

   | Nome                 | Valor                                                    |
   |----------------------|----------------------------------------------------------|
   | `MP_ACCESS_TOKEN`    | Access Token de **Produção** do Mercado Pago (começa com `APP_USR-...`) |
   | `STRIPE_SECRET_KEY`  | Chave secreta do Stripe (`sk_live_...` em produção, `sk_test_...` em testes) |
   | `SITE_URL`           | URL pública do Vercel (ex.: `https://bora-figurinhas.vercel.app`) |

   Onde pegar as chaves:
   - Mercado Pago: https://www.mercadopago.com.br/developers/panel/app → sua aplicação → **Credenciais de Produção**.
   - Stripe: https://dashboard.stripe.com/apikeys → **Secret key**.

5. **Redeploy** o projeto (Deployments → ⋯ → Redeploy) para as variáveis entrarem em vigor.
6. Acesse a URL do Vercel. Adicione itens, finalize → você é redirecionado pra tela segura do Mercado Pago.

### Testando com credenciais de teste (sandbox)

Se quiser testar sem dinheiro real:

- Use o **Access Token de Teste** (`TEST-...`) na variável `MP_ACCESS_TOKEN`.
- Pague usando [cartões de teste do Mercado Pago](https://www.mercadopago.com.br/developers/pt/docs/checkout-pro/additional-content/test-cards).

---

## Catálogo

5 categorias cobrindo a coleção do Mundial 2026:

- **Pacotinhos** — pacotinho avulso (5 fig.), caixinha (25), caixa fechada 50 e box display 100
- **Álbuns** — capa mole, capa dura e edição dourada limitada
- **Lendas & Raras** — figurinhas avulsas dos craques, lendas eternas, escudos foil, mascote holográfica
- **Kits** — combos de álbum + caixas (iniciante, colecionador, premium, família)
- **Acessórios** — plástico protetor, porta-figurinhas, organizador, tapete, display acrílico

Tudo configurado no array `PRODUCTS` no topo de `script.js`.

---

## Checkout — como funciona

1. Cliente monta o carrinho e clica **Finalizar**.
2. Drawer multi-step:
   - **Entrega**: informa CEP (autopreenche via [ViaCEP](https://viacep.com.br)), endereço, contato. Frete calculado por UF — grátis acima de R$ 199.
   - **Pagamento**: escolhe PIX (-5% MP), cartão BR 12x (MP), boleto (-3% MP) **ou** cartão internacional (Stripe).
3. Roteamento por método:
   - PIX/Cartão BR/Boleto → `POST /api/create-preference` → Mercado Pago
   - Cartão internacional → `POST /api/create-stripe-session` → Stripe Checkout
4. A função serverless cria a sessão/preferência com a chave secreta (servidor), devolve a URL hospedada e o frontend redireciona o cliente. Depois do pagamento, o cliente volta ao site via `back_urls` / `success_url`.

---

## Rodar localmente

**Só o frontend (sem checkout real):**

```bash
python3 -m http.server 8000
# http://localhost:8000
```

**Com a função serverless (checkout funcional):**

```bash
npm install
cat > .env <<'EOF'
MP_ACCESS_TOKEN=TEST-seu-token-aqui
STRIPE_SECRET_KEY=sk_test_seu-token-aqui
SITE_URL=http://localhost:3000
EOF
npx vercel dev
```

> Você pode configurar apenas um dos provedores: a opção correspondente no checkout só vai funcionar se a env var estiver setada.

---

## GitHub Pages (fallback)

O workflow em `.github/workflows/pages.yml` publica a versão estática no GitHub Pages (`https://divaudim.github.io/Bora-/`).
**O checkout NÃO funciona no GitHub Pages**, porque lá não há backend. Ele serve só como vitrine.

Pra checkout real, use o Vercel.

---

## Customização rápida

- **Cores e tipografia**: variáveis CSS no `:root` de `styles.css` (verde `#16a34a`, dourado `#fbbf24`).
- **Produtos**: array `PRODUCTS` no topo de `script.js`.
- **Frete**: `FRETE_POR_UF` em `script.js`. Ajuste valores/prazos por estado.
- **Frete grátis**: `FRETE_GRATIS_ACIMA = 199` em `script.js`.
- **Descontos PIX / boleto**: lógica em `renderSummary()` e na função serverless.

---

## Segurança

- Access Token do Mercado Pago **fica no servidor** (Vercel env var), nunca no código cliente.
- Headers de segurança no `vercel.json` (nosniff, referrer-policy, permissions-policy).
- Dados do cartão nunca passam pelo servidor — processamento 100% pelo Mercado Pago (PCI Compliant).

---

## Domínio próprio

No painel do Vercel: **Settings → Domains → Add** → siga as instruções de DNS.
Atualize a variável `SITE_URL` pra usar o domínio definitivo e redeploy.
