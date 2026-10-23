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
            title: 'Poster and manual playback',
            description: 'Remove the frame when the surrounding surface supplies one.',
            Component: Manual,
            source: manualSource,
        },
    ],
    notes: [
        'Video supports direct files. Use WistiaVideo for Wistia embeds. Provider scripts and player APIs remain separate.',
        'The source follows useApp().siteSettings.theme. Change the site theme to check both sources. The example preview toggle changes styles only.',
        'Reduced motion disables autoplay and shows native controls by default. A preference change pauses an autoplay clip. Users can start it manually.',
        'Autoplay clips hide native controls by default. A small play/pause button appears on hover or keyboard focus. Its label changes between Pause and Play.',
        'Explicit controls values override the default. Set controls to true for native controls on autoplay clips. Browsers can block autoplay with sound.',
        'Lazy loading attaches the source within 200 pixels of the viewport. Posters can load sooner. Set loading to eager for an immediately needed clip.',
        'Provide a label. Add caption for visible context. For speech, add native track children with timed captions. A figure caption does not replace them.',
        'Migration: videoLight → src, videoDark → darkSrc, classes → className, background → frame, and alt → label. ProductVideo ignored alt.',
        'Keep autoPlay, muted, and loop as boolean props. With autoPlay false, loop defaults to false. Add wrapperClassName="mb-4" for the old outer margin.',
        'ProductVideo autoplay clips keep their clean appearance. Video adds a keyboard-accessible pause button instead of native controls.',
        'Muted and inline playback default to true. Loop defaults to the requested autoPlay value. Native event handlers and the video ref remain available.',
        'Lazy loading disconnects its observer after the first intersection. Without IntersectionObserver, the source attaches after mount. Preload defaults to none.',
        'The frame uses cardLevels[1]. Set frame to false to remove its border, tint, and shadow. Rounded corners remain.',
        'Without darkSrc or darkPoster, dark mode uses src or poster. The initial render disables autoplay until the motion preference check completes.',
        'The demo URLs come from the notebooks docs and the product analytics page. The poster uses a Cloudinary frame from that clip.',
        'The default ratio is 16:9. Use className to set the clip ratio. A theme change can restart playback.',
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
