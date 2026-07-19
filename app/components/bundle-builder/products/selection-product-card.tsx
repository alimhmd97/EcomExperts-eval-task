import { useState } from "react";

import { useBundleCart } from "~/context/bundle-cart-context";
import type { Product } from "~/types/catalog";
import {
  getVariantDisplayPrice,
} from "~/types/catalog";

import { PriceDisplay } from "../shared/price-display";
import { QuantityStepper } from "../shared/quantity-stepper";
import { ProductBadge } from "./product-badge";
import { VariantSelector } from "./variant-selector";

type SelectionProductCardProps = {
  product: Product;
};

function getInitialVariantId(product: Product): string | null {
  if (product.variants.length === 0) {
    return null;
  }

  if (
    product.defaultVariantId &&
    product.variants.some((variant) => variant.id === product.defaultVariantId)
  ) {
    return product.defaultVariantId;
  }

  return product.variants[0]?.id ?? null;
}

function getCompareAtPrice(
  product: Product,
  variantId: string | null,
): number | null {
  if (variantId) {
    const variant = product.variants.find((item) => item.id === variantId);
    return variant?.compareAtPrice ?? null;
  }

  return product.compareAtPrice ?? null;
}

export function SelectionProductCard({ product }: SelectionProductCardProps) {
  const { getQuantity, setQuantity, selections } = useBundleCart();
  const [activeVariantId, setActiveVariantId] = useState<string | null>(() =>
    getInitialVariantId(product),
  );

  const activeQuantity = getQuantity(product.id, activeVariantId);
  const isSelected = selections.some(
    (selection) =>
      selection.productId === product.id && selection.quantity > 0,
  );

  const displayPrice = getVariantDisplayPrice(product, activeVariantId);
  const compareAtPrice = getCompareAtPrice(product, activeVariantId);
  const activeVariant = activeVariantId
    ? product.variants.find((variant) => variant.id === activeVariantId)
    : undefined;
  const imageUrl =  product.imageUrl;

  const handleQuantityChange = (nextValue: number) => {
    setQuantity(product.id, activeVariantId, nextValue);
  };

  return (
    <article
      className={`relative flex h-full flex-col overflow-hidden rounded-2xl border bg-background p-5 shadow-[0_1px_3px_rgba(0,0,0,0.06)] transition-colors ${
        isSelected ? "border-primary" : "border-border"
      }`}
    >
      {product.badge ? <ProductBadge badge={product.badge} /> : null}

      <div className="mb-4 flex min-h-[148px] items-center justify-center px-2 pt-2">
        <img
          src={imageUrl}
          alt={product.name}
          onError={(event) => {
            event.currentTarget.src = "/assets/images/camera1.png";
          }}
          className="max-h-[132px] w-auto max-w-full object-contain"
        />
      </div>

      <div className="flex flex-1 flex-col gap-3">
        <div className="space-y-1.5">
          <h4 className="text-base font-bold leading-snug text-foreground">
            {product.name}
          </h4>
          <p className="text-sm font-medium leading-snug text-foreground-muted">
            {product.description}
          </p>
          <a
            href={product.learnMoreUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-block text-sm font-semibold text-primary underline underline-offset-2"
          >
            Learn More
          </a>
        </div>

        {product.variants.length > 0 && activeVariantId ? (
          <VariantSelector
            variants={product.variants}
            activeVariantId={activeVariantId}
            onSelect={setActiveVariantId}
            productName={product.name}
          />
        ) : null}

        <div className="mt-auto flex items-center justify-between gap-4 pt-2">
          <QuantityStepper
            value={activeQuantity}
            onChange={handleQuantityChange}
            ariaLabel={`${product.name} quantity`}
          />
          <PriceDisplay
            price={displayPrice}
            compareAtPrice={compareAtPrice}
          />
        </div>
      </div>
    </article>
  );
}
