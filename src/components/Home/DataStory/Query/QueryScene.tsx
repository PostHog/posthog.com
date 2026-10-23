import React, { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useInView, Variants } from 'framer-motion'
import { cn } from '../../../../utils'
import Link from 'components/Link'
import { IOS_SPRING, transform, useEventClock } from '../timeline'
import AgentWindow, { AGENT_THEMES, AgentTheme, Caret, traceFor } from './AgentWindow'
import { WINDOW_DRAG, WINDOW_HEIGHT } from '../sceneParts'
import { buildWizardCommand } from '../../../PlatformInstall/buildCommand'
import { SCENE_SIZE, SCENE_TEXT } from '../sceneScale'

const MCP_BANNER = [
    ' ___        _   _  _             __  __  ___ ___ ',
    '| _ \\___ __| |_| || |___  __ _  |  \\/  |/ __| _ \\',
    '|  _/ _ (_-<  _| __ / _ \\/ _` | | |\\/| | (__|  _/',
    '|_| \\___/__/\\__|_||_\\___/\\__, | |_|  |_|\\___|_|  ',
    '                         |___/                   ',
]
const HEDGEHOG_FACE = [
    '',
    '',
    '  .-.          .-.',
    " ( (_`--------'_) )",
    '  \\              /',
    '   |  __    __  |',
    '   |  o      o  |',
    '   |    .--.    |',
    '  mm   ( \\/ )   mm',
]
const HEDGEHOG_QUILLS = [
    '          /\\/\\/\\/\\/\\',
    '      /\\/\\ - - - - - /\\',
    '     /\\- - - -     - - -\\',
    '                     - -\\',
    '                    - - - \\',
    '                   - - - /',
    '                  - - - - \\',
    '                   - - - /',
    '                    - - - \\',
]
const PINNED_IN_PLACE = { top: 0, right: 0, bottom: 0, left: 0 }
const MINIMIZED_SCALE = 0.06
const MCP_GLIMPSE_MS = 450
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

const AppWindow = ({
    app,
    onLoop,
    onClose,
    onMinimize,
    onDragging,
}: {
    app: AgentTheme
    onLoop: () => void
    onClose: () => void
    onMinimize: () => void
    onDragging: (dragging: boolean) => void
}) => {
    const ref = useRef<HTMLDivElement>(null)
    const { loopMs, boundaries, restingMs } = traceFor(app)
    const elapsed = useEventClock(ref, { loopMs, boundaries, restingMs })
    const previousElapsed = useRef(elapsed)
    useEffect(() => {
        if (elapsed < previousElapsed.current) onLoop()
        previousElapsed.current = elapsed
    }, [elapsed])
    return (
        <motion.div
            ref={ref}
            {...WINDOW_DRAG}
            dragConstraints={PINNED_IN_PLACE}
            onDragStart={() => onDragging(true)}
            onDragTransitionEnd={() => onDragging(false)}
        >
            <AgentWindow theme={app} elapsed={elapsed} controls={{ onClose, onMinimize }} />
        </motion.div>
    )
}

const FRAME_TITLE = ' ~/your-tool — zsh '
const FRAME_STATUS = ' posthog mcp · ready '
const LABEL_INSET = 2
const { displayCommand: MCP_COMMAND, copyCommand: MCP_COPY_COMMAND } = buildWizardCommand({ subcommand: 'mcp add' })
const COPIED_MS = 1500

const statusBorder = (inner: number): string => {
    if (FRAME_STATUS.length + LABEL_INSET * 2 > inner) return '─'.repeat(inner)
    return `${'─'.repeat(inner - FRAME_STATUS.length - LABEL_INSET)}${FRAME_STATUS}${'─'.repeat(LABEL_INSET)}`
}

const WINDOW_CONTROLS = ' ○ ○ ○'
const TITLE_BAR_ROWS = 3
const SCROLL_THUMB_SHARE = 0.3
const SCROLL_THUMB_OFFSET = 1
const HEDGEHOG_MIN_COLUMNS = 88
const HEDGEHOG_SCROLLBAR_GAP = 3

const titleRow = (inner: number): string => {
    const title = FRAME_TITLE.trim()
    if (inner < WINDOW_CONTROLS.length + title.length + 2) return WINDOW_CONTROLS.padEnd(inner).slice(0, inner)
    const start = Math.floor((inner - title.length) / 2)
    const row = Array.from({ length: inner }, () => ' ')
    WINDOW_CONTROLS.split('').forEach((char, index) => (row[index] = char))
    title.split('').forEach((char, index) => (row[start + index] = char))
    return row.join('')
}

type HedgehogLayer = 'face' | 'quills'

const HEDGEHOG_LAYER_CLASSES: Record<HedgehogLayer, string> = { face: 'text-secondary', quills: 'text-secondary/60' }
type HedgehogRun = { layer: HedgehogLayer; text: string }

const HEDGEHOG_WIDTH = Math.max(...HEDGEHOG_QUILLS.map((line) => line.length))

const hedgehogRuns = (row: number): HedgehogRun[] => {
    const face = HEDGEHOG_FACE[row].padEnd(HEDGEHOG_WIDTH)
    const quills = HEDGEHOG_QUILLS[row].padEnd(HEDGEHOG_WIDTH)
    return face.split('').reduce<HedgehogRun[]>((runs, char, column) => {
        const layer: HedgehogLayer = char === ' ' ? 'quills' : 'face'
        const glyph = layer === 'face' ? char : quills[column]
        const last = runs[runs.length - 1]
        if (last?.layer === layer) last.text += glyph
        else runs.push({ layer, text: glyph })
        return runs
    }, [])
}

const HEDGEHOG_RUNS = HEDGEHOG_FACE.map((_, row) => hedgehogRuns(row))

interface Frame {
    rows: string[]
    hedgehog: { column: number; firstRow: number } | null
}

const placeHedgehog = (columns: number, contentRows: number): Frame['hedgehog'] => {
    if (columns < HEDGEHOG_MIN_COLUMNS || contentRows < HEDGEHOG_RUNS.length) return null
    return {
        column: columns - 2 - HEDGEHOG_SCROLLBAR_GAP - HEDGEHOG_WIDTH,
        firstRow: TITLE_BAR_ROWS + contentRows - HEDGEHOG_RUNS.length,
    }
}

const frameAt = (columns: number, rows: number): Frame => {
    const inner = columns - 2
    const contentRows = Math.max(0, rows - TITLE_BAR_ROWS - 1)
    const thumbLength = Math.max(1, Math.round(contentRows * SCROLL_THUMB_SHARE))
    const body = Array.from({ length: contentRows }, (_, index) => {
        const thumb = index >= SCROLL_THUMB_OFFSET && index < SCROLL_THUMB_OFFSET + thumbLength
        return `│${' '.repeat(inner - 1)}${thumb ? '█' : '░'}│`
    })
    return {
        rows: [
            `┌${'─'.repeat(inner)}┐`,
            `│${titleRow(inner)}│`,
            `├${'─'.repeat(inner)}┤`,
            ...body,
            `└${statusBorder(inner)}┘`,
        ],
        hedgehog: placeHedgehog(columns, contentRows),
    }
}

const FrameRow = ({ row, index, hedgehog }: { row: string; index: number; hedgehog: Frame['hedgehog'] }) => {
    const runs = hedgehog && HEDGEHOG_RUNS[index - hedgehog.firstRow]
    if (!hedgehog || !runs) return <>{row}</>
    return (
        <>
            {row.slice(0, hedgehog.column)}
            {runs.map(({ layer, text }, run) => (
                <span key={run} className={HEDGEHOG_LAYER_CLASSES[layer]}>
                    {text}
                </span>
            ))}
            {row.slice(hedgehog.column + HEDGEHOG_WIDTH)}
        </>
    )
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
            className={cn(
                SCENE_TEXT[11],
                'group m-0 mt-1 flex w-fit items-center gap-2 text-left font-code text-secondary'
            )}
        >
            <span>
                $ <span className="text-primary group-hover:underline">{MCP_COMMAND}</span>
                <Caret className="ml-1 h-[1.3em] w-[0.62em] bg-current align-[-0.3em] text-primary" />
            </span>
            <span
                className={cn(
                    SCENE_TEXT[10],
                    'opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100'
                )}
            >
                {copied ? 'copied ✓' : 'click to copy'}
            </span>
        </button>
    )
}

const MIN_FRAME_CELLS = 2

const AsciiFrame = () => {
    const boxRef = useRef<HTMLDivElement>(null)
    const probeRef = useRef<HTMLSpanElement>(null)
    const [frame, setFrame] = useState<Frame | null>(null)

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
            setFrame(frameAt(columns, rows))
        }
        draw()
        const resize = new ResizeObserver(draw)
        resize.observe(box)
        return () => resize.disconnect()
    }, [])

    return (
        <div
            ref={boxRef}
            className={cn(
                SCENE_TEXT[12],
                'pointer-events-none absolute inset-0 flex items-center justify-center font-code leading-normal text-black/35 dark:text-white/35'
            )}
            aria-hidden="true"
        >
            <span ref={probeRef} className="invisible absolute">
                ─
            </span>
            <pre className="m-0 !bg-transparent !p-0 !text-[inherit] leading-normal">
                {frame?.rows.map((row, index) => (
                    <React.Fragment key={index}>
                        {index > 0 && '\n'}
                        <FrameRow row={row} index={index} hedgehog={frame.hedgehog} />
                    </React.Fragment>
                ))}
            </pre>
        </div>
    )
}

const BringYourOwnTool = ({ covered, peeking }: { covered: boolean; peeking: boolean }) => (
    <div
        aria-hidden={covered}
        className={cn(
            SCENE_TEXT[11],
            'relative flex flex-col justify-center overflow-hidden px-8 font-code leading-[1.35] text-secondary transition-opacity duration-200',
            WINDOW_HEIGHT,
            covered && 'pointer-events-none',
            covered && !peeking && 'opacity-0'
        )}
    >
        <AsciiFrame />
        <pre className="m-0 !bg-transparent !p-0 text-[length:min(13.5px,calc((100cqi_-_4rem)/30))] font-bold leading-[1.25] text-primary">
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
                <span
                    className={cn(
                        SCENE_TEXT[11],
                        'pointer-events-none absolute bottom-full mb-2 whitespace-nowrap rounded-md bg-primary px-2 py-0.5 font-semibold text-primary opacity-0 shadow-sm transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100'
                    )}
                >
                    {label}
                </span>
                <span
                    className={cn(
                        SCENE_TEXT[16],
                        SCENE_SIZE[40],
                        'block transition-transform duration-200 ease-out group-hover:-translate-y-1.5 group-hover:scale-110 group-focus-visible:-translate-y-1.5 group-focus-visible:scale-110'
                    )}
                >
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

const QueryScene = () => {
    const [open, setOpen] = useState<AgentTheme | null>(null)
    const [minimized, setMinimized] = useState(false)
    const [dragging, setDragging] = useState(false)
    const [autoplay, setAutoplay] = useState(true)
    const [context, setContext] = useState<MotionContext>({ transition: 'switch', dock: { x: 0, y: 0 } })
    const windowRef = useRef<HTMLDivElement>(null)
    const icons = useRef<Partial<Record<AgentTheme, HTMLButtonElement | null>>>({})

    const offsetToDock = (app: AgentTheme) => {
        const frame = windowRef.current?.getBoundingClientRect()
        const icon = icons.current[app]?.getBoundingClientRect()
        if (!frame || !icon) return { x: 0, y: 0 }
        return {
            x: icon.left + icon.width / 2 - (frame.left + frame.width / 2),
            y: icon.top + icon.height / 2 - (frame.top + frame.height / 2),
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

    useEffect(() => {
        if (!inView || !autoplay) return
        const first = AGENT_THEMES[0].key
        const timer = window.setTimeout(() => {
            setContext({ transition: 'minimize', dock: offsetToDock(first) })
            setOpen((current) => current ?? first)
        }, MCP_GLIMPSE_MS)
        return () => window.clearTimeout(timer)
    }, [inView, autoplay])

    useEffect(() => setDragging(false), [open, minimized])

    const showing = open !== null && !minimized

    return (
        <div ref={desktopRef} className="not-prose @container">
            <div ref={windowRef} className="grid grid-cols-[minmax(0,1fr)]">
                <div className="[grid-area:1/1]">
                    <BringYourOwnTool covered={showing} peeking={dragging} />
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
                                <AppWindow
                                    app={open}
                                    onLoop={advance}
                                    onClose={closeApp}
                                    onMinimize={minimizeApp}
                                    onDragging={setDragging}
                                />
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

export default QueryScene
