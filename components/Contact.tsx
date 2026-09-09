"use client";

import { motion } from "motion/react";
import { Mail, Globe, FileText } from "lucide-react";
import { config } from "@/lib/config";
import { Reveal } from "./ui/Reveal";
import { XIcon, GithubIcon, LinkedinIcon } from "./ui/icons";

const socialIcons = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
  twitter: XIcon,
  website: Globe,
} as const;

export function Contact() {
  const socials = Object.entries(config.socials).filter(
    ([, url]) => url && url.length > 0
  ) as [keyof typeof socialIcons, string][];

  return (
    <section id="contact" className="scroll-mt-24 px-6 py-28">
      <Reveal className="mx-auto max-w-3xl text-center">
        <p className="mb-2 font-mono text-sm text-accent-3">04 — Contact</p>
        <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Let&apos;s <span className="gradient-text">work together</span>
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-muted">
          I&apos;m always open to discussing new projects, opportunities, or
          just chatting about tech. My inbox is always open.
        </p>

        <motion.a
          href={`mailto:${config.email}`}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.98 }}
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-accent-1 to-accent-3 px-8 py-4 font-semibold text-white shadow-xl shadow-accent-1/25"
        >
          <Mail size={18} /> Say hello
        </motion.a>

        <div className="mt-10 flex items-center justify-center gap-6">
          {config.resumeUrl && (
            <a
              href={config.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-muted transition-colors hover:text-accent-3"
            >
              <FileText size={18} /> Resume
            </a>
          )}
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
                className="flex items-center gap-2 text-sm text-muted transition-all hover:-translate-y-0.5 hover:text-accent-3"
              >
                <Icon size={18} />
                <span className="capitalize">{key}</span>
              </a>
            );
          })}
        </div>
      </Reveal>
    </section>
  );
}
