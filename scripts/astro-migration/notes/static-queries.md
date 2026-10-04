# `useStaticQuery` inventory: /Users/rafael/Documents/posthog/posthog.com/src

## Scope and counts

`grep -rl useStaticQuery src` finds **125 files**. **115 of them actually run a static query.** The other 10 don't:
- **Docs only (3):** `src/components/Products/Slides/README.md`, `src/components/Products/Slides/examples.md`, `src/components/SelfDrivingInbox/README.md`. The README contains a sample query: allMdx `/tutorials/` plus allProductData, identical to `pages/ai`.
- **Import but never call it (5):** `components/AI/CustomPersonasSlide.tsx`, `components/GlossaryElement/index.tsx`, `components/Home/Test/Demos.tsx`, `components/Product/MaxAI/index.tsx`, `components/Product/ProductOS/index.tsx`.
- **`src/pages/roadmap/sidecar.tsx`:** defines a `graphql` query (allSqueakRoadmap with beta_available, team, githubPages, etc.) but never runs it. Dead code.
- **`src/templates/BlogPost.tsx`:** uses an exported page query (`BlogPostLayout($id)` plus `SEOFragment`), not `useStaticQuery`. It imports `useStaticQuery` without using it. Mentioned only because it shows up in the grep.

**Shared query constants (imported and run in other files):**
- `allProductsData`, defined in `components/Pricing/Pricing.tsx`, is run by `GroupAnalytics/Sections.tsx`, `Pricing/Platform/usePlatform.ts`, `Pricing/PricingCalculator/Tabbed.tsx` and `Pricing/Products.tsx`.
- `teamQuery`, defined in `components/People/index.tsx`, is run by `components/Product/TeamMembers.tsx` and `hooks/useTeamCrestMap.ts`.

All paths below are relative to `/Users/rafael/Documents/posthog/posthog.com/`.

### Where the node types come from
- **Mdx:** `contents/**` via gatsby-source-filesystem and gatsby-plugin-mdx. Some fields are added by custom code in `gatsby/`:
  - `isFuture`, `authorData`, `fields.pageViews` and `slug` come from `gatsby/onCreateNode.ts`, `gatsby/createResolvers.ts` and `gatsby/createSchemaCustomization.ts`.
  - `parent.fields.gitLogLatestDate` comes from `plugins/gatsby-source-git-metadata`.
- **Squeak\* types** (SqueakProfile, SqueakTeam, SqueakRoadmap, SqueakTopicGroup): `plugins/gatsby-source-squeak/gatsby-node.ts`, which reads the Strapi API at `GATSBY_SQUEAK_API_HOST`.
- **Other Strapi types** (Roadmap, PostCategory, CommunityStats, Event, Achievement, AchievementGroup, Reward): `gatsby/sourceNodes.ts`, also fetching from `GATSBY_SQUEAK_API_HOST/api/...`.
- **Types from other sources, all in `gatsby/sourceNodes.ts` unless noted:**

| Node type | Source |
|---|---|
| ProductData | `BILLING_SERVICE_URL/api/products-v2` |
| PostHogPipeline | us.posthog.com/api/public_hog_function_templates |
| PostHogSource | /api/public_source_configs |
| PostHogWorkflowTemplate | /api/public_hog_flow_templates |
| EarlyAccessFeature | PostHog /api/early_access_features |
| McpTool | raw.githubusercontent posthog `tool-definitions-all.json` |
| SelfDrivingPullRequest | GitHub search API |
| SlackEmoji | slack emoji.list |
| CloudinaryImage | Cloudinary admin API, prefix `hogs` |
| ShopifyProduct | Shopify Admin GraphQL |
| AshbyJobPosting / AshbyJob | `gatsby-source-ashby` plugin |
| AgentSkill | `gatsby/onCreateNode.ts`, parsing `SKILL.md` files from the gatsby-source-git `posthog-main-repo` clone |
| TestimonialsJson | `src/data/testimonials.json` via filesystem and the JSON transformer |
| site.siteMetadata | `gatsby-config.js` siteMetadata |

### How the image fields work
- **Mdx frontmatter images** (`featuredImage`, `thumbnail`, `icon`, `logo`, `images[]`):
  - `gatsby/onCreateNode.ts` rewrites Cloudinary URLs into `{ publicURL: <original url>, childImageSharp: {cloudName, publicId, ...} }`.
  - The `childImageSharp.gatsbyImageData` resolver comes from the local `plugins/gatsby-transformer-cloudinary` (see `transformTypes` in `gatsby-config.js`). There is **no sharp**.
- **Squeak `crest`, `miniCrest`, `teamImage` and roadmap `media`:** these are also Cloudinary transform types, so they expose both `gatsbyImageData` and the raw Strapi `data.attributes.url`.
- Abbreviations used below: GID = `gatsbyImageData`, CIS = `childImageSharp`, pURL = `publicURL`.

---

## 1. Mdx (`allMdx` / `mdx`): 38 files

### 1a. Single `mdx(...)` lookups that read a body
| File | Query |
|---|---|
| components/Home/Control/index.tsx | `homepageMdx: mdx(fileAbsolutePath regex /contents/index\.mdx/) { rawBody mdxBody: body }` |
| components/WizardPage/index.tsx | `mdx(slug eq "wizard") { rawBody mdxBody: body }`, same shape as Home/Control |
| components/Product/Install.tsx | `mdx(slug eq "docs/getting-started/_snippets/install") { body }` |
| components/SnippetRenderer/index.tsx | `mdx(slug eq "docs/integrate/snippet") { rawBody }` |
| components/ProductTabs/index.tsx | `mdx(slug eq "") { frontmatter { images { publicURL childImageSharp { gatsbyImageData } } } }`. **pURL + CIS/GID** |

### 1b. Blog lists, categories and tags (`/blog/`, `/newsletter/`)
- **components/Blog/BlogPosts/index.tsx:** `allMdx(filter rootPage eq "/blog", sort date DESC) { edges.node { fields.slug id excerpt(250) frontmatter { date title rootPage featuredImage { publicURL } } } }`. **pURL**
- **components/Blog/constants/categories.tsx:** `data: allMdx(filter isFuture false, slug /^\/blog\//, date ne null) { categories: group(frontmatter___category) tags: group(frontmatter___tags) { fieldValue } }`
- **components/Tutorials/constants/tags.tsx:** the same group pattern on `/^\/tutorials\//`, `tags` group only.
- **components/Hogpedia/blogPosts.ts:** allMdx `/blog/`, isFuture false, tags nin ["Comparisons"], limit 6, selecting `fields.slug, frontmatter{title date}`.
- **pages/sparks-joy/hoglr/index.tsx** (multi-source; also listed under SqueakProfile):
  - `blog`: allMdx `/blog/`, limit 20, selecting `excerpt(150) slug frontmatter{title date featuredImage{publicURL childImageSharp{gatsbyImageData(480x270)}} authors: authorData{handle name profile_id profile{avatar{url}}}}`
  - `newsletter`: allMdx `/newsletter/`, limit 2, selecting `excerpt(170) slug title date`
  - **pURL + CIS/GID**

### 1c. Tutorials
- **Identical queries:** **components/TutorialsList/index.tsx** and **components/TutorialsSlider/index.tsx**. Representative:
  ```graphql
  allMdx(filter: { fields: { slug: { regex: "/^/tutorials/" } } }, limit: 1000) {
    nodes { id fields { slug } frontmatter { title tags featuredImage { childImageSharp { gatsbyImageData(width: 514, height: 289) } } }
      parent { ... on File { fields { date: gitLogLatestDate(formatString: "MMM 'YY") } } } }
  }
  ```
  **CIS/GID**
- **components/Home/Tutorials.js:** `tutorials: allMdx(filter featuredTutorial eq true) { slug frontmatter { title featuredImage { childImageSharp { gatsbyImageData(placeholder: NONE) } } } }`. **CIS/GID**
- **Identical queries, both combined with ProductData:** **pages/ai/index.tsx** and **pages/hog/index.tsx** (also the sample in Products/Slides/README.md):
  ```graphql
  allMdx(filter: { fields: { slug: { regex: "/^/tutorials/" } } }) { nodes { fields { slug } rawBody frontmatter { title description } } }
  allProductData { nodes { products { name type unit addons { name type unit plans { name plan_key included_if features { key name description limit note } } }
    plans { name plan_key free_allocation included_if features {...} tiers { unit_amount_usd up_to } } } } }
  ```
- **hooks/useContentData.ts:** the same selection (`slug rawBody title description`) with regex `/^\/(tutorials|product-engineers|founders|docs)\//`. A near-duplicate of the pages/ai Mdx part.

### 1d. Apps, CDP and templates (`thumbnail.publicURL` + `filters`)
- **Near-identical queries:**
  - **components/Apps/index.js:** `apps: allMdx(slug regex /^\/apps\/(?!.*\/docs).*/)`
  - **components/Home/Apps.js:** `pipelines: allMdx(slug regex /^\/cdp\/(?!.*\/docs).*/, limit 16)`
  - Both select `id fields.slug frontmatter { thumbnail{publicURL} title badge price filters{type maintainer} }`. **pURL**
- **components/IngestionPipelinesList/index.tsx:** allMdx `/cdp/` with `filters.type regex /data-in/`, selecting `id frontmatter{title description documentation thumbnail{publicURL}}`. **pURL**
- **components/TemplatesLibrary/index.tsx:** `mdxTemplates: allMdx(/^\/templates\/(?!.*\/docs).*/)`. Same selection as Apps plus `subtitle`, and also queries `allPostHogWorkflowTemplate` (§9). **pURL**

### 1e. Docs and libraries (platform lists)
- **Near-identical queries, all selecting `allMdx(filter: { frontmatter: { title: { ne: null } } }) { nodes { slug frontmatter {...} } }` over every Mdx node:**
  - **hooks/docs/useFrameworkList.ts:** frontmatter `{ title platformLogo platformIconName }`
  - **hooks/docs/usePlatformList.ts:** frontmatter `{ title platformLabel platformLogo platformIconName platformSourceType }`
  - **hooks/docs/useServicesList.ts:** frontmatter `{ title icon { publicURL } }`. **pURL**
- **components/Docs/Integrate.tsx:** two aliases, `sdks` and `frameworks`, each `allMdx(slug in [explicit list of /docs/libraries/*])`.
  - Fragment `sdk`: `slug title platformLogo icon{publicURL} features{eventCapture userIdentification autoCapture sessionRecording featureFlags groupAnalytics surveys aiObservability errorTracking}`
  - Fragment `framework`: `slug title sidebarTitle platformLogo icon{publicURL}`
  - `sdks` is sorted by `fields___pageViews`. `useStaticQuery(query)` is called twice in this file. **pURL**
- **components/LibraryComparison/index.tsx:** `sdks: allMdx(slug glob "docs/libraries/*")`, fragment `Library`: `slug title features{... logs tracing}`. Close to the Integrate `sdk` fragment.
- **components/Products/InstallFrameworkGrid/index.tsx:**
  - `libraries`: allMdx `/^\/docs\/libraries\/[^/]+$/`, selecting `slug title platformLogo icon{publicURL}`
  - `productInstalls`: allMdx `/^\/docs\/[^/]+\/installation\/[^/]+$/`, selecting `slug`
  - **pURL**
- **components/AskMax/index.tsx:** `allDocsPages: allMdx(slug regex "^/docs/") { totalDocsCount: totalCount }`

### 1f. Pocket guides, self-driving and SKILL files
- **components/PocketGuides/LearnSurface.tsx:** `pages: allMdx(/^\/pocket-guides\//) { body fields.slug }`
- **components/PocketGuides/bookModel.tsx:** the same filter, selecting `slug frontmatter{title shortTitle pocketGuideOrder pocketGuideCta{kind label prompt href note requires{label}}}`
- **hooks/usePocketGuideCounts.ts:** the same filter, selecting `slug frontmatter{title pocketGuideOrder isPrimer}`
- **Identical queries:** **components/PocketGuides/useSkillFile.ts** (`skills:` alias) and **components/SelfDrivingInbox/index.tsx** (`scouts:` alias). Both run `allMdx(slug regex "/\/SKILL$/") { rawBody fields.slug frontmatter{name description} }`.
- **components/SelfDrivingInbox/index.tsx** also runs `guides: allMdx(/^\/pocket-guides\/self-driving\//)`. It selects a large frontmatter set: `title shortTitle subtitle filters premise tldr watches requires category schedule appTemplate report{...}`.
- **components/SelfDrivingInbox/FromOurInbox.tsx:** `examples: allMdx(/^\/docs\/self-driving\/from-our-inbox\/_examples\//)`, selecting `frontmatter{category report{...} inboxExample{reportId publishedAt outcome pullRequest{url title mergedAt} resolution{label resolvedAt}}}`

### 1g. Hogpedia, customers, teams and handbook
- **components/Hogpedia/data.ts:** allMdx `/^\/hogpedia\//`, title ne "", sorted by title, selecting `excerpt(180) slug frontmatter{title description hogpedia{aliases categories}}`
- **components/Hogpedia/loreFacts.ts:** `lore: allMdx(slug regex /\/handbook\/company\/lore\/?$/) { rawBody }`
- **hooks/useCustomers.tsx:** `allCustomers: allMdx(/^\/customers\//) { fields.slug }`
- **pages/customers/index.tsx:** `stories: allMdx(/^\/customers\//, sort date DESC, limit 1) { slug title date }`
- **pages/teams/[slug].tsx** (multi-source; also in SqueakTeam, SlackEmoji and Ashby):
  - `allTeams: allMdx(/^\/teams\/[^/]+$/) { slug body }`
  - `allObjectives: allMdx(/^\/teams\/[^/]+\/objectives$/) { slug body }`

---

## 2. SqueakProfile (`allSqueakProfile`): 17 files

- **Near-identical "profiles lookup by squeakId" group:** **components/Academy/PostQuote.tsx**, **components/Careers/MegaQuote/index.tsx** (identical to PostQuote) and **components/Careers/TeamQuotes/index.tsx** (adds `quotes { id quote }`). Representative:
  ```graphql
  profiles: allSqueakProfile { nodes { avatar { formats { thumbnail { url } } } firstName lastName squeakId
    companyRole location country startDate color leadTeams { data { id } } teams { data { attributes { name } } } } }
  ```
- **Smaller subsets of the same lookup:**
  - **components/BuiltBy/index.tsx:** avatar thumbnail, firstName, lastName, squeakId
  - **components/TeamMember/index.tsx:** avatar thumbnail, names, squeakId, companyRole, location, country, color
  - **components/Products/Slides/VideosSlide.tsx:** names, squeakId, avatar thumbnail, color, pineappleOnPizza, `teams{data{attributes{slug}}}`
  - **components/SideProjects/index.tsx:** squeakId, names, companyRole, github, color, `avatar{url formats{thumbnail{url}}}`, `teams{data{id}}`
- **Identical "team members" queries:** **pages/hogreads.tsx** and **pages/hogspace.tsx**:
  ```graphql
  team: allSqueakProfile(filter: { teams: { data: { elemMatch: { id: { ne: null } } } }, squeakId: { ne: 28378 } }) { nodes { squeakId firstName lastName avatar { url } } }
  ```
  **pages/sparks-joy/hoglr/index.tsx** uses the same filter and fields, aliased `teamMembers: nodes`.
- **components/People/index.tsx** (`export const teamQuery`), also run by **components/Product/TeamMembers.tsx** and **hooks/useTeamCrestMap.ts**:
  - `team: allSqueakProfile(same filter, sort startDate ASC) { teamMembers: nodes { squeakId avatar{url} biography names companyRole country color location pronouns pineappleOnPizza startDate teams{data{id attributes{name slug}}} leadTeams{...} } }`
  - `allTeams: allSqueakTeam(name ne Hedgehogs, crest.publicId ne null) { id name crest{data{attributes{url}}} miniCrest{gatsbyImageData(20x20)} }`
  - **GID**
- **pages/teams/team-ben.tsx:** `bens: allSqueakProfile(firstName regex /^Ben/i, sort startDate)`, with fields similar to the People `teamMembers`, plus `allSqueakTeam(name ne Hedgehogs){name slug}`
- **components/EventForm/index.tsx:** `allSqueakProfile(sort firstName, filter firstName ne "", teams elemMatch) { squeakId names companyRole color avatar{url} }`, plus `allEvent` groups (§7)
- **components/Careers/SmallTeams/index.tsx:** `profiles: allSqueakProfile(teams elemMatch id ne null) { totalCount }`, plus SqueakTeam
- **pages/components/index.tsx:** `allProfiles: allSqueakProfile(teams elemMatch) { id squeakId }`, plus SqueakTeam

---

## 3. SqueakTeam (`allSqueakTeam`): 24 files

**Common filter:** `filter: { name: { ne: "Hedgehogs" }, crest: { publicId: { ne: null } } }`. Some files filter on `miniCrest.publicId` instead.

- **Identical queries:** **pages/teams.tsx** and **pages/teams/index.tsx**. Representative:
  ```graphql
  allTeams: allSqueakTeam(filter: { name: { ne: "Hedgehogs" }, crest: { publicId: { ne: null } } }) { nodes { id name slug createdAt tagline description
    profiles { data { id attributes { color firstName lastName avatar { data { attributes { url } } } } } } leadProfiles { data { id } }
    crest { data { attributes { url } } } crestOptions { textColor textShadow fontSize frame frameColor plaque plaqueColor imageScale imageXOffset imageYOffset } } }
  ```
- **pages/small-teams.tsx:** the same as above minus `description`, plus `miniCrest{data{attributes{url}}}`. Near-duplicate.
- **Identical queries:** **components/Presentation/Utilities/TeamMembers.tsx** and **components/ProfessionalServices/index.tsx**. Both run `allTeams: allSqueakTeam { id name slug profiles{data{id attributes{color names avatar{data{attributes{url}}}}}} leadProfiles{data{id}} }` with no filter.
- **Near-identical queries (Ashby + teams):** **components/Careers/CareersHero/index.tsx** and **components/Careers/JobListings/index.tsx**.
  - Teams part: `allTeams: allSqueakTeam { id name [slug] description crest{...url} crestOptions{...} leadProfiles profiles{data{id attributes{country names companyRole location startDate pineappleOnPizza leadTeams avatar{data{attributes{url}}} color}}} }`
  - JobListings adds `slug` and `fields.locations`. The Ashby part is described in §5.
- **miniCrest via gatsbyImageData:**
  - **components/Careers/Pizza/index.tsx:** filter miniCrest.publicId ne null, `{ id name slug miniCrest{gatsbyImageData(80x80)} profiles{data{attributes{pineappleOnPizza}}} }`. **GID**
  - **components/Careers/SmallTeams/index.tsx:** crest filter, `{ id name slug miniCrest{gatsbyImageData(64x64)} }`, plus a profiles totalCount. **GID**
  - **components/SmallTeam/index.tsx:** no filter, `{ id name tagline slug miniCrest{gatsbyImageData(20x20)} crest{data{attributes{url}}} }`. **GID**
  - **components/Roadmap/EarlyAccessFeaturesSection.tsx:** no filter, `{ slug name miniCrest{gatsbyImageData(40x40)} profiles{data{id attributes{names companyRole avatar url}}} }`. **GID**
  - **components/People/index.tsx**, reused by Product/TeamMembers.tsx and useTeamCrestMap.ts: `miniCrest{gatsbyImageData(20x20)}` (see §2). **GID**
- **miniCrest via the raw URL:**
  - **components/HogMap/PeopleMap.tsx:** `TeamMiniCrestQuery`, `allSqueakTeam(filter miniCrest.publicId) { name miniCrest{data{attributes{url}}} }`
  - **pages/components/index.tsx:** crest filter, sort name, `{ id name slug miniCrest{data{attributes{url}}} profiles{...avatar url} }`, plus a profiles query
- **Crest and name lists:**
  - **components/Team/index.tsx:** `allTeams`(crest filter){id name crest url}, `allTeamSlugs`(name ne Hedgehogs){slug}, plus `allSlackEmoji{totalCount}` and `allAshbyJobPosting`
  - **pages/teams/[slug].tsx:**
    - `allTeamsData` (the same crest query as Team/index)
    - `allSqueakTeam(name ne Hedgehogs) { id name slug emojis{name localFile{publicURL}} roadmaps{squeakId betaAvailable complete dateCompleted title description media{gatsbyImageData publicId data{attributes{mime}}} githubPages{...reactions} projectedCompletion cta{label url}} }`
    - Also Mdx, SlackEmoji and Ashby. **GID + pURL**
  - **pages/wip.tsx:** crest filter, `{ id objectives{body excerpt(250)} name slug crest{data{attributes{url}}} }`
- **Minimal queries:**
  - **pages/teams/new/index.tsx:** `allSqueakTeam { id name slug }`
  - **pages/careers-og/index.tsx:** `allTeams: allSqueakTeam { name }`, plus Ashby
  - **pages/teams/team-ben.tsx:** `{ name slug }` (see §2)
  - **hooks/useRoadmapEarlyAccessFeatures.ts:** `allSqueakTeam { slug name profiles{data{attributes{firstName lastName}}} }`
- **Roadmaps nested in teams:** **hooks/useRoadmap.tsx** runs `RoadmapQuery: allSqueakTeam { name tagline roadmaps{squeakId betaAvailable complete dateCompleted title description image{url} githubPages{title html_url number closed_at reactions{hooray heart eyes plus1}} projectedCompletion} }`

---

## 4. SqueakRoadmap (`allSqueakRoadmap`): 7 files

- **Identical queries:** **components/Home/Board/index.tsx**, **components/InsidePostHog/FeatureRequests.tsx** and **components/Roadmap/index.tsx**:
  ```graphql
  staticRoadmaps: allSqueakRoadmap { nodes { githubPages { reactions { total_count } } squeakId } }
  ```
- **Identical queries:** **components/Home/Timeline.js** and **components/Home/TimelineNew/index.tsx**:
  ```graphql
  allSqueakRoadmap(filter: { milestone: { eq: true } }, sort: { fields: dateCompleted }) { nodes { squeakId dateCompleted(formatString: "YYYY-MM-DD") title projectedCompletion(formatString: "YYYY-MM-DD") category cta { url } description } }
  ```
- **Near-identical queries:** **components/Home/Roadmap.js** and **components/Home/New/Roadmap.tsx**. Both use two aliases:
  - `wip`: `complete ne true, projectedCompletion ne null`
  - `underConsideration`: `dateCompleted eq null, projectedCompletion eq null`
  - Roadmap.js selects `squeakId title githubPages.reactions.total_count likes{data{id}}`. New/Roadmap selects `id squeakId title betaAvailable description`.
- Also: `pages/roadmap/sidecar.tsx` (dead query), plus SqueakTeam.roadmaps in useRoadmap.tsx and teams/[slug].tsx.

## 4b. Roadmap (Strapi `allRoadmap`, from `gatsby/sourceNodes.ts`): 4 files

- **Near-identical queries (same filter, different group field):**
  - **components/Changelog/CategoryFilter.tsx:** `allRoadmap(filter complete eq true, date ne null) { group(field: topic___data___attributes___label) { fieldValue } }`
  - **components/Changelog/TeamFilter.tsx:** the same, with `group(field: teams___data___attributes___name)`
- **components/Product/RecentChange.tsx:** `allRoadmap(complete eq true, sort date DESC) { teams{data{attributes{name}}} title date("MMM YYYY") description cta{label url} }`
- **pages/hogpedia/recent-changes.tsx:** `allRoadmap(complete, date ne null, sort date DESC, limit 50) { date title description cta{label url} }`

## 4c. SqueakTopicGroup: 1 file
- **src/navs/useTopicsNav.js:** `topicGroups: allSqueakTopicGroup { label slug topics { label slug } }`

---

## 5. AshbyJobPosting (gatsby-source-ashby): 7 files

**Common filter:** `allAshbyJobPosting(filter: { isListed: { eq: true } })`.

- **components/AshbyOpenRoles/index.tsx:** `{ jobs: nodes { fields{title slug} parent{... on AshbyJob{customFields{value title}}} externalLink departmentName } departments: group(departmentName){title: fieldValue} }`
- **components/Careers/CareersHero/index.tsx:** the same, plus `fields.html` and `info{descriptionHtml}` (plus SqueakTeam)
- **components/Careers/JobListings/index.tsx:** the same as CareersHero, plus `fields.locations`. Near-duplicate.
- **pages/careers-og/index.tsx:** `jobs: nodes{fields{title slug locations} parent{customFields} departmentName}`, plus `allSqueakTeam{name}`
- **Identical Ashby part:** **components/Team/index.tsx** and **pages/teams/[slug].tsx**. Both run `allAshbyJobPosting(isListed) { nodes { fields{title slug} parent{... on AshbyJob{customFields{value title}}} } }`.
- **pages/careers.tsx:** `allAshbyJobPosting(sort publishedDate DESC) { nodes { publishedDate title } }`, with no isListed filter.

---

## 6. ProductData (`allProductData`, billing service): 11 files

There are **three separate definitions of an `allProductsData` constant**, plus inline copies:
- **components/Pricing/Pricing.tsx** (`export const allProductsData`, run in this file too). Imported and run by **components/GroupAnalytics/Sections.tsx**, **components/Pricing/Platform/usePlatform.ts**, **components/Pricing/PricingCalculator/Tabbed.tsx** and **components/Pricing/Products.tsx**. Representative:
  ```graphql
  allProductData { nodes { products { description docs_url image_url icon_key inclusion_only contact_support
    addons { contact_support description docs_url image_url icon_key inclusion_only name type unit legacy_product
      features { key name description category limit note entitlement_only is_plan_default unit }
      plans { description docs_url image_url name plan_key product_key unit flat_rate unit_amount_usd features {...} tiers { current_amount_usd current_usage flat_amount_usd unit_amount_usd up_to } } }
    name type unit usage_key legacy_product
    plans { description docs_url features {...} free_allocation image_url included_if name plan_key product_key contact_support unit_amount_usd tiers {...} unit } } } }
  ```
- **hooks/useProducts.tsx** (local constant): the same as Pricing.tsx, plus `addons.plans.free_allocation`. Near-duplicate.
- **components/Pricing/Test/Calculator.tsx** (inline): the same as Pricing.tsx minus `legacy_product` and `addons.features`. Near-duplicate.
- **components/Pricing/Plans/index.tsx** (local constant): an older subset with no `icon_key`, `flat_rate` or `legacy_product`, plus `addons.plans.included_if`. Near-duplicate.
- **components/Products/ReaderViewProduct/templates/Plans.tsx:** `PlatformAndSupportFeatures`, a small subset: `products{type plans{plan_key included_if features{key name limit note unit entitlement_only category}}}`
- **pages/ai/index.tsx** and **pages/hog/index.tsx:** an identical slim selection combined with tutorials Mdx (see §1c).

---

## 7. Other Strapi / Squeak API nodes from `gatsby/sourceNodes.ts`: 1 file each, except Event

| Node | File | Query |
|---|---|---|
| Event | components/EventForm/index.tsx | `allEvent { format: group(field: attributes___format) audience: group(attributes___audience) { fieldValue } }` |
| Achievement + AchievementGroup | pages/community/achievements.tsx | `allAchievement(points gt 0, achievement_group.data.id eq null) { id: strapiID title points description icon{data{attributes{url}}} }` and `allAchievementGroup { Title description tiered icon{...} achievements{data{id attributes{title points description icon}}} }` |
| Reward | components/Points/index.tsx | `allReward { id handle title description price image merchStoreHandle discountAmount }` |
| PostCategory | templates/PostListing.tsx | `allPostCategory(attributes.folder nin [null, customers, spotlight, changelog, comparisons, notes, repost]) { attributes{label folder post_tags{data{attributes{label folder}}}} }` |
| CommunityStats | components/Products/ReaderViewProduct/templates/CommunityQuestions.tsx | `allCommunityStats { topicId questions resolved replies helpful }` |

Event is the only one used elsewhere: EventForm.tsx also queries SqueakProfile.

## 8. PostHog public APIs: PostHogPipeline (4 files), PostHogSource (3 files), PostHogWorkflowTemplate (1 file)

- **components/IntegrationsLibrary/index.tsx:**
  - `sources: allPostHogSource { name slug icon_url unreleased }`
  - `destinations` / `transformations: allPostHogPipeline(type eq ...) { id slug name category description icon_url type mdx{fields{slug}} status }`
- **components/Product/Pipelines/index.js:** `destinations`, `transformations` and `source_webhooks` aliases on allPostHogPipeline. Same fields as IntegrationsLibrary, plus `mdx.body` and `inputs_schema{key type label [secret] required description}`. Near-duplicate.
- **components/Home/HeroCarousel/slides.tsx:** `allDestinations: allPostHogPipeline(type destination, status ne coming_soon) { totalCount nodes{slug name icon_url mdx{fields{slug}}} }`
- **src/navs/useDataPipelinesNav.ts:** `allPostHogPipeline(filter mdx.id eq null) { slug name type status }`
- **Near-identical queries (same filter and sort):**
  - **hooks/useSourcePlatforms.ts:** `allPostHogSource(unreleased ne true, sort name ASC) { name slug icon_url }`
  - **src/navs/useSourcesNav.ts:** the same, selecting `{ slug name beta }`
- **components/TemplatesLibrary/index.tsx:** `workflowTemplates: allPostHogWorkflowTemplate { templateId fields{slug} name description image_url created_at created_by{first_name last_name} }`

## 9. Single-use sourced types: 1 file each

| Node | File | Query |
|---|---|---|
| McpTool | components/McpToolsList/index.tsx | `allMcpTool { name title summary feature }` |
| AgentSkill | hooks/skills.tsx | `allAgentSkill { product name description sourcePath mcpTools }` |
| EarlyAccessFeature | hooks/useEarlyAccessFeatures.ts | `allEarlyAccessFeature { name description stage documentationUrl flagKey featureId waitlistCount payload assignee{type name} }` |
| SelfDrivingPullRequest | components/LiveSelfDrivingLoop/index.tsx | `allSelfDrivingPullRequest { prNumber summary type scope url state openedAt mergedAt }` |
| CloudinaryImage | components/RoadmapForm/index.tsx | `allCloudinaryImage(folder eq "hogs") { secure_url public_id }` |
| TestimonialsJson | components/TestimonialsTable/index.js | `testimonials: allTestimonialsJson { featuresUsed quote author{name role company{name url}} }` |

## 10. SlackEmoji: 2 files
- **components/Team/index.tsx** and **pages/teams/[slug].tsx:** `allSlackEmoji { totalCount }`

## 11. ShopifyProduct: 3 files
- **Identical queries:** **templates/merch/Checkout.tsx** and **templates/merch/hooks.ts**. Both run `allProducts: allShopifyProduct { nodes { variants { shopifyId inventoryPolicy } } }`.
- **components/InsidePostHog/Merch.tsx:** `shopifyProduct { featuredMedia { preview { image { width height originalSrc } } } }`, a single node with no filter.

## 12. site.siteMetadata (gatsby-config.js): 2 files
- **components/seo.tsx:** `SEO: site { siteMetadata { defaultTitle: title titleTemplate defaultDescription: description siteUrl: url defaultImage: image twitterUsername } }`
- **components/PostCard/PostCard.tsx:** `DefaultMetaImage: site { siteMetadata { defaultImage: image } }`

---

## gatsby-plugin-image fields

All of these are backed by the local Cloudinary transformer, not sharp.

- **`gatsbyImageData` on Mdx `childImageSharp`:**
  - components/Home/Tutorials.js
  - components/ProductTabs/index.tsx
  - components/TutorialsList/index.tsx
  - components/TutorialsSlider/index.tsx
  - pages/sparks-joy/hoglr/index.tsx
- **`gatsbyImageData` on Squeak `miniCrest`:**
  - components/Careers/Pizza/index.tsx (80x80)
  - components/Careers/SmallTeams/index.tsx (64x64)
  - components/People/index.tsx (20x20, also run by Product/TeamMembers.tsx and useTeamCrestMap.ts)
  - components/SmallTeam/index.tsx (20x20)
  - components/Roadmap/EarlyAccessFeaturesSection.tsx (40x40)
- **`gatsbyImageData` on roadmap `media`:** pages/teams/[slug].tsx
- **`publicURL`:**
  - Mdx `thumbnail`: Apps/index.js, Home/Apps.js, IngestionPipelinesList, TemplatesLibrary
  - Mdx `featuredImage`: Blog/BlogPosts, hoglr
  - Mdx `icon`: Docs/Integrate, Products/InstallFrameworkGrid, hooks/docs/useServicesList.ts
  - Mdx `images`: ProductTabs
  - Squeak team `emojis.localFile`: teams/[slug]
- **Raw Strapi URLs** (`crest/miniCrest/avatar.data.attributes.url`, `avatar.formats.thumbnail.url`): used by most Squeak queries in place of image-plugin fields.

---

## Summary: node type -> number of files that run it

Imports of a shared query constant are counted. Multi-source files are counted under every type they query.

| Node type / root field | Files |
|---|---|
| Mdx (`allMdx` / `mdx`) | 38 |
| SqueakTeam | 24 |
| SqueakProfile | 17 |
| ProductData | 11 |
| SqueakRoadmap | 7 (plus 1 dead query in roadmap/sidecar.tsx) |
| AshbyJobPosting (+ AshbyJob parent) | 7 |
| PostHogPipeline | 4 |
| Roadmap (Strapi) | 4 |
| PostHogSource | 3 |
| ShopifyProduct (`allShopifyProduct` / `shopifyProduct`) | 3 |
| site.siteMetadata | 2 |
| SlackEmoji | 2 |
| PostHogWorkflowTemplate | 1 |
| SqueakTopicGroup | 1 |
| Event | 1 |
| Achievement + AchievementGroup | 1 |
| Reward | 1 |
| PostCategory | 1 |
| CommunityStats | 1 |
| EarlyAccessFeature | 1 |
| McpTool | 1 |
| AgentSkill | 1 |
| SelfDrivingPullRequest | 1 |
| CloudinaryImage | 1 |
| TestimonialsJson | 1 |
| **Total distinct files that run a static query** | **115** (of 125 grep hits) |

## Exact or near-exact duplicate groups

These are the easiest places to consolidate during the migration:
1. **ProductData `allProductsData`:**
   - Pricing.tsx and the 4 files that import it share one query.
   - useProducts, Test/Calculator and Plans/index each hold their own near-copy.
   - pages/ai and pages/hog share an identical slim version.
2. **SqueakRoadmap:**
   - `staticRoadmaps`: Home/Board, InsidePostHog/FeatureRequests, Roadmap/index
   - milestone timeline: Home/Timeline.js, Home/TimelineNew
   - wip/underConsideration: Home/Roadmap.js, Home/New/Roadmap
3. **SqueakTeam:**
   - teams.tsx = teams/index.tsx (near: small-teams.tsx)
   - Presentation/Utilities/TeamMembers = ProfessionalServices
   - CareersHero ≈ JobListings
4. **SqueakProfile:**
   - PostQuote = MegaQuote (near: TeamQuotes)
   - hogreads = hogspace = hoglr `team`
   - the People `teamQuery` is reused by 2 importers
5. **Mdx:**
   - TutorialsList = TutorialsSlider
   - useSkillFile = SelfDrivingInbox `scouts`
   - WizardPage ≈ Home/Control
   - Apps/index ≈ Home/Apps (≈ TemplatesLibrary `mdxTemplates`)
   - useFrameworkList / usePlatformList / useServicesList all run the same full-Mdx scan with different frontmatter fields
   - Integrate `sdk` fragment ≈ LibraryComparison
   - the three pocket-guide queries share one filter
   - Blog/constants/categories ≈ Tutorials/constants/tags
6. **Others:**
   - Changelog CategoryFilter ≈ TeamFilter
   - useSourcePlatforms ≈ useSourcesNav
   - IntegrationsLibrary ≈ Product/Pipelines
   - merch/Checkout = merch/hooks
   - Team/index and teams/[slug] share the SlackEmoji, crest and Ashby sub-queries

