import { useStaticQuery } from 'gatsby'
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
