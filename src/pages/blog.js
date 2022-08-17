import Blog from '../components/Blog'

export default Blog

import { graphql } from 'gatsby'

export const pageQuery = graphql`
    query {
        allMdx(
            sort: { order: DESC, fields: [frontmatter___date] }
            filter: { isFuture: { eq: false }, frontmatter: { rootPage: { eq: "/blog" } } }
        ) {
            edges {
                node {
                    ...BlogFragment
                }
            }
        }
    }
`
