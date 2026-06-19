import type { BuilderStepConfig } from "~/enums";
import type { Product } from "~/types/catalog";

import { BuilderProductGrid } from "./builder-product-grid";
import { BuilderStepFooter } from "./builder-step-footer";
import { BuilderStepHeader } from "./builder-step-header";

type BuilderStepSectionProps = {
  step: BuilderStepConfig;
  stepNumber: number;
  products: Product[];
  selectedCount: number;
  isOpen: boolean;
};

export function BuilderStepSection({
  step,
  stepNumber,
  products,
  selectedCount,
  isOpen,
}: BuilderStepSectionProps) {
  return (
    <section>
      <BuilderStepHeader
        stepNumber={stepNumber}
        title={step.title}
        icon={step.icon}
        selectedCount={selectedCount}
        isOpen={isOpen}
      />
      {isOpen ? (
        <>
          <BuilderProductGrid products={products} />
          <BuilderStepFooter nextStepLabel={step.nextStepLabel} />
        </>
      ) : null}
    </section>
  );
}
