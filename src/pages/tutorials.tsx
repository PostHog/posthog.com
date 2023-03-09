import { graphql } from 'gatsby'
import Tutorials from 'components/Tutorials'

export default Tutorials

export const pageQuery = graphql`
    query TutorialsQuery {
        allPostsRecent: allMdx(
            sort: { order: DESC, fields: [frontmatter___date] }
            filter: { fields: { slug: { regex: "/^/tutorials/" } } }
            limit: 4
        ) {
            edges {
                node {
                    ...BlogFragment
                }
            }
        }
        allPostsPopular: allMdx(
            sort: { order: DESC, fields: [fields___pageViews] }
            filter: { fields: { slug: { regex: "/^/tutorials/" } } }
            limit: 4
        ) {
            edges {
                node {
                    ...BlogFragment
                }
            }
        }
        categories: allMdx(
            sort: { order: DESC, fields: [frontmatter___date] }
            filter: { fields: { slug: { regex: "/^/tutorials/" } } }
        ) {
            group(field: frontmatter___tags, limit: 2) {
                category: fieldValue
                edges {
                    node {
                        ...BlogFragment
                    }
                }
            }
        }
    }
`
