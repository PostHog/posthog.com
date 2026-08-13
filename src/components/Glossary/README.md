# Glossary

The docs [glossary](/docs/glossary): searchable, JSON-backed, rendered by a single React component.

## What it does

`<Glossary />` is dropped in once, at the end of `contents/docs/glossary.mdx`, and renders the whole glossary from `glossary.json`:

- A search box that filters terms live as you type, matching against both the term name and its definition text.
- Matches are highlighted with [`mark.js`](https://markjs.io/) (styled globally via `mark[data-markjs]` in `src/styles/global.css`).
- An A–Z quick-nav that jumps to each letter's section. Letters with no terms are shown disabled.
- A live result count ("Showing X of Y terms").

## How it works

`glossary.json` is the single source of truth for the content:

- `terms` – a flat, alphabetically ordered array of `{ term, slug, posthog, definition }`. `definition` is markdown (rendered with the site-wide `Markdown` component, so links work as usual). `posthog: true` renders the 🦔 marker for PostHog-specific terms. `slug` is the heading anchor, so `/docs/glossary#cohort` deep links keep working – don't change a slug without checking inbound links.
- `letterNotes` – markdown blockquote content for letters with no terms (J, X, Z).

Because the JSON is imported statically, the whole glossary is server-rendered: the page works without JavaScript, and the term count and letter nav are correct on first paint. Filtering is React state over the data; filtered-out sections stay mounted and are hidden with CSS so anchors and the table-of-contents scrollspy keep working.

The page's right-hand table of contents comes from the `tableOfContents` frontmatter override in `contents/docs/glossary.mdx` (one entry per letter), since the MDX file itself no longer contains headings. The glossary terms are also indexed for site search explicitly in `gatsby/algoliaConfig.js`, for the same reason.

## Editing terms

Add or edit entries in `glossary.json`, keeping alphabetical order. Note that Vale (the prose linter) doesn't check JSON, so follow the [style guide](https://posthog.com/handbook/content/posthog-style-guide) yourself: spaced en dashes ( – ) rather than em dashes, sentence case, lowercase feature names.

## Registration

Exposed as an MDX shortcode in both `src/mdxGlobalComponents.js` and `src/mdxGlobalComponents.ts`, so it can be used directly in MDX as `<Glossary />`.
