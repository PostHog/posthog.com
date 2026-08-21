import React from 'react'
import Explorer from 'components/Explorer'
import SEO from 'components/seo'

export default function CardHog(): JSX.Element {
    return (
        <>
            <SEO
                title="CardHog - PostHog"
                description="PostHog is the only developer platform built to natively work with Session Replay, Feature Flags, Experiments, and Surveys."
                image={`/images/og/default.png`}
            />
            <Explorer
                template="generic"
                slug="cardhog"
                title="CardHog"
                showAddressBar={false}
                headerBarOptions={[]}
                fullScreen
            >
                {/* Swap to the custom domain (e.g. https://cardhog.posthog.com/) once it's set up. */}
                <iframe src="https://cardhog-ua7rv.ondigitalocean.app/" className="w-full h-full border-0" />
            </Explorer>
        </>
    )
}
