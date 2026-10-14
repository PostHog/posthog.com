import { Select } from 'components/RadixUI/Select'
import React from 'react'

export default function CodedFilter({ onChange, value }: { onChange: (value: string) => void; value: string }) {
    return (
        <Select
            defaultValue={value}
            dataScheme="primary"
            onValueChange={(value) => {
                onChange(value)
            }}
            groups={[
                {
                    label: 'Coded by',
                    items: [
                        { label: 'All coding styles', value: 'all' },
                        { label: 'AI coded', value: 'ai-coded' },
                        { label: 'Artisanally coded', value: 'artisanally-coded' },
                    ],
                },
            ]}
        />
    )
}
