# Converting a Gatsby `useStaticQuery` to the data layer

The site is moving from Gatsby to Astro. Gatsby's GraphQL is gone. A component that ran `useStaticQuery(graphql`...`)` now imports a JSON file written at build start by a named query in `src/data-layer/queries/`.

Do not imitate Gatsby. The GraphQL shapes (`allX.nodes`, `edges.node`, `childImageSharp.gatsbyImageData`, `frontmatter.x`) were artifacts of GraphQL. Return the simplest typed shape the component needs, and change the component to read it. The page must look and behave exactly as before.

## Steps for each file

1. Read the component's query and the code that reads its result.
2. Add a query to your group's module, `src/data-layer/queries/<group>.ts`:

    ```ts
    import { nodes } from '../index'
    import type { SqueakTeamNode } from '../types'
    import type { QueryResult } from './index'

    export const queries = {
        // One line on what the query is for and who uses it.
        'people-team-crests': () =>
            nodes<SqueakTeamNode>('SqueakTeam')
                .filter((team) => team.name !== 'Hedgehogs' && team.crest?.publicId)
                .map(({ id, name, slug, crest }) => ({ id, name, slug, crestUrl: crest?.data?.attributes?.url ?? null })),
    }

    export type TeamCrests = QueryResult<typeof queries, 'people-team-crests'>
    ```

   - Query names are global, so prefix them with your group (`people-`, `roadmap-`, `products-`, `content-`). They become file names: `.cache/data-layer/queries/<name>.json`.
   - Select only the fields the component reads. The JSON ships in client bundles.
   - Several components with the same or near-identical queries should share one query.
   - Type everything. Node interfaces are in `src/data-layer/types.ts` (`NodeTypes` maps a Gatsby type name to its interface). Look at real data in `.cache/data-layer/nodes/<Type>.json`.
   - Content (former `allMdx`/`mdx`): use `getContent()` and `excerpt()` from `src/data-layer/content.ts`. Each node has `id` (the module path, which is also what `MDXRenderer` renders), `fields.slug`, `frontmatter`, `rawBody`, `headings`, `timeToRead`, `isFuture`, and `parent`. Filter with the same slug rules the GraphQL filter used.
   - Images: frontmatter Cloudinary images already carry `childImageSharp.gatsbyImageData` in the content index. In your query, flatten that to a URL, or to `ResponsiveImageData` with `imageData(asset, { width, height })` from `src/data-layer/images.ts` when the component needs sized images. Components render `ResponsiveImageData` with `ResponsiveImage` from `components/Image`, and plain URLs with `CloudinaryImage` or `<img>`.
   - Sorting and limits that GraphQL did must happen in the query.
3. In the component, delete the `graphql`/`useStaticQuery` imports and the query, and read the JSON:

    ```ts
    import teamCrestsJson from '@data/people-team-crests.json'
    import type { TeamCrests } from '~/data-layer/queries/people'

    const teams = teamCrestsJson as TeamCrests
    ```

   Read the data at module level, or inside the component if it was a hook. A file that exported a shared query constant (for example `teamQuery` or `allProductsData`) should export a typed accessor instead, and its importers should use it.
4. Type the props of every component you touch.

## Check your work

- Run the queries: `./node_modules/.bin/tsx -e "import('./src/data-layer/queries/index.ts').then((m) => m.writeQueries())"`. Look at the JSON it writes for your queries.
- Type-check: `./node_modules/.bin/tsc --noEmit -p tsconfig.json 2>&1 | grep -E '<your files>'`. Fix new errors in the files you touched. Ignore TS6133 ("declared but never read") about `React` imports.
- `grep -n "graphql\|useStaticQuery" <your files>` must print nothing.

## Rules

- Edit only the files in your list and your own query module. If a change is needed somewhere else, list it in your report. Do not touch the data-layer sources, `src/data-layer/queries/index.ts`, `types.ts`, `content.ts`, or `images.ts`.
- Do not start the dev server, commit, or run git commands that change state.
- Code style: TypeScript, single quotes, 4-space indent, no semicolons, 120 columns. Write comments only where they help. Logical Tailwind classes in new markup.
