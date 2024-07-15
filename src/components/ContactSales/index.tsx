import { Check2 } from 'components/Icons'
import Layout from 'components/Layout'
import Link from 'components/Link'
import SEO from 'components/seo'
import { StaticImage } from 'gatsby-plugin-image'
import React from 'react'
import airbus from './images/airbus.svg'
import airbusDark from './images/airbus_dark.svg'
import hasura from './images/hasura.svg'
import staplesDark from './images/staples_dark.svg'
import staples from './images/staples.svg'
import ycombinatorDark from './images/y-combinator_dark.svg'
import ycombinator from './images/y-combinator.svg'
import dhlDark from './images/dhl_dark.svg'
import dhl from './images/dhl.svg'
import hasuraDark from './images/hasura_dark.svg'
import landmark from './images/landmark.svg'
import landmarkDark from './images/landmark_dark.svg'
import { useValues } from 'kea'
import { layoutLogic } from 'logic/layoutLogic'
import KeyboardShortcut from 'components/KeyboardShortcut'
import SalesforceForm from 'components/SalesforceForm'

const features = [
    'Volume discounts',
    'SAML SSO',
    'Custom MSA',
    'Dedicated support',
    'Personalized onboarding',
    'Advanced permissions & audit logs',
]

export default function ContactSales({ location }) {
    const search = location?.search
    const params = new URLSearchParams(search)
    const { websiteTheme } = useValues(layoutLogic)
    const darkMode = websiteTheme === 'dark'
    return (
        <Layout>
            <SEO title="Contact Sales - PostHog" />
            <div className="lg:py-12 py-4 px-5">
                <section className="mb-12">
                    <div className="text-center">
                        <StaticImage
                            loading="eager"
                            placeholder="none"
                            width={750}
                            alt="Sales hedgehogs"
                            src="./images/sales-hogs.png"
                        />
                        <h1 className="text-3xl md:text-5xl mt-4 mb-2">Let's chat</h1>
                        <p className="m-0">
                            PostHog Cloud is self-serve (
                            <Link to="https://app.posthog.com/signup">get started here</Link>), but we’re here to chat
                            if you have bespoke needs.
                        </p>
                    </div>
                </section>
                <section className="grid md:grid-cols-2 max-w-5xl mx-auto md:gap-x-16 gap-y-12">
                    <div className="order-2 md:order-1">
                        <h3 className="text-lg mt-1 mb-4">Benefits of an enterprise plan:</h3>
                        <ul className="list-none m-0 p-0 mt-2 grid sm:grid-flow-col sm:grid-rows-3 space-y-1">
                            {features.map((feature) => {
                                return (
                                    <li key={feature} className="flex space-x-2">
                                        <Check2 className="w-4 opacity-60" />
                                        <span>{feature}</span>
                                    </li>
                                )
                            })}
                        </ul>
                        <h3 className="text-lg mt-14 mb-12">Who trusts PostHog?</h3>

                        <div className="grid sm:grid-cols-2 sm:gap-x-12 gap-y-12">
                            <div className="flex flex-wrap md:flex-col gap-4 md:gap-0  md:space-y-12 justify-center md:justify-start sm:order-last order-first">
                                <img src={darkMode ? airbusDark : airbus} className="max-w-[150px] md:max-w-auto" />
                                <img src={darkMode ? hasuraDark : hasura} className="max-w-[150px] md:max-w-auto" />
                                <img
                                    src={darkMode ? ycombinatorDark : ycombinator}
                                    className="max-w-[150px] md:max-w-auto"
                                />
                            </div>
                            <div className="flex flex-wrap md:flex-col gap-4 md:gap-0  md:space-y-12 justify-center md:justify-start sm:order-last order-first">
                                <img src={darkMode ? staplesDark : staples} className="max-w-[150px] md:max-w-auto" />
                                <img src={darkMode ? dhlDark : dhl} className="max-w-[150px] md:max-w-auto" />
                                <img src={darkMode ? landmarkDark : landmark} className="max-w-[150px] md:max-w-auto" />
                            </div>
                        </div>
                    </div>
                    <div className="order-1 md:order-2">
                        <h3 className="mb-1">Contact us</h3>
                        <p className="text-sm">
                            <strong>Tip:</strong> Press <KeyboardShortcut text="Tab" size="sm" /> to advance through the
                            form at a breakneck pace!
                        </p>
                        <SalesforceForm />
                    </div>
                </section>
            </div>
        </Layout>
    )
}
