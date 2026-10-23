import React from 'react'
import { Combobox } from 'components/UI/Combobox'
import { Button } from 'components/UI/Button'
const items = ['First', 'Second', 'Third']

export default function Sizes(): JSX.Element {
    return (
        <div className="flex flex-col gap-4">
            {(['sm', 'md', 'lg'] as const).map((size) => (
                <div key={size} className="flex flex-wrap items-start gap-2">
                    <Combobox.Root items={items}>
                        <Combobox.InputGroup size={size} className="max-w-xs">
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
                    <Button size={size} variant="secondary">
                        {size}
                    </Button>
                </div>
            ))}
        </div>
    )
}
