import React from 'react'
import { useActions } from 'kea'
import { contributorsLogic } from 'logic/contributorsLogic'
import SearchBar from 'components/SearchBar'

export const ContributorSearch = () => {
    const { processSearchInput } = useActions(contributorsLogic)
    return (
        <div className="max-w-md mx-auto">
            <SearchBar onChange={(e) => processSearchInput(e.target.value)} />
        </div>
    )
}
