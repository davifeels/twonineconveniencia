# TWONINE MANAGER — Sistema de Gestão Centralizada Multiunidade
## TwoNine Conveniência • Vila Buritis & Setor Tradicional (Planaltina-DF)

Projeto demonstrativo conceitual de modernização de identidade visual e software de gestão operacional multiunidade desenvolvido por **Davi Anderson**.

---

## 🌐 Publicação no GitHub Pages (100% Configurado & Acessível)

O projeto foi configurado com `base: './'` e caminhos relativos em todos os scripts, imagens e estilos. Isso garante que a aplicação funcione em qualquer subpasta do GitHub Pages (`https://<usuario>.github.io/<repositorio>/`) ou domínio personalizado sem erros 404 de assets.

### Opção 1: Deploy Automático via GitHub Actions (Recomendado)
O repositório já conta com o fluxo de CI/CD pronto em `.github/workflows/deploy.yml`.

1. Inicialize o repositório Git local e faça o primeiro commit:
   ```bash
   git init
   git add .
   git commit -m "feat: implantacao TwoNine Manager para GitHub Pages"
   git branch -M main
   ```
2. Crie o repositório no seu GitHub (ex: `twonineconveniencia`) e conecte:
   ```bash
   git remote add origin https://github.com/<SEU_USUARIO>/twonineconveniencia.git
   git push -u origin main
   ```
3. No painel do seu repositório no GitHub:
   - Acesse **Settings** > **Pages**
   - Em **Build and deployment > Source**, selecione **GitHub Actions**
   - O GitHub executará o build automaticamente e disponibilizará o link no ar em instantes!

---

### Opção 2: Deploy Direto via Terminal (`gh-pages`)
Se preferir fazer o deploy diretamente pelo terminal:
```bash
npm run deploy
```
Em seguida, no GitHub em **Settings > Pages**, certifique-se de que a branch selecionada seja `gh-pages` na pasta `/ (root)`.

---

## ♿ Acessibilidade (A11y) & Usabilidade
- **Contraste WCAG AAA:** Paleta de alto contraste em Dark Mode para facilitar a visualização de saldos de estoque e valores.
- **Navegação por Teclado:** Suporte à tecla `ESC` para fechamento de modais e navegação estruturada via `Tab` e `Enter`.
- **Semântica e ARIA:** Tags semânticas (`<header>`, `<main>`, `<nav>`, `<aside>`, `<footer>`, `<section>`), atributos `role="dialog"` e `aria-modal="true"`.
- **Roteamento SPA sem Quebras:** A navegação interna é mantida em estado local e preservada no `LocalStorage`, com fallback em `public/404.html`.

---

## 🚀 Como Executar Localmente
```bash
npm install
npm run dev
```
Acesse [http://localhost:5173](http://localhost:5173).

---

## ⚖️ Transparência
> "Projeto demonstrativo desenvolvido por Davi Anderson. Esta apresentação é conceitual e não representa um sistema oficial da TwoNine Conveniência."
