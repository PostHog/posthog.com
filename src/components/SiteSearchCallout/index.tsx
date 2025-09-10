import React from 'react'
import { useSearch } from '../Search/SearchContext'
import type { SearchResultType } from '../Search/SearchContext'

type SearchBoxProps = {
    filter?: SearchResultType
}

export const SiteSearchCallout: React.FC<SearchBoxProps> = ({ filter }) => {
    const { open } = useSearch()

    const handleSearchBoxClick = (event: React.MouseEvent) => {
        event.preventDefault()
        open(filter)
    }

    return (
        <div className="max-w-xl border border-primary p-4 rounded inline-flex flex-col">
            <p className="text-sm text-black/75 dark:text-white mb-2">
                <strong>Tip:</strong> Get somewhere fast with{' '}
                <button className="font-semibold text-red" onClick={handleSearchBoxClick}>
                    our awesome site search
                </button>{' '}
                <span className="opacity-60">(powered by Algolia)</span>.
            </p>
            <p className="text-sm text-black/75 dark:text-white mb-0">
                Can't find an answer? <a href="/questions">Ask a community question.</a>
            </p>
        </div>
    )
}

export default SiteSearchCallout
