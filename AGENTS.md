# AGENTS.md — Frontend Bundle Builder Eval

Instructions for AI coding agents working on this repository.

## Project overview

This repo is a **frontend take-home evaluation**: rebuild the Wyze-style **multi-step bundle builder** with a live review panel as a production-quality React prototype. The full product spec, design reference, and acceptance criteria live in [`docs/frontend-bundle-builder-eval.md`](docs/frontend-bundle-builder-eval.md). Read that file before implementing features.

**Design reference:** [Figma — Frontend Test](https://www.figma.com/design/JYf61etQVqeseX7oY5alGz/Frontend-Test-Figma?node-id=68-8088&t=eItHIh0U1JjjJF8d-1)

A reference screenshot is available at `assets/c__Users_MDLA_AppData_Roaming_Cursor_User_workspaceStorage_f83ed0e040b53104af3c154d6120d0b0_images_image-604edeb9-c628-448f-8796-0659809a515a.png`.

## Tech stack

- **Framework:** React Router v8 (SSR-capable template)
- **Language:** TypeScript (strict)
- **Styling:** Tailwind CSS v4
- **Bundler:** Vite
- **Package manager:** npm

## Commands

```bash
npm install          # install dependencies
npm run dev          # dev server at http://localhost:5173
npm run api          # JSON Server at http://localhost:3001
npm run dev:all      # API + frontend together
npm run build        # production build
npm run start        # serve production build
npm run typecheck    # typegen + tsc
```

Bundle catalog and seed cart live in [`data/db.json`](data/db.json). See [`data/README.md`](data/README.md) for API endpoints.

Verify changes with `npm run typecheck` and `npm run build` before considering work complete.

## Project structure

```
app/                  # React Router app routes and UI
  routes/             # Route modules (main UI goes here)
  root.tsx            # Root layout
  app.css             # Global styles / Tailwind
public/               # Static assets (product images, icons)
data/                 # db.json + JSON Server routes
docs/                 # Evaluation spec and agent docs
```

Replace the default welcome template with the bundle builder. Keep components focused and colocated under `app/` (e.g. `app/components/`, `app/data/`, `app/hooks/`).

## Implementation priorities

Work in this order unless the user directs otherwise:

1. **Data layer** — JSON catalog + initial cart state matching the design screenshot on load.
2. **Layout** — Two-column desktop (builder left, review panel right); responsive down to mobile.
3. **Accordion** — 4 steps; Step 1 open by default; expand/collapse; "N selected" counts; Next buttons.
4. **Product cards** — Badges, images, variants, steppers, pricing, selected-state borders.
5. **Variant + quantity model** — Per-variant quantities; stepper bound to active variant; review panel lists every variant with qty > 0.
6. **Review panel** — Grouped line items, synced steppers, totals, savings, shipping, CTA.
7. **Persistence** — "Save my system for later" via `localStorage`; restore on reload.
8. **Polish** — Figma fidelity (spacing, typography, colors, radii, states).

## Architecture guidelines

- **Data-driven UI:** Render products and steps from JSON/types — no per-product hardcoded markup.
- **Single source of truth:** Cart/selection state in one place (context, reducer, or store). Builder and review panel must stay in sync.
- **Variant keys:** Track quantities by `(productId, variantId)` so color variants are independent line items.
- **Initial state:** Seed so the app loads matching the design (cameras, pre-populated sensors, accessory, plan in review panel).
- **Client-only persistence:** `localStorage` for save/restore; do not use `localStorage` for auth tokens.
- **Checkout:** Placeholder or simple confirmation — no real payment flow.

## Code standards

- TypeScript with explicit types; avoid `any`.
- Functional components and hooks; extract reusable logic into custom hooks.
- Semantic HTML (`button`, `nav`, `form`) and keyboard-accessible controls.
- ARIA labels on icon-only buttons (steppers, accordion toggles).
- Match existing file naming: kebab-case files, PascalCase components.
- Minimize scope — only change what the task requires; no unrelated refactors.

## Do not

- Hardcode individual product cards in JSX.
- Store cart state only in local component state without syncing builder ↔ review panel.
- Remove pre-populated review items on load unless the user changes them.
- Commit secrets, `.env` values, or `node_modules`.
- Create git commits unless the user explicitly asks.

## Deliverable checklist

- [ ] React source implements full spec in `docs/frontend-bundle-builder-eval.md`
- [ ] JSON data file(s) with catalog + seed state
- [ ] README with run instructions (`install` + `start`) and notes on decisions/tradeoffs
- [ ] Clean clone: `npm install && npm run dev` works
- [ ] Desktop matches Figma; mobile is usable and coherent

## Related docs

| File | Purpose |
|------|---------|
| [`docs/frontend-bundle-builder-eval.md`](docs/frontend-bundle-builder-eval.md) | Full evaluation task specification |
| [`README.md`](README.md) | Human-facing setup and project notes (update when implementing) |
