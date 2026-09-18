import React from 'react'
import { TreeMenu } from 'components/TreeMenu'
import { useCategoryMenu } from './useCategoryMenu'
import { LandingVariantProps } from './types'

const SKELETON_COUNT = 10

/**
 * The landing page's left rail: heading, intro copy, and the folder's categories as an
 * expand-in-place `TreeMenu`. Memoized so main-column state (e.g. the sort toggle) doesn't
 * re-render the whole category tree.
 */
function CategorySidebar({ folder, title, intro }: LandingVariantProps) {
    const { items, loading } = useCategoryMenu(folder)

    return (
        <div className="space-y-5 py-2">
            <div className="space-y-2 px-1.5">
                <h1 className="m-0 text-2xl font-bold leading-tight">{title}</h1>
                {intro && <div className="text-secondary text-sm [&_p]:m-0 [&_p+p]:mt-2">{intro}</div>}
            </div>
            <div>
                <div className="text-muted text-sm font-medium px-1.5 py-0.5">Categories</div>
                {loading ? (
                    <div className="space-y-px">
                        {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
                            <div key={i} className="h-7 bg-accent rounded animate-pulse" />
                        ))}
                    </div>
                ) : (
                    // Rendered only once loaded because TreeMenu memoizes its items on first render.
                    <TreeMenu items={items} watchPath={false} expandOnly />
                )}
            </div>
        </div>
    )
}

export default React.memo(CategorySidebar)
