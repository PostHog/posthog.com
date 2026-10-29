import React from 'react'
import { Snippet } from 'components/UI/Snippet'
import Link from 'components/Link'
import type { ComponentDoc } from '../../types'
import Content from './Content'
import contentSource from '!!../../rawSourceLoader!./Content.tsx?raw'
import Inline from './Inline'
import inlineSource from '!!../../rawSourceLoader!./Inline.tsx?raw'
import Links from './Links'
import linksSource from '!!../../rawSourceLoader!./Links.tsx?raw'
import Removable from './Removable'
import removableSource from '!!../../rawSourceLoader!./Removable.tsx?raw'

export const doc: ComponentDoc = {
    slug: 'chip',
    importPath: 'components/UI/Chip',
    importNames: ['Chip'],
    sourcePath: 'src/components/UI/Chip',
    apiNote:
        'Chip is a site component, not a Base UI component. Without href, it takes all the props of a <span>. With href, it takes the props of the site Link.',
    examples: [
        {
            id: 'content',
            title: 'Content',
            description: 'A chip shows text, an icon and text, or an image and text.',
            Component: Content,
            source: contentSource,
        },
        {
            id: 'removable',
            title: 'Removable',
            description: 'Pass onRemove to add a remove button.',
            Component: Removable,
            source: removableSource,
        },
        {
            id: 'links',
            title: 'Links',
            description:
                'Pass href to make the chip a link. Internal links open in the app window, like the site Link. A link chip cannot have a remove button.',
            Component: Links,
            source: linksSource,
        },
        {
            id: 'inline',
            title: 'Inline',
            description:
                'Set size to inline to put a chip in a sentence, like a profile mention in a forum post. The chip takes the size of the text around it and does not break across lines.',
            Component: Inline,
            source: inlineSource,
        },
    ],
    notes: [
        <>
            Use Chip for a compact label or a selected value. For status, use{' '}
            <Link to="/components/ui/badge">Badge</Link>.
        </>,
        <>
            When the children are not a string, pass <Snippet.Inline>{'removeLabel'}</Snippet.Inline>, so the remove
            button has a useful name.
        </>,
        'The image is decorative. The text must name the chip.',
    ],
    props: [
        {
            component: 'Chip',
            rows: [
                { name: 'children', type: 'ReactNode', description: 'The label. Required.' },
                {
                    name: 'href',
                    type: 'string',
                    description:
                        'Makes the chip a link. It renders the site Link, so internal links open in the app. For an external URL, pass externalNoIcon to open it in a new tab.',
                },
                {
                    name: 'size',
                    type: "'md' | 'inline'",
                    defaultValue: "'md'",
                    description: 'inline sizes the chip to the text around it, for use in a sentence.',
                },
                { name: 'icon', type: 'ReactNode', description: 'An icon before the text.' },
                {
                    name: 'image',
                    type: 'string',
                    description: 'The URL of a round image before the text. It replaces the icon.',
                },
                {
                    name: 'onRemove',
                    type: '() => void',
                    description:
                        'Adds a remove button. A click on the button calls this function. Not with href or the inline size.',
                },
                {
                    name: 'removeLabel',
                    type: 'string',
                    defaultValue: "'Remove <text>'",
                    description: 'The accessible name of the remove button.',
                },
            ],
        },
    ],
}
