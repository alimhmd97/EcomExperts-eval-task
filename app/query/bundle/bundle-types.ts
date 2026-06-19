import type { Product } from "~/types/catalog";

export type { CartSelection, Product, ProductBadge, ProductVariant, StepIcon } from "~/types/catalog";
export type { ReviewCategoryId } from "~/enums";

export type ProductsListParams = {
  stepId?: string;
};
