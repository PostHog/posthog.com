import React, { useEffect, useState } from 'react'
import OSButton from 'components/OSButton'

const AXES = ['Marketing', 'Operations', 'Product', 'Design', 'HR', 'Finance', 'Legal'] as const

interface StarMapSample {
    title: string
    values: number[] // length 7, one per AXES entry, 0–100
    founderScore: number
}

const sampleMaps: StarMapSample[] = [
    {
        title: 'Balanced across Product & HR',
        values: [42, 8, 92, 5, 78, 0, 0],
        founderScore: 0,
    },
    {
        title: 'Mostly Operations',
        values: [22, 95, 38, 4, 0, 48, 12],
        founderScore: 14,
    },
    {
        title: 'Marketing-shaped',
        values: [94, 30, 55, 22, 12, 6, 0],
        founderScore: 8,
    },
    {
        title: 'A finance brain',
        values: [0, 62, 38, 0, 8, 88, 35],
        founderScore: 24,
    },
    {
        title: "Designer's pull",
        values: [38, 14, 70, 92, 22, 0, 0],
        founderScore: 5,
    },
    {
        title: 'Founder mode',
        values: [55, 60, 70, 50, 55, 65, 40],
        founderScore: 41,
    },
    {
        title: 'HR-leaning',
        values: [18, 35, 42, 18, 88, 14, 28],
        founderScore: 11,
    },
]

function StarMap({ values, founderScore }: { values: number[]; founderScore: number }) {
    const size = 320
    const cx = size / 2
    const cy = size / 2 + 4
    const maxR = 96
    const innerR = 28
    const labelR = maxR + 22
    const n = AXES.length

    const point = (index: number, radius: number) => {
        const angle = -Math.PI / 2 + (index * 2 * Math.PI) / n
        return [cx + radius * Math.cos(angle), cy + radius * Math.sin(angle)] as const
    }

    const ringPolygon = (radius: number) =>
        AXES.map((_, i) => point(i, radius))
            .map(([x, y]) => `${x.toFixed(2)},${y.toFixed(2)}`)
            .join(' ')

    return (
        <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-auto" role="img" aria-label="Star map">
            {/* Concentric rings */}
            {[0.25, 0.5, 0.75].map((r) => (
                <polygon
                    key={r}
                    points={ringPolygon(maxR * r)}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeDasharray="2 3"
                    className="text-muted/40"
                />
            ))}
            {/* Outer ring */}
            <polygon
                points={ringPolygon(maxR)}
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="text-muted/60"
            />

            {/* Spokes */}
            {AXES.map((_, i) => {
                const [x, y] = point(i, maxR)
                return (
                    <line
                        key={i}
                        x1={cx}
                        y1={cy}
                        x2={x}
                        y2={y}
                        stroke="currentColor"
                        strokeWidth="1"
                        className="text-muted/30"
                    />
                )
            })}

            {/* Score lines + dots */}
            {AXES.map((_, i) => {
                const value = values[i] ?? 0
                if (value <= 4) return null
                const [x, y] = point(i, (value / 100) * maxR)
                return (
                    <g key={i}>
                        <line
                            x1={cx}
                            y1={cy}
                            x2={x.toFixed(2)}
                            y2={y.toFixed(2)}
                            stroke="#F54E00"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                        />
                        <circle cx={x.toFixed(2)} cy={y.toFixed(2)} r="3.5" fill="#F54E00" />
                    </g>
                )
            })}

            {/* Center circle */}
            <circle
                cx={cx}
                cy={cy}
                r={innerR}
                fill="currentColor"
                className="text-primary"
                stroke="currentColor"
                strokeWidth="1.5"
            />
            <circle
                cx={cx}
                cy={cy}
                r={innerR}
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                className="text-muted/50"
            />
            <text
                x={cx}
                y={cy - 4}
                textAnchor="middle"
                fontSize="9"
                className="fill-secondary"
                style={{ letterSpacing: '0.05em' }}
            >
                Founder
            </text>
            <text x={cx} y={cy + 11} textAnchor="middle" fontSize="14" fontWeight="700" className="fill-primary">
                {founderScore}
            </text>

            {/* Axis labels */}
            {AXES.map((label, i) => {
                const [x, y] = point(i, labelR)
                return (
                    <text
                        key={label}
                        x={x.toFixed(2)}
                        y={y.toFixed(2)}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fontSize="11"
                        fontWeight="600"
                        className="fill-primary"
                    >
                        {label}
                    </text>
                )
            })}
        </svg>
    )
}

function StarMapCard({ map }: { map: StarMapSample }) {
    const handleScrollToRsvp = (e: React.MouseEvent) => {
        e.preventDefault()
        const target = document.getElementById('rsvp')
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' })
            history.replaceState(null, '', '#rsvp')
        }
    }
    return (
        <div className="relative bg-primary border border-primary rounded-lg shadow-2xl p-5 @md:p-6 max-w-sm mx-auto -rotate-1 hover:rotate-0 transition-transform duration-300 ease-out">
            <p className="text-[10px] uppercase tracking-[0.25em] font-semibold text-secondary m-0 mb-1 text-center">
                Your Star Map
            </p>
            <h3 className="text-lg @md:text-xl font-bold m-0 mb-3 leading-tight text-center text-balance">
                {map.title}
            </h3>

            <div className="my-2">
                <StarMap values={map.values} founderScore={map.founderScore} />
            </div>

            <p className="text-[10px] text-muted text-center m-0 mb-4 italic">Updated just now</p>

            <div className="flex justify-center">
                <OSButton asLink to="#rsvp" variant="primary" size="md" onClick={handleScrollToRsvp}>
                    Find out yours
                </OSButton>
            </div>
        </div>
    )
}

export function PersonalityQuiz() {
    const [map, setMap] = useState<StarMapSample>(sampleMaps[0])

    useEffect(() => {
        const random = sampleMaps[Math.floor(Math.random() * sampleMaps.length)]
        setMap(random)
    }, [])

    return (
        <section className="relative mb-12 @xl:mb-20 px-4 @xl:px-8">
            <div className="grid @lg:grid-cols-[1fr_auto] gap-8 @lg:gap-12 items-start max-w-5xl">
                <div>
                    <div className="flex items-baseline gap-2 mb-3 flex-wrap">
                        <h2 className="text-2xl @lg:text-3xl font-bold m-0 leading-tight">
                            See where your skill set actually leans
                        </h2>
                        <span className="text-[10px] uppercase tracking-widest font-bold bg-yellow text-primary rounded-sm px-1.5 py-0.5">
                            Research preview
                        </span>
                    </div>
                    <p className="text-secondary max-w-xl mb-4 m-0 leading-relaxed">
                        PostHog Work plots your activated skills onto a star map across seven everyday roles —
                        Marketing, Operations, Product, Design, HR, Finance, and Legal — with a Founder score at the
                        centre for the financial and decision-shaping work.
                    </p>
                    <p className="text-secondary max-w-xl mb-4 m-0 leading-relaxed">
                        It refreshes every hour as you add or activate new skills, so your map shifts as your week does.
                        It is a productivity report. It is also a personality test. Mostly it is for sharing in your
                        team Slack channel.
                    </p>
                    <p className="text-xs text-muted italic m-0">
                        Available in research preview. Don't take it too seriously. We don't.
                    </p>
                </div>

                <div className="w-full @lg:w-[22rem]">
                    <StarMapCard map={map} />
                </div>
            </div>
        </section>
    )
}
