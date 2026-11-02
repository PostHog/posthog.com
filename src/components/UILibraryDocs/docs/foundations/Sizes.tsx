import React from 'react'
import { Button } from 'components/UI/Button'
import type { ButtonSize } from 'components/UI/Button'
import { Input } from 'components/UI/Input'
import { DemoRow, DemoRows } from 'components/UILibraryDocs/DemoLayout'

const sizes: { size: ButtonSize; label: string }[] = [
    { size: 'sm', label: 'sm · 26px' },
    { size: 'md', label: 'md · 36px' },
    { size: 'lg', label: 'lg · 44px' },
]

export default function Sizes(): JSX.Element {
    return (
        <DemoRows>
            {sizes.map(({ size, label }) => (
                <DemoRow key={size} label={label}>
                    <Input size={size} aria-label={`${size} field`} placeholder="Email" className="w-44" />
                    <Button size={size}>Subscribe</Button>
                    <Button size={size} appearance="outline">
                        Cancel
                    </Button>
                </DemoRow>
            ))}
        </DemoRows>
    )
}
