import React from 'react'
import { Snippet } from 'components/UI/Snippet'
import Link from 'components/Link'
import type { ComponentDoc } from '../../types'
import Surfaces from './Surfaces'
import surfacesSource from '!!../../rawSourceLoader!./Surfaces.tsx?raw'
import ListLinks from './ListLinks'
import listLinksSource from '!!../../rawSourceLoader!./ListLinks.tsx?raw'

const containerType = 'HTMLElement | ShadowRoot | RefObject | null'

export const doc: ComponentDoc = {
    slug: 'navigation-menu',
    importPath: 'components/UI/NavigationMenu',
    importNames: ['NavigationMenu'],
    sourcePath: 'src/components/UI/NavigationMenu',
    baseUi: [{ label: 'Base UI Navigation Menu', url: 'https://base-ui.com/react/components/navigation-menu' }],
    examples: [
        {
            id: 'surfaces',
            title: 'Surfaces',
            description:
                'Raised is the default. Use outlined or plain only where a raised bar does not fit. Each Trigger opens its Content in one shared Popup.',
            Component: Surfaces,
            source: surfacesSource,
        },
        {
            id: 'list-links',
            title: 'Links in the list',
            description:
                'A Link in the List looks like a trigger. For an internal link, render a Gatsby Link. For an external link, use href.',
            Component: ListLinks,
            source: listLinksSource,
        },
    ],
    notes: [
        <>
            Use NavigationMenu for site navigation. For app commands, use{' '}
            <Link to="/components/ui/menubar">Menubar</Link>.
        </>,
        <>
            For an internal link, pass <Snippet.Inline>{'render={<GatsbyLink to="/path" />}'}</Snippet.Inline> to{' '}
            <Snippet.Inline>{'NavigationMenu.Link'}</Snippet.Inline>.{' '}
            <Snippet.Inline>{'components/Link'}</Snippet.Inline> does not forward a ref.
        </>,
    ],
    props: [
        {
            component: 'NavigationMenu.List',
            rows: [
                {
                    name: 'appearance',
                    type: "'plain' | 'outlined' | 'raised'",
                    defaultValue: "'raised'",
                    description: 'Sets the list surface. Raised adds a translucent fill and a shadow.',
                },
            ],
        },
        {
            component: 'NavigationMenu.Link',
            rows: [
                {
                    name: 'closeOnClick',
                    type: 'boolean',
                    defaultValue: 'true',
                    description: 'Closes the menu when the user clicks the link. The Base UI default is false.',
                },
            ],
        },
        {
            component: 'NavigationMenu.Popup',
            rows: [
                {
                    name: 'align',
                    type: "'start' | 'center' | 'end'",
                    defaultValue: "'start'",
                    description:
                        'Aligns the popup with the start edge of the open trigger. The Base UI default is center.',
                },
                {
                    name: 'sideOffset',
                    type: 'number',
                    defaultValue: '4',
                    description: 'The gap between the list and the popup, in pixels.',
                },
                {
                    name: 'collisionAvoidance',
                    type: 'CollisionAvoidance',
                    defaultValue: "{ side: 'none' }",
                    description: 'The popup stays below the list. It does not flip to the other side.',
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
