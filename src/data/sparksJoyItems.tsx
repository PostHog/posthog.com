import React from 'react'
import {
    HedgehogArtThief,
    HedgehogBoombox,
    HedgehogChart,
    HedgehogDeskWizard,
    HedgehogDynamite,
    HedgehogError,
    HedgehogExplorer,
    HedgehogGardener,
    HedgehogGladiator,
    HedgehogHahaBizzniss,
    HedgehogHogpatch,
    HedgehogIpad,
    HedgehogJudge,
    HedgehogLevelUp,
    HedgehogMagnifyingGlass,
    HedgehogOrganized,
    HedgehogSelfie,
    HedgehogSuperhero,
    HedgehogWizard,
} from '@posthog/brand/hoggies'

type SparksJoyItem = {
    label: string
    link: string
    icon: React.ReactElement
    // Set for anything that lives off posthog.com. Link only auto-detects an
    // external URL when the host is not a posthog.com one, and some of these
    // are on subdomains.
    external?: boolean
}

export const SparksJoyItems: Record<'games' | 'notGames', SparksJoyItem[]> = {
    games: [
        {
            label: 'Hedgehog mode',
            link: '/sparks-joy/hedgehog-mode',
            icon: <HedgehogSuperhero className="size-12" />,
        },
        {
            label: 'HogWars',
            link: '/sparks-joy/hogwars',
            icon: <HedgehogWizard className="size-12" />,
        },
        {
            label: 'Dictator or tech bro?',
            link: '/sparks-joy/dictator-or-tech-bro',
            icon: <HedgehogHahaBizzniss className="size-12" />,
        },
        {
            label: 'BrickHog',
            link: '/sparks-joy/brickhog',
            icon: <HedgehogDynamite className="size-12" />,
        },
        {
            label: 'HogPatch: The Game',
            link: '/sparks-joy/hogpatch',
            icon: <HedgehogHogpatch className="size-12" />,
        },
        {
            label: 'PostHog Farm',
            link: 'https://posthog.farm',
            icon: <HedgehogGardener className="size-12" />,
            external: true,
        },
        {
            label: 'Bug Survivors',
            link: 'https://survivors.posthog.com',
            icon: <HedgehogGladiator className="size-12" />,
            external: true,
        },
        {
            label: 'GuessHog',
            link: 'https://guesshog.posthog.com',
            icon: <HedgehogMagnifyingGlass className="size-12" />,
            external: true,
        },
    ],
    notGames: [
        {
            label: 'DeskHog',
            link: '/deskhog',
            icon: <HedgehogDeskWizard className="size-12" />,
        },
        {
            label: 'PostHog FM',
            link: '/fm',
            icon: <HedgehogBoombox className="size-12" />,
        },
        {
            label: 'The Cool Numbers Club',
            link: 'https://coolnumbersclub.posthog.com',
            icon: <HedgehogChart className="size-12" />,
            external: true,
        },
        {
            label: 'Photobooth',
            link: '/photobooth',
            icon: <HedgehogSelfie className="size-12" />,
        },
        {
            label: 'Hoggie tier list',
            link: '/tier-list',
            icon: <HedgehogJudge className="size-12" />,
        },
        {
            label: 'HogPaint',
            link: '/paint',
            icon: <HedgehogArtThief className="size-12" />,
        },
        {
            label: 'Coloring book.pdf',
            link: '/coloring-book.pdf',
            icon: <HedgehogIpad className="size-12" />,
        },
        {
            label: 'Post-It note training',
            link: '/academy',
            icon: <HedgehogOrganized className="size-12" />,
        },
        {
            label: '404 page',
            link: '/404',
            icon: <HedgehogError className="size-12" />,
        },
        {
            label: 'MCP leaderboard',
            link: '/mcp/leaderboard',
            icon: <HedgehogLevelUp className="size-12" />,
        },
        {
            label: 'Field guide to wild users',
            link: '/field-guide',
            icon: <HedgehogExplorer className="size-12" />,
        },
    ],
}
