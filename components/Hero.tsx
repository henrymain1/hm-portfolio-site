"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { ArrowDown, Mail, Globe, FileText } from "lucide-react";
import { config } from "@/lib/config";
import { XIcon, GithubIcon, LinkedinIcon } from "./ui/icons";

/** Cycles through config.roles, typing then deleting each one. */
function useTypewriter(words: readonly string[]) {
  const [text, setText] = useState("");
  const [i, setI] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (words.length === 0) return;
    const current = words[i % words.length];
    const done = !deleting && text === current;
    const cleared = deleting && text === "";

    const timeout = setTimeout(
      () => {
        if (done) {
          setDeleting(true);
        } else if (cleared) {
          setDeleting(false);
          setI((n) => n + 1);
        } else {
          setText((t) =>
            deleting ? current.slice(0, t.length - 1) : current.slice(0, t.length + 1)
          );
        }
      },
      done ? 1600 : deleting ? 45 : 80
    );

    return () => clearTimeout(timeout);
  }, [text, deleting, i, words]);

  return text;
}

const socialIcons = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
  twitter: XIcon,
  website: Globe,
} as const;

export function Hero() {
  const role = useTypewriter(config.roles);

  const socials = Object.entries(config.socials).filter(
    ([, url]) => url && url.length > 0
  ) as [keyof typeof socialIcons, string][];

  return (
    <section
      id="top"
      className="relative flex min-h-screen flex-col items-center justify-center px-6 pt-24 text-center"
    >
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-5 rounded-full border px-4 py-1.5 text-sm text-muted glass"
      >
        👋 Hi, I&apos;m
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="max-w-4xl text-5xl font-extrabold tracking-tight sm:text-7xl"
      >
        <span className="gradient-text animate-gradient">{config.name}</span>
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.25 }}
        className="mt-4 h-9 text-xl font-medium text-foreground/90 sm:text-2xl"
      >
        <span className="text-muted">a </span>
        <span>{role}</span>
        <span className="animate-blink text-accent-3">|</span>
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.4 }}
        className="mt-6 max-w-2xl text-balance text-base leading-relaxed text-muted sm:text-lg"
      >
        {config.tagline}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.55 }}
        className="mt-9 flex flex-wrap items-center justify-center gap-4"
      >
        <a
          href="#projects"
          className="rounded-full bg-gradient-to-r from-accent-1 to-accent-3 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-accent-1/25 transition-transform hover:scale-105"
        >
          View my work
        </a>
        {config.resumeUrl ? (
          <a
            href={config.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full border px-6 py-3 text-sm font-semibold glass transition-colors hover:border-accent-3/50"
          >
            <FileText size={16} /> Resume
          </a>
        ) : (
          <a
            href={`mailto:${config.email}`}
            className="flex items-center gap-2 rounded-full border px-6 py-3 text-sm font-semibold glass transition-colors hover:border-accent-3/50"
          >
            <Mail size={16} /> Contact me
          </a>
        )}
      </motion.div>

      {/* socials */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.7 }}
        className="mt-10 flex items-center gap-5"
      >
        {socials.map(([key, url]) => {
          const Icon = socialIcons[key];
          if (!Icon) return null;
          return (
            <a
              key={key}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={key}
              className="text-muted transition-all hover:-translate-y-1 hover:text-accent-3"
            >
              <Icon size={22} />
            </a>
          );
        })}
      </motion.div>

      {/* scroll cue */}
      <motion.a
        href="#about"
        aria-label="Scroll down"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{
          opacity: { delay: 1, duration: 1 },
          y: { repeat: Infinity, duration: 1.8, ease: "easeInOut" },
        }}
        className="absolute bottom-8 text-muted hover:text-foreground"
      >
        <ArrowDown size={22} />
      </motion.a>
    </section>
  );
}
