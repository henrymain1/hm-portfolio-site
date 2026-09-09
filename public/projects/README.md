# Project screenshots

Add a per-project slideshow to any GitHub project card.

## How to add screenshots for a project

1. Create a folder here named after the repo, e.g. `public/projects/daily-pages/`.
2. Drop your images in it (`.png`, `.jpg`, `.webp`). Name them however you like — `1.png`, `2.png`, etc. is easy.
3. List them in **`lib/config.ts`** under `github.projects`:

```ts
projects: {
  "daily-pages": {
    screenshots: [
      "/projects/daily-pages/1.png",
      "/projects/daily-pages/2.png",
      "/projects/daily-pages/3.png",
    ],
    // optional:
    // description: "A custom description just for this card.",
    // liveUrl: "https://your-live-demo.com",
  },
},
```

That's it. The first image becomes the card cover, and clicking the card opens a
full-screen slideshow (arrow keys / dots / thumbnails). Repos without screenshots
just show a normal card.

**Tip:** 16:9 images (e.g. 1600×900) look best since cards and the lightbox use a
widescreen frame. Keep files reasonably small (< ~500 KB each) for fast loads.
