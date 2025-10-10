import { Select } from 'components/RadixUI/Select'
import { graphql, useStaticQuery } from 'gatsby'
import React from 'react'

export default function CategoryFilter({ onChange, value }: { onChange: (value: string) => void; value: string }) {
    const data = useStaticQuery(graphql`
        {
            allRoadmap(filter: { complete: { eq: true }, date: { ne: null } }) {
                group(field: topic___data___attributes___label) {
                    fieldValue
                }
            }
        }
    `)
    const categories = data.allRoadmap.group.map((category: { fieldValue: string }) => ({
        label: category.fieldValue,
        value: category.fieldValue,
    }))
    return (
        <Select
            defaultValue={value}
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
