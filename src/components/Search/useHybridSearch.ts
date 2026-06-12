import { useEffect, useMemo, useRef, useState } from 'react'
import algoliasearch, { SearchIndex } from 'algoliasearch/lite'
import { useInkeepSearch, SemanticSearchResult } from './useInkeepSearch'
import { typeForPath } from './typeForPath'

export type HybridSearchResult = SemanticSearchResult & {
    sources: ('algolia' | 'inkeep')[]
}

const ALGOLIA_DEBOUNCE_MS = 150
const ALGOLIA_HITS_PER_PAGE = 20
const RRF_K = 60

let algoliaIndex: SearchIndex | null | undefined

const getAlgoliaIndex = (): SearchIndex | null => {
    if (algoliaIndex !== undefined) return algoliaIndex
    const appId = process.env.GATSBY_ALGOLIA_APP_ID
    const searchKey = process.env.GATSBY_ALGOLIA_SEARCH_API_KEY
    const indexName = process.env.GATSBY_ALGOLIA_INDEX_NAME
    algoliaIndex = appId && searchKey && indexName ? algoliasearch(appId, searchKey).initIndex(indexName) : null
    return algoliaIndex
}

type AlgoliaPageHit = {
    title?: string
    excerpt?: string
    slug?: string
    fields?: { slug?: string }
}

// Trailing slashes and casing vary between the Algolia index and Inkeep's
// crawled URLs, so dedupe on a normalized pathname
const pathKey = (url: string): string => url.replace(/\/+$/, '').toLowerCase() || '/'

const normalizeAlgoliaHits = (hits: AlgoliaPageHit[]): SemanticSearchResult[] => {
    const seenPaths = new Set<string>()
    const results: SemanticSearchResult[] = []

    for (const hit of hits) {
        const url = hit.fields?.slug || (hit.slug ? `/${hit.slug}` : '')
        if (!url || !hit.title) continue

        const key = pathKey(url)
        if (seenPaths.has(key)) continue
        seenPaths.add(key)

        results.push({
            type: typeForPath(url),
            title: hit.title,
            url,
            excerpt: hit.excerpt || '',
        })
    }

    return results
}

/**
 * Reciprocal rank fusion: each engine contributes 1 / (k + rank) per result,
 * so pages both engines agree on float to the top while neither engine's raw
 * (incomparable) scores are trusted directly.
 */
export const mergeWithReciprocalRankFusion = (
    algolia: SemanticSearchResult[],
    semantic: SemanticSearchResult[]
): HybridSearchResult[] => {
    const entries = new Map<string, { result: HybridSearchResult; score: number }>()

    algolia.forEach((result, rank) => {
        entries.set(pathKey(result.url), {
            result: { ...result, sources: ['algolia'] },
            score: 1 / (RRF_K + rank),
        })
    })

    semantic.forEach((result, rank) => {
        const key = pathKey(result.url)
        const score = 1 / (RRF_K + rank)
        const existing = entries.get(key)
        if (existing) {
            existing.score += score
            existing.result.sources.push('inkeep')
            // Inkeep's excerpt is the chunk that matched the query; Algolia's
            // is just the top of the page, so prefer the contextual one
            if (result.excerpt) existing.result.excerpt = result.excerpt
        } else {
            entries.set(key, { result: { ...result, sources: ['inkeep'] }, score })
        }
    })

    return [...entries.values()].sort((a, b) => b.score - a.score).map((entry) => entry.result)
}

/**
 * Hybrid search: Algolia (instant, keyword) and Inkeep RAG (slow, semantic)
 * queried in parallel, merged with reciprocal rank fusion. The merged list is
 * only published once both engines have settled — publishing Algolia first
 * and reranking when semantic results arrive ~1.5–2s later made results jump
 * under the cursor. While a query is in flight, results are empty so UIs show
 * their loading state instead of stale results. If Algolia keys are missing
 * (e.g. local dev) the hook degrades to semantic-only, and vice versa if the
 * Inkeep proxy errors.
 */
export const useHybridSearch = (
    query: string
): { results: HybridSearchResult[]; loading: boolean; error: string | null } => {
    const { results: semanticResults, loading: semanticLoading, error } = useInkeepSearch(query)
    const [algoliaResults, setAlgoliaResults] = useState<SemanticSearchResult[]>([])
    const [algoliaLoading, setAlgoliaLoading] = useState(false)
    const requestIdRef = useRef(0)

    useEffect(() => {
        const trimmed = query.trim()
        const index = getAlgoliaIndex()
        const requestId = ++requestIdRef.current

        if (!trimmed || !index) {
            setAlgoliaResults([])
            setAlgoliaLoading(false)
            return
        }

        setAlgoliaLoading(true)
        const timeout = setTimeout(async () => {
            try {
                const { hits } = await index.search<AlgoliaPageHit>(trimmed, {
                    hitsPerPage: ALGOLIA_HITS_PER_PAGE,
                    attributesToRetrieve: ['title', 'excerpt', 'slug', 'fields.slug'],
                })
                if (requestIdRef.current !== requestId) return
                setAlgoliaResults(normalizeAlgoliaHits(hits))
                setAlgoliaLoading(false)
            } catch {
                // Algolia being unreachable shouldn't break search — semantic
                // results still flow through
                if (requestIdRef.current !== requestId) return
                setAlgoliaResults([])
                setAlgoliaLoading(false)
            }
        }, ALGOLIA_DEBOUNCE_MS)

        return () => clearTimeout(timeout)
    }, [query])

    const loading = algoliaLoading || semanticLoading
    const merged = useMemo(
        () => mergeWithReciprocalRankFusion(algoliaResults, semanticResults),
        [algoliaResults, semanticResults]
    )

    return { results: loading ? [] : merged, loading, error }
}
