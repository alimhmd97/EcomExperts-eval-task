import { useState } from "react";

import { BUILDER_STEPS, type BuilderStepId } from "~/enums";
import { getProductsForStep } from "~/lib/bundle/steps";
import type { Product } from "~/types/catalog";

import { BuilderStepSection } from "./builder-step";

type BuilderAccordionProps = {
  products: Product[];
  openStepId: BuilderStepId;
};

export function BuilderAccordion({
  products,
  openStepId,
}: BuilderAccordionProps) {
  const [activeStepId, setActiveStepId] = useState<BuilderStepId | null>(
    openStepId,
  );

  return (
    <section className="divide-y divide-border border-y border-border bg-background">
      {BUILDER_STEPS.map((step) => (
        <BuilderStepSection
          key={step.id}
          step={step}
          stepNumber={step.order}
          totalSteps={BUILDER_STEPS.length}
          products={getProductsForStep(step.id, products)}
          selectedCount={0}
          isOpen={step.id === activeStepId}
          onToggle={() =>
            setActiveStepId((current) =>
              current === step.id ? null : step.id,
            )
          }
        />
      ))}
    </section>
  );
}
