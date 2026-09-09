# Portfolio

A sleek, animated developer portfolio built with **Next.js 16**, **Tailwind CSS 4**, **Motion** (Framer Motion), and **TypeScript**. It pulls your projects **live from the GitHub API** and is designed to deploy free on **Vercel** with a custom domain.

## ✨ Features

- 🎨 Dark / neon aesthetic with animated aurora background & glassmorphism
- ⚡ Live GitHub projects grid (auto-fetched, cached hourly, pin/hide via config)
- ⌨️ Typewriter role animation, scroll-reveal sections, mouse-spotlight cards
- 📱 Fully responsive + respects `prefers-reduced-motion`
- 🔧 **All your content lives in one file:** [`lib/config.ts`](lib/config.ts)

## 🚀 Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## ✏️ Make it yours

Everything you need to edit is in **[`lib/config.ts`](lib/config.ts)**:

| What | Field |
| --- | --- |
| Name, roles, tagline | `name`, `roles`, `tagline` |
| About text & tech stack | `about.body`, `about.stack` |
| **GitHub username** (required for projects) | `github.username` |
| Pin / hide specific repos | `github.featured`, `github.hidden` |
| Experience / education timeline | `experience` |
| Email & social links | `email`, `socials` |
| Resume | `resumeUrl` (see below) |
| SEO / domain | `siteUrl` |

### Add your resume

Drop your PDF into the **`public/`** folder (e.g. `public/resume.pdf`) and set:

```ts
resumeUrl: "/resume.pdf",
```

A Resume button then appears in the hero and contact section.

## 🌐 Deploy to Vercel (free + custom domain)

1. Push this repo to GitHub.
2. Go to [vercel.com/new](https://vercel.com/new), import the repo, and click **Deploy** (no config needed — Vercel auto-detects Next.js).
3. In your project → **Settings → Domains**, add your custom domain and follow the DNS instructions.
4. Update `siteUrl` in `lib/config.ts` to your final domain and push.

Every `git push` to `main` auto-deploys.

> Prefer GitHub Pages? This app uses a live server fetch for GitHub data; for Pages you'd switch to a static export. Vercel is the recommended path.

## 🧱 Project structure

```
app/            # Next.js App Router (layout, page, global styles)
components/      # Hero, About, Projects, Experience, Contact, Navbar, Footer
components/ui/   # Reveal, AuroraBackground, SectionTitle, brand icons
lib/config.ts   # ← your content
lib/github.ts   # GitHub API fetching + filtering
```

Built with 🩶 and Claude Code.
