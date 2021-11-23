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
    const { pageData, documentation, sidebars } = data
    const {
        body,
        excerpt,
        fields: { slug },
    } = pageData
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
                                    className="text-[20px] group font-semibold pb-3 mb-3 border-b border-dashed border-gray-accent-light dark:border-gray-accent-dark flex justify-between items-center"
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
            <Breadcrumbs
                crumbs={[{ title: 'Product', url: '/product' }, { title }]}
                darkModeToggle
                className="px-4 mt-4 sticky top-0 z-10 bg-tan dark:bg-primary"
            />
            <div
                style={{ gridAutoColumns: 'minmax(max-content, 1fr) minmax(auto, 880px) 1fr' }}
                className="px-5 mt-10 w-full relative lg:grid lg:grid-flow-col lg:gap-12 items-start"
            >
                <aside className="lg:sticky top-20 flex-shrink-0 lg:mt-24 mb-12 lg:mb-0 justify-self-end">
                    <nav>
                        <ul className="list-none p-0 m-0 flex flex-col space-y-4">
                            {sidebars.product.map(({ url, name }) => {
                                return (
                                    <li key={url} className={url === slug ? 'active-product relative' : ''}>
                                        <Link
                                            className="text-primary hover:text-primary dark:text-primary-dark dark:hover:text-primary-dark font-semibold opacity-50 hover:opacity-80 transition-opacity"
                                            to={url}
                                        >
                                            {name}
                                        </Link>
                                    </li>
                                )
                            })}
                        </ul>
                    </nav>
                </aside>
                <section className="col-span-2 max-w-[880px]">
                    <h1 className="text-center mt-0 mb-12 hidden lg:block">{title}</h1>
                    <GatsbyImage image={getImage(featuredImage)} />
                    <article>
                        <MDXProvider components={{ ...shortcodes, Section, TutorialsSlider, Documentation }}>
                            <MDXRenderer>{body}</MDXRenderer>
                        </MDXProvider>
                    </article>
                </section>
            </div>
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
        sidebars: sidebarsJson {
            product {
                name
                url
            }
        }
    }
`
