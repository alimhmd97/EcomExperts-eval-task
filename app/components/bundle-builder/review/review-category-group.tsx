import type { ReviewLine } from "~/utils/bundle/review-groups";

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
    <section className="border-t border-border py-2">
      <h3 className="pt-2 text-[11px] font-medium uppercase tracking-[0.12em] text-foreground-subtle">
        {categoryLabel}
      </h3>
      <div className="divide-y divide-border/60">
        {lines.map((line) => (
          <ReviewLineItem key={line.selectionId} line={line} />
        ))}
      </div>
    </section>
  );
}
