import React from 'react'
import './twigMockup.css'

export const twigPalette = {
    paper: '#f7eddf',
    ink: '#2d2b29',
    muted: '#6d6258',
    line: '#d7c8b6',
    fill: '#efe1ce',
}

const filters = ['All stays', 'Forest', 'Coast', 'Mountain']

export default function TwigBrowseStaysMockup({
    selected,
    animated = false,
    framed = true,
}: {
    selected: 'Forest' | 'Coast' | 'Mountain'
    animated?: boolean
    framed?: boolean
}): JSX.Element {
    return (
        <div
            className={`twig-pocket-mockup overflow-hidden ${framed ? 'rounded border' : ''}`}
            style={{ background: twigPalette.paper, borderColor: twigPalette.line, color: twigPalette.ink }}
        >
            <div
                className="p-4 @md:p-5"
                role="img"
                aria-label={`Twig's Browse stays page with the ${selected} filter selected and one ${selected} stay`}
            >
                <span className="text-xs uppercase" style={{ color: twigPalette.muted }}>
                    Explore
                </span>
                <h3 className="!mt-1 !mb-4 text-2xl font-semibold" style={{ color: twigPalette.ink }}>
                    Browse stays
                </h3>
                <div className="flex flex-wrap gap-2" aria-hidden="true">
                    {filters.map((filter) => (
                        <span
                            key={filter}
                            className={`rounded border px-3 py-2 text-sm ${
                                animated && filter === 'Forest' ? 'twig-click-before-filter' : ''
                            } ${animated && filter === selected ? 'twig-click-target-filter relative' : ''}`}
                            style={{
                                borderColor: filter === selected ? twigPalette.ink : twigPalette.line,
                                background: filter === selected ? twigPalette.ink : 'transparent',
                                color: filter === selected ? twigPalette.paper : twigPalette.ink,
                            }}
                        >
                            {filter}
                            {animated && filter === selected && (
                                <>
                                    <span
                                        className="twig-click-ring pointer-events-none absolute left-1/2 top-1/2 rounded-full border-2"
                                        aria-hidden="true"
                                    />
                                    <svg
                                        viewBox="0 0 12 16"
                                        className="twig-click-pointer pointer-events-none absolute left-1/2 top-1/2 z-10 w-4 fill-white stroke-[#202225] stroke-[1.5]"
                                        aria-hidden="true"
                                    >
                                        <path d="M1 1l9.5 7-4 .6 2.2 4.6-2 1-2.2-4.6L1 12z" />
                                    </svg>
                                </>
                            )}
                        </span>
                    ))}
                </div>
                <p className="!mt-3 !mb-0 text-sm" style={{ color: twigPalette.muted }}>
                    1 stay
                </p>
                <div
                    className="mt-3 flex items-center gap-3 rounded border p-2"
                    style={{ borderColor: twigPalette.line }}
                >
                    <span
                        className="block h-12 w-16 shrink-0 rounded"
                        style={{ background: twigPalette.fill }}
                        aria-hidden="true"
                    />
                    <span className="relative text-sm">
                        {animated && (
                            <span className="twig-click-before-stay absolute left-0 whitespace-nowrap">
                                Forest stay
                            </span>
                        )}
                        <span className={animated ? 'twig-click-after-stay' : ''}>{selected} stay</span>
                    </span>
                </div>
            </div>
        </div>
    )
}
