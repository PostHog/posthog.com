import React from 'react'
import { Button } from 'components/UI/Button'
import { Menu } from 'components/UI/Menu'

export default function MenuSubmenu(): JSX.Element {
    return (
        <Menu.Root>
            <Menu.Trigger render={<Button />}>Insight</Menu.Trigger>
            <Menu.Popup>
                <Menu.Item>Duplicate</Menu.Item>
                <Menu.SubmenuRoot>
                    <Menu.SubmenuTrigger>Move to</Menu.SubmenuTrigger>
                    <Menu.Popup side="right" align="start" sideOffset={0} alignOffset={-5}>
                        <Menu.Item>Product analytics</Menu.Item>
                        <Menu.Item>Web analytics</Menu.Item>
                    </Menu.Popup>
                </Menu.SubmenuRoot>
            </Menu.Popup>
        </Menu.Root>
    )
}
