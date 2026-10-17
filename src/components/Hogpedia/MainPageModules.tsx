import React, { useEffect, useState } from 'react'
import Link from 'components/Link'
import { HOGS } from './hogs'

export const Module = ({
    title,
    tint,
    wide,
    children,
}: {
    title: string
    tint?: 'tinted' | 'warm'
    wide?: boolean
    children: React.ReactNode
}): JSX.Element => (
    <section
        className={[
            'hp-module',
            tint === 'tinted' ? 'hp-module-tinted' : '',
            tint === 'warm' ? 'hp-module-warm' : '',
            wide ? 'hp-module-wide' : '',
        ]
            .filter(Boolean)
            .join(' ')}
    >
        <h2 className="hp-module-title">{title}</h2>
        <div className="hp-module-body">{children}</div>
    </section>
)

/**
 * The rotating parts of the Main Page.
 *
 * Rotation is derived from the date, never from `Math.random()`. A random pick during
 * render would differ between the server and the client and React would report a hydration
 * mismatch – and a crawler would see a different page from the one a reader sees.
 */
export const dayIndex = (length: number, date = new Date()): number => {
    if (length <= 0) {
        return 0
    }
    const dayOfYear = Math.floor(
        (Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()) -
            Date.UTC(date.getUTCFullYear(), 0, 0)) /
            86400000
    )
    return dayOfYear % length
}

/**
 * A hedgehog from the brand library, drawn at random.
 *
 * The pool is the `HOGS` registry, which the article infoboxes already import, so rotating
 * through it costs no extra JavaScript. Widening it to all 142 illustrations in
 * `@posthog/brand/hoggies` is not free: each component inlines its own SVG path data, on
 * the order of 240 KB of module source. The library also ships PNG URL exports, which would
 * be free, but Gatsby's webpack rules turn the referenced file into a JS module and the
 * package's own `new URL()` then resolves to that module rather than to the image, so
 * serving the whole library would need a webpack asset rule.
 *
 * The first render uses the date-derived index, so the server, a crawler and a reader with
 * no JavaScript all get a real illustration. The random pick happens in an effect after
 * hydration, which is the only safe place for it: `Math.random()` during render gives the
 * server and the client different answers and React reports a hydration mismatch.
 */
const HOG_NAMES = Object.keys(HOGS).sort()

/** `HedgehogReadingIsMagic` reads as "Reading is magic". */
const hogName = (key: string): string => {
    const spaced = key
        .replace(/^Hedgehog/, '')
        .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
        .replace(/([A-Z])([A-Z][a-z])/g, '$1 $2')
    return spaced.charAt(0).toUpperCase() + spaced.slice(1).toLowerCase()
}

export const FeaturedHog = (): JSX.Element | null => {
    const [index, setIndex] = useState(() => dayIndex(HOG_NAMES.length))

    useEffect(() => {
        if (HOG_NAMES.length > 0) {
            setIndex(Math.floor(Math.random() * HOG_NAMES.length))
        }
    }, [])

    const key = HOG_NAMES[index]
    const Hog = key ? HOGS[key] : undefined
    if (!Hog) {
        return null
    }

    const name = hogName(key)

    return (
        <figure className="hp-featured-hog">
            <Hog size={150} title={`${name}, a PostHog hedgehog illustration`} />
            <figcaption>
                <b>{name}</b>
                <br />
                One of the hedgehogs in the <Link to="/handbook/brand/assets">PostHog brand library</Link>.
            </figcaption>
        </figure>
    )
}
