import React from 'react'
import { Snippet } from 'components/UI/Snippet'
import type { ComponentDoc } from '../../types'
import Screenshots from './Screenshots'
import screenshotsSource from '!!../../rawSourceLoader!./Screenshots.tsx?raw'
import CustomerQuotes from './CustomerQuotes'
import customerQuotesSource from '!!../../rawSourceLoader!./CustomerQuotes.tsx?raw'
import AutomaticPhotos from './AutomaticPhotos'
import automaticPhotosSource from '!!../../rawSourceLoader!./AutomaticPhotos.tsx?raw'

export const doc: ComponentDoc = {
    slug: 'carousel',
    importPath: 'components/UI/Carousel',
    importNames: ['Carousel'],
    sourcePath: 'src/components/UI/Carousel',
    apiNote:
        'Carousel is a site component. Each child becomes one slide. It uses native CSS scroll-snap without a slider dependency.',
    examples: [
        {
            id: 'screenshots',
            title: 'Product screenshots',
            description:
                'One screenshot with part of the next one showing. Set arrows to add previous and next buttons, which show on hover.',
            Component: Screenshots,
            source: screenshotsSource,
        },
        {
            id: 'quotes',
            title: 'Several slides per view',
            description: 'Wider containers show up to three cards.',
            Component: CustomerQuotes,
            source: customerQuotesSource,
        },
        {
            id: 'automatic',
            title: 'Optional automatic slides',
            description:
                'Campus photos advance every five seconds. The active dot fills while the next slide waits. Use the pause button to stop automatic slides.',
            Component: AutomaticPhotos,
            source: automaticPhotosSource,
        },
    ],
    notes: [
        'Use a carousel to browse a set of similar items. Do not put content that every user must see after the first slide.',
        'Use slides with the same aspect ratio, so the row height stays stable.',
        <>
            Arrows are off by default. Turn on <Snippet.Inline>{'arrows'}</Snippet.Inline> when users may not know they
            can swipe, such as for screenshots on desktop.
        </>,
        <>
            Use <Snippet.Inline>{'autoplay'}</Snippet.Inline> rarely. It stops when the user focuses or moves the
            carousel, and it is off for users who prefer reduced motion.
        </>,
    ],
    props: [
        {
            component: 'Carousel',
            rows: [
                { name: 'label', type: 'string', description: 'Names the carousel region.' },
                {
                    name: 'children',
                    type: 'ReactNode',
                    description: 'One slide per child. Use stable keys when data changes.',
                },
                {
                    name: 'slidesPerView',
                    type: '1 | 2 | 3 | 4',
                    defaultValue: '1',
                    description: 'Sets the maximum slide count in a wide container.',
                },
                {
                    name: 'peek',
                    type: 'boolean',
                    defaultValue: 'false',
                    description: 'Shows 10% of the next slide, from 32px to 80px, with a soft edge fade.',
                },
                {
                    name: 'autoplay',
                    type: 'number',
                    defaultValue: '0',
                    description: 'Sets the delay in milliseconds. Zero disables it. The minimum delay is 1000ms.',
                },
                {
                    name: 'dots',
                    type: 'boolean',
                    defaultValue: 'true',
                    description: 'Shows buttons for distinct scroll stops.',
                },
                {
                    name: 'arrows',
                    type: 'boolean',
                    defaultValue: 'false',
                    description:
                        'Shows previous and next buttons on the left and right of the slides. They appear on hover and keyboard focus, and always on touch screens.',
                },
                {
                    name: 'onActiveIndexChange',
                    type: '(index: number) => void',
                    description: 'Receives the zero-based index at the active scroll stop.',
                },
                {
                    name: 'className / slideClassName',
                    type: 'string',
                    description: 'Adds classes to the region or each slide.',
                },
            ],
        },
    ],
}
