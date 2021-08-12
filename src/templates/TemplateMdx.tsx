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
import { H1, H2, H3, H4, H5, H6 } from 'components/MdxAnchorHeaders'
import { AuthorsData } from 'types'
import { findAuthor } from 'lib/utils'

interface MdxQueryData {
    postData: {
        id: string
        slug: string
        body: any
        excerpt: string
        frontmatter: {
            date: string
            title: string
            sidebarTitle?: string
            sidebar: string
            showTitle: boolean
            tags?: string[]
            hideAnchor: boolean
            description: string
            featuredImageType?: string
            featuredImage?: {
                publicURL?: string
            }
            author?: string
        }
    }
    authorsData: {
        frontmatter: {
            authors: AuthorsData[]
        }
        id: string
    }
}

const components = {
    h1: H1,
    h2: H2,
    h3: H3,
    h4: H4,
    h5: H5,
    h6: H6,
    pre: CodeBlock,
    ...shortcodes,
}

function addIndex(url: string) {
    const indexUrls = ['/docs', '/handbook']
    return `${url}${indexUrls.includes(url) ? '/index' : ''}`
}

function TemplateMdx({ data }: { data: MdxQueryData }) {
    const { postData: mdx, authorsData } = data
    const { sidebarSelectedKey: selectedKey, sidebarEntry } = useValues(layoutLogic)
    const { setSidebarHide, setAnchorHide, onSidebarContentSelected, setSidebarContentEntry } = useActions(layoutLogic)

    // const { mdx } = data
    const { frontmatter, body, excerpt, id, slug } = mdx

    const author = findAuthor(authorsData.frontmatter.authors)(frontmatter.author)

    const hideAnchor = frontmatter.hideAnchor === null ? false : frontmatter.hideAnchor
    const hideSidebar = frontmatter.sidebar === null ? true : false

    // TODO: these actions should not be called here!
    setAnchorHide(hideAnchor)
    setSidebarHide(hideSidebar)

    if (selectedKey !== id) onSidebarContentSelected(id)
    if (sidebarEntry !== frontmatter.sidebar) setSidebarContentEntry(frontmatter.sidebar)

    const isDocsPage = frontmatter.sidebar === 'Docs'
    const blogArticleSlug = frontmatter.sidebar === 'Blog' ? slug : undefined
    const isHandbookPage = frontmatter.sidebar === 'Handbook'

    return (
        <div className={'post-page ' + (!blogArticleSlug ? 'post-page-wrapper' : '')}>
            <Layout
                blogDate={frontmatter.date}
                onPostPage={true}
                blogArticleSlug={blogArticleSlug}
                pageTitle={frontmatter.title}
                featuredImageType={frontmatter.featuredImageType}
                featuredImage={frontmatter.featuredImage?.publicURL}
                isHomePage={false}
                isDocsPage={isDocsPage}
                menuActiveKey={isDocsPage ? 'docs' : ''}
                authorDetails={author}
            >
                <SEO
                    title={
                        frontmatter.title + ' - PostHog' + (isDocsPage ? ' Docs' : isHandbookPage ? ' Handbook' : '')
                    }
                    description={frontmatter.description || excerpt}
                    article
                    image={frontmatter.featuredImage?.publicURL}
                />
                <div className="docsPagesContainer">
                    <div className="docsPages">
                        {frontmatter.showTitle && frontmatter.sidebar !== 'Blog' && (
                            <h1 className="centered">{frontmatter.title}</h1>
                        )}
                        <div className={`docsPagesContent font-inter ${blogArticleSlug ? 'blogPageContent' : ''}`}>
                            <MDXProvider components={components}>
                                <MDXRenderer>{body}</MDXRenderer>
                            </MDXProvider>
                        </div>
                    </div>
                    {isDocsPage && <DocsPageSurvey />}
                    {(isDocsPage || isHandbookPage) && (
                        <DocsFooter filename={`/${addIndex(slug)}.mdx`} title={frontmatter.title} />
                    )}
                </div>
            </Layout>
        </div>
    )
}

export default TemplateMdx

// @todo -> be defensive against null featuredImage
export const query = graphql`
    query MDXQuery($id: String!) {
        postData: mdx(id: { eq: $id }) {
            id
            slug
            body
            excerpt(pruneLength: 150)
            frontmatter {
                date(formatString: "MMMM DD, YYYY")
                title
                sidebar
                showTitle
                tags
                hideAnchor
                description
                featuredImageType
                featuredImage {
                    publicURL
                }
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
