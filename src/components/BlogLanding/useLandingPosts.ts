import { usePosts } from 'components/Edition/hooks/usePosts'
import { getParams, sortOptions } from 'components/Edition/Posts'

// sortOptions[0] = Popularity (['score:desc','date:desc']), sortOptions[1] = Newest (['date:desc'])
const POPULAR_SORT = sortOptions[0].sort
const RECENT_SORT = sortOptions[1].sort

// CMS excerpts are auto-generated with inline markdown stripped, which leaves double spaces and
// spaces before punctuation (e.g. "Session Replay , Data Warehouse ,"). Tidy it for display.
const cleanExcerpt = (excerpt: unknown): unknown =>
    typeof excerpt === 'string'
        ? excerpt
              .replace(/\s+/g, ' ')
              .replace(/\s+([,.;:!?])/g, '$1')
              .trim()
        : excerpt

const cleanPost = (post: any) =>
    post?.attributes?.excerpt
        ? { ...post, attributes: { ...post.attributes, excerpt: cleanExcerpt(post.attributes.excerpt) } }
        : post

interface UseLandingPostsResult {
    hero: any | undefined
    popular: any[]
    recent: any[]
    isLoading: boolean
}

/**
 * Fetches the "most popular" and "most recent" posts for a given folder (e.g. `founders`,
 * `blog`, `newsletter`) using the same Strapi query the rest of the site uses. The hero is the
 * single highest-scoring post; both feeds exclude it so it's never shown twice.
 */
export function useLandingPosts(folder: string): UseLandingPostsResult {
    const { posts: popularPosts, isLoading: popularLoading } = usePosts({
        params: getParams(folder, undefined, POPULAR_SORT),
    })
    const { posts: recentPosts, isLoading: recentLoading } = usePosts({
        params: getParams(folder, undefined, RECENT_SORT),
    })

    const [hero, ...popular] = popularPosts || []

    return {
        hero: cleanPost(hero),
        popular: popular.map(cleanPost),
        // Drop the hero from the recent feed too (popular already excludes it via destructuring).
        recent: (recentPosts || []).filter((post: any) => post?.id !== hero?.id).map(cleanPost),
        isLoading: popularLoading || recentLoading,
    }
}
