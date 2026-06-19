import { useQuery } from "@tanstack/react-query";

import { BundleCartProvider } from "~/context/bundle-cart-context";
import { BuilderStepId } from "~/enums";
import { getProductsQuery } from "~/query/bundle";

import { BuilderAccordion } from "./builder/builder-accordion";
import { BundleBuilderLayout } from "./bundle-builder-layout";
import { ReviewPanel } from "./review/review-panel";

export function BundleBuilderPage() {
  const { data: products, error, isError, isLoading } = useQuery(
    getProductsQuery(),
  );

  if (isLoading) {
    return (
      <main>
        <p>Loading products…</p>
      </main>
    );
  }

  if (isError || !products) {
    return (
      <main>
        <p>
          Could not load products.{" "}
          {error instanceof Error
            ? error.message
            : "Start the JSON Server with npm run api or npm run dev:all."}
        </p>
      </main>
    );
  }

  return (
    <BundleCartProvider>
      <main>
        <h1>Let&apos;s get started!</h1>
        <p>Bundle builder page wrapper lives here</p>

        <BundleBuilderLayout
          builder={
            <BuilderAccordion
              products={products}
              openStepId={BuilderStepId.Cameras}
            />
          }
          review={<ReviewPanel />}
        />
      </main>
    </BundleCartProvider>
  );
}
