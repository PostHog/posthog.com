import React from 'react'
import { graphql } from 'gatsby'
import { StaticImage } from 'gatsby-plugin-image'

import docs from 'sidebars/docs.json'
import Layout from 'components/Layout'
import { SEO } from 'components/seo'
import PostLayout from 'components/PostLayout'
import { Tutorials } from 'components/Docs/Tutorials'
import { LinkGrid } from 'components/Docs/LinkGrid'
import { GettingStarted } from 'components/Docs/GettingStarted'

export const quickLinks = [
    {
        icon: 'Trends',
        name: 'Graphs & trends',
        to: '/docs/product-analytics/trends',
    },
    {
        icon: 'Funnels',
        name: 'Funnels',
        to: '/docs/product-analytics/funnels',
    },
    {
        icon: 'PathAnalysis',
        name: 'User paths',
        to: '/docs/product-analytics/paths',
    },
    {
        icon: 'Dashboards',
        name: 'Dashboards',
        to: '/docs/product-analytics/dashboards',
    },
    {
        icon: 'Retention',
        name: 'Retention',
        to: '/docs/product-analytics/retention',
    },
    {
        icon: 'Stickiness',
        name: 'Stickiness',
        to: '/docs/product-analytics/stickiness',
    },
    {
        icon: 'Lifecycle',
        name: 'Lifecycle',
        to: '/docs/product-analytics/lifecycle',
    },
    {
        icon: 'CorrelationAnalysis',
        name: 'Correlation analysis',
        to: '/docs/product-analytics/correlation',
    },
    {
        icon: 'GroupAnalytics',
        name: 'Groups',
        to: '/docs/product-analytics/group-analytics',
    },
    {
        icon: 'Toolbar',
        name: 'Toolbar',
        to: '/docs/product-analytics/toolbar',
    },
    {
        icon: 'Sampling',
        name: 'Sampling',
        to: '/docs/product-analytics/sampling',
    },
]

type ProductAnalyticsProps = {
    data: {
        tutorials: {
            edges: {
                node: any
            }[]
        }
    }
}

export const Intro = ({ image = true }) => (
    <>
        {image && (
            <StaticImage
                alt=""
                placeholder="none"
                quality={100}
                className="w-full sm:w-[400px] sm:float-right sm:ml-8 sm:-mt-8 sm:mb-8"
                src="../../components/Home/Slider/images/product-analytics-hog.png"
            />
        )}
        <h1 className="text-4xl mb-2 mt-6">Product analytics</h1>
        <h3 className="text-lg font-semibold text-primary/60 dark:text-primary-dark/75 leading-tight">
            Learn how to use product analytics to understand your users.
        </h3>
        {/* Quick links */}
        <section className="my-12 clear-both">
            <h3 className="mb-6 mt-0">Chapters</h3>
            <LinkGrid links={quickLinks} />
        </section>
    </>
)

const ProductAnalytics: React.FC<ProductAnalyticsProps> = ({ data }) => {
    const { tutorials } = data
    return (
        <Layout>
            <SEO title="Product analytics - Documentation - PostHog" />

            <PostLayout title={'Product Analytics'} menu={docs} hideSurvey hideSidebar>
                <Intro />
                <Tutorials tutorials={tutorials} />
            </PostLayout>
        </Layout>
    )
}

export default ProductAnalytics

export const query = graphql`
    query ProductAnalytics {
        tutorials: allMdx(
            limit: 6
            sort: { order: DESC, fields: [frontmatter___date] }
            filter: {
                frontmatter: {
                    tags: {
                        in: [
                            "cohorts"
                            "actions"
                            "funnels"
                            "group-analytics"
                            "insights"
                            "retention"
                            "user-paths"
                            "toolbar"
                            "trends"
                        ]
                    }
                }
                fields: { slug: { regex: "/^/tutorials/" } }
            }
        ) {
            edges {
                node {
                    id
                    fields {
                        slug
                    }
                    frontmatter {
                        title
                        date(formatString: "MMM 'YY")
                        Category: tags
                        Contributor: authorData {
                            id
                            image {
                                childImageSharp {
                                    gatsbyImageData(width: 36, height: 36)
                                }
                            }
                            name
                        }
                        featuredImage {
                            childImageSharp {
                                gatsbyImageData(placeholder: NONE)
                            }
                        }
                    }
                }
            }
        }
    }
`
