import React from 'react'
import { Snippet } from 'components/UI/Snippet'
import type { ComponentDoc } from '../../types'
import AppearanceStates from './AppearanceStates'
import appearanceStatesSource from '!!../../rawSourceLoader!./AppearanceStates.tsx?raw'
import Appearances from './Appearances'
import appearancesSource from '!!../../rawSourceLoader!./Appearances.tsx?raw'
import States from './States'
import statesSource from '!!../../rawSourceLoader!./States.tsx?raw'
import Sizes from './Sizes'
import sizesSource from '!!../../rawSourceLoader!./Sizes.tsx?raw'
import Controlled from './Controlled'
import controlledSource from '!!../../rawSourceLoader!./Controlled.tsx?raw'

export const doc: ComponentDoc = {
    slug: 'search-input',
    importPath: 'components/UI/SearchInput',
    importNames: ['SearchInput'],
    sourcePath: 'src/components/UI/SearchInput',
    apiNote:
        'SearchInput accepts Input props except render. Its ref points to the input. className styles the outer field.',
    examples: [
        {
            id: 'states',
            title: 'Loading, disabled, and read-only',
            description: 'The spinner replaces the search icon. Disabled and read-only fields cannot clear.',
            Component: States,
            source: statesSource,
        },
        {
            id: 'sizes',
            title: 'Sizes',
            description: 'Use the same sizes as other fields.',
            Component: Sizes,
            source: sizesSource,
        },
        {
            id: 'controlled',
            title: 'Filter events',
            description: 'Use onValueChange for text changes and clear actions.',
            Component: Controlled,
            source: controlledSource,
        },
        {
            id: 'appearances',
            title: 'Appearances',
            description:
                'Inset and line match the other fields. Pill is a round search bar for the top of a list or a page. Floating is liquid glass for a search bar over images or content.',
            Component: Appearances,
            source: appearancesSource,
        },
        {
            id: 'field-states',
            title: 'States',
            description:
                'Empty, filled, invalid, and disabled, in both appearances. Hover and focus the fields to see those states.',
            Component: AppearanceStates,
            source: appearanceStatesSource,
        },
    ],
    notes: [
        <>
            Give the field a visible label or an <Snippet.Inline>{'aria-label'}</Snippet.Inline>. A placeholder is not a
            label.
        </>,
        'Pick the appearance by place: inset in forms, line for light or inline filters, pill for a search bar above a list, and floating over images or content.',
        'The shortcut hint is only a hint. Register the shortcut yourself.',
    ],
    props: [
        {
            component: 'SearchInput',
            rows: [
                {
                    name: 'size',
                    type: "'sm' | 'md' | 'lg'",
                    defaultValue: "'md'",
                    description: 'Sets the height to 26, 36, or 44 pixels.',
                },
                {
                    name: 'appearance',
                    type: "'inset' | 'line' | 'pill' | 'floating'",
                    defaultValue: "'inset'",
                    description:
                        'Sets the field shape. Use inset in forms, line for light or inline filters, pill for a search bar that stands alone above a list, and floating for a search bar over images or content.',
                },
                {
                    name: 'value / defaultValue',
                    type: 'string',
                    description: 'Sets controlled text or initial uncontrolled text.',
                },
                {
                    name: 'onValueChange',
                    type: '(value: string) => void',
                    description: 'Receives the text after typing or clearing.',
                },
                {
                    name: 'loading',
                    type: 'boolean',
                    defaultValue: 'false',
                    description: 'Shows Spinner in place of the search icon.',
                },
                {
                    name: 'loadingLabel / clearLabel',
                    type: 'string',
                    defaultValue: "'Searching' / 'Clear search'",
                    description: 'Sets the accessible status and button labels.',
                },
                {
                    name: 'shortcut',
                    type: 'readonly string[]',
                    description: 'Shows Kbd.Shortcut while the input is empty and unfocused.',
                },
                { name: 'inputClassName', type: 'string', description: 'Adds classes to the input element.' },
            ],
        },
    ],
}
