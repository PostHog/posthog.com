import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Tabs } from 'radix-ui'
import { colors } from '@posthog/brand/colors'
import { SavedStaysView } from '@posthog/twig-components/account'
import { SavedStay } from '@posthog/twig-components/saved-stay'
import { StayCardContent } from '@posthog/twig-components/stay-card'
import { stays } from '@posthog/twig-components/catalog'
import cabin from '@posthog/twig-components/assets/cabin.jpg'
import coast from '@posthog/twig-components/assets/coast.jpg'
import '@posthog/twig-components/catalog.css'

import PostHogInspector, { COMPACT_INSPECTOR_CLASSES, InspectorDetails, InspectorStatus } from './PostHogInspector'
import { Exhibit } from './ProductAnalyticsExhibits'

const twigBookingPanelClasses =
    'twig-browser min-w-0 overflow-hidden rounded border border-[#d7c8b6] bg-[#f7eddf] text-[#2d2b29]'
const twigBookingCardClasses =
    'vac-card grid min-w-0 grid-cols-1 items-center gap-3 rounded border border-[#d7c8b6] bg-[#fff8ee] p-2 @sm:grid-cols-[6rem_minmax(0,1fr)] [&_.vac-card-body]:p-0 [&_.vac-card-body_h3]:!text-base [&_.vac-card-body_p]:!text-xs [&_.vac-card-body>p:nth-of-type(2)]:hidden [&_.vac-image]:aspect-[16/7] @sm:[&_.vac-image]:aspect-[4/3]'

type BookingStep = 0 | 1 | 2 | 3

export function RepeatBookingFigure(): JSX.Element {
    const [step, setStep] = useState<BookingStep>(0)
    const [inView, setInView] = useState(false)
    const [pointerAtButton, setPointerAtButton] = useState(false)
    const [pointerPressed, setPointerPressed] = useState(false)
    const [resetKey, setResetKey] = useState(0)
    const rootRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!rootRef.current) return
        if (typeof IntersectionObserver === 'undefined') {
            setInView(true)
            return
        }
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setInView(true)
                    observer.disconnect()
                }
            },
            { threshold: 0.1 }
        )
        observer.observe(rootRef.current)
        return () => observer.disconnect()
    }, [])

    useEffect(() => {
        if (!inView) return
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            setStep(3)
            return
        }
        const times = [3500, 6200, 8700]
        const timeouts = times.map((time, index) => window.setTimeout(() => setStep((index + 1) as BookingStep), time))
        return () => timeouts.forEach((timeout) => window.clearTimeout(timeout))
    }, [inView, resetKey])

    useEffect(() => {
        if (!inView || (step !== 0 && step !== 2)) return
        setPointerAtButton(false)
        setPointerPressed(false)
        const moveTimeout = window.setTimeout(() => setPointerAtButton(true), step === 0 ? 150 : 100)
        const pressTimeout = window.setTimeout(() => setPointerPressed(true), step === 0 ? 3100 : 2350)
        return () => {
            window.clearTimeout(moveTimeout)
            window.clearTimeout(pressTimeout)
        }
    }, [inView, step, resetKey])

    const firstStay = step < 2
    const stay = firstStay ? stays[0] : stays[1]
    const photo = firstStay ? cabin : coast

    return (
        <Exhibit
            stacked
            onReset={() => {
                setPointerAtButton(false)
                setPointerPressed(false)
                setStep(0)
                setResetKey((key) => key + 1)
            }}
        >
            <div ref={rootRef} className="grid items-start gap-3 @lg:grid-cols-[minmax(0,1.05fr)_minmax(14rem,0.95fr)]">
                <div className="relative min-w-0">
                    <section className={twigBookingPanelClasses} aria-label="Twig booking preview">
                        <div className="border-b border-[#d7c8b6] px-3 py-2 font-semibold leading-5">Twig</div>
                        <div className="grid gap-3 p-3">
                            <article className={twigBookingCardClasses}>
                                <StayCardContent
                                    stay={stay}
                                    image={
                                        <div className="vac-image">
                                            <img src={photo} alt={stay.images[0]?.alt ?? ''} />
                                        </div>
                                    }
                                />
                            </article>
                            <div className="twig-account-layout !m-0 !block !w-full">
                                {step === 1 || step === 3 ? (
                                    <div className="vac-button vac-primary !flex w-full !cursor-default" role="status">
                                        Booking confirmed
                                    </div>
                                ) : (
                                    <button
                                        type="button"
                                        className="vac-button vac-primary w-full"
                                        onClick={() => setStep(firstStay ? 1 : 3)}
                                    >
                                        Book stay
                                    </button>
                                )}
                            </div>
                        </div>
                    </section>
                    {inView && (step === 0 || step === 2) && (
                        <div
                            aria-hidden="true"
                            className={`pointer-events-none absolute bottom-5 left-1/2 z-10 ease-in-out motion-reduce:hidden ${
                                step === 0
                                    ? `transition-opacity duration-[2000ms] ${
                                          pointerAtButton ? 'opacity-100' : 'opacity-0'
                                      }`
                                    : `transition-[transform,opacity] duration-[1200ms] ${
                                          pointerAtButton
                                              ? 'translate-x-0 translate-y-0 opacity-100'
                                              : 'translate-x-12 -translate-y-16 opacity-0'
                                      }`
                            }`}
                        >
                            <svg
                                className={`transition-transform duration-300 ${pointerPressed ? 'scale-90' : ''}`}
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
                            <span className="absolute left-6 top-5 whitespace-nowrap rounded border border-[#2d2b29] bg-[#fffdf9] px-2 py-1 font-rounded text-xs font-semibold text-[#2d2b29] shadow-[2px_2px_0_#f7a81b]">
                                Edgar Hogg
                            </span>
                        </div>
                    )}
                </div>
                <PostHogInspector className={COMPACT_INSPECTOR_CLASSES}>
                    {step === 0 ? (
                        <InspectorStatus>Watch Edgar complete a booking on Twig.</InspectorStatus>
                    ) : (
                        <>
                            {step === 3 && (
                                <InspectorDetails
                                    tab="Event 2"
                                    title="booking_completed"
                                    rows={[
                                        { label: 'timestamp', value: 'Mar 25, 2027 · 2:35 PM' },
                                        { label: 'distinct_id', value: 'user_812' },
                                    ]}
                                />
                            )}
                            <InspectorDetails
                                tab="Event 1"
                                title="booking_completed"
                                rows={[
                                    { label: 'timestamp', value: 'Sep 25, 2026 · 2:35 PM' },
                                    { label: 'distinct_id', value: 'user_812' },
                                ]}
                            />
                        </>
                    )}
                </PostHogInspector>
            </div>
        </Exhibit>
    )
}

const guestIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
type RetentionMonth = 0 | 6 | 12
const returningGuests: Record<RetentionMonth, number[]> = {
    0: guestIds,
    6: [1, 2],
    12: [2, 3, 5],
}

const retentionMonths: Array<{ month: RetentionMonth; retention: string }> = [
    { month: 0, retention: '100%' },
    { month: 6, retention: '20%' },
    { month: 12, retention: '30%' },
]

export function BookingRetentionFigure(): JSX.Element {
    return (
        <Exhibit stacked>
            <div className="mx-auto w-full max-w-3xl">
                <PostHogInspector
                    title="PostHog · Retention"
                    live="off"
                    showHeader={false}
                    className={COMPACT_INSPECTOR_CLASSES}
                >
                    <h3 className="!m-0 border-b border-[#d3d0c8] bg-[#f6f3ed] px-3 py-2 !text-sm font-semibold">
                        Cohort
                    </h3>
                    <Tabs.Root defaultValue="0">
                        <Tabs.List
                            aria-label="Choose a month to see who booked"
                            className="grid grid-cols-3 gap-px border-t border-[#d3d0c8] bg-[#d3d0c8]"
                        >
                            {retentionMonths.map(({ month, retention }) => (
                                <Tabs.Trigger
                                    key={month}
                                    value={String(month)}
                                    className="group min-w-0 bg-[#fffdfa] p-2 text-center outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-orange"
                                >
                                    <span className="block text-xs text-[#716c63]">Month {month}</span>
                                    <span className="mt-2 block rounded bg-[#f6f3ed] px-1 py-2 group-data-[state=active]:bg-[#fff0dc] group-data-[state=active]:ring-1 group-data-[state=active]:ring-inset group-data-[state=active]:ring-orange">
                                        <strong className="block text-base leading-5">{retention}</strong>
                                        <span className="text-xs">{returningGuests[month].length} guests</span>
                                    </span>
                                </Tabs.Trigger>
                            ))}
                        </Tabs.List>
                        {retentionMonths.map(({ month }) => (
                            <Tabs.Content key={month} value={String(month)} className="outline-none">
                                <div className="border-t border-[#d3d0c8] bg-[#faf8f3] px-3 py-2 text-xs font-semibold">
                                    People in January cohort · Month {month}
                                </div>
                                <table className="w-full table-fixed border-collapse !text-xs">
                                    <thead className="text-[#716c63]">
                                        <tr>
                                            <th scope="col" className="px-3 py-2 text-left font-normal">
                                                User ID
                                            </th>
                                            <th scope="col" className="px-3 py-2 text-left font-normal">
                                                Booking this month
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {guestIds.map((guest) => (
                                            <tr key={guest} className="border-t border-[#e8e4dc]">
                                                <th scope="row" className="px-3 py-1 text-left font-normal">
                                                    <span className="font-code text-xs">user_{guest + 200}</span>
                                                </th>
                                                <td className="px-3 py-1">
                                                    {returningGuests[month].includes(guest) ? (
                                                        month === 0 ? (
                                                            '✓ First booking'
                                                        ) : (
                                                            '✓ Booked again'
                                                        )
                                                    ) : (
                                                        <>
                                                            <span aria-hidden="true">–</span>
                                                            <span className="sr-only">No repeat booking</span>
                                                        </>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </Tabs.Content>
                        ))}
                    </Tabs.Root>
                </PostHogInspector>
            </div>
        </Exhibit>
    )
}

const savedStayGroups = [
    { id: 'saved', name: 'Saved before first booking', label: 'Saved stay', guests: guestIds.slice(0, 4) },
    { id: 'not-saved', name: 'No saved stay before first booking', label: 'No saved stay', guests: guestIds.slice(4) },
]

type SavedStayStep = 0 | 1 | 2 | 3
const savedStayStepDurations = [3500, 2800, 3000]

export function SavedStayJourneyFigure(): JSX.Element {
    const [inView, setInView] = useState(false)
    const [tableInView, setTableInView] = useState(false)
    const [step, setStep] = useState<SavedStayStep>(0)
    const [pageVisible, setPageVisible] = useState(true)
    const [pageHeight, setPageHeight] = useState<number>()
    const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })
    const [cursorVisible, setCursorVisible] = useState(false)
    const [cursorPressed, setCursorPressed] = useState(false)
    const [resetKey, setResetKey] = useState(0)
    const rootRef = useRef<HTMLDivElement>(null)
    const twigRef = useRef<HTMLDivElement>(null)
    const pageRef = useRef<HTMLDivElement>(null)
    const previousCursorStep = useRef<SavedStayStep | null>(null)
    const transitionTimeout = useRef<number>()
    const pageRevealFrame = useRef<number>()

    const changeStep = useCallback((nextStep: SavedStayStep) => {
        if (transitionTimeout.current !== undefined) return
        setPageVisible(false)
        setCursorPressed(false)
        transitionTimeout.current = window.setTimeout(() => {
            transitionTimeout.current = undefined
            setStep(nextStep)
            pageRevealFrame.current = window.requestAnimationFrame(() => setPageVisible(true))
        }, 320)
    }, [])

    useEffect(
        () => () => {
            window.clearTimeout(transitionTimeout.current)
            window.cancelAnimationFrame(pageRevealFrame.current ?? 0)
        },
        []
    )

    useEffect(() => {
        if (!rootRef.current) return
        if (typeof IntersectionObserver === 'undefined') {
            setInView(true)
            return
        }
        const observer = new IntersectionObserver(
            ([entry]) => {
                setInView(entry.intersectionRatio >= 0.1)
            },
            { threshold: 0.1 }
        )
        observer.observe(rootRef.current)
        return () => observer.disconnect()
    }, [])

    useEffect(() => {
        const table = document.getElementById('saved-cohort-retention')
        if (!table || typeof IntersectionObserver === 'undefined') return
        const observer = new IntersectionObserver(([entry]) => setTableInView(entry.intersectionRatio >= 0.5), {
            rootMargin: '-20% 0px -20% 0px',
            threshold: 0.5,
        })
        observer.observe(table)
        return () => observer.disconnect()
    }, [])

    useEffect(() => {
        if (!tableInView || transitionTimeout.current === undefined) return
        window.clearTimeout(transitionTimeout.current)
        transitionTimeout.current = undefined
        setPageVisible(true)
        setCursorPressed(false)
    }, [tableInView])

    useEffect(() => {
        if (!inView || tableInView || step === 3) return
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            setStep(3)
            return
        }
        setCursorPressed(false)
        const duration = savedStayStepDurations[step]
        const timeouts = [
            window.setTimeout(() => setCursorPressed(true), duration - 400),
            window.setTimeout(() => changeStep((step + 1) as SavedStayStep), duration),
        ]
        return () => timeouts.forEach((timeout) => window.clearTimeout(timeout))
    }, [changeStep, inView, tableInView, step, resetKey])

    useLayoutEffect(() => {
        const page = pageRef.current
        const twig = twigRef.current
        if (!page || !twig) return

        let cursorFrame: number
        const update = () => {
            const height = page.getBoundingClientRect().height
            setPageHeight((previous) => (previous === height ? previous : height))
            if (step === 3) {
                setCursorVisible(false)
                return
            }

            const target = page.querySelector(
                step === 0 ? '.twig-saved-control' : step === 1 ? '.twig-account-stay-card a' : '.vac-primary'
            )
            if (!target) return
            const panel = twig.getBoundingClientRect()
            const button = target.getBoundingClientRect()
            const position =
                step === 1
                    ? { x: button.right - panel.left - 22, y: button.top - panel.top + 18 }
                    : {
                          x: button.left - panel.left + button.width / 2 - 6,
                          y: button.top - panel.top + button.height / 2 - 6,
                      }

            if (previousCursorStep.current === null) {
                setCursorPosition({ x: Math.max(12, position.x - 70), y: Math.min(panel.height - 36, position.y + 55) })
                cursorFrame = window.requestAnimationFrame(() => {
                    setCursorPosition(position)
                    setCursorVisible(true)
                })
            } else {
                setCursorPosition(position)
            }
            previousCursorStep.current = step
        }

        update()
        if (typeof ResizeObserver === 'undefined') return () => window.cancelAnimationFrame(cursorFrame)
        const observer = new ResizeObserver(update)
        observer.observe(page)
        return () => {
            observer.disconnect()
            window.cancelAnimationFrame(cursorFrame)
        }
    }, [step, resetKey])

    const image = (
        <div className="vac-image">
            <img src={cabin} alt={stays[0].images[0]?.alt ?? ''} />
        </div>
    )

    return (
        <Exhibit
            stacked
            onReset={() => {
                window.clearTimeout(transitionTimeout.current)
                window.cancelAnimationFrame(pageRevealFrame.current ?? 0)
                transitionTimeout.current = undefined
                previousCursorStep.current = null
                setStep(0)
                setPageVisible(true)
                setCursorVisible(false)
                setCursorPressed(false)
                setResetKey((key) => key + 1)
            }}
        >
            <div ref={rootRef} className="grid items-start gap-3 @lg:grid-cols-[minmax(0,1.05fr)_minmax(14rem,0.95fr)]">
                <div ref={twigRef} className="relative min-w-0">
                    <div
                        className="overflow-hidden transition-[height] duration-500 ease-in-out motion-reduce:transition-none"
                        style={pageHeight === undefined ? undefined : { height: pageHeight }}
                    >
                        <div
                            ref={pageRef}
                            className={`relative transition-[opacity,transform] ease-in-out motion-reduce:transition-none ${
                                pageVisible
                                    ? 'translate-y-0 opacity-100 duration-500'
                                    : 'translate-y-1 opacity-0 duration-300'
                            }`}
                        >
                            {step === 1 ? (
                                <section className={twigBookingPanelClasses} aria-label="Twig saved stays">
                                    <div className="border-b border-[#d7c8b6] px-3 py-2 font-semibold leading-5">
                                        Twig
                                    </div>
                                    <div className="p-3 [&_.twig-account-page>h1]:!mt-0 [&_.twig-account-page>h1]:!mb-3 [&_.twig-account-page>h1]:!text-xl [&_.twig-account-page>.vac-eyebrow]:hidden [&_.twig-account-page>.twig-account-muted]:hidden [&_.twig-account-stay-grid]:!grid-cols-1 [&_.twig-account-stay-card>a]:!grid [&_.twig-account-stay-card>a]:!grid-cols-[5rem_minmax(0,1fr)] [&_.twig-account-stay-card>a]:!overflow-hidden [&_.twig-account-stay-card>a]:!rounded [&_.twig-account-stay-card>a]:!border [&_.twig-account-stay-card>a]:!border-[#d7c8b6] [&_.twig-account-stay-card>a]:!bg-[#fff8ee] [&_.vac-card-body]:!p-2 [&_.vac-card-body_h3]:!text-sm [&_.vac-card-body_p]:!text-xs [&_.vac-card-body>p:nth-of-type(2)]:hidden [&_.vac-image]:!h-full [&_.vac-image]:!aspect-auto @md:[&_.twig-account-stay-card>a]:!grid-cols-[7rem_minmax(0,1fr)]">
                                        <SavedStaysView
                                            stays={[stays[0]]}
                                            renderImage={() => image}
                                            stayHref={() => '#retention-saved-stay'}
                                            onNavigate={() => changeStep(2)}
                                        />
                                    </div>
                                </section>
                            ) : (
                                <>
                                    <section className={twigBookingPanelClasses} aria-label="Twig booking preview">
                                        <div className="border-b border-[#d7c8b6] px-3 py-2 font-semibold leading-5">
                                            Twig
                                        </div>
                                        <div className="grid gap-3 p-3">
                                            <article className={twigBookingCardClasses}>
                                                <StayCardContent stay={stays[0]} image={image} />
                                            </article>
                                            {step > 0 && (
                                                <div className="twig-account-layout !m-0 !block !w-full">
                                                    {step === 3 ? (
                                                        <div
                                                            className="vac-button vac-primary !flex w-full !cursor-default"
                                                            role="status"
                                                        >
                                                            Booking confirmed
                                                        </div>
                                                    ) : (
                                                        <button
                                                            type="button"
                                                            className="vac-button vac-primary w-full"
                                                            disabled={cursorPressed}
                                                            onClick={() => changeStep(3)}
                                                        >
                                                            {cursorPressed ? 'Confirming…' : 'Book stay'}
                                                        </button>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </section>
                                    {step === 0 && (
                                        <div className="twig-saved-control absolute right-4 top-[3.15rem] z-10">
                                            <SavedStay
                                                stayName={stays[0].title ?? 'Stay'}
                                                signedIn
                                                saved={false}
                                                onSavedChange={(nextSaved) => {
                                                    if (nextSaved) changeStep(1)
                                                }}
                                            />
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                    {inView && step < 3 && (
                        <div
                            aria-hidden="true"
                            className="pointer-events-none absolute z-20 motion-reduce:hidden"
                            style={{
                                left: cursorPosition.x,
                                top: cursorPosition.y,
                                opacity: cursorVisible ? 1 : 0,
                                transition:
                                    'left 1050ms cubic-bezier(0.42, 0, 0.22, 1), top 1050ms cubic-bezier(0.42, 0, 0.22, 1), opacity 1600ms ease-in-out',
                            }}
                        >
                            <svg
                                className={`transition-transform duration-300 ${cursorPressed ? 'scale-90' : ''}`}
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
                            {step !== 1 && (
                                <span
                                    className={`absolute whitespace-nowrap rounded border border-[#2d2b29] bg-[#fffdf9] px-2 py-1 font-rounded text-xs font-semibold text-[#2d2b29] shadow-[2px_2px_0_#f7a81b] ${
                                        step === 0 ? 'right-5 top-5' : 'left-6 top-5'
                                    }`}
                                >
                                    Twig visitor
                                </span>
                            )}
                        </div>
                    )}
                </div>
                <PostHogInspector className={COMPACT_INSPECTOR_CLASSES}>
                    {step > 0 ? (
                        <>
                            <InspectorDetails
                                tab="Saved stay"
                                title="stay_saved"
                                rows={[
                                    { label: 'timestamp', value: 'Jan 10, 2025 · 2:35 PM' },
                                    { label: 'distinct_id', value: 'user_202' },
                                ]}
                            />
                            {step === 3 && (
                                <InspectorDetails
                                    tab="First booking"
                                    title="booking_completed"
                                    rows={[
                                        { label: 'timestamp', value: 'Jan 15, 2025 · 2:35 PM' },
                                        { label: 'distinct_id', value: 'user_202' },
                                    ]}
                                />
                            )}
                        </>
                    ) : (
                        <InspectorStatus>
                            Watch a Twig visitor save a stay, then book it from Saved stays.
                        </InspectorStatus>
                    )}
                </PostHogInspector>
            </div>
        </Exhibit>
    )
}

export function SavedCohortRetentionFigure(): JSX.Element {
    const [selectedMonth, setSelectedMonth] = useState<RetentionMonth>(12)

    return (
        <Exhibit stacked>
            <div id="saved-cohort-retention" className="mx-auto w-full max-w-3xl">
                <PostHogInspector title="Retention" className={COMPACT_INSPECTOR_CLASSES} live="off">
                    <Tabs.Root defaultValue="saved">
                        <Tabs.List
                            aria-label="Choose a cohort filter"
                            className="grid grid-cols-2 border-b border-[#d3d0c8]"
                        >
                            {savedStayGroups.map(({ id, name, label }) => (
                                <Tabs.Trigger
                                    key={id}
                                    value={id}
                                    aria-label={name}
                                    className="border-b-2 border-transparent px-3 py-2 text-left text-xs font-semibold outline-none data-[state=active]:border-orange data-[state=active]:bg-[#faf8f3] focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-orange"
                                >
                                    {label}
                                </Tabs.Trigger>
                            ))}
                        </Tabs.List>
                        {savedStayGroups.map(({ id, guests }) => {
                            const selectedGuests = guests.filter((guest) =>
                                returningGuests[selectedMonth].includes(guest)
                            )
                            return (
                                <Tabs.Content key={id} value={id} className="outline-none">
                                    <div className="overflow-x-auto p-3">
                                        <table className="w-full table-fixed border-separate border-spacing-1 !text-xs">
                                            <thead className="text-[#716c63]">
                                                <tr>
                                                    <th scope="col" className="w-1/4 text-left font-normal">
                                                        Cohort
                                                    </th>
                                                    <th scope="col" className="w-[12%] text-center font-normal">
                                                        Size
                                                    </th>
                                                    {retentionMonths.map(({ month }) => (
                                                        <th key={month} scope="col" className="text-center font-normal">
                                                            Month {month}
                                                        </th>
                                                    ))}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <th scope="row" className="text-left font-semibold">
                                                        Jan 2025
                                                    </th>
                                                    <td className="text-center">{guests.length}</td>
                                                    {retentionMonths.map(({ month }) => {
                                                        const counted = guests.filter((guest) =>
                                                            returningGuests[month].includes(guest)
                                                        )
                                                        const percent = Math.round(
                                                            (counted.length / guests.length) * 100
                                                        )
                                                        const heatColor =
                                                            percent === 100
                                                                ? 'text-[#1d1d1d]'
                                                                : percent > 0
                                                                ? 'text-[#292724]'
                                                                : 'bg-[#f6f3ed] text-[#716c63]'
                                                        const blueFill =
                                                            percent === 100
                                                                ? colors.blue.core
                                                                : percent >= 50
                                                                ? colors.blue.lighter
                                                                : percent > 0
                                                                ? `color-mix(in srgb, ${colors.blue.lighter} 55%, white)`
                                                                : undefined

                                                        return (
                                                            <td key={month}>
                                                                <button
                                                                    type="button"
                                                                    aria-label={`Month ${month}: ${percent}% of ${guests.length} guests`}
                                                                    aria-pressed={selectedMonth === month}
                                                                    onClick={() => setSelectedMonth(month)}
                                                                    style={
                                                                        blueFill
                                                                            ? { backgroundColor: blueFill }
                                                                            : undefined
                                                                    }
                                                                    className={`w-full rounded px-1 py-2 text-center font-semibold outline-none focus-visible:ring-2 focus-visible:ring-orange ${heatColor} ${
                                                                        selectedMonth === month
                                                                            ? 'ring-2 ring-inset ring-orange'
                                                                            : ''
                                                                    }`}
                                                                >
                                                                    {percent}%
                                                                </button>
                                                            </td>
                                                        )
                                                    })}
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="border-t border-[#d3d0c8] bg-[#faf8f3] px-3 py-2 text-xs">
                                        <div className="font-semibold">Month {selectedMonth} users</div>
                                        {selectedGuests.length > 0 && (
                                            <ul className="!m-0 mt-2 flex list-none flex-wrap gap-2 !p-0">
                                                {selectedGuests.map((guest) => (
                                                    <li
                                                        key={guest}
                                                        className={`rounded border px-2 py-1 font-code text-xs ${
                                                            id === 'saved' && guest === 2 && selectedMonth === 12
                                                                ? 'border-orange bg-[#fff0dc]'
                                                                : 'border-[#d3d0c8] bg-[#fffdfa]'
                                                        }`}
                                                    >
                                                        user_{guest + 200}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                        {selectedGuests.length === 0 && (
                                            <div className="mt-1 text-[#716c63]">No users</div>
                                        )}
                                    </div>
                                </Tabs.Content>
                            )
                        })}
                    </Tabs.Root>
                </PostHogInspector>
            </div>
        </Exhibit>
    )
}
