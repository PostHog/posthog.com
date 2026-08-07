import { useMemo, useState } from 'react'
import { BuildModePost } from './types'

/** Fields a post is searched across. */
const searchableText = (post: BuildModePost): string =>
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
export function usePostFilters(posts: BuildModePost[]): {
    query: string
    setQuery: (query: string) => void
    activeTag: string | null
    setActiveTag: (tag: string | null) => void
    /** Every tag in use, most common first. */
    tags: string[]
    filteredPosts: BuildModePost[]
    isFiltered: boolean
    clear: () => void
} {
    const [query, setQuery] = useState('')
    const [activeTag, setActiveTag] = useState<string | null>(null)

    const tags = useMemo(() => {
        const counts: Record<string, number> = {}
        posts.forEach((post) => post.frontmatter.tags?.forEach((tag) => (counts[tag] = (counts[tag] || 0) + 1)))
        return Object.entries(counts)
            .sort((a, b) => b[1] - a[1])
            .map(([tag]) => tag)
    }, [posts])

    const filteredPosts = useMemo(() => {
        const q = query.trim().toLowerCase()
        return posts.filter((post) => {
            if (activeTag && !post.frontmatter.tags?.includes(activeTag)) return false
            if (!q) return true
            return searchableText(post).includes(q)
        })
    }, [posts, query, activeTag])

    return {
        query,
        setQuery,
        activeTag,
        setActiveTag,
        tags,
        filteredPosts,
        isFiltered: filteredPosts.length !== posts.length,
        clear: () => {
            setQuery('')
            setActiveTag(null)
        },
    }
}
