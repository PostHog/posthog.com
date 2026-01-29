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
                    <a href="https://us.posthog.com/external_surveys/019af5f5-a50e-0000-b10f-e8c30c0b73a0">
                        Share your thoughts
                    </a>{' '}
                    and we'll reach out with early access.
                </p>
            </CalloutBox>
            <Intro
                subheader="Getting started"
                title="Support"
                description="A built-in customer support system that connects conversations to your product analytics."
                buttonText="Get started"
                buttonLink="/docs/support/start-here"
            />
            <section className="mb-12">
                <h3 className="m-0 text-xl">Everything you need for in-app support</h3>
                <p className="text-[15px]">
                    Communicate with users and see exactly what they were doing when they reached out.
                </p>

                <ul className="m-0 p-0 flex flex-col gap-4">
                    <ResourceItem
                        title="Chat widget"
                        description="An embeddable chat widget for your website or app that works out of the box"
                        url="/docs/support/widget"
                        Image={undefined}
                        gatsbyImage={undefined}
                        type={undefined}
                    />
                    <ResourceItem
                        title="JavaScript API"
                        description="Build custom support experiences with the posthog.conversations API"
                        url="/docs/support/javascript-api"
                        Image={undefined}
                        gatsbyImage={undefined}
                        type={undefined}
                    />
                    <ResourceItem
                        title="Support inbox"
                        description="Manage tickets, view session context, and respond to users from PostHog"
                        url="/docs/support/inbox"
                        Image={undefined}
                        gatsbyImage={undefined}
                        type={undefined}
                    />
                    <ResourceItem
                        title="Ticket context"
                        description="See events, exceptions, session recordings, and previous tickets alongside each conversation"
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
