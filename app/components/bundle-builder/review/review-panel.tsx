import { REVIEW_CATEGORIES } from "~/enums";

import { ReviewActions } from "./review-actions";
import { ReviewCategoryGroup } from "./review-category-group";
import { ReviewGuarantee } from "./review-guarantee";
import { ReviewShippingRow } from "./review-shipping-row";
import { ReviewTotals } from "./review-totals";

export function ReviewPanel() {
  return (
    <aside>
      <header>
        <h2>Your security system</h2>
        <p>Review panel lives here</p>
      </header>

      {REVIEW_CATEGORIES.map((category) => (
        <ReviewCategoryGroup
          key={category.id}
          categoryLabel={category.label}
          lineItemCount={1}
        />
      ))}

      <ReviewShippingRow />
      <ReviewGuarantee />
      <ReviewTotals />
      <ReviewActions />
    </aside>
  );
}
