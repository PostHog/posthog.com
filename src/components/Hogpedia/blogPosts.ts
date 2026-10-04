import recentPostsJson from '@data/content-hogpedia-recent-posts.json'
import type { RecentBlogPosts } from '~/data-layer/queries/content'

export type BlogPost = { slug: string; title: string; date: string }

/**
 * The most recent posts from the PostHog blog, for the "In the news" module.
 *
 * Comparison pages are excluded for the same reason `src/pages/blog.tsx` excludes them:
 * they are reference material rather than news.
 */
export const useRecentBlogPosts = (): BlogPost[] => recentPostsJson as RecentBlogPosts
