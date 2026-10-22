import React, { useEffect, useRef, useState } from 'react'
import OSButton from 'components/OSButton'
import usePostHog from 'hooks/usePostHog'
import { HedgehogTwoPlayer } from '@posthog/brand/hoggies'
import ballSvg from '@posthog/brand/hoggies/svg/ball'
import {
    BALL_RADIUS,
    BALLS_PER_GAME,
    FLIPPER_RADIUS,
    HEIGHT,
    LANE_X,
    LANE_Y,
    WALLS,
    WIDTH,
    ballInPlunger,
    createGame,
    flipperTip,
    launch,
    step,
} from './physics'
import type { Game, Input } from './physics'

const STEP = 1 / 480
const HIGH_SCORE_KEY = 'hogball-high-score'
const BUMPER_COLORS = ['#F54E00', '#F7A501', '#2F80FA']
const KEYS: Record<string, keyof Input> = {
    z: 'left',
    ArrowLeft: 'left',
    '/': 'right',
    ArrowRight: 'right',
    ' ': 'plunger',
    ArrowDown: 'plunger',
}

type Status = Pick<Game, 'score' | 'multiplier' | 'balls' | 'state' | 'lanes'> & { charge: number }

const statusOf = (game: Game): Status => ({
    score: game.score,
    multiplier: game.multiplier,
    balls: game.balls,
    state: game.state,
    lanes: [...game.lanes],
    charge: Math.round(game.charge * 10),
})

const sameStatus = (a: Status, b: Status) =>
    a.score === b.score &&
    a.multiplier === b.multiplier &&
    a.balls === b.balls &&
    a.state === b.state &&
    a.charge === b.charge &&
    a.lanes.every((lit, i) => lit === b.lanes[i])

export default function Hogball(): JSX.Element {
    const posthog = usePostHog()
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const tableRef = useRef<HTMLDivElement>(null)
    const gameRef = useRef<Game>(createGame())
    const inputRef = useRef<Input>({ left: false, right: false, plunger: false })
    const startedRef = useRef(0)
    const [status, setStatus] = useState<Status>(() => statusOf(gameRef.current))
    const [highScore, setHighScore] = useState(0)

    const newGame = () => {
        gameRef.current = createGame()
        startedRef.current = 0
        setStatus(statusOf(gameRef.current))
        tableRef.current?.focus()
    }

    const press = (key: keyof Input, down: boolean) => {
        const game = gameRef.current
        const released = key === 'plunger' && !down && inputRef.current.plunger
        inputRef.current[key] = down
        if (!released) return
        if (game.state === 'over') return newGame()
        if (game.state === 'ready' && game.balls === BALLS_PER_GAME && !startedRef.current) {
            startedRef.current = Date.now()
            posthog?.capture('hogball_game_started')
        }
        launch(game)
    }

    useEffect(() => {
        setHighScore(Number(localStorage.getItem(HIGH_SCORE_KEY)) || 0)
        const ball = new Image()
        ball.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(ballSvg)}`
        let frame = 0
        let last = performance.now()
        let spare = 0

        const draw = () => {
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
            if (!ctx) return
            const game = gameRef.current
            const color = getComputedStyle(canvas).color
            const scale = Math.min(width / WIDTH, height / HEIGHT)
            ctx.setTransform(1, 0, 0, 1, 0, 0)
            ctx.clearRect(0, 0, width, height)
            ctx.setTransform(scale, 0, 0, scale, (width - WIDTH * scale) / 2, (height - HEIGHT * scale) / 2)
            ctx.lineCap = 'round'
            ctx.lineJoin = 'round'
            ctx.strokeStyle = color
            ctx.fillStyle = color

            ctx.lineWidth = 3
            ctx.beginPath()
            for (const { a, b } of WALLS) {
                ctx.moveTo(a.x, a.y)
                ctx.lineTo(b.x, b.y)
            }
            ctx.stroke()

            ctx.font = 'bold 16px sans-serif'
            ctx.textAlign = 'center'
            ctx.textBaseline = 'middle'
            LANE_X.forEach((x, i) => {
                ctx.globalAlpha = game.lanes[i] ? 1 : 0.25
                ctx.fillText('HOG'[i], x, LANE_Y)
            })
            ctx.globalAlpha = 1

            game.bumpers.forEach((bumper, i) => {
                ctx.fillStyle = BUMPER_COLORS[i % BUMPER_COLORS.length]
                ctx.beginPath()
                ctx.arc(bumper.x, bumper.y, bumper.radius + (bumper.flash ? 3 : 0), 0, Math.PI * 2)
                ctx.fill()
                ctx.stroke()
            })

            ctx.lineWidth = FLIPPER_RADIUS * 2
            ctx.strokeStyle = BUMPER_COLORS[0]
            for (const flipper of game.flippers) {
                const tip = flipperTip(flipper)
                ctx.beginPath()
                ctx.moveTo(flipper.pivot.x, flipper.pivot.y)
                ctx.lineTo(tip.x, tip.y)
                ctx.stroke()
            }

            if (ballInPlunger(game)) {
                ctx.fillStyle = BUMPER_COLORS[1]
                ctx.fillRect(354, 606 - 30 * game.charge, 22, 30 * game.charge + 4)
            }

            const size = BALL_RADIUS * 2.6
            ctx.save()
            ctx.translate(game.ball.x, game.ball.y)
            ctx.rotate(game.ball.angle)
            if (ball.complete && ball.naturalWidth) ctx.drawImage(ball, -size / 2, -size / 2, size, size)
            ctx.restore()

            if (game.state === 'over') {
                ctx.fillStyle = color
                ctx.font = 'bold 28px sans-serif'
                ctx.fillText('Game over', 185, 400)
            }
        }

        const tick = (now: number) => {
            const game = gameRef.current
            spare = Math.min(spare + (now - last) / 1000, 0.1)
            last = now
            while (spare >= STEP) {
                step(game, inputRef.current, STEP)
                spare -= STEP
            }
            draw()
            setStatus((previous) => {
                const next = statusOf(game)
                return sameStatus(previous, next) ? previous : next
            })
            frame = requestAnimationFrame(tick)
        }
        frame = requestAnimationFrame(tick)
        return () => cancelAnimationFrame(frame)
    }, [])

    useEffect(() => {
        if (status.state !== 'over' || !startedRef.current) return
        const best = status.score > highScore
        if (best) {
            setHighScore(status.score)
            localStorage.setItem(HIGH_SCORE_KEY, String(status.score))
        }
        posthog?.capture('hogball_game_ended', {
            score: status.score,
            high_score: best,
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
        <div className="flex h-full flex-col gap-2 p-2 pt-10 text-primary @2xl:flex-row @2xl:p-4 @2xl:pt-10">
            <div className="flex flex-wrap items-start gap-x-4 gap-y-2 @2xl:w-56 @2xl:flex-col">
                <div>
                    <div className="text-xs text-secondary">Score</div>
                    <div className="text-2xl font-bold tabular-nums" role="status" aria-live="polite">
                        {status.score.toLocaleString()}
                    </div>
                </div>
                <div className="flex gap-4 text-sm tabular-nums">
                    <span>
                        Ball <strong>{Math.min(BALLS_PER_GAME, BALLS_PER_GAME - status.balls + 1)}</strong>/
                        {BALLS_PER_GAME}
                    </span>
                    <span>
                        Bonus <strong>{status.multiplier}x</strong>
                    </span>
                    <span>
                        Best <strong>{highScore.toLocaleString()}</strong>
                    </span>
                </div>
                <p className="m-0 hidden text-sm text-secondary @2xl:block">
                    Hold <kbd>Space</kbd> to pull the plunger, then let go. Use <kbd>Z</kbd> and <kbd>/</kbd> (or the
                    arrow keys) for the flippers. Light <strong>H</strong>, <strong>O</strong>, and <strong>G</strong>{' '}
                    to raise the bonus.
                </p>
                <OSButton size="sm" variant="primary" onClick={newGame}>
                    New game
                </OSButton>
                <HedgehogTwoPlayer size={180} className="mt-auto hidden @2xl:block" />
            </div>
            <div
                ref={tableRef}
                tabIndex={0}
                aria-label="Hogball table. Hold Space to launch the ball. Use Z and slash, or the arrow keys, for the flippers."
                className="relative min-h-[480px] flex-1 rounded-md border border-primary bg-accent outline-none focus-visible:ring-2"
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
                    className="absolute inset-0 size-full text-primary"
                    style={{ touchAction: 'none' }}
                    onPointerDown={(e) => {
                        e.currentTarget.parentElement?.focus()
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
