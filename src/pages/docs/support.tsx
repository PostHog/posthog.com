import React from 'react'
import ReaderView from 'components/ReaderView'
import SEO from 'components/seo'
import Intro from 'components/Docs/Intro'
import ResourceItem from 'components/Docs/ResourceItem'
import { CalloutBox } from 'components/Docs/CalloutBox'

const Support: React.FC = () => {
    return (
        <ReaderView>
            <SEO title="Support - Docs - PostHog" />
            <CalloutBox icon="IconFlask" title="Support is in private alpha" type="info">
                <p>
                    Support is currently in private alpha.{' '}
                    <a href="https://us.posthog.com/external_surveys/01970d04-7155-0000-9e29-f9e1b18a1bda">
                        Share your interest
                    </a>{' '}
                    and we'll reach out with early access.
                </p>
            </CalloutBox>
            <Intro
                subheader="Getting started"
                title="Support"
                description="Built-in customer support with an embeddable chat widget and unified inbox. Automatically links conversations to session replays and user context."
                buttonText="Get started"
                buttonLink="/docs/support/start-here"
                imageClasses="max-h-48 md:max-h-64"
                imageUrl="https://res.cloudinary.com/dmukukwp6/image/upload/support_widget_hero_placeholder.png"
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
                </ul>
            </section>
        </ReaderView>
    )
}

export default Support
