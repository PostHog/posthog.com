import Blog from '../components/Blog'

export default Blog

import { graphql } from 'gatsby'

export const pageQuery = graphql`
    {
        allPostsRecent: allMdx(
            sort: { order: DESC, fields: [frontmatter___date] }
            filter: {
                isFuture: { eq: false }
                fields: { slug: { regex: "/^/blog/" } }
                frontmatter: { date: { ne: null } }
            }
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
            filter: {
                isFuture: { eq: false }
                fields: { slug: { regex: "/^/blog/" } }
                frontmatter: { date: { ne: null } }
            }
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
            filter: {
                isFuture: { eq: false }
                fields: { slug: { regex: "/^/blog/" } }
                frontmatter: { date: { ne: null } }
            }
        ) {
            group(field: frontmatter___category, limit: 2) {
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
