import React, { useEffect, useState } from 'react'
import { PostHog } from 'components/Icons/Icons'
import { SEO } from '../components/seo'

function Slack() {
    /* This component will redirect the user to the Slack users group. */
    const [source, setSource] = useState<string | null>(null)
    const slackUrl = 'https://join.slack.com/t/posthogusers/shared_invite/zt-1bofr1csx-ESKP9_iHkrRIpoaoDKqA_Q'

    useEffect(() => {
        const s = new URLSearchParams(location.search).get('s')

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
                <div className="mt-8 animate-pulse">
                    <PostHog />
                </div>
            </div>
        </>
    )
}

export default Slack
