import React from 'react'
import { useActions } from 'kea'
import { contributorsLogic } from 'logic/contributorsLogic'

export const ContributorSearch = () => {
    const { processSearchInput } = useActions(contributorsLogic)
    return (
        <div className="max-w-xs mx-auto">
            <input className="contributor-search" onChange={(e) => processSearchInput(e.target.value)} />
        </div>
    )
}
