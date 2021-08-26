import React, { useEffect } from 'react'
import 'docsearch.js/dist/cdn/docsearch.min.css'
import { posthogAnalyticsLogic } from '../../logic/posthogAnalyticsLogic'
import { useValues } from 'kea'
import { DarkModeToggle } from '../../components/DarkModeToggle'
import { useBreakpoint } from 'gatsby-plugin-breakpoints'

export default function SearchBar({ className, filePath, title, handleMobileMenuClick, style, menuOpen }) {
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
        <div
            style={{
                transition: 'all 0.5s ease 0s',
                zIndex: 1001,
                transform: menuOpen ? 'translate3d(calc(100vw - 80px), 0px, 0px)' : 'none',
            }}
            className={`py-4 pb-0 lg:py-0 xl:px-0 backdrop-blur-sm sm:backdrop-blur-0 handbook-search  z-20 sticky top-0 lg:top-4 ${className}`}
        >
            <div className="w-full flex space-x-2 md:space-x-0 text-gray dark:text-gray-accent-light">
                <button
                    onClick={handleMobileMenuClick}
                    className="bg-white dark:bg-gray rounded-full px-4 flex-shrink-0 block md:hidden shadow-xl dark:shadow-2xl"
                >
                    <svg
                        style={{ transform: `rotate(${menuOpen ? '180deg' : '0deg'})` }}
                        width="18"
                        height="16"
                        viewBox="0 0 18 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <g opacity="0.5">
                            <path
                                d="M8.99992 0C9.70943 0 10.2878 0.578406 10.2878 1.28792C10.2878 1.99743 9.70943 2.57583 8.99992 2.57583H1.28784C0.578331 2.57583 -7.62939e-05 1.99743 -7.62939e-05 1.28792C-7.62939e-05 0.578406 0.578331 0 1.28784 0H8.99992Z"
                                fill="currentColor"
                            />
                            <path
                                d="M17.7841 7.00257C17.8072 7.03342 17.8149 7.07969 17.8303 7.11825C17.8689 7.18766 17.8997 7.26478 17.9229 7.3419C17.9383 7.38817 17.9614 7.42673 17.9769 7.473C17.9846 7.51928 17.9769 7.55784 17.9769 7.60411C17.9769 7.64267 18 7.68123 18 7.71979C18 7.75835 17.9769 7.79691 17.9769 7.83547C17.9692 7.88175 17.9846 7.92031 17.9769 7.96658C17.9692 8.01285 17.9383 8.05141 17.9229 8.09768C17.8997 8.1748 17.8689 8.25192 17.8303 8.32133C17.8072 8.35989 17.8072 8.39845 17.7841 8.43701L15.2159 12.2931C14.9691 12.6632 14.5604 12.8637 14.144 12.8637C13.8972 12.8637 13.6504 12.7943 13.4344 12.6478C12.8406 12.2545 12.6864 11.4524 13.0797 10.8663L14.3213 9.00771H1.28792C0.578405 9.00771 0 8.4293 0 7.71979C0 7.01028 0.578405 6.43187 1.28792 6.43187H14.3136L13.072 4.57326C12.6787 3.97943 12.8406 3.18509 13.4267 2.79177C14.0206 2.39846 14.8149 2.56041 15.2082 3.14653L17.7841 7.00257Z"
                                fill="currentColor"
                            />
                            <path
                                d="M1.28784 12.856H8.99992C9.70943 12.856 10.2878 13.4344 10.2878 14.1439C10.2878 14.8535 9.70943 15.4242 8.99992 15.4242H1.28784C0.578331 15.4242 -7.62939e-05 14.8457 -7.62939e-05 14.1362C-7.62939e-05 13.4267 0.578331 12.856 1.28784 12.856Z"
                                fill="currentColor"
                            />
                        </g>
                    </svg>
                </button>

                <div
                    id="handbook-search-wrapper"
                    className="flex space-x-3 text-[14px] items-center  py-3 rounded-full px-4 bg-white dark:bg-gray flex-grow border-2 border-gray dark:border-black"
                >
                    <span>
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
                        className="bg-white w-full dark:bg-gray outline-none text-gray dark:text-almost-black "
                        placeholder={`Search ${breakpoints.xs ? '' : 'handbook'}`}
                    />
                </div>
            </div>
        </div>
    )
}
