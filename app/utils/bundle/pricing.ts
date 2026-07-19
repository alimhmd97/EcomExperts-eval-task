import type { Product } from "~/types/catalog";

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

/** Pre-discount display price paired with {@link getVariantDisplayPrice} (ignores bundle/cart pricing, unlike {@link getVariantComparePrice}). */
export function getVariantDisplayComparePrice(
  product: Product,
  variantId: string | null,
): number | null {
  if (variantId) {
    const variant = product.variants.find((item) => item.id === variantId);
    return variant?.compareAtPrice ?? null;
  }

  return product.compareAtPrice ?? null;
}

/** Pre-discount unit price for the review/cart line (prefers bundle compare). */
export function getVariantComparePrice(
  product: Product,
  variantId: string | null,
): number {
  if (variantId) {
    const variant = product.variants.find((item) => item.id === variantId);
    if (variant) {
      return (
        variant.cartCompareAtPrice ?? variant.compareAtPrice ?? variant.price
      );
    }
  }

  return product.compareAtPrice ?? product.price ?? 0;
}
