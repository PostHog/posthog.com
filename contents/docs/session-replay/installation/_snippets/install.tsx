import React from 'react'
import ProductInstall from 'components/Products/ProductInstall'

/**
 * Session replay install UI: AI-first wizard command + a "Manual install" tab
 * exposing the full framework list (driven by the install taxonomy).
 */
const SessionReplayInstall = (): JSX.Element => (
    <ProductInstall
        productSlug="session-replay"
        categories={['web', 'mobile', 'no-code']}
        aiDescription={
            <>
                PostHog automatically captures every click, scroll, input, and page view. Session recording starts the
                moment a user lands on your page. Web and mobile are both supported by our SDKs.
            </>
        }
    />
)

export default SessionReplayInstall
