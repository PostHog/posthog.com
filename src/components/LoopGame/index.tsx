import React, { useEffect, useRef, useState } from 'react'
import OSButton from 'components/OSButton'
import { Select } from 'components/RadixUI/Select'
import maxImage from '../../images/max.png'
import {
    buildTrack,
    distance,
    createChallenge,
    DIFFICULTIES,
    FINISH,
    HEIGHT,
    launchRide,
    START,
    stepRide,
    WIDTH,
} from './physics'
import type { Challenge, Difficulty, Point, Ride, TrackPoint } from './physics'

const INSTRUCTIONS = 'Trace the dashed track from START to FINISH in one stroke, then launch Max.'

export default function LoopGame(): JSX.Element {
    const challengeRef = useRef<Challenge | null>(null)
    const [loopCount, setLoopCount] = useState(1)
    const mascotRef = useRef<HTMLImageElement | null>(null)
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const pointsRef = useRef<Point[]>([])
    const trackRef = useRef<TrackPoint[]>([])
    const rideRef = useRef<Ride | null>(null)
    const frameRef = useRef(0)
    const pointerRef = useRef<number | null>(null)
    const [hasTrack, setHasTrack] = useState(false)
    const [running, setRunning] = useState(false)
    const [difficulty, setDifficulty] = useState<Difficulty>('easy')
    const [speed, setSpeed] = useState(380)
    const [message, setMessage] = useState(INSTRUCTIONS)
    const [progress, setProgress] = useState({ percent: 0, loops: 0 })

    const redraw = () => {
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
        const color = getComputedStyle(canvas).color
        ctx.setTransform(width / WIDTH, 0, 0, height / HEIGHT, 0, 0)
        ctx.clearRect(0, 0, WIDTH, HEIGHT)
        ctx.lineCap = 'round'
        ctx.lineJoin = 'round'
        ctx.strokeStyle = color
        ctx.lineWidth = 1
        ctx.globalAlpha = 0.08
        ctx.beginPath()
        for (let x = 20; x < WIDTH; x += 20) {
            ctx.moveTo(x, 20)
            ctx.lineTo(x, 410)
        }
        for (let y = 30; y < HEIGHT; y += 20) {
            ctx.moveTo(20, y)
            ctx.lineTo(580, y)
        }
        ctx.stroke()

        const track = trackRef.current
        const ghost = !pointsRef.current.length && !track.length
        const guide = challengeRef.current?.points || []
        ctx.globalAlpha = 0.4
        ctx.strokeStyle = '#1d4aff'
        ctx.lineWidth = 3
        ctx.setLineDash([5, 7])
        ctx.beginPath()
        guide.forEach((p, i) => (i ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y)))
        ctx.stroke()
        ctx.setLineDash([])
        // Arrows show which way to trace the overlapping entry and exit rails.
        ctx.fillStyle = '#1d4aff'
        for (let i = 25; i < guide.length - 5; i += 60) {
            const p = guide[i],
                next = guide[i + 3]
            ctx.save()
            ctx.translate(p.x, p.y)
            ctx.rotate(Math.atan2(next.y - p.y, next.x - p.x))
            ctx.beginPath()
            ctx.moveTo(5, 0)
            ctx.lineTo(-5, -4)
            ctx.lineTo(-5, 4)
            ctx.closePath()
            ctx.fill()
            ctx.restore()
        }
        const points = track.length ? track : pointsRef.current
        ctx.strokeStyle = color
        ctx.globalAlpha = 0.2
        ctx.beginPath()
        for (let i = 0; i < points.length; i += 20) {
            const p = points[i]
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(p.x, 405)
        }
        ctx.moveTo(20, 405)
        ctx.lineTo(580, 405)
        ctx.stroke()
        ctx.globalAlpha = 1
        ctx.strokeStyle = '#f54e00'
        ctx.lineWidth = 4
        ctx.setLineDash([])
        ctx.beginPath()
        points.forEach((p, i) => (i ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y)))
        ctx.stroke()
        ctx.setLineDash([])
        if (track.length) {
            ctx.strokeStyle = color
            ctx.globalAlpha = 0.5
            ctx.lineWidth = 2
            ctx.beginPath()
            for (let i = 0; i < track.length; i += 4) {
                const p = track[i]
                const nx = Math.sin(p.angle) * 6
                const ny = -Math.cos(p.angle) * 6
                ctx.moveTo(p.x - nx, p.y - ny)
                ctx.lineTo(p.x + nx, p.y + ny)
            }
            ctx.stroke()
        }
        ctx.globalAlpha = 1
        ctx.font = 'bold 12px sans-serif'
        ctx.textAlign = 'center'
        for (const [p, label] of [
            [START, 'START →'],
            [FINISH, 'FINISH'],
        ] as const) {
            ctx.fillStyle = color
            ctx.fillText(label, p.x, p.y + 38)
            ctx.strokeStyle = '#1d4aff'
            ctx.lineWidth = 2
            ctx.beginPath()
            ctx.arc(p.x, p.y, 15, 0, Math.PI * 2)
            ctx.stroke()
        }
        if (ghost) {
            ctx.fillStyle = color
            ctx.font = '14px sans-serif'
            ctx.fillText('Trace the blue guide. Build your own rails.', WIDTH / 2, 45)
        }
        const cart = rideRef.current || { ...START, angle: 0 }
        ctx.save()
        ctx.translate(cart.x, cart.y)
        ctx.rotate(cart.angle)
        const mascot = mascotRef.current
        if (mascot?.complete && mascot.naturalWidth) {
            ctx.drawImage(mascot, -25, -58, 50, (50 * mascot.naturalHeight) / mascot.naturalWidth)
        }
        ctx.fillStyle = '#f54e00'
        ctx.fillRect(-14, -8, 28, 4)
        ctx.fillStyle = color
        for (const x of [-8, 8]) {
            ctx.beginPath()
            ctx.arc(x, -4, 4, 0, Math.PI * 2)
            ctx.fill()
        }
        ctx.restore()
    }

    const stop = () => {
        cancelAnimationFrame(frameRef.current)
        setRunning(false)
    }

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const mascot = new Image()
        mascotRef.current = mascot
        mascot.onload = redraw
        mascot.src = maxImage
        const challenge = createChallenge()
        challengeRef.current = challenge
        setLoopCount(challenge.loops)
        setSpeed(challenge.speed)
        const resize = new ResizeObserver(redraw)
        resize.observe(canvas)
        const theme = new MutationObserver(redraw)
        theme.observe(document.body, { attributes: true, attributeFilter: ['class', 'data-scheme'] })
        redraw()
        return () => {
            mascot.onload = null
            resize.disconnect()
            theme.disconnect()
            cancelAnimationFrame(frameRef.current)
        }
    }, [])

    const launch = (track = trackRef.current) => {
        if (!track.length) return
        stop()
        trackRef.current = track
        rideRef.current = launchRide(track, speed)
        setHasTrack(true)
        setRunning(true)
        setProgress({ percent: 0, loops: 0 })
        setMessage("Hold on. Let's see if your rails hold up.")
        let last = 0
        let lastUpdate = 0
        const tick = (now: number) => {
            let elapsed = last ? Math.min((now - last) / 1000, 0.05) : 0
            last = now
            let ride = rideRef.current
            if (!ride) return
            while (elapsed > 0) {
                const dt = Math.min(elapsed, 1 / 120)
                ride = stepRide(track, ride, dt, difficulty)
                elapsed -= dt
            }
            rideRef.current = ride
            redraw()
            const active = ride.state === 'riding' || ride.state === 'flying'
            if (now - lastUpdate > 100 || !active) {
                setProgress({
                    percent: Math.round((100 * ride.distance) / track[track.length - 1].distance),
                    loops: ride.loops,
                })
                lastUpdate = now
            }
            if (active) frameRef.current = requestAnimationFrame(tick)
            else {
                setRunning(false)
                setMessage(
                    ride.state === 'finished'
                        ? ride.loops >= (challengeRef.current?.loops || 1)
                            ? 'You made it! Max survived the hype wave. Your rails held up.'
                            : `Made it, but this track needs ${challengeRef.current?.loops} complete loops. Follow the whole guide.`
                        : ride.reason
                )
            }
        }
        frameRef.current = requestAnimationFrame(tick)
    }

    const clear = () => {
        stop()
        const pointer = pointerRef.current
        pointerRef.current = null
        if (pointer !== null && canvasRef.current?.hasPointerCapture(pointer))
            canvasRef.current.releasePointerCapture(pointer)
        pointsRef.current = []
        trackRef.current = []
        rideRef.current = null
        setHasTrack(false)
        setProgress({ percent: 0, loops: 0 })
        setMessage(INSTRUCTIONS)
        redraw()
    }

    const toPoint = (e: React.PointerEvent<HTMLCanvasElement>): Point => {
        const canvas = e.currentTarget
        const rect = canvas.getBoundingClientRect()
        return {
            x: Math.max(
                15,
                Math.min(WIDTH - 15, ((e.clientX - rect.left - canvas.clientLeft) / canvas.clientWidth) * WIDTH)
            ),
            y: Math.max(
                30,
                Math.min(HEIGHT - 50, ((e.clientY - rect.top - canvas.clientTop) / canvas.clientHeight) * HEIGHT)
            ),
        }
    }

    const onPointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
        if (!e.isPrimary || e.button !== 0 || pointerRef.current !== null || running) return
        if (distance(toPoint(e), START) > 35) {
            setMessage('Start at the blue circle on the left, then trace the dashed guide to FINISH.')
            return
        }
        clear()
        pointerRef.current = e.pointerId
        e.currentTarget.setPointerCapture(e.pointerId)
        pointsRef.current = [START]
        setMessage('Follow the arrows up and over each loop, then trace the exit to FINISH.')
        redraw()
    }

    const onPointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
        if (pointerRef.current !== e.pointerId) return
        const point = toPoint(e)
        if (distance(point, pointsRef.current[pointsRef.current.length - 1]) >= 2) pointsRef.current.push(point)
        redraw()
    }

    const onPointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
        if (pointerRef.current !== e.pointerId) return
        pointerRef.current = null
        e.currentTarget.releasePointerCapture(e.pointerId)
        const end = toPoint(e)
        pointsRef.current.push(end)
        if (distance(end, FINISH) > 35) {
            setMessage('The track needs to reach FINISH. Start again at the left marker.')
        } else {
            pointsRef.current.push(FINISH)
            trackRef.current = buildTrack(pointsRef.current)
            setHasTrack(trackRef.current.length > 0)
            setMessage('Track ready. Choose your launch speed and send it.')
        }
        redraw()
    }

    const cancel = (e: React.PointerEvent<HTMLCanvasElement>) => {
        if (pointerRef.current === e.pointerId) clear()
    }

    return (
        <div className="not-prose @container my-6 max-w-2xl rounded-md border border-primary bg-accent p-4">
            <div className="mb-3 flex flex-col gap-2 @sm:flex-row @sm:items-baseline @sm:justify-between">
                <div className="text-lg font-bold text-primary">Ride the loop hype wave!</div>
                <span className="text-xs text-secondary">
                    {loopCount === 1 ? 'One loop' : `${loopCount} loops`}. Trace it. Send Max.
                </span>
            </div>
            <canvas
                ref={canvasRef}
                aria-label="Trace the dashed rollercoaster track from the left start marker through each loop to the right finish marker"
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={onPointerUp}
                onPointerCancel={cancel}
                onLostPointerCapture={cancel}
                className="block w-full rounded-md border border-primary bg-primary text-primary"
                style={{ touchAction: 'none', aspectRatio: '4 / 3', cursor: running ? 'default' : 'crosshair' }}
            />
            <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-primary">
                <span>Difficulty</span>
                <Select
                    ariaLabel="Difficulty"
                    value={difficulty}
                    disabled={running}
                    groups={[
                        {
                            label: 'Difficulty',
                            items: Object.entries(DIFFICULTIES).map(([value, setting]) => ({
                                value,
                                label: setting.label,
                            })),
                        },
                    ]}
                    onValueChange={(value) => {
                        const next = value as Difficulty
                        setDifficulty(next)
                        rideRef.current = null
                        setProgress({ percent: 0, loops: 0 })
                        setMessage(hasTrack ? "Ready for another ride. Launch Max when you're ready." : INSTRUCTIONS)
                        redraw()
                    }}
                />
                <span className="text-xs text-secondary">{DIFFICULTIES[difficulty].description}</span>
            </div>
            <div className="mt-4 flex flex-col gap-4 @sm:flex-row @sm:items-center">
                <label className="flex flex-1 flex-col gap-1 text-sm text-primary">
                    <span className="flex justify-between gap-3">
                        <span>Launch speed</span>
                        <span className="tabular-nums">{Math.round(speed / 10)} mph</span>
                    </span>
                    <input
                        type="range"
                        min="160"
                        max="520"
                        step="10"
                        value={speed}
                        disabled={running}
                        onChange={(e) => setSpeed(Number(e.target.value))}
                        className="w-full accent-red"
                    />
                    <span className="flex justify-between text-xs text-secondary">
                        <span>Gentle</span>
                        <span>Questionable</span>
                    </span>
                </label>
                <div className="flex flex-wrap items-center gap-2">
                    <OSButton
                        size="sm"
                        variant="primary"
                        disabled={!hasTrack}
                        onClick={() => {
                            if (running) {
                                stop()
                                setMessage('Ride stopped. Adjust the speed or draw another track.')
                            } else launch()
                        }}
                    >
                        {running ? 'Stop ride' : 'Launch Max'}
                    </OSButton>
                    <OSButton size="sm" onClick={clear}>
                        Clear
                    </OSButton>
                    <OSButton
                        size="sm"
                        onClick={() => {
                            clear()
                            const challenge = createChallenge()
                            challengeRef.current = challenge
                            setLoopCount(challenge.loops)
                            setSpeed(challenge.speed)
                            redraw()
                        }}
                    >
                        New track
                    </OSButton>
                </div>
            </div>
            <div className="mt-3 min-h-[3.5rem] text-sm text-primary" role="status" aria-live="polite">
                {message}
            </div>
            <div className="flex justify-between text-xs text-secondary">
                <span>Track completed: {progress.percent}%</span>
                <span>Loops ridden: {progress.loops}</span>
            </div>
            <div
                className="mt-1 h-1 overflow-hidden rounded bg-primary"
                role="progressbar"
                aria-label="Track completed"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={progress.percent}
            >
                <div className="h-full bg-red" style={{ width: `${progress.percent}%` }} />
            </div>
        </div>
    )
}
