import { useBundleCart } from "~/context/bundle-cart-context";
import { getCartTotals } from "~/lib/bundle/cart";
import { groupCartLinesByCategory } from "~/lib/bundle/review-groups";
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

  return (
    <aside>
      <header>
        <h2>Your security system</h2>
      </header>

      {groups.length === 0 ? (
        <p>No items selected yet.</p>
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
      <ReviewTotals totals={totals} />
      <ReviewGuarantee />
      <ReviewActions />
    </aside>
  );
}
