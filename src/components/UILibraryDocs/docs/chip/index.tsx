import React from 'react'
import { Snippet } from 'components/UI/Snippet'
import type { ComponentDoc } from '../../types'
import { StatusChoiceGuide } from '../../ChoiceGuide'
import {
    tagAppearanceRow,
    tagAppearancesDescription,
    tagColorRow,
    tagColorsDescription,
    tagHrefRow,
    tagPreviewNote,
    tagPreviewRow,
} from '../../tagDocs'
import Colors from './Colors'
import colorsSource from '!!../../rawSourceLoader!./Colors.tsx?raw'
import Content from './Content'
import contentSource from '!!../../rawSourceLoader!./Content.tsx?raw'
import Inline from './Inline'
import inlineSource from '!!../../rawSourceLoader!./Inline.tsx?raw'
import Links from './Links'
import linksSource from '!!../../rawSourceLoader!./Links.tsx?raw'
import References from './References'
import referencesSource from '!!../../rawSourceLoader!./References.tsx?raw'
import Removable from './Removable'
import Variants from './Variants'
import variantsSource from '!!../../rawSourceLoader!./Variants.tsx?raw'
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
                'A chip shows text, an icon and text, or an image and text. Use an image for a person or a team, and an icon for a product or a feature.',
            Component: Content,
            source: contentSource,
        },
        {
            id: 'colors',
            title: 'Colors',
            description: tagColorsDescription,
            Component: Colors,
            source: colorsSource,
        },
        {
            id: 'variants',
            title: 'Solid and soft',
            description: tagAppearancesDescription,
            Component: Variants,
            source: variantsSource,
        },
        {
            id: 'removable',
            title: 'Removable',
            description:
                'Use a remove button for a filter or a selected value that the user can clear. Pass onRemove to add it.',
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
        <StatusChoiceGuide key="guide" />,
        <>
            When the children are not a string, pass <Snippet.Inline>{'removeLabel'}</Snippet.Inline>, so the remove
            button has a useful name.
        </>,
        'The image is decorative. The text must name the chip.',
        tagPreviewNote('chip'),
    ],
    props: [
        {
            component: 'Chip',
            rows: [
                { name: 'children', type: 'ReactNode', description: 'The label. Required.' },
                tagHrefRow('chip'),
                {
                    name: 'size',
                    type: "'md' | 'inline'",
                    defaultValue: "'md'",
                    description: 'inline sizes the chip to the text around it, for use in a sentence.',
                },
                tagColorRow,
                tagAppearanceRow,
                { name: 'icon', type: 'ReactNode', description: 'An icon before the text.' },
                {
                    name: 'image',
                    type: 'string',
                    description: 'The URL of a round image before the text. It replaces the icon.',
                },
                tagPreviewRow('chip'),
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
