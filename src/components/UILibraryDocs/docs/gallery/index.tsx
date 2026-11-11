import React from 'react'
import { Snippet } from 'components/UI/Snippet'
import type { ComponentDoc } from '../../types'
import ProductScreenshots from './ProductScreenshots'
import productScreenshotsSource from '!!../../rawSourceLoader!./ProductScreenshots.tsx?raw'
import PhotoColumns from './PhotoColumns'
import photoColumnsSource from '!!../../rawSourceLoader!./PhotoColumns.tsx?raw'

export const doc: ComponentDoc = {
    slug: 'gallery',
    importPath: 'components/UI/Gallery',
    importNames: ['Gallery'],
    sourcePath: 'src/components/UI/Gallery',
    apiNote: 'Gallery is a site component. It uses the library Dialog for an image lightbox.',
    examples: [
        {
            id: 'screenshots',
            title: 'Product screenshots',
            description: 'Select a screenshot to inspect it.',
            Component: ProductScreenshots,
            source: productScreenshotsSource,
        },
        {
            id: 'columns',
            title: 'Photos and merch in columns',
            description: 'Images keep their proportions in CSS columns.',
            Component: PhotoColumns,
            source: photoColumnsSource,
        },
    ],
    notes: [
        'Use Gallery for a set of screenshots or photos that users may want to see larger.',
        <>
            Give each image <Snippet.Inline>{'width'}</Snippet.Inline> and <Snippet.Inline>{'height'}</Snippet.Inline>{' '}
            from its metadata to stop layout shift, and write <Snippet.Inline>{'alt'}</Snippet.Inline> text. A caption
            does not replace alt text.
        </>,
        'Do not put links or buttons in thumbnails or captions.',
    ],
    props: [
        {
            component: 'Gallery',
            rows: [
                { name: 'items', type: 'GalleryItem[]', description: 'The images in keyboard and lightbox order.' },
                { name: 'label', type: 'string', description: 'Names the image group and the lightbox.' },
                {
                    name: 'layout',
                    type: "'grid' | 'columns'",
                    defaultValue: "'grid'",
                    description: 'Uses rows or CSS columns.',
                },
                {
                    name: 'columns',
                    type: '1 | 2 | 3 | 4',
                    defaultValue: '3',
                    description: 'Sets the maximum column count. Narrow containers show one column.',
                },
                { name: 'className', type: 'string', description: 'Adds classes to the outer container.' },
                {
                    name: 'frame',
                    type: 'boolean',
                    defaultValue: 'true',
                    description: 'Shows the raised surface around each thumbnail.',
                },
                {
                    name: 'renderThumbnail',
                    type: '(item: GalleryItem) => ReactNode',
                    description: 'Replaces the thumbnail content. Gallery keeps the button and lightbox behavior.',
                },
                {
                    name: 'showThumbnailCaptions',
                    type: 'boolean',
                    defaultValue: 'true',
                    description: 'Shows captions below thumbnails. Lightbox captions remain visible.',
                },
            ],
        },
        {
            component: 'GalleryItem',
            rows: [
                {
                    name: 'imageLight',
                    type: 'string',
                    description: 'The image URL. It also serves dark mode when imageDark is absent.',
                },
                { name: 'imageDark', type: 'string', description: 'The optional dark image URL.' },
                { name: 'alt', type: 'string', description: 'Describes the image and names its thumbnail button.' },
                { name: 'caption', type: 'ReactNode', description: 'The visible caption below the image.' },
                {
                    name: 'width / height',
                    type: 'number',
                    description: 'The intrinsic dimensions from image metadata.',
                },
            ],
        },
    ],
}
