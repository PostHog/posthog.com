import React from 'react'
import Link from 'components/Link'
import { SPECIES_BY_SLUG } from './speciesData'

const CORAL = '#E1554E'

type Entry = { title: string; route?: string; sameWindow?: boolean }

// Mirrors the printed booklet's contents page (Figma A5-7), minus the page numbers.
const SECTIONS_TOP: Entry[] = [
    { title: 'Foreword', route: '/field-guide/foreword' },
    { title: 'How to use this guide', route: '/field-guide#how-to-use', sameWindow: true },
    { title: 'The species', route: '/field-guide#the-species', sameWindow: true },
]
const SECTIONS_BOTTOM: Entry[] = [{ title: 'Closing note', route: '/field-guide/closing-note' }]
const SPECIES_TOC: { name: string; slug: string }[] = [
    { name: 'The Rage-Clicker', slug: 'rage-clicker' },
    { name: 'The Refreshing Pilgrim', slug: 'refreshing-pilgrim' },
    { name: 'The Tab-Hopper', slug: 'tab-hopper' },
    { name: 'The Mid-Form Fleer', slug: 'mid-form-fleer' },
    { name: 'The Pricing-Page Loiterer', slug: 'pricing-page-loiterer' },
    { name: 'The Tutorial Skipper', slug: 'tutorial-skipper' },
    { name: 'The Modal Slammer', slug: 'modal-slammer' },
    { name: 'The Phantom Returner', slug: 'phantom-returner' },
    { name: 'The Dead-End Wanderer', slug: 'dead-end-wanderer' },
    { name: 'The Console-Opener', slug: 'console-opener' },
]

function SectionRow({ title, route, sameWindow }: Entry): JSX.Element {
    return (
        <li className="toc-row">
            {route ? (
                <Link
                    to={route}
                    state={sameWindow ? undefined : { newWindow: true }}
                    className="toc-title toc-title--section toc-link"
                >
                    {title}
                </Link>
            ) : (
                <span className="toc-title toc-title--section">{title}</span>
            )}
        </li>
    )
}

function SpeciesRow({ name, slug }: { name: string; slug: string }): JSX.Element {
    const species = SPECIES_BY_SLUG[slug]
    return (
        <li className="toc-row">
            <Link to={species.route} state={{ newWindow: true }} className="toc-title toc-link">
                {name}
            </Link>
        </li>
    )
}

export default function TableOfContents(): JSX.Element {
    return (
        <nav className="toc text-primary" aria-label="Field guide contents">
            <Link to="/field-guide" className="toc-home">
                The Field Guide
            </Link>
            <ul className="toc-list">
                {SECTIONS_TOP.map((s) => (
                    <SectionRow key={s.title} {...s} />
                ))}
                <li className="toc-rule" aria-hidden="true" />
                {SPECIES_TOC.map((s) => (
                    <SpeciesRow key={s.name} {...s} />
                ))}
                <li className="toc-rule" aria-hidden="true" />
                {SECTIONS_BOTTOM.map((s) => (
                    <SectionRow key={s.title} {...s} />
                ))}
            </ul>
            <style>{`
                .toc {
                    padding: clamp(1.25rem, 3cqw, 2.25rem) clamp(1rem, 2.5cqw, 1.75rem);
                }
                .toc-home {
                    display: block;
                    font-family: 'RoundHog', sans-serif;
                    font-weight: 800;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                    font-size: clamp(15px, 1.6cqw, 19px);
                    line-height: 1.15;
                    margin: 0 0 1.5rem;
                    color: inherit;
                    text-decoration: none;
                    transition: color 150ms ease;
                }
                .toc-home:hover { color: ${CORAL}; }
                .toc-list { list-style: none; margin: 0; padding: 0; }
                .toc-row { padding: 0.28rem 0; }
                .toc-title {
                    font-size: 13px;
                    line-height: 1.3;
                    color: inherit;
                }
                .toc-title--section {
                    font-family: 'RoundHog', sans-serif;
                    font-weight: 800;
                    text-transform: uppercase;
                    letter-spacing: 0.4px;
                    font-size: 12px;
                }
                a.toc-link {
                    text-decoration: none;
                    color: inherit;
                    transition: color 150ms ease;
                    cursor: pointer;
                }
                a.toc-link:hover { color: ${CORAL}; text-decoration: underline; text-underline-offset: 2px; }
                .toc-rule {
                    height: 0;
                    border-top: 1px solid ${CORAL};
                    opacity: 0.45;
                    margin: 0.7rem 0;
                    list-style: none;
                }
            `}</style>
        </nav>
    )
}
