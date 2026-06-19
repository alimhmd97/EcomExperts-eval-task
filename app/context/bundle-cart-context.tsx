import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import {
  loadCartFromStorage,
  saveCartToStorage,
} from "~/lib/bundle/persistence";
import { seedSelections } from "~/lib/bundle/seed";
import type { CartSelection } from "~/types/catalog";

type BundleCartContextValue = {
  selections: CartSelection[];
  getQuantity: (productId: string, variantId: string | null) => number;
  setQuantity: (
    productId: string,
    variantId: string | null,
    quantity: number,
  ) => void;
  /** Persist the current configuration ("Save my system for later"). */
  save: () => void;
  clear: () => void;
};

const BundleCartContext = createContext<BundleCartContextValue | null>(null);

function selectionId(productId: string, variantId: string | null): string {
  return `${productId}::${variantId ?? "default"}`;
}

type BundleCartProviderProps = {
  children: ReactNode;
};

export function BundleCartProvider({ children }: BundleCartProviderProps) {
  // Start from the design seed so the first paint (and SSR) matches the
  // design; if the shopper previously saved a system, restore it on mount.
  const [selections, setSelections] = useState<CartSelection[]>(seedSelections);

  useEffect(() => {
    const stored = loadCartFromStorage();
    if (stored) {
      setSelections(stored);
    }
  }, []);

  const getQuantity = useCallback(
    (productId: string, variantId: string | null) =>
      selections.find((item) => item.id === selectionId(productId, variantId))
        ?.quantity ?? 0,
    [selections],
  );

  const setQuantity = useCallback(
    (productId: string, variantId: string | null, quantity: number) => {
      const id = selectionId(productId, variantId);
      setSelections((current) => {
        if (quantity <= 0) {
          return current.filter((item) => item.id !== id);
        }

        if (current.some((item) => item.id === id)) {
          return current.map((item) =>
            item.id === id ? { ...item, quantity } : item,
          );
        }

        return [...current, { id, productId, variantId, quantity }];
      });
    },
    [],
  );

  const save = useCallback(() => {
    saveCartToStorage(selections);
  }, [selections]);

  const clear = useCallback(() => setSelections([]), []);

  const value = useMemo<BundleCartContextValue>(
    () => ({ selections, getQuantity, setQuantity, save, clear }),
    [selections, getQuantity, setQuantity, save, clear],
  );

  return (
    <BundleCartContext.Provider value={value}>
      {children}
    </BundleCartContext.Provider>
  );
}

export function useBundleCart(): BundleCartContextValue {
  const context = useContext(BundleCartContext);
  if (!context) {
    throw new Error("useBundleCart must be used within a BundleCartProvider");
  }
  return context;
}
