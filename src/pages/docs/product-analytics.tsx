import React from 'react'
import { StaticImage } from 'gatsby-plugin-image'

import docs from 'sidebars/docs.json'
import Layout from 'components/Layout'
import { SEO } from 'components/seo'
import PostLayout from 'components/PostLayout'
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
        <h1 className="text-4xl mt-0 mb-2">Product analytics</h1>
        <h3 className="text-lg font-semibold text-primary/60 dark:text-primary-dark/75 leading-tight">
            Learn how to use product analytics to understand your users.
        </h3>
    </header>
)

export const GuideItem = ({ title, description, Image, url }) => (
    <li className="list-none bg-accent dark:bg-accent-dark border border-light dark:border-dark rounded relative hover:top-[-2px] active:top-[1px] hover:transition-all">
        <Link to={url} className="block">
            <div className="px-4 py-3 pb-0">
                <h4 className="m-0 text-lg text-primary dark:text-primary-dark">{title}</h4>
                <p className="text-primary/60 dark:text-primary-dark/60 text-sm m-0">{description}</p>
            </div>
            <div className="flex justify-end w-full h-24">
                <div className="w-48 h-24 md:absolute bottom-0">{Image}</div>
            </div>
        </Link>
    </li>
)

export const Content = () => {
    return (
        <>
            <Intro />
            <section className="mb-12">
                <h3 className="mb-1 text-xl">Guides</h3>
                <p className="text-[15px]">Set up PostHog to work the way you want it to.</p>

                <ul className="m-0 mb-3 p-0 flex flex-col gap-4 md:grid md:grid-cols-2 xl:grid-cols-3">
                    <GuideItem
                        title="Conversion funnels"
                        description="Build, analyze, and optimize funnels"
                        Image={
                            <StaticImage
                                alt=""
                                placeholder="none"
                                objectFit="contain"
                                quality={100}
                                src="../../components/Home/Slider/images/product-analytics-hog.png"
                            />
                        }
                        url="/tutorials/funnels"
                    />
                    <GuideItem
                        title="Track performance marketing"
                        description="Optimize ads and marketing channels"
                        Image={
                            <StaticImage
                                alt=""
                                placeholder="none"
                                objectFit="contain"
                                quality={100}
                                src="../../components/Home/Slider/images/product-analytics-hog.png"
                            />
                        }
                        url="/tutorials/performance-marketing"
                    />
                    <GuideItem
                        title="Reduce churn"
                        description="The bread and butter of long-term growth"
                        Image={
                            <StaticImage
                                alt=""
                                placeholder="none"
                                objectFit="contain"
                                quality={100}
                                src="../../components/Home/Slider/images/product-analytics-hog.png"
                            />
                        }
                        url="/tutorials/churn-rate"
                    />
                    <GuideItem
                        title="Building a cohort"
                        description="Group users by behavior for deeper analysis"
                        Image={
                            <StaticImage
                                alt=""
                                placeholder="none"
                                objectFit="contain"
                                quality={100}
                                src="../../components/Home/Slider/images/product-analytics-hog.png"
                            />
                        }
                        url="/tutorials/how-to-segment-users"
                    />
                    <GuideItem
                        title="Sales & revenue tracking"
                        description="Determine KPIs, who’s paying, revenue sources, and retention"
                        Image={
                            <StaticImage
                                alt=""
                                placeholder="none"
                                objectFit="contain"
                                quality={100}
                                src="../../components/Home/Slider/images/product-analytics-hog.png"
                            />
                        }
                        url="/tutorials/revenue"
                    />
                    <GuideItem
                        title="Calculate DAU/MAU ratio"
                        description="Popular engagement metrics that measure stickiness"
                        Image={
                            <StaticImage
                                alt=""
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
                    <GuideItem
                        title="Product analytics"
                        description="Active users, feature flags frowth accounting, traffic sources"
                        Image={
                            <StaticImage
                                alt=""
                                placeholder="none"
                                objectFit="contain"
                                quality={100}
                                src="../../components/Home/Slider/images/product-analytics-hog.png"
                            />
                        }
                        url="/templates/product-analytics"
                    />
                    <GuideItem
                        title="Website traffic"
                        description="User, sessions, content performance"
                        Image={
                            <StaticImage
                                alt=""
                                placeholder="none"
                                objectFit="contain"
                                quality={100}
                                src="../../components/Home/Slider/images/product-analytics-hog.png"
                            />
                        }
                        url="/templates/website-dashboard"
                    />
                    <GuideItem
                        title="Realtime analytics"
                        description="Live users, sessions, traffic, sources"
                        Image={
                            <StaticImage
                                alt=""
                                placeholder="none"
                                objectFit="contain"
                                quality={100}
                                src="../../components/Home/Slider/images/product-analytics-hog.png"
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

            <PostLayout title={'Product Analytics'} menu={docs} hideSurvey hideSidebar>
                <Content />
            </PostLayout>
        </Layout>
    )
}

export default ProductAnalytics
