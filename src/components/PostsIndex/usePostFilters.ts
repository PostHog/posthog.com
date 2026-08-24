import { useMemo, useState } from 'react'
import { PostSummary } from './types'

export type PostSort = 'newest' | 'popular'

/** Fields a post is searched across. */
const searchableText = (post: PostSummary): string =>
    [
        post.frontmatter.title,
        post.excerpt,
        post.frontmatter.seo?.metaDescription,
        ...(post.frontmatter.tags || []),
        ...(post.frontmatter.authors?.map(({ name }) => name) || []),
    ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase()

/** Free-text search + single-tag filtering over a list of posts. */
export function usePostFilters(posts: PostSummary[]): {
    query: string
    setQuery: (query: string) => void
    activeTag: string | null
    setActiveTag: (tag: string | null) => void
    sort: PostSort
    setSort: (sort: PostSort) => void
    /** Every tag in use, most common first. */
    tags: string[]
    filteredPosts: PostSummary[]
    isFiltered: boolean
    clear: () => void
} {
    const [query, setQuery] = useState('')
    const [activeTag, setActiveTag] = useState<string | null>(null)
    const [sort, setSort] = useState<PostSort>('newest')

    const tags = useMemo(() => {
        const counts: Record<string, number> = {}
        posts.forEach((post) => post.frontmatter.tags?.forEach((tag) => (counts[tag] = (counts[tag] || 0) + 1)))
        return Object.entries(counts)
            .sort((a, b) => b[1] - a[1])
            .map(([tag]) => tag)
    }, [posts])

    const filteredPosts = useMemo(() => {
        const q = query.trim().toLowerCase()
        const filtered = posts.filter((post) => {
            if (activeTag && !post.frontmatter.tags?.includes(activeTag)) return false
            if (!q) return true
            return searchableText(post).includes(q)
        })
        if (sort !== 'popular') return filtered
        // Builds without POSTHOG_APP_API_KEY see all zeros, and the stable sort
        // preserves the query's date order — a recency fallback for free.
        return [...filtered].sort((a, b) => (b.fields.pageViews ?? 0) - (a.fields.pageViews ?? 0))
    }, [posts, query, activeTag, sort])

    return {
        query,
        setQuery,
        activeTag,
        setActiveTag,
        sort,
        setSort,
        tags,
        filteredPosts,
        isFiltered: filteredPosts.length !== posts.length,
        clear: () => {
            setQuery('')
            setActiveTag(null)
        },
    }
}
