import React from 'react'
import TeamFilter from './TeamFilter'
import CategoryFilter from './CategoryFilter'
import { Checkbox } from '../RadixUI/Checkbox'

export default function Filters({
    teamFilterValue,
    onTeamChange,
    categoryFilterValue,
    onCategoryChange,
}: {
    teamFilterValue: string
    onTeamChange: (value: string) => void
    categoryFilterValue: string
    onCategoryChange: (value: string) => void
}): JSX.Element {
    return (
        <div className="flex items-center space-x-2">
            <CategoryFilter onChange={onCategoryChange} value={categoryFilterValue} />
            <TeamFilter onChange={onTeamChange} value={teamFilterValue} />
        </div>
    )
}
