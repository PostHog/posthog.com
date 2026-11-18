import React from 'react'
import { Textarea } from 'components/UI/Textarea'
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
                    <Textarea
                        size={size}
                        aria-label={`${size} text area`}
                        placeholder="Write a message"
                        className="min-w-0 flex-1"
                    />
                </DemoRow>
            ))}
        </DemoRows>
    )
}
