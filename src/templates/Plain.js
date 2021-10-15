import React from 'react'
import Layout from 'components/Layout'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { MDXProvider } from '@mdx-js/react'
import { SEO } from 'components/seo'
import { CodeBlock } from '../components/CodeBlock'
import { shortcodes } from '../mdxGlobalComponents'
import { H1, H2, H3, H4, H5, H6 } from 'components/MdxAnchorHeaders'
import Hero from 'components/Hero'
import { Section } from 'components/Section'
import FeatureSnapshot from 'components/FeatureSnapshot'

export default function Plain({ data }) {
    const { pageData } = data
    const { body, excerpt } = pageData
    const { title, featuredImage, description, showTitle } = pageData?.frontmatter
    const components = {
        h1: H1,
        h2: H2,
        h3: H3,
        h4: H4,
        h5: H5,
        h6: H6,
        pre: CodeBlock,
        Hero,
        Section,
        FeatureSnapshot,
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
            <article className="max-w-screen-2xl mx-auto my-12 md:my-24 px-4 article-content">
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
            }
        }
    }
`
