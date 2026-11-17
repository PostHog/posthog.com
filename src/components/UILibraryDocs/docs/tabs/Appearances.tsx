import React from 'react'
import { Tabs } from 'components/UI/Tabs'
import type { ButtonAppearance } from 'components/UI/Button'
import { DemoRow, DemoRows } from 'components/UILibraryDocs/DemoLayout'

const appearances: { appearance: ButtonAppearance; label: string }[] = [
    { appearance: 'outline', label: 'outline · default' },
    { appearance: 'flat', label: 'flat' },
    { appearance: 'raised', label: 'raised' },
]

export default function TabsAppearances(): JSX.Element {
    return (
        <DemoRows>
            {appearances.map(({ appearance, label }) => (
                <DemoRow key={appearance} label={label}>
                    <Tabs.Root appearance={appearance} defaultValue="trends">
                        <Tabs.List aria-label={`${appearance} tabs`}>
                            <Tabs.Tab value="trends">Trends</Tabs.Tab>
                            <Tabs.Tab value="funnels">Funnels</Tabs.Tab>
                            <Tabs.Tab value="retention">Retention</Tabs.Tab>
                        </Tabs.List>
                    </Tabs.Root>
                </DemoRow>
            ))}
        </DemoRows>
    )
}
