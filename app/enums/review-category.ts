export enum ReviewCategoryId {
  Cameras = "cameras",
  Sensors = "sensors",
  Accessories = "accessories",
  Plan = "plan",
}

export const REVIEW_CATEGORIES = [
  { id: ReviewCategoryId.Cameras, label: "Cameras", order: 1 },
  { id: ReviewCategoryId.Sensors, label: "Sensors", order: 2 },
  { id: ReviewCategoryId.Accessories, label: "Accessories", order: 3 },
  { id: ReviewCategoryId.Plan, label: "Plan", order: 4 },
] as const;
