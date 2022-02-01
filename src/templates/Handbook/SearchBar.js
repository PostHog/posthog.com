import '@docsearch/css/dist/modal.css'
import '@docsearch/css/dist/_variables.css'
import { DocSearch } from '@docsearch/react'
import { useBreakpoint } from 'gatsby-plugin-breakpoints'
import { useValues } from 'kea'
import React, { useEffect } from 'react'
import { posthogAnalyticsLogic } from '../../logic/posthogAnalyticsLogic'

export default function SearchBar({ base }) {
    const breakpoints = useBreakpoint()
    const { posthog } = useValues(posthogAnalyticsLogic)

    const handleSearchBarUsed = (openMethod) => {
        let isFirstUse = false
        if (!window.localStorage['hasUsedSearchBar']) {
            window.localStorage['hasUsedSearchBar'] = 'true'
            isFirstUse = true
        }

        // Track search bar usage
        posthog?.capture('docs_search_used', { is_first_use: isFirstUse, open_method: openMethod })
        if (isFirstUse) posthog?.people.set({ used_docs_search: true })
    }

    const handleSearchBarClicked = () => {
        handleSearchBarUsed('click')
    }

    const handleShortcutUsed = (e) => {
        // ⌘K opens bar on Mac and Ctrl + K opens it on everything else
        if (e.key === 'k' && (e.ctrlKey || e.metaKey)) {
            handleSearchBarUsed('shortcut')
        }
    }

    useEffect(() => {
        if (typeof window !== 'undefined') {
            document.querySelector('.DocSearch-Button').addEventListener('click', handleSearchBarClicked)
            document.addEventListener('keydown', handleShortcutUsed)

            return () => {
                document.removeEventListener('click', handleSearchBarClicked)
                document.removeEventListener('keydown', handleShortcutUsed)
            }
        }
    }, [])

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
