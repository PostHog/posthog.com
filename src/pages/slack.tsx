import React, { useEffect, useState } from 'react'
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
        they can read the additional instructions.*/
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
                <div className="mt-8">
                    <svg
                        viewBox="0 0 1024 1024"
                        focusable="false"
                        data-icon="loading"
                        width="1em"
                        height="1em"
                        className="w-8 h-8 animate-spin"
                        fill="currentColor"
                        aria-hidden="true"
                    >
                        <path d="M988 548c-19.9 0-36-16.1-36-36 0-59.4-11.6-117-34.6-171.3a440.45 440.45 0 00-94.3-139.9 437.71 437.71 0 00-139.9-94.3C629 83.6 571.4 72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.3C772.3 66 827 103 874 150c47 47 83.9 101.8 109.7 162.7 26.7 63.1 40.2 130.2 40.2 199.3.1 19.9-16 36-35.9 36z"></path>
                    </svg>
                </div>
            </div>
        </>
    )
}

export default Slack
