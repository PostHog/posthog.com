import React from 'react'
import SEO from 'components/seo'
import Link from 'components/Link'
import ReaderView from 'components/ReaderView'
import TableOfContents from './TableOfContents'
import { INK } from './heroData'
import { Species, SpeciesSection } from './speciesData'

const PLATE_PAPER = '#F0ECD9'
const CORAL = '#E1554E'

// The "If you spot one" section names a Replay Vision scanner — link that phrase
// once per species page to the Replay Vision product page.
const SCANNER_RE = /((?:Monitor|Classifier|Indexer|Summarizer) scanner)/

function renderSectionBody(section: SpeciesSection): React.ReactNode {
    if (section.label !== 'If you spot one') return section.body
    const parts = section.body.split(SCANNER_RE)
    if (parts.length < 3) return section.body
    return parts.map((part, i) =>
        SCANNER_RE.test(part) && i === 1 ? (
            <Link key={i} to="/replay-vision" state={{ newWindow: true }} className="se-link">
                {part}
            </Link>
        ) : (
            <React.Fragment key={i}>{part}</React.Fragment>
        )
    )
}

function Plate({ label, src, alt }: { label: string; src?: string; alt: string }): JSX.Element {
    return (
        <figure className="se-plate">
            <span className="se-plate-label">{label}</span>
            {src ? (
                <img src={src} alt={alt} loading="lazy" />
            ) : (
                <div className="se-plate-pending" role="img" aria-label={`${alt} — illustration pending`}>
                    <span className="se-plate-pending-mark">?</span>
                    <span className="se-plate-pending-text">Illustration pending</span>
                </div>
            )}
        </figure>
    )
}

export default function SpeciesEntry({ species }: { species: Species }): JSX.Element {
    return (
        <>
            <SEO
                title={`${species.name} - The Field Guide to Wild Users`}
                description={`${species.name} (${species.latin}) — a field guide to the species of users you'll spot in your session replays.`}
                image={`/images/og/default.png`}
            />
            <ReaderView
                leftSidebar={<TableOfContents />}
                hideRightSidebar
                hideTitle
                showQuestions={false}
                showAbout={false}
                padding={false}
                contentMaxWidthClass="max-w-none"
            >
                <div className="se-spread">
                    <div className="se-plates">
                        <Plate label="Plate I" src={species.plateI} alt={`${species.name} — Plate I`} />
                        <Plate label="Plate II" src={species.plateII} alt={`${species.name} — Plate II`} />
                    </div>
                    <div className="se-text">
                        <h1 className="se-name">{species.name}</h1>
                        <p className="se-latin">{species.latin}</p>
                        {species.sections.map((s) => (
                            <section key={s.label} className="se-section">
                                <h2 className="se-section-label">{s.label}</h2>
                                <p className="se-section-body">{renderSectionBody(s)}</p>
                            </section>
                        ))}
                    </div>
                </div>
                <style>{`
                    [class~="pt-12"]:has(.se-spread) { padding-top: 0 !important; }
                    .se-spread {
                        container-type: inline-size;
                        background: ${PLATE_PAPER};
                        color: ${INK};
                        padding: clamp(1.25rem, 4cqw, 3rem);
                        display: grid;
                        grid-template-columns: 1fr 1fr;
                        gap: clamp(1.5rem, 4cqw, 3.5rem);
                        min-height: 100%;
                        align-items: start;
                    }
                    @container (max-width: 720px) {
                        .se-spread { grid-template-columns: 1fr; }
                        .se-plates { position: static; }
                    }
                    .se-plates {
                        display: flex;
                        flex-direction: column;
                        gap: clamp(1rem, 3cqw, 2rem);
                        position: sticky;
                        top: clamp(1.25rem, 4cqw, 3rem);
                        align-self: start;
                    }
                    .se-plate { margin: 0; }
                    .se-plate-label {
                        display: inline-block;
                        font-family: 'RoundHog', sans-serif;
                        font-weight: 800;
                        font-size: 12px;
                        letter-spacing: 0.4px;
                        color: ${INK};
                        border: 1px solid ${CORAL};
                        border-radius: 4px;
                        padding: 2px 8px;
                        margin-bottom: 0.5rem;
                    }
                    .se-plate img {
                        display: block;
                        width: auto;
                        max-width: 100%;
                        max-height: 32vh;
                        height: auto;
                        margin: 0 auto;
                        border: 1px solid ${CORAL};
                    }
                    .se-plate-pending {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                        gap: 0.4rem;
                        aspect-ratio: 271 / 211;
                        width: 100%;
                        border: 1px dashed ${CORAL};
                        background: rgba(225, 85, 78, 0.04);
                    }
                    .se-plate-pending-mark {
                        font-family: 'RoundHog', sans-serif;
                        font-weight: 800;
                        font-size: 40px;
                        line-height: 1;
                        color: rgba(69, 28, 1, 0.35);
                    }
                    .se-plate-pending-text {
                        font-style: italic;
                        font-size: 13px;
                        color: rgba(69, 28, 1, 0.55);
                    }
                    .se-text { max-width: 62ch; }
                    .se-name {
                        font-family: 'RoundHog', sans-serif;
                        font-weight: 800;
                        text-transform: uppercase;
                        letter-spacing: 0.5px;
                        font-size: clamp(22px, 4cqw, 32px);
                        line-height: 1.1;
                        color: ${INK};
                        margin: 0;
                    }
                    .se-latin {
                        font-style: italic;
                        font-size: clamp(14px, 2cqw, 18px);
                        margin: 0.25rem 0 1.5rem;
                        color: ${INK};
                    }
                    .se-section { margin-bottom: 1.15rem; }
                    .se-section-label {
                        font-family: 'RoundHog', sans-serif;
                        font-weight: 800;
                        text-transform: uppercase;
                        letter-spacing: 0.5px;
                        font-size: 12px;
                        margin: 0 0 0.3rem;
                        color: ${INK};
                    }
                    .se-section-body {
                        font-size: clamp(13px, 1.6cqw, 15px);
                        line-height: 1.55;
                        margin: 0;
                        color: ${INK};
                    }
                    .se-link {
                        color: ${INK};
                        text-decoration: underline;
                        text-underline-offset: 2px;
                        text-decoration-thickness: 1px;
                        font-weight: 600;
                    }
                    .se-link:hover { color: ${CORAL}; }
                `}</style>
            </ReaderView>
        </>
    )
}
