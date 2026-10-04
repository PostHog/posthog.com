# Porting a Gatsby route to Astro

Gatsby built pages in two ways: `gatsby/createPages.ts` called `createPage` with a template and a `pageContext`, and the template's `export const query = graphql` fetched its `data`. Some files in `src/views` also had page queries. All of that is legacy. Rebuild each route the Astro way, and don't imitate the Gatsby shapes.

## The reference implementation: docs pages

Read these before you start. They are the pattern to follow.

- `src/content.config.ts` and `src/content/schemas.ts`: one content collection per content type, with typed zod schemas.
- `src/pages/docs/[...slug].astro`: `getStaticPaths` from `getCollection()`, which renders the shared page island.
- `src/lib/content/readerPage.ts`, `docs.ts`, `handbook.ts`, `people.ts`: typed builders that turn a collection entry into the template's props.
- `src/templates/Handbook.tsx`: the template takes typed props (`HandbookProps`) instead of `{ data, pageContext }`, and has no GraphQL.
- `src/islands/Page.tsx`: renders any page component by module path. Pass `module="/src/templates/X.tsx"`, `props={...}` (the component's props), and `content={body}` (the MDX module key, which starts the download early).
- `src/lib/routes/views.ts`: `isViewPath()` and `entryPath()`. A file in `src/views` owns its URL, so a content route must skip URLs that a view owns.

## Steps for a template

1. Read the template, its page query, and the `createPage` calls that used it (`gatsby/createPages.ts`, plus the notes in `scripts/astro-migration/notes/routes.md`).
2. Decide the URL pattern and write the route file in `src/pages/`, mirroring the URL: for example `src/pages/blog/[...slug].astro`, or `src/pages/hogpedia/category/[category].astro` for derived pages. Use `getCollection('<collection>')` for content and `nodes<T>('Type')` (from `src/data-layer`) for API data. Paginated lists use Astro's `paginate()` where that fits, keeping the old URLs (`/blog/all`, `/blog/all/2`, …).
3. Write a typed builder in `src/lib/content/<area>.ts` that returns exactly the props the template renders.
4. Change the template to take those props (`export interface XProps`), and delete its `graphql` query, fragment exports, and `gatsby` imports. Keep the rendered output identical.
5. MDX bodies render with `<MDXRenderer>{body}</MDXRenderer>` from `components/MDXRenderer`, where `body` is `/${entry.filePath}`. The text and excerpt come from `contentById(body)` in `src/data-layer/content.ts` (`excerpt(node, n)`). The table of contents comes from `tableOfContents(entry)` in `readerPage.ts`.
6. SEO: templates already render `<SEO>`; it records head tags for the layout. Pass the same values as before.
7. Frontmatter images are Cloudinary URLs (strings in the collection data). Use `imageData()` from `src/data-layer/images.ts` if the component needs `ResponsiveImageData`, or use the URL.

## Views with page queries

A file in `src/views` with `export const query = graphql` gets its data from a loader in `src/lib/routes/viewData.ts`: add an entry keyed by module path (for example `'/src/views/about.tsx': () => ({ ... })`) that returns the `data` the view reads. A view that only rendered one MDX file can take a simpler shape: change the view to read your shape. Delete the view's query and `gatsby` import.

## Check your work

- `./node_modules/.bin/tsc --noEmit -p tsconfig.json 2>&1 | grep -E '<your files>'`: no new errors in files you touched. Ignore TS6133 about `React`.
- `grep -n "graphql\|from 'gatsby'" <your files>` prints nothing.
- The main agent keeps an Astro dev server at http://localhost:4321. Fetch your pages with `curl -s -o /tmp/<name>.html -w '%{http_code}\n' http://localhost:4321/<path>` (it can take 10 to 30 s the first time) and check the status and the HTML: the title, the content text, and links. The server log is `/tmp/astro-dev.log`. Errors for a request appear at the end, with `[ERROR]`. Do not start, stop, or restart the server. Restart requests go to the main agent, in your report.
- Run `./node_modules/.bin/tsx scripts/check-content.ts` if you change schemas.

## Rules

- Edit only the files in your assignment, plus new files you create. If you need a change elsewhere (a shared component, `Page.tsx`, the layout, the data layer, another group's files), list it in your report and don't make it.
- Do not commit or run git commands that change state.
- TypeScript, typed props, single quotes, 4-space indent, no semicolons, 120 columns. Write comments only where they help. Use logical Tailwind classes in new markup.
