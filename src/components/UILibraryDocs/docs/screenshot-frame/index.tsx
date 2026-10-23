import type { ComponentDoc } from '../../types'
import Frames from './Frames'
import framesSource from '!!../../rawSourceLoader!./Frames.tsx?raw'
import Zoom from './Zoom'
import zoomSource from '!!../../rawSourceLoader!./Zoom.tsx?raw'

export const doc: ComponentDoc = {
    slug: 'screenshot-frame',
    importPath: 'components/UI/ScreenshotFrame',
    importNames: ['ScreenshotFrame'],
    sourcePath: 'src/components/UI/ScreenshotFrame',
    apiNote: 'ScreenshotFrame accepts figure props and forwards its ref to the figure.',
    examples: [
        {
            id: 'frames',
            title: 'Browser, laptop, and phone',
            description: 'The screenshot follows the light or dark theme. Chrome is decorative.',
            Component: Frames,
            source: framesSource,
        },
        {
            id: 'zoom',
            title: 'Optional zoom',
            description: 'Use zoom for screenshots with small labels.',
            Component: Zoom,
            source: zoomSource,
        },
    ],
    notes: [
        'Replaces: ProductScreenshot framing. Map imageLight to src, imageDark to darkSrc, alt to alt, and classes to imageClassName. Use the browser frame for desktop screenshots.',
        'ProductScreenshot enables zoom unless zoom is false. ScreenshotFrame disables zoom by default. Pass zoom={legacyZoom !== false} to preserve that behavior.',
        'BorderWrapper accepts arbitrary content and draws top and bottom borders. It is not an image frame. Keep it for general sections.',
        'The browser frame puts the square and close marks on the right, like site windows. The marks are decorative and cannot close the frame.',
        'The address is display text. copyAddress adds a copy button to the address bar that copies the full https URL.',
        'Laptop and phone screens crop the image from the top to fit the screen ratio (16:10 and 9:19.5). Use a portrait screenshot for the phone.',
        'The devices are physical objects, so they keep the same colors in light and dark mode.',
        'Both image sources render on the server. Theme classes select the visible image without JavaScript. Without darkSrc, both themes use src.',
        'Zoom composes Gallery with one image. Gallery owns focus, Escape, and theme-aware enlarged images. The caption also appears inside the lightbox.',
        'Gallery adds optional frame and renderThumbnail props for this composition. Existing Gallery use stays unchanged. ScreenshotFrame owns the outer frame and native image props.',
        'Use imageProps for width, height, loading, and image events. Supply actual dimensions to reserve space. Use loading="eager" for an image above the fold.',
        'The example URLs come from contents/docs/product-analytics/start-here.mdx. Existing call sites remain unchanged.',
    ],
    props: [
        {
            component: 'ScreenshotFrame',
            rows: [
                {
                    name: 'src / darkSrc',
                    type: 'string',
                    description: 'Light image URL and optional dark image URL. src is required.',
                },
                { name: 'alt', type: 'string', description: 'Required. Describe the screenshot.' },
                {
                    name: 'frame',
                    type: "'browser' | 'laptop' | 'phone'",
                    defaultValue: "'browser'",
                    description: 'Selects the surrounding chrome.',
                },
                {
                    name: 'address',
                    type: 'string',
                    defaultValue: "'posthog.com'",
                    description: 'The text in the browser address bar.',
                },
                {
                    name: 'copyAddress',
                    type: 'boolean',
                    defaultValue: 'false',
                    description: 'Adds a copy button to the right of the address bar.',
                },
                {
                    name: 'title',
                    type: 'string',
                    defaultValue: "'PostHog'",
                    description: 'Names the lightbox when zoom is on.',
                },
                { name: 'caption', type: 'ReactNode', description: 'Adds a visible figure caption.' },
                {
                    name: 'zoom',
                    type: 'boolean',
                    defaultValue: 'false',
                    description: 'Opens the image in a lightbox when selected.',
                },
                {
                    name: 'imageClassName / imageProps',
                    type: 'string / ImgHTMLAttributes',
                    description:
                        'Styles the image or supplies native image props. Source, alt, and className use dedicated props.',
                },
            ],
        },
    ],
}
