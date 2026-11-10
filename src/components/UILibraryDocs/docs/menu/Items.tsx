import React from 'react'
import { IconGear, IconPencil, IconShare, IconTrash } from '@posthog/icons'
import { Button } from 'components/UI/Button'
import { Menu } from 'components/UI/Menu'

export default function MenuItems(): JSX.Element {
    return (
        <Menu.Root>
            <Menu.Trigger render={<Button icon={<IconGear />} />}>Options</Menu.Trigger>
            <Menu.Popup>
                <Menu.Item>
                    <IconPencil className="size-4" />
                    Rename
                </Menu.Item>
                <Menu.Item>
                    <IconShare className="size-4" />
                    Share
                </Menu.Item>
                <Menu.Separator />
                <Menu.Item disabled>
                    <IconTrash className="size-4" />
                    Delete
                </Menu.Item>
            </Menu.Popup>
        </Menu.Root>
    )
}
