import React from 'react'
import { Tabs } from 'radix-ui'
import CloudinaryImage from 'components/CloudinaryImage'
import Link from 'components/Link'
import { INK, PAPER } from './heroData'
import SpecimenMap from './SpecimenMap'

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
                            years of fieldwork and one or two arguments at the Royal Society dinner. The tabs below open
                            each section of an entry and explain what the reader will find there.
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
                    <CloudinaryImage
                        src="https://res.cloudinary.com/dmukukwp6/image/upload/naturalist3_276e74ea71.png"
                        alt="The naturalist consulting his map"
                        width={560}
                        className="htu-hog"
                        imgClassName="htu-hog-img"
                        loading="lazy"
                    />
                </div>

                <Tabs.Root className="htu-anatomy" defaultValue={STRUCTURE[0].label}>
                    <Tabs.List className="htu-anat-tabs" aria-label="Sections of a species entry">
                        {STRUCTURE.map((s, i) => (
                            <Tabs.Trigger className="htu-anat-tab" key={s.label} value={s.label}>
                                <span className="htu-anat-tab-num" aria-hidden="true">
                                    {ROMAN[i]}
                                </span>
                                <span className="htu-anat-tab-label">{s.label}</span>
                            </Tabs.Trigger>
                        ))}
                    </Tabs.List>
                    {STRUCTURE.map((s, i) => (
                        <Tabs.Content className="htu-anat-panel" key={s.label} value={s.label}>
                            <span className="htu-anat-num" aria-hidden="true">
                                {ROMAN[i]}
                            </span>
                            <h3 className="htu-anat-label">{s.label}</h3>
                            <p className="htu-anat-desc">{s.body}</p>
                        </Tabs.Content>
                    ))}
                </Tabs.Root>

                <h3 id="the-species" className="htu-subtitle">
                    The species
                </h3>
                <figure className="htu-plate">
                    <SpecimenMap />
                    <figcaption className="htu-plate-caption">
                        Plate XI · A census of the common product user, drawn from life. Select a specimen to read its
                        entry.
                    </figcaption>
                </figure>

                <div className="htu-closing">
                    <div className="htu-closing-text-col">
                        <p className="htu-closing-text">
                            The watching does not stop when you close this guide.{' '}
                            <Link to="/replay-vision" state={{ newWindow: true }} className="htu-closing-link">
                                Replay Vision
                            </Link>{' '}
                            keeps its eye on every session while you build, and brings the ones worth your attention
                            back to you.
                        </p>
                        <Link to="/field-guide/closing-note" state={{ newWindow: true }} className="htu-closing-more">
                            Read the full closing note
                        </Link>
                    </div>
                    <CloudinaryImage
                        src="https://res.cloudinary.com/dmukukwp6/image/upload/Group_144532_e9e68b845b.png"
                        alt="The naturalist watching from the long grass"
                        width={1120}
                        className="htu-closing-hog"
                        imgClassName="htu-hog-img"
                        loading="lazy"
                    />
                </div>
            </div>

            <style>{`
                .htu {
                    container-type: inline-size;
                    background: ${PAPER};
                    color: ${INK};
                    padding: 0 clamp(1rem, 5cqw, 3rem) clamp(2rem, 5cqw, 4rem);
                }
                .htu-inner {
                    max-width: 1000px;
                    margin: 0 auto;
                    border-top: 1px solid rgba(69, 28, 1, 0.15);
                    padding-top: clamp(2rem, 5cqw, 4rem);
                }
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
                /* How-to layout: prose, then the anatomy of an entry as tabbed index cards */
                /* Prose on the left, the naturalist watching from the grass on the right */
                /* The mirror of the naturalist section above: same column widths, same gap,
                   same centred figure — only the sides are swapped */
                .htu-guide {
                    margin: 1.75rem 0 clamp(1.5rem, 3.5cqw, 2.25rem);
                    display: grid;
                    grid-template-columns: 1fr minmax(0, 38%);
                    gap: clamp(1.5rem, 5cqw, 4rem);
                    align-items: center;
                }
                .htu-guide-text .htu-sig { margin-bottom: 0; }
                /* Centred against the prose, then biased up: the heading sits above this grid,
                   so a true centre reads low against the block as a whole */
                .htu-hog {
                    width: clamp(150px, 62%, 240px);
                    justify-self: center;
                    margin-bottom: clamp(2rem, 7cqw, 5rem);
                }
                .htu-hog-img {
                    display: block;
                    width: 100%;
                    height: auto;
                    filter: drop-shadow(3px 5px 4px rgba(69, 28, 1, 0.25));
                }
                @container (max-width: 720px) {
                    .htu-guide { grid-template-columns: 1fr; gap: 1.5rem; }
                    .htu-hog { width: clamp(150px, 55%, 220px); margin-bottom: 0; }
                }

                .htu-anatomy {
                    margin: 0 0 clamp(2.25rem, 5cqw, 3.5rem);
                    /* One sheet, one colour: the open tab and the page below it both paint
                       --fg-page flat, so there is no tone to mismatch where they meet */
                    --fg-page: #f4f0de;
                    --fg-tab-closed: #e7dfc6;
                    --fg-edge: rgba(69, 28, 1, 0.26);
                }
                /* Index tabs, cut from the same aged stock and stuck to the top of the page */
                .htu-anat-tabs {
                    display: flex;
                    flex-wrap: nowrap;
                    align-items: stretch;
                    /* Flush, like a strip of card cut into tabs. Any gap here exposes the
                       page's own top edge between the tabs, which reads as stray lines */
                    gap: 0;
                    /* Inset, so the page below reads as a separate, wider sheet. The tabs no
                       longer overlap it: the page keeps its own border on all four sides */
                    width: calc(100% - 2.5rem);
                    margin: 0 auto;
                    position: relative;
                    /* Its own stacking context, below the sheet: the tabs tuck behind the page
                       so its top border stays one unbroken line instead of meeting seven
                       torn tab edges and leaving slivers between them */
                    z-index: 0;
                    isolation: isolate;
                }
                .htu-anat-tab {
                    position: relative;
                    isolation: isolate;
                    flex: 1 1 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 0.4rem;
                    min-width: 0;
                    padding: 0.55rem 0.7rem 0.8rem;
                    border: 0;
                    background: none;
                    color: rgba(69, 28, 1, 0.62);
                    cursor: pointer;
                    text-align: center;
                    transition: color 150ms ease, transform 150ms ease;
                }
                /* The tab itself is a torn scrap of the same stock, edges and all */
                .htu-anat-tab::before {
                    content: '';
                    position: absolute;
                    inset: 0 0 0 0;
                    z-index: -1;
                    /* The page's paper, shaded down so closed tabs sit behind it */
                    background: linear-gradient(180deg, #ede5cf 0%, var(--fg-tab-closed) 100%);
                    border: 1px solid var(--fg-edge);
                    /* No bottom edge: the tabs run under the sheet, whose border closes them off */
                    bottom: -4px;
                    border-bottom: 0;
                    box-shadow: inset 0 -8px 12px rgba(69, 28, 1, 0.07);
                    filter: url(#fg-torn-card);
                    transition: background 150ms ease;
                }
                /* Overlap the neighbour so touching tabs share one hairline, not two */
                .htu-anat-tab:not(:first-child)::before { left: -1px; }
                .htu-anat-tab:hover { color: ${INK}; transform: translateY(-2px); }
                .htu-anat-tab:focus-visible { outline: 2px solid ${CORAL}; outline-offset: 2px; }
                /* The open tab reads as part of the page below it */
                /* The open tab paints over its neighbours, so its edges stay unbroken */
                .htu-anat-tab[data-state='active'] { color: ${INK}; z-index: 2; }
                .htu-anat-tab[data-state='active']::before {
                    background: var(--fg-page);
                    box-shadow: 0 -2px 10px rgba(69, 28, 1, 0.07);
                }
                .htu-anat-tab-num {
                    font-family: 'RoundHog', sans-serif;
                    font-weight: 800;
                    font-size: clamp(10px, 1.2cqw, 12px);
                    color: ${CORAL};
                    opacity: 0.75;
                }
                .htu-anat-tab[data-state='active'] .htu-anat-tab-num { opacity: 1; }
                .htu-anat-tab-label {
                    font-family: 'RoundHog', sans-serif;
                    font-weight: 800;
                    text-transform: uppercase;
                    letter-spacing: 0.4px;
                    font-size: clamp(10px, 1.25cqw, 12.5px);
                    line-height: 1.2;
                }
                /* Aged, gently torn paper page, matching the species plate */
                .htu-anat-panel {
                    position: relative;
                    z-index: 1;
                    isolation: isolate;
                    padding: clamp(1.3rem, 3cqw, 1.9rem) clamp(1.3rem, 3.5cqw, 2rem);
                    min-height: clamp(7.5rem, 13cqw, 9rem);
                }
                .htu-anat-panel:focus-visible { outline: 2px solid ${CORAL}; outline-offset: 3px; }
                .htu-anat-panel::before {
                    content: '';
                    position: absolute;
                    inset: 0;
                    z-index: -1;
                    /* Flat --fg-page across the top and most of the page, shading only at the
                       foot. An all-round inset shadow or a full-height ramp darkens the very
                       edge the tabs meet, which is what made the open tab look pasted on */
                    background: radial-gradient(110px 70px at 16% 28%, rgba(120, 82, 30, 0.05), transparent 70%),
                        radial-gradient(130px 90px at 85% 72%, rgba(120, 82, 30, 0.045), transparent 70%),
                        linear-gradient(180deg, var(--fg-page) 0%, var(--fg-page) 62%, #ebe5cf 100%);
                    border: 1px solid var(--fg-edge);
                    box-shadow: inset 0 -22px 22px -18px rgba(69, 28, 1, 0.09), 0 6px 15px rgba(69, 28, 1, 0.13);
                    filter: url(#fg-torn-card);
                }
                .htu-anat-panel[data-state='active'] { animation: htu-anat-in 220ms ease both; }
                @keyframes htu-anat-in {
                    from { opacity: 0; transform: translateY(4px); }
                    to { opacity: 1; transform: none; }
                }
                .htu-anat-num {
                    position: absolute;
                    bottom: 0.2rem;
                    right: 0.8rem;
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
                    font-size: clamp(13px, 1.9cqw, 16px);
                    color: ${INK};
                }
                .htu-anat-desc {
                    position: relative;
                    z-index: 1;
                    margin: 0;
                    font-size: clamp(13px, 1.6cqw, 15px);
                    line-height: 1.55;
                    color: ${INK};
                    max-width: 62ch;
                }
                /* Too narrow for seven across: stack them as index cards above the page */
                @container (max-width: 680px) {
                    .htu-anat-tabs {
                        display: grid;
                        grid-template-columns: repeat(2, 1fr);
                        gap: 0.4rem;
                        margin-bottom: 0.6rem;
                    }
                    .htu-anat-tab:not(:first-child)::before { left: 0; }
                    .htu-anat-tab,
                    .htu-anat-tab[data-state='active'] { padding: 0.55rem 0.7rem; }
                    .htu-anat-tab::before,
                    .htu-anat-tab[data-state='active']::before {
                        bottom: 0;
                        border-bottom: 1px solid var(--fg-edge);
                    }
                    .htu-anat-tab[data-state='active']::before { border-color: rgba(69, 28, 1, 0.5); }
                }
                @container (max-width: 380px) {
                    .htu-anat-tabs { grid-template-columns: 1fr; }
                }
                @media (prefers-reduced-motion: reduce) {
                    .htu-anat-tab:hover { transform: none; }
                    .htu-anat-panel[data-state='active'] { animation: none; }
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
                .htu-plate-caption {
                    margin-top: clamp(1.25rem, 3cqw, 2rem);
                    text-align: center;
                    font-style: italic;
                    font-size: clamp(11px, 1.3cqw, 13px);
                    letter-spacing: 0.3px;
                    color: rgba(69, 28, 1, 0.6);
                }

                /* Closing note: half text, half naturalist, both standing on the same line */
                .htu-closing {
                    margin-top: 2.5rem;
                    padding-top: 1.75rem;
                    border-top: 1px solid rgba(69, 28, 1, 0.15);
                    text-align: left;
                    display: grid;
                    grid-template-columns: 1fr minmax(0, 38%);
                    gap: clamp(1.5rem, 5cqw, 4rem);
                    align-items: center;
                }
                /* Wider than the other two figures because it is a 2:1 landscape: matching
                   their width would leave it half their height and looking underweight */
                .htu-closing-hog { width: clamp(180px, 100%, 340px); justify-self: center; }
                @container (max-width: 720px) {
                    .htu-closing { grid-template-columns: 1fr; gap: 1.5rem; }
                    .htu-closing-hog { width: clamp(180px, 80%, 320px); }
                }
                .htu-closing-text {
                    font-size: clamp(15px, 1.9cqw, 18px);
                    line-height: 1.6;
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
