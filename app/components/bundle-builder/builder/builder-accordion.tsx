import { BUILDER_STEPS, type BuilderStepId } from "~/enums";
import { getProductsForStep } from "~/lib/bundle/steps";
import type { Product } from "~/types/catalog";

import { BuilderStepSection } from "./builder-step";

type BuilderAccordionProps = {
  products: Product[];
  openStepId: BuilderStepId;
};

export function BuilderAccordion({ products, openStepId }: BuilderAccordionProps) {
  return (
    <section>
      <p>Builder accordion lives here</p>
      {BUILDER_STEPS.map((step) => (
        <BuilderStepSection
          key={step.id}
          step={step}
          stepNumber={step.order}
          products={getProductsForStep(step.id, products)}
          selectedCount={0}
          isOpen={step.id === openStepId}
        />
      ))}
    </section>
  );
}
