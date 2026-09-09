import { config } from "./config";

export interface Repo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  topics: string[];
  fork: boolean;
  archived: boolean;
  updated_at: string;
}

/**
 * Fetches the user's public repositories from the GitHub API and applies the
 * filtering / pinning rules defined in lib/config.ts.
 *
 * Runs on the server. Cached and revalidated hourly so we stay well within
 * GitHub's unauthenticated rate limit while keeping the grid fresh.
 */
export async function getRepos(): Promise<Repo[]> {
  const { username, featured, hidden, hideForks, hideArchived, maxRepos } =
    config.github;

  if (!username || username === "your-github-username") {
    return [];
  }

  try {
    const res = await fetch(
      `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`,
      {
        headers: {
          Accept: "application/vnd.github+json",
          "X-GitHub-Api-Version": "2022-11-28",
        },
        next: { revalidate: 3600 }, // refresh at most once per hour
      }
    );

    if (!res.ok) {
      console.error(`GitHub API responded with ${res.status}`);
      return [];
    }

    let repos: Repo[] = await res.json();

    // Apply filters.
    const hiddenSet = new Set(hidden.map((n) => n.toLowerCase()));
    repos = repos.filter((r) => {
      if (hiddenSet.has(r.name.toLowerCase())) return false;
      if (hideForks && r.fork) return false;
      if (hideArchived && r.archived) return false;
      return true;
    });

    // Sort: featured first (in the order given), then by stars desc.
    const featuredOrder = new Map(
      featured.map((n, i) => [n.toLowerCase(), i])
    );
    repos.sort((a, b) => {
      const fa = featuredOrder.get(a.name.toLowerCase());
      const fb = featuredOrder.get(b.name.toLowerCase());
      if (fa !== undefined && fb !== undefined) return fa - fb;
      if (fa !== undefined) return -1;
      if (fb !== undefined) return 1;
      if (b.stargazers_count !== a.stargazers_count)
        return b.stargazers_count - a.stargazers_count;
      return (
        new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
      );
    });

    return repos.slice(0, maxRepos);
  } catch (err) {
    console.error("Failed to fetch GitHub repos:", err);
    return [];
  }
}

/** A stable, pleasant color per language for the little dot on each card. */
export const languageColors: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Python: "#3572A5",
  Go: "#00ADD8",
  Rust: "#dea584",
  Java: "#b07219",
  "C++": "#f34b7d",
  C: "#555555",
  "C#": "#178600",
  Ruby: "#701516",
  PHP: "#4F5D95",
  Swift: "#F05138",
  Kotlin: "#A97BFF",
  Dart: "#00B4AB",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Shell: "#89e051",
  Vue: "#41b883",
  Svelte: "#ff3e00",
};
