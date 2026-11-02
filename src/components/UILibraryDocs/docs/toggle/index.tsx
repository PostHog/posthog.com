import React from 'react'
import { Snippet } from 'components/UI/Snippet'
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
            description: 'A toggle stays pressed after a click. The second toggle in each row starts pressed.',
            Component: Variants,
            source: variantsSource,
        },
        {
            id: 'group',
            title: 'Toggle group',
            description: 'Only one toggle in a group is pressed at a time.',
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
            description: 'Set required so the last pressed toggle cannot be unpressed.',
            Component: Required,
            source: requiredSource,
        },
    ],
    notes: [
        <>
            Use a toggle for an on or off state in a toolbar or view control, such as bold text or a view mode. For a
            setting, use <Link to="/components/ui/switch">Switch</Link>.
        </>,
        <>
            Set <Snippet.Inline>{'required'}</Snippet.Inline> on <Snippet.Inline>{'ToggleGroup'}</Snippet.Inline> to
            keep one option pressed, and give it an initial value.
        </>,
    ],
    props: [
        {
            component: 'Toggle',
            rows: [
                {
                    name: 'appearance',
                    type: "'flat' | 'raised' | 'outline'",
                    defaultValue: "'raised'",
                    description: 'The shape: flat, raised 3D, or outlined.',
                },
                {
                    name: 'variant',
                    type: "'primary' | 'secondary' | 'danger'",
                    defaultValue: "'secondary'",
                    description: 'The meaning and color: brand orange, neutral, or destructive red.',
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
