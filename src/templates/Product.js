import { MDXProvider } from '@mdx-js/react'
import Breadcrumbs from 'components/Breadcrumbs'
import { RightArrow } from 'components/Icons/Icons'
import Layout from 'components/Layout'
import Link from 'components/Link'
import { Section } from 'components/Section'
import { SEO } from 'components/seo'
import TutorialsSlider from 'components/TutorialsSlider'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import GithubSlugger from 'github-slugger'
import React from 'react'
import { shortcodes } from '../mdxGlobalComponents'

export default function Product({ data }) {
    const { pageData, documentation } = data
    const { body, excerpt } = pageData
    const { title, subtitle, featuredImage, description } = pageData?.frontmatter
    const slugger = new GithubSlugger()

    const Documentation = () => {
        return (
            <>
                <h4 className="m-0 mb-9">{title} documentation</h4>
                <ul className="m-0 p-0 list-none">
                    {documentation.headings?.map((heading) => {
                        const id = slugger.slug(heading.value)
                        return (
                            <li key={id}>
                                <Link
                                    className="text-[20px] group font-semibold pb-3 mb-3 border-b border-dashed border-gray-accent-light flex justify-between items-center"
                                    to={`${documentation.fields?.slug}#${id}`}
                                >
                                    <span>{heading.value}</span>
                                    <RightArrow className="w-6 h-6 text-gray bounce" />
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </>
        )
    }

    return (
        <Layout>
            <SEO title={`${title} - PostHog`} description={description || excerpt} />
            <Breadcrumbs crumbs={[{ title: 'Product', url: '/product' }, { title }]} darkModeToggle className="px-4" />
            <section className="max-w-[880px] mx-auto px-5">
                <h1 className="text-center mt-10 mb-12">{title}</h1>
                <GatsbyImage image={getImage(featuredImage)} />
                <article>
                    <MDXProvider components={{ ...shortcodes, Section, TutorialsSlider, Documentation }}>
                        <MDXRenderer>{body}</MDXRenderer>
                    </MDXProvider>
                </article>
            </section>
        </Layout>
    )
}

export const query = graphql`
    query Product($id: String!, $documentation: String!) {
        pageData: mdx(id: { eq: $id }) {
            body
            excerpt(pruneLength: 150)
            fields {
                slug
            }
            frontmatter {
                title
                description
                featuredImage {
                    childImageSharp {
                        gatsbyImageData
                    }
                }
            }
        }
        documentation: mdx(fields: { slug: { eq: $documentation } }) {
            fields {
                slug
            }
            headings {
                depth
                value
            }
        }
    }
`
