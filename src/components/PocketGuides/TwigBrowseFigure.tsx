import React, { useState } from 'react'
import { BrowseStays } from '@posthog/twig-components/browse-stays'
import { StayCardContent } from '@posthog/twig-components/stay-card'
import { filterStays, type Stay } from '@posthog/twig-components/catalog'
import type { StaySetting } from '@posthog/twig-components/filters'
import cabin from '@posthog/twig-components/assets/cabin.jpg'
import coast from '@posthog/twig-components/assets/coast.jpg'
import city from '@posthog/twig-components/assets/city.jpg'
import '@posthog/twig-components/catalog.css'

const photos: Record<Stay['setting'], string> = { Forest: cabin, Coast: coast, City: city }

/** The same BrowseStays and StayCardContent views used by Twig, with guide-owned local state. */
export default function TwigBrowseFigure({
    onFilter,
    onOpen,
    initialSetting = 'All',
    controlledSetting,
    id,
}: {
    onFilter?: (setting: StaySetting, count: number) => void
    onOpen?: (stay: Stay) => void
    initialSetting?: StaySetting
    controlledSetting?: StaySetting
    id: string
}): JSX.Element {
    const [setting, setSetting] = useState<StaySetting>(initialSetting)
    const [search, setSearch] = useState('')
    const selectedSetting = controlledSetting ?? setting
    return (
        <div className="twig-browser min-w-0 overflow-hidden rounded border border-[#d7c8b6] bg-[#f7eddf] p-3 text-[#2d2b29] [&_.vac-card-body]:min-w-0 [&_.vac-card-body]:!p-3 [&_.vac-card-body>p:last-child]:hidden [&_.vac-card:not(:first-child)]:hidden [&_.vac-card>button]:!grid [&_.vac-card>button]:!grid-cols-[6rem_minmax(0,1fr)] [&_.vac-card>button]:items-stretch [&_.vac-catalog>label]:hidden [&_.vac-filters]:!my-3 [&_.vac-image]:!aspect-auto [&_.vac-image]:!h-full [&_.vac-image]:!w-full [&_.vac-image]:!min-h-24 [&_.vac-image]:!rounded-r-none [&_.vac-stay-grid]:!mt-3 [&_.vac-stay-grid]:!grid-cols-1 [&_.vac-stay-grid]:!gap-0 [&_.vac-stay-search]:hidden @md:p-4">
            <BrowseStays
                id={id}
                setting={selectedSetting}
                search={search}
                onSearchChange={setSearch}
                onSettingChange={(next) => {
                    setSetting(next)
                    onFilter?.(next, filterStays(next, search).length)
                }}
                renderStay={(stay) => (
                    <article className="vac-card" key={stay.id}>
                        <button
                            type="button"
                            className="w-full cursor-pointer border-0 bg-transparent p-0 text-left text-inherit"
                            onClick={() => onOpen?.(stay)}
                            aria-label={`Open ${stay.title || stay.location || stay.id}`}
                        >
                            <StayCardContent
                                stay={stay}
                                image={
                                    <div className="vac-image">
                                        <img src={photos[stay.setting]} alt={stay.images[0]?.alt || ''} />
                                    </div>
                                }
                            />
                        </button>
                    </article>
                )}
            />
        </div>
    )
}
