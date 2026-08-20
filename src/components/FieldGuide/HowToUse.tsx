import React from 'react'
import Link from 'components/Link'
import { INK, PAPER } from './heroData'
import { ALL_SPECIES } from './speciesData'

const CORAL = '#E1554E'

const STRUCTURE: { label: string; body: string }[] = [
    {
        label: 'Appearance',
        body: 'Visible characteristics, behavioral tells, and any features by which the species may be reliably identified in the field.',
    },
    { label: 'Habitat', body: 'The regions of a product where the species is most often encountered.' },
    {
        label: 'Field notes',
        body: "A narrative description of the species at work, drawn from many hundreds of observed sessions. The naturalist's opinions are kept out wherever possible.",
    },
    {
        label: 'Resolution',
        body: 'How the session ends for this species, whether that is conversion, abandonment, a support ticket, or a quiet return days later.',
    },
    {
        label: 'Hazards observed',
        body: "Environmental factors that appear to provoke or accelerate the species' defining behavior. Sometimes, under the reader's control.",
    },
    {
        label: 'Conservation status',
        body: "A short and informal assessment of the species' standing in the modern product.",
    },
    {
        label: 'If you spot one',
        body: 'Practical guidance for catching the species yourself, using Replay Vision.',
    },
]

export default function HowToUse(): JSX.Element {
    return (
        <section className="htu" id="how-to-use">
            <div className="htu-inner">
                <aside className="htu-ebook-callout">
                    <p className="htu-ebook-text">
                        <strong>Prefer reading it as an ebook?</strong> Take the whole guide with you into the field.{' '}
                        {/* PDF not uploaded yet — drop the file at static/field-guide-to-wild-users.pdf to activate. */}
                        <a href="/field-guide-to-wild-users.pdf" download className="htu-ebook-link">
                            Download the PDF
                        </a>
                        .
                    </p>
                </aside>

                <h2 className="htu-title">How to use this guide</h2>
                <p className="htu-p htu-p--full">
                    Each species in this guide follows the same structure, which has been refined over many years of
                    fieldwork and one or two arguments at the Royal Society dinner. The structure is as follows:
                </p>

                <dl className="htu-structure">
                    {STRUCTURE.map((s) => (
                        <div className="htu-row" key={s.label}>
                            <dt className="htu-term">{s.label}</dt>
                            <dd className="htu-desc">{s.body}</dd>
                        </div>
                    ))}
                </dl>

                <p className="htu-p">
                    The species are presented in no particular order. They are not ranked by frequency, importance, or
                    severity, on the principle that a field naturalist's job is to only observe what is there without
                    judgement.
                </p>
                <p className="htu-p">
                    The guide may be read cover to cover or kept by the desk and consulted whenever a session begins to
                    behave in ways the reader does not immediately recognize. The Latin binomials are of the author's
                    own composition. Their academic legitimacy is at your own interpretation.
                </p>
                <p className="htu-sig">– S.B.H.</p>

                <h3 id="the-species" className="htu-subtitle">
                    The species
                </h3>
                <figure className="htu-plate">
                    {/* Roughens the aged-paper edge so the plate reads as a torn book page */}
                    <svg className="htu-plate-defs" aria-hidden="true" focusable="false">
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
                    <ul className="htu-plate-grid">
                        {ALL_SPECIES.map((s) => (
                            <li key={s.slug}>
                                <Link
                                    to={s.route}
                                    state={{ newWindow: true }}
                                    className="htu-specimen"
                                    aria-label={`${s.name} — open field guide entry`}
                                >
                                    <span className="htu-specimen-img">
                                        {s.heroImage ? (
                                            <img src={s.heroImage} alt={s.name} loading="lazy" />
                                        ) : (
                                            <span className="htu-specimen-pending" aria-hidden="true">
                                                ?
                                            </span>
                                        )}
                                    </span>
                                    <span className="htu-specimen-name">{s.name}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <figcaption className="htu-plate-caption">
                        Plate XI · A census of the common product user, drawn from life
                    </figcaption>
                </figure>

                <div className="htu-closing">
                    <p className="htu-closing-text">
                        The watching does not stop when you close this guide.{' '}
                        <Link to="/replay-vision" state={{ newWindow: true }} className="htu-closing-link">
                            Replay Vision
                        </Link>{' '}
                        keeps its eye on every session while you build, and brings the ones worth your attention back to
                        you.
                    </p>
                    <Link to="/field-guide/closing-note" state={{ newWindow: true }} className="htu-closing-more">
                        Read the full closing note
                    </Link>
                </div>
            </div>

            <style>{`
                .htu {
                    container-type: inline-size;
                    background: ${PAPER};
                    color: ${INK};
                    border-top: 1px solid rgba(69, 28, 1, 0.15);
                    padding: clamp(2rem, 5cqw, 4rem) clamp(1rem, 5cqw, 3rem);
                }
                .htu-inner { max-width: 1000px; margin: 0 auto; }
                .htu-title {
                    font-family: 'RoundHog', sans-serif;
                    font-weight: 800;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                    font-size: clamp(22px, 3.5cqw, 32px);
                    margin: 0 0 1.25rem;
                    color: ${INK};
                }
                .htu-ebook-callout {
                    display: flex;
                    align-items: center;
                    gap: clamp(0.75rem, 2cqw, 1.25rem);
                    background: rgba(247, 165, 1, 0.14);
                    border: 1px solid rgba(69, 28, 1, 0.2);
                    border-left: 4px solid var(--yellow, #F7A501);
                    border-radius: 8px;
                    padding: clamp(0.85rem, 2.5cqw, 1.35rem) clamp(1rem, 3cqw, 1.75rem);
                    margin: 0 0 2rem;
                }
                .htu-ebook-icon { font-size: clamp(22px, 3cqw, 30px); line-height: 1; flex-shrink: 0; }
                .htu-ebook-text {
                    margin: 0;
                    font-size: clamp(14px, 1.7cqw, 16px);
                    line-height: 1.55;
                    color: ${INK};
                }
                .htu-ebook-text strong { font-weight: 700; }
                .htu-ebook-link {
                    color: ${INK};
                    font-weight: 700;
                    text-decoration: none;
                    border-bottom: 2px solid ${CORAL};
                    padding-bottom: 1px;
                }
                .htu-ebook-link:hover { color: ${CORAL}; }
                .htu-p {
                    font-size: clamp(14px, 1.7cqw, 16px);
                    line-height: 1.65;
                    margin: 0 0 1.15rem;
                    max-width: 68ch;
                }
                .htu-p--full { max-width: none; }
                .htu-sig { font-style: italic; font-size: 14px; margin: 0.5rem 0 0; }
                .htu-structure {
                    margin: 1.75rem 0;
                    border-top: 1px solid rgba(69, 28, 1, 0.15);
                }
                .htu-row {
                    display: grid;
                    grid-template-columns: minmax(140px, 26%) 1fr;
                    gap: clamp(0.75rem, 3cqw, 2.5rem);
                    padding: 1.1rem 0;
                    border-bottom: 1px solid rgba(69, 28, 1, 0.15);
                    align-items: center;
                }
                .htu-term {
                    margin: 0;
                    font-family: 'RoundHog', sans-serif;
                    font-weight: 800;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                    font-size: 12px;
                    line-height: 1.3;
                    color: ${INK};
                }
                .htu-desc { margin: 0; font-size: clamp(13px, 1.6cqw, 15px); line-height: 1.55; }
                @container (max-width: 560px) {
                    .htu-row { grid-template-columns: 1fr; gap: 0.25rem; }
                }

                .htu-subtitle {
                    font-family: 'RoundHog', sans-serif;
                    font-weight: 800;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                    font-size: clamp(16px, 2.5cqw, 22px);
                    margin: 2.5rem 0 1.25rem;
                    color: ${INK};
                }
                .htu-plate-defs { position: absolute; width: 0; height: 0; }
                .htu-plate {
                    position: relative;
                    margin: 0;
                    padding: clamp(1.75rem, 4cqw, 3.25rem) clamp(1.5rem, 4cqw, 3rem) clamp(2rem, 4cqw, 2.75rem);
                    isolation: isolate;
                }
                /* Aged, torn book page sitting behind the specimens */
                .htu-plate::before {
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
                .htu-plate-grid {
                    list-style: none;
                    margin: 0;
                    padding: 0;
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(116px, 1fr));
                    grid-auto-rows: 1fr;
                    gap: clamp(1rem, 3cqw, 2rem) clamp(0.5rem, 2cqw, 1.25rem);
                }
                .htu-plate-grid > li { display: flex; }
                .htu-specimen {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: flex-start;
                    gap: 0.5rem;
                    text-align: center;
                    text-decoration: none;
                    padding: 0.25rem;
                    transition: transform 150ms ease;
                }
                .htu-specimen:hover { transform: translateY(-3px); }
                .htu-specimen-img {
                    height: clamp(58px, 9cqw, 84px);
                    display: flex;
                    align-items: flex-end;
                    justify-content: center;
                }
                .htu-specimen-img img {
                    max-height: 100%;
                    max-width: 92%;
                    width: auto;
                    height: auto;
                    filter: drop-shadow(1px 3px 2px rgba(69, 28, 1, 0.22));
                }
                .htu-specimen-pending {
                    align-self: center;
                    font-family: 'RoundHog', sans-serif;
                    font-weight: 800;
                    font-size: 34px;
                    color: rgba(69, 28, 1, 0.28);
                }
                .htu-specimen-name {
                    font-family: Georgia, 'Iowan Old Style', 'Palatino Linotype', 'Times New Roman', serif;
                    font-style: italic;
                    font-size: clamp(12px, 1.5cqw, 14px);
                    line-height: 1.25;
                    color: ${INK};
                    /* Reserve two lines so single- and double-line names align */
                    min-height: 2.5em;
                    display: flex;
                    align-items: flex-start;
                    justify-content: center;
                }
                .htu-specimen:hover .htu-specimen-name {
                    color: ${CORAL};
                    text-decoration: underline;
                    text-underline-offset: 2px;
                }
                .htu-plate-caption {
                    margin-top: clamp(1.25rem, 3cqw, 2rem);
                    text-align: center;
                    font-family: Georgia, 'Iowan Old Style', 'Palatino Linotype', 'Times New Roman', serif;
                    font-style: italic;
                    font-size: clamp(11px, 1.3cqw, 13px);
                    letter-spacing: 0.3px;
                    color: rgba(69, 28, 1, 0.6);
                }

                .htu-closing {
                    margin-top: 2.5rem;
                    padding-top: 1.75rem;
                    border-top: 1px solid rgba(69, 28, 1, 0.15);
                    text-align: center;
                }
                .htu-closing-text {
                    font-size: clamp(15px, 1.9cqw, 18px);
                    line-height: 1.6;
                    max-width: 52rem;
                    margin: 0 auto 1.25rem;
                    color: ${INK};
                }
                .htu-closing-link {
                    color: ${INK};
                    font-weight: 600;
                    text-decoration: underline;
                    text-underline-offset: 2px;
                    text-decoration-thickness: 1px;
                }
                .htu-closing-link:hover { color: ${CORAL}; }
                .htu-closing-more {
                    display: block;
                    margin-top: 1rem;
                    font-style: italic;
                    font-size: 13px;
                    color: ${INK};
                    opacity: 0.7;
                    text-decoration: underline;
                    text-underline-offset: 2px;
                }
                .htu-closing-more:hover { opacity: 1; color: ${CORAL}; }
            `}</style>
        </section>
    )
}
