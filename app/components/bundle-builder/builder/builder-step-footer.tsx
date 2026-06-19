type BuilderStepFooterProps = {
  nextStepLabel: string | null;
};

export function BuilderStepFooter({ nextStepLabel }: BuilderStepFooterProps) {
  if (!nextStepLabel) {
    return null;
  }

  return <footer>[Next: {nextStepLabel}] button lives here</footer>;
}
