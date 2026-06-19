import { useQuery } from "@tanstack/react-query";

import { getBundleBootstrapQuery } from "~/query/bundle";

export function BundleBuilderPage() {
  const { data, error, isError, isLoading } = useQuery(getBundleBootstrapQuery());

  if (isLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f5f5f5]">
        <p className="text-sm text-gray-600">Loading bundle catalog…</p>
      </main>
    );
  }

  if (isError || !data) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f5f5f5] px-4">
        <div className="max-w-md rounded-xl bg-white p-6 shadow-sm">
          <h1 className="text-lg font-semibold text-gray-900">
            Could not load bundle data
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            {error instanceof Error
              ? error.message
              : "Start the JSON Server with npm run api or npm run dev:all."}
          </p>
        </div>
      </main>
    );
  }

  const firstStep = data.steps.find((step) => step.order === 1) ?? data.steps[0];

  return (
    <main className="min-h-screen bg-[#f5f5f5] px-4 py-8">
      <div className="mx-auto max-w-5xl rounded-2xl bg-white p-8 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-wide text-purple-600">
          Data layer connected
        </p>
        <h1 className="mt-2 text-2xl font-semibold text-gray-900">
          Wyze Bundle Builder
        </h1>
        <p className="mt-2 text-sm text-gray-600">
          Loaded {data.steps.length} steps and {data.products.length} products from
          the JSON Server API.
        </p>
        {firstStep ? (
          <p className="mt-6 text-sm text-gray-700">
            First step:{" "}
            <span className="font-medium text-gray-900">{firstStep.title}</span>
          </p>
        ) : null}
      </div>
    </main>
  );
}
