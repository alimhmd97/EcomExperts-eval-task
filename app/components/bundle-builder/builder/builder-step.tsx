import type { BuilderStepConfig } from "~/enums";
import type { Product } from "~/types/catalog";

import { BuilderProductGrid } from "./builder-product-grid";
import { BuilderStepFooter } from "./builder-step-footer";
import { BuilderStepHeader } from "./builder-step-header";

type BuilderStepSectionProps = {
  step: BuilderStepConfig;
  stepNumber: number;
  totalSteps: number;
  products: Product[];
  selectedCount: number;
  isOpen: boolean;
  onToggle: () => void;
};

export function BuilderStepSection({
  step,
  stepNumber,
  totalSteps,
  products,
  selectedCount,
  isOpen,
  onToggle,
}: BuilderStepSectionProps) {
  // Link accordion toggle to its panel for screen readers (aria-controls / aria-labelledby).
  const headerId = `step-header-${step.id}`;
  const panelId = `step-panel-${step.id}`;

  return (
    <section>
      
      <BuilderStepHeader
        id={headerId}
        panelId={panelId}
        stepNumber={stepNumber}
        totalSteps={totalSteps}
        title={step.title}
        icon={step.icon}
        selectedCount={selectedCount}
        isOpen={isOpen}
        onToggle={onToggle}
      />
      <div
        id={panelId}
        role="region"
        aria-labelledby={headerId}
        className="grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none"
        style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
      >
        <div className="min-h-0 overflow-hidden" inert={!isOpen}>
          <div className="px-5 pb-6">
            <BuilderProductGrid products={products} />
            <BuilderStepFooter nextStepLabel={step.nextStepLabel} />
          </div>
        </div>
      </div>
    </section>
  );
}
