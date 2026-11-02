import React from 'react'
import { Snippet } from 'components/UI/Snippet'
import Link from 'components/Link'
import type { ComponentDoc } from '../../types'
import Controlled from './Controlled'
import controlledSource from '!!../../rawSourceLoader!./Controlled.tsx?raw'
import Disabled from './Disabled'
import disabledSource from '!!../../rawSourceLoader!./Disabled.tsx?raw'
import Group from './Group'
import groupSource from '!!../../rawSourceLoader!./Group.tsx?raw'
import States from './States'
import statesSource from '!!../../rawSourceLoader!./States.tsx?raw'

export const doc: ComponentDoc = {
    slug: 'checkbox',
    importPath: 'components/UI/Checkbox',
    importNames: ['Checkbox', 'CheckboxGroup'],
    sourcePath: 'src/components/UI/Checkbox',
    baseUi: [
        { label: 'Base UI Checkbox', url: 'https://base-ui.com/react/components/checkbox' },
        { label: 'Base UI Checkbox Group', url: 'https://base-ui.com/react/components/checkbox-group' },
    ],
    examples: [
        {
            id: 'states',
            title: 'States',
            description:
                'A checkbox is unchecked, checked, or indeterminate. Checkbox.Indicator draws a check mark or a dash.',
            Component: States,
            source: statesSource,
        },
        {
            id: 'controlled',
            title: 'Controlled',
            description: 'Pass checked and onCheckedChange to keep the state in your component.',
            Component: Controlled,
            source: controlledSource,
        },
        {
            id: 'disabled',
            title: 'Disabled',
            description: 'A disabled box has 50% opacity. Add text-muted to the label yourself.',
            Component: Disabled,
            source: disabledSource,
        },
        {
            id: 'group',
            title: 'Checkbox group',
            description:
                'CheckboxGroup keeps the values of the checked boxes in one array. The parent checkbox checks or clears all items.',
            Component: Group,
            source: groupSource,
        },
    ],
    notes: [
        <>
            Use checkboxes for choices that a form saves on submit. For a setting that applies at once, use{' '}
            <Link to="/components/ui/switch">Switch</Link>.
        </>,
        <>
            Put <Snippet.Inline>{'Checkbox.Root'}</Snippet.Inline> and its text in a{' '}
            <Snippet.Inline>{'<label>'}</Snippet.Inline>, so a click on the text toggles it.
        </>,
        <>
            For select all, pass <Snippet.Inline>{'allValues'}</Snippet.Inline> to{' '}
            <Snippet.Inline>{'CheckboxGroup'}</Snippet.Inline> and add a{' '}
            <Snippet.Inline>{'Checkbox.Root'}</Snippet.Inline> with <Snippet.Inline>{'parent'}</Snippet.Inline>.
        </>,
    ],
    props: [
        {
            component: 'Checkbox.Indicator',
            rows: [
                {
                    name: 'keepMounted',
                    type: 'boolean',
                    defaultValue: 'true',
                    description:
                        'Keeps the indicator in the DOM when the box is unchecked. The Base UI default is false.',
                },
                {
                    name: 'children',
                    type: 'ReactNode',
                    defaultValue: 'A check mark and a dash',
                    description: 'The glyphs in the box. Pass children to replace them.',
                },
            ],
        },
    ],
}
