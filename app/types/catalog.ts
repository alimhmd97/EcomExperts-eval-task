import type { BuilderStepId, ReviewCategoryId } from "~/enums";

export type { ReviewCategoryId } from "~/enums";

export interface ProductBadge {
  label: string;
  variant: "purple";
}

export interface ProductVariant {
  id: string;
  label: string;
  swatchColor: string;
  imageUrl: string;
  price: number;
  compareAtPrice: number | null;
  /** When bundle pricing differs from card display price (e.g. Wyze Cam Pan v3). */
  cartUnitPrice?: number;
  /** Pre-discount unit price for the review/cart line, when it differs from the card's compareAtPrice (bundle pricing). */
  cartCompareAtPrice?: number;
}

export interface Product {
  id: string;
  stepId: BuilderStepId;
  category: ReviewCategoryId;
  name: string;
  description: string;
  imageUrl: string;
  learnMoreUrl: string;
  badge: ProductBadge | null;
  defaultVariantId: string | null;
  variants: ProductVariant[];
  price?: number;
  compareAtPrice?: number | null;
  billingInterval?: "month";
  required?: boolean;
}

export interface CartSelection {
  id: string;
  productId: string;
  variantId: string | null;
  quantity: number;
}

export interface BundleDatabase {
  products: Product[];
}
