# PocketGuides

Shared content and teaching components for pocket guides inside the Learn platform.

## Authoring requirements

- Follow the [pocket guide handbook](../../../contents/handbook/wizard-and-docs/pocket-guides.mdx). Use the [Product Analytics guide](../../../contents/pocket-guides/product-analytics/) as the current reference for story and design.
- Use Twig.com as the canonical example app and its imaginary product engineering team as the story's characters.
- Teach concepts through the team's questions, evidence, and decisions. Explain enough in the guide to keep reading; link to docs for reference details.
- Choose a chapter structure that fits the story. A fixed "101, then use cases" outline and a CTA in every chapter are not required.
- End the final chapter with a concrete handoff into PostHog: an app link, a prompt for an agent using the PostHog MCP, or setup steps that apply the lesson to the reader's project. No specific CTA component is required.
- Keep narrative prose in MDX. Reuse existing teaching components and Twig views before adding new components.

## Learn integration

Pocket guides should open and remain inside their product's Learn tab, with chapters in the product sidebar. Product Analytics already uses this integration. The standalone `BookReader` remains available during migration and is planned for deprecation after the remaining guides move to Learn.

The Learn rendering path is:

1. `src/pages/docs/<product>/learn.tsx` and `learn/[...chapter].tsx` render `LearnPage`.
2. `LearnPage.tsx` reads `pocketGuideVolume` from product data and supplies the product navigation through `ReaderView`.
3. `LearnSurface.tsx` selects a chapter from `useBookPages(volumeId)` and loads its compiled MDX body. An empty or unknown chapter falls back to the introduction.
4. `EntryProvider` supplies page data and the Learn `basePath`. `MDXProvider` uses `bookMdxComponents`, including `ReaderWrapper`, to render the body.

Product Analytics has a separate choice page, `ProductAnalyticsLearnLanding.tsx`, at `/docs/product-analytics/learn`. Its story starts at `/docs/product-analytics/learn/introduction`. Legacy Product Analytics pocket-guide URLs redirect to Learn routes.

## Content and registration

```text
contents/pocket-guides/<volume>/
├── index.mdx              pocketGuideOrder: 0 — introduction
└── <chapter>/
    └── index.mdx          pocketGuideOrder: 1+ — subsequent chapters
```

| Location | Purpose |
| --- | --- |
| `contents/pocket-guides/<id>/` | Introduction and chapter MDX |
| `src/constants/pocketGuides.ts` | Volume metadata and destination helpers |
| `src/hooks/productData/<product>.tsx` | Product's `pocketGuideVolume` |
| `src/pages/docs/<product>/learn.tsx` and `learn/[...chapter].tsx` | Learn entry and chapter routes; follow Product Analytics |
| `volumeArt.tsx` | Shared cover illustration registry; reuse existing brand art |
| `Action.tsx` / `VOLUME_SUBCOMMAND` | Optional wizard command for `<Setup />` |

`useBookPages` selects pages with numeric `pocketGuideOrder`, excludes sibling `SKILL.md` files and `_`-prefixed paths, and sorts by order. Use order 0 for the introduction. Omitting the order removes a page from this reading sequence; it is not an access-control mechanism. `shortTitle` overrides the navigation label; otherwise the title is used.

For a new frontmatter field used in GraphQL, check the declarations in `gatsby/createSchemaCustomization.ts`. Add the required schema declaration rather than relying on inference for sparse fields. Clear Gatsby's cache after schema changes.

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

`LeftPage` and `RightPage` are authoring markers, not a two-column layout. Both Learn and standalone BookReader use `ReaderWrapper`:

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
| `Setup`, `Frontispiece`, `Eyebrow` | Optional setup command and title-page elements |
| `ReportFigure`, `ScoutFigure`, `SkillFigure`, `Watches`, `Enable` | Existing scout-related content; see the [SelfDrivingInbox README](../SelfDrivingInbox/README.md) |

The scout format is still evolving. Its implementation conventions are not requirements for other guides.

### MDX parsing constraints shared by Learn and BookReader

Learn renders the same compiled MDX bodies and component map as standalone BookReader. Changing the surface does not change the source parser or bypass the remark plugins.

Keep inline components inside the same source line as surrounding prose:

```mdx
The team inspects an <Term name="event" /> before continuing.
```

Avoid starting a continuation line with inline JSX. This is a defensive authoring convention for the current MDX pipeline, not a BookReader-only layout rule. The exact paragraph-splitting behavior has not been reproduced in this audit; do not assume every line-leading tag produces the same result.

Block components such as figures should have their own blocks with blank lines around them.

The `gatsby-remark-inline-jsx-paragraphs` plugin skips files whose source path contains `/contents/pocket-guides/`. This exemption applies in both Learn and BookReader. Outside that directory, the plugin wraps top-level, single-line capitalized JSX with a matching closing tag or self-closing tag in `<p>`. It is not limited to self-closing components. Check the plugin guard if a pocket-guide block component receives invalid paragraph nesting.

## Product Analytics teaching examples

- `ProductAnalyticsExhibits.tsx`, `ProductAnalyticsIdentityExhibits.tsx`, and `ProductAnalyticsTrendsFunnelsExhibits.tsx` own guide-specific teaching state and examples.
- `TwigBrowseFigure.tsx` and related figures reuse version-pinned `@posthog/twig-components` views and assets.
- `PostHogInspector.tsx` provides the shared event and identity inspection UI. `SessionReplayInspector.tsx` provides a playback-synced event timeline.
- Practice events and booking responses are local simulations. Do not send them to a live PostHog project or submit real bookings. This constraint concerns teaching data; it does not prohibit the site's own interaction analytics.
- Twig.com owns its application and real instrumentation. `twig-components` owns reusable Twig views, data, styles, and lab UI. PostHog.com owns guide prose, teaching fixtures, and PostHog figures.
- Review package updates in both consuming sites. Check narrow and wide containers in light and dark mode.

Use the source files for current fixture values, timing, and interaction details rather than treating this README as a second fixture specification.

## Styling and verification

Learn inherits docs prose styles from `ReaderView`; standalone `BookPage` applies `getProseClasses`. Both use the shared component mappings. Use project color tokens and container queries for resizable app windows. Preserve Twig styling in embedded Twig views.

`ReaderWrapper` hides the annotation hint below `@2xl`; annotation markers remain visible. At wider container sizes, its marker opacity rule supports hover reveal. Keep captions sufficient to explain the figure without hover, and check the figure's own annotation implementation.

For changes:

1. Run `pnpm test:pocket-guides` for shared content and registration constraints. This also runs in the deploy preview workflow; it does not enforce every authoring recommendation.
2. Run the relevant navigation checks (`pnpm test:navs`) when changing Learn routes or navigation helpers.
3. Start the site with `pnpm start` and load affected Learn pages. Check links, chapter navigation, console errors, and interactive examples.
4. For visual changes, follow the repository's screenshot requirements at narrow and wide widths in light and dark mode. Verify reduced-motion behavior for animated examples.
5. If standalone pages are also affected, check those separately while BookReader remains supported. Run redirect checks when changing redirects.

## Standalone BookReader only: retained during migration

The following behavior belongs to the existing standalone view. Do not use it as the target architecture for new Learn integrations.

| File | Standalone responsibility |
| --- | --- |
| `BookPage.tsx` | Explorer window, standalone prose styles, font-size setting, and optional pinned action bar |
| `BookReader.tsx` | Contents panel, compact navigation, Aa control, margin turn zones, and page-position footer |
| `bookModel.tsx` | Also exports standalone font-size and page-turn hooks; `useBookPages` and route helpers remain shared with Learn |

`src/templates/Template.tsx` sends standalone `/pocket-guides/` slugs to `BookPage`. Its `ActionBar` or `EnableScoutBar` is supplied by `BookPage`, not by `LearnSurface`. Do not assume authoring `pocketGuideCta` creates a pinned bar inside Learn. The optional `<Action />` body component remains available through the shared component map.

Standalone front matter is unnumbered; subsequent pages receive generated page numbers. BookReader's arrow keys, margin zones, and footer links use the shared sequence. These controls are not supplied by `LearnSurface`.

## Existing discovery surfaces

These components remain in use during migration. They are distinct from the standalone BookReader itself:

- `Cover.tsx` renders a face-out cover; `Book.tsx` renders a compact spine and exports `BookShelf`.
- Both use `pocketGuideUrl(volume)` for their default destination. `Cover` also accepts a destination override. Keep routing decisions in the shared helpers.
- `VolumeCard.tsx` combines a cover, description, and CTA. `GuidesForProduct.tsx` selects a volume by `docsProduct` and returns nothing when none matches.
- `usePocketGuideCounts.ts` controls displayed counts. By default it counts chapter paths with numeric order greater than 0 and excludes `isPrimer` pages. `countOrientationPages` instead includes numeric orders starting at 0. This display logic does not prescribe a chapter outline.
- `VOLUME_ART` is exported from `volumeArt.tsx` and accessed through `volumeArt()`. It supplies cover and optional frontispiece art; it is not exclusive to `Cover`.
