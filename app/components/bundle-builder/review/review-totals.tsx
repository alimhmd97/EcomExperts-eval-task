import { SHIPPING } from "~/enums";
import type { CartTotals } from "~/utils/bundle/cart";
import { formatPrice } from "~/utils/format-price";

type ReviewTotalsProps = {
  totals: CartTotals;
};

/** Months used for the "as low as" financing estimate. */
const FINANCING_MONTHS = 12;

export function ReviewTotals({ totals }: ReviewTotalsProps) {
  // Shipping is shown as its own line ("$5.99 → FREE"), so it stays out of the
  // headline figures — this keeps strikeTotal − total equal to the savings line.
  const total = totals.subtotal + SHIPPING.price;
  const originalTotal = totals.originalSubtotal;
  const monthly = total / FINANCING_MONTHS;

  return (
    <div className="flex flex-col items-end gap-1.5">
      {total > 0 ? (
        <span className="rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground">
          as low as {formatPrice(monthly)}/mo
        </span>
      ) : null}
      <div className="flex items-baseline gap-2">
        {originalTotal > total ? (
          <span className="text-base font-semibold text-foreground-subtle line-through">
            {formatPrice(originalTotal)}
          </span>
        ) : null}
        <span className="text-2xl font-extrabold text-primary">
          {formatPrice(total)}
        </span>
      </div>
    </div>
  );
}
