import React from 'react'
import { Menu } from 'components/UI/Menu'
import { Menubar } from 'components/UI/Menubar'

export default function Surfaces(): JSX.Element {
    return (
        <div className="flex flex-col gap-5">
            {(['plain', 'outlined', 'raised'] as const).map((appearance) => (
                <div key={appearance} className="flex flex-col gap-2">
                    <span className="text-sm font-medium capitalize">{appearance}</span>
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
                </div>
            ))}
        </div>
    )
}
