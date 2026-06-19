export function ReviewActions() {
  return (
    <footer className="flex flex-col items-center gap-4">
      <button
        type="button"
        className="w-full rounded-xl bg-primary px-6 py-4 text-base font-bold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        Checkout
      </button>
      <button
        type="button"
        className="text-sm font-semibold text-foreground-muted underline decoration-from-font underline-offset-2 transition-colors hover:text-foreground"
      >
        <span className="italic">Save my system for later</span>
      </button>
    </footer>
  );
}
