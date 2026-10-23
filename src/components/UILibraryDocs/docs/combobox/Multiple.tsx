import React from 'react'
import { Combobox } from 'components/UI/Combobox'
import { Field } from 'components/UI/Field'

const posthogProducts = [
    'Product analytics',
    'Web analytics',
    'Session replay',
    'Feature flags',
    'Experiments',
    'Surveys',
    'Error tracking',
    'Data warehouse',
    'LLM analytics',
    'Workflows',
    'Logs',
    'Revenue analytics',
]

export default function ComboboxMultiple(): JSX.Element {
    return (
        <Field.Root className="max-w-sm">
            <Field.Label>Products</Field.Label>
            <Combobox.Root items={posthogProducts} multiple defaultValue={['Product analytics', 'Feature flags']}>
                <Combobox.InputGroup>
                    <Combobox.Chips>
                        <Combobox.Value>
                            {(selected: string[]) => (
                                <>
                                    {selected.map((product) => (
                                        <Combobox.Chip key={product} aria-label={product}>
                                            {product}
                                            <Combobox.ChipRemove aria-label={`Remove ${product}`} />
                                        </Combobox.Chip>
                                    ))}
                                    <Combobox.Input placeholder={selected.length > 0 ? '' : 'Add products'} />
                                </>
                            )}
                        </Combobox.Value>
                    </Combobox.Chips>
                    <Combobox.Clear />
                </Combobox.InputGroup>
                <Combobox.Popup>
                    <Combobox.Empty />
                    <Combobox.List>
                        {(product: string) => (
                            <Combobox.Item key={product} value={product}>
                                {product}
                            </Combobox.Item>
                        )}
                    </Combobox.List>
                </Combobox.Popup>
            </Combobox.Root>
        </Field.Root>
    )
}
