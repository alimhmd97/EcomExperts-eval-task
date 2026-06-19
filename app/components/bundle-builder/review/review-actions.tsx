import { useState } from "react";

import { useBundleCart } from "~/context/bundle-cart-context";

export function ReviewActions() {
  const { save } = useBundleCart();
  const [saved, setSaved] = useState(false);
  const [checkedOut, setCheckedOut] = useState(false);

  const handleSave = () => {
    save();
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2000);
  };

  return (
    <footer className="flex flex-col items-center gap-4">
      <button
        type="button"
        onClick={() => setCheckedOut(true)}
        className="w-full rounded-xl bg-primary px-6 py-4 text-base font-bold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        {checkedOut ? "Order placed ✓" : "Checkout"}
      </button>
      <button
        type="button"
        onClick={handleSave}
        className="text-sm font-semibold text-foreground-muted underline decoration-from-font underline-offset-2 transition-colors hover:text-foreground"
      >
        <span className="italic">
          {saved ? "System saved ✓" : "Save my system for later"}
        </span>
      </button>
    </footer>
  );
}
