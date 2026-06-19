import { SHIPPING } from "~/enums";
import type { CartTotals } from "~/lib/bundle/cart";
import { formatPrice } from "~/lib/format-price";

type ReviewTotalsProps = {
  totals: CartTotals;
};

export function ReviewTotals({ totals }: ReviewTotalsProps) {
  const total = totals.subtotal + SHIPPING.price;

  return (
    <section>
      <p>Subtotal: {formatPrice(totals.subtotal)}</p>
      {totals.savings > 0 ? (
        <p>You save: {formatPrice(totals.savings)}</p>
      ) : null}
      <p>Total: {formatPrice(total)}</p>
    </section>
  );
}
