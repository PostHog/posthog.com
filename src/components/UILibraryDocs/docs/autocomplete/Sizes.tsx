import React from 'react'
import { Autocomplete } from 'components/UI/Autocomplete'
import { DemoRow, DemoRows } from 'components/UILibraryDocs/DemoLayout'
const items = ['First', 'Second', 'Third']

export default function Sizes(): JSX.Element {
    return (
        <DemoRows>
            {(['sm', 'md', 'lg'] as const).map((size) => (
                <DemoRow key={size} label={size}>
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
