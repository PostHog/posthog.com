import React from 'react'
import Link from '../Link'
import { Button } from 'antd'

export const ArrayCTA = () => (
    <>
        <br />
        <Link to="https://app.posthog.com/signup" addGclid>
            <Button className="center" type="primary" size="large">
                Try PostHog Cloud Now
            </Button>
        </Link>
        <br />
    </>
)
