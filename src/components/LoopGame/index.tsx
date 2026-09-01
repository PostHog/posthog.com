import React, { useRef, useState } from 'react'

type Point = { x: number; y: number }

type Result = {
    score: number
    verdict: string
}

const TWO_PI = Math.PI * 2

function clamp(n: number, min: number, max: number): number {
    return Math.min(max, Math.max(min, n))
}

function scoreLoop(pts: Point[]): Result {
    if (pts.length < 20) {
        return { score: 0, verdict: "That's a click. A loop needs commitment." }
    }

    const cx = pts.reduce((s, p) => s + p.x, 0) / pts.length
    const cy = pts.reduce((s, p) => s + p.y, 0) / pts.length
    const radii = pts.map((p) => Math.hypot(p.x - cx, p.y - cy))
    const meanR = radii.reduce((s, r) => s + r, 0) / radii.length

    if (meanR < 20) {
        return { score: 0, verdict: "Too small. Don't be shy - loops want to be seen." }
    }

    // How far, in total, the stroke sweeps around the centroid
    let swept = 0
    let prev = Math.atan2(pts[0].y - cy, pts[0].x - cx)
    for (let i = 1; i < pts.length; i++) {
        const a = Math.atan2(pts[i].y - cy, pts[i].x - cx)
        let d = a - prev
        if (d > Math.PI) d -= TWO_PI
        if (d < -Math.PI) d += TWO_PI
        swept += d
        prev = a
    }
    const laps = Math.abs(swept) / TWO_PI

    if (laps < 0.72) {
        return { score: Math.round(laps * 40), verdict: 'An arc. Arcs are just loops that gave up.' }
    }
    if (laps > 1.6) {
        return { score: 5, verdict: "You've drawn while(true). Impressive, but someone has to stop you." }
    }

    const rmsDev = Math.sqrt(radii.reduce((s, r) => s + (r - meanR) ** 2, 0) / radii.length) / meanR
    const circularity = clamp(1 - rmsDev * 2.4, 0, 1)

    const closureDist = Math.hypot(pts[0].x - pts[pts.length - 1].x, pts[0].y - pts[pts.length - 1].y) / meanR
    const closure = clamp(1 - closureDist / 1.1, 0, 1)
    const coverage = clamp(laps / 0.97, 0, 1)

    const score = Math.round(100 * circularity * (0.55 + 0.45 * closure) * coverage)

    let verdict: string
    if (closureDist > 0.6 && score < 80) verdict = 'An open loop. In this house we close our loops.'
    else if (score >= 97) verdict = 'Suspiciously perfect. Are you an agent?'
    else if (score >= 90) verdict = 'A real loop. Hamel can rest.'
    else if (score >= 75) verdict = 'Loop-shaped. Ship it.'
    else if (score >= 50) verdict = 'Technically a loop, the way a potato is technically round.'
    else if (score >= 25) verdict = "That's... a graph, actually. Nodes and everything."
    else verdict = 'Congratulations: you drew a graph. The meme wins again.'

    return { score, verdict }
}

export default function LoopGame(): JSX.Element {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const pointsRef = useRef<Point[]>([])
    const drawingRef = useRef(false)
    const [result, setResult] = useState<Result | null>(null)
    const [best, setBest] = useState(0)

    const getCtx = () => {
        const canvas = canvasRef.current
        if (!canvas) return null
        const rect = canvas.getBoundingClientRect()
        const dpr = window.devicePixelRatio || 1
        if (canvas.width !== Math.round(rect.width * dpr)) {
            canvas.width = Math.round(rect.width * dpr)
            canvas.height = Math.round(rect.height * dpr)
        }
        const ctx = canvas.getContext('2d')
        if (!ctx) return null
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
        return ctx
    }

    const toPoint = (e: React.PointerEvent<HTMLCanvasElement>): Point => {
        const rect = e.currentTarget.getBoundingClientRect()
        return { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }

    const drawPath = (ctx: CanvasRenderingContext2D) => {
        const canvas = canvasRef.current
        if (!canvas) return
        const rect = canvas.getBoundingClientRect()
        ctx.clearRect(0, 0, rect.width, rect.height)
        const pts = pointsRef.current
        if (pts.length < 2) return
        ctx.beginPath()
        ctx.moveTo(pts[0].x, pts[0].y)
        for (const p of pts) ctx.lineTo(p.x, p.y)
        ctx.strokeStyle = '#f54e00'
        ctx.lineWidth = 3
        ctx.lineJoin = 'round'
        ctx.lineCap = 'round'
        ctx.stroke()
    }

    const drawFit = (ctx: CanvasRenderingContext2D) => {
        const pts = pointsRef.current
        if (pts.length < 20) return
        const cx = pts.reduce((s, p) => s + p.x, 0) / pts.length
        const cy = pts.reduce((s, p) => s + p.y, 0) / pts.length
        const meanR = pts.reduce((s, p) => s + Math.hypot(p.x - cx, p.y - cy), 0) / pts.length
        ctx.beginPath()
        ctx.setLineDash([6, 6])
        ctx.arc(cx, cy, meanR, 0, TWO_PI)
        ctx.strokeStyle = '#1d4aff'
        ctx.lineWidth = 1.5
        ctx.stroke()
        ctx.setLineDash([])
    }

    const onPointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
        try {
            e.currentTarget.setPointerCapture(e.pointerId)
        } catch {
            // synthetic or already-released pointers can't be captured - drawing still works
        }
        drawingRef.current = true
        pointsRef.current = [toPoint(e)]
        setResult(null)
        const ctx = getCtx()
        if (ctx) drawPath(ctx)
    }

    const onPointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
        if (!drawingRef.current) return
        pointsRef.current.push(toPoint(e))
        const ctx = getCtx()
        if (ctx) drawPath(ctx)
    }

    const onPointerUp = () => {
        if (!drawingRef.current) return
        drawingRef.current = false
        const next = scoreLoop(pointsRef.current)
        setResult(next)
        setBest((b) => Math.max(b, next.score))
        const ctx = getCtx()
        if (ctx) {
            drawPath(ctx)
            drawFit(ctx)
        }
    }

    const reset = () => {
        pointsRef.current = []
        setResult(null)
        const ctx = getCtx()
        const canvas = canvasRef.current
        if (ctx && canvas) {
            const rect = canvas.getBoundingClientRect()
            ctx.clearRect(0, 0, rect.width, rect.height)
        }
    }

    return (
        <div className="not-prose my-6 max-w-xl rounded-md border border-primary bg-accent p-4">
            <div className="mb-3 flex items-baseline justify-between gap-2">
                <div className="text-sm font-semibold text-primary">
                    {result ? `${result.score}/100` : 'Draw one loop. One stroke. Close it.'}
                </div>
                <div className="flex items-baseline gap-3">
                    <span className="text-xs text-muted">best: {best}</span>
                    <button
                        onClick={reset}
                        className="rounded-sm border border-primary px-2 py-0.5 text-xs font-semibold text-primary"
                    >
                        Clear
                    </button>
                </div>
            </div>
            <canvas
                ref={canvasRef}
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={onPointerUp}
                onPointerCancel={onPointerUp}
                className="w-full cursor-crosshair rounded-md border border-primary bg-primary"
                style={{ touchAction: 'none', aspectRatio: '4 / 3' }}
            />
            <div className="mt-2 min-h-[1.5rem] text-sm text-secondary" aria-live="polite">
                {result ? result.verdict : ''}
            </div>
        </div>
    )
}
