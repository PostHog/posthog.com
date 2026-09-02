import React, { useEffect, useRef, useState } from 'react'
import Link from 'components/Link'
import { INK, PAPER } from './heroData'
import { SPECIES_BY_SLUG } from './speciesData'

// Creature-free color map (hosted on Cloudinary).
const MAP_SRC = 'https://res.cloudinary.com/dmukukwp6/image/upload/color_map_e05cd23b04.png'
const color = (slug: string) => `/images/field-guide/${slug}.png`
const bw = (slug: string) => `/images/field-guide/hero/${slug}.png`

// Each creature placed at its exact spot on the 1728×1117 map (top-left, % of frame).
// The 6 illustrated species use their color art; the 4 pending ones keep the
// black-and-white cutouts until color art exists.
type Specimen = { slug: string; img: string; left: number; top: number; width: number }
const SPECIMENS: Specimen[] = [
    { slug: 'rage-clicker', img: color('rage-clicker'), left: 30.09, top: 14.32, width: 8.01 },
    { slug: 'tab-hopper', img: color('tab-hopper'), left: 51.1, top: 19.79, width: 8.04 },
    { slug: 'modal-slammer', img: bw('modal-slammer'), left: 62.66, top: 7.4, width: 21.63 },
    { slug: 'phantom-returner', img: bw('phantom-returner'), left: 67.78, top: 31.24, width: 16.8 },
    { slug: 'console-opener', img: bw('console-opener'), left: 27.28, top: 46.37, width: 17.6 },
    { slug: 'pricing-page-loiterer', img: color('pricing-page-loiterer'), left: 52.31, top: 41.99, width: 8.97 },
    { slug: 'tutorial-skipper', img: color('tutorial-skipper'), left: 75.64, top: 49.78, width: 9.38 },
    { slug: 'mid-form-fleer', img: color('mid-form-fleer'), left: 29.4, top: 67.95, width: 6.9 },
    { slug: 'refreshing-pilgrim', img: color('refreshing-pilgrim'), left: 54.75, top: 77.98, width: 6.78 },
    { slug: 'dead-end-wanderer', img: bw('dead-end-wanderer'), left: 59.0, top: 79.77, width: 19.71 },
]

function SpecimenLink({ item, index, inView }: { item: Specimen; index: number; inView: boolean }): JSX.Element {
    const species = SPECIES_BY_SLUG[item.slug]
    // Point the card outward toward the empty map margin so it never covers another creature.
    const tipSide = item.left < 50 ? 'left' : 'right'
    return (
        <Link
            to={species.route}
            state={{ newWindow: true }}
            className="fg-specimen"
            data-tip={tipSide}
            aria-label={`${species.name} — open field guide entry`}
            style={{
                left: `${item.left}%`,
                top: `${item.top}%`,
                width: `${item.width}%`,
                opacity: inView ? 1 : 0,
                transitionDelay: `${index * 70}ms`,
            }}
        >
            <img src={item.img} alt={species.name} loading="lazy" />
            <span className="fg-tip" aria-hidden="true">
                <span className="fg-tip-name">{species.name}</span>
                <span className="fg-tip-latin">{species.latin}</span>
            </span>
        </Link>
    )
}

export default function Hero(): JSX.Element {
    const rootRef = useRef<HTMLDivElement | null>(null)
    const [inView, setInView] = useState(false)

    useEffect(() => {
        const el = rootRef.current
        if (!el) return
        if (typeof IntersectionObserver === 'undefined') {
            setInView(true)
            return
        }
        const obs = new IntersectionObserver(
            (entries) => {
                if (entries.some((e) => e.isIntersecting)) {
                    setInView(true)
                    obs.disconnect()
                }
            },
            { threshold: 0.15 }
        )
        obs.observe(el)
        return () => obs.disconnect()
    }, [])

    return (
        <div ref={rootRef} className="fg-hero" data-in-view={inView}>
            <div className="fg-map-wrap">
                <img
                    className="fg-map-bg"
                    src={MAP_SRC}
                    alt="A hand-drawn map of the territories where wild users are found"
                />
                {SPECIMENS.map((item, i) => (
                    <SpecimenLink key={item.slug} item={item} index={i} inView={inView} />
                ))}
            </div>

            <div className="fg-title-block">
                <h1 className="fg-title">The Field Guide to Wild Users</h1>
                <p className="fg-subtitle">
                    Observed in their natural habitat: the{' '}
                    <Link to="/session-replay" state={{ newWindow: true }} className="fg-subtitle-link">
                        Session Replay
                    </Link>
                </p>
            </div>

            <style>{`
                [class~="pt-12"]:has(.fg-hero) { padding-top: 0 !important; }
                .fg-hero {
                    container-type: inline-size;
                    position: relative;
                    width: 100%;
                    padding: 0 0 3rem;
                    background: ${PAPER};
                    color: ${INK};
                }
                .fg-map-wrap { position: relative; width: 100%; line-height: 0; }
                .fg-map-bg { display: block; width: 100%; height: auto; }

                .fg-specimen {
                    position: absolute;
                    display: block;
                    margin: 0;
                    line-height: 0;
                    cursor: pointer;
                    transition: opacity 700ms ease;
                    will-change: opacity;
                }
                .fg-specimen img {
                    display: block;
                    width: 100%;
                    height: auto;
                    transition: transform 200ms ease, filter 250ms ease;
                }
                .fg-specimen:hover { z-index: 10; }
                .fg-specimen:hover img { transform: scale(1.06); }
                /* When any creature is hovered, the others recede (dim + desaturate). */
                .fg-map-wrap:has(.fg-specimen:hover) .fg-specimen:not(:hover) img {
                    filter: saturate(0.5) brightness(1.02);
                    opacity: 0.4;
                }

                /* Tooltip card, shown on hover */
                .fg-tip {
                    position: absolute;
                    top: 40%;
                    transform: translateY(-50%);
                    display: flex;
                    flex-direction: column;
                    gap: 2px;
                    background: #fff;
                    border: 1px solid rgba(69, 28, 1, 0.15);
                    border-radius: 8px;
                    padding: 0.5rem 0.75rem;
                    box-shadow: 0 6px 18px rgba(69, 28, 1, 0.18);
                    white-space: nowrap;
                    line-height: 1.2;
                    opacity: 0;
                    pointer-events: none;
                    transition: opacity 150ms ease;
                    z-index: 2;
                }
                .fg-specimen[data-tip='left'] .fg-tip { right: 100%; margin-right: 0.5rem; }
                .fg-specimen[data-tip='right'] .fg-tip { left: 100%; margin-left: 0.5rem; }
                .fg-specimen:hover .fg-tip { opacity: 1; }
                .fg-tip-name {
                    font-family: 'RoundHog', sans-serif;
                    font-weight: 800;
                    text-transform: uppercase;
                    letter-spacing: 0.4px;
                    font-size: clamp(11px, 1.1cqw, 14px);
                    color: ${INK};
                }
                .fg-tip-latin {
                    font-style: italic;
                    font-size: clamp(10px, 1cqw, 12px);
                    color: rgba(69, 28, 1, 0.7);
                }

                .fg-title-block { text-align: center; margin-top: 1.5rem; padding-inline: clamp(1.5rem, 7cqw, 6rem); }
                .fg-title {
                    font-family: 'RoundHog', sans-serif;
                    font-weight: 800;
                    text-transform: uppercase;
                    letter-spacing: clamp(1px, 0.35cqw, 4px);
                    line-height: 1.05;
                    font-size: clamp(18px, 4cqw, 50px);
                    white-space: nowrap;
                    color: ${INK};
                    margin: 0;
                }
                .fg-subtitle { font-style: italic; font-size: clamp(12px, 1.8cqw, 18px); margin: 0.6rem 0 0; color: ${INK}; }
                .fg-subtitle-link {
                    color: ${INK};
                    text-decoration: underline;
                    text-underline-offset: 2px;
                    text-decoration-thickness: 1px;
                }
                .fg-subtitle-link:hover { color: #E1554E; }
                @media (prefers-reduced-motion: reduce) {
                    .fg-specimen { transition: opacity 300ms ease; }
                    .fg-specimen:hover img { transform: none; }
                }
            `}</style>
        </div>
    )
}
