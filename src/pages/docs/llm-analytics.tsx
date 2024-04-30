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

type LLMAnalyticsProps = {
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
        <h1 className="text-4xl mt-0 mb-2">LLM analytics</h1>
        <h3 className="text-lg font-semibold text-primary/60 dark:text-primary-dark/75 leading-tight">
            Learn how to gather insights for your LLM products.
        </h3>
    </header>
)

export const Content = ({ quickLinks = false }) => {
    const { compact } = useLayoutData()
    return (
        <>
            <Intro />
            {(quickLinks || compact) && (
                <QuickLinks
                    items={docsMenu.children.find(({ name }) => name.toLowerCase() === 'LLM analytics')?.children}
                />
            )}
            <section className="mb-12">
                <h3 className="mb-1 text-xl">Resources</h3>
                <p className="text-[15px]">Real-world use cases to get you started</p>

                <ul className="m-0 mb-3 p-0 flex flex-col gap-4 md:grid md:grid-cols-2 xl:grid-cols-3">
                    <ResourceItem
                        type="Guide"
                        title="How to set up LLM analytics for Cohere"
                        description="Track your Cohere usage, costs, and latency."
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
                        url="/tutorials/cohere-analytics"
                    />
                    <ResourceItem
                        type="Guide"
                        title="How to set up LLM analytics for Anthropic's Claude"
                        description="Monitor costs per model, user, and more."
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
                        url="/tutorials/anthropic-analytics"
                    />
                    <ResourceItem
                        type="Guide"
                        title="How to set up LLM analytics for ChatGPT"
                        description="Track API usage, cost, and latency."
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
                        url="/tutorials/chatgpt-analytics"
                    />
                </ul>
                <CallToAction
                    to="/docs/llm-analytics/tutorials"
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
                <h3 className="mb-1 text-xl">Dashboards</h3>
                <p className="text-[15px]">
                    Choose from a variety of pre-built integrations to get insights quickly from existing tools.
                </p>

                <ul className="m-0 mb-3 p-0 flex flex-col gap-4 md:grid md:grid-cols-2 xl:grid-cols-2">
                    <ResourceItem
                        title="Langfuse"
                        description="Bring Langfuse tracing information into PostHog and track essential metrics"
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
                        url="/docs/llm-analytics/llms"
                    />
                    <ResourceItem
                        title="Helicone"
                        description="Integrate with Helicone and export data to a convenient dashboard"
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
                        url="/docs/llm-analytics/llms"
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

const LLMAnalytics: React.FC<LLMAnalyticsProps> = ({ data }) => {
    return (
        <Layout>
            <SEO title="LLM analytics - Documentation - PostHog" />

            <PostLayout title={'LLM Analytics'} hideSurvey hideSidebar>
                <Content />
            </PostLayout>
        </Layout>
    )
}

export default LLMAnalytics
