import React from 'react'

import { SEO } from 'components/seo'
import { CallToAction } from 'components/CallToAction'
import ResourceItem from 'components/Docs/ResourceItem'
import { docsMenu } from '../../navs'
import { useLayoutData } from 'components/Layout/hooks'
import QuickLinks from 'components/QuickLinks'
import Intro from 'components/Docs/Intro'
import ReaderView from 'components/ReaderView'

export const Content = ({ quickLinks = false }) => {
    const { compact } = useLayoutData()
    return (
        <>
            {(quickLinks || compact) && (
                <QuickLinks items={docsMenu.children.find(({ name }) => name === 'AI Observability')?.children} />
            )}
            <section className="mb-12">
                <h3 className="mb-1 text-xl">Resources</h3>
                <p className="text-[15px]">Real-world use cases to get you started</p>

                <ul className="m-0 mb-3 p-0 flex flex-col gap-4 md:grid md:grid-cols-2 xl:grid-cols-3">
                    <ResourceItem
                        type="Guide"
                        title="How to set up OpenAI observability"
                        description="Track API usage, cost, and latency."
                        url="/tutorials/openai-observability"
                    />
                    <ResourceItem
                        type="Guide"
                        title="How to set up AI Observability for Cohere"
                        description="Track your Cohere usage, costs, and latency."
                        url="/tutorials/cohere-analytics"
                    />
                    <ResourceItem
                        type="Guide"
                        title="How to set up AI Observability for Anthropic's Claude"
                        description="Monitor costs per model, user, and more."
                        url="/tutorials/anthropic-analytics"
                    />
                </ul>
                <CallToAction
                    to="/docs/ai-observability/tutorials"
                    type="custom"
                    size="md"
                    className="group !bg-accent dark:!bg-accent-dark !border-light dark:!border-dark"
                    childClassName="text-secondary group-hover:text-primary !bg-white dark:!bg-dark !border-light dark:!border-dark"
                    width="[calc(100%_+_3px)]"
                >
                    Explore guides
                </CallToAction>
            </section>
        </>
    )
}

const AIObservability: React.FC = () => {
    return (
        <ReaderView>
            <SEO title="AI Observability - Documentation - PostHog" />

            <Intro
                subheader="Getting started"
                title="AI Observability"
                description="Capture traces, generations, and spans from your AI and LLM products."
                buttonText="Start capturing LLM data"
                buttonLink="/docs/ai-observability/start-here"
                imageColumnClasses="max-w-96 mt-8 md:mt-0"
                imageUrl="https://res.cloudinary.com/dmukukwp6/image/upload/ai_robo_hog_9c1c225c94.png"
            />

            <Content />
        </ReaderView>
    )
}

export default AIObservability
