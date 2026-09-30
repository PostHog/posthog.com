# Hogpedia

Hogpedia is an encyclopedia about PostHog at `/hogpedia`, presented in the MonoBook style that English Wikipedia used in 2007.

The format is the joke. The facts are not. Every article starts with a plain definition, links to the PostHog source for each claim, and cross-links the other articles.

## What lives where

| Path | Contents |
| --- | --- |
| `contents/hogpedia/*.mdx` | The articles. One file per article. |
| `contents/hogpedia/talk/*.mdx` | The discussion pages. |
| `src/templates/Hogpedia.tsx` | The article template. |
| `src/templates/HogpediaCategory.tsx` | A category listing. |
| `src/pages/hogpedia/` | The Main Page and the meta pages. |
| `src/components/Hogpedia/` | The skin and the article furniture. |

Pages are created in `gatsby/createPages.ts`. Articles are excluded from the generic `Plain` loop there and get their own loop, which also builds a page per category. The frontmatter types are declared in `gatsby/createSchemaCustomization.ts` under `FrontmatterHogpedia`.

## Adding an article

Add one file to `contents/hogpedia/`. Nothing else is needed — the loop, the search index, the article count, `/hogpedia/all-pages` and the category pages all read from the files on disk.

```yaml
---
title: Product analytics
description: One sentence that works with no other context. Used as the meta description and in search results.
hogpedia:
    categories: ['Products', 'Concepts'] # must come from HOGPEDIA_CATEGORIES in categories.ts
    aliases: ['Insights', 'Trends'] # extra search terms
    notices: ['lore'] # maintenance banners; see MaintenanceBanner.tsx
    infobox:
        title: Product analytics
        hog: HedgehogChartHog # any component exported by @posthog/brand/hoggies
        caption: Optional caption under the illustration.
        rows:
            - label: Type
              value: Analytics tool
            - label: Docs
              value: '[/docs/product-analytics](/docs/product-analytics)' # Markdown links work in a value
    seeAlso:
        - 'Session replay|/hogpedia/session-replay' # Label|path
    references:
        - id: 1
          text: 'PostHog glossary'
          url: /docs/glossary
    external:
        - title: 'PostHog Product Analytics'
          url: /product-analytics
---
```

The "See also", "References" and "External links" sections are generated from the frontmatter. Do not write them as prose — the template adds the headings, the `[edit]` links and the anchors.

In the body, use Markdown plus two components:

- `<Ref id="1" />` renders `[1]` and jumps to the matching reference.
- `<CitationNeeded reason="..." />` renders `[citation needed]`.

## Rules

**Do not invent facts.** Every claim comes from a first-party PostHog file. `contents/handbook/story.md` for the timeline, `contents/docs/glossary.mdx` for definitions, `contents/handbook/company/lore.md` for lore, `src/data/tools.ts` for product names. A figure that changes over time links to its source rather than repeating the number.

**No dead links.** Hogpedia has no red links. Link only to an article that exists. A sidebar or tab item with nothing behind it renders as plain text, not as a link. A build-time link check covers this.

**Mark lore as lore.** A lore article carries the `lore` notice. An infobox never contains a joke.

**The global MDX shortcodes are deliberately not available.** `src/templates/Hogpedia.tsx` does not spread `shortcodes` from `src/mdxGlobalComponents.js`, unlike `Plain.js` and `Handbook.tsx`. Those components carry site design tokens and would look wrong in a 2007 skin. An unregistered component name fails the build, which is the behaviour we want. To add one, register it in the template's `components` map and document it here.

## The skin

`hogpedia.css` is the only file with non-token colours and a non-project font stack, and every rule in it is scoped under `.hogpedia`. This is the same approach `src/components/PocketGuides/twigMockup.css` takes. It touches no Tailwind config, mints no utility, and cannot leak.

**Hogpedia is always light.** MonoBook had no dark variant, so there is nothing to be faithful to and an invented one would break the premise. The root paints an opaque background and sets `color-scheme: light`, so a dark site theme shows a light page inside a themed window frame — which reads as a website in a browser, the effect we want. The sidebar says so in character.

**Layout responds to the window, not the viewport.** The root sets `container-type: inline-size`, and the breakpoints are `@container hogpedia (...)` queries. Every app window is resizable, so a media query would be wrong. Below 60rem the sidebar stacks above the article and the infobox goes full width.

A screenshot at a fixed viewport width does not prove a container query. Drag-resize a real window to check a layout change.

## Real data, not decoration

Three things read live state rather than fake it:

- **`[edit]`, "view source" and "history"** build GitHub URLs from the article's own `relativePath`. They open the real file.
- **Special:RecentChanges** reads the commit log via `gatsby-source-git-metadata`. That plugin needs `GITHUB_API_KEY` and attaches nothing without one, so the page has an honest empty state that links to GitHub. Never fall back to `gitLogLatestDate` for a "last modified" line: the plugin defaults it to the current time, so it would print today's date for every article.
- **Special:Random** server-renders a full article list and jumps to a random one on mount. Never pick a random value during render — it would differ between server and client.

For the same reason, the Main Page's rotating modules derive their choice from the date, in `MainPageModules.tsx`.
