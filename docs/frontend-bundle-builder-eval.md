# Frontend Take-Home Bundle Builder

Evaluation task specification for AI agents and human candidates.

## Overview

This is a frontend take-home. You'll rebuild the design below as a working **React prototype**: a multi-step bundle builder with a live review panel beside it.

Build it the way you'd build production UI you're proud of.

---

## The design

- **Figma:** https://www.figma.com/design/JYf61etQVqeseX7oY5alGz/Frontend-Test-Figma?node-id=68-8088&t=eItHIh0U1JjjJF8d-1

---

## What you're building

A two-column experience.

### Left: the builder

A vertical, 4-step accordion that walks the shopper through assembling their system:

1. **Choose your cameras** — expanded by default
2. **Choose your plan**
3. **Choose your sensors**
4. **Add extra protection**

Each step has a header showing a "STEP X OF 4" headline, an icon, the step title, and a state indicator on the right:

- The **open** step shows a "*N* selected" count with an up-chevron.
- **Collapsed** steps show a down-chevron.

The expanded step ends with a **Next: …** button that advances to the following step.

#### Product cards

Each card can include:

- Optional discount **badge** (e.g. "Save 22%")
- Product image
- Title
- Short description
- "Learn More" link
- **Color/variant selector**
- **Quantity stepper**
- **Pricing** — struck-through compare-at price plus active price

A card with quantity greater than zero is shown in its **selected state** (highlighted border in the design).

Not every product has every element: some have no badge, and some have no variants at all. Reproduce what the design shows per product.

### Right: the review panel ("Your security system")

A summary that reflects the configured system. It lists selected items grouped under category subheadings:

- **Cameras**
- **Sensors**
- **Accessories**
- **Plan**

Each line has a thumbnail, name, its own quantity stepper, and pricing.

Below the line items:

- Shipping row
- Satisfaction-guarantee badge
- Financing line
- **Total** (with pre-discount price struck through)
- Savings callout
- **Checkout** button
- **Save my system for later** link

The Checkout button has nowhere to go in this prototype — a placeholder or simple confirmation is fine. The builder and the review panel are the focus.

---

## Requirements

### Fidelity (desktop)

Match the design precisely: layout, spacing, typography, color, corner radii, and the various element states (selected/unselected cards, active/inactive color chips, disabled steppers).

### Responsiveness

Desktop must match the Figma. **Smaller viewports are supposed to be responsive design.** The layout should stay usable and visually coherent all the way down to a phone.

### Interactions that must work

| Interaction | Requirement |
|-------------|-------------|
| **Variant selection** | See [The variant selector](#the-variant-selector) |
| **Quantity steppers** | On product cards and review-panel lines; kept **in sync** (changing one updates the other and the rest of the UI) |
| **Accordion** | Steps expand and collapse; Step 1 is open on load |
| **"N selected" counter** | Reflects the number of distinct products currently chosen in that step |
| **Live review panel** | Updates as selections change; **total recalculates** as quantities change |

### Data

The app should be **data-driven from a JSON source you define** — render from data, don't hardcode per-product markup.

Seed the initial state so the app loads looking exactly like the design (including the review panel's pre-populated sensors, accessory, and plan, which have no add-control in this particular view).

Serving that JSON from a small backend/API is a **bonus, not a requirement** — a local JSON file is completely fine.

---

## The variant selector

For products that have variant options, show a row of selectable color chips — each with a small swatch/thumbnail and a label matching the design.

### Key behavior

1. **Each variant has its own quantity.** Red and blue of the same product are tracked separately, with separate counts.

2. **The card's quantity stepper is bound to whichever variant is currently selected.** Selecting a color makes it the active variant, and the stepper shows and edits *that* variant's count.

   **Example:** Add 2 of Red, then select Blue — the stepper now reads **0** (Blue's count), while the 2 Red you added are untouched.

3. **The review panel reflects every variant with a count above zero, as its own line.** In the example above, switching the card to Blue does **not** remove Red from the summary — Red (×2) still shows on the right.

4. **Don't worry about the selected-chip styling / highlighting for now** — focus on the selection-and-quantity behavior and that it flows through to the review panel.

5. Products with **no color options** (e.g. the doorbell) simply have **no selector** — the single quantity stepper controls that product.

---

## Persistence: "Save my system for later"

The **Save my system for later** link should actually save the shopper's configuration.

When a shopper builds a system, clicks it, and comes back later (page reload or a return visit), their system should be **restored exactly as they left it**.

Use client-side persistence for this (`localStorage` is the obvious fit). The expectation is simply:

> configure → save → leave → return → it's all still there

How you structure what gets stored is up to you.

---

## Seed state (design reference)

On initial load, the UI should match the provided design:

### Step 1 — Cameras (2 selected)

| Product | Variant | Qty | Sale price |
|---------|---------|-----|------------|
| Wyze Cam v4 | White | 1 | $27.98 (was $35.98) |
| Wyze Cam Pan v3 | White | 2 | $34.98 each (was $39.98) |

Other camera products shown at qty 0.

### Review panel (pre-populated)

| Category | Item | Qty | Price |
|----------|------|-----|-------|
| Cameras | Wyze Cam v4 (White) | 1 | $27.98 |
| Cameras | Wyze Cam Pan v3 (White) | 2 | $47.96 |
| Sensors | Wyze Sense Motion Sensor | 2 | $59.98 |
| Sensors | Wyze Sense Hub (Required) | 1 | FREE (was $29.92) |
| Accessories | Wyze MicroSD Card (256GB) | 2 | $41.96 |
| Plan | Cam Unlimited | 1 | $9.99/mo (was $12.99/mo) |

**Shipping:** Fast Shipping — FREE (was $5.99)

**Totals:** ~$187.89 active total, ~$238.81 struck-through, savings ~$50.92

---

## Deliverable

A public GitHub repo containing:

- The React source code
- Your JSON data (and a backend, if you do the bonus)
- Clear **run instructions** in the README (e.g. install + start). Must build and run from a clean clone.
- A short **README** noting any decisions, tradeoffs, or anything you didn't finish

---

## Agent acceptance checklist

Use this when verifying the implementation is complete:

- [ ] Two-column layout on desktop; responsive on mobile
- [ ] 4-step accordion with Step 1 open; Next advances steps
- [ ] "N selected" per step counts distinct products with qty > 0
- [ ] Product cards: badges, variants, steppers, pricing, selected border
- [ ] Variant quantities independent; stepper follows active variant
- [ ] Review panel lists all variants with qty > 0 as separate lines
- [ ] Builder and review steppers stay in sync
- [ ] Totals, savings, shipping update live
- [ ] Initial load matches design seed state
- [ ] Save / restore via localStorage works across reload
- [ ] Data rendered from JSON, not hardcoded per product
- [ ] `npm install && npm run dev` works from clean clone
