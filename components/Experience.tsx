"use client";

import { motion } from "motion/react";
import { config } from "@/lib/config";
import { SectionTitle } from "./ui/SectionTitle";

export function Experience() {
  if (config.experience.length === 0) return null;

  return (
    <section
      id="experience"
      className="mx-auto max-w-6xl scroll-mt-24 px-6 py-24"
    >
      <SectionTitle eyebrow="03 — Journey" title="Experience & education" />

      <div className="relative ml-3 border-l border-white/10 pl-8">
        {config.experience.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="relative mb-10 last:mb-0"
          >
            {/* node */}
            <span className="absolute -left-[41px] top-1.5 flex h-4 w-4 items-center justify-center">
              <span className="absolute h-4 w-4 animate-ping rounded-full bg-accent-3/40" />
              <span className="h-3 w-3 rounded-full bg-gradient-to-r from-accent-1 to-accent-3" />
            </span>

            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="text-lg font-semibold">{item.role}</h3>
              <span className="font-mono text-sm text-accent-3">
                {item.period}
              </span>
            </div>
            <p className="text-sm font-medium text-foreground/80">
              {item.company}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              {item.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
