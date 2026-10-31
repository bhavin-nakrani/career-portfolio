# Bhavinkumar Nakrani — Career Portfolio

Personal portfolio and resume site built with **Astro 7**, **TypeScript** and **Tailwind CSS 4**, deployed to **GitHub Pages** with GitHub Actions.

Live: <https://bhavin-nakrani.github.io/career-portfolio/>

## Pages

| Route | Purpose |
|---|---|
| `/` | Homepage: hero, quick facts, about + AI focus, selected work, experience, skills, highlights, contact |
| `/projects/` | All case studies with a category filter |
| `/projects/<slug>/` | Individual case study (generated from Markdown) |
| `/resume/` | On-screen two-page resume + PDF download |
| `/404.html` | Not-found page |
| `/resume/print/`, `/og-card/` | Utility pages used to render the PDF and the social card (not indexed) |

## Run locally (Windows / macOS / Linux)

Requires Node.js 22.23+ (Node 24 LTS recommended).

```bash
npm install
npm run dev        # http://localhost:4321/career-portfolio/
npm run build      # type-check + production build into dist/
npm run preview    # serve the production build
```

## Editing content

All career content lives outside the components — edit data, not layouts.

| What | Where |
|---|---|
| Name, headline, summary, email, social links | `src/data/profile.json` |
| Quick-fact numbers | `src/data/facts.json` |
| Jobs (newest first) | `src/data/experience.json` |
| Skill groups (`primary` / `working`) | `src/data/skills.json` |
| Education & certificates | `src/data/education.json` |
| Symfony PRs, awards, travel | `src/data/achievements.json` |
| Project case studies | `src/content/projects/*.md` (schema in `src/content.config.ts`) |
| Colours & fonts | `@theme` block in `src/styles/global.css` |

### Adding a project

1. Copy an existing file in `src/content/projects/` and rename it (the filename becomes the URL slug).
2. Update the frontmatter; set `featured: true` to show it on the homepage, and `order` to position it.
3. Add a cover in `public/images/projects/` — either draw one in `scripts/generate-covers.mjs` and run `npm run covers`, or add your own image (1200×750).

### Regenerating the resume PDF and social card

The PDF (`public/documents/Bhavinkumar-Nakrani-Resume.pdf`) and the Open Graph image (`public/og/default.png`) are generated from the same data as the site, using a local Chrome or Edge in headless mode:

```bash
npm run resume
```

Run this after changing any resume data, check the PDF, then commit the regenerated files. Set `CHROME_PATH` if your browser lives somewhere unusual.

## Branches and deployment

- **`dev`** — day-to-day work. Every push runs the **Build check** workflow (`.github/workflows/ci.yml`), which type-checks and builds without deploying.
- **`master`** — production. Every push (or merged PR) runs **Deploy portfolio to GitHub Pages** (`.github/workflows/deploy.yml`), which builds with `withastro/action` and publishes with `actions/deploy-pages`.

### One-time GitHub Pages setup

1. Push `dev` and `master` to GitHub (`git push -u origin dev`, then merge into `master`).
2. On GitHub open **Settings → Pages**.
3. Under **Build and deployment → Source**, choose **GitHub Actions**.
4. Open **Settings → Environments → github-pages** and make sure **Deployment branches** allows `master` (add a rule for `master` if it only lists another branch).
5. Merge `dev` into `master` (via a pull request, or `git checkout master && git merge dev && git push`).
6. Watch the run in the **Actions** tab; when it finishes, the site is live at the URL above.
7. Optional: under the repository's **About** settings, set the website to the Pages URL.

### Custom domain later

1. Point DNS at GitHub Pages and add the domain under **Settings → Pages → Custom domain**.
2. Add `public/CNAME` containing the domain.
3. Build with `SITE_URL=https://your-domain.com` and `BASE_PATH=/` — set them as `env:` on the build step in `deploy.yml` — and update `public/robots.txt`.
4. Enable **Enforce HTTPS**.

## Release checklist

- [ ] `npm run build` passes with no errors
- [ ] `npm run resume` re-run after resume data changes; PDF checked (2 pages)
- [ ] Links, images and PDF download work under `/career-portfolio/`
- [ ] Mobile menu, project filters and keyboard focus checked
- [ ] Live site checked on phone and desktop after deploy

## Credits

Fonts: Space Grotesk, Inter, JetBrains Mono (self-hosted via Fontsource, SIL OFL). Icons drawn after Lucide (ISC). Project covers are original illustrations, not product screenshots.
