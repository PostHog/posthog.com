import React from 'react'
import { Note } from 'components/UI/Note'

export default function WithoutIcon(): JSX.Element {
    return (
        <Note.Root>
            <Note.Title>Data retention</Note.Title>
            <Note.Content>
                <p>Retention settings apply to new events.</p>
                <p>Check the project settings for the current value.</p>
            </Note.Content>
        </Note.Root>
    )
}
