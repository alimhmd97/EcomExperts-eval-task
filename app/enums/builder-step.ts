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
    icon: "/assets/images/choose-cam.png",
    nextStepLabel: "Choose your plan",
  },
  {
    id: BuilderStepId.Plan,
    order: 2,
    title: "Choose your plan",
    icon: "/assets/images/choose-plan.png",
    nextStepLabel: "Choose your sensors",
  },
  {
    id: BuilderStepId.Sensors,
    order: 3,
    title: "Choose your sensors",
    icon: "/assets/images/choose-sensor.png",
    nextStepLabel: "Add extra protection",
  },
  {
    id: BuilderStepId.Protection,
    order: 4,
    title: "Add extra protection",
    icon: "/assets/images/extra-protection.png",
    nextStepLabel: null,
  },
] as const satisfies ReadonlyArray<{
  id: BuilderStepId;
  order: number;
  title: string;
  icon: string;
  nextStepLabel: string | null;
}>;

export type BuilderStepConfig = (typeof BUILDER_STEPS)[number];
