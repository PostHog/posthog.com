import { MDXProvider } from '@mdx-js/react'
import Breadcrumbs from 'components/Breadcrumbs'
import FooterCTA from 'components/FooterCTA'
import CTA from 'components/Product/CTA'
import { RightArrow } from 'components/Icons/Icons'
import Layout from 'components/Layout'
import Link from 'components/Link'
import { Section } from 'components/Section'
import { SEO } from 'components/seo'
import TutorialsSlider from 'components/TutorialsSlider'
import { graphql } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import GithubSlugger from 'github-slugger'
import React from 'react'
import { shortcodes } from '../mdxGlobalComponents'
import SectionLinks from 'components/SectionLinks'
import PostLayout from 'components/PostLayout'
import { ProductIcons } from 'components/ProductIcons/ProductIcons'

const features = [
    { name: 'Product analytics' },
    {
        name: 'Funnels',
        url: '/product/funnels',
        icon: ProductIcons.funnels,
    },
    {
        name: 'Graphs & trends',
        url: '/product/trends',
        icon: ProductIcons.trends,
    },
    {
        name: 'User paths',
        url: '/product/user-paths',
        icon: ProductIcons.pathAnalysis,
    },
    {
        name: 'Team collaboration',
        url: '/product/collaboration',
        icon: ProductIcons.teamCollaboration,
    },
    {
        name: 'Session recording',
        url: '/product/session-recording',
        icon: ProductIcons.sessionRecording,
    },

    {
        name: 'Feature flags',
        url: '/product/feature-flags',
        icon: ProductIcons.featureFlags,
    },
    {
        name: 'Experimentation suite',
        url: '/product/experimentation-suite',
        icon: ProductIcons.experiments,
    },
    {
        name: 'Correlation analysis',
        url: '/product/correlation-analysis',
        icon: ProductIcons.correlationAnalysis,
    },
]

const menu = [
    {
        name: 'Overview',
        url: '/product#overview',
        icon: ProductIcons.posthogMonochrome,
    },
    {
        name: 'Top features',
        url: '/product#top-features',
        icon: ProductIcons.topFeatures,
        children: features.map(({ name, url }) => ({ name, url })),
    },
    { name: 'Apps', url: '/product#apps', icon: ProductIcons.appLibrary },
    { name: 'Event pipelines', url: '/product#event-pipelines', icon: ProductIcons.eventPipelines },
    { name: 'Data warehouse', url: '/product#data-warehouse', icon: ProductIcons.dataWarehouse },
    { name: 'Self-hosting', url: '/product#self-hosting', icon: ProductIcons.selfHosting },
    { name: 'API', url: 'api', icon: ProductIcons.api },
]

export default function Product({ data, location }) {
    const { pageData, documentation, sidebars } = data
    const {
        body,
        excerpt,
        fields: { slug },
    } = pageData
    const { title, subtitle, featuredImage, description } = pageData?.frontmatter
    const slugger = new GithubSlugger()
    let feature
    let next
    let previous
    features.some((menuItem, index) => {
        if (menuItem?.url?.replace(/\/$/, '') === location.pathname.replace(/\/$/, '')) {
            feature = menuItem
            next = features[index + 1]
            previous = features[index - 1]
            return true
        }
    })
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
                image={`/images/product/${slug.split('/')[2]}.png`}
                title={`${title} - PostHog`}
                description={description || excerpt}
            />

            <PostLayout
                hideSurvey
                title={title}
                menu={menu}
                hideSidebar
                contentContainerClassName="w-full"
                article={false}
            >
                <div className="border-b border-gray-accent-light border-dashed py-3 lg:-mt-12">
                    <div className="flex justify-between items-center max-w-5xl mx-auto px-5">
                        <div className="flex-1">
                            {previous?.url && (
                                <Link
                                    to={previous?.url}
                                    className="text-[15px] font-bold text-black/60 hover:text-black/60 bg-white rounded-sm px-4 py-2 inline-flex items-center space-x-2 relative active:top-[0.5px] active:scale-[.98]"
                                >
                                    <RightArrow className="w-[14px] rotate-180" />
                                    <span>{previous?.name}</span>
                                </Link>
                            )}
                        </div>
                        <p className="m-0 text-[15px] font-bold">{title}</p>
                        <div className="flex-1 flex justify-end">
                            {next?.url && (
                                <Link
                                    to={next?.url}
                                    className="text-[15px] font-bold text-black/60 hover:text-black/60 bg-white rounded-sm px-4 py-2 inline-flex items-center space-x-2 relative active:top-[0.5px] active:scale-[.98]"
                                >
                                    <span>{next?.name}</span>
                                    <RightArrow className="w-[14px]" />
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
                <article className=" max-w-5xl mx-auto px-12">
                    <div className="flex items-center space-x-2 mt-12 mb-5">
                        <span className="rounded-[3px] bg-gray-accent-light h-9 w-9 flex items-center justify-center">
                            <span className="w-5 h-5 text-black">{feature.icon}</span>
                        </span>
                        <h1 className="m-0 text-lg text-black/70">{title}</h1>
                    </div>
                    <h2 className="text-5xl m-0 mb-5">{subtitle}</h2>
                    <GatsbyImage image={getImage(featuredImage)} />
                    <div className="article-content">
                        <MDXProvider components={{ ...shortcodes, Section, TutorialsSlider, Documentation }}>
                            <MDXRenderer>{body}</MDXRenderer>
                        </MDXProvider>
                    </div>
                </article>
                <CTA />
            </PostLayout>
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
                subtitle
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
