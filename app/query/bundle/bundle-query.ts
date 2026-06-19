import { queryOptions } from "@tanstack/react-query";

import db from "../../../data/db.json";
import type { Product, ProductsListParams } from "./bundle-types";

// The catalog is a static local JSON file, so the app is self-contained and
// runs with just `npm run dev`. The JSON Server in `npm run api` is an optional
// bonus that serves the same `data/db.json` over HTTP — see data/README.md.
const CATALOG = db.products as unknown as Product[];

export const getProductsQuery = (params?: ProductsListParams) =>
  queryOptions<Product[], Error, Product[]>({
    queryFn: async () =>
      params?.stepId
        ? CATALOG.filter((product) => product.stepId === params.stepId)
        : CATALOG,
    queryKey: ["products", params],
    select: (data) => data ?? [],
  });
