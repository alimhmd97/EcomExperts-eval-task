import type { Product } from "~/types/catalog";

export type { CartSelection, Product, ProductBadge, ProductVariant } from "~/types/catalog";
export type { ReviewCategoryId } from "~/enums";

export type ProductsListParams = {
  stepId?: string;
};
