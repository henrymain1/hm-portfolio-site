"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { X, ChevronLeft, ChevronRight, Star, GitFork } from "lucide-react";
import type { Repo } from "@/lib/github";
import type { ProjectExtra } from "@/lib/config";
import { GithubIcon } from "./ui/icons";

interface ProjectModalProps {
  repo: Repo;
  extra?: ProjectExtra;
  onClose: () => void;
}

/** Full-screen lightbox with a screenshot slideshow for a single project. */
export function ProjectModal({ repo, extra, onClose }: ProjectModalProps) {
  const shots = extra?.screenshots ?? [];
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const description = extra?.description || repo.description;
  const liveUrl = extra?.liveUrl || repo.homepage;

  const go = useCallback(
    (dir: number) => {
      if (shots.length === 0) return;
      setDirection(dir);
      setIndex((i) => (i + dir + shots.length) % shots.length);
    },
    [shots.length]
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [go, onClose]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-bg/90 p-4 backdrop-blur-sm sm:p-8"
      >
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-4xl border border-line-bright bg-bg-elev"
        >
          {/* title bar — terminal window chrome */}
          <div className="flex items-center justify-between border-b border-line px-4 py-2.5">
            <span className="mono text-xs text-muted">
              <span className="text-green-dim">~/projects/</span>
              {repo.name}
            </span>
            <button
              onClick={onClose}
              aria-label="Close"
              className="text-muted transition-colors hover:text-green"
            >
              <X size={18} />
            </button>
          </div>

          {/* slideshow */}
          {shots.length > 0 && (
            <div className="relative aspect-video w-full overflow-hidden border-b border-line bg-black/50">
              <AnimatePresence initial={false} custom={direction} mode="popLayout">
                <motion.div
                  key={index}
                  custom={direction}
                  initial={{ opacity: 0, x: direction > 0 ? 50 : -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: direction > 0 ? -50 : 50 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="absolute inset-0"
                >
                  <Image
                    src={shots[index]}
                    alt={`${repo.name} screenshot ${index + 1}`}
                    fill
                    sizes="(max-width: 896px) 100vw, 896px"
                    className="object-contain"
                    priority
                  />
                </motion.div>
              </AnimatePresence>

              {shots.length > 1 && (
                <>
                  <button
                    onClick={() => go(-1)}
                    aria-label="Previous screenshot"
                    className="absolute left-3 top-1/2 -translate-y-1/2 border border-line bg-bg/70 p-2 text-fg transition-colors hover:border-green hover:text-green"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={() => go(1)}
                    aria-label="Next screenshot"
                    className="absolute right-3 top-1/2 -translate-y-1/2 border border-line bg-bg/70 p-2 text-fg transition-colors hover:border-green hover:text-green"
                  >
                    <ChevronRight size={20} />
                  </button>

                  <div className="mono absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-2 border border-line bg-bg/70 px-2 py-1 text-xs text-fg">
                    {String(index + 1).padStart(2, "0")}
                    <span className="text-line-bright">/</span>
                    {String(shots.length).padStart(2, "0")}
                  </div>
                </>
              )}
            </div>
          )}

          {/* details */}
          <div className="p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h3 className="text-2xl font-semibold tracking-tight text-fg">
                {repo.name}
              </h3>
              <div className="mono flex items-center gap-4 text-xs text-muted">
                {repo.language && <span>{repo.language}</span>}
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
              </div>
            </div>

            {description && (
              <p className="mt-3 leading-relaxed text-muted">{description}</p>
            )}

            {repo.topics?.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-1.5">
                {repo.topics.map((t) => (
                  <span
                    key={t}
                    className="mono border border-line px-1.5 py-0.5 text-xs text-muted"
                  >
                    {t}
                  </span>
                ))}
              </div>
            )}

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="mono inline-flex items-center gap-2 border border-line-bright px-5 py-2.5 text-sm text-fg transition-colors hover:border-green hover:text-green"
              >
                <GithubIcon size={15} /> View code
              </a>
              {liveUrl && (
                <a
                  href={liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green px-5 py-2.5 text-sm font-semibold text-bg transition-colors hover:bg-[#b6f04d]"
                >
                  Live demo
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
