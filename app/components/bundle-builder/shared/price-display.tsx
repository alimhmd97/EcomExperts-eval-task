import { formatPrice } from "~/lib/format-price";

type PriceDisplayProps = {
  price: number;
  compareAtPrice?: number | null;
  className?: string;
};

export function PriceDisplay({
  price,
  compareAtPrice,
  className = "",
}: PriceDisplayProps) {
  const hasDiscount =
    compareAtPrice != null && compareAtPrice > price;

  return (
    <div className={`flex items-baseline gap-1.5 ${className}`}>
      {hasDiscount ? (
        <span className="text-sm font-semibold text-[#e03131] line-through">
          {formatPrice(compareAtPrice)}
        </span>
      ) : null}
      <span className="text-base font-bold text-foreground">
        {formatPrice(price)}
      </span>
    </div>
  );
}
