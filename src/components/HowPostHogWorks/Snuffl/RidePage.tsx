import React, { useState } from 'react'
import { SnufflPageId } from '../overlay/types'
import { BroodsArt, FakeQr, GardenMap, Hog, HogIcon, PersonIcon, ReserveArt } from './svgs'

export default function RidePage({ onNavigate }: { onNavigate: (page: SnufflPageId) => void }): JSX.Element {
    const [tripPulse, setTripPulse] = useState(false)

    const pulseTripCard = () => {
        setTripPulse(true)
        setTimeout(() => setTripPulse(false), 600)
    }

    return (
        <>
            <div className="sn-shell">
                <div className="sn-promo" data-snuffl-id="promo-banner">
                    <span className="sn-tag">NEW</span>
                    <span>
                        <b>Wild London just aired.</b> Network traffic is up 340% and Colin has never been busier.
                    </span>
                    <button className="sn-plink" onClick={() => onNavigate('highway')}>
                        Plan a crossing before 2am →
                    </button>
                </div>

                <section className="sn-hero">
                    <div>
                        <h1 className="sn-h1" data-snuffl-id="hero-headline">
                            Go anywhere. Under everything.
                        </h1>
                        <div data-snuffl-id="ride-form">
                            <div className="sn-stops">
                                <div className="sn-field">
                                    <span className="sn-geo-dot" />
                                    <input
                                        type="text"
                                        placeholder="Pickup burrow"
                                        defaultValue="Compost heap, No. 12"
                                    />
                                </div>
                                <div className="sn-field">
                                    <span className="sn-geo-sq" />
                                    <input type="text" placeholder="Where to?" defaultValue="Slug buffet, No. 46" />
                                </div>
                            </div>
                            <div className="sn-form-ctas">
                                <button
                                    className="sn-btn-black"
                                    data-snuffl-id="btn-see-prices"
                                    onClick={pulseTripCard}
                                >
                                    See prices
                                </button>
                                <button className="sn-btn-gray">Check gap availability</button>
                            </div>
                            <p className="sn-hint">
                                940 verified gaps across London. If a route would need a road, we don't offer the route.
                            </p>
                        </div>
                    </div>

                    <div className="sn-mapwrap" data-snuffl-id="garden-map">
                        <GardenMap />
                        <div className={`sn-trip-card${tripPulse ? ' pulse' : ''}`}>
                            <div className="sn-avatar">
                                <HogIcon />
                            </div>
                            <div>
                                <b>Colin</b>
                                <div className="sn-sub">★ 4.9 · knows the rockery shortcut</div>
                            </div>
                            <div className="sn-eta">
                                4<span>min</span>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="sn-acct-row" data-snuffl-id="acct-row">
                    <span className="sn-pic">
                        <PersonIcon />
                    </span>
                    <div>
                        <b>Log in to see your recent crossings</b>
                        <span>View past routes, favourite gaps, and that one incident with the decking.</span>
                    </div>
                    <span className="sn-chev">→</span>
                </div>

                <h2 className="sn-sec-label">Choose how you cross</h2>
                <section className="sn-tiers">
                    <div className="sn-tier">
                        <svg className="sn-art" viewBox="0 0 74 52" aria-hidden>
                            <Hog transform="translate(16,16) scale(1.9)" />
                        </svg>
                        <h3>Snuffl Solo</h3>
                        <p>One hedgehog, one standard gap. The classic night out.</p>
                        <div className="sn-go">
                            <span className="sn-price">From 3 slugs</span>
                            <span className="sn-arrow">→</span>
                        </div>
                    </div>
                    <div className="sn-tier" data-snuffl-id="tier-xl">
                        <svg className="sn-art" viewBox="0 0 74 52" aria-hidden>
                            <Hog transform="translate(8,12) scale(2.5)" />
                            <g stroke="#000" strokeWidth="1.4">
                                <line x1="10" y1="50" x2="66" y2="50" />
                                <line x1="10" y1="46.5" x2="10" y2="50" />
                                <line x1="66" y1="46.5" x2="66" y2="50" />
                            </g>
                        </svg>
                        <h3>Snuffl XL</h3>
                        <p>For the unusually round. We route you via the 15cm accessible gaps only.</p>
                        <div className="sn-go">
                            <span className="sn-price">From 5 slugs</span>
                            <span className="sn-arrow">→</span>
                        </div>
                    </div>
                    <div className="sn-tier">
                        <svg className="sn-art" viewBox="0 0 74 52" aria-hidden>
                            <Hog transform="translate(2,20) scale(1.5)" />
                            <Hog transform="translate(38,20) scale(1.5)" />
                        </svg>
                        <h3>HighwayPool</h3>
                        <p>
                            Share the route with hedgehogs heading your way. It's single file. It was always going to be
                            single file.
                        </p>
                        <div className="sn-go">
                            <span className="sn-price">From 2 slugs</span>
                            <span className="sn-arrow">→</span>
                        </div>
                    </div>
                </section>

                <section className="sn-featrow">
                    <div className="sn-ftext">
                        <h2 className="sn-h2">Reserve a dusk crossing</h2>
                        <p className="sn-lede">
                            Book up to seven nights ahead. The gap is held until 15 minutes past sunset, then it goes
                            back in the pool, because Colin has a schedule. Popular for first dates at the compost heap.
                        </p>
                        <div className="sn-ctas">
                            <button className="sn-btn-black" data-snuffl-id="btn-reserve">
                                Reserve a crossing
                            </button>
                            <button className="sn-btn-gray">Learn more</button>
                        </div>
                    </div>
                    <div className="sn-featart">
                        <ReserveArt />
                    </div>
                </section>

                <section className="sn-featrow rev">
                    <div className="sn-ftext">
                        <h2 className="sn-h2">Snuffl for Broods</h2>
                        <p className="sn-lede">
                            One profile, up to six hoglets, shared arrival pings. Single file is enforced at the
                            protocol level. They will bicker the whole way, but they'll bicker in a line, and they'll
                            all turn up.
                        </p>
                        <div className="sn-ctas">
                            <button className="sn-btn-black" data-snuffl-id="btn-brood">
                                Start a brood profile
                            </button>
                        </div>
                    </div>
                    <div className="sn-featart">
                        <BroodsArt />
                    </div>
                </section>

                <h2 className="sn-sec-label" style={{ marginTop: 40 }}>
                    It's easier in the apps
                </h2>
                <section className="sn-apps" data-snuffl-id="app-row">
                    <div className="sn-app-card">
                        <span className="sn-qr">
                            <FakeQr variant="rider" />
                        </span>
                        <div>
                            <h3>Snuffl app</h3>
                            <p>For hedgehogs. Scan to download, or snuffle the code directly. It's scent-enabled.</p>
                        </div>
                        <span className="sn-chev">→</span>
                    </div>
                    <div className="sn-app-card">
                        <span className="sn-qr">
                            <FakeQr variant="host" />
                        </span>
                        <div>
                            <h3>Snuffl Host</h3>
                            <p>For humans with jigsaws. Gap health, crossing counts, and your borough leaderboard.</p>
                        </div>
                        <span className="sn-chev">→</span>
                    </div>
                </section>
            </div>

            <section className="sn-stats">
                <div className="sn-shell">
                    <div>
                        <b>940</b>
                        <span>verified gaps in London</span>
                    </div>
                    <div>
                        <b>130,000+</b>
                        <span>holes cut nationwide</span>
                    </div>
                    <div>
                        <b>0</b>
                        <span>roads crossed, ever</span>
                    </div>
                    <div>
                        <b>2am</b>
                        <span>is rush hour</span>
                    </div>
                </div>
            </section>

            <div className="sn-shell">
                <section className="sn-attnbrgh">
                    <blockquote>
                        “To get anywhere at all, he must rely on something rather wonderful: a hole in a fence, cut by a
                        human who cared.”
                    </blockquote>
                    <cite>
                        Paraphrasing Sir David Attenborough's{' '}
                        <a href="https://www.youtube.com/watch?v=Gsd5_xzebH0" target="_blank" rel="noreferrer">
                            Wild London
                        </a>{' '}
                        — hedgehog highways are real.
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
