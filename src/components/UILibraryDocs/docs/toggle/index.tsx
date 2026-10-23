import React from 'react'
import Link from 'components/Link'
import type { ComponentDoc } from '../../types'
import Required from './Required'
import requiredSource from '!!../../rawSourceLoader!./Required.tsx?raw'
import Group from './Group'
import groupSource from '!!../../rawSourceLoader!./Group.tsx?raw'
import Multiple from './Multiple'
import multipleSource from '!!../../rawSourceLoader!./Multiple.tsx?raw'
import Variants from './Variants'
import variantsSource from '!!../../rawSourceLoader!./Variants.tsx?raw'

const variantType = "'default' | 'primary' | 'secondary' | 'danger'"

const sizeType = "'sm' | 'md' | 'lg'"

export const doc: ComponentDoc = {
    slug: 'toggle',
    importPath: 'components/UI/Toggle',
    importNames: ['Toggle', 'ToggleGroup'],
    sourcePath: 'src/components/UI/Toggle',
    baseUi: [
        { label: 'Base UI Toggle', url: 'https://base-ui.com/react/components/toggle' },
        { label: 'Base UI Toggle Group', url: 'https://base-ui.com/react/components/toggle-group' },
    ],
    examples: [
        {
            id: 'variants',
            title: 'Variants',
            description:
                'A toggle stays pressed after a click. The second toggle in each row starts pressed, with defaultPressed.',
            Component: Variants,
            source: variantsSource,
        },
        {
            id: 'group',
            title: 'Toggle group',
            description:
                'Only one toggle in a group is pressed at a time. Here, onValueChange ignores empty arrays, so one toggle stays pressed.',
            Component: Group,
            source: groupSource,
        },
        {
            id: 'multiple',
            title: 'Multiple pressed toggles',
            description: 'Set multiple on the group to let more than one toggle stay pressed.',
            Component: Multiple,
            source: multipleSource,
        },
        {
            id: 'required',
            title: 'Keep one value pressed',
            description: 'Set required to prevent the last pressed toggle from becoming unpressed.',
            Component: Required,
            source: requiredSource,
        },
    ],
    notes: [
        'Disabled groups fade as one unit. A disabled segment in an enabled raised group dims only its content.',
        <>
            <code>Toggle</code> renders a <Link to="/components/ui/button">Button</Link>, and <code>ToggleGroup</code>{' '}
            renders a <code>ButtonGroup</code>. They take the same <code>variant</code> and <code>size</code> props.
        </>,
        <>
            A pressed toggle keeps its color. A flat toggle gets a fill and darker text. A raised toggle stays pushed
            down, with a soft inner shadow and a darker face. In dark mode, a pressed secondary toggle gets a lighter
            face, so it stays visible.
        </>,
        <>
            Toggles in a <code>ToggleGroup</code> take the <code>variant</code> and <code>size</code> of the group.
        </>,
        <>
            Set <code>required</code> to keep at least one toggle pressed. Supply an initial <code>value</code> or{' '}
            <code>defaultValue</code>. This option does not select an item automatically or add form validation.
        </>,
        <>
            A <code>Button</code> that you render inside a Base UI <code>Toggle</code> also shows the pressed state.
        </>,
    ],
    props: [
        {
            component: 'Toggle',
            rows: [
                {
                    name: 'variant',
                    type: variantType,
                    defaultValue: "'default'",
                    description: 'Flat, or raised orange, or raised white. In a ToggleGroup, the group sets it.',
                },
                {
                    name: 'size',
                    type: sizeType,
                    defaultValue: "'md'",
                    description: 'Height and text size. In a ToggleGroup, the group sets it.',
                },
            ],
        },
        {
            component: 'ToggleGroup',
            rows: [
                {
                    name: 'variant',
                    type: variantType,
                    defaultValue: "'default'",
                    description: 'Sets the variant of every toggle in the group.',
                },
                {
                    name: 'required',
                    type: 'boolean',
                    defaultValue: 'false',
                    description:
                        'Keeps at least one toggle pressed, in single and multiple mode. Set an initial value.',
                },
                {
                    name: 'size',
                    type: sizeType,
                    defaultValue: "'md'",
                    description: 'Sets the size of every toggle in the group.',
                },
            ],
        },
    ],
}
