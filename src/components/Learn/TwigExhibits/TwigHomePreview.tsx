import React from 'react'
import { discoveryCopy, nightlyPrice, stays, type Stay } from '@posthog/twig-components/catalog'
import cabin from '@posthog/twig-components/assets/cabin.jpg'
import coast from '@posthog/twig-components/assets/coast.jpg'
import city from '@posthog/twig-components/assets/city.jpg'
import '@posthog/twig-components/catalog.css'
import '@posthog/twig-components/compact.css'
import { TwigWordmark } from '@posthog/twig-components/compact'

const photos: Record<Stay['setting'], string> = { Forest: cabin, Coast: coast, City: city }

/** A static look at Twig's home page: the welcome copy and the first stays. Nothing in it is interactive. */
export default function TwigHomePreview(): JSX.Element {
    return (
        <div className="twig-compact h-full !border-0">
            <div className="twig-compact-header">
                <TwigWordmark />
            </div>
            <div className="twig-compact-body">
                <p className="m-0 text-3xl leading-tight text-[color:var(--vac-ink)] [font-family:TwigFraunces,Georgia,serif]">
                    {discoveryCopy.title}
                </p>
                <p className="mb-0 mt-2 text-sm text-[color:var(--vac-text)]">{discoveryCopy.introduction}</p>
                <p className="mb-0 mt-6 text-sm font-semibold text-[color:var(--vac-text)]">Browse stays</p>
                <ul className="m-0 mt-2 grid list-none grid-cols-1 gap-4 p-0 @md:grid-cols-3">
                    {stays.slice(0, 3).map((stay) => (
                        <li key={stay.id} className="min-w-0 text-[color:var(--vac-text)]">
                            <img
                                src={photos[stay.setting]}
                                alt={stay.images[0]?.alt || ''}
                                className="aspect-[4/3] w-full rounded-sm object-cover"
                            />
                            <span className="mt-2 flex items-baseline justify-between gap-2 text-sm font-semibold">
                                <span className="truncate">{stay.title}</span>
                                <span className="shrink-0 font-normal">{nightlyPrice(stay)} / night</span>
                            </span>
                            <span className="block truncate text-xs text-[color:var(--vac-muted)]">
                                {stay.location}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
