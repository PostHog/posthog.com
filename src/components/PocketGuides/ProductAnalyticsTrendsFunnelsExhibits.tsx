import React, { useEffect, useRef, useState } from 'react'
import { colors } from '@posthog/brand/colors'
import { StayCardContent } from '@posthog/twig-components/stay-card'
import { stays } from '@posthog/twig-components/catalog'
import cabin from '@posthog/twig-components/assets/cabin.jpg'
import '@posthog/twig-components/catalog.css'

import PostHogInspector, {
    COMPACT_INSPECTOR_CLASSES,
    InspectorCode,
    InspectorDetails,
    InspectorStatus,
} from './PostHogInspector'
import { Exhibit } from './ProductAnalyticsExhibits'

const bookingExamples = {
    confirmed: { visitor: 'Edgar Hogg', distinctId: 'user_812', requestId: 'req-203' },
    failed: { visitor: 'Another visitor', distinctId: 'user_409', requestId: 'req-204' },
} as const

const exampleStay = stays[0]

export function FilterUsersTrendFigure(): JSX.Element {
    const [showEvent, setShowEvent] = useState(false)
    const edgarFilterEvent = JSON.stringify({
        event: 'stay_filter_selected',
        timestamp: '2026-09-25T14:10:12.000Z',
        properties: {
            destination_type: 'Forest',
            results_count: 1,
            has_results: true,
            distinct_id: 'anon_7f3',
            $session_id: 'session_a1',
        },
    })

    return (
        <Exhibit
            stacked
            caption="Select “Inspect an event” to see one of Edgar’s selections behind the Week 2 count."
            header={
                <p className="!mb-1 !mt-0 text-right font-rounded text-xs text-secondary md:hidden">
                    Scroll sideways ↔
                </p>
            }
        >
            <div
                role="region"
                aria-label="Week 2 event count and Trends panels; scroll sideways on narrow screens"
                tabIndex={0}
                className="min-w-0 snap-x snap-proximity overflow-x-auto"
            >
                <div className="grid min-w-[34rem] grid-cols-2 items-stretch gap-2 @md:gap-4 @lg:min-h-[27rem] @2xl:min-h-[24rem]">
                    {showEvent ? (
                        <div className="min-w-0 snap-start">
                            <PostHogInspector
                                className={`${COMPACT_INSPECTOR_CLASSES} h-full`}
                                headerAction={
                                    <button
                                        type="button"
                                        onClick={() => setShowEvent(false)}
                                        className="text-xs font-semibold underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-orange"
                                    >
                                        ← Week 2 count
                                    </button>
                                }
                            >
                                <InspectorCode label="Event payload" value={edgarFilterEvent} meta="evt-201" />
                                <InspectorStatus>One of the 19 filter selections counted in Week 2.</InspectorStatus>
                            </PostHogInspector>
                        </div>
                    ) : (
                        <section
                            aria-label="Week 2 filter events counted as people"
                            className="flex min-w-0 snap-start flex-col overflow-hidden rounded border border-[#d3d0c8] bg-[#fffdfa] font-rounded text-[#292724] shadow-sm"
                        >
                            <div className="border-b border-[#d3d0c8] bg-[#f6f3ed] px-2 py-1.5 text-xs font-semibold @md:px-3">
                                Week 2
                            </div>
                            <div className="grid flex-1 grid-cols-[1fr_auto_1fr] items-center gap-1 px-2 py-3 text-center @md:px-3">
                                <div>
                                    <strong className="block text-2xl leading-none">19</strong>
                                    <span className="text-xs text-[#716c63]">events</span>
                                </div>
                                <span aria-hidden="true" className="text-lg text-[#716c63]">
                                    →
                                </span>
                                <div>
                                    <strong className="block text-2xl leading-none">8</strong>
                                    <span className="text-xs text-[#716c63]">people</span>
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={() => setShowEvent(true)}
                                className="w-full border-t border-[#d3d0c8] px-2 py-1.5 text-left text-[10px] font-semibold text-[#292724] underline @md:px-3 @md:text-xs"
                            >
                                Inspect an event →
                            </button>
                        </section>
                    )}
                    <section
                        aria-label="Simplified PostHog Trends insight for Twig destination filters"
                        className="flex min-w-0 snap-start flex-col overflow-hidden rounded border border-[#d3d0c8] bg-[#fffdfa] font-rounded text-[#292724] shadow-sm"
                    >
                        <div className="border-b border-[#d3d0c8] bg-[#f6f3ed] px-2 py-1.5 text-xs font-semibold @md:px-3">
                            Trends
                        </div>
                        <div className="border-b border-[#d3d0c8] px-2 py-2 text-[10px] @md:px-3 @md:text-xs">
                            <span className="break-all font-code text-[#292724]">stay_filter_selected</span>
                            <p className="!my-0 text-[#716c63]">Unique users · weekly</p>
                        </div>
                        <div className="flex flex-1 items-center justify-center p-2 @md:p-3">
                            <svg
                                role="img"
                                aria-label="Unique users by week: Week 1, 5 people; Week 2, 8 people"
                                className="w-full max-w-[16rem]"
                                viewBox="0 0 240 160"
                            >
                                <line x1="28" y1="120" x2="222" y2="120" stroke="#d3d0c8" strokeWidth="1" />
                                <path
                                    d="M 55 70 L 185 40"
                                    fill="none"
                                    stroke={colors.blue.core}
                                    strokeWidth="3"
                                    strokeLinecap="round"
                                />
                                <circle cx="55" cy="70" r="5" fill={colors.blue.core} />
                                <circle cx="185" cy="40" r="5" fill={colors.blue.core} />
                                <text x="55" y="57" textAnchor="middle" fill="#292724" fontSize="15" fontWeight="700">
                                    5
                                </text>
                                <text x="185" y="27" textAnchor="middle" fill="#292724" fontSize="15" fontWeight="700">
                                    8
                                </text>
                                <text x="55" y="145" textAnchor="middle" fill="#292724" fontSize="12">
                                    Week 1
                                </text>
                                <text x="185" y="145" textAnchor="middle" fill="#292724" fontSize="12">
                                    Week 2
                                </text>
                            </svg>
                        </div>
                    </section>
                </div>
            </div>
        </Exhibit>
    )
}

export function BookingStepsFigure(): JSX.Element {
    const [step, setStep] = useState(0)
    const [inView, setInView] = useState(false)
    const [manual, setManual] = useState(false)
    const [resetKey, setResetKey] = useState(0)
    const rootRef = useRef<HTMLDivElement>(null)
    const failed = step >= 5
    const example = failed ? bookingExamples.failed : bookingExamples.confirmed
    const started = (step >= 3 && step <= 4) || step >= 8
    const completed = step === 4
    const pointerVisible = step === 1 || step === 2 || step === 6 || step === 7
    const pointerPressed = step === 2 || step === 7

    useEffect(() => {
        if (!rootRef.current) return
        if (typeof IntersectionObserver === 'undefined') {
            setInView(true)
            return
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!entry?.isIntersecting) return
                const viewportHeight = entry.rootBounds?.height ?? window.innerHeight
                const visibleShare = Math.min(0.9, (viewportHeight * 0.9) / entry.boundingClientRect.height)
                if (entry.intersectionRatio >= visibleShare) {
                    setInView(true)
                    observer.disconnect()
                }
            },
            { threshold: Array.from({ length: 21 }, (_, index) => index / 20) }
        )
        observer.observe(rootRef.current)
        return () => observer.disconnect()
    }, [])

    useEffect(() => {
        if (!inView || manual) return
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            setStep(4)
            return
        }

        const times = [3000, 4800, 5300, 7600, 12700, 14700, 16600, 17200, 20000]
        const timeouts = times.map((time, index) => window.setTimeout(() => setStep(index + 1), time))
        return () => timeouts.forEach((timeout) => window.clearTimeout(timeout))
    }, [inView, manual, resetKey])

    return (
        <Exhibit
            stacked
            onReset={() => {
                setStep(0)
                setManual(false)
                setResetKey((key) => key + 1)
            }}
            header={<div className="mb-2 font-rounded text-xs text-secondary md:hidden">Scroll sideways ↔</div>}
        >
            <div
                ref={rootRef}
                role="region"
                aria-label="Twig booking and Inspector; scroll sideways on narrow screens"
                tabIndex={0}
                className="min-w-0 snap-x snap-proximity overflow-x-auto"
            >
                <div className="grid min-w-[38rem] grid-cols-2 items-start gap-2 @md:gap-4">
                    <section
                        aria-label="Twig booking example"
                        className="twig-browser min-w-0 snap-start overflow-hidden rounded border border-[#d7c8b6] bg-[#f7eddf] text-[#2d2b29]"
                    >
                        <div className="flex items-center justify-between gap-2 border-b border-[#d7c8b6] px-3 py-2 font-rounded text-sm font-semibold">
                            <span>Twig</span>
                            <span className="text-xs font-normal text-[#6d6258]">{example.visitor}</span>
                        </div>
                        <div className="p-3 pb-4 @md:p-4 @md:pb-5">
                            <article className="vac-card grid grid-cols-1 items-center gap-3 rounded border border-[#d7c8b6] bg-[#fff8ee] p-3 @sm:grid-cols-[6rem_minmax(0,1fr)] [&_.vac-card-body]:p-0 [&_.vac-card-body_h3]:text-base [&_.vac-card-body_p]:text-xs [&_.vac-card-body>p:nth-of-type(2)]:hidden [&_.vac-card-body>p:last-child]:!mb-0 [&_.vac-image]:aspect-[16/7] @sm:[&_.vac-image]:aspect-[4/3]">
                                <StayCardContent
                                    stay={exampleStay}
                                    image={
                                        <div className="vac-image">
                                            <img src={cabin} alt={exampleStay.images[0]?.alt ?? ''} />
                                        </div>
                                    }
                                />
                            </article>
                            {/* The shared Twig stylesheet scopes its primary button style to account layouts. */}
                            <div className="twig-account-layout relative !mx-0 !mb-0 !mt-3 !block !w-full">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setStep((current) => {
                                            if (current === 4) return 9
                                            if (current === 9) return 4
                                            return current >= 5 ? 9 : 4
                                        })
                                        setManual(true)
                                    }}
                                    className="vac-button vac-primary w-full"
                                >
                                    Book stay
                                </button>
                                {pointerPressed && (
                                    <span
                                        aria-hidden="true"
                                        className="pointer-events-none absolute left-1/2 top-1/2 z-10 size-7 -translate-x-1/2 -translate-y-1/2 animate-ping rounded-full border-2 border-orange motion-reduce:hidden"
                                    />
                                )}
                                <span
                                    aria-hidden="true"
                                    className={`pointer-events-none absolute left-1/2 top-1/2 z-10 transition-[opacity,transform] duration-[850ms] ease-in-out motion-reduce:hidden ${
                                        pointerVisible
                                            ? 'translate-x-0 translate-y-0 opacity-100'
                                            : 'translate-x-16 -translate-y-12 opacity-0'
                                    }`}
                                >
                                    <svg
                                        className={pointerPressed ? 'scale-90' : ''}
                                        width="24"
                                        height="30"
                                        viewBox="0 0 24 30"
                                        fill="none"
                                    >
                                        <path
                                            d="M2 2v21l5.8-5.4 4.1 9.2 4.2-1.8-4.1-9.1H20L2 2Z"
                                            fill="#1d1d1d"
                                            stroke="white"
                                            strokeWidth="2"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </span>
                            </div>
                        </div>
                    </section>
                    <PostHogInspector className={`${COMPACT_INSPECTOR_CLASSES} snap-start`}>
                        {started ? (
                            <>
                                <InspectorDetails
                                    tab="Event 1"
                                    title="booking_started"
                                    rows={[
                                        { label: 'distinct_id', value: example.distinctId },
                                        { label: 'request_id', value: example.requestId },
                                    ]}
                                />
                                {completed && (
                                    <InspectorDetails
                                        tab="Event 2"
                                        title="booking_completed"
                                        rows={[
                                            { label: 'distinct_id', value: example.distinctId },
                                            { label: 'request_id', value: example.requestId },
                                        ]}
                                    />
                                )}
                                <InspectorStatus tone={step === 9 ? 'error' : 'neutral'}>
                                    {completed ? (
                                        <>
                                            <strong>2 events arrived.</strong> The confirmed booking has a completion
                                            event.
                                        </>
                                    ) : step === 9 ? (
                                        <>
                                            <strong>Failed response · 1 event.</strong> No booking_completed event
                                            arrived.
                                        </>
                                    ) : (
                                        'Booking started. Waiting for Twig’s response…'
                                    )}
                                </InspectorStatus>
                            </>
                        ) : (
                            <InspectorStatus>
                                {failed
                                    ? 'New visitor, new request. Watch for their booking_started event.'
                                    : 'Watch Twig select Book stay. Events will appear here as the request runs.'}
                            </InspectorStatus>
                        )}
                    </PostHogInspector>
                </div>
            </div>
        </Exhibit>
    )
}

export function BookingFunnelFigure(): JSX.Element {
    const [showPerson, setShowPerson] = useState(false)
    const failed = bookingExamples.failed

    return (
        <Exhibit
            stacked
            header={
                <p className="!mb-1 !mt-0 text-right font-rounded text-xs text-secondary md:hidden">
                    Scroll sideways ↔
                </p>
            }
        >
            <div
                role="region"
                aria-label="Booking funnel and Inspector; scroll sideways on narrow screens"
                tabIndex={0}
                className="min-w-0 snap-x snap-proximity overflow-x-auto"
            >
                <div className="grid min-w-[38rem] grid-cols-2 items-start gap-2 @md:gap-4">
                    <section
                        aria-label="Simplified PostHog Funnels insight for bookings"
                        className="min-w-0 snap-start overflow-hidden rounded border border-[#d3d0c8] bg-[#fffdfa] font-rounded text-[#292724] shadow-sm"
                    >
                        <div className="flex items-center justify-between gap-2 border-b border-[#d3d0c8] bg-[#f6f3ed] px-3 py-2 text-sm font-semibold">
                            <span>Funnels</span>
                            <span className="font-code text-[10px] font-normal text-[#716c63]">14-day window</span>
                        </div>
                        <div className="space-y-3 p-3 text-xs">
                            <p className="!my-0 text-[#716c63]">Unique users who reached each step</p>
                            <div className="space-y-1">
                                <div className="flex justify-between gap-2">
                                    <span className="font-code">1. booking_started</span>
                                    <strong className="shrink-0">10</strong>
                                </div>
                                <div className="h-3 rounded-sm bg-[#f7a94b]" aria-hidden="true" />
                            </div>
                            <div className="space-y-1">
                                <div className="flex justify-between gap-2">
                                    <span className="font-code">2. booking_completed</span>
                                    <strong className="shrink-0">6 · 60%</strong>
                                </div>
                                <div className="h-3 rounded-sm bg-[#e9e7e1]" aria-hidden="true">
                                    <div className="h-full w-[60%] rounded-sm bg-[#f7a94b]" />
                                </div>
                            </div>
                        </div>
                        <button
                            type="button"
                            aria-expanded={showPerson}
                            onClick={() => setShowPerson(true)}
                            className="flex w-full items-center justify-between gap-2 border-t border-[#d3d0c8] px-3 py-2 text-left text-xs hover:bg-[#faf8f3] focus-visible:outline focus-visible:outline-2 focus-visible:outline-orange"
                        >
                            <span>
                                <strong>4 people</strong> didn't finish in time
                            </span>
                            <span className="shrink-0 font-semibold underline">Inspect one →</span>
                        </button>
                    </section>
                    <PostHogInspector className={`${COMPACT_INSPECTOR_CLASSES} snap-start`}>
                        {showPerson ? (
                            <>
                                <InspectorDetails
                                    tab="Person's events"
                                    title="booking_started"
                                    meta={failed.distinctId}
                                    rows={[{ label: 'request_id', value: failed.requestId }]}
                                />
                                <InspectorStatus tone="error">
                                    <strong>Twig response · {failed.requestId}: Failed.</strong> No booking_completed
                                    event followed.
                                </InspectorStatus>
                            </>
                        ) : (
                            <InspectorStatus>Select the drop-off to inspect one person's event trail.</InspectorStatus>
                        )}
                    </PostHogInspector>
                </div>
            </div>
        </Exhibit>
    )
}
