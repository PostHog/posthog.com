import React from 'react'
import { graphql } from 'gatsby'
import { StaticImage } from 'gatsby-plugin-image'

import docs from 'sidebars/docs.json'
import Layout from 'components/Layout'
import { SEO } from 'components/seo'
import PostLayout from 'components/PostLayout'
import { Tutorials } from 'components/Docs/Tutorials'
import { GettingStarted } from 'components/Docs/GettingStarted'
import List from 'components/List'

export const quickLinks = [
    {
        icon: 'GraduationCap',
        name: 'Start here',
        to: '/docs/product-analytics/hey',
        color: 'red',
    },
    {
        icon: 'Trends',
        name: 'Graphs & trends',
        to: '/docs/product-analytics/trends',
        color: 'blue',
    },
    {
        icon: 'Funnels',
        name: 'Funnels',
        to: '/docs/product-analytics/funnels',
        color: 'orange',
    },
    {
        icon: 'UserPaths',
        name: 'User paths',
        to: '/docs/product-analytics/paths',
        color: 'teal',
    },
    {
        icon: 'Dashboard',
        name: 'Dashboards',
        to: '/docs/product-analytics/dashboards',
        color: 'purple',
    },
    {
        icon: 'Retention',
        name: 'Retention',
        to: '/docs/product-analytics/retention',
        color: 'seagreen',
    },
    {
        icon: 'Stickiness',
        name: 'Stickiness',
        to: '/docs/product-analytics/stickiness',
        color: 'salmon',
    },
    {
        icon: 'Lifecycle',
        name: 'Lifecycle',
        to: '/docs/product-analytics/lifecycle',
        color: 'yellow',
    },
    {
        icon: 'ArrowUpRight',
        name: 'Correlation analysis',
        to: '/docs/product-analytics/correlation',
        color: 'blue',
    },
    {
        icon: 'People',
        name: 'Groups',
        to: '/docs/product-analytics/group-analytics',
        color: 'orange',
    },
    {
        icon: 'Toolbar',
        name: 'Toolbar',
        to: '/docs/product-analytics/toolbar',
        color: 'teal',
    },
    {
        icon: 'Sampling',
        name: 'Sampling',
        to: '/docs/product-analytics/sampling',
        color: 'purple',
    },
    {
        icon: 'Database',
        name: 'HogQL',
        to: '/docs/product-analytics/hogql',
        color: 'seagreen',
    },
    {
        icon: 'Bell',
        name: 'Subscriptions & notifications',
        to: '/docs/product-analytics/subscriptions',
        description: 'Set up notifications for when specific actions occur',
        color: 'salmon',
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
            <h3 className="mb-6 mt-0">Topics</h3>
            <List
                className="grid md:grid-cols-2 gap-1"
                items={quickLinks.map(({ color, icon, name, to, description }) => ({
                    label: name,
                    url: to,
                    icon,
                    iconColor: color,
                    description,
                }))}
            />
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
            limit: 10
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
                    excerpt
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
