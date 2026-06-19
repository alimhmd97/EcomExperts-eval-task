import { BundleCartProvider } from "~/context/bundle-cart-context";
import type { BuilderStep } from "~/types/catalog";

import { BuilderAccordion } from "./builder/builder-accordion";
import { BundleBuilderLayout } from "./bundle-builder-layout";
import { ReviewPanel } from "./review/review-panel";

const DUMMY_STEPS: BuilderStep[] = [
  {
    id: "cameras",
    order: 1,
    title: "Choose your cameras",
    icon: "camera",
    nextStepId: "plan",
    nextStepLabel: "Choose your plan",
  },
  {
    id: "plan",
    order: 2,
    title: "Choose your plan",
    icon: "shield",
    nextStepId: "sensors",
    nextStepLabel: "Choose your sensors",
  },
  {
    id: "sensors",
    order: 3,
    title: "Choose your sensors",
    icon: "sensor",
    nextStepId: "protection",
    nextStepLabel: "Add extra protection",
  },
  {
    id: "protection",
    order: 4,
    title: "Add extra protection",
    icon: "grid",
    nextStepId: null,
    nextStepLabel: null,
  },
];

export function BundleBuilderPage() {
  return (
    <BundleCartProvider>
      <main>
        <h1>Let&apos;s get started!</h1>
        <p>Bundle builder page wrapper lives here</p>

        <BundleBuilderLayout
          builder={
            <BuilderAccordion steps={DUMMY_STEPS} openStepId="cameras" />
          }
          review={<ReviewPanel />}
        />
      </main>
    </BundleCartProvider>
  );
}
