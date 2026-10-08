import type { ElementType } from 'react'
import * as Icons from '@posthog/icons'

type IconName = keyof typeof Icons

/** Category label → icon, shared by the category grid, the category nav, and tag pages. */
export const tagOptions: Record<string, { icon: IconName }> = {
    'Being a founder': {
        icon: 'IconLightBulb',
    },
    Culture: {
        icon: 'IconHandwave',
    },
    Fundraising: {
        icon: 'IconHandMoney',
    },
    Growth: {
        icon: 'IconTrends',
    },
    Marketing: {
        icon: 'IconMegaphone',
    },
    'Ops & finance': {
        icon: 'IconGear',
    },
    People: {
        icon: 'IconPerson',
    },
    Product: {
        icon: 'IconRocket',
    },
    'Product-market fit': {
        icon: 'IconTarget',
    },
    Revenue: {
        icon: 'IconPiggyBank',
    },
    'Sales & CS': {
        icon: 'IconPhone',
    },
    Founders: {
        icon: 'IconPeople',
    },
    'AB testing': {
        icon: 'IconFlask',
    },
    Engineering: {
        icon: 'IconBrackets',
    },
    Experiments: {
        icon: 'IconFlask',
    },
    'Feature flags': {
        icon: 'IconToggle',
    },
    'Feature management': {
        icon: 'IconGear',
    },
    'Growth engineering': {
        icon: 'IconCode',
    },
    Guides: {
        icon: 'IconBook',
    },
    'Product analytics': {
        icon: 'IconGraph',
    },
    'Product engineers': {
        icon: 'IconWrench',
    },
    'Product metrics': {
        icon: 'IconPieChart',
    },
    'Session replay': {
        icon: 'IconRewindPlay',
    },
    Surveys: {
        icon: 'IconMessage',
    },
    'User research': {
        icon: 'IconSearch',
    },
    'Y Combinator': {
        icon: 'IconRocket',
    },
}

export const DEFAULT_TAG_ICON = Icons.IconApps

const tagOptionsByLowercaseLabel = new Map(
    Object.entries(tagOptions).map(([label, option]) => [label.toLowerCase(), option])
)

/**
 * Resolves a category label to its icon, or `undefined` when the label isn't mapped. Matching is
 * case-insensitive because the CMS isn't consistent about casing (e.g. "Growth Engineering").
 */
export const getTagIcon = (label: string): ElementType | undefined => {
    const iconName = tagOptionsByLowercaseLabel.get(label.toLowerCase())?.icon
    return iconName && Icons[iconName]
}
