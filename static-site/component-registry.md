# Component Registry

## Registered from homepage-original.html

### Global partials
- `static-site/partials/head.html`
- `static-site/partials/announcement-bar.html`
- `static-site/partials/header.html`
- `static-site/partials/footer.html`
- `static-site/partials/end.html`

### Homepage sections
- `static-site/sections/home/hero.html`
- `static-site/sections/home/category-grid.html`
- `static-site/sections/home/quote-cta.html`
- `static-site/sections/home/featured-products.html`
- `static-site/sections/home/pdf-resources.html`
- `static-site/sections/home/wholesale-steps.html`

### Pages
- `static-site/pages/index.src.html`
- `static-site/dist/index.html`

## Reuse rules
- Reuse `announcement-bar.html`, `header.html`, and `footer.html` on every new page if the incoming page uses the same global layout.
- Do not duplicate footer/header code in page files.
- If a later page has a different header/footer, compare against these master partials and update the master partial only if it is a better global version.
