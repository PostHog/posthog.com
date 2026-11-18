import React from 'react'
import { ContextMenu } from 'components/UI/ContextMenu'

export default function ContextMenuBasic(): JSX.Element {
    return (
        <ContextMenu.Root>
            <ContextMenu.Trigger className="flex h-28 w-full select-none items-center justify-center rounded border border-dashed border-primary text-sm text-secondary">
                Right-click here
            </ContextMenu.Trigger>
            <ContextMenu.Popup>
                <ContextMenu.Item>Open in new window</ContextMenu.Item>
                <ContextMenu.Item>Copy link</ContextMenu.Item>
                <ContextMenu.Separator />
                <ContextMenu.Item disabled>Delete</ContextMenu.Item>
            </ContextMenu.Popup>
        </ContextMenu.Root>
    )
}
