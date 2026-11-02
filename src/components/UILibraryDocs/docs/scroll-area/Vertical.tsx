import React from 'react'
import { ScrollArea } from 'components/UI/ScrollArea'

const events = [
    'Pageview on /pricing',
    'Signed up',
    'Created a dashboard',
    'Invited a teammate',
    'Watched a recording',
    'Turned on a feature flag',
    'Started an experiment',
    'Sent a survey',
    'Connected a data source',
    'Ran a SQL query',
    'Shared an insight',
    'Exported a CSV',
    'Upgraded the plan',
    'Pageview on /docs',
]

export default function ScrollAreaVertical(): JSX.Element {
    return (
        <ScrollArea.Root className="h-40 w-full max-w-sm rounded border border-primary">
            <ScrollArea.Viewport aria-label="Recent events">
                <ScrollArea.Content className="flex flex-col gap-2 p-3 text-body-sm">
                    {events.map((event) => (
                        <p key={event} className="m-0">
                            {event}
                        </p>
                    ))}
                </ScrollArea.Content>
            </ScrollArea.Viewport>
            <ScrollArea.Scrollbar orientation="vertical">
                <ScrollArea.Thumb />
            </ScrollArea.Scrollbar>
        </ScrollArea.Root>
    )
}
