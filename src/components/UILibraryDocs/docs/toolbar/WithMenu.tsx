import React from 'react'
import { IconChevronDown, IconRedo, IconUndo } from '@posthog/icons'
import { Menu } from 'components/UI/Menu'
import { Toolbar } from 'components/UI/Toolbar'

export default function ToolbarWithMenu(): JSX.Element {
    return (
        <Toolbar.Root aria-label="Editor" className="max-w-xl">
            <Toolbar.Button aria-label="Undo">
                <IconUndo className="size-4" />
            </Toolbar.Button>
            <Toolbar.Button aria-label="Redo">
                <IconRedo className="size-4" />
            </Toolbar.Button>
            <Toolbar.Separator />
            <Menu.Root>
                <Toolbar.Button render={<Menu.Trigger />}>
                    Insert
                    <IconChevronDown className="size-4" />
                </Toolbar.Button>
                <Menu.Popup align="start">
                    <Menu.Item>Image</Menu.Item>
                    <Menu.Item>Table</Menu.Item>
                    <Menu.Item>Code block</Menu.Item>
                </Menu.Popup>
            </Menu.Root>
        </Toolbar.Root>
    )
}
