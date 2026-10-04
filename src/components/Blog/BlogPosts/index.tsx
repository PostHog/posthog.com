import blogPostsJson from '@data/content-blog-posts.json'
import type { BlogPostList } from '~/data-layer/queries/content'

const posts = blogPostsJson as BlogPostList

/** Blog posts, newest first. */
export const BlogPosts = ({ render }: { render: (posts: BlogPostList) => JSX.Element }): JSX.Element => render(posts)
