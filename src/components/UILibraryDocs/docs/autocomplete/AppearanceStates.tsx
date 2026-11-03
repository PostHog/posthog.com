import React from 'react'
import { Autocomplete } from 'components/UI/Autocomplete'
import { Field } from 'components/UI/Field'
import type { FieldAppearance } from 'components/UI/styles'
import { DemoColumn, DemoColumns } from 'components/UILibraryDocs/DemoLayout'

const docsPages = ['Capture events', 'Identify users', 'Create a funnel', 'Build a dashboard', 'Watch recordings']

function DocsAutocomplete({
    appearance,
    defaultValue,
}: {
    appearance: FieldAppearance
    defaultValue?: string
}): JSX.Element {
    return (
        <Autocomplete.Root items={docsPages} defaultValue={defaultValue}>
            <Autocomplete.InputGroup appearance={appearance}>
                <Autocomplete.Input placeholder="e.g. funnel" />
                <Autocomplete.Clear />
            </Autocomplete.InputGroup>
            <Autocomplete.Popup>
                <Autocomplete.Empty>No results</Autocomplete.Empty>
                <Autocomplete.List>
                    {(item: string) => (
                        <Autocomplete.Item key={item} value={item}>
                            {item}
                        </Autocomplete.Item>
                    )}
                </Autocomplete.List>
            </Autocomplete.Popup>
        </Autocomplete.Root>
    )
}

function StateColumn({ appearance }: { appearance: FieldAppearance }): JSX.Element {
    return (
        <div className="flex flex-col gap-5">
            <Field.Root>
                <Field.Label>Empty</Field.Label>
                <DocsAutocomplete appearance={appearance} />
            </Field.Root>
            <Field.Root>
                <Field.Label>Filled</Field.Label>
                <DocsAutocomplete appearance={appearance} defaultValue="Create a funnel" />
            </Field.Root>
            <Field.Root invalid>
                <Field.Label>Invalid</Field.Label>
                <DocsAutocomplete appearance={appearance} defaultValue="Old dashboards" />
                <Field.Error match>No page has this title.</Field.Error>
            </Field.Root>
            <Field.Root disabled>
                <Field.Label>Disabled</Field.Label>
                <DocsAutocomplete appearance={appearance} defaultValue="Create a funnel" />
            </Field.Root>
        </div>
    )
}

export default function States(): JSX.Element {
    return (
        <DemoColumns>
            <DemoColumn label="Inset (default)">
                <StateColumn appearance="inset" />
            </DemoColumn>
            <DemoColumn label="Line">
                <StateColumn appearance="line" />
            </DemoColumn>
        </DemoColumns>
    )
}
