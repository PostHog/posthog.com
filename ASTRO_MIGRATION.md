# Gatsby to Astro migration log

This file records each step of the move from Gatsby 4 to Astro 7, what broke, and what fixed it. Read it top to bottom; newest steps are at the end.

## Goal

- Run posthog.com on Astro (static output) instead of Gatsby, with every existing page and feature.
- Keep SEO and AEO outputs: per-page `.md` siblings, `llms.txt`, `llms-full.txt`, `robots.txt`, sitemap, RSS feeds, canonical and Open Graph tags, the `Accept: text/markdown` middleware.
- One page window at a time. The chrome (taskbar, desktop) stays mounted between pages, so nothing blinks. The window has a windowed state and a maximized state, and the visitor can close it to see the desktop.
- Every file in `contents/` compiles under MDX 3.
- Remove Gatsby and all Gatsby-specific code by the end.

## Decisions

| Decision | Reason |
|---|---|
| Keep the React components. Replace Gatsby around them. | 1,650 source files. Rewriting them in `.astro` is not necessary to drop Gatsby, and React islands keep all interactivity. |
| Compile MDX to React with `@mdx-js/rollup`, not `@astrojs/mdx`. | `@astrojs/mdx` renders MDX as Astro components, so React components inside docs (tabs, code blocks, steps) would be static HTML. Compiling to React keeps them interactive inside the page island. |
| Treat `.md` files as MDX. | Gatsby did the same. 1,365 `.md` files contain JSX. |
| Static output. Keep `vercel.json`, `middleware.ts`, and root `api/` as Vercel features. | Same deploy model as today. No adapter needed. |
| Persist the chrome with `<ClientRouter />` and `transition:persist`. No transition animations. | Keeps the taskbar and desktop mounted between pages in every browser, so there is no blink. |
| Rename `GATSBY_*` env vars to `PUBLIC_*`. | Vite exposes only `PUBLIC_*` vars to the browser. **The Vercel project env vars need the same rename** (list below). |
| Generate `llms-full.txt`. | It did not exist before (only `llms.txt` did). Added because the migration brief lists it. |

## Steps

### 1. MDX 3 compile check

- Added `scripts/check-mdx.mjs`. It compiles every file in `contents/` with the same options the build uses (`src/lib/mdx/options.mjs`) and lists failures.
- First run: 1,312 of 3,761 files compiled. 1,918 failures were `this.getData is not a function`, and 282 were `this.setData is not a function`. Cause: the root `remark-gfm` was v3 (unified 10, for `react-markdown` 8), and MDX 3 needs unified 11.
  - Fix: upgraded `react-markdown` 8 to 9, `remark-gfm` 3 to 4, `rehype-sanitize` 5 to 6, and `@mdx-js/react` 1 to 3. (`react-markdown` 9 changed its API in ways that showed up later in the build; see step 24.)
- Second run: 3,509 of 3,761 compiled. 215 of the 252 failures were HTML comments (`<!-- -->`), which MDX 2+ rejects.
  - Fix: `scripts/astro-migration/codemod-html-comments.mjs` rewrites them to `{/* */}` outside code fences and inline code. It changed 216 files. It is safe to rerun after a rebase.
- Third run: 3,724 of 3,761 compiled. The 37 remaining files had one-off syntax problems (see step 2).

### Tooling notes

- `pnpm add` fails under the repo's `trustPolicy: no-downgrade`, because it re-checks old locked packages. Edit `package.json` and run `pnpm install` instead.
- `pnpm install` flagged packages that were already locked in master: `semver@5.7.2`/`6.3.1` (Babel, now only through `kea-typegen`) and `chokidar@4.0.3` (through `sass`, a Vite peer). Only those exact versions are in `trustPolicyExclude` in `pnpm-workspace.yaml`. They are still needed after Gatsby's removal. **Review this.** New packages are still checked.

### 2. Hand fixes for the last 37 MDX files

MDX 3 is stricter than MDX 1 in these ways. Each fix is the smallest edit that keeps the rendered text the same.

| Problem | Fix | Files |
|---|---|---|
| `<` before a digit, `$`, or `=` in prose (`<1%`, `<$10/mo`, `<= 1.25`) starts a JSX tag | `&lt;` | 18 |
| `<\>`, `Array<Product\>`, `'<'`, `'<ph_client_api_host>'` | escape as `\<` | 6 |
| Template placeholders such as `{loom_link}` in prose are JS expressions | escape as `\{ \}` | 1 (96 placeholders) |
| Autolink `<https://...>` is a JSX tag | `[https://...](https://...)` | 1 |
| A tag opens and closes on different lines inside a paragraph (`<details><summary>`, `<p>`, `<small>`, `<li>`, `<Link>`) | put the tags on one line, or on their own lines with blank lines around the Markdown | 8 |
| "Lazy line": a list item or blockquote continues without its indent or `>` | indent the line, or add `>` | 4 |

Result: `node scripts/check-mdx.mjs` reports 3,761 of 3,761 files compile.

Note for review: `contents/docs/libraries/rudderstack.md` now shows `<ph_client_api_host>` as literal text. MDX 1 read it as an unknown HTML tag, so the placeholder was already not filled in.

### 3. Page components move to `src/views`

- Astro routes `.astro`, `.md`, `.js`, and `.ts` files in `src/pages`. The Gatsby page components there include `.js` files (`404.js`, `apps.js`, `demo.js`, …), which Astro would treat as API endpoints.
- Fix: `git mv src/pages src/views`. Three imports pointed into `pages/` (`EventForm`, `templates/Event`, `templates/Hub/Tag`) and now point into `views/`. Astro route files go in a new `src/pages`.

### 4. JSX in `.js` files

- Babel accepted JSX in `.js`; Vite (Rolldown and Oxc) does not.
- Fix: renamed the 96 `.js` files that contain JSX to `.jsx`. One import named the extension (`components/Home/CTA.js` in `Pricing.tsx`) and was updated.

### 5. Env vars

- Vite exposes only `PUBLIC_*` variables to browser code. Gatsby exposed `GATSBY_*`.
- Fix: in `src`, `process.env.GATSBY_X` became `import.meta.env.PUBLIC_X` (94 files). `.env.development` and `.env.production` were renamed to match.
- `pricingLogic.ts` read `process.env.BILLING_SERVICE_URL` in the browser. Gatsby never exposed that variable, so the URL was `undefined/api/...`. It now reads `PUBLIC_BILLING_SERVICE_URL`, which both `.env` files set.
- `src/api/customer.ts` read the secret `GATSBY_SQUEAK_CUSTOMERS_API_KEY`. It is now `SQUEAK_CUSTOMERS_API_KEY`.
- **Vercel action needed:** rename every `GATSBY_*` project env var to `PUBLIC_*` (the secret above loses the prefix), and add `PUBLIC_WAIT_FOR_FLAGS` and `PUBLIC_BILLING_SERVICE_URL`.

### 6. Gatsby and Reach Router APIs

`scripts/astro-migration/codemod-imports.mjs` moves named imports to replacement modules (223 files). It skips `contents/`, because code samples there contain Gatsby imports that must stay as written.

| Gatsby API | Replacement |
|---|---|
| `Link`, `navigate` (`gatsby`), `useLocation`, `useNavigate` (Reach Router), `PageProps` | `src/lib/navigation.tsx`. A page change goes through Astro's ClientRouter. A change to only the query string or hash uses the History API, so the page island re-renders and does not remount. Its capture-phase `popstate` listener stops Astro from refetching the page when the visitor goes back through query changes. |
| `GatsbyImage`, `getImage`, `getImageData`, `IGatsbyImageData` | `src/components/Image` (`ResponsiveImage`, `getImage`, `getImageData`, `ResponsiveImageData`). The data layer keeps the `childImageSharp.gatsbyImageData` shape and fills it with Cloudinary URLs. |
| `StaticImage` | Removed. It was imported in 40 files and rendered in none. |
| `MDXRenderer` (`gatsby-plugin-mdx`) | `src/components/MDXRenderer`. `body` is now a content key (the module path). The module loads lazily, and server rendering waits for it. |
| `useBreakpoint` (`gatsby-plugin-breakpoints`) | `src/hooks/useBreakpoint.ts`, with the same media queries. |

### 7. All content is `.mdx`

- Renamed the 1,846 `.md` files in `contents/` to `.mdx` (`git mv`, so history follows). Gatsby compiled them as MDX already; now the extension says so.
- Updated the six content imports that named a `.md` file, and the handbook file list in `scripts/hogfm/handbook/generate.py` (plus its docs).
- Page URLs do not change: slugs come from the path without the extension.
- The only `.md` content left is from the posthog/posthog clone (see step 9). It is plain GitHub Markdown, with placeholders such as `<TOKEN>` that are not JSX. `src/lib/mdx/options.mjs` (`formatFor`) compiles those files as Markdown with raw HTML (`rehype-raw`) and everything else as MDX. Six of its 40 files failed as MDX.
- `node scripts/check-mdx.mjs` now also covers the clone: 3,801 of 3,801 compile.

### 8. ESM package

- `package.json` has `"type": "module"`. The MDX toolchain is ESM-only, and TypeScript tools (`tsx`, Node type stripping) treat `.ts` as CommonJS without it.
- `postcss.config.js` and `tailwind.config.js` became `.cjs`. Six CommonJS scripts became `.cjs` (`generate-md-redirects`, `check-src-links`, `check-product-changelogs`, `fix-mdx`, `check-links-post-build`, `generate-mcp-rest-mapping-candidates`), and their references in `package.json` and `.github/workflows` were updated.
- The Vercel functions in `api/` mixed `require` with `export default`. They are now ESM throughout.
- Added `tsx` to run TypeScript scripts.

### 9. Data layer (replaces GraphQL)

`src/data-layer/` replaces Gatsby's node store and GraphQL:

- `sources/*.ts`: one `Source` per API. Each one fetches once at startup and writes `.cache/data-layer/nodes/<Type>.json`. Node type names match the Gatsby types (`SqueakTeam`, `ProductData`, …), so ported queries read familiar data.
- A source lists the env vars it `requires`. Without them it writes `fake()` data, so the site builds and renders with no production keys. When a public API fails, the source keeps its last cache, or writes fake data if there is none. `DATA_LAYER_STRICT=1` makes failures fatal (for CI).
- `content.ts`: the content index, the `Mdx` node replacement. It keeps `fields.slug`, `frontmatter`, `rawBody`, `headings`, `excerpt(n)`, `timeToRead`, `isFuture`, and `parent`. Frontmatter Cloudinary images get the `childImageSharp.gatsbyImageData` shape (`images.ts`). Parsed files are cached by modification time: 13 s cold, 0.3 s warm.
- `queries/*.ts`: one named query per former `useStaticQuery`. `writeQueries()` writes `.cache/data-layer/queries/<name>.json`, and components import `@data/<name>.json`. There is no GraphQL and no virtual module, only JSON that Vite bundles.
- `posthogRepo.ts`: the posthog/posthog clone (`docs/published`, `docs/onboarding`, `SKILL.md`) is now a shallow sparse git clone in `.cache/posthog-main-repo`, about 6 s. It replaces `gatsby-source-git`. The branch env var is `POSTHOG_BRANCH` (was `GATSBY_POSTHOG_BRANCH`).
- `integration.ts`: an Astro integration that runs all of this in `astro:config:setup`, before Astro starts. CI builds refetch. Local runs reuse data younger than a day (`DATA_LAYER_MAX_AGE` overrides this, in hours).
- Improvement: without the Cloudinary admin key, Gatsby returned `gatsbyImageData: null`, so frontmatter images were missing locally. Image URLs now come from the public ID alone.

### 10. Shell: one window, persistent chrome

- `src/layouts/Site.astro`: `<ClientRouter fallback="none" />` (no animations). The taskbar island (`islands/Chrome.tsx`) and the desktop island (`islands/Desktop.tsx`) use `transition:persist`, so they stay mounted between pages. Only the page island is swapped.
- An inline `astro:before-swap` handler copies the theme class, wallpaper, skin, transparency setting, window mode, and dismissed-hint classes onto the incoming page. Astro's router replaces `<body>` and the `<html>` attributes, and without this, dark mode flashed back to light.
- `islands/Page.tsx`: one island for every route. It lazy-loads the page component (a view or a template) by module path. Server rendering waits for lazy modules (`@astrojs/react` renders with `onAllReady`), so the HTML is complete.
- State shared across islands: React context cannot cross island roots, so `context/App.tsx`, `context/Toast.tsx`, and `hooks/useUser.tsx` now keep state in module-level stores (`lib/store.ts`, `useSyncExternalStore`). Hook names and fields are unchanged (`useApp`, `useAppActions`, `useToast`, `useUser`), so components did not change.
- `context/App.tsx` went from 3,131 lines to about 500. Removed: window positions, z-order, snapping, side-by-side, minimize, shareable multi-window URLs, and 1,100 lines of per-route window sizes. Kept: the dialog settings that still matter (fixed size, toolbar, close on Escape, modal type), site settings, panels, search, chat, sign-in dialogs, and keyboard shortcuts.
- Window modes: `<html data-window="windowed|expanded|closed">`. CSS sizes the page window from this attribute, so server HTML matches every mode and nothing jumps after load. Closing the window shows the desktop. The next page opens its window again.
- `components/AppWindow` is now one frame for the page and for dialogs. Dragging, resizing, and the framer-motion animations are gone.
- `lib/kea.tsx` replaces root `kea.js`. Removed `kea-router` and `kea-localstorage`: no logic used them.

### 11. SEO head without react-helmet

- `<SEO>` keeps its props. During server rendering it records the resolved tags in `lib/head.ts`, keyed by page path. `Site.astro` renders the page island first (`Astro.slots.render`) and then writes `<head>` from what was recorded (`components/Head.astro`). This is one render pass.
- `Head.astro` also writes the site-wide tags that Gatsby plugins added: the RSS alternates (`/rss.xml` everywhere, `/changelog.rss` on `/changelog*`), the sitemap link, the manifest, and theme-color.

### 12. Content collections

- `src/content.config.ts` defines one collection per content type: `docs`, `posthogDocs`, `handbook`, `posthogHandbook`, `productEngineerHandbook`, `blog`, `newsletter`, `compare`, `founders`, `productEngineers`, `spotlight`, `library`, `tutorials`, `customers`, `pocketGuides`, `templates`, `hogpedia`, `teams`, `apps`, `pages`. Each uses Astro's standard `glob()` loader.
- Folders, file patterns, and zod schemas are in `src/content/schemas.ts`. Docs and the handbook have different schemas: docs carry `availability`, `sourceId`, `templateId`, and platform fields, and the handbook carries byline fields. Schemas are loose objects: common fields are typed, and rarer keys pass through.
- `scripts/check-content.ts` validates every entry against its schema in one pass (Astro's sync stops at the first error). Result: 3,387 of 3,387 entries match.
- Entry IDs are the path in the folder with `index` collapsed, so URLs are unchanged.
- Why not `@astrojs/mdx`: it compiles MDX to Astro components, so React components in docs would render as static HTML unless each got a `client:` directive. Compound components (`<Tab.Group>` with `<Tab.Panel>`) would break, because their children become static slots outside the React tree. Instead, `src/lib/mdx/integration.mjs` (about 50 lines) registers an `.mdx` content entry type, so `glob()` can load the files. It provides frontmatter and headings (in `rendered.metadata.headings`, where Astro keeps them), and pages render the body through `components/MDXRenderer`.

### 13. MDX 1 features the components relied on

- Code fence meta (`file=app.js`, used 801 times, plus `runInPostHog`, `focusOnLines`, `label`): MDX 1 passed these as props on `<code>`, and MDX 3 drops them. `src/lib/mdx/rehype-code.mjs` parses the meta string back into props.
- Inline code: MDX 1 had an `inlineCode` component, and MDX 3 renders inline and block code as `code`. The same plugin turns inline code into `inlineCode`. Templates map it as before, and `MDXRenderer` falls back to `<code>`.
- `mdxType`: MDX 1 added the element's name as a prop to every element. `MdxCodeBlock` and the Pocket Guides reader read it. Both now check component identity and `language-*` classes instead.

### 14. Routes

- Standard Astro routing: one route file per content type, with `getStaticPaths` from `getCollection()`.
  - `src/pages/docs/[...slug].astro`: the `docs` and `posthogDocs` collections. On a clash, `contents/` wins. Entries without a title are fragments, and no page is built for them (Gatsby did the same).
  - `src/pages/handbook/[...slug].astro` and `src/pages/product-engineer/[...slug].astro`.
- `src/pages/[...page].astro` serves the page components in `src/views`, using Gatsby's file-based paths (`src/lib/routes/views.ts`). Section routes skip any URL a view owns.
- `src/lib/content/` builds typed template props from entries. `readerPage.ts` holds the shared reader page shape, and `docs.ts` and `handbook.ts` hold the builders. `people.ts` provides authors (`authors.json` joined to Squeak profiles) and git contributors.
- `templates/Handbook.tsx` now takes `{ page: ReaderPage & DocsExtras }` instead of GraphQL `data` and `pageContext`.
- Dropped from docs pages: `AppParameters` (plugin options read from each app's GitHub repo). Those app docs no longer exist, so the component renders nothing.

### 15. API functions

- The five Gatsby Functions in `src/api/` (`contact-event`, `customer`, `hubspot-form`, `homepage-hits`, `signup-count`) moved to the root `api/` folder as Vercel functions, typed with `@vercel/node`. `contact-event` accepts a parsed or a raw JSON body, because Gatsby passed a string and Vercel parses JSON.
- `src/lib/devApi.ts` serves `api/*` during `astro dev`, with Vercel's `req.query`, `req.body`, `res.status`, `res.json`, and `res.send`. This replaces `developMiddleware` in `gatsby-config.js`.

### Tooling and dependencies

- TypeScript 4.0 → 6.0 (`@astrojs/check` supports 5 and 6, not the native 7). `tsconfig.json` extends `astro/tsconfigs/strict`, uses `react-jsx`, and lists import roots in `paths` (TypeScript 6 deprecates `baseUrl`). `verbatimModuleSyntax` is off for now, because much existing code imports types without `type`.
- `@types/react` 16 → 18 (it lacked `useSyncExternalStore`).
- The pnpm trust policy now excludes `semver@5.7.2 || 6.3.1` and `chokidar@4.0.3`. All three versions were already in master's lockfile. **Review this.**
- Removed: `kea-router`, `kea-localstorage` (unused), `lodash.groupby`, `lodash.uniqby`, `lodash.get` (duplicates of `lodash`), the old `unist-util-visit@1` (only Gatsby remark plugins used it), and `@types/react-helmet`.
- Named imports from CommonJS `lodash` fail in Node ESM, so the three files that used them import `lodash/<function>`.
- `CodeBlock/languages.tsx` used `require()` for Prism languages. They are ES imports now, after `prismGlobal.ts` defines the `Prism` global the language files expect.
- Two `.js` files with JSX that the first rename missed (`BlockQuote`, `InlineCode`) were found by parsing and renamed. The OG image templates in `src/templates/OG` are Node scripts and stay `.js`.

### 16. Static queries (115 components)

Every `useStaticQuery(graphql`...`)` became a named, typed query in `src/data-layer/queries/` that writes JSON at startup. The component imports that JSON (`@data/<name>.json`) and casts it to the query's return type. Four agents did this in parallel, by data source, following `scripts/astro-migration/notes/static-query-conversion.md`.

| Module | Queries | Covers |
|---|---|---|
| `people.ts` | 23 | Squeak profiles and teams, Ashby jobs, team pages, crests, careers, events form |
| `roadmap.ts` | 15 | Roadmap, changelog filters, milestones, early access features, topics, post categories, achievements, rewards |
| `products.ts` | 12 | Billing products (four near-copies became one query), pipelines and sources, MCP tools, agent skills, testimonials, merch, templates |
| `content.ts` | 30 | Content lists: tutorials, blog taxonomy, docs platform lists, pocket guides, Hogpedia, customer stories, home page and wizard MDX, skill files |
| `navs.ts` | 2 | Data pipeline and source menus |

What changed beyond the conversion:
- The shapes are simple and typed (no `allX.nodes`, `edges.node`, or `childImageSharp`). Components read the new shapes.
- Payloads were trimmed where a query shipped more than its component used. `useContentData` was 11.7 MB as a direct port and is now 356 KB (only the pages linked from product question lists). The team pages went from 713 KB to 59 KB (only roadmaps the page can show). The home hero went from every destination to 641 bytes.
- Sorting, filtering, limits, and date formatting moved into the queries (Gatsby did them in GraphQL).
- Bugs found and kept as they were, so output does not change:
  - Home/Roadmap read reactions from an array, so only Strapi likes counted.
  - New/Roadmap's "under consideration" count was always 0 (the query did not select the field).
  - The teams page's recently-shipped media never rendered (the query lacked the URL).
- Bug found upstream: `SelfDrivingPullRequest` finds no PRs, because the PR footer no longer contains the `posthog-code://inbox` marker. Gatsby had the same problem.
- `Home/Apps.jsx` imports `../PipelinesList`, which does not exist. It was already broken before the migration.
- Unused `graphql` and `useStaticQuery` imports were removed from five files.

### 17. Lint, format, type-check

- ESLint 7 → ESLint 10 with a flat config (`eslint.config.js`): `@eslint/js` recommended, `typescript-eslint` recommended, `eslint-plugin-astro`, `react-hooks/rules-of-hooks`, and `eslint-config-prettier`. `eslint-plugin-react` is dropped: it does not support ESLint 10, and TypeScript plus the hooks rule cover what mattered.
- Prettier 2 → 3, with `prettier-plugin-astro`. Same style settings.
- Type-checking: `pnpm typecheck` runs `astro check` (TypeScript 6). Lint: `pnpm lint`.
- lint-staged 10 → 17. It now covers `.astro`, `.jsx`, `.mjs`, and `.cjs`.
- Gatsby's dependency tree hoisted `@typescript-eslint/parser@4`, which broke ESLint 10. It is now a direct dev dependency at v8. This can go once Gatsby is removed.

### 18. Shell cleanup

- Removed `components/Wrapper`, `components/AppContainer`, and `hooks/useWindowLayoutAttributes` (the Gatsby shell; the layout and islands replace them).
- Removed `components/ActiveWindowsPanel`. With one window it has nothing to list, and the only way to open it was the `Shift+<` shortcut, which is gone too.
- The AppWindow router no longer renders `Handbook` or `BlogPost` from `pageContext`. Routes render their templates directly.
- `ContactSales` replaced Gatsby's `<Script>` with an effect that loads the script once after hydration.
- Window mode CSS (`global.css`): `<html data-window>` drives the page window's size. "Always full size on narrow screens" is now a container query on the desktop viewport.
- Follow-up (not done): about 20 `addWindow(<Dialog location={...} key=... newWindow />)` calls still pass the Gatsby-era `location` and `newWindow` props. They work (`addWindow` reads `location` as the window key), but the prop types do not declare them. `addWindow(element, { key })` is the new form.

### 19. Routes for every content type

Three agents ported the remaining templates, following `scripts/astro-migration/notes/route-porting.md`. Each template now takes typed props from a builder in `src/lib/content/`. All GraphQL is gone.

| URL | Route file | Template |
|---|---|---|
| `/blog/*`, `/newsletter/*`, `/compare/*`, `/founders/*`, `/product-engineers/*`, `/spotlight/*`, `/library/*`, `/tutorials/*`, `/customers/*` | `src/pages/<section>/[...slug].astro` | `BlogPost` (plus `Pagination`, `BlogCategory`, `BlogTag`, `tutorials/*` for listings in the same files) |
| `/posts`, `/<category folder>`, `/<folder>/<tag>` | `src/pages/[folder]/[...tag].astro` | `PostListing`, `Hub/Tag` |
| `/docs/api/<name>` | `src/pages/docs/api/[name].astro` | `ApiEndpoint` |
| `/docs/references/*` | `src/pages/docs/references/…` | `SdkReference`, `SdkType` |
| `/docs/cdp/<type>s/<slug>`, `/docs/cdp/sources/<slug>` | `src/pages/docs/cdp/[kind]/[slug].astro` | `DataPipeline`, `DataWarehouseSource` |
| `/docs/data-warehouse/sources/<slug>` | `src/pages/docs/data-warehouse/sources/[slug].astro` | `DataWarehouseSource` or `Handbook` |
| `/hogpedia/*`, `/hogpedia/category/*` | `src/pages/hogpedia/…` | `Hogpedia`, `HogpediaCategory` |
| `/events/<id>`, `/apps/*`, `/templates/*`, `/templates/workflow/*`, `/pocket-guides/*`, `/careers/<slug>`, `/questions/topic/<slug>` | one route file each | `Event`, `App`, `Template`, `WorkflowTemplate`, `Job`, `QuestionsTopic` |
| Plain pages (`/faq`, `/thanks`, `/founder-lab`, …) | `src/pages/[...plain].astro` | `Plain` |

Views that had page queries get their `data` from `src/lib/routes/viewData.ts`.

Deleted orphan templates: `Blog`, `Team`, `Home`, `Pipeline`, `tutorials/Tutorial` (its `ViewButton` moved to `components/ViewButton`), `merch/index`, `merch/Product`. Deleted `components/Tutorials/index.tsx`, which nothing imported.

Behavior differences to review:
- Job pages are built from whatever Ashby data exists, which means fake postings when there's no key. Gatsby needed both the Ashby and GitHub keys.
- Future-dated posts get no page. Gatsby's Plain catch-all used to serve them.
- `/docs/cdp/sources/planetscale`: the hand-written docs page now wins over the generated page. In Gatsby, the generated page replaced it.
- The blog feed's guid and link are canonical URLs now, and enclosure URLs are fixed (Gatsby wrote `https://posthog.comhttps://…`).

### 20. SEO and AEO outputs

`src/integrations/seoOutputs.ts` (`astro:build:done`) writes every output Gatsby's `onPostBuild` wrote, plus `llms-full.txt`. The logic moved out of `gatsby/` into `src/lib/seo/` with `git mv`, so history follows.
- Per-page `.md` files: built HTML → Markdown with the same turndown rules, page set, paths, and signpost.
- `llms.txt` (now also links `llms-full.txt`), and the new `llms-full.txt` (every docs page's Markdown, each with its title and URL).
- `pricing.md`, `platform.md`, product `.md`, `changelog.md` and yearly archives, `openapi.json` and per-operation `.md`, SDK reference `.md`, `post-build-data.json`, Standard.site sync, and Algolia indexing (when its keys are set).
- Sitemap at the same URL (`/sitemap/sitemap-index.xml`). Two rules that never fired in Gatsby (`/` = 1.0, weekly for `/blog` and `/compare`) now do. 404 and noindex pages are left out.
- RSS: `src/pages/rss.xml.ts` and `src/pages/changelog.rss.ts` with `@astrojs/rss`.
- `static/manifest.webmanifest`, icons, and favicon (gatsby-plugin-manifest generated these).
- The post-deploy OG image script moved from `gatsby/postBuildTasks.ts` to `scripts/post-build/tasks.ts`.

### 21. Content fixes instead of build-time shims

Rule: if something can be fixed in the content, fix the content once. No compile-time compatibility plugins.
- `scripts/astro-migration/codemod-jsx-attributes.mjs` (89 files): `style="a: b"` → `style={{ a: 'b' }}`, `class` → `className`, `for` → `htmlFor`. React rejects string styles. Attributes are found through the MDX syntax tree, so code samples are not touched.
- `scripts/astro-migration/codemod-code-meta.mjs` (192 files): code fence meta became JSX-attribute syntax (```` ```js file="app.js" ````), read by the standard `rehype-mdx-code-props` plugin.
  - Values with spaces now show in full. `file=React Native` used to show "React", because MDX 1 split the value at the first space.
  - A bare file name became `file="…"`, and `filename=` became `file=`.
  - `runInPostHog` is a boolean.
- Inline code: templates map `code` (MDX 3's name for it) in place of MDX 1's `inlineCode`. Block code still goes through `pre`.
- Five content files imported `gatsby` or `gatsby-plugin-image`. They now import `components/Link` and `components/Image`.

### 22. Hydration without blinking

- A page's component and MDX content load lazily. If hydration hits a lazy boundary, any shared-state update (the signed-in user, display settings, menu effects) makes React discard the server HTML and render on the client, which blinks.
- `src/islands/PageIsland.astro` loads the page component and main content before server rendering. The `client:page` directive (`src/islands/pageDirective.ts`, registered in `src/islands/integration.ts`) loads the same modules, plus every other MDX module the server rendered (listed in the page by the layout), before hydrating. Both sides render those modules without Suspense, so the trees match and hydration finishes in one pass.
- `AppWindow` subscribes only to what it needs and passes stable callbacks, so it does not re-render the page during hydration.
- Verified in the browser: the home page, a docs page, a handbook page, and a blog post hydrate with no errors.

### 23. Broken imports that webpack hid

Webpack turned a missing named export into `undefined`. Native ES modules refuse to load the module. `scripts/astro-migration/check-imports.mjs` lists every import of a name the target does not export. It found 16. All are fixed:
- `mdxGlobalComponents.js` imported 12 components that did not exist. They are removed, except `List`, which two pages use. It now uses the correct default import, so those pages work for the first time.
- `Handbook` default-imported `NewsletterForm`, which only has a named export.
- A content wrapper imported `NuxtInstallation`, which posthog/posthog's onboarding module does not export (and the wrapper did not use).
- Three type-only imports are now marked `import type`.
- Dead code removed: `src/mdxGlobalComponents.ts` (an unused twin of the `.js` file), `hooks/toast.tsx` (an old toast API; MaxAI now uses `context/Toast`), and six unused `Pricing/PricingTable` files with broken imports.
- Also fixed: `moment` (never a dependency, only hoisted by Gatsby) replaced with `dayjs`. A `data/…` import that only TypeScript could resolve became relative. The `graphql` package type became a local type.
- Two CommonJS packages (`react-medium-image-zoom`, `prism-react-renderer`) are in `vite.ssr.noExternal`, so their default export works during server rendering. Do not add `ssr.optimizeDeps` for them: it puts Astro 7's dev server into a mode where every route fails with "Unexpectedly unable to find a component instance".
- `check-imports.mjs` also checks named imports from `@posthog/icons` against the installed version. Icons get renamed between versions. `IconSettings` (in `docs/logs/start-here.mdx`, not used) was the only one. Other packages are not checked, because Node cannot list their type exports or CommonJS shapes.
- 26 content files named-imported `ProductComparisonTable`, which only has a default export. They now use the default import.

### 24. Production build

`pnpm build` (`astro build`) fixes, in the order the build found them:
- The posthog/posthog sparse clone's `docs/onboarding/tsconfig.json` extends a root tsconfig that the clone does not have, and Vite read it. The sparse-checkout patterns exclude it.
- LightningCSS rejects selectors that PostCSS let through: `:not('.article-content-ignore')` (the quotes were invalid CSS) and a stray `after:dark:` class in `Squeak/RichText`.
- `Job/Apply` threw at module load when the sticker env var was missing. It now logs a warning, so builds without that key work.
- The build needs `NODE_OPTIONS=--max-old-space-size=16384` (set in the `build` script). The dev server needs it too.
- `prismjs` is bundled into the server build. When Node loaded it from `node_modules`, the language imports were hoisted above `prismGlobal.ts`, and `prism-php` failed with "Prism is not defined".
- Astro 7 prerenders static pages in a separate Vite environment (`prerender`), which ignores `vite.ssr.noExternal`. `astro.config.mjs` sets `SSR_BUNDLED` for both `ssr` (the dev server) and `environments.prerender`.
- Duplicate paths: two OpenAPI groups map to one `/docs/api/*` URL, and some SDK references list a type twice. As with Gatsby's `createPage`, the last one wins (`apiEndpointPages`, `sdkTypePages`).
- `scripts/astro-migration/check-mdx-components.mjs` lists components that an MDX file renders but neither imports nor gets from a template. MDX 1 rendered an empty `<div>` for those; MDX 3 throws. It found eight at first, all fixed in the content:
  - Missing imports added: `DuckDBWaitlistSurvey` (a blog post), `UsageWarning` (a React Router snippet), `IngestionPipelinesList` (a snippet), `Close2` (an include).
  - `docs/sql`: `<DataWarehouseScreenshot>` never existed, so the screenshot never showed. It is now `<ProductScreenshot>`, like the rest of the page. **Visible change: the screenshot now shows.**
  - Removed tags that rendered nothing: `<AcademyCTA />` (never defined) and `<DotNetInstall />` inside the snippet that is itself `DotNetInstall`.
  - The checker matches each content folder to the template that renders it (`BlogPost` for posts and customer stories, `Handbook` for docs and the handbook, and so on), because a component provided by one template is undefined in another. That found two more:
    - `customers/mention-me` used `<FloatedImage>`, which `BlogPost` does not provide. It now imports it. **Visible change: the floated image now shows.**
    - 40 CDP docs pages wrap text in `<HideOnCDPIndex>`. Only the CDP index provides it (as `() => null`, to hide that text). On the docs pages, MDX 1's fallback `<div>` showed the text. The global shortcodes now include a pass-through `HideOnCDPIndex`, so the docs pages still show it and the index still hides it.
  - `docs/cdp/sources/clickhouse`: the snippet `import` followed a paragraph line with no blank line. MDX 3 reads that as text, so the import never ran. `scripts/astro-migration/codemod-esm-blank-lines.mjs` adds the blank line (one file).

- `{name}` in prose: MDX 1 printed it as text; MDX 3 evaluates it, so `Hi {name}` threw "name is not defined" at render time. `scripts/astro-migration/check-mdx-expressions.mjs` lists text expressions that use names the file does not define, and `--fix` escapes the ones that are only placeholder names (`\{name}`, the MDX 3 way to write a literal brace). It escaped 11, in 8 files (`{name}`, `{firstName}`, `{team-name}`, `{first_name}`, and similar). The output text is unchanged.

- `_frontmatter`: gatsby-plugin-mdx gave every MDX file a `_frontmatter` variable. Six docs pages used it, as `<FeatureAvailability availability={_frontmatter.availability.features.<key>} />`. `scripts/astro-migration/codemod-frontmatter-global.mjs` writes the value into the tag and removes `availability.features` from those files' frontmatter (nothing else reads it). The expression checker now also checks JSX attribute expressions.

- react-markdown 8 → 9 (step 1, for remark-gfm 4) changed three things the Markdown wrappers relied on. `/changelog` failed on the first one:
  - `pre` gets the `<code>` element as its only child, not an array, so the code text was `undefined` and Prism crashed. `codeText()` in `Squeak/components/Markdown.tsx` reads it (also used by `ClientPostMarkdown`).
  - `transformImageUri` is now `urlTransform`. The wrappers keep their `transformImageUri` prop and map it to `urlTransform` for `src`; other URLs go through `defaultUrlTransform`.
  - `className` is gone. Version 8 wrapped the output in a `<div>` for it, so the wrappers (and `People`) now render that `<div>` themselves.
- `ContactSales` called `useEffect` after an early return (from the step 18 port of Gatsby's `<Script>`). The effect now runs before the return.

### 25. CommonJS packages in an ES module package

`package.json` has `"type": "module"` (step 8). Vite 8 then gives every source file Node's CommonJS interop, in every build, the browser included: a default import of a CommonJS package with `exports.__esModule` is the whole `module.exports` object, not its `default`. React then fails with "Element type is invalid... got: object".
- Packages that also ship an ES module build (`module` in their `package.json`) are fine in the browser. For server rendering they are in `SSR_BUNDLED`, so Vite uses that ES build: `prism-react-renderer`, `rc-slider` (and `rc-util`, which its ES build imports without file extensions), `react-country-flag`, `react-medium-image-zoom`, `react-tsparticles`.
- CommonJS-only packages cannot work this way. They were replaced or their users removed:
  - `react-slick`: `ImageSlider` is now a CSS scroll-snap track with the same arrows (wrap-around at the ends). The `slick-*` rules in `global.css` are gone. **Visible change to review: the slider in two blog posts.** Three other users were dead code and are deleted (`AnchorScrollNavbar`, `Careers/InterviewProcess`, `Home/Features.jsx`).
  - `react-input-autosize`: replaced by `components/AutosizeInput`, an `<input>` sized by CSS `field-sizing: content`, with the `size` attribute as the fallback. Same `inputClassName` prop. Used by the pricing calculators, the endpoints playground, and the team name editor. **Visible change to review.**
  - `react-lottie`: `CommunityCTA` uses `lottie-react` (lazy, like `Inbox`), and `Screensaver` uses `DotLottiePlayer`.
  - `react-scrollspy`: only the `scroll` table-of-contents mode used it, and nothing sets that mode. The wrapper is removed.
  - `react-animate-height`: only used by the dead `Docs/Layout` → `MainSidebar` → `Menu` chain (with `StickySidebar`), which is deleted.
- `scripts/astro-migration/check-cjs-defaults.mjs` lists default-imported packages with this shape and says which to bundle and which to replace. It reports 0.

- `lottie-react` has the same problem in the browser: its `browser` field points at a UMD build with `exports.__esModule`, which the browser build prefers over its ES build. `React.lazy(() => import('lottie-react'))` resolved to an object, so `/questions` failed (React error #306) and rendered nothing. `Inbox` and `CommunityCTA` now use `DotLottiePlayer` from `@dotlottie/react-player` (already used in 17 places, an ES module package), and `lottie-react` is removed. The checker now also looks at the `browser` field and at dynamic `import()`.

### 25b. Image imports

Webpack gave `import logo from './logo.svg'` a URL string. Astro gives image imports an `ImageMetadata` object (`{ src, width, height, format }`), so `<img src={logo} />` rendered `src="[object Object]"` (found on `/pricing`). `scripts/astro-migration/codemod-image-url-imports.mjs` adds Vite's `?url` suffix to the 91 image imports in 27 files, so each import is the URL string again. No usage changed. (No SVG import was a React component: gatsby-plugin-react-svg only applied to folders named `svgs`, and there are none.)

### 25c. Hydration fixes found in the browser check

- **Pages with several MDX modules.** `PageIsland`'s `content` prop takes a list. The island loads every listed module before rendering on both sides, so none of them is behind a Suspense boundary. React hydrates each Suspense boundary in a later pass, and an update before that pass threw "This Suspense boundary received an update before it finished hydrating" (#421). `/docs/api/*` lists the overview and every operation's notes. Views that render a `pages` entry (`/about`, `/media`) list `data.body`.
- **`CodeBlock` ids.** `generateRandomHtmlId()` made a new `clipPath` id on each render, so the server and the browser disagreed. It uses `useId` now, and the helper is deleted.
- **Phrasing elements with their content on separate lines.** MDX 1 read `<p>` (or `<span>`, `<a>`, `<h5>`…) with its content on its own lines as JSX. MDX 3 reads the inner lines as Markdown and wraps them in a paragraph, which gives `<p><p>…</p></p>`: invalid HTML that the browser splits, so hydration fails (found on `/about`), and extra spacing. `scripts/astro-migration/codemod-inline-phrasing-jsx.mjs` puts that content on one line, joined the way JSX joins lines (43 elements in 18 files: `about`, `founder-lab`, the docs start-here pages, and others). The output now matches MDX 1.
- After these fixes, these pages hydrate with no errors in the dev server: `/about`, `/docs/api/feature-flags`, `/docs/surveys/start-here`. `/questions` still logs #421, as production does: `Inbox` lazy-loads its loading animation inside a Suspense boundary.
- Not fixed, because production has the same problem: the compare pages wrap `<ProductComparisonTable>` (a `<div>`) in `<p>`, and some buttons get `state="[object Object]"` attributes.

### 26. Gatsby removed

- Deleted: `gatsby-config.js`, `gatsby-node.ts`, `gatsby-browser.tsx`, `gatsby-ssr.js`, `src/html.tsx`, the rest of `gatsby/`, and `plugins/` (the local Gatsby plugins). Their logic was ported in steps 9, 14, 19, and 20.
- Storybook 6 is removed (`.storybook/`, seven `*.stories.jsx` files, the `storybook` scripts). It ran on Gatsby's webpack and Babel setup.
- Removed packages: `gatsby` and the 24 `gatsby-*` packages, `@gatsbyjs/reach-router`, `react-helmet` (`hogreads` now renders its font `<link>` in the page), `svg-react-loader`, webpack, Babel and the webpack loaders, `react-dev-utils`, the Storybook packages, and `@types/gatsby-plugin-breakpoints`. `pnpm-workspace.yaml` no longer lists `plugins/*` or the webpack hoist patterns, and `onlyBuiltDependencies` no longer lists Gatsby's native modules.
- A clean `pnpm install` has no Gatsby package in the lockfile or `node_modules` (4.1 GB → 3.1 GB).
- Two unused components that imported Gatsby plugins are deleted: `Subscribe` (`gatsby-plugin-mailchimp`) and `Careers/FounderNote/AnchorScrollNavbarTop` (`gatsby-plugin-smoothscroll`).
- Gatsby-only CSS is removed (`#___gatsby`, `#gatsby-focus-wrapper`, `.gatsby-image-wrapper`).
- The root `public/` folder was Gatsby's output (a copy of `static/`). It is deleted. Astro serves `static/` (`publicDir`) and builds to `dist/`.
- `TreeMenu`, `PostLayout/Menu`, and `PostLayout/TableOfContents` import `replacePath`/`flattenMenu` from `src/data-layer/utils.ts`.
- Code comments that pointed at `gatsby/*` files now point at the files that replaced them.
- `@typescript-eslint/parser` stays a direct dev dependency: `eslint-plugin-astro` uses it to parse TypeScript in `.astro` files.
- Not done: the image data shape still uses Gatsby's names (`childImageSharp.gatsbyImageData`), because components and queries read it in many places. Renaming it is a mechanical follow-up.

### 27. Docs and comments

- `README.md`, `WARP.md`, and `agents/` (techstack, data, reviewers guide) describe the Astro setup: commands, project structure, the data layer, and the posthog/posthog clone. The dev server stays on port 8001 (`bin/start`).
- The handbook pages under `contents/handbook/engineering/posthog-com/` (technical architecture, how the website works, developing the website, MDX setup, markdown, API docs, merch store) describe the Astro setup. The technical architecture page describes the one-window model (windowed, expanded, closed) in place of the old multi-window system.
- 21 component READMEs under `src/` that referred to Gatsby (GraphQL queries, `gatsby/*` files, `gatsby develop`) point at the files that replaced them. The Slides examples use the current data pattern (`useContentData` and `@data/*` JSON).
- Code comments no longer refer to Gatsby. Comments that explained "as Gatsby did" now state the behavior and the reason. `GatsbyContentResponse` (merch types) is now `MerchContentResponse`. The remaining `gatsby` hits are the Gatsby framework that PostHog supports (docs nav, logos, install taxonomy), the `gatsbyImageData` field names (see step 26), and the migration scripts.
- `<head>` has the PNG favicon and Apple touch icons that gatsby-plugin-manifest used to add.
- Notes from the docs pass, not changed: `markdown.mdx` still documents `state={{ newWindow: true }}` links (the site has one page window now); `developing-the-website.mdx` says `/blog` is not built in previews, but `/blog` is a view, so it is.

### 28. Build output checked against production

`pnpm build` completes: 9,468 HTML pages, 2,708 page `.md` files, 2,357 OpenAPI operation `.md` files, `llms.txt`, `llms-full.txt` (1,875 docs pages, 12 MB), `robots.txt`, `rss.xml`, `changelog.rss`, `changelog.md` with yearly archives, `pricing.md`, `platform.md`, `openapi.json`, `post-build-data.json`, and the sitemap. Algolia is skipped without its keys.
- `llms.txt`: 4,500 lines; production has 4,503.
- Sitemap: 13,399 URLs; production has 13,436. The differences:
  - Left out on purpose: 404 pages, `noindex` pages (Gatsby listed them, including handbook pages with `noindex: true` in their frontmatter), and bracket placeholder paths such as `/teams/[slug]`.
  - Job pages differ because the build had no Ashby key (fake data).
  - `/plugins/*` entries in production are stale: those URLs redirect to `/apps/*`.
  - Fixed: the sitemap did not encode spaces in URLs (`encodeURI` now).
  - Fixed: `/docs/self-driving/from-our-inbox` was missing. The docs collection pattern excluded the whole folder; the `PAGES` pattern already skips its `_examples` and `_curator` data files.
- Browser check of 20 key pages on `astro preview` (headless Chrome, console and page errors). Every page renders. Errors that production also has were left alone: `<svg> width="auto"`, hydration mismatches (React #418/#423) on `/docs/libraries/js`, `/careers`, and `/merch`, #421 on `/questions`, `state="[object Object]"` attributes on buttons, and a 404 for `/docs/api/*.md`. Regressions found and fixed: `/questions` (lottie-react, above) and image `src` (above).

### 29. Minimal (preview) builds

`MINIMAL_BUILD=true` (`pnpm build:minimal`, used by the preview deploy workflow) builds what Gatsby's `createMinimalPages` built: docs, handbook, product engineer, posts, SDK references, pocket guides, Hogpedia, and templates, plus every page in `src/views`. The routes for listings and tags, API endpoints, generated CDP pages, events, apps, jobs, question topics, workflow templates, and plain pages return no paths (`MINIMAL_BUILD()` in `src/data-layer/env.ts`). The SEO outputs are skipped. This replaces `GATSBY_MINIMAL` (and `PUBLIC_MINIMAL`, which the first port used).

- Checked: `pnpm build:minimal` builds 8,374 pages (the full build: 9,469) and skips the SEO outputs.

### 30. The shell in the browser

Checked on the production build (`astro preview`, headless Chrome, 1440×900 and 420×860):
- Clicking a link in the page window navigates without a page load (`ClientRouter`). The taskbar and desktop islands are the same DOM nodes before and after (`transition:persist`), so nothing blinks.
- `Shift+↑` expands the window (`<html data-window="expanded">`), `Shift+W` closes it and shows the desktop (`closed`), and Back opens the previous page in a window again (`windowed`).
- `M` switches to dark mode. The narrow dark view matches production.
- No page errors during the run.

### 31. Lint, format, and type-check, final state

- Prettier: every code file this branch changed is formatted (`.astro` included). Content files are not reformatted.
- ESLint (`pnpm lint`): 0 errors, about 1,260 warnings. `.claude/` (local agent worktrees) is ignored. Four rules that the old ESLint 7 config did not have are warnings, because existing code breaks them in many places: `react-hooks/rules-of-hooks` (about 160 conditional hook calls), `@typescript-eslint/no-unused-expressions`, `no-useless-assignment`, and `preserve-caught-error`. lint-staged runs ESLint on commit, so errors would block commits that touch those files.
- Fixed while getting to 0 errors: a real `typeof window !== undefined` bug (always true) in `CompensationCalculator`, four spreads of possibly undefined arrays, and stale disable comments for the removed `eslint-plugin-react`.
- The OG image templates (`src/templates/OG/*`) are CommonJS. They are `.cjs` now and `scripts/post-build/tasks.ts` loads them with `createRequire`, in place of a `vm` wrapper that ran them as CommonJS.
- Type-check (`pnpm typecheck`, `astro check`): the files written for the migration (islands, layouts, routes, data layer, content builders, SEO outputs, MDX setup) have no errors. About 3,100 errors remain in older components, mostly unused locals and implicit `any`. Master already had `strict` and `noUnusedLocals` and no type-check in CI, so these predate the migration. Added `@types/node` (24.5.1, the version already in the lockfile; the newest 22.x pulls a package the trust policy rejects), `@types/turndown`, `@types/jsdom`, and `@types/github-slugger`. The webpack-era `*.svg`/`*.png` module declarations are removed (Vite and Astro type those imports now).

### 32. Tests and caches

- The `node --test` suites pass: `test:markdown`, `test:standard-site`, `test:middleware`, `test:data-layer-utils`, `test:navs`, `test:sdk-references`.
- `pnpm test-redirects` (`jest scripts`) finds no tests, on master too: the only files it matched were in Gatsby's `.cache/gatsby-source-git`. Left as is.
- Gatsby's `.cache` contents (1.8 GB, gitignored) are deleted. `.cache` now holds only `data-layer` and `posthog-main-repo`.

## Open items for review

- **Vercel env vars:** rename the `GATSBY_*` project env vars to `PUBLIC_*` (step 5 has the list) before deploying.
- **pnpm trust policy:** `trustPolicyExclude` lists `semver@5.7.2 || 6.3.1` and `chokidar@4.0.3` (see "Tooling notes").
- **Visible changes to look at:** `ImageSlider` (CSS scroll snap in place of react-slick), `AutosizeInput` (pricing calculators, endpoints playground, team name editor), the `docs/sql` screenshot and the `customers/mention-me` floated image that now show, and the `Screensaver` and `CommunityCTA` animations (DotLottiePlayer).
- **Removed CI features:** the webpack bundle-size report and the cache warm-up workflow (step 18 area of the workflows changes). An equivalent for Vite's output is a follow-up.
- **Not migrated by design:** Storybook 6 (removed with Gatsby).
- **Follow-ups:** rename the `childImageSharp.gatsbyImageData` image data shape; the `addWindow` callers that still pass legacy `location`/`newWindow` props (step 18); the rules-of-hooks warnings; the existing hydration mismatches that production also has (step 28).
