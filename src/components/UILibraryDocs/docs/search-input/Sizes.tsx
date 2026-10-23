import React from 'react'
import { SearchInput } from 'components/UI/SearchInput'

export default function Sizes(): JSX.Element {
    return (
        <div className="flex w-full max-w-md flex-col gap-3">
            <SearchInput size="sm" aria-label="Filter events" placeholder="Filter events" />
            <SearchInput size="md" aria-label="Search this page" placeholder="Search this page" />
            <SearchInput size="lg" aria-label="Search all docs" placeholder="Search all docs" />
        </div>
    )
}
