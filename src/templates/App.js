import { MDXProvider } from '@mdx-js/react'
import Breadcrumbs from 'components/Breadcrumbs'
import FooterCTA from 'components/FooterCTA'
import { RightArrow } from 'components/Icons/Icons'
import Layout from 'components/Layout'
import Link from 'components/Link'
import { Section } from 'components/Section'
import { SEO } from 'components/seo'
import TutorialsSlider from 'components/TutorialsSlider'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import GithubSlugger from 'github-slugger'
import { graphql } from 'gatsby'
import React from 'react'
import { shortcodes } from '../mdxGlobalComponents'
import SectionLinks from 'components/SectionLinks'

export default function App({ data, pageContext: { next, previous } }) {
    const { pageData, documentation } = data
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
                <h4 className="mt-6 mb-2">{title} documentation</h4>
                <ul className="m-0 p-0 list-none">
                    {documentation.headings?.map((heading) => {
                        const id = slugger.slug(heading.value)
                        return (
                            <li key={id}>
                                <Link
                                    className="text-[18px] group font-semibold pb-3 mb-3 border-b border-dashed border-gray-accent-light dark:border-gray-accent-dark flex justify-between items-center"
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
            <SEO
                image={`/images/apps/${slug.split('/')[2]}.png`}
                title={`${title} - PostHog`}
                description={description || excerpt}
            />
            <Breadcrumbs
                crumbs={[{ title: 'Apps', url: '/apps' }, { title }]}
                darkModeToggle
                className="px-4 mt-4 sticky top-0 z-10 bg-tan dark:bg-primary"
            />
            <div
                style={{ gridAutoColumns: 'minmax(max-content, 1fr) minmax(auto, 880px) 1fr' }}
                className="mt-10 w-full relative lg:grid lg:grid-flow-col lg:gap-12 items-start"
            >
                <section>
                    <div className="lg:max-w-[880px] lg:pr-5 px-5 lg:px-0 mx-auto">
                        <h1 className="text-center mt-0 mb-12 hidden lg:block">{title}</h1>
                        <GatsbyImage image={getImage(featuredImage)} alt="" />
                        <article>
                            <MDXProvider components={{ ...shortcodes, Section, TutorialsSlider, Documentation }}>
                                <MDXRenderer>{body}</MDXRenderer>
                            </MDXProvider>
                        </article>
                        <div className="mt-12">
                            <SectionLinks next={next} previous={previous} />
                        </div>
                        <FooterCTA />
                    </div>
                </section>
            </div>
        </Layout>
    )
}

export const query = graphql`
    query App($id: String!, $documentation: String!) {
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
