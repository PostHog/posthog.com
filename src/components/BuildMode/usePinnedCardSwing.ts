import { RefObject, useEffect } from 'react'
import { usePrefersReducedMotion } from 'components/Code/usePrefersReducedMotion'
import { rand } from 'components/PostsIndex/utils'

/** How far a card is allowed to swing off its resting angle, in degrees. */
const MAX_TILT = 14

/** Keep integrating for this long after the last input event (ms). */
const IDLE_GRACE = 200

type Pendulum = {
    stiffness: number
    damping: number
    coupling: number
    lean: number
    jostle: number
    angle: number
    velocity: number
}

/**
 * Constants vary per card so the cards drift out of phase with one another.
 */
const createPendulum = (index: number): Pendulum => ({
    stiffness: 60 * (0.8 + 0.8 * rand(index, 1)), // higher = snappier direction changes
    damping: 7 * (0.85 + 0.6 * rand(index, 2)), // friction bleeding off momentum
    coupling: 0.05 * (0.8 + 0.8 * rand(index, 3)), // scroll px/s² → angular accel (deg/s²)
    lean: 0.0015 * (0.8 + 0.8 * rand(index, 4)), // deg of steady lean per px/s of scroll speed
    jostle: 12 * (0.8 + 0.8 * rand(index, 5)), // deg/s kick when the cursor enters the card
    angle: 0,
    velocity: 0,
})

/**
 * Swings each card in a scroll container as if it were hanging from its pin.
 *
 * Every card is a pendulum inside an accelerating frame (the container). Torque
 * comes mostly from scroll acceleration — cards lean back while speeding up and
 * swing forward as a smooth scroll brakes — plus a small velocity term so steady
 * scrolling gives a slight lean. The measured velocity is low-passed so discrete
 * wheel steps read as one continuous motion instead of spikes.
 *
 * The resulting angles are written to the container as `--tilt-{index}` CSS
 * variables; cards consume their own via `transform`, so no card re-renders.
 * Cards must carry a `data-card-index` attribute for the hover jostle.
 *
 * The swing is decorative, so it's skipped entirely under `prefers-reduced-motion`.
 */
export function usePinnedCardSwing(ref: RefObject<HTMLElement>, cardCount: number): void {
    const prefersReducedMotion = usePrefersReducedMotion()

    useEffect(() => {
        const el = ref.current
        if (!el) return

        // Written imperatively rather than as a CSS animation, so `motion-reduce:` can't
        // suppress it — leave every card at rest and never start the loop instead.
        if (prefersReducedMotion) {
            for (let i = 0; i < cardCount; i++) el.style.setProperty(`--tilt-${i}`, '0deg')
            return
        }

        const pendulums = Array.from({ length: cardCount }, (_, i) => createPendulum(i))

        let lastScrollLeft = el.scrollLeft
        let smoothVelocity = 0
        let lastTime: number | null = null
        let lastInputTime = 0
        let raf: number | null = null
        let hoveredCardIndex = -1

        const animate = (time: number) => {
            const dt = Math.min(Math.max((time - (lastTime ?? time)) / 1000, 0.004), 1 / 30)
            lastTime = time

            const rawVelocity = (el.scrollLeft - lastScrollLeft) / dt
            lastScrollLeft = el.scrollLeft
            const prevSmooth = smoothVelocity
            smoothVelocity += (rawVelocity - smoothVelocity) * Math.min(1, dt * 12)
            const acceleration = Math.max(-20000, Math.min(20000, (smoothVelocity - prevSmooth) / dt))

            let settled = true
            pendulums.forEach((p, i) => {
                const restAngle = p.lean * smoothVelocity
                p.velocity +=
                    (-p.stiffness * (p.angle - restAngle) - p.damping * p.velocity + p.coupling * acceleration) * dt
                p.angle += p.velocity * dt
                p.angle = Math.max(-MAX_TILT, Math.min(MAX_TILT, p.angle))
                el.style.setProperty(`--tilt-${i}`, `${p.angle.toFixed(3)}deg`)
                if (Math.abs(p.angle) > 0.01 || Math.abs(p.velocity) > 0.2) settled = false
            })

            // Stopping on the first quiet frame would kill the loop before the
            // motion it was started for ever registers, so wait out the grace window.
            const idle = performance.now() - lastInputTime > IDLE_GRACE
            if (!settled || !idle) {
                raf = requestAnimationFrame(animate)
            } else {
                pendulums.forEach((p, i) => {
                    p.angle = 0
                    p.velocity = 0
                    el.style.setProperty(`--tilt-${i}`, '0deg')
                })
                smoothVelocity = 0
                lastTime = null
                raf = null
            }
        }

        // (Re)start the loop on any input; scroll state is resynced so the
        // first frame doesn't see a stale delta
        const wake = () => {
            lastInputTime = performance.now()
            if (raf === null) {
                lastTime = lastInputTime
                smoothVelocity = 0
                lastScrollLeft = el.scrollLeft
                raf = requestAnimationFrame(animate)
            }
        }

        // A slight jostle when the cursor enters a card, in the direction the
        // cursor was moving. pointerover fires for every child element, so
        // dedupe against the card the cursor is already on.
        const onPointerOver = (e: PointerEvent) => {
            if (e.pointerType !== 'mouse') return // no cursor to brush cards with on touch
            const card = (e.target as Element | null)?.closest?.('[data-card-index]') as HTMLElement | null
            const index = card ? Number(card.dataset.cardIndex) : -1
            if (index !== -1 && index !== hoveredCardIndex) {
                const p = pendulums[index]
                if (p) p.velocity += p.jostle * (Math.random() < 0.5 ? -1 : 1)
                wake()
            }
            hoveredCardIndex = index
        }

        const onPointerLeave = () => {
            hoveredCardIndex = -1
        }

        el.addEventListener('scroll', wake, { passive: true })
        el.addEventListener('pointerover', onPointerOver, { passive: true })
        el.addEventListener('pointerleave', onPointerLeave, { passive: true })

        return () => {
            el.removeEventListener('scroll', wake)
            el.removeEventListener('pointerover', onPointerOver)
            el.removeEventListener('pointerleave', onPointerLeave)
            if (raf !== null) cancelAnimationFrame(raf)
        }
    }, [ref, cardCount, prefersReducedMotion])
}
