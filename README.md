# Wyze Bundle Builder

A multi-step bundle builder with a live review panel, built as a React prototype
from the provided Figma design. Assemble a security system across four steps
(cameras, plan, sensors, extra protection) and watch the "Your security system"
summary update as you go.

## How to run

Requires **Node 22.22+** and npm.

### 1. Install dependencies (run once)

```bash
npm install
```

### 2. Start the app

```bash
npm run dev
```

**Open <http://localhost:5173> in your browser.**

The app is self-contained — the product catalog is a local JSON file
(`data/db.json`), so no backend is required.

---

### Run the JSON server (API)

`data/db.json` can also be served over HTTP via **JSON Server**.

**A) API only** — in its own terminal:

```bash
npm run api
```

API runs at **<http://localhost:3001/products>**

**B) API + app together** — one command, both processes:

```bash
npm run dev:all
```

App at **<http://localhost:5173>** · API at **<http://localhost:3001/products>**

> The web app reads `data/db.json` directly, so it runs fine without the API.
> The JSON server is an optional bonus HTTP catalog.

---

### Other scripts

```bash
npm run build     # production build
npm run start     # serve the production build
npm run typecheck # react-router typegen + tsc
```

## How it works

- **Data-driven.** Products, variants, pricing, badges, and the seed cart all
  come from `data/db.json` — nothing is hardcoded per product. Step config
  (titles/icons/order) and review categories live in `app/config/`.
- **Single source of truth.** All cart state lives in `BundleCartProvider`
  (`app/context/bundle-cart-context.tsx`). The builder cards and review panel
  read and write the same selections, so steppers stay in sync.
- **Per-variant quantities.** Selections are keyed by `(productId, variantId)`,
  so Red and Blue of the same product are tracked independently. Each card's
  stepper is bound to its active variant; the review panel lists every variant
  with quantity > 0 as its own line.
- **Seed state.** On first load the cart is seeded (`seedSelections` in
  `data/db.json`) to match the design — two cameras plus pre-populated
  sensors, hub, accessory, and plan.
- **Persistence.** "Save my system for later" writes the configuration to
  `localStorage` (`app/lib/persistence.ts`) and restores it on reload. Changes
  aren't persisted until saved. "Clear" or a fresh visit falls back to the seed.
- **Pure logic.** Totals, savings, step counts, and review grouping are pure
  functions in `app/utils/bundle/`.

## Decisions & tradeoffs

- **React Router v8 + TanStack Query** are kept from the project template.
  For a static local catalog this is heavier than necessary; Query is used
  only for loading/error ergonomics around the bundled JSON, which is
  imported directly so a clean clone runs with just `npm run dev`.
- **Approximate totals.** The seed reproduces the design's line items,
  quantities, and prices. The struck-through total and savings are derived
  from the catalog's `compareAtPrice` values and stay internally consistent
  (struck − active = savings), so they may differ by a few dollars from the
  spec's approximate "~$238.81 / ~$50.92".
- **Checkout** is a placeholder: an inline "Order placed ✓" confirmation with
  no real payment flow, as allowed by the brief.

## Architecture

Data flows one way: the catalog loads once, all mutable state lives in a
single provider, and pure functions derive everything the UI renders. The
builder *writes* selections and the review panel *reads* them, both through
the same provider — that's what keeps steppers and the summary in sync.

```
data/db.json ──► query/ (TanStack) ──► BundleCartProvider ──► components
                                              │  (single source of truth)
                                              ▼
                                    utils/bundle/ (pure: totals, grouping)
                                              │
                               ┌──────────────┴──────────────┐
                          builder/ (write)             review/ (read)
                          pick products              live "Your system" summary
```

### Component map

Grouped by role rather than file order — the page splits into a *builder*
side (user picks) and a *review* side (live summary), over a small
shared/products layer.

```
bundle-builder-page
├─ builder/    step accordion, product grid, step header       ← user selects
├─ products/   product cards, variant selector, badges,
│              review line item                                ← shared by both
├─ review/     panel, category groups, totals, actions,
│              shipping row, guarantee                          ← live summary
├─ shared/     price-display, quantity-stepper                  ← used by both
└─ ui/         pure primitives: accordion, button               ← design-agnostic
```

### Project structure

```
app/
  components/ui/               pure, reusable primitives: accordion, button
  components/bundle-builder/   builder, products, review components
  context/                     cart state (single source of truth)
  utils/bundle/                pure logic: totals, grouping, seed, steps
  lib/                         persistence (localStorage save/restore)
  config/                      step + review-category config
  types/                       catalog types
  query/, providers/           data access + QueryClientProvider
data/db.json                   product catalog + seed cart
```
