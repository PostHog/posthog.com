import React from 'react'
import { Tabs } from 'components/UI/Tabs'

export default function TabsVertical(): JSX.Element {
    return (
        <Tabs.Root defaultValue="general" orientation="vertical">
            <Tabs.List className="min-w-40">
                <Tabs.Tab value="general">General</Tabs.Tab>
                <Tabs.Tab value="billing">Billing</Tabs.Tab>
                <Tabs.Tab value="danger" disabled>
                    Danger zone
                </Tabs.Tab>
            </Tabs.List>
            <Tabs.Panel value="general" className="p-1">
                The general panel.
            </Tabs.Panel>
            <Tabs.Panel value="billing" className="p-1">
                The billing panel.
            </Tabs.Panel>
        </Tabs.Root>
    )
}
