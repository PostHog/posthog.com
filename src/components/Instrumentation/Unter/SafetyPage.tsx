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
                        This is about keeping the hedgehogs safe, not the humans who host them. Here's what happens once
                        one of them is out at night looking for a gap.
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
                            11cm and you don't get a smaller doorway, you get a hedgehog stuck exactly halfway through
                            it.
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
                        <p>
                            Gaps get star ratings same as anything else you'd book. A host who gets called out for a
                            splintered edge fixes it fast, because nobody wants to be the two-star gap on their own
                            street.
                        </p>
                    </div>
                    <div className="un-safe-card">
                        <IconPassword className="un-sicon" />
                        <h3>Scent-PIN verification</h3>
                        <p>
                            Every hedgehog sniffs the gap post before going through, the network's version of a PIN.
                            They form an actual queue to do it, unprompted, which is more orderly than most humans
                            manage at a doorway.
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
