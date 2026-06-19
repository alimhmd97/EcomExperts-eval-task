import type { StepIcon } from "~/types/catalog";

export enum BuilderStepId {
  Cameras = "cameras",
  Plan = "plan",
  Sensors = "sensors",
  Protection = "protection",
}

export const BUILDER_STEPS = [
  {
    id: BuilderStepId.Cameras,
    order: 1,
    title: "Choose your cameras",
    icon: "camera" as StepIcon,
    nextStepLabel: "Choose your plan",
  },
  {
    id: BuilderStepId.Plan,
    order: 2,
    title: "Choose your plan",
    icon: "shield" as StepIcon,
    nextStepLabel: "Choose your sensors",
  },
  {
    id: BuilderStepId.Sensors,
    order: 3,
    title: "Choose your sensors",
    icon: "sensor" as StepIcon,
    nextStepLabel: "Add extra protection",
  },
  {
    id: BuilderStepId.Protection,
    order: 4,
    title: "Add extra protection",
    icon: "grid" as StepIcon,
    nextStepLabel: null,
  },
] as const;

export type BuilderStepConfig = (typeof BUILDER_STEPS)[number];
