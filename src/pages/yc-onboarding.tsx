import React, { useState } from 'react'
import Layout from '../components/Layout'
import { Spacer } from '../components/Spacer'
import { Link } from 'gatsby'
import HubSpotForm from 'components/HubSpotForm'

export const YCOnboarding = () => {
    return (
        <Layout>
            <div className="flex flex-col items-stretch w-full max-w-4xl mx-auto">
                <Spacer />
                <h1 className="centered">You've found our secret Y Combinator offer!</h1>
                <br />
                <p>
                    We offer special benefits for teams in the current batch - things we'd have found useful during our
                    W20 batch, including:
                </p>
                <div className="flex justify-center">
                    <p className="text-center w-4/5">
                        <li>
                            $50,000 in PostHog credit for 12 months<sup>1</sup>
                        </li>
                        <li>
                            Exclusive PostHog merch for founders<sup>2</sup>
                        </li>
                        <li>Access to our YC founder community</li>
                        <li>Free 1-hour group setup sessions</li>
                        <li>Our CEO on WhatsApp or text</li>
                    </p>
                </div>
                <div>
                    <p>
                        To apply, complete the form below, then{' '}
                        <a href="https://app.posthog.com/signup">sign-up for PostHog Cloud</a> and{' '}
                        <Link to="/docs/integrate">install the snippet</Link>. We'll be in touch soon after.
                    </p>
                </div>
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
            <div className="flex justify-center mt-4">
                <p className="text-center w-4/5 text-xs mb-10">
                    <sup>1</sup> Applicants from previous batches receive $25,000 for 6 months instead.
                    <br />
                    <sup>2</sup> Boring custom reasons mean users outside US/Canada get a $150 PostHog merch voucher
                    instead.
                </p>
            </div>
        </Layout>
    )
}

export default YCOnboarding
