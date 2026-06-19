import type { BuilderStep } from "~/types/catalog";

import { BuilderStepSection } from "./builder-step";

type BuilderAccordionProps = {
  steps: BuilderStep[];
  openStepId: string;
};

export function BuilderAccordion({ steps, openStepId }: BuilderAccordionProps) {
  const sortedSteps = [...steps].sort((a, b) => a.order - b.order);

  return (
    <section>
      <p>Builder accordion lives here</p>
      {sortedSteps.map((step) => (
        <BuilderStepSection
          key={step.id}
          step={step}
          stepNumber={step.order}
          productCount={2}
          selectedCount={0}
          isOpen={step.id === openStepId}
        />
      ))}
    </section>
  );
}
