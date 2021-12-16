import queryString from 'query-string'
import React, { useEffect, useState } from 'react'
import { SEO } from '../components/seo'

function Slack() {
    /* This component will redirect the user to the Slack users group. */
    const [source, setSource] = useState(null)
    const slackUrl = 'https://join.slack.com/t/posthogusers/shared_invite/zt-nnhlzoyd-NvSrzORMEemHlQ5~UXnf_w'

    useEffect(() => {
        const { s } = queryString.parse(location.search)
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
            <div
                style={{ display: 'flex', alignItems: 'center', marginTop: 48, fontSize: 16, flexDirection: 'column' }}
            >
                <h1 style={{ marginBottom: '1rem' }}>We're redirecting you to Slack.</h1>
                {source === 'app' && (
                    <div style={{ fontSize: '1.1rem', color: 'var(--muted)' }}>
                        Remember to use the{' '}
                        <b>
                            <span style={{ color: 'var(--danger)' }}>same email</span> you used to sign up
                        </b>{' '}
                        in the PostHog app.
                    </div>
                )}
            </div>
        </>
    )
}

export default Slack
