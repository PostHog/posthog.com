# posthog.com (Gatsby 4.25.9) build outputs for SEO, AEO and agents

Repo: `/Users/rafael/Documents/posthog/posthog.com`. I read the code only. There is no `public/` folder locally, so counts and layouts below come from the code, not from a real build.

## 0. Build pipeline at a glance
- `pnpm build` runs `prebuild` (`generate-brand-assets`, which writes `static/brand/*`) and then `gatsby build`. `build:minimal` sets `GATSBY_MINIMAL=true`, and that **skips all of onPostBuild**: no .md files, no llms.txt, no post-build-data.
- `onPreBootstrap` (`gatsby/onPreBootstrap.ts`) writes:
  - `static/scripts/posthog-init.js` (loaded by `html.tsx` when the PostHog env vars are set)
  - `public/hedgehog-mode/` (copied from `node_modules/@posthog/hedgehog-mode/assets`)
  - the MCP tools and scout SKILL data files
- `gatsby/enrichVideos.ts` writes `public/videos-metadata.json`. `src/hooks/useVideos.ts` fetches it at runtime.
- `onPostBuild` (`gatsby/onPostBuild.ts`) does all the markdown and LLM work (section 1). It reads the **built HTML in `public/<slug>/index.html`**.
- OG images and the Strapi sync are not part of the build. GitHub Actions run them after a successful production deploy, reading `https://posthog.com/post-build-data.json` (section 1g).

## 1. Every generated file and URL pattern

### 1a. Markdown siblings of HTML pages: `/<slug>.md`
- **Code:** `generateRawMarkdownPages` in `gatsby/rawMarkdownUtils.ts`, using the turndown pipeline in `gatsby/turndownService.ts`.
- **Which pages:**
  - Source is `allMdx` nodes whose `fields.slug` matches the regex string `/^/(docs|handbook|blog|newsletter|changelog|pocket-guides|pricing)/`, built from `MARKDOWN_CONTENT_PATHS` in `src/constants/index.ts`.
  - Gatsby strips the regex delimiters, so the pattern is really `^/(docs|…)` with no boundary after the section name. `/pricing-foo` or `/docs-x` would also match.
  - Slugs containing any of these are excluded: `/_snippets`, `/snippets/`, `/_includes`, `/thanks`, `/notes/test-note`, `/service-error`, `/service-message`, `/services`, `/request-received`, `/teams/`, `/hosthog`, `/startups`, `/example-components`.
  - A page is skipped if `public/<slug>/index.html` does not exist.
- **How it is built:**
  1. Read `public/<slug>/index.html`.
  2. Title: take `<title>` and strip trailing `" - Docs"` / `" - PostHog"` (regex `/(?: - (?:Docs|PostHog))+$/`). Fall back to the first `<h1>`, then `frontmatter.title`, then "Untitled".
  3. Content: the first `<main>…</main>`, else `<article>`, else `<body>` (regex extraction).
  4. `preprocessHtmlForTabs` (one shared JSDOM):
     - In `div.my-4` tab containers, label each `[role=tabpanel]` with `data-tab-label` from its `button[role=tab]`.
     - In `div.code-block` with a tablist, label each `<pre>` with `data-language-label`.
     - Remove the "Copy this page as Markdown" and "More Markdown actions" buttons, `.ask-posthog-ai-code-snippet` and `[data-md-export="skip"]`.
     - Remove the duplicate dark-mode `<img>` (`img.dark:hidden + img.dark:block` with the same alt).
  5. Turndown options: atx headings, fenced code, `-` bullets, `*` for emphasis, `**` for strong.
  6. Turndown rules:
     - Drop script, style, comments and empty `<p>`.
     - Tab panels become `## <tab label>`. Tab lists are removed.
     - `<pre>`: join `.token-line` text, language comes from `language-xxx`, and an optional `### <languageLabel>` goes before the fence.
     - The first `<h1>` becomes `# <title>`. Later h1s become `##`.
     - **Internal links** that start with `/` get `.md` added before the `#hash`, and any `.html` is stripped.
     - Unwrap radix scroll viewports. Drop `#toc` and `#mobile-toc`. `<hr>` becomes `---`.
     - Tables become GFM tables (cells turned down recursively, pipes escaped).
     - Quest items (`#quest-item-*`) are flattened. The "Community questions" and "Was this page useful?" h3s are kept.
  7. `postProcessMarkdown`:
     - Strip leading frontmatter.
     - Outside code fences: drop `[data-…]{` CSS lines and empty `-` bullets, trim trailing spaces, collapse repeated blank lines.
     - Make sure the file starts with `# title`.
- **Output:** `public/<slug>.md`, so `/docs/foo/index.html` gets a sibling `/docs/foo.md`.
- **Agent signpost:** every file starts with:
  `> AI agents: this is one page from PostHog's docs. Full index of Markdown docs for LLMs: https://posthog.com/llms.txt\n\n`
- **Section index pages:** `/docs`, `/handbook`, `/blog` and `/newsletter` have no MDX node, so they get no `.md`.
- **Tests:** `gatsby/turndownService.test.ts`.

### 1b. API reference
- **`/openapi.json`:** the whole spec fetched from `POSTHOG_OPEN_API_SPEC_URL` (default `https://app.posthog.com/api/schema/`), written as minified JSON.
- **`/docs/open-api-spec/<operationId>.md`:** one file per operation.
  - Content: `# <operationId>\n\n## OpenAPI\n\n` followed by a fenced block opened with ```` ```json <METHOD> <path> ````.
  - The block holds pretty-printed JSON of `{paths:{[path]:{[method]:op}}, components:{schemas: <only the schemas it references, followed recursively>}}`.
  - Signpost prepended.
- If the fetch fails, the error is logged and both outputs are skipped.

### 1c. SDK references
Source: GraphQL `allSdkReferences`.
- **`/docs/references/<referenceId>.md`** when the version is latest, otherwise **`/docs/references/<id>.md`** (the versioned id).
  - Content:
    - `# title`, then `**SDK Version:**` (only if there is a concrete version), then the description.
    - `## Categories`.
    - Per class: `## Class`, then `### <cat> methods` or `### Other methods`.
    - Per function: `#### fn()`, Release Tag, description, Notes, `### Parameters`, `### Returns` (lists union and intersection types), `### Examples`, then `---`.
  - Signpost prepended.
- **`/docs/references/<referenceId>/types/<typeId>.md`:** latest version only, and only types where `typeHasPage` is true.
  - Content: `# name`, `**SDK:**`, description, `### Properties`, `### Example values`.
  - **No signpost** on these.
- Static file `static/docs/references/version-unavailable.md`. A vercel.json rewrite sends `/docs/references/:slug(.*-\d.*).md` to it.

### 1d. Hand-built markdown

| File | What it contains and where the data comes from |
|---|---|
| `/pricing.md` | Built by `generatePricingMd`. Data: `${BILLING_SERVICE_URL}/api/products-v2?display_friendly=true` (`billing.posthog.com`). Contains product tier tables in a fixed product order, product add-ons, platform packages, and hardcoded sections (volume discounts, other discounts, definitions). Signpost prepended. |
| `/platform.md` | Built by `generatePlatformMd` from the hardcoded `PLATFORM_ITEMS` taxonomy in `rawMarkdownUtils.ts` (4 products and 16 tools, plus Context and Context warehouse blurbs). Signpost prepended. |
| `/<slug>.md` for products | Built by `generateProductPagesMarkdown`. Covers `slack-app`, `desktop`, `product-analytics`, `web-analytics`, `session-replay`, `feature-flags`, `experiments`, `error-tracking`, `surveys`, `ai-observability`, `logs`, `data-warehouse`, `cdp`, `endpoints`, `workflows` and `ai`, plus the `MD_ONLY_PAGES` entries `tracing`, `heatmaps`, `replay-vision`, `support`, `context-warehouse` and `self-driving`. All use one short template. Signpost prepended. |
| `/changelog.md` | Built by `generateChangelogMd`. Data: `allRoadmap(complete: true, date != null, sorted DESC)` and `allChangelogVideo`. Covers the last 12 months, grouped by `## Month YYYY`. Videos appear as `- 📺 [title](youtube)`. Each entry is `### [title](https://posthog.com/changelog?id=<strapiID>)`, then `_date · Team · topic_`, then the description (images stripped, relative links made absolute), then Docs and CTA links. Signpost prepended. |
| `/changelog/<YYYY>.md` | One archive per year, same format. |
| `/llms.txt` | See 1e. |

### 1e. `/llms.txt`
- **Code:** `generateLlmsTxt`. There is **no `llms-full.txt`** anywhere in the codebase.
- **Inputs:**
  - Pages successfully converted in 1a whose slug starts with `/docs`. Handbook, blog and newsletter are excluded.
  - Every file in `public/docs/open-api-spec/`.
- **Content, in order:**
  1. Hardcoded intro: H1 "PostHog", a blockquote, "Instructions for AI Coding Assistants" (wizard, products, API hosts, MCP).
  2. `## Products and tools`, generated from `PLATFORM_ITEMS` and linking to the `.md` URLs.
  3. `## Changelog`, linking `changelog.md` and `changelog.rss`.
  4. One section per docs subsection.
- **Docs sections:**
  - The section key is `docs-<segment2>`. Titles come from the override map (e.g. `docs-libraries` becomes "SDKs and Libraries", `docs-llm-analytics` becomes "AI Observability"), otherwise the segment title-cased.
  - Pages under `/docs/api/*` are skipped unless the third segment is `queries`, `flags` or `capture`.
  - Sections are sorted alphabetically. Entries within a section are `- [title](https://posthog.com<slug>.md)`, sorted by title.
- **Last:** `## Optional` then `### API Reference`, listing all `open-api-spec` operationIds.
- **No signpost** on this file.

### 1f. Feeds, sitemap, manifest (from `gatsby-config.js` plugins)

**`/rss.xml`** (gatsby-plugin-feed 4.25)
- Query: `allMdx(frontmatter.rootPage == "/blog")`, sorted by date DESC.
- Each item:
  - title
  - description = excerpt (150 chars)
  - date formatted "MMMM DD, YYYY"
  - url = `${siteUrl}/${node.slug}` (the old Mdx `slug` field, not `fields.slug`)
  - guid = node id
  - author = first author name
  - `content:encoded` = CDATA of the html
  - enclosure = `featuredImage.publicURL`
- Channel: custom namespace `blog`, title "PostHog's RSS Feed", `feed_url` `https://posthog.com/rss.xml`.
- No `match`, so the plugin adds `<link rel="alternate" type="application/rss+xml" title="PostHog's RSS Feed" href="/rss.xml">` to **every page**.

**`/changelog.rss`**
- Query: `allRoadmap(complete: true, date != null)`, DESC, limit 50.
- Each item:
  - url `https://posthog.com/changelog?id=<strapiID>`
  - guid `posthog-changelog-<strapiID>`
  - categories `[<Team> Team, topic]`
  - author from `profiles`
  - enclosure = media url and mime
  - description and `content:encoded` = markdown description with images stripped and links made absolute
- Channel: `site_url` `https://posthog.com/changelog`.
- `match: '^/changelog'`, so the rss alternate link appears only on `/changelog*` pages.

**`/sitemap/sitemap-index.xml` + `/sitemap/sitemap-0.xml…`** (gatsby-plugin-sitemap **5.25**)
- Output folder `/sitemap`, 45,000 entries per file, not gzipped.
- `createLinkInHead: true` puts `<link rel="sitemap" type="application/xml" href="/sitemap/sitemap-index.xml">` on every page.
- Pages included:
  - every `allSitePage.path` except versioned SDK refs (`/^\/docs\/references\/[a-z0-9-]+-(\d|latest)/`)
  - `/questions/<permalink>` for every Squeak question (`GATSBY_SQUEAK_API_HOST/api/questions`, paginated 100 per page, 3 retries)
  - `/plugins/<name-lowercased-dashed>` from `raw.githubusercontent.com/PostHog/plugin-repository/main/repository.json`
- Priority and changefreq rules, applied in this order:
  1. Default: monthly, 0.7.
  2. URL contains `blog` or `compare`: changefreq yearly. (The exact-path check for weekly never matches, because `serialize` receives full URLs.)
  3. Else contains `product`: 0.8.
  4. Else contains `docs`: 0.9.
  5. Else contains `handbook`: 0.6.
  6. Else contains `pricing`: 0.8.
  7. Else contains `plugins`: 0.8, daily.
- No `lastmod`.
- **Quirks:**
  - `resolvePages` returns absolute URLs. That means the `/` = 1.0 rule never fires, and the default excludes (`/404`, `/404.html`, `/dev-404-page`) probably do not filter either, so 404 pages are likely in the sitemap.
  - Client-only bracket paths such as `/startups/[...slug]` also end up in the sitemap.
- Other consumers: `scripts/check-links-post-build.js` and `scripts/check-src-links.js` read `public/sitemap/sitemap-0.xml`.

**`robots.txt`** is the static file `static/robots.txt`:
```
User-agent: Googlebot / Bingbot / DuckDuckBot / Yeti  →  Disallow: /*.md$   (each its own block)
Sitemap: https://posthog.com/sitemap/sitemap-index.xml
```
There is no generic `User-agent: *` block, so AI crawlers are allowed everything.

**gatsby-plugin-manifest** produces `/manifest.webmanifest`, `/icons/icon-*.png`, favicon, apple-touch-icon, and the `<link rel="manifest">` and `<meta name="theme-color" content="#E5E7E0">` tags.
- Settings: name "PostHog | How developers build successful products", short_name "starter", display minimal-ui.
- Icon source: `src/images/posthog-icon-white.svg`.

### 1g. JSON artifacts written to `public/`
- **`/post-build-data.json`**, from onPostBuild GraphQL. Fields:
  - `allRoadmap`
  - `allMDXPosts` (blog, compare, tutorials, customers, spotlight, founders, product-engineers, features and newsletter posts that have a date)
  - `blog`
  - `docsHandbook` (with contributors, lastUpdated from git, timeToRead, excerpt)
  - `tutorials`
  - `customers`
  - `careers` (Ashby, customFields filtered to Timezone(s) and Salary)
- It is served publicly. `scripts/run-post-build-tasks.ts` fetches it from `https://posthog.com/post-build-data.json`.
- **`/standard-site-documents.json`** is a manifest written by `gatsby/standardSite.ts`, only when `STANDARD_SITE_SYNC=true`. The same step upserts AT Protocol `site.standard.document` records (rkey = blog filename) to the posthog.com PDS. That needs `BSKY_APP_PASSWORD`, and dry-run mode is supported.
- **`/videos-metadata.json`** and **`/openapi.json`** (see 1b).

### 1h. OG images
These are built outside the site build.
- **Workflow:** `.github/workflows/og-images.yml`, triggered on a successful production `deployment_status`. It runs `pnpm og-images` → `scripts/run-post-build-tasks.ts og` → `createCareersOG` and `createOGImages` in `gatsby/postBuildTasks.ts`.
- **Rendering:** Puppeteer at 1200×630 JPEG, quality 100. HTML templates in `src/templates/OG/{blog,docs-handbook,customer,job}.js`. The Matter font comes from `CLOUDFRONT_FONT_URL`.
- **Filename:** the slug with all `/` removed, plus `.jpeg`. Examples: `/blog/foo` → `blogfoo.jpeg`; the careers image is `careers-og.jpeg`, a screenshot of the live `https://posthog.com/careers-og/`.
- **Hosting:** the workflow runs `aws s3 sync og-images/` to `OG_IMAGES_S3_BUCKET` with cache-control 1 year. They are served from `GATSBY_CLOUDFRONT_OG_URL=https://d36j3rcgc2qfsv.cloudfront.net` (set in `.env.production`).
- **Which pages use them:** BlogPost, Handbook (docs and handbook), Tutorial, Job and careers pages set `image=${GATSBY_CLOUDFRONT_OG_URL}/<slugNoSlashes>.jpeg` with `imageType="absolute"`.
- **Other pages** use static `/images/og/*.png|jpg` or the default `/images/og/default.png`.
- The Strapi sync (`strapi-sync.yml` → `createOrUpdateStrapiPosts`) also reads post-build-data.

### 1i. Static `.well-known` and other agent-relevant static files (`static/`, copied as-is)
- `/.well-known/security.txt`
- `/.well-known/pgp-key.txt`
- `/.well-known/microsoft-identity-association.json`
- `/.well-known/site.standard.publication/blog`, containing `at://did:plc:go7eemqz4y5nhonj4kg5w2p6/site.standard.publication/blog`
- `/.well-known/oauth/{webmcp,hogli,desktop-announcements-admin,visual-review}/client-metadata.json` and `logo.png`
- `/stripe/llm-context.md`
- `/docs/references/version-unavailable.md`
- `/scripts/theme-init.js`
- `static/_headers`, which only Cloudflare Pages previews use (see section 3)

## 2. Per-page head tags

### 2a. From `src/html.tsx` (every page)
- `<html lang="en" {...htmlAttributes}>`
- `<meta charset=utf-8>`
- `x-ua-compatible ie=edge`
- viewport `width=device-width, initial-scale=1, shrink-to-fit=no`
- `<meta name="naver-site-verification" content="a58db4b98c2bf9e4b52a4aa0c20fcf1fcdab2793">`
- preload of `/fonts/squeak-bold-webfont.woff2` and `.woff` (crossorigin)
- `<script src="/scripts/posthog-init.js">` if `GATSBY_POSTHOG_API_KEY` and `GATSBY_POSTHOG_API_HOST` are set
- `<meta http-equiv="origin-trial" content=GATSBY_WEBMCP_ORIGIN_TRIAL_TOKEN>` if set
- `<body class="light" data-wallpaper="keyboard-garden" data-reduce-transparency="false">`
- `gatsby-ssr.js` adds a pre-body `<script src="/scripts/theme-init.js">` and removes the autolink-headers inline script.

### 2b. From `src/components/seo.tsx` (react-helmet; `titleTemplate` is `%s`, so the title is used verbatim)

**Inputs**
- Props: `title`, `description`, `image`, `article`, `canonicalUrl`, `noindex`, `imageType`, `lang`, `languageAlternates`, `structuredData`, `documentRkey`.
- Defaults from `siteMetadata`:
  - description: "The single platform for engineers to analyze, test, observe, and deploy new features. Product analytics, session replay, feature flags, experiments, CDP, and more."
  - image: `/images/og/default.png`
  - siteUrl: `https://posthog.com`
  - twitter: `@PostHog`
- Image URL: if `imageType` is `'absolute'` or the image starts with http, use it as-is. Otherwise `${GATSBY_DEPLOY_PRIME_URL || siteUrl}${image || default}`.

**Tags emitted**
- `<title>`
- `<html lang>` only if the `lang` prop is passed. **No caller passes it.**
- `<meta name="robots" content="noindex">` when `noindex` is set
- `<meta name="description">`
- `<meta name="image">`
- **canonical:** `<link rel="canonical" href>`. Uses `canonicalUrl` (made absolute if it starts with `/`), else `${siteUrl}${pathname}`. Gatsby paths have no trailing slash.
- On `/blog*`: `<link rel="site.standard.publication" href="at://did:plc:go7eemqz4y5nhonj4kg5w2p6/site.standard.publication/blog">`
- When `documentRkey` is set (BlogPost under `/blog/` only): `<link rel="site.standard.document" href="at://did:plc:…/site.standard.document/<filename>">`
- **hreflang:** `<link rel="alternate" hreflang href>` for each `languageAlternates` entry. **No caller passes any, so no hreflang is emitted today.**
- **Every page:** `<link rel="llms.txt" href="https://posthog.com/llms.txt">`
- **Markdown alternate:** `<link rel="alternate" type="text/markdown" href="https://posthog.com<path without trailing slash>.md">`, only when `isMarkdownContentPath(pathname)` is true:
  - pathname starts with `/docs/`, `/handbook/`, `/blog/`, `/newsletter/`, `/changelog/`, `/pocket-guides/` or `/pricing/`
  - or is exactly `/changelog` or `/pricing`
- **Open Graph:** `og:url` (= `siteUrl + pathname`, **not** the canonical), `og:type` (`article` or `website`), `og:title`, `og:description`, `og:image`.
- **Twitter:** `twitter:card=summary_large_image`, `twitter:creator=@PostHog`, `twitter:title`, `twitter:description`, `twitter:image`, `twitter:site=@PostHog`.
- **JSON-LD:** one `<script type="application/ld+json">` per item in `structuredData`.

### 2c. JSON-LD sources
- **`buildProductStructuredData`:** SoftwareApplication (offer price 0 USD, `url https://posthog.com/<slug>`, publisher) + Organization (`POSTHOG_ORGANIZATION`: logo `/brand/posthog-logo-stacked.png`, sameAs twitter/github/linkedin, SF address) + an optional FAQPage. Used by:
  - `src/pages/index.tsx`
  - `src/pages/desktop.tsx`
  - `src/pages/cdp/index.tsx`
  - `src/pages/slack/index.tsx`
  - `Products/Slides/SlidesTemplate.tsx` (product pages)
  - Lenny, Startups, Students, CommunityIncubator
- **`src/pages/research.tsx`:** one ScholarlyArticle per publication.
- No other ld+json exists. Blog, docs and changelog have none.

### 2d. Per-template conventions worth matching
- **BlogPost:** title `seo.metaTitle || "<title> - PostHog"`; description `seo.metaDescription || excerpt`; `article`; CloudFront OG image; `documentRkey`.
- **Handbook (docs and handbook):** title `seo.metaTitle || "<title> - <Docs|Handbook> - PostHog"`; `article`; CloudFront OG image; `noindex` if frontmatter `noindex` **or `featureFlag`**.
- **Tutorial:** `"<title> - PostHog"`, `article`, CloudFront OG image.
- **SdkReference / SdkType:** `canonicalUrl` set to the unversioned path; `noindex` when the version is not latest.
- **Hogpedia:** explicit canonicals. **Plain.js:** `noindex` if `isInFrame || noindex`.
- **Changelog:** "Changelog - PostHog".
- **noindex pages:** 404, `/r/*`, `/code/open`, `/careers-og`, `/team-updates`, `/reset-password`, profile and edit pages, `/docs/references/version-unavailable`.

### 2e. Plugin-injected head tags
- rss alternate on every page; changelog.rss alternate on `/changelog*` only
- `<link rel="sitemap" href="/sitemap/sitemap-index.xml">`
- manifest, theme-color and favicon links

## 3. What vercel.json and middleware.ts expect from the build output

### vercel.json
Keys: `git`, `headers`, `rewrites`, `redirects`. There is **no** `buildCommand`, `outputDirectory`, `cleanUrls`, `trailingSlash` or `framework` key, so those come from the Vercel dashboard (Gatsby preset, so `public/`; I could not verify this from the repo). `git.deploymentEnabled` is `{master: true, "*": false}`.

**Headers (9 entries)**
- `Vary: Accept` on `/docs/:path*`, `/handbook/:path*`, `/blog/:path*`, `/newsletter/:path*` and `/changelog`.
- `/(.*\.md)` gets `Content-Type: text/plain; charset=utf-8`.
- `/.well-known/oauth/:app/client-metadata.json` gets `application/json` and `max-age=3600`. `logo.png` gets `max-age=86400`.
- `/(.*)` gets `Content-Security-Policy-Report-Only` (a long allow-list, reporting to `us.i.posthog.com/report`) and `Reporting-Endpoints`.

**Rewrites (13).** These assume Gatsby's **directory/index.html layout, with literal bracket directories for client-only routes**:
- `/docs/references/:slug(.*-\d.*).md` → `/docs/references/version-unavailable.md`
- `/docs/references/:slug(.*-\d.*)` → `/docs/references/version-unavailable/index.html`
- `/community/profiles/:path*` → `/community/profiles/[id]/index.html`
- `/teams/:path*` → `/teams/[slug]/index.html` (listed twice)
- `/next-steps/(.*)` → `/next-steps/index.html`
- `/questions/:path((?!topic).*)` → `/questions/[permalink]/index.html`
- `/careers/(.*)` → `/careers`
- `/posts/:path*` → `/posts/[slug]/index.html`
- `/startups/:path*` → `/startups/[...slug]/index.html`
- `/docs/{product-analytics,ai-observability,session-replay}/learn/:path*` → `…/learn/[...chapter]/index.html`
- Pages with a Gatsby `matchPath` but no Vercel rewrite: `/events/*` (`[strapiID]`), `/for/*` (`[...path]`), `/fm/mixtapes/edit/[id]`.

**Redirects (1,554 total; with rewrites and headers that is 1,576 routes, under Vercel's 2,048 cap)**
- By status:
  - 1,406 have no status, which defaults to 308
  - about 145 are 301
  - 2 are 302
  - 1 is `permanent: true`
- 581 use the `:ext(\.md)?` → `:ext?` pattern so that `/docs/x.md` redirects alongside `/docs/x`. `scripts/generate-md-redirects.js` maintains this, and CI runs it in `checks.yml`.
- 8 use `has` query conditions (`/pricing?product=…` to product pricing pages).
- 8 go to external URLs: `/signup`, `/login`, `/status`, `/coupons/*`, `/startups/apply`, `/students/apply`, `/yc-onboarding`, `/youreastar`.
- **Locale handling** is only `/ko` → `/` (302) and `/ko/newsletter/:path*` → `/newsletter/:path*` (301). Nothing else is locale-aware.

**Trailing slash and file layout**
- `gatsby-config` sets `trailingSlash: 'never'`. Gatsby 4 still writes `public/<path>/index.html`. Links, canonicals and sitemap URLs have no trailing slash.
- `.md` siblings sit at `public/<path>.md`, next to the `<path>/` directory.
- `src/scripts/move-index.sh` (the `build-move` script, used for Amplify/Cloudflare, **not** the default `build`) flattens to `/<path>.html`. The link checker accepts both layouts.

### middleware.ts (Vercel Edge Middleware, not Next.js)
- **Matcher:** `/docs/:path*`, `/handbook/:path*`, `/blog/:path*`, `/newsletter/:path*` and exact `/changelog`. Not `/pricing` or `/pocket-guides`.
- **When it acts:** the `Accept` header contains `text/markdown`, **or** the User-Agent matches `\b(ChatGPT-User|Claude-User|Perplexity-User)\b` (case-insensitive). Other bots, such as Googlebot and ClaudeBot, get HTML.
- **What it does:**
  1. Strip the trailing `/`. Skip if the path is empty or already ends in `.md`.
  2. `fetch(origin + pathname + '.md', {accept: 'text/plain'})`. This goes back through Vercel, so redirects apply.
  3. If the response is OK, return its body with `content-type: text/markdown; charset=utf-8`, the upstream cache-control (or `public, max-age=0, must-revalidate`), and `vary: Accept, User-Agent`.
  4. Otherwise return `undefined`, which falls through to the static HTML.
- It exists because static files take precedence over vercel.json rewrites. **The build must therefore emit `<path>.md` at exactly the pathname without a trailing slash.**
- There is no locale logic in the middleware.
- Tests: `middleware.test.ts`.

### Serverless functions
- **Vercel root `api/`:**
  - `apply.js`: multipart job application → Ashby `applicationForm.submit`
  - `hogwatch-evaluate.js`: POST, scores YouTube channels via the YouTube API (`YOUTUBE_API_KEY_HW3000`)
  - `hubspot.js`: create a HubSpot contact
  - `luma-events.js`: proxies upcoming events from the Luma calendar
  - `mailchimp.js`: adds a tag to a Mailchimp member
  - `notion-events.js`: queries a Notion events database, past 90 days onward, `s-maxage=300`
  - `posthog-desktop-pricing.js`: GET, model pricing from the gateway plus sandbox compute pricing, `s-maxage=3600, swr=86400`
- **Gatsby Functions in `src/api/`** (also under `/api/*`):
  - `contact-event.ts`: server-side PostHog capture
  - `customer.ts`: Squeak customers lookup by domain
  - `homepage-hits.js` and `signup-count.js`: read PostHog shared-insight JSON
  - `hubspot-form.ts`: fetch a HubSpot form definition
- **`functions/api/posthog-desktop-pricing.ts`:** a Cloudflare Pages Function (`onRequestGet`) for preview deploys only. `deploy-preview.yml` runs `wrangler pages deploy public`, and `static/_headers` (X-Frame-Options and cache rules for `/brand`, `/images`, `/wp-content`, `/static`) only applies there.
- **Dev only:** `gatsby-config.developMiddleware` mounts `luma-events`, `notion-events` and `posthog-desktop-pricing`.

## 4. Code that depends on Gatsby internals or build output
- **Built HTML:** `generateRawMarkdownPages` scrapes `public/<slug>/index.html`. It depends on the `<title>` format, on `<main>` and `<article>`, and on specific DOM classes and roles: `div.my-4`, `div.code-block`, `button[role=tab]`, `[role=tabpanel]`, `.token-line`, `[data-radix-scroll-area-viewport]`, `#toc`/`#mobile-toc`, `img.dark:hidden`, `[data-md-export=skip]` and the aria-labels of the markdown buttons. **An Astro port must keep this markup or generate markdown from the source instead.**
- **`public/page-data`:** nothing in the build or scripts reads it. The only mention is a comment in `src/hooks/productData/endpoints.tsx` ("squeakId from page-data", meaning page context).
- **GraphQL internals:**
  - `SitePage.searchContentId` is a schema proxy of `context.id` (`createSchemaCustomization.ts:757`). Algolia uses it to join pages to their MDX.
  - Algolia (`gatsby/algoliaConfig.js`, gatsby-plugin-algolia; only when the `GATSBY_ALGOLIA_APP_ID`, `ALGOLIA_API_KEY` and `GATSBY_ALGOLIA_INDEX_NAME` env vars are set) builds records from `allSitePage` (path, component), `allMdx`, `allTool` and `allSqueakTeam`. Record fields:
    - `id`, `title`, `type` (decided by regex rules)
    - `slug`, `fields.slug`
    - `path_ranking` (canonical 0, content 1, generic 10, community 15)
    - `canonicalTerms`, `headings` (with github-slugger fragments)
    - `rawBody`, `excerpt`
  - Static `src/pages/*` components are included unless the filename starts with `_` or a capital letter, or contains brackets.
  - Exclusion patterns cover hogpedia, `/r`, `/posts`, `/code`, `/connect`, `-diagram`, file extensions, and others.
  - Index settings come from `gatsby/algoliaSettings.json`.
- **Generated sitemap:** `scripts/check-links-post-build.js` and `check-src-links.js` read `public/sitemap/sitemap-0.xml`.
- **Built pages:** `scripts/preview/build-preview-comment.mjs` checks `public/<slug>/index.html` to decide which pages were built.
- **Published JSON:** the GitHub Actions for OG images and Strapi sync fetch the live `/post-build-data.json`, so that URL and its shape must keep working.
- **Runtime fetches** that expect these files to exist: `/videos-metadata.json` (useVideos), `/platform.md` (WebMCP tool in `src/components/WebMCP/index.tsx`), `/llms.txt` (linked from the 404 BlueScreen and from navs).
