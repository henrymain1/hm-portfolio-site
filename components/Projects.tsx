import { GithubIcon } from "./ui/icons";
import { getRepos } from "@/lib/github";
import { config } from "@/lib/config";
import { SectionTitle } from "./ui/SectionTitle";
import { Reveal } from "./ui/Reveal";
import { ProjectsGrid } from "./ProjectsGrid";

// Server component: fetches repos at request time (cached hourly).
export async function Projects() {
  const repos = await getRepos();
  const configured =
    config.github.username && config.github.username !== "your-github-username";

  return (
    <section id="projects" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-24">
      <SectionTitle eyebrow="02 — Work" title="Featured projects" />

      {repos.length > 0 ? (
        <>
          <ProjectsGrid repos={repos} />

          <Reveal className="mt-12 flex justify-center">
            <a
              href={config.socials.github || `https://github.com/${config.github.username}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full border px-6 py-3 text-sm font-medium glass transition-colors hover:border-accent-3/50"
            >
              <GithubIcon size={18} /> See all on GitHub
            </a>
          </Reveal>
        </>
      ) : (
        <Reveal>
          <div className="rounded-2xl border border-dashed p-12 text-center glass">
            <GithubIcon className="mx-auto mb-4 text-muted" size={32} />
            <p className="text-muted">
              {configured
                ? "No public repositories found (or GitHub is temporarily rate-limiting). Check back soon."
                : "Set your GitHub username in lib/config.ts to load projects here automatically."}
            </p>
          </div>
        </Reveal>
      )}
    </section>
  );
}
