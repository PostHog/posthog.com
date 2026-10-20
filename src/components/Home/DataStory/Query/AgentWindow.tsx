import React from 'react'
import { motion } from 'framer-motion'
import { IconArrowUpRight, IconCheck, IconSpinner } from '@posthog/icons'
import { Logo } from '@posthog/brand/logo'
import Link from 'components/Link'
import { cn } from '../../../../utils'
import { InlineCode, SourceIcon, TERMINAL_TRACE, Trace, TraceState, codexArguments } from './trace'
import {
    CHATGPT_FUNNEL_AT,
    CHATGPT_TRACE,
    CLAUDE_APP_TRACE,
    CLAUDE_BAR_AT,
    CLAUDE_BAR_HOVER_AT,
    CLAUDE_BAR_PRESS_AT,
    CLAUDE_ERROR_CARD_AT,
    CLAUDE_PICKER_PRESS_AT,
    CLAUDE_TRENDS_AT,
    CURSOR_TRACE,
} from './appTraces'
import { ErrorStackApp, FunnelApp, McpAppFrame, TrendsApp } from './mcpApps'
import { CursorDiffChip, CursorEditor, CursorReadLine } from './cursorScene'
import { PressCursor } from '../PressCursor'
import { transform, useLoopingAnimation, useStickToBottom } from '../timeline'
import {
    CLAUDE_CLAY,
    ChatGPTIcon,
    ClaudeAppIcon,
    ClaudeCodeIcon,
    ClaudeMark,
    CodexIcon,
    CursorIcon,
    OpenAIMark,
} from './appIcons'

export type AgentTheme = 'claude' | 'codex' | 'claudeApp' | 'chatgpt' | 'cursor'

export const AGENT_THEMES: { key: AgentTheme; label: string; Icon: React.ComponentType; installUrl: string }[] = [
    {
        key: 'claude',
        label: 'Claude Code',
        Icon: ClaudeCodeIcon,
        installUrl: '/docs/model-context-protocol/claude-code',
    },
    { key: 'codex', label: 'Codex', Icon: CodexIcon, installUrl: '/docs/model-context-protocol/codex' },
    {
        key: 'claudeApp',
        label: 'Claude',
        Icon: ClaudeAppIcon,
        installUrl: 'https://claude.ai/directory/connectors/posthog',
    },
    {
        key: 'chatgpt',
        label: 'ChatGPT',
        Icon: ChatGPTIcon,
        installUrl: 'https://chatgpt.com/plugins/plugin_asdk_app_699caef2d680819188727b0ddbb349dd',
    },
    { key: 'cursor', label: 'Cursor', Icon: CursorIcon, installUrl: '/docs/model-context-protocol/cursor' },
]

export interface WindowControls {
    onClose?: () => void
    onMinimize?: () => void
    install?: { label: string; url: string }
}

const WINDOW_HEIGHT = 'h-[clamp(26rem,62cqw,44rem)]'

export const WINDOW_DRAG = {
    drag: true,
    dragElastic: 0.08,
    dragMomentum: false,
    className: 'cursor-grab select-none [touch-action:pan-y] active:cursor-grabbing',
} as const

export const LINE_ENTER = {
    initial: { opacity: 0, transform: transform({ y: 4 }) },
    animate: { opacity: 1, transform: transform() },
    transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] },
} as const

const CARET_BLINK: Keyframe[] = [{ opacity: 1 }, { opacity: 0 }]
const PENDING_BLINK: Keyframe[] = [{ opacity: 1 }, { opacity: 0.3 }]
const BLINK_EASING = 'steps(2, jump-none)'
const SPINNER_GLYPHS = ['·', '✢', '✳', '✶', '✻', '✽', '✻', '✶', '✳', '✢']
const SPINNER_KEYFRAMES: Keyframe[] = [{ transform: 'translateY(0)' }, { transform: 'translateY(-100%)' }]
const SPINNER_CYCLE_MS = SPINNER_GLYPHS.length * 110

const Blink = ({
    keyframes,
    periodMs,
    className,
    children,
}: {
    keyframes: Keyframe[]
    periodMs: number
    className?: string
    children?: React.ReactNode
}) => {
    const ref = useLoopingAnimation<HTMLSpanElement>(keyframes, { duration: periodMs, easing: BLINK_EASING })
    return (
        <span ref={ref} className={className}>
            {children}
        </span>
    )
}

const GlyphSpinner = () => {
    const ref = useLoopingAnimation<HTMLSpanElement>(SPINNER_KEYFRAMES, {
        duration: SPINNER_CYCLE_MS,
        easing: `steps(${SPINNER_GLYPHS.length}, end)`,
    })
    return (
        <span className="inline-block h-[1lh] overflow-hidden align-top">
            <span ref={ref} className="flex flex-col">
                {SPINNER_GLYPHS.map((glyph, index) => (
                    <span key={index}>{glyph}</span>
                ))}
            </span>
        </span>
    )
}

export const PostHogMark = ({ className }: { className?: string }) => (
    <span className={cn('inline-flex [&_svg]:!h-full [&_svg]:!w-auto', className)}>
        <Logo layout="logomark" variant="gradient" className="block dark:hidden" />
        <Logo layout="logomark" variant="mono" className="hidden dark:block" />
    </span>
)

const LightButton = ({
    color,
    label,
    glyph,
    onClick,
}: {
    color: string
    label: string
    glyph: string
    onClick?: () => void
}) =>
    onClick ? (
        <button
            type="button"
            aria-label={label}
            title={label}
            onClick={(event) => {
                event.stopPropagation()
                onClick()
            }}
            className="flex size-3 @3xl:size-[15px] items-center justify-center rounded-full font-sans text-[9px] @3xl:text-[11px] font-bold leading-none text-black/60"
            style={{ backgroundColor: color }}
        >
            <span className="opacity-0 transition-opacity group-hover/lights:opacity-100">{glyph}</span>
        </button>
    ) : (
        <span className="size-3 @3xl:size-[15px] rounded-full" style={{ backgroundColor: color }} />
    )

const TrafficLights = ({ onClose, onMinimize }: WindowControls) => (
    <span className="group/lights relative z-10 flex gap-1.5">
        <LightButton color="#FF5F57" label="Close" glyph="×" onClick={onClose} />
        <LightButton color="#FEBC2E" label="Minimize" glyph="−" onClick={onMinimize} />
        <span className="size-3 @3xl:size-[15px] rounded-full bg-[#28C840]" />
    </span>
)

const InstallLink = ({ install }: Pick<WindowControls, 'install'>) => {
    if (!install) return null
    const external = install.url.startsWith('http')
    return (
        <span className="relative z-10 ml-auto hidden font-sans text-[11px] @3xl:text-[13.5px] font-semibold @md:block">
            <Link
                to={install.url}
                {...(external ? { externalNoIcon: true } : { state: { newWindow: true } })}
                className="flex items-center gap-0.5 opacity-70 transition-opacity hover:opacity-100"
            >
                <span className="underline underline-offset-2">Add to {install.label}</span>
                <IconArrowUpRight className="size-3 @3xl:size-[15px]" />
            </Link>
        </span>
    )
}

const Caret = ({ className }: { className?: string }) => (
    <Blink
        keyframes={CARET_BLINK}
        periodMs={1000}
        className={cn('inline-block h-[1.1em] w-[0.55em] align-[-0.2em]', className)}
    />
)

export const ScrollToLatest = ({ children, className }: { children: React.ReactNode; className?: string }) => {
    const { scrollRef, contentRef } = useStickToBottom<HTMLDivElement, HTMLDivElement>()
    return (
        <div
            ref={scrollRef}
            className={cn(
                'scrollbar-hide flex min-h-0 flex-1 flex-col overflow-y-auto [mask-image:linear-gradient(transparent,black_1.5rem)]',
                className
            )}
        >
            <div ref={contentRef} className="flex min-h-full shrink-0 flex-col">
                {children}
            </div>
        </div>
    )
}

const TerminalFrame = ({
    title,
    className,
    controls,
    children,
}: {
    title: string
    className?: string
    controls?: WindowControls
    children: React.ReactNode
}) => (
    <div
        className={cn(
            'flex flex-col overflow-hidden rounded-lg border font-code text-[12.5px] @3xl:text-[15.5px] leading-[1.55] shadow-xl',
            WINDOW_HEIGHT,
            className
        )}
    >
        <div className="relative flex shrink-0 items-center px-3 py-2">
            <TrafficLights {...controls} />
            <span className="absolute inset-x-0 text-center font-sans text-xs @3xl:text-[15px] font-semibold opacity-60">
                {title}
            </span>
            <InstallLink install={controls?.install} />
        </div>
        {children}
    </div>
)

const ClaudeTerminal = ({ state, controls }: TerminalProps) => (
    <TerminalFrame title="claude — ~/acme" controls={controls} className="border-[#3a3835] bg-[#1F1E1D] text-[#E8E6E3]">
        <ScrollToLatest className="px-3.5 pb-3">
            <div className="mb-3 rounded-md border px-3 py-2" style={{ borderColor: CLAUDE_CLAY }}>
                <p className="m-0">
                    <span style={{ color: CLAUDE_CLAY }}>✻</span> Welcome to <strong>Claude Code</strong>!
                </p>
                <p className="m-0 pl-4 text-[#8F8B85]">cwd: ~/acme</p>
            </div>
            {state.submitted && (
                <motion.p {...LINE_ENTER} className="m-0 mb-2 text-[#8F8B85]">
                    &gt; {state.question}
                </motion.p>
            )}
            {state.calls.length > 0 && (
                <motion.p {...LINE_ENTER} className="m-0 mb-2">
                    <span className="mr-2">⏺</span>I'll trace the checkout errors in PostHog.
                </motion.p>
            )}
            {state.calls.map(({ call, done }) => (
                <motion.div {...LINE_ENTER} key={call.id} className="mb-1.5">
                    <p className="m-0 truncate">
                        {done ? (
                            <span className="mr-2 text-[#4EBA65]">⏺</span>
                        ) : (
                            <Blink keyframes={PENDING_BLINK} periodMs={600} className="mr-2 text-[#8F8B85]">
                                ⏺
                            </Blink>
                        )}
                        <strong>posthog - {call.mcpTool}</strong>
                        <span className="text-[#8F8B85]">
                            {' '}
                            (MCP)({call.argName}: "{call.args}")
                        </span>
                    </p>
                    <p className="m-0 truncate pl-4 text-[#8F8B85]">⎿&nbsp; {done ? call.result : 'Running…'}</p>
                </motion.div>
            ))}
            {state.answer && (
                <p className="m-0 mt-1">
                    <span className="mr-2">⏺</span>
                    <InlineCode text={state.answer} codeClassName="text-[#B1B9F9]" />
                </p>
            )}
            <div className="mt-auto pt-2">
                <p className="m-0 mb-1 h-[1.55em]" style={{ color: CLAUDE_CLAY }}>
                    {state.working && (
                        <>
                            <GlyphSpinner /> Investigating…{' '}
                            <span className="text-[#8F8B85]">({state.secondsWorking}s · esc to interrupt)</span>
                        </>
                    )}
                </p>
                <div className="rounded-md border border-[#5a5752] px-2.5 py-1">
                    &gt; {state.typed}
                    <Caret className="bg-[#E8E6E3]" />
                </div>
                <p className="m-0 mt-1 pl-2.5 text-[11px] @3xl:text-[13.5px] text-[#8F8B85]">? for shortcuts</p>
            </div>
        </ScrollToLatest>
    </TerminalFrame>
)

export const CodexTerminal = ({ state, className, controls }: TerminalProps & { className?: string }) => (
    <TerminalFrame
        title="codex — ~/acme"
        controls={controls}
        className={cn('border-[#2b2b2b] bg-[#0E0E0E] text-[#EDEDED]', className)}
    >
        <ScrollToLatest className="px-3.5 pb-3">
            <div className="mb-3 w-fit rounded-md border border-[#3b3b3b] px-3 py-2">
                <p className="m-0">
                    <strong>&gt;_ OpenAI Codex</strong>
                </p>
                <p className="m-0 text-[#8a8a8a]">directory: ~/acme</p>
            </div>
            {state.submitted && (
                <motion.p {...LINE_ENTER} className="-mx-3.5 m-0 mb-2 bg-[#1c1c1c] px-3.5 py-1">
                    <span className="text-[#8a8a8a]">›</span> {state.question}
                </motion.p>
            )}
            {state.calls.map(({ call, done }) => (
                <motion.div {...LINE_ENTER} key={call.id} className="mb-1.5">
                    <p className="m-0 truncate">
                        <span className={done ? 'text-[#5FD787]' : 'text-[#8a8a8a]'}>•</span>{' '}
                        <strong>{done ? 'Called' : 'Calling'}</strong>{' '}
                        <span className="text-[#7FC8FF]">posthog.{call.mcpTool.replace(/-/g, '_')}</span>
                        <span className="text-[#8a8a8a]">({codexArguments(call)})</span>
                    </p>
                    {done && <p className="m-0 truncate pl-4 text-[#8a8a8a]">└ {call.result}</p>}
                </motion.div>
            ))}
            {state.answer && (
                <>
                    <p className="m-0 my-1.5 flex items-center gap-2 text-[#8a8a8a]">
                        <span className="h-px flex-1 bg-[#3b3b3b]" />
                        Worked for {state.secondsWorking}s
                        <span className="h-px flex-1 bg-[#3b3b3b]" />
                    </p>
                    <p className="m-0">
                        <InlineCode text={state.answer} codeClassName="text-[#7FC8FF]" />
                    </p>
                </>
            )}
            <div className="mt-auto pt-2">
                <p className="m-0 mb-1 h-[1.55em]">
                    {state.working && (
                        <>
                            <Blink keyframes={PENDING_BLINK} periodMs={800} className="text-[#8a8a8a]">
                                •
                            </Blink>{' '}
                            <strong>Working</strong>{' '}
                            <span className="text-[#8a8a8a]">({state.secondsWorking}s • esc to interrupt)</span>
                        </>
                    )}
                </p>
                <div className="-mx-3.5 bg-[#1c1c1c] px-3.5 py-1.5">
                    <span className="text-[#8a8a8a]">›</span>{' '}
                    {state.typed || (state.submitted ? '' : <span className="text-[#6a6a6a]">Ask Codex anything</span>)}
                    {state.typed && <Caret className="bg-[#EDEDED]" />}
                </div>
                <p className="m-0 mt-1 text-[11px] @3xl:text-[13.5px] text-[#6a6a6a]">⏎ send · 98% context left</p>
            </div>
        </ScrollToLatest>
    </TerminalFrame>
)

interface AppProps {
    state: TraceState
    elapsed: number
    controls?: WindowControls
}

type TerminalProps = Pick<AppProps, 'state' | 'controls'>

const AppTitleBar = ({
    controls,
    className,
    children,
}: {
    controls?: WindowControls
    className?: string
    children: React.ReactNode
}) => (
    <div className={cn('relative flex shrink-0 items-center px-3 py-2', className)}>
        <TrafficLights {...controls} />
        <span className="absolute inset-x-0 flex items-center justify-center gap-1.5 text-xs @3xl:text-[15px] font-semibold opacity-70">
            {children}
        </span>
        <InstallLink install={controls?.install} />
    </div>
)

const ToolCheck = ({ done, className }: { done: boolean; className?: string }) =>
    done ? (
        <IconCheck className={cn('size-3.5 @3xl:size-[17.5px] shrink-0 text-green', className)} />
    ) : (
        <IconSpinner className={cn('size-3.5 @3xl:size-[17.5px] shrink-0 animate-spin opacity-60', className)} />
    )

const PICKER_TO_BAR = { x: 26, y: -66 }
const CLAUDE_CARD = 'border-[#E5E2D9] bg-white dark:border-[#3A3935] dark:bg-[#30302E]'

const ClaudeApp = ({ state, elapsed, controls }: AppProps) => (
    <div
        className={cn(
            'flex flex-col overflow-hidden rounded-lg border border-[#E5E2D9] bg-[#FAF9F5] text-[13px] @3xl:text-[16px] leading-snug text-[#141413] shadow-xl dark:border-[#3A3935] dark:bg-[#262624] dark:text-[#F5F4ED]',
            WINDOW_HEIGHT
        )}
    >
        <AppTitleBar controls={controls}>
            <ClaudeMark className="size-3 @3xl:size-[15px] text-[#D97757]" />
            Claude
        </AppTitleBar>
        <ScrollToLatest className="px-5 pt-2">
            {state.submitted && (
                <motion.p
                    {...LINE_ENTER}
                    className="m-0 mb-3 ml-auto max-w-[80%] rounded-xl bg-[#F0EEE6] px-3 py-2 dark:bg-[#1F1E1D]"
                >
                    {state.question}
                </motion.p>
            )}
            {state.calls.length > 0 && (
                <motion.div
                    {...LINE_ENTER}
                    className="mb-3 overflow-hidden rounded-lg border border-[#E5E2D9] dark:border-[#3A3935]"
                >
                    <p className="m-0 flex items-center gap-1.5 border-b border-[#E5E2D9] px-3 py-1.5 text-xs @3xl:text-[15px] font-semibold dark:border-[#3A3935]">
                        <PostHogMark className="h-3" />
                        PostHog
                        <span className="font-normal opacity-60">
                            · {state.calls.filter(({ done }) => done).length} of {state.calls.length} tools used
                        </span>
                    </p>
                    {state.calls.map(({ call, done }) => (
                        <motion.p
                            {...LINE_ENTER}
                            key={call.id}
                            className="m-0 flex items-center gap-2 px-3 py-1 text-xs @3xl:text-[15px]"
                        >
                            <SourceIcon source={call.source} className="size-3.5 @3xl:size-[17.5px] shrink-0" />
                            <span className="shrink-0 font-medium">{call.label}</span>
                            <span className="min-w-0 flex-1 truncate opacity-60">{done && call.result}</span>
                            <ToolCheck done={done} />
                        </motion.p>
                    ))}
                </motion.div>
            )}
            {elapsed >= CLAUDE_TRENDS_AT && (
                <McpAppFrame PostHogMark={PostHogMark} className={CLAUDE_CARD}>
                    <TrendsApp
                        chart={elapsed >= CLAUDE_BAR_AT ? 'Bar' : 'Line'}
                        menuOpen={elapsed >= CLAUDE_PICKER_PRESS_AT && elapsed < CLAUDE_BAR_AT}
                        hovered={elapsed >= CLAUDE_BAR_HOVER_AT ? 'Bar' : null}
                        wrapPicker={(picker) => (
                            <PressCursor elapsed={elapsed} pressAt={CLAUDE_PICKER_PRESS_AT}>
                                {picker}
                            </PressCursor>
                        )}
                        wrapOption={(option, item) =>
                            option === 'Bar' ? (
                                <PressCursor elapsed={elapsed} pressAt={CLAUDE_BAR_PRESS_AT} from={PICKER_TO_BAR}>
                                    {item}
                                </PressCursor>
                            ) : (
                                item
                            )
                        }
                    />
                </McpAppFrame>
            )}
            {elapsed >= CLAUDE_ERROR_CARD_AT && (
                <McpAppFrame PostHogMark={PostHogMark} className={CLAUDE_CARD}>
                    <ErrorStackApp />
                </McpAppFrame>
            )}
            {state.answer && (
                <p className="m-0 mb-2">
                    <InlineCode text={state.answer} codeClassName="rounded bg-[#F0EEE6] !px-1 dark:bg-[#1F1E1D]" />
                </p>
            )}
            {state.working && !state.answer && (
                <span className="mb-2 block w-fit" style={{ color: CLAUDE_CLAY }}>
                    <GlyphSpinner />
                </span>
            )}
        </ScrollToLatest>
        <div className="shrink-0 px-4 pb-3 pt-1">
            <div className="rounded-2xl border border-[#E5E2D9] bg-white px-3 pb-2 pt-2.5 shadow-sm dark:border-[#3A3935] dark:bg-[#30302E]">
                <p className="m-0 min-h-[1.4em]">
                    {state.typed || <span className="opacity-50">Reply to Claude…</span>}
                    {state.typed && <Caret className="w-px bg-current" />}
                </p>
                <div className="mt-2 flex items-center justify-between">
                    <span className="flex items-center gap-1 rounded-md border border-[#E5E2D9] px-1.5 py-0.5 text-[11px] @3xl:text-[13.5px] dark:border-[#3A3935]">
                        <PostHogMark className="h-2.5" /> PostHog
                    </span>
                    <span
                        className="flex size-6 @3xl:size-[30px] items-center justify-center rounded-lg text-sm @3xl:text-[17.5px] font-bold text-white transition-opacity"
                        style={{ backgroundColor: CLAUDE_CLAY, opacity: state.typed ? 1 : 0.45 }}
                    >
                        ↑
                    </span>
                </div>
            </div>
        </div>
    </div>
)

const CHATGPT_CARD = 'border-[#E5E5E5] bg-white dark:border-[#383838] dark:bg-[#2A2A2A]'

const ChatGPTApp = ({ state, elapsed, controls }: AppProps) => (
    <div
        className={cn(
            'flex flex-col overflow-hidden rounded-lg border border-[#E5E5E5] bg-white text-[13px] @3xl:text-[16px] leading-snug text-[#0D0D0D] shadow-xl dark:border-[#383838] dark:bg-[#212121] dark:text-[#ECECEC]',
            WINDOW_HEIGHT
        )}
    >
        <AppTitleBar controls={controls}>
            <OpenAIMark className="size-3 @3xl:size-[15px]" />
            ChatGPT
        </AppTitleBar>
        <ScrollToLatest className="px-6 pt-2">
            {state.submitted && (
                <motion.p
                    {...LINE_ENTER}
                    className="m-0 mb-3 ml-auto max-w-[80%] rounded-3xl bg-[#F4F4F4] px-4 py-2 dark:bg-[#303030]"
                >
                    {state.question}
                </motion.p>
            )}
            {state.calls.map(({ call, done }) => (
                <motion.p
                    {...LINE_ENTER}
                    key={call.id}
                    className="m-0 mb-1 flex items-center gap-1.5 text-xs @3xl:text-[15px] opacity-70"
                >
                    <PostHogMark className="h-3 shrink-0" />
                    <span className="shrink-0">{done ? 'Talked to' : 'Talking to'} PostHog</span>
                    <span className="min-w-0 flex-1 truncate opacity-70">· {done ? call.result : call.label}</span>
                </motion.p>
            ))}
            {elapsed >= CHATGPT_FUNNEL_AT && (
                <div className="mt-2">
                    <McpAppFrame PostHogMark={PostHogMark} className={CHATGPT_CARD}>
                        <FunnelApp />
                    </McpAppFrame>
                </div>
            )}
            {state.answer && (
                <p className="m-0 mb-2 mt-2">
                    <InlineCode text={state.answer} codeClassName="rounded bg-[#F4F4F4] !px-1 dark:bg-[#303030]" />
                </p>
            )}
            {state.working && !state.answer && (
                <span className="mb-2 mt-1 block size-2.5 @3xl:size-3 animate-pulse rounded-full bg-current" />
            )}
        </ScrollToLatest>
        <div className="shrink-0 px-4 pb-3 pt-1">
            <div className="flex items-center gap-2 rounded-3xl border border-[#E5E5E5] px-4 py-2 shadow-sm dark:border-[#383838] dark:bg-[#303030]">
                <span className="text-base @3xl:text-[20px] leading-none opacity-60">+</span>
                <span className="min-w-0 flex-1">
                    {state.typed || <span className="opacity-50">Ask anything</span>}
                    {state.typed && <Caret className="w-px bg-current" />}
                </span>
                <span
                    className={cn(
                        'flex size-7 @3xl:size-9 items-center justify-center rounded-full text-sm @3xl:text-[17.5px] font-bold transition-colors',
                        state.typed
                            ? 'bg-black text-white dark:bg-white dark:text-black'
                            : 'bg-[#E5E5E5] text-white dark:bg-[#4A4A4A]'
                    )}
                >
                    ↑
                </span>
            </div>
        </div>
    </div>
)

const CursorApp = ({ state, elapsed, controls }: AppProps) => (
    <div
        className={cn(
            'flex flex-col overflow-hidden rounded-lg border border-[#2B2B2B] bg-[#181818] text-[12.5px] @3xl:text-[15.5px] leading-snug text-[#D6D6DD] shadow-xl',
            WINDOW_HEIGHT
        )}
    >
        <AppTitleBar controls={controls} className="border-b border-[#2B2B2B] bg-[#1F1F1F]">
            acme — checkout.tsx
        </AppTitleBar>
        <div className="flex min-h-0 flex-1">
            <CursorEditor elapsed={elapsed} />
            <div className="flex w-full flex-col @md:w-[42%] @md:shrink-0">
                <p className="m-0 border-b border-[#2B2B2B] px-3 py-1.5 text-[11px] @3xl:text-[13.5px] font-semibold uppercase tracking-wide text-[#8B8B8B]">
                    Agent
                </p>
                <ScrollToLatest className="px-3 pt-2">
                    {state.submitted && (
                        <motion.p
                            {...LINE_ENTER}
                            className="m-0 mb-2 rounded-md border border-[#3A3A3A] bg-[#222222] px-2.5 py-1.5"
                        >
                            {state.question}
                        </motion.p>
                    )}
                    {state.calls.map(({ call, done }) => (
                        <motion.p
                            {...LINE_ENTER}
                            key={call.id}
                            className="m-0 mb-1 flex items-center gap-1.5 text-[11.5px] @3xl:text-[14px]"
                        >
                            <ToolCheck done={done} className="size-3 @3xl:size-[15px]" />
                            <span className="shrink-0 text-[#8B8B8B]">MCP</span>
                            <span className="truncate font-code text-[#9CDCFE]">posthog · {call.mcpTool}</span>
                        </motion.p>
                    ))}
                    <CursorReadLine elapsed={elapsed} />
                    {state.answer && (
                        <p className="m-0 mb-2 mt-1.5">
                            <InlineCode text={state.answer} codeClassName="rounded bg-[#2A2A2A] !px-1 text-[#CE9178]" />
                        </p>
                    )}
                    <CursorDiffChip elapsed={elapsed} />
                </ScrollToLatest>
                <div className="shrink-0 p-2.5">
                    <div className="rounded-md border border-[#3A3A3A] bg-[#222222] px-2.5 py-2">
                        <p className="m-0 min-h-[1.4em]">
                            {state.typed || <span className="text-[#6E6E6E]">Plan, search, build anything</span>}
                            {state.typed && <Caret className="w-px bg-current" />}
                        </p>
                        <p className="m-0 mt-1.5 flex items-center justify-between text-[11px] @3xl:text-[13.5px] text-[#8B8B8B]">
                            <span>∞ Agent · Auto</span>
                            <span>{state.working ? 'Generating…' : '⏎'}</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
)

const THEMES: Record<AgentTheme, { Component: React.ComponentType<AppProps>; trace: Trace }> = {
    claude: { Component: ClaudeTerminal, trace: TERMINAL_TRACE },
    codex: { Component: CodexTerminal, trace: TERMINAL_TRACE },
    claudeApp: { Component: ClaudeApp, trace: CLAUDE_APP_TRACE },
    chatgpt: { Component: ChatGPTApp, trace: CHATGPT_TRACE },
    cursor: { Component: CursorApp, trace: CURSOR_TRACE },
}

export const traceFor = (theme: AgentTheme): Trace => THEMES[theme].trace

function AgentWindow({
    theme,
    elapsed,
    controls,
}: {
    theme: AgentTheme
    elapsed: number
    controls?: WindowControls
}): JSX.Element {
    const { Component, trace } = THEMES[theme]
    const app = AGENT_THEMES.find(({ key }) => key === theme)
    const install = app && { label: app.label, url: app.installUrl }
    return (
        <div className="@container not-prose">
            <Component
                state={trace.stateAt(elapsed)}
                elapsed={elapsed}
                controls={controls && { ...controls, install }}
            />
        </div>
    )
}

export default React.memo(AgentWindow)
