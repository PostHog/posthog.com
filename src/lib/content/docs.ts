// Docs pages (/docs/*): contents/docs plus the docs published from the posthog/posthog repo.
import type { CollectionEntry } from 'astro:content'
import { nodes } from '../../data-layer'
import type { PostHogPipelineNode, PostHogSourceNode } from '../../data-layer/types'
import { fileFields, tableOfContents, type ReaderPage, type TocItem } from './readerPage'

export type DocsEntry = CollectionEntry<'docs' | 'posthogDocs'>

export interface TemplateConfig {
    templateId: string
    name: string
    type: string
    inputs_schema: PostHogPipelineNode['inputs_schema']
}

export interface DocsExtras {
    /** For data warehouse source docs: the source's fields and tables. */
    postHogSource: Pick<PostHogSourceNode, 'sourceFields' | 'tables'> | null
    /** For destination and transformation docs: the templates the page documents. */
    templateConfigs: TemplateConfig[]
}

export const DOCS_SECTION = { name: 'Docs', url: '/docs' }

function templateConfigs(templateIds: string | string[] | undefined): TemplateConfig[] {
    if (!templateIds) return []
    const pipelines = new Map(nodes<PostHogPipelineNode>('PostHogPipeline').map((node) => [node.pipelineId, node]))
    return (Array.isArray(templateIds) ? templateIds : [templateIds]).flatMap((templateId) => {
        const pipeline = pipelines.get(templateId)
        return pipeline
            ? [{ templateId, name: pipeline.name, type: pipeline.type, inputs_schema: pipeline.inputs_schema }]
            : []
    })
}

function postHogSource(sourceId: string | undefined): DocsExtras['postHogSource'] {
    if (!sourceId) return null
    const source = nodes<PostHogSourceNode>('PostHogSource').find((node) => node.sourceId === sourceId)
    return source ? { sourceFields: source.sourceFields, tables: source.tables } : null
}

export function docsPage(entry: DocsEntry): ReaderPage & DocsExtras {
    const { data } = entry
    return {
        ...fileFields(entry.filePath ?? '', '/docs', entry.id),
        title: data.title ?? '',
        description: data.description,
        seo: data.seo,
        tableOfContents: (data.tableOfContents as TocItem[] | undefined) ?? tableOfContents(entry),
        noindex: !!data.noindex,
        featureFlag: data.featureFlag,
        hideRightSidebar: !!data.hideRightSidebar,
        contentMaxWidthClass: data.contentMaxWidthClass,
        byline: null,
        section: DOCS_SECTION,
        postHogSource: postHogSource(data.sourceId),
        templateConfigs: templateConfigs(data.templateId),
    }
}
