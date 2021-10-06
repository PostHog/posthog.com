import { TrackedCTA } from 'components/CallToAction/index.js'
import { Title } from 'components/Pricing/PricingTable/Plan'
import { SEO } from 'components/seo'
import Intro from 'components/SignUp/Intro'
import Layout from 'components/SignUp/Layout'
import { useValues } from 'kea'
import { posthogAnalyticsLogic } from 'logic/posthogAnalyticsLogic'
import React from 'react'

export default function SelfHost() {
    const { posthog } = useValues(posthogAnalyticsLogic)
    return (
        <Layout
            crumbs={[
                {
                    title: 'PostHog',
                    url: '/',
                },
                {
                    title: 'Book a demo',
                },
            ]}
        >
            <SEO title="Book a demo - PostHog" />
            <section className="px-4">
                <Intro title="Book a demo" />
                <div className="flex justify-center flex-col md:flex-row divide-y-1 md:divide-y-0 md:divide-x-1 divide-dashed divide-gray-accent-light">
                    <div className="md:pr-12 pb-12 md:pb-0">
                        <h2 className="text-[15px] font-semibold mb-4 text-gray">Self-serve plans</h2>
                        <div className="flex flex-col space-y-4">
                            <Title title="Open Source" subtitle="Self-hosted, free" badge="SELF-HOSTED" />
                            <Title title="PostHog Cloud" subtitle="Turnkey solution, pay per event" badge="HOSTED" />
                        </div>
                        <TrackedCTA
                            width="full"
                            className="mt-7"
                            to="/signup/self-host/get-in-touch?demo=group#demo"
                            event={{ name: 'book a demo: clicked group demo' }}
                        >
                            Join a group demo
                        </TrackedCTA>
                    </div>
                    <div className="md:pl-12 pt-12 md:pt-0">
                        <h2 className="text-[15px] font-semibold mb-4 text-gray">Full-service plans</h2>
                        <div className="flex flex-col space-y-4">
                            <Title title="Scale" subtitle="For large userbases or event volumes" badge="SELF-HOSTED" />
                            <Title
                                title="Enterprise"
                                subtitle="A focus on compliance and security"
                                badge="SELF-HOSTED"
                            />
                        </div>
                        <TrackedCTA
                            width="full"
                            className="mt-7"
                            to="/signup/self-host/get-in-touch?demo=personal#demo"
                            event={{ name: 'book a demo: clicked 1:1 demo' }}
                        >
                            Book a 1:1 demo
                        </TrackedCTA>
                    </div>
                </div>
            </section>
        </Layout>
    )
}
