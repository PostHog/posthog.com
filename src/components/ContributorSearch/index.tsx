import { useActions } from 'kea'
import { contributorsLogic } from 'logic/contributorsLogic'
import React from 'react'

export const ContributorSearch = () => {
    const { processSearchInput } = useActions(contributorsLogic)
    return (
        <div className="max-w-xs mx-auto">
            <input
                placeholder="Search..."
                className="contributor-search px-4 py-2 text-base rounded-md max-w-[250px] w-full"
                onChange={(e) => processSearchInput(e.target.value)}
            />
        </div>
    )
}
