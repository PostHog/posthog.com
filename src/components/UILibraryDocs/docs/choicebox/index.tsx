import React from 'react'
import { Snippet } from 'components/UI/Snippet'
import type { ComponentDoc } from '../../types'
import Plans from './Plans'
import plansSource from '!!../../rawSourceLoader!./Plans.tsx?raw'
import Products from './Products'
import productsSource from '!!../../rawSourceLoader!./Products.tsx?raw'
import Disabled from './Disabled'
import disabledSource from '!!../../rawSourceLoader!./Disabled.tsx?raw'

export const doc: ComponentDoc = {
    slug: 'choicebox',
    importPath: 'components/UI/Choicebox',
    importNames: ['Choicebox'],
    sourcePath: 'src/components/UI/Choicebox',
    apiNote: <>Choicebox is a site component. Its parts accept standard HTML props unless listed below.</>,
    baseUi: [
        { label: 'Base UI Radio', url: 'https://base-ui.com/react/components/radio' },
        { label: 'Base UI Checkbox group', url: 'https://base-ui.com/react/components/checkbox-group' },
    ],
    examples: [
        {
            id: 'plans',
            title: 'Single choice',
            description: 'The user selects one item.',
            Component: Plans,
            source: plansSource,
        },
        {
            id: 'products',
            title: 'Multiple choice',
            description: 'Set multiple to let the user select more than one item.',
            Component: Products,
            source: productsSource,
        },
        {
            id: 'disabled',
            title: 'Disabled item',
            description: 'An unavailable item has a dashed border and a hatched fill.',
            Component: Disabled,
            source: disabledSource,
        },
    ],
    notes: [
        <>
            Use Choicebox when each option needs a description or more room than a radio label. Set{' '}
            <Snippet.Inline>{'multiple'}</Snippet.Inline> to allow more than one choice.
        </>,
        <>
            Name the group with <Snippet.Inline>{'aria-label'}</Snippet.Inline> or{' '}
            <Snippet.Inline>{'aria-labelledby'}</Snippet.Inline>.
        </>,
        'The whole card is a label. Do not put links or buttons in an item.',
    ],
    props: [
        {
            component: 'Choicebox.Group',
            rows: [
                {
                    name: 'multiple',
                    type: 'boolean',
                    defaultValue: 'false',
                    description: 'Allows more than one selected item.',
                },
                {
                    name: 'value',
                    type: 'string | string[]',
                    description: 'Controls the selection. Use an array when multiple is true.',
                },
                { name: 'defaultValue', type: 'string | string[]', description: 'Sets the initial selection.' },
                {
                    name: 'onValueChange',
                    type: '(value, eventDetails) => void',
                    description: 'Receives the value and Base UI event details.',
                },
            ],
        },
        {
            component: 'Choicebox.Item',
            rows: [
                { name: 'value', type: 'string', description: 'Identifies the item in its group.' },
                {
                    name: 'disabled',
                    type: 'boolean',
                    defaultValue: 'false',
                    description: 'Prevents selection of the item.',
                },
            ],
        },
    ],
}
