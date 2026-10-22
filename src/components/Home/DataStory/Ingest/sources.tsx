import React, { useMemo } from 'react'
import useSourcePlatforms from 'hooks/useSourcePlatforms'
import { cn } from '../../../../utils'

interface SpotlightSource {
    name: string
    profileFacts: string[]
}

export const SOURCE_AMBIENT_MS = { minMs: 2600, maxMs: 5200 }

export const SPOTLIGHT_SOURCES: SpotlightSource[] = [
    {
        name: 'Stripe',
        profileFacts: [],
    },
    {
        name: 'Postgres',
        profileFacts: ['rides.status = completed', 'drivers.on_shift = 14', 'rides.squirrel_stops = 2'],
    },
    {
        name: 'Google Ads',
        profileFacts: ['Searched "uber for dogs"', 'Clicked "Rides by good dogs"'],
    },
    {
        name: 'Meta Ads',
        profileFacts: ['Saw "Your driver is a good boy"', 'Clicked the golden retriever ad'],
    },
    {
        name: 'Zendesk',
        profileFacts: ['Ticket: "Driver stopped for a squirrel"', 'Ticket: "Can dogs parallel park?"'],
    },
]

export const STRIPE = SPOTLIGHT_SOURCES.findIndex(({ name }) => name === 'Stripe')

const normalizeName = (name: string): string => name.toLowerCase().replace(/\s/g, '')

export function useSpotlightLogos(): (string | undefined)[] {
    const platforms = useSourcePlatforms() as { label: string; image: string }[]
    return useMemo(
        () =>
            SPOTLIGHT_SOURCES.map(
                ({ name }) => platforms.find(({ label }) => normalizeName(label) === normalizeName(name))?.image
            ),
        [platforms]
    )
}

const SourceLogo = ({ logo, className }: { logo?: string; className?: string }) =>
    logo ? <img src={logo} alt="" className={cn('object-contain', className)} /> : null

export const SourceTile = ({ logo }: { logo?: string }) => (
    <span className="flex size-5 shrink-0 items-center justify-center rounded-[5px] border border-primary bg-white shadow-sm">
        <SourceLogo logo={logo} className="size-3.5" />
    </span>
)
