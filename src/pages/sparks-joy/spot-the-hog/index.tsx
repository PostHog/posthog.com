import React from 'react'
import Explorer from 'components/Explorer'
import SEO from 'components/seo'
import SpotTheHog from 'components/SpotTheHog'

export default function SpotTheHogPage(): JSX.Element {
    return (
        <>
            <SEO
                title="Spot the Hog - PostHog"
                description="One suspect. A crowd of hedgehogs. Find the wanted hog as fast as you can."
                image={`/images/og/default.png`}
            />
            <Explorer
                template="generic"
                slug="spot-the-hog"
                title="Spot the Hog"
                className="[&_[data-scheme=secondary].flex-grow]:h-full"
                showTitle={false}
                showAddressBar={false}
                headerBarOptions={[]}
                fullScreen
            >
                <SpotTheHog />
            </Explorer>
        </>
    )
}
