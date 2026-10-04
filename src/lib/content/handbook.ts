// Handbook pages: the company handbook (/handbook/*, including pages published from the
// posthog/posthog repo) and the product engineer handbook (/product-engineer/*).
import type { CollectionEntry } from 'astro:content'
import { authorsFor } from './people'
import { fileFields, formatDate, tableOfContents, type ReaderPage, type Section, type TocItem } from './readerPage'

export type HandbookEntry = CollectionEntry<'handbook' | 'posthogHandbook' | 'productEngineerHandbook'>

export const HANDBOOK_SECTION: Section = { name: 'Handbook', url: '/handbook' }
export const PRODUCT_ENGINEER_SECTION: Section = { name: 'Product Engineer Handbook', url: '/product-engineer' }

export function handbookPage(entry: HandbookEntry, section: Section = HANDBOOK_SECTION): ReaderPage {
    const { data } = entry
    return {
        ...fileFields(entry.filePath ?? '', section.url, entry.id),
        title: data.title ?? '',
        description: data.description,
        seo: data.seo,
        tableOfContents: (data.tableOfContents as TocItem[] | undefined) ?? tableOfContents(entry),
        noindex: !!data.noindex,
        featureFlag: data.featureFlag,
        hideRightSidebar: !!data.hideRightSidebar,
        contentMaxWidthClass: data.contentMaxWidthClass,
        byline: data.showByline
            ? { authors: authorsFor(data.author), date: formatDate(data.date), tags: data.tags ?? [] }
            : null,
        section,
    }
}
