import React from 'react'
import { motion } from 'framer-motion'
import { IconArrowUpRight, IconEye, IconPauseFilled, IconPlay } from '@posthog/icons'
import { cn } from '../../../../utils'
import { PointerGlyph, PressCursor } from '../PressCursor'
import { transform } from '../timeline'
import {
    CURSOR_BUG_AT,
    CURSOR_DIFF_AT,
    CURSOR_LENS_PRESS_AT,
    CURSOR_READ_AT,
    CURSOR_REPLAY_AT,
    CURSOR_REPLAY_CLICKS,
    CURSOR_REPLAY_ERROR_AT,
    CURSOR_REPLAY_TICK_MS,
    CURSOR_SESSIONS_AT,
    CURSOR_WATCH_PRESS_AT,
} from './appTraces'
import { SCENE_SIZE, SCENE_TEXT } from '../sceneScale'

interface CodeLine {
    line: number
    code: string
    flag?: boolean
    event?: boolean
    bug?: boolean
}

const CODE: CodeLine[] = [
    { line: 138, code: 'export function Checkout({ plan }: Props) {' },
    { line: 139, code: "    const v2 = useFeatureFlagEnabled('pro-v2')", flag: true },
    { line: 140, code: '    const [paying, setPaying] = useState(false)' },
    { line: 141, code: '' },
    { line: 142, code: '    const price = plan.tier.price', bug: true },
    { line: 143, code: '' },
    { line: 144, code: '    const pay = () => {' },
    { line: 145, code: "        posthog.capture('pay_clicked')", event: true },
    { line: 146, code: '        charge(price)' },
    { line: 147, code: '    }' },
    { line: 148, code: '' },
    { line: 149, code: '    return <PayButton price={price} onClick={pay} />' },
    { line: 150, code: '}' },
]
const FIX = ['    if (!plan) return <CheckoutSkeleton />', '    const price = plan.tier.price']
const REPLAY_PERSON = 'jo@acme.com'
const EXTENSION_GREEN = '#4CBB17'

const Gutter = ({ children, className }: { children?: React.ReactNode; className?: string }) => (
    <span className={cn('w-10 shrink-0 select-none pr-3 text-right text-[#6E6E6E]', className)}>{children}</span>
)

const Hint = ({ children }: { children: React.ReactNode }) => (
    <span className="ml-3 text-[0.85em] opacity-80" style={{ color: EXTENSION_GREEN }}>
        {children}
    </span>
)

const SessionsLens = ({ elapsed }: { elapsed: number }) => (
    <div className="flex whitespace-pre text-[0.85em] text-[#8B8B8B]">
        <Gutter />
        <span className="pl-[8ch]">
            <PressCursor elapsed={elapsed} pressAt={CURSOR_LENS_PRESS_AT}>
                <span className="flex items-center gap-1 hover:underline">
                    <IconEye className={SCENE_SIZE[12]} /> 12 sessions · 9 users in 24h
                </span>
            </PressCursor>
        </span>
    </div>
)

const DiffLine = ({ sign, line, code }: { sign: '+' | '-'; line: number; code: string }) => (
    <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={cn('m-0 flex whitespace-pre', sign === '+' ? 'bg-[#1E3A1E]' : 'bg-[#4B1D1D] opacity-80')}
    >
        <Gutter>{line}</Gutter>
        <span className={sign === '+' ? 'text-[#89D185]' : 'text-[#F48771]'}>{sign} </span>
        {code}
    </motion.p>
)

const CodeView = ({ elapsed }: { elapsed: number }) => {
    const diffing = elapsed >= CURSOR_DIFF_AT
    const flagged = elapsed >= CURSOR_BUG_AT && !diffing
    return (
        <div className={cn(SCENE_TEXT[11.5], 'flex-1 overflow-hidden py-2 font-code leading-[1.6]')}>
            {CODE.map(({ line, code, flag, event, bug }) => {
                const shift = diffing && line > 142 ? 1 : 0
                if (bug && diffing)
                    return (
                        <React.Fragment key={line}>
                            <DiffLine sign="-" line={line} code={code} />
                            {FIX.map((fix, index) => (
                                <DiffLine key={fix} sign="+" line={line + index} code={fix} />
                            ))}
                        </React.Fragment>
                    )
                return (
                    <React.Fragment key={line}>
                        {event && <SessionsLens elapsed={elapsed} />}
                        <p className={cn('m-0 flex whitespace-pre', bug && flagged && 'bg-[#4B1D1D]')}>
                            <Gutter>{line + shift}</Gutter>
                            <span
                                className={cn(
                                    bug &&
                                        flagged &&
                                        'underline decoration-[#F14C4C] decoration-wavy underline-offset-4'
                                )}
                            >
                                {code}
                            </span>
                            {flag && <Hint>● 100%</Hint>}
                            {event && <Hint>▁▂▃▅█ 1.2K in 7d</Hint>}
                        </p>
                    </React.Fragment>
                )
            })}
        </div>
    )
}

const SESSIONS = [
    { person: REPLAY_PERSON, when: 'Today, 14:02', path: '/checkout', device: 'Chrome · macOS' },
    { person: 'sam@globex.io', when: 'Today, 13:47', path: '/checkout', device: 'Safari · iOS' },
    { person: 'lee@initech.com', when: 'Today, 12:15', path: '/pricing', device: 'Firefox · Windows' },
]
const REPLAY_START_SECONDS = 38
const REPLAY_LENGTH_SECONDS = 72
const REPLAY_MARKERS = [
    { at: 0.555, color: '#F54E00' },
    { at: 0.575, color: '#F14F58' },
]
const VIEW_ENTER = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.35, ease: 'easeOut' },
} as const

const WatchButton = ({ primary }: { primary?: boolean }) => (
    <span
        className={cn(
            'inline-flex items-center gap-1 rounded px-2 py-0.5',
            primary ? 'bg-[#3B82F6] text-white' : 'border border-[#3A3A3A] text-[#8B8B8B]'
        )}
    >
        <IconPlay className={SCENE_SIZE[12]} /> Watch replay
    </span>
)

const SessionsView = ({ elapsed }: { elapsed: number }) => (
    <motion.div
        {...VIEW_ENTER}
        className={cn(SCENE_TEXT[11.5], 'flex min-h-0 flex-1 flex-col gap-2 overflow-hidden p-3')}
    >
        <div className="flex items-center gap-2">
            <span className="font-code font-semibold">pay_clicked</span>
            <span className={cn(SCENE_TEXT[10], 'rounded border border-[#3A3A3A] px-1.5 text-[#8B8B8B]')}>event</span>
            <span className="ml-auto flex items-center gap-0.5 text-[#8B8B8B]">
                All recordings <IconArrowUpRight className={SCENE_SIZE[12]} />
            </span>
        </div>
        {SESSIONS.map(({ person, when, path, device }, index) => (
            <motion.div
                key={person}
                initial={{ opacity: 0, transform: transform({ y: 6 }) }}
                animate={{ opacity: 1, transform: transform() }}
                transition={{ duration: 0.35, delay: 0.15 + index * 0.12 }}
                className="rounded-md border border-[#2B2B2B] bg-[#1F1F1F] p-2.5"
            >
                <p className="m-0 flex items-center justify-between gap-2">
                    <span className="truncate font-semibold">{person}</span>
                    <span className="shrink-0 text-[#8B8B8B]">{when}</span>
                </p>
                <p className="m-0 mt-0.5 truncate text-[#8B8B8B]">
                    {path} · {device}
                </p>
                <div className="mt-2 w-fit">
                    {index === 0 ? (
                        <PressCursor elapsed={elapsed} pressAt={CURSOR_WATCH_PRESS_AT}>
                            <WatchButton primary />
                        </PressCursor>
                    ) : (
                        <WatchButton />
                    )}
                </div>
            </motion.div>
        ))}
    </motion.div>
)

const ReplayPointer = () => (
    <motion.span
        className="pointer-events-none absolute left-1/2 top-1/2 z-10 h-5 w-4 drop-shadow"
        initial={{ transform: transform({ x: 110, y: 80 }) }}
        animate={{ transform: transform({ x: 6, y: 4 }) }}
        transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
    >
        <PointerGlyph />
    </motion.span>
)

const ClickRipple = () => (
    <motion.span
        className="pointer-events-none absolute left-1/2 top-1/2 -ml-4 -mt-4 size-8 rounded-full border-2 border-[#F54E00]"
        initial={{ opacity: 0.9, transform: 'scale(0.3)' }}
        animate={{ opacity: 0, transform: 'scale(1.6)' }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
    />
)

const formatReplayTime = (seconds: number): string =>
    `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`

const PlayerBar = ({ elapsed }: { elapsed: number }) => {
    const seconds = REPLAY_START_SECONDS + Math.floor((elapsed - CURSOR_REPLAY_AT) / CURSOR_REPLAY_TICK_MS)
    const startShare = REPLAY_START_SECONDS / REPLAY_LENGTH_SECONDS
    const endShare = (REPLAY_START_SECONDS + (CURSOR_DIFF_AT - CURSOR_REPLAY_AT) / 1000) / REPLAY_LENGTH_SECONDS
    return (
        <div
            className={cn(
                SCENE_TEXT[10.5],
                'flex shrink-0 items-center gap-2 border-t border-black/10 bg-white px-2.5 py-1.5 text-[#151515]'
            )}
        >
            <IconPauseFilled className={SCENE_SIZE[14]} />
            <span className="tabular-nums">
                {formatReplayTime(seconds)} / {formatReplayTime(REPLAY_LENGTH_SECONDS)}
            </span>
            <span className="relative h-1.5 flex-1 rounded-full bg-black/10">
                <motion.span
                    className="absolute inset-0 origin-left rounded-full bg-[#151515]/70"
                    initial={{ transform: `scaleX(${startShare})` }}
                    animate={{ transform: `scaleX(${endShare})` }}
                    transition={{ duration: (CURSOR_DIFF_AT - CURSOR_REPLAY_AT) / 1000, ease: 'linear' }}
                />
                {REPLAY_MARKERS.map(({ at, color }) => (
                    <span
                        key={at}
                        className="absolute top-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full ring-2 ring-white"
                        style={{ left: `${at * 100}%`, backgroundColor: color }}
                    />
                ))}
            </span>
            <span className="text-black/60">1x</span>
        </div>
    )
}

const ReplayView = ({ elapsed }: { elapsed: number }) => {
    const clicks = CURSOR_REPLAY_CLICKS.filter((at) => elapsed >= at)
    const raging = clicks.length === CURSOR_REPLAY_CLICKS.length
    return (
        <motion.div {...VIEW_ENTER} className="flex min-h-0 flex-1 flex-col">
            <div
                className={cn(SCENE_TEXT[11], 'flex shrink-0 items-center gap-2 border-b border-[#2B2B2B] px-3 py-1.5')}
            >
                <span className="flex shrink-0 items-center gap-1 text-[#8B8B8B]">
                    <IconPlay className={SCENE_SIZE[12]} /> Session replay
                </span>
                <span className="truncate font-semibold">{REPLAY_PERSON}</span>
                <span className="ml-auto flex shrink-0 items-center gap-0.5 rounded border border-[#3A3A3A] px-1.5 py-0.5">
                    Open in PostHog <IconArrowUpRight className={SCENE_SIZE[12]} />
                </span>
            </div>
            <div className="relative flex min-h-0 flex-1 flex-col overflow-hidden bg-[#F3F4F0] font-sans text-[#151515]">
                <div
                    className={cn(
                        SCENE_TEXT[11],
                        'flex shrink-0 items-center gap-3 border-b border-black/10 bg-white px-3 py-1.5'
                    )}
                >
                    <span className="font-bold">acme</span>
                    <span className="text-black/50">Product</span>
                    <span className="text-black/50">Pricing</span>
                    <span className="ml-auto truncate text-black/40">acme.com/checkout</span>
                </div>
                {elapsed >= CURSOR_REPLAY_ERROR_AT && (
                    <motion.p
                        initial={{ opacity: 0, transform: transform({ y: -6 }) }}
                        animate={{ opacity: 1, transform: transform() }}
                        className={cn(
                            SCENE_TEXT[11],
                            'absolute inset-x-6 top-10 z-20 m-0 rounded-md bg-[#F14F58] px-2.5 py-1.5 text-center font-semibold text-white shadow'
                        )}
                    >
                        Something went wrong. Please try again.
                    </motion.p>
                )}
                <div className="flex flex-1 items-center justify-center">
                    <div className="w-[72%] rounded-lg border border-black/10 bg-white p-3 text-center shadow-sm">
                        <p className={cn(SCENE_TEXT[11], 'm-0 text-black/60')}>Upgrade to</p>
                        <p className={cn(SCENE_TEXT[16], 'm-0 font-bold')}>Pro</p>
                        <p className={cn(SCENE_TEXT[11], 'm-0 mb-2.5 text-black/60')}>$49 / month</p>
                        <span className="relative block">
                            <motion.span
                                key={clicks.length}
                                className={cn(
                                    SCENE_TEXT[12],
                                    'block rounded-md bg-[#1D4AFF] py-1.5 font-semibold text-white'
                                )}
                                animate={
                                    clicks.length > 0
                                        ? {
                                              transform: ['scale(1)', 'scale(0.93)', 'scale(1)'],
                                              filter: ['brightness(1)', 'brightness(0.8)', 'brightness(1)'],
                                          }
                                        : undefined
                                }
                                transition={{ duration: 0.25, ease: 'easeOut' }}
                            >
                                Pay $49
                            </motion.span>
                            {clicks.map((at) => (
                                <ClickRipple key={at} />
                            ))}
                            <ReplayPointer />
                            {raging && (
                                <motion.span
                                    initial={{ opacity: 0, transform: transform({ scale: 0.8 }) }}
                                    animate={{ opacity: 1, transform: transform() }}
                                    className={cn(
                                        SCENE_TEXT[10],
                                        'absolute left-1/2 top-full ml-5 mt-2 rounded bg-[#F54E00] px-1.5 py-0.5 font-semibold text-white'
                                    )}
                                >
                                    Rage click
                                </motion.span>
                            )}
                        </span>
                    </div>
                </div>
                <PlayerBar elapsed={elapsed} />
            </div>
        </motion.div>
    )
}

const EditorTab = ({ active, children }: { active: boolean; children: React.ReactNode }) => (
    <span
        className={cn(
            SCENE_TEXT[11],
            'w-fit min-w-0 shrink truncate border-b px-3 py-1 font-code',
            active ? 'border-[#3B82F6] bg-[#181818]' : 'border-transparent text-[#8B8B8B]'
        )}
    >
        {children}
    </span>
)

type EditorView = 'code' | 'sessions' | 'replay'

const editorViewAt = (elapsed: number): EditorView => {
    if (elapsed >= CURSOR_DIFF_AT || elapsed < CURSOR_SESSIONS_AT) return 'code'
    return elapsed >= CURSOR_REPLAY_AT ? 'replay' : 'sessions'
}

export const CursorEditor = ({ elapsed }: { elapsed: number }) => {
    const view = editorViewAt(elapsed)
    return (
        <div className="hidden min-w-0 flex-1 flex-col border-r border-[#2B2B2B] @md:flex">
            <div className="flex shrink-0 overflow-hidden bg-[#1F1F1F]">
                <EditorTab active={view === 'code'}>checkout.tsx</EditorTab>
                {elapsed >= CURSOR_SESSIONS_AT && (
                    <EditorTab active={view === 'sessions'}>Sessions: pay_clicked</EditorTab>
                )}
                {elapsed >= CURSOR_REPLAY_AT && (
                    <EditorTab active={view === 'replay'}>Replay: {REPLAY_PERSON}</EditorTab>
                )}
            </div>
            {view === 'code' && <CodeView elapsed={elapsed} />}
            {view === 'sessions' && <SessionsView elapsed={elapsed} />}
            {view === 'replay' && <ReplayView elapsed={elapsed} />}
        </div>
    )
}

export const CursorReadLine = ({ elapsed }: { elapsed: number }) =>
    elapsed >= CURSOR_READ_AT ? (
        <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={cn(SCENE_TEXT[11.5], 'm-0 mb-1 flex items-center gap-1.5 text-[#8B8B8B]')}
        >
            <span>Read</span>
            <span className="truncate font-code text-[#D6D6DD]">checkout.tsx L138–150</span>
        </motion.p>
    ) : null

export const CursorDiffChip = ({ elapsed }: { elapsed: number }) =>
    elapsed >= CURSOR_DIFF_AT ? (
        <motion.div
            initial={{ opacity: 0, transform: transform({ y: 4 }) }}
            animate={{ opacity: 1, transform: transform() }}
            className={cn(
                SCENE_TEXT[11.5],
                'mb-2 flex items-center gap-2 rounded-md border border-[#3A3A3A] bg-[#222222] px-2.5 py-1.5'
            )}
        >
            <span className="font-code">checkout.tsx</span>
            <span className="text-[#89D185]">+2</span>
            <span className="text-[#F48771]">−1</span>
            <span className="ml-auto rounded bg-[#3B82F6] px-1.5 py-0.5 text-white">Review</span>
        </motion.div>
    ) : null
