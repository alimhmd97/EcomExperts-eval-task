import { SelectionProductCard } from "../products/selection-product-card";

type BuilderProductGridProps = {
  productCount: number;
};

export function BuilderProductGrid({ productCount }: BuilderProductGridProps) {
  return (
    <section>
      <p>Product grid lives here ({productCount} products)</p>
      {Array.from({ length: productCount }, (_, index) => (
        <SelectionProductCard key={index} />
      ))}
    </section>
  );
}
