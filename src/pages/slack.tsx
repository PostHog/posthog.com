import React, { useEffect, useState } from 'react'
import Spinner from 'components/Spinner'
import { SEO } from 'components/seo'

function Slack() {
    /* This component will redirect the user to the Slack users group. */
    const [source, setSource] = useState<string | null>(null)
    const slackUrl = 'https://join.slack.com/t/posthogusers/shared_invite/zt-1dz36uco2-0aeU3ESyIML2oCr7kpPkNg'

    useEffect(() => {
        const s = new URLSearchParams(window.location.search).get('s')
        setSource(s)

        /* Wait for any UTM tags to be registered in a $pageview,
        we wait a few more seconds if the user is coming from app so
        they can read the additional instructions.
        */
        const waitTime = s === 'app' ? 5000 : 1000
        setTimeout(() => (window.location.href = slackUrl), waitTime)
    }, [])

    return (
        <>
            <SEO title="PostHog Community Slack" />
            <div className="flex flex-col items-center mt-6 space-y-6">
                <h1 className="mb-0">We're redirecting you to Slack.</h1>

                {source === 'app' && (
                    <div className="text-gray">
                        Remember to use the <span className="text-red font-bold">same email</span> you used to sign up
                        in the PostHog app.
                    </div>
                )}

                <Spinner />
            </div>
        </>
    )
}

export default Slack
