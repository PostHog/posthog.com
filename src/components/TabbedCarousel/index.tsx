import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Tabs } from 'radix-ui'
import { IconPauseFilled, IconPlayFilled } from '@posthog/icons'
import Tooltip from 'components/RadixUI/Tooltip'

const DEFAULT_SLIDE_DURATION = 5000

export interface TabbedCarouselTab {
    value: string
    label: React.ReactNode
    icon?: React.ReactNode
    content: React.ReactNode
    color: string
    activeText: string
    progressBar: string
    /** Appended to the trigger's class — useful for per-tab sizing/active-state overrides. */
    triggerClassName?: string
}

export type TabbedCarouselVariant = 'minimal' | 'hero'

export interface TabbedCarouselProps {
    tabs: TabbedCarouselTab[]
    slideDuration?: number
    /**
     * Delay (ms) before auto-advance begins after mount. The carousel renders the first slide but
     * holds it (progress bar paused) until the delay elapses — useful for letting an intro
     * animation finish before this starts moving. Manual tab clicks, hover-pause, and the
     * offscreen-pause logic all continue to work during and after the delay. Default: 0.
     */
    autoplayStartDelay?: number
    className?: string
    /** Appended to the slide outer container — overrides default chrome (min-h, padding, rounded). */
    slideClassName?: string
    /**
     * When false (and variant is 'minimal'), the slide outer container does not paint the active
     * tab's color as a background. Default: true. Ignored for variant='hero', which always paints
     * the active color (its visual identity depends on it).
     */
    showActiveBg?: boolean
    /**
     * Visual preset:
     * - 'minimal' (default): flat tab strip, optional active background, no glow halos. Good for
     *   embedded carousels inside articles where chrome should be quiet.
     * - 'hero': bordered tabs with hover lift, blurred color halo behind the active tab and slide,
     *   active-tab reorder on small screens, always paints active color. Matches the homepage hero.
     */
    variant?: TabbedCarouselVariant
}

interface VariantConfig {
    /** Extra classes on the inner tab-strip wrapper (the row of triggers). */
    tabsRowClassName: string
    /** Base extra classes on every Tabs.Trigger (padding, border, transitions). */
    triggerBaseClassName: string
    /** Extra classes on the active Tabs.Trigger. */
    triggerActiveClassName: string
    /** Extra classes on inactive Tabs.Trigger (hover effects, etc.). */
    triggerInactiveClassName: string
    /** Whether to render a blurred color halo behind the active trigger (above the tab strip). */
    showActiveTabHalo: boolean
    /** Extra classes on the slide outer container (the colored frame around the slide content). */
    slideContainerClassName: string
    /** Whether to render a blurred color halo behind the slide content. */
    showSlideHalo: boolean
    /** Extra classes on the inner content wrapper (the white box containing slide content). */
    contentWrapperClassName: string
    /** When true, force-paint the active color on the slide container regardless of `showActiveBg`. */
    alwaysShowActiveBg: boolean
}

const VARIANT_CONFIG: Record<TabbedCarouselVariant, VariantConfig> = {
    minimal: {
        tabsRowClassName: '',
        triggerBaseClassName: 'py-2.5 transition-colors',
        triggerActiveClassName: '',
        triggerInactiveClassName: '',
        showActiveTabHalo: false,
        slideContainerClassName: 'rounded-b-md rounded-t-md transition-colors',
        showSlideHalo: false,
        contentWrapperClassName: 'overflow-hidden',
        alwaysShowActiveBg: false,
    },
    hero: {
        tabsRowClassName: 'gap-1',
        triggerBaseClassName: 'py-1.5 @3xl:py-2.5 border border-b-0',
        triggerActiveClassName: 'border-black/10 dark:border-white/60 @md:transition-background-color',
        triggerInactiveClassName:
            '@lg:hover:text-primary @lg:hover:bg-white/30 @lg:hover:backdrop-blur border-transparent @lg:hover:border-black/10 dark:@lg:hover:border-white/60 z-20 @lg:hover:-top-px',
        showActiveTabHalo: true,
        slideContainerClassName:
            '@md:rounded-b-md @md:rounded-t-md border border-black/10 dark:border-white/60 -mt-px @md:transition-colors',
        showSlideHalo: true,
        contentWrapperClassName: 'relative',
        alwaysShowActiveBg: true,
    },
}

export default function TabbedCarousel({
    tabs,
    slideDuration = DEFAULT_SLIDE_DURATION,
    autoplayStartDelay = 0,
    className,
    slideClassName,
    showActiveBg = true,
    variant = 'minimal',
}: TabbedCarouselProps) {
    const [activeTab, setActiveTab] = useState(tabs[0].value)
    const [isPaused, setIsPaused] = useState(false)
    const [isHovering, setIsHovering] = useState(false)
    const [isOffscreen, setIsOffscreen] = useState(false)
    // Holds auto-advance paused until `autoplayStartDelay` ms have elapsed after mount.
    const [isWaitingToStart, setIsWaitingToStart] = useState(autoplayStartDelay > 0)
    const [progressKey, setProgressKey] = useState(0)
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (autoplayStartDelay <= 0) return
        const timer = setTimeout(() => setIsWaitingToStart(false), autoplayStartDelay)
        return () => clearTimeout(timer)
    }, [autoplayStartDelay])

    // Pause auto-advance when the carousel scrolls mostly out of view, so
    // height changes between slides don't shift the content the reader is
    // currently looking at further down the page.
    useEffect(() => {
        const el = containerRef.current
        if (!el || typeof IntersectionObserver === 'undefined') return

        // ReaderView wraps content in a Radix ScrollArea — use that viewport
        // as the IntersectionObserver root when present so visibility is
        // measured against the actual scrolling container, not the window.
        const scrollRoot = (el.closest('[data-radix-scroll-area-viewport]') as Element | null) ?? null

        const observer = new IntersectionObserver(([entry]) => setIsOffscreen(!entry.isIntersecting), {
            root: scrollRoot,
            threshold: 0,
            rootMargin: '-300px 0px 0px 0px',
        })
        observer.observe(el)
        return () => observer.disconnect()
    }, [])

    const effectivelyPaused = isPaused || isHovering || isOffscreen || isWaitingToStart

    const advance = useCallback(() => {
        setActiveTab((prev) => {
            const idx = tabs.findIndex((t) => t.value === prev)
            return tabs[(idx + 1) % tabs.length].value
        })
        setProgressKey((k) => k + 1)
    }, [tabs])

    const handleTabChange = (value: string) => {
        setActiveTab(value)
        setProgressKey((k) => k + 1)
    }

    const activeIndex = tabs.findIndex((t) => t.value === activeTab)
    const activeColor = tabs[activeIndex]?.color || 'bg-yellow'
    const isFirst = activeIndex === 0
    const isLast = activeIndex === tabs.length - 1

    const config = VARIANT_CONFIG[variant]
    // Auto-detect: if any tab has an icon, stack icon above label. Otherwise inline.
    const hasAnyIcon = tabs.some((t) => !!t.icon)
    const triggerLayoutClassName = hasAnyIcon ? 'flex flex-col gap-1 items-center' : ''
    const paintActiveBg = config.alwaysShowActiveBg || showActiveBg

    // Below the @sm breakpoint the tab strip wraps to 2 columns (controlled by
    // `min-w-[calc(50%-0.25rem)]`). When wrapped, we visually swap rows so the
    // row containing the active tab always sits at the bottom — keeping it
    // adjacent to the slide content for visual continuity. At @sm and above the
    // tabs render in a single row and `@md:!order-none` neutralizes the offset.
    const TABS_PER_ROW_WHEN_WRAPPED = 2
    const totalRows = Math.ceil(tabs.length / TABS_PER_ROW_WHEN_WRAPPED)
    const activeRow = Math.floor(activeIndex / TABS_PER_ROW_WHEN_WRAPPED)
    const orderForTab = (i: number): number => {
        const row = Math.floor(i / TABS_PER_ROW_WHEN_WRAPPED)
        let displayRow: number
        if (row === activeRow) {
            displayRow = totalRows - 1
        } else if (row > activeRow) {
            displayRow = row - 1
        } else {
            displayRow = row
        }
        return displayRow * TABS_PER_ROW_WHEN_WRAPPED + (i % TABS_PER_ROW_WHEN_WRAPPED)
    }

    return (
        <div
            ref={containerRef}
            className={`@container ${className || ''}`}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
        >
            <Tabs.Root value={activeTab} onValueChange={handleTabChange} className="flex flex-col">
                <Tabs.List className="flex items-center gap-0 relative z-10">
                    <div className={`flex flex-wrap @md:flex-nowrap flex-1 min-w-0 ${config.tabsRowClassName}`}>
                        {tabs.map((tab, i) => {
                            const isActive = activeTab === tab.value
                            return (
                                <Tabs.Trigger
                                    key={tab.value}
                                    value={tab.value}
                                    style={{ order: orderForTab(i) }}
                                    className={`relative flex-1 min-w-[calc(50%-0.25rem)] @md:min-w-0 @md:!order-none px-3 text-sm font-semibold cursor-pointer select-none text-balance rounded-t-md ${triggerLayoutClassName} ${
                                        config.triggerBaseClassName
                                    } ${
                                        isActive
                                            ? `${tab.color} ${tab.activeText} ${config.triggerActiveClassName}`
                                            : `text-secondary ${config.triggerInactiveClassName}`
                                    } ${tab.triggerClassName ?? ''}`}
                                >
                                    {config.showActiveTabHalo && isActive && (
                                        <div
                                            aria-hidden
                                            className={`hidden @md:block pointer-events-none absolute -inset-x-4 -top-2 bottom-0 ${tab.color} blur-3xl opacity-40 -z-10 rounded-t-md`}
                                        />
                                    )}
                                    {tab.icon}
                                    <span className="relative">{tab.label}</span>
                                    <div className="absolute bottom-0 left-2 right-2 h-[3px] overflow-hidden">
                                        {isActive && (
                                            <div
                                                key={progressKey}
                                                className={`h-full rounded-full ${tab.progressBar}`}
                                                style={{
                                                    animation: `carousel-progress ${slideDuration}ms linear forwards`,
                                                    animationPlayState: effectivelyPaused ? 'paused' : 'running',
                                                }}
                                                onAnimationEnd={advance}
                                            />
                                        )}
                                    </div>
                                </Tabs.Trigger>
                            )
                        })}
                    </div>
                </Tabs.List>

                <div
                    className={`min-h-[300px] @[820px]:min-h-[400px] p-2 ${isFirst ? '@md:rounded-tl-none' : ''} ${
                        isLast ? '@md:rounded-tr-none' : ''
                    } relative ${paintActiveBg ? activeColor : ''} flex ${config.slideContainerClassName} ${
                        slideClassName ?? ''
                    }`}
                >
                    {config.showSlideHalo && (
                        <div
                            aria-hidden
                            className={`hidden @md:block pointer-events-none absolute inset-0 ${activeColor} blur-3xl opacity-20 -z-10 rounded-md @md:transition-colors duration-500`}
                        />
                    )}
                    <div
                        className={`flex flex-col bg-light dark:bg-dark flex-1 w-full shadow-2xl rounded ${config.contentWrapperClassName}`}
                    >
                        <span className="absolute top-4 right-4 z-10">
                            <Tooltip
                                trigger={
                                    <button
                                        onClick={() => setIsPaused((p) => !p)}
                                        className="shrink-0 p-2 text-secondary hover:text-primary cursor-pointer border border-secondary hover:bg-accent rounded bg-light/25 dark:bg-dark/25 backdrop-blur"
                                        aria-label={isPaused ? 'Resume carousel' : 'Pause carousel'}
                                    >
                                        {isPaused ? (
                                            <IconPlayFilled className="size-3.5" />
                                        ) : (
                                            <IconPauseFilled className="size-3.5" />
                                        )}
                                    </button>
                                }
                                delay={0}
                            >
                                <span>{isPaused ? 'Resume carousel' : 'Pause carousel'}</span>
                            </Tooltip>
                        </span>
                        {tabs.map((tab) => (
                            <Tabs.Content
                                key={tab.value}
                                value={tab.value}
                                className="data-[state=active]:animate-[carousel-fade-in_300ms_ease-out] flex-1"
                            >
                                {tab.content}
                            </Tabs.Content>
                        ))}
                    </div>
                </div>
            </Tabs.Root>
        </div>
    )
}
