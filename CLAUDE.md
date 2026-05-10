# kirsty.dev — repo notes for Claude

Personal site for Kirsty Wright. Single-page hub (hero + SnapMedic feature + projects list + socials), plus a separate `/cv`. SnapMedic is the headline. British English in all copy, UK date format (day/month/year).

## Tech stack

- **Framework**: Nuxt 3 (compatibility v4)
- **Styling**: Tailwind 4 (`@theme` tokens in `app/assets/main.css`)
- **Components**: Vue 3 SFCs under `app/components/`
- **Pages**: `app/pages/` (file-based routing)
- **Layouts**: `app/layouts/` (`default.vue`)
- **Image**: `@nuxt/image` (`<NuxtImg>`, prefer `format="webp"`, explicit width/height)
- **Fonts**: `@nuxtjs/google-fonts` — Fraunces 500, Inter 400/600, JetBrains Mono 400
- **Package manager**: bun (`bun install`, `bun run dev`)
- **Deploy**: Docker, see `Dockerfile` and `docker-compose.yml`

## Conventions

- ESLint config: single quotes, no trailing commas (see `eslint.config.mjs`).
- Use `<NuxtLink>` for internal nav, `<NuxtImg>` for raster images.
- Inline SVGs live in `app/components/icons/` (no FontAwesome — kept the bundle lean).
- No `@nuxt/content` — no Markdown content pipeline.
- No dark mode — light theme only.
- British English everywhere user-facing.

## Commands

- `bun run dev` — dev server on `http://localhost:3000`
- `bun run lint` — ESLint
- `bun run typecheck` — `vue-tsc`
- `bun run build` — production build
- `bun run preview` — preview production build

## Design Context

### Users

- **Primary**: peers and recruiters arriving from a CV link, GitHub profile, or social bio. They want to know who Kirsty is, see SnapMedic, and find a way to get in touch — usually within 30 seconds.
- **Secondary**: clinicians or curious visitors arriving from SnapMedic itself. They want to confirm there's a real human behind the app.
- **Job to be done**: signal credibility quickly, point to SnapMedic, leave a way to reach Kirsty. Nothing else.

### Brand Personality

Three words: **warm · human · sharp**.

- **Warm** — feels like a real person, not a template. Has a pulse. British dry humour shows up in the copy without being jokey.
- **Human** — the writing voice is first-person, conversational, no marketing gloss. "I build things" not "Building solutions for tomorrow."
- **Sharp** — engineer mindset visible in the precision: nothing wasted, alignment is intentional, type and spacing are considered. Quiet confidence rather than loud branding.

Emotional goals: visitors should feel they've met someone competent and likeable in 10 seconds, not been pitched at.

### Aesthetic Direction

**Editorial / typographic.** Big serif display, generous whitespace, mono accents. Light theme only — warm off-white paper bg, near-black ink, single brand-green accent (`#34ca46`).

Spirit of the references (mixed): the typographic confidence of Linear/Vercel personal sites, the bookish prose-first warmth of writer-developer blogs (Craig Mod, Robin Sloan), and the engineer-flex precision of considered personal sites — but kept restrained and warm rather than cold or clever.

**Type system**:
- Fraunces 500 — display / headings
- Inter 400/600 — body / UI
- JetBrains Mono 400 — eyebrow labels, tech tags, footer meta

**Colour roles**:
- `--color-bg` `#fafaf7` — warm off-white
- `--color-ink` `#111111` — near-black body
- `--color-ink-soft` `#3a3a3a` — secondary
- `--color-muted` `#8a8a8a` — meta / mono captions
- `--color-rule` `#e6e4dd` — hairlines
- `--color-brand` `#34ca46` — accent only: link underline, status dot, focus ring. Never a button background.

**Anti-references — the site must NOT look like:**
- A generic dev portfolio template (no gradient hero, animated blobs, terminal mock cards, or hover-lift project grids).
- A corporate SaaS landing page (no pastel illustrations, feature-bento grids, "trusted by" logo bars, or rounded gradient buttons).
- Heavy / busy / over-designed (no competing accents, decorative graphics, or scroll-spam motion).
- Sterile or clinical-cold (no hospital-intranet feel — warmth must show through the precision).

### Design Principles

1. **Type does the work.** The serif/sans/mono system carries the visual weight.
2. **One accent, used sparingly.** Brand green is a seasoning — link underlines, a single status dot, focus ring. Nothing else.
3. **Hairlines over containers.** 1px rules separate content; cards and chips are avoided.
4. **Warm precision.** Tight alignment, considered rhythm (6rem desktop / 4rem mobile section gaps, 2rem within), but copy stays human and slightly dry.
5. **Less surface, more confidence.** A short page that reads well beats a long page that explains itself.

### Accessibility floor

WCAG 2.2 AA. Concretely:
- Text contrast ≥ 4.5:1 (large text 3:1).
- Focus rings visible — `--color-brand` outline, never `outline: none` without a replacement.
- Keyboard-reachable interactive elements; tab order matches visual order.
- Meaningful `alt` text (or `alt=""` if decorative).
- Respect `prefers-reduced-motion`.
- Affordances don't rely on colour alone (underlines on links, not just green).
