import type { Product } from "~/types/catalog";

import { SelectionProductCard } from "../products/selection-product-card";

type BuilderProductGridProps = {
  products: Product[];
};

export function BuilderProductGrid({ products }: BuilderProductGridProps) {
  return (
    <section>
      <p>Product grid lives here ({products.length} products)</p>
      {products.map((product) => (
        <SelectionProductCard key={product.id} productId={product.id} />
      ))}
    </section>
  );
}
