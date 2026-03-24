import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Tabs } from 'radix-ui'
import { IconPauseFilled, IconPlayFilled } from '@posthog/icons'
import { OnePlaceSlide, UnderstandUsageSlide, DebugFixSlide, TestRolloutSlide } from './slides'

const SLIDE_DURATION = 5000

const tabs = [
    { value: 'one-place', label: 'One place for product data', content: <OnePlaceSlide /> },
    { value: 'understand-usage', label: 'Understand product usage', content: <UnderstandUsageSlide /> },
    { value: 'debug-fix', label: 'Debug & fix issues', content: <DebugFixSlide /> },
    { value: 'test-rollout', label: 'Test & roll out changes', content: <TestRolloutSlide /> },
]

export default function HeroCarousel() {
    const [activeTab, setActiveTab] = useState(tabs[0].value)
    const [isPaused, setIsPaused] = useState(false)
    const [isHovering, setIsHovering] = useState(false)
    const [progressKey, setProgressKey] = useState(0)
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
    const startTimeRef = useRef(Date.now())
    const remainingRef = useRef(SLIDE_DURATION)

    const effectivelyPaused = isPaused || isHovering

    const advance = useCallback(() => {
        setActiveTab((prev) => {
            const idx = tabs.findIndex((t) => t.value === prev)
            return tabs[(idx + 1) % tabs.length].value
        })
        remainingRef.current = SLIDE_DURATION
        setProgressKey((k) => k + 1)
    }, [])

    useEffect(() => {
        if (effectivelyPaused) {
            if (timerRef.current) {
                clearTimeout(timerRef.current)
                timerRef.current = null
                const elapsed = Date.now() - startTimeRef.current
                remainingRef.current = Math.max(0, remainingRef.current - elapsed)
            }
            return
        }

        startTimeRef.current = Date.now()
        timerRef.current = setTimeout(advance, remainingRef.current)

        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current)
                timerRef.current = null
            }
        }
    }, [effectivelyPaused, progressKey, advance])

    const handleTabChange = (value: string) => {
        setActiveTab(value)
        remainingRef.current = SLIDE_DURATION
        setProgressKey((k) => k + 1)
    }

    return (
        <div className="@container" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
            <Tabs.Root value={activeTab} onValueChange={handleTabChange} className="flex flex-col">
                <Tabs.List className="flex items-center gap-0 border-b border-primary">
                    <div className="flex flex-wrap @sm:flex-nowrap flex-1 min-w-0">
                        {tabs.map((tab) => (
                            <Tabs.Trigger
                                key={tab.value}
                                value={tab.value}
                                className="relative flex-1 min-w-[200px] @sm:min-w-0 px-3 py-2.5 text-sm font-semibold text-secondary data-[state=active]:text-primary cursor-default select-none transition-colors text-balance"
                            >
                                {tab.label}
                                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-border overflow-hidden">
                                    {activeTab === tab.value && (
                                        <div
                                            key={progressKey}
                                            className="h-full bg-primary"
                                            style={{
                                                animation: `hero-carousel-progress ${SLIDE_DURATION}ms linear forwards`,
                                                animationPlayState: effectivelyPaused ? 'paused' : 'running',
                                            }}
                                        />
                                    )}
                                </div>
                            </Tabs.Trigger>
                        ))}
                    </div>
                </Tabs.List>

                <div className="min-h-[300px] @[820px]:min-h-[400px] p-6 border border-t-0 border-primary rounded-b-md bg-white relative">
                    <button
                        onClick={() => setIsPaused((p) => !p)}
                        className="absolute top-2 right-0 shrink-0 p-2 text-secondary hover:text-primary cursor-pointer z-10"
                        aria-label={isPaused ? 'Play carousel' : 'Pause carousel'}
                    >
                        {isPaused ? <IconPlayFilled className="size-3.5" /> : <IconPauseFilled className="size-3.5" />}
                    </button>
                    {tabs.map((tab) => (
                        <Tabs.Content
                            key={tab.value}
                            value={tab.value}
                            className="data-[state=active]:animate-[hero-carousel-fade-in_300ms_ease-out]"
                        >
                            {tab.content}
                        </Tabs.Content>
                    ))}
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
            `}</style>
        </div>
    )
}
