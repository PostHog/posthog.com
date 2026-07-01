import React, { useState } from 'react'
import ReaderView from 'components/ReaderView'
import { NewsletterForm } from 'components/NewsletterForm'
import { useLandingPosts } from '../useLandingPosts'
import { useCategoryMenu } from '../useCategoryMenu'
import CategoryTree from '../CategoryTree'
import PostSection from '../PostSection'
import Hero from '../Hero'
import SortToggle, { SortValue } from '../SortToggle'
import { LandingVariantProps } from '../types'

/**
 * Sidebar explorer, built on the handbook's `ReaderView` shell so it inherits the exact chrome:
 * the darker `secondary`-scheme sub-toolbar + left nav rail, with bright `primary`-scheme main
 * content. Categories render through `CategoryTree` (collapsible, expand-in-place). The main column shows the hero
 * (most popular) plus a 2-up feed toggled between Recent and Popular.
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
                    <CategoryTree items={categoryItems} />
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
                <Hero post={hero} isLoading={isLoading} titleClassName="text-xl @2xl:text-2xl" />
                <PostSection
                    title={sort === 'recent' ? 'Most recent' : 'Most popular'}
                    posts={posts}
                    isLoading={isLoading}
                    columns={2}
                    action={<SortToggle value={sort} onChange={setSort} />}
                />
                <NewsletterForm placement="blog-index" />
            </div>
        </ReaderView>
    )
}
