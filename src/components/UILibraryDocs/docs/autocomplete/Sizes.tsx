import React from 'react'
import { Autocomplete } from 'components/UI/Autocomplete'
import { Button } from 'components/UI/Button'
const items = ['First', 'Second', 'Third']

export default function Sizes(): JSX.Element {
    return (
        <div className="flex flex-col gap-4">
            {(['sm', 'md', 'lg'] as const).map((size) => (
                <div key={size} className="flex flex-wrap items-start gap-2">
                    <Autocomplete.Root items={items}>
                        <Autocomplete.InputGroup size={size} className="max-w-xs">
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
                    <Button size={size} variant="secondary">
                        {size}
                    </Button>
                </div>
            ))}
        </div>
    )
}
