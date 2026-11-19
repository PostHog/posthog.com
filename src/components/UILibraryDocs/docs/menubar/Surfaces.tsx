import React from 'react'
import { Menu } from 'components/UI/Menu'
import { Menubar } from 'components/UI/Menubar'
import { DemoRow, DemoRows } from 'components/UILibraryDocs/DemoLayout'

const appearances = [
    { appearance: 'raised', label: 'raised · on window' },
    { appearance: 'outlined', label: 'outlined · flat region' },
    { appearance: 'plain', label: 'plain · in a card' },
] as const

export default function Surfaces(): JSX.Element {
    return (
        <DemoRows>
            {appearances.map(({ appearance, label }) => (
                <DemoRow key={appearance} label={label}>
                    <Menubar.Root appearance={appearance} aria-label={`${appearance} insight commands`}>
                        <Menu.Root>
                            <Menubar.Trigger>Insight</Menubar.Trigger>
                            <Menu.Popup>
                                <Menu.Item>Save insight</Menu.Item>
                                <Menu.Separator />
                                <Menu.Item>Export results</Menu.Item>
                            </Menu.Popup>
                        </Menu.Root>
                        <Menu.Root>
                            <Menubar.Trigger>View</Menubar.Trigger>
                            <Menu.Popup>
                                <Menu.Item>Show dashboard</Menu.Item>
                            </Menu.Popup>
                        </Menu.Root>
                    </Menubar.Root>
                </DemoRow>
            ))}
        </DemoRows>
    )
}
