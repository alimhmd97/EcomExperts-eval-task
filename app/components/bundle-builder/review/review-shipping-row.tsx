import { SHIPPING } from "~/enums";

import { PriceDisplay } from "../shared/price-display";

export function ReviewShippingRow() {
  return (
    <section className="flex items-center justify-between">
      <span>{SHIPPING.name}</span>
      <PriceDisplay
        price={SHIPPING.price}
        compareAtPrice={SHIPPING.compareAtPrice}
      />
    </section>
  );
}
