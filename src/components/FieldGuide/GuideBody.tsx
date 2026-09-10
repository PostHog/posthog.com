import React from 'react'
import { INK, PAPER } from './heroData'

const CORAL = '#E1554E'
import SpecimenMap from './SpecimenMap'

export default function GuideBody(): JSX.Element {
    return (
        <section className="gb">
            <div className="gb-inner">
                {/* Roughens aged-paper edges so callout + species plate read as torn book pages */}
                <svg className="gb-plate-defs" aria-hidden="true" focusable="false">
                    <filter id="fg-torn">
                        <feTurbulence
                            type="fractalNoise"
                            baseFrequency="0.012 0.016"
                            numOctaves={3}
                            seed={4}
                            result="noise"
                        />
                        <feDisplacementMap
                            in="SourceGraphic"
                            in2="noise"
                            scale={12}
                            xChannelSelector="R"
                            yChannelSelector="G"
                        />
                    </filter>
                </svg>
                <p className="gb-intro">
                    Learning what users do once meant sitting through recordings until something happened, which was
                    rare. That watching runs on its own now, and this guide is a catalog of what it keeps finding. Our
                    naturalist, Sir Bartholomew Hogworth, Fellow of the Royal Society, named the ten species below,
                    drawn from thousands of observed sessions.
                </p>
                <h2 id="the-species" className="gb-subtitle">
                    The species
                </h2>
                <figure className="gb-plate">
                    <SpecimenMap />
                    <figcaption className="gb-plate-caption">
                        Plate XI · A census of the common product user, drawn from life. Select a specimen to read its
                        entry.
                    </figcaption>
                </figure>
                <aside className="gb-ebook">
                    <p className="gb-ebook-text">
                        <strong>Want an actual book instead?</strong> Take it to the field, along with more of the
                        naturalist's personal notes.{' '}
                        {/* PDF not uploaded yet — drop the file at static/field-guide-to-wild-users.pdf to activate. */}
                        <a href="/field-guide-to-wild-users.pdf" download className="gb-ebook-link">
                            Download the PDF
                        </a>
                        .
                    </p>
                </aside>
            </div>

            <style>{`
                .gb {
                    container-type: inline-size;
                    background: ${PAPER};
                    color: ${INK};
                    padding: 0 clamp(1rem, 5cqw, 3rem) clamp(2rem, 5cqw, 4rem);
                }
                .gb-inner {
                    max-width: 1000px;
                    margin: 0 auto;
                    border-top: 1px solid rgba(69, 28, 1, 0.15);
                    padding-top: clamp(2rem, 5cqw, 4rem);
                }
                .gb-p {
                    font-size: clamp(14px, 1.7cqw, 16px);
                    line-height: 1.65;
                    margin: 0 0 1.15rem;
                    max-width: 68ch;
                }
                .gb-p--full { max-width: none; }
                .gb-sig { font-style: italic; font-size: 14px; margin: 1.25rem 0 0; }
                /* Prose on the left, the naturalist watching from the grass on the right */
                .gb-hog-img {
                    display: block;
                    width: 100%;
                    height: auto;
                    filter: drop-shadow(3px 5px 4px rgba(69, 28, 1, 0.25));
                }

                .gb-intro {
                    font-size: clamp(14px, 1.7cqw, 16px);
                    line-height: 1.65;
                    margin: 0 0 1.5rem;
                    text-align: center;
                    color: ${INK};
                }
                /* Matches the About heading, so the page's two section titles read as a pair.
                   The rule above it is the same hairline that divides the sections. */
                .gb-subtitle {
                    font-family: 'RoundHog', sans-serif;
                    font-weight: 800;
                    text-transform: uppercase;
                    letter-spacing: 0.8px;
                    font-size: clamp(20px, 3.2cqw, 28px);
                    line-height: 1.1;
                    text-align: center;
                    border-top: 1px solid rgba(69, 28, 1, 0.15);
                    padding-top: clamp(1.5rem, 4cqw, 2.5rem);
                    margin: clamp(1.5rem, 4cqw, 2.5rem) 0 1.25rem;
                    color: ${CORAL};
                }
                /* Torn aged-paper strip, matching the species plate */
                .gb-ebook {
                    position: relative;
                    isolation: isolate;
                    width: fit-content;
                    max-width: min(100%, 46rem);
                    margin: clamp(1.5rem, 3.5cqw, 2.25rem) auto 0;
                    padding: clamp(0.9rem, 2.2cqw, 1.4rem) clamp(1.5rem, 3.5cqw, 2.25rem);
                }
                .gb-ebook::before {
                    content: '';
                    position: absolute;
                    inset: 0;
                    z-index: -1;
                    background: radial-gradient(120px 80px at 12% 40%, rgba(120, 82, 30, 0.06), transparent 70%),
                        radial-gradient(140px 90px at 88% 60%, rgba(120, 82, 30, 0.05), transparent 70%),
                        linear-gradient(158deg, #f6f2e1 0%, #efe8cf 60%, #e7dec1 100%);
                    border: 1px solid rgba(69, 28, 1, 0.3);
                    box-shadow: inset 0 0 28px rgba(69, 28, 1, 0.08), 0 8px 20px rgba(69, 28, 1, 0.16);
                    filter: url(#fg-torn);
                }
                .gb-ebook-text {
                    margin: 0;
                    text-align: center;
                    font-size: clamp(14px, 1.7cqw, 16px);
                    line-height: 1.55;
                    color: ${INK};
                }
                .gb-ebook-text strong { font-weight: 700; }
                .gb-ebook-link {
                    color: ${INK};
                    font-weight: 700;
                    text-decoration: none;
                    border-bottom: 2px solid #E1554E;
                    padding-bottom: 1px;
                }
                .gb-ebook-link:hover { color: #E1554E; }
                .gb-plate-defs { position: absolute; width: 0; height: 0; }
                .gb-plate {
                    position: relative;
                    margin: 0;
                    padding: clamp(1.75rem, 4cqw, 3.25rem) clamp(1rem, 3cqw, 2.25rem) clamp(2rem, 4cqw, 2.75rem);
                    isolation: isolate;
                }
                /* Aged, torn book page sitting behind the specimens */
                .gb-plate::before {
                    content: '';
                    position: absolute;
                    inset: 0;
                    z-index: -1;
                    background: radial-gradient(120px 90px at 17% 20%, rgba(120, 82, 30, 0.07), transparent 70%),
                        radial-gradient(150px 110px at 83% 66%, rgba(120, 82, 30, 0.06), transparent 70%),
                        radial-gradient(90px 70px at 62% 14%, rgba(120, 82, 30, 0.05), transparent 70%),
                        linear-gradient(158deg, #f6f2e1 0%, #efe8cf 55%, #e6ddc0 100%);
                    border: 1px solid rgba(69, 28, 1, 0.3);
                    box-shadow: inset 0 0 44px rgba(69, 28, 1, 0.1), 0 12px 30px rgba(69, 28, 1, 0.2);
                    filter: url(#fg-torn);
                }
                .gb-plate-caption {
                    margin-top: clamp(1.25rem, 3cqw, 2rem);
                    text-align: center;
                    font-style: italic;
                    font-size: clamp(11px, 1.3cqw, 13px);
                    letter-spacing: 0.3px;
                    color: rgba(69, 28, 1, 0.6);
                }

                /* Closing note: half text, half naturalist, both standing on the same line */
            `}</style>
        </section>
    )
}
