import { useStaticQuery, graphql } from 'gatsby'

export const BlogPosts = ({ render }: { render: (posts: Array<unknown>) => JSX.Element }) => {
    const postData = useStaticQuery(query)

    const parsedMdxData = postData.allMdx.edges.map((edge) => ({
        ...edge,
        node: { ...edge.node, fields: { slug: `/${edge.node.slug}` } },
    }))
    const edges = postData.allMarkdownRemark.edges

    const posts = [...edges, ...parsedMdxData] // Merge MDX and MD data into one array
        .filter((edge) => !!edge.node.frontmatter.date)
        .sort((a, b) => new Date(b.node.frontmatter.date) - new Date(a.node.frontmatter.date)) // Resort based on dates following merge

    return render(posts)
}

const query = graphql`
    query {
        allMarkdownRemark(
            sort: { order: DESC, fields: [frontmatter___date] }
            filter: { frontmatter: { rootPage: { eq: "/blog" } } }
        ) {
            edges {
                node {
                    fields {
                        slug
                    }
                    id
                    excerpt(pruneLength: 750)
                    frontmatter {
                        date(formatString: "MMMM DD, YYYY")
                        title
                        rootPage
                        featuredImage {
                            publicURL
                        }
                    }
                }
            }
        }
        allMdx(
            sort: { order: DESC, fields: [frontmatter___date] }
            filter: { frontmatter: { rootPage: { eq: "/blog" } } }
        ) {
            edges {
                node {
                    slug
                    id
                    excerpt(pruneLength: 250)
                    frontmatter {
                        date(formatString: "MMMM DD, YYYY")
                        title
                        rootPage
                        featuredImage {
                            publicURL
                        }
                    }
                }
            }
        }
    }
`
