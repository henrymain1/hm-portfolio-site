"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { Images } from "lucide-react";
import { config } from "@/lib/config";
import type { Repo } from "@/lib/github";
import { ProjectModal } from "./ProjectModal";

const ease = [0.22, 1, 0.36, 1] as const;

export function Flagship() {
  const f = config.flagship;
  const [open, setOpen] = useState(false);
  if (!f) return null;

  // Reuse the slideshow lightbox by handing it a repo-shaped object.
  const repo: Repo = {
    id: -1,
    name: f.name,
    description: f.tagline,
    html_url: "", // private repo — no public code link
    homepage: f.url,
    language: null,
    stargazers_count: 0,
    forks_count: 0,
    topics: [],
    fork: false,
    archived: false,
    updated_at: "",
  };

  return (
    <div className="mb-16 border border-line bg-bg-elev">
      <div className="grid gap-0 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
        {/* text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease }}
          className="flex flex-col justify-start border-b border-line p-7 sm:p-9 lg:border-b-0 lg:border-r"
        >
          {f.year && (
            <div className="mb-4 mono text-xs text-line-bright">{f.year}</div>
          )}

          <h3 className="flex items-center gap-2.5 text-4xl font-extrabold tracking-tight text-fg sm:text-5xl">
            <span className="text-green">▶</span>
            {f.name}
          </h3>
          <p className="mt-3 text-lg text-muted">{f.tagline}</p>

          <div className="mt-5 space-y-3 text-sm leading-relaxed text-muted">
            {f.description.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          {/* languages */}
          {f.languages && f.languages.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-x-2 gap-y-1.5">
              {f.languages.map((l) => (
                <span key={l} className="mono text-xs text-fg">
                  {l}
                  <span className="ml-2 text-line-bright">/</span>
                </span>
              ))}
            </div>
          )}

          {/* stack */}
          <div className="mt-4 flex flex-wrap gap-1.5">
            {f.stack.map((t) => (
              <span
                key={t}
                className="mono border border-line px-1.5 py-0.5 text-xs text-muted"
              >
                {t}
              </span>
            ))}
          </div>

          {/* action */}
          <div className="mt-7 flex flex-wrap items-center gap-4">
            <a
              href={f.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green px-6 py-3 text-sm font-semibold text-bg transition-colors hover:bg-[#b6f04d]"
            >
              Visit {f.name.toLowerCase()}.app
            </a>
            {f.note && <span className="mono text-xs text-muted">{f.note}</span>}
          </div>
        </motion.div>

        {/* screenshot */}
        <motion.button
          type="button"
          onClick={() => setOpen(true)}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.1, ease }}
          className="group relative block cursor-pointer bg-[#0f1119] p-5 text-left sm:p-7"
          aria-label={`Open ${f.name} screenshots`}
        >
          {/* browser chrome */}
          <div className="overflow-hidden border border-line-bright">
            <div className="flex items-center gap-2 border-b border-line bg-bg px-3 py-2">
              <span className="h-2 w-2 rounded-full bg-green" />
              <span className="mono text-xs text-muted">{f.url.replace("https://", "")}</span>
            </div>
            <div className="relative aspect-[16/10] overflow-hidden bg-white">
              <Image
                src={f.screenshots[0]}
                alt={`${f.name} — read-along lesson`}
                fill
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                priority
              />
            </div>
          </div>
          {f.screenshots.length > 1 && (
            <span className="mono absolute bottom-8 right-8 flex items-center gap-1 border border-line bg-bg/85 px-2 py-1 text-xs text-fg backdrop-blur">
              <Images size={13} /> {f.screenshots.length}
            </span>
          )}
        </motion.button>
      </div>

      {open && (
        <ProjectModal
          repo={repo}
          extra={{ screenshots: f.screenshots, description: f.tagline, liveUrl: f.url }}
          onClose={() => setOpen(false)}
        />
      )}
    </div>
  );
}
