import React from 'react'
import { Input } from 'antd'
import { useActions } from 'kea'
import { contributorsLogic } from 'logic/contributorsLogic'

export const ContributorSearch = () => {
    const { processSearchInput } = useActions(contributorsLogic)
    return (
        <div className="max-w-xs mx-auto">
            <Input.Search
                className="contributor-search"
                size="large"
                onChange={(e) => processSearchInput(e.target.value)}
            />
        </div>
    )
}
