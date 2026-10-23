import React from 'react'
import Explorer from 'components/Explorer'
import SEO from 'components/seo'
import Hogball from 'components/Hogball'

export default function HogballGame(): JSX.Element {
    return (
        <>
            <SEO
                title="Hogball - PostHog"
                description="A pinball table with a hedgehog for a ball."
                image={`/images/og/default.png`}
            />
            <Explorer
                template="generic"
                slug="hogball"
                title="Hogball"
                showAddressBar={false}
                headerBarOptions={[]}
                fullScreen
            >
                <Hogball />
            </Explorer>
        </>
    )
}
