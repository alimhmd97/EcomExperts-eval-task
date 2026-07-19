import type { Product } from "~/types/catalog";

import { SelectionProductCard } from "../products/selection-product-card";

type BuilderProductGridProps = {
  products: Product[];
};

export function BuilderProductGrid({ products }: BuilderProductGridProps) {
  return (
    <section className="grid grid-cols-[repeat(auto-fill,minmax(420px,1fr))] gap-4 builder:grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">
      {products.map((product) => (
        <SelectionProductCard key={product.id} product={product} />
      ))}
    </section>
  );
}
