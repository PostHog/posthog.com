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
            description:
                'Select a screenshot to inspect it. Light and dark sources match existing ProductScreenshot call sites.',
            Component: ProductScreenshots,
            source: productScreenshotsSource,
        },
        {
            id: 'columns',
            title: 'Photos and merch in columns',
            description:
                'Images keep their proportions. The layout uses CSS columns instead of a JavaScript masonry dependency.',
            Component: PhotoColumns,
            source: photoColumnsSource,
        },
    ],
    notes: [
        'Set frame={false} and renderThumbnail to put the zoom on an existing frame. Thumbnail content must not contain interactive controls.',
        'Set showThumbnailCaptions={false} when the caller already shows the caption. The lightbox still shows the caption.',
        'The column count never exceeds the image count. Use columns={1} for a single full-width frame.',
        'Replaces: groups of ProductScreenshot images can become Gallery items. Map imageLight, imageDark, and alt directly. Add a caption when useful.',
        'Replaces: grouped ZoomImage or react-medium-image-zoom images can use one Gallery lightbox with previous and next controls.',
        'Keep ZoomImage for an isolated image in article prose. Its inline zoom behavior differs from a collection lightbox. Gallery does not remove that dependency.',
        'Careers/Pizza can use this lightbox approach instead of its custom fullscreen modal. Gallery displays a grid, so a carousel composition needs separate integration.',
        'The library Dialog supplies modal focus, Escape, and the close button. Closing returns focus to the thumbnail that opened it.',
        'Use the left and right arrow keys inside the lightbox to change images. Navigation wraps at the ends. A status announces the image position and description.',
        'The popup follows the site theme because Dialog uses a portal. A light or dark docs preview controls its thumbnails only.',
        'Grid order runs across rows. CSS columns run down each column. DOM order, keyboard order, and lightbox order remain the same.',
        'Supply width and height from the image metadata to reserve space before images load. Column layouts keep each image ratio.',
        'Thumbnails load lazily. The selected lightbox image loads eagerly. Light and dark sources use separate image elements, as ProductScreenshot does.',
        'Empty collections render nothing. One image still opens, but it has no navigation buttons. Dialog transitions respect reduced motion.',
        'Gallery offers an enlarged image view, not pan or pinch zoom. Keep captions descriptive and keep interactive controls outside captions.',
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
