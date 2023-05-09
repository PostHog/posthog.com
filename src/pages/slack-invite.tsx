import React, { useEffect, useState } from 'react'
import Spinner from 'components/Spinner'
import { SEO } from 'components/seo'

function Slack() {
    /* This component will redirect the user to the Slack users group. */
    const [source, setSource] = useState<string | null>(null)
    const slackUrl = 'https://join.slack.com/t/posthogusers/shared_invite/zt-1salriqd0-5Y5~Xbj5v6HQuQ8nmqi2Cw'
    // Normal Slack invited (generated through the client) work for up to 400 invites.
    // Above link supports 2,000 invites and lasts for 1 year (until March 29, 2024).
    // When above link stops working, we can reach out to Slack to get a new one (or to get more invites on the link.)

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
