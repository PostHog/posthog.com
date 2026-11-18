import React from 'react'
import { SearchInput } from 'components/UI/SearchInput'
import { DemoRow, DemoRows } from 'components/UILibraryDocs/DemoLayout'

const sizes = [
    { size: 'sm', label: 'sm · dense UI' },
    { size: 'md', label: 'md · default' },
    { size: 'lg', label: 'lg · hero field' },
] as const

export default function Sizes(): JSX.Element {
    return (
        <DemoRows>
            {sizes.map(({ size, label }) => (
                <DemoRow key={size} label={label}>
                    <SearchInput
                        size={size}
                        aria-label={`${size} search`}
                        placeholder="Search docs"
                        className="max-w-md"
                    />
                </DemoRow>
            ))}
        </DemoRows>
    )
}
