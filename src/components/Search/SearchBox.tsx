import React from 'react'
import { useSearch } from './SearchContext'
import type { SearchResultType, SearchLocation } from './SearchContext'

type SearchBoxProps = {
    placeholder?: string
    location: SearchLocation
    filter?: SearchResultType
    className?: string
}

export const SearchBox: React.FC<SearchBoxProps> = ({ placeholder, location, filter, className }) => {
    const { open } = useSearch()

    const handleSearchBoxClick = (event: React.MouseEvent) => {
        event.preventDefault()
        open(location, filter)
    }

    return (
        <button onClick={handleSearchBoxClick} className="flex items-center relative m-0 w-full">
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
            <div
                className={`pl-10 py-3 text-base text-left text-black/40 hover:text-black/60 dark:text-white/40 dark:hover:text-white/60 bg-white dark:bg-accent-dark dark:text-white rounded-md w-full md:w-[300px] mdlg:w-[400px] lg:w-[375px] xl:w-[500px] border border-border dark:border-dark border-b-3 active:border-[#aaa] ${className}`}
            >
                {placeholder || 'Search...'}
            </div>
        </button>
    )
}

export default SearchBox
