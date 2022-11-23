import React from 'react'
import { useSearch, SearchResultType } from './SearchContext'

type SearchIconButtonProps = {
    initialFilter?: SearchResultType
}

export const SearchIconButton: React.FC<SearchIconButtonProps> = ({ initialFilter }) => {
    const { open } = useSearch()

    const handleSearchBoxClick = (event: React.MouseEvent) => {
        event.preventDefault()
        open(initialFilter)
    }

    return (
        <button onClick={handleSearchBoxClick} className="flex items-center relative m-0 p-2">
            <div className="w-4 h-4">
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
            <span className="sr-only">Search</span>
        </button>
    )
}

export default SearchIconButton
