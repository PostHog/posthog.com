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
        body: 'What tends to happen to the species by the close of its session. Most outcomes fall into a small number of recognizable patterns.',
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
                <ul className="htu-grid">
                    {ALL_SPECIES.map((s) => (
                        <li key={s.slug}>
                            <Link
                                to={s.route}
                                state={{ newWindow: true }}
                                className="htu-card"
                                aria-label={`${s.name} — open field guide entry`}
                            >
                                <span className="htu-card-img">
                                    {s.heroImage ? (
                                        <img src={s.heroImage} alt={s.name} loading="lazy" />
                                    ) : (
                                        <span className="htu-card-pending" aria-hidden="true">
                                            ?
                                        </span>
                                    )}
                                </span>
                                <span className="htu-card-name">{s.name}</span>
                            </Link>
                        </li>
                    ))}
                </ul>

                <div className="htu-closing">
                    <p className="htu-closing-text">
                        These are the species we have seen often enough to name. There are more in your own product,
                        waiting to be catalogued. The watching does not stop when you close this guide.{' '}
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
                    font-family: 'RoundHog', sans-serif;
                    font-weight: 800;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                    font-size: 12px;
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
                .htu-grid {
                    list-style: none;
                    margin: 0;
                    padding: 0;
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
                    gap: clamp(0.5rem, 2cqw, 1rem);
                }
                .htu-card {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 0.6rem;
                    text-align: center;
                    padding: 1rem 0.75rem;
                    border: 1px solid ${CORAL};
                    border-radius: 6px;
                    background: rgba(255, 255, 255, 0.35);
                    text-decoration: none;
                    transition: border-color 150ms ease, transform 150ms ease, box-shadow 150ms ease;
                }
                .htu-card:hover { border-color: ${CORAL}; transform: translateY(-2px); box-shadow: 0 4px 0 rgba(225, 85, 78, 0.25); }
                .htu-card-img {
                    height: 64px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .htu-card-img img { max-height: 64px; max-width: 90%; width: auto; height: auto; }
                .htu-card-pending {
                    font-family: 'RoundHog', sans-serif;
                    font-weight: 800;
                    font-size: 32px;
                    color: rgba(69, 28, 1, 0.3);
                }
                .htu-card-name {
                    font-family: 'RoundHog', sans-serif;
                    font-weight: 800;
                    text-transform: uppercase;
                    letter-spacing: 0.4px;
                    font-size: 11px;
                    line-height: 1.2;
                    color: ${INK};
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
