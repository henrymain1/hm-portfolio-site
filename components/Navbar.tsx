"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";
import { config } from "@/lib/config";

const links = [
  { href: "#about", label: "About", n: "01" },
  { href: "#projects", label: "Projects", n: "02" },
  { href: "#experience", label: "Experience", n: "03" },
  { href: "#contact", label: "Contact", n: "04" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = links.filter(
    (l) => l.href !== "#experience" || config.experience.length > 0
  );

  const initials = config.name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("");

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "border-b border-line bg-bg/85 py-3 backdrop-blur"
          : "border-b border-transparent py-5"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6">
        <a href="#top" className="mono text-sm font-bold tracking-widest text-fg">
          {initials || "HM"}
          <span className="text-green">_</span>
        </a>

        {/* desktop links */}
        <ul className="hidden items-center gap-7 md:flex">
          {navLinks.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="mono group flex items-baseline gap-1.5 text-sm text-muted transition-colors hover:text-fg"
              >
                <span className="text-xs text-line-bright transition-colors group-hover:text-green">
                  {l.n}
                </span>
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* mobile toggle */}
        <button
          className="text-fg md:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-line bg-bg/95 backdrop-blur md:hidden"
          >
            {navLinks.map((l) => (
              <li key={l.href} className="border-b border-line last:border-0">
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="mono flex items-center gap-2 px-6 py-4 text-sm text-muted hover:text-green"
                >
                  <span className="text-xs text-line-bright">{l.n}</span>
                  {l.label}
                </a>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
