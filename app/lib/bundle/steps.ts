import type { BuilderStep, Product } from "~/types/catalog";

export function getProductsForStep(
  stepId: string,
  products: Product[],
): Product[] {
  return products.filter((product) => product.stepId === stepId);
}

export function sortSteps(steps: BuilderStep[]): BuilderStep[] {
  return [...steps].sort((a, b) => a.order - b.order);
}
