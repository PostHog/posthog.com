import React from 'react'
import { Note } from 'components/UI/Note'
export default function ContentOnly(): JSX.Element {
    return (
        <div className="space-y-3">
            <Note.Root color="success">
                <Note.Icon />
                <Note.Content>
                    <p>Your data source is ready.</p>
                </Note.Content>
            </Note.Root>
            <Note.Root color="neutral" size="sm">
                <Note.Content>
                    <p>This SDK sends events in batches.</p>
                </Note.Content>
            </Note.Root>
        </div>
    )
}
