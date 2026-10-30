import React from 'react'
import Explorer from 'components/Explorer'
import { SEO } from 'components/seo'
import TierList from 'components/TierList'

export default function TierListPage(): JSX.Element {
    return (
        <>
            <SEO
                title="Hoggie tier list - PostHog"
                description="Good hogs. Strong opinions. Rank PostHog's hoggies and share your tier list."
            />
            <Explorer
                template="generic"
                slug="tier-list"
                title="Hoggie tier list"
                className="[&_[data-scheme=secondary].flex-grow]:h-full"
                showTitle={false}
                showAddressBar={false}
                fullScreen
            >
                <TierList />
            </Explorer>
        </>
    )
}
