import React, { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import {
    IconBolt,
    IconCheck,
    IconCheckCircle,
    IconChevronDown,
    IconCursor,
    IconCollapse,
    IconExpand,
    IconBell,
    IconCalendar,
    IconMessage,
    IconPeople,
    IconSparkles,
    IconWebhooks,
    IconEye,
    IconSend,
    IconClock,
    IconDecisionTree,
    IconLeave,
    IconLetter,
    IconPerson,
    IconRefresh,
    IconRewindPlay,
    IconUndo,
    IconWarning,
} from '@posthog/icons'
import { CodeBlock } from 'components/CodeBlock'
import OSButton from 'components/OSButton'
import { sendSnippets } from './sendSnippets'
import { ReplayPlayer } from './Replay'

export const blockClassName =
    'not-prose rounded-2xl border border-primary bg-white p-4 shadow-2xl dark:bg-accent @xl/reader-content:p-8 @5xl/reader-content:p-10'

// Counts from the shown value to `target` with an ease-out.
export function useCountUp(target: number, duration = 700): number {
    const [value, setValue] = useState(target)
    const from = useRef(target)
    const reducedMotion = useReducedMotion()
    useEffect(() => {
        if (reducedMotion) return setValue(target)
        const start = performance.now()
        const initial = from.current
        let frame = 0
        const step = (now: number) => {
            const p = Math.min(1, (now - start) / duration)
            const v = initial + (target - initial) * (1 - Math.pow(1 - p, 3))
            from.current = v
            setValue(v)
            if (p < 1) frame = requestAnimationFrame(step)
        }
        frame = requestAnimationFrame(step)
        return () => cancelAnimationFrame(frame)
    }, [target])
    return value
}

// Block 1: send from code on the left, and the events around the email stream in on the right.

type Part = [prefix: string, chip: string]
type FeedEvent = {
    time: string
    kind: 'sent' | 'delivered' | 'opened' | 'clicked' | 'app'
    label: string
    parts: Part[]
    tone?: 'bad' | 'good'
}

const stories: {
    label: string
    about: string
    subject: string
    template: string
    html: string
    before: FeedEvent
    after: FeedEvent[]
    outcome: string
    replay: string
}[] = [
    {
        label: 'Payment failed',
        about: 'a failed payment',
        subject: 'Update your card',
        template: 'payment-failed',
        html: '<p>Your card was declined. Update it to keep your Pro plan.</p>',
        before: {
            time: '09:14:02',
            kind: 'app',
            label: 'payment_failed',
            parts: [
                ['', 'Card declined'],
                ['for', '$49'],
            ],
            tone: 'bad',
        },
        after: [
            { time: '09:14:03', kind: 'sent', label: 'Sent', parts: [['with subject', 'Update your card']] },
            { time: '09:14:03', kind: 'delivered', label: 'Delivered', parts: [['to', 'jane@example.com']] },
            {
                time: '09:16:40',
                kind: 'opened',
                label: 'Opened',
                parts: [
                    ['on', 'Gmail'],
                    ['running on', 'iOS'],
                ],
            },
            { time: '09:16:52', kind: 'clicked', label: 'Clicked', parts: [['link', '/billing']] },
            {
                time: '09:18:10',
                kind: 'app',
                label: 'payment_succeeded',
                parts: [
                    ['', '$49'],
                    ['plan', 'Pro'],
                ],
                tone: 'good',
            },
        ],
        outcome: '$49 recovered, 4 minutes after the send',
        replay: 'payment',
    },
    {
        label: 'Password reset',
        about: 'a password reset',
        subject: 'Reset your password',
        template: 'password-reset',
        html: '<p>Use this link to reset your password. It expires in 1 hour.</p>',
        before: { time: '18:30:11', kind: 'app', label: 'login_failed', parts: [['', '3 attempts']], tone: 'bad' },
        after: [
            { time: '18:31:02', kind: 'sent', label: 'Sent', parts: [['with subject', 'Reset your password']] },
            {
                time: '18:31:03',
                kind: 'delivered',
                label: 'Delivered',
                parts: [
                    ['to', 'jane@example.com'],
                    ['in', '1.2s'],
                ],
            },
            { time: '18:31:40', kind: 'clicked', label: 'Clicked', parts: [['link', '/reset']] },
            { time: '18:32:15', kind: 'app', label: 'password_rejected', parts: [['replay', '1m 12s']], tone: 'bad' },
            { time: '18:33:02', kind: 'app', label: 'logged_in', parts: [['on', 'Chrome']], tone: 'good' },
        ],
        outcome: 'Back in after 2 minutes, and the replay shows the password rule that tripped her up',
        replay: 'reset',
    },
    {
        label: 'Team invite',
        about: 'a team invite',
        subject: 'Jane invited you to Hedgebox',
        template: 'team-invite',
        html: '<p>Jane invited you to her team on Hedgebox.</p>',
        before: { time: '11:02:45', kind: 'app', label: 'member_invited', parts: [['by', 'jane@example.com']] },
        after: [
            {
                time: '11:02:46',
                kind: 'sent',
                label: 'Sent',
                parts: [['with subject', 'Jane invited you to Hedgebox']],
            },
            { time: '11:02:46', kind: 'delivered', label: 'Delivered', parts: [['to', 'sam@example.com']] },
            { time: '11:05:30', kind: 'clicked', label: 'Clicked', parts: [['link', '/join']] },
            { time: '11:06:12', kind: 'app', label: 'signed_up', parts: [['with', 'Google']], tone: 'good' },
            { time: '11:08:59', kind: 'app', label: 'file_uploaded', parts: [['', 'Q4 plan.pdf']], tone: 'good' },
        ],
        outcome: 'Sam joined and shared a file within 6 minutes of the invite',
        replay: 'invite',
    },
]

const kindLook: Record<FeedEvent['kind'], { Icon: React.ComponentType<{ className?: string }>; pill: string }> = {
    sent: { Icon: IconSend, pill: 'bg-accent text-secondary' },
    delivered: { Icon: IconCheckCircle, pill: 'bg-green/15 text-green' },
    opened: { Icon: IconEye, pill: 'bg-blue/15 text-blue' },
    clicked: { Icon: IconCursor, pill: 'bg-lilac/15 text-lilac' },
    app: { Icon: IconBolt, pill: 'bg-blue/10 text-primary font-code' },
}

function TimelineEvent({ event }: { event: FeedEvent }): JSX.Element {
    const { Icon, pill } = kindLook[event.kind]
    const tone = event.tone === 'good' ? 'text-green' : event.tone === 'bad' ? 'text-red' : 'text-secondary'
    return (
        <div className="grid grid-cols-[2.25rem_minmax(0,1fr)] gap-3">
            <span
                className={`flex size-9 items-center justify-center rounded-md border border-primary bg-white dark:bg-accent ${tone}`}
            >
                <Icon className="size-5" />
            </span>
            <div className="min-w-0 pb-2.5">
                <div className="flex flex-wrap items-center gap-2">
                    <span className={`rounded px-2 py-0.5 text-xs font-semibold ${pill}`}>{event.label}</span>
                    <span className="font-code text-xs text-muted">{event.time}</span>
                </div>
                <div className="mt-1.5 flex flex-wrap items-center gap-1.5 text-sm text-secondary">
                    {event.parts.map(([prefix, chip]) => (
                        <React.Fragment key={prefix + chip}>
                            {prefix && <span>{prefix}</span>}
                            <span className="rounded border border-primary bg-white px-1.5 text-primary dark:bg-accent">
                                {chip}
                            </span>
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </div>
    )
}

const fakeId = (n: number) =>
    `${(0x5a6e6328 + n * 7919).toString(16)}-ffd8-45bb-8dae-${(0x6ccd4de7 + n * 104729).toString(16)}`

export function SendBlock({ title }: { title: (about: React.ReactNode) => React.ReactNode }): JSX.Element {
    const [storyIndex, setStoryIndex] = useState(0)
    const [language, setLanguage] = useState<string>('Node.js')
    const [shown, setShown] = useState(0)
    const [responses, setResponses] = useState<number[]>([])
    const [watching, setWatching] = useState(false)
    const timers = useRef<ReturnType<typeof setTimeout>[]>([])
    useEffect(() => () => timers.current.forEach(clearTimeout), [])
    const story = stories[storyIndex]
    const done = shown === story.after.length
    const running = shown > 0 && !done

    const reset = () => {
        timers.current.forEach(clearTimeout)
        setShown(0)
        setWatching(false)
    }
    const send = () => {
        reset()
        setResponses((r) => [r.length, ...r].slice(0, 4))
        timers.current = story.after.map((_, i) => setTimeout(() => setShown(i + 1), 300 + i * 700))
    }
    const options = sendSnippets(story)
    // Only the send call, without the client setup, for narrow windows.
    const shortOptions = options.map((o) => ({
        ...o,
        code: (o.code.split('\n\n').pop() as string).replace('const { data, error } = ', ''),
    }))
    // Newest first, and the panel has a fixed height, so a new event never moves the page.
    const events = [...story.after.slice(0, shown)].reverse()

    return (
        <div className={blockClassName}>
            <div className="mb-5 flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
                <div>
                    <h2 className="m-0 mb-1 text-2xl font-bold leading-tight @xl/reader-content:text-3xl">
                        {title(
                            // The highlighted words are the picker: a transparent native select sits on top of them.
                            <span className="relative inline-flex cursor-pointer items-center gap-1">
                                {story.about}
                                <IconChevronDown className="size-6 shrink-0 @xl/reader-content:size-7" />
                                <select
                                    aria-label="Email to send"
                                    value={storyIndex}
                                    onChange={(e) => {
                                        reset()
                                        setStoryIndex(Number(e.target.value))
                                    }}
                                    className="absolute inset-0 cursor-pointer opacity-0"
                                >
                                    {stories.map((s, i) => (
                                        <option key={s.label} value={i}>
                                            {s.label}
                                        </option>
                                    ))}
                                </select>
                            </span>
                        )}{' '}
                        {/* With its shadow, the button is as tall as the highlight next to it. */}
                        <span className="relative -top-[2px] inline-block align-middle leading-none @xl/reader-content:-top-[3px] [&_button>span]:h-[31px] [&_button>span]:!py-0 @xl/reader-content:[&_button>span]:h-[38px]">
                            <OSButton variant="primary" size="lg" disabled={running} onClick={send} icon={<IconSend />}>
                                Send
                            </OSButton>
                        </span>
                    </h2>
                    <p className="m-0 text-secondary">Hit send, then see what the user does next.</p>
                </div>
            </div>
            <div className="grid gap-4 @3xl/reader-content:grid-cols-[3fr_2fr]">
                {/* On a narrow window the column dissolves into the grid: send bar, events, then only the send call. */}
                <div className="contents @3xl/reader-content:flex @3xl/reader-content:min-w-0 @3xl/reader-content:flex-col @3xl/reader-content:gap-3">
                    <div className="order-3 min-w-0 @3xl/reader-content:order-none">
                        <div className="hidden @3xl/reader-content:block">
                            <CodeBlock
                                currentLanguage={options.find((o) => o.label === language) ?? options[0]}
                                onChange={(option) => setLanguage(option.label ?? 'Node.js')}
                                showAskAI={false}
                            >
                                {options}
                            </CodeBlock>
                        </div>
                        <div className="@3xl/reader-content:hidden">
                            <CodeBlock
                                currentLanguage={shortOptions.find((o) => o.label === language) ?? shortOptions[0]}
                                onChange={(option) => setLanguage(option.label ?? 'Node.js')}
                                selector="dropdown"
                                showAskAI={false}
                            >
                                {shortOptions}
                            </CodeBlock>
                        </div>
                    </div>
                    <div className="hidden h-12 overflow-hidden font-code text-xs @3xl/reader-content:block [mask-image:linear-gradient(to_bottom,black_55%,transparent)]">
                        {responses.length === 0 ? (
                            <span className="text-muted">Responses show up here.</span>
                        ) : (
                            responses.map((n) => (
                                <motion.div
                                    key={n}
                                    initial={{ opacity: 0, y: -6 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="py-0.5"
                                >
                                    <span className="text-secondary">HTTP 202:</span> {'{ "id": "'}
                                    {fakeId(n)}
                                    {'" }'}
                                </motion.div>
                            ))
                        )}
                    </div>
                </div>
                <div
                    className={`relative order-2 h-[21rem] overflow-hidden rounded-lg border border-primary p-4 @3xl/reader-content:order-none @3xl/reader-content:h-auto ${
                        watching ? '' : '[mask-image:linear-gradient(to_bottom,black_85%,transparent)]'
                    }`}
                >
                    {watching && (
                        <div className="absolute inset-0 z-20 bg-white p-4 dark:bg-accent">
                            <ReplayPlayer scene={story.replay} onClose={() => setWatching(false)} />
                        </div>
                    )}
                    <span className="absolute bottom-0 left-[2.1rem] top-4 w-px bg-border" aria-hidden />
                    {/* Out of the flow, so a new event or the outcome never makes the panel, or the page, taller. */}
                    <div className="absolute inset-x-4 top-4">
                        <AnimatePresence initial={false}>
                            {done && (
                                <motion.p
                                    key="outcome"
                                    layout
                                    initial={{ opacity: 0, y: -8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="relative z-10 m-0 mb-4 overflow-hidden rounded-md bg-white text-sm font-semibold dark:bg-accent"
                                >
                                    <span className="flex items-center gap-2 bg-green/15 px-3 py-2">
                                        <IconCheck className="size-5 shrink-0 text-green" />
                                        {story.outcome}
                                    </span>
                                    <button
                                        type="button"
                                        onClick={() => setWatching(true)}
                                        className="flex w-full items-center gap-2 border-t border-primary px-3 py-2 text-left font-semibold text-red hover:bg-accent"
                                    >
                                        <IconRewindPlay className="size-5 shrink-0" />
                                        Watch what {story.replay === 'invite' ? 'Sam' : 'Jane'} did after the click
                                    </button>
                                </motion.p>
                            )}
                            {events.map((event) => (
                                <motion.div
                                    key={storyIndex + event.label + event.time}
                                    layout
                                    initial={{ opacity: 0, y: -12 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ type: 'spring', stiffness: 320, damping: 28 }}
                                >
                                    <TimelineEvent event={event} />
                                </motion.div>
                            ))}
                            <motion.div key={storyIndex + 'before'} layout className={shown > 0 ? 'opacity-60' : ''}>
                                <TimelineEvent event={story.before} />
                            </motion.div>
                        </AnimatePresence>
                        {shown === 0 && (
                            <p className="m-0 ml-12 text-sm text-muted">
                                That happened in your app. Hit send to see what happens next.
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

// Block 2: the app's send calendar and its day picker (SendCalendar, SendDayPicker). When you schedule a broadcast,
// the picker shades the days that are too close to other sends to the same people and suggests one that isn't.
// December 2026 starts on a Tuesday, so the grid starts on Monday, Nov 30.

type Send = {
    day: number
    time: string
    name: string
    kind: 'broadcast' | 'workflow'
    shared: boolean
    repeats?: boolean
}

const sends: Send[] = [
    { day: 2, time: '9:00 AM', name: 'Trial ending', kind: 'broadcast', shared: false },
    { day: 9, time: '10:00 AM', name: 'New: shared folders', kind: 'broadcast', shared: true },
    { day: 16, time: '10:00 AM', name: 'December changelog', kind: 'broadcast', shared: true },
    { day: 23, time: '9:00 AM', name: 'Year in review', kind: 'broadcast', shared: false },
    ...[7, 14, 21, 28].map(
        (day): Send => ({ day, time: '8:00 AM', name: 'Weekly digest', kind: 'workflow', shared: false, repeats: true })
    ),
]
const today = 3
const cells = Array.from({ length: 35 }, (_, i) => i) // 0 is Nov 30, 1 to 31 are December, 32+ are January
const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const dayLabel = (d: number) => `${weekdays[d % 7]}, Dec ${d}`

// The app's default spacing rule: 1 marketing email per person every 2 days.
const crowdedBy = (day: number) => sends.filter((s) => s.shared && Math.abs(s.day - day) < 2)
const bookable = (day: number) => day > today && day <= 31 && crowdedBy(day).length === 0
function suggestFrom(day: number): number {
    for (let offset = 0; offset < 31; offset++) {
        if (bookable(day + offset)) return day + offset
        if (bookable(day - offset)) return day - offset
    }
    return day
}

function SendChip({
    send,
    isNew = false,
}: {
    send: Pick<Send, 'time' | 'name' | 'kind' | 'repeats'>
    isNew?: boolean
}) {
    return (
        <span
            className={`flex min-w-0 items-center gap-1 rounded px-1 py-0.5 text-[11px] leading-tight ${
                isNew ? 'bg-red/10 ring-1 ring-red' : ''
            }`}
        >
            <span className={`size-2 shrink-0 rounded-full ${send.kind === 'broadcast' ? 'bg-red' : 'bg-blue'}`} />
            <span className="truncate" title={`${send.time} · ${send.name}`}>
                {send.name}
            </span>
            {send.repeats && <IconRefresh className="size-3 shrink-0 text-secondary" />}
        </span>
    )
}

export function CalendarBlock({
    broadcast = { name: 'New: file requests', audience: '', people: 3560 },
}: {
    broadcast?: { name: string; people: number }
}): JSX.Element {
    const [picked, setPicked] = useState<number | null>(null)
    const [scheduled, setScheduled] = useState<number | null>(null)
    const picking = scheduled === null
    const suggestion = suggestFrom(picked ?? 10)
    const crowding = picked === null ? [] : crowdedBy(picked)
    const draft = { time: '10:00 AM', name: broadcast.name, kind: 'broadcast' as const }
    // A new draft from the broadcast block starts the picking over.
    useEffect(() => {
        setPicked(null)
        setScheduled(null)
    }, [broadcast.name])

    return (
        <div className={blockClassName}>
            <div className="grid gap-5 @4xl/reader-content:grid-cols-[minmax(0,1fr)_17rem]">
                <div className="min-w-0">
                    <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                        <strong className="text-lg">December 2026</strong>
                        {picking ? (
                            <span className="flex gap-3 text-xs text-secondary">
                                <span className="flex items-center gap-1">
                                    <span className="size-3 rounded-sm border border-primary bg-yellow/25" /> Too close
                                    to other sends
                                </span>
                                <span className="flex items-center gap-1">
                                    <span className="size-3 rounded-sm border-2 border-dashed border-green" /> Suggested
                                </span>
                            </span>
                        ) : (
                            <span className="flex gap-3 text-xs text-secondary">
                                <span className="flex items-center gap-1">
                                    <span className="size-2 rounded-full bg-red" /> Broadcast
                                </span>
                                <span className="flex items-center gap-1">
                                    <span className="size-2 rounded-full bg-blue" /> Automation
                                </span>
                            </span>
                        )}
                    </div>
                    <div className="overflow-hidden rounded border border-primary bg-white dark:bg-accent">
                        <div className="grid grid-cols-7 border-b border-primary bg-accent">
                            {weekdays.map((d) => (
                                <span key={d} className="px-2 py-1 text-xs font-semibold uppercase text-secondary">
                                    {d}
                                </span>
                            ))}
                        </div>
                        <div className="grid grid-cols-7">
                            {cells.map((i) => {
                                const inMonth = i >= 1 && i <= 31
                                const label =
                                    i === 0 ? 'Nov 30' : i === 32 ? 'Jan 1' : i > 32 ? String(i - 31) : String(i)
                                const selectable = picking && inMonth && i > today
                                const crowded = selectable && crowdedBy(i).length > 0
                                const isSuggested = picking && i === suggestion
                                return (
                                    <div
                                        key={i}
                                        role={selectable ? 'button' : undefined}
                                        tabIndex={selectable ? 0 : undefined}
                                        aria-label={selectable ? `Send on ${dayLabel(i)}` : undefined}
                                        aria-pressed={selectable ? picked === i : undefined}
                                        onClick={selectable ? () => setPicked(i) : undefined}
                                        onKeyDown={selectable ? (e) => e.key === 'Enter' && setPicked(i) : undefined}
                                        className={`relative flex min-h-[4.25rem] min-w-0 flex-col gap-0.5 p-1 transition-colors @2xl/reader-content:min-h-[5.25rem] ${
                                            i % 7 !== 6 ? 'border-r border-primary' : ''
                                        } ${i < 28 ? 'border-b border-primary' : ''} ${
                                            !inMonth || (picking && i <= today) ? 'bg-accent/60' : ''
                                        } ${crowded ? 'bg-yellow/20' : ''} ${
                                            selectable ? 'cursor-pointer hover:bg-blue/5' : ''
                                        } ${
                                            picked === i && picking
                                                ? '!bg-blue/10 shadow-[inset_0_0_0_2px_theme(colors.blue)]'
                                                : ''
                                        }`}
                                    >
                                        {isSuggested && (
                                            <span className="pointer-events-none absolute inset-1 rounded border-2 border-dashed border-green" />
                                        )}
                                        <span className="flex h-5 items-center pl-1 text-xs font-semibold">
                                            <span
                                                className={
                                                    i === today
                                                        ? 'rounded-full bg-red px-1.5 text-white'
                                                        : inMonth
                                                        ? ''
                                                        : 'text-muted'
                                                }
                                            >
                                                {label}
                                            </span>
                                        </span>
                                        {sends
                                            .filter((s) => s.day === i)
                                            .map((s) => (
                                                <SendChip key={s.name} send={s} />
                                            ))}
                                        {scheduled === i && (
                                            <motion.span
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                            >
                                                <SendChip send={draft} isNew />
                                            </motion.span>
                                        )}
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-3 self-start rounded-lg border border-primary p-4 text-sm">
                    <span className="flex items-center gap-1.5 text-xs text-secondary">
                        <span className="size-2 rounded-full bg-red" /> Broadcast ·{' '}
                        {broadcast.people.toLocaleString('en-US')} people
                    </span>
                    <strong className="-mt-2 text-base">{draft.name}</strong>
                    {scheduled !== null ? (
                        <>
                            <span className="flex gap-1.5 rounded bg-green/10 p-2">
                                <IconCheck className="size-5 shrink-0 text-green" />
                                Scheduled for {dayLabel(scheduled)} at 10:00 AM.
                            </span>
                            <div>
                                <OSButton
                                    size="sm"
                                    variant="secondary"
                                    icon={<IconUndo />}
                                    onClick={() => {
                                        setScheduled(null)
                                        setPicked(null)
                                    }}
                                >
                                    Pick again
                                </OSButton>
                            </div>
                        </>
                    ) : picked === null ? (
                        <>
                            <span className="text-secondary">
                                Pick a send day. PostHog checks it against every other send to the same people.
                            </span>
                            <SuggestionLine day={suggestion} onUse={() => setPicked(suggestion)} />
                        </>
                    ) : crowding.length ? (
                        <>
                            <span className="flex gap-1.5 rounded bg-yellow/15 p-2">
                                <IconWarning className="size-5 shrink-0 text-yellow" />
                                <span>
                                    Some people in this audience also get{' '}
                                    {crowding.map((c) => `"${c.name}"`).join(', ')} within 2 days.
                                </span>
                            </span>
                            <SuggestionLine day={suggestion} onUse={() => setPicked(suggestion)} />
                            <button
                                type="button"
                                onClick={() => setScheduled(picked)}
                                className="self-start text-xs text-secondary underline"
                            >
                                Send on {dayLabel(picked)} anyway
                            </button>
                        </>
                    ) : (
                        <>
                            <span className="flex gap-1.5 rounded bg-green/10 p-2">
                                <IconCheck className="size-5 shrink-0 text-green" />
                                {dayLabel(picked)} at 10:00 AM stays within 1 marketing email per person every 2 days.
                            </span>
                            <div>
                                <OSButton size="sm" variant="primary" onClick={() => setScheduled(picked)}>
                                    Schedule
                                </OSButton>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

function SuggestionLine({ day, onUse }: { day: number; onUse: () => void }): JSX.Element {
    return (
        <span className="flex flex-wrap items-center gap-2">
            <span>
                Suggested: <strong>{dayLabel(day)} at 10:00 AM</strong>
            </span>
            <OSButton size="sm" variant="secondary" onClick={onUse}>
                Pick {dayLabel(day)}
            </OSButton>
        </span>
    )
}

// Block 3: the app's tile canvas, and the suggestion flow from Workflows/suggestions:
// suggested -> approved as a draft -> published -> per-version outcome.

type Tile = {
    Icon: React.ComponentType<{ className?: string }>
    color: string
    shape?: 'start' | 'end'
    title: string
    detail: string
    count?: number
    badge?: string
    changed?: boolean
}

function tileRadius(shape?: 'start' | 'end'): string {
    return shape === 'start' ? '32px 32px 12px 12px' : shape === 'end' ? '12px 12px 32px 32px' : '12px'
}

const badgeClassName =
    'absolute whitespace-nowrap rounded-full border border-primary bg-white px-1.5 text-[11px] font-semibold leading-[18px] shadow-sm dark:bg-accent'

// One row: the tile sits on the center line and its caption to the right, as in the app.
function TileRow({ tile }: { tile: Tile }): JSX.Element {
    const count = useCountUp(tile.count ?? 0, 900)
    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            transition={{ type: 'spring', stiffness: 300, damping: 26 }}
            className="grid w-full grid-cols-[minmax(0,1fr)_4rem_minmax(0,1fr)] items-start gap-3"
        >
            <span />
            <div className="relative">
                <div
                    className={`flex size-16 items-center justify-center border-2 bg-white shadow-sm dark:bg-accent ${
                        tile.changed ? 'ring-2 ring-lilac ring-offset-4 ring-offset-white dark:ring-offset-accent' : ''
                    }`}
                    style={{ borderRadius: tileRadius(tile.shape), borderColor: tile.color, color: tile.color }}
                >
                    <tile.Icon className="size-7" />
                </div>
                {tile.count !== undefined && (
                    <span className={`${badgeClassName} -right-3 -top-2.5 inline-flex items-center gap-0.5`}>
                        <IconPerson className="size-3" />
                        {Math.round(count).toLocaleString('en-US')}
                    </span>
                )}
                {tile.badge && (
                    <span
                        className={`${badgeClassName} -bottom-2 left-1/2 -translate-x-1/2`}
                        style={{ color: tile.color }}
                    >
                        {tile.badge}
                    </span>
                )}
            </div>
            <div className="min-w-0 pt-1 text-left">
                <div className="text-[13px] font-semibold leading-tight">{tile.title}</div>
                <div className="text-xs leading-snug text-secondary">{tile.detail}</div>
            </div>
        </motion.div>
    )
}

const Down = () => <span className="mx-auto block h-7 w-[1.5px] bg-border" />
const Pill = ({ children }: { children: React.ReactNode }) => (
    <span className="mx-auto block w-fit rounded-full border border-primary bg-white px-2 text-xs font-semibold dark:bg-accent">
        {children}
    </span>
)

const exitTile: Tile = { Icon: IconLeave, color: '#9a9a9a', shape: 'end', title: 'Exit', detail: 'End of automation' }

type Stage = 'suggested' | 'draft' | 'live'

type Suggestion = {
    title: string
    why: string
    measured: string
    changes: [label: string, before: string | null, after: string][]
    version: number
    step: string
    outcomes: { label: string; before: number; after: number }[]
}

const onboardingSuggestion: Suggestion = {
    title: 'Wait for the first upload before the nudge',
    why: "Most people who haven't uploaded a file on day 1 are still exploring. Send the nudge after 2 days, and only to people who still haven't uploaded one.",
    measured: 'Click rate 2.1% on 1,198 tracked sends (v3, last 30 days), target 4%',
    changes: [
        ['Wait', '1 day', '2 days'],
        ['New step', null, 'Condition: uploaded a file?'],
    ],
    version: 3,
    step: 'The nudge email',
    outcomes: [
        { label: 'Opened', before: 48.2, after: 51.0 },
        { label: 'Clicked', before: 2.1, after: 4.6 },
        { label: 'Unsubscribed', before: 0.4, after: 0.2 },
    ],
}

function Tag({ tone, children }: { tone: 'highlight' | 'success'; children: React.ReactNode }) {
    return (
        <span
            className={`rounded px-1.5 py-0.5 text-[11px] font-semibold ${
                tone === 'success' ? 'bg-green/15 text-green' : 'bg-lilac/15 text-lilac'
            }`}
        >
            {children}
        </span>
    )
}

function SuggestionPanel({
    s,
    stage,
    setStage,
}: {
    s: Suggestion
    stage: Stage
    setStage: (s: Stage) => void
}): JSX.Element {
    return (
        <div className="order-first flex flex-col gap-4 self-start rounded-xl border border-primary bg-white p-5 text-sm leading-relaxed shadow-xl dark:bg-accent @3xl/reader-content:order-none">
            <div className="flex items-start gap-2">
                <IconBolt className="mt-0.5 size-4 shrink-0" />
                <div className="flex flex-col gap-1">
                    <strong>{s.title}</strong>
                    <span>
                        {stage === 'suggested' && <Tag tone="highlight">Suggested by PostHog</Tag>}
                        {stage === 'draft' && <Tag tone="highlight">Staged as draft</Tag>}
                        {stage === 'live' && <Tag tone="success">Published as version {s.version + 1}</Tag>}
                    </span>
                </div>
            </div>
            {stage === 'suggested' && (
                <>
                    <p className="m-0 text-secondary">{s.why}</p>
                    <p className="m-0">
                        {s.measured} <Tag tone="success">Measured by PostHog</Tag>
                    </p>
                    <div className="flex flex-col gap-2 border-l-2 border-primary pl-3 text-xs">
                        <strong className="text-secondary">What changes</strong>
                        {s.changes.map(([label, before, after]) => (
                            <span key={label}>
                                {label}:{' '}
                                {before && <span className="rounded bg-red/15 px-1 line-through">{before}</span>}{' '}
                                <span className="rounded bg-green/15 px-1">{after}</span>
                            </span>
                        ))}
                    </div>
                    <span className="text-xs text-secondary">Suggested 2 hours ago against version {s.version}</span>
                    <div className="flex gap-2">
                        <OSButton size="sm" variant="secondary" disabled tooltip="Approve it to see what happens">
                            Reject
                        </OSButton>
                        <OSButton size="sm" variant="primary" onClick={() => setStage('draft')}>
                            Approve as draft
                        </OSButton>
                    </div>
                </>
            )}
            {stage === 'draft' && (
                <>
                    <p className="m-0 text-secondary">
                        It's the automation's draft now, and the canvas shows it. Publish the draft to make it live.
                    </p>
                    <div className="flex gap-2">
                        <OSButton size="sm" variant="secondary" onClick={() => setStage('suggested')}>
                            Discard
                        </OSButton>
                        <OSButton size="sm" variant="primary" onClick={() => setStage('live')}>
                            Publish
                        </OSButton>
                    </div>
                </>
            )}
            {stage === 'live' && (
                <>
                    <p className="m-0 text-secondary">
                        {s.step}, version {s.version} against version {s.version + 1}:
                    </p>
                    <div className="grid grid-cols-[auto_1fr_1fr] gap-x-3 gap-y-1 text-xs">
                        <span />
                        <strong className="text-secondary">v{s.version}</strong>
                        <strong className="text-secondary">v{s.version + 1}</strong>
                        {s.outcomes.map((o) => (
                            <React.Fragment key={o.label}>
                                <span className="text-secondary">{o.label}</span>
                                <span className="font-semibold">{o.before.toFixed(1)}%</span>
                                <span className="font-semibold text-green">{o.after.toFixed(1)}%</span>
                            </React.Fragment>
                        ))}
                    </div>
                    <div className="self-start">
                        <OSButton
                            size="sm"
                            variant="secondary"
                            icon={<IconUndo />}
                            onClick={() => setStage('suggested')}
                        >
                            Start over
                        </OSButton>
                    </div>
                </>
            )}
        </div>
    )
}

// The example scenarios above the canvas. Onboarding is the one PostHog improves on its own; the rest are static.
type Scenario = {
    trigger: { Icon: Tile['Icon']; label: string }
    name: string
    steps: Tile[]
    branch?: { condition: Tile; no: Tile[] | Path; yes: Tile[] | Path }
    about: string
    stats: [label: string, value: string][]
    // Self-driving: what PostHog suggests, and the flow once it's applied. Tiles marked `changed` light up in the draft.
    suggestion?: Suggestion & { after: Pick<Scenario, 'steps' | 'branch'> }
}

const email = (title: string, count?: number): Tile => ({
    Icon: IconLetter,
    color: '#2F80FA',
    title,
    detail: 'Email',
    count,
})
const wait = (days: number, count?: number): Tile => ({
    Icon: IconClock,
    color: '#a20031',
    title: `Wait ${days} day${days > 1 ? 's' : ''}`,
    detail: 'Delay',
    badge: `${days}d`,
    count,
})
const start = (Icon: Tile['Icon'], title: string, detail: string, count: number): Tile => ({
    Icon,
    color: '#35C46F',
    shape: 'start',
    title,
    detail,
    count,
})

const scenarios: Scenario[] = [
    {
        trigger: { Icon: IconSparkles, label: 'Sign up' },
        name: 'Onboarding',
        steps: [],
        about: '',
        stats: [],
    },
    {
        trigger: { Icon: IconPeople, label: 'Joining a cohort' },
        name: 'Win back',
        steps: [
            start(IconPeople, 'Joins "At risk of churning"', 'Cohort trigger', 312),
            email('We miss you', 312),
            wait(3, 309),
        ],
        branch: {
            condition: {
                Icon: IconDecisionTree,
                color: '#35C46F',
                title: 'Came back?',
                detail: 'Condition',
                count: 309,
            },
            no: [{ Icon: IconMessage, color: '#4A154B', title: 'Ping the account owner', detail: 'Slack', count: 201 }],
            yes: [{ ...exitTile, detail: 'Active again' }],
        },
        about: 'When someone stops using Hedgebox, email them. If they still don’t come back, tell their account owner in Slack.',
        stats: [
            ['Came back', '35%'],
            ['Opened', '44%'],
            ['Slack pings', '201'],
        ],
        suggestion: {
            title: 'Ping the account owner a day sooner',
            why: 'Almost everyone who comes back does it within 2 days of the email. Waiting a third day only delays the Slack ping.',
            measured: 'Came back 35% of 309 runs (v2, last 30 days), target 45%',
            changes: [['Wait', '3 days', '2 days']],
            version: 2,
            step: 'The win-back automation',
            outcomes: [
                { label: 'Came back', before: 35.0, after: 43.2 },
                { label: 'Opened', before: 44.1, after: 44.8 },
                { label: 'Unsubscribed', before: 0.6, after: 0.5 },
            ],
            after: {
                steps: [
                    start(IconPeople, 'Joins "At risk of churning"', 'Cohort trigger', 312),
                    email('We miss you', 312),
                    { ...wait(2, 310), changed: true },
                ],
                branch: {
                    condition: {
                        Icon: IconDecisionTree,
                        color: '#35C46F',
                        title: 'Came back?',
                        detail: 'Condition',
                        count: 310,
                    },
                    no: [
                        {
                            Icon: IconMessage,
                            color: '#4A154B',
                            title: 'Ping the account owner',
                            detail: 'Slack',
                            count: 176,
                        },
                    ],
                    yes: [{ ...exitTile, detail: 'Active again' }],
                },
            },
        },
    },
    {
        trigger: { Icon: IconCalendar, label: 'A schedule' },
        name: 'Weekly digest',
        steps: [
            start(IconCalendar, 'Every Monday at 8 AM', 'Schedule trigger', 18450),
            email('Your week in Hedgebox', 18450),
            exitTile,
        ],
        about: 'Every Monday, send each active person what changed in their folders last week.',
        stats: [
            ['Sent', '18,450'],
            ['Opened', '52%'],
            ['Clicked', '9.8%'],
        ],
    },
    {
        trigger: { Icon: IconWebhooks, label: 'A webhook' },
        name: 'Trial ending',
        steps: [
            start(IconWebhooks, 'Stripe: trial ends in 3 days', 'Webhook trigger', 540),
            email('Your trial ends Friday', 540),
            wait(2, 532),
            {
                Icon: IconBell,
                color: '#F7A501',
                title: 'Last day of your trial',
                detail: 'Push notification',
                count: 498,
            },
            exitTile,
        ],
        about: 'Stripe tells PostHog a trial is about to end. Email first, then a push notification on the last day.',
        stats: [
            ['Upgraded', '23%'],
            ['Opened', '61%'],
            ['Push taps', '14%'],
        ],
        suggestion: {
            title: 'Send the push at 9 AM in their time zone',
            why: 'Pushes sent overnight get swiped away. People tap twice as often when it lands in the morning.',
            measured: 'Push taps 14% on 498 sends (v1, last 30 days), target 25%',
            changes: [['Wait', '2 days', 'until the last day, 9 AM local time']],
            version: 1,
            step: 'The trial ending automation',
            outcomes: [
                { label: 'Push taps', before: 14.0, after: 27.5 },
                { label: 'Upgraded', before: 23.0, after: 26.1 },
                { label: 'Push turned off', before: 1.2, after: 0.9 },
            ],
            after: {
                steps: [
                    start(IconWebhooks, 'Stripe: trial ends in 3 days', 'Webhook trigger', 540),
                    email('Your trial ends Friday', 540),
                    {
                        Icon: IconClock,
                        color: '#a20031',
                        title: 'Wait until the last day, 9 AM',
                        detail: 'Delay, in their time zone',
                        badge: '9am',
                        count: 532,
                        changed: true,
                    },
                    {
                        Icon: IconBell,
                        color: '#F7A501',
                        title: 'Last day of your trial',
                        detail: 'Push notification',
                        count: 498,
                    },
                    exitTile,
                ],
            },
        },
    },
    {
        trigger: { Icon: IconMessage, label: 'A survey response' },
        name: 'Unhappy NPS',
        steps: [start(IconMessage, 'NPS score of 6 or less', 'Survey trigger', 87)],
        branch: {
            condition: {
                Icon: IconDecisionTree,
                color: '#35C46F',
                title: 'On a paid plan?',
                detail: 'Condition',
                count: 87,
            },
            no: [email('Sorry to hear that', 52)],
            yes: {
                label: 'Paid customer follow-up',
                summary: 'Slack, then a founder email and a ticket',
                steps: [
                    {
                        Icon: IconMessage,
                        color: '#4A154B',
                        title: 'Post to #customer-success',
                        detail: 'Slack',
                        count: 35,
                    },
                    wait(1, 35),
                    email('A note from our founder', 35),
                    {
                        Icon: IconWebhooks,
                        color: '#F54E00',
                        title: 'Create a Zendesk ticket',
                        detail: 'Webhook',
                        count: 35,
                    },
                ],
            },
        },
        about: 'A low score gets a personal reply. If they pay, the customer success team hears about it in Slack.',
        stats: [
            ['Replied', '41%'],
            ['Slack posts', '35'],
            ['Score went up', '29%'],
        ],
    },
]

// A path of several steps, collapsed into one stacked tile as the app's canvas does. Open it to see the steps.
type Path = { label: string; summary: string; steps: Tile[] }

function BranchSide({ side }: { side: Tile[] | Path }): JSX.Element {
    const [open, setOpen] = useState(false)
    if (Array.isArray(side) || open) {
        const steps = Array.isArray(side) ? side : side.steps
        return (
            <>
                {!Array.isArray(side) && (
                    <>
                        <Down />
                        <button
                            type="button"
                            onClick={() => setOpen(false)}
                            className="mx-auto flex items-center gap-1.5 rounded-full border border-primary bg-white py-0.5 pl-2.5 pr-1 text-xs font-semibold text-orange shadow-sm dark:bg-accent"
                        >
                            {side.label}
                            <span className="flex items-center gap-0.5 rounded-full px-1.5 font-medium text-secondary hover:bg-accent">
                                <IconCollapse className="size-3" /> Collapse
                            </span>
                        </button>
                    </>
                )}
                {steps.map((tile, i) => (
                    <motion.div
                        key={i}
                        initial={Array.isArray(side) ? false : { opacity: 0, y: -24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.06 }}
                        className="flex flex-col"
                    >
                        <Down />
                        <TileRow tile={tile} />
                    </motion.div>
                ))}
            </>
        )
    }
    return (
        <>
            <Down />
            <button
                type="button"
                onClick={() => setOpen(true)}
                title="Open this path"
                className="grid w-full grid-cols-[minmax(0,1fr)_4rem_minmax(0,1fr)] items-start gap-3 text-left"
            >
                <span />
                <span className="relative block size-16">
                    {[8, 4].map((offset) => (
                        <span
                            key={offset}
                            className="absolute inset-0 rounded-xl border-2 border-orange bg-white opacity-50 dark:bg-accent"
                            style={{ transform: `translate(${offset}px, ${-offset}px)` }}
                        />
                    ))}
                    <span className="absolute inset-0 grid grid-cols-2 place-items-center rounded-xl border-2 border-dashed border-orange bg-white p-1.5 dark:bg-accent">
                        {side.steps.slice(0, 4).map(({ Icon, color }, i) => (
                            <span key={i} style={{ color }}>
                                <Icon className="size-4" />
                            </span>
                        ))}
                    </span>
                    <span className={`${badgeClassName} -right-3 -top-2.5 inline-flex items-center gap-0.5`}>
                        <IconPerson className="size-3" />
                        {side.steps[0].count}
                    </span>
                </span>
                <span className="min-w-0 pt-1">
                    <span className="block text-[13px] font-semibold leading-tight text-orange">{side.label}</span>
                    <span className="block text-xs leading-snug text-secondary">{side.summary}</span>
                    <span className="flex items-center gap-1 whitespace-nowrap text-[11px] text-secondary">
                        {side.steps.length} steps
                        <span className="flex items-center gap-0.5 font-medium text-primary">
                            <IconExpand className="size-3" /> Open
                        </span>
                    </span>
                </span>
            </button>
        </>
    )
}

function Flow({
    scenario,
    highlight,
}: {
    scenario: Pick<Scenario, 'name' | 'steps' | 'branch'>
    highlight: boolean
}): JSX.Element {
    const { branch } = scenario
    const steps = scenario.steps.map((t) => ({ ...t, changed: highlight && t.changed }))
    return (
        <motion.div
            key={scenario.name}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col pt-2 @3xl/reader-content:min-h-[41rem]"
        >
            {steps.map((tile, i) => (
                <React.Fragment key={i}>
                    {i > 0 && <Down />}
                    <TileRow tile={tile} />
                </React.Fragment>
            ))}
            {branch && (
                <>
                    <Down />
                    <TileRow tile={branch.condition} />
                    <span className="mx-auto block h-4 w-[1.5px] bg-border" />
                    <div className="mx-auto h-4 w-1/2 rounded-t-lg border-x-[1.5px] border-t-[1.5px] border-primary" />
                    <div className="grid grid-cols-2">
                        {(['No', 'Yes'] as const).map((side) => (
                            <div key={side} className="flex flex-col">
                                <Pill>{side}</Pill>
                                <BranchSide side={branch[side === 'No' ? 'no' : 'yes']} />
                            </div>
                        ))}
                    </div>
                </>
            )}
        </motion.div>
    )
}

const SelfDriving = () => (
    <span className="flex items-center gap-1 rounded-full bg-lilac/15 px-2 text-xs font-semibold text-lilac">
        <IconSparkles className="size-3" /> Self-driving
    </span>
)

export function CanvasBlock(): JSX.Element {
    const [scenarioIndex, setScenarioIndex] = useState(0)
    const scenario = scenarios[scenarioIndex]
    const [stage, setStage] = useState<Stage>('suggested')
    const proposed = stage !== 'suggested'
    const draft = stage === 'draft'
    const clicked = useCountUp(stage === 'live' ? 4.6 : 2.1, 900)

    const head: Tile[] = [
        {
            Icon: IconBolt,
            color: '#35C46F',
            shape: 'start',
            title: 'User signed up',
            detail: 'Event trigger',
            count: 1204,
        },
        { Icon: IconLetter, color: '#2F80FA', title: 'Welcome to Hedgebox', detail: 'Email', count: 1204 },
        {
            Icon: IconClock,
            color: '#a20031',
            title: proposed ? 'Wait 2 days' : 'Wait 1 day',
            detail: 'Delay',
            badge: proposed ? '2d' : '1d',
            count: 1198,
            changed: draft,
        },
    ]
    const nudge: Tile = {
        Icon: IconLetter,
        color: '#2F80FA',
        title: 'Upload your first file',
        detail: 'Email',
        count: proposed ? 655 : 1198,
    }

    return (
        <div className={`${blockClassName} !p-0 overflow-hidden`}>
            <div className="flex flex-wrap items-center gap-2 border-b border-primary px-4 py-3">
                <span className="mr-1 text-sm font-semibold text-secondary">Triggered by</span>
                {scenarios.map(({ trigger: { Icon, label } }, i) => (
                    <button
                        key={label}
                        type="button"
                        aria-pressed={i === scenarioIndex}
                        onClick={() => {
                            setScenarioIndex(i)
                            setStage('suggested')
                        }}
                        className={`flex items-center gap-1.5 rounded-full border px-3 py-1 text-sm ${
                            i === scenarioIndex
                                ? 'border-blue bg-blue/10 font-semibold text-primary'
                                : 'border-primary bg-white hover:bg-accent dark:bg-accent'
                        }`}
                    >
                        <Icon className="size-4 text-blue" /> {label}
                    </button>
                ))}
            </div>
            {scenarioIndex > 0 ? (
                <>
                    <div className="flex flex-wrap items-center gap-2 border-b border-primary px-4 py-2.5">
                        <strong>{scenario.name}</strong>
                        {scenario.suggestion && <SelfDriving />}
                        {draft ? (
                            <span className="rounded-full bg-lilac/15 px-2 text-xs font-semibold text-lilac">
                                Draft
                            </span>
                        ) : (
                            <span className="rounded-full bg-green/15 px-2 text-xs font-semibold text-green">
                                Live
                                {scenario.suggestion &&
                                    ` · v${scenario.suggestion.version + (stage === 'live' ? 1 : 0)}`}
                            </span>
                        )}
                    </div>
                    <div
                        className="grid gap-8 p-6 @3xl/reader-content:grid-cols-[minmax(0,1fr)_22rem]"
                        style={{
                            backgroundImage: 'radial-gradient(rgb(var(--border) / 0.7) 1px, transparent 1px)',
                            backgroundSize: '18px 18px',
                        }}
                    >
                        <Flow
                            key={scenario.name + proposed}
                            scenario={
                                proposed && scenario.suggestion
                                    ? { ...scenario, ...scenario.suggestion.after }
                                    : scenario
                            }
                            highlight={draft}
                        />
                        {scenario.suggestion ? (
                            <SuggestionPanel s={scenario.suggestion} stage={stage} setStage={setStage} />
                        ) : (
                            <div className="flex flex-col gap-3 self-start rounded-lg border border-primary bg-white p-4 text-sm dark:bg-accent">
                                <p className="m-0">{scenario.about}</p>
                                <div className="grid grid-cols-3 gap-2">
                                    {scenario.stats.map(([label, value]) => (
                                        <div key={label} className="rounded bg-accent p-2">
                                            <div className="text-lg font-bold tabular-nums">{value}</div>
                                            <div className="text-xs text-secondary">{label}</div>
                                        </div>
                                    ))}
                                </div>
                                <p className="m-0 text-xs text-secondary">
                                    Last 30 days. PostHog has no changes to suggest yet.
                                </p>
                            </div>
                        )}
                    </div>
                </>
            ) : (
                <>
                    <div className="flex flex-wrap items-center gap-2 border-b border-primary px-4 py-2.5">
                        <strong>Onboarding</strong>
                        <SelfDriving />
                        {draft ? (
                            <span className="rounded-full bg-lilac/15 px-2 text-xs font-semibold text-lilac">
                                Draft
                            </span>
                        ) : (
                            <span className="rounded-full bg-green/15 px-2 text-xs font-semibold text-green">
                                Live · v{stage === 'live' ? 4 : 3}
                            </span>
                        )}
                        <span className="ml-auto text-sm text-secondary">
                            Nudge clicked{' '}
                            <strong className="font-code text-base text-primary tabular-nums">
                                {clicked.toFixed(1)}%
                            </strong>
                        </span>
                    </div>
                    <div
                        className="grid gap-8 p-6 @3xl/reader-content:grid-cols-[minmax(0,1fr)_22rem]"
                        style={{
                            backgroundImage: 'radial-gradient(rgb(var(--border) / 0.7) 1px, transparent 1px)',
                            backgroundSize: '18px 18px',
                        }}
                    >
                        <div className="flex flex-col pt-2 @3xl/reader-content:min-h-[41rem]">
                            {head.map((tile, i) => (
                                <React.Fragment key={i}>
                                    {i > 0 && <Down />}
                                    <TileRow tile={tile} />
                                </React.Fragment>
                            ))}
                            <Down />
                            <AnimatePresence mode="popLayout" initial={false}>
                                {proposed ? (
                                    <motion.div
                                        key="branch"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="flex flex-col"
                                    >
                                        <TileRow
                                            tile={{
                                                Icon: IconDecisionTree,
                                                color: '#35C46F',
                                                title: 'Uploaded a file?',
                                                detail: 'Condition',
                                                count: 1198,
                                                changed: draft,
                                            }}
                                        />
                                        {/* The fork: one line down from the condition, then out to each branch. */}
                                        <span className="mx-auto block h-4 w-[1.5px] bg-border" />
                                        <div className="mx-auto h-4 w-1/2 rounded-t-lg border-x-[1.5px] border-t-[1.5px] border-primary" />
                                        <div className="grid grid-cols-2">
                                            <div className="flex flex-col">
                                                <Pill>No</Pill>
                                                <Down />
                                                <TileRow tile={nudge} />
                                                <Down />
                                                <TileRow tile={exitTile} />
                                            </div>
                                            <div className="flex flex-col">
                                                <Pill>Yes</Pill>
                                                <Down />
                                                <TileRow
                                                    tile={{ ...exitTile, title: 'Exit', detail: 'Already active' }}
                                                />
                                            </div>
                                        </div>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="line"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="flex flex-col"
                                    >
                                        <TileRow tile={nudge} />
                                        <Down />
                                        <TileRow tile={exitTile} />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                        <SuggestionPanel s={onboardingSuggestion} stage={stage} setStage={setStage} />
                    </div>
                </>
            )}
        </div>
    )
}
