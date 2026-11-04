# SDK references

SDK references are Markdown pages generated in each SDK repo and stored in Strapi's `sdk-reference` collection. `scripts/sdk-references-markdown.cjs` runs in `onPreBootstrap`. It fetches every record with `markdown` set, then writes these files:

- `contents/docs/libraries/<sdk>/index.md` for the newest major.
- `contents/docs/libraries/<sdk>/<major>.md` for each major, with `noindex: true`.
- The raw stored bytes in `static/docs/libraries/`.

`onPostBuild` copies the raw bytes back over the general HTML-to-Markdown export. The table of contents lists the page's H2 headings only, which are its feature areas.

`VersionSelector` reads the page's `sdkReferenceMajor`, `sdkReferenceMajors` and `sdkReferenceLatest` front matter. Any docs page with `sdkReferenceSdk` set renders it.

SDKs without Markdown records keep their HogRef pages under `/docs/references/`, rendered by the other components in this folder. When an SDK moves, its old paths get a 301 in `vercel.json`.

Set `SDK_REFERENCES_API_HOST` to read references from a different Strapi than `GATSBY_SQUEAK_API_HOST`.
