import React, { useEffect } from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import 'katex/dist/katex.min.css'
import { DocsFooter } from '../components/Footer/DocsFooter'
import SEO from '../components/seo'
import { layoutLogic } from '../logic/layoutLogic'
import { useActions, useValues } from 'kea'
/*within useEffect to avoid build window error: 
import docsearch from 'docsearch.js'*/
import 'docsearch.js/dist/cdn/docsearch.min.css/'
import { SearchOutlined } from '@ant-design/icons'

function addIndex(url) {
    const indexUrls = ['/docs', '/handbook']
    return `${url}${indexUrls.includes(url) ? '/index' : ''}`
}

function Template({
    data, // this prop will be injected by the GraphQL query below.
    location,
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

    const parsedPathname = location.pathname.split('/')
    const isDocsPage = parsedPathname[1] === 'docs'
    const isBlogArticlePage = parsedPathname[1] === 'blog' && parsedPathname.length > 2
    const isFeaturesPage = parsedPathname[1] === 'product-features'
    const isHandbookPage = parsedPathname[1] === 'handbook'

    useEffect(() => {
        if (window && isDocsPage) {
            import('docsearch.js').then(({ default: docsearch }) => {
                docsearch({
                    apiKey: '45e80dec3e5b55c400663a5cba911c4c',
                    indexName: 'posthog',
                    inputSelector: '#doc-search',
                })
            })
        }
    })

    return (
        <Layout
            onPostPage={true}
            isBlogPage={frontmatter.sidebar === 'Blog'}
            pageTitle={frontmatter.title}
            isHomePage={false}
            isDocsPage={isDocsPage}
            isBlogArticlePage={isBlogArticlePage}
            isFeaturesPage={isFeaturesPage}
            isHandbookPage={isHandbookPage}
        >
            <SEO
                title={frontmatter.title + ' - PostHog' + (isDocsPage ? ' Docs' : isHandbookPage ? ' Handbook' : '')}
                description={frontmatter.description || excerpt}
                pathname={markdownRemark.fields.slug}
                article
            />
            <div className="docsPagesContainer">
                <div className="docsPages">
                    {isDocsPage && (
                        <div className="flex-row-reverse">
                            <form className="docSearchWrapper">
                                <input placeholder="Search our Docs" id="doc-search" />
                                <SearchOutlined className="docSearchIcon" type="submit" />
                            </form>
                        </div>
                    )}
                    {frontmatter.showTitle && frontmatter.sidebar !== 'Blog' && (
                        <h1 align="center">{frontmatter.title}</h1>
                    )}
                    <div className="docsPagesContent" dangerouslySetInnerHTML={{ __html: html }} />
                </div>
                {(frontmatter.sidebar === 'Docs' || frontmatter.sidebar === 'Handbook') && (
                    <DocsFooter filename={`${addIndex(markdownRemark.fields.slug)}.md`} title={frontmatter.title} />
                )}
            </div>
        </Layout>
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
