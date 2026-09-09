import { config } from "@/lib/config";

export function Footer() {
  return (
    <footer className="border-t px-6 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 text-sm text-muted sm:flex-row">
        <p>
          © {new Date().getFullYear()} {config.name}. All rights reserved.
        </p>
        <p>
          Built with{" "}
          <span className="text-accent-3">Next.js</span> &{" "}
          <span className="text-accent-1">Motion</span>.
        </p>
      </div>
    </footer>
  );
}
