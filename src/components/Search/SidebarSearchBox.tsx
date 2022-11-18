import React from 'react'
import { useSearch } from './SearchContext'
import { Search } from 'components/Icons/Icons'

type SearchBoxProps = {
    placeholder?: string
    filter?: string
    label?: boolean
    className?: string
}

export const SidebarSearchBox: React.FC<SearchBoxProps> = ({ placeholder, filter, label = true, className }) => {
    const { open } = useSearch()

    return (
        <button
            type="button"
            onClick={open}
            className="flex items-center relative m-0 w-full text-sm text-gray focus:outline-none"
        >
            <div className="absolute left-4 z-20">
                <Search className="w-4 h-4" />
            </div>

            <div className="pl-10 py-2 text-left text-gray bg-white dark:bg-gray-accent-dark dark:text-white w-full rounded border border-gray-accent-light hover:border-gray z-10 shadow-sm">
                <span>{placeholder || 'Quick search...'}</span>
            </div>

            <div className="absolute inset-x-0 top-full h-8 bg-gradient-to-b from-tan"></div>
        </button>
    )
}

export default SidebarSearchBox
