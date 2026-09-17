import { config } from "@/lib/config";

export function Footer() {
  return (
    <footer className="border-t border-line px-6 py-8">
      <div className="mono mx-auto flex max-w-6xl flex-col items-start justify-between gap-2 text-xs text-muted sm:flex-row sm:items-center">
        <p>
          © {new Date().getFullYear()} {config.name}
        </p>
        <p className="text-line-bright">
          Built with Next.js · deployed on Vercel
        </p>
      </div>
    </footer>
  );
}
