import { MDXProvider } from '@mdx-js/react'
import { BlogPostLayout } from 'components/Blog/BlogPostLayout'
import Layout from 'components/Layout'
import { H1, H2, H3, H4, H5, H6 } from 'components/MdxAnchorHeaders'
import { SEO } from 'components/seo'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { findAuthor } from 'lib/utils'
import React from 'react'
import { CodeBlock } from '../components/CodeBlock'
import { shortcodes } from '../mdxGlobalComponents'

export default function BlogPost({ data, location: { state } }) {
    const { postData, authorsData } = data
    const {
        fields: { slug },
        body,
        excerpt,
    } = postData
    const {
        frontmatter: { authors },
    } = authorsData
    const { date, title, featuredImage, featuredImageType, author, description } = postData?.frontmatter
    const authorDetails = findAuthor(authors)(author)
    const category = state?.category
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

    return (
        <Layout>
            <SEO
                title={title + ' - PostHog'}
                description={description || excerpt}
                article
                image={featuredImage?.publicURL}
            />
            <BlogPostLayout
                blogDate={date}
                pageTitle={title}
                featuredImage={featuredImage?.publicURL}
                featuredImageType={featuredImageType}
                blogArticleSlug={slug}
                authorDetails={authorDetails}
                category={category}
            >
                <MDXProvider components={components}>
                    <MDXRenderer>{body}</MDXRenderer>
                </MDXProvider>
            </BlogPostLayout>
        </Layout>
    )
}

export const query = graphql`
    query BlogPostLayout($id: String!) {
        postData: mdx(id: { eq: $id }) {
            body
            excerpt(pruneLength: 150)
            fields {
                slug
            }
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
                author
            }
            parent {
                ... on File {
                    relativePath
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
