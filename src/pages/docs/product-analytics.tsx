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
import { Link } from 'gatsby'
import { CallToAction } from 'components/CallToAction'

type ProductAnalyticsProps = {
    data: {
        tutorials: {
            edges: {
                node: any
            }[]
        }
    }
}

export const Intro = () => (
    <header className="pb-8">
        <h1 className="text-4xl mb-2 mt-6">Product analytics</h1>
        <h3 className="text-lg font-semibold text-primary/60 dark:text-primary-dark/75 leading-tight">
            Learn how to use product analytics to understand your users.
        </h3>
    </header>
)

export const GuideItem = ({ title, description, image, url }) => (
    <li className="list-none bg-accent dark:bg-accent-dark border border-light dark:border-dark rounded relative hover:top-[-2px] active:top-[1px] hover:transition-all">
        <Link to={url} className="block">
            <div className="px-4 py-3 pb-0">
                <h4 className="m-0 text-lg text-primary dark:text-primary-dark">{title}</h4>
                <p className="text-primary/60 dark:text-primary-dark/60 text-sm m-0">{description}</p>
            </div>
            <div className="flex justify-end w-full h-24">
                <div className="w-48 h-24">
                    <StaticImage alt="" placeholder="none" objectFit="contain" quality={100} src={image} />
                </div>
            </div>
        </Link>
    </li>
)

const ProductAnalytics: React.FC<ProductAnalyticsProps> = ({ data }) => {
    const { tutorials } = data
    return (
        <Layout>
            <SEO title="Product analytics - Documentation - PostHog" />

            <PostLayout title={'Product Analytics'} menu={docs} hideSurvey hideSidebar>
                <Intro />

                <section className="mb-12">
                    <h3 className="mb-1 text-xl">Guides</h3>
                    <p className="text-[15px]">Set up PostHog to work the way you want it to.</p>

                    <ul className="m-0 mb-3 p-0 flex flex-col gap-4 md:grid md:grid-cols-2 xl:grid-cols-3">
                        <GuideItem
                            title="Conversion funnels"
                            description="Build, analyze, and optimize funnels"
                            image="../../components/Home/Slider/images/product-analytics-hog.png"
                            url="#"
                        />
                        <GuideItem
                            title="Track performance marketing"
                            description="Optimize ads and marketing channels"
                            image="../../components/Home/Slider/images/product-analytics-hog.png"
                            url="#"
                        />
                        <GuideItem
                            title="Reduce churn"
                            description="The bread and butter of long-term growth"
                            image="../../components/Home/Slider/images/product-analytics-hog.png"
                            url="#"
                        />
                        <GuideItem
                            title="Building a cohort"
                            description="Group users by behavior for deeper analysis"
                            image="../../components/Home/Slider/images/product-analytics-hog.png"
                            url="#"
                        />
                        <GuideItem
                            title="Sales & revenue tracking"
                            description="Determine KPIs, who’s paying, revenue sources, and retention"
                            image="../../components/Home/Slider/images/product-analytics-hog.png"
                            url="#"
                        />
                        <GuideItem
                            title="Calculate DAU/MAU ratio"
                            description="Popular engagement metrics that measure stickiness"
                            image="../../components/Home/Slider/images/product-analytics-hog.png"
                            url="#"
                        />
                    </ul>
                    <CallToAction
                        to="/tutorials"
                        type="custom"
                        size="md"
                        className="group !bg-accent dark:!bg-accent-dark !border-light dark:!border-dark"
                        childClassName="text-primary/75 dark:text-primary-dark/75 group-hover:text-primary/100 dark:group-hover:text-primary-dark/100 !bg-white dark:!bg-dark !border-light dark:!border-dark"
                        width="[calc(100%_+_3px)]"
                    >
                        Explore guides
                    </CallToAction>
                </section>

                <section>
                    <h3 className="mb-1 text-xl">Dashboard templates</h3>
                    <p className="text-[15px]">
                        Choose from a variety of pre-built templates for your stage of growth.
                    </p>

                    <ul className="m-0 mb-3 p-0 flex flex-col gap-4 md:grid md:grid-cols-2 xl:grid-cols-3">
                        <GuideItem
                            title="Product analytics"
                            description="Active users, feature flags frowth accounting, traffic sources"
                            image="../../components/Home/Slider/images/product-analytics-hog.png"
                            url="#"
                        />
                        <GuideItem
                            title="Website traffic"
                            description="User, sessions, content performance"
                            image="../../components/Home/Slider/images/product-analytics-hog.png"
                            url="#"
                        />
                        <GuideItem
                            title="Realtime analytics"
                            description="Live users, sessions, traffic, sources"
                            image="../../components/Home/Slider/images/product-analytics-hog.png"
                            url="#"
                        />
                    </ul>
                    <CallToAction
                        to="/templates"
                        type="custom"
                        size="md"
                        className="group !bg-accent dark:!bg-accent-dark !border-light dark:!border-dark"
                        childClassName="text-primary/75 dark:text-primary-dark/75 group-hover:text-primary/100 dark:group-hover:text-primary-dark/100 !bg-white dark:!bg-dark !border-light dark:!border-dark"
                        width="[calc(100%_+_3px)]"
                    >
                        Browse templates
                    </CallToAction>
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
