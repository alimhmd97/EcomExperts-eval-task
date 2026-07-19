import { formatPrice } from "~/utils/format-price";

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
    <div className={`flex flex-col items-end ${className}`}>
      {hasDiscount ? (
        <span className="text-sm font-light text-red-600 line-through">
          {formatPrice(compareAtPrice)}
        </span>
      ) : null}
      <span
        className={`text-base font-bold ${hasDiscount ? "text-primary" : "text-foreground"}`}
      >
        {formatPrice(price)}
      </span>
    </div>
  );
}
