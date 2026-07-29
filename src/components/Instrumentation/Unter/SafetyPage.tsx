import React, { useState } from 'react'
import { IconBell, IconPassword, IconRuler, IconStar, IconWarning, IconX } from '@posthog/icons'
import CoverageMap from './CoverageMap'

export default function SafetyPage(): JSX.Element {
    const [helpAnswered, setHelpAnswered] = useState(false)

    return (
        <>
            <section className="un-safety-hero" data-unter-id="safety-hero">
                <div className="un-shell">
                    <h2 className="un-h1">Getting small things across a big city.</h2>
                    <p className="un-lede">
                        Urban hedgehogs are solitary creatures. They don't often congregate – unless for a hackathon –
                        but we can keep them safe with a simple act of kindness (cutting a small hole in your fence).
                    </p>
                </div>
            </section>
            <div className="un-shell">
                <section className="un-safe-grid">
                    <div className="un-safe-card">
                        <IconRuler className="un-sicon" />
                        <h3>Verified gaps only</h3>
                        <p>
                            Every gap is measured on registration, and the spec is 13cm with no exceptions. Cut it at
                            11cm and a hedgehog might get stuck halfway (not good).
                        </p>
                    </div>
                    <div className="un-safe-card">
                        <IconBell className="un-sicon" />
                        <h3>Crossing check-ins</h3>
                        <p>
                            Long crossing? We ping your burrow when you arrive. If you stop moving for more than 40
                            minutes near a bird bath, we assume you found something to eat.
                        </p>
                    </div>

                    <CoverageMap />

                    <div className="un-safe-card" data-unter-id="safe-no-roads">
                        <IconX className="un-sicon" />
                        <h3>No roads. Ever.</h3>
                        <p>
                            Unter will never route you across tarmac. If the only way is a road, we'll call you an Uber.
                        </p>
                    </div>
                    <div className="un-safe-card">
                        <IconStar className="un-sicon" />
                        <h3>Rated by the community</h3>
                        <p>Fence gaps get star ratings. Nobody wants to be the two-star gap on their own street.</p>
                    </div>
                    <div className="un-safe-card">
                        <IconPassword className="un-sicon" />
                        <h3>PIN verification</h3>
                        <p>
                            Just kidding. It's a hole in a fence, there's no PIN pad. But hedgehogs are more orderly
                            than most humans.
                        </p>
                    </div>
                    <div className="un-safe-card">
                        <IconWarning className="un-sicon" />
                        <h3>Blocked-gap reports</h3>
                        <p>
                            New plant pot in front of the hole? Report it in the app. 94% of blockages are cleared by
                            the host before sunrise.
                        </p>
                    </div>
                </section>

                <section className="un-longread" data-unter-id="safety-longread">
                    <h2 className="un-h2">Why 13 centimetres?</h2>
                    <p>
                        Because that's all it takes. A hedgehog can roam over a mile a night looking for food and mates,
                        but a single garden fence turns a city into a grid of sealed boxes. The 13×13cm gap (the
                        official spec of the real-world{' '}
                        <a href="https://www.hedgehogstreet.org" target="_blank" rel="noreferrer">
                            Hedgehog Street
                        </a>{' '}
                        campaign) is small enough to keep pets in and large enough to keep a population connected.
                    </p>
                    <p>
                        More than 130,000 of these holes have been registered across Britain. Sir David Attenborough
                        followed one hedgehog through them in{' '}
                        <a href="https://www.youtube.com/watch?v=Gsd5_xzebH0" target="_blank" rel="noreferrer">
                            Wild London
                        </a>
                        .
                    </p>
                </section>

                <div className="un-page-help" data-unter-id="page-help">
                    <b>Was this page helpful?</b>
                    {helpAnswered ? (
                        <span className="un-thanks" role="status">
                            Thanks. Noted.
                        </span>
                    ) : (
                        <div className="un-yn">
                            <button onClick={() => setHelpAnswered(true)}>Yes</button>
                            <button onClick={() => setHelpAnswered(true)}>No, and I have opinions</button>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}
