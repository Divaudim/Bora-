# Bora Tech

Loja de eletrônicos com 40% OFF, frete para todo Brasil e checkout integrado ao **Mercado Pago**.

Frontend: HTML/CSS/JS puro (sem framework, sem build).
Backend: uma função serverless no Vercel que cria a preferência de pagamento no Mercado Pago.

---

## Arquitetura

```
.
├── index.html               # Página única com catálogo + drawer de checkout
├── styles.css               # Tema dark, grid, steps, badges
├── script.js                # 30 produtos, filtros, carrinho, CEP (ViaCEP), frete BR
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
   | `SITE_URL`           | URL pública do Vercel (ex.: `https://bora-tech.vercel.app`) |

   Onde pegar o Access Token: https://www.mercadopago.com.br/developers/panel/app → sua aplicação → **Credenciais de Produção**.

5. **Redeploy** o projeto (Deployments → ⋯ → Redeploy) para as variáveis entrarem em vigor.
6. Acesse a URL do Vercel. Adicione itens, finalize → você é redirecionado pra tela segura do Mercado Pago.

### Testando com credenciais de teste (sandbox)

Se quiser testar sem dinheiro real:

- Use o **Access Token de Teste** (`TEST-...`) na variável `MP_ACCESS_TOKEN`.
- Pague usando [cartões de teste do Mercado Pago](https://www.mercadopago.com.br/developers/pt/docs/checkout-pro/additional-content/test-cards).

---

## Checkout — como funciona

1. Cliente monta o carrinho e clica **Finalizar**.
2. Drawer multi-step:
   - **Entrega**: informa CEP (autopreenche via [ViaCEP](https://viacep.com.br)), endereço, contato. Frete calculado por UF — grátis acima de R$ 299.
   - **Pagamento**: escolhe PIX (-5%), cartão (12x) ou boleto (-3%).
3. Ao clicar **Pagar com Mercado Pago**:
   - Frontend faz `POST /api/create-preference`
   - Função serverless chama o SDK oficial do MP com o Access Token (seguro, do servidor)
   - MP devolve `init_point` (URL do checkout hospedado)
   - Frontend redireciona o cliente pra essa URL
4. Cliente paga na tela do MP (cartão, PIX, boleto) e é redirecionado de volta ao site via `back_urls`.

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
echo 'MP_ACCESS_TOKEN=TEST-seu-token-aqui' > .env
echo 'SITE_URL=http://localhost:3000' >> .env
npx vercel dev
```

---

## GitHub Pages (fallback)

O workflow em `.github/workflows/pages.yml` publica a versão estática no GitHub Pages (`https://divaudim.github.io/Bora-/`).
**O checkout NÃO funciona no GitHub Pages**, porque lá não há backend. Ele serve só como vitrine.

Pra checkout real, use o Vercel.

---

## Customização rápida

- **Cores e tipografia**: variáveis CSS no `:root` de `styles.css`.
- **Produtos**: array `PRODUCTS` no topo de `script.js`.
- **Frete**: `FRETE_POR_UF` em `script.js`. Ajuste valores/prazos por estado.
- **Desconto de 40%**: já aplicado no campo `price`. `old` é o preço cheio.
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
