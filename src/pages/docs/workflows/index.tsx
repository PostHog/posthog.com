import React from 'react'
import { SEO } from 'components/seo'
import ResourceItem from 'components/Docs/ResourceItem'
import Intro from 'components/Docs/Intro'
import ReaderView from 'components/ReaderView'
import OSTable from 'components/OSTable'
import Link from 'components/Link'
import { ProductScreenshot } from 'components/ProductScreenshot'
import { Caption } from 'components/Caption'
import ChannelPlatforms from '../../../../contents/docs/workflows/_snippets/channel-platforms'
import Beta from '../../../../contents/docs/workflows/_snippets/beta.mdx'

export const Content = () => {
    return (
        <>
            <section className="mb-8">
                <h2 className="mb-4" id="overview">
                    Overview
                </h2>
                <Beta />
                <div>
                    <p>
                        Workflows is PostHog's no-code, drag-and-drop tool for building logic that automates processes
                        or sends messages to your users. You decide how and when a process is triggered, who receives
                        messages and when they're sent.
                    </p>
                    <p>
                        <Link to="/docs/workflows/workflow-builder">Workflows</Link> are made up of components that you
                        arrange; triggers, actions, delays, audience splits, and PostHog actions. Every workflow starts
                        with a trigger and ends with an exit, but you can add as much logic in between as needed.
                    </p>
                    <div className="flex justify-center mb-8">
                        <div className="text-center">
                            {' '}
                            <ProductScreenshot
                                imageLight="https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/complete_onboarding_workflow_09c6e2c6ad.png"
                                imageDark="https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/complete_onboarding_workflow_09c6e2c6ad.png"
                                alt="Example campaign"
                                padding={false}
                                classes="rounded @md:max-w-2xl"
                            />
                            <Caption>Build and design workflows with PostHog Workflows</Caption>
                        </div>
                    </div>
                </div>
            </section>

            <section className="mb-8">
                <h2 className="mb-4 mt-0" id="why-use-workflows">
                    Why use workflows?
                </h2>
                <div>
                    <ul>
                        <li>
                            <b>Leverage product analytics</b>: Use PostHog events to quickly automate the right actions
                            or send messages to the right people based on the actions they take on your site or app.
                        </li>
                        <li>
                            <b>No-code builder</b>: Drag, drop, and publish quickly. Avoid brittle hardcoded API calls
                            for example to Twilio or Mailgun.
                        </li>
                        <li>
                            <b>Composable CDP</b>: Add any{' '}
                            <Link to="/docs/cdp/destinations">PostHog real-time destination</Link> to a campaign as a
                            messaging step.
                        </li>
                    </ul>
                </div>
            </section>

            <section className="mb-8">
                <h2 className="mb-4 mt-0" id="channels-and-platforms">
                    Channels and platforms
                </h2>
                <ChannelPlatforms />
            </section>

            <section className="mb-8">
                <h2 className="mb-4 mt-0" id="pricing">
                    Pricing
                </h2>
                <p>Workflows is currently in early beta. While in beta, workflows is free to use.</p>
                <p>
                    After the beta, we are planning to charge for usage based on the number of real-time destinations
                    used and messages sent per month. Workflows with more destinations or messages will count as higher
                    usage than those with fewer. We are planning a generous free tier of 10,000 real time
                    destinations/messages per month, and then volume discounts as usage increases.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="mb-4" id="next-steps">
                    Next steps
                </h2>
                <ul className="m-0 mb-3 p-0 flex flex-col gap-4 md:grid grid-cols-1 @md:grid-cols-3">
                    <ResourceItem
                        type="Getting started"
                        title="Start here"
                        description="A high-level overview of the integration process for workflows"
                        url="/docs/workflows/start-here"
                    />
                    <ResourceItem
                        type="Quickstart"
                        title="Set up a messaging channel"
                        description="Configure a messaging channel for your first campaign"
                        url="/docs/workflows/configure-channels"
                    />
                    <ResourceItem
                        type="Concepts"
                        title="Issues and exceptions"
                        description="Learn how to manage and track issues and exceptions"
                        url="/docs/error-tracking/issues-and-exceptions"
                    />
                </ul>
            </section>
        </>
    )
}

const Messaging: React.FC = () => {
    return (
        <ReaderView>
            <SEO title="Workflows - Docs - PostHog" />

            <div className="mx-auto max-w-4xl">
                <section className="mb-6">
                    <Intro
                        subheader="Getting started"
                        title="Workflows"
                        description="Create workflows that automate actions or send messages to your users."
                        buttonText="Installation guide"
                        buttonLink="/docs/workflows/start-here"
                        imageColumnClasses="mt-4 md:-mt-8"
                        imageUrl="https://res.cloudinary.com/dmukukwp6/image/upload/hoggie_mail_48daf2f4b4.png"
                        imageClasses="max-h-48 md:max-h-64"
                    />
                </section>

                <Content />
            </div>
        </ReaderView>
    )
}

export default Messaging
