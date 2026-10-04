# Gatsby data pipeline: reference for the Astro port

Repo: `/Users/rafael/Documents/posthog/posthog.com` (Gatsby 4.25.9, gatsby-plugin-mdx ^3.20, gatsby-source-git ^1.1.0).

Before the details, four corrections to the task as written:
- **`gatsby/i18n.ts` does not exist.** There is no i18n file under `gatsby/`.
- **There are three remark plugins in `plugins/`, not two.** Only two are wired into `gatsby-config.js`: `gatsby-remark-video` and `gatsby-remark-inline-jsx-paragraphs`. The third, `plugins/gasby-remark-lazy-imgix` (the folder name has the typo), is never registered anywhere, so it is dead code.
- **Every frontmatter image is a Cloudinary URL.** No local image files are used. The `contents` filesystem source ignores png/jpg/gif/svg/webp/mp4, so no image File nodes exist to link to (details in section 4).
- **The two `onPreInit` hooks also matter.** One is in `gatsby/onCreateNode.ts` (Cloudinary crawl), the other in `plugins/gatsby-source-git-metadata` (GitHub history). Both are covered below.

Key files:
- `/Users/rafael/Documents/posthog/posthog.com/gatsby-node.ts`: re-exports the hooks and holds the webpack aliases for the git clone.
- `/Users/rafael/Documents/posthog/posthog.com/gatsby/{sourceNodes,onCreateNode,createSchemaCustomization,createResolvers,onPreBootstrap,enrichVideos,utils}.ts`
- `/Users/rafael/Documents/posthog/posthog.com/gatsby/utils/{fetchMCPTools,fetchScoutSkills}.ts`
- `/Users/rafael/Documents/posthog/posthog.com/plugins/*`
- `/Users/rafael/Documents/posthog/posthog.com/gatsby-config.js`

Env loading: `gatsby-config.js` loads `.env.${NODE_ENV}.local`, then `.env.${NODE_ENV}`. `onCreateNode.ts` loads `.env.${NODE_ENV}` again.

---

## 1. Lifecycle order (what the port must do, in sequence)

1. **`onPreInit`**
   - `gatsby/onCreateNode.ts`: builds the in-memory `cloudinaryCache` (public_id → resource).
   - `gatsby-source-git-metadata`: builds `files[path]` (commit history per content file).
   - `gatsby-transformer-cloudinary`: stores plugin options only.
2. **`onPreBootstrap`** (`gatsby/onPreBootstrap.ts`): side-effect files and the pageviews cache. See section 7.
3. **`sourceNodes`**, from these sources:
   - gatsby-source-ashby
   - gatsby-source-squeak
   - gatsby-mapbox-locations (reads SqueakProfile nodes, so it must run after squeak)
   - gatsby-source-filesystem ×5 (`contents`, `menuItems`, `navs`, `authors`, `testimonials`)
   - gatsby-source-git (`posthog-main-repo`)
   - `gatsby/sourceNodes.ts`
4. **`onCreateNode`**, run for each node: MDX transform (gatsby-plugin-mdx), JSON transform (gatsby-transformer-json), `gatsby/onCreateNode.ts`, and git-metadata `onCreateNode`.
5. **Schema and resolvers:** `createSchemaCustomization` (site, squeak, mapbox, cloudinary, ashby), then `createResolvers` (site and cloudinary `gatsbyImageData`).

---

## 2. Local file sources (`gatsby-config.js`)

| sourceInstanceName | Path | Resulting nodes |
|---|---|---|
| `contents` | `./contents` (images and video ignored) | `File`. `.md`/`.mdx` files become `Mdx` (child of File). |
| `menuItems` | `src/menuItems/menuItems.json` | `MenuItemsJson` (gatsby-transformer-json) |
| `navs` | `src/navs/*` (`handbook.json`, `product-engineer.json`, plus .ts/.js) | `*Json` nodes for the JSON files (e.g. `HandbookJson`, `ProductEngineerJson`) |
| `authors` | `src/data/authors.json` | `AuthorsJson`, one per array element. Fields: `handle, name, role, link_type, link_url, profile_id`. |
| `testimonials` | `src/data/testimonials.json` | `TestimonialsJson` |
| `posthog-main-repo` | git clone (section 3) | `File`, `GitRemote`. `.md`/`.mdx` files become `Mdx`. |

**MDX config** (`gatsby-plugin-mdx`):
- Extensions are `.mdx` and `.md`.
- Remark plugins, in order: `gatsby-remark-autolink-headers` (`icon:false`), `./plugins/gatsby-remark-video`, `./plugins/gatsby-remark-inline-jsx-paragraphs`.
- `shouldBlockNodeFromTransformation` blocks two kinds of File node:
  - main-repo `SKILL.md` files under `/skills/`;
  - any File whose `url` host is `raw.githubusercontent.com` (remote files created for Plugin READMEs).

---

## 3. The posthog/posthog git clone

**Config** (`gatsby-source-git`):
- `name: 'posthog-main-repo'`
- `remote: https://github.com/posthog/posthog.git`
- `branch: GATSBY_POSTHOG_BRANCH || 'master'`
- `patterns: ['docs/published/**', 'docs/onboarding/**', 'products/*/skills/*/SKILL.md']`

**How the clone works** (`node_modules/gatsby-source-git/gatsby-node.js`):
- It shallow-clones (`--depth 1`) into `.cache/gatsby-source-git/posthog-main-repo`. On later runs it fetches and runs `reset --hard origin/<branch>`.
- It fast-globs the patterns and calls `createFileNode` for each match, which gives `File` nodes with `sourceInstanceName='posthog-main-repo'` and `relativePath` relative to the repo root.
- Each File gets `gitRemote___NODE`. One `GitRemote` node is also created (parsed URL, `webLink`, `ref`).
- If the clone fails, it calls `reporter.error(e)` and returns. The build continues without those docs.
- `onPreBootstrap.invalidateGitCacheIfBranchChanged()` stores `{branch}` in `.cache/gatsby-source-git/.branch-manifest.json`. If the branch changed, it deletes the whole clone dir.

**How each pattern feeds the site:**

1. **`docs/published/**`**
   - The real tree has `docs/published/docs/...` and `docs/published/handbook/...`.
   - These become Mdx nodes. The slug is rewritten by stripping `/docs/published/` (section 5), so `docs/published/docs/logs/foo.mdx` becomes `/docs/logs/foo`.
   - In `gatsby/createPages.ts`:
     - The generic "plain page" loop skips main-repo nodes (line ~656: `if (node.parent?.sourceInstanceName === 'posthog-main-repo') return`).
     - The docs and handbook queries (by slug regex `^/docs/`, `^/handbook/`) do pick them up. Handbook nodes are split into `engineeringHandbook` (main repo) and `localHandbook` (line ~806). Both are rendered with `HandbookTemplate`.
   - `src/components/ReaderView` uses `parent.sourceInstanceName` to point "Edit on GitHub" at the posthog repo.
2. **`docs/onboarding/**`**
   - These are mostly `.tsx` files (e.g. `product-analytics/*.tsx`, `_snippets`). They become plain File nodes, not pages.
   - They are consumed through webpack, not GraphQL. `gatsby-node.ts` `onCreateWebpackConfig` sets:
     - `resolve.modules`: `.cache/gatsby-source-git/posthog-main-repo/docs`, then `contents/docs`, then `node_modules`
     - alias `docs` → `.cache/gatsby-source-git/posthog-main-repo/docs`
     - alias `onboarding` → `.../posthog-main-repo/docs/onboarding`
     - alias `scenes/onboarding/shared/OnboardingDocsContentWrapper` → `src/components/Docs/OnboardingContentWrapper.tsx`
   - Example consumer: `contents/docs/feature-flags/installation/_snippets/shared-helpers.tsx` has `import { StepDefinition } from 'onboarding/steps'`.
   - The Astro port needs the same Vite aliases pointing at the cloned repo.
3. **`products/*/skills/*/SKILL.md`**
   - These are blocked from MDX. `onCreateNode` parses them into `AgentSkill` nodes (section 6).
   - Consumed by `src/hooks/skills.tsx` via `allAgentSkill`.

**Separate from the clone**, these come straight from `raw.githubusercontent.com/PostHog/posthog/...`:
- `McpTool` nodes (sourceNodes; uses `GATSBY_POSTHOG_BRANCH`).
- `src/data/mcp-tools.json` and `src/data/scout-skills.json` (onPreBootstrap; always hardcoded to `master`).

---

## 4. Frontmatter images: local vs Cloudinary

**There is no local-file path.** In `contents/`:
- About 680 `featuredImage`/`thumbnail`/`logo`/`logoDark`/`icon` values were checked, and all are `https://res.cloudinary.com/...` (or `null`).
- `images:` arrays are Cloudinary URLs too.

**`onPreInit` (`gatsby/onCreateNode.ts`)**:
- Needs `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` and `GATSBY_CLOUDINARY_CLOUD_NAME`. If any is missing it logs "Cloudinary credentials not found" and returns, leaving the cache empty.
- If `.cloudinary-resources.json` exists at the repo root (CI cache), it loads that and skips the crawl.
- Otherwise it pages through `https://api.cloudinary.com/v1_1/<cloud>/resources/image?type=upload&max_results=500[&next_cursor=]` with Basic auth, building `cloudinaryCache[public_id] = resource`. It then writes `.cloudinary-resources.json`.

**`onCreateNode` for Mdx/MarkdownRemark** (skipped if the parent is `PostHogPull`/`PostHogIssue`):
- For each field in `['featuredImage','thumbnail','logo','logoDark','icon']`: if the value is truthy and `new URL(value).hostname === 'res.cloudinary.com'`, the string is replaced in place with:
  ```js
  { publicURL: <original url>,
    childImageSharp: { cloudName: GATSBY_CLOUDINARY_CLOUD_NAME, publicId,
      originalFormat: cache?.format, originalWidth: cache?.width, originalHeight: cache?.height } }
  ```
- `frontmatter.images[]` gets the same treatment for every entry, without the hostname check.
- `publicId = getPublicID(url)` (`gatsby/utils.ts`):
  - takes the part after `/upload/`;
  - drops leading version segments (`v\d+`) and transformation segments (comma lists of `x_...` params);
  - strips the file extension.
- If the publicId is not in the cache: `console.warn('Cloudinary data not found for …')`, and the width, height and format are left undefined.
- **Crash risks:**
  - A non-URL string in one of the five fields makes `new URL()` throw inside onCreateNode. In practice only `featuredImage: null` occurs; the placeholder `featuredImage: IMAGE URL` in `contents/handbook/content/metadata.md` sits in body text, not frontmatter.
  - An `images[]` entry without `/upload/` throws in `getPublicID`.

**`plugins/gatsby-transformer-cloudinary`** (a vendored, trimmed copy):
- `transformTypes` in the config:
  - `RoadmapMedia`, `SqueakTeamCrest`, `SqueakTeamMiniCrest`, `SqueakRoadmapMedia`, `SqueakTeamTeamImage`
  - `MdxFrontmatter{FeaturedImage,Thumbnail,Images,Logo,LogoDark,Icon}ChildImageSharp`
- Each of these types gets a `gatsbyImageData(transformations=[c_fill,g_auto,q_auto], chained, placeholder: TRACED_SVG|BLURRED|NONE, secure=true, logLevel)` resolver, built with `gatsby-plugin-image`'s `getGatsbyImageResolver`. The return type is made nullable.
- The resolver (`gatsby-plugin-image/resolve-asset.js`):
  - Requires `cloudName` and `publicId`. If either is missing it warns and returns `null`.
  - Metadata comes from `originalWidth/originalHeight/originalFormat`. If they fail Joi validation it returns `null`; the code after `return null` that would fetch metadata is unreachable. **So a Cloudinary asset missing from `cloudinaryCache` gets `gatsbyImageData: null`.**
  - URLs are built with `cloudinary.url(publicId, {cloud_name, secure, transformation:[{fetch_format: format||'auto', width, height, raw_transformation: transformations.join(',')}, ...chained]})`.
  - `placeholder: 'blurred'` fetches a low-res URL with axios and base64-encodes it. `'tracedSVG'` uses an `e_vectorize` URL.
- Asset upload and node creation (`node-creation/`) only run if `apiKey`, `apiSecret` and `cloudName` are passed as plugin options. The config passes none, so **no `CloudinaryAsset` nodes are ever created**. The `CloudinaryAsset` type is still registered.
- **Port equivalent:** for any `{cloudName, publicId, originalWidth, originalHeight, originalFormat}` object, generate responsive Cloudinary URLs (`f_auto`, `c_fill,g_auto,q_auto`, `w_`/`h_`).

**Squeak and Strapi images** (roadmap `media`, team `crest`/`miniCrest`/`teamImage`): these objects are built at source time as:
```js
{ ...strapiImage, cloudName: GATSBY_CLOUDINARY_CLOUD_NAME,
  publicId: X.data.attributes.provider_metadata.public_id,
  originalHeight/Width: X.data.attributes.height/width,
  originalFormat: X.data.attributes.ext minus '.' }
```
For `teamImage`, the path is `teamImage.image.data.attributes...`.

**Other image paths:**
- `Plugin.logo` is a remote File for `logo.png`.
- `SlackEmoji.localFile` is a remote File downloaded with `createRemoteFileNode`.
- `ShopifyProduct.featuredImage` is a `@proxy` of `featuredMedia.preview.image` (a raw `originalSrc` URL).

---

## 5. MDX node derived fields (`onCreateNode`, plus git-metadata and schema)

**Slug computation:**
```ts
let slug = createFilePath({ node, getNode, basePath: 'pages' })
// gatsby-source-filesystem createFilePath: uses parent File.relativePath, drops the extension,
// "index" collapses to its directory, always leading and trailing "/". e.g. contents/docs/foo/index.mdx -> "/docs/foo/"
if (parent?.sourceInstanceName && REPO_CONFIGS[parent.sourceInstanceName]) {
  // only 'posthog-main-repo': { stripPrefix: '/docs/published/', pathPrefix: '' }
  if (slug.startsWith('/docs/published/')) slug = slug.substring('/docs/published/'.length)
  if (!slug.startsWith('/')) slug = '/' + slug
  slug = pathPrefix + slug
}
fields.slug = replacePath(slug)   // strips one trailing "/" unless slug === "/"
```
- `basePath: 'pages'` has no effect here, because `relativePath` is already relative to `contents/` (or to the repo root for the clone). The slug is simply the path under `contents/`, without the extension, with `index` collapsed.
- The un-stripped `slug` (still with its trailing `/`) is what the pageViews lookup and the `/docs/(apps|cdp)` regex checks use.
- gatsby-plugin-mdx v3 also exposes its own built-in `Mdx.slug`. createPages uses `node.fields?.slug || node.slug`.

**`fields.*` on Mdx:**

| Field | How it is computed |
|---|---|
| `wordCount` | `stripFrontmatter(rawBody).split(/\s+/).length` |
| `slug` | as above |
| `pageViews` | Lookup of `slug.slice(0,-1)` (the slug without its trailing `/`) in the pageviews cache from onPreBootstrap; `0` if not found. Only set when the slug is truthy. |
| `appConfig` | Only when the slug matches `/docs/(apps\|cdp)` **and** `frontmatter.github` is set **and** `GITHUB_API_KEY` is set. Calls `GET api.github.com/repos/{owner}/{name}` to get `default_branch`, then fetches `raw.githubusercontent.com/{owner}/{name}/{branch}/plugin.json` and stores its `config`. Errors are logged, not thrown. |
| `templateConfigs` | Only when the slug matches `/docs/(apps\|cdp)` **and** `frontmatter.templateId` (an array) is set. Fetches `https://us.posthog.com/api/public_hog_function_templates?limit=350/` once (memoized) and, for each templateId, adds `{templateId, inputs_schema, name, type}`. Errors are logged. |
| `contributors` | git-metadata plugin: `[{avatar, url, username}]`, unique commit authors. Only for files under `contents/`. |
| `commits` | git-metadata plugin: `[{author:{login,avatar_url,html_url}\|null, date, message, url}]`, up to 30. |
| (parent File) `fields.gitLogLatestDate` | The latest commit's `committedDate`, or `new Date()` (the build time) if unknown or there is no token. |

**Schema and resolver-derived fields:**
- `Mdx.isFuture: Boolean!` = `new Date(frontmatter.date) > new Date()`. A missing date gives `false`.
- `Frontmatter.authorData: [AuthorsJson] @link(by:"handle", from:"author")`. `frontmatter.author` is a handle or an array of handles, joined to `src/data/authors.json` entries by `handle`.
- `AuthorsJson.profile: SqueakProfile @link(by:"squeakId", from:"profile_id")`.
- `Contributors.profile: SqueakProfile @link(by:"github", from:"url")`. Matches `SqueakProfile.github` against the contributor's GitHub profile URL.
- `Contributors.teamData` (createResolvers): finds the first Mdx where `frontmatter.github == source.username` and returns `{name, jobTitle}` from that Mdx's frontmatter.
- `File.category` (createResolvers): the first folder of `relativePath`, capitalized, with `-` replaced by a space.
- `SqueakTeam.objectives`: the Mdx where `fields.slug == /teams/${team.slug}/objectives`.
- `Frontmatter` has many explicitly typed keys so queries compile even when no file uses them:
  - `badge, report{…}, inboxExample{…}, premise, tldr, shortTitle, pocketGuideOrder, isPrimer, section`
  - `watches[], requires[], pocketGuideCta{…}, category, schedule, appTemplate, seo{metaTitle,metaDescription}`
  - `hogpedia{tagline, aliases, categories, notices, seeAlso, infobox{title,hog,caption,rows}, references, external, talk, talkFor, featured, didYouKnow}`
  - `name, allowed_tools, featureFlag, hideFromIndex, price, platformLogo, platformIconName, platformSourceType, featuredImageCaption, sourceId`
  - All other frontmatter keys are inferred.
- `SitePage.searchContentId @proxy(from:"context.id")`, used by Algolia.

---

## 6. Node types, grouped by source

Shorthand: env var names below are the required ones. "Crash" means an unguarded fetch: if the env var is missing (URL becomes `undefined/...`) or the API is down, the error propagates through `Promise.all`, and the `sourceNodes` failure fails the build. "Skip" means it returns early or fails soft. All `id`s are `createNodeId(<key>)`. FK means foreign key.

### 6.1 `gatsby/sourceNodes.ts`

| Type | Source | Env | Missing or failing | Fields and notes |
|---|---|---|---|---|
| `McpTool` | `raw.githubusercontent.com/PostHog/posthog/${GATSBY_POSTHOG_BRANCH\|\|master}/services/mcp/schema/tool-definitions-all.json` | (branch optional) | skip (try/catch) | `name` (map key), `title` (falls back to name), `summary, category, feature` |
| `api_endpoint` (schema also declares `ApiEndpoint`) | OpenAPI spec at `POSTHOG_OPEN_API_SPEC_URL \|\| https://app.posthog.com/api/schema/`, parsed with redoc `OpenAPIParser` + `MenuBuilder.buildStructure`; uses the last menu group's items | optional | **crash** (unguarded) | `name`, `url: /docs/api/<name with _→->`, `items` (JSON string of `operationSpec[]`), `components` (JSON string `{schemas}` of all `$ref`'d schemas, collected recursively), `nextURL`/`previousURL`. Groups with more than 20 endpoints are chunked into `name`, `name-2`, `name-3`… with next/previous links. |
| `ProductUsageStats` | `POST us.posthog.com/api/environments/2/endpoints/product_active_usage_30d/run` (Bearer) | `POSTHOG_APP_API_KEY` | skip | `product, unique_users, unique_orgs` |
| `ProductData` (single node) | `GET ${BILLING_SERVICE_URL}/api/products-v2?display_friendly=true` | `BILLING_SERVICE_URL` | **crash** | `products` (billing payload; typed partially: plans/tiers/features/addons) |
| `Tool` | local `src/data/tools` | – | – | `handle, name, description, searchDescription, searchTitle, slug, category, status, aliases` (`@dontInfer`) |
| `Roadmap` | `${GATSBY_SQUEAK_API_HOST}/api/roadmaps`, paged 100, populate image, teams.miniCrest, topic, cta, profiles(avatar, teams.miniCrest), githubUrls, githubPRMetadata | `GATSBY_SQUEAK_API_HOST`, `GATSBY_CLOUDINARY_CLOUD_NAME` | **crash** | `strapiID` (Strapi id), `date = dateCompleted\|\|projectedCompletion`, `year`, `type` (= category), `media` (Cloudinary obj), `projectedCompletion, dateCompleted`, plus all other attributes (`title, description, complete, teams{data}, topic{data}, profiles{data}, githubUrls, githubPRMetadata{…}`, …). Also feeds `/changelog.rss`. |
| `ChangelogVideo` | YouTube `playlistItems` for `CHANGELOG_YOUTUBE_PLAYLIST_ID` (default `PLnOY1RYHjDfxcuWI_L1xwuhoXAsxR59VL`), then the `videos` API in batches of 50 | `YOUTUBE_API_KEY_CHANGELOG` | skip (warn) | `videoId, publishedAt, title`. Shorts (≤60 s) are dropped. Sorted newest first. |
| `PostCategory` | `${SQUEAK}/api/post-categories?populate=*`, paged | SQUEAK | **crash** if the host is missing (`postCategories?.` guards only the null data case) | Strapi shape: `attributes{label, folder, post_tags{data[{attributes{label,folder}}]}}` |
| `CommunityStats` | `${SQUEAK}/api/topics`, then for site-wide and for each topic, 4 count queries on `/api/questions` and `/api/replies` (`withCount`) | SQUEAK | skip (warn) | `topicId` (null = site-wide), `topicSlug, topicLabel, questions, resolved, replies, helpful` |
| `MerchNavigation`, `ShopifyProduct`, `ShopifyCollection` | Shopify Admin GraphQL `https://${GATSBY_MYSHOPIFY_URL}/admin/api/${GATSBY_SHOPIFY_ADMIN_API_VERSION}/graphql.json` (`X-Shopify-Access-Token`) | `GATSBY_MYSHOPIFY_URL`, `GATSBY_SHOPIFY_ADMIN_API_VERSION`, `SHOPIFY_APP_PASSWORD` | skip if any is missing; **crash** on fetch error | **MerchNavigation**: the first `merch_navigation` metaobject's first field's referenced collections, `frontpage` first: `{url:/merch/<handle>, title, handle}`. **ShopifyProduct**: products of the collections `frontpage` and `kits` with `status=ACTIVE` and a `featuredMedia`; `.nodes` wrappers are flattened. Fields: `description, descriptionHtml, featuredMedia, handle, media[], metafields[], options[], priceRangeV2, shopifyId, status, title, tags, totalInventory, createdAt, category`, plus `variants[]` (all productVariants, paged and joined on `variant.product.shopifyId`). **ShopifyCollection**: `handle, products: [{shopifyId}]`, linked to ShopifyProduct by `shopifyId`. |
| `SlackEmoji` | `slack.com/api/emoji.list` | `SLACK_API_KEY` | skip | `name, url`. onCreateNode downloads `url` to a File and sets `fields.localFile`; `localFile: File @link(from:"fields.localFile")`. |
| `G2Review` | `data.g2.com/api/v1/survey-responses?page[size]=100`, following `links.next` (`Token` auth) | `G2_API_KEY` | skip | the raw review, `attributes{title, star_rating, submitted_at, comment_answers{love,hate,benefits{value}}}` |
| `CloudinaryImage` | Cloudinary Admin `resources/image?prefix=hogs&type=upload&max_results=500` | 3 Cloudinary vars | skip | the full resource: `public_id, secure_url, folder, …` |
| `ResearchMergedPr` | GitHub search, unauthenticated: `org:posthog is:pr is:merged -repo:posthog/posthog.com author:<6 handles>` | – | skip (warn) | Titles must match `^(feat\|epic)`; newest 8 kept. Fields: `title, url, repo, author, mergedAt`. |
| `PostHogPipeline` | `us.posthog.com/api/public_hog_function_templates?type={transformation\|destination\|source_webhook}&limit=350`. For `segment-*` ids it also fetches `raw.githubusercontent.com/posthog/segment-docs/.../catalog/<id>/index.md`, rebrands and cleans it | `GITHUB_API_KEY` (gates the whole block) | skip | The full template (`name, description, icon_url, status, category[], inputs_schema[]…`), plus `pipelineId` (= template id), `slug` (transformation: strip `plugin-`; others: strip `template-`), `type`, `introSnippet` (text before the first H1/H2), `installationSnippet` ("## Installation" + the "Getting started" section). **FK:** `mdx: Mdx @link(by:"frontmatter.templateId", from:"pipelineId")`. |
| `SelfDrivingPullRequest` | GitHub search on `repo:PostHog/posthog`, merged and open drafts containing "from an inbox report"; body must contain `posthog-code://inbox` | `GITHUB_API_KEY\|\|GITHUB_TOKEN` optional | skip | `prNumber, title, summary, type, scope` (parsed from the conventional-commit title), `url, state` (merged/draft/open), `openedAt, mergedAt` |
| `PostHogWorkflowTemplate` | `us.posthog.com/api/public_hog_flow_templates?limit=350` | – | **crash** | `templateId` (= id), plus the full template (`name, description, image_url, created_at, created_by{first_name,last_name}`). onCreateNode sets `fields.slug = slugify(name, {lower, strict})`. |
| `SdkReferences` | `${SQUEAK}/api/sdk-references`, for each id in `SUPPORTED_SDK_IDS` (`src/components/SdkReferences/utils`): 1 row whose version contains "latest" plus the newest 10 others, sorted `createdAt:desc` | SQUEAK | **crash** | The node is `attributes.data` spread directly, including its own `id`. Fields: `info{…}, referenceId, hogRef, id, categories, classes[{functions[…]}], types[…], version` |
| `Event` | `${SQUEAK}/api/events`, paged, `sort date:desc`, populate location.venue, photos, speakers, partners | SQUEAK | **crash** | `strapiID`, plus the raw `attributes{name, description, date, startTime, private, format, audience, speakerTopic, attendees, vibeScore, video, presentation, link, location{label,lat,lng,venue}, partners, photos, speakers}` |
| `Achievement` | `${SQUEAK}/api/achievements?populate=icon,achievement_group.achievements.icon&publicationState=preview` | SQUEAK | **crash** | `strapiID`, plus attributes spread |
| `AchievementGroup` | `${SQUEAK}/api/achievement-groups?populate=achievements.icon,icon` | SQUEAK | **crash** | `strapiID, Title, description, tiered, icon{data{attributes{url}}}`, achievements |
| `Reward` | `${SQUEAK}/api/points/rewards` | SQUEAK | **crash** | the raw reward. The id is keyed on `handle`. |
| `PostHogSource` | `us.posthog.com/api/public_source_configs` | – | skip (try/catch) | `sourceId` (= config.name), `slug` (from `docsUrl` `/docs/cdp/sources/<slug>`, else slugified label), `name, icon_url` (`https://us.posthog.com`+iconPath), `docsUrl, unreleased, beta, featured, caption, sourceFields, tables, permissionsCaption, featureFlag`. **FK:** `mdx: Mdx @link(by:"frontmatter.sourceId", from:"sourceId")`. |
| `EarlyAccessFeature` | `${GATSBY_POSTHOG_API_HOST\|\|https://us.i.posthog.com}/api/early_access_features/?token=…&stage=concept,alpha,beta`, plus `/api/surveys/?token=`, plus the waitlist HogQL query (`POST us.posthog.com/api/projects/2/query/`, Bearer `POSTHOG_ROADMAP_API_KEY`) | `GATSBY_POSTHOG_API_KEY` (`POSTHOG_ROADMAP_API_KEY` optional) | skip | `name, description, stage, documentationUrl, flagKey, featureId` (UUIDv7), `payload` (the feature's own payload, falling back to `{survey_id, survey_question_id}` from the launched `api` survey with `linked_flag_key == flagKey`), `waitlistCount` (survey-sent count over 24 months, or null), `assignee{type,name}` |

### 6.2 `plugins/gatsby-source-squeak` (option `apiHost = GATSBY_SQUEAK_API_HOST`; every fetch is unguarded, so it **crashes** if the host is missing or down)

| Type | Source | Fields and FKs |
|---|---|---|
| `SqueakProfile` | `/api/profiles`, paged 100. Filter: (`startDate` not null and ≤ now) OR `id` in the `profile_id`s from `authors.json`. Populate avatar, teams, leadTeams, quotes, color. | `squeakId` (Strapi id), `avatar` (= `avatar.data.attributes`: url, formats, width, height…), plus all attributes (`firstName, lastName, color, github, location, country, teams{data}, leadTeams, companyRole, startDate, …`). Referenced by `AuthorsJson.profile` (squeakId ← profile_id) and `Contributors.profile` (github ← url). |
| `SqueakTopicGroup` | `/api/topic-groups?populate[topics][fields]=id` | `slug, label`, `topics → SqueakTopic` (link by node id = `createNodeId('squeak-topic-'+strapiId)`) |
| `SqueakTopic` | `/api/topics`, page 1, size 100 only | `squeakId, slug, label, …` |
| `SqueakTeam` | `/api/teams` (100). Populate roadmaps(id), profiles (filtered to started, `populate=*`), leadProfiles, crest, crestOptions, miniCrest, teamImage.image, tagline | `squeakId, name, slug, tagline, description, createdAt, crestOptions{…}, profiles{data[…]}, emojis → [SlackEmoji] (by name)`; `crest`/`miniCrest`/`teamImage` as Cloudinary objects; `roadmaps → [SqueakRoadmap]` (by node id). Derived `objectives` (an Mdx, see section 5). |
| `SqueakRoadmap` | `/api/roadmaps`, paged, populate teams(id), image, likes, cta | `squeakId, title, description, tagline, slug, dateCompleted, projectedCompletion, category, milestone, completed, betaAvailable, githubUrls, profiles, emojiReactions, likes, cta`; `media` (Cloudinary obj); if an image exists, `url` = image URL; `teams → [SqueakTeam]` (by node id); `githubPages[]`: for each github.com URL, GitHub GraphQL batches of 50 per repo, 4 concurrent, 3 retries → `{title, html_url, number, closed_at, reactions{total_count, plus1, minus1, hooray, heart, eyes}}`, or `{}` if missing. Only populated if `GITHUB_API_KEY` is set and `GATSBY_MINIMAL!=='true'`, else `[]`. (The image-based `id` is overwritten by `squeak-roadmap-<id>` because that key comes later in the object literal.) |
| `StrapiImage` | type only | `url` |

### 6.3 `plugins/gatsby-mapbox-locations` (option `mapboxToken = MAPBOX_TOKEN`; skips with a warning if missing)

- Reads the existing `SqueakProfile` nodes that have `teams.data.length > 0` and either `location` or `country`.
- Calls the Mapbox batch geocode `POST /search/geocode/v6/batch` in batches of 50:
  - with `location`: `{q: location, types:[place, region, country]}`
  - otherwise: `{q: country, types:[country]}`
- A failed batch logs a warning and is skipped.
- **`MapboxLocation`** fields: `profileId` (the SqueakProfile **node id**, which is the FK), `location` (the query string), `coordinates{latitude, longitude}`.

### 6.4 `plugins/gatsby-source-git-metadata` (options `owner:'PostHog'`, `repo:'posthog.com'`, defaults `contentPath:'contents'`, `commitLimit:30`)

- `onPreInit`:
  - With no `GITHUB_API_KEY` it warns and skips, so there are no contributors or commits and `gitLogLatestDate` is the build time.
  - Otherwise it globs `contents/**/*.{md,mdx}`; if nothing matches it **throws**.
  - It sends GitHub GraphQL `history(first:30, path)` aliases on `defaultBranchRef`: 100 paths per query, 8 concurrent, 5 attempts with jittered backoff. **It throws after 5 failures, which crashes the build.**
- `onCreateNode` adds `fields.contributors` and `fields.commits` to Mdx/MarkdownRemark (section 5), and `fields.gitLogLatestDate` to the parent File. This applies only to files under `contents/`, not the git clone.
- `index.js` is `// noop`.

### 6.5 `gatsby-source-ashby` (npm package; option `apiKey = ASHBY_API_KEY`)

- With no key it logs an error and returns (skip).
- If the key is set but a request fails, `request()` returns undefined and the following `.forEach` throws (crash).
- **`AshbyCustomField`** (`customField.list`).
- **`AshbyJob`** (`job.list`, status Open). `customFields[].value` is resolved to the selectable label.
- **`AshbyJobPosting`** (`jobPosting.list` with listedOnly, plus `jobPosting.info` for each as `info`). `parent = jobId`, which links it to AshbyJob.
- Fields added in onCreateNode (`gatsby/onCreateNode.ts`):
  - `fields.title`: title with " (Remote)" removed.
  - `fields.slug`: `/careers/${slugify(title,{lower})}`.
  - `fields.locations`: from Ashby `location.info` for the primary and secondary locationIds; "(", ")" and "remote" are removed; failures return null. **Risk:** `.replace` on a null location name throws.
  - `fields.html` and `fields.tableOfContents`: if `descriptionHtml` contains `<h2>`, each h2 section is wrapped in `<details open><summary>`, the "Benefits" section is removed, and each h2 gets an id from slugify. TOC entries are `{value, url: id, depth: 0}`.

### 6.6 `Plugin` nodes (handled in onCreateNode only)

- The `Plugin` type is declared, but nothing in these files creates Plugin nodes, so this branch is likely dead.
- If such nodes existed, with a github.com `url` and `GITHUB_API_KEY` set, onCreateNode would:
  - fetch the repo README and download it as a remote File: `markdown___NODE`, and `slug=/integrations/<slugify name>`;
  - download `logo.png` from the default branch: `logo___NODE`.

### 6.7 `AgentSkill` (from the git-clone File nodes)

- Condition: a File with `sourceInstanceName==='posthog-main-repo'`, `name==='SKILL'`, and `relativeDirectory` containing `/skills/`.
- `relativeDirectory` is `products/<product>/skills/<skill-name>`.
- Frontmatter is parsed with a minimal YAML reader for `name` and `description`; folded `>-` scalars are joined.
- Fields: `product`, `name` (falls back to the directory name), `description`, `sourcePath` (= relativeDirectory), `mcpTools` (unique `posthog:<tool>` matches in the body).
- `parent` is the File id. Any failure is a warning and the file is skipped.

---

## 7. `onPreBootstrap` (`gatsby/onPreBootstrap.ts`)

1. **`invalidateGitCacheIfBranchChanged()`** (section 3).
2. **`enrichVideos()`** (`gatsby/enrichVideos.ts`):
   - For each entry in `src/data/videos`:
     - Wistia: oEmbed `fast.wistia.com/oembed?url=https://home.wistia.com/medias/<id>`, giving `thumbnail_url` and `title`.
     - YouTube: thumbnail `https://img.youtube.com/vi/<id>/maxresdefault.jpg`; title from the YouTube Data API (`YOUTUBE_API_KEY`; skipped with a warning if missing).
   - Title rule: the API title wins over the manual title.
   - Writes **`public/videos-metadata.json`**.
   - Per-video failures are soft. The write itself is unguarded and fails if `public/` does not exist.
3. **PostHog snippet:** if both `GATSBY_POSTHOG_API_KEY` and `GATSBY_POSTHOG_API_HOST` are set, writes **`static/scripts/posthog-init.js`**:
   - array.js comes from `${GATSBY_POSTHOG_ASSET_HOST}/static/1/array.js` if that var is set, else `${API_HOST}/static/array.js`.
   - Init options: `api_host, ui_host (GATSBY_POSTHOG_UI_HOST), asset_host+strict_script_versioning, capture_pageview:false, capture_pageleave, scroll_root_selector ['[data-scroll-root]','html'], persistence 'localStorage+cookie', cookie_persisted_properties ['prod_interest'], uuid_version v7, session_recording masking, error_tracking, before_send` (drops `$exception` events on localhost), `person_profiles 'identified_only'`, several `__preview_*` flags, and `rageclick {click_count:4, timeout_ms:750}`.
   - Otherwise the file is not written.
4. **Hedgehog assets:** `fs.cpSync(node_modules/@posthog/hedgehog-mode/assets, public/hedgehog-mode)`. This is unguarded and crashes if the package is missing.
5. **MCP tools:** `fetchAndProcessMCPTools()` (`gatsby/utils/fetchMCPTools.ts`):
   - Fetches `.../PostHog/posthog/refs/heads/master/services/mcp/schema/tool-definitions-all.json` and `exec-command-reference.md` (15 s timeouts; the markdown is cut to start at its first `## `).
   - Result shape: `{categories:[{name, feature, tools:[{name, summary, description (≤300 chars)}]}] sorted, byName:{[tool]:{summary, description, category, required_scopes}}, execCommands, error}`.
   - Written to **`src/data/mcp-tools.json`**, even on error (then with null fields). Cached in Gatsby cache `onPreBootstrap@@mcp-tools` on success.
6. **Scout skills:** `fetchScoutSkills()` (`gatsby/utils/fetchScoutSkills.ts`):
   - Fetches 3 `SKILL.md` files from `.../master/products/ai_observability/backend/scouts/signals-scout-ai-observability-{daily-digest,costly-users,error-patterns}.md`.
   - Result shape: `{skills: {[key]: {name, description, raw}} | null, error}`. One failure nulls the whole result.
   - Written to **`src/data/scout-skills.json`**.
7. **Pageviews:** if `POSTHOG_APP_API_KEY` is set and nothing is cached yet:
   - `GET https://app.posthog.com/api/projects/2/insights/trend` for `$pageview` with `$host=posthog.com`, over 30 days, broken down by normalized `$pathname`, limit 2000.
   - Builds `{pathname: count}` and stores it in the Gatsby cache `onPreBootstrap@@posthog-pageviews`. onCreateNode reads it for `fields.pageViews`.
   - A non-200 response logs an error and returns (soft).

---

## 8. Remark plugins

- **`plugins/gatsby-remark-video`** (active): visits mdast `image` nodes. If the URL ends in `.mp4`, the node becomes `html` with value `<video autoplay loop muted playsinline src="<url>"></video>`. Port: a remark or rehype plugin that turns `![](x.mp4)` into an autoplaying muted looping `<video>`.
- **`plugins/gatsby-remark-inline-jsx-paragraphs`** (active):
  - Skips files whose `fileAbsolutePath` includes `/contents/pocket-guides/`.
  - For **top-level** (`parent.type==='root'`) `html`/`jsx` nodes, wraps the value in `<p>…</p>` (leading and trailing whitespace kept) when all of these hold:
    - it is a single line;
    - it starts with `<` followed by a capital letter (a JSX component, e.g. `<Foo …>`);
    - it is not already a `<p>`;
    - it has a matching `</Foo>` or is self-closing.
  - Purpose: inline components written on their own line render as paragraphs, keeping the spacing of normal text. In MDX v2+/Astro these become `mdxJsxFlowElement` nodes, so the port needs an equivalent that wraps single-line flow JSX in a paragraph.
- **`plugins/gasby-remark-lazy-imgix`** (**not registered**): would turn images into lazy `<img class="gatsby-resp-image-image">`, with an imgix `srcSet` for local `/…png|jpg` (dimensions probed from `public/`), and wrap them in `<a>` when the image starts the line. Ignore it.
- **`gatsby-remark-autolink-headers`** (npm, `icon:false`): adds slug `id`s to headings. The port needs `rehype-slug` (no anchor icon).

---

## 9. Missing env vars at a glance

**Build crashes** (unguarded fetch or throw):
- `GATSBY_SQUEAK_API_HOST`: squeak plugin; sourceNodes Roadmap, PostCategory, SdkReferences, Event, Achievement, AchievementGroup, Reward; sitemap `getQuestionPages`.
- `BILLING_SERVICE_URL`: ProductData.
- OpenAPI spec unreachable: `POSTHOG_OPEN_API_SPEC_URL` has a default, but the fetch is unguarded.
- `public_hog_flow_templates` unreachable: PostHogWorkflowTemplate.
- Shopify API errors, but only when all 3 Shopify vars are set.
- `ASHBY_API_KEY` set but the API is failing.
- `GITHUB_API_KEY` set but GitHub GraphQL fails 5 times (git-metadata).
- `@posthog/hedgehog-mode` package missing.
- Non-URL values in the five frontmatter image fields, or an `images[]` entry without `/upload/`.

**Skipped or degraded:**

| Env var | Effect when missing |
|---|---|
| `GITHUB_API_KEY` | No contributors, commits, appConfig, PostHogPipeline nodes, or roadmap githubPages. `gitLogLatestDate` is the build time. |
| `POSTHOG_APP_API_KEY` | No pageViews (all 0) and no ProductUsageStats. |
| `CLOUDINARY_API_KEY/SECRET/GATSBY_CLOUDINARY_CLOUD_NAME` | No dimension cache, so frontmatter `gatsbyImageData` is null. No CloudinaryImage nodes. A missing cloud name also nulls all Squeak/Strapi image data. |
| `SLACK_API_KEY` | No SlackEmoji. |
| `G2_API_KEY` | No G2Review. |
| `MAPBOX_TOKEN` | No MapboxLocation. |
| `ASHBY_API_KEY` | No jobs. |
| `YOUTUBE_API_KEY` | Manual video titles are kept. |
| `YOUTUBE_API_KEY_CHANGELOG` | No ChangelogVideo. |
| `GATSBY_POSTHOG_API_KEY` | No EarlyAccessFeature, and no `posthog-init.js` (that file also needs `GATSBY_POSTHOG_API_HOST`). |
| `POSTHOG_ROADMAP_API_KEY` | `waitlistCount` is null. |
| Shopify vars (any of the 3) | No merch nodes. |
| Algolia vars (`GATSBY_ALGOLIA_APP_ID`, `ALGOLIA_API_KEY`, `GATSBY_ALGOLIA_INDEX_NAME`) | Algolia plugin is not loaded. |
| `GATSBY_POSTHOG_BRANCH` | Defaults to `master`. |
| `GATSBY_MINIMAL=true` | Disables roadmap GitHub reactions (and devtool). |

**Soft regardless of env:** McpTool, CommunityStats (warns and skips if the host is missing), ResearchMergedPr, SelfDrivingPullRequest, PostHogSource, mcp-tools.json and scout-skills.json (written with `error:true` on failure), and git-clone failure (`reporter.error`, then the build continues without main-repo docs).
