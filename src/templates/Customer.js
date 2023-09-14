import { MDXProvider } from '@mdx-js/react'
import Breadcrumbs from 'components/Breadcrumbs'
import { Caption } from 'components/Caption'
import { FloatedImage } from 'components/FloatedImage'
import { ImageBlock } from 'components/ImageBlock'
import Layout from 'components/Layout'
import { SEO } from 'components/seo'
import { graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import React from 'react'
import { shortcodes } from '../mdxGlobalComponents'
import Link from 'components/Link'
import FooterCTA from 'components/FooterCTA'
import PostLayout from 'components/PostLayout'
import SidebarSection from 'components/PostLayout/SidebarSection'
import Topics from 'components/PostLayout/Topics'
import { useValues } from 'kea'
import { layoutLogic } from 'logic/layoutLogic'

const A = (props) => <Link {...props} className="text-red hover:text-red font-semibold" />

const components = {
    ...shortcodes,
    Caption,
    ImageBlock,
    FloatedImage,
    a: A,
}

export default function Customer({ data, pageContext: { tableOfContents } }) {
    const { websiteTheme } = useValues(layoutLogic)

    const {
        customerData: {
            body,
            excerpt,
            fields,
            frontmatter: { title, description },
        },
    } = data

    return (
        <>
            <SEO
                title={`${title} - PostHog`}
                description={description || excerpt}
                article
                image={`/og-images/${fields.slug.replace(/\//g, '')}.jpeg`}
            />
            <section className="article-content customer-content">
                <h1 className="text-4xl leading-none mt-0">{title}</h1>
                <MDXProvider components={components}>
                    <MDXRenderer>{body}</MDXRenderer>
                </MDXProvider>
            </section>
            <FooterCTA />
        </>
    )
}

export const query = graphql`
    query Customer($id: String!) {
        allCustomers: allMdx(
            filter: { fields: { slug: { regex: "/^/customers/" } } }
            sort: { fields: frontmatter___customer, order: ASC }
        ) {
            nodes {
                fields {
                    slug
                }
                frontmatter {
                    customer
                }
            }
        }
        customerData: mdx(id: { eq: $id }) {
            body
            excerpt(pruneLength: 150)
            fields {
                slug
            }
            frontmatter {
                title
                customer
                logo {
                    publicURL
                }
                logoDark {
                    publicURL
                }
                description
                industries
                users
                toolsUsed
                featuredImage {
                    publicURL
                }
            }
        }
    }
`
