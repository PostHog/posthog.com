// Generated docs pages for data pipelines and data warehouse sources, from the PostHogPipeline and
// PostHogSource nodes. A pipeline or source with a hand-written docs page (a docs entry whose
// `templateId` lists the pipeline, or whose `sourceId` is the source) uses that page instead:
//
// - /docs/cdp/<type>s/<slug>: pipelines without a docs page (DataPipeline template).
// - /docs/cdp/sources/<slug>: released sources without a docs page (DataWarehouseSource template).
// - /docs/data-warehouse/sources/<slug>: every released source. Sources with a docs page, and the
//   self-hosted sources (s3, azure-blob, r2, gcs), show their /docs/cdp/sources docs page here too.
import { getCollection } from 'astro:content'
import { nodes } from '../../data-layer'
import type { PipelineInput, PostHogPipelineNode, PostHogSourceNode } from '../../data-layer/types'
import { entryPath, isViewPath } from '../routes/views'
import type { SourceField, SourceTable } from '../../templates/DataWarehouseSource'
import type { DocsEntry } from './docs'

export interface DataPipelinePage {
    /** The template id in PostHog, e.g. `template-webhook` or `segment-amplitude`. */
    id: string
    name: string
    description?: string
    type: PostHogPipelineNode['type']
    icon_url?: string
    status: string
    inputs_schema: Pick<PipelineInput, 'key' | 'type' | 'label' | 'secret' | 'required' | 'description'>[]
    introSnippet: string | null
    installationSnippet: string | null
}

export interface DataWarehouseSourcePage extends Pick<
    PostHogSourceNode,
    'sourceId' | 'name' | 'caption' | 'permissionsCaption' | 'beta'
> {
    icon_url?: string
    sourceFields: SourceField[]
    tables: SourceTable[]
}

export type IntegrationPage =
    | { path: string; template: 'DataPipeline'; pipeline: DataPipelinePage }
    | { path: string; template: 'DataWarehouseSource'; source: DataWarehouseSourcePage }
    /** A hand-written /docs/cdp/sources page, shown at its /docs/data-warehouse/sources URL. */
    | { path: string; template: 'Handbook'; entry: DocsEntry }

const SELF_HOSTED_SOURCES = ['s3', 'azure-blob', 'r2', 'gcs']

/** Docs entries by id. On a clash, the page in contents/ wins over the one from the posthog/posthog repo. */
async function docsEntries(): Promise<Map<string, DocsEntry>> {
    const entries = new Map<string, DocsEntry>()
    for (const entry of [...(await getCollection('posthogDocs')), ...(await getCollection('docs'))]) {
        entries.set(entry.id, entry)
    }
    return entries
}

const pipelinePage = (node: PostHogPipelineNode): DataPipelinePage => ({
    id: node.pipelineId,
    name: node.name,
    description: node.description ?? undefined,
    type: node.type,
    icon_url: node.icon_url ?? undefined,
    status: node.status,
    inputs_schema: (node.inputs_schema ?? []).map(({ key, type, label, secret, required, description }) => ({
        key,
        type,
        label,
        secret,
        required,
        description,
    })),
    introSnippet: node.introSnippet ?? null,
    installationSnippet: node.installationSnippet ?? null,
})

const sourcePage = (node: PostHogSourceNode): DataWarehouseSourcePage => ({
    sourceId: node.sourceId,
    name: node.name,
    icon_url: node.icon_url ?? undefined,
    caption: node.caption,
    permissionsCaption: node.permissionsCaption,
    beta: node.beta,
    sourceFields: (node.sourceFields as SourceField[]).map(({ name, label, type, required, placeholder, caption }) => ({
        name,
        label,
        type,
        required,
        placeholder,
        caption,
    })),
    tables: (node.tables as SourceTable[]).map(
        ({ name, label, description, sync_methods, incremental_fields, primary_keys }) => ({
            name,
            label,
            description,
            sync_methods,
            incremental_fields,
            primary_keys,
        })
    ),
})

/** Every generated pipeline and source page, one per URL. */
export async function integrationPages(): Promise<IntegrationPage[]> {
    const entries = await docsEntries()
    const templateIds = new Set<string>()
    const bySourceId = new Map<string, DocsEntry>()
    // Pages in contents/ first, so they win when two pages name the same source.
    const ordered = [...entries.values()].sort(
        (a, b) => Number(a.collection === 'posthogDocs') - Number(b.collection === 'posthogDocs')
    )
    for (const entry of ordered) {
        for (const id of [entry.data.templateId ?? []].flat()) templateIds.add(id)
        if (entry.data.sourceId && !bySourceId.has(entry.data.sourceId)) bySourceId.set(entry.data.sourceId, entry)
    }
    // URLs the docs route builds. A generated /docs/cdp page never replaces one.
    const docsPaths = new Set(
        [...entries.values()].filter((entry) => entry.data.title).map((entry) => entryPath('/docs', entry.id))
    )

    const cdp = new Map<string, IntegrationPage>()
    for (const node of nodes<PostHogPipelineNode>('PostHogPipeline')) {
        if (templateIds.has(node.pipelineId)) continue
        const path = `/docs/cdp/${node.type}s/${node.slug}`
        cdp.set(path, { path, template: 'DataPipeline', pipeline: pipelinePage(node) })
    }

    // Later sets win, in this order: sources without docs, sources with docs, self-hosted sources.
    const warehouse = new Map<string, IntegrationPage>()
    const sources = nodes<PostHogSourceNode>('PostHogSource').filter((node) => !node.unreleased)
    for (const node of sources.filter((node) => !bySourceId.has(node.sourceId))) {
        const source = sourcePage(node)
        const path = `/docs/data-warehouse/sources/${node.slug}`
        warehouse.set(path, { path, template: 'DataWarehouseSource', source })
        const cdpPath = `/docs/cdp/sources/${node.slug}`
        cdp.set(cdpPath, { path: cdpPath, template: 'DataWarehouseSource', source })
    }
    for (const node of sources) {
        const entry = bySourceId.get(node.sourceId)
        const path = `/docs/data-warehouse/sources/${node.slug}`
        if (entry) warehouse.set(path, { path, template: 'Handbook', entry })
    }
    for (const slug of SELF_HOSTED_SOURCES) {
        const entry = entries.get(`cdp/sources/${slug}`)
        const path = `/docs/data-warehouse/sources/${slug}`
        if (entry?.data.title) warehouse.set(path, { path, template: 'Handbook', entry })
    }

    return [...cdp.values(), ...warehouse.values()].filter(
        ({ path }) => !isViewPath(path) && !(path.startsWith('/docs/cdp/') && docsPaths.has(path))
    )
}

/** The /docs/data-warehouse/sources URLs these pages own, which the docs route must not build. */
export async function dataWarehouseSourcePaths(): Promise<Set<string>> {
    return new Set(
        (await integrationPages())
            .map(({ path }) => path)
            .filter((path) => path.startsWith('/docs/data-warehouse/sources/'))
    )
}
