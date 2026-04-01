import React, { useCallback, useState } from 'react'
import { Tabs } from 'radix-ui'
import { IconPauseFilled, IconPlayFilled } from '@posthog/icons'
import { OnePlaceSlide, UnderstandUsageSlide, DebugFixSlide, TestRolloutSlide } from './slides'
import Tooltip from 'components/RadixUI/Tooltip'

const SLIDE_DURATION = 5000

const tabs = [
    {
        value: 'one-place',
        label: 'One place for product data',
        content: <OnePlaceSlide />,
        color: 'bg-blue',
        activeText: 'text-white',
        progressBar: 'bg-white shadow-[0_0_6px_2px_rgba(0,0,0,0.2)]',
    },
    {
        value: 'understand-usage',
        label: 'Understand product usage',
        content: <UnderstandUsageSlide />,
        color: 'bg-teal',
        activeText: 'text-black',
        progressBar: 'bg-black/70 shadow-[0_0_6px_2px_rgba(255,255,255,0.4)]',
    },
    {
        value: 'debug-fix',
        label: 'Debug & fix issues',
        content: <DebugFixSlide />,
        color: 'bg-salmon',
        activeText: 'text-white',
        progressBar: 'bg-white shadow-[0_0_6px_2px_rgba(255,255,255,0.4)]',
    },
    {
        value: 'test-rollout',
        label: 'Test & roll out changes',
        content: <TestRolloutSlide />,
        color: 'bg-purple',
        activeText: 'text-white',
        progressBar: 'bg-white shadow-[0_0_6px_2px_rgba(255,255,255,0.4)]',
    },
]

export default function HeroCarousel() {
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
        <div className="@container" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
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
                    className={`min-h-[300px] @[820px]:min-h-[400px] p-2 rounded-b-md rounded-t-md ${
                        isFirst ? '@sm:rounded-tl-none' : ''
                    } ${isLast ? '@sm:rounded-tr-none' : ''} relative ${activeColor} flex transition-colors`}
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
                            <Tabs.Content
                                key={tab.value}
                                value={tab.value}
                                className="data-[state=active]:animate-[hero-carousel-fade-in_300ms_ease-out] flex-1"
                            >
                                {tab.content}
                            </Tabs.Content>
                        ))}
                    </div>
                </div>
            </Tabs.Root>

            <style>{`
                @keyframes hero-carousel-progress {
                    from { width: 0%; }
                    to { width: 100%; }
                }
                @keyframes hero-carousel-fade-in {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes scattered-float {
                    0%, 100% { transform: translate(-50%, -50%); }
                    25% { transform: translate(calc(-50% + 2px), calc(-50% - 1.5px)); }
                    50% { transform: translate(calc(-50% - 1px), calc(-50% + 2px)); }
                    75% { transform: translate(calc(-50% + 1.5px), calc(-50% + 1px)); }
                }
            `}</style>
        </div>
    )
}
