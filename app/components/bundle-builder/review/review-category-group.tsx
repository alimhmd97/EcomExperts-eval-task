import { ReviewLineItem } from "../products/review-line-item";

type ReviewCategoryGroupProps = {
  categoryLabel: string;
  lineItemCount: number;
};

export function ReviewCategoryGroup({
  categoryLabel,
  lineItemCount,
}: ReviewCategoryGroupProps) {
  return (
    <section>
      <h3>{categoryLabel}</h3>
      <p>Review category group lives here</p>
      {Array.from({ length: lineItemCount }, (_, index) => (
        <ReviewLineItem key={index} />
      ))}
    </section>
  );
}
