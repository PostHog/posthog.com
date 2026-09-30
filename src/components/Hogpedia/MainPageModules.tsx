import React from 'react'
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

export const FeaturedHog = ({
    hog,
    name,
    caption,
    to,
}: {
    hog: string
    name: string
    caption: string
    to: string
}): JSX.Element => {
    const Hog = HOGS[hog]
    return (
        <div style={{ textAlign: 'center' }}>
            {Hog && <Hog size={130} title={name} />}
            <p>
                <b>
                    <Link to={to}>{name}</Link>
                </b>
                <br />
                {caption}
            </p>
        </div>
    )
}
