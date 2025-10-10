import React from 'react'
import TeamFilter from './TeamFilter'
import CategoryFilter from './CategoryFilter'
import { Checkbox } from '../RadixUI/Checkbox'

export default function Filters({
    teamFilterValue,
    onTeamChange,
    categoryFilterValue,
    onCategoryChange,
    hideEmpty,
    onHideEmptyChange,
}: {
    teamFilterValue: string
    onTeamChange: (value: string) => void
    categoryFilterValue: string
    onCategoryChange: (value: string) => void
    hideEmpty: boolean
    onHideEmptyChange: (value: boolean) => void
}): JSX.Element {
    return (
        <div className="flex items-center space-x-4">
            <CategoryFilter onChange={onCategoryChange} value={categoryFilterValue} />
            <TeamFilter onChange={onTeamChange} value={teamFilterValue} />
            <div className="flex items-center space-x-2">
                <Checkbox id="hide-empty" checked={hideEmpty} onCheckedChange={onHideEmptyChange} />
                <label htmlFor="hide-empty" className="text-sm cursor-pointer text-primary">
                    Hide empty weeks
                </label>
            </div>
        </div>
    )
}
