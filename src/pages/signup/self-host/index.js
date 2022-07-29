import { TrackedCTA } from 'components/CallToAction'
import Link from 'components/Link'
import { Plan, Title } from 'components/Pricing/PricingTable/Plan'
import { Enterprise, OpenSource, Scale, SelfHosted } from 'components/Pricing/PricingTable/Plans'
import { SEO } from 'components/seo'
import Intro from 'components/SignUp/Intro'
import Layout from 'components/SignUp/Layout'
import React, { useState } from 'react'

export default function SelfHost() {
    const [scaleOpen, setScaleOpen] = useState(false)
    const [enterpriseOpen, setEnterpriseOpen] = useState(false)

    return (
        <Layout
            crumbs={[
                {
                    title: 'Get started',
                    url: '/signup',
                },
                {
                    title: 'Self-host',
                },
            ]}
        >
            <SEO title="Self-host - PostHog" />
            <section>
                <Intro title="How do you want to run PostHog?" />
                <div className="border-t border-b border-dashed border-gray-accent-light">
                    <div className="grid md:grid-cols-2 max-w-screen-lg mx-auto md:divide-x-1 divide-y-1 md:divide-y-0 divide-dashed divide-gray-accent-light">
                        <SelfHosted />
                        <Enterprise />
                    </div>
                </div>
                <div className="max-w-screen-lg mx-auto flex md:flex-row flex-col items-center">
                    <Plan title="Open source" subtitle="with community support">
                        <p className="text-black/70 my-2 text-base">
                            Our original open source product is available on GitHub and offers product analytics,
                            feature flags, and session recordings.
                        </p>
                        <p className="text-[14px] opacity-50">Limitations: One project, no user permissions</p>
                    </Plan>
                    <div className="flex-shrink-0">
                        <TrackedCTA
                            event={{ name: 'select edition: clicked get started', type: 'self-hosted' }}
                            to="/signup/self-host/deploy"
                            type="secondary"
                            className="!bg-white shadow-lg"
                        >
                            View deployment instructions
                        </TrackedCTA>
                    </div>
                </div>
            </section>
        </Layout>
    )
}
