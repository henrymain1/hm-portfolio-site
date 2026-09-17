"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Star, GitFork, ArrowUpRight, Images } from "lucide-react";
import type { Repo } from "@/lib/github";
import { languageColors } from "@/lib/github";
import type { ProjectExtra } from "@/lib/config";

interface ProjectCardProps {
  repo: Repo;
  extra?: ProjectExtra;
  index: number;
  /** Provided only when the project has a screenshot gallery to open. */
  onOpen?: () => void;
}

export function ProjectCard({ repo, extra, index, onOpen }: ProjectCardProps) {
  const shots = extra?.screenshots ?? [];
  const hasGallery = shots.length > 0;
  const description = extra?.description || repo.description;
  const liveUrl = extra?.liveUrl || repo.homepage;
  const langColor = repo.language
    ? languageColors[repo.language] ?? "#a3e635"
    : "#a3e635";

  return (
    <motion.div
      onClick={onOpen}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.08 }}
      className={`group relative flex flex-col border border-line bg-bg-elev transition-colors duration-200 hover:border-green/50 hover:bg-bg-elev-2 ${
        hasGallery ? "cursor-pointer" : ""
      }`}
    >
      {/* index tab */}
      <span className="mono absolute right-3 top-3 z-10 text-xs text-line-bright transition-colors group-hover:text-green-dim">
        {String(index + 1).padStart(2, "0")}
      </span>

      {/* cover screenshot (only when a gallery exists) */}
      {hasGallery && (
        <div className="relative aspect-video w-full overflow-hidden border-b border-line bg-black/40">
          <Image
            src={shots[0]}
            alt={`${repo.name} preview`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover opacity-90 transition-all duration-500 group-hover:scale-[1.03] group-hover:opacity-100"
          />
          {shots.length > 1 && (
            <span className="mono absolute bottom-2 right-2 flex items-center gap-1 border border-line bg-bg/85 px-1.5 py-0.5 text-xs text-fg backdrop-blur">
              <Images size={12} /> {shots.length}
            </span>
          )}
        </div>
      )}

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-3 flex items-start justify-between gap-3 pr-6">
          <h3 className="font-semibold tracking-tight text-fg transition-colors group-hover:text-green">
            {repo.name}
          </h3>
          <a
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            aria-label={`Open ${repo.name} on GitHub`}
            className="shrink-0 text-muted transition-colors hover:text-fg"
          >
            <ArrowUpRight size={18} />
          </a>
        </div>

        <p className="mb-5 flex-1 text-sm leading-relaxed text-muted">
          {description || "No description provided."}
        </p>

        {repo.topics?.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-1.5">
            {repo.topics.slice(0, 4).map((t) => (
              <span
                key={t}
                className="mono border border-line px-1.5 py-0.5 text-xs text-muted"
              >
                {t}
              </span>
            ))}
          </div>
        )}

        <div className="mono flex items-center gap-4 text-xs text-muted">
          {repo.language && (
            <span className="flex items-center gap-1.5">
              <span
                className="h-2 w-2"
                style={{ backgroundColor: langColor }}
              />
              {repo.language}
            </span>
          )}
          {repo.stargazers_count > 0 && (
            <span className="flex items-center gap-1">
              <Star size={13} /> {repo.stargazers_count}
            </span>
          )}
          {repo.forks_count > 0 && (
            <span className="flex items-center gap-1">
              <GitFork size={13} /> {repo.forks_count}
            </span>
          )}
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="ml-auto text-green underline-offset-2 hover:underline"
            >
              live
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
