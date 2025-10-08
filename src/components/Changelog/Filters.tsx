import React from 'react'
import TeamFilter from './TeamFilter'

export default function Filters({
    teamFilterValue,
    onTeamChange,
}: {
    teamFilterValue: string
    onTeamChange: (value: string) => void
}) {
    return (
        <div className="mt-2 px-4">
            <TeamFilter onChange={onTeamChange} value={teamFilterValue} />
        </div>
    )
}
