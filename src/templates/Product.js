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
import React from 'react'
import { shortcodes } from '../mdxGlobalComponents'
import SectionLinks from 'components/SectionLinks'
import PostLayout from 'components/PostLayout'
import { ProductIcons } from 'components/ProductIcons/ProductIcons'

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
        children: [
            {
                name: 'Funnels',
                url: '/product/funnels',
            },
            {
                name: 'Graphs & trends',
                url: '/product/trends',
            },
            {
                name: 'User paths',
                url: '/product/user-paths',
            },
            {
                name: 'Team collaboration',
                url: '/product/collaboration',
            },
            {
                name: 'Session recording',
                url: '/product/session-recording',
            },

            {
                name: 'Feature flags',
                url: '/product/feature-flags',
            },
            {
                name: 'Experimentation suite',
                url: '/product/experimentation-suite',
            },
            {
                name: 'Correlation analysis',
                url: '/product/correlation-analysis',
            },
        ],
    },
    { name: 'Apps', url: '/product#apps', icon: ProductIcons.appLibrary },
    { name: 'Event pipelines', url: '/product#event-pipelines', icon: ProductIcons.eventPipelines },
    { name: 'Data warehouse', url: '/product#data-warehouse', icon: ProductIcons.dataWarehouse },
    { name: 'Self-hosting', url: '/product#self-hosting', icon: ProductIcons.selfHosting },
    { name: 'API', url: 'api', icon: ProductIcons.api },
]

export default function Product({ data, pageContext: { next, previous } }) {
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
            <PostLayout title={title} menu={menu} hideSidebar>
                <h1 className="text-center mt-0 mb-12 hidden lg:block">{title}</h1>
                <GatsbyImage image={getImage(featuredImage)} />
                <article>
                    <MDXProvider components={{ ...shortcodes, Section, TutorialsSlider, Documentation }}>
                        <MDXRenderer>{body}</MDXRenderer>
                    </MDXProvider>
                </article>
                <div className="mt-12">
                    <SectionLinks next={next} previous={previous} />
                </div>
                <FooterCTA />
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
