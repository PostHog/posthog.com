import React from 'react'
import Link from 'components/Link'
import { INK, PAPER } from './heroData'

const CORAL = '#E1554E'

export default function NaturalistIntro(): JSX.Element {
    return (
        <section className="ni">
            <div className="ni-inner">
                <figure className="ni-portrait">
                    <img
                        src="/images/field-guide/naturalist.png"
                        alt="Sir Bartholomew Hogworth, F.R.S."
                        loading="lazy"
                    />
                    <figcaption>
                        <span className="ni-name">Sir Bartholomew Hogworth, F.R.S.</span>
                        <span className="ni-role">Naturalist &amp; compiler</span>
                    </figcaption>
                </figure>

                <div className="ni-text">
                    <p className="ni-eyebrow">From the naturalist</p>
                    <p className="ni-lead">
                        Watching users used to mean sitting at a single session recording, waiting. Most of the time,
                        nothing happened.{' '}
                        <Link to="/replay-vision" state={{ newWindow: true }} className="ni-inline-link">
                            Replay Vision
                        </Link>{' '}
                        changed that. It reviews every session on its own and surfaces the ones worth opening: a
                        rage-click at checkout, a fourteenth reload of a dead page. What follows is a catalog of the
                        species it keeps finding. This guide contains the ones we found, and serves to inspire you to
                        look for them in your own product, or discover entirely new worlds.
                    </p>
                    <Link to="/field-guide/foreword" state={{ newWindow: true }} className="ni-link">
                        Read the full foreword →
                    </Link>
                </div>
            </div>

            <style>{`
                .ni {
                    container-type: inline-size;
                    background: ${PAPER};
                    color: ${INK};
                    border-top: 1px solid rgba(69, 28, 1, 0.15);
                    padding: clamp(2rem, 5cqw, 4rem) clamp(1rem, 5cqw, 3rem);
                }
                .ni-inner {
                    max-width: 1000px;
                    margin: 0 auto;
                    display: grid;
                    grid-template-columns: minmax(0, 38%) 1fr;
                    gap: clamp(1.5rem, 5cqw, 4rem);
                    align-items: center;
                }
                .ni-portrait {
                    margin: 0;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 0.85rem;
                }
                .ni-portrait img {
                    width: clamp(150px, 62%, 240px);
                    height: auto;
                    filter: drop-shadow(3px 5px 4px rgba(69, 28, 1, 0.25));
                }
                .ni-portrait figcaption {
                    text-align: center;
                    display: flex;
                    flex-direction: column;
                    gap: 3px;
                }
                .ni-name {
                    font-style: italic;
                    font-size: clamp(13px, 1.5cqw, 15px);
                    color: ${INK};
                }
                .ni-role {
                    font-family: 'RoundHog', sans-serif;
                    font-weight: 800;
                    text-transform: uppercase;
                    letter-spacing: 0.6px;
                    font-size: 10px;
                    opacity: 0.55;
                }
                .ni-eyebrow {
                    font-family: 'RoundHog', sans-serif;
                    font-weight: 800;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    font-size: 12px;
                    color: ${CORAL};
                    margin: 0 0 0.85rem;
                }
                .ni-lead {
                    font-size: clamp(15px, 1.9cqw, 19px);
                    line-height: 1.6;
                    margin: 0 0 1.35rem;
                    color: ${INK};
                }
                .ni-link {
                    display: inline-block;
                    font-family: 'RoundHog', sans-serif;
                    font-weight: 800;
                    text-transform: uppercase;
                    letter-spacing: 0.6px;
                    font-size: 12px;
                    color: ${INK};
                    text-decoration: none;
                    border-bottom: 2px solid ${CORAL};
                    padding-bottom: 2px;
                }
                .ni-link:hover { color: ${CORAL}; }
                .ni-inline-link {
                    color: ${INK};
                    font-weight: 600;
                    text-decoration: underline;
                    text-underline-offset: 2px;
                    text-decoration-thickness: 1px;
                }
                .ni-inline-link:hover { color: ${CORAL}; }
                @container (max-width: 640px) {
                    .ni-inner { grid-template-columns: 1fr; justify-items: center; text-align: center; }
                }
            `}</style>
        </section>
    )
}
