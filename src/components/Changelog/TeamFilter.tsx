import { Select } from 'components/RadixUI/Select'
import { graphql, useStaticQuery } from 'gatsby'
import React from 'react'

export default function TeamFilter({ onChange, value }: { onChange: (value: string) => void; value: string }) {
    const data = useStaticQuery(graphql`
        {
            allRoadmap(filter: { complete: { eq: true }, date: { ne: null } }) {
                group(field: teams___data___attributes___name) {
                    fieldValue
                }
            }
        }
    `)
    const teams = data.allRoadmap.group.map((team: { fieldValue: string }) => ({
        label: team.fieldValue,
        value: team.fieldValue,
    }))
    return (
        <Select
            defaultValue={value}
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
