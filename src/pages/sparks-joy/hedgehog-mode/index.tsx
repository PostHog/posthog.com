import React from 'react'
import Explorer from 'components/Explorer'
import SEO from 'components/seo'

export default function HedgehogModeGame(): JSX.Element {
    return (
        <>
            <SEO
                title="Hedgehog mode - PostHog"
                description="PostHog is the only product analytics platform built to natively work with Session Replay, Feature Flags, Experiments, and Surveys."
                image={`/images/og/product-analytics.jpg`}
            />
            <Explorer
                template="generic"
                slug="hedgehog-mode"
                title="Hedgehog mode"
                // options below only needed to override matching the slug
                // teamName="product-analytics"
                // roadmapCategory="product-analytics"
                // changelogCategory="product-analytics"
                fullScreen
            >
                <iframe src="https://hedgehog-mode-playground.vercel.app/" className="w-full h-full border-0" />
            </Explorer>
        </>
    )
}
