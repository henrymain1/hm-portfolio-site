import { Reveal } from "./Reveal";

interface SectionTitleProps {
  /** Small label shown above the title, e.g. "01" or "Work". */
  eyebrow: string;
  title: string;
}

export function SectionTitle({ eyebrow, title }: SectionTitleProps) {
  return (
    <Reveal className="mb-12">
      <p className="mb-2 font-mono text-sm text-accent-3">{eyebrow}</p>
      <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
      <div className="mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-accent-1 to-accent-3" />
    </Reveal>
  );
}
