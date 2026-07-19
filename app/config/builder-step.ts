export const BUILDER_STEPS = [
  {
    id: "cameras",
    order: 1,
    title: "Choose your cameras",
    icon: "/assets/images/choose-cam.png",
    nextStepLabel: "Choose your plan",
  },
  {
    id: "plan",
    order: 2,
    title: "Choose your plan",
    icon: "/assets/images/choose-plan.png",
    nextStepLabel: "Choose your sensors",
  },
  {
    id: "sensors",
    order: 3,
    title: "Choose your sensors",
    icon: "/assets/images/choose-sensor.png",
    nextStepLabel: "Add extra protection",
  },
  {
    id: "protection",
    order: 4,
    title: "Add extra protection",
    icon: "/assets/images/extra-protection.png",
    nextStepLabel: null,
  },
] as const satisfies ReadonlyArray<{
  id: string;
  order: number;
  title: string;
  icon: string;
  nextStepLabel: string | null;
}>;

export type BuilderStepId = (typeof BUILDER_STEPS)[number]["id"];
export type BuilderStepConfig = (typeof BUILDER_STEPS)[number];
