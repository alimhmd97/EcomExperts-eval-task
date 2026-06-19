import type { ReviewCategoryId } from "~/enums";

export type { ReviewCategoryId } from "~/enums";

export type StepIcon = "camera" | "shield" | "sensor" | "grid";

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
}

export interface Product {
  id: string;
  stepId: string;
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

export interface BuilderStep {
  id: string;
  order: number;
  title: string;
  icon: StepIcon;
  nextStepId: string | null;
  nextStepLabel: string | null;
}

export interface CartSelection {
  id: string;
  productId: string;
  variantId: string | null;
  quantity: number;
}

export interface BundleDatabase {
  steps: BuilderStep[];
  products: Product[];
}

export function getVariantUnitPrice(
  product: Product,
  variantId: string | null,
): number {
  if (variantId) {
    const variant = product.variants.find((item) => item.id === variantId);
    if (variant) {
      return variant.cartUnitPrice ?? variant.price;
    }
  }

  return product.price ?? 0;
}

export function getVariantDisplayPrice(
  product: Product,
  variantId: string | null,
): number {
  if (variantId) {
    const variant = product.variants.find((item) => item.id === variantId);
    if (variant) {
      return variant.price;
    }
  }

  return product.price ?? 0;
}
