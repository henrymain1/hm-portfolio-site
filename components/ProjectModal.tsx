"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { X, ChevronLeft, ChevronRight, Star, GitFork, ExternalLink } from "lucide-react";
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

  // Keyboard navigation + lock body scroll while open.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [go, onClose]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/80 p-4 backdrop-blur-sm sm:p-8"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 20 }}
          transition={{ type: "spring", damping: 26, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
          className="glass relative w-full max-w-4xl overflow-hidden rounded-2xl border"
        >
          {/* close */}
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute right-3 top-3 z-10 rounded-full bg-black/40 p-2 text-white/80 backdrop-blur transition-colors hover:bg-black/60 hover:text-white"
          >
            <X size={20} />
          </button>

          {/* slideshow */}
          {shots.length > 0 && (
            <div className="relative aspect-video w-full overflow-hidden bg-black/40">
              <AnimatePresence initial={false} custom={direction} mode="popLayout">
                <motion.div
                  key={index}
                  custom={direction}
                  initial={{ opacity: 0, x: direction > 0 ? 60 : -60 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: direction > 0 ? -60 : 60 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
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
                    className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-2 text-white/80 backdrop-blur transition-colors hover:bg-black/60 hover:text-white"
                  >
                    <ChevronLeft size={22} />
                  </button>
                  <button
                    onClick={() => go(1)}
                    aria-label="Next screenshot"
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-2 text-white/80 backdrop-blur transition-colors hover:bg-black/60 hover:text-white"
                  >
                    <ChevronRight size={22} />
                  </button>

                  {/* dots */}
                  <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2">
                    {shots.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          setDirection(i > index ? 1 : -1);
                          setIndex(i);
                        }}
                        aria-label={`Go to screenshot ${i + 1}`}
                        className={`h-2 rounded-full transition-all ${
                          i === index
                            ? "w-6 bg-accent-3"
                            : "w-2 bg-white/40 hover:bg-white/70"
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          )}

          {/* details */}
          <div className="p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h3 className="text-2xl font-bold tracking-tight">{repo.name}</h3>
              <div className="flex items-center gap-4 text-sm text-muted">
                {repo.language && <span>{repo.language}</span>}
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
                    className="rounded-md bg-white/5 px-2 py-0.5 font-mono text-xs text-accent-3/90"
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
                className="flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-medium glass transition-colors hover:border-accent-3/50"
              >
                <GithubIcon size={16} /> View code
              </a>
              {liveUrl && (
                <a
                  href={liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-full bg-gradient-to-r from-accent-1 to-accent-3 px-5 py-2.5 text-sm font-semibold text-white transition-transform hover:scale-105"
                >
                  <ExternalLink size={16} /> Live demo
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
