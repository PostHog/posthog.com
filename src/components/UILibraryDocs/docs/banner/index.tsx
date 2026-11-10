import React from 'react'
import { Snippet } from 'components/UI/Snippet'
import type { ComponentDoc } from '../../types'
import { StatusChoiceGuide } from '../../ChoiceGuide'
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
            title: 'Statuses',
            description:
                'Use a status alias (info, success, warning, error, or neutral) when the message has a status. It sets the color and the icon. Use a brand color for a message with no status, such as an announcement.',
            Component: Tones,
            source: tonesSource,
        },
        {
            id: 'content-only',
            title: 'Without a title',
            description: 'Use a banner without a title for a short notice of one line. The icon is optional.',
            Component: ContentOnly,
            source: contentOnlySource,
        },
        {
            id: 'withaction',
            title: 'With an action',
            description:
                'Use a small button for the action, and ButtonLink for navigation. The action moves below the body in narrow containers.',
            Component: WithAction,
            source: withActionSource,
        },
        {
            id: 'dismissible',
            title: 'Dismissible notice',
            description:
                'Use a close button when the user does not need the notice again, such as an announcement. The caller controls the dismissed state.',
            Component: Dismissible,
            source: dismissibleSource,
        },
    ],
    notes: [
        <StatusChoiceGuide key="guide" />,
        'Say the meaning in words, because the icon and the color are decorative.',
        <>
            <Snippet.Inline>{'Close'}</Snippet.Inline> only calls <Snippet.Inline>{'onDismiss'}</Snippet.Inline>. Remove
            the banner and remember the dismissal yourself.
        </>,
        'A banner is not announced to screen readers. If it appears after a user action, also announce it in a live region.',
    ],
    props: [
        {
            component: 'Banner.Root',
            rows: [
                {
                    name: 'color',
                    type: "ColorName | 'neutral' | 'info' | 'success' | 'warning' | 'error' | 'brand'",
                    defaultValue: "'brand'",
                    description:
                        'A brand color, or a status alias for one. Sets the title strip tint, title color, and icon.',
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
                    description: 'Replaces the default status icon. Omit this part to remove the icon.',
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
