import React, { useEffect, useRef, useState } from 'react'
import { ComposableMap, Geographies, Geography } from 'react-simple-maps'
// Self-contained low-res world geodata (GeoJSON FeatureCollection) — no network fetch.
import worldLow from '@amcharts/amcharts5-geodata/worldLow'
import Link from 'components/Link'
import { INK, PAPER, PALETTE } from './heroData'
import { SPECIES, PENDING_SPECIES, Species } from './speciesData'

// Mean longitude of a geometry, used to band land fills warm→cool west→east.
function meanLongitude(geometry: any): number {
    let sum = 0
    let n = 0
    const walk = (coords: any) => {
        if (typeof coords[0] === 'number') {
            sum += coords[0]
            n += 1
            return
        }
        coords.forEach(walk)
    }
    if (geometry?.coordinates) walk(geometry.coordinates)
    return n ? sum / n : 0
}

// Map a longitude (-180..180) to one of the palette "background" washes.
function landFill(geometry: any): string {
    const lon = meanLongitude(geometry)
    const t = Math.min(0.9999, Math.max(0, (lon + 180) / 360))
    return PALETTE[Math.floor(t * PALETTE.length)].bg
}

type Item =
    | { kind: 'species'; species: Species; top: number; left: number }
    | { kind: 'placeholder'; name: string; top: number; left: number }

const ITEMS: Item[] = [
    ...SPECIES.map((s): Item => ({ kind: 'species', species: s, top: s.map.top, left: s.map.left })),
    ...PENDING_SPECIES.map((p): Item => ({ kind: 'placeholder', name: p.name, top: p.map.top, left: p.map.left })),
]

function SpecimenCard({ item, index, inView }: { item: Item; index: number; inView: boolean }): JSX.Element {
    const style: React.CSSProperties = {
        top: `${item.top}%`,
        left: `${item.left}%`,
        transform: inView ? undefined : 'translate(-50%, -46%) scale(0.9)',
        opacity: inView ? 1 : 0,
        transitionDelay: `${index * 90}ms`,
    }
    if (item.kind === 'placeholder') {
        return (
            <div className="fg-specimen" style={style}>
                <div className="fg-frame fg-frame--pending" aria-hidden="true">
                    <span className="fg-pending-mark">?</span>
                    <span className="fg-pending-label">Specimen pending</span>
                </div>
            </div>
        )
    }
    const { species } = item
    return (
        <div className="fg-specimen" style={style}>
            <Link
                to={species.route}
                state={{ newWindow: true }}
                className="fg-animal-link"
                aria-label={`${species.name} — open field guide entry`}
            >
                <img className="fg-animal" src={species.heroImage} alt={species.name} loading="lazy" />
            </Link>
        </div>
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
            { threshold: 0.2 }
        )
        obs.observe(el)
        return () => obs.disconnect()
    }, [])

    return (
        <div ref={rootRef} className="fg-hero" data-in-view={inView}>
            <div className="fg-map-wrap">
                {/* The watercolor world map (renders empty first; specimens fade in after) */}
                <ComposableMap
                    projection="geoEqualEarth"
                    projectionConfig={{ scale: 165, center: [10, 0] }}
                    width={900}
                    height={440}
                    className="fg-map"
                    style={{ width: '100%', height: 'auto' }}
                >
                    <defs>
                        {/* Painterly, irregular edges for a watercolor feel */}
                        <filter id="fg-watercolor" x="-5%" y="-5%" width="110%" height="110%">
                            <feTurbulence
                                type="fractalNoise"
                                baseFrequency="0.013"
                                numOctaves={2}
                                seed={7}
                                result="n"
                            />
                            <feDisplacementMap
                                in="SourceGraphic"
                                in2="n"
                                scale={9}
                                xChannelSelector="R"
                                yChannelSelector="G"
                            />
                            <feGaussianBlur stdDeviation={0.35} />
                        </filter>
                    </defs>
                    <Geographies geography={worldLow}>
                        {({ geographies }: { geographies: any[] }) => (
                            <g filter="url(#fg-watercolor)">
                                {geographies.map((geo) => {
                                    const fill = landFill(geo.geometry)
                                    return (
                                        <Geography
                                            key={geo.rsmKey}
                                            geography={geo}
                                            style={{
                                                default: {
                                                    fill,
                                                    stroke: 'rgba(69,28,1,0.10)',
                                                    strokeWidth: 0.3,
                                                    outline: 'none',
                                                },
                                                hover: { fill, outline: 'none' },
                                                pressed: { fill, outline: 'none' },
                                            }}
                                        />
                                    )
                                })}
                            </g>
                        )}
                    </Geographies>
                </ComposableMap>

                {/* Paper grain overlay */}
                <svg className="fg-grain" aria-hidden="true">
                    <filter id="fg-grain-f">
                        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves={2} stitchTiles="stitch" />
                    </filter>
                    <rect width="100%" height="100%" filter="url(#fg-grain-f)" />
                </svg>

                {/* Specimens scattered over the map */}
                <div className="fg-specimens">
                    {ITEMS.map((item, i) => (
                        <SpecimenCard
                            key={item.kind === 'species' ? item.species.slug : item.name}
                            item={item}
                            index={i}
                            inView={inView}
                        />
                    ))}
                </div>
            </div>

            <p className="fg-map-note">
                Ranges are illustrative and the cartography wholly invented; the species observe no borders and neither,
                it seems, did our mapmaker. Please do not navigate by it.
            </p>

            <div className="fg-title-block">
                <h1 className="fg-title">The Field Guide to Wild Users</h1>
                <p className="fg-subtitle">
                    Observed in their natural habitat: the{' '}
                    <Link to="/session-replay" state={{ newWindow: true }} className="fg-subtitle-link">
                        Session replay
                    </Link>
                </p>
            </div>

            <style>{`
                /* Remove ReaderView's default top padding above field-guide content */
                [class~="pt-12"]:has(.fg-hero) { padding-top: 0 !important; }
                .fg-hero {
                    container-type: inline-size;
                    position: relative;
                    width: 100%;
                    padding: 0.75rem 1rem 3rem;
                    background: ${PAPER};
                    color: ${INK};
                }
                .fg-map-wrap {
                    position: relative;
                    max-width: 1100px;
                    margin: 0 auto;
                }
                .fg-map { display: block; overflow: visible; }
                .fg-grain {
                    position: absolute;
                    inset: 0;
                    width: 100%;
                    height: 100%;
                    opacity: 0.05;
                    mix-blend-mode: multiply;
                    pointer-events: none;
                }
                .fg-specimens { position: absolute; inset: 0; pointer-events: none; }
                .fg-specimen {
                    position: absolute;
                    width: clamp(60px, 10cqw, 110px);
                    transform: translate(-50%, -50%);
                    text-align: center;
                    transition: opacity 700ms ease, transform 700ms cubic-bezier(0.22, 1, 0.36, 1);
                    will-change: opacity, transform;
                    pointer-events: auto;
                }
                .fg-animal-link {
                    display: block;
                    cursor: pointer;
                    transition: transform 200ms ease;
                }
                .fg-animal-link:hover { transform: translateY(-5px) scale(1.05); }
                .fg-animal-link:focus-visible {
                    outline: 2px solid ${INK};
                    outline-offset: 4px;
                    border-radius: 4px;
                }
                .fg-animal {
                    display: block;
                    width: 100%;
                    height: auto;
                    filter: drop-shadow(2px 4px 3px rgba(69, 28, 1, 0.22));
                }
                .fg-frame {
                    position: relative;
                    aspect-ratio: 271 / 211;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-direction: column;
                    gap: 0.2rem;
                    border: 1.5px dashed rgba(69, 28, 1, 0.5);
                    border-radius: 2px;
                }
                .fg-pending-mark {
                    font-family: 'RoundHog', sans-serif;
                    font-weight: 800;
                    font-size: clamp(20px, 4cqw, 34px);
                    color: rgba(69, 28, 1, 0.45);
                    line-height: 1;
                }
                .fg-pending-label {
                    font-style: italic;
                    font-size: clamp(8px, 1.4cqw, 11px);
                    color: rgba(69, 28, 1, 0.6);
                }
                .fg-map-note {
                    text-align: center;
                    font-style: italic;
                    font-size: clamp(9px, 1.05cqw, 12px);
                    line-height: 1.4;
                    opacity: 0.5;
                    max-width: 62ch;
                    margin: 0.75rem auto 0;
                    padding-inline: 1rem;
                    color: ${INK};
                }
                .fg-title-block {
                    text-align: center;
                    margin-top: 1rem;
                    padding-inline: clamp(1.5rem, 7cqw, 6rem);
                }
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
                .fg-subtitle {
                    font-style: italic;
                    font-size: clamp(12px, 1.8cqw, 18px);
                    margin: 0.6rem 0 0;
                    color: ${INK};
                }
                .fg-subtitle-link {
                    color: ${INK};
                    text-decoration: underline;
                    text-underline-offset: 2px;
                    text-decoration-thickness: 1px;
                }
                .fg-subtitle-link:hover { color: #E1554E; }
                @media (prefers-reduced-motion: reduce) {
                    .fg-specimen { transition: opacity 400ms ease; transform: translate(-50%, -50%) !important; }
                    .fg-animal-link:hover { transform: none; }
                }
            `}</style>
        </div>
    )
}
