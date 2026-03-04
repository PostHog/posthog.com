import React from 'react'
import PostHogCode from 'components/PostHogCode'
import SEO from 'components/seo'

export default function CodePage() {
    return (
        <>
            <SEO
                title="PostHog Code - AI coding agent"
                description="AI coding agent that understands your product analytics. Query data, debug with session recordings, manage feature flags — all from your editor."
            />
            <PostHogCode />
        </>
    )
}
