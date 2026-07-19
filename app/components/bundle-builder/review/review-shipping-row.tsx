import { formatPrice } from "~/utils/format-price";

export const SHIPPING = {
  name: "Fast Shipping",
  icon: "truck" as const,
  price: 0,
  compareAtPrice: 5.99,
} as const;

export function ReviewShippingRow() {
  const isFree = SHIPPING.price <= 0;
  const showCompare =
    SHIPPING.compareAtPrice != null && SHIPPING.compareAtPrice > SHIPPING.price;

  return (
    <section className="flex items-center gap-3 border-t border-border py-4">
      <span className="flex size-11 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-background">
        <img
          src="/assets/images/fast-shiping.png"
          alt=""
          aria-hidden="true"
          className="max-h-9 w-auto max-w-9 object-contain"
        />
      </span>
      <p className="flex-1 text-sm font-bold text-foreground">
        {SHIPPING.name}
      </p>
      <div className="flex flex-col items-end leading-tight">
        {showCompare ? (
          <span className="text-xs font-semibold text-foreground-subtle line-through">
            {formatPrice(SHIPPING.compareAtPrice as number)}
          </span>
        ) : null}
        <span className="text-sm font-bold text-primary">
          {isFree ? "FREE" : formatPrice(SHIPPING.price)}
        </span>
      </div>
    </section>
  );
}
