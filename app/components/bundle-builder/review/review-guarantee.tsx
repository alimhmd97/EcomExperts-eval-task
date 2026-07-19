export function ReviewGuarantee() {
  return (
    <div className="flex items-center gap-3">
      <img
        src="/assets/images/Satisfaction Badge-05 1.png"
        alt="100% Wyze satisfaction guarantee"
        className="size-20 builder:size-25 shrink-0 select-none"
        draggable={false}
      />
      <div className="hidden builder:block">
        <p className="text-lg font-bold text-foreground">
          30-day hassle-free returns
        </p>
        <p className="mt-1 text-lg text-foreground-muted">
          If you&apos;re not totally in love with the product, we will refund
          you 100%.
        </p>
      </div>
    </div>
  );
}
