import { usePosts } from 'components/Edition/hooks/usePosts'
import { getParams, sortOptions } from 'components/Edition/Posts'

// sortOptions[0] = Popularity (['score:desc','date:desc']), sortOptions[1] = Newest (['date:desc'])
const POPULAR_SORT = sortOptions[0].sort
const RECENT_SORT = sortOptions[1].sort

interface UseLandingPostsResult {
    hero: any | undefined
    popular: any[]
    recent: any[]
    isLoading: boolean
}

/**
 * Fetches the "most popular" and "most recent" posts for a given folder (e.g. `founders`,
 * `blog`, `newsletter`) using the same Strapi query the rest of the site uses. The hero is the
 * single highest-scoring post; `popular` excludes it so it isn't shown twice.
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
        hero,
        popular,
        recent: recentPosts || [],
        isLoading: popularLoading || recentLoading,
    }
}
