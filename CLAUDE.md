# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # start Vite dev server (http://localhost:5173)
npm run build      # production build → dist/
npm run preview    # serve the production build locally
npm run lint       # ESLint across all JS/JSX files
```

There is no test suite in this project.

## Environment

Copy `.env.example` to `.env` and set `VITE_API_BASE` before running. This is the only required env var — it points at the backend API (default `http://localhost:4000`). The app will throw at startup if this var is missing or empty.

## Architecture

**Single-page React app** built with Vite, React Router v6, Tailwind CSS, and Framer Motion.

### Route structure (`src/App.jsx`)

| Path | Component | Purpose |
|---|---|---|
| `/` | `LandingPage` | Public marketing site |
| `/wp` | `WpLogin` | Admin login |
| `/wp/dashboard` | `WpDashboard` | Admin inbox for contact submissions |

The `WpDashboard` self-guards: it calls `authMe()` on mount and redirects to `/wp` if the session is not authenticated.

### Landing page sections (`src/LandingPage.jsx`)

`Header → Hero → About → Services → Roadmap → Contact → Footer` — all rendered as one scrollable page with anchor-based navigation (`#hero`, `#about`, etc.).

### API layer (`src/lib/api.js`)

All HTTP calls go through `apiFetch()`, which reads `VITE_API_BASE` at module init time (throws immediately if unset). Every call sends `credentials: "include"` by default (cookie-based auth). The public contact form uses `credentials: "omit"`.

Exported functions map to backend routes:
- `submitContactRequest` → `POST /api/v1/contact-requests`
- `loginWp` / `logoutWp` / `authMe` → `/api/v1/auth/*`
- `fetchClientRequests` → `GET /api/v1/dashboard/client-requests`

### Styling conventions

**Tailwind custom tokens** (defined in `tailwind.config.js`):
- Colors: `color-1` through `color-6` (greens/teals), `n-1` through `n-13` (neutral grays/purples), `app-black` (`#000000`)
- Typography classes: `.h1`–`.h6`, `.body-1`, `.body-2`, `.tagline`, `.button`, `.quote`
- Font families: `font-sans` (Sora), `font-code` (monospace), `font-grotesk`

**Shared surface primitives** (`src/lib/surface.js`): import `surfaceCard`, `surfacePanel`, `surfaceMuted`, `iconTile`, or `dashedCallout` for consistent bordered/shadowed containers instead of writing raw Tailwind each time.

**Path alias**: `@` resolves to `src/` (configured in `vite.config.js` and `jsconfig.json`).

### Animation pattern

Components use `framer-motion` with variants from `src/hooks/useScrollAnimation.js`. The standard pattern:

```jsx
const { ref, isInView } = useScrollAnimation();
<motion.div ref={ref} initial="hidden" animate={isInView ? "visible" : "hidden"} variants={staggerContainer}>
  <motion.p variants={fadeInUp}>…</motion.p>
</motion.div>
```

All variants (`fadeInUp`, `fadeInLeft`, `fadeInRight`, `scaleIn`, `staggerContainer`) are exported from that hook file.

### Content data

Static content (navigation links, services list, benefits cards, company logos, social links, pricing tiers, roadmap items) lives in `src/constants/index.js`. Update there first when copy or data changes.
