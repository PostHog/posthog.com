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
import Title from 'components/Edition/Title'
import { useLayoutData } from 'components/Layout/hooks'

const A = (props) => <Link {...props} className="text-red hover:text-red font-semibold" />

const components = {
    ...shortcodes,
    Caption,
    ImageBlock,
    FloatedImage,
    a: A,
}

export default function Customer({ data, mobile, pageContext: { tableOfContents } }) {
    const { websiteTheme } = useValues(layoutLogic)

    const {
        customerData: {
            body,
            excerpt,
            fields,
            frontmatter: { title, description },
        },
    } = data

    const { fullWidthContent } = useLayoutData()

    return (
        <article className="@container">
            <SEO
                title={`${title} - PostHog`}
                description={description || excerpt}
                article
                image={`/og-images/${fields.slug.replace(/\//g, '')}.jpeg`}
            />
            <div className="flex flex-col-reverse items-start @3xl:flex-row gap-8 2xl:gap-12">
                <section className="article-content customer-content flex-1 transition-all pt-8 w-full">
                    <div className={`mx-auto transition-all ${fullWidthContent ? 'max-w-full' : 'max-w-2xl px-0'}`}>
                        <Title className="mb-4">{title}</Title>
                        <MDXProvider components={components}>
                            <MDXRenderer>{body}</MDXRenderer>
                        </MDXProvider>
                    </div>
                </section>
                <aside
                    className={`shrink-0 basis-72 @3xl:reasonable:sticky @3xl:reasonable:overflow-auto max-h-64 overflow-auto @3xl:max-h-[calc(100vh_-_108px)] @3xl:top-[108px] w-full block border-x border-border dark:border-dark pt-4 ${
                        mobile ? 'lg:hidden' : ''
                    } `}
                >
                    aside
                </aside>
            </div>
            <FooterCTA />
        </article>
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
