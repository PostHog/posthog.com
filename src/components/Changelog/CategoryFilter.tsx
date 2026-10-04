import { Select } from 'components/RadixUI/Select'
import React from 'react'
import changelogFiltersJson from '@data/roadmap-changelog-filters.json'
import type { ChangelogFilters } from '~/data-layer/queries/roadmap'

const changelogFilters = changelogFiltersJson as ChangelogFilters

export default function CategoryFilter({ onChange, value }: { onChange: (value: string) => void; value: string }) {
    const categories = changelogFilters.topics.map((topic) => ({ label: topic, value: topic }))
    return (
        <Select
            defaultValue={value}
            dataScheme="primary"
            onValueChange={(value) => {
                onChange(value)
            }}
            groups={[
                {
                    label: 'Category',
                    items: [{ label: 'All categories', value: 'all' }, ...categories],
                },
            ]}
        />
    )
}
