import React from 'react'
import Explorer from 'components/Explorer'
import SEO from 'components/seo'

export default function HogPatch(): JSX.Element {
    return (
        <>
            <SEO
                title="HogPatch: The Game - PostHog"
                description="PostHog is the only developer platform built to natively work with Session Replay, Feature Flags, Experiments, and Surveys."
                image={`/images/og/default.png`}
            />
            <Explorer template="generic" slug="hogpatch" showAddressBar={false} title="HogPatch: The Game" fullScreen>
                <iframe src="https://candidate-rpg.vercel.app/game" className="w-full h-full border-0" />
            </Explorer>
        </>
    )
}
