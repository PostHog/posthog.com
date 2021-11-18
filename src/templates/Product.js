import { MDXProvider } from '@mdx-js/react'
import Breadcrumbs from 'components/Breadcrumbs'
import Layout from 'components/Layout'
import { Section } from 'components/Section'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import React from 'react'
import { shortcodes } from '../mdxGlobalComponents'

export default function Product({ data }) {
    const { pageData } = data
    const { body, excerpt } = pageData
    const { title, subtitle, featuredImage } = pageData?.frontmatter

    return (
        <Layout>
            <Breadcrumbs crumbs={[{ title: 'Product', url: '/product' }, { title }]} darkModeToggle className="px-4" />
            <section className="max-w-[880px] mx-auto px-5">
                <h1 className="text-center mt-10 mb-12">{title}</h1>
                <GatsbyImage className="lg:-mb-16" image={getImage(featuredImage)} />
                <article>
                    <MDXProvider components={{ ...shortcodes, Section }}>
                        <MDXRenderer>{body}</MDXRenderer>
                    </MDXProvider>
                </article>
            </section>
        </Layout>
    )
}

export const query = graphql`
    query Product($id: String!) {
        pageData: mdx(id: { eq: $id }) {
            body
            excerpt(pruneLength: 150)
            fields {
                slug
            }
            frontmatter {
                title
                featuredImage {
                    childImageSharp {
                        gatsbyImageData
                    }
                }
            }
        }
    }
`
