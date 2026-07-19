import { useQuery } from "@tanstack/react-query";

import { BundleCartProvider } from "~/context/bundle-cart-context";
import { getProductsQuery } from "~/query/bundle";

import { BuilderAccordion } from "./builder/builder-accordion";
import { ReviewPanel } from "./review/review-panel";

export function BundleBuilderPage() {
  const { data: products, error, isError, isLoading } = useQuery(
    getProductsQuery(),
  );

  if (isLoading) {
    return (
      <main className="mx-auto max-w-[85rem] px-4 py-8">
        <p>Loading products…</p>
      </main>
    );
  }

  if (isError || !products) {
    return (
      <main className="mx-auto max-w-[85rem] px-4 py-8">
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
      <main className="mx-auto max-w-[85rem] px-4 py-8 builder:max-w-none builder:px-10">
        <h1 className="mb-6 text-3xl font-extrabold text-foreground lg:hidden">
          Let&rsquo;s get started!
        </h1>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_min(24rem,100%)] lg:items-start builder:flex builder:flex-col">
          <div className="builder:w-full">
            <BuilderAccordion
              products={products}
              openStepId="cameras"
            />
          </div>
          <div className="lg:sticky lg:bottom-8 lg:self-end builder:static builder:w-full">
            <ReviewPanel products={products} />
          </div>
        </div>
      </main>
    </BundleCartProvider>
  );
}
