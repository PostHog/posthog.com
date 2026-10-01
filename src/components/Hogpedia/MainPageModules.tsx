import React, { useEffect, useState } from 'react'
import Link from 'components/Link'
import { HOGGIES } from './hoggieImages'

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
 * A hedgehog drawn at random from the whole brand library.
 *
 * The first render uses the date-derived index, so the server, a crawler and a reader with
 * no JavaScript all get a real illustration. The random pick happens in an effect after
 * hydration, which is the only safe place for it: `Math.random()` during render gives the
 * server and the client different answers and React reports a hydration mismatch.
 */
export const FeaturedHog = (): JSX.Element | null => {
    const [index, setIndex] = useState(() => dayIndex(HOGGIES.length))

    useEffect(() => {
        if (HOGGIES.length > 0) {
            setIndex(Math.floor(Math.random() * HOGGIES.length))
        }
    }, [])

    const hoggie = HOGGIES[index]
    if (!hoggie) {
        return null
    }

    return (
        <figure className="hp-featured-hog">
            <img src={hoggie.src} alt={`${hoggie.name}, a PostHog hedgehog illustration`} />
            <figcaption>
                <b>{hoggie.name}</b>
                <br />
                One of the {HOGGIES.length} hedgehogs in the{' '}
                <Link to="/handbook/brand/assets">PostHog brand library</Link>.
            </figcaption>
        </figure>
    )
}
