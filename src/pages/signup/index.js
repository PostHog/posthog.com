import { TrackedCTA } from 'components/CallToAction/index.js' // TEMP
import { Browser, Cloud, Lightning, Prohibited, ServerLocked, WebCode } from 'components/Icons/Icons'
import { Plan } from 'components/Pricing/PricingTable/Plan'
import { SEO } from 'components/seo'
import Intro from 'components/SignUp/Intro'
import Layout from 'components/SignUp/Layout'
import React from 'react'

const Feature = ({ children }) => {
    return <li className="flex space-x-2 items-center font-semibold text-opacity-75">{children}</li>
}

export default function SignUp() {
    return (
        <Layout
            crumbs={[
                {
                    title: 'Get started',
                },
            ]}
        >
            <SEO title="Get started - PostHog" />
            <section>
                <Intro title="Choose your hosting option" />
                <div className="border-t border-b border-dashed border-gray-accent-light">
                    <div className="grid md:grid-cols-2 max-w-screen-lg mx-auto md:divide-x-1 divide-y-1 md:divide-y-0 divide-dashed divide-gray-accent-light">
                        <Plan title="Self-host" subtitle="Customer data never leaves your infrastructure">
                            <ul className="p-0 list-none grid gap-5 my-9">
                                <Feature>
                                    <ServerLocked className="w-7 h-7" />
                                    <span>Data stays on your infrastructure</span>
                                </Feature>
                                <Feature>
                                    <WebCode className="w-7 h-7" />
                                    <span>Full access to production instance</span>
                                </Feature>
                                <Feature>
                                    <Prohibited className="w-7 h-7" />
                                    <span>Bypass ad blockers &amp; browser privacy features</span>
                                </Feature>
                            </ul>
                            <TrackedCTA
                                to="/signup/self-host"
                                event={{ name: 'get started: clicked Continue', type: 'self_host' }}
                            >
                                Continue
                            </TrackedCTA>
                        </Plan>
                        <Plan title="PostHog Cloud" subtitle="SaaS solution managed by the PostHog core team">
                            <ul className="p-0 list-none grid gap-5 my-9">
                                <Feature>
                                    <Cloud className="w-7 h-7" />
                                    <span>Hosted and managed by PostHog</span>
                                </Feature>
                                <Feature>
                                    <Lightning className="w-7 h-7" />
                                    <span>Start using immediately</span>
                                </Feature>
                                <Feature>
                                    <Browser className="w-7 h-7" />
                                    <span>Automatic upgrades</span>
                                </Feature>
                            </ul>
                            <TrackedCTA
                                href="https://app.posthog.com/signup"
                                addGclid
                                event={{ name: 'get started: clicked Continue', type: 'cloud' }}
                            >
                                Continue
                            </TrackedCTA>
                        </Plan>
                    </div>
                </div>
            </section>
        </Layout>
    )
}
