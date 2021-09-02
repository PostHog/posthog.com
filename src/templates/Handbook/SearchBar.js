import React, { useEffect } from 'react'
import 'docsearch.js/dist/cdn/docsearch.min.css'
import { posthogAnalyticsLogic } from '../../logic/posthogAnalyticsLogic'
import { useValues } from 'kea'
import { DarkModeToggle } from '../../components/DarkModeToggle'
import { useBreakpoint } from 'gatsby-plugin-breakpoints'

export default function SearchBar({ base }) {
    const breakpoints = useBreakpoint()
    const { posthog } = useValues(posthogAnalyticsLogic)
    useEffect(() => {
        if (window) {
            import('docsearch.js').then(({ default: docsearch }) => {
                docsearch({
                    apiKey: '45e80dec3e5b55c400663a5cba911c4c',
                    indexName: 'posthog',
                    inputSelector: `#${base}-search`,
                    algoliaOptions: {
                        facetFilters: [`tags:${base}`],
                    },
                })
            })

            const doc = window.document
            const docSearchBarElement = doc.getElementById(`${base}-search-wrapper`)
            const docSearchInputElement = doc.getElementById(`${base}-search`)

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
        <div
            id={`${base}-search-wrapper`}
            className="flex space-x-3 w-full text-[14px] items-center flex-grow relative"
        >
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
                id={`${base}-search`}
                className="w-full text-sm text-primary dark:text-primary-dark outline-none bg-transparent py-2 pl-5 placeholder-primary-50::placeholder dark:placeholder-primary-dark-50::placeholder"
                placeholder={`Search ${breakpoints.xs ? '' : base}`}
            />
        </div>
    )
}
