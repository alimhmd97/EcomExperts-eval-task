type BuilderStepFooterProps = {
  nextStepLabel: string | null;
  onNext?: () => void;
};

export function BuilderStepFooter({
  nextStepLabel,
  onNext,
}: BuilderStepFooterProps) {
  if (!nextStepLabel) {
    return null;
  }

  return (
    <footer className="pt-4">
      <button
        type="button"
        onClick={onNext}
        className="w-full rounded-lg bg-primary px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-primary/90"
      >
        Next: {nextStepLabel}
      </button>
    </footer>
  );
}
