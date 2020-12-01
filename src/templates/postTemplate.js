import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import 'katex/dist/katex.min.css'
import './postTemplate.scss'
import { DocsFooter } from '../components/Footer/DocsFooter'
import SEO from '../components/seo'
import { layoutLogic } from '../logic/layoutLogic'
import { useActions, useValues } from 'kea'
import { DocsPageSurvey } from '../components/DocsPageSurvey'

function addIndex(url) {
    const indexUrls = ['/docs', '/handbook']
    return `${url}${indexUrls.includes(url) ? '/index' : ''}`
}

function Template({
    data, // this prop will be injected by the GraphQL query below.
}) {
    const { sidebarSelectedKey: selectedKey, sidebarEntry } = useValues(layoutLogic)
    const { setSidebarHide, setAnchorHide, onSidebarContentSelected, setSidebarContentEntry } = useActions(layoutLogic)

    const { markdownRemark } = data // data.markdownRemark holds our post data
    const { frontmatter, html, excerpt, id } = markdownRemark

    const hideAnchor = frontmatter.hideAnchor === null ? false : frontmatter.hideAnchor
    const hideSidebar = frontmatter.sidebar === null ? true : false

    // TODO: these actions should not be called here!
    setAnchorHide(hideAnchor)
    setSidebarHide(hideSidebar)

    if (selectedKey !== id) onSidebarContentSelected(id)
    if (sidebarEntry !== frontmatter.sidebar) setSidebarContentEntry(frontmatter.sidebar)

    const isDocsPage = frontmatter.sidebar === 'Docs'
    const isBlogArticlePage = frontmatter.sidebar === 'Blog'
    const isHandbookPage = frontmatter.sidebar === 'Handbook'

    return (
        <div className={'post-page ' + (!isBlogArticlePage ? 'post-page-wrapper' : '')}>
            <Layout
                onPostPage={true}
                isBlogArticlePage={isBlogArticlePage}
                pageTitle={frontmatter.title}
                isHomePage={false}
                isDocsPage={isDocsPage}
            >
                <SEO
                    title={
                        frontmatter.title + ' - PostHog' + (isDocsPage ? ' Docs' : isHandbookPage ? ' Handbook' : '')
                    }
                    description={frontmatter.description || excerpt}
                    pathname={markdownRemark.fields.slug}
                    article
                />
                <div className="docsPagesContainer">
                    <div className="docsPages">
                        {frontmatter.showTitle && frontmatter.sidebar !== 'Blog' && (
                            <h1 align="center">{frontmatter.title}</h1>
                        )}
                        <div className="docsPagesContent" dangerouslySetInnerHTML={{ __html: html }} />
                    </div>
                    {isDocsPage && <DocsPageSurvey />}
                    {(isDocsPage || isHandbookPage) && (
                        <DocsFooter filename={`${addIndex(markdownRemark.fields.slug)}.md`} title={frontmatter.title} />
                    )}
                </div>
            </Layout>
        </div>
    )
}

export default Template

export const pageQuery = graphql`
    query($path: String!) {
        markdownRemark(fields: { slug: { eq: $path } }) {
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
