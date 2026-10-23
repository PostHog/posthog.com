import React from 'react'
import { IconCheck, IconLightBulb } from '@posthog/icons'
import { Note } from 'components/UI/Note'

export default function Legacy(): JSX.Element {
    return (
        <div className="flex flex-col gap-3">
            <Note.Root type="action">
                <Note.Icon>
                    <IconLightBulb />
                </Note.Icon>
                <Note.Title>Next step</Note.Title>
                <Note.Content>
                    <p>Connect your data source.</p>
                </Note.Content>
            </Note.Root>
            <Note.Root tone="success">
                <Note.Icon>
                    <IconCheck />
                </Note.Icon>
                <Note.Content>
                    <p>Your data source is ready.</p>
                </Note.Content>
            </Note.Root>
        </div>
    )
}
