import React, { useEffect, useState } from 'react'
import { Spin } from 'antd'
import queryString from 'query-string'

function Slack() {
    /* This component will redirect the user to the Slack users group. */
    const [source, setSource] = useState(null)
    const slackUrl =
        'https://join.slack.com/t/posthogusers/shared_invite/enQtOTY0MzU5NjAwMDY3LTc2MWQ0OTZlNjhkODk3ZDI3NDVjMDE1YjgxY2I4ZjI4MzJhZmVmNjJkN2NmMGJmMzc2N2U3Yjc3ZjI5NGFlZDQ'

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
        <div style={{ display: 'flex', alignItems: 'center', marginTop: 48, fontSize: 16, flexDirection: 'column' }}>
            <h1>We're redirecting you to the Slack.</h1>
            <div style={{ marginTop: 16 }}>
                <Spin size="large" />
            </div>
            {source === 'app' && (
                <div style={{ marginTop: 32 }}>
                    Remember to use the{' '}
                    <b>
                        <span style={{ color: 'var(--danger)' }}>same email</span> you used to sign up
                    </b>{' '}
                    in the PostHog app.
                </div>
            )}
        </div>
    )
}

export default Slack
