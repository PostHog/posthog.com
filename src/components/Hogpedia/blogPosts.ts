import { useStaticQuery, graphql } from 'gatsby'

export type BlogPost = { slug: string; title: string; date: string }

/**
 * The most recent posts from the PostHog blog, for the "In the news" module.
 *
 * Comparison pages are excluded for the same reason `src/pages/blog.tsx` excludes them:
 * they are reference material rather than news.
 */
export const useRecentBlogPosts = (): BlogPost[] => {
    const data = useStaticQuery(graphql`
        query HogpediaRecentBlogPosts {
            allMdx(
                filter: {
                    isFuture: { eq: false }
                    fields: { slug: { regex: "/^/blog/" } }
                    frontmatter: { date: { ne: null }, tags: { nin: ["Comparisons"] } }
                }
                sort: { order: DESC, fields: [frontmatter___date] }
                limit: 6
            ) {
                nodes {
                    fields {
                        slug
                    }
                    frontmatter {
                        title
                        date(formatString: "D MMMM YYYY")
                    }
                }
            }
        }
    `)

    return (data.allMdx.nodes as { fields: { slug: string }; frontmatter: { title: string; date: string } }[]).map(
        (node) => ({
            slug: node.fields.slug,
            title: node.frontmatter.title,
            date: node.frontmatter.date,
        })
    )
}
