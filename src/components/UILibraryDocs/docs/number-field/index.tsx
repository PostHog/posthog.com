import React from 'react'
import { Snippet } from 'components/UI/Snippet'
import Link from 'components/Link'
import type { ComponentDoc } from '../../types'
import AppearanceStates from './AppearanceStates'
import appearanceStatesSource from '!!../../rawSourceLoader!./AppearanceStates.tsx?raw'
import Basic from './Basic'
import basicSource from '!!../../rawSourceLoader!./Basic.tsx?raw'

import Sizes from './Sizes'
import sizesSource from '!!../../rawSourceLoader!./Sizes.tsx?raw'

export const doc: ComponentDoc = {
    slug: 'number-field',
    importPath: 'components/UI/NumberField',
    importNames: ['NumberField'],
    sourcePath: 'src/components/UI/NumberField',
    baseUi: [{ label: 'Base UI Number Field', url: 'https://base-ui.com/react/components/number-field' }],
    examples: [
        {
            id: 'basic',
            title: 'Basic',
            description:
                'Group shows the input and the step arrows. Put Field.Label in ScrubArea to make the label draggable.',
            Component: Basic,
            source: basicSource,
        },
        {
            id: 'sizes',
            title: 'Sizes',
            description: 'sm, md, and lg match the button heights: 26, 36, and 44 pixels.',
            Component: Sizes,
            source: sizesSource,
        },
        {
            id: 'states',
            title: 'States',
            description:
                'Inset is the default. Line shows only a bottom line, for light or inline editing. Set invalid or disabled on Field.Root for the other states.',
            Component: AppearanceStates,
            source: appearanceStatesSource,
        },
    ],
    notes: [
        <>
            Label the field with <Snippet.Inline>{'Field.Label'}</Snippet.Inline> inside{' '}
            <Snippet.Inline>{'Field.Root'}</Snippet.Inline>. Put the label in{' '}
            <Snippet.Inline>{'NumberField.ScrubArea'}</Snippet.Inline> to let users drag it to change the value.
        </>,
        <>
            For a value inside a range, where position matters more than the exact number, use{' '}
            <Link to="/components/ui/slider">Slider</Link>.
        </>,
    ],
    props: [
        {
            component: 'NumberField.Group',
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
                        'Sets the field shape. Line shows only a bottom line and no divider before the steppers.',
                },
                {
                    name: 'children',
                    type: 'ReactNode',
                    defaultValue: '<Input /><Steppers />',
                    description: 'The content of the field. The default is the input and a spin box.',
                },
            ],
        },
        {
            component: 'NumberField.Steppers',
            rows: [
                {
                    name: 'className',
                    type: 'string',
                    description: (
                        <>
                            Classes for the column that holds <Snippet.Inline>Increment</Snippet.Inline> and{' '}
                            <Snippet.Inline>Decrement</Snippet.Inline>. This part is not in Base UI.
                        </>
                    ),
                },
            ],
        },
        {
            component: 'NumberField.ScrubAreaCursor',
            rows: [
                {
                    name: 'children',
                    type: 'ReactNode',
                    description: 'The cursor that shows while the user drags. The default is a left and right arrow.',
                },
            ],
        },
    ],
}
