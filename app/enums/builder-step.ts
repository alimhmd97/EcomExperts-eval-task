import {
  Camera,
  LayoutGrid,
  Radar,
  Shield,
  type LucideIcon,
} from "lucide-react";

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
    icon: Camera,
    nextStepLabel: "Choose your plan",
  },
  {
    id: BuilderStepId.Plan,
    order: 2,
    title: "Choose your plan",
    icon: Shield,
    nextStepLabel: "Choose your sensors",
  },
  {
    id: BuilderStepId.Sensors,
    order: 3,
    title: "Choose your sensors",
    icon: Radar,
    nextStepLabel: "Add extra protection",
  },
  {
    id: BuilderStepId.Protection,
    order: 4,
    title: "Add extra protection",
    icon: LayoutGrid,
    nextStepLabel: null,
  },
] as const satisfies ReadonlyArray<{
  id: BuilderStepId;
  order: number;
  title: string;
  icon: LucideIcon;
  nextStepLabel: string | null;
}>;

export type BuilderStepConfig = (typeof BUILDER_STEPS)[number];
