import React, { useEffect, useRef, useState } from 'react'
import OSButton from 'components/OSButton'
import usePostHog from 'hooks/usePostHog'
import ballSvg from '@posthog/brand/hoggies/svg/ball'
import rocketSvg from '@posthog/brand/hoggies/svg/rocket'
import { BALLS_PER_GAME, HEIGHT, RANKS, WIDTH, ballInPlunger, createGame, launch, step } from './physics'
import type { Game, Input } from './physics'
import {
    GAP,
    PANEL_WIDTH,
    STRIP_HEIGHT,
    drawPanel,
    drawRocket,
    drawStrip,
    drawTable,
    drawTilted,
    messageOf,
} from './render'
import type { Images } from './render'
import { play, unlockAudio } from './sound'

const STEP = 1 / 480
const HIGH_SCORE_KEY = 'hogball-high-score'
const MUTED_KEY = 'hogball-muted'
const ROCKET_SECONDS = 1.6
const KEYS: Record<string, keyof Input> = {
    z: 'left',
    ArrowLeft: 'left',
    '/': 'right',
    ArrowRight: 'right',
    ' ': 'plunger',
    ArrowDown: 'plunger',
}

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
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const tableRef = useRef<HTMLDivElement>(null)
    const gameRef = useRef<Game>(createGame())
    const inputRef = useRef<Input>({ left: false, right: false, plunger: false })
    const startedRef = useRef(0)
    const bestRef = useRef(0)
    const mutedRef = useRef(false)
    const [status, setStatus] = useState<Status>(() => statusOf(gameRef.current))
    const [muted, setMuted] = useState(false)

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

    const toggleMuted = () => {
        mutedRef.current = !mutedRef.current
        setMuted(mutedRef.current)
        localStorage.setItem(MUTED_KEY, String(mutedRef.current))
    }

    useEffect(() => {
        bestRef.current = Number(localStorage.getItem(HIGH_SCORE_KEY)) || 0
        mutedRef.current = localStorage.getItem(MUTED_KEY) === 'true'
        setMuted(mutedRef.current)
        const images: Images = { ball: image(ballSvg), rocket: image(rocketSvg) }
        const table = document.createElement('canvas')
        let frame = 0
        let last = performance.now()
        let spare = 0
        let rocketAt = -Infinity

        const draw = (now: number) => {
            const canvas = canvasRef.current
            if (!canvas || !canvas.clientWidth || !canvas.clientHeight) return
            const dpr = window.devicePixelRatio || 1
            const width = Math.round(canvas.clientWidth * dpr)
            const height = Math.round(canvas.clientHeight * dpr)
            if (canvas.width !== width || canvas.height !== height) {
                canvas.width = width
                canvas.height = height
            }
            const ctx = canvas.getContext('2d')
            const tableCtx = table.getContext('2d')
            if (!ctx || !tableCtx) return
            const game = gameRef.current
            const wide = width / height > (WIDTH + GAP + PANEL_WIDTH) / HEIGHT - 0.15
            const layoutWidth = wide ? WIDTH + GAP + PANEL_WIDTH : WIDTH
            const layoutHeight = wide ? HEIGHT : STRIP_HEIGHT + GAP + HEIGHT
            const scale = Math.min(width / layoutWidth, height / layoutHeight)
            const left = (width - layoutWidth * scale) / 2
            const top = (height - layoutHeight * scale) / 2
            const tableTop = top + (wide ? 0 : (STRIP_HEIGHT + GAP) * scale)

            if (table.width !== Math.round(WIDTH * scale) || table.height !== Math.round(HEIGHT * scale)) {
                table.width = Math.round(WIDTH * scale)
                table.height = Math.round(HEIGHT * scale)
            }
            tableCtx.setTransform(table.width / WIDTH, 0, 0, table.height / HEIGHT, 0, 0)
            drawTable(tableCtx, game, images, now / 1000)

            ctx.setTransform(1, 0, 0, 1, 0, 0)
            ctx.fillStyle = '#07081a'
            ctx.fillRect(0, 0, width, height)
            drawTilted(ctx, table, left, tableTop, WIDTH * scale, HEIGHT * scale)
            if (wide) {
                ctx.setTransform(scale, 0, 0, scale, left + (WIDTH + GAP) * scale, top)
                drawPanel(ctx, game, bestRef.current, images)
            } else {
                ctx.setTransform(scale, 0, 0, scale, left, top)
                drawStrip(ctx, game)
            }
            ctx.setTransform(1, 0, 0, 1, 0, 0)
            drawRocket(ctx, images, (now - rocketAt) / 1000 / ROCKET_SECONDS, width, height)
        }

        const tick = (now: number) => {
            const game = gameRef.current
            spare = Math.min(spare + (now - last) / 1000, 0.1)
            last = now
            while (spare >= STEP) {
                step(game, inputRef.current, STEP)
                spare -= STEP
            }
            for (const sound of Array.from(new Set(game.sounds))) {
                if (!mutedRef.current) play(sound)
                if (sound === 'rocket') rocketAt = now
            }
            game.sounds.length = 0
            draw(now)
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
        return () => cancelAnimationFrame(frame)
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
            duration_seconds: Math.round((Date.now() - startedRef.current) / 1000),
        })
        startedRef.current = 0
    }, [status.state])

    const hold = (key: keyof Input) => ({
        onPointerDown: (e: React.PointerEvent) => {
            e.preventDefault()
            press(key, true)
        },
        onPointerUp: () => press(key, false),
        onPointerLeave: () => inputRef.current[key] && press(key, false),
        onPointerCancel: () => press(key, false),
    })

    return (
        <div className="flex h-full flex-col gap-2 p-2 pt-10 text-primary @2xl:p-4 @2xl:pt-10">
            <div
                ref={tableRef}
                tabIndex={0}
                aria-label="Hogball table. Hold Space to launch the ball. Use Z and slash, or the arrow keys, for the flippers."
                className="relative min-h-[480px] flex-1 overflow-hidden rounded-md border border-primary outline-none focus-visible:ring-2"
                onKeyDown={(e) => {
                    const key = KEYS[e.key]
                    if (!key) return
                    e.preventDefault()
                    e.stopPropagation()
                    if (!e.repeat) press(key, true)
                }}
                onKeyUp={(e) => {
                    const key = KEYS[e.key]
                    if (!key) return
                    e.preventDefault()
                    e.stopPropagation()
                    press(key, false)
                }}
                onBlur={() => (Object.keys(inputRef.current) as (keyof Input)[]).forEach((key) => press(key, false))}
            >
                <canvas
                    ref={canvasRef}
                    className="absolute inset-0 size-full"
                    style={{ touchAction: 'none' }}
                    onPointerDown={(e) => {
                        e.currentTarget.parentElement?.focus()
                        unlockAudio()
                        const rect = e.currentTarget.getBoundingClientRect()
                        if (ballInPlunger(gameRef.current)) return
                        press(e.clientX - rect.left < rect.width / 2 ? 'left' : 'right', true)
                    }}
                    onPointerUp={() => {
                        press('left', false)
                        press('right', false)
                    }}
                    onPointerCancel={() => {
                        press('left', false)
                        press('right', false)
                    }}
                />
                <span className="sr-only" role="status" aria-live="polite">
                    {status.message}
                </span>
            </div>
            <div className="flex flex-wrap gap-2">
                <OSButton size="sm" variant="primary" onClick={newGame}>
                    New game
                </OSButton>
                <OSButton size="sm" onClick={toggleMuted} aria-pressed={!muted}>
                    {muted ? 'Sound off' : 'Sound on'}
                </OSButton>
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
        </div>
    )
}
