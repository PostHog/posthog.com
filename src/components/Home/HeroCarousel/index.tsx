import React, { useCallback, useMemo, useState } from 'react'
import { Tabs } from 'radix-ui'
import { IconPauseFilled, IconPlayFilled } from '@posthog/icons'
import Tooltip from 'components/RadixUI/Tooltip'
import { Tab, productUsageTabs } from './tabs'
import { AutoAdvanceGateContext, SlideActiveContext } from './autoAdvanceGate'

const SLIDE_DURATION = 5000

export default function HeroCarousel({ tabs = productUsageTabs, className }: { tabs?: Tab[]; className?: string }) {
    const [activeTab, setActiveTab] = useState(tabs[0].value)
    const [isPaused, setIsPaused] = useState(false)
    const [isHovering, setIsHovering] = useState(false)
    const [progressKey, setProgressKey] = useState(0)
    // Reference-counted holds from slide content (e.g. a Typecaast animation still playing).
    // While any hold is active the progress bar — and therefore auto-advance — is paused.
    const [holds, setHolds] = useState(0)

    const acquire = useCallback(() => {
        setHolds((n) => n + 1)
        let released = false
        return () => {
            if (released) return
            released = true
            setHolds((n) => Math.max(0, n - 1))
        }
    }, [])
    const gate = useMemo(() => ({ acquire }), [acquire])

    const effectivelyPaused = isPaused || isHovering || holds > 0

    const advance = useCallback(() => {
        setActiveTab((prev) => {
            const idx = tabs.findIndex((t) => t.value === prev)
            return tabs[(idx + 1) % tabs.length].value
        })
        setProgressKey((k) => k + 1)
    }, [])

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
            className={`@container ${className}`}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
        >
            <AutoAdvanceGateContext.Provider value={gate}>
                <Tabs.Root value={activeTab} onValueChange={handleTabChange} className="flex flex-col">
                    <Tabs.List className="flex items-center gap-0">
                        <div className="flex flex-wrap @sm:flex-nowrap flex-1 min-w-0">
                            {tabs.map((tab) => {
                                const isActive = activeTab === tab.value
                                return (
                                    <Tabs.Trigger
                                        key={tab.value}
                                        value={tab.value}
                                        className={`relative flex-1 min-w-[200px] @sm:min-w-0 px-3 py-2.5 text-sm font-semibold cursor-pointer select-none @sm:transition-colors text-balance rounded-t-md ${
                                            isActive
                                                ? `${tab.color} ${tab.activeText} order-last @sm:order-none`
                                                : 'text-secondary'
                                        }`}
                                    >
                                        {tab.label}
                                        <div className="absolute bottom-0 left-2 right-2 h-[3px] overflow-hidden">
                                            {isActive && (
                                                <div
                                                    key={progressKey}
                                                    className={`h-full rounded-full ${tab.progressBar}`}
                                                    style={{
                                                        animation: `hero-carousel-progress ${SLIDE_DURATION}ms linear forwards`,
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
                        className={`min-h-[300px] @[820px]:min-h-[400px] p-2 @sm:rounded-b-md @sm:rounded-t-md ${
                            isFirst ? '@sm:rounded-tl-none' : ''
                        } ${isLast ? '@sm:rounded-tr-none' : ''} relative ${activeColor} flex @sm:transition-colors`}
                    >
                        <div className="flex flex-col bg-light dark:bg-dark flex-1 w-full shadow-2xl rounded">
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
                                // `forceMount` keeps every slide mounted so a Typecaast animation keeps its
                                // place (and timing) when you switch tabs instead of restarting; inactive
                                // panels are hidden via CSS. `SlideActiveContext` lets each slide pause itself
                                // and release its auto-advance hold while it isn't the visible tab.
                                <Tabs.Content
                                    key={tab.value}
                                    value={tab.value}
                                    forceMount
                                    className="data-[state=active]:animate-[hero-carousel-fade-in_300ms_ease-out] data-[state=inactive]:hidden flex-1"
                                >
                                    <SlideActiveContext.Provider value={activeTab === tab.value}>
                                        {tab.content}
                                    </SlideActiveContext.Provider>
                                </Tabs.Content>
                            ))}
                        </div>
                    </div>
                </Tabs.Root>
            </AutoAdvanceGateContext.Provider>
        </div>
    )
}
