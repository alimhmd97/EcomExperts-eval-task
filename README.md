# Wyze Bundle Builder

A multi-step bundle builder with a live review panel, built as a React prototype
from the provided Figma design. Assemble a security system across four steps
(cameras, plan, sensors, extra protection) and watch the "Your security system"
summary recalculate as you go.

## Run it

Requires **Node 22.22+** and npm.

```bash
npm install
npm run dev
```

Open <http://localhost:5173>. The app is self-contained — the product catalog is
a local JSON file (`data/db.json`) bundled at build time, so no backend is needed.

### Optional: serve the catalog from an API (bonus)

`data/db.json` can also be served over HTTP via JSON Server:

```bash
npm run api       # http://localhost:3001/products
npm run dev:all   # API + web together
```

This is a bonus only; the UI does not depend on it.

### Other scripts

```bash
npm run build     # production build
npm run start     # serve the production build
npm run typecheck # react-router typegen + tsc
```

## How it works

- **Data-driven.** Products, variants, pricing, badges, and the initial seed cart
  all come from `data/db.json` — there is no per-product hardcoded markup. Step
  config (titles/icons/order) and review categories live in `app/enums/`.
- **Single source of truth.** All cart state lives in `BundleCartProvider`
  (`app/context/bundle-cart-context.tsx`). The builder cards and the review
  panel read and write the same selections, so steppers stay in sync.
- **Per-variant quantities.** Selections are keyed by `(productId, variantId)`,
  so Red and Blue of the same product are tracked independently. A card's stepper
  is bound to the currently active variant; the review panel lists every variant
  with quantity > 0 as its own line.
- **Seed state.** On first load the cart is seeded (`seedSelections` in
  `data/db.json`) so the app matches the design — two cameras selected plus the
  pre-populated sensors, hub, accessory, and plan.
- **Persistence.** "Save my system for later" writes the configuration to
  `localStorage`; on reload it is restored exactly. Until you save, changes are
  not persisted (matching the "save for later" intent). "Clear" / a fresh visit
  with no saved system falls back to the seed.
- **Pure logic.** Totals, savings, step counts, and review grouping are pure
  functions in `app/lib/bundle/` (easy to read and test).

## Decisions & tradeoffs

- **React Router v8 + TanStack Query** are kept from the project template. For a
  static local catalog this is heavier than strictly necessary; Query is used
  only for clean loading/error ergonomics around the bundled JSON. The data
  itself is imported directly so a clean clone runs with just `npm run dev`.
- **Approximate totals.** The seed reproduces the design's line items,
  quantities, and active prices. The struck-through pre-discount total and the
  savings figure are derived from the catalog's `compareAtPrice` values and are
  internally consistent (struck − active = savings), so they may differ by a
  few dollars from the spec's approximate "~$238.81 / ~$50.92".
- **Checkout** is a placeholder: it shows an inline "Order placed ✓" confirmation,
  with no real payment flow (as allowed by the brief).

## Architecture

Data flows one way: the catalog is loaded once, all mutable state lives in a
single provider, and pure functions derive everything the UI renders. The
builder *writes* selections and the review panel *reads* them — both through the
same provider, which is what keeps steppers and the summary in sync.

```
data/db.json ──► query/ (TanStack) ──► BundleCartProvider ──► components
                                              │  (single source of truth)
                                              ▼
                                       lib/bundle/ (pure: totals, grouping)
                                              │
                               ┌──────────────┴──────────────┐
                          builder/ (write)             review/ (read)
                          pick products              live "Your system" summary
```

### Component map

Grouped by role rather than file order — the page splits into a *builder* side
(user picks) and a *review* side (live summary), over a small shared layer.

```
bundle-builder-page
├─ builder/    step accordion, product grid, product cards   ← user selects
├─ review/     panel, category groups, totals, actions       ← live summary
└─ shared/     price-display, quantity-stepper                ← used by both
```

### Project structure

```
app/
  components/bundle-builder/   builder accordion, product cards, review panel
  context/                     cart state (single source of truth)
  lib/bundle/                  pure logic: totals, grouping, seed, persistence
  enums/                       step + review-category config
  query/ query-client/         data access around data/db.json
data/db.json                   product catalog + seed cart
```
