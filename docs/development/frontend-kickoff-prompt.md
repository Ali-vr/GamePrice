# GamePrice 🇦🇷 — Frontend Kickoff Prompt (Phase 4)

## Context

I'm building **GamePrice**, a video game price comparison and buying-decision platform for the Argentine market (full project spec already defined — see project README and `/docs`). We are now starting **Phase 4: Frontend initial setup**, following the incremental, documented, phase-by-phase methodology already established for this project (Phase 0 is complete: architecture, roadmap, docs, folder structure).

This phase has two concrete deliverables:

1. A working **Docker** setup for the frontend (and its integration into the existing `docker-compose.yml`).
2. The initial **Next.js + React + TypeScript** app scaffold (what you're calling "the html and code.js files, which are actually React"), styled according to the design system below.

Do not implement game data, price logic, auth, or backend calls yet — this phase is only the frontend shell, styling system, and base routing structure, connected to Docker.

## Visual identity to apply

Apply the following design system (adapted from an Impossible Foods–style reference) as the **visual foundation of GamePrice**. Reinterpret it for a gaming/price-comparison product — don't copy Impossible Foods' content, only its visual language (dark punk-poster energy, oversized display type, single accent color, flat surfaces).

**Palette**
- Canvas / page background: `#260212` (deep wine) → rename as `--color-bg-base`
- Section / card surface: `#4f0423` (burgundy) → `--color-bg-surface`
- Primary accent (CTAs, active states, price highlights): `#e10600` (red) → `--color-accent`
- Secondary/soft text & inactive states: `#ffc7c6` (blush) → `--color-text-soft`
- Nav bar / borders / strokes: `#000000` → `--color-border`
- Text on dark surfaces: `#ffffff` → `--color-text`

**Typography**
- One condensed sans-serif family for everything (headings and UI). Suggested fallback stack until a custom font is licensed: `"Archivo Expanded", "Oswald", ui-sans-serif, system-ui, sans-serif` for display/headings, and a normal sans (e.g. `Inter`) for body copy if the condensed face reads poorly at small sizes for prices/tables.
- Display headings: very large (64–160px depending on breakpoint), line-height ~0.75–0.85, letter-spacing slightly open (~0.03–0.06em), weight 700, uppercase for hero statements (e.g. game names, "BEST DEALS", "HISTORICAL LOW").
- Body/UI text: 14–18px, line-height 1.4, weight 400–500.
- Reserve the accent red (`#e10600`) for CTAs, active toggles, prices marked as good deals, and display headline accents — never for body text or borders.

**Shape & surface language**
- Flat surfaces, no shadows, no gradients, no glow.
- Border radius: 15px for buttons/pills/nav, 12px for standard cards, 38px for one "hero/feature" card type (e.g. the GamePrice Score card).
- Hairline `#000000` borders on cards, not shadows, for separation.
- Pill-shaped filter toggles (category/store/platform filters) — active = red fill + white text, inactive = transparent + blush/bordered.

**Layout**
- Full-bleed dark canvas, centered content, max content width ~1280px.
- Sticky black top navigation bar.
- Hero sections use large centered display type; product/game data uses compact grids and cards (12px radius), not the hero treatment.
- No shadows or colored dividers between sections — spacing alone separates sections (40–64px gaps).

## What I need from you

Work through this in the same way we've been working on the rest of the project: explain briefly what you're going to do, then implement, then report what was done, how to run it, and what's pending. Specifically:

### 1. Docker setup
- Add a `frontend` service to the existing `docker-compose.yml` (currently only `postgres` is active).
- Create `frontend/Dockerfile` (multi-stage: deps → build → run, using Node LTS, optimized for Next.js dev first — production build can come later).
- Make sure the frontend container reads `NEXT_PUBLIC_API_URL` from `.env` and exposes port 3000.
- Don't touch the `postgres` service or other commented-out services (`backend`, `redis`, `worker`) — leave them as-is for their own phases.

### 2. Next.js app scaffold
- Initialize Next.js (App Router) + TypeScript + Tailwind CSS inside `frontend/`.
- Set up the design tokens above as CSS custom properties / Tailwind theme extension (`tailwind.config.ts` or `@theme` if using Tailwind v4), so components reference tokens (`bg-surface`, `text-accent`, etc.) instead of hardcoded hex values.
- Create the base route structure already defined in the project docs (`docs/frontend/overview.md`):
  - `/`, `/games`, `/games/[slug]`, `/deals`, `/historical-low`, `/login`, `/register`, `/profile`, `/wishlist`, `/my-pc`, `/alerts`
  - Each route can be a minimal placeholder page for now — no real data fetching yet.
- Build a small set of base UI components using this design system, since we'll reuse them across the whole app:
  - Sticky top nav (black bar, red "GAMEPRICE" wordmark, nav links, CTA button)
  - Primary button (filled red) and Ghost button (outlined white) — pill shape, 15px radius
  - Filter pill toggle (default/active states)
  - Card component (12px radius, burgundy surface, black hairline border) for game/price grids
  - A hero block component for the homepage (display headline + subtext + CTA)
- Build the homepage (`/`) using the hero block plus placeholder sections for "🔥 Best deals", "📉 Near historical low", "🇦🇷 Best prices for Argentina", "🎮 Recommended for your PC" — using mock/placeholder content clearly marked as such, per project rules (no fake data presented as real).

### 3. Documentation & process (per project rules)
- Update `docs/frontend/overview.md` with the actual structure, component list, and token mapping once implemented.
- Update the root `README.md` "Ejecución" section with how to run the frontend via Docker.
- Create `docs/changelog/00X-frontend-initial-setup.md` following the existing changelog format (date, objective, changes, affected files, problems found, solution, next steps).
- Update `docs/development/roadmap.md` to mark Phase 4 as in progress/done.

### Constraints
- No backend calls yet — pages render static/mock content only.
- No authentication logic yet.
- Keep the component set minimal — only what's needed to stand up the homepage and route shells; don't over-build features that belong to later phases (deals logic, price history charts, hardware comparison, etc.).
- Follow the existing project conventions: comment code only where it clarifies intent, don't over-comment obvious lines.

When you're done, tell me: what was created, how to run `docker compose up` for the frontend, what the homepage looks like, and what's left before Phase 5 (PostgreSQL/backend integration).
