import {
  createContext,
  useContext,
  useId,
  useState,
  type ReactNode,
} from "react";

type AccordionContextValue = {
  openId: string | null;
  toggle: (id: string) => void;
};

const AccordionContext = createContext<AccordionContextValue | null>(null);

function useAccordionContext() {
  const context = useContext(AccordionContext);
  if (!context) {
    throw new Error("Accordion parts must be used within <Accordion>.");
  }
  return context;
}

type AccordionItemContextValue = {
  isOpen: boolean;
  headerId: string;
  panelId: string;
  onToggle: () => void;
};

const AccordionItemContext = createContext<AccordionItemContextValue | null>(
  null,
);

function useAccordionItemContext() {
  const context = useContext(AccordionItemContext);
  if (!context) {
    throw new Error(
      "AccordionTrigger and AccordionPanel must be used within <AccordionItem>.",
    );
  }
  return context;
}

type AccordionProps = {
  children: ReactNode;
  className?: string;
  /** Controlled open item id (use with onValueChange). */
  value?: string | null;
  onValueChange?: (id: string | null) => void;
  /** Initial open item id for uncontrolled use. */
  defaultValue?: string | null;
};

/**
 * Single-open accordion root. Supports controlled (`value` + `onValueChange`)
 * and uncontrolled (`defaultValue`) usage.
 */
export function Accordion({
  children,
  className,
  value,
  onValueChange,
  defaultValue = null,
}: AccordionProps) {
  const [internalId, setInternalId] = useState<string | null>(defaultValue);
  const isControlled = value !== undefined;
  const openId = isControlled ? value : internalId;

  const toggle = (id: string) => {
    const nextId = openId === id ? null : id;
    if (!isControlled) {
      setInternalId(nextId);
    }
    onValueChange?.(nextId);
  };

  return (
    <AccordionContext.Provider value={{ openId, toggle }}>
      <div className={className}>{children}</div>
    </AccordionContext.Provider>
  );
}

type AccordionItemProps = {
  value: string;
  children: ReactNode;
  /** String, or a function receiving the open state for stateful styling. */
  className?: string | ((state: { isOpen: boolean }) => string);
};

export function AccordionItem({
  value,
  children,
  className,
}: AccordionItemProps) {
  const { openId, toggle } = useAccordionContext();
  const reactId = useId();
  const isOpen = openId === value;
  const headerId = `accordion-header-${reactId}`;
  const panelId = `accordion-panel-${reactId}`;

  const resolvedClassName =
    typeof className === "function" ? className({ isOpen }) : className;

  return (
    <AccordionItemContext.Provider
      value={{ isOpen, headerId, panelId, onToggle: () => toggle(value) }}
    >
      <div className={resolvedClassName}>{children}</div>
    </AccordionItemContext.Provider>
  );
}

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

type AccordionTriggerProps = {
  children: ReactNode;
  className?: string;
  /** Wrap the trigger button in a heading of this level for a11y semantics. */
  headingLevel?: HeadingLevel;
  /** Extra classes for the heading wrapper (only applied with headingLevel). */
  headingClassName?: string;
};

export function AccordionTrigger({
  children,
  className = "",
  headingLevel,
  headingClassName = "",
}: AccordionTriggerProps) {
  const { isOpen, headerId, panelId, onToggle } = useAccordionItemContext();

  const button = (
    <button
      id={headerId}
      type="button"
      onClick={onToggle}
      aria-expanded={isOpen}
      aria-controls={panelId}
      className={className}
    >
      {children}
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
  );

  if (headingLevel) {
    const Heading = `h${headingLevel}` as const;
    return <Heading className={`m-0 ${headingClassName}`.trim()}>{button}</Heading>;
  }

  return button;
}

type AccordionPanelProps = {
  children: ReactNode;
  className?: string;
};

export function AccordionPanel({ children, className }: AccordionPanelProps) {
  const { isOpen, headerId, panelId } = useAccordionItemContext();

  return (
    <div
      id={panelId}
      role="region"
      aria-labelledby={headerId}
      className="grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none"
      style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
    >
      <div className="min-h-0 overflow-hidden" inert={!isOpen}>
        <div className={className}>{children}</div>
      </div>
    </div>
  );
}
