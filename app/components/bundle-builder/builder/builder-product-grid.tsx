import type { Product } from "~/types/catalog";

import { SelectionProductCard } from "../products/selection-product-card";

type BuilderProductGridProps = {
  products: Product[];
};

export function BuilderProductGrid({ products }: BuilderProductGridProps) {
  return (
    <section className="grid gap-4 sm:grid-cols-2 builder:grid-cols-[repeat(auto-fill,minmax(250px,1fr))]">
      {products.map((product) => (
        <SelectionProductCard key={product.id} product={product} />
      ))}
    </section>
  );
}
