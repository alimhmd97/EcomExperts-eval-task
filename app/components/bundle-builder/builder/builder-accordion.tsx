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
    <section className=" bg-background">
      {BUILDER_STEPS.map((step) => (
        <div key={step.id}>
          <span className="block px-5 pt-5 pb-2 text-[11px] font-bold uppercase tracking-[0.12em] text-foreground-subtle">
            Step {step.order} of {BUILDER_STEPS.length}
          </span>
          <BuilderStepSection
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
        </div>
      ))}
    </section>
  );
}
