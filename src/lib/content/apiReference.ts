// API reference pages (/docs/api/<name>): one per group of OpenAPI operations (ApiEndpoint nodes).
// Hand-written MDX in contents/docs/api/<group>/ adds an overview and per-operation notes.
import { getCollection } from 'astro:content'
import { nodes } from '../../data-layer'
import type { ApiEndpointNode } from '../../data-layer/types'

export interface ApiEndpointPage {
    /** The group name from the OpenAPI tags, e.g. `feature_flags` or `feature_flags-2`. */
    name: string
    /**
     * JSON: the group's OpenAPI operations. Kept as strings because they are large (up to about
     * 1 MB) and a string serializes much smaller in island props than the parsed objects.
     */
    items: string
    /** JSON: `{ schemas }`, every schema the operations reference. */
    components: string
    nextURL: string | null
    previousURL: string | null
    /** Content key of `contents/docs/api/<group>/overview.mdx`, when there is one. */
    overview: string | null
    /** Content keys of the per-operation MDX notes, by operationId (the file name). */
    operations: Record<string, string>
}

/** URL path of each API reference page, e.g. /docs/api/feature-flags. One tag name contains a space. */
export const apiEndpointPaths = (): Set<string> =>
    new Set(nodes<ApiEndpointNode>('ApiEndpoint').map((node) => node.url))

export async function apiEndpointPages(): Promise<{ path: string; page: ApiEndpointPage }[]> {
    // The MDX notes are fragments in the docs collection (no title), e.g. `api/feature-flags/overview`.
    const notes = (await getCollection('docs')).filter((entry) => entry.id.startsWith('api/') && entry.filePath)
    const pages = nodes<ApiEndpointNode>('ApiEndpoint').map((node) => {
        // The group's notes match on a prefix of the URL path, so `api/projects` also covers
        // `api/projects/list_2`.
        const group = notes.filter((entry) => entry.id.startsWith(node.url.replace(/^\/docs\//, '')))
        const operations: Record<string, string> = {}
        for (const entry of group) {
            const operationId = entry.id.split('/').pop() as string
            operations[operationId] ??= `/${entry.filePath}`
        }
        // The overview's folder uses hyphens where the OpenAPI name uses underscores.
        const overview = group.find((entry) => entry.id === `api/${node.name.replace(/_/g, '-')}/overview`)
        return {
            path: node.url,
            page: {
                name: node.name,
                items: node.items,
                components: node.components,
                nextURL: node.nextURL,
                previousURL: node.previousURL,
                overview: overview ? `/${overview.filePath}` : null,
                operations,
            },
        }
    })
    // Two OpenAPI groups can map to one URL. The last one wins.
    return [...new Map(pages.map((page) => [page.path, page])).values()]
}
