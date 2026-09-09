// ============================================================================
//  🛠️  EDIT ME — This is the single source of truth for your portfolio.
//  Change the values below and the whole site updates. No other file needed.
// ============================================================================

export const config = {
  // --- Identity ---------------------------------------------------------------
  name: "Your Name",
  // Short role shown under your name in the hero. Multiple = rotating typewriter.
  roles: [
    "Full-Stack Developer",
    "Open-Source Enthusiast",
    "Problem Solver",
  ],
  // One or two sentences. Appears in the hero and as the meta description.
  tagline:
    "I build fast, delightful web experiences and love turning hard problems into clean, simple products.",

  // --- About ------------------------------------------------------------------
  about: {
    // A short paragraph or two about you. Plain text; line breaks become paragraphs.
    body: `I'm a developer who cares about craft — from the architecture down to the pixels.
I enjoy shipping products end-to-end, contributing to open source, and learning new things constantly.

When I'm not coding, you'll find me exploring new tech, reading, or tinkering with side projects.`,
    // Tech you want to show off. Grouped chips.
    stack: [
      "TypeScript",
      "React",
      "Next.js",
      "Node.js",
      "Python",
      "PostgreSQL",
      "Tailwind CSS",
      "Docker",
      "AWS",
      "Git",
    ],
  },

  // --- GitHub -----------------------------------------------------------------
  github: {
    // 👉 REQUIRED for live projects: your GitHub username.
    username: "henrymain1",
    // Repos listed here are pinned to the top, in this order (use the exact repo name).
    featured: [] as string[],
    // Repos you never want shown (exact repo names).
    hidden: ["henrymain1"] as string[], // hides your profile README repo
    // Hide forks / archived repos from the grid.
    hideForks: true,
    hideArchived: false,
    // Max number of repos to display.
    maxRepos: 12,
  },

  // --- Experience / Timeline --------------------------------------------------
  // Set to [] to hide the section entirely.
  experience: [
    {
      role: "Senior Software Engineer",
      company: "Acme Corp",
      period: "2023 — Present",
      description:
        "Leading development of the core platform. Shipped features used by thousands of users daily.",
    },
    {
      role: "Software Engineer",
      company: "Startup Inc.",
      period: "2021 — 2023",
      description:
        "Built and maintained full-stack features across the product. Improved page load times by 40%.",
    },
    {
      role: "B.S. Computer Science",
      company: "University Name",
      period: "2017 — 2021",
      description: "Graduated with honors. Focus on distributed systems and web technologies.",
    },
  ],

  // --- Resume -----------------------------------------------------------------
  // Drop a PDF in the /public folder and point to it here, e.g. "/resume.pdf".
  // Leave empty ("") to hide the resume download button.
  resumeUrl: "",

  // --- Contact & Socials ------------------------------------------------------
  email: "henrymain9@gmail.com",
  socials: {
    // Leave any value as "" to hide that icon.
    github: "https://github.com/henrymain1",
    linkedin: "https://linkedin.com/in/your-handle",
    twitter: "", // e.g. "https://x.com/your-handle"
    website: "",
  },

  // --- Site meta --------------------------------------------------------------
  // Used for the browser tab title and SEO. Update after you set a domain.
  siteUrl: "https://your-domain.com",
};

export type Config = typeof config;
