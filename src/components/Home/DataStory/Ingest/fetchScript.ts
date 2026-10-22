import { ticks } from '../timeline'
import { EventKind } from './eventKinds'
import { MetricSamples, generationCost } from './metrics'

export const CHAT_RIDER = 'jo@acme.com'
export const CHAT_GREETING = 'Hi, I’m Fetch. Where should a good dog drive you today?'
export const CHAT_SUGGESTIONS = ['Book a ride', 'Pet policy', 'Pricing']

const PAGEVIEW_AT = 300
const TYPE_MS_PER_CHAR = 55
const SEND_PAUSE_MS = 450
const PAYMENT_DELAY_MS = 400
const END_HOLD_MS = 500
const MS_PER_SECOND = 1000

export interface ScriptRide {
    pickup: string
    dropoff: string
    fare: number
}

interface TurnSpec {
    user: string
    typeAt: number
    thinkMs: number
    reply: string
    ride?: ScriptRide
    inputTokens: number
    outputTokens: number
}

export interface Turn extends TurnSpec {
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
        typeAt: 1500,
        thinkMs: 1300,
        reply: 'Cats are welcome. Our drivers complete a short course on remaining calm in the presence of cats.',
        inputTokens: 318,
        outputTokens: 34,
    },
    {
        user: 'Is the cat going to be a problem?',
        typeAt: 9800,
        thinkMs: 1200,
        reply: 'Historically, the cat has been the problem. Our drivers will keep their eyes on the road and their feelings to themselves.',
        inputTokens: 371,
        outputTokens: 38,
    },
    {
        user: 'Ok. Take us to the vet',
        typeAt: 18000,
        thinkMs: 1300,
        reply: 'You’re matched with Arrow, a golden retriever rated 5.0. He’s on his way to you and will take you both to the vet.',
        ride: { pickup: 'your location', dropoff: 'the vet', fare: 16.2 },
        inputTokens: 422,
        outputTokens: 50,
    },
    {
        user: 'He’s driving extremely slow',
        typeAt: 25600,
        thinkMs: 1000,
        reply: 'Arrow has never knowingly driven toward a vet. He’s doing his best.',
        inputTokens: 476,
        outputTokens: 22,
    },
]

const typingEndsAt = ({ typeAt, user }: TurnSpec): number => typeAt + user.length * TYPE_MS_PER_CHAR

export const TURNS: Turn[] = TURN_SPECS.map((spec) => {
    const sendAt = typingEndsAt(spec) + SEND_PAUSE_MS
    return {
        ...spec,
        sendAt,
        replyAt: sendAt + spec.thinkMs,
        generation: {
            latency: spec.thinkMs / MS_PER_SECOND,
            inputTokens: spec.inputTokens,
            outputTokens: spec.outputTokens,
            cost: generationCost(spec.inputTokens, spec.outputTokens),
        },
    }
})

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
    ...TURNS.flatMap((turn) => [turn.typeAt, ...ticks(turn.typeAt, typingEndsAt(turn), TYPE_MS_PER_CHAR)]),
]

export const typedDraft = (elapsed: number): string => {
    const typing = TURNS.find(({ typeAt, sendAt }) => elapsed >= typeAt && elapsed < sendAt)
    return typing ? typing.user.slice(0, Math.floor((elapsed - typing.typeAt) / TYPE_MS_PER_CHAR)) : ''
}
