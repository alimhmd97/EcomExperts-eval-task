import { useBundleCart } from "~/context/bundle-cart-context";
import type { ReviewLine } from "~/lib/bundle/review-groups";
import { formatPrice } from "~/lib/format-price";

import { QuantityStepper } from "../shared/quantity-stepper";

type ReviewLineItemProps = {
  line: ReviewLine;
};

/** Stacked "was" / "now" price, right-aligned, matching the review panel. */
function LinePrice({
  comparePrice,
  finalPrice,
  suffix = "",
}: {
  comparePrice: number;
  finalPrice: number;
  suffix?: string;
}) {
  const showCompare = comparePrice > finalPrice;
  const isFree = finalPrice <= 0;

  return (
    <div className="flex flex-col items-end leading-tight">
      {showCompare ? (
        <span className="text-xs font-semibold text-foreground-subtle line-through">
          {formatPrice(comparePrice)}
          {suffix}
        </span>
      ) : null}
      <span className="text-sm font-bold text-primary">
        {isFree ? "FREE" : `${formatPrice(finalPrice)}${suffix}`}
      </span>
    </div>
  );
}

export function ReviewLineItem({ line }: ReviewLineItemProps) {
  const { setQuantity } = useBundleCart();
  const {
    product,
    variant,
    quantity,
    unitComparePrice,
    lineTotal,
  } = line;

  const imageUrl = variant?.imageUrl ?? product.imageUrl;
  const compareLineTotal = unitComparePrice * quantity;

  // Subscription plans render as a branded wordmark row with /mo pricing
  // and no quantity control.
  if (product.billingInterval === "month") {
    return (
      <article className="flex items-center gap-3 py-3">
        <span className="flex size-11 shrink-0 items-center justify-center overflow-hidden rounded-xl ">
          <img
            src={product.imageUrl}
            alt=""
            onError={(event) => {
              event.currentTarget.src = "/assets/images/camera1.png";
            }}
            className="max-h-9 w-auto max-w-9 object-contain"
          />
        </span>
        <p className="flex-1 text-sm font-bold text-foreground">
          {product.name}
        </p>
        <LinePrice
          comparePrice={unitComparePrice}
          finalPrice={lineTotal}
          suffix="/mo"
        />
      </article>
    );
  }

  return (
    <article className="flex items-center gap-3 py-3">
      <span className="flex size-11 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-background">
        <img
          src={imageUrl}
          alt=""
          onError={(event) => {
            event.currentTarget.src = "/assets/images/camera1.png";
          }}
          className="max-h-9 w-auto max-w-9 object-contain"
        />
      </span>

      <p className="flex-1 text-sm font-semibold leading-snug text-foreground">
        {product.name}
      </p>

      <QuantityStepper
        value={quantity}
        size="sm"
        min={product.required ? quantity : 0}
        max={product.required ? quantity : undefined}
        onChange={(nextValue) =>
          setQuantity(product.id, variant?.id ?? null, nextValue)
        }
        ariaLabel={`${product.name} quantity`}
      />

      <LinePrice comparePrice={compareLineTotal} finalPrice={lineTotal} />
    </article>
  );
}
