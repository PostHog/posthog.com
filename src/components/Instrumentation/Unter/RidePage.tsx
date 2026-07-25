import React, { useState } from 'react'
import { UnterPageId } from '../overlay/types'

export const PersonIcon = (): JSX.Element => (
    <svg viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="1.8" strokeLinecap="round" aria-hidden>
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21 C4 16.5 7.5 14 12 14 C16.5 14 20 16.5 20 21" />
    </svg>
)

export default function RidePage({ onNavigate }: { onNavigate: (page: UnterPageId) => void }): JSX.Element {
    const [tripPulse, setTripPulse] = useState(false)

    const pulseTripCard = () => {
        setTripPulse(true)
        setTimeout(() => setTripPulse(false), 600)
    }

    return (
        <>
            <div className="un-shell">
                <div className="un-promo" data-unter-id="promo-banner">
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
                        <h1 className="un-h1" data-unter-id="hero-headline">
                            Go anywhere. Under everything.
                        </h1>
                        <div data-unter-id="ride-form">
                            <div className="un-stops">
                                <div className="un-field">
                                    <span className="un-geo-dot" />
                                    <input
                                        type="text"
                                        placeholder="Pickup point"
                                        defaultValue="Parsons Green Station"
                                    />
                                </div>
                                <div className="un-field" data-unter-id="input-destination">
                                    <span className="un-geo-sq" />
                                    <input type="text" placeholder="Where to?" defaultValue="The HedgeHouse" />
                                </div>
                            </div>
                            <div className="un-form-ctas">
                                <button className="un-btn-black" data-unter-id="btn-see-prices" onClick={pulseTripCard}>
                                    See prices
                                </button>
                                <button className="un-btn-gray">Check gap availability</button>
                            </div>
                        </div>
                    </div>

                    <div className="un-mapwrap" data-unter-id="garden-map">
                        <div className="un-ph un-ph-map">Map</div>
                        <div className={`un-trip-card${tripPulse ? ' pulse' : ''}`}>
                            <div className="un-avatar">M</div>
                            <div>
                                <b>Max</b>
                                <div className="un-sub">★ 4.9 · knows the rockery shortcut</div>
                            </div>
                            <div className="un-eta">
                                4<span>min</span>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="un-acct-row" data-unter-id="acct-row">
                    <span className="un-pic">
                        <PersonIcon />
                    </span>
                    <div>
                        <b>Log in to see your recent crossings</b>
                        <span>View past routes, favourite gaps, and that one incident with the decking.</span>
                    </div>
                    <span className="un-chev">→</span>
                </div>

                <h2 className="un-sec-label">Choose how you cross</h2>
                <section className="un-tiers">
                    <div className="un-tier">
                        <span className="un-ph un-art" aria-hidden />
                        <h3>Unter Solo</h3>
                        <p>One hedgehog, one standard gap. The classic night out.</p>
                        <div className="un-go">
                            <span className="un-price">From £3</span>
                            <span className="un-arrow">→</span>
                        </div>
                    </div>
                    <div className="un-tier" data-unter-id="tier-xl">
                        <span className="un-ph un-art" aria-hidden />
                        <h3>Unter XL</h3>
                        <p>For the unusually round. We route you via the 15cm accessible gaps only.</p>
                        <div className="un-go">
                            <span className="un-price">From £5</span>
                            <span className="un-arrow">→</span>
                        </div>
                    </div>
                    <div className="un-tier">
                        <span className="un-ph un-art" aria-hidden />
                        <h3>HighwayPool</h3>
                        <p>Share the route with hedgehogs heading your way.</p>
                        <div className="un-go">
                            <span className="un-price">From £2</span>
                            <span className="un-arrow">→</span>
                        </div>
                    </div>
                </section>

                <section className="un-featrow">
                    <div className="un-ftext">
                        <h2 className="un-h2">Reserve a dusk crossing</h2>
                        <p className="un-lede">
                            Book up to seven nights ahead. The gap is held until 15 minutes past sunset, then it goes
                            back in the pool for someone else. Popular for first dates at the compost heap.
                        </p>
                        <div className="un-ctas">
                            <button className="un-btn-black" data-unter-id="btn-reserve">
                                Reserve a crossing
                            </button>
                            <button className="un-btn-gray">Learn more</button>
                        </div>
                    </div>
                    <div className="un-featart">
                        <div className="un-ph">Image</div>
                    </div>
                </section>

                <section className="un-featrow rev">
                    <div className="un-ftext">
                        <h2 className="un-h2">Unter for Broods</h2>
                        <p className="un-lede">
                            One profile, up to six hoglets, shared arrival pings. Single file is enforced at the
                            protocol level. They will bicker the whole way, but they'll bicker in a line, and they'll
                            all turn up.
                        </p>
                        <div className="un-ctas">
                            <button className="un-btn-black" data-unter-id="btn-brood">
                                Start a brood profile
                            </button>
                        </div>
                    </div>
                    <div className="un-featart">
                        <div className="un-ph">Image</div>
                    </div>
                </section>

                <h2 className="un-sec-label" style={{ marginTop: 40 }}>
                    It's easier in the apps
                </h2>
                <section className="un-apps" data-unter-id="app-row">
                    <div className="un-app-card">
                        <span className="un-qr">
                            <span className="un-ph un-ph-qr">QR</span>
                        </span>
                        <div>
                            <h3>Unter app</h3>
                            <p>For hedgehogs. Scan to download, or sniff the code directly. It's scent-enabled.</p>
                        </div>
                        <span className="un-chev">→</span>
                    </div>
                    <div className="un-app-card">
                        <span className="un-qr">
                            <span className="un-ph un-ph-qr">QR</span>
                        </span>
                        <div>
                            <h3>Unter Host</h3>
                            <p>For humans with jigsaws. Gap health, crossing counts, and your borough leaderboard.</p>
                        </div>
                        <span className="un-chev">→</span>
                    </div>
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
