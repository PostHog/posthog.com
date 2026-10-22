import React from 'react'
import Explorer from 'components/Explorer'
import SEO from 'components/seo'
import Pinball from 'components/Pinball'

export default function PinballGame(): JSX.Element {
    return (
        <>
            <SEO
                title="Hog pinball - PostHog"
                description="A pinball table with a hedgehog for a ball."
                image={`/images/og/default.png`}
            />
            <Explorer
                template="generic"
                slug="pinball"
                title="Hog pinball"
                showAddressBar={false}
                headerBarOptions={[]}
                fullScreen
            >
                <Pinball />
            </Explorer>
        </>
    )
}
