type StepIconProps = {
  icon: string;
  className?: string;
};

const ICON_PATHS: Record<string, React.ReactNode> = {
  // Security camera
  camera: (
    <>
      <rect x="3" y="6" width="13" height="12" rx="2.5" />
      <path d="M16 10l5-3v10l-5-3" />
    </>
  ),
  // Plan / protection shield
  shield: <path d="M12 3l7 3v5c0 4.6-3 7.6-7 9-4-1.4-7-4.4-7-9V6l7-3z" />,
  // Motion sensor
  sensor: (
    <>
      <path d="M5 9a7 7 0 0114 0" />
      <path d="M8 9.5a4 4 0 018 0" />
      <rect x="9" y="12.5" width="6" height="7.5" rx="2" />
    </>
  ),
  // Extra protection / coverage
  grid: (
    <>
      <path d="M4 9l8-5 8 5" />
      <path d="M5 9v9M9.5 9v9M14.5 9v9M19 9v9" />
      <path d="M3 20.5h18" />
    </>
  ),
};

export function StepIcon({ icon, className }: StepIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      width={22}
      height={22}
      aria-hidden="true"
      className={className}
    >
      {ICON_PATHS[icon] ?? ICON_PATHS.shield}
    </svg>
  );
}
