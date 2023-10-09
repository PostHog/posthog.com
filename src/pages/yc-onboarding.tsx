import React, { useState } from 'react'
import Layout from '../components/Layout'
import Link from 'components/Link'
import HubSpotForm from 'components/HubSpotForm'
import YCsign from '../images/max-yc.png'
import { StaticImage } from 'gatsby-plugin-image'
import { Check2 } from 'components/Icons'
import { useValues } from 'kea'
import { layoutLogic } from 'logic/layoutLogic'

const features = [
    '$50,000 in PostHog credit for 12 months<sup>1</sup>',
    'Exclusive PostHog merch for founders<sup>2</sup>',
    'Access to our YC founder Slack community',
    'Onboarding session to get you started',
    'Our CEO on WhatsApp or SMS',
]

export const YCOnboarding = () => {
    const { websiteTheme } = useValues(layoutLogic)
    const darkMode = websiteTheme === 'dark'
    return (
        <Layout>
            <div className="lg:py-12 py-4 px-5">
                <section className="mb-12">
                    <div className="text-center">
                        <img
                            src={YCsign}
                            alt="A hedgehog by the YC sign"
                            className="max-w-full max-h-72 mx-auto mb-8"
                        />

                        <h1 className="text-3xl md:text-5xl mt-4 mb-2">You've found our secret Y Combinator offer!</h1>
                        <p className="m-0 text-lg">
                            We offer special benefits for teams in the current batch - things we'd have found useful
                            during our W20 batch.
                        </p>
                    </div>
                </section>
                <section className="grid md:grid-cols-2 max-w-5xl mx-auto md:gap-x-16 gap-y-12">
                    <div className="order-1 md:order-2">
                        <h3 className="mt-1 mb-4">Benefits</h3>
                        <ul className="list-none m-0 mb-8 p-0 mt-2 flex flex-col space-y-1">
                            {features.map((feature) => {
                                return (
                                    <li key={feature} className="flex space-x-2">
                                        <Check2 className="w-5 text-seagreen dark:text-white/40" />
                                        <span dangerouslySetInnerHTML={{ __html: feature }} />
                                    </li>
                                )
                            })}
                        </ul>

                        <p className="text-sm">
                            <sup>1</sup> Applicants from previous batches receive $25,000 for 6 months instead.
                            <br />
                            <sup>2</sup> Boring international customs reasons mean users outside US/Canada get a $150
                            PostHog merch voucher instead.
                        </p>
                    </div>
                    <div className="order-2 md:order-2 mb-12">
                        <h3 className="mb-1">How to apply</h3>
                        <ol className="mb-4">
                            <li>Complete the form below</li>
                            <li>
                                <Link to="https://app.posthog.com/signup" external>
                                    Sign up for PostHog Cloud
                                </Link>
                            </li>
                            <li>
                                <Link to="/docs/getting-started/install" external>
                                    Install the snippet
                                </Link>{' '}
                                in your product
                            </li>
                        </ol>
                        <HubSpotForm
                            customFields={{
                                yc_reason: {
                                    type: 'radioGroup',
                                    cols: 1,
                                },
                            }}
                            formID="1c421f4a-320a-4c2a-8879-e37ccfcdea87"
                        />
                    </div>
                </section>
            </div>
        </Layout>
    )
}

export default YCOnboarding
