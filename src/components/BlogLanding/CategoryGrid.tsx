import React from 'react'
import Link from 'components/Link'
import ZoomHover from 'components/ZoomHover'
import slugify from 'slugify'
import { DEFAULT_TAG_ICON, getTagIcon } from './tagOptions'
import { useCategoryTags } from './useCategoryTags'

interface CategoryGridProps {
    /** The post-category folder to load tags for (e.g. `founders`, `blog`, `newsletter`). */
    folder: string
    className?: string
}

const SKELETON_COUNT = 12

const CategoryTile = ({ folder, label }: { folder: string; label: string }) => {
    const Icon = getTagIcon(label) || DEFAULT_TAG_ICON

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
 * The clickable category tiles for a folder, as a responsive auto-fit grid. Used by the founders
 * `Hub`; the landing sidebar uses the shared `TreeMenu` instead.
 */
export default function CategoryGrid({ folder, className = '' }: CategoryGridProps) {
    const { tags, loading } = useCategoryTags(folder)

    return (
        <div
            data-scheme="primary"
            className={`grid grid-cols-[repeat(auto-fit,minmax(max(7rem,calc(100%/6)),1fr))] gap-4 relative items-start ${className}`}
        >
            {loading
                ? Array.from({ length: SKELETON_COUNT }).map((_, index) => (
                      <div key={index} className="bg-accent w-full h-20 rounded-md animate-pulse" />
                  ))
                : tags?.map((tag) => (
                      <CategoryTile key={tag.attributes.label} folder={folder} label={tag.attributes.label} />
                  ))}
        </div>
    )
}
