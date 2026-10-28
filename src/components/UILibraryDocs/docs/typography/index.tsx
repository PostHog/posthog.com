import React from 'react'
import { Snippet } from 'components/UI/Snippet'
import type { ComponentDoc } from '../../types'
import Scale from './Scale'
import scaleSource from '!!../../rawSourceLoader!./Scale.tsx?raw'
import Headings from './Headings'
import headingsSource from '!!../../rawSourceLoader!./Headings.tsx?raw'
import TextStyles from './TextStyles'
import textStylesSource from '!!../../rawSourceLoader!./TextStyles.tsx?raw'

export const doc: ComponentDoc = {
    slug: 'typography',
    importPath: 'components/UI/Typography',
    importNames: ['Heading', 'Text'],
    sourcePath: 'src/components/UI/Typography',
    examples: [
        {
            id: 'scale',
            title: 'Type scale',
            description:
                'Every text style is one of these roles. Each token sets the size, line height, and letter spacing together, and the heading roles also set the weight.',
            Component: Scale,
            source: scaleSource,
        },
        {
            id: 'headings',
            title: 'Headings',
            description:
                'The level comes from the page outline. The size comes from the visual hierarchy. Each level has a default size, and size changes it.',
            Component: Headings,
            source: headingsSource,
        },
        {
            id: 'text',
            title: 'Text',
            description: 'Body sizes, captions, and weights.',
            Component: TextStyles,
            source: textStylesSource,
        },
    ],
    notes: [
        <>
            Set all text in IBM Plex Sans (<Snippet.Inline>{'font-body'}</Snippet.Inline>,{' '}
            <Snippet.Inline>{'font-heading'}</Snippet.Inline>) and all code in Source Code Pro (
            <Snippet.Inline>{'font-code'}</Snippet.Inline>).
        </>,
        <>
            Size text only with the role tokens. Do not use arbitrary sizes, such as{' '}
            <Snippet.Inline>{'text-[15px]'}</Snippet.Inline>, or the numeric Tailwind sizes, such as{' '}
            <Snippet.Inline>{'text-sm'}</Snippet.Inline>.
        </>,
        <>
            Body text is <Snippet.Inline>{'text-body'}</Snippet.Inline>, 15/24. Use{' '}
            <Snippet.Inline>{'text-body-lg'}</Snippet.Inline> for a lead paragraph,{' '}
            <Snippet.Inline>{'text-body-sm'}</Snippet.Inline> for dense UI, and{' '}
            <Snippet.Inline>{'text-caption'}</Snippet.Inline> for metadata and help text. Use{' '}
            <Snippet.Inline>{'text-caption-sm'}</Snippet.Inline> only for tiny labels, such as badges.
        </>,
        'Give each page one h1. Choose heading levels from the page outline and never skip a level. Use the display size at most once on a page.',
        'Use 500 for body text, 600 for labels and small headings, and 700 for headings. Text often sits on see-through windows, so 500 keeps it readable over the wallpaper. Use 400 only for long text on a solid surface.',
        <>
            Keep reading text under 65 characters per line with <Snippet.Inline>{'max-w-[65ch]'}</Snippet.Inline>.
        </>,
        'Write headings, labels, and buttons in sentence case. Use uppercase only for caption-sm labels, with 0.05em letter spacing.',
        <>
            Use <Snippet.Inline>{'text-primary'}</Snippet.Inline> for content,{' '}
            <Snippet.Inline>{'text-secondary'}</Snippet.Inline> for supporting text, and{' '}
            <Snippet.Inline>{'text-muted'}</Snippet.Inline> only for placeholders and disabled text. Use{' '}
            <Snippet.Inline>{'tabular-nums'}</Snippet.Inline> for numbers in tables and counters.
        </>,
    ],
    props: [
        {
            component: 'Heading',
            rows: [
                {
                    name: 'level',
                    type: '1 | 2 | 3 | 4 | 5 | 6',
                    defaultValue: '2',
                    description: 'The heading element, from h1 to h6. Choose it from the page outline.',
                },
                {
                    name: 'size',
                    type: "'display' | 'title' | 'lg' | 'md' | 'sm'",
                    description:
                        'The visual size. The default comes from the level: 1 is title, 2 is lg, 3 is md, and 4 to 6 are sm.',
                },
            ],
        },
        {
            component: 'Text',
            rows: [
                {
                    name: 'as',
                    type: "'p' | 'span' | 'div'",
                    defaultValue: "'p'",
                    description: 'The element to render.',
                },
                {
                    name: 'size',
                    type: "'lg' | 'md' | 'sm' | 'caption' | 'caption-sm'",
                    defaultValue: "'md'",
                    description: 'body-lg, body, body-sm, caption, or caption-sm.',
                },
                {
                    name: 'weight',
                    type: "'normal' | 'medium' | 'semibold' | 'bold'",
                    defaultValue: "'medium'",
                    description: 'The font weight. medium (500) is the default for all text.',
                },
                {
                    name: 'color',
                    type: "'primary' | 'secondary' | 'muted'",
                    defaultValue: "'primary'",
                    description: 'The text color.',
                },
            ],
        },
    ],
}
