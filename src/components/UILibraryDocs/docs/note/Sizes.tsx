import React from 'react'
import { Note } from 'components/UI/Note'
import { DemoColumn, DemoColumns } from 'components/UILibraryDocs/DemoLayout'

export default function Sizes(): JSX.Element {
    return (
        <DemoColumns>
            {(['sm', 'md'] as const).map((size) => (
                <DemoColumn key={size} label={size === 'md' ? 'md (default)' : 'sm'}>
                    <Note.Root size={size}>
                        <Note.Icon />
                        <Note.Title>Check your plan</Note.Title>
                        <Note.Content>
                            <p>Session replay counts toward your monthly quota.</p>
                        </Note.Content>
                    </Note.Root>
                </DemoColumn>
            ))}
        </DemoColumns>
    )
}
