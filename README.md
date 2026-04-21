# Bora Tech

Mini loja fictícia de eletrônicos em HTML/CSS/JS puro, com tema dark. Sem dependências, sem build.

## Como rodar

Abrir direto no navegador:

```bash
open index.html      # macOS
xdg-open index.html  # Linux
```

Ou subir um servidor estático (recomendado, evita restrições de `file://`):

```bash
python3 -m http.server 8000
# acesse http://localhost:8000
```

## Estrutura

```
.
├── index.html       # Marcação da página e drawer do carrinho
├── styles.css       # Tema dark, grid de produtos, animações
├── script.js        # Produtos, filtros, carrinho (localStorage)
└── assets/
    └── favicon.svg
```

## Funcionalidades

- Catálogo com 10 produtos fictícios e filtros por categoria
- Carrinho em drawer lateral com +/- quantidade e remoção
- Persistência em `localStorage` (chave `bora.cart.v1`)
- Checkout simulado (modal de confirmação)
- Responsivo, respeita `prefers-reduced-motion`

## Customizar

- **Cores e radius**: variáveis CSS em `:root` no topo de `styles.css`.
- **Produtos**: array `PRODUCTS` no topo de `script.js`. Cada item tem `id`, `name`, `category`, `price`, `old` (opcional), `icon`, `tag`.
- **Ícones**: edite o objeto `ICONS` em `script.js` (SVG inline, ajuste tamanho via CSS em `.card-media svg`).

Demo para fins educacionais — nenhum pedido é processado.
