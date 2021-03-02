import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import 'katex/dist/katex.min.css'
import './postTemplate.scss'
import { DocsFooter } from '../components/Footer/DocsFooter'
import { SEO } from '../components/seo'
import { layoutLogic } from '../logic/layoutLogic'
import { useActions, useValues } from 'kea'
import { DocsPageSurvey } from '../components/DocsPageSurvey'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { MDXProvider } from '@mdx-js/react'
import { CodeBlock } from '../components/CodeBlock'
import { shortcodes } from '../mdxGlobalComponents'
interface MdxQueryData {
    mdx: {
        id: string
        slug: string
        body: any
        excerpt: string
        frontmatter: {
            date: string
            title: string
            sidebar: string
            showTitle: boolean
            hideAnchor: boolean
            description: string
        }
    }
}

const components = {
    pre: CodeBlock,
    ...shortcodes,
}

function addIndex(url: string) {
    const indexUrls = ['/docs', '/handbook']
    return `${url}${indexUrls.includes(url) ? '/index' : ''}`
}

function TemplateMdx({ data }: { data: MdxQueryData }) {
    const { sidebarSelectedKey: selectedKey, sidebarEntry } = useValues(layoutLogic)
    const { setSidebarHide, setAnchorHide, onSidebarContentSelected, setSidebarContentEntry } = useActions(layoutLogic)

    const { mdx } = data
    const { frontmatter, body, excerpt, id } = mdx

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
                menuActiveKey={isDocsPage ? 'docs' : ''}
            >
                <SEO
                    title={
                        frontmatter.title + ' - PostHog' + (isDocsPage ? ' Docs' : isHandbookPage ? ' Handbook' : '')
                    }
                    description={frontmatter.description || excerpt}
                    article
                />
                <div className="docsPagesContainer">
                    <div className="docsPages">
                        {frontmatter.showTitle && frontmatter.sidebar !== 'Blog' && (
                            <h1 className="centered">{frontmatter.title}</h1>
                        )}
                        <div className="docsPagesContent">
                            <MDXProvider components={components}>
                                <MDXRenderer>{body}</MDXRenderer>
                            </MDXProvider>
                        </div>
                    </div>
                    {isDocsPage && <DocsPageSurvey />}
                    {(isDocsPage || isHandbookPage) && (
                        <DocsFooter filename={`/${addIndex(mdx.slug)}.mdx`} title={frontmatter.title} />
                    )}
                </div>
            </Layout>
        </div>
    )
}

export default TemplateMdx

export const query = graphql`
    query MDXQuery($id: String!) {
        mdx(id: { eq: $id }) {
            id
            slug
            body
            excerpt(pruneLength: 150)
            frontmatter {
                date(formatString: "MMMM DD, YYYY")
                title
                sidebar
                showTitle
                hideAnchor
                description
            }
        }
    }
`
