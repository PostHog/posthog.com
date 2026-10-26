import React from 'react'
import { Tabs } from 'components/UI/Tabs'

export default function UnderlineVertical(): JSX.Element {
    return (
        <Tabs.Root appearance="underline" defaultValue="overview" orientation="vertical">
            <Tabs.List>
                <Tabs.Tab value="overview">Overview</Tabs.Tab>
                <Tabs.Tab value="pricing">Pricing</Tabs.Tab>
                <Tabs.Tab value="docs">Docs</Tabs.Tab>
            </Tabs.List>
            <Tabs.Panel value="overview" className="p-1">
                The overview panel.
            </Tabs.Panel>
            <Tabs.Panel value="pricing" className="p-1">
                The pricing panel.
            </Tabs.Panel>
            <Tabs.Panel value="docs" className="p-1">
                The docs panel.
            </Tabs.Panel>
        </Tabs.Root>
    )
}
