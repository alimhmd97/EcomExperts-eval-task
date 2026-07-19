import type { ProductVariant } from "~/types/catalog";

type VariantSelectorProps = {
  variants: ProductVariant[];
  activeVariantId: string;
  onSelect: (variantId: string) => void;
  productName: string;
};

export function VariantSelector({
  variants,
  activeVariantId,
  onSelect,
  productName,
}: VariantSelectorProps) {
  if (variants.length === 0) {
    return null;
  }

  return (
    <div
      className="flex flex-wrap gap-1"
      role="radiogroup"
      aria-label={`${productName} color`}
    >
      {variants.map((variant) => {
        const isActive = variant.id === activeVariantId;

        return (
          <button
            key={variant.id}
            type="button"
            role="radio"
            aria-checked={isActive}
            onClick={() => onSelect(variant.id)}
            className={`inline-flex items-center gap-2 rounded-lg border px-1 py-1.5 text-sm font-medium transition-colors ${
              isActive
                ? "border-primary bg-primary/5 text-foreground"
                : "border-border bg-background text-foreground hover:border-foreground-subtle"
            }`}
          >
            {/* <span
              className="size-4 shrink-0 rounded-full border border-border"
              style={{ backgroundColor: variant.swatchColor }}
              aria-hidden="true"
            /> */}
            <img
              src={variant.imageUrl}
              alt={variant.label}
              className="size-5 shrink-0"
            />
            {variant.label}
          </button>
        );
      })}
    </div>
  );
}
