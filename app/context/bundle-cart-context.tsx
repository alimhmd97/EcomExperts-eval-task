import type { ReactNode } from "react";

type BundleCartProviderProps = {
  children: ReactNode;
};

export function BundleCartProvider({ children }: BundleCartProviderProps) {
  return <>{children}</>;
}
