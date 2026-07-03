import React, { useState } from 'react'
import ReaderView from 'components/ReaderView'
import { NewsletterForm } from 'components/NewsletterForm'
import { TreeMenu } from 'components/TreeMenu'
import FeaturedPost from 'components/Edition/FeaturedPost'
import { ToggleGroup } from 'components/RadixUI/ToggleGroup'
import { useLandingPosts } from '../useLandingPosts'
import { useCategoryMenu } from '../useCategoryMenu'
import PostSection from '../PostSection'
import { LandingVariantProps } from '../types'

type SortValue = 'recent' | 'popular'

/**
 * Sidebar explorer, built on the handbook's `ReaderView` shell so it inherits the exact chrome:
 * the darker `secondary`-scheme sub-toolbar + left nav rail, with bright `primary`-scheme main
 * content. Categories render through the shared `TreeMenu` in `expandOnly` mode (collapsible,
 * expand-in-place). The main column shows the hero (most popular) via the shared `FeaturedPost`
 * plus a 2-up feed toggled between Recent and Popular.
 */
export default function SidebarExplorer({ folder, title, intro }: LandingVariantProps) {
    const { hero, popular, recent, isLoading } = useLandingPosts(folder)
    const { items: categoryItems, loading: categoriesLoading } = useCategoryMenu(folder)
    const [sort, setSort] = useState<SortValue>('recent')

    const posts = sort === 'recent' ? recent : popular

    const leftSidebar = (
        <div className="space-y-5 py-2">
            <div className="space-y-2 px-1.5">
                <h1 className="m-0 text-2xl font-bold leading-tight">{title}</h1>
                {intro && <div className="text-secondary text-sm [&_p]:m-0 [&_p+p]:mt-2">{intro}</div>}
            </div>
            <div>
                <div className="text-muted text-sm font-medium px-1.5 py-0.5">Categories</div>
                {categoriesLoading ? (
                    <div className="space-y-px">
                        {Array.from({ length: 10 }).map((_, i) => (
                            <div key={i} className="h-7 bg-accent rounded animate-pulse" />
                        ))}
                    </div>
                ) : (
                    // Keyed on load so it mounts once the items are present (TreeMenu memoizes items on
                    // first render). expandOnly = category rows toggle in place instead of navigating.
                    <TreeMenu key="loaded" items={categoryItems} watchPath={false} expandOnly />
                )}
            </div>
        </div>
    )

    return (
        <ReaderView
            title={title}
            hideTitle
            homeURL={`/${folder}`}
            description="The best advice for building a successful company."
            leftSidebar={leftSidebar}
            hideRightSidebar
            proseSize="base"
        >
            <div className="not-prose space-y-8">
                <FeaturedPost
                    {...hero?.attributes}
                    // Keep the skeleton until a hero exists, so an empty/partial folder never
                    // renders a broken "Invalid Date" card with an undefined link.
                    isLoading={isLoading || !hero}
                    containerStack
                    titleClassName="text-xl @2xl:text-2xl"
                />
                <PostSection
                    title={sort === 'recent' ? 'Most recent' : 'Most popular'}
                    posts={posts}
                    isLoading={isLoading}
                    columns={3}
                    action={
                        <ToggleGroup
                            title="Sort by"
                            hideTitle
                            value={sort}
                            onValueChange={(v) => v && setSort(v as SortValue)}
                            options={[
                                { label: 'Recent', value: 'recent' },
                                { label: 'Popular', value: 'popular' },
                            ]}
                        />
                    }
                />
                <NewsletterForm placement="blog-index" />
            </div>
        </ReaderView>
    )
}
