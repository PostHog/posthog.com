import React from 'react'
import { Combobox } from 'components/UI/Combobox'
import { DemoRow, DemoRows } from 'components/UILibraryDocs/DemoLayout'
const items = ['First', 'Second', 'Third']

export default function Sizes(): JSX.Element {
    return (
        <DemoRows>
            {(['sm', 'md', 'lg'] as const).map((size) => (
                <DemoRow key={size} label={size}>
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
