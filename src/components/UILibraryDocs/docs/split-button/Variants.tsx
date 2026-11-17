import React from 'react'
import { SplitButton } from 'components/UI/SplitButton'
import { Menu } from 'components/UI/Menu'
import { DemoRow, DemoRows } from 'components/UILibraryDocs/DemoLayout'

const looks = [
    { label: 'raised primary', rowLabel: 'primary · main path', appearance: 'raised', variant: 'primary' },
    { label: 'raised secondary', rowLabel: 'raised · default', appearance: 'raised', variant: 'secondary' },
    { label: 'raised danger', rowLabel: 'danger · final delete', appearance: 'raised', variant: 'danger' },
    { label: 'outline', rowLabel: 'outline · beside raised', appearance: 'outline', variant: 'secondary' },
    { label: 'flat', rowLabel: 'flat · toolbars', appearance: 'flat', variant: 'secondary' },
] as const

const sizes = ['sm', 'md', 'lg'] as const

export default function Variants(): JSX.Element {
    return (
        <DemoRows>
            {looks.map(({ label, rowLabel, appearance, variant }) => (
                <DemoRow key={label} label={rowLabel}>
                    {sizes.map((size) => (
                        <SplitButton.Root
                            key={size}
                            appearance={appearance}
                            variant={variant}
                            size={size}
                            aria-label={`${label} ${size} save actions`}
                        >
                            <SplitButton.Button>Save</SplitButton.Button>
                            <SplitButton.Trigger aria-label={`More ${label} ${size} save actions`} />
                            <SplitButton.Popup>
                                <Menu.Item>Save as draft</Menu.Item>
                                <Menu.Item>Save and publish</Menu.Item>
                            </SplitButton.Popup>
                        </SplitButton.Root>
                    ))}
                </DemoRow>
            ))}
        </DemoRows>
    )
}
