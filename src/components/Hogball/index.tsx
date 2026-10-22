import React, { useEffect, useRef, useState } from 'react'
import OSButton from 'components/OSButton'
import usePostHog from 'hooks/usePostHog'
import ballSvg from '@posthog/brand/hoggies/svg/ball'
import rocketSvg from '@posthog/brand/hoggies/svg/rocket'
import { BALLS_PER_GAME, HEIGHT, RANKS, WIDTH, ballInPlunger, bump, createGame, launch, step } from './physics'
import type { Bump, Game, Input } from './physics'
import { PANEL_WIDTH, STRIP_HEIGHT, drawPanel, drawStrip, messageOf } from './panel'
import { createTable } from './scene'
import type { Table } from './scene'
import { chargeUp, play, stopCharge, unlockAudio } from './sound'
import { cleanInitials, randomPilot } from './pilots'
import type { Leader } from './pilots'

const STEP = 1 / 480
const HIGH_SCORE_KEY = 'hogball-high-score'
const MUTED_KEY = 'hogball-muted'
const PILOT_KEY = 'hogball-pilot'
const INITIALS_KEY = 'hogball-initials'
const LEADERBOARD_SIZE = 10
const LEADERBOARD_URL = '/api/hogball-leaderboard'
const ROCKET_SECONDS = 1.6
// The same keys as the original Windows game
const KEYS: Record<string, keyof Input> = { KeyZ: 'left', Slash: 'right', Space: 'plunger' }
const BUMP_KEYS: Record<string, Bump> = { KeyX: 'left', Period: 'right', ArrowUp: 'up' }
const MOUSE_BUTTONS: Record<number, keyof Input> = { 0: 'left', 2: 'right' }

type Status = { state: Game['state']; charge: number; message: string }

const statusOf = (game: Game): Status => ({
    state: game.state,
    charge: Math.round(game.charge * 10),
    message: messageOf(game),
})

const image = (svg: string) => {
    const element = new Image()
    element.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`
    return element
}

export default function Hogball(): JSX.Element {
    const posthog = usePostHog()
    const tableRef = useRef<HTMLDivElement>(null)
    const sceneRef = useRef<HTMLCanvasElement>(null)
    const panelRef = useRef<HTMLCanvasElement>(null)
    const gameRef = useRef<Game>(createGame())
    const inputRef = useRef<Input>({ left: false, right: false, plunger: false })
    const touchesRef = useRef(new Map<number, keyof Input>())
    const lastTouchRef = useRef(0)
    const startedRef = useRef(0)
    const bestRef = useRef(0)
    const mutedRef = useRef(false)
    const [status, setStatus] = useState<Status>(() => statusOf(gameRef.current))
    const [muted, setMuted] = useState(false)
    const pilotRef = useRef('')
    const leadersRef = useRef<Leader[]>([])
    const [pilot, setPilot] = useState('')
    const [leaders, setLeaders] = useState<Leader[]>([])
    const entryRef = useRef<HTMLFormElement>(null)
    const [entry, setEntry] = useState<number | null>(null)
    const [initials, setInitials] = useState('')

    const showLeaders = (next: Leader[]) => {
        leadersRef.current = next
        setLeaders(next)
    }

    // A new score takes a minute to reach the leaderboard, so show it at once as a pending row
    const loadLeaders = (pending?: Leader) =>
        fetch(LEADERBOARD_URL)
            .then((response) => (response.ok ? response.json() : null))
            .then((data: { leaders?: Leader[] } | null) => {
                const list = data?.leaders || []
                const known =
                    pending &&
                    list.some(
                        (l) => l.initials === pending.initials && l.name === pending.name && l.score >= pending.score
                    )
                const next = pending && !known ? [...list, pending].sort((a, b) => b.score - a.score) : list
                showLeaders(next.slice(0, LEADERBOARD_SIZE))
            })
            .catch(() => undefined)

    const changePilot = () => {
        pilotRef.current = randomPilot()
        setPilot(pilotRef.current)
        localStorage.setItem(PILOT_KEY, pilotRef.current)
        tableRef.current?.focus()
    }

    const newGame = () => {
        gameRef.current = createGame()
        startedRef.current = 0
        setStatus(statusOf(gameRef.current))
        tableRef.current?.focus()
    }

    const press = (key: keyof Input, down: boolean) => {
        unlockAudio()
        const game = gameRef.current
        const released = key === 'plunger' && !down && inputRef.current.plunger
        if (key !== 'plunger' && down && !inputRef.current[key] && !mutedRef.current) play('flipper')
        inputRef.current[key] = down
        if (!released) return
        if (game.state === 'over') return newGame()
        if (game.state === 'ready' && game.balls === BALLS_PER_GAME && !startedRef.current) {
            startedRef.current = Date.now()
            posthog?.capture('hogball_game_started')
        }
        launch(game)
    }

    const releaseAll = () => (Object.keys(inputRef.current) as (keyof Input)[]).forEach((key) => press(key, false))

    const toggleMuted = () => {
        mutedRef.current = !mutedRef.current
        setMuted(mutedRef.current)
        localStorage.setItem(MUTED_KEY, String(mutedRef.current))
    }

    useEffect(() => {
        const container = tableRef.current
        const sceneCanvas = sceneRef.current
        const panelCanvas = panelRef.current
        if (!container || !sceneCanvas || !panelCanvas) return
        bestRef.current = Number(localStorage.getItem(HIGH_SCORE_KEY)) || 0
        mutedRef.current = localStorage.getItem(MUTED_KEY) === 'true'
        setMuted(mutedRef.current)
        pilotRef.current = localStorage.getItem(PILOT_KEY) || randomPilot()
        localStorage.setItem(PILOT_KEY, pilotRef.current)
        setPilot(pilotRef.current)
        loadLeaders()
        const images = { ball: image(ballSvg), rocket: image(rocketSvg) }
        let table: Table
        try {
            table = createTable(sceneCanvas, images)
        } catch (error) {
            setStatus((previous) => ({ ...previous, message: 'Hogball needs WebGL, which this browser does not have' }))
            return
        }
        let wide = true
        let frame = 0
        let last = performance.now()
        let spare = 0
        let rocketAt = -Infinity

        // The panel goes to the right of the table in a wide window, and above it in a narrow one
        const layout = () => {
            const width = container.clientWidth
            const height = container.clientHeight
            const dpr = window.devicePixelRatio || 1
            wide = width / height > 0.95
            const panelWidth = wide ? Math.min(width * 0.38, (height * PANEL_WIDTH) / HEIGHT) : width
            const panelHeight = wide ? (panelWidth * HEIGHT) / PANEL_WIDTH : (width * STRIP_HEIGHT) / WIDTH
            const sceneWidth = wide ? width - panelWidth : width
            const sceneHeight = wide ? height : height - panelHeight
            Object.assign(sceneCanvas.style, {
                left: '0px',
                top: wide ? '0px' : `${panelHeight}px`,
                width: `${sceneWidth}px`,
                height: `${sceneHeight}px`,
            })
            Object.assign(panelCanvas.style, {
                left: wide ? `${sceneWidth}px` : '0px',
                top: wide ? `${(height - panelHeight) / 2}px` : '0px',
                width: `${panelWidth}px`,
                height: `${panelHeight}px`,
            })
            panelCanvas.width = Math.round(panelWidth * dpr)
            panelCanvas.height = Math.round(panelHeight * dpr)
            if (sceneWidth > 0 && sceneHeight > 0) table.resize(sceneWidth, sceneHeight, dpr)
        }
        layout()
        const observer = new ResizeObserver(layout)
        observer.observe(container)

        const tick = (now: number) => {
            const game = gameRef.current
            spare = Math.min(spare + (now - last) / 1000, 0.1)
            last = now
            while (spare >= STEP) {
                step(game, inputRef.current, STEP)
                spare -= STEP
            }
            const charging = inputRef.current.plunger && ballInPlunger(game) && game.state !== 'over'
            if (charging && !mutedRef.current) chargeUp(game.charge)
            else stopCharge()
            for (const sound of Array.from(new Set(game.sounds))) {
                if (!mutedRef.current) play(sound)
                if (sound === 'rocket') rocketAt = now
            }
            game.sounds.length = 0

            table.render(game, now / 1000, (now - rocketAt) / 1000 / ROCKET_SECONDS)
            const panel = panelCanvas.getContext('2d')
            if (panel) {
                panel.setTransform(1, 0, 0, 1, 0, 0)
                panel.clearRect(0, 0, panelCanvas.width, panelCanvas.height)
                if (wide) {
                    const scale = panelCanvas.width / PANEL_WIDTH
                    panel.setTransform(scale, 0, 0, scale, 0, 0)
                    drawPanel(panel, game, bestRef.current, images.rocket, pilotRef.current, leadersRef.current)
                } else {
                    const scale = panelCanvas.width / WIDTH
                    panel.setTransform(scale, 0, 0, scale, 0, 0)
                    drawStrip(panel, game, pilotRef.current)
                }
            }
            setStatus((previous) => {
                const next = statusOf(game)
                return previous.state === next.state &&
                    previous.charge === next.charge &&
                    previous.message === next.message
                    ? previous
                    : next
            })
            frame = requestAnimationFrame(tick)
        }
        frame = requestAnimationFrame(tick)

        const releaseMouse = (e: MouseEvent) => {
            const key = MOUSE_BUTTONS[e.button]
            if (key) press(key, false)
        }
        window.addEventListener('mouseup', releaseMouse)
        return () => {
            cancelAnimationFrame(frame)
            observer.disconnect()
            window.removeEventListener('mouseup', releaseMouse)
            stopCharge()
            table.dispose()
        }
    }, [])

    useEffect(() => {
        const game = gameRef.current
        if (status.state !== 'over' || !startedRef.current) return
        const best = game.score > bestRef.current
        if (best) {
            bestRef.current = game.score
            localStorage.setItem(HIGH_SCORE_KEY, String(game.score))
        }
        posthog?.capture('hogball_game_ended', {
            score: game.score,
            high_score: best,
            rockets: game.rockets,
            rank: RANKS[game.rank],
            player_name: pilotRef.current,
            duration_seconds: Math.round((Date.now() - startedRef.current) / 1000),
        })
        startedRef.current = 0
        const board = leadersRef.current
        if (game.score > 0 && (board.length < LEADERBOARD_SIZE || game.score > board[board.length - 1].score)) {
            setInitials(localStorage.getItem(INITIALS_KEY) || '')
            setEntry(game.score)
        }
    }, [status.state])

    // A score that makes the all-time top 10 asks for the player's initials, like an arcade machine
    const submitInitials = (e: React.FormEvent) => {
        e.preventDefault()
        if (entry === null || initials.length !== 3) return
        posthog?.capture('hogball_score_submitted', {
            score: entry,
            player_initials: initials,
            player_name: pilotRef.current,
        })
        localStorage.setItem(INITIALS_KEY, initials)
        loadLeaders({ initials, name: pilotRef.current, score: entry, pending: true })
        setEntry(null)
        tableRef.current?.focus()
    }

    const inEntry = (target: EventTarget) => !!entryRef.current?.contains(target as Node)

    const hold = (key: keyof Input) => ({
        onPointerDown: (e: React.PointerEvent) => {
            e.preventDefault()
            press(key, true)
        },
        onPointerUp: () => press(key, false),
        onPointerLeave: () => inputRef.current[key] && press(key, false),
        onPointerCancel: () => press(key, false),
    })

    const releaseTouch = (e: React.PointerEvent) => {
        const key = touchesRef.current.get(e.pointerId)
        if (!key) return
        touchesRef.current.delete(e.pointerId)
        press(key, false)
    }

    return (
        <div className="flex h-full flex-col gap-2 p-2 pt-10 text-primary @2xl:p-4 @2xl:pt-10">
            <div
                ref={tableRef}
                tabIndex={0}
                aria-label="Hogball table. Hold Space to pull the plunger. Z and slash, or the left and right mouse buttons, move the flippers. X, period, and the up arrow bump the table. F2 starts a new game."
                className="relative min-h-[480px] flex-1 select-none overflow-hidden rounded-md border border-primary outline-none focus-visible:ring-2"
                style={{ touchAction: 'none', backgroundColor: '#07081a' }}
                onKeyDown={(e) => {
                    if (inEntry(e.target)) return
                    const key = KEYS[e.nativeEvent.code]
                    const direction = BUMP_KEYS[e.nativeEvent.code]
                    if (!key && !direction && e.nativeEvent.code !== 'F2') return
                    e.preventDefault()
                    e.stopPropagation()
                    if (e.repeat) return
                    unlockAudio()
                    if (key) press(key, true)
                    if (direction) bump(gameRef.current, direction)
                    if (e.nativeEvent.code === 'F2') newGame()
                }}
                onKeyUp={(e) => {
                    if (inEntry(e.target)) return
                    const key = KEYS[e.nativeEvent.code]
                    if (!key) return
                    e.preventDefault()
                    e.stopPropagation()
                    press(key, false)
                }}
                onMouseDown={(e) => {
                    if (inEntry(e.target)) return
                    const key = MOUSE_BUTTONS[e.button]
                    tableRef.current?.focus()
                    if (!key || Date.now() - lastTouchRef.current < 800) return
                    e.preventDefault()
                    press(key, true)
                }}
                onContextMenu={(e) => e.preventDefault()}
                onPointerDown={(e) => {
                    if (e.pointerType === 'mouse' || inEntry(e.target)) return
                    lastTouchRef.current = Date.now()
                    tableRef.current?.focus()
                    if (ballInPlunger(gameRef.current)) return
                    const rect = e.currentTarget.getBoundingClientRect()
                    const key = e.clientX - rect.left < rect.width / 2 ? 'left' : 'right'
                    touchesRef.current.set(e.pointerId, key)
                    press(key, true)
                }}
                onPointerUp={releaseTouch}
                onPointerCancel={releaseTouch}
                onBlur={releaseAll}
            >
                <canvas ref={sceneRef} className="absolute" />
                <canvas ref={panelRef} className="absolute" />
                {entry !== null && (
                    <form
                        ref={entryRef}
                        onSubmit={submitInitials}
                        className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2 rounded-md border-2 border-yellow p-4 text-center text-yellow"
                        style={{ backgroundColor: '#05060a', fontFamily: '"Courier New", monospace' }}
                    >
                        <div className="text-xl font-bold">NEW HIGH SCORE!</div>
                        <div className="text-lg tabular-nums">{entry.toLocaleString('en-US')}</div>
                        <label htmlFor="hogball-initials" className="text-sm">
                            ENTER YOUR INITIALS
                        </label>
                        <input
                            id="hogball-initials"
                            autoFocus
                            autoComplete="off"
                            value={initials}
                            onChange={(e) => setInitials(cleanInitials(e.target.value))}
                            onKeyDown={(e) => e.key === 'Escape' && setEntry(null)}
                            maxLength={3}
                            className="w-28 border-b-2 border-yellow bg-transparent text-center text-3xl font-bold uppercase tracking-[0.4em] text-yellow outline-none"
                            aria-describedby="hogball-initials-help"
                        />
                        <div id="hogball-initials-help" className="text-xs">
                            Three letters, then Enter. Esc to skip.
                        </div>
                        <OSButton size="sm" variant="primary" type="submit" disabled={initials.length !== 3}>
                            Save to leaderboard
                        </OSButton>
                    </form>
                )}
                <span className="sr-only" role="status" aria-live="polite">
                    {status.message}
                </span>
            </div>
            <div className="flex flex-wrap gap-2">
                <OSButton size="sm" variant="primary" onClick={newGame}>
                    New game (F2)
                </OSButton>
                <OSButton size="sm" onClick={toggleMuted} aria-pressed={!muted}>
                    {muted ? 'Sound off' : 'Sound on'}
                </OSButton>
                <OSButton size="sm" onClick={changePilot} disabled={status.state === 'playing'}>
                    New pilot name
                </OSButton>
                {pilot && <span className="self-center text-sm text-secondary">Pilot: {pilot}</span>}
            </div>
            <div className="grid grid-cols-3 gap-2 @2xl:hidden">
                <OSButton size="md" width="full" {...hold('left')}>
                    Left
                </OSButton>
                <OSButton size="md" width="full" variant="primary" {...hold('plunger')}>
                    {status.charge ? `Launch ${status.charge * 10}%` : 'Launch'}
                </OSButton>
                <OSButton size="md" width="full" {...hold('right')}>
                    Right
                </OSButton>
            </div>
            {leaders.length > 0 && (
                <div className="@2xl:hidden">
                    <div className="text-sm font-bold">All-time top pilots</div>
                    <ol className="m-0 pl-5 text-sm">
                        {leaders.map((leader, i) => (
                            <li key={`${leader.name}-${i}`} className={leader.name === pilot ? 'font-bold' : ''}>
                                {leader.initials} {leader.name} – {leader.score.toLocaleString('en-US')}
                            </li>
                        ))}
                    </ol>
                </div>
            )}
        </div>
    )
}
