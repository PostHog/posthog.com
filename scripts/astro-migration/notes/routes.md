# Gatsby route inventory: posthog.com

Repo: `/Users/rafael/Documents/posthog/posthog.com`. Key files: `gatsby-node.ts`, `gatsby/createPages.ts`, `src/components/AppWindow/index.tsx`, `vercel.json`, `gatsby/postBuildTasks.ts`.

## 0. Route-generation facts to know first

- **`gatsby-node.ts` re-exports `createPages` from `gatsby/createPages.ts`.** At the bottom of the same file there is a second `exports.createPages = ...`. That second version fetches Ashby jobs and calls `createPage({ path: '/jobs', component: './src/templates/jobs.tsx' })`, but `jobs.tsx` does not exist. Since the site builds, the re-export is the one that runs, so this block is dead code.
- **`onCreatePage` (gatsby-node.ts) sets these matchPaths:**
  - `/community/profiles/*`: any page under `/community/profiles/` except `/community/profiles/me`. In practice this is `[id].tsx`.
  - `/events/*`: any page whose path starts with `/events/`. That covers `events/[strapiID].tsx`, the static `events.tsx` page at `/events/`, and every `/events/<strapiID>` page that createPages builds from the Event template.
  - `/next-steps/*`: no page in `src/pages` or `contents` matches, so this rule is dead. `vercel.json` still rewrites `/next-steps/(.*)`.
  - `/teams/*`: only when the component is `teams/[slug].tsx`.
  - `/for/*`: covers `for/[...path].tsx`.
  - `/credits/`: injects `buildTime` and `commitSha` into the context. No `/credits/` page exists and nothing reads `buildTime`, so this rule is dead.
- **`vercel.json` rewrites the client-only routes to their prebuilt HTML**, e.g. `/community/profiles/:path*` → `/community/profiles/[id]/index.html`. The same applies to `/teams/[slug]`, `/questions/[permalink]` (excluding `topic`), `/posts/[slug]`, `/startups/[...slug]` and `/docs/{product-analytics,ai-observability,session-replay}/learn/[...chapter]`. It also sends versioned `/docs/references/*-<digit>*` to `/docs/references/version-unavailable/`.
- **`AppWindow/index.tsx` routes on path and props, not just the page component.** Its `Router`:
  - `/^\/questions/` → renders `<Inbox>`. This is why the `questions/*` pages return `null`.
  - `/handbook|/docs/(?!api)|/manual` plus `props.data.post` → renders `<Handbook>` (the template).
  - `pageContext.post` or `/^posts/` → renders `<BlogPost>` (the template).
  - `/terms`, `/privacy`, `/dpa`, `/baa`, `/subprocessors` → wrapped in `<Legal>`.

  So `pageContext.post` is consumed outside the template. `gatsby-browser.tsx` and `gatsby-ssr.js` `wrapPageElement` only destructure `props.location`.
- **Two route collisions in `src/pages`:** `demo.js` and `demo/index.tsx` both resolve to `/demo/`, and `teams.tsx` and `teams/index.tsx` both resolve to `/teams/`.
- **Plain overlap:** the catch-all `allMdx` loop creates a **Plain** page for almost every MDX node. That includes docs, handbook, blog and so on; it skips only `teams/`, `about.mdx`, `media-contents.mdx`, `template: custom`, `posthog-main-repo`, `ko/newsletter`, `hogpedia` and `_` starters. Later `createPage` calls at the same path override it. In effect Plain is the template for leftover top-level MDX such as `/faq` and `/founder-lab`, `contents/*.md(x)` pages, and anything not claimed elsewhere.
- **Minimal build (`GATSBY_MINIMAL=true`):** `createMinimalPages` only creates:
  - Handbook pages for docs, handbook and product-engineer.
  - BlogPost pages for blog, compare, library, founders, product-engineers, features, newsletter, spotlight, customers and tutorials.
  - Template pages for pocket-guides.
  - Hogpedia and HogpediaCategory pages.
  - SDK reference pages, latest version only.

## 1. src/templates (63 files)

Conventions used below:
- **Q** = page query: its variables, then root fields with node types.
- **ctx** = the `pageContext` fields the component reads.
- **APIs** = the Gatsby-specific APIs it uses.
- `SEO` is `components/seo`, which uses Helmet internally.
- `Link` is `components/Link`, a wrapper around Gatsby `Link`.
- No template uses `<Script>`, `Head` exports, `StaticImage` or `getServerData`.

### Route templates (used by createPages)

| Template | Routes (from createPages.ts) | Q: vars → root fields | ctx read | APIs |
|---|---|---|---|---|
| **Plain.js** | Every MDX node from the catch-all loop at `replacePath(node.slug)`; see "Plain overlap" above | `PlainLayout($id)`: `pageData: mdx(id)` (body, frontmatter with `...SEOFragment`, etc.) | none (`data` only) | MDXProvider + MDXRenderer (with `images`), SEO, Link |
| **BlogPost.tsx** | `/tutorials/*`, `/blog/*` (isFuture=false, has date), `/compare/*`, `/library\|founders\|product-engineers\|features\|newsletter/*`, `/spotlight/*`, `/customers/*`. ctx: `{id, tableOfContents, slug, post:true, article:true}`, plus `askMax:true` for tutorials | `BlogPostLayout($id)`: `postData: mdx(id)` (id, body, excerpt, fields, frontmatter, parent File: gitLogLatestDate, relativePath, category). Also exports `SEOFragment on FrontmatterSEO`, used by Plain and Handbook | `tableOfContents`, `askMax` (+ `location` prop) | MDXProvider/MDXRenderer, GatsbyImage/getImage, `useLocation` (@reach/router), SEO, Link. Imports `useStaticQuery` but never calls it. Also imported by AppWindow, Tutorial, Hub/Tag, Edition/ClientPost |
| **Handbook.tsx** | `/handbook/*` (local plus posthog-main-repo), `/product-engineer/*`, `/docs/*` (except `/docs/self-driving/from-our-inbox/_*`), `/manual/*`, plus `/docs/data-warehouse/sources/<slug>` for sources with hand-written docs and self-hosted sources (s3, azure-blob, r2, gcs). ctx: `{id, nextURL, next, previous, breadcrumb, breadcrumbBase, tableOfContents, slug, links, searchFilter}` | `HandbookQuery($id, $nextURL, $links:[String!]!)`: `postHogSource(mdx.id)`, `glossary: allMdx(slug in $links)`, `nextPost: mdx(slug=$nextURL)`, `post: mdx(id)` (with `...SEOFragment`; `fields.appConfig`, `templateConfigs`, `commits`) | `breadcrumbBase`, `tableOfContents` | MDXProvider/MDXRenderer, `useLocation`, SEO, Link, usePostHog |
| **ApiEndpoint.tsx** | `/docs/api/<name>`, one per `allApiEndpoint` node via `createPosts`. Extra ctx: `regex: "$" + url + "/"` | `ApiEndpoint($id, $regex)`: `allMdx(slug regex $regex)` (slug, body), `data: apiEndpoint(id)` (internal.content, items, name, url, nextURL, previousURL, components) | none | MDXProvider/MDXRenderer, SEO. The `$` prefix in the regex works only because Gatsby's `prepareRegex` splits on `/` |
| **Blog.tsx** | **Unused.** `BlogTemplate` is declared but never passed to `createPage` | `($skip,$limit)`: `allPostsRecent: allMdx(/^\/blog\//)` with `...BlogFragment` | `numPages, currentPage, base` | SEO |
| **BlogCategory.tsx** | `/blog/categories/<slug>[/N]`, paginated 20 per page. ctx: `{category, slug, limit, skip, numPages, currentPage, base}` | `($skip,$limit,$category)`: `allPostsRecent`, `allPostsPopular` (sorted by `fields.pageViews`), both `allMdx` filtered on `frontmatter.category` | `category, slug, numPages, currentPage, base` | SEO |
| **BlogTag.tsx** | `/blog/tags/<slug>[/N]`. ctx: `{tag, slug, …pagination}` | `($skip,$limit,$tag)`: `allPostsRecent`, `allPostsPopular` (filter `tags in [$tag]`) | `tag, numPages, currentPage, base` | SEO |
| **Pagination.tsx** | `/blog/all`, `/library/all`, `/founders/all`, `/product-engineers/all`, `/features/all` (each `[/N]`). ctx: `{regex, title, …pagination}` | `($skip,$limit,$regex)`: `allPostsRecent: allMdx(slug regex $regex)` | `numPages, currentPage, base, title` | SEO |
| **tutorials/index.tsx** | `/tutorials/all[/N]` | `($skip,$limit)`: `allPostsRecent: allMdx(/^\/tutorials\//)` | `numPages, currentPage, base` | SEO |
| **tutorials/TutorialsCategory.tsx** | `/tutorials/categories/<slug>[/N]`. ctx: `{activeFilter, slug, …pagination}` | `($skip,$limit,$activeFilter)`: `allPostsRecent`, `allPostsPopular` (tags in, /tutorials/) | `activeFilter, numPages, currentPage, base` | SEO |
| **tutorials/Tutorial.tsx** | **Unused as a route.** `TutorialTemplate` is declared but tutorials use BlogPost. `ContentViewer` imports `ViewButton` from it | `TutorialLayout($id)`: `pageData: mdx(id)` | `tableOfContents, menu` (+ `location`) | MDX, GatsbyImage, `useLocation`, `useBreakpoint` (gatsby-plugin-breakpoints), SEO |
| **PostListing.tsx** | `/posts`, `/<categoryFolder>` for each `allPostCategory` folder (excluding founders, product-engineers, newsletter, blog, compare, customers, changelog), and `/<folder>/<tag-slug>` for non-hub folders. ctx: `{post:true, title, article:false, root, selectedTag?}` | No page query. `useStaticQuery`: `allPostCategory`. Posts are fetched client-side | `root`, `selectedTag` (+ `location`) | `useStaticQuery`, `navigate(…,{replace})`, SEO, Link |
| **Hub/Tag.tsx** | `/founders/<tag>` and `/product-engineers/<tag>` (hub folders). ctx: `{selectedTag, post, title, article, root}` | none (client `usePosts`) | `root, selectedTag, title` | SEO, Link. Imports `Sidebar` from `src/pages/founders.tsx` |
| **Hogpedia.tsx** | `/hogpedia/<article>` (throws if the slug matches `HOGPEDIA_RESERVED`). ctx: `{id, slug, talkSlug, tableOfContents}` | `HogpediaArticle($id,$talkSlug)`: `article: mdx(id)` (parent File), `talkPage: mdx(slug=$talkSlug)` | `tableOfContents, slug` | MDXProvider/MDXRenderer, SEO (canonicalUrl, article) |
| **HogpediaCategory.tsx** | `/hogpedia/category/<slug>`, one per `frontmatter.hogpedia.categories` value. ctx: `{category}` | `HogpediaCategory($category)`: `articles: allMdx(/^\/hogpedia\//, categories in)` | `category` | SEO, Link |
| **Event.tsx** | `/events/<strapiID>` per `allEvent` node. ctx: `{id, strapiID}`. Also gets matchPath `/events/*` from onCreatePage | `EventTemplate($id)`: `event(id)` → `attributes{…location, speakers, partners, photos}` | `strapiID` | SEO (PageProps typed) |
| **App.js** | `/apps/*` (MDX slug). ctx: `{id, documentation}` | `App($id,$documentation)`: `pageData: mdx(id)`, `documentation: mdx(slug)`, `apps: allMdx(/^\/apps\//)` | none | MDX, GatsbyImage/getImage, SEO, Link |
| **Pipeline.js** | `/cdp/*` (MDX slug). ctx: `{id, documentation}` | `Pipeline($id,$documentation)`: `pageData: mdx(id)`, `documentation: mdx(slug)` | `next, previous` (never provided, always undefined) | MDX, GatsbyImage, SEO, Link |
| **Template.tsx** | `/templates/*` and `/pocket-guides/*` MDX (skips `/SKILL` and `/_*`). ctx: `{id}` | `Template($id)`: `pageData: mdx(id)` (parent File), `templates: allMdx(…)`, `workflowTemplates: allPostHogWorkflowTemplate` | none | MDX, GatsbyImage/getImage, SEO, Link |
| **WorkflowTemplate.tsx** | `/templates/workflow/<slug>` per `allPostHogWorkflowTemplate`. ctx: `{slug}` | `WorkflowTemplate($slug)`: `workflow: postHogWorkflowTemplate(fields.slug)`, `mdxTemplates: allMdx`, `workflowTemplates: allPostHogWorkflowTemplate` | none | SEO |
| **Job.tsx** | `fields.slug` of each `allAshbyJobPosting`, created **only if `ASHBY_API_KEY` and `GITHUB_API_KEY` are set**. Fetches GitHub issues at build time. ctx: `{id, slug, objectives, mission, gitHubIssues, teams}` | `JobQuery($id,$objectives,$mission,$teams)`: `ashbyJobPosting(id)` (parent AshbyJob), `allJobPostings: allAshbyJobPosting`, `objectives: mdx(slug)`, `mission: mdx(slug)`, `teams: allSqueakTeam(name in)` | `gitHubIssues` | MDX, `navigate`, SEO, Link |
| **DataPipeline.tsx** | `/docs/cdp/<type>s/<slug>` per `allPostHogPipeline` with no mdx. ctx: `{id, ignoreWrapper:true}` | `($id)`: `postHogPipeline(id)` | none (`ignoreWrapper` is unread anywhere) | SEO |
| **DataWarehouseSource.tsx** | `/docs/data-warehouse/sources/<slug>` and `/docs/cdp/sources/<slug>` per `allPostHogSource` (no mdx, not unreleased). ctx: `{id, ignoreWrapper}` | `($id)`: `postHogSource(id)` (sourceFields, tables) | none | SEO |
| **sdk/SdkReference.tsx** | `/docs/references/<referenceId>` (latest) or `/docs/references/<id>` (versioned). ctx: `{name, description, fullReference (whole node), regex, slugPrefix, types}` | `SdkReferencesQuery` (no vars): `allSdkReferences{nodes{id,version,referenceId}}`, used for the version picker. Also imported by `gatsby/onPostBuild.ts` and `rawMarkdownUtils.ts` | `fullReference, slugPrefix, types` | `useLocation`, `navigate`, SEO (canonical, noindex) |
| **sdk/SdkType.tsx** | `/docs/references/<slugPrefix>/types/<typeId>`. ctx: `{typeData, version, referenceId, slugPrefix, types}` | none (context only) | all 5 | SEO, Link |

### Not route templates (no createPage)

- **Changelog.tsx**: a component used by `src/pages/changelog/index.tsx`. Also exports `Change`, used by `Team/Roadmap`. No query. Uses `navigate`, `useLocation`, GatsbyImage, SEO.
- **Team.tsx**: orphan. It has a page query `TeamTemplateQuery($slug,$teamName,$objectives)` with `mdx`, `team: squeakTeam(name)`, `objectives: mdx`, and reads ctx `slug`, but nothing creates pages with it. `/teams/*` is served by `pages/teams/[slug].tsx`.
- **Home.tsx**: empty file (0 lines).
- **`Customer.js`**: referenced as `CustomerTemplate` in createPages but the file does not exist and is never used.
- **merch/**: none of these files is passed to `createPage`.
  - `merch/index.tsx` is an orphan page query: `allProductsQuery($skip,$limit)` → `allShopifyProduct`. It reads ctx `currentPage`, `numCollectionPages`, and uses Gatsby `Link` and GatsbyImage.
  - `merch/Product.tsx` is an orphan page query: `($handle)` → `shopifyProduct(handle)`, with SEO.
  - `merch/Collection.tsx` is used by `pages/merch.tsx`, which passes a fake `pageContext: {handle, productsForCurrentPage}`. It uses `window.location`, SEO and Link.
  - `Checkout.tsx` and `hooks.ts` run `useStaticQuery` for `allProducts`.
  - `Nav.tsx` uses `navigate`. `ProductCarousel`, `ProductPanel`, `LineItem` and `ProductCard` use GatsbyImage.
  - `store.ts` (zustand cart) is used by OSChrome, `useDesktopBadges` and `pages/merch`.
  - `types.ts` is used by `gatsby/sourceNodes.ts`, `createPages.ts` and `lib/shopify.ts`.
  - `utils.ts` and `transforms.ts` use `getImageData` / `IGatsbyImageData`; `utils.ts` also does a client-side Shopify fetch.
  - The rest (`AdjustedLineItems`, `BackInStockForm`, `Cart`, `LoaderIcon`, `MerchVideoCard`, `Price`, `ProductGrid`, `ProductOptionSelect`, `ProductPanels`, `Quantity`, `QuantitySelector`, `ShippingBanner`, `SizeGuide`) are plain components.
- **OG/**: HTML generators for OG images, called from `gatsby/postBuildTasks.ts` (puppeteer screenshots), not routes.
  - `blog.js`, `docs-handbook.js`, `customer.js` and `job.js` are imported there.
  - `careers.js` is not imported; the careers OG image screenshots `/careers-og/` instead.
  - `tutorial.js` is not imported; its usage is commented out.
  - `images/detective-hog.png` and `images/not-working-here.png` are assets.

## 2. src/pages (234 files: 227 route modules + 7 assets)

URL = file path with `index` removed and a trailing slash. Gatsby's File System Route API turns `[x]` into `:x` and `[...x]` into a splat, which makes those routes client-only.

### 2a. Pages with an exported page query (20)

| File | URL | Root fields |
|---|---|---|
| about.tsx | /about | `mdx(slug="/about")`, rendered with MDXRenderer |
| media.tsx | /media | `mdx(slug="/media-contents")`, MDX |
| bi/index.tsx, correlation-analysis/index.tsx, funnels/index.tsx, lifecycle/index.tsx, retention/index.tsx, sql/index.tsx, stickiness/index.tsx, user-paths/index.tsx | /bi, /correlation-analysis, /funnels, /lifecycle, /retention, /sql, /stickiness, /user-paths | `mdx(slug="/<same>")`. All 8 files share an identical structure |
| blog.tsx | /blog | `posts: allMdx(/^\/blog\//)` |
| compare.tsx | /compare | `posts: allMdx(/^\/compare\//)` |
| newsletter.tsx | /newsletter | `posts: allMdx(/^\/newsletter\//)` |
| sparks-joy/onlyhogs/index.tsx | /sparks-joy/onlyhogs | `posts: allMdx(/^\/(blog\|newsletter)\//)` |
| hogbook.tsx | /hogbook | `blog: allMdx`, `newsletter: allMdx`, `friends: allSqueakProfile`. Also fetches `/rss.xml` and reads `window.location` |
| research.tsx | /research | `researchPosts: allMdx`, `aiResearchTeam: squeakTeam(slug)`, `researchTeamMembers: allSqueakProfile`, `aiResearchRole: allAshbyJobPosting`. Uses GatsbyImage |
| changelog/index.tsx | /changelog | `ChangelogPageQuery`: `allRoadmap(complete, date≠null)`, `allChangelogVideo`. Renders `templates/Changelog` |
| self-driving/index.tsx | /self-driving | `SelfDrivingPage`: `allSelfDrivingPullRequest` |
| merch.tsx | /merch | `main: shopifyCollection(handle="frontpage")`, `kits: shopifyCollection(handle="kits")`, plus `CollectionFragment on ShopifyCollection`. Uses `useLocation` (?product, ?coupon) |
| questions/topic/{SqueakTopic.slug}.tsx | /questions/topic/<slug>, one page per **SqueakTopic** node (collection route; `$id` is injected automatically) | `topic: squeakTopic(id)`. The component returns `null`; AppWindow renders Inbox |

### 2b. Pages using `useStaticQuery` only (19)

- ai/index.tsx (/ai): `allMdx(/^\/tutorials\//)` with rawBody.
- careers.tsx (/careers): `allAshbyJobPosting`. `vercel.json` rewrites `/careers/(.*)` to `/careers`.
- careers-og/index.tsx (/careers-og): `allAshbyJobPosting`, `allTeams: allSqueakTeam`. This is the page postBuild screenshots for the careers OG image.
- community/achievements.tsx: `allAchievement`, `allAchievementGroup`.
- components/index.tsx (/components): `allSqueakTeam`, `allSqueakProfile`. Also uses Gatsby `Link`.
- customers/index.tsx (/customers): `stories: allMdx(/^\/customers\//, limit 1)`.
- hog/index.tsx: `allMdx`, `allProductData`.
- hogpedia/recent-changes.tsx: `allRoadmap`.
- hogreads.tsx: `team: allSqueakProfile`. The only page that uses Helmet directly.
- hogspace.tsx: `team: allSqueakProfile`.
- roadmap/sidecar.tsx: `allSqueakRoadmap`.
- small-teams.tsx: `allSqueakTeam`.
- sparks-joy/hoglr/index.tsx: `team: allSqueakProfile`, `blog: allMdx`, `newsletter: allMdx`. Uses GatsbyImage.
- teams.tsx (/teams, **collides with teams/index.tsx**): `allTeams: allSqueakTeam`. Uses `navigate`, and `useNavigate`/`useLocation` from `@gatsbyjs/reach-router`.
- teams/index.tsx (/teams): `allTeams: allSqueakTeam`.
- teams/new/index.tsx (/teams/new): `allSqueakTeam`. Reads `location`.
- teams/team-ben.tsx (/teams/team-ben): `bens: allSqueakProfile`, `allSqueakTeam`.
- **teams/[slug].tsx**: also client-only, see 2c. `allTeams: allMdx`, `allObjectives: allMdx`, `allSqueakTeam`, `allSlackEmoji`, `allTeamsData: allSqueakTeam`, `allAshbyJobPosting`. Uses MDXRenderer and `navigate`.
- wip.tsx: `allSqueakTeam`. Uses MDX.

### 2c. Dynamic and client-only routes

| File | Effective matchPath | Notes |
|---|---|---|
| community/profiles/[id].tsx | `/community/profiles/*` (onCreatePage) | `params.id \|\| params['*']`; reads `appWindow.location.search` for ?tab |
| community/profiles/me.tsx | static /community/profiles/me (excluded from the wildcard) | `navigate` to `/community/profiles/<id>` with replace |
| events/[strapiID].tsx | `/events/*` (onCreatePage) | `params.strapiID \|\| params['*']`; client fallback for the Event template pages |
| events.tsx | /events, which **also gets matchPath `/events/*`** because its path matches `^/events/` | reads `window.location` |
| for/[...path].tsx | `/for/*` (onCreatePage) | custom presentations; reads `appWindow.location`; `navigate('/')` |
| teams/[slug].tsx | `/teams/*` (onCreatePage) | `params.slug \|\| params['*']`; `vercel.json` rewrite |
| posts/[slug]/index.tsx | `/posts/:slug` (auto) | `params.slug`; `vercel.json` rewrites `/posts/:path*` |
| posts/[slug]/edit.tsx | `/posts/:slug/edit` (auto) | reads `location.state` (`id`, `initialValues`); `navigate('/posts')` |
| questions/[permalink].tsx | `/questions/:permalink` (auto) | returns `null` (AppWindow renders Inbox); `vercel.json` rewrite |
| fm/mixtapes/edit/[id].tsx | `/fm/mixtapes/edit/:id` (auto) | `params.id` |
| startups/[...slug].tsx | `/startups/*` | `useLocation` → partnerSlug; the canonical page is `startups/index.tsx` |
| docs/product-analytics/learn/[...chapter].tsx, docs/session-replay/learn/[...chapter].tsx, docs/ai-observability/learn/[...chapter].tsx | `/docs/<x>/learn/*` | `useLocation` → chapter; renders `PocketGuides/LearnPage` |
| questions/topic/{SqueakTopic.slug}.tsx | collection route | see 2a |

Other pages that read the URL at runtime but are static routes:
- `fm/index.tsx` reads `?mixtape` via `appWindow.location`.
- `hogpedia/search.tsx` uses `useLocation`.
- `questions/topic/max.tsx` reads the `location` prop; its `pageContext` type is declared but unused.
- `videos/play.tsx`, `side-projects.tsx`, `code/open.tsx` and `connect/posthog/redirect.tsx` read the location.

### 2d. Pages that are only `<ProductReaderView productHandle=… [surface="pricing"]>` (29, no query, no SEO in the file)

- `<product>/index.tsx` and `<product>/pricing.tsx` exist for these 14: ai-observability, endpoints, error-tracking, experiments, feature-flags, group-analytics, logs, product-analytics, replay-vision, session-replay, surveys, tracing, web-analytics, workflows (handle `workflows_emails`).
- Index only: `mcp/index.tsx`, `support/index.tsx`.

### 2e. Thin wrappers and re-exports (no query; one component)

- **Re-exports:**
  - apps.js → `components/Apps`
  - eu.js → `components/EU`
  - old-home.tsx → `components/Home/Index`
  - templates.tsx (/templates) → `components/Templates`
  - coloring-book.pdf/index.js → `components/ColoringBook`
  - `Copy of whitepaper (2) - final LATEST.docx.pdf/index.js` → `components/Whitepaper`
- **Single component:**
  - people.js and people/map.tsx → `PeoplePage` (list / map)
  - products/index.tsx → `ProductsTest`
  - wizard/index.tsx → `WizardPage`
  - community-incubator.tsx, lenny/index.tsx, startups/index.tsx, students/index.tsx → program components
  - deskhog.tsx, product-os.tsx, services.tsx → `Layout` + a component
  - fm/index.tsx → `TapePlayer`
  - product-engineers.tsx → `Hub folder="product-engineers"`
  - founders.tsx → `Hub`; it also exports `Sidebar`, which Hub/Tag imports
  - docs/{product-analytics,session-replay,ai-observability}/learn.tsx → `LearnPage`
  - reset-password.tsx, 404.js → `NotFoundPage`
  - index.tsx (/) → `components/Home/Test`, with SEO and structuredData
  - demo/index.tsx and changelog-video/index.tsx → `MediaPlayer`
  - spicy.mov/index.tsx → `MediaPlayer`
  - `quick calls script.txt/index.tsx` → `Editor`
- **Return `null`** (AppWindow renders Inbox for `/questions*`): questions/index.tsx, questions/subscriptions.tsx (and questions/[permalink].tsx).

### 2f. Pages that run redirects or side effects on load

- code/open.tsx: `window.location.href = posthog-code://…`
- slack-invite.tsx: `window.location.href = slackUrl` after a timeout
- merch/orders.tsx: `window.location.href = data.statusURL`
- hogpedia/random.tsx: `navigate(article.slug, {replace})`
- community/profiles/me.tsx: see 2c
- connect/posthog/redirect.tsx: uses `window.location`
- community/alerts.tsx, community/dashboard.tsx, community/notifications.tsx, community/profile/edit.tsx, fm/mixtapes/new.tsx, posts/new.tsx, side-projects.tsx: call `navigate()`

### 2g. All other static pages: no page query, no static query, component-only

Gatsby-specific imports are noted in brackets where present.

- **Root:** 101, art-library, baa, bookmarks, chapters [StaticImage], community, cool-tech-jobs, **demo.js [StaticImage, gatsby Link; collides with demo/index.tsx]**, desktop, display-options, dpa, enterprise, event-comparison [StaticImage], events-feedback-form, flurry-migration [StaticImage], founder-stack, handbook (/handbook: ReaderView + TreeMenu), media is in 2a, moat, newsletter-fbc (window.location), photobooth, posthug, privacy [StaticImage], sales, side-project-insurance, side-projects, slack-invite, start, subprocessors, talk-to-a-human, team-directory, team-updates, terms [StaticImage], tooling, why, workflow.
- **Directories:**
  - academy/index, achievements/manage, cdp/index, code/open
  - community/{alerts, dashboard, directory, latest, notifications, profile/edit, reputation}
  - components is in 2b; connect/posthog/redirect
  - context-warehouse/{index, business-intelligence, data-modeling, integrations-library, managed-warehouse, posthog-ai, reverse-etl-export, sources, sql-editor, use-cases, warehouse-native} (11)
  - dashboards/index, discounts/index
  - docs/{index (/docs: ReaderView), about, customer-analytics, distributed-tracing/index, frameworks, references/version-unavailable (vercel target for old SDK versions), revenue-analytics, services}
  - early-access-features/index, feature-matrix/index, feet-pics/index, fm/mixtapes/new
  - heatmaps/index (uses ReaderViewProduct sub-templates directly)
  - hogpedia/{index, about, all-pages, donate, random, search}
  - hogwatch/index, image-annotator/index, merch/orders
  - paint/index [gatsby Link; imports ./hogzilla-outline.png]
  - partnerships/index, places/index (window.location), platform-packages/index [gatsby Link], pocket-guides/index, posts/new, pricing/index [gatsby Link]
  - product-analytics-explorer/{index [gatsby Link], customers, features}
  - questions/topic/max
  - r/{ai-observability, error-tracking, observability, posthog-mcp, product-analytics, session-replay} (ReaderView landing pages, about 675 lines each)
  - roadmap/index.js
  - slack/index
  - sparks-joy/{index, brickhog, dictator-or-tech-bro, hedgehog-mode, hogpatch, hogwars}
  - the-context-gap-report/index (window.location)
  - tracks/index, trash/index, vibe-check/index
  - videos/index [gatsby Link], videos/play

None of the pages use `Head` exports, `getServerData`, `export const config`, or `gatsby-script`. Only hogreads.tsx uses Helmet directly; every other page uses `components/seo`. These pages render no SEO inside the page file itself (the wrapped component may do it): the 29 ProductReaderView pages, apps, eu, old-home, templates, people, products, wizard, community-incubator, lenny, startups, students, deskhog, fm, docs/*/learn*, merch, changelog/index, hog, ai, bookmarks, community/{alerts, dashboard, latest}, endpoints, event-comparison, flurry-migration, founder-stack, posts/[slug], questions/*, services, tracks, workflows.

## 3. Non-page files under src/pages

Gatsby's page creator ignores these as routes:
- `src/pages/docs/images/{ccr-survey, csat-survey, nps-survey, template-product-analytics, template-realtime-analytics, template-website-traffic}.png`. No references to them were found; they look orphaned.
- `src/pages/paint/hogzilla-outline.png`, imported by `paint/index.tsx`.

These look like files but are directories with an `index` module, so each becomes a real route with a file-like URL:
- `/coloring-book.pdf/`
- `/Copy of whitepaper (2) - final LATEST.docx.pdf/`
- `/quick calls script.txt/`
- `/spicy.mov/`

There are no `.md`, `.mdx` or `.docx` files in `src/pages`. MDX content lives in `contents/` and becomes routes only through createPages.

## Migration gotchas

1. **Last write wins on duplicate paths.** Plain is created first, then BlogPost or Handbook replace it at the same path. Hogpedia, `_` starters and `ko/newsletter` are skipped explicitly. An Astro port needs one explicit rule per route instead.
2. **Templates that read context but don't query it:**
   - SdkReference gets the entire reference node through `pageContext.fullReference`.
   - SdkType gets everything through context.
   - Job's `gitHubIssues` are fetched at build time.
3. **Behaviour driven by `pageContext.post` and path, not by the page component:**
   - AppWindow's Router keys on `pageContext.post`, `data.post` and the path.
   - Legal pages (`/terms`, `/privacy`, `/dpa`, `/baa`, `/subprocessors`) are wrapped by path.
4. **Dead or unused code to drop:**
   - Templates: Blog.tsx, Tutorial.tsx, Team.tsx, Home.tsx, merch/index.tsx, merch/Product.tsx.
   - The `Customer.js` reference in createPages.
   - The `/jobs` block at the bottom of gatsby-node.ts.
   - onCreatePage rules for `/credits/` and `/next-steps/*`.
   - Context fields `ignoreWrapper`, Pipeline's `next`/`previous`, and the `regex` passed to SdkReference.
5. **Resolve the two collisions:** `/demo/` (demo.js vs demo/index.tsx) and `/teams/` (teams.tsx vs teams/index.tsx).

