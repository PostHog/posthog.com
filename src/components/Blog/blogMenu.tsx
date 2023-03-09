import { graphql, useStaticQuery } from 'gatsby'
import slugify from 'slugify'

export default function blogMenu() {
    const data = useStaticQuery(query)
    return [
        { name: 'Home', url: '/blog' },
        ...data.blogPosts.categories.map(({ category, posts }) => {
            const slug = slugify(category, { lower: true })
            const url = `/blog/categories/${slug}`
            return {
                name: category,
                url,
                children: posts.map((post) => ({
                    name: post?.frontmatter?.title,
                    url: post?.fields?.slug,
                })),
            }
        }),
    ]
}

export const query = graphql`
    {
        blogPosts: allMdx(filter: { isFuture: { eq: false }, fields: { slug: { regex: "/^/blog/" } } }) {
            categories: group(field: frontmatter___category) {
                category: fieldValue
                posts: nodes {
                    fields {
                        slug
                    }
                    frontmatter {
                        title
                    }
                }
            }
        }
    }
`
