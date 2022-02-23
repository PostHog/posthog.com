import Blog from 'components/Blog'

export default Blog

export const pageQuery = graphql`
    query($category: String) {
        allMdx(
            sort: { order: DESC, fields: [frontmatter___date] }
            filter: { isFuture: { eq: false }, frontmatter: { categories: { in: [$category] } } }
        ) {
            edges {
                node {
                    ...BlogFragment
                }
            }
        }
    }
`
