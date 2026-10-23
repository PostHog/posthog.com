import React from 'react'
import { ScrollArea } from 'components/UI/ScrollArea'

const dashboards = [
    'Product analytics',
    'Web analytics',
    'Revenue',
    'Retention',
    'Signups',
    'Errors',
    'Experiments',
    'Surveys',
]

export default function ScrollAreaHorizontal(): JSX.Element {
    return (
        <ScrollArea.Root className="max-w-sm rounded border border-primary">
            <ScrollArea.Viewport>
                <ScrollArea.Content className="flex gap-2 p-3">
                    {dashboards.map((name) => (
                        <div
                            key={name}
                            className="w-32 shrink-0 rounded border border-primary bg-accent px-3 py-6 text-sm font-semibold"
                        >
                            {name}
                        </div>
                    ))}
                </ScrollArea.Content>
            </ScrollArea.Viewport>
            <ScrollArea.Scrollbar orientation="horizontal">
                <ScrollArea.Thumb />
            </ScrollArea.Scrollbar>
        </ScrollArea.Root>
    )
}
