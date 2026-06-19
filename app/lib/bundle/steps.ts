import type { BuilderStepId } from "~/enums";
import type { Product } from "~/types/catalog";

export function getProductsForStep(
  stepId: BuilderStepId,
  products: Product[],
): Product[] {
  return products.filter((product) => product.stepId === stepId);
}
