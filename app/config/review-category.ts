export const REVIEW_CATEGORIES = [
  { id: "cameras", label: "Cameras", order: 1 },
  { id: "sensors", label: "Sensors", order: 2 },
  { id: "accessories", label: "Accessories", order: 3 },
  { id: "plan", label: "Plan", order: 4 },
] as const;

export type ReviewCategoryId = (typeof REVIEW_CATEGORIES)[number]["id"];
