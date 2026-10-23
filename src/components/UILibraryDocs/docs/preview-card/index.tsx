import React from 'react'
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
            description:
                'A card opens 600 ms after the pointer enters the link. Pass delay to PreviewCard.Trigger to change it. This link goes to another site, so it uses href.',
            Component: Delay,
            source: delaySource,
        },
    ],
    notes: [
        <>
            <code>PreviewCard.Trigger</code> renders a plain <code>{'<a>'}</code> with the site&apos;s link color. For
            an internal link, pass <code>{'render={<GatsbyLink to="/path" />}'}</code> (<code>Link</code> from{' '}
            <code>gatsby</code>).
        </>,
        <>
            Do not pass <code>components/Link</code> to <code>render</code>. It does not forward its ref.
        </>,
        <>
            The card opens after 600 ms and closes 300 ms after the pointer leaves. Pass <code>delay</code> and{' '}
            <code>closeDelay</code> to <code>PreviewCard.Trigger</code> to change this.
        </>,
        <>
            Touch screens have no hover, so some users never see the card. Do not put information in the card that is
            not also on the linked page.
        </>,
        <>
            <code>PreviewCard.Popup</code> combines Base UI&apos;s <code>Portal</code>, <code>Positioner</code>, and{' '}
            <code>Popup</code>. Pass positioner props, such as <code>side</code> and <code>align</code>, to it. It
            renders at the end of <code>{'<body>'}</code> and sets <code>data-scheme=&quot;primary&quot;</code>.
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
