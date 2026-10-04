// Template pages: dashboard and survey templates (/templates/<slug>, contents/templates), workflow
// templates (/templates/workflow/<slug>, from the PostHog API), and pocket guide pages
// (/pocket-guides/<slug>, contents/pocket-guides). All of them render src/templates/Template.tsx or
// src/templates/WorkflowTemplate.tsx.
import type { CollectionEntry } from 'astro:content'
import type { ResponsiveImageData } from '../../components/Image'
import { nodes } from '../../data-layer'
import { contentById, excerpt } from '../../data-layer/content'
import { imageNode, isCloudinaryUrl } from '../../data-layer/images'
import type { PostHogWorkflowTemplateNode } from '../../data-layer/types'
import { entryPath } from '../routes/views'

export type TemplateEntry = CollectionEntry<'templates'>
export type PocketGuideEntry = CollectionEntry<'pocketGuides'>

export interface MenuItem {
    name: string
    url?: string
    children?: MenuItem[]
}

export interface TemplateProps {
    /** Content module key for MDXRenderer. */
    body: string
    slug: string
    title: string
    description: string
    /** Dashboard and survey templates only. */
    template?: {
        featuredImage: ResponsiveImageData | null
        /** The file path under contents/, for "Edit on GitHub". */
        filePath: string
        /** `dashboard` or `survey`. */
        type?: string
        menu: MenuItem[]
    }
}

export interface WorkflowTemplateProps {
    workflow: Pick<PostHogWorkflowTemplateNode, 'name' | 'description' | 'image_url'> & {
        created_by: { first_name: string; last_name: string } | null
    }
    menu: MenuItem[]
}

const workflowTemplates = () =>
    [...nodes<PostHogWorkflowTemplateNode>('PostHogWorkflowTemplate')].sort((a, b) =>
        a.name < b.name ? -1 : a.name > b.name ? 1 : 0
    )

const hasType = (entry: TemplateEntry, type: string) =>
    entry.data.filters?.type?.some((value) => value.toLowerCase() === type) ?? false

/** The sidebar of every template page: dashboards, surveys, and workflows. */
export function templatesMenu(entries: TemplateEntry[]): MenuItem[] {
    const sorted = entries
        .filter((entry) => !entry.id.includes('/docs'))
        .sort((a, b) => (a.id < b.id ? -1 : a.id > b.id ? 1 : 0))
    const group = (name: string, type: string): MenuItem[] => {
        const children = sorted
            .filter((entry) => hasType(entry, type))
            .map((entry) => ({ name: entry.data.title, url: entryPath('/templates', entry.id) }))
        return children.length > 0 ? [{ name, children }] : []
    }
    const workflows = workflowTemplates().map((workflow) => ({
        name: workflow.name,
        url: `/templates/workflow/${workflow.fields.slug}`,
    }))
    return [
        ...group('Dashboards', 'dashboard'),
        ...group('Surveys', 'survey'),
        ...(workflows.length > 0 ? [{ name: 'Workflows', children: workflows }] : []),
    ]
}

const textExcerpt = (body: string) => {
    const node = contentById(body)
    return node ? excerpt(node, 150) : ''
}

const image = (url?: string): ResponsiveImageData | null =>
    url ? (isCloudinaryUrl(url) ? imageNode(url).childImageSharp.gatsbyImageData : { src: url }) : null

export function templatePage(entry: TemplateEntry, menu: MenuItem[]): TemplateProps {
    const filePath = entry.filePath ?? ''
    const body = `/${filePath}`
    return {
        body,
        slug: entryPath('/templates', entry.id),
        title: entry.data.title,
        description: entry.data.description || textExcerpt(body),
        template: {
            featuredImage: image(entry.data.featuredImage),
            filePath: filePath.replace(/^contents\//, ''),
            type: entry.data.filters?.type?.[0]?.toLowerCase(),
            menu,
        },
    }
}

/** A pocket guide's SKILL file sits next to its chapter. It is a file to copy, not a page. */
export const isPocketGuidePage = (entry: PocketGuideEntry) => !/(^|\/)SKILL$/.test(entry.id)

export function pocketGuidePage(entry: PocketGuideEntry): TemplateProps {
    const body = `/${entry.filePath}`
    return {
        body,
        slug: entryPath('/pocket-guides', entry.id),
        title: entry.data.title ?? '',
        description: entry.data.subtitle || entry.data.description || textExcerpt(body),
    }
}

export function workflowTemplatePages(menu: MenuItem[]) {
    return workflowTemplates().map(({ fields, name, description, image_url, created_by }) => ({
        params: { slug: fields.slug },
        props: {
            workflow: {
                name,
                description,
                image_url,
                created_by: created_by ? { first_name: created_by.first_name, last_name: created_by.last_name } : null,
            },
            menu,
        } satisfies WorkflowTemplateProps,
    }))
}
