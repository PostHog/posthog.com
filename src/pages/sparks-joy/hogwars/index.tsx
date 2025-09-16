import React from 'react'
import Explorer from 'components/Explorer'
import SEO from 'components/seo'

export default function HogWars(): JSX.Element {
    return (
        <>
            <SEO
                title="HogWars - PostHog"
                description="PostHog is the only product analytics platform built to natively work with Session Replay, Feature Flags, Experiments, and Surveys."
                image={`/images/og/default.png`}
            />
            <Explorer
                template="generic"
                slug="hog-wars"
                title="HogWars"
                // options below only needed to override matching the slug
                // teamName="product-analytics"
                // roadmapCategory="product-analytics"
                // changelogCategory="product-analytics"
                fullScreen
            >
                <iframe src="https://hogwars.vercel.app/" className="w-full h-full border-0" />
            </Explorer>
        </>
    )
}
