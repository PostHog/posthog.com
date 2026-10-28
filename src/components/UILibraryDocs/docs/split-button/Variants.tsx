import React from 'react'
import { SplitButton } from 'components/UI/SplitButton'
import { Menu } from 'components/UI/Menu'
import { DemoRow, DemoRows } from 'components/UILibraryDocs/DemoLayout'

const looks = [
    { label: 'raised primary', appearance: 'raised', variant: 'primary' },
    { label: 'raised secondary', appearance: 'raised', variant: 'secondary' },
    { label: 'raised danger', appearance: 'raised', variant: 'danger' },
    { label: 'outline', appearance: 'outline', variant: 'secondary' },
    { label: 'flat', appearance: 'flat', variant: 'secondary' },
] as const

const sizes = ['sm', 'md', 'lg'] as const

export default function Variants(): JSX.Element {
    return (
        <DemoRows>
            {looks.map(({ label, appearance, variant }) => (
                <DemoRow key={label} label={label}>
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
