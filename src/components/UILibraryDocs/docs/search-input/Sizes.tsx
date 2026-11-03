import React from 'react'
import { SearchInput } from 'components/UI/SearchInput'
import { DemoRow, DemoRows } from 'components/UILibraryDocs/DemoLayout'

export default function Sizes(): JSX.Element {
    return (
        <DemoRows>
            {(['sm', 'md', 'lg'] as const).map((size) => (
                <DemoRow key={size} label={size}>
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
