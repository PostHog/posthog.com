import React from 'react'
import Explorer from 'components/Explorer'
import SEO from 'components/shared/layout/seo'

export default function DictatorOrTechBro(): JSX.Element {
    return (
        <>
            <SEO
                title="Dictator or tech bro? - PostHog"
                description="PostHog is the only developer platform built to natively work with Session Replay, Feature Flags, Experiments, and Surveys."
                image={`/images/og/default.png`}
            />
            <Explorer
                template="generic"
                slug="dictator-or-tech-bro"
                title="Dictator or tech bro?"
                // options below only needed to override matching the slug
                // teamName="product-analytics"
                // roadmapCategory="product-analytics"
                // changelogCategory="product-analytics"
                showAddressBar={false}
                headerBarOptions={[]}
                fullScreen
            >
                <iframe src="https://dictatorortechbro.com" className="w-full h-full border-0" />
            </Explorer>
        </>
    )
}
