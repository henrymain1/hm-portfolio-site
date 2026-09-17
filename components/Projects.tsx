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
    <section id="projects" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-28">
      <SectionTitle index="02" kicker="Work" title="Things I've built." />

      {repos.length > 0 ? (
        <>
          <ProjectsGrid repos={repos} />

          <Reveal className="mt-10">
            <a
              href={config.socials.github || `https://github.com/${config.github.username}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mono inline-flex items-center gap-2 border border-line-bright px-5 py-3 text-sm text-fg transition-colors hover:border-green hover:text-green"
            >
              All repositories on GitHub
            </a>
          </Reveal>
        </>
      ) : (
        <Reveal>
          <div className="border border-dashed border-line p-12 text-center">
            <p className="mono text-sm text-muted">
              {configured
                ? "// no public repositories found (or GitHub is rate-limiting). check back soon."
                : "// set your GitHub username in lib/config.ts to load projects."}
            </p>
          </div>
        </Reveal>
      )}
    </section>
  );
}
