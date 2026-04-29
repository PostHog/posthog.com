import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Tabs } from 'radix-ui'
import { IconPauseFilled, IconPlayFilled } from '@posthog/icons'

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

export interface TabbedCarouselProps {
    tabs: TabbedCarouselTab[]
    slideDuration?: number
    className?: string
    /** Appended to the slide outer container — overrides default chrome (min-h, padding, rounded). */
    slideClassName?: string
    /** When false, the slide outer container does not paint the active tab's color as a background. Default: true. */
    showActiveBg?: boolean
}

export default function TabbedCarousel({
    tabs,
    slideDuration = DEFAULT_SLIDE_DURATION,
    className,
    slideClassName,
    showActiveBg = true,
}: TabbedCarouselProps) {
    const [activeTab, setActiveTab] = useState(tabs[0].value)
    const [isPaused, setIsPaused] = useState(false)
    const [isHovering, setIsHovering] = useState(false)
    const [isOffscreen, setIsOffscreen] = useState(false)
    const [progressKey, setProgressKey] = useState(0)
    const containerRef = useRef<HTMLDivElement>(null)

    // Pause auto-advance when the carousel scrolls mostly out of view, so
    // height changes between slides don't shift the content the reader is
    // currently looking at further down the page. Mirrors HeroCarousel.
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

    const effectivelyPaused = isPaused || isHovering || isOffscreen

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

    return (
        <div
            ref={containerRef}
            className={`@container ${className || ''}`}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
        >
            <Tabs.Root value={activeTab} onValueChange={handleTabChange} className="flex flex-col">
                <Tabs.List className="flex items-center gap-0">
                    <div className="flex flex-wrap @sm:flex-nowrap flex-1 min-w-0">
                        {tabs.map((tab) => {
                            const isActive = activeTab === tab.value
                            return (
                                <Tabs.Trigger
                                    key={tab.value}
                                    value={tab.value}
                                    className={`relative flex-1 min-w-[200px] @sm:min-w-0 px-3 py-2.5 text-sm font-semibold cursor-pointer select-none transition-colors text-balance rounded-t-md flex flex-col gap-1 items-center ${
                                        isActive ? `${tab.color} ${tab.activeText}` : 'text-secondary'
                                    } ${tab.triggerClassName ?? ''}`}
                                >
                                    {tab.icon && tab.icon}
                                    {tab.label}
                                    <div className="absolute bottom-0 left-2 right-2 h-[3px] overflow-hidden">
                                        {isActive && (
                                            <div
                                                key={progressKey}
                                                className={`h-full rounded-full ${tab.progressBar}`}
                                                style={{
                                                    animation: `tabbed-carousel-progress ${slideDuration}ms linear forwards`,
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
                    className={`min-h-[300px] @[820px]:min-h-[400px] p-2 rounded-b-md rounded-t-md ${
                        isFirst ? '@sm:rounded-tl-none' : ''
                    } ${isLast ? '@sm:rounded-tr-none' : ''} relative ${
                        showActiveBg ? activeColor : ''
                    } flex transition-colors ${slideClassName ?? ''}`}
                >
                    <div className="flex flex-col bg-light dark:bg-dark flex-1 w-full shadow-2xl rounded overflow-hidden">
                        <button
                            onClick={() => setIsPaused((p) => !p)}
                            className="absolute top-4 right-4 shrink-0 p-2 text-secondary hover:text-primary cursor-pointer z-10 border border-secondary hover:bg-accent rounded bg-light/25 dark:bg-dark/25 backdrop-blur"
                            aria-label={isPaused ? 'Play carousel' : 'Pause carousel'}
                        >
                            {isPaused ? (
                                <IconPlayFilled className="size-3.5" />
                            ) : (
                                <IconPauseFilled className="size-3.5" />
                            )}
                        </button>
                        {tabs.map((tab) => (
                            <Tabs.Content
                                key={tab.value}
                                value={tab.value}
                                className="data-[state=active]:animate-[tabbed-carousel-fade-in_300ms_ease-out] flex-1"
                            >
                                {tab.content}
                            </Tabs.Content>
                        ))}
                    </div>
                </div>
            </Tabs.Root>

            <style>{`
                @keyframes tabbed-carousel-progress {
                    from { width: 0%; }
                    to { width: 100%; }
                }
                @keyframes tabbed-carousel-fade-in {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
            `}</style>
        </div>
    )
}
