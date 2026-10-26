import React from 'react'
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
            description: 'Choose plain, outlined, or raised. Raised adds a translucent fill and a shadow.',
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
        <>
            The toolbar is one tab stop. Tab moves focus into and out of the toolbar, and the arrow keys move focus
            between its controls.
        </>,
        <>
            A disabled <code>Toolbar.Button</code> stays focusable, so keyboard users can find it. Set{' '}
            <code>focusableWhenDisabled={'{false}'}</code> to remove it from the focus order.
        </>,
        <>
            To open a popup from the toolbar, put its trigger in the <code>render</code> prop of{' '}
            <code>Toolbar.Button</code>, for example <code>{'<Toolbar.Button render={<Menu.Trigger />}>'}</code>. For a
            tooltip, do the opposite: <code>{'<Tooltip.Trigger render={<Toolbar.Button />}>'}</code>.
        </>,
        <>
            Use a maximum of one <code>Toolbar.Input</code>, and put it last. In a horizontal toolbar, the left and
            right arrow keys move the text cursor and also move focus.
        </>,
        <>
            <code>Toolbar.Link</code> renders a plain <code>{'<a>'}</code>. For an internal link, pass{' '}
            <code>{'render={<GatsbyLink to="/path" />}'}</code> (from <code>gatsby</code>).
        </>,
        <>
            A vertical <code>Toolbar.Root</code> uses only the width that its controls need.
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
