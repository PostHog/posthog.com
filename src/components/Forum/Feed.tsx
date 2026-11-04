import React, { useEffect, useState } from 'react'
import { ToggleGroup } from 'components/RadixUI/ToggleGroup'
import { ForumSort, ForumTag, FeedOptions } from './hooks'
import FilterMenu from './FilterMenu'
import { FeedSkeleton, FeedTable, PostRowSkeleton } from './FeedTable'
import { useWindow } from '../../context/Window'

export { FeedSkeleton, PostRowSkeleton }

const sortOptions: { label: string; value: ForumSort }[] = [
    { label: 'Latest', value: 'latest' },
    { label: 'Active', value: 'active' },
    { label: 'Popular', value: 'popular' },
]

// A whole feed page while its data loads: the header, the sort bar, and rows.
export const FeedPageSkeleton = () => (
    <div className="@container" aria-busy>
        <div className="px-4 @xl:px-5 pt-4 pb-3 border-b border-primary space-y-2">
            <div className="h-7 w-48 rounded bg-accent animate-pulse" />
            <div className="h-4 w-80 max-w-full rounded bg-accent animate-pulse" />
            <div className="h-8 w-72 max-w-full rounded bg-accent animate-pulse mt-3" />
        </div>
        <FeedSkeleton />
    </div>
)

type FeedProps = {
    title: React.ReactNode
    description?: string | null
    // Tags that the filter offers. Omit to hide the filter.
    tags?: ForumTag[]
    tagScope?: string
    topicId?: number
    following?: FeedOptions['following']
    showTopic: boolean
    empty: React.ReactNode
}

export default function Feed({
    title,
    description,
    tags,
    tagScope = 'All tags',
    topicId,
    following,
    showTopic,
    empty,
}: FeedProps) {
    const [sort, setSort] = useState<ForumSort>('latest')
    const [tagIds, setTagIds] = useState<number[]>([])
    const [unanswered, setUnanswered] = useState(false)
    // A `?tag=` link, such as a `#topic/tag` reference in a post, opens the feed filtered to that tag.
    const { appWindow } = useWindow()
    const tagSlug = new URLSearchParams(appWindow?.location?.search || '').get('tag')
    useEffect(() => {
        const tag = tagSlug ? tags?.find((tag) => tag.attributes.slug === tagSlug) : undefined
        if (tag) setTagIds([tag.id])
    }, [tagSlug, tags?.length])
    return (
        <div className="@container">
            <header className="px-4 @xl:px-5 pt-4 pb-3 border-b border-primary">
                <div className="flex items-start gap-3 flex-wrap">
                    <div className="min-w-0 flex-1">
                        <h1 className="text-2xl font-bold text-primary leading-tight m-0 flex items-center gap-2">
                            {title}
                        </h1>
                        {description && <p className="text-sm text-secondary m-0 mt-0.5">{description}</p>}
                    </div>
                </div>
                <div className="flex items-center gap-2 mt-3 flex-wrap text-sm">
                    <div className="w-72">
                        <ToggleGroup
                            title="Sort"
                            hideTitle
                            options={sortOptions}
                            value={sort}
                            onValueChange={(value) => value && setSort(value as ForumSort)}
                            size="sm"
                        />
                    </div>
                    {tags && (
                        <FilterMenu
                            tags={tags}
                            selected={tagIds}
                            onChange={setTagIds}
                            unanswered={unanswered}
                            onUnansweredChange={setUnanswered}
                            scope={tagScope}
                        />
                    )}
                </div>
            </header>
            <FeedTable
                sort={sort}
                topicId={topicId}
                tagIds={tagIds}
                unanswered={unanswered}
                following={following}
                showTopic={showTopic}
                empty={empty}
            />
        </div>
    )
}
