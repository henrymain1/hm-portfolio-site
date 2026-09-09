"use client";

import { useRef } from "react";
import { motion, useMotionTemplate, useMotionValue } from "motion/react";
import { Star, GitFork, ArrowUpRight, ExternalLink } from "lucide-react";
import type { Repo } from "@/lib/github";
import { languageColors } from "@/lib/github";

export function ProjectCard({ repo, index }: { repo: Repo; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  // Track cursor position to power a spotlight glow that follows the mouse.
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const spotlight = useMotionTemplate`radial-gradient(220px circle at ${mx}px ${my}px, rgba(139,92,246,0.15), transparent 70%)`;

  function onMouseMove(e: React.MouseEvent) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set(e.clientX - rect.left);
    my.set(e.clientY - rect.top);
  }

  const langColor = repo.language
    ? languageColors[repo.language] ?? "#8b5cf6"
    : "#8b5cf6";

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMouseMove}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
      whileHover={{ y: -6 }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border p-6 glass"
    >
      {/* mouse spotlight */}
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: spotlight }}
      />

      <div className="relative flex flex-1 flex-col">
        <div className="mb-3 flex items-start justify-between gap-3">
          <h3 className="text-lg font-semibold tracking-tight transition-colors group-hover:text-accent-3">
            {repo.name}
          </h3>
          <a
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open ${repo.name} on GitHub`}
            className="shrink-0 text-muted transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground"
          >
            <ArrowUpRight size={20} />
          </a>
        </div>

        <p className="mb-5 flex-1 text-sm leading-relaxed text-muted">
          {repo.description || "No description provided."}
        </p>

        {/* topics */}
        {repo.topics?.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-1.5">
            {repo.topics.slice(0, 4).map((t) => (
              <span
                key={t}
                className="rounded-md bg-white/5 px-2 py-0.5 font-mono text-xs text-accent-3/90"
              >
                {t}
              </span>
            ))}
          </div>
        )}

        {/* footer meta */}
        <div className="flex items-center gap-4 text-sm text-muted">
          {repo.language && (
            <span className="flex items-center gap-1.5">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: langColor }}
              />
              {repo.language}
            </span>
          )}
          {repo.stargazers_count > 0 && (
            <span className="flex items-center gap-1">
              <Star size={14} /> {repo.stargazers_count}
            </span>
          )}
          {repo.forks_count > 0 && (
            <span className="flex items-center gap-1">
              <GitFork size={14} /> {repo.forks_count}
            </span>
          )}
          {repo.homepage && (
            <a
              href={repo.homepage}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-auto flex items-center gap-1 text-accent-3 hover:underline"
            >
              <ExternalLink size={14} /> Live
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
