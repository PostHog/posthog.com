import React from 'react'
import { Snippet } from 'components/UI/Snippet'
import type { ComponentDoc } from '../../types'
import { InputChoiceGuide } from '../../ChoiceGuide'
import AppearanceStates from './AppearanceStates'
import appearanceStatesSource from '!!../../rawSourceLoader!./AppearanceStates.tsx?raw'
import Basic from './Basic'
import basicSource from '!!../../rawSourceLoader!./Basic.tsx?raw'
import Groups from './Groups'
import groupsSource from '!!../../rawSourceLoader!./Groups.tsx?raw'

const containerType = 'HTMLElement | ShadowRoot | RefObject | null'

import Sizes from './Sizes'
import sizesSource from '!!../../rawSourceLoader!./Sizes.tsx?raw'

export const doc: ComponentDoc = {
    slug: 'select',
    importPath: 'components/UI/Select',
    importNames: ['Select'],
    sourcePath: 'src/components/UI/Select',
    baseUi: [{ label: 'Base UI Select', url: 'https://base-ui.com/react/components/select' }],
    examples: [
        {
            id: 'basic',
            title: 'Basic',
            description: 'Pass items to Select.Root. Select.Value uses the items to show the label of the value.',
            Component: Basic,
            source: basicSource,
        },
        {
            id: 'groups',
            title: 'Groups and separators',
            description:
                'Put related items in a Group with a GroupLabel. A Separator divides sections. A disabled item stays in the list, but the user cannot select it.',
            Component: Groups,
            source: groupsSource,
        },
        {
            id: 'sizes',
            title: 'Sizes',
            description:
                'Match the size of the buttons beside the field, and use lg only for a hero field. sm, md, and lg are 26, 36, and 44 pixels high.',
            Component: Sizes,
            source: sizesSource,
        },
        {
            id: 'states',
            title: 'States',
            description:
                'Use inset by default and line for light or inline editing, with one appearance per form. Hover and focus the fields to see those states.',
            Component: AppearanceStates,
            source: appearanceStatesSource,
        },
    ],
    notes: [
        <InputChoiceGuide key="guide" />,
        <>
            Pass <Snippet.Inline>{'items'}</Snippet.Inline> to <Snippet.Inline>{'Select.Root'}</Snippet.Inline>. Without
            it, the trigger shows the raw value, such as <Snippet.Inline>{'us'}</Snippet.Inline>, not the label.
        </>,
    ],
    props: [
        {
            component: 'Select.Root',
            rows: [
                {
                    name: 'size',
                    type: "'sm' | 'md' | 'lg'",
                    defaultValue: "'md'",
                    description: 'Sets the trigger height, the chevron, and the item text size in the list.',
                },
                {
                    name: 'appearance',
                    type: "'inset' | 'line'",
                    defaultValue: "'inset'",
                    description:
                        'Sets the trigger shape. Keep inset for forms. Use line for light or inline editing, such as renaming in place, filters, and quick settings.',
                },
            ],
        },
        {
            component: 'Select.Trigger',
            rows: [
                {
                    name: 'size',
                    type: "'sm' | 'md' | 'lg'",
                    defaultValue: 'Root size',
                    description: 'Overrides the size from Root for the trigger only.',
                },
            ],
        },
        {
            component: 'Select.Icon',
            rows: [
                {
                    name: 'children',
                    type: 'ReactNode',
                    defaultValue: '<IconChevronDown />',
                    description: 'The icon in the trigger. Pass children to replace the chevron.',
                },
            ],
        },
        {
            component: 'Select.Popup',
            rows: [
                {
                    name: 'sideOffset',
                    type: 'number',
                    defaultValue: '4',
                    description: 'The gap between the trigger and the popup, in pixels.',
                },
                {
                    name: 'container',
                    type: containerType,
                    description: 'The element that the popup renders into. The default is the document body.',
                },
            ],
        },
    ],
}
