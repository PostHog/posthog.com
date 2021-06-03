import React, { useState, useEffect } from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import 'katex/dist/katex.min.css'
import './postTemplate.scss'
import { DocsFooter } from '../components/Footer/DocsFooter'
import { SEO } from '../components/seo'
import { layoutLogic } from '../logic/layoutLogic'
import { useActions, useValues } from 'kea'
import { DocsPageSurvey } from '../components/DocsPageSurvey'
import { Spin } from 'antd'

function addIndex(url) {
    const indexUrls = ['/docs', '/handbook']
    return `${url}${indexUrls.includes(url) ? '/index' : ''}`
}

function Template({
    data, // this prop will be injected by the GraphQL query below.
}) {
    const { sidebarSelectedKey: selectedKey, sidebarEntry } = useValues(layoutLogic)
    const { setSidebarHide, setAnchorHide, onSidebarContentSelected, setSidebarContentEntry } = useActions(layoutLogic)

    const [runningInBrowser, setRunningInBrowser] = useState(false)
    const { markdownRemark } = data // data.markdownRemark holds our post data
    const { frontmatter, html, excerpt, id, fields } = markdownRemark

    const hideAnchor = frontmatter.hideAnchor === null ? false : frontmatter.hideAnchor
    const hideSidebar = frontmatter.sidebar === null ? true : false

    // TODO: these actions should not be called here!
    setAnchorHide(hideAnchor)
    setSidebarHide(hideSidebar)

    if (selectedKey !== id) onSidebarContentSelected(id)
    if (sidebarEntry !== frontmatter.sidebar) setSidebarContentEntry(frontmatter.sidebar)

    const isDocsPage = frontmatter.sidebar === 'Docs'
    const blogArticleSlug = frontmatter.sidebar === 'Blog' ? fields.slug : undefined
    const isHandbookPage = frontmatter.sidebar === 'Handbook'

    return (
        <div className={'post-page ' + (!blogArticleSlug ? 'post-page-wrapper' : '')}>
            <Layout
                onPostPage
                blogArticleSlug={blogArticleSlug}
                pageTitle={frontmatter.title}
                featuredImage={frontmatter.featuredImage?.publicURL}
                isHomePage={false}
                isDocsPage={isDocsPage}
                onBlogPage={!!blogArticleSlug}
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
                        <div
                            className="docsPagesContent rounded md:rounded-lg px-4 py-8 md:py-16"
                            dangerouslySetInnerHTML={{ __html: html }}
                        />
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

// @todo -> be defensive against null featuredImage
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
                featuredImage {
                    publicURL
                }
                showTitle
                hideAnchor
            }
        }
    }
`
