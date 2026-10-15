import React from 'react'
import './twigMockup.css'

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
        <div className={`twig-pocket-mockup${framed ? ' twig-pocket-mockup--framed' : ''}`}>
            <div
                className="p-4 @md:p-5"
                role="img"
                aria-label={`Twig's Browse stays page with the ${selected} filter selected and one ${selected} stay`}
            >
                <h3 className="twig-pocket-mockup__title">Browse stays</h3>
                <div className="flex flex-wrap gap-2" aria-hidden="true">
                    {filters.map((filter) => (
                        <span
                            key={filter}
                            className={`twig-pocket-mockup__filter ${
                                animated && filter === 'Forest' ? 'twig-click-before-filter' : ''
                            } ${animated && filter === selected ? 'twig-click-target-filter relative' : ''}`}
                            data-selected={filter === selected}
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
                <p className="twig-pocket-mockup__count">1 stay</p>
                <div className="twig-pocket-mockup__stay">
                    <span className="twig-pocket-mockup__stay-image" aria-hidden="true" />
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
