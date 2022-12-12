import Blog from '../components/Blog'

export default Blog

import { graphql } from 'gatsby'

export const pageQuery = graphql`
    {
        allPostsRecent: allMdx(
            sort: { order: DESC, fields: [frontmatter___date] }
            filter: { isFuture: { eq: false }, frontmatter: { rootPage: { eq: "/blog" }, date: { ne: null } } }
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
            filter: { isFuture: { eq: false }, frontmatter: { rootPage: { eq: "/blog" }, date: { ne: null } } }
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
            filter: { isFuture: { eq: false }, frontmatter: { rootPage: { eq: "/blog" }, date: { ne: null } } }
        ) {
            group(field: frontmatter___categories, limit: 2) {
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
