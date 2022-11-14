import '@docsearch/css/dist/modal.css'
import '@docsearch/css/dist/_variables.css'

import React from 'react'
import { DocSearchModal } from '@docsearch/react'
import { posthogAnalyticsLogic } from '../../logic/posthogAnalyticsLogic'
import { useValues } from 'kea'
import { createPortal } from 'react-dom'

type SearchBoxProps = {
    size: 'small' | 'large'
    placeholder?: string
    filter?: string
    label?: boolean
    className?: string
}

export const SearchBox: React.FC<SearchBoxProps> = ({ size, placeholder, filter, label = true, className }) => {
    const [searchOpen, setSearchOpen] = React.useState<boolean>(false)
    const { posthog } = useValues(posthogAnalyticsLogic)

    const handleSearchBoxClick = (event: React.MouseEvent) => {
        event.preventDefault()
        setSearchOpen(true)
        posthog?.capture('docs_search_used')
    }

    return (
        <>
            {searchOpen &&
                createPortal(
                    <DocSearchModal
                        initialScrollY={window.scrollY}
                        appId="B763I3AO0D"
                        indexName="posthog"
                        apiKey="f1386529b9fafc5c3467e0380f19de4b"
                        onClose={() => setSearchOpen(false)}
                        searchParameters={filter && { facetFilters: [`tags:${filter}`] }}
                    />,
                    document.body
                )}

            <button onClick={handleSearchBoxClick} className="flex items-center relative m-0 w-full max-w-lg">
                <div className="absolute left-4 w-4 h-4">
                    <svg className="opacity-50" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18">
                        <g opacity="1" clipPath="url(#a)">
                            <path
                                d="m18 15.964-4.794-4.793A7.2 7.2 0 1 0 .001 7.2a7.2 7.2 0 0 0 11.17 6.006L15.963 18 18 15.964ZM2.04 7.2A5.16 5.16 0 0 1 7.2 2.043 5.16 5.16 0 1 1 2.04 7.2Z"
                                fill="#90794B"
                            />
                        </g>
                        <defs>
                            <clipPath id="a">
                                <path fill="#fff" d="M0 0h18v18H0z" />
                            </clipPath>
                        </defs>
                    </svg>
                </div>
                <div className="pl-10 py-3 text-base text-left text-gray bg-white dark:bg-gray-accent-dark dark:text-white rounded-full w-full md:w-[300px] mdlg:w-[400px] lg:w-[375px] xl:w-[500px] ring-red shadow-lg">
                    {placeholder || 'Search...'}
                </div>
            </button>
        </>
    )
}

export default SearchBox
