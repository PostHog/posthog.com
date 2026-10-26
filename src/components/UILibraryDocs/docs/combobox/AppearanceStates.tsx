import React from 'react'
import { Combobox } from 'components/UI/Combobox'
import { Field } from 'components/UI/Field'
import type { FieldAppearance } from 'components/UI/styles'

const posthogProducts = [
    'Product analytics',
    'Session replay',
    'Feature flags',
    'Experiments',
    'Surveys',
    'Data warehouse',
]

function ProductCombobox({
    appearance,
    defaultValue,
}: {
    appearance: FieldAppearance
    defaultValue?: string
}): JSX.Element {
    return (
        <Combobox.Root items={posthogProducts} defaultValue={defaultValue}>
            <Combobox.InputGroup appearance={appearance}>
                <Combobox.Input placeholder="e.g. Feature flags" />
                <Combobox.Clear />
            </Combobox.InputGroup>
            <Combobox.Popup>
                <Combobox.Empty>No results</Combobox.Empty>
                <Combobox.List>
                    {(item: string) => (
                        <Combobox.Item key={item} value={item}>
                            {item}
                        </Combobox.Item>
                    )}
                </Combobox.List>
            </Combobox.Popup>
        </Combobox.Root>
    )
}

function StateColumn({ appearance }: { appearance: FieldAppearance }): JSX.Element {
    return (
        <div className="flex flex-col gap-5">
            <Field.Root>
                <Field.Label>Empty</Field.Label>
                <ProductCombobox appearance={appearance} />
            </Field.Root>
            <Field.Root>
                <Field.Label>Filled</Field.Label>
                <ProductCombobox appearance={appearance} defaultValue="Session replay" />
            </Field.Root>
            <Field.Root invalid>
                <Field.Label>Invalid</Field.Label>
                <ProductCombobox appearance={appearance} defaultValue="Data warehouse" />
                <Field.Error match>Data warehouse is not on this plan.</Field.Error>
            </Field.Root>
            <Field.Root disabled>
                <Field.Label>Disabled</Field.Label>
                <ProductCombobox appearance={appearance} defaultValue="Session replay" />
            </Field.Root>
        </div>
    )
}

export default function States(): JSX.Element {
    return (
        <div className="grid gap-8 @2xl:grid-cols-2">
            <div className="flex flex-col gap-3">
                <span className="text-sm font-bold">Inset (default)</span>
                <StateColumn appearance="inset" />
            </div>
            <div className="flex flex-col gap-3">
                <span className="text-sm font-bold">Line</span>
                <StateColumn appearance="line" />
            </div>
        </div>
    )
}
