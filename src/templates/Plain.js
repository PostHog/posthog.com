import { MDXProvider } from '@mdx-js/react'
import Layout from 'components/Layout'
import { SEO } from 'components/seo'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import React from 'react'
import { shortcodes } from '../shortcodes'

export default function Plain({ data }) {
    const { pageData } = data
    const { body, excerpt } = pageData
    const { title, featuredImage, description, showTitle } = pageData?.frontmatter

    return (
        <Layout>
            <SEO
                title={title + ' - PostHog'}
                description={description || excerpt}
                article
                image={featuredImage?.publicURL}
            />
            <article className="max-w-2xl mx-auto my-12 md:my-24 px-4 article-content">
                {showTitle && <h1 className="text-center">{title}</h1>}
                <MDXProvider components={shortcodes}>
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
