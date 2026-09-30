import qs from 'qs'
import useSWR from 'swr'

const API_HOST = process.env.GATSBY_SQUEAK_API_HOST

export type MuseumMedia = {
    id: number
    url: string
    alternativeText?: string | null
    width?: number
    height?: number
}

export type MuseumTerm = {
    id: number
    name: string
    slug: string
}

export type MuseumCategory = MuseumTerm & { order?: number; types?: MuseumTerm[] }
export type MuseumType = MuseumTerm & { category?: MuseumTerm | null }
export type MuseumCollection = MuseumTerm & { description?: string | null }

export type DatePrecision = 'day' | 'month' | 'year'

export type MuseumLink = { label: string; url: string }
export type MuseumVideo = { url: string; title?: string }

export type MuseumCredit = {
    id: number
    firstName?: string
    lastName?: string
    avatar?: MuseumMedia | null
}

export type MuseumExhibitSummary = {
    id: number
    title: string
    slug: string
    date: string
    datePrecision: DatePrecision
    plaque?: string | null
    heroImage?: MuseumMedia | null
    category?: MuseumTerm | null
    type?: MuseumTerm | null
    collections: MuseumCollection[]
}

export type MuseumExhibit = MuseumExhibitSummary & {
    context?: string | null
    gallery: MuseumMedia[]
    videos: MuseumVideo[]
    links: MuseumLink[]
    curatorNotes?: string | null
    credits: MuseumCredit[]
    relatedExhibits: MuseumExhibitSummary[]
    relatedBy: MuseumExhibitSummary[]
}

// Strapi v4 wraps every entry in { id, attributes } and every relation/media in { data }.
// Flatten both recursively so components work with plain objects.
const unwrap = (value: any): any => {
    if (Array.isArray(value)) {
        return value.map(unwrap)
    }
    if (value && typeof value === 'object') {
        if ('data' in value && Object.keys(value).length === 1) {
            return unwrap(value.data)
        }
        if ('id' in value && 'attributes' in value) {
            return { id: value.id, ...unwrap(value.attributes) }
        }
        return Object.fromEntries(Object.entries(value).map(([key, child]) => [key, unwrap(child)]))
    }
    return value
}

const SUMMARY_POPULATE = {
    heroImage: true,
    category: true,
    type: true,
    collections: true,
}

// Cloudinary returns absolute URLs; a local Strapi's upload provider returns /uploads/... paths
const withHost = (media?: MuseumMedia | null): MuseumMedia | null =>
    media?.url ? { ...media, url: media.url.startsWith('/') ? `${API_HOST}${media.url}` : media.url } : null

const toSummary = (exhibit: any): MuseumExhibitSummary => ({
    ...exhibit,
    datePrecision: exhibit.datePrecision || 'month',
    heroImage: withHost(exhibit.heroImage),
    collections: exhibit.collections || [],
})

const toExhibit = (exhibit: any): MuseumExhibit => ({
    ...toSummary(exhibit),
    gallery: (exhibit.gallery || []).map(withHost).filter(Boolean),
    videos: exhibit.videos || [],
    links: exhibit.links || [],
    credits: exhibit.credits || [],
    relatedExhibits: (exhibit.relatedExhibits || []).map(toSummary),
    relatedBy: (exhibit.relatedBy || []).map(toSummary),
})

// Links are stored one way (relatedExhibits) but shown both ways, so an exhibit's related
// entries are the union of what it links to and what links to it
export const getRelatedExhibits = (exhibit: MuseumExhibit): MuseumExhibitSummary[] => {
    const seen = new Set<number>()
    return [...exhibit.relatedExhibits, ...exhibit.relatedBy].filter((related) => {
        if (related.id === exhibit.id || seen.has(related.id)) {
            return false
        }
        seen.add(related.id)
        return true
    })
}

// Museum collections are small, so fetch every page up front and filter client-side
const fetchAll = async (collection: string, params: Record<string, unknown>): Promise<any[]> => {
    const collected: any[] = []
    let page = 1
    let pageCount = 1
    while (page <= pageCount) {
        const query = qs.stringify({ ...params, pagination: { page, pageSize: 100 } }, { encodeValuesOnly: true })
        const response = await fetch(`${API_HOST}/api/${collection}?${query}`)
        if (!response.ok) {
            throw new Error(`Failed to fetch ${collection}: ${response.statusText}`)
        }
        const { data, meta } = await response.json()
        collected.push(...unwrap(data || []))
        pageCount = meta?.pagination?.pageCount || 1
        page += 1
    }
    return collected
}

export const useMuseumExhibits = (): {
    exhibits: MuseumExhibitSummary[]
    isLoading: boolean
    error: boolean
    refresh: () => void
} => {
    const { data, error, isLoading, mutate } = useSWR('museum-exhibits', () =>
        fetchAll('museum-exhibits', { populate: SUMMARY_POPULATE, sort: ['date:desc', 'title:asc'] })
    )
    return {
        exhibits: (data || []).map(toSummary),
        isLoading,
        error: Boolean(error),
        refresh: () => mutate(),
    }
}

export const useMuseumExhibit = (
    slug?: string
): {
    exhibit?: MuseumExhibit
    isLoading: boolean
    error: boolean
    refresh: () => void
} => {
    const { data, error, isLoading, mutate } = useSWR(slug ? `museum-exhibit-${slug}` : null, async () => {
        const query = qs.stringify(
            {
                filters: { slug: { $eq: slug } },
                populate: {
                    ...SUMMARY_POPULATE,
                    gallery: true,
                    credits: { populate: ['avatar'] },
                    relatedExhibits: { populate: SUMMARY_POPULATE },
                    relatedBy: { populate: SUMMARY_POPULATE },
                },
            },
            { encodeValuesOnly: true }
        )
        const response = await fetch(`${API_HOST}/api/museum-exhibits?${query}`)
        if (!response.ok) {
            throw new Error(`Failed to fetch exhibit: ${response.statusText}`)
        }
        const { data } = await response.json()
        const [exhibit] = unwrap(data || [])
        return exhibit ? toExhibit(exhibit) : null
    })
    return {
        exhibit: data || undefined,
        // A slug with no matching exhibit resolves to null, which is "not found" rather than loading
        isLoading: isLoading || (Boolean(slug) && data === undefined && !error),
        error: Boolean(error),
        refresh: () => mutate(),
    }
}

export const useMuseumTaxonomy = (): {
    categories: MuseumCategory[]
    types: MuseumType[]
    collections: MuseumCollection[]
    refresh: () => void
} => {
    const { data, mutate } = useSWR('museum-taxonomy', async () => {
        const [categories, types, collections] = await Promise.all([
            fetchAll('museum-categories', { sort: ['order:asc', 'name:asc'] }),
            fetchAll('museum-types', { populate: ['category'], sort: ['name:asc'] }),
            fetchAll('museum-collections', { sort: ['name:asc'] }),
        ])
        return { categories, types, collections }
    })
    return {
        categories: data?.categories || [],
        types: data?.types || [],
        collections: data?.collections || [],
        refresh: () => mutate(),
    }
}

// Authenticated write to the museum collections. Strapi enforces the moderator role server-side.
export const museumRequest = async (
    path: string,
    jwt: string,
    method: 'POST' | 'PUT' | 'DELETE',
    data?: Record<string, unknown>
): Promise<any> => {
    const response = await fetch(`${API_HOST}/api/${path}`, {
        method,
        headers: {
            Authorization: `Bearer ${jwt}`,
            ...(data ? { 'Content-Type': 'application/json' } : {}),
        },
        body: data ? JSON.stringify({ data }) : undefined,
    })
    const body = await response.json().catch(() => null)
    if (!response.ok) {
        throw new Error(body?.error?.message || response.statusText)
    }
    return unwrap(body?.data)
}
