import React, { useState } from 'react'
import ReaderView from 'components/ReaderView'
import { NewsletterForm } from 'components/NewsletterForm'
import FeaturedPost from 'components/Edition/FeaturedPost'
import { ToggleGroup } from 'components/RadixUI/ToggleGroup'
import { useLandingPosts } from '../useLandingPosts'
import CategorySidebar from '../CategorySidebar'
import PostSection from '../PostSection'
import { LandingVariantProps } from '../types'

type SortValue = 'recent' | 'popular'

/**
 * Sidebar explorer, built on the handbook's `ReaderView` shell so it inherits the same chrome:
 * a `secondary`-scheme sub-toolbar and left nav rail against `primary`-scheme content. The main
 * column shows the highest-scoring post as a hero plus a feed toggled between Recent and Popular.
 */
export default function SidebarExplorer({ folder, title, intro }: LandingVariantProps) {
    const { hero, popular, recent, isLoading } = useLandingPosts(folder)
    const [sort, setSort] = useState<SortValue>('recent')

    return (
        <ReaderView
            title={title}
            hideTitle
            leftSidebar={<CategorySidebar folder={folder} title={title} intro={intro} />}
            hideRightSidebar
            proseSize="base"
        >
            <div className="not-prose space-y-8">
                <FeaturedPost
                    {...hero?.attributes}
                    // Keep the skeleton until a hero exists, so an empty or partial folder never
                    // renders a card with an invalid date and an undefined link.
                    isLoading={isLoading || !hero}
                    containerStack
                    titleClassName="text-xl @2xl:text-2xl"
                />
                <PostSection
                    title={sort === 'recent' ? 'Most recent' : 'Most popular'}
                    posts={sort === 'recent' ? recent : popular}
                    isLoading={isLoading}
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
