import React from 'react'
import { Snippet } from 'components/UI/Snippet'
import type { ComponentDoc } from '../../types'
import Surfaces from './Surfaces'
import surfacesSource from '!!../../rawSourceLoader!./Surfaces.tsx?raw'
import Formatting from './Formatting'
import formattingSource from '!!../../rawSourceLoader!./Formatting.tsx?raw'
import Vertical from './Vertical'
import verticalSource from '!!../../rawSourceLoader!./Vertical.tsx?raw'
import WithMenu from './WithMenu'
import withMenuSource from '!!../../rawSourceLoader!./WithMenu.tsx?raw'

export const doc: ComponentDoc = {
    slug: 'toolbar',
    importPath: 'components/UI/Toolbar',
    importNames: ['Toolbar'],
    sourcePath: 'src/components/UI/Toolbar',
    baseUi: [{ label: 'Base UI Toolbar', url: 'https://base-ui.com/react/components/toolbar' }],
    examples: [
        {
            id: 'surfaces',
            title: 'Surfaces',
            description:
                'Raised is the default. Use outlined or plain only where a raised bar does not fit, such as inside another raised surface.',
            Component: Surfaces,
            source: surfacesSource,
        },
        {
            id: 'formatting',
            title: 'Groups and separators',
            description:
                'Toolbar.Group holds related buttons. Toolbar.Separator draws a line between groups. The arrow keys move focus between the controls.',
            Component: Formatting,
            source: formattingSource,
        },
        {
            id: 'with-menu',
            title: 'With a menu',
            description:
                'Pass Menu.Trigger to the render prop of Toolbar.Button. The button keeps a fill while its menu is open.',
            Component: WithMenu,
            source: withMenuSource,
        },
        {
            id: 'vertical',
            title: 'Vertical',
            description:
                'Set orientation="vertical" to stack the controls. The up and down arrow keys then move focus, and separators are horizontal.',
            Component: Vertical,
            source: verticalSource,
        },
    ],
    notes: [
        'A toolbar is one tab stop. The arrow keys move between its controls.',
        <>
            Use at most one <Snippet.Inline>{'Toolbar.Input'}</Snippet.Inline>, and put it last.
        </>,
        <>
            To open a popup, put its trigger in the <Snippet.Inline>{'render'}</Snippet.Inline> prop of{' '}
            <Snippet.Inline>{'Toolbar.Button'}</Snippet.Inline>. For a tooltip, do the opposite:{' '}
            <Snippet.Inline>{'<Tooltip.Trigger render={<Toolbar.Button />}>'}</Snippet.Inline>.
        </>,
    ],
    props: [
        {
            component: 'Toolbar.Root',
            rows: [
                {
                    name: 'appearance',
                    type: "'plain' | 'outlined' | 'raised'",
                    defaultValue: "'raised'",
                    description:
                        'Sets the toolbar surface. Plain has no border or fill. Outlined adds a border. Raised adds elevation.',
                },
            ],
        },
    ],
}
