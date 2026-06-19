import { PriceDisplay } from "../shared/price-display";
import { QuantityStepper } from "../shared/quantity-stepper";

export function ReviewLineItem() {
  return (
    <article>
      <p>Review line item lives here</p>
      <QuantityStepper />
      <PriceDisplay />
    </article>
  );
}
