import React from 'react'
import type { ComponentDoc } from '../../types'
import { StatusChoiceGuide } from '../../ChoiceGuide'
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
            description:
                'Use a status alias (info, success, warning, error, or neutral) when the message has a status. It sets the color and the icon. Use a brand color for a message with no status, such as a tip.',
            Component: Tones,
            source: tonesSource,
        },
        {
            id: 'content-only',
            title: 'Without a title',
            description: 'Use a note without a title for a short message of one or two lines. The icon is optional.',
            Component: ContentOnly,
            source: contentOnlySource,
        },
        {
            id: 'sizes',
            title: 'Sizes',
            description:
                'Use md (the default) in docs and pages. Use sm in dense UI, such as a sidebar or a card. sm uses 13px text and less padding.',
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
            description:
                'Use an action when the note leads to one next step, and use a small button for it. The action moves below the body in narrow containers.',
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
        <StatusChoiceGuide key="guide" />,
        'Say the meaning in words, because the icon and the color are decorative.',
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
