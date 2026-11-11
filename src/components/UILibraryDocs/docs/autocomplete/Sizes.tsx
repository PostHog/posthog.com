import React from 'react'
import { Autocomplete } from 'components/UI/Autocomplete'
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
                    <Autocomplete.Root items={items}>
                        <Autocomplete.InputGroup size={size} className="w-full max-w-xs">
                            <Autocomplete.Input aria-label={`${size} options`} placeholder="Choose an option" />
                            <Autocomplete.Clear />
                        </Autocomplete.InputGroup>
                        <Autocomplete.Popup>
                            <Autocomplete.Empty />
                            <Autocomplete.List>
                                {(item: string) => (
                                    <Autocomplete.Item key={item} value={item}>
                                        {item}
                                    </Autocomplete.Item>
                                )}
                            </Autocomplete.List>
                        </Autocomplete.Popup>
                    </Autocomplete.Root>
                </DemoRow>
            ))}
        </DemoRows>
    )
}
