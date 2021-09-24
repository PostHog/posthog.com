import React from 'react'
import { Plan } from 'components/Pricing/PricingTable/Plan'
import { ServerLocked, WebCode, Prohibited, Lightning, Browser, Cloud } from 'components/Icons/Icons'
import { CallToAction } from 'components/CallToAction'
import { section, heading } from 'components/Home/classes'
import Layout from 'components/SignUp/Layout'
import Logo from 'components/Logo'

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
            <section>
                <div className={section()}>
                    <Logo className="mx-auto" />
                    <h1 className={heading('md', 'primary', 'mt-16')}>Choose your hosting option</h1>
                </div>
                <div className="border-t border-b border-dashed border-gray-accent-light">
                    <div className="grid grid-cols-2 max-w-screen-lg mx-auto divide-x-1 divide-dashed divide-gray-accent-light">
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
                                    <span>Bypass ad blockers & browser privacy features</span>
                                </Feature>
                            </ul>
                            <CallToAction to="/sign-up/self-host">Continue</CallToAction>
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
                            <CallToAction>Continue</CallToAction>
                        </Plan>
                    </div>
                </div>
            </section>
        </Layout>
    )
}
