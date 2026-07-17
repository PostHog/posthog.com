import React from 'react'
import {
    IconBook,
    IconCompass,
    IconCopy,
    IconGraduationCap,
    IconHeart,
    IconNewspaper,
    IconPeople,
    IconPlug,
    IconPuzzle,
} from '@posthog/icons'
import { capitalizeFirstLetter } from '../../utils'

type TypeConfig = {
    type: string
    label: string
    icon: React.ReactNode
    aliases: string[]
}

// Presentation and search aliases for categories already present in the Algolia index.
const typeConfig: TypeConfig[] = [
    { type: 'docs', label: 'Docs', icon: <IconBook />, aliases: ['docs', 'documentation', 'reference', 'manual'] },
    { type: 'apps', label: 'Apps', icon: <IconPuzzle />, aliases: ['apps'] },
    {
        type: 'tutorial',
        label: 'Tutorials',
        icon: <IconGraduationCap />,
        aliases: ['tutorials', 'guides', 'how-to', 'walkthrough'],
    },
    { type: 'blog', label: 'Blog', icon: <IconNewspaper />, aliases: ['blog', 'articles', 'news'] },
    {
        type: 'handbook',
        label: 'Handbook',
        icon: <IconCompass />,
        aliases: ['handbook', 'company', 'culture'],
    },
    { type: 'customers', label: 'Customers', icon: <IconHeart />, aliases: ['customers'] },
    { type: 'templates', label: 'Templates', icon: <IconCopy />, aliases: ['templates'] },
    {
        type: 'community',
        label: 'Community',
        icon: <IconPeople />,
        aliases: ['questions', 'community', 'forum', 'answers'],
    },
    { type: 'cdp', label: 'CDP', icon: <IconPlug />, aliases: ['cdp', 'pipelines', 'destinations'] },
]

export const configForType = (type: string): TypeConfig =>
    typeConfig.find((config) => config.type === type) ?? {
        type,
        label: capitalizeFirstLetter(type),
        icon: <IconBook />,
        aliases: [],
    }

export const matchCategory = (query: string): string | null => {
    const q = query.trim().toLowerCase()
    if (q.length < 3) return null
    for (const config of typeConfig) {
        if (config.aliases.some((alias) => alias.startsWith(q) || (q.length >= 4 && alias.includes(q)))) {
            return config.type
        }
    }
    return null
}

// null is "All categories" and clears the filter.
export const filterOptions: (string | null)[] = [null, ...typeConfig.map(({ type }) => type)]
