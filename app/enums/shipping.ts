export enum ShippingId {
  FastShipping = "fast-shipping",
}

export const SHIPPING = {
  id: ShippingId.FastShipping,
  name: "Fast Shipping",
  icon: "truck" as const,
  price: 0,
  compareAtPrice: 5.99,
} as const;
