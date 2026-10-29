import React from 'react'
import { Snippet } from 'components/UI/Snippet'
import Link from 'components/Link'
import type { ComponentDoc } from '../../types'
import Basic from './Basic'
import basicSource from '!!../../rawSourceLoader!./Basic.tsx?raw'
import Checkboxes from './Checkboxes'
import checkboxesSource from '!!../../rawSourceLoader!./Checkboxes.tsx?raw'
import Controlled from './Controlled'
import controlledSource from '!!../../rawSourceLoader!./Controlled.tsx?raw'
import Files from './Files'
import filesSource from '!!../../rawSourceLoader!./Files.tsx?raw'
import Sizes from './Sizes'
import sizesSource from '!!../../rawSourceLoader!./Sizes.tsx?raw'

export const doc: ComponentDoc = {
    slug: 'tree',
    importPath: 'components/UI/Tree',
    importNames: ['Tree', 'CheckboxTree', 'FileTree'],
    sourcePath: 'src/components/UI/Tree',
    apiNote: (
        <>
            Base UI has no tree, so this component is our own. It follows the{' '}
            <Link to="https://www.w3.org/WAI/ARIA/apg/patterns/treeview/" external>
                WAI-ARIA tree view pattern
            </Link>
            . CheckboxTree and FileTree are both made from Tree. Each group of children opens and closes as one
            Collapsible panel.
        </>
    ),
    examples: [
        {
            id: 'basic',
            title: 'Basic',
            description:
                'Pass items as data. Each item has an id, a label, and an optional icon and children. Set selectionMode to single or multiple to let users select items. A line shows each level of nesting.',
            Component: Basic,
            source: basicSource,
        },
        {
            id: 'checkboxes',
            title: 'Checkbox tree',
            description:
                'CheckboxTree shows a Checkbox on each row. A parent checks or clears all of its children, and shows a dash when only some are checked. The value has only the leaf ids.',
            Component: Checkboxes,
            source: checkboxesSource,
        },
        {
            id: 'files',
            title: 'File tree',
            description:
                'FileTree shows folder and file icons. An item with an href is a link. Pass currentId to mark the current page and open its folders.',
            Component: Files,
            source: filesSource,
        },
        {
            id: 'sizes',
            title: 'Sizes',
            description: 'Set size to sm, md, or lg. The sizes match the list items in Select and Combobox.',
            Component: Sizes,
            source: sizesSource,
        },
        {
            id: 'controlled',
            title: 'Controlled',
            description:
                'Pass expanded and onExpandedChange, or selected and onSelectedChange, to keep the state in your component.',
            Component: Controlled,
            source: controlledSource,
        },
    ],
    notes: [
        <>
            Use the arrow keys to move and to open or close a row. Home and End go to the first and last rows,{' '}
            <Snippet.Inline>*</Snippet.Inline> opens all siblings, and a letter goes to the next row that starts with
            it.
        </>,
        <>
            The tree has one tab stop. Do not put buttons or links inside a row. Use renderRow to make the row itself a
            link, as FileTree does.
        </>,
        <>A group with more than 100 children opens and closes at once, without the height animation.</>,
        <>
            Give the tree an <Snippet.Inline>aria-label</Snippet.Inline> or an{' '}
            <Snippet.Inline>aria-labelledby</Snippet.Inline>.
        </>,
    ],
    props: [
        {
            component: 'Tree',
            rows: [
                {
                    name: 'items',
                    type: 'TreeNode[]',
                    description:
                        'The data. Each node has id, label, and optional icon, textValue, disabled, and children.',
                },
                {
                    name: 'size',
                    type: "'sm' | 'md' | 'lg'",
                    defaultValue: "'md'",
                    description: 'The row height, text size, indent, and icon size.',
                },
                {
                    name: 'selectionMode',
                    type: "'none' | 'single' | 'multiple'",
                    defaultValue: "'none'",
                    description: 'With none, a click on a parent row opens or closes it.',
                },
                {
                    name: 'expanded / defaultExpanded',
                    type: 'string[]',
                    description: 'The ids of the open rows. Use onExpandedChange with expanded.',
                },
                {
                    name: 'selected / defaultSelected',
                    type: 'string[]',
                    description: 'The ids of the selected rows. Use onSelectedChange with selected.',
                },
                {
                    name: 'onAction',
                    type: '(item) => void',
                    description:
                        'Runs on click, Enter, and Space. When you set it, a click on a parent row does not open it.',
                },
                {
                    name: 'renderItem',
                    type: '(item, state) => ReactNode',
                    defaultValue: 'item.label',
                    description: 'The content of a row, after the chevron.',
                },
                {
                    name: 'renderRow',
                    type: '(item, props, state) => ReactElement',
                    defaultValue: 'A div',
                    description: 'The row element. Spread props onto it to keep focus, keys, and ARIA.',
                },
            ],
        },
        {
            component: 'CheckboxTree',
            rows: [
                {
                    name: 'checked / defaultChecked',
                    type: 'string[]',
                    description: 'The ids of the checked rows. Use onCheckedChange with checked.',
                },
                {
                    name: 'strict',
                    type: 'boolean',
                    defaultValue: 'false',
                    description: 'Checks each row alone. A parent does not change its children.',
                },
            ],
        },
        {
            component: 'FileTree',
            rows: [
                {
                    name: 'items',
                    type: 'FileTreeNode[]',
                    description:
                        'Like TreeNode, with an optional href. Rows without an icon get a folder or file icon.',
                },
                {
                    name: 'currentId',
                    type: 'string',
                    description: 'The id of the current page. Its row gets aria-current, and its folders start open.',
                },
            ],
        },
    ],
}
