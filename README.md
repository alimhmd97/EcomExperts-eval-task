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

- **Data-driven.** Products, pricing, and the seed cart come from `data/db.json` — nothing is hardcoded per product.
- **Single source of truth.** All cart state lives in one `BundleCartProvider`, so the builder and review panel always stay in sync.
- **Per-variant quantities.** Each product variant (e.g. Red vs Blue) is tracked independently.
- **Seed state.** The cart loads pre-populated to match the design.
- **Persistence.** "Save my system for later" saves to `localStorage` and restores on reload.
- **Pure logic.** Totals, savings, and grouping are pure functions, easy to test.

## Decisions & tradeoffs

- **Structure is arguably over-engineered** for a project this size — e.g.
  keeping React Router + TanStack Query from the template, and splitting the
  file structure into separations (builder/products/review/shared/ui) that
  aren't strictly necessary at this scale — but it sets up well for
  extendability if the app grows.

## Responsive layout & type scale

Set in `app/app.css` via Tailwind v4's `@theme` — a `builder:` breakpoint at `1735px`.

- **Layout:** below 1735px the page caps at `max-w-[85rem]`; above it, `builder:max-w-none` removes the cap and the grid stacks (`builder:flex-col`).
- **Type scale:** the review panel's `text-*` variables get bumped above 1735px, e.g. `text-sm` = `0.875rem` normally → `1.25rem` above `builder`.

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
├─ builder/   the step-by-step flow where the user picks products
├─ products/  product display pieces (cards, variants, badges) used by both sides
├─ review/    the live "Your system" summary panel and its totals/actions
├─ shared/    small pieces reused across builder and review (price, stepper)
└─ ui/        generic, design-agnostic building blocks (accordion, button)
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
