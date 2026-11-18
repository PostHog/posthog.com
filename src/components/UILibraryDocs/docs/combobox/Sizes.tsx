import React from 'react'
import { Combobox } from 'components/UI/Combobox'
import { DemoRow, DemoRows } from 'components/UILibraryDocs/DemoLayout'
const items = ['First', 'Second', 'Third']

const sizes = [
    { size: 'sm', label: 'sm · dense UI' },
    { size: 'md', label: 'md · default' },
    { size: 'lg', label: 'lg · hero field' },
] as const

export default function Sizes(): JSX.Element {
    return (
        <DemoRows>
            {sizes.map(({ size, label }) => (
                <DemoRow key={size} label={label}>
                    <Combobox.Root items={items}>
                        <Combobox.InputGroup size={size} className="w-full max-w-xs">
                            <Combobox.Input aria-label={`${size} options`} placeholder="Choose an option" />
                            <Combobox.Clear />
                        </Combobox.InputGroup>
                        <Combobox.Popup>
                            <Combobox.Empty />
                            <Combobox.List>
                                {(item: string) => (
                                    <Combobox.Item key={item} value={item}>
                                        {item}
                                    </Combobox.Item>
                                )}
                            </Combobox.List>
                        </Combobox.Popup>
                    </Combobox.Root>
                </DemoRow>
            ))}
        </DemoRows>
    )
}
