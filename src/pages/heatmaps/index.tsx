import React, { useRef } from 'react'
import { IconCode, IconCursorClick, IconEye, IconInfo, IconList, IconMagic } from '@posthog/icons'
import ReaderView from 'components/ReaderView'
import SEO from 'components/seo'
import useProduct from 'hooks/useProduct'
import CloudinaryImage from 'components/CloudinaryImage'
import OSButton from 'components/OSButton'
import {
    buildProductMenuTabs,
    LabeledList,
    ProductSwitcher,
    type ProductNavItem,
} from 'components/Products/ReaderViewProduct'
import type { SectionComponentProps } from 'components/Products/ReaderViewProduct'
import { SectionHeading } from 'components/Products/ReaderViewProduct/helpers'
import Eli5 from 'components/Products/ReaderViewProduct/templates/Eli5'
import Overview from 'components/Products/ReaderViewProduct/templates/Overview'
import UseCases from 'components/Products/ReaderViewProduct/templates/UseCases'

const productMenu: ProductNavItem[] = [
    { slug: 'overview', name: 'Overview', icon: <IconEye className="size-4" /> },
    {
        slug: 'eli5',
        name: 'What does it do?',
        hideFromNav: true,
        icon: <IconInfo className="size-4" />,
    },
    {
        slug: 'use-cases',
        name: 'Who is it for?',
        hideFromNav: true,
        icon: <IconMagic className="size-4" />,
    },
    { slug: 'how-to-use', name: 'How do I use it?', icon: <IconCursorClick className="size-4" /> },
    { slug: 'top-features', name: 'Top features', icon: <IconList className="size-4" /> },
    { slug: 'installation', name: 'Install', icon: <IconCode className="size-4" /> },
]

const TOOLBAR_HEATMAP =
    'https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/tutorials/toolbar/toolbar-heatmap.png'
const SETTINGS_IMAGE =
    'https://res.cloudinary.com/dmukukwp6/image/upload/v1716592885/posthog.com/contents/docs/toolbar/settings.png'
const SCROLLMAP_IMAGE =
    'https://res.cloudinary.com/dmukukwp6/image/upload/v1716593249/posthog.com/contents/docs/toolbar/scrollmap.png'
const CLICKMAP_IMAGE =
    'https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/tutorials/toolbar/posthog-heatmap-example.png'
const IN_APP_IMAGE = 'https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/heatmaps_in_app_9b447c455e.png'
const SETTINGS_CONFIGURATION_IMAGE =
    'https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/heatmaps_settings_59f5d1258b.png'

const HeatmapsHowToUse = ({ id }: SectionComponentProps) => (
    <section id={id} className="scroll-mt-20 not-prose">
        <SectionHeading>How do I use it?</SectionHeading>
        <div className="grid grid-cols-1 @3xl/reader-content:grid-cols-2 gap-6">
            <article className="border border-primary rounded p-5 bg-primary">
                <h3 className="text-lg font-bold text-primary mt-0 mb-2">On your live site</h3>
                <p className="text-sm leading-relaxed text-secondary mt-0 mb-4">
                    Open the PostHog toolbar and select the heatmap icon to see activity overlaid directly on the page.
                </p>
                <CloudinaryImage
                    src={TOOLBAR_HEATMAP}
                    alt="Heatmaps displayed through the PostHog toolbar"
                    className="w-full max-w-lg mx-auto"
                    imgClassName="w-full h-auto rounded border border-primary"
                />
            </article>
            <article className="border border-primary rounded p-5 bg-primary">
                <h3 className="text-lg font-bold text-primary mt-0 mb-2">Inside PostHog</h3>
                <p className="text-sm leading-relaxed text-secondary mt-0 mb-4">
                    Open Heatmaps, enter the page URL, then use filters or wildcard URL matching to combine similar
                    pages.
                </p>
                <CloudinaryImage
                    src={IN_APP_IMAGE}
                    alt="Heatmaps in the PostHog app"
                    className="w-full max-w-lg mx-auto"
                    imgClassName="w-full h-auto rounded border border-primary"
                />
            </article>
        </div>
    </section>
)

const HeatmapsTopFeatures = ({ id }: SectionComponentProps) => (
    <section id={id} className="scroll-mt-20 not-prose">
        <SectionHeading>Top features</SectionHeading>

        <div className="grid grid-cols-1 @3xl/reader-content:grid-cols-3 gap-5 mb-10">
            {[
                {
                    title: 'Heatmaps',
                    description:
                        'See mouse movements, clicks, dead clicks, and rageclicks – including attempts to click non-interactive elements.',
                    src: SETTINGS_IMAGE,
                    alt: 'Heatmap settings',
                },
                {
                    title: 'Scrollmaps',
                    description: 'Use pageview and pageleave events to see how far people scroll and where they stop.',
                    src: SCROLLMAP_IMAGE,
                    alt: 'A PostHog scrollmap',
                },
                {
                    title: 'Clickmaps',
                    description: 'Use autocapture to show exact click and rageclick counts on clickable elements.',
                    src: CLICKMAP_IMAGE,
                    alt: 'A PostHog clickmap',
                },
            ].map(({ title, description, src, alt }) => (
                <article key={title} className="border border-primary rounded p-4 bg-primary flex flex-col">
                    <h3 className="text-lg font-bold text-primary mt-0 mb-1">{title}</h3>
                    <p className="text-sm leading-relaxed text-secondary mt-0 mb-4">{description}</p>
                    <CloudinaryImage
                        src={src}
                        alt={alt}
                        className="w-full max-w-sm mx-auto mt-auto"
                        imgClassName="w-full h-auto rounded border border-primary"
                    />
                </article>
            ))}
        </div>

        <LabeledList
            items={[
                {
                    label: 'Flexible configuration',
                    description:
                        'Switch between total events and unique users, adjust viewport tolerance, change colors, and handle fixed elements.',
                },
                {
                    label: 'Wildcard URL matching',
                    description: (
                        <>
                            Combine similar pages with patterns such as <code>/products/*</code>.
                        </>
                    ),
                },
                {
                    label: 'Create actions from clicks',
                    description: 'Select an element in a clickmap and turn it into a trackable action without code.',
                },
                {
                    label: 'No extra billing',
                    description:
                        'Heatmap data is captured alongside regular analytics events and does not contribute to your bill.',
                },
            ]}
        />

        <div className="mt-8 max-w-2xl mx-auto">
            <video className="w-full h-auto rounded border border-primary shadow-lg" autoPlay loop muted playsInline>
                <source
                    src="https://res.cloudinary.com/dmukukwp6/video/upload/v1710055416/posthog.com/contents/images/products/product-analytics/heatmaps-create-action.mp4"
                    type="video/mp4"
                />
            </video>
        </div>
    </section>
)

const HeatmapsInstallation = ({ id }: SectionComponentProps) => (
    <section id={id} className="scroll-mt-20 not-prose mb-20">
        <SectionHeading>Install</SectionHeading>
        <p className="text-base leading-relaxed text-secondary mt-0 mb-5 max-w-3xl">
            Enable heatmap data capture in your project settings or set <code>enable_heatmaps</code> in the JavaScript
            SDK. Clickmaps require autocapture and scrollmaps require pageleave events.
        </p>
        <CloudinaryImage
            src={SETTINGS_CONFIGURATION_IMAGE}
            alt="Heatmap data capture settings"
            className="w-full max-w-2xl mx-auto mb-6"
            imgClassName="w-full h-auto rounded border border-primary shadow-lg"
        />
        <div className="grid grid-cols-1 @2xl/reader-content:grid-cols-2 gap-4">
            <OSButton asLink variant="primary" size="md" to="/signup" width="full">
                Get started – free
            </OSButton>
            <OSButton asLink variant="secondary" size="md" to="/docs/toolbar/heatmaps" width="full">
                Read the documentation
            </OSButton>
        </div>
    </section>
)

export default function Heatmaps() {
    const heatmapsProduct = useProduct({ handle: 'heatmaps' }) as any
    const sectionsRef = useRef<HTMLDivElement>(null)

    if (!heatmapsProduct) return <div>Product not found</div>

    const productData = {
        ...heatmapsProduct,
        productMenu,
        overview: {
            ...heatmapsProduct.overview,
            title: "See your site through your users' eyes",
            eli5: 'Heatmaps show you how users interact with elements on your website or app. Visualize clicks, mouse movements, and scrolling behavior, then find frustration through dead clicks and rageclicks.',
        },
        screenshots: {
            home: {
                src: TOOLBAR_HEATMAP,
                alt: 'PostHog heatmaps overlaid on a webpage',
            },
        },
        hogs: heatmapsProduct.hog
            ? {
                  mobileHog: {
                      src: heatmapsProduct.hog.src,
                      alt: heatmapsProduct.hog.alt,
                      className: 'h-28 @2xl/reader-content:h-36',
                  },
              }
            : undefined,
        useCases: {
            rows: [
                ['Product teams', 'See which elements attract attention and where users get stuck'],
                ['Designers & researchers', 'Find dead clicks, rageclicks, and content people never reach'],
                ['Growth teams', 'Compare calls to action and landing-page behavior without extra tracking'],
                ['Engineers', 'Open the events and session recordings behind activity on the page'],
            ],
        },
    }
    const menuTabs = buildProductMenuTabs({ productData, contentRef: sectionsRef, activeSurface: 'product' })

    return (
        <>
            <SEO
                title={heatmapsProduct.seo?.title || 'Heatmaps - PostHog'}
                description={heatmapsProduct.seo?.description}
                image="/images/og/default.png"
            />
            <ReaderView
                title={heatmapsProduct.name}
                hideTitle
                proseSize="lg"
                showQuestions={false}
                menuTabs={menuTabs}
                productSelect={<ProductSwitcher activeHandle={heatmapsProduct.handle} />}
            >
                <div ref={sectionsRef} className="flex flex-col gap-12">
                    <Overview id="overview" productData={productData} allProducts={[]} hideProductLabel />
                    <div className="not-prose flex flex-col divide-y divide-primary [&>*]:py-8 [&>*:first-child]:pt-0 [&>*:last-child]:pb-0">
                        <Eli5 id="eli5" productData={productData} allProducts={[]} />
                        <UseCases id="use-cases" productData={productData} allProducts={[]} />
                        <HeatmapsHowToUse id="how-to-use" productData={productData} allProducts={[]} />
                        <HeatmapsTopFeatures id="top-features" productData={productData} allProducts={[]} />
                        <HeatmapsInstallation id="installation" productData={productData} allProducts={[]} />
                    </div>
                </div>
            </ReaderView>
        </>
    )
}
