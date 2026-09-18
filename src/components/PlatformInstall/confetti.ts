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

/**
 * Viewport-scoped burst anchored to a real element. `react-confetti-explosion` measured a 0×0
 * node and misaligned inside nested scroll/transform (OS windows); canvas-confetti uses normalized
 * viewport coordinates from the button’s bounding rect.
 */
export function fireCopyConfetti(originEl: HTMLElement | null, zIndex: number): void {
    if (!originEl || typeof window === 'undefined') return

    const shoot = (): void => {
        const rect = originEl.getBoundingClientRect()
        const vw = window.innerWidth || 1
        const vh = window.innerHeight || 1
        const x = (rect.left + rect.width / 2) / vw
        const y = (rect.top + rect.height / 2) / vh

        /** Wide `spread` (degrees) widens the cone; extra burst + staggered angles reduce a single tight cluster. */
        const base = {
            origin: { x, y },
            zIndex,
            disableForReducedMotion: true,
        }

        confetti({
            ...base,
            angle: 76,
            particleCount: 72,
            spread: 92,
            startVelocity: 26,
            ticks: 260,
            gravity: 1.16,
        })
        confetti({
            ...base,
            angle: 80,
            particleCount: 64,
            spread: 138,
            startVelocity: 22,
            ticks: 250,
            decay: 0.92,
            gravity: 1.1,
        })
        confetti({
            ...base,
            angle: 78,
            particleCount: 98,
            spread: 198,
            startVelocity: 18,
            ticks: 240,
            scalar: 0.85,
            decay: 0.87,
            gravity: 1.1,
        })
        confetti({
            ...base,
            angle: 78,
            particleCount: 48,
            spread: 220,
            startVelocity: 14,
            ticks: 220,
            scalar: 0.78,
            decay: 0.86,
            gravity: 1.08,
        })
    }

    requestAnimationFrame(() => {
        requestAnimationFrame(shoot)
    })
}
