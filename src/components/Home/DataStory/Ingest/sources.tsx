import React, { useMemo } from 'react'
import useSourcePlatforms from 'hooks/useSourcePlatforms'
import { cn } from '../../../../utils'

interface SpotlightSource {
    name: string
    record: string
    profileFacts: string[]
}

export const SOURCE_AMBIENT_MS = { minMs: 2600, maxMs: 5200 }

export const SPOTLIGHT_SOURCES: SpotlightSource[] = [
    {
        name: 'Stripe',
        record: 'payments and refunds',
        profileFacts: ['Paid $49.00 for Pro', 'Upgraded to Pro monthly', 'Invoice #1042 paid'],
    },
    {
        name: 'Postgres',
        record: 'your app tables',
        profileFacts: ['users.plan = pro', 'workspaces.seats = 4', 'projects.count = 3'],
    },
    {
        name: 'Google Ads',
        record: 'campaigns and spend',
        profileFacts: ['Clicked "Product analytics for devs"', 'Searched "session replay tool"'],
    },
    {
        name: 'Meta Ads',
        record: 'ad views and spend',
        profileFacts: ['Saw "Ship faster with flags"', 'Clicked the Hogzilla ad'],
    },
    {
        name: 'GitHub',
        record: 'issues and PRs',
        profileFacts: ['Opened issue #482', 'Commented on PR #1931'],
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

export const SourceLogo = ({ logo, className }: { logo?: string; className?: string }) =>
    logo ? <img src={logo} alt="" className={cn('object-contain', className)} /> : null

export const SourceTile = ({ logo, className }: { logo?: string; className?: string }) => (
    <span
        className={cn(
            'flex size-5 shrink-0 items-center justify-center rounded-[5px] border border-primary bg-white shadow-sm',
            className
        )}
    >
        <SourceLogo logo={logo} className="size-3.5" />
    </span>
)
