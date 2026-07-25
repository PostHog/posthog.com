import React, { useState } from 'react'
import BadgerRadar from './BadgerRadar'

// Safety page card icons
const safetyIconProps = {
    className: 'un-sicon',
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: '#000',
    strokeWidth: 1.8,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true,
}

export const ShieldIcon = (): JSX.Element => (
    <svg {...safetyIconProps}>
        <path d="M12 2 20 5.5 V11 C20 16.5 12 21.5 12 21.5 C12 21.5 4 16.5 4 11 V5.5 Z" />
        <path d="M8.5 11.5 11 14 15.5 9" />
    </svg>
)

export const BellIcon = (): JSX.Element => (
    <svg {...safetyIconProps}>
        <path d="M6 9 a6 6 0 0 1 12 0 c0 5 2 6.5 2 6.5 H4 c0 0 2-1.5 2-6.5" />
        <path d="M10 19.5 a2.2 2.2 0 0 0 4 0" />
    </svg>
)

export const NoRoadIcon = (): JSX.Element => (
    <svg {...safetyIconProps}>
        <circle cx="12" cy="12" r="9" />
        <line x1="5.5" y1="5.5" x2="18.5" y2="18.5" />
    </svg>
)

export const StarIcon = (): JSX.Element => (
    <svg {...safetyIconProps}>
        <path d="M12 3 14.7 8.6 20.8 9.4 16.4 13.7 17.5 19.8 12 16.9 6.5 19.8 7.6 13.7 3.2 9.4 9.3 8.6 Z" />
    </svg>
)

export const LockIcon = (): JSX.Element => (
    <svg {...safetyIconProps}>
        <rect x="5" y="10" width="14" height="10" rx="2" />
        <path d="M8 10 V7 a4 4 0 0 1 8 0 v3" />
        <circle cx="12" cy="15" r="1.6" fill="#000" stroke="none" />
    </svg>
)

export const WarnIcon = (): JSX.Element => (
    <svg {...safetyIconProps}>
        <path d="M12 3 21 19 H3 Z" />
        <line x1="12" y1="10" x2="12" y2="14" />
        <circle cx="12" cy="16.6" r="0.6" fill="#000" stroke="none" />
    </svg>
)

export default function SafetyPage(): JSX.Element {
    const [helpAnswered, setHelpAnswered] = useState(false)

    return (
        <>
            <section className="un-safety-hero">
                <div className="un-shell">
                    <h1 className="un-h1">Getting small things across a big city.</h1>
                    <p className="un-lede">
                        Roads ended the old routes, so the network runs through gardens instead. Everything else that
                        can go wrong out there at night, we have thought about at length.
                    </p>
                </div>
            </section>
            <div className="un-shell">
                <section className="un-safe-grid">
                    <div className="un-safe-card">
                        <ShieldIcon />
                        <h3>Verified gaps only</h3>
                        <p>
                            Every gap on the network is measured on registration. 13cm nominal, no exceptions. An 11cm
                            gap is how you end up with a stuck hedgehog and a viral video at his expense.
                        </p>
                    </div>
                    <div className="un-safe-card">
                        <BellIcon />
                        <h3>Crossing check-ins</h3>
                        <p>
                            Long crossing? We ping your burrow when you arrive. If you stop moving for more than 40
                            minutes near a bird bath, we assume you found something to eat and stop worrying.
                        </p>
                    </div>

                    <BadgerRadar />

                    <div className="un-safe-card">
                        <NoRoadIcon />
                        <h3>No roads. Ever.</h3>
                        <p>
                            Unter will never route you across tarmac. If the only way is a road, we cancel the trip and
                            quietly email three nearby humans about their fences.
                        </p>
                    </div>
                    <div className="un-safe-card">
                        <StarIcon />
                        <h3>Rated by the community</h3>
                        <p>
                            Gaps get reviews. “Snug but fair.” “Splinter on the left edge, 3 stars.” Hosts fix what
                            riders flag.
                        </p>
                    </div>
                    <div className="un-safe-card">
                        <LockIcon />
                        <h3>Scent-PIN verification</h3>
                        <p>
                            Every crossing gets a scent-PIN. Your hedgehog sniffs the gap post to confirm it's the right
                            one. Wrong scent, no entry. And yes, they queue to sniff. It's very orderly.
                        </p>
                    </div>
                    <div className="un-safe-card">
                        <WarnIcon />
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
                        <span className="un-thanks">Thanks. Noted.</span>
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
