"use client";

import { motion } from "motion/react";
import { config } from "@/lib/config";
import { SectionTitle } from "./ui/SectionTitle";

export function Experience() {
  if (config.experience.length === 0) return null;

  return (
    <section id="experience" className="mx-auto max-w-5xl scroll-mt-24 px-6 py-28">
      <SectionTitle index="03" kicker="Career" title="Where I've worked." />

      <div className="relative ml-2 border-l border-line pl-8">
        {config.experience.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: 12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className="relative mb-11 last:mb-0"
          >
            {/* node */}
            <span className="absolute -left-[37px] top-2 h-2.5 w-2.5 bg-green" />

            <div className="mono mb-1 text-xs text-muted">{item.period}</div>
            <div className="flex flex-wrap items-baseline gap-x-2">
              <h3 className="text-lg font-semibold text-fg">{item.role}</h3>
              <span className="text-muted">·</span>
              <span className="text-green">{item.company}</span>
            </div>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
              {item.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
