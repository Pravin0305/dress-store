# Dress Store — Modern Fashion E-commerce

A clean, scalable React + TypeScript e-commerce app for a dress brand.
Tailwind CSS v4 + per-component / per-page CSS Modules. All prices in
Indian Rupees (₹). Mock data only — no backend required.

> Built step-by-step as a portfolio project. All 10 milestones complete.

---

## Tech Stack

| Layer            | Choice                                            |
| ---------------- | ------------------------------------------------- |
| Build tool       | Vite                                              |
| UI library       | React 19                                          |
| Language         | **TypeScript** (strict)                           |
| Styling          | Tailwind CSS v4 + **CSS Modules** (one per file)  |
| Routing          | React Router v7                                   |
| State            | React Context API (Cart + Wishlist) + localStorage|
| Data             | Mock data in `src/data/` with helper functions    |
| Currency         | INR (₹) · `en-IN` locale                          |
| Deploy           | Vercel / Netlify ready (SPA rewrites configured)  |

---

## Features

### Shopping
- Browse 24 products across 8 categories (casual, evening, party, summer, work, bridal & traditional, etc.)
- Indian wear includes lehengas, sarees, anarkalis, shararas and salwar suits.
- Full **product detail page** with image gallery, size & color pickers, quantity stepper, related products, and customer reviews.
- **Shop page** with URL-synced filters (size, color, price range, on-sale, in-stock) and 5 sort options.
- **Search & filter chips** show active filters with one-click removal.

### Cart & wishlist
- Cart and wishlist persist across page reloads (`localStorage`).
- Cart line items keyed by `productId::size::color` so the same product in different variations stays separate.
- Real totals: subtotal, shipping (free over ₹1,999), and total.
- Free-shipping progress bar.
- Navbar badges show live cart and wishlist counts.

### Checkout
- 3-step flow: **Shipping → Payment → Review** with a visual progress stepper.
- India-specific: +91 phone mask, 6-digit pincode, dropdown for all 28 states + 8 UTs.
- Payment methods: **Cash on Delivery**, **UPI** (with UPI ID validation), **Card** (auto-spaced number, MM/YY expiry, CVV).
- Place order → fake order id, cart clears, redirect to a **thank-you page** with estimated delivery and order recap.

### Auth (UI only)
- Login + Signup with a shared **split-screen layout** (visual on desktop, form everywhere).
- Password show/hide toggle, live password-strength meter on signup, validation, social login buttons (Google/Apple).
- No backend — submit simulates a tiny request and routes to home.

### Polish
- **Scroll-to-top** on every route change (with back/forward scroll preservation).
- **Page-transition fade-in** on every navigation.
- **Image lazy-loading** with a shimmering skeleton + fade-in once loaded (`LazyImage` component).
- Custom **404 page** with a small floating dress-hanger illustration.
- Animations respect **`prefers-reduced-motion`**.
- Accessible focus rings via `:focus-visible`.
- SEO meta tags + Open Graph + theme-color + SVG favicon.

---

## Folder Structure

```text
src/
├── components/                Flat — one .tsx per component
│   ├── AuthLayout.tsx
│   ├── Badge.tsx
│   ├── Breadcrumbs.tsx
│   ├── Button.tsx
│   ├── CartItemRow.tsx
│   ├── CartSummary.tsx
│   ├── CategoryCard.tsx
│   ├── ColorSwatch.tsx
│   ├── Container.tsx
│   ├── EmptyState.tsx
│   ├── FilterChip.tsx
│   ├── FilterSection.tsx
│   ├── FilterSidebar.tsx
│   ├── Footer.tsx
│   ├── ImageGallery.tsx
│   ├── Input.tsx
│   ├── LazyImage.tsx
│   ├── MainLayout.tsx
│   ├── Navbar.tsx
│   ├── PriceTag.tsx
│   ├── ProductCard.tsx
│   ├── ProductGrid.tsx
│   ├── QuantityStepper.tsx
│   ├── RadioCard.tsx
│   ├── Rating.tsx
│   ├── ReviewList.tsx
│   ├── ScrollToTop.tsx
│   ├── SectionHeader.tsx
│   ├── Select.tsx
│   ├── SizeChip.tsx
│   ├── SortDropdown.tsx
│   ├── Spinner.tsx
│   └── Stepper.tsx
├── pages/
│   ├── HomePage.tsx
│   ├── ShopPage.tsx
│   ├── ProductDetailPage.tsx
│   ├── CartPage.tsx
│   ├── WishlistPage.tsx
│   ├── CheckoutPage.tsx
│   ├── OrderConfirmedPage.tsx
│   ├── LoginPage.tsx
│   ├── SignupPage.tsx
│   └── NotFoundPage.tsx
├── styles/                    One *.module.css per component & page
├── data/                      Mock data + helpers (single import point)
├── context/                   CartContext, WishlistContext
├── hooks/                     useShopFilters (URL-synced)
├── types/                     Shared TypeScript interfaces
├── utils/                     constants, formatters, indianStates
├── App.tsx                    ONLY the route table — no other logic
├── main.tsx                   React entry
└── index.css                  Tailwind import + theme tokens + resets
```

### Layout system (CSS Grid)

`MainLayout` is a 3-row CSS Grid that wraps every page:

```text
┌─────────────────────┐
│      Navbar         │   row: auto
├─────────────────────┤
│      <Outlet />     │   row: 1fr (fills remaining viewport)
├─────────────────────┤
│      Footer         │   row: auto
└─────────────────────┘
```

The login/signup routes live **outside** `MainLayout` so the split-screen
auth UI gets the full viewport.

### Conventions

- **One component per file**, default-exported.
- **No subfolders inside `components/`** — flat & short imports.
- **Every component & page has its own `*.module.css`** in `src/styles/`.
- **No inline styles** — all styling lives in modules.
- **All currency** goes through `formatPrice()` in `utils/formatters.ts`.
- **All data access** goes through `src/data/index.ts` — when swapping
  mock data for a real API, this is the only file that changes.

---

## Getting Started

```bash
npm install
npm run dev
```

Open <http://localhost:5173>.

### Scripts

| Command           | Purpose                                    |
| ----------------- | ------------------------------------------ |
| `npm run dev`     | Start the Vite dev server                  |
| `npm run build`   | Type-check (`tsc -b`) + production build   |
| `npm run preview` | Preview the production build               |
| `npm run lint`    | Run ESLint                                 |

---

## Deploying

The repo ships with config files for two zero-config hosts:

### Vercel

1. Push the repo to GitHub.
2. Import the project in <https://vercel.com/new>.
3. Vercel auto-detects Vite, but `vercel.json` is included to make it
   explicit and to handle SPA routing.
4. Click **Deploy**.

### Netlify

1. Push the repo to GitHub.
2. New site → **Import from Git** in Netlify.
3. `netlify.toml` and `public/_redirects` configure the build (`npm run
   build`), publish directory (`dist`), and the SPA fallback so deep
   links like `/product/satin-bias-midi` survive a hard refresh.

### Any static host

Run `npm run build` and serve the `dist/` folder. Make sure your host
rewrites all unknown paths to `/index.html` so client-side routing keeps
working.

---

## Roadmap

- [x] **Step 1** — Project setup (Vite, React, Tailwind v4, folder structure)
- [x] **Step 2** — Mock data (products, categories, reviews) — INR prices
- [x] **Step 3** — TypeScript migration · flat components · CSS Modules · MainLayout grid · Router
- [x] **Step 4** — Reusable UI components (Button, Badge, Rating, PriceTag, Spinner, SectionHeader, CategoryCard, ProductCard, ProductGrid)
- [x] **Step 5** — Home page (hero, categories, featured products, new arrivals)
- [x] **Step 6** — Shop page with URL-synced filters & sorting
- [x] **Step 7** — Product detail page (gallery, picker, reviews, related) · Bridal stocks traditional Indian wear
- [x] **Step 8** — Cart + Wishlist via React Context (localStorage, totals, free-shipping progress, badges)
- [x] **Step 9** — Checkout (3-step) + Auth pages (Login, Signup, Order confirmation)
- [x] **Step 10** — Polish, animations, deploy-ready (scroll-to-top, page transitions, lazy-loaded images, deploy configs, SEO meta)

---

## Credits

- Product imagery: [Unsplash](https://unsplash.com/) (creators credited
  inline in `src/data/products.ts`).
- Fonts: [Playfair Display](https://fonts.google.com/specimen/Playfair+Display)
  & [Inter](https://fonts.google.com/specimen/Inter) via Google Fonts.

Made in India · Prices in ₹
