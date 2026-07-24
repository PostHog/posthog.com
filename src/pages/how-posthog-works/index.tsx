import React from 'react'
import Explorer from 'components/Explorer'
import SEO from 'components/seo'
import HowPostHogWorks from 'components/HowPostHogWorks'

export default function HowPostHogWorksPage(): JSX.Element {
    return (
        <>
            <SEO
                title="How PostHog works - PostHog"
                description="See every PostHog product instrumented on a (fake) real app. Toggle the overlay to see the events, flags, replays, and surveys behind each element — and the code that powers them."
                image={`/images/og/default.png`}
            />
            <Explorer template="generic" slug="how-posthog-works" title="How PostHog works" fullScreen>
                <HowPostHogWorks />
            </Explorer>
        </>
    )
}
