import type { ReviewLine } from "~/lib/bundle/review-groups";

import { ReviewLineItem } from "../products/review-line-item";

type ReviewCategoryGroupProps = {
  categoryLabel: string;
  lines: ReviewLine[];
};

export function ReviewCategoryGroup({
  categoryLabel,
  lines,
}: ReviewCategoryGroupProps) {
  return (
    <section>
      <h3>{categoryLabel}</h3>
      {lines.map((line) => (
        <ReviewLineItem key={line.selectionId} line={line} />
      ))}
    </section>
  );
}
