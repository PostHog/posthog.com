import React from 'react'
import Link from 'components/Link'
import { HOGS } from './hogs'

/**
 * The Hogpedia wordmark: a reading hedgehog in a ring, over serif text.
 *
 * This is deliberately not a puzzle globe. It borrows the *placement* a 2007 encyclopedia
 * used – a round mark above a serif wordmark, top left – and nothing else. The
 * illustration comes from `@posthog/brand`, so it is a sanctioned PostHog asset.
 */
export default function HogpediaLogo({ linkToMainPage = true }: { linkToMainPage?: boolean }): JSX.Element {
    const mark = (
        <>
            <span className="hp-logo-mark">
                <HOGS.HedgehogReading size={62} title="" aria-hidden="true" focusable="false" />
            </span>
            <span className="hp-logo-word">Hogpedia</span>
            <span className="hp-logo-tag">The Free Encyclopedia</span>
        </>
    )

    if (!linkToMainPage) {
        return <div className="hp-logo">{mark}</div>
    }

    return (
        <Link to="/hogpedia" className="hp-logo" title="Visit the Main Page">
            {mark}
        </Link>
    )
}
