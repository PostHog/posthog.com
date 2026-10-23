import React, { useCallback, useEffect, useState } from 'react'
import { HedgehogCardHog, HedgehogChef, HedgehogMountie, HedgehogSailorHog } from '@posthog/brand/hoggies'
import dayjs from 'dayjs'
import { AnimatePresence, motion } from 'framer-motion'
import { useUser } from 'hooks/useUser'
import type { Event } from '../../pages/events'
import PassportStamp from './PassportStamp'

// DEMO: stamps live in this browser only. A real version would save them to the community profile.
const STORAGE_KEY = 'posthog-events-passport'

type Stamps = Record<number, string> // event ID -> ISO time it was stamped

const readStamps = (): Stamps => {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
    } catch {
        return {}
    }
}

export const useEventPassport = () => {
    const [stamps, setStamps] = useState<Stamps>({})

    useEffect(() => {
        setStamps(readStamps())
    }, [])

    const toggleStamp = useCallback((eventId: number) => {
        setStamps((prev) => {
            const next = { ...prev }
            if (next[eventId]) {
                delete next[eventId]
            } else {
                next[eventId] = new Date().toISOString()
            }
            try {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
            } catch {
                // Private mode or blocked storage: the stamp still shows for this visit
            }
            return next
        })
    }, [])

    return { stamps, hasStamp: (eventId: number) => Boolean(stamps[eventId]), toggleStamp }
}

const cityOf = (event: Event): string =>
    event.online ? 'Online' : event.location?.label?.split(',')[0]?.trim() || 'Somewhere'

// The stamp art lives in its own file; re-exported for the event detail panel
export { default as Stamp } from './PassportStamp'

// Hand-placed spots so stamps overlap like a real, well-travelled passport. Percent of the collage area.
type Slot = { left: number; top: number; width: number; rotate: number }
const PAGE_SLOTS: Slot[] = [
    { left: 2, top: 1, width: 32, rotate: -12 },
    { left: 35, top: 0, width: 29, rotate: 8 },
    { left: 66, top: 3, width: 31, rotate: -5 },
    { left: 4, top: 33, width: 30, rotate: 7 },
    { left: 35, top: 31, width: 32, rotate: -9 },
    { left: 67, top: 35, width: 30, rotate: 13 },
    { left: 3, top: 64, width: 31, rotate: -4 },
    { left: 36, top: 66, width: 29, rotate: 10 },
    { left: 66, top: 63, width: 31, rotate: -8 },
]
const DATA_PAGE_SLOTS: Slot[] = [
    { left: 4, top: 4, width: 26, rotate: -10 },
    { left: 31, top: 0, width: 24, rotate: 9 },
    { left: 58, top: 6, width: 26, rotate: -4 },
    { left: 10, top: 48, width: 24, rotate: 6 },
    { left: 38, top: 46, width: 26, rotate: -12 },
    { left: 68, top: 50, width: 24, rotate: 11 },
]
const STAMPS_PER_PAGE = PAGE_SLOTS.length

const Collage = ({
    events,
    slots,
    onSelectEvent,
}: {
    events: Event[]
    slots: Slot[]
    onSelectEvent: (event: Event) => void
}) => (
    <div className="relative h-full w-full">
        {events.slice(0, slots.length).map((event, i) => (
            <div
                key={event.id}
                className="absolute"
                style={{ left: `${slots[i].left}%`, top: `${slots[i].top}%`, width: `${slots[i].width}%` }}
            >
                <PassportStamp event={event} rotate={slots[i].rotate} onClick={() => onSelectEvent(event)} />
            </div>
        ))}
    </div>
)

// --- Book -------------------------------------------------------------------------------------------

// A drag further than this (px) turns the page
const SWIPE_THRESHOLD = 60
const FOLD = 26 // px, size of the folded top-right corner

// Page turns hinge on the spine (left edge). Going forward, the old page swings away on top of the new
// one. Going back, the previous page swings back in on top.
const pageVariants = {
    enter: (dir: number) => (dir > 0 ? { rotateY: 0, zIndex: 0 } : { rotateY: -95, zIndex: 2 }),
    center: { rotateY: 0, zIndex: 1 },
    exit: (dir: number) => (dir > 0 ? { rotateY: -95, zIndex: 2 } : { rotateY: 0, zIndex: 0 }),
}

/** Navy frame + cream page with a folded corner, like the PostHog Airlines passport page. */
const PageFrame = ({ children, number }: { children: React.ReactNode; number: number }) => (
    <div className="h-full rounded-xl border-[3px] border-black bg-navy p-2.5">
        <div className="relative h-full">
            <div
                className="flex h-full flex-col rounded-md border-2 border-black bg-light-1 text-black"
                style={{ clipPath: `polygon(0 0, calc(100% - ${FOLD}px) 0, 100% ${FOLD}px, 100% 100%, 0 100%)` }}
            >
                <div className="pt-3 text-center font-squeak text-lg uppercase leading-none">PostHog passport</div>
                <div className="flex min-h-0 flex-1 flex-col">{children}</div>
                <div className="pb-1.5 text-center font-code text-[10px] text-black/40">{number}</div>
            </div>
            {/* The fold itself, drawn over the clipped corner */}
            <svg
                className="absolute right-0 top-0"
                width={FOLD}
                height={FOLD}
                viewBox={`0 0 ${FOLD} ${FOLD}`}
                aria-hidden
            >
                <path
                    d={`M1 1 L${FOLD - 1} ${FOLD - 1} L1 ${FOLD - 1} Z`}
                    fill="#E5E7E0"
                    stroke="#000"
                    strokeWidth="2"
                    strokeLinejoin="round"
                />
            </svg>
        </div>
    </div>
)

const Field = ({ label, value }: { label: string; value: React.ReactNode }) => (
    <div className="min-w-0">
        <div className="text-[8px] font-bold uppercase tracking-wider text-black/60">{label}</div>
        <div className="truncate text-[12px] font-black uppercase leading-tight">{value}</div>
    </div>
)

const Globe = () => (
    <svg viewBox="0 0 100 100" className="h-auto w-24" fill="none" stroke="currentColor" strokeWidth="4" aria-hidden>
        <circle cx="50" cy="50" r="44" />
        <ellipse cx="50" cy="50" rx="20" ry="44" />
        <line x1="50" y1="6" x2="50" y2="94" />
        <line x1="6" y1="50" x2="94" y2="50" />
        <path d="M14 28 Q50 38 86 28 M14 72 Q50 62 86 72" />
    </svg>
)

// Photobooth strip that peeks out from behind the closed cover
const PhotoStrip = () => (
    <div className="absolute -right-8 top-24 w-20 rotate-[14deg] space-y-1.5 border-2 border-black bg-light-1 p-1.5 shadow-md">
        {[HedgehogChef, HedgehogMountie, HedgehogCardHog].map((Hog, i) => (
            <div key={i} className="aspect-square overflow-hidden border-2 border-black bg-creamsicle">
                <Hog className="h-auto w-full" />
            </div>
        ))}
    </div>
)

const Cover = ({ onOpen }: { onOpen: () => void }) => (
    <button
        onClick={onOpen}
        className="flex h-full w-full flex-col items-center justify-between rounded-l-md rounded-r-xl border-[3px] border-black bg-navy px-6 pb-8 pt-12 text-center text-creamsicle"
        // Darker band down the left edge reads as the spine
        style={{ boxShadow: 'inset 14px 0 0 rgba(0,0,0,0.28)' }}
        aria-label="Open your passport"
    >
        <div className="font-squeak text-[2.6rem] uppercase leading-[0.9]">
            PostHog
            <br />
            passport
        </div>
        <Globe />
        <div>
            <div className="text-[11px] font-bold uppercase italic leading-snug">
                The united republic of
                <br />
                cracked engineers
            </div>
            <div className="mt-5 text-[13px] font-semibold opacity-80">Tap to open</div>
        </div>
    </button>
)

type EventPassportProps = {
    events: Event[]
    stamps: Record<number, string>
    onSelectEvent: (event: Event) => void
}

export default function EventPassport({ events, stamps, onSelectEvent }: EventPassportProps): JSX.Element {
    const { user } = useUser()
    // -1 is the closed cover, 0 is the data page, 1+ are stamp pages
    const [[page, direction], setPage] = useState<[number, number]>([-1, 1])

    const stamped = events
        .filter((event) => stamps[event.id])
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    const cities = new Set(stamped.filter((e) => !e.online).map(cityOf))
    const onlineCount = stamped.filter((e) => e.online).length
    // Always at least one stamp page, so a new passport still has a blank page to look at
    const lastPage = Math.max(1, Math.ceil(stamped.length / STAMPS_PER_PAGE))

    const holder = [user?.profile?.firstName, user?.profile?.lastName].filter(Boolean).join(' ') || 'Anonymous hog'
    const firstStamp = stamped[0] ? dayjs(stamped[0].date).format('DD MMM YYYY') : '???'

    const goTo = useCallback(
        (next: number) => setPage(([current]) => [Math.min(Math.max(next, -1), lastPage), next > current ? 1 : -1]),
        [lastPage]
    )

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'ArrowRight') goTo(page + 1)
            if (e.key === 'ArrowLeft') goTo(page - 1)
        }
        window.addEventListener('keydown', onKey)
        return () => window.removeEventListener('keydown', onKey)
    }, [page, goTo])

    const renderPage = () => {
        if (page === -1) return <Cover onOpen={() => goTo(0)} />

        if (page === 0) {
            // The data page: latest stamps up top, holder details below
            return (
                <PageFrame number={1}>
                    <div className="min-h-0 flex-[1.1] px-3 pt-2">
                        <Collage
                            events={[...stamped].reverse()}
                            slots={DATA_PAGE_SLOTS}
                            onSelectEvent={onSelectEvent}
                        />
                    </div>
                    <div className="border-t-2 border-black px-3 py-2.5">
                        <div className="flex gap-3">
                            <div className="w-[32%] shrink-0">
                                <div className="mb-1 text-[11px] font-black uppercase">Passport</div>
                                <div className="aspect-[4/5] overflow-hidden border-2 border-black bg-creamsicle">
                                    <HedgehogSailorHog className="h-auto w-full" />
                                </div>
                            </div>
                            <div className="min-w-0 flex-1 space-y-1.5 pt-1">
                                <Field label="Name" value={holder} />
                                <Field label="Events attended" value={stamped.length} />
                                <Field label="Cities" value={cities.size} />
                                <Field label="Pizza preference" value="Pro pineapple" />
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3 border-t-2 border-black px-3 py-2">
                        <Field label="First stamp" value={firstStamp} />
                        <Field label="Online events" value={onlineCount} />
                    </div>
                </PageFrame>
            )
        }

        const onPage = stamped.slice((page - 1) * STAMPS_PER_PAGE, page * STAMPS_PER_PAGE)
        return (
            <PageFrame number={page + 1}>
                <div className="min-h-0 flex-1 px-3 pt-3">
                    {onPage.length === 0 ? (
                        <div className="flex h-full items-center justify-center px-6 text-center text-sm font-semibold uppercase text-black/40">
                            This page is waiting for its first stamp. Open a past event and click &ldquo;I was
                            there&rdquo;.
                        </div>
                    ) : (
                        <Collage events={onPage} slots={PAGE_SLOTS} onSelectEvent={onSelectEvent} />
                    )}
                </div>
            </PageFrame>
        )
    }

    return (
        <div className="p-4">
            <div className="relative mx-auto w-full max-w-sm" style={{ perspective: 1400 }}>
                <AnimatePresence>
                    {page === -1 && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                            <PhotoStrip />
                        </motion.div>
                    )}
                </AnimatePresence>
                <div className="relative aspect-[7/10]">
                    <AnimatePresence initial={false} custom={direction}>
                        <motion.div
                            key={page}
                            custom={direction}
                            variants={pageVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
                            drag={page >= 0 ? 'x' : false}
                            dragConstraints={{ left: 0, right: 0 }}
                            dragElastic={0.25}
                            onDragEnd={(_, info) => {
                                if (info.offset.x < -SWIPE_THRESHOLD) goTo(page + 1)
                                else if (info.offset.x > SWIPE_THRESHOLD) goTo(page - 1)
                            }}
                            className="absolute inset-0 cursor-grab drop-shadow-xl active:cursor-grabbing"
                            style={{ transformOrigin: 'left center', backfaceVisibility: 'hidden' }}
                        >
                            {renderPage()}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            {page >= 0 && (
                <div className="mx-auto mt-4 flex max-w-sm items-center justify-between">
                    <button
                        onClick={() => goTo(page - 1)}
                        className="rounded px-2 py-1 text-lg hover:bg-accent"
                        aria-label="Previous page"
                    >
                        ‹
                    </button>
                    <div className="flex items-center gap-1.5">
                        {Array.from({ length: lastPage + 2 }, (_, i) => i - 1).map((p) => (
                            <button
                                key={p}
                                onClick={() => goTo(p)}
                                aria-label={p === -1 ? 'Close passport' : `Page ${p + 1}`}
                                className={`size-2 rounded-full ${p === page ? 'bg-red' : 'bg-light-9/40'}`}
                            />
                        ))}
                    </div>
                    <button
                        onClick={() => goTo(page + 1)}
                        disabled={page === lastPage}
                        className="rounded px-2 py-1 text-lg hover:bg-accent disabled:opacity-30"
                        aria-label="Next page"
                    >
                        ›
                    </button>
                </div>
            )}
            <p className="mt-3 text-center text-[13px] text-secondary">
                {page === -1
                    ? 'Swipe or use the arrow keys to turn pages.'
                    : 'Stamps are saved in this browser for now.'}
            </p>
        </div>
    )
}
