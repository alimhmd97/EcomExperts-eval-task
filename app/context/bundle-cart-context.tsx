import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

import {
  loadCartFromStorage,
  saveCartToStorage,
} from "~/lib/bundle/persistence";
import type { CartSelection } from "~/types/catalog";

type BundleCartContextValue = {
  selections: CartSelection[];
  getQuantity: (productId: string, variantId: string | null) => number;
  setQuantity: (
    productId: string,
    variantId: string | null,
    quantity: number,
  ) => void;
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
  const [selections, setSelections] = useState<CartSelection[]>([]);
  // Skip persisting until the stored cart has been loaded, so we don't
  // overwrite saved selections with the empty initial state on mount.
  const isLoaded = useRef(false);

  useEffect(() => {
    const stored = loadCartFromStorage();
    if (stored) {
      setSelections(stored);
    }
    isLoaded.current = true;
  }, []);

  useEffect(() => {
    if (!isLoaded.current) {
      return;
    }
    saveCartToStorage(selections);
  }, [selections]);

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

  const clear = useCallback(() => setSelections([]), []);

  const value = useMemo<BundleCartContextValue>(
    () => ({ selections, getQuantity, setQuantity, clear }),
    [selections, getQuantity, setQuantity, clear],
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
