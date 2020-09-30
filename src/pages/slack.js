import React, { useEffect } from 'react'
import { Spin } from 'antd'

function Slack() {
    /* This component will redirect the user to the Slack users group. */
    const slackUrl =
        'https://join.slack.com/t/posthogusers/shared_invite/enQtOTY0MzU5NjAwMDY3LTc2MWQ0OTZlNjhkODk3ZDI3NDVjMDE1YjgxY2I4ZjI4MzJhZmVmNjJkN2NmMGJmMzc2N2U3Yjc3ZjI5NGFlZDQ'

    useEffect(() => {
        /* Wait for any UTM tags to be registered in a $pageview */
        setTimeout(() => (window.location.href = slackUrl), 1000)
    }, [])

    return (
        <div style={{ display: 'flex', alignItems: 'center', marginTop: 48, fontSize: 16, flexDirection: 'column' }}>
            <div>We're redirecting you to the Slack.</div>
            <div style={{ marginTop: 16 }}>
                <Spin size="large" />
            </div>
        </div>
    )
}

export default Slack
