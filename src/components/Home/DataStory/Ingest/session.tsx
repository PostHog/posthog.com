import React, { RefObject, useEffect, useState } from 'react'
import { useInView, useReducedMotion } from 'framer-motion'
import { IconGraph, IconRewindPlay, IconSquare, IconWarning, IconX } from '@posthog/icons'
import { cn } from '../../../../utils'
import {
    EASE_OUT_QUINT,
    Frame,
    Spring,
    easeFrames,
    hiddenUntil,
    instantFrames,
    keyframes,
    pressSequence,
    springFrames,
    timelineStyle,
    windowFrames,
} from '../timeline'

export const LOOP_MS = 19000
const TICK_MS = 50
export const REDUCED_MOTION_MOMENT = 14500
export const PACKET_TRAVEL_MS = 900
export const CAPTION_HOLD_MS = 2400
const LOOP_END_FADE_AT = LOOP_MS - 400

export const IOS_SPRING = { type: 'spring', stiffness: 380, damping: 32, mass: 0.9 }
export const IOS_CSS_SPRING: Spring = { stiffness: 380, damping: 32, mass: 0.9 }

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

export const sourceColor = (source: SourceKey): string =>
    isProductKey(source)
        ? PRODUCTS[source].color
        : EXTERNAL_SOURCES.find(({ key }) => key === source)?.color ?? 'currentColor'

export const eventColor = (event: SessionEvent): string => sourceColor(event.source)

export const captionEndsAt = (index: number): number =>
    Math.min(SESSION_EVENTS[index + 1]?.at ?? Infinity, SESSION_EVENTS[index].at + CAPTION_HOLD_MS, LOOP_MS - 300)

export function useSessionClock(
    ref: RefObject<HTMLElement>,
    loopMs = LOOP_MS,
    reducedMotionMoment = REDUCED_MOTION_MOMENT
): number {
    const inView = useInView(ref, { amount: 0.35 })
    const shouldReduceMotion = useReducedMotion()
    const [elapsed, setElapsed] = useState(0)

    useEffect(() => {
        if (shouldReduceMotion || !inView) return
        const id = window.setInterval(() => setElapsed((current) => (current + TICK_MS) % loopMs), TICK_MS)
        return () => window.clearInterval(id)
    }, [inView, shouldReduceMotion, loopMs])

    return shouldReduceMotion ? reducedMotionMoment : elapsed
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
const CURSOR_MOVE_MS = 900

const CLICKS = [2000, 4300, 6800, 8600, 8800, 9000, 9200, 10600, 11600, 13600]

const PRESS_MS = 110
const UPGRADE_CLICK_AT = 2000
const PAGE_CHANGE_AT = 3300
const PAGE_CHANGE_MS = 500
const CARD_FOCUS_AT = 4300
const CARD_TYPING_AT = 4500
const CARD_MS_PER_CHAR = 70
const CARD_CARET_ENDS_AT = 6000
const CARD_BLUR_AT = 6100
const PAY_CLICK_AT = 6800
const PAYMENT_ERROR_AT = 7300
const RAGE_CLICKS = [8600, 8800, 9000, 9200]
const HELP_CLICK_AT = 10600
const CHAT_OPENS_AT = 10600
const CHAT_FOCUS_AT = 11600
const CHAT_TYPING_AT = 11800
const CHAT_MS_PER_CHAR = 60
const CHAT_SENT_AT = 13600
const SEND_DIMS_AT = CHAT_SENT_AT + 250
const PRESS_SPRING: Spring = { stiffness: 700, damping: 22 }
const BUTTON_SPRING: Spring = { stiffness: 600, damping: 20 }

const SCALE_REST = 'transform:scale(1)'
const HIDDEN = 'opacity:0'
const SHOWN = 'opacity:1'

const cursorPoint = ([, x, y]: [number, number, number]): string => `transform:translate(${x}%,${y}%)`

const typingFrames = (
    prefix: string,
    text: string,
    startAt: number,
    msPerChar: number,
    clearAt: number,
    caretEndsAt: number
): string[] =>
    Array.from(text).flatMap((_, index) => {
        const appearsAt = startAt + index * msPerChar
        const caretEnds = index === text.length - 1 ? caretEndsAt : appearsAt + msPerChar
        return [
            keyframes(`${prefix}-char-${index}`, LOOP_MS, [
                { at: 0, style: HIDDEN },
                ...instantFrames(appearsAt, HIDDEN, SHOWN),
                ...instantFrames(clearAt, SHOWN, HIDDEN),
            ]),
            keyframes(`${prefix}-caret-${index}`, LOOP_MS, [
                { at: 0, style: HIDDEN },
                ...instantFrames(appearsAt, HIDDEN, SHOWN),
                ...instantFrames(caretEnds, SHOWN, HIDDEN),
            ]),
        ]
    })

const PAGE_SHOWN = 'opacity:1;transform:none;filter:blur(0)'
const PAGE_BEFORE = 'opacity:0;transform:scale(0.97);filter:blur(8px)'
const PAGE_AFTER = 'opacity:0;transform:scale(1.03);filter:blur(8px)'

const cursorFrames = (): Frame[] => [
    ...CURSOR_PATH.slice(1).flatMap((point, index) =>
        easeFrames(point[0], CURSOR_MOVE_MS, cursorPoint(CURSOR_PATH[index]), cursorPoint(point))
    ),
    ...easeFrames(
        LOOP_MS - CURSOR_MOVE_MS,
        CURSOR_MOVE_MS,
        cursorPoint(CURSOR_PATH[CURSOR_PATH.length - 1]),
        cursorPoint(CURSOR_PATH[0])
    ),
]

const swapFrames = (at: number, from: string, to: string, resetAt: number): Frame[] => [
    ...easeFrames(at, 120, from, to, 'ease-out'),
    ...instantFrames(resetAt, to, from),
]

const payPressFrames = (): Frame[] =>
    [PAY_CLICK_AT, ...RAGE_CLICKS].flatMap((at) => {
        const rage = RAGE_CLICKS.includes(at)
        const halfMs = rage ? 80 : 110
        const pressed = rage
            ? 'transform:scale(0.9);filter:brightness(0.8)'
            : 'transform:scale(0.95);filter:brightness(1)'
        const rest = 'transform:scale(1);filter:brightness(1)'
        return [
            ...easeFrames(at, halfMs, rest, pressed, 'ease-out'),
            ...easeFrames(at + halfMs, halfMs, pressed, rest, 'ease-out'),
        ]
    })

const SHAKE_OFFSETS_PX = [0, -6, 6, -4, 4, -2, 0]
const SHAKE_MS = 450

const REPLAY_CSS = [
    keyframes('ingest-cursor', LOOP_MS, cursorFrames()),
    keyframes(
        'ingest-cursor-press',
        LOOP_MS,
        pressSequence(CLICKS, SCALE_REST, 'transform:scale(0.8)', PRESS_MS, BUTTON_SPRING)
    ),
    ...CLICKS.flatMap((at) => [
        keyframes(`ingest-ripple-ring-${at}`, LOOP_MS, [
            ...hiddenUntil(at, 'opacity:0;transform:scale(0)'),
            { at, style: 'opacity:1;transform:scale(0)', ease: EASE_OUT_QUINT },
            { at: at + 300, style: 'opacity:1;transform:scale(0.93)', ease: 'ease-out' },
            { at: at + 600, style: 'opacity:0;transform:scale(1)' },
        ]),
        keyframes(`ingest-ripple-dot-${at}`, LOOP_MS, [
            ...hiddenUntil(at, 'opacity:0;transform:scale(0)'),
            ...easeFrames(at, 450, 'opacity:0.6;transform:scale(0)', 'opacity:0;transform:scale(1)', 'ease-out'),
        ]),
    ]),
    keyframes('ingest-pricing-page', LOOP_MS, [
        ...easeFrames(PAGE_CHANGE_AT, PAGE_CHANGE_MS, PAGE_SHOWN, PAGE_AFTER),
        ...easeFrames(LOOP_MS - PAGE_CHANGE_MS, PAGE_CHANGE_MS, PAGE_BEFORE, PAGE_SHOWN),
    ]),
    keyframes('ingest-checkout-page', LOOP_MS, [
        { at: 0, style: PAGE_BEFORE },
        ...easeFrames(PAGE_CHANGE_AT, PAGE_CHANGE_MS, PAGE_BEFORE, PAGE_SHOWN),
        ...easeFrames(LOOP_MS - PAGE_CHANGE_MS, PAGE_CHANGE_MS, PAGE_SHOWN, PAGE_AFTER),
    ]),
    keyframes(
        'ingest-upgrade-press',
        LOOP_MS,
        pressSequence([UPGRADE_CLICK_AT], SCALE_REST, 'transform:scale(0.93)', PRESS_MS, PRESS_SPRING)
    ),
    keyframes('ingest-upgrade-idle', LOOP_MS, swapFrames(UPGRADE_CLICK_AT, SHOWN, HIDDEN, LOOP_MS - 450)),
    keyframes('ingest-upgrade-busy', LOOP_MS, swapFrames(UPGRADE_CLICK_AT, HIDDEN, SHOWN, LOOP_MS - 450)),
    keyframes(
        'ingest-card-focus',
        LOOP_MS,
        windowFrames({ from: CARD_FOCUS_AT, to: CARD_BLUR_AT, hidden: HIDDEN, shown: SHOWN, enterMs: 200, exitMs: 200 })
    ),
    keyframes('ingest-card-caret-lead', LOOP_MS, [
        { at: 0, style: HIDDEN },
        ...instantFrames(CARD_FOCUS_AT, HIDDEN, SHOWN),
        ...instantFrames(CARD_TYPING_AT, SHOWN, HIDDEN),
    ]),
    ...typingFrames('ingest-card', CARD_NUMBER, CARD_TYPING_AT, CARD_MS_PER_CHAR, LOOP_MS, CARD_CARET_ENDS_AT),
    keyframes(
        'ingest-pay-processing',
        LOOP_MS,
        windowFrames({
            from: PAY_CLICK_AT,
            to: PAYMENT_ERROR_AT,
            hidden: HIDDEN,
            shown: SHOWN,
            enterMs: 120,
            exitMs: 120,
        })
    ),
    keyframes(
        'ingest-pay-idle',
        LOOP_MS,
        windowFrames({
            from: PAY_CLICK_AT,
            to: PAYMENT_ERROR_AT,
            hidden: SHOWN,
            shown: HIDDEN,
            enterMs: 120,
            exitMs: 120,
        })
    ),
    keyframes('ingest-pay-press', LOOP_MS, payPressFrames()),
    keyframes('ingest-pay-shake', LOOP_MS, [
        { at: 0, style: 'transform:translateX(0)' },
        ...SHAKE_OFFSETS_PX.map((offset, index) => ({
            at: PAYMENT_ERROR_AT + (index / (SHAKE_OFFSETS_PX.length - 1)) * SHAKE_MS,
            style: `transform:translateX(${offset}px)`,
            ease: 'ease-out',
        })),
    ]),
    keyframes(
        'ingest-toast',
        LOOP_MS,
        windowFrames({
            from: PAYMENT_ERROR_AT,
            to: LOOP_END_FADE_AT,
            hidden: 'opacity:0;transform:translateY(-120%) scale(0.9)',
            shown: 'opacity:1;transform:none',
            exit: 'opacity:0;transform:none',
            enterSpring: IOS_CSS_SPRING,
        })
    ),
    keyframes(
        'ingest-help-press',
        LOOP_MS,
        pressSequence([HELP_CLICK_AT], SCALE_REST, 'transform:scale(0.85)', PRESS_MS, PRESS_SPRING)
    ),
    keyframes(
        'ingest-chat',
        LOOP_MS,
        windowFrames({
            from: CHAT_OPENS_AT,
            to: LOOP_END_FADE_AT,
            hidden: 'opacity:0;transform:scale(0.6);filter:blur(8px)',
            shown: 'opacity:1;transform:none;filter:blur(0)',
            exit: 'opacity:0;transform:none;filter:blur(0)',
            enterSpring: IOS_CSS_SPRING,
        })
    ),
    keyframes(
        'ingest-chat-focus',
        LOOP_MS,
        windowFrames({ from: CHAT_FOCUS_AT, to: CHAT_SENT_AT, hidden: HIDDEN, shown: SHOWN, enterMs: 150, exitMs: 150 })
    ),
    keyframes('ingest-chat-caret-lead', LOOP_MS, [
        { at: 0, style: HIDDEN },
        ...instantFrames(CHAT_FOCUS_AT, HIDDEN, SHOWN),
        ...instantFrames(CHAT_TYPING_AT, SHOWN, HIDDEN),
    ]),
    ...typingFrames('ingest-chat', CHAT_MESSAGE, CHAT_TYPING_AT, CHAT_MS_PER_CHAR, CHAT_SENT_AT, CHAT_SENT_AT),
    keyframes('ingest-chat-placeholder', LOOP_MS, [
        { at: 0, style: SHOWN },
        ...instantFrames(CHAT_TYPING_AT, SHOWN, HIDDEN),
        ...instantFrames(CHAT_SENT_AT, HIDDEN, SHOWN),
    ]),
    keyframes('ingest-send-active', LOOP_MS, [
        { at: 0, style: 'opacity:0.4' },
        ...easeFrames(CHAT_TYPING_AT, 150, 'opacity:0.4', 'opacity:1', 'ease-out'),
        ...easeFrames(SEND_DIMS_AT, 150, 'opacity:1', 'opacity:0.4', 'ease-out'),
    ]),
    keyframes(
        'ingest-send-press',
        LOOP_MS,
        pressSequence([CHAT_SENT_AT], SCALE_REST, 'transform:scale(0.85)', PRESS_MS, BUTTON_SPRING)
    ),
    keyframes('ingest-chat-sent', LOOP_MS, [
        { at: 0, style: 'opacity:0;transform:translateY(1.5cqw) scale(0.9)' },
        ...springFrames(
            CHAT_SENT_AT,
            'opacity:0;transform:translateY(1.5cqw) scale(0.9)',
            'opacity:1;transform:none',
            IOS_CSS_SPRING
        ),
    ]),
    keyframes('ingest-progress', LOOP_MS, [
        { at: 0, style: 'transform:scaleX(0)' },
        { at: LOOP_MS, style: 'transform:scaleX(1)' },
    ]),
].join('')

const SESSION_SECONDS = Array.from({ length: Math.ceil(LOOP_MS / 1000) }, (_, second) => second)

const TIME_STRIP_CSS = `@keyframes ingest-session-time{from{transform:translateY(0)}to{transform:translateY(-100%)}}`

const tl = (name: string): { className: string; style: React.CSSProperties } => ({
    className: 'tl',
    style: timelineStyle(name),
})

const Spinner = () => (
    <span className="inline-block size-[1.8cqw] animate-spin rounded-full border-[0.3cqw] border-current border-r-transparent align-[-0.2cqw]" />
)

const Caret = ({ name, className }: { name: string; className?: string }) => (
    <span
        {...tl(name)}
        className={cn('tl absolute right-0 top-1/2 h-[1.15em] w-px -translate-y-1/2 translate-x-full', className)}
    >
        <span className="block size-full animate-pulse bg-current" />
    </span>
)

const TypedText = ({ prefix, text }: { prefix: string; text: string }) => (
    <span className="relative inline-flex whitespace-pre">
        <Caret name={`${prefix}-caret-lead`} className="!left-0 !right-auto" />
        {Array.from(text).map((char, index) => (
            <span key={index} className="relative">
                <span {...tl(`${prefix}-char-${index}`)}>{char}</span>
                <Caret name={`${prefix}-caret-${index}`} />
            </span>
        ))}
    </span>
)

const Swap = ({
    idle,
    busy,
    idleName,
    busyName,
}: {
    idle: React.ReactNode
    busy: React.ReactNode
    idleName: string
    busyName: string
}) => (
    <span className="grid place-items-center">
        <span {...tl(idleName)} className="tl flex items-center gap-[1cqw] [grid-area:1/1]">
            {idle}
        </span>
        <span {...tl(busyName)} className="tl flex items-center gap-[1cqw] [grid-area:1/1]">
            {busy}
        </span>
    </span>
)

const PricingPage = () => (
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
            <div className="relative overflow-hidden rounded-[1.8cqw] bg-gradient-to-br from-[var(--acme)] to-[color-mix(in_srgb,var(--acme)_75%,black)] p-[2.4cqw] text-white shadow-[0_2cqw_4cqw_-2cqw_color-mix(in_srgb,var(--acme)_70%,transparent)]">
                <div className="relative text-[2.21cqw] font-semibold text-white/80">Pro</div>
                <div className="relative mt-[0.6cqw] text-[5.2cqw] font-bold tracking-tight">
                    $49<span className="text-[2.34cqw] font-medium text-white/70">/mo</span>
                </div>
                <div
                    {...tl('ingest-upgrade-press')}
                    className="tl relative mt-[2cqw] rounded-full bg-white py-[1cqw] text-[2.08cqw] font-bold text-[var(--acme)]"
                >
                    <Swap
                        idleName="ingest-upgrade-idle"
                        busyName="ingest-upgrade-busy"
                        idle="Upgrade to Pro"
                        busy={
                            <>
                                <Spinner />
                                Upgrading…
                            </>
                        }
                    />
                </div>
            </div>
        </div>
    </div>
)

const CheckoutPage = () => (
    <div className="relative flex h-full items-center justify-center px-[22%]">
        <div
            {...tl('ingest-toast')}
            className="tl absolute left-0 right-0 top-[5%] mx-auto flex w-fit items-center gap-[1cqw] whitespace-nowrap rounded-full bg-[#1d1f27] px-[2cqw] py-[1cqw] text-[2.08cqw] font-semibold text-white shadow-[0_1cqw_3cqw_-1cqw_rgba(0,0,0,0.5)]"
        >
            <span className="size-[1.2cqw] rounded-full bg-[#FF5A4E]" />
            Payment couldn't be processed
        </div>
        <div className="w-full">
            <div className="text-[3.64cqw] font-bold tracking-tight">Checkout</div>
            <div className="text-[2.08cqw] text-secondary">Acme Pro · $49 / month</div>
            <div className="mt-[3cqw] text-[1.82cqw] font-semibold text-secondary">Card number</div>
            <div className="relative mt-[0.8cqw] flex h-[5cqw] items-center gap-[1.2cqw] rounded-[1.2cqw] bg-white px-[1.6cqw] text-[2.34cqw] tabular-nums shadow-[0_0.3cqw_1cqw_-0.4cqw_rgba(0,0,0,0.12)] ring-1 ring-black/10 dark:bg-white/5 dark:ring-white/15">
                <span
                    {...tl('ingest-card-focus')}
                    className="tl pointer-events-none absolute inset-0 rounded-[1.2cqw] ring-[0.35cqw] ring-[color-mix(in_srgb,var(--acme)_60%,transparent)]"
                />
                <span className="h-[2cqw] w-[3cqw] shrink-0 rounded-[0.4cqw] bg-gradient-to-br from-[color-mix(in_srgb,var(--acme)_65%,white)] to-[var(--acme)]" />
                <TypedText prefix="ingest-card" text={CARD_NUMBER} />
            </div>
            <div {...tl('ingest-pay-shake')} className="tl mt-[2.4cqw]">
                <div
                    {...tl('ingest-pay-press')}
                    className="tl relative overflow-hidden rounded-[1.2cqw] bg-[var(--acme)] py-[1.4cqw] text-[2.34cqw] font-semibold text-white"
                >
                    <span {...tl('ingest-pay-processing')} className="tl absolute inset-0 bg-white/30" />
                    <span className="relative">
                        <Swap
                            idleName="ingest-pay-idle"
                            busyName="ingest-pay-processing"
                            idle="Pay $49"
                            busy={
                                <>
                                    <Spinner />
                                    Processing…
                                </>
                            }
                        />
                    </span>
                </div>
            </div>
        </div>
    </div>
)

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

const SupportChat = () => (
    <div
        {...tl('ingest-chat')}
        className="tl absolute bottom-[14%] right-[4%] flex w-[34%] origin-bottom-right flex-col gap-[1cqw] rounded-[1.8cqw] bg-white p-[1.6cqw] text-[color-mix(in_srgb,var(--acme)_18%,#111)] shadow-[0_2cqw_5cqw_-1cqw_rgba(0,0,0,0.3)] ring-1 ring-black/5 dark:bg-[color-mix(in_srgb,var(--acme)_16%,#1b1b1f)] dark:text-[color-mix(in_srgb,var(--acme)_8%,white)] dark:ring-white/10"
    >
        <div className="text-[1.95cqw] font-bold">Chat with Acme</div>
        <div className="w-fit max-w-[85%] rounded-[1.4cqw] rounded-bl-[0.3cqw] bg-[color-mix(in_srgb,var(--acme)_10%,white)] px-[1.4cqw] py-[0.8cqw] text-[1.8cqw] dark:bg-white/10">
            Hi Jo! How can we help?
        </div>
        <div
            {...tl('ingest-chat-sent')}
            className="tl ml-auto w-fit max-w-[85%] origin-bottom-right rounded-[1.4cqw] rounded-br-[0.3cqw] bg-[var(--acme)] px-[1.4cqw] py-[0.8cqw] text-[1.8cqw] text-white"
        >
            {CHAT_MESSAGE}
        </div>
        <div className="relative flex h-[5cqw] items-center gap-[0.8cqw] rounded-full border border-black/15 pl-[1.4cqw] pr-[0.5cqw] dark:border-white/20">
            <span
                {...tl('ingest-chat-focus')}
                className="tl pointer-events-none absolute -inset-px rounded-full border border-[var(--acme)]"
            />
            <span className="relative grid min-w-0 flex-1 overflow-hidden text-[1.8cqw]">
                <span {...tl('ingest-chat-placeholder')} className="tl [grid-area:1/1]">
                    <span className="opacity-40">Message…</span>
                </span>
                <span className="[grid-area:1/1]">
                    <TypedText prefix="ingest-chat" text={CHAT_MESSAGE} />
                </span>
            </span>
            <span {...tl('ingest-send-active')} className="tl shrink-0">
                <span
                    {...tl('ingest-send-press')}
                    className="tl flex size-[4cqw] items-center justify-center rounded-full bg-[var(--acme)] text-white"
                >
                    <SendIcon />
                </span>
            </span>
        </div>
    </div>
)

const cursorTargetAt = (at: number): [number, number, number] =>
    [...CURSOR_PATH].reverse().find(([pointAt]) => pointAt <= at) ?? CURSOR_PATH[0]

const ClickRipple = ({ at }: { at: number }) => {
    const [, x, y] = cursorTargetAt(at)
    return (
        <span className="absolute inset-0" style={{ transform: `translate(${x}%, ${y}%)` }}>
            <span
                {...tl(`ingest-ripple-ring-${at}`)}
                className="tl absolute -left-[5cqw] -top-[5cqw] size-[10cqw] rounded-full border-[0.5cqw] border-[#F54E00] shadow-[0_0_0_0.25cqw_rgba(255,255,255,0.85),inset_0_0_0_0.25cqw_rgba(255,255,255,0.85)] dark:border-[0.35cqw] dark:border-[#F54E00]/60 dark:shadow-none"
            />
            <span
                {...tl(`ingest-ripple-dot-${at}`)}
                className="tl absolute -left-[2.5cqw] -top-[2.5cqw] size-[5cqw] rounded-full bg-[#F54E00]/40 dark:bg-[#F54E00]/20"
            />
        </span>
    )
}

export const ReplayScreen = () => (
    <div className="@container relative aspect-[16/10] w-full overflow-hidden bg-gradient-to-b from-[color-mix(in_srgb,var(--acme)_4%,white)] to-[color-mix(in_srgb,var(--acme)_10%,white)] text-[color-mix(in_srgb,var(--acme)_18%,#111)] dark:from-[color-mix(in_srgb,var(--acme)_16%,#141418)] dark:to-[color-mix(in_srgb,var(--acme)_10%,#111114)] dark:text-[color-mix(in_srgb,var(--acme)_8%,white)]">
        <style dangerouslySetInnerHTML={{ __html: REPLAY_CSS }} />
        <div {...tl('ingest-pricing-page')} className="tl absolute inset-0">
            <PricingPage />
        </div>
        <div {...tl('ingest-checkout-page')} className="tl absolute inset-0">
            <CheckoutPage />
        </div>
        <div
            {...tl('ingest-help-press')}
            className="tl absolute bottom-[4%] right-[3%] flex size-[5cqw] items-center justify-center rounded-full bg-[var(--acme)] text-[2.6cqw] font-bold text-white shadow-[0_1cqw_2cqw_-0.5cqw_color-mix(in_srgb,var(--acme)_60%,transparent)]"
        >
            ?
        </div>
        <SupportChat />
        <div className="pointer-events-none absolute inset-0 z-10">
            {CLICKS.map((at) => (
                <ClickRipple key={at} at={at} />
            ))}
        </div>
        <div {...tl('ingest-cursor')} className="tl pointer-events-none absolute inset-0 z-10">
            <svg
                {...tl('ingest-cursor-press')}
                viewBox="0 0 16 20"
                className="tl relative w-[2.4cqw] origin-top-left drop-shadow-[0_2px_3px_rgba(0,0,0,0.35)]"
                aria-hidden="true"
            >
                <path
                    d="M1 1 L1 16 L5 12 L8 19 L11 18 L8 11 L14 11 Z"
                    fill="black"
                    stroke="white"
                    strokeWidth="1.4"
                    strokeLinejoin="round"
                />
            </svg>
        </div>
    </div>
)

const NOISE_SVG =
    "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='140' height='140'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='1.3' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.07 0 0 0 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")"

const WINDOW_TEXTURE: React.CSSProperties = {
    backgroundImage: `${NOISE_SVG}, linear-gradient(160deg, color-mix(in srgb, var(--acme) 10%, transparent), color-mix(in srgb, var(--acme) 4%, transparent))`,
}

export const DEFAULT_ACME_COLOR = '#565D70'

const formatSessionTime = (second: number): string => `0:${String(second).padStart(2, '0')}`

const SessionTime = () => (
    <span className="relative h-[1lh] overflow-hidden text-xs font-semibold tabular-nums text-secondary">
        <style dangerouslySetInnerHTML={{ __html: TIME_STRIP_CSS }} />
        <span
            className="tl flex flex-col"
            style={{
                ...timelineStyle('ingest-session-time'),
                animationTimingFunction: `steps(${SESSION_SECONDS.length}, end)`,
            }}
        >
            {SESSION_SECONDS.map((second) => (
                <span key={second}>{formatSessionTime(second)}</span>
            ))}
        </span>
    </span>
)

export const SessionWindow = ({ accent = DEFAULT_ACME_COLOR, className }: { accent?: string; className?: string }) => (
    <div
        className={cn(
            'flex flex-col overflow-hidden rounded-lg border border-[color-mix(in_srgb,var(--acme)_25%,transparent)] bg-[color-mix(in_srgb,var(--acme)_4%,white)] shadow-md dark:border-[color-mix(in_srgb,var(--acme)_30%,transparent)] dark:bg-[color-mix(in_srgb,var(--acme)_18%,#1d1d22)]',
            className
        )}
        style={{ ...WINDOW_TEXTURE, '--acme': accent } as React.CSSProperties}
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
            <ReplayScreen />
        </div>
        <div className="flex items-center gap-2 px-2.5 py-1.5">
            <div className="relative h-1 flex-1 overflow-hidden rounded-full bg-accent">
                <div {...tl('ingest-progress')} className="tl absolute inset-0 origin-left rounded-full bg-[#F54E00]" />
            </div>
            <SessionTime />
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

const HUB_ARRIVAL_LEAD_MS = 150
const HUB_PULSE_MS = 100
const HUB_RING_MS = 700
const HUB_SPRING: Spring = { stiffness: 500, damping: 15 }

const hubArrivals = SESSION_EVENTS.map(({ at }) => at + PACKET_TRAVEL_MS - HUB_ARRIVAL_LEAD_MS)

const HUB_CSS = [
    keyframes(
        'ingest-hub-pulse',
        LOOP_MS,
        pressSequence(hubArrivals, SCALE_REST, 'transform:scale(1.08)', HUB_PULSE_MS, HUB_SPRING)
    ),
    ...SESSION_EVENTS.map(({ id }, index) =>
        keyframes(`ingest-hub-ring-${id}`, LOOP_MS, [
            ...hiddenUntil(hubArrivals[index], 'opacity:0;transform:scale(1)'),
            ...easeFrames(
                hubArrivals[index],
                HUB_RING_MS,
                'opacity:0.8;transform:scale(1)',
                'opacity:0;transform:scale(1.6)',
                'ease-out'
            ),
        ])
    ),
].join('')

export const PostHogHub = ({ className }: { className?: string }) => (
    <div
        {...tl('ingest-hub-pulse')}
        className={cn(
            'tl relative flex items-center justify-center rounded-md border border-primary bg-white shadow-[0_10px_24px_-12px_rgba(0,0,0,0.4)]',
            className
        )}
    >
        <style dangerouslySetInnerHTML={{ __html: HUB_CSS }} />
        {SESSION_EVENTS.map((event) => (
            <span
                key={event.id}
                {...tl(`ingest-hub-ring-${event.id}`)}
                className="tl absolute inset-0 rounded-md border-2"
                style={{ ...timelineStyle(`ingest-hub-ring-${event.id}`), borderColor: eventColor(event) }}
            />
        ))}
        <img src="/brand/posthog-logomark.svg" alt="PostHog" className="w-[62%]" />
    </div>
)

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
