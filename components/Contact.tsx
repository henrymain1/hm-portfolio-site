"use client";

import { config } from "@/lib/config";
import { SectionTitle } from "./ui/SectionTitle";
import { Reveal } from "./ui/Reveal";
import { GithubIcon, LinkedinIcon, XIcon } from "./ui/icons";
import { Globe } from "lucide-react";

const socialIcons = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
  twitter: XIcon,
  website: Globe,
} as const;

export function Contact() {
  const socials = Object.entries(config.socials).filter(
    ([, url]) => url && url.length > 0
  ) as [keyof typeof socialIcons, string][];

  return (
    <section id="contact" className="mx-auto max-w-5xl scroll-mt-24 px-6 py-28">
      <SectionTitle index="04" kicker="Contact" title="Let's talk." />

      <Reveal>
        <p className="max-w-xl leading-relaxed text-muted">
          Open to AI/LLM engineering roles and interesting agentic-AI problems.
          Email is the fastest way to reach me — I read everything.
        </p>

        {/* email as the primary action */}
        <a
          href={`mailto:${config.email}`}
          className="mono group mt-8 inline-flex items-center gap-3 border-b border-line-bright pb-1 text-xl text-fg transition-colors hover:border-green hover:text-green sm:text-3xl"
        >
          <span className="text-green-dim group-hover:text-green">$</span>
          {config.email}
        </a>

        {/* socials */}
        <div className="mt-12 flex flex-wrap gap-x-8 gap-y-3">
          {socials.map(([key, url]) => {
            const Icon = socialIcons[key];
            if (!Icon) return null;
            return (
              <a
                key={key}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="mono group flex items-center gap-2 text-sm text-muted transition-colors hover:text-green"
              >
                <Icon size={16} />
                <span className="capitalize">{key}</span>
              </a>
            );
          })}
        </div>
      </Reveal>
    </section>
  );
}
