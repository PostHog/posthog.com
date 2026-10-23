import React from 'react'
import { IconSearch } from '@posthog/icons'
import { Autocomplete } from 'components/UI/Autocomplete'
import { Field } from 'components/UI/Field'

type DocsSection = {
    value: string
    items: string[]
}

const docsSections: DocsSection[] = [
    {
        value: 'Product analytics',
        items: ['Capture events', 'Identify users', 'Create a funnel', 'Build a dashboard'],
    },
    {
        value: 'Session replay',
        items: ['Watch recordings', 'Mask sensitive data', 'Filter recordings'],
    },
    {
        value: 'Feature flags',
        items: ['Create a feature flag', 'Roll out to a cohort', 'Bootstrap flags'],
    },
]

export default function AutocompleteGroups(): JSX.Element {
    return (
        <Field.Root className="max-w-xs">
            <Field.Label>Search the docs</Field.Label>
            <Autocomplete.Root items={docsSections}>
                <Autocomplete.InputGroup>
                    <IconSearch className="ml-1.5 size-4 shrink-0 self-center text-secondary" />
                    <Autocomplete.Input placeholder="e.g. funnel" />
                    <Autocomplete.Clear />
                </Autocomplete.InputGroup>
                <Autocomplete.Popup>
                    <Autocomplete.Empty>No pages found</Autocomplete.Empty>
                    <Autocomplete.List>
                        {(section: DocsSection) => (
                            <Autocomplete.Group key={section.value} items={section.items}>
                                <Autocomplete.GroupLabel>{section.value}</Autocomplete.GroupLabel>
                                <Autocomplete.Collection>
                                    {(title: string) => (
                                        <Autocomplete.Item key={title} value={title}>
                                            {title}
                                        </Autocomplete.Item>
                                    )}
                                </Autocomplete.Collection>
                            </Autocomplete.Group>
                        )}
                    </Autocomplete.List>
                </Autocomplete.Popup>
            </Autocomplete.Root>
        </Field.Root>
    )
}
