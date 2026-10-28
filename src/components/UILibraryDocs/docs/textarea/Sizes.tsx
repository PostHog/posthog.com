import React from 'react'
import { Textarea } from 'components/UI/Textarea'
import { DemoRow, DemoRows } from 'components/UILibraryDocs/DemoLayout'

export default function Sizes(): JSX.Element {
    return (
        <DemoRows>
            {(['sm', 'md', 'lg'] as const).map((size) => (
                <DemoRow key={size} label={size}>
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
