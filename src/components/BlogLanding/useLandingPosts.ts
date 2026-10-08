import { usePosts } from 'components/Edition/hooks/usePosts'
import { getParams, sortOptions } from 'components/Edition/Posts'

// `sortOptions` is ordered [Popularity, Newest] — see components/Edition/Posts.
const [{ sort: POPULAR_SORT }, { sort: RECENT_SORT }] = sortOptions

// CMS excerpts are auto-generated with inline markdown stripped, which leaves double spaces and
// spaces before punctuation (e.g. "Session Replay , Data Warehouse ,"). Tidy it for display.
const cleanExcerpt = (excerpt: string): string =>
    excerpt
        .replace(/\s+/g, ' ')
        .replace(/\s+([,.;:!?])/g, '$1')
        .trim()

const cleanPost = (post: any) =>
    typeof post?.attributes?.excerpt === 'string'
        ? { ...post, attributes: { ...post.attributes, excerpt: cleanExcerpt(post.attributes.excerpt) } }
        : post

interface UseLandingPostsResult {
    hero: any | undefined
    popular: any[]
    recent: any[]
    isLoading: boolean
}

/**
 * Fetches the most popular and most recent posts for a folder (e.g. `founders`, `blog`) using the
 * same Strapi query as the rest of the site. The hero is the single highest-scoring post, and
 * both feeds exclude it so it's never shown twice.
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
        recent: (recentPosts || []).filter((post: any) => post?.id !== hero?.id).map(cleanPost),
        isLoading: popularLoading || recentLoading,
    }
}
