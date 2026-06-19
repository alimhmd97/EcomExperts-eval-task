import { queryOptions } from "@tanstack/react-query";

import { fetcher } from "~/lib/fetcher/fetcher";
import { ENDPOINTS } from "~/query-client";

import type { Product, ProductsListParams } from "./bundle-types";

export const getProductsQuery = (params?: ProductsListParams) =>
  queryOptions<Product[], Error, Product[]>({
    queryFn: () =>
      fetcher<Product[]>(ENDPOINTS.PRODUCTS.GET_ALL, { params }),
    queryKey: ["products", params],
    select: (data) => data ?? [],
  });
