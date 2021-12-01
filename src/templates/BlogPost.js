import { MDXProvider } from '@mdx-js/react'
import { Blockquote } from 'components/BlockQuote'
import { BlogPostLayout } from 'components/Blog/BlogPostLayout'
import { InlineCode } from 'components/InlineCode'
import Layout from 'components/Layout'
import Link from 'components/Link'
import { H1, H2, H3, H4, H5, H6 } from 'components/MdxAnchorHeaders'
import { SEO } from 'components/seo'
import { ZoomImage } from 'components/ZoomImage'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { findAuthor } from 'lib/utils'
import React from 'react'
import { CodeBlock } from '../components/CodeBlock'
import { shortcodes } from '../mdxGlobalComponents'

const A = (props) => <Link {...props} className="text-red hover:text-red font-semibold" />

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
    const lastUpdated = postData?.parent?.fields?.gitLogLatestDate
    const authorDetails = findAuthor(authors)(author && author[0])
    const components = {
        h1: H1,
        h2: H2,
        h3: H3,
        h4: H4,
        h5: H5,
        h6: H6,
        pre: CodeBlock,
        inlineCode: InlineCode,
        blockquote: Blockquote,
        img: ZoomImage,
        a: A,
        ...shortcodes,
    }
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
                blogUpdatedDate={lastUpdated}
                pageTitle={title}
                featuredImage={featuredImage?.publicURL}
                featuredImageType={featuredImageType}
                blogArticleSlug={slug}
                authorDetails={authorDetails}
                categories={categories}
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
                    fields {
                        gitLogLatestDate(formatString: "MMMM DD, YYYY")
                    }
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
