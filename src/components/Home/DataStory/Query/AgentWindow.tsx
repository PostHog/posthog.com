import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { IconCheck, IconPlus, IconSpinner } from '@posthog/icons'
import { Logo } from '@posthog/brand/logo'
import { cn } from '../../../../utils'
import { IOS_SPRING } from '../Ingest/session'
import { InlineCode, QUESTION, SourceIcon, TraceState, spinnerGlyph, traceAt } from './trace'

export type AgentTheme = 'claude' | 'codex' | 'desktop'

export const AGENT_THEMES: { key: AgentTheme; label: string }[] = [
    { key: 'claude', label: 'Claude Code' },
    { key: 'codex', label: 'Codex' },
    { key: 'desktop', label: 'PostHog Desktop' },
]

const WINDOW_HEIGHT = 'h-[26rem]'
const CLAUDE_CLAY = '#D97757'

const LINE_ENTER = {
    initial: { opacity: 0, y: 4 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] },
}

const PostHogMark = ({ className }: { className?: string }) => (
    <span className={cn('inline-flex [&_svg]:!h-full [&_svg]:!w-auto', className)}>
        <Logo layout="logomark" variant="gradient" className="block dark:hidden" />
        <Logo layout="logomark" variant="mono" className="hidden dark:block" />
    </span>
)

const TrafficLights = () => (
    <span className="flex gap-1.5">
        {['#FF5F57', '#FEBC2E', '#28C840'].map((color) => (
            <span key={color} className="size-2.5 rounded-full" style={{ backgroundColor: color }} />
        ))}
    </span>
)

const Caret = ({ elapsed, className }: { elapsed: number; className?: string }) => (
    <span
        className={cn('inline-block h-[1.1em] w-[0.55em] align-[-0.2em]', className)}
        style={{ opacity: Math.floor(elapsed / 500) % 2 === 0 ? 1 : 0 }}
    />
)

const ScrollToLatest = ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <div
        className={cn(
            'flex min-h-0 flex-1 flex-col justify-end overflow-hidden [mask-image:linear-gradient(transparent,black_1.5rem)]',
            className
        )}
    >
        <div className="flex min-h-full shrink-0 flex-col">{children}</div>
    </div>
)

const TerminalFrame = ({
    title,
    className,
    children,
}: {
    title: string
    className: string
    children: React.ReactNode
}) => (
    <div
        className={cn(
            'flex flex-col overflow-hidden rounded-lg border font-code text-[12.5px] leading-[1.55] shadow-xl',
            WINDOW_HEIGHT,
            className
        )}
    >
        <div className="relative flex shrink-0 items-center px-3 py-2">
            <TrafficLights />
            <span className="absolute inset-x-0 text-center font-sans text-xs font-semibold opacity-60">{title}</span>
        </div>
        {children}
    </div>
)

const ClaudeTerminal = ({ state, elapsed }: { state: TraceState; elapsed: number }) => (
    <TerminalFrame title="claude — ~/acme" className="border-[#3a3835] bg-[#1F1E1D] text-[#E8E6E3]">
        <ScrollToLatest className="px-3.5 pb-3">
            <div className="mb-3 rounded-md border px-3 py-2" style={{ borderColor: CLAUDE_CLAY }}>
                <p className="m-0">
                    <span style={{ color: CLAUDE_CLAY }}>✻</span> Welcome to <strong>Claude Code</strong>!
                </p>
                <p className="m-0 pl-4 text-[#8F8B85]">cwd: ~/acme</p>
            </div>
            {state.submitted && (
                <motion.p {...LINE_ENTER} className="m-0 mb-2 text-[#8F8B85]">
                    &gt; {QUESTION}
                </motion.p>
            )}
            {state.calls.length > 0 && (
                <motion.p {...LINE_ENTER} className="m-0 mb-2">
                    <span className="mr-2">⏺</span>I'll follow Acme's trail through PostHog.
                </motion.p>
            )}
            {state.calls.map(({ call, done }) => (
                <motion.div {...LINE_ENTER} key={call.id} className="mb-1.5">
                    <p className="m-0 truncate">
                        <span
                            className="mr-2"
                            style={{
                                color: done ? '#4EBA65' : '#8F8B85',
                                opacity: done || Math.floor(elapsed / 300) % 2 === 0 ? 1 : 0.3,
                            }}
                        >
                            ⏺
                        </span>
                        <strong>posthog - {call.mcpTool}</strong>
                        <span className="text-[#8F8B85]"> (MCP)(source: "{call.args}")</span>
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
                            {spinnerGlyph(elapsed)} Investigating…{' '}
                            <span className="text-[#8F8B85]">({state.secondsWorking}s · esc to interrupt)</span>
                        </>
                    )}
                </p>
                <div className="rounded-md border border-[#5a5752] px-2.5 py-1">
                    &gt; {state.typed}
                    <Caret elapsed={elapsed} className="bg-[#E8E6E3]" />
                </div>
                <p className="m-0 mt-1 pl-2.5 text-[11px] text-[#8F8B85]">? for shortcuts</p>
            </div>
        </ScrollToLatest>
    </TerminalFrame>
)

const CodexTerminal = ({ state, elapsed }: { state: TraceState; elapsed: number }) => (
    <TerminalFrame title="codex — ~/acme" className="border-[#2b2b2b] bg-[#0E0E0E] text-[#EDEDED]">
        <ScrollToLatest className="px-3.5 pb-3">
            <div className="mb-3 w-fit rounded-md border border-[#3b3b3b] px-3 py-2">
                <p className="m-0">
                    <strong>&gt;_ OpenAI Codex</strong>
                </p>
                <p className="m-0 text-[#8a8a8a]">directory: ~/acme</p>
            </div>
            {state.submitted && (
                <motion.p {...LINE_ENTER} className="-mx-3.5 m-0 mb-2 bg-[#1c1c1c] px-3.5 py-1">
                    <span className="text-[#8a8a8a]">›</span> {QUESTION}
                </motion.p>
            )}
            {state.calls.map(({ call, done }) => (
                <motion.div {...LINE_ENTER} key={call.id} className="mb-1.5">
                    <p className="m-0 truncate">
                        <span className={done ? 'text-[#5FD787]' : 'text-[#8a8a8a]'}>•</span>{' '}
                        <strong>{done ? 'Called' : 'Calling'}</strong>{' '}
                        <span className="text-[#7FC8FF]">posthog.{call.mcpTool.replace(/-/g, '_')}</span>
                        <span className="text-[#8a8a8a]">({`{"source":"${call.args}"}`})</span>
                    </p>
                    {done && <p className="m-0 truncate pl-4 text-[#8a8a8a]">└ {call.result}</p>}
                </motion.div>
            ))}
            {state.answer && (
                <>
                    <p className="m-0 my-1.5 flex items-center gap-2 text-[#8a8a8a]">
                        <span className="h-px flex-1 bg-[#3b3b3b]" />
                        Worked for 8s
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
                            <span className="text-[#8a8a8a]">{Math.floor(elapsed / 400) % 2 ? '◦' : '•'}</span>{' '}
                            <strong>Working</strong>{' '}
                            <span className="text-[#8a8a8a]">({state.secondsWorking}s • esc to interrupt)</span>
                        </>
                    )}
                </p>
                <div className="-mx-3.5 bg-[#1c1c1c] px-3.5 py-1.5">
                    <span className="text-[#8a8a8a]">›</span>{' '}
                    {state.typed || (state.submitted ? '' : <span className="text-[#6a6a6a]">Ask Codex anything</span>)}
                    {state.typed && <Caret elapsed={elapsed} className="bg-[#EDEDED]" />}
                </div>
                <p className="m-0 mt-1 text-[11px] text-[#6a6a6a]">⏎ send · 98% context left</p>
            </div>
        </ScrollToLatest>
    </TerminalFrame>
)

const DesktopApp = ({ state, elapsed }: { state: TraceState; elapsed: number }) => (
    <div
        className={cn(
            'flex flex-col overflow-hidden rounded-lg border border-primary bg-primary text-[13px] leading-snug text-primary shadow-xl',
            WINDOW_HEIGHT
        )}
    >
        <div className="relative flex shrink-0 items-center gap-2 border-b border-primary bg-accent px-3 py-2">
            <TrafficLights />
            <span className="absolute inset-x-0 flex items-center justify-center gap-1.5 text-xs font-semibold">
                <PostHogMark className="h-3" />
                PostHog Desktop
            </span>
        </div>
        <div className="flex min-h-0 flex-1">
            <div className="hidden w-32 shrink-0 flex-col gap-0.5 border-r border-primary bg-accent/50 p-2 text-xs @sm:flex">
                <span className="mb-1 flex items-center gap-1 rounded px-1.5 py-1 font-semibold text-secondary">
                    <IconPlus className="size-3.5" /> New chat
                </span>
                {['Acme churn risk', 'Signup funnel', 'Checkout errors'].map((chat, index) => (
                    <span
                        key={chat}
                        className={cn(
                            'truncate rounded px-1.5 py-1',
                            index === 0 ? 'bg-primary font-semibold' : 'text-secondary'
                        )}
                    >
                        {chat}
                    </span>
                ))}
            </div>
            <div className="flex min-w-0 flex-1 flex-col">
                <ScrollToLatest className="px-3 pt-3">
                    {state.submitted && (
                        <motion.p
                            {...LINE_ENTER}
                            className="m-0 mb-3 ml-auto max-w-[85%] rounded-lg rounded-br-sm bg-accent px-2.5 py-1.5"
                        >
                            {QUESTION}
                        </motion.p>
                    )}
                    {state.calls.length > 0 && (
                        <motion.div {...LINE_ENTER} className="mb-2 overflow-hidden rounded-md border border-primary">
                            <AnimatePresence initial={false}>
                                {state.calls.map(({ call, done }) => (
                                    <motion.div
                                        key={call.id}
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        transition={IOS_SPRING}
                                        className="border-b border-primary last:border-b-0"
                                    >
                                        <div className="flex items-center gap-2 px-2.5 py-1.5">
                                            <SourceIcon source={call.source} className="size-3.5 shrink-0" />
                                            <span className="shrink-0 font-semibold">{call.label}</span>
                                            <span className="min-w-0 flex-1 truncate text-xs text-secondary">
                                                {done && call.result}
                                            </span>
                                            {done ? (
                                                <IconCheck className="size-3.5 shrink-0 text-green" />
                                            ) : (
                                                <IconSpinner className="size-3.5 shrink-0 animate-spin text-secondary" />
                                            )}
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </motion.div>
                    )}
                    {state.answer && (
                        <p className="m-0 mb-2">
                            <InlineCode text={state.answer} codeClassName="rounded bg-accent !px-1" />
                        </p>
                    )}
                </ScrollToLatest>
                <div className="shrink-0 p-3 pt-1">
                    <div className="flex h-[1.4em] items-center gap-1.5 text-xs text-secondary">
                        {state.working && (
                            <>
                                <PostHogMark className="h-2.5 animate-pulse" />
                                Thinking…
                            </>
                        )}
                    </div>
                    <div className="flex items-end gap-2 rounded-md border border-primary bg-white px-2.5 py-2 dark:bg-dark">
                        <span className="min-w-0 flex-1">
                            {state.typed || <span className="text-muted">Ask PostHog anything…</span>}
                            {state.typed && <Caret elapsed={elapsed} className="w-px bg-current" />}
                        </span>
                        <span
                            className={cn(
                                'flex size-6 shrink-0 items-center justify-center rounded-md text-sm font-bold transition-colors',
                                state.typed ? 'bg-[#F54E00] text-white' : 'bg-accent text-muted'
                            )}
                        >
                            ↑
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
)

const THEME_COMPONENTS: Record<AgentTheme, React.ComponentType<{ state: TraceState; elapsed: number }>> = {
    claude: ClaudeTerminal,
    codex: CodexTerminal,
    desktop: DesktopApp,
}

function AgentWindow({ theme, elapsed }: { theme: AgentTheme; elapsed: number }): JSX.Element {
    const Theme = THEME_COMPONENTS[theme]
    return (
        <div className="@container not-prose" aria-hidden="true">
            <Theme state={traceAt(elapsed)} elapsed={elapsed} />
        </div>
    )
}

export default React.memo(AgentWindow)
