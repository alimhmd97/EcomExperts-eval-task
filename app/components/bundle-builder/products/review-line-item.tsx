import { useBundleCart } from "~/context/bundle-cart-context";
import type { ReviewLine } from "~/lib/bundle/review-groups";

import { PriceDisplay } from "../shared/price-display";
import { QuantityStepper } from "../shared/quantity-stepper";

type ReviewLineItemProps = {
  line: ReviewLine;
};

export function ReviewLineItem({ line }: ReviewLineItemProps) {
  const { setQuantity } = useBundleCart();
  const { product, variant, quantity, unitDisplayPrice, lineTotal } = line;

  return (
    <article>
      <p>
        {product.name}
        {variant ? ` — ${variant.label}` : ""}
      </p>
      <QuantityStepper
        value={quantity}
        onChange={(nextValue) =>
          setQuantity(product.id, variant?.id ?? null, nextValue)
        }
        ariaLabel={`${product.name} quantity`}
      />
      <PriceDisplay price={quantity > 1 ? lineTotal : unitDisplayPrice} />
    </article>
  );
}
