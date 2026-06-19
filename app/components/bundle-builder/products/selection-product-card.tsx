type SelectionProductCardProps = {
  productId: string;
};

export function SelectionProductCard({ productId }: SelectionProductCardProps) {
  return <article>Selection product card: {productId}</article>;
}
