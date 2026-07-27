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
                        Roads ended the old routes, so the network runs through gardens instead. Everything else that
                        can go wrong out there at night, we have thought about at length.
                    </p>
                </div>
            </section>
            <div className="un-shell">
                <section className="un-safe-grid">
                    <div className="un-safe-card">
                        <IconRuler className="un-sicon" />
                        <h3>Verified gaps only</h3>
                        <p>
                            Every gap on the network is measured on registration. 13cm nominal, no exceptions. An 11cm
                            gap is how you end up with a stuck hedgehog and a viral video at his expense.
                        </p>
                    </div>
                    <div className="un-safe-card">
                        <IconBell className="un-sicon" />
                        <h3>Crossing check-ins</h3>
                        <p>
                            Long crossing? We ping your burrow when you arrive. If you stop moving for more than 40
                            minutes near a bird bath, we assume you found something to eat and stop worrying.
                        </p>
                    </div>

                    <CoverageMap />

                    <div className="un-safe-card" data-unter-id="safe-no-roads">
                        <IconX className="un-sicon" />
                        <h3>No roads. Ever.</h3>
                        <p>
                            Unter will never route you across tarmac. If the only way is a road, we cancel the trip and
                            quietly email three nearby humans about their fences.
                        </p>
                    </div>
                    <div className="un-safe-card">
                        <IconStar className="un-sicon" />
                        <h3>Rated by the community</h3>
                        <p>
                            Gaps get reviews. “Snug but fair.” “Splinter on the left edge, 3 stars.” Hosts fix what
                            riders flag.
                        </p>
                    </div>
                    <div className="un-safe-card">
                        <IconPassword className="un-sicon" />
                        <h3>Scent-PIN verification</h3>
                        <p>
                            Every crossing gets a scent-PIN. Your hedgehog sniffs the gap post to confirm it's the right
                            one. Wrong scent, no entry. And yes, they queue to sniff. It's very orderly.
                        </p>
                    </div>
                    <div className="un-safe-card">
                        <IconWarning className="un-sicon" />
                        <h3>Blocked-gap reports</h3>
                        <p>
                            New plant pot in front of the hole? Report it in the app. 94% of blockages are cleared by
                            the host before sunrise, usually with an apology note.
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
                        . He did not call it "Unter". We respect his restraint.
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
