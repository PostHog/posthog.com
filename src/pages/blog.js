import React from 'react'
import { graphql } from "gatsby"
import Layout from '../components/Layout'
import PostCard from '../components/PostCard';

const BlogPage = ({
  data: {
    allMarkdownRemark: { edges },
  },
}) => {
  const posts = edges
    .filter(edge => !! edge.node.frontmatter.date)
    .map(edge => <PostCard key={edge.node.id} post={edge.node} />)
  return (
    <Layout>
      <div>{posts}</div>
    </Layout>
  )
}

export default BlogPage

export const pageQuery = graphql`
  query($path: String!) {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { frontmatter: { rootPage: {eq: $path }}}
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
          }
        }
      }
    }
  }
`