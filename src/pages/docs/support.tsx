import React from 'react'
import ReaderView from 'components/ReaderView'
import SEO from 'components/seo'
import Intro from 'components/Docs/Intro'
import ResourceItem from 'components/Docs/ResourceItem'

const Support: React.FC = () => {
    return (
        <ReaderView>
            <SEO title="Support - Docs - PostHog" />
            <Intro
                subheader="Getting started"
                title="Support"
                description="Built-in customer support with an embeddable chat widget and a unified inbox with session replays and user context."
                buttonText="Get started"
                buttonLink="/docs/support/start-here"
                imageUrl="https://res.cloudinary.com/dmukukwp6/image/upload/support_hog_f7ed8447c9.png"
            />
            <section className="mb-12">
                <h3 className="m-0 text-xl">Everything you need to help your users</h3>
                <p className="text-[15px]">Support your customers without leaving PostHog</p>

                <ul className="m-0 p-0 flex flex-col gap-4">
                    <ResourceItem
                        title="Chat widget"
                        description="Embeddable support widget that works with posthog-js. Automatically captures session context."
                        url="/docs/support/widget"
                        Image={undefined}
                        gatsbyImage={undefined}
                        type={undefined}
                    />
                    <ResourceItem
                        title="JavaScript API"
                        description="Build custom support experiences using posthog.conversations API for full control."
                        url="/docs/support/javascript-api"
                        Image={undefined}
                        gatsbyImage={undefined}
                        type={undefined}
                    />
                    <ResourceItem
                        title="Unified inbox"
                        description="View and respond to tickets with full context: session replays, events, exceptions, and user history."
                        url="/docs/support/inbox"
                        Image={undefined}
                        gatsbyImage={undefined}
                        type={undefined}
                    />
                    <ResourceItem
                        title="Slack integration"
                        description="Connect Slack for two-way sync — messages become tickets, replies sync back to threads."
                        url="/docs/support/slack"
                        Image={undefined}
                        gatsbyImage={undefined}
                        type={undefined}
                    />
                    <ResourceItem
                        title="GitHub integration"
                        description="Connect GitHub repos for two-way sync — issues become tickets, replies sync back as comments."
                        url="/docs/support/github"
                        Image={undefined}
                        gatsbyImage={undefined}
                        type={undefined}
                    />
                    <ResourceItem
                        title="Workflow automation"
                        description="Automate ticket management with workflows — set SLAs, auto-assign, tag, and route tickets."
                        url="/docs/support/workflows"
                        Image={undefined}
                        gatsbyImage={undefined}
                        type={undefined}
                    />
                </ul>
            </section>
        </ReaderView>
    )
}

export default Support
