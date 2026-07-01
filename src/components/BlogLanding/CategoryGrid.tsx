import React from 'react'
import Link from 'components/Link'
import ZoomHover from 'components/ZoomHover'
import * as Icons from '@posthog/icons'
import slugify from 'slugify'
import { useCategoryTags } from './useCategoryTags'

export const tagOptions = {
    'Being a founder': {
        icon: 'IconPeople',
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
        icon: 'IconPeople',
    },
    Product: {
        icon: 'IconRocket',
    },
    'Product-market fit': {
        icon: 'IconTarget',
    },
    Revenue: {
        icon: 'IconPieChart',
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
        icon: 'IconTrends',
    },
    Guides: {
        icon: 'IconBook',
    },
    'Product analytics': {
        icon: 'IconGraph',
    },
    'Product engineers': {
        icon: 'IconPeople',
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

interface CategoryGridProps {
    /** The post-category folder to load tags for (e.g. `founders`, `blog`, `newsletter`). */
    folder: string
    className?: string
}

const skeletonCount = 12

const CategoryTile = ({ folder, label }: { folder: string; label: string }) => {
    const tagOption = tagOptions[label as keyof typeof tagOptions]
    const iconName = tagOption?.icon || 'IconApps'
    const Icon = Icons[iconName as keyof typeof Icons] as any

    return (
        <ZoomHover width="full" className="items-center text-center [&>span]:w-full">
            <Link
                to={`/${folder}/${slugify(label, { lower: true, strict: true })}`}
                className="bg-accent border border-transparent hover:border-primary px-2 py-4 rounded flex flex-col h-full justify-start items-center gap-2 w-full font-medium"
            >
                <div>
                    <Icon className="size-6 text-primary" />
                </div>
                <div className="text-sm leading-tight">{label}</div>
            </Link>
        </ZoomHover>
    )
}

/**
 * Renders the clickable category tiles for a folder as a responsive auto-fit grid, sourced from
 * the Squeak/Strapi `post-tags` API. Used by the founders Hub. Preserves the exact tag set,
 * icons, and `/${folder}/${slug}` links. (The landing sidebar uses `CategoryTree` instead.)
 */
export default function CategoryGrid({ folder, className = '' }: CategoryGridProps) {
    const { tags, loading } = useCategoryTags(folder)

    return (
        <div
            data-scheme="primary"
            className={`grid grid-cols-[repeat(auto-fit,minmax(max(7rem,calc(100%/6)),1fr))] gap-4 relative items-start ${className}`}
        >
            {loading
                ? Array.from({ length: skeletonCount }).map((_, index) => (
                      <div key={index} className="bg-accent w-full h-20 rounded-md animate-pulse" />
                  ))
                : tags?.map((tag, index) => <CategoryTile key={index} folder={folder} label={tag.attributes.label} />)}
        </div>
    )
}
