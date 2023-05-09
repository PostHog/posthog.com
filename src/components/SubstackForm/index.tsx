import React from 'react'
import { CallToAction } from 'components/CallToAction'

export default function SubstackForm(): JSX.Element {
    return (
        <CallToAction width="full" to="https://newsletter.posthog.com/subscribe" size="sm">
            Subscribe
        </CallToAction>
    )
}
