import type { LucideIcon } from "lucide-react";

type BuilderStepHeaderProps = {
  title: string;
  icon: LucideIcon;
  selectedCount: number;
  isOpen: boolean;
};

/**
 * Inner content of a builder step's accordion trigger (icon, title, badge).
 * The button, aria wiring, and chevron are owned by <AccordionTrigger>.
 */
export function BuilderStepHeader({
  title,
  icon: Icon,
  selectedCount,
  isOpen,
}: BuilderStepHeaderProps) {
  return (
    <span className="flex flex-1 flex-col gap-1.5">
      <span className="flex items-center gap-2.5">
        <Icon
          size={22}
          strokeWidth={1.75}
          aria-hidden="true"
          className={isOpen ? "text-primary" : "text-foreground"}
        />
        <span className="text-lg font-bold text-foreground">{title}</span>
        {selectedCount > 0 ? (
          <span className="ml-1 inline-flex min-w-5 items-center justify-center rounded-full bg-surface-soft px-1.5 text-xs font-bold text-primary">
            {selectedCount}
          </span>
        ) : null}
      </span>
    </span>
  );
}
