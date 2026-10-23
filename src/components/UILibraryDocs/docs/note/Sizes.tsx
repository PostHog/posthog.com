import React from 'react'
import { Note } from 'components/UI/Note'

export default function Sizes(): JSX.Element {
    return (
        <div className="flex flex-col gap-3">
            {(['sm', 'md'] as const).map((size) => (
                <Note.Root key={size} size={size}>
                    <Note.Icon />
                    <Note.Title>Size {size}</Note.Title>
                    <Note.Content>
                        <p>Check the configuration before the next step.</p>
                    </Note.Content>
                </Note.Root>
            ))}
        </div>
    )
}
