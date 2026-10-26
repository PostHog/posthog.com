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
                'Show one screenshot with a small part of the next slide. Set arrows to add previous and next buttons on the sides. These sources also appear in ProductScreenshot call sites.',
            Component: Screenshots,
            source: screenshotsSource,
        },
        {
            id: 'quotes',
            title: 'Several slides per view',
            description:
                'Customer quotes come from the site testimonial data. Wider containers show up to three cards.',
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
        'Replaces: ImageSlider and Home/Slider can pass their slide content as children. Map slidesToShow to slidesPerView. Every carousel wraps, so drop infinite.',
        'Replaces: BuilderCollective/CollectiveCarousel and Students/CampusSpotlightCarousel can pass photos as children and use autoplay={5000}. Keep city tabs and photo data in the caller.',
        'Replaces: templates/merch/ProductCarousel can keep its GatsbyImage children. Key Carousel by product ID to reset the scroll position when the product changes.',
        'Replaces: Careers/Pizza can pass PizzaBox content as children and use slidesPerView={3}. Keep filters and image opening in the caller.',
        'TutorialsSlider currently renders a static list. Keep its query and render tutorial cards as children when horizontal scrolling is useful.',
        'CardStackCarousel stays separate. Its overlapping cards, rotated drag poses, and stacked transitions do not match a native scrolling row.',
        'Every carousel wraps. After the last slide, the first slide comes next, for arrows, keys, touch, and automatic slides. The extra copies that make the loop are hidden from assistive technology and are not focusable.',
        'Touch, trackpad, and scrollbar input use native scrolling. The focused track supports arrow keys, Home, and End. Nested controls keep their keys.',
        'Automatic slides stop on keyboard focus or manual navigation. They pause on hover, offscreen, and in a hidden tab. Use the play button to enable them again.',
        'Reduced motion disables automatic slides and smooth scrolling and removes the pause button. Otherwise a pause or play icon button sits at the end of the control row.',
        'The live region announces the active slide only while automatic slides do not run. Each slide has a label such as “2 of 6”.',
        'The active dot fills with orange while automatic slides wait. The fill pauses with the slides, so the next slide always arrives when the fill ends. Vertical page scrolling does not stop automatic slides.',
        'Slides start at one per view. Container widths of 512px, 768px, and 1024px allow two, three, and four slides when requested. Peek always shows the same 10% (32px to 80px) of the next slide, which fades out to the edge. The scrollbar is hidden; arrows, dots, keys, touch, and trackpad scroll the row.',
        'Dots represent distinct scroll stops. The final stop can show several slides, so multi-slide views can have fewer dots than slides.',
        'Empty content renders nothing. A single slide has no navigation controls. All children remain in the DOM; keep large media lazy.',
        'Carousel does not provide adaptive height, vertical slides, mouse drag emulation, or a controlled index. Use equal image ratios for a stable row.',
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
