import { CallToAction } from 'components/CallToAction'
import { Link } from 'gatsby'
import React, { useState } from 'react'
import { DemoScheduler } from '../components/DemoScheduler'
import Layout from '../components/Layout'
import { Spacer } from '../components/Spacer'
import './styles/yc-onboarding.scss'

const DemoCallInfo = () => (
    <>
        <p>
            Welcome to our super secret YC onboarding page! Given that YC now runs batches remotely for the time being,
            we decided to set up this page in order to provide a simple way to schedule demos that suits startups across
            all timezones. If you simply can't find a time that suits you (maybe you're in Perth?), then feel free to
            email us at <i>yc@posthog.com</i> and we'll be happy to find a time that works.
        </p>
        <br />
        <p>
            The setup call will take place with Yakko, one of our developers, and runs for about an hour. Before the
            call, we recommend you <a href="https://app.posthog.com/">sign up to our Cloud version</a> and try your hand
            at
            <Link to="/docs/integrate/client/snippet-installation"> installing our snippet</Link> on your website. Doing
            so would allow us to tailor the onboarding to your needs, leveraging data from your own website instead of
            demo data. However, if you prefer to get a demo first, we'll give you access to a demo playground during our
            call.
        </p>
        <br />
        <p>
            Following the demo, we'll send over to you your choice of either Apple AirPods or an Allbirds pair of shoes.
            We'll also upgrade your Cloud account to our YC Deal, or get you set up with a free one-year enterprise
            license if you prefer to self-host PostHog.
        </p>
        <br />
    </>
)

export const YCOnboarding = () => {
    const [showInfo, setShowInfo] = useState(false)
    return (
        <Layout>
            <div className="get-in-touch-wrapper">
                <Spacer />
                <h1 className="centered">PostHog YC Onboarding</h1>
                <div className="flex justify-center">
                    <CallToAction
                        className="centered"
                        style={{ margin: 'auto' }}
                        type="primary"
                        onClick={() => setShowInfo(!showInfo)}
                    >
                        {showInfo ? 'Hide Info' : 'Show Info'}
                    </CallToAction>
                </div>
                <Spacer height={25} />
                {showInfo ? <DemoCallInfo /> : null}
                <DemoScheduler />
            </div>
        </Layout>
    )
}

export default YCOnboarding
