type StepIconProps = {
  icon: string;
};

export function StepIcon({ icon }: StepIconProps) {
  return <span>[step icon: {icon}]</span>;
}
