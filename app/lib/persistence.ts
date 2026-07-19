import type { CartSelection } from "~/types/catalog";

const STORAGE_KEY = "bundle-cart";

export function saveCartToStorage(selections: CartSelection[]): void {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(selections));
  } catch {
  }
}

export function loadCartFromStorage(): CartSelection[] | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return null;
    }

    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as CartSelection[]) : null;
  } catch {
    return null;
  }
}
