import React from 'react'
import { IconPerson } from '@posthog/icons'
import { UnterPageId } from '../overlay/types'

export default function RidePage({ onNavigate }: { onNavigate: (page: UnterPageId) => void }): JSX.Element {
    return (
        <>
            <div className="un-shell">
                <div className="un-promo">
                    <span className="un-tag">NEWS</span>
                    <span>
                        <b>We raised $40M to cut holes in fences.</b>
                    </span>
                    <button className="un-plink" data-unter-id="promo-link" onClick={() => onNavigate('highway')}>
                        Read the announcement →
                    </button>
                </div>

                <section className="un-hero">
                    <div>
                        <h2 className="un-h1" data-unter-id="hero-headline">
                            Go anywhere. Under everything.
                        </h2>
                        <div data-unter-id="ride-form">
                            <div className="un-stops">
                                <div className="un-field">
                                    <span className="un-geo-dot" />
                                    <input
                                        type="text"
                                        aria-label="Pickup point"
                                        placeholder="Pickup point"
                                        defaultValue="Parsons Green Station"
                                    />
                                </div>
                                <div className="un-field" data-unter-id="input-destination">
                                    <span className="un-geo-sq" />
                                    <input
                                        type="text"
                                        aria-label="Destination"
                                        placeholder="Where to?"
                                        defaultValue="The HedgeHouse"
                                    />
                                </div>
                            </div>
                            <div className="un-form-ctas">
                                <button className="un-btn-black" data-unter-id="btn-see-prices">
                                    See prices
                                </button>
                                <button className="un-btn-gray">Check availability</button>
                            </div>
                        </div>
                    </div>

                    <div className="un-mapwrap">
                        <div className="un-ph un-ph-map">Map</div>
                    </div>
                </section>

                <button type="button" className="un-acct-row" data-unter-id="acct-row">
                    <span className="un-pic">
                        <IconPerson />
                    </span>
                    <span className="un-acct-text">
                        <span className="un-acct-title">Log in to see your recent crossings</span>
                        <span className="un-acct-sub">
                            View past routes, favourite gaps, and that one incident with the decking.
                        </span>
                    </span>
                    <span className="un-chev">→</span>
                </button>

                <h2 className="un-sec-label">Choose how you cross</h2>
                {/* The section is a target as well as the first card: a heatmap compares
                    all three options at once, while the named event fires for whichever
                    one you pick. */}
                <section className="un-tiers" data-unter-id="tiers">
                    <button type="button" className="un-tier" data-unter-id="tier-solo">
                        <span className="un-ph un-art" aria-hidden />
                        <span className="un-tier-name">Unter Solo</span>
                        <span className="un-tier-desc">One hedgehog, one standard gap. The classic night out.</span>
                        <span className="un-go">
                            <span className="un-price">From £3</span>
                            <span className="un-arrow">→</span>
                        </span>
                    </button>
                    <button type="button" className="un-tier">
                        <span className="un-ph un-art" aria-hidden />
                        <span className="un-tier-name">Unter XL</span>
                        <span className="un-tier-desc">
                            For the unusually round. We route you via the 15cm accessible gaps only.
                        </span>
                        <span className="un-go">
                            <span className="un-price">From £5</span>
                            <span className="un-arrow">→</span>
                        </span>
                    </button>
                    <button type="button" className="un-tier">
                        <span className="un-ph un-art" aria-hidden />
                        <span className="un-tier-name">Unter Pool</span>
                        <span className="un-tier-desc">Share the route with hedgehogs heading your way.</span>
                        <span className="un-go">
                            <span className="un-price">From £2</span>
                            <span className="un-arrow">→</span>
                        </span>
                    </button>
                </section>

                {/* The whole section is the annotation target, not just the button: the
                    feature flag hides the entire feature, heading included. */}
                <section className="un-featrow" data-unter-id="reserve-feature">
                    <div>
                        <h2 className="un-h2">Reserve a dusk crossing</h2>
                        <p className="un-lede">
                            Book up to seven nights ahead. The gap is held until 15 minutes past sunset, then it goes
                            back in the pool for someone else. Popular for first dates.
                        </p>
                        <div className="un-ctas">
                            <button className="un-btn-black">Reserve a crossing</button>
                            <button className="un-btn-gray">Learn more</button>
                        </div>
                    </div>
                    <div className="un-featart">
                        <div className="un-ph" aria-hidden />
                    </div>
                </section>

                <h2 className="un-sec-label" style={{ marginTop: 40 }}>
                    It's easier in the apps
                </h2>
                <section className="un-apps" data-unter-id="app-row">
                    <button type="button" className="un-app-card">
                        <span className="un-qr">
                            <span className="un-ph un-ph-qr">QR</span>
                        </span>
                        <span className="un-app-text">
                            <span className="un-app-name">Unter app</span>
                            <span className="un-app-desc">
                                For hedgehogs. Scan to download, or sniff the code directly. It's scent-enabled.
                            </span>
                        </span>
                        <span className="un-chev">→</span>
                    </button>
                    <button type="button" className="un-app-card">
                        <span className="un-qr">
                            <span className="un-ph un-ph-qr">QR</span>
                        </span>
                        <span className="un-app-text">
                            <span className="un-app-name">Unter Host</span>
                            <span className="un-app-desc">
                                For the humans who cut the gaps. Gap health, crossing counts, and your borough
                                leaderboard.
                            </span>
                        </span>
                        <span className="un-chev">→</span>
                    </button>
                </section>
            </div>

            <section className="un-stats">
                <div className="un-shell">
                    <div>
                        <b>940</b>
                        <span>verified gaps in London</span>
                    </div>
                    <div>
                        <b>130,000+</b>
                        <span>holes cut nationwide</span>
                    </div>
                    <div>
                        <b>2am</b>
                        <span>is rush hour</span>
                    </div>
                </div>
            </section>

            <div className="un-shell">
                <section className="un-attnbrgh">
                    <blockquote>
                        “To get anywhere at all, he must rely on something rather wonderful: a hole in a fence, cut by a
                        human who cared.”
                    </blockquote>
                    <cite>
                        Paraphrasing Sir David Attenborough's{' '}
                        <a href="https://www.youtube.com/watch?v=Gsd5_xzebH0" target="_blank" rel="noreferrer">
                            Wild London
                        </a>{' '}
                        (hedgehog highways are real).
                        <br />
                        <a href="https://www.hedgehogstreet.org" target="_blank" rel="noreferrer">
                            Hedgehog Street
                        </a>{' '}
                        has registered 130,000+ of them.
                    </cite>
                </section>
            </div>
        </>
    )
}
