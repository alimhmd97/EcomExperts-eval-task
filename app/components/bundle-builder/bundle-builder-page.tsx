import { useQuery } from "@tanstack/react-query";

import { BundleCartProvider } from "~/context/bundle-cart-context";
import { BuilderStepId } from "~/enums";
import { getProductsQuery } from "~/query/bundle";

import { BuilderAccordion } from "./builder/builder-accordion";
import { ReviewPanel } from "./review/review-panel";

export function BundleBuilderPage() {
  const { data: products, error, isError, isLoading } = useQuery(
    getProductsQuery(),
  );

  if (isLoading) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-8">
        <p>Loading products…</p>
      </main>
    );
  }

  if (isError || !products) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-8">
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
      <main className="mx-auto max-w-7xl px-4 py-8">
        <h1 className="mb-8 text-3xl">Let&apos;s get started!</h1>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_min(24rem,100%)] lg:items-start">
          <BuilderAccordion
            products={products}
            openStepId={BuilderStepId.Cameras}
          />
          <div className="lg:sticky lg:top-8">
            <ReviewPanel />
          </div>
        </div>
      </main>
    </BundleCartProvider>
  );
}
