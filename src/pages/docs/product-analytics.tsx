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
    return (
        <>
            <Intro />
            {(quickLinks || compact) && <QuickLinks items={docsMenu.children[1].children} />}
            <section className="mb-12">
                <h3 className="mb-1 text-xl">Resources</h3>
                <p className="text-[15px]">Real-world use cases to get you started</p>

                <ul className="m-0 mb-3 p-0 flex flex-col gap-4 md:grid md:grid-cols-2 xl:grid-cols-3">
                    <ResourceItem
                        type="Guide"
                        title="Conversion funnels"
                        description="Build, analyze, and optimize funnels"
                        Image={
                            <StaticImage
                                alt=""
                                className="h-full"
                                placeholder="none"
                                objectFit="contain"
                                quality={100}
                                src="../../components/Home/Slider/images/product-analytics-hog.png"
                            />
                        }
                        url="/tutorials/funnels"
                    />
                    <ResourceItem
                        type="Guide"
                        title="Track performance marketing"
                        description="Optimize ads and marketing channels"
                        Image={
                            <StaticImage
                                alt=""
                                className="h-full"
                                placeholder="none"
                                objectFit="contain"
                                quality={100}
                                src="../../components/Home/Slider/images/product-analytics-hog.png"
                            />
                        }
                        url="/tutorials/performance-marketing"
                    />
                    <ResourceItem
                        type="Guide"
                        title="Reduce churn"
                        description="The bread and butter of long-term growth"
                        Image={
                            <StaticImage
                                alt=""
                                className="h-full"
                                placeholder="none"
                                objectFit="contain"
                                quality={100}
                                src="../../components/Home/Slider/images/product-analytics-hog.png"
                            />
                        }
                        url="/tutorials/churn-rate"
                    />
                    <ResourceItem
                        type="Guide"
                        title="Track new and returning users"
                        description="Build cohorts and compare users"
                        Image={
                            <StaticImage
                                alt=""
                                className="h-full"
                                placeholder="none"
                                objectFit="contain"
                                quality={100}
                                src="../../components/Home/Slider/images/product-analytics-hog.png"
                            />
                        }
                        url="/tutorials/track-new-returning-users"
                    />
                    <ResourceItem
                        type="Guide"
                        title="Identify and analyze power users"
                        description="Find and understand your most engaged users"
                        Image={
                            <StaticImage
                                alt=""
                                className="h-full"
                                placeholder="none"
                                objectFit="contain"
                                quality={100}
                                src="../../components/Home/Slider/images/product-analytics-hog.png"
                            />
                        }
                        url="/tutorials/power-users"
                    />
                    <ResourceItem
                        type="Guide"
                        title="Calculate DAU/MAU ratio"
                        description="Popular engagement metrics that measure stickiness"
                        Image={
                            <StaticImage
                                alt=""
                                className="h-full"
                                placeholder="none"
                                objectFit="contain"
                                quality={100}
                                src="../../components/Home/Slider/images/product-analytics-hog.png"
                            />
                        }
                        url="/tutorials/dau-mau-ratio"
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
                <p className="text-[15px]">Choose from a variety of pre-built templates for your stage of growth.</p>

                <ul className="m-0 mb-3 p-0 flex flex-col gap-4 md:grid md:grid-cols-2 xl:grid-cols-3">
                    <ResourceItem
                        title="Product analytics"
                        description="Active users, feature flags frowth accounting, traffic sources"
                        Image={
                            <StaticImage
                                alt=""
                                className="h-full"
                                placeholder="none"
                                objectFit="contain"
                                quality={100}
                                src="./images/template-product-analytics.png"
                            />
                        }
                        url="/templates/product-analytics"
                    />
                    <ResourceItem
                        title="Website traffic"
                        description="User, sessions, content performance"
                        Image={
                            <StaticImage
                                alt=""
                                className="h-full"
                                placeholder="none"
                                objectFit="contain"
                                quality={100}
                                src="./images/template-website-traffic.png"
                            />
                        }
                        url="/templates/website-dashboard"
                    />
                    <ResourceItem
                        title="Realtime analytics"
                        description="Live users, sessions, traffic, sources"
                        Image={
                            <StaticImage
                                alt=""
                                className="h-full"
                                placeholder="none"
                                objectFit="contain"
                                quality={100}
                                src="./images/template-realtime-analytics.png"
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
