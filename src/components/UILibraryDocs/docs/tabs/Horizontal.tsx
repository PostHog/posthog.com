import React from 'react'
import { Tabs } from 'components/UI/Tabs'

export default function TabsHorizontal(): JSX.Element {
    return (
        <Tabs.Root defaultValue="overview">
            <Tabs.List>
                <Tabs.Tab value="overview">Overview</Tabs.Tab>
                <Tabs.Tab value="pricing">Pricing</Tabs.Tab>
                <Tabs.Tab value="docs">Docs</Tabs.Tab>
            </Tabs.List>
            <Tabs.Panel value="overview" className="px-1">
                The overview panel.
            </Tabs.Panel>
            <Tabs.Panel value="pricing" className="flex flex-col gap-2 px-1">
                <p className="m-0">The pricing panel is taller than the others.</p>
                <p className="m-0">Every product has a free tier, and you pay only for what you use after it.</p>
                <p className="m-0">Switch tabs to see the height change.</p>
            </Tabs.Panel>
            <Tabs.Panel value="docs" className="px-1">
                The docs panel.
            </Tabs.Panel>
        </Tabs.Root>
    )
}
