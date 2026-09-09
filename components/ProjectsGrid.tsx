"use client";

import { useState } from "react";
import type { Repo } from "@/lib/github";
import { config } from "@/lib/config";
import { ProjectCard } from "./ProjectCard";
import { ProjectModal } from "./ProjectModal";

export function ProjectsGrid({ repos }: { repos: Repo[] }) {
  const [active, setActive] = useState<number | null>(null);
  const projects = config.github.projects;

  return (
    <>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {repos.map((repo, i) => {
          const extra = projects[repo.name];
          const hasGallery = (extra?.screenshots?.length ?? 0) > 0;
          return (
            <ProjectCard
              key={repo.id}
              repo={repo}
              extra={extra}
              index={i}
              onOpen={hasGallery ? () => setActive(i) : undefined}
            />
          );
        })}
      </div>

      {active !== null && (
        <ProjectModal
          repo={repos[active]}
          extra={config.github.projects[repos[active].name]}
          onClose={() => setActive(null)}
        />
      )}
    </>
  );
}
