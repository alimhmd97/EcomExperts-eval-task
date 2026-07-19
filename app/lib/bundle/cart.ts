import type { BuilderStepId } from "~/enums";
import type { CartSelection, Product } from "~/types/catalog";
import { getVariantUnitPrice, getVariantComparePrice } from "~/types/catalog";

export type CartTotals = {
  itemCount: number;
  subtotal: number;
  originalSubtotal: number;
  savings: number;
};

function findProduct(
  productId: string,
  products: Product[],
): Product | undefined {
  return products.find((product) => product.id === productId);
}

export function getSelectedCountForStep(
  stepId: BuilderStepId,
  selections: CartSelection[],
  products: Product[],
): number {
  const stepProductIds = new Set(
    products
      .filter((product) => product.stepId === stepId)
      .map((product) => product.id),
  );

  const selectedProductIds = new Set(
    selections
      .filter(
        (selection) =>
          selection.quantity > 0 && stepProductIds.has(selection.productId),
      )
      .map((selection) => selection.productId),
  );

  return selectedProductIds.size;
}

export function getCartTotals(
  selections: CartSelection[],
  products: Product[],
): CartTotals {
  return selections.reduce<CartTotals>(
    (totals, selection) => {
      const product = findProduct(selection.productId, products);
      if (!product) {
        return totals;
      }

      const unitPrice = getVariantUnitPrice(product, selection.variantId);
      const originalUnitPrice = getVariantComparePrice(
        product,
        selection.variantId,
      );

      return {
        itemCount: totals.itemCount + selection.quantity,
        subtotal: totals.subtotal + unitPrice * selection.quantity,
        originalSubtotal:
          totals.originalSubtotal + originalUnitPrice * selection.quantity,
        savings:
          totals.savings +
          (originalUnitPrice - unitPrice) * selection.quantity,
      };
    },
    { itemCount: 0, subtotal: 0, originalSubtotal: 0, savings: 0 },
  );
}
