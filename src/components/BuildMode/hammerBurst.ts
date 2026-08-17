import { fireKnocks } from './hammerSound'
import { resolveTokenColors } from './tokenColors'

/**
 * The wordmark's click easter egg: hammers that drop in and work it, as a throwaway DOM layer
 * animated with the Web Animations API. It's built out of elements rather than canvas particles
 * because a deliberate swing and dust that grows as it thins need oscillating rotation and scale,
 * which particle systems like canvas-confetti don't do — they only ever tumble at a fixed size.
 *
 * The burst is decorative, so callers skip it under `prefers-reduced-motion`.
 */

/** They line up along the wordmark's top edge, so this is bounded by how many fit and stay legible. */
const HAMMER_COUNT = 5
/** Swings per hammer, and the time for one wind-up-and-strike cycle (ms). */
const SWINGS = 3
const SWING_MS = 210
/**
 * Taps played per burst. Not tied to `SWINGS`: there are far more strikes than knocks, and the run
 * carries one swing apart, so a fourth tap lands with the strikes of the latest-phased hammers.
 */
const KNOCK_COUNT = 4
/** Circles per strike — one alone reads as a dot, a couple overlapping read as a puff. */
const PUFFS_PER_STRIKE = 2
/** Chips are rolled for individually, so a strike throws anywhere from none to this many. */
const MAX_CHIPS_PER_STRIKE = 2

/**
 * Dust is `--border` rather than `--text-muted`: light enough to read as construction dust instead
 * of soot, and it still resolves to something visible against the page in both light and dark themes.
 *
 * Chips are knocked off the orange wordmark, so they take `--red-2`: the button's hue, a little
 * lighter than the button itself, and saturated. Chips are only a few pixels across, and at that size
 * they need to sit above the button's own value to read as orange rather than as brown specks —
 * `--burnt-orange` is nearest the button in raw RGB but too dull, and `--red` (PostHog's orange) has
 * the hue but is darker than the button.
 */
const TOKENS = {
    dust: 'text-border',
    sparkle: 'text-yellow',
    chip: 'text-red-2',
}

type StrikeColors = { dust: string; sparkle: string; chip: string }

/** A four-point star, the shorthand every game uses for "that landed". */
const SPARKLE_CLIP = 'polygon(50% 0%, 61% 39%, 100% 50%, 61% 61%, 50% 100%, 39% 61%, 0% 50%, 39% 39%)'

/**
 * A puff of dust left behind at a strike. It's parked in viewport coordinates on the layer rather
 * than parented to the hammer, so it hangs at the point of impact and drifts up while the hammer
 * moves on.
 */
function spawnPuff(layer: HTMLElement, x: number, y: number, color: string, delay: number): Animation {
    const size = 13 + Math.random() * 8
    const puff = document.createElement('div')
    puff.style.cssText = `position:fixed;left:${x + (Math.random() - 0.5) * 8}px;top:${
        y + (Math.random() - 0.5) * 6
    }px;width:${size}px;height:${size}px;border-radius:9999px;background:${color};filter:blur(3px);opacity:0`
    layer.appendChild(puff)

    return puff.animate(
        [
            { transform: 'translate(-50%,-50%) scale(.35)', opacity: 0.7 },
            {
                transform: `translate(-50%,-50%) translate(${(Math.random() - 0.5) * 22}px,-24px) scale(2.3)`,
                opacity: 0,
            },
        ],
        { duration: 560 + Math.random() * 160, delay, easing: 'ease-out', fill: 'forwards' }
    )
}

/** A star that flashes at the point of contact and is gone well before the dust is. */
function spawnSparkle(layer: HTMLElement, x: number, y: number, color: string): Animation {
    const size = 10 + Math.random() * 7
    const sparkle = document.createElement('div')
    sparkle.style.cssText = `position:fixed;left:${x}px;top:${y}px;width:${size}px;height:${size}px;background:${color};clip-path:${SPARKLE_CLIP};opacity:0`
    layer.appendChild(sparkle)

    return sparkle.animate(
        [
            { transform: 'translate(-50%,-50%) scale(0) rotate(0deg)', opacity: 0 },
            { transform: 'translate(-50%,-50%) scale(1.15) rotate(35deg)', opacity: 1, offset: 0.35 },
            { transform: 'translate(-50%,-50%) scale(.2) rotate(70deg)', opacity: 0 },
        ],
        { duration: 280 + Math.random() * 90, easing: 'ease-out', fill: 'forwards' }
    )
}

/** A chip knocked loose: thrown up and out, tumbling, then falling away. */
function spawnChip(layer: HTMLElement, x: number, y: number, color: string): Animation {
    const chip = document.createElement('div')
    const width = 3 + Math.random() * 3
    const height = 2 + Math.random() * 2
    chip.style.cssText = `position:fixed;left:${x}px;top:${y}px;width:${width}px;height:${height}px;border-radius:1px;background:${color}`
    layer.appendChild(chip)

    // Up and outward to either side, then gravity takes it.
    const angle = -Math.PI * (0.15 + Math.random() * 0.7)
    const distance = 26 + Math.random() * 34
    const dx = Math.cos(angle) * distance
    const dy = Math.sin(angle) * distance
    const spin = (Math.random() < 0.5 ? -1 : 1) * (180 + Math.random() * 360)

    return chip.animate(
        [
            // Decelerating up, then accelerating down, so the arc reads as ballistic.
            { transform: 'translate(-50%,-50%) rotate(0deg)', opacity: 1, easing: 'ease-out' },
            {
                transform: `translate(-50%,-50%) translate(${dx * 0.7}px,${dy}px) rotate(${spin * 0.6}deg)`,
                opacity: 1,
                offset: 0.45,
                easing: 'ease-in',
            },
            {
                transform: `translate(-50%,-50%) translate(${dx}px,${
                    dy + 40 + Math.random() * 30
                }px) rotate(${spin}deg)`,
                opacity: 0,
            },
        ],
        { duration: 520 + Math.random() * 180, fill: 'forwards' }
    )
}

/**
 * Everything thrown off by one hit. Dust lands on every strike, while sparkles and chips are
 * occasional — on every strike they'd read as a mechanical repeat, and 14 hammers swinging three
 * times each is a lot of elements to animate.
 */
function spawnStrike(layer: HTMLElement, x: number, y: number, colors: StrikeColors): Animation[] {
    const animations: Animation[] = []

    // Staggered, so the puff builds rather than appearing whole.
    for (let i = 0; i < PUFFS_PER_STRIKE; i++) animations.push(spawnPuff(layer, x, y, colors.dust, i * 55))

    if (Math.random() < 0.55) animations.push(spawnSparkle(layer, x, y, colors.sparkle))
    for (let i = 0; i < MAX_CHIPS_PER_STRIKE; i++) {
        if (Math.random() < 0.5) animations.push(spawnChip(layer, x, y, colors.chip))
    }

    return animations
}

/**
 * The wordmark's own reaction: squashed by the hit, then springing back through a slight overshoot.
 * `transformOrigin` rides along in the keyframes so it's scoped to the animation rather than left
 * behind on a React-owned element.
 */
function popTarget(el: HTMLElement): Animation {
    return el.animate(
        [
            { transform: 'scale(1,1)', transformOrigin: '50% 100%' },
            { transform: 'scale(1.13,.87)', transformOrigin: '50% 100%', offset: 0.14 },
            { transform: 'scale(.95,1.07)', transformOrigin: '50% 100%', offset: 0.38 },
            { transform: 'scale(1.03,.98)', transformOrigin: '50% 100%', offset: 0.62 },
            { transform: 'scale(1,1)', transformOrigin: '50% 100%' },
        ],
        { duration: 430, easing: 'ease-out' }
    )
}

/**
 * A knock-back on the wordmark for a single strike: shoved down and tilted a little, then recovering.
 *
 * `composite: 'add'` is what makes this work. Strikes land every ~50ms across all the hammers, and a
 * replacing animation would cancel whichever jolt was still recovering — plus the squash from
 * `popTarget` — so hits would snap instead of accumulating. Adding layers them on top of each other
 * and on top of the squash.
 */
function joltTarget(el: HTMLElement): Animation {
    const dip = 1.2 + Math.random() * 2
    const tilt = (Math.random() < 0.5 ? -1 : 1) * (0.35 + Math.random() * 0.6)

    return el.animate(
        [
            { transform: 'translateY(0) rotate(0deg)' },
            { transform: `translateY(${dip}px) rotate(${tilt}deg)`, offset: 0.3 },
            { transform: 'translateY(0) rotate(0deg)' },
        ],
        { duration: 170, easing: 'ease-out', composite: 'add' }
    )
}

/**
 * The whole click: hammers drop in along the wordmark's top edge and work it — striking it, throwing
 * dust, sparks, and chips at each contact point, and knocking the wordmark itself back on every hit —
 * while a run of knocks plays. They peel away once the work is done, and the layer removes itself
 * when every animation has finished.
 */
export function fireHammerSwarm(originEl: HTMLElement | null, zIndex: number): void {
    if (!originEl || typeof window === 'undefined') return

    // Measured a frame late, like the copy confetti, so the rect reflects settled layout.
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            // The burst is laid out against the wordmark's whole box: the hammers need somewhere
            // along its top edge to stand, and the middle is only used to send them out either way.
            const rect = originEl.getBoundingClientRect()
            const centerX = rect.left + rect.width / 2

            const [dust, sparkle, chip] = resolveTokenColors([TOKENS.dust, TOKENS.sparkle, TOKENS.chip], originEl)
            const strikeColors: StrikeColors = { dust, sparkle, chip }

            popTarget(originEl)
            fireKnocks(KNOCK_COUNT, SWING_MS * 0.4, SWING_MS)

            const layer = document.createElement('div')
            layer.style.cssText = `position:fixed;inset:0;pointer-events:none;z-index:${zIndex}`
            document.body.appendChild(layer)

            // Puffs are spawned mid-flight, so the layer waits on promises rather than on a fixed
            // list of animations: each entry settles once its own animation is done.
            const pending: Promise<unknown>[] = []
            const track = (animation: Animation) => pending.push(animation.finished.catch(() => undefined))

            for (let i = 0; i < HAMMER_COUNT; i++) {
                // Spaced across the wordmark's top edge and jittered, so it doesn't read as a fence.
                const slot = (i + 0.5 + (Math.random() - 0.5) * 0.6) / HAMMER_COUNT
                const x = rect.left + rect.width * (0.08 + 0.84 * slot)
                // Just clear of the edge, so the head lands on the wordmark at the bottom of the swing.
                const y = rect.top - 5 - Math.random() * 7

                // Offset per hammer, or they all strike in unison and it sounds mechanical.
                const phase = Math.random() * 170
                const workMs = phase + SWINGS * SWING_MS
                const travelMs = workMs + 240 + Math.random() * 150
                const workEnd = workMs / travelMs

                // Once the work is done they scatter off the way they came in — outward and up.
                const exitX = (x - centerX) * 0.3 + (Math.random() - 0.5) * 24
                const exitY = -34 - Math.random() * 30

                const traveler = document.createElement('div')
                traveler.style.cssText = `position:fixed;left:${x}px;top:${y}px;will-change:transform`

                const hammer = document.createElement('div')
                hammer.textContent = '🔨'
                hammer.setAttribute('aria-hidden', 'true')
                // Rotating about the grip end is what turns a tilt into a swing.
                hammer.style.cssText = `font-size:${
                    18 + Math.round(Math.random() * 9)
                }px;line-height:1;transform-origin:30% 80%`

                traveler.appendChild(hammer)
                layer.appendChild(traveler)

                // Drops in, holds station over the wordmark while it works, then peels away.
                // Transform only, so the fade can belong to the hammer alone.
                track(
                    traveler.animate(
                        [
                            { transform: 'translate(-50%,-50%) translate(0,-14px) scale(.55)' },
                            { transform: 'translate(-50%,-50%) scale(1)', offset: 0.1 },
                            { transform: 'translate(-50%,-50%) scale(1)', offset: workEnd },
                            { transform: `translate(-50%,-50%) translate(${exitX}px,${exitY}px) scale(.85)` },
                        ],
                        { duration: travelMs, easing: 'ease-out', fill: 'forwards' }
                    )
                )

                track(
                    hammer.animate(
                        [{ opacity: 0 }, { opacity: 1, offset: 0.1 }, { opacity: 1, offset: workEnd }, { opacity: 0 }],
                        { duration: travelMs, easing: 'linear', fill: 'forwards' }
                    )
                )

                // Wind up, strike fast, rebound a little, wind up again.
                track(
                    hammer.animate(
                        [
                            { transform: 'rotate(-46deg)' },
                            { transform: 'rotate(18deg)', offset: 0.4, easing: 'cubic-bezier(.3,0,.7,1)' },
                            { transform: 'rotate(6deg)', offset: 0.52 },
                            { transform: 'rotate(-46deg)' },
                        ],
                        { duration: SWING_MS, delay: phase, iterations: SWINGS, easing: 'ease-in-out' }
                    )
                )

                for (let swing = 0; swing < SWINGS; swing++) {
                    // Measured when the strike lands rather than computed up front: the hammer is
                    // still settling into station early on, so where the head actually is depends on
                    // an eased multi-keyframe path.
                    pending.push(
                        new Promise<void>((resolve) => {
                            window.setTimeout(() => {
                                const head = traveler.getBoundingClientRect()
                                // Roughly the head of the hammer at the bottom of its swing.
                                const struck = spawnStrike(
                                    layer,
                                    head.left + head.width * 0.72,
                                    head.top + head.height * 0.92,
                                    strikeColors
                                )
                                joltTarget(originEl)
                                void Promise.all(
                                    struck.map((animation) => animation.finished.catch(() => undefined))
                                ).then(() => resolve())
                            }, phase + SWING_MS * 0.4 + swing * SWING_MS)
                        })
                    )
                }
            }

            Promise.all(pending).then(() => layer.remove())
        })
    })
}
