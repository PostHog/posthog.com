import React from 'react'
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
            title: 'Single choice plans',
            description: 'Select one plan. The prices are examples.',
            Component: Plans,
            source: plansSource,
        },
        {
            id: 'products',
            title: 'Multiple choice products',
            description: 'Select more than one product.',
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
        'Group uses Base UI RadioGroup by default. multiple uses CheckboxGroup.',
        'Give Group an accessible name with aria-label or aria-labelledby.',
        'Use string values. Each value must be unique in its group.',
        'The whole card is a label. Do not put links or buttons inside Item.',
        'The grid changes with the container width. Base UI supplies keyboard and screen-reader behavior.',
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
