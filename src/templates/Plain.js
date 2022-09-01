import { MDXProvider } from '@mdx-js/react'
import { FeatureSnapshot } from 'components/FeatureSnapshot'
import { Hero } from 'components/Hero'
import { Check, Close } from 'components/Icons/Icons'
import Layout from 'components/Layout'
import Link from 'components/Link'
import { Section } from 'components/Section'
import { SEO } from 'components/seo'
import { graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import React from 'react'
import { MdxCodeBlock } from '../components/CodeBlock'
import { shortcodes } from '../mdxGlobalComponents'

const articleWidth = {
    lg: 'max-w-screen-2xl',
    md: 'max-w-5xl',
    sm: 'max-w-2xl',
    full: 'w-full px-0',
}

const A = (props) => <Link {...props} className="text-red hover:text-red font-semibold" />

export default function Plain({ data }) {
    const { pageData } = data
    const { body, excerpt } = pageData
    const { title, featuredImage, description, showTitle, width = 'sm', noindex, images } = pageData?.frontmatter
    const components = {
        pre: MdxCodeBlock,
        Hero,
        Section,
        FeatureSnapshot,
        Check,
        Close,
        a: A,
        ...shortcodes,
    }
    return (
        <Layout>
            <SEO
                title={title + ' - PostHog'}
                description={description || excerpt}
                article
                image={featuredImage?.publicURL}
                noindex={noindex}
            />
            <article className={`mx-auto my-12 md:my-24 px-4 article-content ${articleWidth[width || 'sm']}`}>
                {showTitle && <h1 className="text-center">{title}</h1>}
                <MDXProvider components={components}>
                    <MDXRenderer images={images}>{body}</MDXRenderer>
                </MDXProvider>
            </article>
            <Section />
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
                images {
                    childImageSharp {
                        gatsbyImageData
                    }
                }
                width
                noindex
            }
        }
    }
`
