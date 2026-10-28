import React from 'react'
import { Snippet } from 'components/UI/Snippet'
import Link from 'components/Link'
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
            title: 'Statuses',
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
        'Use a status alias when the message has a status: info (blue), success (green), warning (yellow), error (coral), neutral (gray), or brand (orange). The alias also picks the matching icon. Use a brand color name for a message without a status. Say the meaning in words, because the icon and color are decorative.',
        <>
            Use Banner for a notice about the whole page or window that stays until the user acts or dismisses it. For
            context inside content, use <Link to="/components/ui/note">Note</Link>. For brief feedback after an action,
            use <Link to="/components/ui/toast">Toast</Link>.
        </>,
        <>
            <Snippet.Inline>{'Close'}</Snippet.Inline> only calls <Snippet.Inline>{'onDismiss'}</Snippet.Inline>. Remove
            the banner and remember the dismissal yourself.
        </>,
        'A banner is not announced to screen readers. If it appears after a user action, also announce it in a live region.',
        <>
            Use a small button in <Snippet.Inline>{'Action'}</Snippet.Inline>.
        </>,
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
