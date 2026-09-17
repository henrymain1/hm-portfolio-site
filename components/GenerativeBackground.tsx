"use client";

import { useEffect, useRef } from "react";

/**
 * A flow-field particle system rendered to <canvas> — thin phosphor-green
 * streaks drifting along a slowly-evolving vector field, with the occasional
 * amber particle. Custom generative art (not a stock image), themed loosely as
 * a "latent space" field for an AI/LLM engineer's portfolio.
 *
 * - Dependency-free (the field is layered trig, no noise library).
 * - Caps particle count and DPR for performance; pauses when tab is hidden.
 * - Honors prefers-reduced-motion by painting a single static frame.
 */
export function GenerativeBackground() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let width = 0;
    let height = 0;
    let dpr = 1;
    type P = { x: number; y: number; px: number; py: number; life: number; amber: boolean };
    let particles: P[] = [];
    let raf = 0;
    let t = 0;

    const BG = "#0b0d0a";

    function reset() {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

      // paint base
      ctx!.fillStyle = BG;
      ctx!.fillRect(0, 0, width, height);

      // scale particle count to area, capped
      const count = Math.min(1300, Math.round((width * height) / 1200));
      particles = Array.from({ length: count }, () => spawn());
    }

    function spawn(): P {
      const x = Math.random() * width;
      const y = Math.random() * height;
      return {
        x,
        y,
        px: x,
        py: y,
        life: Math.random() * 200,
        amber: Math.random() < 0.06, // rare second signal
      };
    }

    // Flow field angle at (x, y, time) — layered trig, no dependencies.
    function field(x: number, y: number): number {
      const s = 0.0016;
      return (
        (Math.sin(x * s + t) +
          Math.cos(y * s - t * 0.8) +
          Math.sin((x + y) * s * 0.6 + t * 0.5)) *
        1.4
      );
    }

    function step() {
      // fade previous frame slightly to leave trails (lower alpha = longer ribbons)
      ctx!.fillStyle = "rgba(11,13,10,0.032)";
      ctx!.fillRect(0, 0, width, height);

      for (const p of particles) {
        p.px = p.x;
        p.py = p.y;
        const a = field(p.x, p.y);
        p.x += Math.cos(a) * 0.9;
        p.y += Math.sin(a) * 0.9;
        p.life -= 1;

        if (
          p.life <= 0 ||
          p.x < 0 ||
          p.x > width ||
          p.y < 0 ||
          p.y > height
        ) {
          Object.assign(p, spawn());
          continue;
        }

        ctx!.beginPath();
        ctx!.moveTo(p.px, p.py);
        ctx!.lineTo(p.x, p.y);
        ctx!.strokeStyle = p.amber
          ? "rgba(251,191,36,0.6)"
          : "rgba(163,230,53,0.5)";
        ctx!.lineWidth = p.amber ? 1.2 : 0.85;
        ctx!.stroke();
      }

      t += 0.0016;
      raf = requestAnimationFrame(step);
    }

    function staticFrame() {
      // reduced-motion: one calm pass, no animation loop
      for (let i = 0; i < 240; i++) {
        const p = spawn();
        for (let j = 0; j < 60; j++) {
          const a = field(p.x, p.y);
          const nx = p.x + Math.cos(a) * 1.2;
          const ny = p.y + Math.sin(a) * 1.2;
          ctx!.beginPath();
          ctx!.moveTo(p.x, p.y);
          ctx!.lineTo(nx, ny);
          ctx!.strokeStyle = p.amber
            ? "rgba(251,191,36,0.35)"
            : "rgba(163,230,53,0.28)";
          ctx!.lineWidth = 0.7;
          ctx!.stroke();
          p.x = nx;
          p.y = ny;
          if (p.x < 0 || p.x > width || p.y < 0 || p.y > height) break;
        }
      }
    }

    function start() {
      cancelAnimationFrame(raf);
      reset();
      if (reduce) staticFrame();
      else raf = requestAnimationFrame(step);
    }

    function onVisibility() {
      if (document.hidden) cancelAnimationFrame(raf);
      else if (!reduce) raf = requestAnimationFrame(step);
    }

    let resizeTimer: ReturnType<typeof setTimeout>;
    function onResize() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(start, 200);
    }

    start();
    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="absolute inset-0 h-full w-full"
    />
  );
}
