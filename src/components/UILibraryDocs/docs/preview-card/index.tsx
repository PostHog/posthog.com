import React from 'react'
import { Snippet } from 'components/UI/Snippet'
import type { ComponentDoc } from '../../types'
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
                'Hover a link to see its card. These links go to pages on this site, so each trigger renders a Gatsby Link.',
            Component: LinkPreviews,
            source: linkPreviewsSource,
        },
        {
            id: 'delay',
            title: 'Open delay',
            description: 'Cards open 600 ms after hover. Pass delay to PreviewCard.Trigger to change it.',
            Component: Delay,
            source: delaySource,
        },
    ],
    notes: [
        'Use PreviewCard to preview a linked page. Touch screens cannot hover, so do not put information in the card that the linked page does not have.',
        <>
            For an internal link, pass <Snippet.Inline>{'render={<GatsbyLink to="/path" />}'}</Snippet.Inline> to{' '}
            <Snippet.Inline>{'PreviewCard.Trigger'}</Snippet.Inline>.
        </>,
    ],
    props: [
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
