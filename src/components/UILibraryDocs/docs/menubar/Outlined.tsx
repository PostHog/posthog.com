import React from 'react'
import { Menu } from 'components/UI/Menu'
import { Menubar } from 'components/UI/Menubar'

const menubarMenus = [
    { label: 'File', items: ['New window', 'Open…', 'Save'] },
    { label: 'Edit', items: ['Undo', 'Redo', 'Find'] },
    { label: 'View', items: ['Zoom in', 'Zoom out', 'Full screen'] },
]

export default function MenubarOutlined(): JSX.Element {
    return (
        <Menubar.Root surface="outlined">
            {menubarMenus.map((menu) => (
                <Menu.Root key={menu.label}>
                    <Menubar.Trigger>{menu.label}</Menubar.Trigger>
                    <Menu.Popup>
                        {menu.items.map((item) => (
                            <Menu.Item key={item}>{item}</Menu.Item>
                        ))}
                    </Menu.Popup>
                </Menu.Root>
            ))}
        </Menubar.Root>
    )
}
