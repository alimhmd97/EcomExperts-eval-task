import type { LucideIcon } from "lucide-react";

type BuilderStepHeaderProps = {
  id: string;
  panelId: string;
  stepNumber: number;
  totalSteps: number;
  title: string;
  icon: LucideIcon;
  selectedCount: number;
  isOpen: boolean;
  onToggle: () => void;
};

export function BuilderStepHeader({
  id,
  panelId,
  title,
  icon: Icon,
  selectedCount,
  isOpen,
  onToggle,
}: BuilderStepHeaderProps) {
  return (
    <h3
      className={`m-0 border-border ${isOpen ? "border-t" : "border-y"}`}
    >
      <button
        id={id}
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={panelId}
        className="flex h-[68px] w-full items-center gap-4 px-5 text-left outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
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
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          width={18}
          height={18}
          aria-hidden="true"
          className={`shrink-0 transition-transform duration-300 ease-out motion-reduce:transition-none ${
            isOpen ? "-rotate-180 text-primary" : "text-foreground-subtle"
          }`}
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>
    </h3>
  );
}
