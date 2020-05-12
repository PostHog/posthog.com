import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout";
import { connect } from 'react-redux'
import "katex/dist/katex.min.css"
import {
  onSidebarContentSelected,
  onSetSidebarContentEntry,
  onSetAnchorHide,
  onSetSidebarHide,
} from '../actions/layout'
import { getSidebarSelectedKey, getSidebarEntry } from "../store/selectors";
import { MDXProvider } from "@mdx-js/react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { Card } from 'antd'

let shortcodes = { Card };

function Template({
  data, // this prop will be injected by the GraphQL query below.
  onSidebarContentSelected,
  selectedKey,
  onSetSidebarContentEntry,
  sidebarEntry,
  onSetAnchorHide,
  onSetSidebarHide
}) {
  const { mdx } = data // data.markdownRemark holds our post data
  const { frontmatter, body, id } = mdx

  const hideAnchor = (frontmatter.hideAnchor === null) ? false : frontmatter.hideAnchor
  const hideSidebar = (frontmatter.sidebar === null) ? true : false

  onSetAnchorHide(hideAnchor)
  onSetSidebarHide(hideSidebar)

  if (selectedKey !== id) onSidebarContentSelected(id)
  if (sidebarEntry !== frontmatter.sidebar) onSetSidebarContentEntry(frontmatter.sidebar)

  return (
    <Layout onPostPage={true}>
    <div className="blog-post-container">
      <div className="blog-post">
        { frontmatter.showTitle && <h1 align="center">{frontmatter.title}</h1> }
        <MDXProvider components={shortcodes}>
          <MDXRenderer>{body}</MDXRenderer>
        </MDXProvider>
      </div>
    </div>
    </Layout>
  )
}

const mapStateToProps = (state) => {
  return {
    selectedKey: getSidebarSelectedKey(state),
    sidebarEntry: getSidebarEntry(state)
  }
}

const mapDispatchToProps = {
  onSidebarContentSelected,
  onSetSidebarContentEntry,
  onSetAnchorHide,
  onSetSidebarHide
}

export default connect(mapStateToProps, mapDispatchToProps) (Template)

export const pageQuery = graphql`
  query($path: String!) {
    mdx(fields: { slug: { eq: $path} }) {
      fields {
        slug
      }
      id
      body
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        sidebar
        showTitle
        hideAnchor
      }
    }
  }
`