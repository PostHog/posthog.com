import React, { useState } from 'react'
import { StayCardContent } from '@posthog/twig-components/stay-card'
import { filterStays, type Stay } from '@posthog/twig-components/catalog'
import { type StaySetting } from '@posthog/twig-components/filters'
import cabin from '@posthog/twig-components/assets/cabin.jpg'
import coast from '@posthog/twig-components/assets/coast.jpg'
import city from '@posthog/twig-components/assets/city.jpg'
import '@posthog/twig-components/catalog.css'
import '@posthog/twig-components/compact.css'
import { TwigWordmark, CompactStayFilters } from '@posthog/twig-components/compact'

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
        <section aria-label="Twig" className="twig-compact">
            <div className="twig-compact-header">
                <TwigWordmark />
            </div>
            <div className="p-4 @md:p-5">
                <CompactStayFilters
                    id={`${id}-filters`}
                    value={selectedSetting}
                    onChange={(destination) => {
                        setSetting(destination)
                        onFilter?.(destination, filterStays(destination, '').length)
                    }}
                />
                {stay && (
                    <article className="twig-compact-stay">
                        <StayCardContent
                            compact
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
