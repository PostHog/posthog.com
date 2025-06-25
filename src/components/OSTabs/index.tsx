import React from 'react'
import { Tabs } from 'radix-ui'
import ScrollArea from 'components/RadixUI/ScrollArea'

interface TabItem {
    value: string
    label: string
    content: React.ReactNode
    triggerDataScheme?: string
}

interface OSTabsProps {
    tabs: TabItem[]
    defaultValue?: string
    frame: boolean
    children?: React.ReactNode
    fullScreen?: boolean
    className?: string
    triggerDataScheme?: string
    onValueChange?: (value: string) => void
}

export default function OSTabs({
    tabs,
    defaultValue,
    children,
    frame = true,
    className,
    triggerDataScheme = 'secondary',
    onValueChange,
}: OSTabsProps) {
    return (
        <>
            <Tabs.Root
                onValueChange={onValueChange}
                defaultValue={defaultValue || tabs[0]?.value}
                className={className ?? 'relative flex flex-col pt-2 px-4 pb-4 h-full min-h-0 bg-primary'}
            >
                <Tabs.List className="ml-1.5 flex-shrink-0">
                    {tabs.map((tab) => (
                        <Tabs.Trigger
                            key={tab.value}
                            value={tab.value}
                            data-scheme={triggerDataScheme}
                            className="data-[state=active]:bg-primary px-2 py-1 border border-transparent data-[state=active]:border-primary border-b-0 rounded-t-sm relative -bottom-px z-10 text-sm select-none"
                        >
                            {tab.label}
                        </Tabs.Trigger>
                    ))}
                </Tabs.List>
                {tabs.map((tab) => (
                    <Tabs.Content data-scheme="primary" key={tab.value} value={tab.value} className="flex-1 h-full">
                        <ScrollArea
                            className={`@container bg-primary ${frame ? 'border border-primary rounded-md' : ''}`}
                        >
                            <div className={frame ? '@container p-4 @2xl:p-6' : '@container'}>{tab.content}</div>
                        </ScrollArea>
                    </Tabs.Content>
                ))}
            </Tabs.Root>
            {children}
        </>
    )
}
