import React, { useState } from 'react'
import { StayCardContent } from '@posthog/twig-components/stay-card'
import { filterStays, type Stay } from '@posthog/twig-components/catalog'
import { staySettings, type StaySetting } from '@posthog/twig-components/filters'
import cabin from '@posthog/twig-components/assets/cabin.jpg'
import coast from '@posthog/twig-components/assets/coast.jpg'
import city from '@posthog/twig-components/assets/city.jpg'
import '@posthog/twig-components/catalog.css'
import './twigGuide.css'

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
        <section aria-label="Twig" className="twig-browser pocket-guide-twig-browser">
            <div className="pocket-guide-twig-browser__header">Twig</div>
            <div className="pocket-guide-twig-browser__body">
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
                    <article className="vac-card pocket-guide-twig-stay-card">
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
