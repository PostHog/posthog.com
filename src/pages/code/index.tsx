import React from 'react'
import PostHogCode from 'components/PostHogCode'
import SEO from 'components/seo'
import usePostHog from 'hooks/usePostHog'
import { navigate } from 'gatsby'

export default function CodePage() {
    const posthog = usePostHog()
    const enabled = !posthog?.isFeatureEnabled?.('posthog-code-website')

    React.useEffect(() => {
        if (posthog && !enabled) {
            navigate('/')
        }
    }, [posthog, enabled])

    if (!enabled) return null

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
