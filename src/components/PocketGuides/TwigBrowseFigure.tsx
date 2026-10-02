import React, { useState } from 'react'
import { StayCardContent } from '@posthog/twig-components/stay-card'
import { filterStays, type Stay } from '@posthog/twig-components/catalog'
import { staySettings, type StaySetting } from '@posthog/twig-components/filters'
import cabin from '@posthog/twig-components/assets/cabin.jpg'
import coast from '@posthog/twig-components/assets/coast.jpg'
import city from '@posthog/twig-components/assets/city.jpg'
import '@posthog/twig-components/catalog.css'

const photos: Record<Stay['setting'], string> = { Forest: cabin, Coast: coast, City: city }

/** A compact destination choice using Twig's filters, stay content, and guide-owned state. */
export default function TwigBrowseFigure({
    onFilter,
    initialSetting = 'Forest',
    controlledSetting,
    id,
}: {
    onFilter?: (setting: StaySetting, count: number) => void
    initialSetting?: StaySetting
    controlledSetting?: StaySetting
    id: string
}): JSX.Element {
    const [setting, setSetting] = useState<StaySetting>(initialSetting)
    const selectedSetting = controlledSetting ?? setting
    const matches = filterStays(selectedSetting, '')
    const stay = matches[0]
    return (
        <section
            aria-label="Twig"
            className="twig-browser min-w-0 overflow-hidden rounded border border-[#d7c8b6] bg-[#f7eddf] text-[#2d2b29]"
        >
            <div className="border-b border-[#d7c8b6] px-3 py-2 font-rounded text-sm font-semibold">Twig</div>
            <div className="p-4 @md:p-5">
                <fieldset id={`${id}-filters`} className="vac-filters !my-3">
                    <legend className="vac-sr-only">Filter by destination type</legend>
                    {staySettings
                        .filter((destination) => destination !== 'All')
                        .map((destination) => (
                            <button
                                key={destination}
                                data-replay-label={`Filter: ${destination}`}
                                type="button"
                                className="vac-filter text-sm font-semibold"
                                aria-pressed={selectedSetting === destination}
                                onClick={() => {
                                    setSetting(destination)
                                    onFilter?.(destination, filterStays(destination, '').length)
                                }}
                            >
                                {destination}
                            </button>
                        ))}
                </fieldset>
                <p className="vac-muted !my-2 text-xs" role="status">
                    {matches.length} {matches.length === 1 ? 'stay' : 'stays'}
                </p>
                {stay && (
                    <article className="vac-card grid grid-cols-[6rem_minmax(0,1fr)] items-center gap-3 rounded border border-[#d7c8b6] bg-[#fff8ee] p-3 [&_.vac-card-body]:p-0 [&_.vac-card-body_h3]:text-base [&_.vac-card-body_p]:text-xs [&_.vac-card-body>p:nth-of-type(2)]:hidden [&_.vac-card-body>p:last-child]:!mb-0 [&_.vac-image]:aspect-[4/3]">
                        <StayCardContent
                            stay={stay}
                            image={
                                <div className="vac-image">
                                    <img src={photos[stay.setting]} alt={stay.images[0]?.alt || ''} />
                                </div>
                            }
                        />
                    </article>
                )}
            </div>
        </section>
    )
}
