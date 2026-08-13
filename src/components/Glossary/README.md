# GlossarySearch

Client-side, in-page search for the docs [glossary](/docs/glossary).

## What it does

`<GlossarySearch />` is dropped in **once**, near the top of `contents/docs/glossary.mdx`, and progressively enhances the glossary that follows it:

- A search box that filters terms live as you type, matching against both the term name and its definition text.
- Matches are highlighted with [`mark.js`](https://markjs.io/) (styled globally via `mark[data-markjs]` in `src/styles/global.css`).
- An A–Z quick-nav that jumps to each letter's section. Letters with no terms are shown disabled.
- A live result count ("Showing X of Y terms").

## How it works

The glossary itself stays authored as plain MDX — `##` per letter, `####` per term — so it remains server-rendered, indexable by search engines and Algolia, and deep-linkable (e.g. `/docs/glossary#cohort`).

Rather than owning the content, this component **indexes its sibling DOM** on mount: it walks the elements that follow its own root node (the `h2`/`h4` headings and the paragraphs between them), groups them into letters and terms, and then toggles their visibility as the query changes. With JavaScript disabled, the full glossary still renders — you just don't get the search box.

Because it reads sibling nodes, it must be placed as a direct child of the MDX content (not nested inside another component) and only once per page.

## Registration

Exposed as an MDX shortcode in both `src/mdxGlobalComponents.js` and `src/mdxGlobalComponents.ts`, so it can be used directly in MDX as `<GlossarySearch />`.
