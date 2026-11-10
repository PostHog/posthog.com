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
import References from './References'
import referencesSource from '!!../../rawSourceLoader!./References.tsx?raw'
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
            description:
                'A chip shows text, an icon and text, or an image and text. The image is a circle by default. Set imageShape to square for a logo or an app icon.',
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
            id: 'references',
            title: 'References with a preview',
            description:
                'A chip that names a person, a team, or a post can show a preview card. Pass the card content in preview. With href, the chip uses PreviewCard, which opens on hover or keyboard focus. Without href, the chip is a button and uses Popover, which also opens on click and tap. The content mounts only when the card opens. This example reads a real profile and a real team from the community API. The chip and its card use the same request, so SWR sends it one time.',
            Component: References,
            source: referencesSource,
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
        'On a link chip, a preview repeats or extends what the link target shows. Do not put actions or required information in it, because touch users do not see it. A chip without href can hold them, because its card opens on tap.',
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
                    description: 'The URL of an image before the text. It replaces the icon.',
                },
                {
                    name: 'imageShape',
                    type: "'circle' | 'square'",
                    defaultValue: "'circle'",
                    description:
                        'The shape of the image. Use circle for a person and square for a logo or an app icon.',
                },
                {
                    name: 'preview',
                    type: 'ReactNode',
                    description:
                        'The content of a card that opens on hover. With href, it is a PreviewCard. Without href, the chip becomes a button with a Popover. Not with onRemove. Load the data for the card inside this content, so the request starts when the card opens.',
                },
                {
                    name: 'onRemove',
                    type: '() => void',
                    description:
                        'Adds a remove button. A click on the button calls this function. Not with href, preview, or the inline size.',
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
