import React from 'react'
import { Snippet } from 'components/UI/Snippet'
import Link from 'components/Link'
import type { ComponentDoc } from '../../types'
import OverContent from './OverContent'
import overContentSource from '!!../../rawSourceLoader!./OverContent.tsx?raw'
import Sizes from './Sizes'
import sizesSource from '!!../../rawSourceLoader!./Sizes.tsx?raw'

const sizeType = "'sm' | 'md' | 'lg'"

export const doc: ComponentDoc = {
    slug: 'floating-button',
    importPath: 'components/UI/FloatingButton',
    importNames: ['FloatingButton', 'FloatingIconButton', 'FloatingButtonGroup'],
    sourcePath: 'src/components/UI/FloatingButton',
    baseUi: [{ label: 'Base UI Button', url: 'https://base-ui.com/react/components/button' }],
    examples: [
        {
            id: 'over-content',
            title: 'Over content',
            description:
                'A liquid glass button for places where a button sits over an image, a video, or page content. The content behind it shows through. FloatingButtonGroup puts several buttons in one glass pill.',
            Component: OverContent,
            source: overContentSource,
        },
        {
            id: 'sizes',
            title: 'Sizes and states',
            description: 'Three sizes, an icon button, and the disabled and loading states.',
            Component: Sizes,
            source: sizesSource,
        },
    ],
    notes: [
        <>
            Use a floating button only over images, video, or other content. On a normal surface, use{' '}
            <Link to="/components/ui/button">Button</Link>.
        </>,
        <>
            <Snippet.Inline>{'FloatingIconButton'}</Snippet.Inline> needs an{' '}
            <Snippet.Inline>{'aria-label'}</Snippet.Inline>.
        </>,
    ],
    props: [
        {
            component: 'FloatingButton',
            rows: [
                {
                    name: 'size',
                    type: sizeType,
                    defaultValue: "'md'",
                    description: 'Height and text size: 32, 40, or 48 pixels.',
                },
                { name: 'icon', type: 'ReactNode', description: 'An icon next to the text.' },
                {
                    name: 'iconPosition',
                    type: "'start' | 'end'",
                    defaultValue: "'start'",
                    description: 'Puts the icon before or after the text.',
                },
                {
                    name: 'loading',
                    type: 'boolean',
                    defaultValue: 'false',
                    description: 'Shows a spinner and disables the button. It stays focusable.',
                },
            ],
        },
        {
            component: 'FloatingIconButton',
            rows: [
                { name: 'icon', type: 'ReactNode', description: 'The icon. Required.' },
                { name: 'aria-label', type: 'string', description: 'The accessible name. Required.' },
                { name: 'size', type: sizeType, defaultValue: "'md'", description: 'A 32, 40, or 48 pixel circle.' },
            ],
        },
        {
            component: 'FloatingButtonGroup',
            rows: [
                {
                    name: 'size',
                    type: sizeType,
                    defaultValue: "'md'",
                    description: 'Sets the size of every button in the group.',
                },
            ],
        },
    ],
}
