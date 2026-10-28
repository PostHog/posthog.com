import React from 'react'
import { Snippet } from 'components/UI/Snippet'
import Link from 'components/Link'
import type { ComponentDoc } from '../../types'
import Basic from './Basic'
import basicSource from '!!../../rawSourceLoader!./Basic.tsx?raw'
import Variants from './Variants'
import variantsSource from '!!../../rawSourceLoader!./Variants.tsx?raw'
import States from './States'
import statesSource from '!!../../rawSourceLoader!./States.tsx?raw'

export const doc: ComponentDoc = {
    slug: 'split-button',
    importPath: 'components/UI/SplitButton',
    importNames: ['SplitButton'],
    imports: [{ path: 'components/UI/Menu', names: ['Menu'] }],
    sourcePath: 'src/components/UI/SplitButton',
    apiNote:
        'SplitButton composes ButtonGroup, Button, and Menu. Root accepts Base UI Menu root props. Button accepts library Button props. Trigger accepts Menu trigger props except render and children. Popup accepts Menu popup props.',
    baseUi: [{ label: 'Base UI Menu', url: 'https://base-ui.com/react/components/menu' }],
    examples: [
        {
            id: 'basic',
            title: 'Save with related actions',
            description: 'The main button saves the insight. The menu offers related save actions.',
            Component: Basic,
            source: basicSource,
        },
        {
            id: 'variants',
            title: 'Every variant and size',
            description:
                'Each appearance and variant in sm, md, and lg, from left to right. Each raised segment lifts on its own.',
            Component: Variants,
            source: variantsSource,
        },
        {
            id: 'states',
            title: 'States',
            description:
                'Set disabled on the root to block both parts. Set loading or disabled on the button to keep the menu usable.',
            Component: States,
            source: statesSource,
        },
    ],
    notes: [
        <>
            Use a split button when one action is the usual choice and a few related actions are less common. When no
            action is the default, use a <Link to="/components/ui/menu">Menu</Link>.
        </>,
        <>
            Set <Snippet.Inline>{'appearance'}</Snippet.Inline>, <Snippet.Inline>{'variant'}</Snippet.Inline>, and{' '}
            <Snippet.Inline>{'size'}</Snippet.Inline> on <Snippet.Inline>{'Root'}</Snippet.Inline>.
        </>,
        <>
            When a page has several split buttons, give each trigger a specific{' '}
            <Snippet.Inline>{'aria-label'}</Snippet.Inline>.
        </>,
    ],
    props: [
        {
            component: 'SplitButton.Root',
            rows: [
                {
                    name: 'appearance',
                    type: "'flat' | 'raised' | 'outline'",
                    defaultValue: "'raised'",
                    description: 'The shape: flat, raised 3D, or outlined. Sets it for every button in the group.',
                },
                {
                    name: 'variant',
                    type: "'primary' | 'secondary' | 'danger'",
                    defaultValue: "'secondary'",
                    description:
                        'The meaning and color: brand orange, neutral, or destructive red. Sets it for every button in the group.',
                },
                {
                    name: 'size',
                    type: "'sm' | 'md' | 'lg'",
                    defaultValue: "'md'",
                    description: 'Sets the size of both segments.',
                },
                {
                    name: 'disabled',
                    type: 'boolean',
                    defaultValue: 'false',
                    description: 'Disables the main action and the menu trigger.',
                },
                { name: 'className', type: 'string', description: 'Classes for the joined ButtonGroup.' },
            ],
        },
        {
            component: 'SplitButton.Button',
            rows: [
                {
                    name: 'loading',
                    type: 'boolean',
                    defaultValue: 'false',
                    description: 'Shows a spinner and blocks the main action.',
                },
            ],
        },
        {
            component: 'SplitButton.Trigger',
            rows: [
                {
                    name: 'aria-label',
                    type: 'string',
                    defaultValue: "'More actions'",
                    description: 'The accessible name of the menu trigger.',
                },
            ],
        },
        {
            component: 'SplitButton.Popup',
            rows: [
                {
                    name: 'align',
                    type: "'start' | 'center' | 'end'",
                    defaultValue: "'end'",
                    description: 'Aligns the menu with its trigger.',
                },
            ],
        },
    ],
}
