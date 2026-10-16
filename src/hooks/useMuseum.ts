import qs from 'qs'
import useSWR from 'swr'
import { SQUEAK_HOST, type StrapiRecord } from 'lib/strapi'

type Relation<T> = { data: StrapiRecord<T> | null }
type Relations<T> = { data: StrapiRecord<T>[] | null }

export type MuseumImage = { url: string; alternativeText?: string }
export type MuseumTerm = { name: string; slug: string; description?: string }
export type MuseumType = MuseumTerm & { category?: Relation<MuseumTerm> }
export type MuseumPerson = { firstName?: string; lastName?: string }
export type DatePrecision = 'day' | 'month' | 'year'

export type MuseumArtifact = {
    title: string
    slug: string
    date: string
    datePrecision: DatePrecision
    plaque?: string
    context?: string
    curatorNotes?: string
    videos?: { url: string }[]
    links?: { label: string; url: string }[]
    heroImage?: Relation<MuseumImage>
    gallery?: Relations<MuseumImage>
    category?: Relation<MuseumTerm>
    type?: Relation<MuseumTerm>
    collections?: Relations<MuseumTerm>
    credits?: Relations<MuseumPerson>
    relatedArtifacts?: Relations<MuseumArtifact>
    relatedBy?: Relations<MuseumArtifact>
}

export type MuseumExhibit = {
    title: string
    slug: string
    summary?: string
    statement?: string
    openedAt?: string
    featured?: boolean
    coverImage?: Relation<MuseumImage>
    curators?: Relations<MuseumPerson>
    stops?: { id: number; label?: string; artifact: Relation<MuseumArtifact> }[]
}

const cardPopulate = { heroImage: true, category: true, type: true, collections: true }
const exhibitPopulate = { coverImage: true, stops: { populate: { artifact: { populate: cardPopulate } } } }
const personPopulate = { fields: ['firstName', 'lastName'] }

const fetchAll = async <T>(collection: string, params: Record<string, unknown>): Promise<StrapiRecord<T>[]> => {
    const records: StrapiRecord<T>[] = []
    let page = 1
    let pageCount = 1
    while (page <= pageCount) {
        const query = qs.stringify({ ...params, pagination: { page, pageSize: 100 } }, { encodeValuesOnly: true })
        const res = await fetch(`${SQUEAK_HOST}/api/${collection}?${query}`)
        if (!res.ok) throw new Error(res.statusText)
        const { data, meta } = await res.json()
        records.push(...data)
        pageCount = meta.pagination.pageCount
        page++
    }
    return records
}

const fetchBySlug = async <T>(collection: string, slug: string, populate: Record<string, unknown>) =>
    (await fetchAll<T>(collection, { filters: { slug: { $eq: slug } }, populate }))[0] || null

export const useArtifacts = () => {
    const { data, error, isLoading, mutate } = useSWR('museum-artifacts', () =>
        fetchAll<MuseumArtifact>('museum-artifacts', { populate: cardPopulate, sort: ['date:desc', 'title:asc'] })
    )
    return { artifacts: data || [], error, isLoading, mutate }
}

export const useArtifact = (slug: string) => {
    const { data, error, isLoading, mutate } = useSWR(`museum-artifact-${slug}`, async () => {
        const artifact = await fetchBySlug<MuseumArtifact>('museum-artifacts', slug, {
            ...cardPopulate,
            gallery: true,
            credits: personPopulate,
            relatedArtifacts: { populate: cardPopulate },
            relatedBy: { populate: cardPopulate },
        })
        const exhibits = artifact
            ? await fetchAll<MuseumExhibit>('museum-exhibits', {
                  filters: { stops: { artifact: { id: { $eq: artifact.id } } } },
                  populate: exhibitPopulate,
              })
            : []
        return { artifact, exhibits }
    })
    return { artifact: data?.artifact, exhibits: data?.exhibits || [], error, isLoading, mutate }
}

export const useExhibits = () => {
    const { data, isLoading, mutate } = useSWR('museum-exhibits', () =>
        fetchAll<MuseumExhibit>('museum-exhibits', {
            populate: exhibitPopulate,
            sort: ['featured:desc', 'openedAt:desc'],
        })
    )
    return { exhibits: data || [], isLoading, mutate }
}

export const useExhibit = (slug: string) => {
    const { data, error, isLoading, mutate } = useSWR(`museum-exhibit-${slug}`, () =>
        fetchBySlug<MuseumExhibit>('museum-exhibits', slug, { ...exhibitPopulate, curators: personPopulate })
    )
    return { exhibit: data, error, isLoading, mutate }
}

export const useMuseumTaxonomy = () => {
    const { data, mutate } = useSWR('museum-taxonomy', async () => {
        const [categories, types, collections] = await Promise.all([
            fetchAll<MuseumTerm>('museum-categories', { sort: ['order:asc'] }),
            fetchAll<MuseumType>('museum-types', { populate: ['category'], sort: ['name:asc'] }),
            fetchAll<MuseumTerm>('museum-collections', { sort: ['name:asc'] }),
        ])
        return { categories, types, collections }
    })
    return {
        categories: data?.categories || [],
        types: data?.types || [],
        collections: data?.collections || [],
        mutate,
    }
}

// Related links are stored on one artifact and shown on both
export const getRelatedArtifacts = (artifact: StrapiRecord<MuseumArtifact>): StrapiRecord<MuseumArtifact>[] => {
    const related = [
        ...(artifact.attributes.relatedArtifacts?.data || []),
        ...(artifact.attributes.relatedBy?.data || []),
    ]
    return related.filter((other, index) => related.findIndex(({ id }) => id === other.id) === index)
}

export const museumRequest = async (
    path: string,
    jwt: string,
    method: 'POST' | 'PUT' | 'DELETE',
    data?: Record<string, unknown>
) => {
    const res = await fetch(`${SQUEAK_HOST}/api/${path}`, {
        method,
        headers: { Authorization: `Bearer ${jwt}`, ...(data ? { 'Content-Type': 'application/json' } : {}) },
        body: data ? JSON.stringify({ data }) : undefined,
    })
    const body = await res.json().catch(() => null)
    if (!res.ok) throw new Error(body?.error?.message || res.statusText)
    return body?.data as StrapiRecord<{ slug: string }>
}
