import '@docsearch/css/dist/modal.css'
import '@docsearch/css/dist/_variables.css'
import { DocSearch } from '@docsearch/react'
import { useBreakpoint } from 'gatsby-plugin-breakpoints'
import { useValues } from 'kea'
import React from 'react'
import { posthogAnalyticsLogic } from '../../logic/posthogAnalyticsLogic'

export default function SearchBar({ base }) {
    const breakpoints = useBreakpoint()
    const { posthog } = useValues(posthogAnalyticsLogic)

    return (
        <div className="flex space-x-3 w-full text-[14px] px-3 items-center flex-grow relative">
            <DocSearch
                translations={{
                    button: {
                        buttonText: `Search ${breakpoints.xs ? '' : base} `,
                        buttonAriaLabel: 'Search',
                    },
                }}
                searchParameters={{ facetFilters: [`tags:${base}`] }}
                appId="B763I3AO0D"
                indexName="posthog"
                apiKey="f1386529b9fafc5c3467e0380f19de4b"
            />
        </div>
    )
}
