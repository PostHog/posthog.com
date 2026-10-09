import { useMemo } from 'react'
import confetti from 'canvas-confetti'
import { useApp } from '../../context/App'

/**
 * Shared copy-to-clipboard confetti, used by both the card (`CopyableCommand`) and the inline
 * (`InlineCommand`) renderers so the burst is identical everywhere.
 */

/** Portaled confetti must paint above `AppWindow` (`motion.div` z-index) and taskbar chrome. */
export function useCopyConfettiZIndex(): number {
    const { windows } = useApp()
    return useMemo(() => {
        const maxWindowZ = windows.reduce((max, w) => Math.max(max, w.zIndex ?? 0), 0)
        return Math.max(maxWindowZ + 5000, 200_000)
    }, [windows])
}

type BurstOrigin = { x: number; y: number }

function shootBurst(
    fire: confetti.CreateTypes | typeof confetti,
    origin: BurstOrigin,
    { zIndex, velocityScale = 1 }: { zIndex?: number; velocityScale?: number } = {}
): Promise<unknown> {
    /** Wide `spread` (degrees) widens the cone; extra burst + staggered angles reduce a single tight cluster. */
    const base = {
        origin,
        zIndex,
        disableForReducedMotion: true,
    }

    const bursts = [
        fire({
            ...base,
            angle: 76,
            particleCount: 72,
            spread: 92,
            startVelocity: 26 * velocityScale,
            ticks: 260,
            gravity: 1.16,
        }),
        fire({
            ...base,
            angle: 80,
            particleCount: 64,
            spread: 138,
            startVelocity: 22 * velocityScale,
            ticks: 250,
            decay: 0.92,
            gravity: 1.1,
        }),
        fire({
            ...base,
            angle: 78,
            particleCount: 98,
            spread: 198,
            startVelocity: 18 * velocityScale,
            ticks: 240,
            scalar: 0.85,
            decay: 0.87,
            gravity: 1.1,
        }),
        fire({
            ...base,
            angle: 78,
            particleCount: 48,
            spread: 220,
            startVelocity: 14 * velocityScale,
            ticks: 220,
            scalar: 0.78,
            decay: 0.86,
            gravity: 1.08,
        }),
    ]

    return Promise.all(bursts)
}

function centerWithin(originEl: HTMLElement, frame: { left: number; top: number; width: number; height: number }) {
    const rect = originEl.getBoundingClientRect()
    return {
        x: (rect.left + rect.width / 2 - frame.left) / (frame.width || 1),
        y: (rect.top + rect.height / 2 - frame.top) / (frame.height || 1),
    }
}

/**
 * Viewport-scoped burst anchored to a real element. `react-confetti-explosion` measured a 0×0
 * node and misaligned inside nested scroll/transform (OS windows); canvas-confetti uses normalized
 * viewport coordinates from the button’s bounding rect.
 */
export function fireCopyConfetti(originEl: HTMLElement | null, zIndex: number): void {
    if (!originEl || typeof window === 'undefined') return

    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            const viewport = { left: 0, top: 0, width: window.innerWidth, height: window.innerHeight }
            shootBurst(confetti, centerWithin(originEl, viewport), { zIndex })
        })
    })
}

export function fireConfettiInCanvas(
    originEl: HTMLElement | null,
    canvas: HTMLCanvasElement | null,
    velocityScale = 1
): Promise<void> {
    if (!originEl || !canvas) return Promise.resolve()

    const fire = confetti.create(canvas, { resize: true })
    return new Promise((resolve) =>
        requestAnimationFrame(() =>
            shootBurst(fire, centerWithin(originEl, canvas.getBoundingClientRect()), { velocityScale }).then(() => {
                fire.reset()
                resolve()
            })
        )
    )
}
