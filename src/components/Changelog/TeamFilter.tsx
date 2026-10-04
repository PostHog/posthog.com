import { Select } from 'components/RadixUI/Select'
import React from 'react'
import changelogFiltersJson from '@data/roadmap-changelog-filters.json'
import type { ChangelogFilters } from '~/data-layer/queries/roadmap'

const changelogFilters = changelogFiltersJson as ChangelogFilters

export default function TeamFilter({ onChange, value }: { onChange: (value: string) => void; value: string }) {
    const teams = changelogFilters.teams.map((team) => ({ label: team, value: team }))
    return (
        <Select
            defaultValue={value}
            dataScheme="primary"
            onValueChange={(value) => {
                onChange(value)
            }}
            groups={[
                {
                    label: 'Team',
                    items: [{ label: 'All teams', value: 'all' }, ...teams],
                },
            ]}
        />
    )
}
