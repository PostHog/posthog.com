import React from 'react'
import Explorer from 'components/Explorer'
import SEO from 'components/seo'

export default function BrickHog(): JSX.Element {
    return (
        <>
            <SEO
                title="BrickHog - PostHog"
                description="PostHog is the only developer platform built to natively work with Session Replay, Feature Flags, Experiments, and Surveys."
                image={`/images/og/default.png`}
            />
            <Explorer template="generic" slug="brickhog" title="BrickHog" fullScreen>
                <iframe src="https://brickbreak-ebon.vercel.app/" className="w-full h-full border-0" />
            </Explorer>
        </>
    )
}
