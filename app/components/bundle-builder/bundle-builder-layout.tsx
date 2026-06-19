import type { ReactNode } from "react";

type BundleBuilderLayoutProps = {
  builder: ReactNode;
  review: ReactNode;
};

export function BundleBuilderLayout({
  builder,
  review,
}: BundleBuilderLayoutProps) {
  return (
    <div>
      <p>Page layout lives here (responsive shell)</p>
      <div>
        <div>{builder}</div>
        <div>{review}</div>
      </div>
    </div>
  );
}
