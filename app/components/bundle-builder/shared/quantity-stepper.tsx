type QuantityStepperProps = {
  value: number;
  onChange: (nextValue: number) => void;
  min?: number;
  max?: number;
  ariaLabel: string;
};

export function QuantityStepper({
  value,
  onChange,
  min = 0,
  max = 99,
  ariaLabel,
}: QuantityStepperProps) {
  const canDecrease = value > min;
  const canIncrease = value < max;

  return (
    <div
      className="inline-flex items-center gap-1"
      role="group"
      aria-label={ariaLabel}
    >
      <button
        type="button"
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={!canDecrease}
        aria-label={`Decrease ${ariaLabel}`}
        className="flex size-8 items-center justify-center rounded-md border border-border bg-[#f4f5f7] text-foreground transition-colors enabled:hover:bg-border disabled:cursor-not-allowed disabled:opacity-40"
      >
        <span aria-hidden="true">−</span>
      </button>
      <span
        className="min-w-6 text-center text-sm font-bold text-foreground"
        aria-live="polite"
      >
        {value}
      </span>
      <button
        type="button"
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={!canIncrease}
        aria-label={`Increase ${ariaLabel}`}
        className="flex size-8 items-center justify-center rounded-md border border-border bg-[#f4f5f7] text-foreground transition-colors enabled:hover:bg-border disabled:cursor-not-allowed disabled:opacity-40"
      >
        <span aria-hidden="true">+</span>
      </button>
    </div>
  );
}
