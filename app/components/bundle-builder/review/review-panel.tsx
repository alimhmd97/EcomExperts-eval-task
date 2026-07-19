import { useBundleCart } from "~/context/bundle-cart-context";
import { getCartTotals } from "~/utils/bundle/cart";
import { formatPrice } from "~/utils/format-price";
import { groupCartLinesByCategory } from "~/utils/bundle/review-groups";
import type { Product } from "~/types/catalog";

import { ReviewActions } from "./review-actions";
import { ReviewCategoryGroup } from "./review-category-group";
import { ReviewGuarantee } from "./review-guarantee";
import { ReviewShippingRow } from "./review-shipping-row";
import { ReviewTotals } from "./review-totals";

type ReviewPanelProps = {
  products: Product[];
};

export function ReviewPanel({ products }: ReviewPanelProps) {
  const { selections } = useBundleCart();

  const groups = groupCartLinesByCategory(selections, products);
  const totals = getCartTotals(selections, products);
  const isEmpty = groups.length === 0;

  return (
    <aside className="rounded-3xl bg-surface-soft p-6">
      <header className="pb-4">
        <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-foreground-subtle">
          Review
        </p>
        <h2 className="mt-1 text-2xl font-extrabold text-foreground">
          Your security system
        </h2>
        <p className="mt-1 text-sm font-medium text-foreground-muted">
          Review your personalized protection system designed to keep what
          matters most safe.
        </p>
      </header>

      {isEmpty ? (
        <p className="border-t border-border py-10 text-center text-sm font-medium text-foreground-muted">
          No items selected yet. Start building your system to see it here.
        </p>
      ) : (
        groups.map((group) => (
          <ReviewCategoryGroup
            key={group.categoryId}
            categoryLabel={group.label}
            lines={group.lines}
          />
        ))
      )}

      <ReviewShippingRow />

      <div className="mt-2 flex items-center justify-between gap-4 pt-5">
        <ReviewGuarantee />
        <ReviewTotals totals={totals} />
      </div>

      {totals.savings > 0 ? (
        <p className="py-4 text-center text-sm font-bold text-[#16a34a]">
          Congrats! You&apos;re saving {formatPrice(totals.savings)} on your
          security bundle!
        </p>
      ) : (
        <div className="py-3" />
      )}

      <ReviewActions />
    </aside>
  );
}
