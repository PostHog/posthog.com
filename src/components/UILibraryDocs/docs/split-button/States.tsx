import React from 'react'
import { SplitButton } from 'components/UI/SplitButton'
import { Menu } from 'components/UI/Menu'
import { DemoRow, DemoRows } from 'components/UILibraryDocs/DemoLayout'

export default function States(): JSX.Element {
    return (
        <DemoRows>
            <DemoRow label="Disabled">
                <SplitButton.Root disabled aria-label="Unavailable save actions">
                    <SplitButton.Button>Save</SplitButton.Button>
                    <SplitButton.Trigger aria-label="More save actions" />
                    <SplitButton.Popup>
                        <Menu.Item>Save as draft</Menu.Item>
                    </SplitButton.Popup>
                </SplitButton.Root>
            </DemoRow>
            <DemoRow label="Loading">
                <SplitButton.Root variant="primary" aria-label="Pending save actions">
                    <SplitButton.Button loading>Save</SplitButton.Button>
                    <SplitButton.Trigger aria-label="More save actions" />
                    <SplitButton.Popup>
                        <Menu.Item>Save as draft</Menu.Item>
                    </SplitButton.Popup>
                </SplitButton.Root>
            </DemoRow>
            <DemoRow label="Main action disabled">
                <SplitButton.Root variant="danger" aria-label="Restricted delete actions">
                    <SplitButton.Button disabled>Delete insight</SplitButton.Button>
                    <SplitButton.Trigger aria-label="More delete actions" />
                    <SplitButton.Popup>
                        <Menu.Item>Archive insight</Menu.Item>
                    </SplitButton.Popup>
                </SplitButton.Root>
            </DemoRow>
        </DemoRows>
    )
}
