import Blog from 'components/Blog'

export default Blog

export const pageQuery = graphql`
    query($category: String) {
        allMdx(
            sort: { order: DESC, fields: [frontmatter___date] }
            filter: { frontmatter: { categories: { in: [$category] } } }
        ) {
            edges {
                node {
                    ...BlogFragment
                }
            }
        }
        markdownRemark(fields: { slug: { eq: "/authors" } }) {
            ...AuthorsFragment
        }
    }
`
