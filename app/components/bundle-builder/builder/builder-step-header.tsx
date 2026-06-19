import { StepIcon } from "../shared/step-icon";

type BuilderStepHeaderProps = {
  stepNumber: number;
  title: string;
  icon: string;
  selectedCount: number;
  isOpen: boolean;
};

export function BuilderStepHeader({
  stepNumber,
  title,
  icon,
  selectedCount,
  isOpen,
}: BuilderStepHeaderProps) {
  return (
    <header>
      <p>
        STEP {stepNumber} OF 4 — {title}
      </p>
      <StepIcon icon={icon} />
      <p>{selectedCount} selected</p>
      <p>[chevron: {isOpen ? "up" : "down"}]</p>
    </header>
  );
}
