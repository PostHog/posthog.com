import React from 'react'
import { Note } from 'components/UI/Note'
import { DemoLabel } from 'components/UILibraryDocs/DemoLayout'
import type { StatusAlias } from 'components/UI/colors'

const notes: { tone: StatusAlias; title: string; body: string }[] = [
    { tone: 'neutral', title: 'Before you start', body: 'You need a PostHog project and its project token.' },
    {
        tone: 'info',
        title: 'Events can take a minute',
        body: 'New events appear in the activity feed after ingestion.',
    },
    { tone: 'success', title: 'Snippet installed', body: 'PostHog received the first event from your site.' },
    { tone: 'warning', title: 'Check your plan', body: 'Session replay counts toward your monthly recording quota.' },
    { tone: 'error', title: 'Do not share this key', body: 'The personal API key gives full access to your account.' },
    { tone: 'brand', title: 'New in PostHog', body: 'Ask PostHog AI to write this query for you.' },
]

export default function Tones(): JSX.Element {
    return (
        <div className="flex flex-col gap-4">
            {notes.map(({ tone, title, body }) => (
                <div key={tone} className="flex flex-col gap-1.5">
                    <DemoLabel>{tone}</DemoLabel>
                    <Note.Root color={tone}>
                        <Note.Icon />
                        <Note.Title>{title}</Note.Title>
                        <Note.Content>
                            <p>{body}</p>
                        </Note.Content>
                    </Note.Root>
                </div>
            ))}
        </div>
    )
}
