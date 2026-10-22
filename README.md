# Ali Khan — Developer Portfolio

A responsive one-page portfolio built with **Next.js (App Router) + TypeScript**, animated with **GSAP**, **ScrollTrigger** and **@gsap/react**.

## Run it locally

Requires Node.js 20.9 or newer.

```bash
npm install
npm run dev        # development server → http://localhost:3000
```

If port 3000 is busy, use another one: `npx next dev -p 4321`.

Other scripts:

| Command | What it does |
| --- | --- |
| `npm run build` | Production build |
| `npm start` | Serve the production build (`npm start -- -p 4321` for another port) |
| `npm run lint` | ESLint (Next.js core-web-vitals + TypeScript rules) |
| `npm run typecheck` | TypeScript check |

## Edit the content

Almost everything you'll want to change is in **`content/site.ts`**:

- **Confirmed details** — name, role, introduction, About text, services.
- **To fill in** — `contact.email`, `contact.location`, and the `socials` URLs. Empty values are hidden automatically.
- **Skills** — please confirm or edit the list.
- **Experience** — optional; nothing is shown while the list is empty.
- **Projects** — currently **sample projects**, each with a "Sample" badge. Replace the title, description, tags and image, add a `url`, and set `sample: false` once a project is real.
- **Testimonials** — the section stays hidden until you add real, permission-given quotes.
- **Workspace gallery** — illustrative stock photos; swap in your own when ready.

Images live in `public/images/`. Give each one its real `width`/`height` and a descriptive `alt`. Photo credits are in `ASSETS.md`.

Styling is in `app/globals.css` (colors at the top). Animations are in `components/Motion.tsx`.

## Contact form

The form posts to `app/api/contact/route.ts`, which sends email through [Resend](https://resend.com).
Until it is configured, the form clearly says it isn't connected and **never** shows a "sent" message.

1. Create a Resend account and an API key, and verify a sending domain.
2. Copy `.env.example` to `.env.local` and fill in `RESEND_API_KEY`, `CONTACT_TO_EMAIL` and `CONTACT_FROM_EMAIL`.
3. Restart the dev server, or rebuild. The setup notice disappears once all three are set.

Secrets are used only on the server and are never sent to the browser.

## Deploy to Vercel

1. Push this folder to a GitHub, GitLab or Bitbucket repository.
2. In Vercel, choose **Add New → Project** and import the repository. The defaults (framework: Next.js) need no extra configuration.
3. Optional: under **Settings → Environment Variables**, add the contact-form variables from `.env.example`, plus `NEXT_PUBLIC_SITE_URL` once you have a custom domain. Redeploy after changing them.

Social-sharing links use `NEXT_PUBLIC_SITE_URL` if set, otherwise the production URL Vercel provides.

## Motion and accessibility

- Animations use only transforms, opacity and clip-path, and are scoped with `useGSAP` so they clean up automatically.
- Parallax runs only on screens 1024px and wider.
- With **reduced motion** turned on, nothing animates and all content shows immediately.
- If JavaScript or GSAP fails, a 3-second fallback guarantees the hero is visible. Other content is never hidden by CSS.
- Includes a skip link, an accessible mobile menu (Escape closes it), visible keyboard focus, and sticky-header-aware anchor links.
- The blue (`#4F72C8`) is slightly deeper than the reference's `#5377CC` so that small white text meets WCAG AA contrast.
