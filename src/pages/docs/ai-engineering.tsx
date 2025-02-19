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
import Intro from 'components/Docs/Intro'

type LLMObservabilityProps = {
    data: {
        tutorials: {
            edges: {
                node: any
            }[]
        }
    }
}

export const Content = ({ quickLinks = false }) => {
    const { compact } = useLayoutData()
    return (
        <>
            {(quickLinks || compact) && (
                <QuickLinks
                    items={docsMenu.children.find(({ name }) => name.toLowerCase() === 'LLM observability')?.children}
                />
            )}
            <section className="mb-12">
                <h3 className="mb-1 text-xl">Resources</h3>
                <p className="text-[15px]">Real-world use cases to get you started</p>

                <ul className="m-0 mb-3 p-0 flex flex-col gap-4 md:grid md:grid-cols-2 xl:grid-cols-3">
                    <ResourceItem
                        type="Guide"
                        title="How to set up LLM analytics for ChatGPT"
                        description="Track API usage, cost, and latency."
                        url="/tutorials/chatgpt-analytics"
                    />
                    <ResourceItem
                        type="Guide"
                        title="How to set up LLM analytics for Cohere"
                        description="Track your Cohere usage, costs, and latency."
                        url="/tutorials/cohere-analytics"
                    />
                    <ResourceItem
                        type="Guide"
                        title="How to set up LLM analytics for Anthropic's Claude"
                        description="Monitor costs per model, user, and more."
                        url="/tutorials/anthropic-analytics"
                    />
                </ul>
                <CallToAction
                    to="/docs/ai-engineering/tutorials"
                    type="custom"
                    size="md"
                    className="group !bg-accent dark:!bg-accent-dark !border-light dark:!border-dark"
                    childClassName="text-primary/75 dark:text-primary-dark/75 group-hover:text-primary/100 dark:group-hover:text-primary-dark/100 !bg-white dark:!bg-dark !border-light dark:!border-dark"
                    width="[calc(100%_+_3px)]"
                >
                    Explore guides
                </CallToAction>
            </section>
        </>
    )
}

const LLMObservability: React.FC<LLMObservabilityProps> = ({ data }) => {
    return (
        <Layout>
            <SEO title="LLM observability - Documentation - PostHog" />

            <PostLayout title={'LLM observability'} hideSurvey hideSidebar>
                <Intro
                    subheader="Getting started"
                    title="LLM observability"
                    description="Gather data for your AI and LLM products usage and performance."
                    buttonText="Start capturing LLM data"
                    buttonLink="/docs/ai-engineering/observability"
                    imageColumnClasses="max-w-96 mt-8 md:mt-0"
                    imageUrl="https://res.cloudinary.com/dmukukwp6/image/upload/robot_960530c306.png"
                    imageClasses="max-h-48 md:max-h-64"
                />

                <Content />
            </PostLayout>
        </Layout>
    )
}

export default LLMObservability
