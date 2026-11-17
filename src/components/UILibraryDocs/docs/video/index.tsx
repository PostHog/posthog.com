import React from 'react'
import { Snippet } from 'components/UI/Snippet'
import type { ComponentDoc } from '../../types'
import Themed from './Themed'
import themedSource from '!!../../rawSourceLoader!./Themed.tsx?raw'
import Manual from './Manual'
import manualSource from '!!../../rawSourceLoader!./Manual.tsx?raw'

export const doc: ComponentDoc = {
    slug: 'video',
    importPath: 'components/UI/Video',
    importNames: ['Video'],
    sourcePath: 'src/components/UI/Video',
    apiNote: 'Video is a site component. It accepts native video props and forwards its ref to the video element.',
    examples: [
        {
            id: 'themed',
            title: 'Product demo',
            description: 'The notebook clip follows the site theme.',
            Component: Themed,
            source: themedSource,
        },
        {
            id: 'manual',
            title: 'Manual playback',
            description:
                'Set autoPlay={false} to show the poster and native controls. The video starts when the user presses play.',
            Component: Manual,
            source: manualSource,
        },
    ],
    notes: [
        'Use Video for video files. For Wistia, use WistiaVideo.',
        <>
            Give every video a <Snippet.Inline>{'label'}</Snippet.Inline>. For speech, add caption tracks.
        </>,
        <>
            Set <Snippet.Inline>{'darkSrc'}</Snippet.Inline> when the clip shows UI, so it matches dark mode.
        </>,
        'Autoplay clips are muted and loop. Autoplay is off for users who prefer reduced motion.',
    ],
    props: [
        {
            component: 'Video',
            rows: [
                {
                    name: 'src',
                    type: 'string',
                    description: 'Required. The direct video URL for light mode and the fallback for dark mode.',
                },
                { name: 'darkSrc', type: 'string', description: 'The direct video URL for dark mode.' },
                {
                    name: 'poster / darkPoster',
                    type: 'string',
                    description: 'Poster images. Dark mode uses darkPoster when supplied.',
                },
                { name: 'label', type: 'string', description: 'Required. The accessible name of the video.' },
                {
                    name: 'caption',
                    type: 'ReactNode',
                    description: 'Visible text below the video. Also describes the video for assistive technology.',
                },
                {
                    name: 'frame',
                    type: 'boolean',
                    defaultValue: 'true',
                    description: 'Adds the shared glass surface, border, and shadow.',
                },
                {
                    name: 'loading',
                    type: "'lazy' | 'eager'",
                    defaultValue: "'lazy'",
                    description: 'Sets when the video receives its source.',
                },
                {
                    name: 'autoPlay',
                    type: 'boolean',
                    defaultValue: 'true',
                    description: 'Starts playback near the viewport unless reduced motion is active.',
                },
                {
                    name: 'loop',
                    type: 'boolean',
                    defaultValue: 'autoPlay',
                    description: 'Repeats the clip. Set false to play it once.',
                },
                {
                    name: 'muted / playsInline',
                    type: 'boolean',
                    defaultValue: 'true',
                    description: 'Mutes sound and permits inline playback.',
                },
                {
                    name: 'controls',
                    type: 'boolean',
                    defaultValue: '!autoPlay || reduced motion',
                    description:
                        'Overrides native control visibility. Autoplay clips without native controls show a play/pause button unless reduced motion is active.',
                },
                {
                    name: 'preload',
                    type: "'none' | 'metadata' | 'auto'",
                    defaultValue: "'none'",
                    description: 'Sets the browser preload hint after the source attaches.',
                },
                {
                    name: 'className / wrapperClassName',
                    type: 'string',
                    description: 'Styles the video or its outer figure.',
                },
                {
                    name: 'children',
                    type: 'ReactNode',
                    description:
                        'Native track elements for timed captions or descriptions. Do not add source elements; use src and darkSrc.',
                },
            ],
        },
    ],
}
