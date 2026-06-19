import type { ProductBadge as ProductBadgeType } from "~/types/catalog";

type ProductBadgeProps = {
  badge: ProductBadgeType;
};

export function ProductBadge({ badge }: ProductBadgeProps) {
  return (
    <span className="absolute top-4 left-4 z-10 rounded-full bg-primary px-2.5 py-1 text-[11px] font-bold tracking-wide text-primary-foreground">
      {badge.label}
    </span>
  );
}
