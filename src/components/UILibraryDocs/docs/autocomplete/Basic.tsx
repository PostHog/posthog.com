import React from 'react'
import { IconSearch } from '@posthog/icons'
import { Autocomplete } from 'components/UI/Autocomplete'
import { Field } from 'components/UI/Field'

const docsPages = [
    'Capture events',
    'Identify users',
    'Create a funnel',
    'Build a dashboard',
    'Watch recordings',
    'Mask sensitive data',
    'Create a feature flag',
    'Roll out to a cohort',
]

export default function AutocompleteBasic(): JSX.Element {
    return (
        <Field.Root className="max-w-xs">
            <Field.Label>Search the docs</Field.Label>
            <Autocomplete.Root items={docsPages}>
                <Autocomplete.InputGroup>
                    <IconSearch className="ml-1.5 size-4 shrink-0 self-center text-secondary" />
                    <Autocomplete.Input placeholder="e.g. funnel" />
                    <Autocomplete.Clear />
                </Autocomplete.InputGroup>
                <Autocomplete.Popup>
                    <Autocomplete.Empty>No pages found</Autocomplete.Empty>
                    <Autocomplete.List>
                        {(title: string) => (
                            <Autocomplete.Item key={title} value={title}>
                                {title}
                            </Autocomplete.Item>
                        )}
                    </Autocomplete.List>
                </Autocomplete.Popup>
            </Autocomplete.Root>
        </Field.Root>
    )
}
