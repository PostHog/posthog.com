import React from 'react'
import Link from 'components/Link'
import { INK, PAPER } from './heroData'
import { ALL_SPECIES } from './speciesData'

const CORAL = '#E1554E'
const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X']

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
                {/* Roughens aged-paper edges so callout + species plate read as torn book pages */}
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
                    {/* Finer, gentler deckle for the small anatomy cards */}
                    <filter id="fg-torn-card">
                        <feTurbulence
                            type="fractalNoise"
                            baseFrequency="0.02 0.03"
                            numOctaves={3}
                            seed={9}
                            result="noise2"
                        />
                        <feDisplacementMap
                            in="SourceGraphic"
                            in2="noise2"
                            scale={5}
                            xChannelSelector="R"
                            yChannelSelector="G"
                        />
                    </filter>
                </svg>
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
                <div className="htu-guide">
                    <div className="htu-guide-text">
                        <p className="htu-p">
                            Each species in this guide follows the same structure, which has been refined over many
                            years of fieldwork and one or two arguments at the Royal Society dinner. The cards on the
                            right replicate the guide structure and what each section under the species means.
                        </p>
                        <p className="htu-p">
                            The species are presented in no particular order. They are not ranked by frequency,
                            importance, or severity, on the principle that a field naturalist's job is to only observe
                            what is there without judgement.
                        </p>
                        <p className="htu-p">
                            The guide may be read cover to cover or kept by the desk and consulted whenever a session
                            begins to behave in ways the reader does not immediately recognize. The Latin binomials are
                            of the author's own composition. Their academic legitimacy is at your own interpretation.
                        </p>
                        <p className="htu-sig">– S.B.H.</p>
                    </div>
                    <dl className="htu-anatomy">
                        {STRUCTURE.map((s, i) => (
                            <div className="htu-anat-card" key={s.label}>
                                <span className="htu-anat-num" aria-hidden="true">
                                    {ROMAN[i]}
                                </span>
                                <dt className="htu-anat-label">{s.label}</dt>
                                <dd className="htu-anat-desc">{s.body}</dd>
                            </div>
                        ))}
                    </dl>
                </div>

                <h3 id="the-species" className="htu-subtitle">
                    The species
                </h3>
                <figure className="htu-plate">
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
                .htu-inner { max-width: 1280px; margin: 0 auto; }
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
                    position: relative;
                    isolation: isolate;
                    display: flex;
                    align-items: center;
                    gap: clamp(0.75rem, 2cqw, 1.25rem);
                    padding: clamp(1rem, 2.5cqw, 1.6rem) clamp(1.5rem, 3.5cqw, 2.25rem);
                    margin: 0 0 2rem;
                }
                /* Torn aged-paper page, matching the species plate */
                .htu-ebook-callout::before {
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
                .htu-sig { font-style: italic; font-size: 14px; margin: 1.25rem 0 0; }
                /* How-to layout: prose on the left, the "anatomy" cards stacked on the right */
                .htu-guide {
                    margin: 1.75rem 0 clamp(2.25rem, 5cqw, 3.5rem);
                    display: grid;
                    grid-template-columns: 0.85fr 1.15fr;
                    gap: clamp(1.5rem, 4cqw, 3.5rem);
                    align-items: start;
                }
                .htu-guide-text {
                    position: sticky;
                    top: clamp(1.5rem, 5cqw, 3rem);
                    align-self: start;
                }
                .htu-guide-text .htu-p { max-width: none; }
                .htu-guide-text .htu-p:last-of-type { margin-bottom: 0; }
                @container (max-width: 680px) {
                    .htu-guide { grid-template-columns: 1fr; }
                    .htu-guide-text { position: static; }
                }
                /* "Anatomy of an entry" — a vintage plate legend, stacked vertically */
                .htu-anatomy {
                    margin: 0;
                    display: grid;
                    grid-template-columns: 1fr;
                    gap: clamp(0.9rem, 2.5cqw, 1.4rem);
                }
                .htu-anat-card {
                    position: relative;
                    isolation: isolate;
                    padding: clamp(1.1rem, 2.5cqw, 1.5rem) clamp(1.2rem, 3cqw, 1.7rem);
                }
                /* Aged, gently torn paper card, matching the species plate */
                .htu-anat-card::before {
                    content: '';
                    position: absolute;
                    inset: 0;
                    z-index: -1;
                    background: radial-gradient(110px 70px at 16% 28%, rgba(120, 82, 30, 0.06), transparent 70%),
                        radial-gradient(130px 90px at 85% 72%, rgba(120, 82, 30, 0.05), transparent 70%),
                        linear-gradient(158deg, #f6f2e1 0%, #efe8cf 60%, #e7dec1 100%);
                    border: 1px solid rgba(69, 28, 1, 0.26);
                    box-shadow: inset 0 0 20px rgba(69, 28, 1, 0.06), 0 6px 15px rgba(69, 28, 1, 0.13);
                    filter: url(#fg-torn-card);
                }
                .htu-anat-num {
                    position: absolute;
                    top: 0.1rem;
                    right: 0.6rem;
                    z-index: 0;
                    font-family: 'RoundHog', sans-serif;
                    font-weight: 800;
                    font-size: clamp(38px, 7.5cqw, 62px);
                    line-height: 1;
                    color: rgba(225, 85, 78, 0.2);
                    pointer-events: none;
                    user-select: none;
                }
                .htu-anat-label {
                    position: relative;
                    z-index: 1;
                    margin: 0 0 0.4rem;
                    font-family: 'RoundHog', sans-serif;
                    font-weight: 800;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                    font-size: clamp(12px, 1.7cqw, 14px);
                    color: ${INK};
                }
                .htu-anat-desc {
                    position: relative;
                    z-index: 1;
                    margin: 0;
                    font-size: clamp(13px, 1.6cqw, 15px);
                    line-height: 1.55;
                    color: ${INK};
                    max-width: 46ch;
                }

                .htu-subtitle {
                    font-family: 'RoundHog', sans-serif;
                    font-weight: 800;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                    font-size: clamp(22px, 4cqw, 34px);
                    margin: 3rem 0 1.5rem;
                    color: ${INK};
                }
                .htu-plate-defs { position: absolute; width: 0; height: 0; }
                .htu-plate {
                    position: relative;
                    margin: 0;
                    padding: clamp(1.75rem, 4cqw, 3.25rem) clamp(1rem, 3cqw, 2.25rem) clamp(2rem, 4cqw, 2.75rem);
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
                    grid-template-columns: repeat(5, 1fr);
                    grid-auto-rows: 1fr;
                    gap: clamp(1rem, 2.5cqw, 1.75rem);
                    align-items: stretch;
                }
                @container (max-width: 640px) {
                    .htu-plate-grid { grid-template-columns: repeat(3, 1fr); }
                }
                @container (max-width: 420px) {
                    .htu-plate-grid { grid-template-columns: repeat(2, 1fr); }
                }
                .htu-plate-grid > li { display: flex; }
                .htu-specimen {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: flex-start;
                    gap: 0.65rem;
                    text-align: center;
                    text-decoration: none;
                    transition: transform 150ms ease;
                }
                .htu-specimen:hover { transform: translateY(-3px); }
                .htu-specimen-img {
                    height: clamp(96px, 15cqw, 152px);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .htu-specimen-img img {
                    max-height: 100%;
                    max-width: 100%;
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
                    font-family: 'RoundHog', sans-serif;
                    font-weight: 800;
                    text-transform: uppercase;
                    letter-spacing: 0.4px;
                    font-size: clamp(11px, 1.4cqw, 13px);
                    line-height: 1.2;
                    color: ${INK};
                    /* Reserve two lines so single- and double-line names align */
                    min-height: 2.4em;
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
                    font-style: italic;
                    font-size: clamp(11px, 1.3cqw, 13px);
                    letter-spacing: 0.3px;
                    color: rgba(69, 28, 1, 0.6);
                }

                .htu-closing {
                    margin-top: 2.5rem;
                    padding-top: 1.75rem;
                    border-top: 1px solid rgba(69, 28, 1, 0.15);
                    text-align: left;
                }
                .htu-closing-text {
                    font-size: clamp(15px, 1.9cqw, 18px);
                    line-height: 1.6;
                    max-width: 68ch;
                    margin: 0 0 1.25rem;
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
