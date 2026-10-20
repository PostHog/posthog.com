# PocketGuides

Shared content and teaching components for pocket guides inside the Learn platform.

## Authoring requirements

- Follow the [pocket guide handbook](../../../contents/handbook/wizard-and-docs/pocket-guides.mdx). Use the [Product Analytics guide](../../../contents/learn/product-analytics/pocket-guide/) as the current reference for story and design.
- Use Twig.com as the canonical example app and its imaginary product engineering team as the story's characters.
- Teach concepts through the team's questions, evidence, and decisions. Explain enough in the guide to keep reading; link to docs for reference details.
- Choose a chapter structure that fits the story. A fixed "101, then use cases" outline and a CTA in every chapter are not required.
- End the final chapter with a concrete handoff into PostHog: an app link, a prompt for an agent using the PostHog MCP, or setup steps that apply the lesson to the reader's project. No specific CTA component is required.
- Keep narrative prose in MDX. Reuse existing teaching components and Twig views before adding new components.

## Learn integration

Pocket guides open and remain inside their product's Learn tab, with chapters in the product sidebar. Guides without a Learn tab render inside their product's docs. There is no standalone book reader.

The rendering path is:

1. `gatsby/createPages.ts` builds one page per chapter. `pocketGuidePageContext` in `src/constants/pocketGuides.ts` maps each source file to its volume's `learnPath`, and every page uses `src/templates/PocketGuide.tsx`. Full and minimal builds share this helper. Each chapter has its own title and canonical URL in the initial HTML. There are no client-only chapter routes.
2. The template renders `LearnPage` for products with a Learn tab, or `DocsPocketGuide` for Self-driving and Data Stack. `LearnPage.tsx` reads `pocketGuideVolume` from product data and supplies the product navigation through `ReaderView`. `DocsPocketGuide.tsx` supplies the product's existing docs `TreeMenu`, without product tabs.
3. `LearnSurface.tsx` renders the chapter from page context, using `useBookPages(volumeId)` for reading order. An empty or unknown chapter falls back to the introduction.
4. `EntryProvider` supplies page data and the guide's `basePath`. `MDXProvider` uses `bookMdxComponents`, including `ReaderWrapper`, to render the body.

### Routes

| Volume | Public URL |
| --- | --- |
| Product Analytics | Overview at `/learn/product-analytics`; guide at `/learn/product-analytics/pocket-guide`; also `/agent-prompts-and-mcp` and `/live-playground` |
| AI Observability, Session Replay, Feature Flags | Guide at `/learn/<product>` |
| Self-driving | `/docs/self-driving/pocket-guide` |
| Data Stack | `/docs/data-warehouse/pocket-guide` |

Product Analytics has a separate choice page, `ProductAnalyticsLearnLanding.tsx`. Every Learn page shows the same flat sidebar, with no section anchors or Back to Learn mode. Product Analytics lists Overview, Pocket guide (chapters nested under it), Agent prompts and MCP, and Live playground, each with an icon. The other products list their chapters. Chapters are numbered in the sidebar ("1. Events"), and each chapter page shows a "Chapter 01" eyebrow above its heading. The number sits outside the `h1`, so the heading and page title stay the chapter's own title. The former `/docs/<product>/learn` and `/pocket-guides/<volume>` URLs redirect permanently to these routes in one hop, including chapter and `.md` paths. The source folder names the course, not the URL, so a route change is one edit to the volume's `learnPath`.

## Content and registration

```text
contents/learn/<volume>/pocket-guide/
├── index.mdx              pocketGuideOrder: 0 — introduction
└── <chapter>/
    └── index.mdx          pocketGuideOrder: 1+ — subsequent chapters
```

| Location | Purpose |
| --- | --- |
| `contents/learn/<id>/pocket-guide/` | Introduction and chapter MDX |
| `src/constants/pocketGuides.ts` | Volume metadata, `learnPath`, and route helpers |
| `src/hooks/productData/<product>.tsx` | Product's `pocketGuideVolume`, which adds the Learn tab |
| `src/templates/PocketGuide.tsx` | Generated chapter page; no per-product route files are needed |
| `vercel.json` | Permanent redirects from any former URL |
| `volumeArt.tsx` | Shared cover illustration registry; reuse existing brand art |
| `Action.tsx` / `VOLUME_SUBCOMMAND` | Optional wizard command for `<Setup />` |

`useBookPages` selects pages with numeric `pocketGuideOrder`, excludes sibling `SKILL.md` files and `_`-prefixed paths, and sorts by order. Use order 0 for the introduction. Omitting the order removes a page from this reading sequence; it is not an access-control mechanism. `shortTitle` overrides the navigation label; otherwise the title is used.

For a new frontmatter field used in GraphQL, check the declarations in `gatsby/createSchemaCustomization.ts`. Add the required schema declaration rather than relying on inference for sparse fields. Clear Gatsby's cache after schema changes.

## Introductions

Place `<CoverWithChapters />` in every guide introduction, after the opening paragraphs, on the left page. Put setup instructions on the right page. The marker renders the shared `Cover` and a centered Start reading button beside the Chapters list; they stack in narrow containers. `<PocketGuideCover />` and `<StartReading>` also work alone (add `align="center"` to center the button). An introduction without `<CoverWithChapters />` shows the Chapters list after its body.

The cover, Start reading, and every chapter link open chapter 1 or the linked chapter with the book-opening transition. Do not add another reading CTA to an introduction. Keep introduction copy in one section beneath the topic heading, without a separate "Where to start" section. Include a setup wizard only when readers need an installed integration to follow along; keep demos and extra illustrations in chapters.

## MDX and figure placement

```mdx
---
title: Events and properties
shortTitle: Events
pocketGuideOrder: 1
---

<LeftPage>

<TwigFilterFigure n={1} />

</LeftPage>

<RightPage>

# Events and properties

The Twig team starts by recording an <Term name="event" />.
Readers can inspect the destination filter in <SeeFig n={1} />.

</RightPage>
```

`LeftPage` and `RightPage` are authoring markers, not a two-column layout. `ReaderWrapper` places the figures:

- Direct children of `LeftPage` whose compiled `mdxType` ends in `Figure` and whose `n` prop is numeric are collected as figures.
- Each collected figure is inserted after the first prose block citing its number with `<SeeFig n={...} />`.
- Uncited collected figures are appended after the prose in numeric order.
- Other `LeftPage` content becomes a preface. In particular, bare `<Fig>` does not participate in citation-based placement. Use an existing named `*Figure` component or `<ExampleFigure>` when appropriate.
- Use one `RightPage` for the prose. Keep chapter content inside the markers rather than depending on ordering of content outside them.

Write code samples and tables as native Markdown. Use figures for teaching UI or other exhibits that need components. `pocketGuides.test.ts` rejects figures containing only a code block or table, with an existing exception for the data-stack volume.

### Component reference

`bookComponents.tsx` is the authoritative list of available MDX components and their imports.

| Component | Purpose |
| --- | --- |
| `LeftPage`, `RightPage`, `SeeFig` | Prose and figure placement |
| `Term` | Short definition and link to its owning docs; definitions live in `terms.tsx` |
| Product Analytics `*Figure` components | Interactive teaching examples used by the reference guide |
| `Fig`, `ExampleFigure` | Figure frame and citation-compatible example wrapper |
| `CTA` | Link styled as a call to action; used by the Product Analytics introduction |
| `LessonFooter` | Next-lesson link and supporting resources; no `nextHref` produces a disabled button |
| `Action` | Optional action from `pocketGuideCta` frontmatter |
| `Setup`, `Frontispiece`, `Eyebrow` | Optional setup command and title-page elements. Put `Eyebrow` inside the heading: `# <Eyebrow>A pocket guide to</Eyebrow> Product Analytics` |
| `CoverWithChapters`, `PocketGuideCover`, `StartReading` | Introduction layout; see [Introductions](#introductions) |
| `ReportFigure`, `ScoutFigure`, `SkillFigure`, `Watches`, `Enable` | Existing scout-related content; see the [SelfDrivingInbox README](../SelfDrivingInbox/README.md) |

The scout format is still evolving. Its implementation conventions are not requirements for other guides.

### MDX parsing constraints

Learn and docs guides render the same compiled MDX bodies and component map. Changing the surface does not change the source parser or bypass the remark plugins.

Keep inline components inside the same source line as surrounding prose:

```mdx
The team inspects an <Term name="event" /> before continuing.
```

Avoid starting a continuation line with inline JSX. This is a defensive authoring convention for the current MDX pipeline. The exact paragraph-splitting behavior has not been reproduced in this audit; do not assume every line-leading tag produces the same result.

Block components such as figures should have their own blocks with blank lines around them.

The `gatsby-remark-inline-jsx-paragraphs` plugin skips files whose source path matches `/contents/learn/<volume>/pocket-guide/`. Outside that directory, the plugin wraps top-level, single-line capitalized JSX with a matching closing tag or self-closing tag in `<p>`. It is not limited to self-closing components. Check the plugin guard if a pocket-guide block component receives invalid paragraph nesting.

## Product Analytics teaching examples

- `ProductAnalyticsExhibits.tsx`, `ProductAnalyticsIdentityExhibits.tsx`, and `ProductAnalyticsTrendsFunnelsExhibits.tsx` own guide-specific teaching state and examples.
- `ProductAnalyticsRetentionExhibits.tsx` supplies `RepeatBookingFigure`, `BookingRetentionFigure`, `SavedStayJourneyFigure`, and `SavedCohortRetentionFigure`. These combine shared Twig views with local event and cohort examples. They do not record events or make bookings.
- `ProductAnalyticsDashboardExhibits.tsx` supplies three dashboard excerpts built from the guide's trend, funnel, and retention examples. Figures animate tile placement when visible; Reset replays the sequence, and reduced motion shows the completed dashboards.
- `ProductAnalyticsDashboardNextSteps.tsx` provides the final project-aware prompt. PostHog AI, Claude Code, and Codex actions use the same prompt. The component also supplies the MCP connection command. Reuse this pattern for a final handoff where appropriate.
- `TwigBrowseFigure.tsx` and related figures reuse version-pinned `@posthog/twig-components` views and assets.
- `PostHogInspector.tsx` provides the shared event and identity inspection UI. `SessionReplayInspector.tsx` provides a playback-synced event timeline.
- Practice events and booking responses are local simulations. Do not send them to a live PostHog project or submit real bookings. This constraint concerns teaching data; it does not prohibit the site's own interaction analytics.
- Twig.com owns its application and real instrumentation. `twig-components` owns reusable Twig views, data, styles, and lab UI. PostHog.com owns guide prose, teaching fixtures, and PostHog figures.
- Review package updates in both consuming sites. Check narrow and wide containers in light and dark mode.

Use the source files for current fixture values, timing, and interaction details rather than treating this README as a second fixture specification.

### Product Analytics Learn hub

- `ProductAnalyticsLearnLanding.tsx` owns the overview's short previews: Learn through a story, Learn with your agent, and Learn by doing. The dedicated `src/pages/learn/product-analytics/agent-prompts-and-mcp.tsx` and `live-playground.tsx` own their full page content. Overview and page copy can change separately. Both pages pass their content to the shared `LearnPage` shell as children; the overview uses its `landing` prop.
- `AgentTeachingActions.tsx` shares the teaching prompt and the Claude Code and Codex launch controls. It exports `AGENT_TEACHING_PROMPT`, so the displayed and launched instructions stay identical. Keep that prompt unchanged unless someone asks for an instruction change. Pass a chapter-specific prompt through the optional `prompt` prop.
- The Live playground page stacks `SessionReplayLinkFigure` (pass `autoPlay` for muted, looping playback), `TwigEventFigure`, and `BookingStepsFigure`. Chapter embeds keep manual playback.

## Styling and verification

Guides inherit docs prose styles from `ReaderView` and use the shared component mappings. Use project color tokens and container queries for resizable app windows. Preserve Twig styling in embedded Twig views.

`ReaderWrapper` hides the annotation hint below `@2xl`; annotation markers remain visible. At wider container sizes, its marker opacity rule supports hover reveal. Keep captions sufficient to explain the figure without hover, and check the figure's own annotation implementation.

For changes:

1. Run `pnpm test:pocket-guides` for shared content and registration constraints. This also runs in the deploy preview workflow; it does not enforce every authoring recommendation.
2. Run the navigation checks (`pnpm test:navs`, which includes `learnRoutes.test.ts`) when changing routes, redirects, or navigation helpers.
3. Start the site with `pnpm start` and load affected Learn pages. Check links, chapter navigation, console errors, and interactive examples.
4. For visual changes, follow the repository's screenshot requirements at narrow and wide widths in light and dark mode. Verify reduced-motion behavior for animated examples.
5. When changing redirects, also check the old URLs on the deploy preview. The local dev server does not apply `vercel.json`.

## Calls to action

`pocketGuideCta` frontmatter drives the optional `<Action />` body component. There is no pinned action bar, so place `<Action />` in the body where the reader should act.

## Discovery surfaces

- `Cover.tsx` renders a face-out cover; `Book.tsx` renders a compact spine and exports `BookShelf`. Covers show no volume number. The shelf lists volumes in `POCKET_GUIDE_VOLUMES` order.
- Both use `pocketGuideUrl(volume)` for their default destination. `Cover` also accepts a destination override; the shelf, introductions, and the Product Analytics overview pass chapter 1. `Cover` opens its destination with the book-opening transition in the current window; `Book` opens a new window. Keep routing decisions in the shared helpers.
- `VolumeCard.tsx` combines a cover, description, and CTA. `GuidesForProduct.tsx` selects a volume by `docsProduct` and returns nothing when none matches.
- `usePocketGuideCounts.ts` controls displayed counts. By default it counts chapter paths with numeric order greater than 0 and excludes `isPrimer` pages. `countOrientationPages` instead includes numeric orders starting at 0. This display logic does not prescribe a chapter outline.
- `VOLUME_ART` is exported from `volumeArt.tsx` and accessed through `volumeArt()`. It supplies cover and optional frontispiece art; it is not exclusive to `Cover`.

## Book-opening transition

`bookOpening.ts` exports `openPocketGuide(event, coverElement, destination)`. It runs the whole transition and the navigation, so destination pages need no animation hooks. `Cover` calls it by default. For a separate reading button, keep its real link and call the function from its click handler with the matching cover element, as `LearnSurface` does for Start reading. The cover is marked with `data-pocket-guide-cover`, and its hinged face with `data-pocket-guide-cover-face`.

The transition animates an inert copy of the cover in a temporary layer clipped to the nearest Radix scroll viewport. The copy freezes computed styles, including container-query typography, so it does not reflow. Page content dissolves while the copy centers and zooms. The front cover swings open to become the left page, with a thin gray gutter line on the hinge, and the camera fits the two-page spread. The book then fades out and the destination replaces the page, with no full-window overlay. Sidebars and other windows do not animate.

- Reduced-motion preferences, modified clicks, and missing measurements keep ordinary link behavior.
- One transition runs per viewport. Cleanup restores the source on completion, cancellation, or failed navigation.
- If the source cover unmounts, or the reader focuses another window, the transition stops instead of overriding the newer route.
- A navigation that stalls for 5 seconds restores the source page.

Run `pnpm exec node --test src/components/PocketGuides/bookOpening.test.ts` after changes.
