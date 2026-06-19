import { REVIEW_CATEGORIES, type ReviewCategoryId } from "~/enums";
import type {
  CartSelection,
  Product,
  ProductVariant,
} from "~/types/catalog";
import { getVariantDisplayPrice, getVariantUnitPrice } from "~/types/catalog";

export type ReviewLine = {
  selectionId: string;
  product: Product;
  variant: ProductVariant | null;
  quantity: number;
  unitDisplayPrice: number;
  unitCartPrice: number;
  /** Pre-discount unit price used for the struck-through "was" amount. */
  unitComparePrice: number;
  lineTotal: number;
};

function getUnitComparePrice(
  product: Product,
  variant: ProductVariant | null,
): number {
  if (variant) {
    return variant.compareAtPrice ?? variant.price;
  }

  return product.compareAtPrice ?? product.price ?? 0;
}

export type ReviewGroup = {
  categoryId: ReviewCategoryId;
  label: string;
  lines: ReviewLine[];
};

function toReviewLine(
  selection: CartSelection,
  products: Product[],
): ReviewLine | null {
  const product = products.find((item) => item.id === selection.productId);
  if (!product) {
    return null;
  }

  const variant = selection.variantId
    ? product.variants.find((item) => item.id === selection.variantId) ?? null
    : null;
  const unitCartPrice = getVariantUnitPrice(product, selection.variantId);

  return {
    selectionId: selection.id,
    product,
    variant,
    quantity: selection.quantity,
    unitDisplayPrice: getVariantDisplayPrice(product, selection.variantId),
    unitCartPrice,
    unitComparePrice: getUnitComparePrice(product, variant),
    lineTotal: unitCartPrice * selection.quantity,
  };
}

export function groupCartLinesByCategory(
  selections: CartSelection[],
  products: Product[],
): ReviewGroup[] {
  const lines = selections
    .map((selection) => toReviewLine(selection, products))
    .filter((line): line is ReviewLine => line !== null);

  return REVIEW_CATEGORIES.map((category) => ({
    categoryId: category.id,
    label: category.label,
    lines: lines.filter((line) => line.product.category === category.id),
  })).filter((group) => group.lines.length > 0);
}
