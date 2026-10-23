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

export default function ComboboxSingle(): JSX.Element {
    return (
        <Field.Root className="max-w-xs">
            <Field.Label>Product</Field.Label>
            <Combobox.Root items={posthogProducts} defaultValue="Session replay">
                <Combobox.InputGroup>
                    <Combobox.Input placeholder="e.g. Feature flags" />
                    <Combobox.Clear />
                </Combobox.InputGroup>
                <Combobox.Popup>
                    <Combobox.Empty>No products found</Combobox.Empty>
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
