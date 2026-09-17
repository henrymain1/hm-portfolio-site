"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { config } from "@/lib/config";
import { GenerativeBackground } from "./GenerativeBackground";
import { GithubIcon, LinkedinIcon, XIcon } from "./ui/icons";
import { Globe } from "lucide-react";

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
        if (done) setDeleting(true);
        else if (cleared) {
          setDeleting(false);
          setI((n) => n + 1);
        } else {
          setText((t) =>
            deleting ? current.slice(0, t.length - 1) : current.slice(0, t.length + 1)
          );
        }
      },
      done ? 1800 : deleting ? 40 : 70
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

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const role = useTypewriter(config.roles);
  const socials = Object.entries(config.socials).filter(
    ([, url]) => url && url.length > 0
  ) as [keyof typeof socialIcons, string][];

  const [first, ...rest] = config.name.split(" ");
  const last = rest.join(" ");

  return (
    <section
      id="top"
      className="relative flex min-h-screen items-center overflow-hidden"
    >
      {/* generative field */}
      <GenerativeBackground />

      {/* legibility scrim — solid behind the text (left), open on the right so
          the generative field reads as the feature it is */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-bg from-25% via-bg/70 to-bg/10" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-bg to-transparent" />

      <div className="relative z-[2] mx-auto w-full max-w-6xl px-6 pt-24">
        {/* system meta line */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="label mb-6 flex flex-wrap items-center gap-x-3 gap-y-1"
        >
          <span className="text-green">{config.roles[0]}</span>
          <span className="text-line-bright">/</span>
          <span>Hong Kong</span>
          <span className="text-line-bright">/</span>
          <span className="text-amber">Top Talent Pass</span>
        </motion.div>

        {/* name */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease }}
          className="text-6xl font-extrabold uppercase leading-[0.92] tracking-tight text-fg sm:text-8xl"
        >
          {first}
          <br />
          <span className="text-green">{last}</span>
        </motion.h1>

        {/* role prompt with terminal caret */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease }}
          className="mono mt-6 text-lg text-muted sm:text-xl"
        >
          <span className="text-green-dim">~/</span>
          <span className="text-fg">{role}</span>
          <span className="caret ml-0.5 h-5 translate-y-0.5" />
        </motion.div>

        {/* tagline */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.28, ease }}
          className="mt-6 max-w-xl leading-relaxed text-muted"
        >
          {config.tagline}
        </motion.p>

        {/* actions */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease }}
          className="mt-9 flex flex-wrap items-center gap-3"
        >
          <a
            href="#projects"
            className="bg-green px-6 py-3 text-sm font-semibold text-bg transition-colors hover:bg-[#b6f04d] focus-visible:outline-offset-4"
          >
            View work
          </a>
          {config.resumeUrl && (
            <a
              href={config.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-line-bright px-6 py-3 text-sm font-medium text-fg transition-colors hover:border-green hover:text-green"
            >
              Résumé
            </a>
          )}
          <a
            href={`mailto:${config.email}`}
            className="mono px-2 py-3 text-sm text-muted underline-offset-4 transition-colors hover:text-fg hover:underline"
          >
            {config.email}
          </a>
        </motion.div>

        {/* socials */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.55 }}
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
                className="text-muted transition-colors hover:text-green"
              >
                <Icon size={20} />
              </a>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
