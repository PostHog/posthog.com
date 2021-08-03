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
import { findAuthor } from 'lib/utils'

function addIndex(url) {
    const indexUrls = ['/docs', '/handbook']
    return `${url}${indexUrls.includes(url) ? '/index' : ''}`
}

// props will be injected by the GraphQL query below.
function Template(props) {
    const {
        data: { postData: data, authorsData },
    } = props
    const { sidebarSelectedKey: selectedKey, sidebarEntry } = useValues(layoutLogic)
    const { setSidebarHide, setAnchorHide, onSidebarContentSelected, setSidebarContentEntry } = useActions(layoutLogic)

    const [runningInBrowser, setRunningInBrowser] = useState(false)
    const { frontmatter, html, excerpt, id, fields } = data // data holds our post data

    const author = findAuthor(authorsData.frontmatter.authors)(frontmatter.author)

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
                blogDate={frontmatter.date}
                pageTitle={frontmatter.title}
                featuredImage={frontmatter.featuredImage?.publicURL}
                featuredImageType={frontmatter.featuredImageType}
                isHomePage={false}
                isDocsPage={isDocsPage}
                onBlogPage={!!blogArticleSlug}
                authorDetails={author}
            >
                <SEO
                    title={
                        frontmatter.title + ' - PostHog' + (isDocsPage ? ' Docs' : isHandbookPage ? ' Handbook' : '')
                    }
                    description={frontmatter.description || excerpt}
                    pathname={fields.slug}
                    article
                    image={frontmatter.featuredImage?.publicURL}
                />
                <div className="docsPagesContainer">
                    <div className="docsPages">
                        {frontmatter.showTitle && frontmatter.sidebar !== 'Blog' && (
                            <h1 align="center">{frontmatter.title}</h1>
                        )}
                        <div
                            className="docsPagesContent rounded md:rounded-lg px-4 pb-8 md:pb-16"
                            dangerouslySetInnerHTML={{ __html: html }}
                        />
                    </div>
                    {isDocsPage && <DocsPageSurvey />}
                    {(isDocsPage || isHandbookPage) && (
                        <DocsFooter filename={`${addIndex(fields.slug)}.md`} title={frontmatter.title} />
                    )}
                </div>
            </Layout>
        </div>
    )
}

export default Template

// @todo -> be defensive against null featuredImage
export const pageQuery = graphql`
    query ($path: String!) {
        postData: markdownRemark(fields: { slug: { eq: $path } }) {
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
                featuredImageType
                featuredImage {
                    publicURL
                }
                showTitle
                hideAnchor
                author
            }
        }
        authorsData: markdownRemark(fields: { slug: { eq: "/authors" } }) {
            frontmatter {
                authors {
                    handle
                    name
                    role
                    image
                    link_type
                    link_url
                }
            }
            id
        }
    }
`
