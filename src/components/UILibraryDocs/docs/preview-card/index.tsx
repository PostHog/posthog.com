import React from 'react'
import { Snippet } from 'components/UI/Snippet'
import type { ComponentDoc } from '../../types'
import { HoverSurfaceGuide } from '../../ChoiceGuide'
import Delay from './Delay'
import delaySource from '!!../../rawSourceLoader!./Delay.tsx?raw'
import LinkPreviews from './LinkPreviews'
import linkPreviewsSource from '!!../../rawSourceLoader!./LinkPreviews.tsx?raw'

export const doc: ComponentDoc = {
    slug: 'preview-card',
    importPath: 'components/UI/PreviewCard',
    importNames: ['PreviewCard'],
    sourcePath: 'src/components/UI/PreviewCard',
    baseUi: [{ label: 'Base UI Preview Card', url: 'https://base-ui.com/react/components/preview-card' }],
    examples: [
        {
            id: 'link-previews',
            title: 'Link previews',
            description:
                'Use a preview card to preview a linked page. Hover a link to see its card. Each trigger here renders a Gatsby Link.',
            Component: LinkPreviews,
            source: linkPreviewsSource,
        },
        {
            id: 'delay',
            title: 'Open delay',
            description:
                'Pass delay to PreviewCard.Trigger to set how long the hover lasts before the card opens. This demo uses 200 ms.',
            Component: Delay,
            source: delaySource,
        },
    ],
    notes: [
        <HoverSurfaceGuide key="guide" />,
        'Touch screens cannot hover, so do not put information in the card that the linked page does not have.',
        <>
            For an internal link, pass <Snippet.Inline>{'render={<GatsbyLink to="/path" />}'}</Snippet.Inline> to{' '}
            <Snippet.Inline>{'PreviewCard.Trigger'}</Snippet.Inline>.
        </>,
    ],
    props: [
        {
            component: 'PreviewCard.Trigger',
            rows: [
                {
                    name: 'appearance',
                    type: "'link' | 'none'",
                    defaultValue: "'link'",
                    description:
                        'link styles the trigger as a text link. none adds no styles, for a trigger that has its own look, such as a chip.',
                },
            ],
        },
        {
            component: 'PreviewCard.Popup',
            rows: [
                {
                    name: 'sideOffset',
                    type: 'number',
                    defaultValue: '8',
                    description: 'The gap between the link and the card, in pixels.',
                },
                {
                    name: 'container',
                    type: 'HTMLElement | ShadowRoot | RefObject | null',
                    description: 'The element that the card renders into. The default is the document body.',
                },
            ],
        },
    ],
}
