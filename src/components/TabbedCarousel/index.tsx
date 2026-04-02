import React, { useCallback, useState } from 'react'
import { Tabs } from 'radix-ui'
import { IconPauseFilled, IconPlayFilled } from '@posthog/icons'

const DEFAULT_SLIDE_DURATION = 5000

export interface TabbedCarouselTab {
    value: string
    label: string
    content: React.ReactNode
    color: string
    activeText: string
    progressBar: string
}

export interface TabbedCarouselProps {
    tabs: TabbedCarouselTab[]
    slideDuration?: number
    className?: string
}

export default function TabbedCarousel({
    tabs,
    slideDuration = DEFAULT_SLIDE_DURATION,
    className,
}: TabbedCarouselProps) {
    const [activeTab, setActiveTab] = useState(tabs[0].value)
    const [isPaused, setIsPaused] = useState(false)
    const [isHovering, setIsHovering] = useState(false)
    const [progressKey, setProgressKey] = useState(0)

    const effectivelyPaused = isPaused || isHovering

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
                                    className={`relative flex-1 min-w-[200px] @sm:min-w-0 px-3 py-2.5 text-sm font-semibold cursor-pointer select-none transition-colors text-balance rounded-t-md ${
                                        isActive ? `${tab.color} ${tab.activeText}` : 'text-secondary'
                                    }`}
                                >
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
                    } ${isLast ? '@sm:rounded-tr-none' : ''} relative ${activeColor} flex transition-colors`}
                >
                    <div className="flex flex-col bg-light dark:bg-dark flex-1 w-full shadow-2xl rounded">
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
