import React from 'react'
import CloudinaryImage from 'components/CloudinaryImage'
import Link from 'components/Link'
import { INK, PAPER } from './heroData'

const CORAL = '#E1554E'

export default function NaturalistIntro(): JSX.Element {
    return (
        <section className="ni" id="about">
            <div className="ni-inner">
                <figure className="ni-portrait">
                    <img
                        src="https://res.cloudinary.com/dmukukwp6/image/upload/w_560,c_limit,q_auto,f_auto/naturalist_original_e340d704b2.png"
                        alt="Sir Bartholomew Hogworth, F.R.S."
                        loading="lazy"
                    />
                    <figcaption>
                        <span className="ni-name">Sir Bartholomew Hogworth, F.R.S.</span>
                        <span className="ni-role">Naturalist &amp; compiler</span>
                    </figcaption>
                </figure>

                <h2 className="ni-eyebrow">A note from the naturalist</h2>
                <p className="ni-p">
                    There is a particular kind of patience required to watch users. In my early years of fieldwork,
                    before any of this was possible, I would sit at the edge of a single{' '}
                    <Link to="/session-replay" state={{ newWindow: true }} className="ni-inline-link">
                        session recording
                    </Link>{' '}
                    and wait. Most yielded nothing. A handful would reveal something so quietly remarkable that it
                    justified the previous forty hours of nothing in particular. By tradition, the rate of user species
                    discovery is slow.
                </p>
                <p className="ni-p">
                    Until the nice people of PostHog made{' '}
                    <Link to="/replay-vision" state={{ newWindow: true }} className="ni-inline-link">
                        Replay Vision
                    </Link>
                    . Replay Vision watches every session on a schedule that does not require my presence. It
                    prioritizes the problems worth surfacing, and it brings the findings to whoever is meant to receive
                    them. The species are still out there in the field, behaving as they always have. They are simply
                    being cataloged without me. I no longer wade through the field; I only read the field notes that
                    come back and make decisions about the next step.
                </p>
                <p className="ni-p">
                    This is, in essence, the same shift that has overtaken the motorcar, now applied to software. The
                    product{' '}
                    <Link to="/blog/self-driving-product" state={{ newWindow: true }} className="ni-inline-link">
                        self-drives
                    </Link>
                    , while the human reads the road ahead and decides what direction to take.
                </p>
                <p className="ni-p">
                    The species cataloged here are the ones we have observed often enough to name. There are more,
                    almost certainly living in your product right now. Replay Vision is still watching. The field guide
                    that follows is, in effect, a list of things you no longer have to look for yourself. Your job is to
                    decide what to do about the Rage-Clicker.
                </p>
                <p className="ni-sig">– Sir Bartholomew Hogworth, F.R.S. First Edition, 2026</p>
                <CloudinaryImage
                    src="https://res.cloudinary.com/dmukukwp6/image/upload/Group_144532_e9e68b845b.png"
                    alt="The naturalist watching from the long grass"
                    width={1120}
                    className="ni-grass"
                    imgClassName="ni-grass-img"
                    loading="lazy"
                />
            </div>

            <style>{`
                .ni {
                    container-type: inline-size;
                    background: ${PAPER};
                    color: ${INK};
                    padding: 0 clamp(1rem, 5cqw, 3rem) clamp(2rem, 5cqw, 4rem);
                }
                /* The rule sits on the inner column, so it matches every other rule in the guide */
                .ni-inner {
                    max-width: 1000px;
                    margin: 0 auto;
                    border-top: 1px solid rgba(69, 28, 1, 0.15);
                    padding-top: clamp(2rem, 5cqw, 4rem);
                }
                /* Closes the page: clears the floated portrait, then sits centred beneath */
                .ni-grass {
                    display: block;
                    clear: both;
                    width: clamp(280px, 72%, 620px);
                    margin: clamp(1.5rem, 4cqw, 3rem) auto 0;
                }
                .ni-grass-img { display: block; width: 100%; height: auto; }
                .ni-inner::after {
                    content: '';
                    display: block;
                    clear: both;
                }
                /* Floated, not a column: he stands against the opening paragraphs and the
                   rest of the foreword closes under him at full width */
                .ni-portrait {
                    float: left;
                    width: clamp(200px, 34%, 330px);
                    margin: 0.35rem clamp(1.5rem, 4cqw, 2.75rem) 1.25rem 0;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 0.85rem;
                }
                .ni-portrait img {
                    width: 100%;
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
                    letter-spacing: 0.8px;
                    font-size: clamp(20px, 3.2cqw, 28px);
                    line-height: 1.1;
                    color: ${CORAL};
                    margin: 0 0 1rem;
                }
                .ni-p {
                    font-size: clamp(14px, 1.7cqw, 16px);
                    line-height: 1.65;
                    margin: 0 0 1.15rem;
                    color: ${INK};
                }
                .ni-sig {
                    font-style: italic;
                    font-size: clamp(13px, 1.5cqw, 15px);
                    margin: 1.35rem 0 0;
                    color: ${INK};
                }
                .ni-inline-link {
                    color: ${INK};
                    font-weight: 600;
                    text-decoration: underline;
                    text-underline-offset: 2px;
                    text-decoration-thickness: 1px;
                }
                .ni-inline-link:hover { color: ${CORAL}; }
                @container (max-width: 640px) {
                    .ni-portrait {
                        float: none;
                        width: clamp(170px, 58%, 250px);
                        margin: 0 auto 1.5rem;
                    }
                }
            `}</style>
        </section>
    )
}
