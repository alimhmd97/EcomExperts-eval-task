# Bundle builder API data

JSON Server serves `db.json` as a REST API for the bundle builder prototype.

## Start the API

```bash
npm run api
```

Runs at **http://localhost:3001**.

## Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/products` | Full product catalog |
| GET | `/products?stepId=cameras` | Products for a builder step |

Accordion step config (titles, icons, order) lives in [`app/enums/builder-step.ts`](../app/enums/builder-step.ts). Review categories and shipping live in [`app/enums/`](../app/enums/).

Cart state is client-side only (localStorage) — not served from this API.

Standard json-server CRUD is available on collections if you need to mutate data during development.

## Data model notes

- Products with color options use `variants[]`; doorbell and similar items use top-level `price` with an empty `variants` array.
- `cartUnitPrice` on a variant overrides the card `price` when calculating line totals (Wyze Cam Pan v3 bundle pricing).
- Cart line items use `productId` + `variantId` (null when no variants) — see `CartSelection` in [`app/types/catalog.ts`](../app/types/catalog.ts).

TypeScript types live in [`app/types/catalog.ts`](../app/types/catalog.ts).
