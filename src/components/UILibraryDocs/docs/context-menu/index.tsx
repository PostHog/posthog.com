import React from 'react'
import Link from 'components/Link'
import type { ComponentDoc } from '../../types'
import Basic from './Basic'
import basicSource from '!!../../rawSourceLoader!./Basic.tsx?raw'

export const doc: ComponentDoc = {
    slug: 'context-menu',
    importPath: 'components/UI/ContextMenu',
    importNames: ['ContextMenu'],
    sourcePath: 'src/components/UI/ContextMenu',
    baseUi: [{ label: 'Base UI Context Menu', url: 'https://base-ui.com/react/components/context-menu' }],
    examples: [
        {
            id: 'basic',
            title: 'Basic context menu',
            description: 'Right-click the area, or touch and hold it on a touch screen. The menu opens at the pointer.',
            Component: Basic,
            source: basicSource,
        },
    ],
    notes: [
        <>
            A context menu is hidden until the user right-clicks. Make every command in it also available in a visible
            place, such as a <Link to="/components/ui/menu">Menu</Link> or a button.
        </>,
        'Give the trigger area a visible edge, so users can find it.',
    ],
    props: [
        {
            component: 'ContextMenu.Popup',
            rows: [
                {
                    name: 'container',
                    type: 'HTMLElement | ShadowRoot | RefObject | null',
                    description: 'The element that the menu renders into. The default is the document body.',
                },
            ],
        },
    ],
}
