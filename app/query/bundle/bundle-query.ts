import { queryOptions } from "@tanstack/react-query";

import { fetcher } from "~/lib/fetcher/fetcher";
import { ENDPOINTS } from "~/query-client";

import type {
  BundleBootstrap,
  BuilderStep,
  Product,
  ProductsListParams,
} from "./bundle-types";

export const getStepsQuery = () =>
  queryOptions<BuilderStep[], Error, BuilderStep[]>({
    queryFn: () => fetcher<BuilderStep[]>(ENDPOINTS.STEPS.GET_ALL),
    queryKey: ["steps"],
    select: (data) => data ?? [],
  });

export const getProductsQuery = (params?: ProductsListParams) =>
  queryOptions<Product[], Error, Product[]>({
    queryFn: () =>
      fetcher<Product[]>(ENDPOINTS.PRODUCTS.GET_ALL, { params }),
    queryKey: ["products", params],
    select: (data) => data ?? [],
  });

export const getBundleBootstrapQuery = () =>
  queryOptions<BundleBootstrap, Error, BundleBootstrap>({
    queryFn: async () => {
      const [steps, products] = await Promise.all([
        fetcher<BuilderStep[]>(ENDPOINTS.STEPS.GET_ALL),
        fetcher<Product[]>(ENDPOINTS.PRODUCTS.GET_ALL),
      ]);

      return {
        products,
        steps,
      };
    },
    queryKey: ["bundle", "bootstrap"],
  });
