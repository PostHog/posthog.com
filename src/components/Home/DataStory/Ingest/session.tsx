import React, { RefObject, useEffect, useState } from 'react'
import { motion, AnimatePresence, useInView, useReducedMotion } from 'framer-motion'
import { IconGraph, IconRewindPlay, IconSquare, IconWarning, IconX } from '@posthog/icons'
import { cn } from '../../../../utils'

export const LOOP_MS = 16000
const TICK_MS = 50
const REDUCED_MOTION_MOMENT = 14500
export const PACKET_TRAVEL_MS = 900

export const IOS_SPRING = { type: 'spring', stiffness: 380, damping: 32, mass: 0.9 }

export type ProductKey = 'analytics' | 'replay' | 'errors'
export type ExternalKey = 'stripe' | 'zendesk' | 'hubspot'
export type SourceKey = ProductKey | ExternalKey

const CLOUDINARY = 'https://res.cloudinary.com/dmukukwp6/image/upload'

const PRODUCTS: Record<
    ProductKey,
    { Icon: React.ComponentType<{ className?: string }>; className: string; color: string }
> = {
    analytics: { Icon: IconGraph, className: 'text-blue', color: '#2F80FA' },
    replay: { Icon: IconRewindPlay, className: 'text-yellow', color: '#F7A501' },
    errors: { Icon: IconWarning, className: 'text-orange', color: '#EB9D2A' },
}

export const EXTERNAL_SOURCES: { key: ExternalKey; label: string; logo: string; color: string; wide?: boolean }[] = [
    {
        key: 'stripe',
        label: 'Stripe',
        logo: `${CLOUDINARY}/Stripe_Logo_revised_2016_24183d3284.svg`,
        color: '#635BFF',
        wide: true,
    },
    { key: 'zendesk', label: 'Zendesk', logo: `${CLOUDINARY}/zendesk_icon_f56707bc5c.svg`, color: '#1F7A6E' },
    { key: 'hubspot', label: 'HubSpot', logo: `${CLOUDINARY}/hubspot_1_f8248c008e.svg`, color: '#FF7A59' },
]

const isProductKey = (key: SourceKey): key is ProductKey => key in PRODUCTS

export interface SessionEvent {
    id: string
    at: number
    source: SourceKey
    title: string
    detail: string
    headline: string
}

export const SESSION_EVENTS: SessionEvent[] = [
    { id: 'pricing', at: 400, source: 'analytics', title: 'Pageview', detail: '/pricing', headline: 'Viewed pricing' },
    {
        id: 'upgrade',
        at: 2000,
        source: 'analytics',
        title: 'Clicked "Upgrade to Pro"',
        detail: 'button.plan-cta',
        headline: 'Clicked Upgrade to Pro',
    },
    {
        id: 'checkout',
        at: 3300,
        source: 'analytics',
        title: 'Pageview',
        detail: '/checkout',
        headline: 'Started checkout',
    },
    {
        id: 'error',
        at: 7300,
        source: 'errors',
        title: 'TypeError',
        detail: "Cannot read properties of undefined (reading 'plan')",
        headline: 'TypeError in checkout.tsx',
    },
    {
        id: 'failed',
        at: 8200,
        source: 'stripe',
        title: 'payment_intent.payment_failed',
        detail: '$49.00 · Pro monthly',
        headline: 'Payment failed · $49',
    },
    {
        id: 'rage',
        at: 9400,
        source: 'replay',
        title: 'Rage click',
        detail: '4 clicks on "Pay $49"',
        headline: 'Rage-clicked Pay',
    },
    {
        id: 'ticket',
        at: 13600,
        source: 'zendesk',
        title: 'Ticket #4821 opened',
        detail: '"Can\'t upgrade my plan"',
        headline: 'Ticket: "Can\'t upgrade"',
    },
    {
        id: 'deal',
        at: 14700,
        source: 'hubspot',
        title: 'Deal moved to At risk',
        detail: 'Acme Corp · $588 ARR',
        headline: 'Acme deal at risk',
    },
]

export const isProductEvent = (event: SessionEvent): boolean => isProductKey(event.source)

export const eventColor = (event: SessionEvent): string =>
    isProductKey(event.source)
        ? PRODUCTS[event.source].color
        : EXTERNAL_SOURCES.find(({ key }) => key === event.source)?.color ?? 'currentColor'

export const visibleEvents = (elapsed: number): SessionEvent[] => SESSION_EVENTS.filter(({ at }) => at <= elapsed)

export const latestEvent = (elapsed: number, holdMs = Infinity): SessionEvent | undefined => {
    const latest = visibleEvents(elapsed).slice(-1)[0]
    return latest && elapsed - latest.at <= holdMs ? latest : undefined
}

export const travellingEvents = (elapsed: number): SessionEvent[] =>
    SESSION_EVENTS.filter(({ at }) => elapsed >= at && elapsed < at + PACKET_TRAVEL_MS)

const arrivingEvent = (elapsed: number): SessionEvent | undefined =>
    SESSION_EVENTS.find(({ at }) => elapsed >= at + PACKET_TRAVEL_MS - 150 && elapsed < at + PACKET_TRAVEL_MS + 450)

const formatSessionTime = (ms: number): string => `0:${String(Math.floor(ms / 1000)).padStart(2, '0')}`

export function useSessionClock(ref: RefObject<HTMLElement>): number {
    const inView = useInView(ref, { amount: 0.35 })
    const shouldReduceMotion = useReducedMotion()
    const [elapsed, setElapsed] = useState(0)

    useEffect(() => {
        if (shouldReduceMotion || !inView) return
        const id = window.setInterval(() => setElapsed((current) => (current + TICK_MS) % LOOP_MS), TICK_MS)
        return () => window.clearInterval(id)
    }, [inView, shouldReduceMotion])

    return shouldReduceMotion ? REDUCED_MOTION_MOMENT : elapsed
}

const CARD_NUMBER = '4242 4242 4242 4242'
const CHAT_MESSAGE = "Can't upgrade my plan"

const CURSOR_PATH: [number, number, number][] = [
    [0, 30, 34],
    [900, 70, 72],
    [3500, 60, 57],
    [5900, 50, 71],
    [9500, 94, 91],
    [10800, 74, 79.5],
    [12900, 92.4, 79.5],
]

const CLICKS = [2000, 4300, 6800, 8600, 8800, 9000, 9200, 10600, 11600, 13600]
const CLICK_RIPPLE_MS = 600

const cursorAt = (elapsed: number): [number, number] => {
    const point = [...CURSOR_PATH].reverse().find(([at]) => at <= elapsed) ?? CURSOR_PATH[0]
    return [point[1], point[2]]
}

const typed = (text: string, startAt: number, elapsed: number, msPerChar = 70): string =>
    text.slice(0, Math.max(0, Math.floor((elapsed - startAt) / msPerChar)))

const PRESS_MS = 110
const UPGRADE_CLICK_AT = 2000
const PAGE_CHANGE_AT = 3300
const CARD_FOCUS_AT = 4300
const CARD_BLUR_AT = 6100
const PAY_CLICK_AT = 6800
const PAYMENT_ERROR_AT = 7300
const RAGE_CLICKS = [8600, 8800, 9000, 9200]
const HELP_CLICK_AT = 10600
const PRESS_SPRING = { type: 'spring', stiffness: 700, damping: 22 }

const isPressed = (elapsed: number, at: number): boolean => elapsed >= at && elapsed < at + PRESS_MS

const Spinner = () => (
    <span className="inline-block size-[1.8cqw] animate-spin rounded-full border-[0.3cqw] border-current border-r-transparent align-[-0.2cqw]" />
)

const PricingPage = ({ elapsed }: { elapsed: number }) => (
    <div className="flex h-full flex-col items-center justify-center gap-[3.5cqw] px-[12%]">
        <div className="text-center">
            <div className="text-[4.42cqw] font-bold tracking-tight">Ship faster with Acme</div>
            <div className="mt-[0.6cqw] text-[2.34cqw] text-secondary">Simple pricing. Cancel anytime.</div>
        </div>
        <div className="grid w-full grid-cols-2 gap-[2.4cqw]">
            <div className="rounded-[1.8cqw] bg-white p-[2.4cqw] shadow-[0_0.4cqw_1.6cqw_-0.6cqw_rgba(0,0,0,0.15)] ring-1 ring-black/5 dark:bg-white/5 dark:ring-white/10">
                <div className="text-[2.21cqw] font-semibold text-secondary">Starter</div>
                <div className="mt-[0.6cqw] text-[5.2cqw] font-bold tracking-tight">$0</div>
                <div className="mt-[2cqw] rounded-full py-[1cqw] text-center text-[2.08cqw] font-semibold text-secondary ring-1 ring-black/10 dark:ring-white/15">
                    Current plan
                </div>
            </div>
            <div className="relative overflow-hidden rounded-[1.8cqw] bg-gradient-to-br from-[#4F46E5] to-[#8B5CF6] p-[2.4cqw] text-white shadow-[0_2cqw_4cqw_-2cqw_rgba(79,70,229,0.7)]">
                <div className="pointer-events-none absolute -right-[20%] -top-[40%] size-[80%] rounded-full bg-white/20 blur-[3cqw]" />
                <div className="relative text-[2.21cqw] font-semibold text-white/80">Pro</div>
                <div className="relative mt-[0.6cqw] text-[5.2cqw] font-bold tracking-tight">
                    $49<span className="text-[2.34cqw] font-medium text-white/70">/mo</span>
                </div>
                <motion.div
                    animate={{ scale: isPressed(elapsed, UPGRADE_CLICK_AT) ? 0.93 : 1 }}
                    transition={PRESS_SPRING}
                    className="relative mt-[2cqw] flex items-center justify-center gap-[1cqw] rounded-full bg-white py-[1cqw] text-[2.08cqw] font-bold text-[#4F46E5]"
                >
                    {elapsed >= UPGRADE_CLICK_AT ? (
                        <>
                            <Spinner />
                            Upgrading…
                        </>
                    ) : (
                        'Upgrade to Pro'
                    )}
                </motion.div>
            </div>
        </div>
    </div>
)

const CheckoutPage = ({ elapsed }: { elapsed: number }) => {
    const cardFocused = elapsed >= CARD_FOCUS_AT && elapsed < CARD_BLUR_AT
    const processing = elapsed >= PAY_CLICK_AT && elapsed < PAYMENT_ERROR_AT
    const failed = elapsed >= PAYMENT_ERROR_AT
    const lastPayClick = [PAY_CLICK_AT, ...RAGE_CLICKS].filter((at) => elapsed >= at).slice(-1)[0]
    const isRageClick = lastPayClick !== undefined && RAGE_CLICKS.includes(lastPayClick)

    return (
        <div className="relative flex h-full items-center justify-center px-[22%]">
            <AnimatePresence>
                {elapsed >= 7300 && (
                    <motion.div
                        initial={{ opacity: 0, y: '-120%', scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={IOS_SPRING}
                        className="absolute left-0 right-0 top-[5%] mx-auto flex w-fit items-center gap-[1cqw] whitespace-nowrap rounded-full bg-[#1d1f27] px-[2cqw] py-[1cqw] text-[2.08cqw] font-semibold text-white shadow-[0_1cqw_3cqw_-1cqw_rgba(0,0,0,0.5)]"
                    >
                        <span className="size-[1.2cqw] rounded-full bg-[#FF5A4E]" />
                        Payment couldn't be processed
                    </motion.div>
                )}
            </AnimatePresence>
            <div className="w-full">
                <div className="text-[3.64cqw] font-bold tracking-tight">Checkout</div>
                <div className="text-[2.08cqw] text-secondary">Acme Pro · $49 / month</div>
                <div className="mt-[3cqw] text-[1.82cqw] font-semibold text-secondary">Card number</div>
                <div
                    className={`mt-[0.8cqw] flex h-[5cqw] items-center gap-[1.2cqw] rounded-[1.2cqw] bg-white px-[1.6cqw] text-[2.34cqw] tabular-nums shadow-[0_0.3cqw_1cqw_-0.4cqw_rgba(0,0,0,0.12)] transition-shadow duration-200 dark:bg-white/5 ${
                        cardFocused ? 'ring-[0.35cqw] ring-[#4F46E5]/60' : 'ring-1 ring-black/10 dark:ring-white/15'
                    }`}
                >
                    <span className="h-[2cqw] w-[3cqw] shrink-0 rounded-[0.4cqw] bg-gradient-to-br from-[#8C85FF] to-[#5146F0]" />
                    {typed(CARD_NUMBER, 4500, elapsed)}
                    {elapsed > 4300 && elapsed < 6000 && <span className="h-[2.4cqw] w-px animate-pulse bg-current" />}
                </div>
                <motion.div
                    animate={{ x: failed ? [0, -6, 6, -4, 4, -2, 0] : 0 }}
                    transition={{ duration: 0.45, ease: 'easeOut' }}
                    className="mt-[2.4cqw]"
                >
                    <motion.div
                        key={lastPayClick ?? 'idle'}
                        initial={false}
                        animate={
                            lastPayClick === undefined
                                ? { scale: 1 }
                                : {
                                      scale: [1, isRageClick ? 0.9 : 0.95, 1],
                                      filter: isRageClick
                                          ? ['brightness(1)', 'brightness(0.8)', 'brightness(1)']
                                          : 'brightness(1)',
                                  }
                        }
                        transition={{ duration: isRageClick ? 0.16 : 0.22, ease: 'easeOut' }}
                        className={`flex items-center justify-center gap-[1cqw] rounded-[1.2cqw] py-[1.4cqw] text-[2.34cqw] font-semibold text-white transition-colors duration-200 ${
                            processing ? 'bg-[#4F46E5]/70' : 'bg-[#4F46E5]'
                        }`}
                    >
                        {processing ? (
                            <>
                                <Spinner />
                                Processing…
                            </>
                        ) : (
                            'Pay $49'
                        )}
                    </motion.div>
                </motion.div>
            </div>
        </div>
    )
}

const CHAT_OPENS_AT = 10600
const CHAT_TYPING_AT = 11800
const CHAT_SENT_AT = 13600

const SendIcon = () => (
    <svg viewBox="0 0 16 16" className="size-[55%]" aria-hidden="true">
        <path
            d="M8 13V3M3.5 7.5 8 3l4.5 4.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
)

const SupportChat = ({ elapsed }: { elapsed: number }) => {
    const sent = elapsed >= CHAT_SENT_AT
    const draft = sent ? '' : typed(CHAT_MESSAGE, CHAT_TYPING_AT, elapsed, 60)
    const focused = elapsed >= CHAT_TYPING_AT - 200 && !sent
    const sending = elapsed >= CHAT_SENT_AT && elapsed < CHAT_SENT_AT + 250

    return (
        <AnimatePresence>
            {elapsed >= CHAT_OPENS_AT && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.6, filter: 'blur(8px)' }}
                    animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                    exit={{ opacity: 0 }}
                    transition={IOS_SPRING}
                    style={{ transformOrigin: 'bottom right' }}
                    className="absolute bottom-[14%] right-[4%] flex w-[34%] flex-col gap-[1cqw] rounded-[1.8cqw] bg-white p-[1.6cqw] text-[#1B1A3A] shadow-[0_2cqw_5cqw_-1cqw_rgba(0,0,0,0.3)] ring-1 ring-black/5 dark:bg-[#24243F] dark:text-[#ECEBFF] dark:ring-white/10"
                >
                    <div className="text-[1.95cqw] font-bold">Chat with Acme</div>
                    <div className="w-fit max-w-[85%] rounded-[1.4cqw] rounded-bl-[0.3cqw] bg-[#ECEBFB] px-[1.4cqw] py-[0.8cqw] text-[1.8cqw] dark:bg-white/10">
                        Hi Jo! How can we help?
                    </div>
                    <AnimatePresence>
                        {sent && (
                            <motion.div
                                initial={{ opacity: 0, y: '1.5cqw', scale: 0.9 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                transition={IOS_SPRING}
                                style={{ transformOrigin: 'bottom right' }}
                                className="ml-auto w-fit max-w-[85%] rounded-[1.4cqw] rounded-br-[0.3cqw] bg-[#4F46E5] px-[1.4cqw] py-[0.8cqw] text-[1.8cqw] text-white"
                            >
                                {CHAT_MESSAGE}
                            </motion.div>
                        )}
                    </AnimatePresence>
                    <div
                        className={`flex h-[5cqw] items-center gap-[0.8cqw] rounded-full border pl-[1.4cqw] pr-[0.5cqw] transition-colors ${
                            focused ? 'border-[#4F46E5]' : 'border-black/15 dark:border-white/20'
                        }`}
                    >
                        <span className="flex-1 truncate text-[1.8cqw]">
                            {draft || <span className="opacity-40">Message…</span>}
                            {focused && (
                                <span className="ml-px inline-block h-[2cqw] w-px animate-pulse bg-current align-middle" />
                            )}
                        </span>
                        <motion.span
                            animate={{ scale: sending ? 0.85 : 1, opacity: draft || sending ? 1 : 0.4 }}
                            transition={{ type: 'spring', stiffness: 600, damping: 20 }}
                            className="flex size-[4cqw] shrink-0 items-center justify-center rounded-full bg-[#4F46E5] text-white"
                        >
                            <SendIcon />
                        </motion.span>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export const ReplayScreen = ({ elapsed }: { elapsed: number }) => {
    const [x, y] = cursorAt(elapsed)
    const activeClicks = CLICKS.filter((at) => elapsed >= at && elapsed < at + CLICK_RIPPLE_MS)
    const cursorPressed = CLICKS.some((at) => isPressed(elapsed, at))
    const onCheckout = elapsed >= PAGE_CHANGE_AT

    return (
        <div className="@container relative aspect-[16/10] w-full overflow-hidden bg-gradient-to-b from-[#F5F5FF] to-[#E8E9FB] text-[#1B1A3A] dark:from-[#1C1C38] dark:to-[#131329] dark:text-[#ECEBFF]">
            <AnimatePresence initial={false}>
                <motion.div
                    key={onCheckout ? 'checkout' : 'pricing'}
                    initial={{ opacity: 0, scale: 0.97, filter: 'blur(8px)' }}
                    animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, scale: 1.03, filter: 'blur(8px)' }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0"
                >
                    {onCheckout ? <CheckoutPage elapsed={elapsed} /> : <PricingPage elapsed={elapsed} />}
                </motion.div>
            </AnimatePresence>
            <motion.div
                animate={{ scale: isPressed(elapsed, HELP_CLICK_AT) ? 0.85 : 1 }}
                transition={PRESS_SPRING}
                className="absolute bottom-[4%] right-[3%] flex size-[5cqw] items-center justify-center rounded-full bg-[#4F46E5] text-[2.6cqw] font-bold text-white shadow-[0_1cqw_2cqw_-0.5cqw_rgba(79,70,229,0.6)]"
            >
                ?
            </motion.div>
            <SupportChat elapsed={elapsed} />
            <motion.div
                className="pointer-events-none absolute z-10"
                animate={{ left: `${x}%`, top: `${y}%` }}
                transition={{ type: 'spring', stiffness: 110, damping: 20, mass: 0.8 }}
            >
                <AnimatePresence>
                    {activeClicks.map((at) => (
                        <motion.span key={at} className="absolute left-0 top-0" exit={{ opacity: 0 }}>
                            <motion.span
                                initial={{ scale: 0, opacity: 1 }}
                                animate={{ scale: 1, opacity: [1, 1, 0] }}
                                transition={{
                                    duration: 0.6,
                                    ease: [0.22, 1, 0.36, 1],
                                    opacity: { times: [0, 0.5, 1] },
                                }}
                                className="absolute -left-[5cqw] -top-[5cqw] size-[10cqw] rounded-full border-[0.5cqw] border-[#F54E00] shadow-[0_0_0_0.25cqw_rgba(255,255,255,0.85),inset_0_0_0_0.25cqw_rgba(255,255,255,0.85)]"
                            />
                            <motion.span
                                initial={{ scale: 0, opacity: 0.6 }}
                                animate={{ scale: 1, opacity: 0 }}
                                transition={{ duration: 0.45, ease: 'easeOut' }}
                                className="absolute -left-[2.5cqw] -top-[2.5cqw] size-[5cqw] rounded-full bg-[#F54E00]/40"
                            />
                        </motion.span>
                    ))}
                </AnimatePresence>
                <motion.svg
                    animate={{ scale: cursorPressed ? 0.8 : 1 }}
                    transition={{ type: 'spring', stiffness: 600, damping: 20 }}
                    style={{ originX: 0, originY: 0 }}
                    viewBox="0 0 16 20"
                    className="relative w-[2.4cqw] drop-shadow-[0_2px_3px_rgba(0,0,0,0.35)]"
                    aria-hidden="true"
                >
                    <path
                        d="M1 1 L1 16 L5 12 L8 19 L11 18 L8 11 L14 11 Z"
                        fill="black"
                        stroke="white"
                        strokeWidth="1.4"
                        strokeLinejoin="round"
                    />
                </motion.svg>
            </motion.div>
        </div>
    )
}

const NOISE_SVG =
    "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='140' height='140'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='1.3' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.07 0 0 0 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")"

const WINDOW_TEXTURE: React.CSSProperties = {
    backgroundImage: `${NOISE_SVG}, linear-gradient(160deg, rgba(124,108,242,0.10), rgba(124,108,242,0.04))`,
}

export const SessionWindow = ({ elapsed, className }: { elapsed: number; className?: string }) => (
    <div
        className={cn(
            'flex flex-col overflow-hidden rounded-lg border border-[#7C6CF2]/25 bg-[#F6F5FA] shadow-md dark:border-[#9D90FF]/25 dark:bg-[#2A2640]',
            className
        )}
        style={WINDOW_TEXTURE}
    >
        <div className="flex items-center gap-1.5 px-2 py-1">
            <IconRewindPlay className="size-4 text-yellow" />
            <p className="my-0 line-clamp-1 text-sm font-semibold text-primary">Session replay</p>
            <span className="truncate text-sm text-secondary">jo@acme.com</span>
            <span className="ml-auto inline-flex items-center gap-2 pr-1 text-primary opacity-40">
                <IconSquare className="size-3.5" />
                <IconX className="size-4" />
            </span>
        </div>
        <div className="mx-1.5 overflow-hidden rounded-md border border-primary shadow-sm">
            <ReplayScreen elapsed={elapsed} />
        </div>
        <div className="flex items-center gap-2 px-2.5 py-1.5">
            <div className="relative h-1 flex-1 overflow-hidden rounded-full bg-accent">
                <div
                    className="absolute inset-y-0 left-0 rounded-full bg-[#F54E00]"
                    style={{ width: `${(elapsed / LOOP_MS) * 100}%` }}
                />
            </div>
            <span className="text-xs font-semibold tabular-nums text-secondary">{formatSessionTime(elapsed)}</span>
        </div>
    </div>
)

export const ProductIcon = ({ source, className = 'size-4' }: { source: ProductKey; className?: string }) => {
    const { Icon, className: colorClass } = PRODUCTS[source]
    return <Icon className={cn(className, colorClass)} />
}

export const SourceLogo = ({ source, className }: { source: ExternalKey; className?: string }) => {
    const { logo, label, wide } = EXTERNAL_SOURCES.find(({ key }) => key === source)!
    return (
        <span
            className={cn(
                'flex items-center justify-center rounded-md border border-primary bg-white shadow-sm',
                wide ? 'size-11 p-1' : 'size-11 p-2.5',
                className
            )}
        >
            <img src={logo} alt={label} className="max-h-full max-w-full object-contain" />
        </span>
    )
}

export const PostHogHub = ({ elapsed, className }: { elapsed: number; className?: string }) => {
    const arriving = arrivingEvent(elapsed)
    return (
        <motion.div
            animate={{ scale: arriving ? 1.08 : 1 }}
            transition={{ type: 'spring', stiffness: 500, damping: 15 }}
            className={cn(
                'relative flex items-center justify-center rounded-md border border-primary bg-white shadow-[0_10px_24px_-12px_rgba(0,0,0,0.4)]',
                className
            )}
        >
            <AnimatePresence>
                {arriving && (
                    <motion.span
                        key={arriving.id}
                        initial={{ opacity: 0.8, scale: 1 }}
                        animate={{ opacity: 0, scale: 1.6 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.7, ease: 'easeOut' }}
                        className="absolute inset-0 rounded-md border-2"
                        style={{ borderColor: eventColor(arriving) }}
                    />
                )}
            </AnimatePresence>
            <img src="/brand/posthog-logomark.svg" alt="PostHog" className="w-[62%]" />
        </motion.div>
    )
}

export const SignalCaption = ({ event }: { event: SessionEvent }) => (
    <span className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-md border border-primary bg-light px-2 py-1 text-xs font-semibold shadow-sm dark:bg-dark">
        {isProductKey(event.source) ? (
            <ProductIcon source={event.source} className="size-3.5" />
        ) : (
            <img
                src={EXTERNAL_SOURCES.find(({ key }) => key === event.source)?.logo}
                alt=""
                className="h-3.5 max-w-[2.5rem] object-contain"
            />
        )}
        {event.headline}
    </span>
)

export const Packet = ({ d, color }: { d: string; color: string }) => (
    <motion.path
        d={d}
        pathLength={100}
        fill="none"
        stroke={color}
        strokeWidth={3}
        strokeLinecap="round"
        strokeDasharray="8 200"
        initial={{ strokeDashoffset: 8, opacity: 1 }}
        animate={{ strokeDashoffset: -100, opacity: [1, 1, 0] }}
        transition={{ duration: PACKET_TRAVEL_MS / 1000, ease: [0.45, 0, 0.2, 1], times: [0, 0.85, 1] }}
    />
)
