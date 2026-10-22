import { ticks } from '../timeline'
import { EventKind } from './eventKinds'
import { MetricSamples, generationCost } from './metrics'

export const CHAT_RIDER = 'jo@acme.com'
export const CHAT_GREETING = 'Hi, I’m Fetch. Where should a good dog drive you today?'
export const CHAT_SUGGESTIONS = ['Book a ride', 'Pet policy', 'Pricing']

const PAGEVIEW_AT = 300
const FIRST_TYPE_AT = 800
const TYPE_MS_PER_CHAR = 42
const SEND_PAUSE_MS = 300
const PAYMENT_DELAY_MS = 400
const TURN_GAP_MS = 1200
const END_HOLD_MS = 500
const MS_PER_SECOND = 1000

export interface ScriptRide {
    pickup: string
    dropoff: string
    fare: number
}

interface TurnSpec {
    user: string
    thinkMs: number
    reply: string
    ride?: ScriptRide
    inputTokens: number
    outputTokens: number
}

export interface Turn extends TurnSpec {
    typeAt: number
    sendAt: number
    replyAt: number
    generation: MetricSamples
}

export type ChatEvent =
    | { at: number; type: 'event'; kind: EventKind; detail: string }
    | { at: number; type: 'payment'; ride: ScriptRide }
    | { at: number; type: 'generation'; samples: MetricSamples }

const TURN_SPECS: TurnSpec[] = [
    {
        user: 'I need a ride for me and my cat',
        thinkMs: 800,
        reply: 'Cats are welcome. Our drivers complete a short course on remaining calm in the presence of cats.',
        inputTokens: 318,
        outputTokens: 34,
    },
    {
        user: 'Ok. Take us to the vet',
        thinkMs: 800,
        reply: 'You’re matched with Arrow, a golden retriever rated 5.0. He’s on his way to you and will take you both to the vet.',
        ride: { pickup: 'your location', dropoff: 'the vet', fare: 16.2 },
        inputTokens: 422,
        outputTokens: 50,
    },
    {
        user: 'He’s driving extremely slow',
        thinkMs: 600,
        reply: 'Arrow has never knowingly driven toward a vet. He’s doing his best.',
        inputTokens: 476,
        outputTokens: 22,
    },
]

const typingEndsAt = (typeAt: number, user: string): number => typeAt + user.length * TYPE_MS_PER_CHAR

export const TURNS: Turn[] = TURN_SPECS.reduce<Turn[]>((turns, spec) => {
    const previous = turns[turns.length - 1]
    const typeAt = previous ? previous.replyAt + (previous.ride ? PAYMENT_DELAY_MS : 0) + TURN_GAP_MS : FIRST_TYPE_AT
    const sendAt = typingEndsAt(typeAt, spec.user) + SEND_PAUSE_MS
    turns.push({
        ...spec,
        typeAt,
        sendAt,
        replyAt: sendAt + spec.thinkMs,
        generation: {
            latency: spec.thinkMs / MS_PER_SECOND,
            inputTokens: spec.inputTokens,
            outputTokens: spec.outputTokens,
            cost: generationCost(spec.inputTokens, spec.outputTokens),
        },
    })
    return turns
}, [])

export const CHAT_EVENTS: ChatEvent[] = [
    { at: PAGEVIEW_AT, type: 'event' as const, kind: 'pageview' as const, detail: '/ride' },
    ...TURNS.flatMap((turn): ChatEvent[] => [
        { at: turn.sendAt, type: 'event', kind: 'autocapture', detail: 'clicked "Send"' },
        { at: turn.replyAt, type: 'generation', samples: turn.generation },
        ...(turn.ride ? [{ at: turn.replyAt + PAYMENT_DELAY_MS, type: 'payment' as const, ride: turn.ride }] : []),
    ]),
].sort((a, b) => a.at - b.at)

export const CHAT_DONE_AT = CHAT_EVENTS[CHAT_EVENTS.length - 1].at
export const CHAT_LENGTH_MS = CHAT_DONE_AT + END_HOLD_MS

export const CHAT_BOUNDARIES: number[] = [
    ...CHAT_EVENTS.map(({ at }) => at),
    ...TURNS.flatMap((turn) => [
        turn.typeAt,
        ...ticks(turn.typeAt, typingEndsAt(turn.typeAt, turn.user), TYPE_MS_PER_CHAR),
    ]),
]

export const typedDraft = (elapsed: number): string => {
    const typing = TURNS.find(({ typeAt, sendAt }) => elapsed >= typeAt && elapsed < sendAt)
    return typing ? typing.user.slice(0, Math.floor((elapsed - typing.typeAt) / TYPE_MS_PER_CHAR)) : ''
}
