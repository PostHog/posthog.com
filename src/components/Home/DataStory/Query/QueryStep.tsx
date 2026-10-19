import React, { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useInView, Variants } from 'framer-motion'
import { cn } from '../../../../utils'
import Link from 'components/Link'
import { IOS_SPRING } from '../Ingest/session'
import { transform, useEventClock, useLoopingAnimation } from '../timeline'
import AgentWindow, { AGENT_THEMES, AgentTheme } from './AgentWindow'
import { CinematicScale, useStepLayout } from '../layoutMode'
import { TRACE_BOUNDARIES, TRACE_LOOP_MS, TRACE_RESTING_MOMENT } from './trace'

const MCP_BANNER = [
    ' ___        _   _  _             __  __  ___ ___ ',
    '| _ \\___ __| |_| || |___  __ _  |  \\/  |/ __| _ \\',
    '|  _/ _ (_-<  _| __ / _ \\/ _` | | |\\/| | (__|  _/',
    '|_| \\___/__/\\__|_||_\\___/\\__, | |_|  |_|\\___|_|  ',
    '                         |___/                   ',
]
const MINIMIZED_SCALE = 0.06
const MCP_GLIMPSE_MS = 1100
const MCP_DOCS_URL = '/docs/model-context-protocol'

type Transition = 'switch' | 'close' | 'minimize'

interface MotionContext {
    transition: Transition
    dock: { x: number; y: number }
}

const WINDOW_VARIANTS: Variants = {
    hidden: ({ transition, dock }: MotionContext) =>
        transition === 'minimize'
            ? { opacity: 0, transform: transform({ x: dock.x, y: dock.y, scale: MINIMIZED_SCALE }) }
            : { opacity: 0, transform: transform({ y: transition === 'close' ? 10 : 6, scale: 0.97 }) },
    shown: { opacity: 1, transform: transform() },
}

function useLoopCount(elapsed: number): number {
    const [loops, setLoops] = useState(0)
    const previous = useRef(elapsed)
    useEffect(() => {
        if (elapsed < previous.current) setLoops((count) => count + 1)
        previous.current = elapsed
    }, [elapsed])
    return loops
}

const AppWindow = ({
    app,
    onLoop,
    onClose,
    onMinimize,
}: {
    app: AgentTheme
    onLoop: () => void
    onClose: () => void
    onMinimize: () => void
}) => {
    const ref = useRef<HTMLDivElement>(null)
    const elapsed = useEventClock(ref, {
        loopMs: TRACE_LOOP_MS,
        boundaries: TRACE_BOUNDARIES,
        restingMs: TRACE_RESTING_MOMENT,
    })
    const loops = useLoopCount(elapsed)
    useEffect(() => {
        if (loops > 0) onLoop()
    }, [loops])
    return (
        <div ref={ref}>
            <AgentWindow theme={app} elapsed={elapsed} controls={{ onClose, onMinimize }} />
        </div>
    )
}

const FRAME_TITLE = ' ~/your-tool — zsh '
const FRAME_STATUS = ' posthog mcp · ready '
const LABEL_INSET = 2
const MCP_COMMAND = 'npx @posthog/wizard mcp add'
const MCP_COPY_COMMAND = 'npx -y @posthog/wizard@latest mcp add'
const COPIED_MS = 1500
const CURSOR_BLINK: Keyframe[] = [{ opacity: 1 }, { opacity: 0 }]
const CURSOR_BLINK_MS = 1060

const borderWith = (inner: number, label: string, alignEnd: boolean): string => {
    if (label.length + LABEL_INSET * 2 > inner) return '─'.repeat(inner)
    const rest = '─'.repeat(inner - label.length - LABEL_INSET)
    const inset = '─'.repeat(LABEL_INSET)
    return alignEnd ? `${rest}${label}${inset}` : `${inset}${label}${rest}`
}

const WINDOW_CONTROLS = ' ○ ○ ○'
const TITLE_BAR_ROWS = 3
const SCROLL_THUMB_SHARE = 0.3
const SCROLL_THUMB_OFFSET = 1

const titleRow = (inner: number): string => {
    const title = FRAME_TITLE.trim()
    if (inner < WINDOW_CONTROLS.length + title.length + 2) return WINDOW_CONTROLS.padEnd(inner).slice(0, inner)
    const start = Math.floor((inner - title.length) / 2)
    const row = Array.from({ length: inner }, () => ' ')
    WINDOW_CONTROLS.split('').forEach((char, index) => (row[index] = char))
    title.split('').forEach((char, index) => (row[start + index] = char))
    return row.join('')
}

const frameText = (columns: number, rows: number): string => {
    const inner = columns - 2
    const contentRows = Math.max(0, rows - TITLE_BAR_ROWS - 1)
    const thumbLength = Math.max(1, Math.round(contentRows * SCROLL_THUMB_SHARE))
    const body = Array.from({ length: contentRows }, (_, index) => {
        const thumb = index >= SCROLL_THUMB_OFFSET && index < SCROLL_THUMB_OFFSET + thumbLength
        return `│${' '.repeat(inner - 1)}${thumb ? '█' : '░'}│`
    })
    return [
        `┌${'─'.repeat(inner)}┐`,
        `│${titleRow(inner)}│`,
        `├${'─'.repeat(inner)}┤`,
        ...body,
        `└${borderWith(inner, FRAME_STATUS, true)}┘`,
    ].join('\n')
}

const BlinkingCursor = () => {
    const ref = useLoopingAnimation<HTMLSpanElement>(CURSOR_BLINK, {
        duration: CURSOR_BLINK_MS,
        easing: 'steps(2, jump-none)',
    })
    return <span ref={ref} className="ml-1 inline-block h-[1.3em] w-[0.62em] bg-current align-[-0.3em] text-primary" />
}

const CopyCommandLine = () => {
    const [copied, setCopied] = useState(false)
    const copy = () => {
        navigator.clipboard.writeText(MCP_COPY_COMMAND)
        setCopied(true)
        window.setTimeout(() => setCopied(false), COPIED_MS)
    }
    return (
        <button
            type="button"
            onClick={copy}
            title="Copy to clipboard"
            className="group m-0 mt-1 flex w-fit items-center gap-2 text-left font-code text-[11px] text-secondary"
        >
            <span>
                $ <span className="text-primary group-hover:underline">{MCP_COMMAND}</span>
                <BlinkingCursor />
            </span>
            <span className="text-[10px] opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                {copied ? 'copied ✓' : 'click to copy'}
            </span>
        </button>
    )
}

const MIN_FRAME_CELLS = 2

const AsciiFrame = () => {
    const boxRef = useRef<HTMLDivElement>(null)
    const probeRef = useRef<HTMLSpanElement>(null)
    const [frame, setFrame] = useState('')

    useEffect(() => {
        const box = boxRef.current
        const probe = probeRef.current
        if (!box || !probe) return
        const draw = () => {
            const cell = probe.getBoundingClientRect()
            const area = box.getBoundingClientRect()
            if (!cell.width || !cell.height) return
            const columns = Math.floor(area.width / cell.width)
            const rows = Math.floor(area.height / cell.height)
            if (columns < MIN_FRAME_CELLS || rows < MIN_FRAME_CELLS + TITLE_BAR_ROWS) return
            setFrame(frameText(columns, rows))
        }
        draw()
        const resize = new ResizeObserver(draw)
        resize.observe(box)
        return () => resize.disconnect()
    }, [])

    return (
        <div
            ref={boxRef}
            className="pointer-events-none absolute inset-0 flex items-center justify-center font-code text-[12px] leading-normal text-black/35 dark:text-white/35"
            aria-hidden="true"
        >
            <span ref={probeRef} className="invisible absolute">
                ─
            </span>
            <pre className="m-0 !bg-transparent !p-0 !text-[inherit] leading-normal">{frame}</pre>
        </div>
    )
}

const BringYourOwnTool = ({ visible }: { visible: boolean }) => (
    <div
        aria-hidden={!visible}
        className={cn(
            'relative flex h-[clamp(26rem,56cqw,44rem)] flex-col justify-center overflow-hidden px-8 font-code text-[11px] leading-[1.35] text-secondary transition-opacity duration-300',
            visible ? 'opacity-100' : 'pointer-events-none opacity-0'
        )}
    >
        <AsciiFrame />
        <pre className="m-0 !bg-transparent !p-0 text-[11px] font-bold leading-[1.25] text-primary @md:text-[12px]">
            {MCP_BANNER.join('\n')}
        </pre>
        <p className="m-0 mt-5 text-primary">$ Or bring your own tool and use our MCP</p>
        <CopyCommandLine />
        <p className="m-0 mt-4">
            <Link to={MCP_DOCS_URL} state={{ newWindow: true }} className="underline underline-offset-2">
                Read the MCP docs →
            </Link>
        </p>
    </div>
)

const Dock = ({
    open,
    onOpen,
    registerIcon,
}: {
    open: AgentTheme | null
    onOpen: (app: AgentTheme) => void
    registerIcon: (app: AgentTheme, element: HTMLButtonElement | null) => void
}) => (
    <div className="mx-auto mt-4 flex w-fit items-end gap-2 rounded-2xl border border-primary bg-accent px-2.5 pb-1.5 pt-2.5 shadow-lg">
        {AGENT_THEMES.map(({ key, label, Icon }) => (
            <button
                key={key}
                ref={(element) => registerIcon(key, element)}
                type="button"
                aria-label={`Open ${label}`}
                onClick={() => onOpen(key)}
                className="group relative flex flex-col items-center"
            >
                <span className="pointer-events-none absolute bottom-full mb-2 whitespace-nowrap rounded-md bg-primary px-2 py-0.5 text-[11px] font-semibold text-primary opacity-0 shadow-sm transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                    {label}
                </span>
                <span className="block size-10 text-[16px] transition-transform duration-200 ease-out group-hover:-translate-y-1.5 group-hover:scale-110 group-focus-visible:-translate-y-1.5 group-focus-visible:scale-110">
                    <Icon />
                </span>
                <span
                    className={cn(
                        'mt-1 size-1 rounded-full bg-black/60 transition-opacity dark:bg-white/70',
                        open === key ? 'opacity-100' : 'opacity-0'
                    )}
                />
            </button>
        ))}
    </div>
)

const Desktop = ({ onActiveChange }: { onActiveChange: (app: AgentTheme | null) => void }) => {
    const [open, setOpen] = useState<AgentTheme | null>(null)
    const [minimized, setMinimized] = useState(false)
    const [autoplay, setAutoplay] = useState(true)
    const [context, setContext] = useState<MotionContext>({ transition: 'switch', dock: { x: 0, y: 0 } })
    const windowRef = useRef<HTMLDivElement>(null)
    const icons = useRef<Partial<Record<AgentTheme, HTMLButtonElement | null>>>({})

    const offsetToDock = (app: AgentTheme) => {
        const frame = windowRef.current?.getBoundingClientRect()
        const icon = icons.current[app]?.getBoundingClientRect()
        if (!frame || !icon) return { x: 0, y: 0 }
        const scale = frame.width / (windowRef.current?.offsetWidth || frame.width)
        return {
            x: (icon.left + icon.width / 2 - (frame.left + frame.width / 2)) / scale,
            y: (icon.top + icon.height / 2 - (frame.top + frame.height / 2)) / scale,
        }
    }

    const openApp = (app: AgentTheme) => {
        setAutoplay(false)
        const restoring = minimized && open === app
        setContext({ transition: restoring ? 'minimize' : 'switch', dock: offsetToDock(app) })
        setOpen(app)
        setMinimized(false)
    }

    const closeApp = () => {
        setAutoplay(false)
        setContext({ transition: 'close', dock: { x: 0, y: 0 } })
        setOpen(null)
        setMinimized(false)
    }

    const minimizeApp = () => {
        if (!open) return
        setAutoplay(false)
        setContext({ transition: 'minimize', dock: offsetToDock(open) })
        setMinimized(true)
    }

    const advance = () => {
        if (!autoplay) return
        setOpen((current) => {
            const index = AGENT_THEMES.findIndex(({ key }) => key === current)
            return AGENT_THEMES[(index + 1) % AGENT_THEMES.length].key
        })
    }

    const desktopRef = useRef<HTMLDivElement>(null)
    const inView = useInView(desktopRef, { once: true, amount: 0.5 })
    const autoplayRef = useRef(autoplay)
    autoplayRef.current = autoplay

    useEffect(() => {
        if (!inView || !autoplay) return
        const first = AGENT_THEMES[0].key
        const timer = window.setTimeout(() => {
            if (!autoplayRef.current) return
            setContext({ transition: 'minimize', dock: offsetToDock(first) })
            setOpen((current) => current ?? first)
        }, MCP_GLIMPSE_MS)
        return () => window.clearTimeout(timer)
    }, [inView])

    useEffect(() => onActiveChange(open), [open])

    const showing = open !== null && !minimized

    return (
        <div ref={desktopRef} className="not-prose @container">
            <div ref={windowRef} className="grid">
                <div className="[grid-area:1/1]">
                    <BringYourOwnTool visible={!showing} />
                </div>
                <div className={cn('[grid-area:1/1]', !showing && 'pointer-events-none')}>
                    <AnimatePresence initial={false} mode="popLayout" custom={context}>
                        {showing && open && (
                            <motion.div
                                key={open}
                                custom={context}
                                variants={WINDOW_VARIANTS}
                                initial="hidden"
                                animate="shown"
                                exit="hidden"
                                transition={IOS_SPRING}
                            >
                                <AppWindow app={open} onLoop={advance} onClose={closeApp} onMinimize={minimizeApp} />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
            <Dock
                open={open}
                onOpen={openApp}
                registerIcon={(app, element) => {
                    icons.current[app] = element
                }}
            />
        </div>
    )
}

export default function QueryStep({
    index,
    title,
    description,
}: {
    index: number
    title: string
    description: React.ReactNode
}): JSX.Element {
    const [active, setActive] = useState<AgentTheme | null>(null)
    const layout = useStepLayout({
        grid: 'relative mx-auto grid max-w-[58rem] gap-6 @3xl:grid-cols-12 @3xl:items-center @3xl:gap-x-8',
        text: '@3xl:col-span-5',
        visual: '@3xl:col-span-7',
    })
    const app = AGENT_THEMES.find(({ key }) => key === active)
    const external = Boolean(app?.installUrl.startsWith('http'))

    return (
        <div className="@container mt-16">
            <div className={layout.grid}>
                <div className={layout.text}>
                    <h3 className="!mt-0">
                        {index + 1}. {title}
                    </h3>
                    <p>{description}</p>
                    <p className="text-sm">
                        <Link
                            to={app?.installUrl ?? MCP_DOCS_URL}
                            {...(external ? { externalNoIcon: true } : { state: { newWindow: true } })}
                            className="font-semibold underline underline-offset-2"
                        >
                            {app ? `Add PostHog to ${app.label}` : 'Set up the PostHog MCP'} →
                        </Link>
                    </p>
                </div>
                <div className={layout.visual}>
                    <CinematicScale>
                        <Desktop onActiveChange={setActive} />
                    </CinematicScale>
                </div>
            </div>
        </div>
    )
}
