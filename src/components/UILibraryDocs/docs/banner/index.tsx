import React from 'react'
import type { ComponentDoc } from '../../types'
import Tones from './Tones'
import ContentOnly from './ContentOnly'
import contentOnlySource from '!!../../rawSourceLoader!./ContentOnly.tsx?raw'
import tonesSource from '!!../../rawSourceLoader!./Tones.tsx?raw'
import WithAction from './WithAction'
import withActionSource from '!!../../rawSourceLoader!./WithAction.tsx?raw'
import Dismissible from './Dismissible'
import dismissibleSource from '!!../../rawSourceLoader!./Dismissible.tsx?raw'

export const doc: ComponentDoc = {
    slug: 'banner',
    importPath: 'components/UI/Banner',
    importNames: ['Banner'],
    sourcePath: 'src/components/UI/Banner',
    apiNote: <>Banner is a site component. Its parts accept standard HTML props unless listed below.</>,
    examples: [
        {
            id: 'tones',
            title: 'Tones',
            description: 'Each tone uses the shared status colors.',
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
            id: 'withaction',
            title: 'With an action',
            description: 'The action moves below the body in narrow containers. Use ButtonLink for navigation.',
            Component: WithAction,
            source: withActionSource,
        },
        {
            id: 'dismissible',
            title: 'Dismissible notice',
            description: 'The caller controls the dismissed state. The close button sits on the title line.',
            Component: Dismissible,
            source: dismissibleSource,
        },
    ],
    notes: [
        'Place Icon, Title, Content, Action, and Close directly inside Root. Fragments are supported. Use one of each part.',
        'Title is optional. It adds a slim tinted strip above the body. Omit Title for a compact row. Omit Icon to remove the decorative icon.',
        'Put Action next to Content, not inside it. The action sits beside the body at container widths of 448px or more. It moves below the body in narrower containers.',
        'Use a small button for Action. The icon, the text, the action, and the close button then share one 20px text line.',
        'Content is a block. Inline links and emphasis stay in the sentence.',
        'Close calls onDismiss. The caller removes the banner and stores the dismissed state.',
        'Banner has no live region. If a notice appears after a user action, put it in a live region.',
    ],
    props: [
        {
            component: 'Banner.Root',
            rows: [
                {
                    name: 'tone',
                    type: 'Tone',
                    defaultValue: "'brand'",
                    description: 'Sets the title strip tint, title color, and icon color.',
                },
            ],
        },
        {
            component: 'Banner.Icon',
            rows: [
                {
                    name: 'children',
                    type: 'ReactNode',
                    defaultValue: 'Tone icon',
                    description: 'Replaces the default tone icon. Omit this part to remove the icon.',
                },
            ],
        },
        {
            component: 'Banner.Title',
            rows: [
                {
                    name: 'children',
                    type: 'ReactNode',
                    description: 'The optional title in the tinted strip. Accepts div element props.',
                },
            ],
        },
        {
            component: 'Banner.Content',
            rows: [{ name: 'children', type: 'ReactNode', description: 'The notice body. Accepts div element props.' }],
        },
        {
            component: 'Banner.Action',
            rows: [
                {
                    name: 'children',
                    type: 'ReactNode',
                    description:
                        'An action beside the body in wide containers. Use a small button. Accepts span element props.',
                },
            ],
        },
        {
            component: 'Banner.Close',
            rows: [
                { name: 'onDismiss', type: '() => void', description: 'Called when the user presses Close.' },
                {
                    name: 'aria-label',
                    type: 'string',
                    defaultValue: "'Dismiss notice'",
                    description: 'Sets the accessible name.',
                },
            ],
        },
    ],
}
