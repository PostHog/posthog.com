import React from 'react'
import { SplitButton } from 'components/UI/SplitButton'
import { Menu } from 'components/UI/Menu'

export default function States(): JSX.Element {
    return (
        <div className="flex flex-wrap gap-4">
            <SplitButton.Root variant="secondary" disabled aria-label="Unavailable save actions">
                <SplitButton.Button>Save</SplitButton.Button>
                <SplitButton.Trigger aria-label="More save actions" />
                <SplitButton.Popup>
                    <Menu.Item>Save as draft</Menu.Item>
                </SplitButton.Popup>
            </SplitButton.Root>
            <SplitButton.Root variant="primary" aria-label="Pending save actions">
                <SplitButton.Button loading>Save</SplitButton.Button>
                <SplitButton.Trigger aria-label="More save actions" />
                <SplitButton.Popup>
                    <Menu.Item>Save as draft</Menu.Item>
                </SplitButton.Popup>
            </SplitButton.Root>
            <SplitButton.Root variant="danger" aria-label="Restricted delete actions">
                <SplitButton.Button disabled>Delete insight</SplitButton.Button>
                <SplitButton.Trigger aria-label="More delete actions" />
                <SplitButton.Popup>
                    <Menu.Item>Archive insight</Menu.Item>
                </SplitButton.Popup>
            </SplitButton.Root>
        </div>
    )
}
