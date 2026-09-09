"use client";

import { motion } from "motion/react";
import { config } from "@/lib/config";
import { SectionTitle } from "./ui/SectionTitle";
import { Reveal } from "./ui/Reveal";

export function About() {
  const paragraphs = config.about.body.split(/\n\s*\n/).filter(Boolean);

  return (
    <section id="about" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-24">
      <SectionTitle eyebrow="01 — About" title="A little about me" />

      <div className="grid gap-12 md:grid-cols-5">
        <Reveal from="left" className="space-y-4 md:col-span-3">
          {paragraphs.map((p, i) => (
            <p key={i} className="leading-relaxed text-muted">
              {p}
            </p>
          ))}
        </Reveal>

        <Reveal from="right" delay={0.15} className="md:col-span-2">
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground/80">
            Tech I work with
          </h3>
          <div className="flex flex-wrap gap-2.5">
            {config.about.stack.map((tech, i) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04, duration: 0.3 }}
                whileHover={{ y: -3 }}
                className="glass cursor-default rounded-lg px-3 py-1.5 text-sm text-foreground/90 transition-colors hover:border-accent-3/50 hover:text-accent-3"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
