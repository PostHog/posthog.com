import React from 'react'
import { ScrollArea } from 'components/UI/ScrollArea'

export default function ScrollAreaVertical(): JSX.Element {
    return (
        <ScrollArea.Root className="h-40 max-w-sm rounded border border-primary">
            <ScrollArea.Viewport>
                <ScrollArea.Content className="flex flex-col gap-2 p-3 text-sm">
                    {Array.from({ length: 20 }, (_, index) => (
                        <p key={index} className="m-0">
                            Event {index + 1}: <code>$pageview</code>
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
