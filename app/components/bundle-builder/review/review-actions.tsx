import { useState } from "react";

import { Button } from "~/components/ui/button";
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
      <Button
        variant="solid"
        size="lg"
        className="w-full"
        onClick={() => setCheckedOut(true)}
      >
        {checkedOut ? "Order placed ✓" : "Checkout"}
      </Button>
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
