import { useState } from "react";

import { useBundleCart } from "~/context/bundle-cart-context";
import { BUILDER_STEPS, type BuilderStepId } from "~/enums";
import { getSelectedCountForStep } from "~/lib/bundle/cart";
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
  const { selections } = useBundleCart();
  const [activeStepId, setActiveStepId] = useState<BuilderStepId | null>(
    openStepId,
  );

  return (
    <section className=" bg-background">
      {BUILDER_STEPS.map((step, index) => {
        const isOpen = step.id === activeStepId;
        const nextStep = BUILDER_STEPS[index + 1] ?? null;

        return (
          <div
            key={step.id}
            className={isOpen ? "bg-surface-soft" : undefined}
          >
            <span className="block px-5 pt-5 pb-2 text-[11px] font-bold uppercase tracking-[0.12em] text-foreground-subtle">
              Step {step.order} of {BUILDER_STEPS.length}
            </span>
            <BuilderStepSection
              step={step}
              stepNumber={step.order}
              totalSteps={BUILDER_STEPS.length}
              products={getProductsForStep(step.id, products)}
              selectedCount={getSelectedCountForStep(
                step.id,
                selections,
                products,
              )}
              isOpen={isOpen}
              onToggle={() =>
                setActiveStepId((current) =>
                  current === step.id ? null : step.id,
                )
              }
              onNext={
                nextStep ? () => setActiveStepId(nextStep.id) : undefined
              }
            />
          </div>
        );
      })}
    </section>
  );
}
