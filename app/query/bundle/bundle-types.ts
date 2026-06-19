import type { BuilderStep, Product } from "~/types/catalog";

export type { BuilderStep, CartSelection, Product, ProductBadge, ProductVariant, StepIcon } from "~/types/catalog";
export type { ReviewCategoryId } from "~/enums";

export type ProductsListParams = {
  stepId?: string;
};

export type BundleBootstrap = {
  products: Product[];
  steps: BuilderStep[];
};
