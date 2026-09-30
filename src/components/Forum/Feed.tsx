import React, { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ToggleGroup } from 'components/RadixUI/ToggleGroup'
import { ForumSort, ForumTag, FeedOptions, useForumFeed } from './hooks'
import FilterMenu from './FilterMenu'
import PostRow from './PostRow'
import { useWindow } from '../../context/Window'

const sortOptions: { label: string; value: ForumSort }[] = [
    { label: 'Latest', value: 'latest' },
    { label: 'Active', value: 'active' },
    { label: 'Popular', value: 'popular' },
]

// A placeholder with the shape of a PostRow.
export const PostRowSkeleton = () => (
    <div className="px-4 @xl:px-5 py-4 space-y-2 border-b border-primary">
        <div className="h-4 w-2/3 rounded bg-accent animate-pulse" />
        <div className="h-3 w-5/6 rounded bg-accent animate-pulse" />
        <div className="flex justify-between gap-4">
            <div className="h-3 w-1/3 rounded bg-accent animate-pulse" />
            <div className="hidden @2xl:block h-3 w-40 rounded bg-accent animate-pulse" />
        </div>
    </div>
)

export const FeedSkeleton = ({ rows = 3 }: { rows?: number }) => (
    <>
        {Array.from({ length: rows }, (_, index) => (
            <PostRowSkeleton key={index} />
        ))}
    </>
)

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

// A thin bar that runs along the top of the list while a new sort or filter loads. It is absolutely positioned, so
// nothing below it moves.
const ProgressBar = () => (
    <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-0.5 overflow-hidden" aria-hidden>
        <motion.div
            className="h-full w-1/3 bg-red dark:bg-yellow"
            initial={{ x: '-100%' }}
            animate={{ x: '300%' }}
            transition={{ duration: 1, ease: 'easeInOut', repeat: Infinity }}
        />
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
    // A `?tag=` link, such as a `#topic/tag` reference in a post, opens the feed filtered to that tag.
    const { appWindow } = useWindow()
    const tagSlug = new URLSearchParams(appWindow?.location?.search || '').get('tag')
    useEffect(() => {
        const tag = tagSlug ? tags?.find((tag) => tag.attributes.slug === tagSlug) : undefined
        if (tag) setTagIds([tag.id])
    }, [tagSlug, tags?.length])
    const { questions, isLoading, isFirstLoad, isSwitching, isLoadingMore, hasMore, fetchMore } = useForumFeed({
        sort,
        topicId,
        tagIds,
        following,
    })
    const [lastPostRef, inView] = useInView({ threshold: 0.1 })
    // A fast load shows nothing; the faded rows and the bar appear only if the new rows take longer than 150ms, so
    // a quick switch does not flicker.
    const [showBusy, setShowBusy] = useState(false)
    useEffect(() => {
        if (!isSwitching) return setShowBusy(false)
        const timer = setTimeout(() => setShowBusy(true), 150)
        return () => clearTimeout(timer)
    }, [isSwitching])
    const posts = questions.data

    useEffect(() => {
        if (inView && hasMore && !isLoading) fetchMore()
    }, [inView, hasMore, isLoading])

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
                    {tags && tags.length > 0 && (
                        <FilterMenu tags={tags} selected={tagIds} onChange={setTagIds} scope={tagScope} />
                    )}
                </div>
            </header>
            {/* A sort or filter change keeps the old rows, faded, until the new ones arrive. Then rows slide to
                their new places, new rows fade in, and removed rows fade out. Background refreshes show nothing. */}
            <div className="relative">
                {showBusy && <ProgressBar />}
                <ul
                    aria-busy={isSwitching}
                    className={`list-none m-0 p-0 transition-opacity duration-200 ${showBusy ? 'opacity-60' : ''}`}
                >
                    <AnimatePresence initial={false}>
                        {posts.map((post, index) => (
                            <PostRow
                                key={post.id}
                                post={post}
                                showTopic={showTopic}
                                filterTagIds={tagIds}
                                showPin={!!topicId}
                                rowRef={index === posts.length - 1 ? lastPostRef : undefined}
                            />
                        ))}
                    </AnimatePresence>
                </ul>
            </div>
            {isFirstLoad && <FeedSkeleton />}
            {isLoadingMore && <FeedSkeleton rows={2} />}
            {!isFirstLoad && !isSwitching && posts.length === 0 && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="px-6 py-12 text-center text-secondary text-sm"
                >
                    {tagIds.length > 0 ? 'No posts have the selected tags.' : empty}
                </motion.div>
            )}
        </div>
    )
}
