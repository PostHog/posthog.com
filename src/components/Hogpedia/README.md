# Hogpedia

Hogpedia is an encyclopedia about PostHog at `/hogpedia`, presented in the MonoBook style that English Wikipedia used in 2007.

The format is the joke. The facts are not. Every article starts with a plain definition, links to the PostHog source for each claim, and cross-links the other articles.

Hogpedia links to first-party sources for its claims. The product docs remain the source for product definitions. Do not add `Article` or `DefinedTerm` JSON-LD: that would present a parody page as an official definition.

## What lives where

| Path | Contents |
| --- | --- |
| `contents/hogpedia/*.mdx` | The articles. One file per article. |
| `contents/hogpedia/talk/*.mdx` | The discussion pages. |
| `src/templates/Hogpedia.tsx` | The article template. |
| `src/templates/HogpediaCategory.tsx` | A category listing. |
| `src/pages/hogpedia/` | The Main Page and the meta pages. |
| `src/pages/sparks-joy/` | Lists Hogpedia under "Time machine", the section for parody recreations. |
| `src/components/Hogpedia/` | The skin and the article furniture. |

## Where the Main Page gets its content

| Module | Source |
| --- | --- |
| From today's featured article | Hand-written, checked against the live article index. |
| Featured hog | A random illustration from the `HOGS` registry, re-picked after hydration. |
| Did you know… | The handbook's [lore page](/handbook/company/lore), six at a time, rotating by date. |
| In the news | The six most recent posts on the PostHog blog, read at build time. |
| Explore Hogpedia | The live article index, grouped by category. |

`Special:RecentChanges` reads the PostHog changelog – the same `allRoadmap` records that `/changelog` renders. It lists changes to the software, says so, and links to the repository commit log for edits to the articles themselves.

Hogpedia is listed on `/sparks-joy` under **Time machine**, the group for parody recreations of old websites. The link is in `src/pages/sparks-joy/index.tsx`, alongside the other Time machine profiles. The taskbar's "Things that spark joy" entry is a plain link to the page and has no submenu.

Pages are created in `gatsby/createPages.ts`. Articles are excluded from the generic `Plain` loop there and get their own loop, which also builds a page per category. The frontmatter types are declared in `gatsby/createSchemaCustomization.ts` under `FrontmatterHogpedia`.

## Adding an article

Add one file to `contents/hogpedia/`. Nothing else is needed – the loop, the search index, the article count, `/hogpedia/all-pages` and the category pages all read from the files on disk.

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
        hog: HedgehogChartHog # must be registered in hogs.ts – see the note below
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

The "See also", "References" and "External links" sections are generated from the frontmatter. Do not write them as prose – the template adds the headings, the `[edit]` links and the anchors.

In the body, use Markdown plus two components:

- `<Ref id="1" />` renders a footnote marker and jumps to the matching reference. The number shown is the reference's **position** in the list, not its `id`, so a gap in the ids can never make the marker disagree with the numbered list. An `id` with no matching reference renders nothing.
- `<CitationNeeded reason="..." />` renders `[citation needed]`.

## Rules

**Do not invent facts.** Every claim comes from a first-party PostHog file. `contents/handbook/story.md` for the timeline, `contents/docs/glossary.mdx` for definitions, `contents/handbook/company/lore.md` for lore, `src/data/tools.ts` for product names. A figure that changes over time links to its source rather than repeating the number.

**No dead links.** Hogpedia has no red links. Link only to an article that exists. A sidebar or tab item with nothing behind it renders as plain text, not as a link. The hand-written Main Page modules are filtered against the live article index, so a rename cannot leave a broken link behind. A build-time link check covers the rest.

**Never `import * as` from `@posthog/brand/hoggies`.** An article names its hog as a string, so the component is looked up at run time – but a namespace import defeats tree-shaking and pulls all 130-odd illustrations into every page that renders one. Each one inlines its own SVG path data, on the order of 240 KB of module source. That added about 8 MB of JavaScript before `hogs.ts` existed. To use a new illustration in an infobox, add a named import and an entry to the `HOGS` registry in `src/components/Hogpedia/hogs.ts`.

The Main Page's "Featured hog" rotates through the same registry for the same reason, so it adds no weight. Widening it to the whole library needs the illustrations served as images rather than inlined: `@posthog/brand/hoggies/png` exports URLs that would be free, but Gatsby's webpack rules turn the referenced file into a JS module and the package's own `new URL()` resolves to that module instead of the image, so it needs a webpack asset rule first.

**Centre illustrations with auto margins, not `text-align`.** Tailwind's preflight sets `img, svg { display: block }` site-wide, so `text-align: center` on a container does nothing to the image inside it.

**Keep it simple.** This is a parody site, not a documentation set. An article is a lead plus three or four short sections. Resist adding a "Criticism" or "Limits" section – that is essay writing, and it was cut once already.

**`[edit]` opens the source, not this file.** A section cites its source with `<Ref id="…" />`, and the `[edit]` link beside the heading opens the first first-party page that section cites — the handbook or docs page a correction actually belongs on. Editing the Hogpedia article would fix the mirror and leave the handbook saying the old thing. `buildSectionSources` in `context.tsx` does the mapping; headings the template generates rather than the author writes ("See also", "References", "External links") pass `noEdit` and carry no link at all. The tab strip's "view source" and "history" still point at the file on GitHub, which is what they mean — note those 404 until this branch merges, because they point at `master`.

**Do not write a `## See also` section.** The template renders one from the frontmatter `seeAlso` list. Writing one too gives the article two.

**Mark lore as lore.** A lore article carries the `lore` notice. An infobox never contains a joke.

**The global MDX shortcodes are deliberately not available.** `src/templates/Hogpedia.tsx` does not spread `shortcodes` from `src/mdxGlobalComponents.js`, unlike `Plain.js` and `Handbook.tsx`. Those components carry site design tokens and would look wrong in a 2007 skin. An unregistered component name fails the build, which is the behavior we want. To add one, register it in the template's `components` map and document it here.

## The skin

`hogpedia.css` is the only file with non-token colors and a non-project font stack, and every rule in it is scoped under `.hogpedia`. This is the same approach `src/components/PocketGuides/twigMockup.css` takes. It touches no Tailwind config, mints no utility, and cannot leak.

**Hogpedia is always light.** MonoBook had no dark variant, so there is nothing to be faithful to and an invented one would break the premise. The root paints an opaque background and sets `color-scheme: light`, so a dark site theme shows a light page inside a themed window frame – which reads as a website in a browser, the effect we want.

**Every window passes `showAddressBar={false}`.** `Explorer`'s address bar is a path select, and Hogpedia has no categories to put in it, so it rendered as an empty dropdown above the page. Keep it off on new pages.

**Layout responds to the window, not the viewport.** The root sets `container-type: inline-size`, and the breakpoints are `@container hogpedia (...)` queries. Every app window is resizable, so a media query would be wrong. Below 60rem the sidebar stacks above the article and the infobox goes full width.

A screenshot at a fixed viewport width does not prove a container query. Drag-resize a real window to check a layout change.

## Real data, not decoration

Three things read live state rather than fake it:

- **`[edit]`, "view source" and "history"** build GitHub URLs from the article's own `relativePath`. They open the real file.
- **Special:RecentChanges** reads the commit log via `gatsby-source-git-metadata`. That plugin needs `GITHUB_API_KEY` and attaches nothing without one, so the page has an honest empty state that links to GitHub. Never fall back to `gitLogLatestDate` for a "last modified" line: the plugin defaults it to the current time, so it would print today's date for every article.
- **Special:Random** server-renders a full article list and jumps to a random one on mount. Never pick a random value during render – it would differ between server and client.

For the same reason, the Main Page's rotating modules derive their choice from the date, in `MainPageModules.tsx`.
