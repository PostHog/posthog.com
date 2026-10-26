import React from 'react'
import Link from 'components/Link'
import type { ComponentDoc } from '../../types'
import AppearanceStates from './AppearanceStates'
import appearanceStatesSource from '!!../../rawSourceLoader!./AppearanceStates.tsx?raw'
import AutoExpand from './AutoExpand'
import autoExpandSource from '!!../../rawSourceLoader!./AutoExpand.tsx?raw'
import Basic from './Basic'
import basicSource from '!!../../rawSourceLoader!./Basic.tsx?raw'
import Disabled from './Disabled'
import disabledSource from '!!../../rawSourceLoader!./Disabled.tsx?raw'

import Sizes from './Sizes'
import sizesSource from '!!../../rawSourceLoader!./Sizes.tsx?raw'

export const doc: ComponentDoc = {
    slug: 'textarea',
    importPath: 'components/UI/Textarea',
    importNames: ['Textarea'],
    sourcePath: 'src/components/UI/Textarea',
    baseUi: [{ label: 'Base UI Input', url: 'https://base-ui.com/react/components/input' }],
    examples: [
        {
            id: 'basic',
            title: 'Basic',
            description:
                'Put Textarea in Field.Root, like Field.Control. The box shows three rows. The user can drag it taller.',
            Component: Basic,
            source: basicSource,
        },
        {
            id: 'auto-expand',
            title: 'Grow with the content',
            description:
                'Set autoExpand. The box grows as the user types, up to max-h-80. Then it scrolls. The user cannot resize it.',
            Component: AutoExpand,
            source: autoExpandSource,
        },
        {
            id: 'sizes',
            title: 'Sizes',
            description: 'Select sm, md, or lg. The button uses the same size.',
            Component: Sizes,
            source: sizesSource,
        },
        {
            id: 'disabled',
            title: 'Disabled',
            description: 'Set disabled on Field.Root. The box gets a dashed border and a hatched fill.',
            Component: Disabled,
            source: disabledSource,
        },
        {
            id: 'states',
            title: 'States',
            description:
                'Empty, filled, invalid, and disabled, in both appearances. Hover and focus the fields to see those states.',
            Component: AppearanceStates,
            source: appearanceStatesSource,
        },
    ],
    notes: [
        <>
            <code>Textarea</code> is a Base UI <code>Input</code> that renders a <code>{'<textarea>'}</code>. Inside{' '}
            <code>Field.Root</code>, it gets the label, the validation, and the error state of the field. See{' '}
            <Link to="/components/ui/field">Field</Link>.
        </>,
        <>
            <code>autoExpand</code> uses the CSS <code>field-sizing: content</code> property, with no JavaScript.
        </>,
        <>
            Browsers older than Chrome 123, Safari 26.2, and Firefox 152 do not support <code>field-sizing</code>. In
            these browsers, an <code>autoExpand</code> box keeps a fixed height and scrolls.
        </>,
    ],
    props: [
        {
            component: 'Textarea',
            rows: [
                {
                    name: 'size',
                    type: "'sm' | 'md' | 'lg'",
                    defaultValue: "'md'",
                    description: 'Sets the text size, padding, and control height.',
                },
                {
                    name: 'appearance',
                    type: "'inset' | 'line'",
                    defaultValue: "'inset'",
                    description:
                        'Sets the field shape. Use line for a lighter form that must not look like a card or a section.',
                },
                {
                    name: 'autoExpand',
                    type: 'boolean',
                    defaultValue: 'false',
                    description: 'Makes the box grow with its content, up to max-h-80. The user cannot resize the box.',
                },
                {
                    name: 'rows',
                    type: 'number',
                    defaultValue: '3',
                    description: 'The number of visible lines. An autoExpand box ignores it.',
                },
            ],
        },
    ],
}
