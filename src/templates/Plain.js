import React from 'react'
import Layout from 'components/Layout'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { MDXProvider } from '@mdx-js/react'
import { SEO } from 'components/seo'
import { CodeBlock } from '../components/CodeBlock'
import { shortcodes } from '../mdxGlobalComponents'
import Hero from 'components/Hero'
import { Section } from 'components/Section'
import FeatureSnapshot from 'components/FeatureSnapshot'
import { Check, Close } from 'components/Icons/Icons'

const articleWidth = {
    lg: 'max-w-screen-2xl',
    md: 'max-w-5xl',
    sm: 'max-w-2xl',
    full: 'w-full',
}

export default function Plain({ data }) {
    const { pageData } = data
    const { body, excerpt } = pageData
    const { title, featuredImage, description, showTitle, width = 'sm' } = pageData?.frontmatter
    const components = {
        pre: CodeBlock,
        Hero,
        Section,
        FeatureSnapshot,
        Check,
        Close,
        ...shortcodes,
    }
    return (
        <Layout>
            <SEO
                title={title + ' - PostHog'}
                description={description || excerpt}
                article
                image={featuredImage?.publicURL}
            />
            <article className={`mx-auto my-12 md:my-24 px-4 article-content ${articleWidth[width || 'sm']}`}>
                {showTitle && <h1 className="text-center">{title}</h1>}
                <MDXProvider components={components}>
                    <MDXRenderer>{body}</MDXRenderer>
                </MDXProvider>
            </article>
        </Layout>
    )
}

export const query = graphql`
    query PlainLayout($id: String!) {
        pageData: mdx(id: { eq: $id }) {
            body
            excerpt(pruneLength: 150)
            fields {
                slug
            }
            frontmatter {
                title
                showTitle
                description
                featuredImageType
                featuredImage {
                    publicURL
                }
                width
            }
        }
    }
`
