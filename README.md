# Community Tech Care

A responsive, static marketing website for an on-site technology support business serving senior living communities. Built for property managers, resident services teams, and community administrators.

## Local development

Use Node.js 24 LTS and npm. The lockfile is committed for reproducible installations.

```sh
npm ci
npm run dev
```

Open the Local URL printed by Vite (normally `http://127.0.0.1:5173`).

```sh
npm run lint       # ESLint, including React Hooks rules
npm run typecheck  # Strict TypeScript
npm run build      # Type-check, bundle, generate static HTML and SEO files
npm run check      # Lint, build, component checks, assets, and direct-route HTTP checks
npm run preview    # Preview the production build
```

The production output is `dist/`. `.ssr/` and `.component-checks/` are temporary build artifacts; there is no production server. Only upload `dist/`.

## Edit business information

Update **`src/config/business.ts`**:

| Field                 | Purpose                                                          |
| --------------------- | ---------------------------------------------------------------- |
| `businessName`        | Name throughout the site and SEO metadata                        |
| `founderName`         | Founder name on the About page                                   |
| `contactEmail`        | Real contact email; empty means email links are hidden          |
| `contactPhone`        | Optional phone; empty means hidden                               |
| `serviceArea`         | Based in Southeastern Wisconsin; no specific cities claimed     |
| `googleFormEmbedUrl`  | Google Forms iframe URL; empty means a labeled placeholder      |
| `googleFormDirectUrl` | Public form link for opening in a new tab                        |
| `googleFormHeight`    | Iframe height in pixels; adjust to your actual form              |

Replace the founder name, email, and stock portrait before launch. No credentials, client relationships, statistics, physical address, or service area have been invented. Review and personalize founder and business copy. Example email addresses are excluded from structured data.

Service copy, process steps, and partnership formats live in **`src/data/content.ts`**. Page copy lives in `src/pages/`. Shared components live in `src/components/`. The color palette and desktop composition are in `src/styles.css`, using Tailwind CSS v4. Tablet and phone adaptations are isolated in `src/responsive.css`. See **[responsive implementation and QA notes](docs/responsive-qa.md)** for the width review, checks performed, and pending visual testing.

## Photographs and fonts

All photographs and font files are local, so visitors do not depend on a stock image service or Google Fonts request. **`src/config/images.ts`** holds image paths, descriptive alt text, and dimensions. Each photograph also has a 720px `mobileSrc` candidate selected through responsive image markup. Replace both candidates together, or remove `mobileSrc` if you only have one replacement; update alt text and intrinsic dimensions to match. Prefer appropriately compressed photographs, not large original camera files.

The portrait is explicitly labeled as an illustrative placeholder; it does not depict an actual founder. Stock photographs do not imply existing clients or partnerships.

See **`ASSETS.md`** for image sources and font licenses. DM Sans and Lora are self-hosted under the SIL Open Font License; license files are included in `public/fonts/`.

## Google Forms setup

1. Create a form at [Google Forms](https://forms.google.com). Title it “Community Partnership Inquiry” and use clear, readable questions.
2. Recommended questions: Contact Name; Community / Property Name; Job Title; Work Email; Phone Number (optional); Community Location; Type of Support Interested In; Additional Information. Support choices can include recurring help sessions, monthly visits, one-on-one support, group workshops, and discussing options.
3. Collect administrator contact details only. Add a reminder not to include resident passwords, financial or medical information, or other sensitive resident information. Do not request file uploads.
4. Publish the form and make it available to the intended external respondents. Avoid sign-in restrictions, organization-only access, verified-email collection that requires sign-in, and a one-response limit requiring sign-in. Use an ordinary email question with email validation for Work Email.
5. In Google Forms, use the **Embed HTML** option (the `<>` control, usually under Send or the sharing menu). Copy only the URL from the iframe’s `src`, for example `https://docs.google.com/forms/d/e/YOUR_FORM_ID/viewform?embedded=true`. Set `googleFormEmbedUrl` to that URL, with literal `&` characters rather than HTML `&amp;` entities.
6. Copy the public responder link into `googleFormDirectUrl`. Use the full `https://docs.google.com/forms/.../viewform` URL. The component accepts HTTPS Google Forms URLs only. If the direct link is empty, the embed URL without `embedded=true` is used as the fallback.
7. Preview the homepage `/#contact` section and the retained `/contact/` route on desktop and a narrow phone screen. The full-width iframe and **Open Form in New Tab** fallback remain available at every screen width. Set `googleFormHeight` high enough for the longest form state, including validation messages. Cross-origin Google Forms cannot be automatically measured by this site; check the height after changing questions. The outer page scrolls normally, and direct form access remains available if the embed is inconvenient, blocked, or unavailable.
8. Enable new-response email notifications in the Google Form’s Responses section if desired. Test an actual submission in a private browser window before launch, then verify it arrives in your own form.

The website never submits to undocumented endpoints, stores submissions, or handles account credentials. Google hosts the form and receives responses. Until configured, the site shows a clearly labeled Google Form placeholder. Email links appear only after a real email is configured; add the form URL and contact email before accepting inquiries.

## GitHub Pages deployment

Deployment uses the **gh-pages branch**, with the built site at its root. The React source stays on `main`. You do not need a custom GitHub Actions workflow. The production URL is **https://communitytechcare.com/**.

From the project folder, run:

```sh
npm run deploy
```

This runs lint, TypeScript, a production build, generated-output checks, contact-form checks, and direct-route HTTP checks. Once they pass, the development-only `gh-pages` publisher commits and pushes the contents of `dist/` (including `.nojekyll`) to the remote `gh-pages` branch. It uses your existing Git credentials. It does not commit or push source changes on `main`.

For the first deployment:

1. Run `npm run deploy` to create the `gh-pages` branch on GitHub. You need Git push access to the repository and a configured Git name/email.
2. Open **Settings → Pages → Build and deployment → Source** and select **Deploy from a branch**.
3. Select **gh-pages**, choose **/(root)**, and click **Save**.
4. Wait for GitHub Pages to publish, then visit **https://communitytechcare.com/**. Refresh `/services/`, `/about/`, and `/contact/` directly to confirm the pages.

For later updates, run `npm run deploy` again. Pushing source changes to `main` alone does not rebuild or publish the site. Commit your source changes separately so the source and build remain reproducible. GitHub still performs its own Pages publishing job behind the scenes; no repository workflow YAML is needed.

The committed `.env.production` supplies the custom domain's root base path, canonical URL, and generated `CNAME` file. `npm run dev` continues to serve locally at `/`. To switch hosting, edit `.env.production` or create an ignored `.env.production.local` override:

| Variable             | Current custom domain           | Repository URL alternative                    |
| -------------------- | ------------------------------- | --------------------------------------------- |
| `VITE_BASE_PATH`     | `/`                             | `/senior-tech-help/`                          |
| `VITE_SITE_URL`      | `https://communitytechcare.com` | `https://camdenmo.github.io/senior-tech-help` |
| `SITE_CUSTOM_DOMAIN` | `communitytechcare.com`         | empty                                         |

These are public configuration values, not secrets. `VITE_SITE_URL` must include the complete production path matching `VITE_BASE_PATH`. `.env.local` affects development; production-specific files take precedence during builds. Environment values prefixed with `VITE_` are compiled into public files. `npm run preview` serves the current custom-domain build at `/`.

If HTML loads but images, JavaScript, fonts, or CSS return 404 after changing domains, check the requested paths. A custom domain needs `VITE_BASE_PATH=/`; repository hosting needs `/senior-tech-help/`. Update all three settings together and run `npm run deploy` again. Keep the custom-domain hostname configured so every deployment preserves `CNAME`.

### Clean URLs and direct refreshes

The build renders React into actual `index.html` files at `/`, `/services/`, `/about/`, and `/contact/`. Navigation uses normal links. GitHub Pages serves each directory directly, so clean URLs and refreshes work with no hash routing, redirect workaround, backend, or client-side router. Trailing-slash links are intentional. The site remains readable and navigable without JavaScript; JavaScript adds the mobile menu. Unknown URLs use a genuine `404.html` with a link home. When adding a page, register it in `src/App.tsx` and `src/entry-server.tsx`; it will then be included in static generation and the sitemap.

### Custom domain and HTTPS

1. Add your domain under **Settings → Pages → Custom domain**. Verify domain ownership where GitHub requests it.
2. Configure DNS following [GitHub’s custom-domain instructions](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site). For a `www` subdomain, point its CNAME to `YOUR-USERNAME.github.io`, without a repository path. For an apex domain, use GitHub’s documented current A/AAAA or supported ALIAS records.
3. Set `VITE_BASE_PATH=/`, `VITE_SITE_URL=https://your-domain.com` (or your exact `www` hostname), and optionally `SITE_CUSTOM_DOMAIN=your-domain.com`. The latter generates `dist/CNAME` on every build. Use the same hostname everywhere.
4. Redeploy. Once DNS and the certificate are ready, enable **Enforce HTTPS** in Pages settings. Check both HTTP-to-HTTPS redirection and any apex/`www` redirect you configured.

The deployment command pushes the built site to `gh-pages`. It does not create DNS records or change GitHub Pages account settings. Configure Pages to publish that branch once, as described above.

## SEO and accessibility

Every generated page has its own title and description, Open Graph metadata, one primary heading, and visible content in the initial HTML. When `VITE_SITE_URL` is set, the build adds canonical URLs, absolute social preview image URLs, and `sitemap.xml`; `robots.txt` references the sitemap. Without a production URL, these URL-dependent fields are intentionally omitted. The committed `.env.production` supplies the production URL. The sitemap is generated at build time, not maintained by hand. On repository-path hosting, `robots.txt` is also under that repository path; only the domain-root robots file governs crawlers.

Organization JSON-LD includes only configured business details, without an invented address or credentials. Placeholder email is omitted. The 404 page is marked `noindex`.

Accessibility features include semantic landmarks, a skip link, keyboard focus styles, a mobile disclosure menu with Escape/outside-click handling, comfortable controls, high-contrast body text, reduced-motion support, and descriptive alt text. Below-the-fold images use lazy loading and fixed visual space. Verify the real Google Form’s accessibility separately after configuring it.

## Launch checklist

- Replace the founder name, contact email, optional phone, and actual service area.
- Replace the founder portrait and review all placeholder imagery and copy.
- Publish and configure your Google Form; test its external access, mobile layout, and response delivery.
- Run `npm run deploy`, select `gh-pages` / `/(root)` in Pages settings, and check the published site.
- Confirm the production URL, nested-page refreshes, canonical URLs, sitemap, and HTTPS.

## Implementation notes

Runtime dependencies are React, React DOM, and Lucide React. React Router is unnecessary because every route is generated as a static page. No backend, database, tracking scripts, cookies, authentication, paid APIs, or form submission libraries are included.

The lint toolchain overrides its transitive `minimatch` dependency to the patched `11.x` release; the lint command is verified with that version. Production dependencies are unaffected.

Deployment references: [Vite static deployment](https://vite.dev/guide/static-deploy), [GitHub Pages publishing configuration](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site), and [Tailwind’s Vite integration](https://tailwindcss.com/docs/installation/using-vite).
