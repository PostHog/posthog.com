import type { SpotlightAction } from './actions'

export type AlgoliaRecord = {
    excerpt?: string
    fields?: { slug?: string }
    slug: string
    title: string
    type: string
}

export type SpotlightSearchResult = {
    excerpt: string
    title: string
    type: string
    url: string
}

export type ResultGroup = {
    type: string
    results: SpotlightSearchResult[]
}

export type SuggestionItem =
    | { kind: 'action'; action: SpotlightAction }
    | { kind: 'ask-ai' }
    | { kind: 'filter'; type: string }

export type NavItem = SuggestionItem | { kind: 'result'; result: SpotlightSearchResult }
