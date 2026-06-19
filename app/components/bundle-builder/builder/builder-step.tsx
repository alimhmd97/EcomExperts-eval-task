import type { BuilderStep } from "~/types/catalog";

import { BuilderProductGrid } from "./builder-product-grid";
import { BuilderStepFooter } from "./builder-step-footer";
import { BuilderStepHeader } from "./builder-step-header";

type BuilderStepSectionProps = {
  step: BuilderStep;
  stepNumber: number;
  productCount: number;
  selectedCount: number;
  isOpen: boolean;
};

export function BuilderStepSection({
  step,
  stepNumber,
  productCount,
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
          <BuilderProductGrid productCount={productCount} />
          <BuilderStepFooter nextStepLabel={step.nextStepLabel} />
        </>
      ) : null}
    </section>
  );
}
