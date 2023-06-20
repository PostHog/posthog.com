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
                <h1 className="centered">PostHog YC Onboarding</h1>
                <br />
                <p>
                    Welcome to our super secret YC onboarding page! We're very happy to see you. Please let us know what
                    you're interested in using the form below.
                </p>
                <p>
                    The setup calls take place with our Customer Success team, and run for about an hour. Before the
                    call, we recommend you <a href="https://app.posthog.com/">sign up to our Cloud version</a> and try
                    your hand at
                    <Link to="/docs/integrate"> installing our snippet</Link> on your website. Doing so would allow us
                    to tailor the onboarding to your needs, leveraging data from your own website instead of demo data.
                    However, if you prefer to get a demo first, we'll be happy to spend 30 minutes to walk you through
                    our features.
                </p>
                <p>
                    Following the demo, we'll send over to you your choice of either Apple AirPods or a Timbuk2
                    backpack. Due to boring customs reasons, if you live outside the US or Canada, we'll offer you a
                    $150 merch gift card or make a $150 Open Collective donation of your choice. We'll also add $50K of
                    credit to your PostHog Stripe account which is valid for 12 months ($25K / 6 months for past YC
                    batches).
                </p>
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
        </Layout>
    )
}

export default YCOnboarding
