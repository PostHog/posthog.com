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

const quickLinks = [
    {
        icon: 'Trends',
        name: 'Graphs & trends',
        to: '/manual/trends',
    },
    {
        icon: 'Funnels',
        name: 'Funnels',
        to: '/manual/funnels',
    },
    {
        icon: 'PathAnalysis',
        name: 'User paths',
        to: '/manual/user-paths',
    },
    {
        icon: 'Dashboards',
        name: 'Dashboards',
        to: '/manual/dashboards',
    },
    {
        icon: 'Retention',
        name: 'Retention',
        to: '/manual/retention',
    },
    {
        icon: 'Stickiness',
        name: 'Stickiness',
        to: '/manual/stickiness',
    },
    {
        icon: 'Lifecycle',
        name: 'Lifecycle',
        to: '/manual/lifecycle',
    },
    {
        icon: 'CorrelationAnalysis',
        name: 'Correlation analysis',
        to: '/manual/correlation',
    },
    {
        icon: 'GroupAnalytics',
        name: 'Groups',
        to: '/manual/group-analytics',
    },
    {
        icon: 'Toolbar',
        name: 'Toolbar',
        to: '/manual/toolbar',
    },
    {
        icon: 'Sampling',
        name: 'Sampling',
        to: '/manual/sampling',
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

const ProductAnalytics: React.FC<ProductAnalyticsProps> = ({ data }) => {
    const { tutorials } = data
    return (
        <Layout>
            <SEO title="Product analytics - Documentation - PostHog" />

            <PostLayout title={'Product Analytics'} menu={docs} hideSurvey hideSidebar>
                <h1 className="text-4xl mb-2 mt-6">Product analytics</h1>
                <h3 className="text-lg text-gray font-medium">
                    Learn how to use product analytics to understand your users.
                </h3>

                {/* Get started section */}
                <section className="py-12">
                    <GettingStarted
                        product="Product analytics"
                        title="Start sending events"
                        description="Use our custom SDKs and integrations to send events from your favorite language or platform."
                        link="/docs/getting-started/start-here"
                    >
                        <StaticImage
                            alt=""
                            placeholder="none"
                            quality={100}
                            className="w-[400px]"
                            src="../../components/Home/Slider/images/product-analytics-hog.png"
                        />
                    </GettingStarted>
                </section>

                {/* Quick links */}
                <section className="my-12">
                    <h3 className="mb-6 mt-0">Chapters</h3>
                    <LinkGrid links={quickLinks} />
                </section>

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
