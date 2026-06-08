# Studio Trikon — Architecture Portfolio

> Production: **[studio-trikon.vercel.app](https://studio-trikon.vercel.app)**

Portfolio and admin website for **Studio Trikon**, an Ahmedabad-based architecture and interior design studio founded by Harshada Bhosale and Shivam Kumaria.

Built as a fully static frontend — no backend, no database, no recurring costs.

---

## Tech Stack

| Layer | Choice | Why |
|---|---|---|
| Framework | React 18 + TypeScript | Component model, type safety |
| Build tool | Vite 8 | Fast HMR, optimised production bundles |
| Styling | Tailwind CSS v4 (`@tailwindcss/vite`) | Utility-first, zero-runtime |
| Routing | React Router v6 | Client-side SPA routing |
| Icons | Lucide React | Consistent, tree-shakeable |
| Fonts | Playfair Display + DM Sans (Google Fonts) | Editorial serif + clean sans-serif |
| Persistence | `localStorage` | Zero-cost, sufficient for a small studio |
| Deployment | Vercel | Git-connected, auto-deploy on push |

---

## Features

### Public site
- **Landing page** — parallax hero, animated marquee, featured projects, rotating testimonials, CTA
- **Projects page** — full portfolio grid with category filters (All / Residential / Commercial / Interior)
- **Project detail** — hero image, specs, description, gallery with lightbox, related projects
- **About** — studio story, architect bios, values, process
- **Contact** — enquiry form (static, extend with Formspree/Netlify Forms for email delivery)

### Admin portal (`/admin`)
- Password-protected (session-scoped, `sessionStorage`)
- Add / edit / delete projects
- Add / edit / delete testimonials
- Toggle "featured" status per project (controls homepage "Selected Work" section)
- **Smart image input** — paste any public image URL or a Google Drive share link; Drive links are auto-converted to `lh3.googleusercontent.com` CDN URLs with size parameters

### Image pipeline
Images are served at context-appropriate sizes to keep load times fast:

| Context | Requested width |
|---|---|
| Admin dashboard thumbnail | `w=400` |
| Project cards / homepage | `w=900` |
| Project detail hero | `w=1400` |
| Lightbox (full-screen) | `w=1800` |

For Google Drive images, size is controlled via the `=wN` URL parameter on `lh3.googleusercontent.com` (Google's CDN). For other URLs (Unsplash, Cloudinary, etc.) the URL is used as-is — add your own transform params if needed.

All images use:
- `loading="lazy"` — browser-native lazy loading
- `decoding="async"` — non-blocking decode
- Shimmer placeholder while loading (no layout shift)

---

## Project Structure

```
src/
├── components/
│   ├── Footer.tsx
│   ├── LazyImage.tsx        # size-aware image wrapper
│   ├── Navbar.tsx
│   ├── ProjectCard.tsx
│   └── SectionLabel.tsx
├── context/
│   └── ProjectContext.tsx   # global state + localStorage persistence
├── data/
│   └── seedData.ts          # pre-loaded projects + testimonials (shown on first visit)
├── hooks/
│   └── useLazyImage.ts      # preloads image, returns loaded/error state
├── pages/
│   ├── About.tsx
│   ├── Contact.tsx
│   ├── Home.tsx
│   ├── ProjectDetail.tsx
│   ├── Projects.tsx
│   └── admin/
│       ├── AddProject.tsx
│       ├── AdminDashboard.tsx
│       ├── AdminGuard.tsx   # redirects unauthenticated users to /admin
│       ├── AdminLayout.tsx  # sidebar shell
│       ├── AdminLogin.tsx
│       ├── AdminTestimonials.tsx
│       ├── EditProject.tsx
│       └── ProjectForm.tsx  # shared add/edit form
├── theme/
│   └── theme.ts             # colour + font tokens (JS reference)
├── types/
│   └── index.ts             # Project, Testimonial, AdminCredentials
└── utils/
    └── imageUtils.ts        # Google Drive URL resolution + size helpers
```

---

## Getting Started

```bash
git clone https://github.com/abhi3899/studio-trikon.git
cd studio-trikon
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

Admin portal: [http://localhost:5173/admin](http://localhost:5173/admin)  
Default password: `trikon2024`

---

## Data Persistence

All data lives in `localStorage` under two keys:

| Key | Content |
|---|---|
| `studio_trikon_projects` | JSON array of `Project` objects |
| `studio_trikon_testimonials` | JSON array of `Testimonial` objects |

On first visit (empty localStorage), `seedData.ts` is loaded as the initial state. Any changes made through the admin portal are written to localStorage immediately and persist across page refreshes.

**Limitations:** localStorage is per-browser, per-device. Changes made on one machine are not visible on another. For a shared CMS, replace `ProjectContext` with a Supabase/Firebase/Contentful integration — the context interface is the only thing that needs to change.

---

## Admin Authentication

Authentication is intentionally minimal — a single hardcoded password stored in `AdminLogin.tsx`, with the session flag written to `sessionStorage`.

To change the password: edit the `ADMIN_PASS` constant in `src/pages/admin/AdminLogin.tsx`.

> **Before going live:** Remove the password hint shown on the login page (line ~43 in `AdminLogin.tsx`).

This is appropriate for a static site where the "CMS" is client-side. If the studio needs multi-user access or a shared content store, migrate to a proper auth provider.

---

## Adding Images via Google Drive

1. Upload the photo to Google Drive
2. Right-click → **Share** → set to **"Anyone with the link"** → Copy link
3. Paste the link into the admin portal image field
4. The app auto-converts it: `drive.google.com/file/d/FILE_ID/view` → `lh3.googleusercontent.com/d/FILE_ID=wN`
5. A live preview confirms the image loaded before you save

The conversion is handled in `src/utils/imageUtils.ts` → `resolveImageUrl()`.

---

## Deployment

The repo is connected to Vercel. Every push to `main` triggers a production redeploy automatically.

Manual deploy:
```bash
npx vercel --prod
```

The `vercel.json` at the project root rewrites all routes to `index.html` to support client-side routing:

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

---

## Colour Tokens

Defined in `src/theme/theme.ts` and mirrored in `src/index.css` (`@theme {}` block):

| Token | Hex | Usage |
|---|---|---|
| `bg` | `#faf7f4` | Page background |
| `surface` | `#f0ebe4` | Cards, inputs, section backgrounds |
| `ink` | `#1a1714` | Primary text, dark sections |
| `accent` | `#c1603a` | Terracotta — CTAs, highlights, active states |
| `muted` | `#9a8f87` | Secondary text |
| `border` | `#e2d9d1` | Dividers, input borders |

---

## Scripts

```bash
npm run dev      # start dev server at localhost:5173
npm run build    # type-check + production build → dist/
npm run preview  # preview the production build locally
```

---

## Potential Improvements

- [ ] Replace localStorage with Supabase for cross-device admin sync
- [ ] Add Formspree/Netlify Forms action to the Contact form for email delivery  
- [ ] Add `og:image` meta tags per project for better link previews
- [ ] Animate page transitions with Framer Motion
- [ ] Add a sitemap + `robots.txt` for SEO
- [ ] PWA manifest for mobile home screen install
