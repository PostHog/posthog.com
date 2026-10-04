// ApiEndpoint: the API reference pages, one per endpoint group of PostHog's OpenAPI spec, parsed with
// redoc. Groups with more than 20 endpoints are split into numbered pages.
// `items` and `components` are JSON strings, as before.
import type { Source } from '../index'
import { env } from '../env'
import { fetchJson } from '../http'
import type { ApiEndpointNode } from '../types'

/* OpenAPI and redoc */

export interface OpenApiSpec {
    paths: Record<string, unknown>
    components?: { schemas?: Record<string, unknown> }
    [key: string]: unknown
}

/**
 * The part of redoc's menu this source reads. A group (tag) has operations as `items`, and an operation
 * carries its raw spec in `operationSpec` (private in redoc's typings, so it is declared here).
 */
export interface RedocMenuItem {
    name: string
    items: RedocMenuItem[]
    operationSpec?: Record<string, unknown>
}

interface Redoc {
    OpenAPIParser: new (spec: OpenApiSpec) => unknown
    MenuBuilder: { buildStructure: (parser: unknown, options: object) => RedocMenuItem[] }
}

interface EndpointPage {
    name: string
    items: RedocMenuItem[]
    next: string | null
    previous: string | null
}

const MAX_ENDPOINT_ITEMS = 20

const docsUrl = (name: string) => '/docs/api/' + name.replace(/_/g, '-')

/** The schemas the operations `$ref`, followed recursively. */
function referencedSchemas(items: RedocMenuItem[], allSchemas: Record<string, unknown>) {
    const collected = new Set<string>()
    const collect = (value: unknown) => {
        if (typeof value !== 'object' || !value) return
        const ref = (value as { $ref?: unknown }).$ref
        if (typeof ref === 'string' && ref.startsWith('#/components/schemas/')) {
            const name = ref.replace('#/components/schemas/', '')
            if (!collected.has(name) && allSchemas[name]) {
                collected.add(name)
                collect(allSchemas[name])
            }
        }
        Object.values(value).forEach(collect)
    }
    items.forEach((item) => collect(item.operationSpec))
    return { schemas: Object.fromEntries([...collected].map((name) => [name, allSchemas[name]])) }
}

/** One page per group, or numbered pages linked by next/previous when a group is too long. */
function pages(group: RedocMenuItem): EndpointPage[] {
    if (group.items.length <= MAX_ENDPOINT_ITEMS)
        return [{ name: group.name, items: group.items, next: null, previous: null }]
    const result: EndpointPage[] = []
    for (let i = 0; i < group.items.length; i += MAX_ENDPOINT_ITEMS) {
        const page = i / MAX_ENDPOINT_ITEMS
        result.push({
            name: page === 0 ? group.name : `${group.name}-${page + 1}`,
            items: group.items.slice(i, i + MAX_ENDPOINT_ITEMS),
            next: i + MAX_ENDPOINT_ITEMS < group.items.length ? `${group.name}-${page + 2}` : null,
            previous: page === 0 ? null : page === 1 ? group.name : `${group.name}-${page}`,
        })
    }
    return result
}

export const apiEndpointSource: Source = {
    name: 'api-endpoints',
    types: ['ApiEndpoint'],
    async fetch() {
        const spec = await fetchJson<OpenApiSpec>(
            env('POSTHOG_OPEN_API_SPEC_URL') ?? 'https://app.posthog.com/api/schema/',
            {
                headers: { Accept: 'application/json' },
            }
        )
        // redoc is a CommonJS bundle: its exports sit on `default` when imported from ESM
        const module = (await import('redoc')) as unknown as Partial<Redoc> & { default?: Redoc }
        const { OpenAPIParser, MenuBuilder } = (module.OpenAPIParser ? module : module.default) as Redoc
        const menu = MenuBuilder.buildStructure(new OpenAPIParser(spec), {})
        const allSchemas = spec.components?.schemas ?? {}

        // The last menu group holds every tag group of endpoints
        const nodes: ApiEndpointNode[] = menu[menu.length - 1].items.flatMap(pages).map((page) => ({
            id: `api-endpoint-${page.name}`,
            name: page.name,
            url: docsUrl(page.name),
            items: JSON.stringify(page.items.map((item) => item.operationSpec)),
            components: JSON.stringify(referencedSchemas(page.items, allSchemas)),
            nextURL: page.next ? docsUrl(page.next) : null,
            previousURL: page.previous ? docsUrl(page.previous) : null,
        }))
        return { ApiEndpoint: nodes }
    },
}
