import React from 'react'
import { ScrollArea } from 'components/UI/ScrollArea'
import { DemoColumn, DemoColumns } from 'components/UILibraryDocs/DemoLayout'

const insights = ['Trends', 'Funnels', 'Retention', 'Paths', 'Lifecycle', 'Stickiness', 'Revenue', 'Session replay']

export default function EdgeFades(): JSX.Element {
    return (
        <DemoColumns>
            <DemoColumn label="Vertical">
                <ScrollArea.Root className="h-40 rounded border border-primary">
                    <ScrollArea.Viewport edgeFades aria-label="Insight types">
                        <ScrollArea.Content className="p-3">
                            {insights.map((insight) => (
                                <div key={insight} className="py-1.5 text-body-sm">
                                    {insight}
                                </div>
                            ))}
                        </ScrollArea.Content>
                    </ScrollArea.Viewport>
                    <ScrollArea.Scrollbar>
                        <ScrollArea.Thumb />
                    </ScrollArea.Scrollbar>
                </ScrollArea.Root>
            </DemoColumn>
            <DemoColumn label="Horizontal">
                <ScrollArea.Root className="rounded border border-primary">
                    <ScrollArea.Viewport edgeFades aria-label="Dashboard tabs">
                        <ScrollArea.Content className="flex w-max gap-2 p-3">
                            {[...insights, ...insights].map((insight, index) => (
                                <span
                                    key={`${insight}-${index}`}
                                    className="whitespace-nowrap rounded border border-primary px-2 py-1 text-body-sm"
                                >
                                    {insight}
                                </span>
                            ))}
                        </ScrollArea.Content>
                    </ScrollArea.Viewport>
                    <ScrollArea.Scrollbar orientation="horizontal">
                        <ScrollArea.Thumb />
                    </ScrollArea.Scrollbar>
                </ScrollArea.Root>
            </DemoColumn>
        </DemoColumns>
    )
}
