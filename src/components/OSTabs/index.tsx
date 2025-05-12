import React from 'react'
import { Tabs } from 'radix-ui'
import ScrollArea from 'components/RadixUI/ScrollArea'

interface TabItem {
    value: string
    label: string
    content: React.ReactNode
}

interface OSTabsProps {
    tabs: TabItem[]
    defaultValue?: string
    children?: React.ReactNode
    fullScreen?: boolean
}

export default function OSTabs({
    tabs,
    defaultValue,
    children,
    fullScreen = false,
}: OSTabsProps) {
    return (
      <>
                <Tabs.Root defaultValue={defaultValue || tabs[0]?.value} data-scheme="secondary" className="relative flex flex-col pt-2 px-4 pb-4 h-full min-h-0 bg-primary">
                    <Tabs.List className="ml-4 flex-shrink-0">
                        {tabs.map((tab) => (
                            <Tabs.Trigger
                                key={tab.value}
                                value={tab.value}
                                className="data-[state=active]:bg-white px-2 py-1 border border-transparent data-[state=active]:border-primary border-b-0 rounded-tr-md rounded-tl-md relative -bottom-px z-10 text-sm"
                                className="data-[state=active]:bg-white px-2 py-1 border border-transparent data-[state=active]:border-primary border-b-0 rounded-tr-md rounded-tl-md relative -bottom-px z-10 text-sm select-none"
                            >
                                {tab.label}
                            </Tabs.Trigger>
                        ))}
                    </Tabs.List>
                    {tabs.map((tab) => (
                        <Tabs.Content data-scheme="primary" key={tab.value} value={tab.value} className="flex-1 h-full">
                          <ScrollArea className="@container bg-primary border border-primary rounded-md">
                            <div className="p-4 @2xl:p-6">
                            {tab.content}
                            </div>
                          </ScrollArea>
                        </Tabs.Content>
                    ))}
                </Tabs.Root>
                {children}
                </>
    )
}
