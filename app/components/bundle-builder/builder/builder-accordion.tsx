import { useState } from "react";

import {
  Accordion,
  AccordionItem,
  AccordionPanel,
  AccordionTrigger,
} from "~/components/ui/accordion";
import { Button } from "~/components/ui/button";
import { useBundleCart } from "~/context/bundle-cart-context";
import { BUILDER_STEPS, type BuilderStepId } from "~/config";
import { getSelectedCountForStep } from "~/utils/bundle/cart";
import { getProductsForStep } from "~/utils/bundle/steps";
import type { Product } from "~/types/catalog";

import { BuilderProductGrid } from "./builder-product-grid";
import { BuilderStepHeader } from "./builder-step-header";

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
    <Accordion
      value={activeStepId}
      onValueChange={(id) => setActiveStepId(id as BuilderStepId | null)}
      className="overflow-hidden rounded-3xl bg-background"
    >
      {BUILDER_STEPS.map((step, index) => {
        const nextStep = BUILDER_STEPS[index + 1] ?? null;
        const isOpen = step.id === activeStepId;

        return (
          <AccordionItem
            key={step.id}
            value={step.id}
            className={({ isOpen }) => (isOpen ? "bg-surface-soft" : "")}
          >
            <span className="block px-5 pt-5 pb-2 text-[11px] font-bold uppercase tracking-[0.12em] text-foreground-subtle">
              Step {step.order} of {BUILDER_STEPS.length}
            </span>
            <AccordionTrigger
              headingLevel={3}
              headingClassName={`border-border ${isOpen ? "border-t" : "border-y"}`}
              className="flex h-[68px] w-full items-center gap-4 px-5 text-left outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <BuilderStepHeader
                title={step.title}
                icon={step.icon}
                selectedCount={getSelectedCountForStep(
                  step.id,
                  selections,
                  products,
                )}
                isOpen={isOpen}
              />
            </AccordionTrigger>
            <AccordionPanel className="px-5 pb-6">
              <BuilderProductGrid
                products={getProductsForStep(step.id, products)}
              />
              {step.nextStepLabel ? (
                <footer className="flex justify-center pt-4">
                  <Button
                    variant="outline"
                    onClick={
                      nextStep ? () => setActiveStepId(nextStep.id) : undefined
                    }
                  >
                    Next: {step.nextStepLabel}
                  </Button>
                </footer>
              ) : null}
            </AccordionPanel>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}
