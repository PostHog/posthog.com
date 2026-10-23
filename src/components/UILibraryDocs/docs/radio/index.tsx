import React from 'react'
import Link from 'components/Link'
import type { ComponentDoc } from '../../types'
import Basic from './Basic'
import basicSource from '!!../../rawSourceLoader!./Basic.tsx?raw'
import Controlled from './Controlled'
import controlledSource from '!!../../rawSourceLoader!./Controlled.tsx?raw'
import Disabled from './Disabled'
import disabledSource from '!!../../rawSourceLoader!./Disabled.tsx?raw'

export const doc: ComponentDoc = {
    slug: 'radio',
    importPath: 'components/UI/Radio',
    importNames: ['Radio', 'RadioGroup'],
    sourcePath: 'src/components/UI/Radio',
    baseUi: [
        { label: 'Base UI Radio', url: 'https://base-ui.com/react/components/radio' },
        { label: 'Base UI Radio Group', url: 'https://base-ui.com/react/components/radio-group' },
    ],
    examples: [
        {
            id: 'basic',
            title: 'Radio group',
            description:
                'Put each Radio.Root in a RadioGroup, and give each radio a value. The user can select one value.',
            Component: Basic,
            source: basicSource,
        },
        {
            id: 'controlled',
            title: 'Controlled',
            description: 'Pass value and onValueChange to RadioGroup to keep the value in your component.',
            Component: Controlled,
            source: controlledSource,
        },
        {
            id: 'disabled',
            title: 'Disabled',
            description:
                'Set disabled on a Radio.Root to disable one option, or on RadioGroup to disable all options. Add text-muted to the label yourself.',
            Component: Disabled,
            source: disabledSource,
        },
    ],
    notes: [
        <>
            Give the <code>RadioGroup</code> an accessible name. Use <code>aria-label</code>, or{' '}
            <code>aria-labelledby</code> with the ID of a visible heading.
        </>,
        <>
            Put <code>Radio.Root</code> and its text in a <code>{'<label>'}</code>. Then a click on the text selects the
            radio.
        </>,
        <>
            <code>Radio.Indicator</code> stays mounted, so a change of value changes one attribute and the DOM does not
            change. The dot scales in and out with a CSS transition.
        </>,
        <>
            For one option that the user turns on or off, use a <Link to="/components/ui/checkbox">Checkbox</Link> or a{' '}
            <Link to="/components/ui/switch">Switch</Link>.
        </>,
    ],
    props: [
        {
            component: 'Radio.Indicator',
            rows: [
                {
                    name: 'keepMounted',
                    type: 'boolean',
                    defaultValue: 'true',
                    description:
                        'Keeps the dot in the DOM when the radio is not selected. The Base UI default is false.',
                },
            ],
        },
    ],
}
