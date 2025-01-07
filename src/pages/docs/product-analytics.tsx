import CloudinaryImage from 'components/CloudinaryImage'
import React from 'react'
import { StaticImage } from 'gatsby-plugin-image'

import Layout from 'components/Layout'
import { SEO } from 'components/seo'
import PostLayout from 'components/PostLayout'
import { CallToAction } from 'components/CallToAction'
import ResourceItem from 'components/Docs/ResourceItem'
import List from 'components/List'
import { docsMenu } from '../../navs'
import { useLayoutData } from 'components/Layout/hooks'
import QuickLinks from 'components/QuickLinks'
import { useChat } from 'hooks/useChat'
import { useStaticQuery } from 'gatsby'
import { graphql } from 'gatsby'

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
        <h1 className="text-4xl mt-0 mb-2">Product analytics</h1>
        <h3 className="text-lg font-semibold text-primary/60 dark:text-primary-dark/75 leading-tight">
            Learn how to use product analytics to understand your users.
        </h3>
    </header>
)

export const Content = ({ quickLinks = false }) => {
    const { compact } = useLayoutData()
    const { setChatOpen } = useChat()
    const {
        allDocsPages: { totalDocsCount },
    } = useStaticQuery(graphql`
        query {
            allDocsPages: allMdx(filter: { slug: { regex: "^/docs/" } }) {
                totalDocsCount: totalCount
            }
        }
    `)

    return (
        <>
            <Intro />

            <div className="bg-accent dark:bg-accent-dark pt-4 px-5 pb-6 border border-light dark:border-dark rounded relative mb-12">
                <h3 className="mb-1 text-xl">Ask Max AI</h3>
                <p className="text-[15px] mb-3 pr-24 md:pr-0">
                The PostHog docs are {totalDocsCount} pages and counting. Why not ask Max instead?
                </p>
                <CallToAction type="primary" size="md" className="" onClick={() => setChatOpen(true)}>
                    Chat with Max AI
                </CallToAction>

                <CloudinaryImage
                    src="https://res.cloudinary.com/dmukukwp6/image/upload/wizard_hog_bdbdabe5a2.png"
                    width={205}
                    placeholder="none"
                    className="absolute bottom-1 right-0 md:right-4 w-32 md:w-auto"
                />
            </div>

            {(quickLinks || compact) && (
                <QuickLinks
                    items={docsMenu.children.find(({ name }) => name.toLowerCase() === 'product analytics')?.children}
                />
            )}
            <section className="mb-12">
                <h3 className="mb-1 text-xl">Resources</h3>
                <p className="text-[15px]">Real-world use cases to get you started</p>

                <ul className="m-0 mb-3 p-0 flex flex-col gap-4 md:grid md:grid-cols-2 xl:grid-cols-3">
                    <ResourceItem
                        type="Guide"
                        title="The complete guide to event tracking"
                        description="Set up your analytics foundation"
                        Image={
                            <CloudinaryImage
                                alt=""
                                className="h-full"
                                placeholder="none"
                                objectFit="contain"
                                quality={100}
                                src="https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/components/Home/Slider/images/product-analytics-hog.png"
                            />
                        }
                        url="/tutorials/event-tracking-guide"
                    />
                    <ResourceItem
                        type="Guide"
                        title="Track performance marketing"
                        description="Optimize ads and marketing channels"
                        Image={
                            <CloudinaryImage
                                alt=""
                                className="h-full"
                                placeholder="none"
                                objectFit="contain"
                                quality={100}
                                src="https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/components/Home/Slider/images/product-analytics-hog.png"
                            />
                        }
                        url="/tutorials/performance-marketing"
                    />
                    <ResourceItem
                        type="Guide"
                        title="Reduce churn"
                        description="The bread and butter of long-term growth"
                        Image={
                            <CloudinaryImage
                                alt=""
                                className="h-full"
                                placeholder="none"
                                objectFit="contain"
                                quality={100}
                                src="https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/components/Home/Slider/images/product-analytics-hog.png"
                            />
                        }
                        url="/tutorials/churn-rate"
                    />
                    <ResourceItem
                        type="Guide"
                        title="Track new and returning users"
                        description="Build cohorts and compare users"
                        Image={
                            <CloudinaryImage
                                alt=""
                                className="h-full"
                                placeholder="none"
                                objectFit="contain"
                                quality={100}
                                src="https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/components/Home/Slider/images/product-analytics-hog.png"
                            />
                        }
                        url="/tutorials/track-new-returning-users"
                    />
                    <ResourceItem
                        type="Guide"
                        title="Identify and analyze power users"
                        description="Find and understand your most engaged users"
                        Image={
                            <CloudinaryImage
                                alt=""
                                className="h-full"
                                placeholder="none"
                                objectFit="contain"
                                quality={100}
                                src="https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/components/Home/Slider/images/product-analytics-hog.png"
                            />
                        }
                        url="/tutorials/power-users"
                    />
                    <ResourceItem
                        type="Guide"
                        title="Calculate DAU/MAU ratio"
                        description="Popular engagement metrics that measure stickiness"
                        Image={
                            <CloudinaryImage
                                alt=""
                                className="h-full"
                                placeholder="none"
                                objectFit="contain"
                                quality={100}
                                src="https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/components/Home/Slider/images/product-analytics-hog.png"
                            />
                        }
                        url="/tutorials/dau-mau-ratio"
                    />
                </ul>
                <CallToAction
                    to="/docs/product-analytics/tutorials"
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
                <p className="text-[15px]">Choose from a variety of pre-built templates for your stage of growth.</p>

                <ul className="m-0 mb-3 p-0 flex flex-col gap-4 md:grid md:grid-cols-2 xl:grid-cols-3">
                    <ResourceItem
                        title="Product analytics"
                        description="Active users, feature flags, growth accounting, traffic sources"
                        Image={
                            <CloudinaryImage
                                alt=""
                                className="h-full"
                                placeholder="none"
                                objectFit="contain"
                                quality={100}
                                src="https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/pages/docs/images/template-product-analytics.png"
                            />
                        }
                        url="/templates/product-analytics"
                    />
                    <ResourceItem
                        title="Website traffic"
                        description="User, sessions, content performance"
                        Image={
                            <CloudinaryImage
                                alt=""
                                className="h-full"
                                placeholder="none"
                                objectFit="contain"
                                quality={100}
                                src="https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/pages/docs/images/template-website-traffic.png"
                            />
                        }
                        url="/templates/website-dashboard"
                    />
                    <ResourceItem
                        title="Realtime analytics"
                        description="Live users, sessions, traffic, sources"
                        Image={
                            <CloudinaryImage
                                alt=""
                                className="h-full"
                                placeholder="none"
                                objectFit="contain"
                                quality={100}
                                src="https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/pages/docs/images/template-realtime-analytics.png"
                            />
                        }
                        url="/templates/real-time-dashboard"
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
        </>
    )
}

const ProductAnalytics: React.FC<ProductAnalyticsProps> = ({ data }) => {
    return (
        <Layout>
            <SEO title="Product analytics - Documentation - PostHog" />

            <PostLayout title={'Product Analytics'} hideSurvey hideSidebar>
                <Content />
            </PostLayout>
        </Layout>
    )
}

export default ProductAnalytics
