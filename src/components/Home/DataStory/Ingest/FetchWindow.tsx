import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { cn } from '../../../../utils'
import { ScrollToLatest } from '../sceneParts'
import { transform } from '../timeline'
import { formatFare } from './board'
import { ARROW, arrowHeadshot } from './fetchDrivers'
import { CHAT_GREETING, CHAT_SUGGESTIONS, ScriptRide, TURNS, typedDraft } from './fetchScript'

const MARKER_RADIUS = 9
const MARKER_CLIP_ID = 'fetch-map-marker-clip'
const MARKER_IMAGE_SIZE = 28
const DRIVERS_ONLINE = 14
const DRIVERS_NEARBY = 4
const CARD_AVATAR_SIZE = 32
const MAP_WIDTH = 320
const MAP_HEIGHT = 96
const ARROW_START = { x: 80, y: 62 }
const RIDER_LOCATION = { x: 210, y: 30 }
const ROUTE_PATH = `M ${ARROW_START.x} ${ARROW_START.y} V 48 H ${RIDER_LOCATION.x} V ${RIDER_LOCATION.y}`
const RIDER_BLUE = '#2f80fa'
const MESSAGE_ENTER = {
    initial: { opacity: 0, transform: transform({ y: 6 }) },
    animate: { opacity: 1, transform: transform() },
    transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] },
} as const

interface ChatMessage {
    key: string
    role: 'user' | 'assistant'
    content: string
    ride?: ScriptRide
}

const chatAt = (elapsed: number): ChatMessage[] => [
    { key: 'greeting', role: 'assistant', content: CHAT_GREETING },
    ...TURNS.flatMap((turn, index): ChatMessage[] => [
        ...(elapsed >= turn.sendAt ? [{ key: `user-${index}`, role: 'user' as const, content: turn.user }] : []),
        ...(elapsed >= turn.replyAt
            ? [{ key: `reply-${index}`, role: 'assistant' as const, content: turn.reply, ride: turn.ride }]
            : []),
    ]),
]

const PawMark = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
        <g fill="currentColor">
            <ellipse cx="6" cy="9" rx="2.2" ry="2.8" />
            <ellipse cx="10" cy="5.5" rx="2.2" ry="2.8" />
            <ellipse cx="14.5" cy="5.5" rx="2.2" ry="2.8" />
            <ellipse cx="18.4" cy="9" rx="2.2" ry="2.8" />
            <path d="M12.2 11c-3.2 0-6 3.4-6 6.1 0 1.8 1.3 2.6 2.7 2.6 1.3 0 2.1-.7 3.3-.7s2 .7 3.3.7c1.4 0 2.7-.8 2.7-2.6 0-2.7-2.8-6.1-6-6.1Z" />
        </g>
    </svg>
)

const RouteMap = ({ ride }: { ride?: ScriptRide }) => {
    return (
        <div className="relative h-24 overflow-hidden border-b border-[#26262a] bg-[#141416]">
            <svg
                viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`}
                preserveAspectRatio="xMidYMid slice"
                className="absolute inset-0 size-full"
            >
                <defs>
                    <clipPath id={MARKER_CLIP_ID}>
                        <circle cx={ARROW_START.x} cy={ARROW_START.y} r={MARKER_RADIUS} />
                    </clipPath>
                </defs>
                <g stroke="#232327" strokeWidth="6" fill="none">
                    <path d="M0 48 H320" />
                    <path d="M80 0 V96" />
                    <path d="M210 0 V96" />
                    <path d="M0 14 L120 96" />
                </g>
                {ride && (
                    <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
                        <path
                            d={ROUTE_PATH}
                            fill="none"
                            stroke="#ffc23d"
                            strokeWidth="2.5"
                            strokeLinejoin="round"
                            strokeLinecap="round"
                        />
                    </motion.g>
                )}
                <circle cx={RIDER_LOCATION.x} cy={RIDER_LOCATION.y} r="8" fill={RIDER_BLUE} fillOpacity={0.25} />
                <circle
                    cx={RIDER_LOCATION.x}
                    cy={RIDER_LOCATION.y}
                    r="4"
                    fill={RIDER_BLUE}
                    stroke="#f4f1ea"
                    strokeWidth="1.5"
                />
                {ride && (
                    <motion.g
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3, delay: 0.2 }}
                    >
                        <circle cx={ARROW_START.x} cy={ARROW_START.y} r={MARKER_RADIUS + 1.5} fill="#ffc23d" />
                        <image
                            href={arrowHeadshot(MARKER_IMAGE_SIZE)}
                            x={ARROW_START.x - MARKER_RADIUS}
                            y={ARROW_START.y - MARKER_RADIUS}
                            width={MARKER_RADIUS * 2}
                            height={MARKER_RADIUS * 2}
                            clipPath={`url(#${MARKER_CLIP_ID})`}
                            preserveAspectRatio="xMidYMid slice"
                        />
                    </motion.g>
                )}
            </svg>
            <span className="absolute bottom-2 right-3 rounded-full bg-[#0f0f10]/80 px-2 py-0.5 text-[11px] text-[#cfcac0]">
                {ride ? `${ARROW.name} is on the way · ETA 3 min` : `${DRIVERS_NEARBY} good dogs nearby`}
            </span>
        </div>
    )
}

const RideCard = ({ ride }: { ride: ScriptRide }) => (
    <motion.div {...MESSAGE_ENTER} className="mb-2 ml-8 rounded-xl border border-[#3a3324] bg-[#1d1a12] p-2.5 text-xs">
        <div className="flex items-center gap-2">
            <img
                src={arrowHeadshot(CARD_AVATAR_SIZE)}
                alt={ARROW.name}
                className="size-8 shrink-0 rounded-full object-cover ring-2 ring-[#ffc23d]"
            />
            <span className="min-w-0 flex-1 leading-tight">
                <span className="block font-semibold text-[#f4f1ea]">
                    {ARROW.name} · ★ {ARROW.rating}
                </span>
                <span className="block truncate text-[#9b968c]">{ARROW.breed}</span>
            </span>
            <span className="rounded-full bg-[#ffc23d] px-2 py-0.5 text-[10px] font-bold text-[#1a1400]">Booked</span>
        </div>
        <div className="mt-2 flex items-center justify-between gap-2 text-[#cfcac0]">
            <span className="min-w-0 truncate">
                {ride.pickup} → {ride.dropoff}
            </span>
            <span className="shrink-0 font-semibold tabular-nums text-[#f4f1ea]">{formatFare(ride.fare)}</span>
        </div>
    </motion.div>
)

const Bubble = ({ message }: { message: ChatMessage }) =>
    message.role === 'user' ? (
        <motion.p
            {...MESSAGE_ENTER}
            className="m-0 mb-2 ml-auto max-w-[80%] rounded-2xl rounded-br-md bg-[#ffc23d] px-3 py-1.5 text-[13px] leading-snug text-[#1a1400]"
        >
            {message.content}
        </motion.p>
    ) : (
        <motion.div {...MESSAGE_ENTER} className="mb-2 flex max-w-[88%] items-end gap-2">
            <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-[#26262a] text-[#ffc23d]">
                <PawMark className="size-3.5" />
            </span>
            <p className="m-0 rounded-2xl rounded-bl-md bg-[#1f1f23] px-3 py-1.5 text-[13px] leading-snug text-[#f4f1ea]">
                {message.content}
            </p>
        </motion.div>
    )

const TypingDots = () => (
    <motion.div {...MESSAGE_ENTER} className="mb-2 ml-8 flex w-fit gap-1 rounded-2xl bg-[#1f1f23] px-3 py-2.5">
        {[0, 1, 2].map((dot) => (
            <span
                key={dot}
                className="size-1.5 animate-pulse rounded-full bg-[#9b968c]"
                style={{ animationDelay: `${dot * 150}ms` }}
            />
        ))}
    </motion.div>
)

const Chip = ({ children }: { children: React.ReactNode }) => (
    <span className="block shrink-0 rounded-full border border-[#2e2e33] px-2.5 py-1 text-[11px] text-[#cfcac0]">
        {children}
    </span>
)

const FetchWindow = React.memo(function FetchWindow({
    elapsed,
    captured,
    className,
}: {
    elapsed: number
    captured: number
    className?: string
}) {
    const messages = chatAt(elapsed)
    const pending = TURNS.some(({ sendAt, replyAt }) => elapsed >= sendAt && elapsed < replyAt)
    const draft = typedDraft(elapsed)
    const ride = messages.find((message) => message.ride)?.ride
    const showSuggestions = elapsed < TURNS[0].sendAt

    return (
        <div
            aria-hidden="true"
            className={cn(
                'flex flex-col overflow-hidden rounded-xl border border-[#26262a] bg-[#0f0f10] text-[#f4f1ea] shadow-2xl @container',
                className
            )}
        >
            <header className="flex items-center gap-2.5 border-b border-[#26262a] px-3.5 py-2.5">
                <span className="flex size-7 items-center justify-center rounded-lg bg-[#ffc23d] text-[#1a1400]">
                    <PawMark className="size-4" />
                </span>
                <span className="leading-tight">
                    <span className="block text-[15px] font-bold tracking-tight">Fetch</span>
                    <span className="block text-[11px] text-[#9b968c]">Uber for dogs. The dogs drive.</span>
                </span>
                <span className="ml-auto hidden items-center gap-1.5 whitespace-nowrap rounded-full border border-[#26262a] px-2 py-0.5 text-[11px] text-[#cfcac0] @sm:flex">
                    <span className="size-1.5 rounded-full bg-[#4ade80]" />
                    {DRIVERS_ONLINE} drivers online
                </span>
            </header>
            <RouteMap ride={ride} />
            <ScrollToLatest className="h-48 basis-auto px-3.5 pt-3">
                {messages.map((message) => (
                    <React.Fragment key={message.key}>
                        <Bubble message={message} />
                        {message.ride && <RideCard ride={message.ride} />}
                    </React.Fragment>
                ))}
                {showSuggestions && (
                    <div className="mb-2 ml-8 flex flex-wrap gap-1.5">
                        {CHAT_SUGGESTIONS.map((suggestion) => (
                            <Chip key={suggestion}>{suggestion}</Chip>
                        ))}
                    </div>
                )}
                <AnimatePresence>{pending && <TypingDots key="typing" />}</AnimatePresence>
            </ScrollToLatest>
            <div className="flex items-center gap-2 border-t border-[#26262a] px-3 py-2.5">
                <span className="min-w-0 flex-1 truncate rounded-full border border-[#2e2e33] bg-[#17171a] px-3.5 py-1.5 text-[13px]">
                    {draft || <span className="text-[#6f6b63]">Message Fetch…</span>}
                </span>
                <span
                    className={cn(
                        'flex size-8 shrink-0 items-center justify-center rounded-full bg-[#ffc23d] text-sm font-bold text-[#1a1400] transition-opacity',
                        !draft && 'opacity-40'
                    )}
                >
                    ↑
                </span>
            </div>
            <footer className="flex items-center gap-1.5 border-t border-[#26262a] px-3.5 py-1.5 font-mono text-[11px] text-[#6f6b63]">
                <span className="text-[#9b968c]">posthog.capture()</span>
                <span>·</span>
                <span className="tabular-nums">
                    {captured.toLocaleString('en-US')} {captured === 1 ? 'event' : 'events'}
                </span>
            </footer>
        </div>
    )
})

export default FetchWindow
