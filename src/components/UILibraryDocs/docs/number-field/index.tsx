import React from 'react'
import Link from 'components/Link'
import type { ComponentDoc } from '../../types'
import Basic from './Basic'
import basicSource from '!!../../rawSourceLoader!./Basic.tsx?raw'
import Disabled from './Disabled'
import disabledSource from '!!../../rawSourceLoader!./Disabled.tsx?raw'

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
                'Group shows the input and the step arrows. The label is in ScrubArea, so the user can drag it to change the value.',
            Component: Basic,
            source: basicSource,
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
            description:
                'Set disabled on Field.Root. The input, the step arrows, and the scrub area stop working, and the label is muted.',
            Component: Disabled,
            source: disabledSource,
        },
    ],
    notes: [
        <>
            <code>NumberField.Group</code> renders the input and a spin box (stacked up and down arrows) by default, at{' '}
            <code>w-32</code>. Pass your own children to change the layout. <code>NumberField.Steppers</code> renders
            the two arrows.
        </>,
        <>
            Base UI has no <code>NumberField.Label</code>. Put the field in <code>Field.Root</code> and use{' '}
            <code>Field.Label</code>. See <Link to="/components/ui/field">Field</Link>.
        </>,
        <>
            Put the label in <code>NumberField.ScrubArea</code>, so that users can drag the label to change the value.
            Add <code>NumberField.ScrubAreaCursor</code> to show an arrow cursor while the user drags.
        </>,
        <>
            <code>Increment</code> and <code>Decrement</code> show a chevron by default. Pass <code>children</code> to
            replace it.
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
            ],
        },
        {
            component: 'NumberField.Group',
            rows: [
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
                            Classes for the column that holds <code>Increment</code> and <code>Decrement</code>. This
                            part is not in Base UI.
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
