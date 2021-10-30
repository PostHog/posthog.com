import { MDXProvider } from '@mdx-js/react'
import { BlogPostLayout } from 'components/Blog/BlogPostLayout'
import Layout from 'components/Layout'
import { SEO } from 'components/seo'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { findAuthor } from 'lib/utils'
import React from 'react'
import { shortcodes } from '../shortcodes'

export default function BlogPost({ data, pageContext }) {
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

    const { categories } = pageContext
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
                categories={categories}
            >
                <MDXProvider components={shortcodes}>
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
