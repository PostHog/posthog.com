import { useStaticQuery, graphql } from 'gatsby'

export const BlogPosts = ({ render }) => {
    const postData = useStaticQuery(query)
    const posts = postData.allMdx.edges
        .filter((edge) => !!edge.node.frontmatter.date)
        .sort((a, b) => new Date(b.node.frontmatter.date) - new Date(a.node.frontmatter.date))

    return render(posts)
}

const query = graphql`
    query {
        allMdx(
            sort: { order: DESC, fields: [frontmatter___date] }
            filter: { frontmatter: { rootPage: { eq: "/blog" } } }
        ) {
            edges {
                node {
                    fields {
                        slug
                    }
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
