import { Reveal } from "./Reveal";

interface SectionTitleProps {
  /** Zero-padded index, e.g. "01". */
  index: string;
  /** Uppercase mono kicker, e.g. "ABOUT". */
  kicker: string;
  title: string;
}

export function SectionTitle({ index, kicker, title }: SectionTitleProps) {
  return (
    <Reveal className="mb-12">
      <div className="mb-4 flex items-center gap-3">
        <span className="mono text-sm text-green">[{index}]</span>
        <span className="label">{kicker}</span>
        <span className="h-px flex-1 bg-line" />
      </div>
      <h2 className="max-w-3xl text-3xl font-semibold tracking-tight text-fg sm:text-4xl">
        {title}
      </h2>
    </Reveal>
  );
}
