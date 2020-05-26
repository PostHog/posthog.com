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
import { DocsFooter } from '../components/Footer/DocsFooter'
import { getSidebarSelectedKey, getSidebarEntry } from "../store/selectors";
import SEO from '../components/seo';

function addIndex (url) {
  const indexUrls = ['/docs', '/handbook']
  return `${url}${indexUrls.includes(url) ? '/index' : ''}`
}

function Template({
  data, // this prop will be injected by the GraphQL query below.
  onSidebarContentSelected,
  selectedKey,
  onSetSidebarContentEntry,
  sidebarEntry,
  onSetAnchorHide,
  onSetSidebarHide
}) {
  const { markdownRemark } = data // data.markdownRemark holds our post data
  const { frontmatter, html, excerpt, id } = markdownRemark

  const hideAnchor = (frontmatter.hideAnchor === null) ? false : frontmatter.hideAnchor
  const hideSidebar = (frontmatter.sidebar === null) ? true : false

  onSetAnchorHide(hideAnchor)
  onSetSidebarHide(hideSidebar)

  if (selectedKey !== id) onSidebarContentSelected(id)
  if (sidebarEntry !== frontmatter.sidebar) onSetSidebarContentEntry(frontmatter.sidebar)

  return (
    <Layout onPostPage={true}>
    <SEO
      title={frontmatter.title + ' - PostHog docs'}
      description={frontmatter.description || excerpt}
      pathname={markdownRemark.fields.slug}
      article
    />
    <div className="blog-post-container">
      <div className="blog-post">
        { frontmatter.showTitle && <h1 align="center">{frontmatter.title}</h1> }
        <div
          className="blog-post-content"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
      {(frontmatter.sidebar === 'Docs' || frontmatter.sidebar === 'Handbook') && <DocsFooter filename={`${addIndex(markdownRemark.fields.slug)}.md`} title={frontmatter.title} />}
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
    markdownRemark(fields: { slug: { eq: $path} }) {
      fields {
        slug
      }
      id
      html
      excerpt(pruneLength: 150)
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