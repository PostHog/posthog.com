// Content collections. One collection per content type; each file in contents/ belongs to exactly
// one. Entry IDs are the path inside the collection's folder without the extension, with `index`
// collapsed, so `contents/docs/feature-flags/index.mdx` has the id `feature-flags` and the URL
// `/docs/feature-flags`. Folders and schemas live in src/content/schemas.ts.
//
// `.mdx` loads through the entry type in src/lib/mdx/integration.mjs; pages render the body with
// components/MDXRenderer (keyed by `entry.filePath`).
import { defineCollection } from 'astro:content'
import { glob } from 'astro/loaders'
import type { z } from 'astro/zod'
import { definitions, generateId } from './content/schemas'

function collection<Schema extends z.ZodType>({
    base,
    pattern,
    schema,
}: {
    base: string
    pattern: string[]
    schema: Schema
}) {
    return defineCollection({ loader: glob({ base, pattern, generateId }), schema })
}

export const collections = {
    docs: collection(definitions.docs),
    posthogDocs: collection(definitions.posthogDocs),
    handbook: collection(definitions.handbook),
    posthogHandbook: collection(definitions.posthogHandbook),
    productEngineerHandbook: collection(definitions.productEngineerHandbook),
    blog: collection(definitions.blog),
    newsletter: collection(definitions.newsletter),
    compare: collection(definitions.compare),
    founders: collection(definitions.founders),
    productEngineers: collection(definitions.productEngineers),
    spotlight: collection(definitions.spotlight),
    library: collection(definitions.library),
    tutorials: collection(definitions.tutorials),
    customers: collection(definitions.customers),
    pocketGuides: collection(definitions.pocketGuides),
    templates: collection(definitions.templates),
    hogpedia: collection(definitions.hogpedia),
    teams: collection(definitions.teams),
    apps: collection(definitions.apps),
    pages: collection(definitions.pages),
}
