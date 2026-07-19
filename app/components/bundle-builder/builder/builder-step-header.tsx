type BuilderStepHeaderProps = {
  title: string;
  icon: string;
  selectedCount: number;
  isOpen: boolean;
};

/**
 * Inner content of a builder step's accordion trigger (icon, title, badge).
 * The button, aria wiring, and chevron are owned by <AccordionTrigger>.
 */
export function BuilderStepHeader({
  title,
  icon,
  selectedCount,
  isOpen,
}: BuilderStepHeaderProps) {
  return (
    <span className="flex flex-1 items-center gap-2.5">
      <img
        src={icon}
        alt=""
        aria-hidden="true"
        className={`size-[22px] shrink-0 object-contain ${isOpen ? "opacity-100" : "opacity-80"}`}
      />
      <span className="text-lg font-bold text-foreground">{title}</span>
      {selectedCount > 0 ? (
        <span className="ml-auto text-sm font-bold text-primary">
          {selectedCount} selected
        </span>
      ) : null}
    </span>
  );
}
