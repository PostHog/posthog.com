import React from 'react'
import { Snippet } from 'components/UI/Snippet'
import Link from 'components/Link'
import type { ComponentDoc } from '../../types'
import Tones from './Tones'
import ContentOnly from './ContentOnly'
import contentOnlySource from '!!../../rawSourceLoader!./ContentOnly.tsx?raw'
import tonesSource from '!!../../rawSourceLoader!./Tones.tsx?raw'
import Sizes from './Sizes'
import sizesSource from '!!../../rawSourceLoader!./Sizes.tsx?raw'
import WithoutIcon from './WithoutIcon'
import withouticonSource from '!!../../rawSourceLoader!./WithoutIcon.tsx?raw'
import WithAction from './WithAction'
import withactionSource from '!!../../rawSourceLoader!./WithAction.tsx?raw'
import Legacy from './Legacy'
import legacySource from '!!../../rawSourceLoader!./Legacy.tsx?raw'

export const doc: ComponentDoc = {
    slug: 'note',
    importPath: 'components/UI/Note',
    importNames: ['Note'],
    sourcePath: 'src/components/UI/Note',
    apiNote:
        'Note is a site component, not a Base UI component. Root, Title, Content, and Action accept div element props. Icon accepts span element props.',
    examples: [
        {
            id: 'tones',
            title: 'Status colors',
            description: 'Each status sets a brand color and an icon. You can also pass any brand color.',
            Component: Tones,
            source: tonesSource,
        },
        {
            id: 'content-only',
            title: 'Without a title',
            description: 'Omit the title for a compact notice. The icon is optional.',
            Component: ContentOnly,
            source: contentOnlySource,
        },
        {
            id: 'sizes',
            title: 'Sizes',
            description: 'sm uses 13px text and less padding, for compact content.',
            Component: Sizes,
            source: sizesSource,
        },
        {
            id: 'withouticon',
            title: 'Without an icon',
            description: 'Omit Note.Icon to show only the title and content.',
            Component: WithoutIcon,
            source: withouticonSource,
        },
        {
            id: 'withaction',
            title: 'With an action',
            description: 'The action moves below the body in narrow containers.',
            Component: WithAction,
            source: withactionSource,
        },
        {
            id: 'custom-icons',
            title: 'Custom icons',
            description: 'Pass an icon as the children of Note.Icon to replace the default icon.',
            Component: Legacy,
            source: legacySource,
        },
    ],
    notes: [
        <>
            Use Note for context inside content, such as docs and handbook pages. For a notice about the whole page, use{' '}
            <Link to="/components/ui/banner">Banner</Link>. For brief feedback after an action, use{' '}
            <Link to="/components/ui/toast">Toast</Link>.
        </>,
        'Use a status alias when the message has a status: info (blue), success (green), warning (yellow), error (coral), neutral (gray), or brand (orange). The alias also picks the matching icon. Use a brand color name for a message without a status. Say the meaning in words, because the icon and color are decorative.',
        <>
            Use a small button in <Snippet.Inline>{'Action'}</Snippet.Inline>.
        </>,
    ],
    props: [
        {
            component: 'Note.Root',
            rows: [
                {
                    name: 'color',
                    type: "ColorName | 'neutral' | 'info' | 'success' | 'warning' | 'error' | 'brand'",
                    defaultValue: "'info'",
                    description:
                        'A brand color, or a status alias for one. Sets the title strip tint, title color, and icon.',
                },
                {
                    name: 'size',
                    type: "'sm' | 'md'",
                    defaultValue: "'md'",
                    description: 'Sets the padding and text size.',
                },
                { name: 'children', type: 'ReactNode', description: 'The note parts.' },
            ],
        },
        {
            component: 'Note.Icon',
            rows: [
                {
                    name: 'children',
                    type: 'ReactNode',
                    defaultValue: 'Tone icon',
                    description: 'Replaces the default icon. Omit this part to remove the icon.',
                },
            ],
        },
        { component: 'Note.Title', rows: [{ name: 'children', type: 'ReactNode', description: 'The visible title.' }] },
        {
            component: 'Note.Content',
            rows: [
                {
                    name: 'children',
                    type: 'ReactNode',
                    description:
                        'The prose content. The first and last child have no outer margin, so a list or a code block also fits.',
                },
            ],
        },
        {
            component: 'Note.Action',
            rows: [
                {
                    name: 'children',
                    type: 'ReactNode',
                    description: 'A Button or ButtonLink beside the body in wide containers.',
                },
            ],
        },
    ],
}
