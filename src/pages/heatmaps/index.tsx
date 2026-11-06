import React, { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import {
    IconAI,
    IconApps,
    IconArrowUpRight,
    IconBook,
    IconCheck,
    IconCode,
    IconEye,
    IconHandMoney,
    IconReact,
    IconGlobe,
    IconInfo,
    IconLaptop,
    IconList,
    IconQuestion,
    IconToolbar,
    IconX,
} from '@posthog/icons'
import { HedgehogCursor, HedgehogDynamite } from '@posthog/brand/hoggies'
import { colors } from '@posthog/brand/colors'
import ReaderView from 'components/ReaderView'
import { SingleCodeBlock } from 'components/CodeBlock'
import WizardCommand from 'components/WizardCommand'
import SEO, { buildProductStructuredData } from 'components/seo'
import useProduct from 'hooks/useProduct'
import CloudinaryImage from 'components/CloudinaryImage'
import OSButton from 'components/OSButton'
import Link from 'components/Link'
import ElementScrollLink, { ScrollSpyProvider } from 'components/ElementScrollLink'
import type { CTALinkKey } from 'components/CTAs'
import { buildProductMenuTabs, ProductSwitcher, type ProductNavItem } from 'components/Products/ReaderViewProduct'
import type { SectionComponentProps } from 'components/Products/ReaderViewProduct'
import { InlineCode, SectionHeading } from 'components/Products/ReaderViewProduct/helpers'
import Overview from 'components/Products/ReaderViewProduct/templates/Overview'
import ToolsTicker, { DEFAULT_HANDLES } from 'components/Home/ToolsTicker'
import { AppIcon, isAppIconName } from 'components/OSIcons/AppIcon'
import KeyboardShortcut from 'components/KeyboardShortcut'

/**
 * AEO/SEO proof of concept for the Heatmaps product page.
 *
 * Every section answers one question a searcher or an LLM asks about heatmaps,
 * answer-first, as plain visible text (no carousels or tabs). Section ids double
 * as anchors so `/heatmaps#scrollmaps` and friends resolve.
 */

const SEO_TITLE = 'Website heatmaps, clickmaps & scrollmaps - Free | PostHog'
const SEO_DESCRIPTION =
    'See where users click, scroll, and rage-click with PostHog heatmaps, clickmaps, and scrollmaps. Heatmap data is free to collect. Works with session replay and analytics.'

const productMenu: ProductNavItem[] = [
    { slug: 'overview', name: 'Overview', icon: <IconEye className="size-4" /> },
    { slug: 'quick-links', name: 'Skip to', hideFromNav: true },
    { slug: 'at-a-glance', name: 'At a glance', hideFromNav: true, icon: <IconInfo className="size-4" /> },
    { slug: 'try-it', name: 'Try it on this page', hideFromNav: true },
    { slug: 'setup', name: 'How to set up heatmaps', icon: <IconCode className="size-4" /> },
    { slug: 'pricing', name: 'Pricing', icon: <IconHandMoney className="size-4" /> },
    { slug: 'works-with', name: 'Works with', icon: <IconApps className="size-4" /> },
    { slug: 'compare', name: 'PostHog vs other heatmap tools', icon: <IconList className="size-4" /> },
    { slug: 'vs-hotjar', name: 'PostHog vs Hotjar', hideFromNav: true },
    { slug: 'faq', name: 'FAQ', icon: <IconQuestion className="size-4" /> },
    { slug: 'get-started', name: 'Get started', hideFromNav: true },
    { slug: 'docs', name: 'Docs & tutorials', icon: <IconBook className="size-4" /> },
]

const SETTINGS_IMAGE =
    'https://res.cloudinary.com/dmukukwp6/image/upload/v1716592885/posthog.com/contents/docs/toolbar/settings.png'
const SCROLLMAP_IMAGE =
    'https://res.cloudinary.com/dmukukwp6/image/upload/v1716593249/posthog.com/contents/docs/toolbar/scrollmap.png'
const CLICKMAP_IMAGE =
    'https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/tutorials/toolbar/posthog-heatmap-example.png'
const IN_APP_IMAGE = 'https://res.cloudinary.com/dmukukwp6/image/upload/heatmaps_tool_f7abfb85c7.png'

/* -------------------------------------------------------------------------- */
/* Shared bits                                                                 */
/* -------------------------------------------------------------------------- */

const Section = ({ id, children, className = '' }: { id: string; children: React.ReactNode; className?: string }) => (
    <section id={id} className={`scroll-mt-20 not-prose ${className}`}>
        {children}
    </section>
)

const Prose = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
    <div className={`max-w-3xl text-base leading-relaxed text-secondary [&>p]:m-0 [&>p+p]:mt-3 ${className}`}>
        {children}
    </div>
)

/* -------------------------------------------------------------------------- */
/* PostHog vs other heatmap tools                                              */
/* -------------------------------------------------------------------------- */

// Short names for the mobile verdict, so the links fit on one line.
const mobileOptions = [
    { to: '/compare/hotjar-for-mobile-ios-android-react-native-flutter', label: 'Hotjar' },
    { to: '/blog/best-microsoft-clarity-alternatives', label: 'Microsoft Clarity' },
    { to: '/compare/best-contentsquare-alternatives', label: 'Contentsquare' },
    { to: '/compare/best-mouseflow-alternatives', label: 'Mouseflow' },
]

type ComparePick = { situation: string; pick: React.ReactNode }

/* Static on purpose: every situation and its pick are plain text in the HTML, so
   crawlers and LLMs can quote full "If you…, pick…" sentences. */
const comparePicks: ComparePick[] = [
    {
        situation: 'If you like free things (who doesn’t?),',
        pick: (
            <>
                PostHog and Microsoft Clarity are your best options. Both give you heatmaps for free, and PostHog
                heatmap data never adds to your bill.
            </>
        ),
    },
    {
        situation: 'If you want heatmaps next to session replay, product analytics, feature flags, and experiments,',
        pick: <>go with PostHog. It’s one SDK and one bill.</>,
    },
    {
        situation: 'If you want to turn a hot spot into a funnel or an experiment,',
        pick: (
            <>
                go with PostHog. You can make any element a{' '}
                <Link className="underline" to="/docs/data/actions">
                    tracked action
                </Link>{' '}
                without code.
            </>
        ),
    },
    {
        situation: 'If you want AI agents to read your heatmaps,',
        pick: (
            <>
                go with PostHog.{' '}
                <Link className="underline" to="/ai">
                    PostHog AI
                </Link>{' '}
                and the{' '}
                <Link className="underline" to="/mcp">
                    MCP server
                </Link>{' '}
                can read and save them.
            </>
        ),
    },
    {
        situation: 'If you run user interviews and usability tests,',
        pick: (
            <>
                <Link className="underline" to="/compare/posthog-vs-hotjar">
                    Hotjar
                </Link>{' '}
                (now part of Contentsquare) is built for that.
            </>
        ),
    },
    {
        situation: 'If you need heatmaps inside a native iOS or Android app,',
        pick: <>look at {mobileOptionsLinks()}. PostHog heatmaps are web only.</>,
    },
]

const deepDives = [
    { to: '/compare/hotjar-for-mobile-ios-android-react-native-flutter', label: 'Hotjar for mobile apps' },
    { to: '/compare/best-hotjar-alternatives', label: 'Hotjar alternatives' },
    { to: '/blog/best-microsoft-clarity-alternatives', label: 'Microsoft Clarity alternatives' },
    { to: '/compare/best-contentsquare-alternatives', label: 'Contentsquare alternatives' },
    { to: '/compare/best-mouseflow-alternatives', label: 'Mouseflow alternatives' },
]

function mobileOptionsLinks() {
    return mobileOptions.map(({ to, label }, index, list) => (
        <React.Fragment key={to}>
            {index > 0 && (index === list.length - 1 ? ', or ' : ', ')}
            <Link className="underline" to={to}>
                {label}
            </Link>
        </React.Fragment>
    ))
}

const ComparePicks = () => (
    <ul className="m-0 p-0 list-none flex flex-col gap-2">
        {comparePicks.map(({ situation, pick }, index) => (
            <HeatCard as="li" key={situation} className="m-0">
                <div className="flex items-start gap-3">
                    <span
                        aria-hidden
                        className="size-2.5 shrink-0 rounded-full mt-2"
                        style={{ backgroundColor: heatAt(index / (comparePicks.length - 1)) }}
                    />
                    <p className="m-0 text-[15px] leading-relaxed text-secondary">
                        <strong className="text-primary">{situation}</strong> {pick}
                    </p>
                </div>
            </HeatCard>
        ))}
    </ul>
)

const HeatmapsCompare = ({ id }: SectionComponentProps) => (
    <Section id={id}>
        <SectionHeading>How does PostHog compare to other heatmap tools?</SectionHeading>
        {/* Not the SectionHeading lede: its text-balance broke this sentence into short lines. */}
        <p className="max-w-3xl text-lg text-secondary leading-relaxed m-0 mb-6">
            You’re probably wondering how PostHog stacks up against Hotjar, Microsoft Clarity, Mouseflow, and the rest.
            We’re biased, obviously, but we think free heatmaps in an all-in-one tool are a great deal. Still weighing
            your options? Here’s how to{'\u00A0'}choose.
        </p>
        <div className="max-w-3xl mb-10">
            <ComparePicks />
        </div>
        <p className="text-[15px] text-secondary m-0">
            Still shopping around? See alternatives to{' '}
            {deepDives.slice(1).map(({ to, label }, index, list) => (
                <React.Fragment key={to}>
                    {index > 0 && (index === list.length - 1 ? ', and ' : ', ')}
                    <Link className="underline" to={to}>
                        {label.replace(' alternatives', '')}
                    </Link>
                </React.Fragment>
            ))}
            , or browse{' '}
            <Link className="underline" to="/compare">
                all comparisons
            </Link>
            .
        </p>
    </Section>
)

/* -------------------------------------------------------------------------- */
/* PostHog vs Hotjar                                                           */
/* -------------------------------------------------------------------------- */

/* Claims below come from /compare/posthog-vs-hotjar and src/hooks/competitorData. */
type Fit = { title: string; detail: React.ReactNode }

const hotjarFit: Fit[] = [
    {
        title: 'You’re a UX or research team',
        detail: 'Heatmaps, replays, and surveys are most of what you need.',
    },
    {
        title: 'You run user tests or interviews',
        detail: 'Hotjar supports unmoderated tests and interview scheduling.',
    },
    {
        title: 'You want heatmaps on lots of traffic',
        detail: 'Contentsquare’s free Experience Analytics plan covers 200,000 sessions a month.',
    },
]

const posthogFit: Fit[] = [
    {
        title: 'You’re a developer or product engineer',
        detail: (
            <>
                Heatmaps sit next to analytics, replay, flags, experiments, a data warehouse, and{' '}
                <Link className="underline" to="/products">
                    a lot more
                </Link>
                .
            </>
        ),
    },
    {
        title: 'You want heatmaps free forever',
        detail: 'Heatmaps never add to your bill. Everything else is usage-based, on one bill, instead of a separate plan for each product.',
    },
    {
        title: 'You want heatmaps on your live site',
        detail: 'Use the toolbar, and turn any click into a tracked action without code.',
    },
    {
        title: 'You want more history',
        detail: 'Heatmaps keep 90 days on every plan. Clickmaps use your event history: 1 year free, 2 years on pay-as-you-go.',
    },
]

const hotjarFacts: [string, React.ReactNode, React.ReactNode][] = [
    ['Who it’s built for', 'UX and research teams', 'Developers and product engineers'],
    [
        'Free heatmaps',
        '200,000 sessions a month (Experience Analytics)',
        'Free data on up to 3 URLs, unlimited with a card',
    ],
    [
        'Data history',
        '1 month on the free plan',
        <>
            Heatmaps and scrollmaps: 90 days on every plan.
            <br />
            Clickmaps: 1 year free, 2 years on pay-as-you-go.
        </>,
    ],
    [
        'Pricing',
        'Separate plans per product. Experience Analytics Growth from $40/month',
        <>
            <strong>Heatmaps are free forever.</strong> Everything else is usage-based, on one bill.
        </>,
    ],
    ['Heatmaps on your live site', 'No toolbar overlay', 'Yes, in the toolbar'],
]

const FitList = ({ title, items }: { title: string; items: Fit[] }) => (
    <HeatCard>
        <h3 className="text-lg font-bold text-primary m-0 mb-3">{title}</h3>
        <ul className="m-0 p-0 list-none space-y-3">
            {items.map(({ title: lead, detail }) => (
                <li key={lead} className="flex gap-2.5">
                    <IconCheck className="size-5 shrink-0 mt-0.5 text-green" />
                    <span>
                        <span className="block text-[15px] font-semibold text-primary leading-snug">{lead}</span>
                        <span className="block text-sm text-secondary leading-relaxed mt-0.5">{detail}</span>
                    </span>
                </li>
            ))}
        </ul>
    </HeatCard>
)

const HeatmapsVsHotjar = ({ id }: SectionComponentProps) => (
    <Section id={id}>
        <SectionHeading>PostHog vs Hotjar</SectionHeading>
        <Prose className="mb-6">
            <p>
                Once upon a time, Hotjar was <em>the</em> heatmap tool. It’s now part of{' '}
                <Link className="underline" to="/compare/best-contentsquare-alternatives">
                    Contentsquare
                </Link>
                , and its heatmaps, replays, and surveys are sold under Contentsquare’s plans.
            </p>
            <p>
                That doesn’t make it a bad option. Here’s the rough overview. For everything else, read our{' '}
                <Link className="underline" to="/compare/posthog-vs-hotjar">
                    full PostHog vs Hotjar comparison
                </Link>
                .
            </p>
        </Prose>
        <div className="grid grid-cols-1 @2xl/reader-content:grid-cols-2 gap-4 mb-8">
            <FitList title="Hotjar (Contentsquare) is a better fit if…" items={hotjarFit} />
            <FitList title="PostHog is a better fit if…" items={posthogFit} />
        </div>
        <div
            role="table"
            className="rounded-lg border border-primary overflow-hidden bg-primary text-[15px]"
            style={{ backgroundImage: TABLE_HEAT }}
        >
            <div
                role="row"
                className="hidden @xl/reader-content:grid grid-cols-[minmax(0,0.9fr)_minmax(0,1.2fr)_minmax(0,1.2fr)] border-b border-primary"
                style={{ backgroundImage: TABLE_HEAT_HEAD }}
            >
                <span role="columnheader" className="p-3" />
                <span role="columnheader" className="p-3 font-bold text-primary">
                    Hotjar (Contentsquare)
                </span>
                <span role="columnheader" className="p-3 font-bold text-primary">
                    PostHog
                </span>
            </div>
            {hotjarFacts.map(([label, them, us]) => (
                <div
                    role="row"
                    key={label}
                    className="grid grid-cols-1 @xl/reader-content:grid-cols-[minmax(0,0.9fr)_minmax(0,1.2fr)_minmax(0,1.2fr)] border-b border-primary last:border-b-0"
                >
                    <span role="rowheader" className="px-3 pt-3 @xl/reader-content:pb-3 font-bold text-primary">
                        {label}
                    </span>
                    <span role="cell" className="px-3 pt-1 @xl/reader-content:py-3 text-secondary leading-relaxed">
                        <span className="@xl/reader-content:hidden font-semibold">Hotjar: </span>
                        {them}
                    </span>
                    <span role="cell" className="px-3 pt-1 pb-3 @xl/reader-content:py-3 text-primary leading-relaxed">
                        <span className="@xl/reader-content:hidden font-semibold">PostHog: </span>
                        {us}
                    </span>
                </div>
            ))}
        </div>
        <div className="flex justify-center pt-8">
            <OSButton asLink variant="primary" size="lg" to="/signup">
                Try PostHog heatmaps – free
            </OSButton>
        </div>
    </Section>
)

/* -------------------------------------------------------------------------- */
/* Works with                                                                  */
/* -------------------------------------------------------------------------- */

type Pairing = {
    slug: string
    description: string
    name?: string
    to?: string
    /** Several links in the title instead of one card-wide link. */
    links?: { label: string; to: string }[]
    Icon?: React.ComponentType<any>
}

/**
 * Same content model as the shared PairsWith template, but in this page's card style,
 * with a fixed-size icon box (the PostHog AI art overflowed) and per-card name/link
 * overrides (PostHog AI and MCP links to /mcp).
 */
const WorksWith = ({ id, productData, allProducts }: SectionComponentProps) => {
    const pairs: Pairing[] = productData?.pairsWith || []
    const carded = new Set(
        [
            productData?.handle,
            ...pairs.map((pair) => allProducts.find((p: any) => p.slug === pair.slug)?.handle),
        ].filter(Boolean)
    )
    return (
        <Section id={id}>
            <SectionHeading lede="Use Heatmaps with these other PostHog products to maximize shareholder value.">
                Works with other PostHog tools
            </SectionHeading>
            <ul className="grid grid-cols-1 @xl/reader-content:grid-cols-2 gap-3 list-none m-0 p-0">
                {pairs.map((pair) => {
                    const product = allProducts.find((p: any) => p.slug === pair.slug)
                    if (!product) return null
                    const icon = (
                        <span
                            className={`size-6 shrink-0 overflow-hidden flex items-center justify-center ${
                                product.color ? `text-${product.color}` : 'text-primary'
                            }`}
                        >
                            {pair.Icon ? (
                                <pair.Icon className="size-6" />
                            ) : product.parentIcon && isAppIconName(product.parentIcon) ? (
                                <AppIcon name={product.parentIcon} className="!size-6 object-contain" />
                            ) : (
                                product.Icon && <product.Icon className="size-6" />
                            )}
                        </span>
                    )
                    const description = (
                        <span className="block text-sm text-secondary leading-relaxed">{pair.description}</span>
                    )
                    const titleClass = 'block text-base font-bold text-primary leading-snug mb-1'

                    if (pair.links) {
                        return (
                            <HeatCard as="li" key={pair.slug} className="m-0">
                                <div className="flex items-start gap-3">
                                    {icon}
                                    <span className="min-w-0">
                                        <strong className={titleClass}>
                                            {pair.links.map(({ label, to }, index) => (
                                                <React.Fragment key={to}>
                                                    {index > 0 && ' and '}
                                                    <Link className="underline" to={to} state={{ newWindow: true }}>
                                                        {label}
                                                    </Link>
                                                </React.Fragment>
                                            ))}
                                        </strong>
                                        {description}
                                    </span>
                                </div>
                            </HeatCard>
                        )
                    }

                    return (
                        <HeatCard as="li" key={pair.slug} className="m-0">
                            <Link
                                to={pair.to || `/${pair.slug}`}
                                state={{ newWindow: true }}
                                className="flex items-start gap-3 -m-4 p-4 h-full"
                            >
                                {icon}
                                <span className="min-w-0">
                                    <strong className={`${titleClass} underline`}>{pair.name || product.name}</strong>
                                    {description}
                                </span>
                            </Link>
                        </HeatCard>
                    )
                })}
            </ul>
            <ToolsTicker
                handles={DEFAULT_HANDLES.filter((handle) => !carded.has(handle))}
                label="And the rest of PostHog:"
                direction="right"
                className="mt-6"
            />
        </Section>
    )
}

/** Inline overrides for the site's global <details> panel look, so expanders read as quiet text toggles. */
const QUIET_DETAILS: React.CSSProperties = { background: 'transparent', border: 'none', padding: 0 }
const QUIET_SUMMARY: React.CSSProperties = {
    background: 'transparent',
    border: 'none',
    paddingLeft: '1.75rem',
    paddingRight: 0,
}

/** Heading for the big, always-open FAQ entries (the accordions below them use the same h3 size). */
const FAQ_H3 = 'text-xl font-bold text-primary mt-0 mb-3 leading-tight'

/* The site's global `.prose details` rules pad every p, h3, and ul inside a <details>.
   These overrides let the featured answers keep their own layout. */
const FEATURED_RESET = '[&_p]:!px-0 [&_p]:!pb-0 [&_ul]:!pl-0 [&_ul]:!pr-0 [&_ul]:!mb-0'

/** A big FAQ entry: collapsed, but the question and a two-line preview of the answer
    stay visible, so it reads as more important than the plain accordions. Everything,
    preview and full answer, is in the HTML for crawlers and LLMs. */
const FeaturedFaq = ({
    id,
    question,
    preview,
    children,
}: {
    id: string
    question: string
    preview: React.ReactNode
    children: React.ReactNode
}) => (
    <details id={id} className="group scroll-mt-20" style={QUIET_DETAILS}>
        <summary style={QUIET_SUMMARY}>
            <h3 className="inline !px-0 text-xl font-bold text-primary m-0 leading-tight">{question}</h3>
            <p className="!px-0 !pb-0 m-0 mt-2 text-base font-normal leading-relaxed text-secondary line-clamp-2 [mask-image:linear-gradient(black_45%,transparent)] [-webkit-mask-image:linear-gradient(black_45%,transparent)] group-open:line-clamp-none group-open:[mask-image:none] group-open:[-webkit-mask-image:none]">
                {preview}
            </p>
            <span className="inline-block mt-1 text-sm font-semibold text-primary underline decoration-dotted underline-offset-4 group-open:hidden">
                Read the full answer
            </span>
        </summary>
        <div className={`!mx-0 !mt-3 pl-7 ${FEATURED_RESET}`}>{children}</div>
    </details>
)

/** Compact bullet list: bold lead, then one short line. Used for the FAQ's definition lists. */
const CardGrid = ({
    items,
    plain,
}: {
    items: { title: React.ReactNode; body: React.ReactNode; id?: string }[]
    cols?: 2 | 3
    /** Plain black bullets instead of the cold-to-hot heat dots. */
    plain?: boolean
}) => (
    <ul className="m-0 p-0 list-none space-y-2 max-w-3xl">
        {items.map(({ title, body, id }, index) => (
            <li
                key={typeof title === 'string' ? title : index}
                id={id}
                className="flex gap-3 text-[15px] leading-relaxed scroll-mt-20"
            >
                <span
                    aria-hidden
                    className="size-1.5 shrink-0 rounded-full mt-2.5 text-primary"
                    style={{ background: plain ? 'currentColor' : heatAt(index / Math.max(1, items.length - 1)) }}
                />
                <span>
                    <strong className="text-primary">{title}.</strong> <span className="text-secondary">{body}</span>
                </span>
            </li>
        ))}
    </ul>
)

const Screenshot = ({ src, alt, className = '' }: { src: string; alt: string; className?: string }) =>
    src.startsWith('https://res.cloudinary.com/') ? (
        <CloudinaryImage
            src={src as `https://res.cloudinary.com/${string}`}
            alt={alt}
            className={`w-full ${className}`}
            imgClassName="w-full h-auto rounded border border-primary"
        />
    ) : (
        <img
            src={src}
            alt={alt}
            loading="lazy"
            className={`w-full h-auto rounded border border-primary ${className}`}
        />
    )

/* -------------------------------------------------------------------------- */
/* Heat scale                                                                  */
/* -------------------------------------------------------------------------- */

/* Heat scale from the brand palette, cold to hot. Decorative only: text never
   relies on it, and the hover glow stays translucent so contrast is unchanged. */
const HEAT_SCALE = [
    colors.blue.core,
    colors.teal.core,
    colors.green.core,
    colors.lime.core,
    colors.lemon.core,
    colors.yellow.core,
    colors.tangerine.core,
    colors.coral.core,
]
const heatAt = (t: number) => HEAT_SCALE[Math.round(t * (HEAT_SCALE.length - 1))]
const withAlpha = (hex: string, alpha: number) => {
    const n = parseInt(hex.slice(1), 16)
    return `rgb(${(n >> 16) & 255} ${(n >> 8) & 255} ${n & 255} / ${alpha})`
}

/* One continuous heat gradient across the Hotjar vs PostHog table: the label column
   stays neutral, Hotjar sits in the cool end, PostHog in the hot end. Low alpha keeps
   text contrast intact in light and dark mode. */
const heatGradient = (alpha: number) =>
    `linear-gradient(90deg, transparent 0%, transparent 20%, ${[
        [colors.blue.core, 30],
        [colors.teal.core, 44],
        [colors.green.core, 54],
        [colors.lemon.core, 64],
        [colors.yellow.core, 76],
        [colors.tangerine.core, 90],
        [colors.coral.core, 100],
    ]
        .map(([hex, stop]) => `${withAlpha(hex as string, alpha)} ${stop}%`)
        .join(', ')})`
const TABLE_HEAT = heatGradient(0.16)
const CLOSING_HEAT = `radial-gradient(ellipse at 50% 40%, ${withAlpha(colors.yellow.core, 0.22)}, ${withAlpha(
    colors.lemon.core,
    0.1
)} 35%, ${withAlpha(colors.teal.core, 0.08)} 65%, ${withAlpha(colors.blue.core, 0.08)} 100%)`
const TABLE_HEAT_HEAD = heatGradient(0.32)

// Subtle on purpose: a small, warm-yellow spot (no red) that fades out quickly.
const HEAT_GLOW = `radial-gradient(circle 110px at var(--heat-x, 50%) var(--heat-y, 50%), ${withAlpha(
    colors.yellow.core,
    0.16
)}, ${withAlpha(colors.lemon.core, 0.08)} 50%, transparent 100%)`

/* -------------------------------------------------------------------------- */
/* Quick links                                                                 */
/* -------------------------------------------------------------------------- */

const quickLinks: { slug: string; label: string; aside?: string }[] = [
    { slug: 'pricing', label: 'Just tell me what it costs', aside: 'spoiler: nothing, it’s free' },
    { slug: 'setup', label: 'How do I turn it on?' },
    { slug: 'vs-hotjar', label: 'Is it better than Hotjar?' },
    { slug: 'works-with-my-stack', label: 'Will it work with my stack?' },
    { slug: 'heatmaps-vs-session-replay', label: 'Heatmaps or session replay?' },
    { slug: 'works-with', label: 'Can my AI agent use it?' },
    { slug: 'faq', label: 'I have more questions' },
]

/** If the anchor is in (or is) a collapsed FAQ answer, open it so the jump lands on the
    answer. Covers deep links such as /heatmaps#scrollmaps inside "What are heatmaps?". */
const openAnchor = (id: string) => {
    const el = typeof document !== 'undefined' ? document.getElementById(id) : null
    const details = el?.closest('details')
    if (details) details.open = true
}

const QUICK_LINK_CLASS =
    '!inline-flex items-center gap-1 !py-1.5 px-3 rounded-full border border-primary bg-transparent hover:bg-accent !text-primary transition-colors'

const HEATMAP_SETTINGS_URL = 'https://app.posthog.com/settings/project-heatmaps#heatmaps'
const HEATMAPS_APP_URL = 'https://app.posthog.com/heatmaps'

const QuickLinks = ({ id, contentRef }: SectionComponentProps & { contentRef: React.RefObject<HTMLDivElement> }) => (
    <Section id={id}>
        {/* Sits where the CTA component's generic links row would be (it is empty for this page). */}
        <p className="text-sm text-secondary m-0 -mt-3 mb-8">
            <strong className="text-primary">Already on PostHog?</strong> No code needed:{' '}
            <Link to={HEATMAP_SETTINGS_URL} className="underline font-semibold" externalNoIcon>
                turn on heatmap capture
            </Link>
            , then{' '}
            <Link to={HEATMAPS_APP_URL} className="underline font-semibold" externalNoIcon>
                open the Heatmaps tool
            </Link>
            .
        </p>
        <ScrollSpyProvider>
            <p className="text-xs font-semibold uppercase tracking-wider text-secondary m-0 mb-2">
                In a hurry? Skip to
            </p>
            <ul className="flex flex-wrap gap-2 list-none m-0 p-0">
                {quickLinks.map(({ slug, label, aside }) => (
                    <li key={slug} className="m-0">
                        <ElementScrollLink
                            id={slug}
                            element={contentRef}
                            onClick={() => openAnchor(slug)}
                            className={QUICK_LINK_CLASS}
                            label={
                                <>
                                    {label}
                                    {aside && <span className="text-secondary font-normal">({aside})</span>}
                                </>
                            }
                        />
                    </li>
                ))}
            </ul>
        </ScrollSpyProvider>
    </Section>
)

/* -------------------------------------------------------------------------- */
/* At a glance                                                                 */
/* -------------------------------------------------------------------------- */

const glance: { label: string; value: React.ReactNode }[] = [
    {
        label: 'What it shows',
        value: (
            <>
                Clicks, mouse movement, scroll depth,{' '}
                <Link to="/docs/product-analytics/autocapture#rage-clicks-autocapture" className="underline">
                    rageclicks
                </Link>
                , and dead clicks.
            </>
        ),
    },
    {
        label: 'Where you view it',
        value: (
            <>
                The{' '}
                <Link to="/docs/toolbar" className="underline">
                    toolbar
                </Link>{' '}
                on your live site, or the{' '}
                <Link to="/docs/toolbar/heatmaps#viewing-heatmaps-in-posthog" className="underline">
                    Heatmaps tool
                </Link>{' '}
                in PostHog.
            </>
        ),
    },
    {
        label: 'Price',
        value: (
            <>
                <strong className="text-primary">Free.</strong> Never adds to your bill. 3 URLs on the free plan,
                unlimited (plus the toolbar) with a card on file.
            </>
        ),
    },
    {
        label: 'Setup',
        value: (
            <>
                Turn on capture in project settings, or set <InlineCode>capture_heatmaps: true</InlineCode> in the{' '}
                <Link to="/docs/libraries/js/config" className="underline">
                    JS SDK
                </Link>
                .
            </>
        ),
    },
    {
        label: 'Included with',
        value: (
            <>
                <Link to="/session-replay" className="underline">
                    Session replay
                </Link>
                ,{' '}
                <Link to="/product-analytics" className="underline">
                    product analytics
                </Link>
                ,{' '}
                <Link to="/web-analytics" className="underline">
                    web analytics
                </Link>
                ,{' '}
                <Link to="/feature-flags" className="underline">
                    feature flags
                </Link>
                , and{' '}
                <Link to="/experiments" className="underline">
                    experiments
                </Link>
                .
            </>
        ),
    },
    {
        label: 'Works on',
        value: (
            <>
                Any site or web app that loads the{' '}
                <Link to="/docs/libraries/js" className="underline">
                    PostHog JavaScript SDK
                </Link>
                .
            </>
        ),
    },
]

/** Moves the glow's center to wherever the cursor is inside the tile. */
const heatUp = (event: React.MouseEvent<HTMLElement>) => {
    const el = event.currentTarget
    const rect = el.getBoundingClientRect()
    el.style.setProperty('--heat-x', `${((event.clientX - rect.left) / rect.width) * 100}%`)
    el.style.setProperty('--heat-y', `${((event.clientY - rect.top) / rect.height) * 100}%`)
}

/**
 * The one card style for this page: rounded, bordered, and it warms up under the
 * cursor. Every box the page owns uses it so the whole thing reads as one system.
 */
const HeatCard = ({
    as: Tag = 'div',
    className = '',
    children,
    ...rest
}: {
    as?: 'div' | 'li'
    className?: string
    children: React.ReactNode
} & React.HTMLAttributes<HTMLElement>) => {
    const Element = Tag as any
    return (
        <Element
            onMouseMove={heatUp}
            className={`group relative overflow-hidden border border-primary rounded-lg bg-primary p-4 ${className}`}
            {...rest}
        >
            <span
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{ background: HEAT_GLOW }}
            />
            <div className="relative">{children}</div>
        </Element>
    )
}

const AtAGlance = ({ id }: SectionComponentProps) => (
    <Section id={id}>
        <SectionHeading>Heatmaps at a glance</SectionHeading>
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mb-5 text-xs text-secondary" aria-hidden>
            <span className="whitespace-nowrap">the thing no one looks at</span>
            <span
                className="h-1.5 w-16 @md/reader-content:w-40 rounded-full shrink-0"
                style={{ background: `linear-gradient(90deg, ${HEAT_SCALE.join(', ')})` }}
            />
            <span className="whitespace-nowrap">the button everyone clicks</span>
        </div>
        <dl className="grid grid-cols-1 @xl/reader-content:grid-cols-2 @3xl/reader-content:grid-cols-3 gap-3 m-0">
            {glance.map(({ label, value }, index) => (
                <HeatCard key={label}>
                    <dt className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-primary mb-2.5">
                        <span
                            aria-hidden
                            className="inline-block size-2 rounded-full shrink-0"
                            style={{ background: heatAt(index / (glance.length - 1)) }}
                        />
                        {label}
                    </dt>
                    <dd className="text-sm text-primary leading-relaxed m-0">{value}</dd>
                </HeatCard>
            ))}
        </dl>
    </Section>
)

/* -------------------------------------------------------------------------- */
/* Try it on this page                                                         */
/* -------------------------------------------------------------------------- */

/* Three small demos of what a heatmap catches: a dead click, a rageclick, and the
   visitor's own heatmap. The points live in memory for this visit only, and this
   code sends nothing anywhere. */

const SHOW_OWN_HEATMAP = 'heatmaps-page:show-own-heatmap'
/* The demo wants five fast clicks, so it is harder to trigger by accident than PostHog's
   real rule (three clicks in the same spot within a second). */
const RAGE_CLICKS = 5
const RAGE_WINDOW_MS = 1500
const RAGE_RADIUS_PX = 30
const RAGE_LINES = [
    'Easy, tiger. That button never did anything to you.',
    'We’d normally show this to a product engineer. They’d be sad.',
    'Somewhere, a product manager just felt a disturbance.',
    'Your mouse would like a word.',
    'This is exactly what heatmaps catch. You’d look great on one.',
]
const MAX_POINTS = 4000
const POINT_RADIUS_PX = 32

type HeatPoint = { x: number; y: number; weight: number }

const isTypingTarget = (target: EventTarget | null) =>
    target instanceof HTMLElement &&
    (target.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName))

/** 256-step color lookup from the brand heat scale, cold to hot. */
const buildHeatPalette = (): Uint8ClampedArray | null => {
    const canvas = document.createElement('canvas')
    canvas.width = 256
    canvas.height = 1
    const ctx = canvas.getContext('2d')
    if (!ctx) return null
    const gradient = ctx.createLinearGradient(0, 0, 256, 0)
    HEAT_SCALE.forEach((color, index) => gradient.addColorStop(index / (HEAT_SCALE.length - 1), color))
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, 256, 1)
    return ctx.getImageData(0, 0, 256, 1).data
}

/** Draws the visitor's points as a heatmap on a viewport-sized canvas. */
const drawHeatmap = (
    canvas: HTMLCanvasElement,
    anchor: HTMLElement,
    points: HeatPoint[],
    palette: Uint8ClampedArray
) => {
    const width = window.innerWidth
    const height = window.innerHeight
    if (canvas.width !== width) canvas.width = width
    if (canvas.height !== height) canvas.height = height
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    ctx.clearRect(0, 0, width, height)
    // Points are stored relative to the page content, so they stay put when the content scrolls.
    const rect = anchor.getBoundingClientRect()
    const r = POINT_RADIUS_PX
    for (const { x, y, weight } of points) {
        const px = x + rect.left
        const py = y + rect.top
        if (px < -r || py < -r || px > width + r || py > height + r) continue
        const gradient = ctx.createRadialGradient(px, py, 0, px, py, r)
        gradient.addColorStop(0, `rgba(0, 0, 0, ${Math.min(1, 0.1 * weight)})`)
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)')
        ctx.fillStyle = gradient
        ctx.fillRect(px - r, py - r, r * 2, r * 2)
    }
    // Turn the grey intensity map into heat colors.
    const image = ctx.getImageData(0, 0, width, height)
    const data = image.data
    for (let i = 3; i < data.length; i += 4) {
        const intensity = data[i]
        if (!intensity) continue
        data[i - 3] = palette[intensity * 4]
        data[i - 2] = palette[intensity * 4 + 1]
        data[i - 1] = palette[intensity * 4 + 2]
        data[i] = Math.min(220, 60 + intensity * 1.5)
    }
    ctx.putImageData(image, 0, 0)
}

const FLOATING_NOTE =
    'fixed bottom-6 left-1/2 -translate-x-1/2 w-max max-w-[calc(100vw-2rem)] rounded-lg border border-primary bg-primary px-4 py-2.5 text-sm text-primary shadow-lg'

/** Page-wide listeners: records moves and clicks, shows the rageclick toast, and draws
    the visitor's own heatmap when they press H or use the button in "Try it". */
const HeatPlayground = ({ anchorRef }: { anchorRef: React.RefObject<HTMLElement> }) => {
    const [showHeatmap, setShowHeatmap] = useState(false)
    const [pointCount, setPointCount] = useState(0)
    const [toast, setToast] = useState<{ id: number; line: string } | null>(null)
    const [burst, setBurst] = useState<{ id: number; x: number; y: number } | null>(null)
    const points = useRef<HeatPoint[]>([])
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const toastRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        let recentClicks: { x: number; y: number; t: number }[] = []
        let lastMove = { x: 0, y: 0, t: 0 }
        let toastTimer: ReturnType<typeof setTimeout> | undefined
        let burstTimer: ReturnType<typeof setTimeout> | undefined
        let rageCount = 0

        const record = (clientX: number, clientY: number, weight: number) => {
            const anchor = anchorRef.current
            if (!anchor) return
            const rect = anchor.getBoundingClientRect()
            points.current.push({ x: clientX - rect.left, y: clientY - rect.top, weight })
            if (points.current.length > MAX_POINTS) points.current.shift()
        }
        const onMove = (e: PointerEvent) => {
            if (e.pointerType !== 'mouse') return
            if (e.timeStamp - lastMove.t < 40 || Math.hypot(e.clientX - lastMove.x, e.clientY - lastMove.y) < 12) return
            lastMove = { x: e.clientX, y: e.clientY, t: e.timeStamp }
            record(e.clientX, e.clientY, 1)
        }
        const onDown = (e: PointerEvent) => {
            record(e.clientX, e.clientY, 4)
            recentClicks = recentClicks.filter(
                (c) =>
                    e.timeStamp - c.t < RAGE_WINDOW_MS && Math.hypot(c.x - e.clientX, c.y - e.clientY) < RAGE_RADIUS_PX
            )
            recentClicks.push({ x: e.clientX, y: e.clientY, t: e.timeStamp })
            if (recentClicks.length < RAGE_CLICKS) return
            recentClicks = []
            const id = rageCount++
            clearTimeout(toastTimer)
            clearTimeout(burstTimer)
            setBurst({ id, x: e.clientX, y: e.clientY })
            setToast({ id, line: RAGE_LINES[id % RAGE_LINES.length] })
            burstTimer = setTimeout(() => setBurst(null), 900)
            toastTimer = setTimeout(() => setToast(null), 4500)
        }
        const show = () => {
            setPointCount(points.current.length)
            setShowHeatmap(true)
        }
        const onKey = (e: KeyboardEvent) => {
            if (e.metaKey || e.ctrlKey || e.altKey || isTypingTarget(e.target)) return
            if (e.key === 'Escape') setShowHeatmap(false)
            if (e.key !== 'h' && e.key !== 'H') return
            setPointCount(points.current.length)
            setShowHeatmap((on) => !on)
        }

        document.addEventListener('pointermove', onMove, { passive: true })
        document.addEventListener('pointerdown', onDown)
        document.addEventListener('keydown', onKey)
        window.addEventListener(SHOW_OWN_HEATMAP, show)
        return () => {
            document.removeEventListener('pointermove', onMove)
            document.removeEventListener('pointerdown', onDown)
            document.removeEventListener('keydown', onKey)
            window.removeEventListener(SHOW_OWN_HEATMAP, show)
            clearTimeout(toastTimer)
            clearTimeout(burstTimer)
        }
    }, [anchorRef])

    // Redraw on scroll, resize, and new movement while the overlay is open.
    useEffect(() => {
        if (!showHeatmap) return
        const palette = buildHeatPalette()
        let frame = 0
        const draw = () => {
            frame = 0
            if (canvasRef.current && anchorRef.current && palette) {
                drawHeatmap(canvasRef.current, anchorRef.current, points.current, palette)
            }
        }
        const schedule = () => {
            if (!frame) frame = requestAnimationFrame(draw)
        }
        schedule()
        document.addEventListener('scroll', schedule, true)
        document.addEventListener('pointermove', schedule, { passive: true })
        window.addEventListener('resize', schedule)
        return () => {
            cancelAnimationFrame(frame)
            document.removeEventListener('scroll', schedule, true)
            document.removeEventListener('pointermove', schedule)
            window.removeEventListener('resize', schedule)
        }
    }, [showHeatmap, anchorRef])

    // Shake the rageclick card. Web Animations API, so no extra CSS to maintain.
    useEffect(() => {
        if (!toast || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
        toastRef.current?.animate(
            [-8, 8, -6, 6, -3, 0].map((x) => ({ transform: `translateX(calc(-50% + ${x}px))` })),
            { duration: 450, easing: 'ease-out' }
        )
    }, [toast])

    if (typeof document === 'undefined' || (!showHeatmap && !toast && !burst)) return null

    // Portal to <body>, so "fixed" means the viewport even inside a transformed window.
    // data-scheme brings the site's color tokens (bg-primary etc.) along, since they are scoped.
    return createPortal(
        <div data-scheme="primary">
            {showHeatmap && (
                <>
                    <canvas
                        ref={canvasRef}
                        aria-hidden
                        className="pointer-events-none fixed inset-0 opacity-80"
                        style={{ zIndex: 9998 }}
                    />
                    <div role="status" className={`${FLOATING_NOTE} flex items-start gap-3`} style={{ zIndex: 9999 }}>
                        <p className="m-0 leading-relaxed">
                            {pointCount < 10 ? (
                                <>Not much heat yet. Move around the page, then try again.</>
                            ) : (
                                <>
                                    <strong>Your heatmap for this visit,</strong> drawn in your browser. (And yes, we
                                    use PostHog heatmaps on this site too.)
                                </>
                            )}
                        </p>
                        <button
                            type="button"
                            onClick={() => setShowHeatmap(false)}
                            className="shrink-0 mt-0.5 text-secondary hover:text-primary"
                            aria-label="Close your heatmap"
                        >
                            <IconX className="size-4" />
                        </button>
                    </div>
                </>
            )}
            {burst && (
                // The clicked spot "heats up": a hot glow that pings out, like a cell on a heatmap.
                <span
                    key={`burst-${burst.id}`}
                    aria-hidden
                    className="pointer-events-none fixed size-24 -ml-12 -mt-12 rounded-full animate-ping motion-reduce:animate-none"
                    style={{
                        left: burst.x,
                        top: burst.y,
                        zIndex: 9998,
                        background: `radial-gradient(circle, ${colors.coral.core}, ${withAlpha(
                            colors.tangerine.core,
                            0.6
                        )} 45%, transparent 70%)`,
                    }}
                />
            )}
            {toast && !showHeatmap && (
                <div
                    key={`toast-${toast.id}`}
                    ref={toastRef}
                    role="status"
                    className={`${FLOATING_NOTE} flex items-center gap-3`}
                    style={{ zIndex: 9999 }}
                >
                    <HedgehogDynamite className="h-14 w-auto shrink-0" />
                    <div>
                        <p className="m-0 font-bold">Rageclick detected</p>
                        <p className="m-0 text-secondary">{toast.line}</p>
                    </div>
                </div>
            )}
        </div>,
        document.body
    )
}

/** Each click on the fake link moves one line down. The last one finally gives in, and the
    next click starts the joke over from the first dead-click line. */
const DEAD_CLICK_LINES: React.ReactNode[] = [
    'It looks like a link, but it isn’t.',
    'That was a dead click. Heatmaps would’ve caught it.',
    'Annoying, right? Your users think so too.',
    'You thought this was a link? Sure about that?',
    'YOU SURE ABOUT THAT?!?!?',
    'It’s not going to start working. That’s the whole point.',
    <>
        Fine, you win. Here’s a real link:{' '}
        <Link className="underline font-semibold" to="/docs/toolbar/heatmaps">
            set up heatmaps
        </Link>
        .
    </>,
]

const TryItHere = ({ id }: SectionComponentProps) => {
    const [deadClicks, setDeadClicks] = useState(0)
    const demos: { label: string; body: React.ReactNode; action?: React.ReactNode }[] = [
        {
            label: 'Dead click',
            body: (
                <>
                    Click{' '}
                    <button
                        type="button"
                        onClick={() => setDeadClicks((n) => (n >= DEAD_CLICK_LINES.length - 1 ? 1 : n + 1))}
                        className="underline font-semibold text-primary"
                    >
                        this
                    </button>
                    . <span aria-live="polite">{DEAD_CLICK_LINES[deadClicks]}</span>
                </>
            ),
        },
        {
            label: 'Rageclick',
            body: <>Click the button below five times, fast. We won’t{'\u00A0'}judge.</>,
            action: (
                <OSButton variant="secondary" size="md">
                    Why isn’t this working?
                </OSButton>
            ),
        },
        {
            label: 'Your own heatmap',
            body: (
                <>
                    Press <KeyboardShortcut text="H" size="sm" /> to see where you’ve moved and clicked on this page so
                    far. No keyboard? Use the{' '}button.
                </>
            ),
            action: (
                <OSButton
                    variant="secondary"
                    size="md"
                    onClick={() => window.dispatchEvent(new Event(SHOW_OWN_HEATMAP))}
                >
                    Show my heatmap
                </OSButton>
            ),
        },
    ]

    return (
        <Section id={id}>
            <SectionHeading>Try heatmaps on this page</SectionHeading>
            <p className="max-w-3xl text-lg text-secondary leading-relaxed m-0 mb-6">
                Wondering what heatmaps do? Click around and find{'\u00A0'}out.
            </p>
            <ul className="m-0 p-0 list-none grid grid-cols-1 @xl/reader-content:grid-cols-2 @3xl/reader-content:grid-cols-3 gap-3">
                {demos.map(({ label, body, action }, index) => (
                    <HeatCard as="li" key={label} className="m-0">
                        <div className="flex flex-col gap-3 h-full">
                            <p className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-primary m-0">
                                <span
                                    aria-hidden
                                    className="inline-block size-2 rounded-full shrink-0"
                                    style={{ background: heatAt(index / (demos.length - 1)) }}
                                />
                                {label}
                            </p>
                            <p className="text-sm text-primary leading-relaxed m-0">{body}</p>
                            {action && <div className="mt-auto">{action}</div>}
                        </div>
                    </HeatCard>
                ))}
            </ul>
        </Section>
    )
}

/* -------------------------------------------------------------------------- */
/* What are heatmaps?                                                          */
/* -------------------------------------------------------------------------- */

const heatmapShots = [
    {
        id: 'heatmap',
        label: 'Heatmap',
        src: SETTINGS_IMAGE,
        alt: 'PostHog heatmap settings showing aggregation, viewport accuracy, and color options',
    },
    {
        id: 'scrollmaps',
        label: 'Scrollmap',
        src: SCROLLMAP_IMAGE,
        alt: 'A PostHog scrollmap showing how far users scroll down a page',
    },
    {
        id: 'clickmaps',
        label: 'Clickmap',
        src: CLICKMAP_IMAGE,
        alt: 'A PostHog clickmap showing click counts on page elements',
    },
]

/* "What are heatmaps?" and "What types are there?" used to be two entries that said the
   same thing twice. One entry now: definition, the three map types plus the two
   frustration signals, a screenshot of each type, then what to do next. */
const WhatAreHeatmaps = ({ id }: { id: string }) => (
    <FeaturedFaq
        id={id}
        question="What are heatmaps?"
        preview="A website heatmap (or heat map) is a visual overlay that shows where users click, move their mouse, and scroll on a page. Warm colors mean lots of activity. Cold means nobody went there."
    >
        <Prose className="mb-5">
            <p>
                Heatmap tools combine click tracking, mouse tracking, and scroll tracking into one picture, which makes
                them a core part of user behavior analytics, next to session replay.
            </p>
            <p>
                PostHog has three types, all from the same data. Open them in the toolbar on your live site or in the
                Heatmaps tool in PostHog.
            </p>
        </Prose>
        <div id="types" className="scroll-mt-20">
            <CardGrid
                items={[
                    {
                        title: 'Heatmap',
                        body: 'Clicks and mouse movement anywhere on the page, even on things that are not clickable. Filter by date range, unique users, viewport, and page area.',
                    },
                    {
                        title: 'Clickmap',
                        body: 'Click and rageclick counts on each clickable element, via autocapture. Also called a click heatmap.',
                    },
                    {
                        title: 'Scrollmap',
                        body: (
                            <>
                                How far down the page people scroll before they stop, built from pageview and{' '}
                                <InlineCode>$pageleave</InlineCode> events. Also called a scroll heatmap.
                            </>
                        ),
                    },
                ]}
            />
        </div>
        <div className="grid grid-cols-1 @3xl/reader-content:grid-cols-3 gap-6 mt-6 mb-6">
            {heatmapShots.map(({ id: anchor, label, src, alt }) => (
                <figure key={anchor} id={anchor} className="m-0 flex flex-col gap-2 scroll-mt-20">
                    <Screenshot src={src} alt={alt} />
                    <figcaption className="text-sm font-semibold text-secondary">{label}</figcaption>
                </figure>
            ))}
        </div>
        <Prose className="mb-3">
            <p>They also surface two frustration signals:</p>
        </Prose>
        <CardGrid
            items={[
                {
                    title: 'Rageclick',
                    body: 'Three clicks in the same spot within a second. Something is broken or confusing.',
                },
                { title: 'Dead click', body: 'A click on something that does not respond.' },
            ]}
        />
    </FeaturedFaq>
)

/* -------------------------------------------------------------------------- */
/* How do I read a heatmap?                                                    */
/* -------------------------------------------------------------------------- */

const HowToReadHeatmaps = ({ id }: { id: string }) => (
    <FeaturedFaq
        id={id}
        question="How do I read a heatmap?"
        preview="Warm colors (red and orange) mean lots of clicks or attention. Cold colors (blue) mean little or none. On a scrollmap, the color shows how many visitors reached each point of the page."
    >
        <CardGrid
            items={[
                {
                    title: 'Start with the hottest spot',
                    body: 'If it isn’t your main call to action, that’s your first fix.',
                },
                {
                    title: 'Look for clicks on things that aren’t links',
                    body: 'Clicks on images, headings, and icons are dead clicks. Make them clickable, or make them look less clickable.',
                },
                {
                    title: 'Find the false bottom',
                    body: 'On a scrollmap, a sharp drop from warm to cold means people think the page ends there. Move key content above it.',
                },
                {
                    title: 'Check the rageclicks',
                    body: 'Clusters of rageclicks point to broken or slow elements. Click the hot spot to watch the recordings behind it.',
                },
                {
                    title: 'Compare viewports and dates',
                    body: 'A layout that works on desktop can bury the button on mobile. Filter by viewport, and compare before and after a change.',
                },
                {
                    title: 'Wait for enough traffic',
                    body: 'A few dozen visits can make random clicks look like a pattern. Read a heatmap with hundreds of visits, not dozens.',
                },
            ]}
        />
    </FeaturedFaq>
)

/* -------------------------------------------------------------------------- */
/* What are heatmaps used for?                                                 */
/* -------------------------------------------------------------------------- */

const HeatmapUseCases = ({ id }: { id: string }) => (
    <FeaturedFaq
        id={id}
        question="What are heatmaps used for?"
        preview="Teams use heatmaps to check CTA placement and scroll depth, find frustration, validate redesigns, and turn clicks into analytics. AI agents can use them too."
    >
        <CardGrid
            items={[
                {
                    title: 'CTA placement',
                    body: 'Is anyone noticing the button? Are they clicking things that are not buttons?',
                },
                {
                    title: 'Scroll depth',
                    body: 'Find where readers stop on pricing, docs, and blog posts, and move the good part up.',
                },
                {
                    title: 'Finding frustration',
                    body: 'Rageclicks and dead clicks show where users expected something to happen. Click the hot spot to watch the recordings behind it.',
                },
                {
                    title: 'Validating a redesign',
                    body: 'Compare the heatmap before and after. You will know within a week.',
                },
                {
                    title: 'Turning clicks into analytics',
                    body: 'Make any element a tracked action, no code, then use it in funnels and experiments.',
                },
                {
                    title: 'Giving agents eyes on the page',
                    body: 'PostHog AI and the MCP server can read and save heatmaps, so an agent checks real behavior before it proposes a change.',
                },
            ]}
        />
    </FeaturedFaq>
)

/* -------------------------------------------------------------------------- */
/* Who are heatmaps for?                                                       */
/* -------------------------------------------------------------------------- */

const audiences: [string, string][] = [
    ['Product teams', 'See what gets attention and what to fix first'],
    ['Designers & UX researchers', 'Find dead clicks, rageclicks, and content nobody reaches'],
    ['Growth & marketing teams', 'Test CTAs and landing pages without extra tracking'],
    ['Engineers', 'Jump to the events and recordings behind any hot spot'],
]

const WhoIsItFor = ({ id }: { id: string }) => (
    <FeaturedFaq
        id={id}
        question="Who are heatmaps for?"
        preview="Anyone who changes a website and wants to know if it worked: product teams, designers and UX researchers, growth and marketing teams, and engineers."
    >
        <CardGrid items={audiences.map(([title, body]) => ({ title, body: body + '.' }))} />
    </FeaturedFaq>
)

/* -------------------------------------------------------------------------- */
/* How to set up heatmaps                                                      */
/* -------------------------------------------------------------------------- */

const viewingMethods: {
    title: string
    Icon: React.ComponentType<any>
    body: React.ReactNode
    src?: string
    alt?: string
}[] = [
    {
        title: 'In the Heatmaps tool in PostHog',
        Icon: IconLaptop,
        src: IN_APP_IMAGE,
        alt: 'The Heatmaps tool in PostHog showing a heatmap of posthog.com/docs, with date range, cohort, and event filters',
        body: 'Enter the page URL and view the data over a live page, a screenshot, or a session replay snapshot. Works on every plan, including free.',
    },
    {
        title: 'In the toolbar, on your live site',
        Icon: IconToolbar,
        // No screenshot on purpose: the site has no modern capture of the toolbar
        // overlay on a live page. Add one here when it exists.
        body: (
            <>
                Open the{' '}
                <Link className="underline" to="/docs/toolbar">
                    toolbar
                </Link>{' '}
                and click the heatmap icon. Needs a card on file.
            </>
        ),
    },
]

const setupSteps = [
    {
        title: 'Install PostHog',
        body: (
            <>
                <p>Heatmaps use the same SDK as the rest of PostHog, so if you already have it, skip this step.</p>
                <p>
                    If you’re new here (hi, welcome!), add the{' '}
                    <Link className="underline" to="/docs/libraries/js">
                        JavaScript snippet or the posthog-js package
                    </Link>{' '}
                    to your site. Or let the wizard do it:
                </p>
                <div className="max-w-md">
                    <WizardCommand />
                </div>
            </>
        ),
    },
    {
        title: 'Turn on heatmap capture',
        body: (
            <>
                <p>
                    Enable it in <strong>Project settings → Heatmaps</strong>, or set{' '}
                    <InlineCode>capture_heatmaps: true</InlineCode> in your SDK config.
                </p>
                <p>
                    Clickmaps need{' '}
                    <Link className="underline" to="/docs/product-analytics/autocapture">
                        autocapture
                    </Link>
                    . Scrollmaps need <InlineCode>$pageleave</InlineCode> events.
                </p>
                <div className="max-w-md">
                    <SingleCodeBlock language="js" showLabel={false} showLineNumbers={false} showAskAI={false} showCopy>
                        {`posthog.init('<ph_project_api_key>', {\n    api_host: 'https://us.i.posthog.com',\n    capture_heatmaps: true,\n})`}
                    </SingleCodeBlock>
                </div>
            </>
        ),
    },
    {
        title: 'Start using heatmaps',
        body: (
            <>
                <p>
                    <s className="text-muted">Pick your poison.</s> Choose where you see them.
                </p>
                <div className="flex flex-col gap-8 pt-1">
                    {viewingMethods.map(({ title, Icon, src, alt, body }) => (
                        <article key={title} className="flex flex-col gap-3">
                            <p className="text-[15px] text-secondary m-0">
                                <Icon className="size-4 text-secondary shrink-0 inline-block relative -top-px mr-1" />
                                <strong className="text-primary">{title}.</strong> {body}
                            </p>
                            {src && <Screenshot src={src} alt={alt ?? title} className="max-w-2xl" />}
                        </article>
                    ))}
                </div>
                {/* Inline styles override the site's global <details> panel look (grey bar,
                    border) so this reads as a quiet text toggle. Keeps the global chevron. */}
                <details className="max-w-2xl" style={QUIET_DETAILS}>
                    <summary style={QUIET_SUMMARY}>
                        <span className="text-[15px] font-semibold text-primary underline decoration-dotted underline-offset-4">
                            Tips for getting more out of heatmaps
                        </span>
                    </summary>
                    <ul className="m-0 p-0 list-none space-y-2 text-[15px] text-secondary">
                        <li>
                            <strong className="text-primary">Combine similar pages</strong> with a wildcard, such as{' '}
                            <InlineCode>/products/*</InlineCode> for every product page.
                        </li>
                        <li>
                            <strong className="text-primary">Match by target URL</strong> when the same spot shows
                            different content, like a list of users or search results, so each link gets its own count.
                        </li>
                        <li>
                            <strong className="text-primary">Lower the viewport accuracy</strong> to include visitors on
                            other screen sizes. More data, slightly fuzzier positions.
                        </li>
                        <li>
                            <strong className="text-primary">Switch to unique users</strong> when a handful of people
                            clicking a lot are skewing the picture.
                        </li>
                        <li>
                            <strong className="text-primary">Click a hot spot</strong> to see the events behind it and
                            jump into the session recordings.
                        </li>
                        <li>
                            <strong className="text-primary">Blank preview?</strong> Your site is blocking iframes.
                            Allow PostHog in your <InlineCode>Content-Security-Policy</InlineCode>, or view the heatmap
                            on a session replay snapshot instead.
                        </li>
                    </ul>
                </details>
            </>
        ),
    },
]

const HeatmapsSetup = ({ id }: SectionComponentProps) => (
    <Section id={id}>
        <SectionHeading lede="Three steps. If PostHog is already on your site, it is one.">
            How to set up heatmaps
        </SectionHeading>
        <ol className="m-0 p-0 list-none grid grid-cols-1 gap-4 max-w-3xl mb-8">
            {setupSteps.map(({ title, body }, index) => (
                <li key={title} className="flex gap-4">
                    <span
                        aria-hidden
                        className="size-8 shrink-0 mt-0.5 rounded-full bg-accent border border-primary text-base font-bold leading-none text-primary flex items-center justify-center"
                    >
                        {index + 1}
                    </span>
                    <div className="min-w-0">
                        <h3 className="text-lg font-bold text-primary m-0 mb-1 pt-0.5 leading-tight">{title}</h3>
                        <div className="text-[15px] leading-relaxed text-secondary space-y-3 [&>p]:m-0">{body}</div>
                    </div>
                </li>
            ))}
        </ol>

        <div className="flex flex-wrap justify-center gap-4 pt-4">
            <OSButton asLink variant="primary" size="lg" to="/signup">
                Get started – free
            </OSButton>
            <OSButton asLink variant="secondary" size="lg" to="/docs/toolbar/heatmaps">
                Read the docs
            </OSButton>
        </div>
    </Section>
)

/* -------------------------------------------------------------------------- */
/* Pricing                                                                     */
/* -------------------------------------------------------------------------- */

const pricingTiers = [
    {
        title: 'Free plan',
        subtitle: 'No credit card',
        rows: [
            { ok: true, text: 'Heatmap data is free to collect' },
            { ok: true, text: 'Up to 3 URLs' },
            { ok: true, text: 'View heatmaps in the Heatmaps tool in PostHog' },
            { ok: false, text: 'Toolbar on your live site' },
        ],
    },
    {
        title: 'Credit card on file',
        subtitle: 'Heatmaps are still free',
        rows: [
            { ok: true, text: 'Heatmap data is free to collect' },
            { ok: true, text: 'No limit on URLs' },
            { ok: true, text: 'View heatmaps in the Heatmaps tool in PostHog' },
            { ok: true, text: 'Toolbar on your live site' },
        ],
    },
]

const HeatmapsPricing = ({ id }: SectionComponentProps) => (
    <Section id={id}>
        <SectionHeading>How much do heatmaps cost?</SectionHeading>
        <Prose className="mb-6">
            <p>
                <strong className="text-primary text-xl">Nothing. Nada. Rien. Heatmaps are{'\u00A0'}free.</strong>
            </p>
            <p>
                PostHog does not charge for heatmap data. It never adds to your bill, on any plan, at any volume. There
                is no heatmap price, no per-page fee, and no trial that expires.
            </p>
            <p>
                Adding a credit card does not make heatmaps cost money either – it removes the URL limit and unlocks the
                toolbar.
            </p>
        </Prose>
        <div className="grid grid-cols-1 @2xl/reader-content:grid-cols-2 gap-4 max-w-3xl mb-6">
            {pricingTiers.map(({ title, subtitle, rows }) => (
                <HeatCard key={title}>
                    <h3 className="text-lg font-bold text-primary m-0">{title}</h3>
                    <p className="text-sm text-secondary m-0 mb-3">{subtitle}</p>
                    <ul className="list-none m-0 p-0 divide-y divide-primary">
                        {rows.map(({ ok, text }) => (
                            <li key={text} className="flex items-start gap-2.5 py-2 first:pt-0 last:pb-0 text-[15px]">
                                {ok ? (
                                    <IconCheck className="size-5 shrink-0 mt-0.5 text-green" />
                                ) : (
                                    <IconX className="size-5 shrink-0 mt-0.5 text-muted" />
                                )}
                                <span className={ok ? 'text-primary' : 'text-muted line-through'}>{text}</span>
                            </li>
                        ))}
                    </ul>
                </HeatCard>
            ))}
        </div>
        <Prose className="mb-6">
            <p>
                With a card on file you pay only for other products that go past their free limits – session replay,
                product analytics, and so on – and you can set a billing limit per product. Heatmaps stay free.
            </p>
        </Prose>
        <div className="flex justify-center pt-4">
            <OSButton asLink variant="secondary" size="lg" to="/pricing">
                See all pricing
            </OSButton>
        </div>
    </Section>
)

/* -------------------------------------------------------------------------- */
/* FAQ                                                                         */
/* -------------------------------------------------------------------------- */

/** Text versions of the four expanded FAQ entries, for the FAQPage structured data only. */
const expandedFaqForSchema: { question: string; answer: string }[] = [
    {
        question: 'What are heatmaps?',
        answer: 'A website heatmap (or heat map) is a visual overlay that shows where users click, move their mouse, and scroll on a page. Warm colors mean lots of activity and cold areas were ignored. Heatmap tools combine click tracking, mouse tracking, and scroll tracking, and are a core part of user behavior analytics. PostHog heatmaps include heatmaps (clicks and mouse movement), clickmaps or click heatmaps (click counts per element), scrollmaps or scroll heatmaps (scroll depth), rageclicks, and dead clicks.',
    },
    {
        question: 'How do I read a heatmap?',
        answer: 'Warm colors (red and orange) mean lots of clicks or attention, and cold colors (blue) mean little or none. On a scrollmap, the color shows how many visitors reached each point of the page. Start with the hottest spot and check that it is your main call to action. Look for clicks on things that are not links, which are dead clicks. On a scrollmap, find the false bottom, where warm turns sharply cold. Check clusters of rageclicks and watch the recordings behind them. Compare viewports and date ranges. Wait for hundreds of visits, not dozens, before you act.',
    },
    {
        question: 'What are heatmaps used for?',
        answer: 'Checking whether a call to action gets noticed, finding where readers stop on long pages, spotting frustration through rageclicks and dead clicks and watching the recordings behind them, validating a redesign by comparing before and after, turning any clicked element into a tracked action for funnels and experiments, and letting AI agents read and save heatmaps through PostHog AI or the MCP server.',
    },
    {
        question: 'Who are heatmaps for?',
        answer: 'Product teams use them to see what gets attention and what to fix first. Designers and UX researchers use them to find dead clicks, rageclicks, and content nobody reaches. Growth and marketing teams use them for CTA placement and landing pages without extra tracking. Engineers use them to jump to the events and recordings behind any hot spot.',
    },
]

const faq: { question: string; answer: string; render?: React.ReactNode; id?: string }[] = [
    {
        question: 'How do I create a heatmap for my website?',
        answer: 'Install the PostHog JavaScript SDK, turn on heatmap capture in project settings (or set capture_heatmaps: true in the SDK config), then open the page in the toolbar or in the Heatmaps tool in PostHog. Clickmaps need autocapture and scrollmaps need $pageleave events. There is no separate snippet to add.',
        render: (
            <>
                <p>
                    Install the{' '}
                    <Link className="underline" to="/docs/libraries/js">
                        PostHog JavaScript SDK
                    </Link>
                    , turn on heatmap capture in project settings (or set{' '}
                    <InlineCode>capture_heatmaps: true</InlineCode> in the{' '}
                    <Link className="underline" to="/docs/libraries/js/config">
                        SDK config
                    </Link>
                    ), then open the page in the{' '}
                    <Link className="underline" to="/docs/toolbar">
                        toolbar
                    </Link>{' '}
                    or in the{' '}
                    <Link className="underline" to="/docs/toolbar/heatmaps#viewing-heatmaps-in-posthog">
                        Heatmaps tool
                    </Link>{' '}
                    in PostHog.
                </p>
                <p>
                    Clickmaps need{' '}
                    <Link className="underline" to="/docs/product-analytics/autocapture">
                        autocapture
                    </Link>{' '}
                    and scrollmaps need <InlineCode>$pageleave</InlineCode> events. There is no separate snippet to add.
                </p>
            </>
        ),
    },
    {
        question: 'How do I use heatmaps to improve a page?',
        answer: 'Start with the clickmap to see which elements get used and which get ignored, then check the scrollmap to see how far people get. Look for rageclicks and dead clicks, open the recordings behind them, and fix the cause. After a change, compare the new heatmap with the old one, or ship the change behind a feature flag and run an experiment.',
        render: (
            <>
                <p>
                    Start with the clickmap to see which elements get used and which get ignored, then check the
                    scrollmap to see how far people get.
                </p>
                <p>
                    Look for rageclicks and dead clicks, open the{' '}
                    <Link className="underline" to="/session-replay">
                        recordings
                    </Link>{' '}
                    behind them, and fix the cause. After a change, compare the new heatmap with the old one, or ship
                    the change behind a{' '}
                    <Link className="underline" to="/feature-flags">
                        feature flag
                    </Link>{' '}
                    and run an{' '}
                    <Link className="underline" to="/experiments">
                        experiment
                    </Link>
                    .
                </p>
            </>
        ),
    },
    {
        id: 'heatmaps-vs-session-replay',
        question: 'Heatmaps vs session replay: which should I use?',
        answer: 'Use both, for different questions. A heatmap aggregates many users on one page, so it is the fastest way to see patterns such as an ignored CTA or a common dead click. Session replay shows you why it happened, one session at a time. You don’t have to watch them all yourself: Replay Vision watches recordings for you and turns what it sees into observations you can query, chart, and alert on. In PostHog, you can also click a hot spot on a heatmap and open the recordings behind it.',
        render: (
            <>
                <p>Use both, for different questions.</p>
                <p>
                    A heatmap aggregates many users on one page, so it is the fastest way to see patterns such as an
                    ignored CTA or a common dead click.{' '}
                    <Link className="underline" to="/session-replay">
                        Session replay
                    </Link>{' '}
                    shows you why it happened, one session at a time.
                </p>
                <p>
                    You don’t have to watch them all yourself:{' '}
                    <Link className="underline" to="/replay-vision">
                        Replay Vision
                    </Link>{' '}
                    watches recordings for you and turns what it sees into observations you can query, chart, and alert
                    on. In PostHog, you can also click a hot spot on a heatmap and open the recordings behind it.
                </p>
            </>
        ),
    },
    {
        question: 'What heatmap tool should I use?',
        answer: 'If you only want heatmaps, Microsoft Clarity is free and Hotjar has a generous free plan. If you want heatmaps alongside session replay, product analytics, feature flags, and experiments on one SDK and one bill, use PostHog. PostHog heatmaps are free too: the data never adds to your bill, the free plan covers 3 URLs, and you can create actions from any element without code.',
        render: (
            <>
                <p>
                    If you only want heatmaps, Microsoft Clarity is free and Hotjar has a generous free plan (see{' '}
                    <Link className="underline" to="/blog/best-microsoft-clarity-alternatives">
                        Clarity alternatives
                    </Link>{' '}
                    and{' '}
                    <Link className="underline" to="/compare/posthog-vs-hotjar">
                        PostHog vs Hotjar
                    </Link>
                    ).
                </p>
                <p>
                    If you want heatmaps alongside{' '}
                    <Link className="underline" to="/session-replay">
                        session replay
                    </Link>
                    ,{' '}
                    <Link className="underline" to="/product-analytics">
                        product analytics
                    </Link>
                    ,{' '}
                    <Link className="underline" to="/feature-flags">
                        feature flags
                    </Link>
                    , and{' '}
                    <Link className="underline" to="/experiments">
                        experiments
                    </Link>{' '}
                    on one SDK and one bill, use PostHog. PostHog heatmaps are free too: the data never adds to your
                    bill, the free plan covers 3 URLs, and you can{' '}
                    <Link className="underline" to="/docs/data/actions">
                        create actions
                    </Link>{' '}
                    from any element without code.
                </p>
            </>
        ),
    },
    {
        question: 'PostHog vs Microsoft Clarity: which is better for heatmaps?',
        id: 'posthog-vs-clarity',
        answer: 'Both give you free heatmaps, clickmaps, and scrollmaps, plus rageclicks and dead clicks. Pick Microsoft Clarity if you want a standalone tool that also covers native mobile apps; PostHog heatmaps work on websites only. Pick PostHog if you want heatmaps connected to session replay, product analytics, feature flags, and experiments, so you can go from a hot spot to the recordings, funnels, and tests behind it. PostHog also offers EU hosting and is open source. Clarity stores data in Microsoft’s US cloud and is closed source.',
        render: (
            <>
                <p>
                    Both give you free heatmaps, clickmaps, and scrollmaps, plus rageclicks and dead clicks. The
                    difference is what sits around them.
                </p>
                <p>
                    Pick Microsoft Clarity if you want a standalone tool that also covers native mobile apps. PostHog
                    heatmaps work on websites only.
                </p>
                <p>
                    Pick PostHog if you want heatmaps connected to{' '}
                    <Link className="underline" to="/session-replay">
                        session replay
                    </Link>
                    ,{' '}
                    <Link className="underline" to="/product-analytics">
                        product analytics
                    </Link>
                    ,{' '}
                    <Link className="underline" to="/feature-flags">
                        feature flags
                    </Link>
                    , and{' '}
                    <Link className="underline" to="/experiments">
                        experiments
                    </Link>
                    , so you can go from a hot spot to the recordings, funnels, and tests behind it.
                </p>
                <p>
                    PostHog also offers EU hosting and is{' '}
                    <Link className="underline" to="https://github.com/PostHog/posthog">
                        open source
                    </Link>
                    . Clarity stores data in Microsoft’s US cloud and is closed source. For the full breakdown, see{' '}
                    <Link className="underline" to="/blog/best-microsoft-clarity-alternatives">
                        Microsoft Clarity alternatives
                    </Link>
                    .
                </p>
            </>
        ),
    },
    {
        question: 'Does PostHog have heatmaps?',
        answer: 'Yes. PostHog offers free heatmap software for websites: it includes heatmaps, clickmaps, and scrollmaps for any website that runs the PostHog JavaScript SDK. You can view them in the toolbar on your live site or in the Heatmaps tool in PostHog, and heatmap data does not add to your bill.',
        render: (
            <>
                <p>
                    Yes. PostHog offers free heatmap software for websites: it includes heatmaps, clickmaps, and
                    scrollmaps for any website that runs the{' '}
                    <Link className="underline" to="/docs/libraries/js">
                        PostHog JavaScript SDK
                    </Link>
                    .
                </p>
                <p>
                    You can view them in the{' '}
                    <Link className="underline" to="/docs/toolbar">
                        toolbar
                    </Link>{' '}
                    on your live site or in the{' '}
                    <Link className="underline" to="/docs/toolbar/heatmaps#viewing-heatmaps-in-posthog">
                        Heatmaps tool
                    </Link>{' '}
                    in PostHog, and heatmap data does not add to your bill.
                </p>
            </>
        ),
    },
    {
        question: 'Are PostHog heatmaps free?',
        answer: 'Yes. Heatmap data is free to collect and never adds to your bill, on any plan. On the free plan you get heatmaps for up to 3 URLs, viewed in the Heatmaps tool in PostHog. Add a credit card and there is no URL limit and you can also view heatmaps in the toolbar on your live site. Heatmaps still cost nothing; you only pay for other products that go past their free limits.',
        render: (
            <>
                <p>Yes. Heatmap data is free to collect and never adds to your bill, on any plan.</p>
                <p>
                    On the free plan you get heatmaps for up to 3 URLs, viewed in the Heatmaps tool in PostHog. Add a
                    credit card and there is no URL limit and you can also view heatmaps in the{' '}
                    <Link className="underline" to="/docs/toolbar">
                        toolbar
                    </Link>{' '}
                    on your live site.
                </p>
                <p>
                    Heatmaps still cost nothing; you only pay for other products that go past their free limits. See{' '}
                    <Link className="underline" to="/pricing">
                        pricing
                    </Link>
                    .
                </p>
            </>
        ),
    },
    {
        question: 'Do heatmaps slow down my site?',
        answer: 'No. Heatmap data is captured alongside the events the PostHog SDK already sends. The visualization is rendered only when you open a heatmap, never for your visitors.',
        render: (
            <>
                <p>
                    No. Heatmap data is captured alongside the events the{' '}
                    <Link className="underline" to="/docs/libraries/js">
                        PostHog SDK
                    </Link>{' '}
                    already sends.
                </p>
                <p>The visualization is rendered only when you open a heatmap, never for your visitors.</p>
            </>
        ),
    },
    {
        question: 'Can I combine heatmaps from similar pages?',
        answer: 'Yes. Use a wildcard in the heatmap URL, such as /products/*, to combine data from every page that matches the pattern. This works for product pages, user profiles, search results, and any other template-driven page.',
        render: (
            <>
                <p>
                    Yes. Use a{' '}
                    <Link
                        className="underline"
                        to="/docs/toolbar/heatmaps#combining-maps-from-similar-pages-using-wildcards"
                    >
                        wildcard
                    </Link>{' '}
                    in the heatmap URL, such as <InlineCode>/products/*</InlineCode>, to combine data from every page
                    that matches the pattern.
                </p>
                <p>This works for product pages, user profiles, search results, and any other template-driven page.</p>
            </>
        ),
    },
    {
        question: 'What is the difference between a heatmap and a clickmap?',
        answer: 'A heatmap shows clicks and mouse movement anywhere on the page, including clicks on things that are not clickable, as a color overlay. A clickmap shows exact click and rageclick counts on each clickable element, using autocapture. Use the heatmap to see where people try to click and the clickmap to see what they actually clicked.',
        render: (
            <>
                <p>
                    A{' '}
                    <Link className="underline" to="/docs/toolbar/heatmaps#heatmaps">
                        heatmap
                    </Link>{' '}
                    shows clicks and mouse movement anywhere on the page, including clicks on things that are not
                    clickable, as a color overlay.
                </p>
                <p>
                    A{' '}
                    <Link className="underline" to="/docs/toolbar/heatmaps#clickmaps">
                        clickmap
                    </Link>{' '}
                    shows exact click and rageclick counts on each clickable element, using{' '}
                    <Link className="underline" to="/docs/product-analytics/autocapture">
                        autocapture
                    </Link>
                    . Use the heatmap to see where people try to click and the clickmap to see what they actually
                    clicked.
                </p>
            </>
        ),
    },
    {
        id: 'works-with-my-stack',
        question: 'Do PostHog heatmaps work with React, Next.js, WordPress, Shopify, or Wix?',
        answer: 'Yes. Heatmaps work on any website or web app that loads the PostHog JavaScript SDK, which covers React, Next.js, Vue, Svelte, Angular, plain HTML, Shopify stores, and site builders such as WordPress, Webflow, Framer, and Wix. Single-page apps work too, because the SDK tracks route changes.',
        render: (
            <>
                <p>
                    Yes. Heatmaps work on any website or web app that loads the{' '}
                    <Link className="underline" to="/docs/libraries/js">
                        PostHog JavaScript SDK
                    </Link>
                    , which covers{' '}
                    <Link className="underline" to="/docs/libraries/react">
                        React
                    </Link>
                    ,{' '}
                    <Link className="underline" to="/docs/libraries/next-js">
                        Next.js
                    </Link>
                    ,{' '}
                    <Link className="underline" to="/docs/libraries/vue-js">
                        Vue
                    </Link>
                    , Svelte, Angular, plain HTML,{' '}
                    <Link className="underline" to="/docs/libraries/shopify">
                        Shopify
                    </Link>{' '}
                    stores, and site builders such as{' '}
                    <Link className="underline" to="/docs/libraries/wordpress">
                        WordPress
                    </Link>
                    ,{' '}
                    <Link className="underline" to="/docs/libraries/webflow">
                        Webflow
                    </Link>
                    ,{' '}
                    <Link className="underline" to="/docs/libraries/framer">
                        Framer
                    </Link>
                    , and{' '}
                    <Link className="underline" to="/tutorials/wix-analytics">
                        Wix
                    </Link>
                    .
                </p>
                <p>
                    Single-page apps work too, because the SDK tracks route changes. For a walkthrough, see the{' '}
                    <Link className="underline" to="/tutorials/react-heatmap">
                        React heatmap tutorial
                    </Link>
                    .
                </p>
            </>
        ),
    },
    {
        question: 'Do heatmaps work on mobile apps?',
        answer: 'Not yet. PostHog heatmaps are for websites and web apps. For native iOS, Android, React Native, and Flutter apps, use PostHog session replay, which includes rage tap and dead tap detection.',
        render: (
            <>
                <p>Not yet. PostHog heatmaps are for websites and web apps.</p>
                <p>
                    For native iOS, Android, React Native, and Flutter apps, use PostHog{' '}
                    <Link className="underline" to="/docs/session-replay/mobile">
                        mobile session replay
                    </Link>
                    , which includes rage tap and dead tap detection.
                </p>
            </>
        ),
    },
    {
        question: 'How long does PostHog keep heatmap data?',
        answer: 'Heatmap and scrollmap data (clicks, mouse movement, rageclicks, and scroll depth) is kept for 90 days on every plan. Clickmaps use regular autocapture events, so they follow your events retention: 1 year on the free plan and 2 years on pay-as-you-go. Saved heatmaps are kept until you delete them. For a longer history on a page, use the clickmap or a trends insight on autocapture events.',
        render: (
            <>
                <p>
                    Heatmap and scrollmap data (clicks, mouse movement, rageclicks, and scroll depth) is kept for 90
                    days on every plan.
                </p>
                <p>
                    Clickmaps use regular{' '}
                    <Link className="underline" to="/docs/product-analytics/autocapture">
                        autocapture
                    </Link>{' '}
                    events, so they follow your{' '}
                    <Link className="underline" to="/docs/data/events-retention">
                        events retention
                    </Link>
                    : 1 year on the free plan and 2 years on pay-as-you-go. Saved heatmaps are kept until you delete
                    them.
                </p>
                <p>
                    For a longer history on a page, use the clickmap or a{' '}
                    <Link className="underline" to="/docs/product-analytics/trends/overview">
                        trends insight
                    </Link>{' '}
                    on autocapture events.
                </p>
            </>
        ),
    },
    {
        question: 'Can I save and share a heatmap?',
        answer: 'Yes. Save a heatmap in PostHog to come back to it later, share it with your team, and open the events and session recordings behind it.',
        render: (
            <>
                <p>
                    Yes. Save a heatmap in PostHog to come back to it later, share it with your team, and open the
                    events and{' '}
                    <Link className="underline" to="/session-replay">
                        session recordings
                    </Link>{' '}
                    behind it.
                </p>
            </>
        ),
    },
    {
        question: 'Why is my heatmap empty?',
        answer: 'The usual causes are heatmap capture being off, the page not being in your capture list on the free plan, or your site blocking the in-app preview with a Content-Security-Policy header. When a heatmap has no data, PostHog tells you why and shows where the data is. If the page cannot load, PostHog suggests recent session recordings of the same page so you can view the heatmap on top of one.',
        render: (
            <>
                <p>
                    The usual causes are heatmap capture being off, the page not being in your capture list on the free
                    plan, or your site blocking the in-app preview with a{' '}
                    <Link className="underline" to="/docs/toolbar/heatmaps#troubleshooting">
                        Content-Security-Policy header
                    </Link>
                    .
                </p>
                <p>
                    When a heatmap has no data, PostHog tells you why and shows where the data is. If the page cannot
                    load, PostHog suggests recent session recordings of the same page so you can view the heatmap on top
                    of one.
                </p>
            </>
        ),
    },
    {
        question: 'Is there a heatmap API?',
        answer: 'Yes. The heatmap screenshots API lets you generate and fetch heatmap screenshots programmatically, and the PostHog MCP server lets AI agents read a page heatmap and save heatmaps.',
        render: (
            <>
                <p>
                    Yes. The{' '}
                    <Link className="underline" to="/docs/api/heatmap-screenshots">
                        heatmap screenshots API
                    </Link>{' '}
                    lets you generate and fetch heatmap screenshots programmatically, and the{' '}
                    <Link className="underline" to="/docs/model-context-protocol">
                        PostHog MCP server
                    </Link>{' '}
                    lets AI agents read a page heatmap and save heatmaps.
                </p>
            </>
        ),
    },
]

const HeatmapsFAQ = ({ id }: SectionComponentProps) => (
    <Section id={id}>
        <SectionHeading>Frequently asked questions</SectionHeading>
        {/* The four big questions collapse but keep a preview; everything else is a plain accordion. */}
        <div className="max-w-3xl flex flex-col gap-6 mb-12">
            <WhatAreHeatmaps id="what-are-heatmaps" />
            <HowToReadHeatmaps id="how-to-read-a-heatmap" />
            <HeatmapUseCases id="use-cases" />
            <WhoIsItFor id="who-is-it-for" />
        </div>
        <h3 className={FAQ_H3}>Other burning questions you (or your agent) might have</h3>
        {/* Native <details> gets the site's global summary/chevron styling, needs no
            JS, and keeps every answer in the HTML for crawlers and LLMs. */}
        <div className="max-w-3xl flex flex-col gap-3">
            {faq.map(({ question, answer, render, id: anchor }) => (
                <details key={question} id={anchor} className="scroll-mt-20" style={QUIET_DETAILS}>
                    <summary style={QUIET_SUMMARY}>
                        <h3 className="inline !px-0 text-[15px] leading-6 font-semibold text-primary m-0 underline decoration-dotted underline-offset-4">
                            {question}
                        </h3>
                    </summary>
                    <div className="contents text-[15px] leading-relaxed text-secondary">
                        {render ?? <p>{answer}</p>}
                    </div>
                </details>
            ))}
        </div>
        <p className="text-sm text-secondary mt-6 mb-0">
            Something else?{' '}
            <Link className="underline" to="/questions/topic/heatmaps">
                Ask the community
            </Link>
            .
        </p>
    </Section>
)

/* -------------------------------------------------------------------------- */
/* Docs & tutorials                                                            */
/* -------------------------------------------------------------------------- */

type RelatedLink = { to: string; label: string; description: string; Icon: React.ComponentType<any> }

const docGroups: { title: string; links: RelatedLink[] }[] = [
    {
        title: 'Set it up',
        links: [
            {
                to: '/docs/toolbar/heatmaps',
                label: 'Heatmaps docs',
                description: 'Setup, settings, wildcards, and troubleshooting.',
                Icon: IconBook,
            },
            {
                to: '/tutorials/react-heatmap',
                label: 'Heatmaps in a React app',
                description: 'From install to your first clickmap.',
                Icon: IconReact,
            },
            {
                to: '/tutorials/wix-analytics',
                label: 'Heatmaps on a Wix site',
                description: 'PostHog on Wix, heatmaps included.',
                Icon: IconGlobe,
            },
        ],
    },
    {
        title: 'Build on it',
        links: [
            {
                to: '/docs/toolbar',
                label: 'Toolbar docs',
                description: 'Heatmaps, actions, and feature flags on your live site.',
                Icon: IconToolbar,
            },
            {
                to: '/docs/api/heatmap-screenshots',
                label: 'Heatmap screenshots API',
                description: 'Generate and fetch heatmap screenshots programmatically.',
                Icon: IconCode,
            },
            {
                to: '/docs/model-context-protocol',
                label: 'PostHog MCP server',
                description: 'Let your coding agent read and save heatmaps.',
                Icon: IconAI,
            },
        ],
    },
]

const DocCard = ({ to, label, description, Icon }: RelatedLink) => (
    <HeatCard as="li" className="m-0">
        <Link to={to} state={{ newWindow: true }} className="group flex items-start gap-3 -m-4 p-4 h-full">
            <Icon className="size-5 shrink-0 mt-0.5 text-secondary group-hover:text-primary transition-colors" />
            <span className="min-w-0 flex-1">
                <span className="block text-[15px] font-semibold text-primary underline leading-snug mb-0.5">
                    {label}
                </span>
                <span className="block text-sm text-secondary leading-relaxed">{description}</span>
            </span>
            <IconArrowUpRight className="size-4 shrink-0 mt-1 text-muted group-hover:text-primary transition-colors" />
        </Link>
    </HeatCard>
)

const RelatedReads = ({ id }: SectionComponentProps) => (
    <Section id={id}>
        <SectionHeading lede="Everything you need to set heatmaps up, then build on them.">
            Docs and tutorials
        </SectionHeading>
        <div className="grid grid-cols-1 @3xl/reader-content:grid-cols-2 gap-8">
            {docGroups.map(({ title, links }) => (
                <div key={title}>
                    <h3 className="text-sm font-bold uppercase tracking-wide text-primary m-0 mb-3">{title}</h3>
                    <ul className="list-none m-0 p-0 flex flex-col gap-3">
                        {links.map((link) => (
                            <DocCard key={link.to} {...link} />
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    </Section>
)

/* -------------------------------------------------------------------------- */
/* Closing call to action                                                      */
/* -------------------------------------------------------------------------- */

const ClosingCta = ({ id }: SectionComponentProps) => {
    // Same behaviour as the hero's "Install with AI": reveal the wizard command in place.
    const [showWizard, setShowWizard] = useState(false)
    return (
        <Section id={id} className="mb-20">
            <div
                className="rounded-lg border border-primary bg-primary px-6 py-10 flex flex-col items-center text-center gap-4"
                style={{ backgroundImage: CLOSING_HEAT }}
            >
                <HedgehogCursor className="h-24 w-auto" />
                <h2 className="text-[1.75rem] font-bold text-primary m-0 leading-tight text-balance">
                    Go find out what nobody’s clicking{'\u00A0'}on
                </h2>
                <p className="text-[15px] text-secondary m-0 max-w-md">
                    Heatmaps are free forever. Turn them on in a minute, and see your first one today.
                </p>
                <div className="flex flex-wrap justify-center gap-3 pt-2">
                    <OSButton asLink variant="primary" size="lg" to="/signup">
                        Get started – free
                    </OSButton>
                    <OSButton
                        variant="secondary"
                        size="lg"
                        aria-expanded={showWizard}
                        onClick={() => setShowWizard((open) => !open)}
                    >
                        Install with AI
                    </OSButton>
                </div>
                {showWizard && (
                    <div className="w-full max-w-md text-left pt-2">
                        <p className="text-sm text-secondary m-0 mb-2">
                            Paste into your terminal or code editor and let AI do the work.
                        </p>
                        <WizardCommand />
                    </div>
                )}
            </div>
        </Section>
    )
}

/* -------------------------------------------------------------------------- */
/* Page                                                                        */
/* -------------------------------------------------------------------------- */

export default function Heatmaps() {
    const heatmapsProduct = useProduct({ handle: 'heatmaps' }) as any
    const allProducts = useProduct() as any[]
    const sectionsRef = useRef<HTMLDivElement>(null)

    // Direct links such as /heatmaps#works-with-my-stack should land on an open answer.
    useEffect(() => {
        if (typeof window === 'undefined' || !window.location.hash) return
        const id = window.location.hash.slice(1)
        openAnchor(id)
        // Content inside a collapsed answer had no position on first scroll, so jump again once open.
        document.getElementById(id)?.scrollIntoView({ block: 'start' })
    }, [])

    if (!heatmapsProduct) return <div>Product not found</div>

    const productData = {
        ...heatmapsProduct,
        productMenu,
        overview: {
            ...heatmapsProduct.overview,
            // Non-breaking space keeps "and scrollmaps" together: no one-word last line.
            title: 'Website heatmaps, clickmaps, and\u00A0scrollmaps',
            description: (
                // The Overview template owns the <p>; the block span adds air under the H1.
                <span className="block pt-3">
                    See where users click, scroll, and get stuck on your site.{' '}
                    <strong className="text-primary">Heatmaps are free</strong> and built into PostHog next to{' '}
                    <Link to="/session-replay" className="underline">
                        session replay
                    </Link>{' '}
                    and{' '}
                    <Link to="/web-analytics" className="underline">
                        web analytics
                    </Link>
                    .
                </span>
            ),
        },
        // No hero screenshot on purpose: it dominated the fold, especially on
        // phones. The same image appears in the setup section.
        screenshots: {},
        // Most visitors arrive from branded searches and already have PostHog, so
        // the generic hero links are replaced by the "Already on PostHog?" line below.
        ctaLinks: [] as CTALinkKey[],
        hogs: {
            mobileHog: {
                Component: HedgehogCursor,
                alt: 'A hedgehog with a cursor, ready to click',
                className: 'h-28 @2xl/reader-content:h-36',
            },
        },
        useCases: {
            rows: [
                ['Product teams', 'See which elements get attention, where users get stuck, and what to fix first'],
                ['Designers & UX researchers', 'Find dead clicks, rageclicks, and content people never scroll to'],
                ['Growth & marketing teams', 'Test CTA placement and landing-page layouts without adding tracking'],
                ['Engineers', 'Jump from a hot spot to the events and session recordings behind it'],
            ],
        },
        pairsWith: [
            {
                slug: 'session-replay',
                description:
                    'Click a hot spot to open the recordings of the users behind it, or view a heatmap on top of a replay snapshot.',
            },
            {
                slug: 'ai',
                Icon: IconAI,
                links: [
                    { label: 'PostHog AI', to: '/ai' },
                    { label: 'MCP', to: '/mcp' },
                ],
                description:
                    'Ask PostHog AI what a page’s heatmap shows, or connect your coding agent through the PostHog MCP server so it can read and save heatmaps before it suggests a change.',
            },
            {
                slug: 'product-analytics',
                description:
                    'Create an action from any element in the clickmap and use it in trends, funnels, and retention.',
            },
            {
                slug: 'toolbar',
                description: 'See heatmaps overlaid on your live site and create actions from elements.',
            },
        ],
    }
    const menuTabs = buildProductMenuTabs({ productData, contentRef: sectionsRef, activeSurface: 'product' })

    return (
        <>
            <SEO
                title={SEO_TITLE}
                description={SEO_DESCRIPTION}
                image={IN_APP_IMAGE}
                structuredData={buildProductStructuredData({
                    name: 'PostHog Heatmaps',
                    description: SEO_DESCRIPTION,
                    slug: 'heatmaps',
                    faq: [...expandedFaqForSchema, ...faq.map(({ question, answer }) => ({ question, answer }))],
                })}
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
                    <div className="flex flex-col gap-0">
                        <Overview id="overview" productData={productData} allProducts={allProducts} />
                        <QuickLinks
                            id="quick-links"
                            productData={productData}
                            allProducts={allProducts}
                            contentRef={sectionsRef}
                        />
                    </div>
                    <div className="not-prose flex flex-col divide-y divide-primary [&>*]:py-8 [&>*:first-child]:pt-0 [&>*:last-child]:pb-0">
                        <AtAGlance id="at-a-glance" productData={productData} allProducts={allProducts} />
                        <TryItHere id="try-it" productData={productData} allProducts={allProducts} />
                        <HeatmapsSetup id="setup" productData={productData} allProducts={allProducts} />
                        <HeatmapsPricing id="pricing" productData={productData} allProducts={allProducts} />
                        <WorksWith id="works-with" productData={productData} allProducts={allProducts} />
                        <HeatmapsCompare id="compare" productData={productData} allProducts={allProducts} />
                        <HeatmapsVsHotjar id="vs-hotjar" productData={productData} allProducts={allProducts} />
                        <HeatmapsFAQ id="faq" productData={productData} allProducts={allProducts} />
                        <RelatedReads id="docs" productData={productData} allProducts={allProducts} />
                        <ClosingCta id="get-started" productData={productData} allProducts={allProducts} />
                    </div>
                </div>
            </ReaderView>
            <HeatPlayground anchorRef={sectionsRef} />
        </>
    )
}
