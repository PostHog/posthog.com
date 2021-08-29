import React, { useEffect } from 'react'
import 'docsearch.js/dist/cdn/docsearch.min.css'
import { posthogAnalyticsLogic } from '../../logic/posthogAnalyticsLogic'
import { useValues } from 'kea'
import { DarkModeToggle } from '../../components/DarkModeToggle'
import { useBreakpoint } from 'gatsby-plugin-breakpoints'

export default function SearchBar() {
    const breakpoints = useBreakpoint()
    const { posthog } = useValues(posthogAnalyticsLogic)
    useEffect(() => {
        if (window) {
            import('docsearch.js').then(({ default: docsearch }) => {
                docsearch({
                    apiKey: '45e80dec3e5b55c400663a5cba911c4c',
                    indexName: 'posthog',
                    inputSelector: '#handbook-search',
                    algoliaOptions: {
                        facetFilters: ['tags:handbook'],
                    },
                })
            })

            const doc = window.document
            const docSearchBarElement = doc.getElementById('handbook-search-wrapper')
            const docSearchInputElement = doc.getElementById('handbook-search')

            if (window.screen.width > 1080) {
                docSearchInputElement.placeholder += window.navigator.platform.includes('Mac') ? ' (⌘K)' : ' (Ctrl + K)'
            }

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

            docSearchBarElement.addEventListener('click', () => handleSearchBarUsed('click'))

            doc.addEventListener('keydown', (e) => {
                // ⌘K opens bar on Mac and Ctrl + K opens it on everything else
                if (e.key === 'k' && (e.ctrlKey || e.metaKey)) {
                    e.preventDefault()
                    docSearchInputElement.focus()
                    handleSearchBarUsed('shortcut')
                }
            })
        }
    }, [])
    return (
        <div id="handbook-search-wrapper" className="flex space-x-3 w-full text-[14px] items-center flex-grow relative">
            <span className="absolute top-2 left-3">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                </svg>
            </span>
            <input
                id="handbook-search"
                className="w-full text-sm text-primary outline-none bg-transparent py-2 pl-5 placeholder-primary-50::placeholder"
                placeholder={`Search ${breakpoints.xs ? '' : 'handbook'}`}
            />
        </div>
    )
}
