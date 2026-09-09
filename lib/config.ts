// ============================================================================
//  🛠️  EDIT ME — This is the single source of truth for your portfolio.
//  Change the values below and the whole site updates. No other file needed.
// ============================================================================

/** Extra, hand-curated data for a specific GitHub repo (keyed by repo name). */
export interface ProjectExtra {
  /**
   * Screenshots for the slideshow. Put images in
   * public/projects/<repo>/ and list their paths here, e.g.
   *   ["/projects/daily-pages/1.png", "/projects/daily-pages/2.png"]
   * The first image is used as the card cover. Leave empty for no slideshow.
   */
  screenshots?: string[];
  /** Override the description shown on the card/modal (defaults to GitHub's). */
  description?: string;
  /** Override / add a live demo URL (defaults to the repo's homepage field). */
  liveUrl?: string;
}

export const config = {
  // --- Identity ---------------------------------------------------------------
  name: "Henry Main",
  // Short role shown under your name in the hero. Multiple = rotating typewriter.
  roles: [
    "AI / LLM Engineer",
    "Agentic AI Developer",
    "GenAI & RAG Builder",
    "Full-Stack Developer",
  ],
  // One or two sentences. Appears in the hero and as the meta description.
  tagline:
    "I build agentic AI systems — tool-calling assistants, RAG pipelines, and LLM-powered products — and ship them end to end.",

  // --- About ------------------------------------------------------------------
  about: {
    // A short paragraph or two about you. Plain text; line breaks become paragraphs.
    body: `I'm an AI/LLM engineer who builds production GenAI systems end to end — from agentic assistants that query real platform data through tool calling, to RAG pipelines, vector search, and structured LLM evaluations that pick the best model for the job.

My background spans full-stack development (Python, Django, React, C#/.NET) and the AI stack (Azure OpenAI, Vertex AI, MCP, n8n), so I'm comfortable owning a feature from prompt design all the way to deployment.

Based in Hong Kong (Top Talent Pass Scheme). When I'm not shipping, I'm benchmarking new models and tinkering with agentic workflows.`,
    // Tech you want to show off. Grouped chips.
    stack: [
      "Python",
      "JavaScript",
      "C#/.NET",
      "React.js",
      "Django REST",
      "Azure OpenAI",
      "Vertex AI (Gemini)",
      "RAG & pgvector",
      "Agentic AI / MCP",
      "n8n",
      "TensorFlow",
      "PyTorch",
      "PostgreSQL",
      "Azure Cosmos DB",
      "Google Cloud",
    ],
  },

  // --- GitHub -----------------------------------------------------------------
  github: {
    // 👉 REQUIRED for live projects: your GitHub username.
    username: "henrymain1",
    // Repos listed here are pinned to the top, in this order (use the exact repo name).
    featured: [] as string[],
    // Repos you never want shown (exact repo names).
    hidden: ["henrymain1", "hm-portfolio-site"] as string[], // profile README + this portfolio repo
    // Hide forks / archived repos from the grid.
    hideForks: true,
    hideArchived: false,
    // Max number of repos to display.
    maxRepos: 12,
    // Per-project screenshots + overrides, keyed by exact repo name.
    // See the ProjectExtra type above for the shape.
    projects: {
      "daily-pages": {
        // Add screenshots to public/projects/daily-pages/ then list them:
        screenshots: [
          // "/projects/daily-pages/1.png",
          // "/projects/daily-pages/2.png",
        ],
      },
    } as Record<string, ProjectExtra>,
  },

  // --- Experience / Timeline --------------------------------------------------
  // Set to [] to hide the section entirely.
  experience: [
    {
      role: "AI Developer (Part-time)",
      company: "Ebullience Inc.",
      period: "Jun 2026 — Present",
      description:
        "Building a customer-facing agentic AI assistant for a compensation-data platform in C#/.NET and Blazor WebAssembly — ~35 tools the agent calls to search data and configure benchmark studies, backed by Azure Cosmos DB vector search, Azure OpenAI embeddings, and Azure AI Speech for voice input.",
    },
    {
      role: "AI Integration Specialist",
      company: "Borderless360",
      period: "Aug 2025 — Jun 2026",
      description:
        "Owned the AI support chatbot for a global logistics & e-commerce platform from pre-release to production. Built the Django integration layer bridging chat to real platform actions, a full MCP server + n8n automations (Front, Aircall, Google Meet, WeChat), and ran structured LLM evaluations across Claude, GPT, Gemini, Grok, Llama, and Qwen to recommend the best-fit model per use case.",
    },
    {
      role: "AI Training Specialist",
      company: "DataAnnotation.tech",
      period: "Feb 2024 — Aug 2025",
      description:
        "Reviewed and assessed LLM-generated coding responses for accuracy and relevance, giving detailed feedback to improve model performance — focused on Python data science and ML (Pandas, NumPy, Matplotlib, TensorFlow).",
    },
    {
      role: "Intern",
      company: "Ebullience Inc.",
      period: "Jun 2021 — Jan 2024",
      description:
        "Built Python pipelines to extract structured data from SEC filings (DEF 14A proxy statements), later combining rule-based parsing with LLM prompting to improve extraction coverage. Stored and managed compensation data in SQL and Excel for downstream analysis.",
    },
    {
      role: "IT Support Technician",
      company: "ResNet, UC Santa Cruz",
      period: "Aug 2020 — Dec 2021",
      description:
        "Provided on-call and in-person support for connectivity, hardware, and network issues across student housing, diagnosing and repairing devices at both the software and physical layer.",
    },
    {
      role: "B.A. Networks & Digital Technology",
      company: "University of California, Santa Cruz",
      period: "Jun 2024",
      description:
        "Also completed the Machine Learning Specialization (Stanford University / DeepLearning.AI), Jun 2024.",
    },
  ],

  // --- Resume -----------------------------------------------------------------
  // Drop a PDF in the /public folder and point to it here, e.g. "/resume.pdf".
  // Leave empty ("") to hide the resume download button.
  resumeUrl: "/resume.pdf",

  // --- Contact & Socials ------------------------------------------------------
  email: "henrymain9@gmail.com",
  socials: {
    // Leave any value as "" to hide that icon.
    github: "https://github.com/henrymain1",
    linkedin: "https://linkedin.com/in/henry-main",
    twitter: "", // e.g. "https://x.com/your-handle"
    website: "",
  },

  // --- Site meta --------------------------------------------------------------
  // Used for the browser tab title and SEO. Update after you set a domain.
  siteUrl: "https://hm-portfolio-site.vercel.app",
};

export type Config = typeof config;
