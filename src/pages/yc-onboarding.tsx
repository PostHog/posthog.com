import React, { useState } from 'react'
import Layout from '../components/Layout'
import { DemoScheduler } from '../components/DemoScheduler'
import { Spacer } from '../components/Spacer'
import { Link } from 'gatsby'

const DemoCallInfo = () => (
    <>
        <p>
            Welcome to our super secret YC onboarding page! We're very happy to see you. Please book in a call with us
            using the form below. If you simply can't find a time that suits you (maybe you're in Perth?), then feel
            free to email us at <i>yc@posthog.com</i> and we'll be happy to find a time that works.
        </p>
        <br />
        <p>
            The setup calls take place in small groups with Cameron from our Customer Success team, and run for about an
            hour. Before the call, we recommend you <a href="https://app.posthog.com/">sign up to our Cloud version</a>{' '}
            and try your hand at
            <Link to="/docs/integrate/client/snippet-installation"> installing our snippet</Link> on your website. Doing
            so would allow us to tailor the onboarding to your needs, leveraging data from your own website instead of
            demo data. However, if you prefer to get a demo first, we'll give you access to a demo playground during our
            call.
        </p>
        <br />
        <p>
            Following the demo, we'll send over to you your choice of either Apple AirPods or a Timbuk2 backpack. Due to
            boring customs reasons, if you live outside the US or Canada, we'll offer you a $150 merch gift card or make
            a $150 Open Collective donation of your choice. We'll also upgrade your Cloud account to our YC Deal - a
            super generous 20m events _and_ 50k session recordings per month absolutely free for your first year.
        </p>
        <br />
    </>
)

export const YCOnboarding = () => {
    const [showInfo, setShowInfo] = useState(false)
    return (
        <Layout>
            <div className="flex flex-col items-stretch w-full max-w-4xl mx-auto">
                <Spacer />
                <h1 className="centered">PostHog YC Onboarding</h1>
                <button onClick={() => setShowInfo(!showInfo)} className="text-orange font-semibold w-32 mx-auto">
                    {showInfo ? 'Hide Info' : 'Show Info'}
                </button>
                <Spacer height={25} />
                {showInfo ? <DemoCallInfo /> : null}
                <DemoScheduler iframeSrc="https://calendly.com/d/dsb-3y3-9v9" />
            </div>
        </Layout>
    )
}

export default YCOnboarding
