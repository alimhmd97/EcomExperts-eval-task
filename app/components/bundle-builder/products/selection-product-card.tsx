import { PriceDisplay } from "../shared/price-display";
import { ProductBadge } from "./product-badge";
import { QuantityStepper } from "../shared/quantity-stepper";
import { VariantSelector } from "./variant-selector";

export function SelectionProductCard() {
  return (
    <article>
      <p>Selection product card lives here</p>
      <ProductBadge />
      <VariantSelector />
      <QuantityStepper />
      <PriceDisplay />
    </article>
  );
}
