import React from 'react'
import { Snippet } from 'components/UI/Snippet'
import type { ComponentDoc } from '../../types'
import Reverse from './Reverse'
import reverseSource from '!!../../rawSourceLoader!./Reverse.tsx?raw'
import Fallback from './Fallback'
import fallbackSource from '!!../../rawSourceLoader!./Fallback.tsx?raw'
import Group from './Group'
import groupSource from '!!../../rawSourceLoader!./Group.tsx?raw'
import Sizes from './Sizes'
import sizesSource from '!!../../rawSourceLoader!./Sizes.tsx?raw'

const sizeType = "'sm' | 'md' | 'lg'"

export const doc: ComponentDoc = {
    slug: 'avatar',
    importPath: 'components/UI/Avatar',
    importNames: ['Avatar'],
    sourcePath: 'src/components/UI/Avatar',
    apiNote:
        'Props that the library adds. Avatar.Root, Avatar.Image, and Avatar.Fallback also take all the Base UI props. Avatar.Group is a site part and takes all the props of a <div>.',
    baseUi: [{ label: 'Base UI Avatar', url: 'https://base-ui.com/react/components/avatar' }],
    examples: [
        {
            id: 'sizes',
            title: 'Sizes',
            description: 'Set size on Avatar.Root to sm, md, or lg. The default is md.',
            Component: Sizes,
            source: sizesSource,
        },
        {
            id: 'fallback',
            title: 'Fallback',
            description: 'Avatar.Fallback shows when the image fails or when there is none.',
            Component: Fallback,
            source: fallbackSource,
        },
        {
            id: 'group',
            title: 'Stacked group',
            description:
                'Avatar.Group stacks its avatars and sets their size. max shows the first avatars and a "+N" count.',
            Component: Group,
            source: groupSource,
        },
        {
            id: 'reverse',
            title: 'Reverse stacking',
            description: 'Set reverse to keep the first avatar above later avatars. The visible order stays the same.',
            Component: Reverse,
            source: reverseSource,
        },
    ],
    notes: [
        <>
            Always add <Snippet.Inline>{'Avatar.Fallback'}</Snippet.Inline> with initials. Images can fail or load
            slowly.
        </>,
        <>
            Give <Snippet.Inline>{'Avatar.Group'}</Snippet.Inline> an <Snippet.Inline>{'aria-label'}</Snippet.Inline>,
            such as &quot;Team members&quot;.
        </>,
        <>
            <Snippet.Inline>{'max'}</Snippet.Inline> counts direct children, so a fragment of avatars counts as one.
        </>,
    ],
    props: [
        {
            component: 'Avatar.Root',
            rows: [
                {
                    name: 'size',
                    type: sizeType,
                    defaultValue: "'md'",
                    description: 'Diameter and text size. Inside an Avatar.Group, the group sets the size.',
                },
            ],
        },
        {
            component: 'Avatar.Group',
            rows: [
                { name: 'size', type: sizeType, defaultValue: "'md'", description: 'Sets the size of every avatar.' },
                {
                    name: 'reverse',
                    type: 'boolean',
                    defaultValue: 'false',
                    description: 'Places later avatars underneath earlier avatars. Does not change reading order.',
                },
                {
                    name: 'max',
                    type: 'number',
                    description:
                        'The number of avatars to show. A "+N" count replaces the rest. Without max, all show.',
                },
            ],
        },
    ],
}
