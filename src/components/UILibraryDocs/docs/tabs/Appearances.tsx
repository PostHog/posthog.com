import React from 'react'
import { Tabs } from 'components/UI/Tabs'
import type { ButtonAppearance } from 'components/UI/Button'

const appearances: ButtonAppearance[] = ['flat', 'raised', 'outline']

export default function TabsAppearances(): JSX.Element {
    return (
        <div className="flex flex-col gap-4">
            {appearances.map((appearance) => (
                <Tabs.Root key={appearance} appearance={appearance} defaultValue="trends">
                    <Tabs.List aria-label={`${appearance} tabs`}>
                        <Tabs.Tab value="trends">Trends</Tabs.Tab>
                        <Tabs.Tab value="funnels">Funnels</Tabs.Tab>
                        <Tabs.Tab value="retention">Retention</Tabs.Tab>
                    </Tabs.List>
                </Tabs.Root>
            ))}
        </div>
    )
}
