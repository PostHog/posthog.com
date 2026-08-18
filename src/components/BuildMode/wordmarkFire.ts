import { resolveTokenColors } from './tokenColors'

/**
 * What happens when someone won't stop hammering: the wordmark catches fire. Flames take hold along
 * its top edge, throwing embers and black smoke, the logo is lit by the blaze, and it all dies down a
 * couple of seconds later. The wordmark ignores clicks while it burns, so a fire runs start to finish
 * without a second one being lit over it.
 *
 * The flames and the glow loop rather than running one envelope from ignition to burnout, so the burn
 * length lives in one place instead of being spread across every keyframe list. Infinite animations
 * never resolve `finished`, so they're cancelled at cleanup instead of being waited on.
 *
 * Everything lives in an anchor element that tracks the wordmark every frame, so a fire that lasts
 * seconds keeps up if the page scrolls or the window moves — unlike the hammer burst, which is over
 * fast enough to get away with viewport coordinates fixed at click time.
 */

/** Flames spaced along the top edge. */
const FLAMES = 7
/** Flames grow in over this long (ms). */
const IGNITE_MS = 280
/** How long it burns before dying down (ms). */
const BURN_MS = 2400
/** Dying down, once the burn is up (ms). */
const EXTINGUISH_MS = 900
const EMBER_EVERY_MS = 110
const SMOKE_EVERY_MS = 240

type FireColors = { ember: string[]; smoke: string }

/** A flame that takes hold and flickers until told to go out. */
type Flame = { die: () => Animation; flicker: Animation }

function spawnFlame(anchor: HTMLElement, xPercent: number, delay: number): Flame {
    // Outer element owns position and envelope, inner the flicker, so they don't fight over `transform`.
    const base = document.createElement('div')
    base.style.cssText = `position:absolute;left:${xPercent}%;top:2px;transform-origin:50% 100%`

    const flame = document.createElement('div')
    flame.textContent = '🔥'
    flame.setAttribute('aria-hidden', 'true')
    flame.style.cssText = `font-size:${18 + Math.round(Math.random() * 12)}px;line-height:1;transform-origin:50% 100%`

    base.appendChild(flame)
    anchor.appendChild(base)

    // `both`, so it stays out of sight until its delay and holds full height afterwards.
    base.animate(
        [
            { transform: 'translate(-50%,-100%) scale(.2,.1)', opacity: 0 },
            { transform: 'translate(-50%,-100%) scale(1,1)', opacity: 1 },
        ],
        { duration: IGNITE_MS, delay, easing: 'ease-out', fill: 'both' }
    )

    const flickerMs = 130 + Math.random() * 90
    const flicker = flame.animate(
        [
            { transform: 'scale(1,1) rotate(0deg)' },
            { transform: 'scale(.88,1.14) rotate(-5deg)', offset: 0.3 },
            { transform: 'scale(1.1,.92) rotate(4deg)', offset: 0.62 },
            { transform: 'scale(1,1) rotate(0deg)' },
        ],
        { duration: flickerMs, delay, iterations: Infinity }
    )

    return {
        flicker,
        die: () =>
            base.animate(
                [
                    { transform: 'translate(-50%,-100%) scale(1,1)', opacity: 1 },
                    { transform: 'translate(-50%,-100%) scale(.45,.25)', opacity: 0 },
                ],
                { duration: EXTINGUISH_MS, easing: 'ease-in', fill: 'forwards' }
            ),
    }
}

/** An ember carried up off the flames. */
function spawnEmber(anchor: HTMLElement, colors: FireColors): Animation {
    const size = 2 + Math.random() * 2.5
    const ember = document.createElement('div')
    ember.style.cssText = `position:absolute;left:${
        5 + Math.random() * 90
    }%;top:0;width:${size}px;height:${size}px;border-radius:9999px;background:${
        colors.ember[Math.floor(Math.random() * colors.ember.length)]
    }`
    anchor.appendChild(ember)

    const drift = (Math.random() - 0.5) * 40
    const rise = 45 + Math.random() * 55

    return ember.animate(
        [
            { transform: 'translate(-50%,-50%) scale(1)', opacity: 1 },
            {
                transform: `translate(-50%,-50%) translate(${drift * 0.5}px,${-rise * 0.6}px)`,
                opacity: 0.8,
                offset: 0.6,
            },
            { transform: `translate(-50%,-50%) translate(${drift}px,${-rise}px) scale(.4)`, opacity: 0 },
        ],
        { duration: 700 + Math.random() * 500, easing: 'ease-out', fill: 'forwards' }
    )
}

/** Smoke off the fire — black and billowing, which is what black smoke is actually for. */
function spawnSmoke(anchor: HTMLElement, colors: FireColors): Animation {
    const size = 14 + Math.random() * 10
    const smoke = document.createElement('div')
    smoke.style.cssText = `position:absolute;left:${
        10 + Math.random() * 80
    }%;top:-6px;width:${size}px;height:${size}px;border-radius:9999px;background:${
        colors.smoke
    };filter:blur(4px);opacity:0`
    anchor.appendChild(smoke)

    const drift = (Math.random() - 0.5) * 46

    return smoke.animate(
        [
            { transform: 'translate(-50%,-50%) scale(.4)', opacity: 0 },
            {
                transform: `translate(-50%,-50%) translate(${drift * 0.4}px,-34px) scale(1.5)`,
                opacity: 0.45,
                offset: 0.4,
            },
            { transform: `translate(-50%,-50%) translate(${drift}px,-104px) scale(2.6)`, opacity: 0 },
        ],
        { duration: 1200 + Math.random() * 500, easing: 'ease-out', fill: 'forwards' }
    )
}

/**
 * A `drop-shadow` at a given intensity. Every frame of every glow animation is built through here so
 * the filter lists match: filters only interpolate against an identical structure, and at zero
 * intensity this collapses to a shadow with no blur or offset, which hides behind the logo.
 */
const glowAt = (color: string, intensity: number): string =>
    `drop-shadow(0 ${(-3 * intensity).toFixed(2)}px ${(13 * intensity).toFixed(2)}px ${color}) brightness(${(
        1 +
        0.06 * intensity
    ).toFixed(3)})`

/** The wordmark lit by the fire, flickering for as long as it burns. */
function glowFlicker(el: HTMLElement, color: string): Animation {
    const frames = [0.7, 1.15, 0.85, 1.2, 0.75, 1.1, 0.7].map((intensity) => ({ filter: glowAt(color, intensity) }))
    return el.animate(frames, { duration: 620, iterations: Infinity })
}

/** The light dying with the flames. No `fill`, so no permanent `filter` is left on a React-owned node. */
function glowFade(el: HTMLElement, color: string): Animation {
    return el.animate([{ filter: glowAt(color, 0.9) }, { filter: glowAt(color, 0) }], {
        duration: EXTINGUISH_MS,
        easing: 'ease-in',
    })
}

/**
 * Sets the wordmark alight. Resolves once the last ember has faded and everything has been cleaned
 * up, which is the caller's cue that it can be lit again.
 */
export function igniteWordmark(target: HTMLElement | null, zIndex: number): Promise<void> {
    if (!target || typeof window === 'undefined') return Promise.resolve()

    const [smoke, ...ember] = resolveTokenColors(['text-black', 'text-yellow', 'text-orange', 'text-red'], target)
    const colors: FireColors = { ember, smoke }

    const anchor = document.createElement('div')
    anchor.style.cssText = `position:fixed;pointer-events:none;z-index:${zIndex}`
    document.body.appendChild(anchor)

    // Re-measured every frame: while this burns the wordmark can scroll or be dragged away, and the
    // fire has to go with it.
    let raf = requestAnimationFrame(function follow() {
        // A wordmark unmounted mid-burn measures 0×0, which would park the fire in the top-left
        // corner for the rest of it.
        anchor.style.display = target.isConnected ? '' : 'none'
        const rect = target.getBoundingClientRect()
        anchor.style.left = `${rect.left}px`
        anchor.style.top = `${rect.top}px`
        anchor.style.width = `${rect.width}px`
        anchor.style.height = `${rect.height}px`
        raf = requestAnimationFrame(follow)
    })

    // Only finite animations go in here — `finished` never resolves for the looping ones.
    const pending: Promise<unknown>[] = []
    const track = (animation: Animation) => pending.push(animation.finished.catch(() => undefined))

    // Staggered, so the fire spreads along the wordmark rather than appearing all at once.
    const flames = Array.from({ length: FLAMES }, (_, i) =>
        spawnFlame(anchor, 6 + (88 * (i + 0.5)) / FLAMES, Math.random() * 320)
    )
    const glow = glowFlicker(target, ember[1])

    const emberTimer = window.setInterval(() => track(spawnEmber(anchor, colors)), EMBER_EVERY_MS)
    const smokeTimer = window.setInterval(() => track(spawnSmoke(anchor, colors)), SMOKE_EVERY_MS)

    return new Promise<void>((resolve) => {
        window.setTimeout(() => {
            window.clearInterval(emberTimer)
            window.clearInterval(smokeTimer)

            flames.forEach((flame) => track(flame.die()))
            glow.cancel()
            track(glowFade(target, ember[1]))

            // Spawning has stopped, so everything still in the air is already tracked here.
            void Promise.all(pending).then(() => {
                flames.forEach((flame) => flame.flicker.cancel())
                cancelAnimationFrame(raf)
                anchor.remove()
                resolve()
            })
        }, BURN_MS)
    })
}
