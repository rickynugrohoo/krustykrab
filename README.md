# Krusty Krab

A burger restaurant website built from a Figma design. Includes a landing page, a full menu with category filtering and add-to-cart, and a cart page (filled + empty states).

Built with **Next.js 14 (App Router)**, **React 18**, **TypeScript**, and **Tailwind CSS**.

## Pages

- `/` — Home (hero, menu highlights, editorial section, stats, FAQ, Instagram, footer)
- `/menu` — Full menu with search + category sidebar and add-to-cart
- `/cart` — Cart with order summary (filled and empty states)

## Requirements

- Node.js 18 or newer (developed on Node 24)

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

- `npm run dev` — start the dev server
- `npm run build` — production build
- `npm start` — run the production build
- `npm run lint` — lint

## Project structure

```
app/          # routes, layout, global styles, fonts, favicon
components/    # shared components (Header, Footer, Cart) + home/ + cart/
lib/          # menu and home content data
public/        # images, icons, illustrations, fonts assets
```

## Notes

- Fonts are self-hosted (`app/fonts/`) so builds don't depend on fetching Google Fonts.
- Product/gallery photos are stock placeholders and can be swapped in `public/`.
