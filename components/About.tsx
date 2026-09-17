import { config } from "@/lib/config";
import { SectionTitle } from "./ui/SectionTitle";
import { Reveal } from "./ui/Reveal";

export function About() {
  const paragraphs = config.about.body.split(/\n\s*\n/).filter(Boolean);

  return (
    <section id="about" className="mx-auto max-w-5xl scroll-mt-24 px-6 py-28">
      <SectionTitle index="01" kicker="About" title="AI/LLM engineer, full-stack by habit." />

      <Reveal>
        <div className="max-w-2xl space-y-4">
          {paragraphs.map((p, i) => (
            <p key={i} className="leading-relaxed text-muted">
              {p}
            </p>
          ))}
        </div>
      </Reveal>

      {/* Skills — a technical spec sheet, grouped like the resume. */}
      <Reveal className="mt-16">
        <div className="mb-5 flex items-center gap-3">
          <span className="label">Stack</span>
          <span className="h-px flex-1 bg-line" />
        </div>

        <dl className="divide-y divide-line border-y border-line">
          {config.about.skills.map((group) => (
            <div
              key={group.category}
              className="grid gap-3 py-5 md:grid-cols-[220px_1fr] md:gap-8"
            >
              <dt className="mono text-sm text-fg">{group.category}</dt>
              <dd className="flex flex-wrap gap-x-2 gap-y-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="mono border border-line px-2 py-1 text-xs text-muted transition-colors hover:border-green/60 hover:text-green"
                  >
                    {item}
                  </span>
                ))}
              </dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </section>
  );
}
