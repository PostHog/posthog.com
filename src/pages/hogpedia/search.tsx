import React from 'react'
import { useLocation } from '@reach/router'
import Explorer from 'components/Explorer'
import { SEO } from 'components/seo'
import HogpediaShell from 'components/Hogpedia/HogpediaShell'
import { SearchResults } from 'components/Hogpedia/HogpediaSearch'

/** The results page behind the sidebar's "Search" button. */
export default function HogpediaSearchPage(): JSX.Element {
    const location = useLocation()
    const query = typeof location.search === 'string' ? new URLSearchParams(location.search).get('q') || '' : ''

    return (
        <>
            <SEO
                title="Search results – Hogpedia"
                description="Search the Hogpedia encyclopedia of PostHog products, concepts, company history, and lore."
                canonicalUrl="/hogpedia/search"
            />
            <Explorer template="generic" slug="hogpedia" title="Search – Hogpedia" fullScreen showAddressBar={false}>
                <HogpediaShell title="Search results" slug="/hogpedia/search" showTabs={false}>
                    <SearchResults initialQuery={query} />
                </HogpediaShell>
            </Explorer>
        </>
    )
}
