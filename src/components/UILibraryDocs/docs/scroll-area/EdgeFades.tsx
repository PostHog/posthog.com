import React from 'react'
import { ScrollArea } from 'components/UI/ScrollArea'

const insights = ['Trends', 'Funnels', 'Retention', 'Paths', 'Lifecycle', 'Stickiness', 'Revenue', 'Session replay']

export default function EdgeFades(): JSX.Element {
    return (
        <div className="flex flex-wrap gap-4">
            <ScrollArea.Root className="h-40 w-60 rounded border border-primary">
                <ScrollArea.Viewport edgeFades aria-label="Insight types">
                    <ScrollArea.Content className="p-4">
                        {insights.map((insight) => (
                            <div key={insight} className="py-2 text-sm">
                                {insight}
                            </div>
                        ))}
                    </ScrollArea.Content>
                </ScrollArea.Viewport>
                <ScrollArea.Scrollbar>
                    <ScrollArea.Thumb />
                </ScrollArea.Scrollbar>
            </ScrollArea.Root>
            <ScrollArea.Root className="h-40 w-60 rounded border border-primary">
                <ScrollArea.Viewport edgeFades aria-label="Dashboard columns">
                    <ScrollArea.Content className="flex w-max gap-6 p-4">
                        {insights.map((insight) => (
                            <div key={insight} className="w-28 py-8 text-sm">
                                {insight}
                            </div>
                        ))}
                    </ScrollArea.Content>
                </ScrollArea.Viewport>
                <ScrollArea.Scrollbar orientation="horizontal">
                    <ScrollArea.Thumb />
                </ScrollArea.Scrollbar>
            </ScrollArea.Root>
        </div>
    )
}
