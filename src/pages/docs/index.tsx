import CloudinaryImage from 'components/CloudinaryImage'
import React, { useEffect } from 'react'
import { SEO } from 'components/seo'
import Link from 'components/Link'
import { docsMenu } from '../../navs'
import * as Icons from '@posthog/icons'
import AskMax from 'components/AskMax'
import ZoomHover from 'components/ZoomHover'
import ScrollArea from 'components/RadixUI/ScrollArea'
import { SearchUI } from 'components/SearchUI'
import { useApp } from '../../context/App'
import { useActiveFeatureFlags, filterMenuByFlags } from '../../hooks/useActiveFeatureFlags'

// Self-driving entry paths
const pathCards = [
    {
        name: 'Understand self-driving',
        description: 'How your product learns to drive itself.',
        url: '/docs/self-driving',
        icon: 'IconStack',
        color: 'red',
    },
    {
        name: 'Get started',
        description: 'Install and send your first event in minutes.',
        url: '/docs/getting-started/install',
        icon: 'IconRocket',
        color: 'salmon',
    },
]

// The four surfaces where humans interact with their self-driving product
const surfaces = [
    {
        name: 'Slack',
        url: '/slack',
        icon: 'IconMessage',
        color: 'salmon',
        description: 'The simplest way for your whole team to use PostHog.',
    },
    {
        name: 'Web',
        url: '/docs/web',
        icon: 'IconLaptop',
        color: 'blue',
        description: 'For deeper work, right in your browser.',
    },
    {
        name: 'MCP',
        url: '/docs/model-context-protocol',
        icon: 'IconMagic',
        color: 'purple',
        description: 'For working from the AI tools you already use.',
    },
    // TODO: Desktop (PostHog Code) slots in here, position 2, once GA
]

// Keep surfaces — including Desktop (pre-GA) — out of the Signals list
const surfaceUrls = new Set([...surfaces.map((s) => s.url), '/docs/posthog-code'])

// Signals = the product docs that feed the loop, derived from the docs nav
// Respect feature-flag gating so flag-only products (e.g. Replay Vision) stay hidden
const getAllProducts = (activeFlags: string[] | null): any[] =>
    (filterMenuByFlags(docsMenu.children, activeFlags) || []).filter(
        (child: any) =>
            child.name !== 'Self-driving product' &&
            child.name !== 'Reference' &&
            typeof child.url === 'string' &&
            child.url.startsWith('/docs/') &&
            !surfaceUrls.has(child.url)
    )

export const DocsIndex = () => {
    const activeFlags = useActiveFeatureFlags()
    const [isMac, setIsMac] = React.useState<boolean | undefined>(undefined)
    useEffect(() => {
        setIsMac(typeof window !== 'undefined' && window.navigator.userAgent.toLowerCase().includes('macintosh'))
    }, [])

    const imagePositioning =
        'absolute @3xl:top-1/2 @3xl:left-1/2  opacity-100 @sm:opacity-80 @md:opacity-100 transition-all duration-300 @2xl:scale-75 @3xl:scale-90 @4xl:scale-100 @5xl:scale-110'

    const { websiteMode } = useApp()

    return (
        <div data-scheme="secondary" className={`${!websiteMode && 'bg-primary'} h-full text-primary`}>
            <SEO title="Documentation - PostHog" />
            <ScrollArea className={`${websiteMode ? '@container' : ''}`}>
                <section
                    id="hero"
                    className={`@container not-prose relative aspect-[3/1] overflow-hidden border-b border-primary bg-red-carpet bg-[length:150px_150px] ${
                        websiteMode
                            ? '@2xl:aspect-none h-36 @6xl:h-48 w-full'
                            : '@2xl:aspect-[4/1] @6xl:aspect-[5/1] mb-4'
                    }`}
                >
                    {/* Background container for positioned graphics */}
                    {/* Example of positioned graphics - replace with your actual graphics */}
                    {/* Left section graphics */}
                    <div className="absolute inset-0 flex flex-col justify-center items-center">
                        <div className="relative">
                            <CloudinaryImage
                                src="https://res.cloudinary.com/dmukukwp6/image/upload/top_middle_04506a5dc1.png"
                                alt=""
                                width={588}
                                height={434}
                                className={`${imagePositioning} 
                            translate-x-[calc(-50%-65%)] 
                            translate-y-[calc(-50%-60%)] 
                            @2xl:translate-x-[calc(-50%-65%)] 
                            @2xl:translate-y-[calc(-50%-50%)] 
                            @3xl:translate-x-[calc(-50%-70%)] 
                            @3xl:translate-y-[calc(-50%-50%)] 
                            @4xl:translate-x-[calc(-50%-70%)] 
                            @4xl:translate-y-[calc(-50%-60%)] 
                            @5xl:translate-x-[calc(-50%-70%)] 
                            @5xl:translate-y-[calc(-50%-70%)] 
                            @6xl:translate-x-[calc(-50%-80%)] 
                            @6xl:translate-y-[calc(-50%-70%)] 
                            @7xl:translate-x-[calc(-50%-90%)] 
                            @7xl:translate-y-[calc(-50%-65%)] 
                            w-[294px] h-auto`}
                            />
                            <CloudinaryImage
                                src="https://res.cloudinary.com/dmukukwp6/image/upload/top_right_c86eb1a286.png"
                                alt=""
                                width={551}
                                height={517}
                                className={`${imagePositioning} 
                            translate-x-[calc(-50%+25%)] 
                            translate-y-[calc(-50%-65%)] 
                            @lg:translate-x-[calc(-50%+55%)] 
                            @lg:translate-y-[calc(-50%-65%)] 
                            @2xl:translate-x-[calc(-50%+55%)] 
                            @2xl:translate-y-[calc(-50%-50%)] 
                            @3xl:translate-x-[calc(-50%+55%)] 
                            @3xl:translate-y-[calc(-50%-60%)] 
                            @4xl:translate-x-[calc(-50%+55%)] 
                            @4xl:translate-y-[calc(-50%-65%)] 
                            @5xl:translate-x-[calc(-50%+55%)] 
                            @5xl:translate-y-[calc(-50%-75%)] 
                            @6xl:translate-x-[calc(-50%+65%)] 
                            @6xl:translate-y-[calc(-50%-70%)] 
                            w-[275px] h-auto`}
                            />
                            <CloudinaryImage
                                src="https://res.cloudinary.com/dmukukwp6/image/upload/right_6de2023571.png"
                                alt=""
                                width={585}
                                height={488}
                                className={`${imagePositioning} 
                            translate-x-[calc(-50%+110%)] 
                            translate-y-[calc(-50%-25%)] 
                            @lg:translate-x-[calc(-50%+120%)] 
                            @lg:translate-y-[calc(-50%-10%)] 
                            @2xl:translate-x-[calc(-50%+110%)] 
                            @2xl:translate-y-[calc(-50%-10%)] 
                            @3xl:translate-x-[calc(-50%+120%)] 
                            @3xl:translate-y-[calc(-50%-20%)] 
                            @4xl:translate-x-[calc(-50%+145%)] 
                            @4xl:translate-y-[calc(-50%-25%)] 
                            @5xl:translate-x-[calc(-50%+150%)] 
                            @5xl:translate-y-[calc(-50%-30%)] 
                            @6xl:translate-x-[calc(-50%+160%)] 
                            @6xl:translate-y-[calc(-50%-30%)] 
                            @7xl:translate-x-[calc(-50%+170%)] 
                            @7xl:translate-y-[calc(-50%-30%)] 
                            w-[292.5px] h-[244px] `}
                            />

                            <CloudinaryImage
                                src="https://res.cloudinary.com/dmukukwp6/image/upload/bottom_right_fb4051ba15.png"
                                alt=""
                                width={389}
                                height={333}
                                className={`${imagePositioning} 
                            translate-x-[calc(-50%+70%)] 
                            translate-y-[calc(-50%+70%)] 
                            @lg:translate-x-[calc(-50%+80%)] 
                            @lg:translate-y-[calc(-50%+75%)] 
                            @xl:translate-x-[calc(-50%+120%)] 
                            @xl:translate-y-[calc(-50%+85%)] 
                            @2xl:translate-x-[calc(-50%+110%)] 
                            @2xl:translate-y-[calc(-50%+65%)] 
                            @3xl:translate-x-[calc(-50%+120%)] 
                            @3xl:translate-y-[calc(-50%+65%)] 
                            @4xl:translate-x-[calc(-50%+145%)] 
                            @4xl:translate-y-[calc(-50%+75%)] 
                            @5xl:translate-x-[calc(-50%+160%)] 
                            @5xl:translate-y-[calc(-50%+85%)] 
                            @6xl:translate-x-[calc(-50%+170%)] 
                            @6xl:translate-y-[calc(-50%+85%)] 
                            @7xl:translate-x-[calc(-50%+180%)] 
                            @7xl:translate-y-[calc(-50%+85%)] 
                            w-[194.5px] h-auto `}
                            />

                            <CloudinaryImage
                                src="https://res.cloudinary.com/dmukukwp6/image/upload/top_right_c86eb1a286.png"
                                alt=""
                                width={551}
                                height={517}
                                className={`${imagePositioning} 
                            translate-x-[calc(-50%-5%)] 
                            translate-y-[calc(-50%+120%)] 
                            @xl:translate-x-[calc(-50%-5%)] 
                            @xl:translate-y-[calc(-50%+70%)] 
                            @2xl:translate-x-[calc(-50%+5%)] 
                            @2xl:translate-y-[calc(-50%+55%)] 
                            @3xl:translate-x-[calc(-50%+5%)] 
                            @3xl:translate-y-[calc(-50%+60%)] 
                            @4xl:translate-x-[calc(-50%+5%)] 
                            @4xl:translate-y-[calc(-50%+70%)] 
                            @5xl:translate-x-[calc(-50%+15%)] 
                            @5xl:translate-y-[calc(-50%+75%)] 
                            w-[275px] h-auto`}
                            />

                            <CloudinaryImage
                                src="https://res.cloudinary.com/dmukukwp6/image/upload/bottom_left_19eb019249.png"
                                alt=""
                                width={366}
                                height={338}
                                className={`${imagePositioning} 
                            translate-x-[calc(-50%-50%)] 
                            translate-y-[calc(-50%+70%)] 
                            @xl:translate-x-[calc(-50%-120%)] 
                            @xl:translate-y-[calc(-50%+70%)] 
                            @2xl:translate-x-[calc(-50%-100%)] 
                            @2xl:translate-y-[calc(-50%+60%)] 
                            @3xl:translate-x-[calc(-50%-115%)] 
                            @3xl:translate-y-[calc(-50%+65%)] 
                            @4xl:translate-x-[calc(-50%-125%)] 
                            @4xl:translate-y-[calc(-50%+70%)] 
                            @5xl:translate-x-[calc(-50%-125%)] 
                            @5xl:translate-y-[calc(-50%+80%)] 
                            @6xl:translate-x-[calc(-50%-135%)] 
                            @6xl:translate-y-[calc(-50%+80%)] 
                            w-[183px] h-auto `}
                            />

                            <CloudinaryImage
                                src="https://res.cloudinary.com/dmukukwp6/image/upload/left_00fbb9dca8.png"
                                alt=""
                                width={560}
                                height={483}
                                className={`${imagePositioning} 
                            translate-x-[calc(-50%-125%)] 
                            translate-y-[calc(-50%+20%)] @xl:translate-x-[calc(-50%-140%)] @xl:translate-y-[calc(-50%+0%)] 
                            @2xl:translate-x-[calc(-50%-120%)] 
                            @2xl:translate-y-[calc(-50%+0%)] 
                            @3xl:translate-x-[calc(-50%-140%)] 
                            @3xl:translate-y-[calc(-50%+0%)] 
                            @4xl:translate-x-[calc(-50%-150%)] 
                            @4xl:translate-y-[calc(-50%+0%)] 
                            @5xl:translate-x-[calc(-50%-150%)] 
                            @5xl:translate-y-[calc(-50%+0%)] 
                            @6xl:translate-x-[calc(-50%-160%)] 
                            @6xl:translate-y-[calc(-50%+0%)] 
                            @7xl:translate-x-[calc(-50%-180%)] 
                            @7xl:translate-y-[calc(-50%+5%)] 
                            w-[280px] h-auto `}
                            />
                        </div>

                        {/* Text overlay - keeping this as is */}
                        <div className="absolute inset-0 flex flex-col justify-center items-center text-white">
                            <h1 className="text-2xl lg:text-3xl font-bold mb-1 @3xl:mb-2">Documentation</h1>
                        </div>
                    </div>
                </section>
                <div className={`flex @4xl:flex-row flex-col gap-4 @4xl:gap-8 h-full py-2 @xl:py-4 px-2 @xl:px-4`}>
                    <section className="flex-1">
                        <SearchUI
                            initialFilter="docs"
                            hideFilters
                            isRefinedClassName="bg-white"
                            className={`mb-4 ${
                                websiteMode ? 'border border-primary rounded overflow-hidden [&_input]:bg-white' : ''
                            }`}
                            autoFocus={false}
                        />
                        {/* Curated entry paths */}
                        <div data-scheme="primary" className="grid grid-cols-1 @md:grid-cols-3 gap-3 mb-8">
                            {pathCards.map((card) => {
                                const Icon = (Icons[card.icon as keyof typeof Icons] as any) || Icons.IconBook
                                return (
                                    <ZoomHover key={card.name} className="[&>span]:w-full">
                                        <Link
                                            to={card.url}
                                            className="bg-accent border border-transparent hover:border-primary px-4 py-4 rounded flex items-start gap-3 h-full w-full"
                                        >
                                            <Icon className={`size-6 shrink-0 text-${card.color}`} />
                                            <div>
                                                <div className="font-semibold leading-tight">{card.name}</div>
                                                <div className="text-sm opacity-70 leading-tight mt-0.5">
                                                    {card.description}
                                                </div>
                                            </div>
                                        </Link>
                                    </ZoomHover>
                                )
                            })}
                            {/* Ask PostHog AI opens the in-docs chat */}
                            <ZoomHover className="[&>span]:w-full">
                                <AskMax
                                    linkOnly
                                    className="bg-accent border border-transparent hover:border-primary px-4 py-4 rounded flex items-start gap-3 h-full w-full text-left"
                                >
                                    <Icons.IconSparkles className="size-6 shrink-0 text-purple" />
                                    <div>
                                        <div className="font-semibold leading-tight">Ask PostHog AI</div>
                                        <div className="text-sm opacity-70 leading-tight mt-0.5">
                                            Get answers without reading the docs.
                                        </div>
                                    </div>
                                </AskMax>
                            </ZoomHover>
                        </div>

                        {/* Where you'll work — the surfaces, in preference order (Slack first) */}
                        <h2 className="text-lg mb-1">Where you'll work</h2>
                        <p className="text-sm opacity-70 mb-3">Start in Slack, then go deeper when you need to.</p>
                        <div data-scheme="primary" className="grid grid-cols-1 @md:grid-cols-3 gap-3 mb-8">
                            {surfaces.map((surface) => {
                                const Icon = (Icons[surface.icon as keyof typeof Icons] as any) || Icons.IconBook
                                return (
                                    <ZoomHover key={surface.name} className="[&>span]:w-full">
                                        <Link
                                            to={surface.url}
                                            className="bg-accent border border-transparent hover:border-primary px-4 py-4 rounded flex flex-col h-full w-full gap-1.5"
                                        >
                                            <div className="flex items-center gap-2">
                                                <Icon className={`size-5 shrink-0 text-${surface.color}`} />
                                                <span className="font-semibold leading-tight">{surface.name}</span>
                                            </div>
                                            <p className="text-sm opacity-70 leading-tight m-0">
                                                {surface.description}
                                            </p>
                                        </Link>
                                    </ZoomHover>
                                )
                            })}
                        </div>

                        {/* Signals — the products that feed the loop */}
                        <h2 className="text-lg mb-1">Signals</h2>
                        <p className="text-sm opacity-70 mb-3">
                            Every PostHog product is a signal feeding your self-driving loop.
                        </p>
                        <div data-scheme="primary" className="columns-2 @md:columns-3 @2xl:columns-4 gap-x-8">
                            {getAllProducts(activeFlags).map((signal: any) => {
                                const Icon = signal.icon
                                    ? (Icons[signal.icon as keyof typeof Icons] as any)
                                    : Icons.IconBook
                                return (
                                    <Link
                                        key={signal.name}
                                        to={signal.url}
                                        className="flex items-center gap-2 py-1.5 break-inside-avoid font-medium hover:underline"
                                    >
                                        <Icon className={`size-4 shrink-0 text-${signal.color || 'primary'}`} />
                                        <span className="text-sm leading-tight">{signal.name}</span>
                                    </Link>
                                )
                            })}
                        </div>

                        {/* Help + credits live in an openable window, not a persistent rail */}
                        <p className="text-sm opacity-60 mt-10 mb-0">
                            <Link to="/docs/about" state={{ newWindow: true }} className="underline">
                                About our docs
                            </Link>
                        </p>
                    </section>
                </div>
            </ScrollArea>
        </div>
    )
}

export default DocsIndex
